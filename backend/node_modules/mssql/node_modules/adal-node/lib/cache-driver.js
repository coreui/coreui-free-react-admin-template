/*
 * @copyright
 * Copyright © Microsoft Open Technologies, Inc.
 *
 * All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http: *www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
 * ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A
 * PARTICULAR PURPOSE, MERCHANTABILITY OR NON-INFRINGEMENT.
 *
 * See the Apache License, Version 2.0 for the specific language
 * governing permissions and limitations under the License.
 */

'use strict';

var _ = require('underscore');
var crypto = require('crypto');
require('date-utils');  // Adds a number of convenience methods to the builtin Date object.

var Logger = require('./log').Logger;
var constants = require('./constants');
var cacheConstants = constants.Cache;
var TokenResponseFields = constants.TokenResponseFields;

// TODO: remove this.
// There is a PM requirement that developers be able to look in to the cache and manipulate the cache based on
// the parameters (authority, resource, clientId, userId), in any combination.  They must be able find, add, and remove
// tokens based on those parameters.  Any default cache that the API supplies must allow for this query pattern.
// This has the following implications:
//  The developer must not be required to calculate any special fields, such as hashes or unique keys.
//
//  The default cache implementation can not include optimizations that break the previous requirement.
//  This means that we can only do complete scans of the data and equality can only be calculated based on
//  equality of all of the individual fields.
//
//  The cache interface can not make any assumption about the query efficency of the cache nor can
//  it help in optimizing those queries.
//
//  There is no simple sorting optimization, rather a series of indexes, and index intersection would
//  be necessary.
//
//  If for some reason the developer tries to update the cache with a new entry that may be a refresh
//  token, they will not know that they need to update all of the refresh tokens or they may get strange
//  behavior.
//
//  Related to the above, there is no definition of a coherent cache.  And if there was there would be
//  no way for our API to enforce it.  What about duplicates?
//
// there be a single cache entry per (authority, resource, clientId)
// tuple, with no special tokens (i.e. MRRT tokens)
// Required cache operations
//

// Constants
var METADATA_CLIENTID = '_clientId';
var METADATA_AUTHORITY = '_authority';

function nop(placeHolder, callback) {
  callback();
}

/*
 * This is a place holder cache that does nothing.
 */
var nopCache = {
  add : nop,
  addMany : nop,
  remove : nop,
  removeMany : nop,
  find : nop
};

function createTokenHash(token) {
  var hashAlg = crypto.createHash(cacheConstants.HASH_ALGORITHM);
  hashAlg.update(token, 'utf8');
  return hashAlg.digest('base64');
}

function createTokenIdMessage(entry) {
  var accessTokenHash = createTokenHash(entry[TokenResponseFields.ACCESS_TOKEN]);
  var message = 'AccessTokenId: ' + accessTokenHash;
  if (entry[TokenResponseFields.REFRESH_TOKEN]) {
    var refreshTokenHash = createTokenHash(entry[TokenResponseFields.REFRESH_TOKEN]);
    message += ', RefreshTokenId: ' + refreshTokenHash;
  }
  return message;
}

/**
 * This is the callback that is passed to all acquireToken variants below.
 * @callback RefreshEntryFunction
 * @memberOf CacheDriver
 * @param {object}  tokenResponse    A token response to refresh.
 * @param {string}  [resource]       The resource for which to obtain the token if it is different from the original token.
 * @param {AcquireTokenCallback} callback   Called on completion with an error or a new entry to add to the cache.
 */

/**
 * Constructs a new CacheDriver object.
 * @constructor
 * @private
 * @param {object} callContext Contains any context information that applies to the request.
 * @param {string} authority
 * @param {TokenCache} [cache]     A token cache to use.  If none is passed then the CacheDriver instance
 *                                 will not cache.
 * @param {RefreshEntryFunction} refreshFunction
 */
function CacheDriver(callContext, authority, resource, clientId, cache, refreshFunction) {
  this._callContext = callContext;
  this._log = new Logger('CacheDriver', callContext._logContext);
  this._authority = authority;
  this._resource = resource;
  this._clientId = clientId;
  this._cache = cache || nopCache;
  this._refreshFunction = refreshFunction;
}

/**
 * This is the callback that is passed to all acquireToken variants below.
 * @callback QueryCallback
 * @memberOf CacheDriver
 * @param {Error}  [error]           If the request fails this parameter will contain an Error object.
 * @param {Array} [response]   On a succesful request returns an array of matched entries.
 */

/**
 * The cache driver query function.  Ensures that all queries are authority specific.
 * @param  {object}   query    A query object.  Can contain a clientId or userId or both.
 * @param  {QueryCallback} callback
 */
CacheDriver.prototype._find = function(query, callback) {
  this._cache.find(query, callback);
};

/**
 * Queries for all entries that might satisfy a request for a cached token.
 * @param  {object}   query    A query object.  Can contain a clientId or userId or both.
 * @param  {QueryCallback} callback
 */
CacheDriver.prototype._getPotentialEntries = function(query, callback) {
  var self = this;
  var potentialEntriesQuery = {};

  if (query.clientId) {
    potentialEntriesQuery[METADATA_CLIENTID] = query.clientId;
  }
  if (query.userId) {
    potentialEntriesQuery[TokenResponseFields.USER_ID] = query.userId;
  }

  this._log.verbose('Looking for potential cache entries:');
  this._log.verbose(JSON.stringify(potentialEntriesQuery), true);
  this._find(potentialEntriesQuery, function(err, entries) {
    self._log.verbose('Found ' + entries.length + ' potential entries.');
    callback(err, entries);
    return;
  });
};

/**
 * Finds all multi resource refresh tokens in the cache.
 * Refresh token is bound to userId, clientId. 
 * @param  {QueryCallback} callback
 */
CacheDriver.prototype._findMRRTTokensForUser = function(user, callback) {
  this._find({ isMRRT : true, userId : user, _clientId : this._clientId}, callback);
};

/**
 * This is the callback that is passed to all acquireToken variants below.
 * @callback SingleEntryCallback
 * @memberOf CacheDriver
 * @param {Error}  [error]           If the request fails this parameter will contain an Error object.
 * @param {object} [response]   On a succesful request returns a single cache entry.
 */


/**
 * Finds a single entry that matches the query.  If multiple entries are found that satisfy the query
 * then an error will be returned.
 * @param {object}  query A query object.
 * @param {SingleEntryCallback} callback
 */
CacheDriver.prototype._loadSingleEntryFromCache = function(query, callback) {
  var self = this;
  this._getPotentialEntries(query, function(err, potentialEntries) {
    if (err) {
      callback(err);
      return;
    }

    var returnVal;
    var isResourceTenantSpecific;

    if (potentialEntries && 0 < potentialEntries.length) {
      var resourceTenantSpecificEntries = _.where(potentialEntries, { resource : self._resource, _authority : self._authority });

      if (!resourceTenantSpecificEntries || 0 === resourceTenantSpecificEntries.length) {
        self._log.verbose('No resource specific cache entries found.');

        // There are no resource specific entries.  Find an MRRT token.
        var mrrtTokens = _.where(potentialEntries, { isMRRT : true });
        if (mrrtTokens && mrrtTokens.length > 0) {
          self._log.verbose('Found an MRRT token.');
          returnVal = mrrtTokens[0];
        } else {
          self._log.verbose('No MRRT tokens found.');
        }

      } else if (resourceTenantSpecificEntries.length === 1) {
        self._log.verbose('Resource specific token found.');
        returnVal = resourceTenantSpecificEntries[0];
        isResourceTenantSpecific = true;
      }else {
        callback(self._log.createError('More than one token matches the criteria.  The result is ambiguous.'));
        return;
      }
    }
    if (returnVal) {
      self._log.verbose('Returning token from cache lookup');
      self._log.verbose('Returning token from cache lookup, ' + createTokenIdMessage(returnVal), true);
    }
    callback(null, returnVal, isResourceTenantSpecific);
  });
};

/**
 * The response from a token refresh request never contains an id_token and therefore no
 * userInfo can be created from the response.  This function creates a new cache entry
 * combining the id_token based info and cache metadata from the cache entry that was refreshed with the
 * new tokens in the refresh response.
 * @param  {object} entry           A cache entry corresponding to the resfreshResponse.
 * @param  {object} refreshResponse The response from a token refresh request for the entry parameter.
 * @return {object}                 A new cache entry.
 */
CacheDriver.prototype._createEntryFromRefresh = function(entry, refreshResponse) {
  var newEntry = _.clone(entry);
  newEntry = _.extend(newEntry, refreshResponse);

  if (entry.isMRRT && this._authority !== entry[METADATA_AUTHORITY]) {
    newEntry[METADATA_AUTHORITY] = this._authority;
  }

  this._log.verbose('Created new cache entry from refresh response.');
  return newEntry;
};

CacheDriver.prototype._replaceEntry = function(entryToReplace, newEntry, callback) {
  var self = this;
  this.remove(entryToReplace, function(err) {
    if (err) {
      callback(err);
      return;
    }
    self.add(newEntry, callback);
  });
};

/**
 * Given an expired cache entry refreshes it and updates the cache.
 * @param  {object}   entry              A cache entry with an MRRT to refresh for another resource.
 * @param  {SingleEntryCallback} callback
 */
CacheDriver.prototype._refreshExpiredEntry = function(entry, callback) {
  var self = this;
  this._refreshFunction(entry, null, function(err, tokenResponse) {
    if (err) {
      callback(err);
      return;
    }

    var newEntry = self._createEntryFromRefresh(entry, tokenResponse);
    self._replaceEntry(entry, newEntry, function(err) {
      if (err) {
        self._log.error('error refreshing expired token', err, true);
      } else {
        self._log.info('Returning token refreshed after expiry.');
      }
      callback(err, newEntry);
    });
  });
};

/**
 * Given a cache entry with an MRRT will acquire a new token for a new resource via the MRRT, and cache it.
 * @param  {object}   entry              A cache entry with an MRRT to refresh for another resource.
 * @param  {SingleEntryCallback} callback
 */
CacheDriver.prototype._acquireNewTokenFromMrrt = function(entry, callback) {
  var self = this;
  this._refreshFunction(entry, this._resource, function(err, tokenResponse) {
    if (err) {
      callback(err);
      return;
    }

    var newEntry = self._createEntryFromRefresh(entry, tokenResponse);
    self.add(newEntry, function(err) {
      if (err) {
        self._log.error('error refreshing mrrt', err, true);
      } else {
        self._log.info('Returning token derived from mrrt refresh.');
      }
      callback(err, newEntry);
    });
  });
};

/**
 * Given a token this function will refresh it if it is either expired, or an MRRT.
 * @param  {object}   entry              A cache entry to refresh if necessary.
 * @param  {Boolean}  isResourceSpecific Indicates whether this token is appropriate for the resource for which
 *                                       it was requested or whether it is possibly an MRRT token for which
 *                                       a resource specific access token should be acquired.
 * @param  {SingleEntryCallback} callback
 */
CacheDriver.prototype._refreshEntryIfNecessary = function(entry, isResourceSpecific, callback) {
  var expiryDate = entry[TokenResponseFields.EXPIRES_ON];

  // Add some buffer in to the time comparison to account for clock skew or latency.
  var nowPlusBuffer = (new Date()).addMinutes(constants.Misc.CLOCK_BUFFER);

  if (isResourceSpecific && nowPlusBuffer.isAfter(expiryDate)) {
    this._log.info('Cached token is expired.  Refreshing: ' + expiryDate);
    this._refreshExpiredEntry(entry, callback);
    return;
  } else if (!isResourceSpecific && entry.isMRRT) {
    this._log.info('Acquiring new access token from MRRT token.');
    this._acquireNewTokenFromMrrt(entry, callback);
    return;
  } else {
    callback(null, entry);
  }
};

/**
 * Finds a single entry in the cache that matches the query or fails if more than one match is found.
 * @param  {object}   query    A query object
 * @param  {SingleEntryCallback} callback
 */
CacheDriver.prototype.find = function(query, callback) {
  var self = this;
  query = query || {};
  this._log.verbose('finding using query');
  this._log.verbose('finding with query:' + JSON.stringify(query), true);
  this._loadSingleEntryFromCache(query, function(err, entry, isResourceTenantSpecific) {
    if (err) {
      callback(err);
      return;
    }

    if (!entry) {
      callback();
      return;
    }

    self._refreshEntryIfNecessary(entry, isResourceTenantSpecific, function(err, newEntry) {
      callback(err, newEntry);
      return;
    });
  });
};

/**
 * Removes a single entry from the cache.
 * @param  {object}   entry    The entry to remove.
 * @param  {Function} callback Called on completion.  The first parameter may contain an error.
 */
CacheDriver.prototype.remove = function(entry, callback) {
  this._log.verbose('Removing entry.');
  return this._cache.remove([entry], function(err) {
    callback(err);
    return;
  });
};

/**
 * Removes a collection of entries from the cache in a single batch operation.
 * @param  {Array}   entries  An array of cache entries to remove.
 * @param  {Function} callback This function is called when the operation is complete.  Any error is provided as the
 *                             first parameter.
 */
CacheDriver.prototype._removeMany = function(entries, callback) {
  this._log.verbose('Remove many: ' + entries.length);
  this._cache.remove(entries, function(err) {
    callback(err);
    return;
  });
};

/**
 * Adds a collection of entries to the cache in a single batch operation.
 * @param {Array}   entries  An array of entries to add to the cache.
 * @param  {Function} callback This function is called when the operation is complete.  Any error is provided as the
 *                             first parameter.
 */
CacheDriver.prototype._addMany = function(entries, callback) {
  this._log.verbose('Add many: ' + entries.length);
  this._cache.add(entries, function(err) {
    callback(err);
    return;
  });
};

/*
 * Tests whether the passed entry is a multi resource refresh token.
 * Somewhat mysteriously the presense of a resource field in a returned
 * token response indicates that the response is an MRRT.
 * @param  {object}  entry
 * @return {Boolean}       true if the entry is an MRRT.
 */
function isMRRT(entry) {
  return entry.resource ? true : false;
}

/**
 * Given an cache entry this function finds all of the MRRT tokens already in the cache
 * and updates them with the refresh_token of the passed in entry.
 * @param  {object}   entry    The entry from which to get an updated refresh_token
 * @param  {Function} callback Called back on completion.  The first parameter may contain an error.
 */
CacheDriver.prototype._updateRefreshTokens = function(entry, callback) {
  var self = this;
  if (isMRRT(entry)) {
    this._findMRRTTokensForUser(entry.userId, function(err, mrrtTokens) {
      if (err) {
        callback(err);
        return;
      }

      if (!mrrtTokens || 0 === mrrtTokens.length) {
        callback();
        return;
      }

      self._log.verbose('Updating ' + mrrtTokens.length + ' cached refresh tokens.');
      self._removeMany(mrrtTokens, function(err) {
        if (err) {
          callback(err);
          return;
        }

        for (var i = 0; i < mrrtTokens.length; i++) {
          mrrtTokens[i][TokenResponseFields.REFRESH_TOKEN] = entry[TokenResponseFields.REFRESH_TOKEN];
        }

        self._addMany(mrrtTokens, function(err) {
          callback(err);
          return;
        });
      });
    });
  } else {
    callback();
    return;
  }
};

/**
 * Checks to see if the entry has cache metadata already.  If it does
 * then it probably came from a refresh operation and the metadata
 * was copied from the originating entry.
 * @param  {object} entry The entry to check
 * @return {bool}         Returns true if the entry has already been augmented
 *                        with cache metadata.
 */
CacheDriver.prototype._entryHasMetadata = function(entry) {
  return (_.has(entry, METADATA_CLIENTID) && _.has(entry, METADATA_AUTHORITY));
};

CacheDriver.prototype._augmentEntryWithCacheMetadata = function(entry) {
  if (this._entryHasMetadata(entry)) {
    return;
  }

  if (isMRRT(entry)) {
    this._log.verbose('Added entry is MRRT');
    entry.isMRRT = true;
  } else {
    entry.resource = this._resource;
  }

  entry[METADATA_CLIENTID] = this._clientId;
  entry[METADATA_AUTHORITY] = this._authority;
};

/**
 * Adds a single entry to the cache.
 * @param {object}   entry    The entry to add.
 * @param {string}   clientId The id of this client app.
 * @param {string}   resource The id of the resource for which the cached token was obtained.
 * @param {Function} callback Called back on completion.  The first parameter may contain an error.
 */
CacheDriver.prototype.add = function(entry, callback) {
  var self = this;
  this._log.verbose('Adding entry');
  this._log.verbose('Adding entry, ' + createTokenIdMessage(entry));

  this._augmentEntryWithCacheMetadata(entry);

  this._updateRefreshTokens(entry, function(err) {
    if (err) {
      callback(err);
      return;
    }

    self._cache.add([entry], function(err) {
      callback(err);
      return;
    });
  });
};

module.exports = CacheDriver;