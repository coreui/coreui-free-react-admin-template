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

var querystring = require('querystring');
var request = require('request');
var _ = require('underscore');
var url = require('url');

var constants = require('./constants');
var Logger = require('./log').Logger;
var util = require('./util');

var AccountType = constants.UserRealm.AccountType;
var FederationProtocolType = constants.UserRealm.FederationProtocolType;

var USER_REALM_PATH_TEMPLATE = 'common/UserRealm/<user>';

/**
 * Create a new UserRealm object
 * @private
 * @constructor
 * @param {object} callContext Contains any context information that applies to the request.
 * @param {string} userPrinciple   The username for which a realm needs to be discovered.
 * @param {string} authority       The string url of the authority that owns the userPrinciple.
 */
function UserRealm(callContext, userPrinciple, authority) {
  this._log = new Logger('UserRealm', callContext._logContext);
  this._callContext = callContext;
  this._apiVersion = '1.0';
  this._federationProtocol = null;
  this._accountType = null;
  this._federationMetadataUrl = null;
  this._federationActiveAuthUrl = null;
  this._userPrinciple = userPrinciple;
  this._authority = authority;
}

/**
* The API version requested by UserRealm.
* @type {string}
* @instance
* @memberOf UserRealm
* @name apiVersion
*/
Object.defineProperty(UserRealm.prototype, 'apiVersion', {
  get : function() {
    return this._apiVersion;
  }
});

/**
* The federation protocol used by the users realm.
* @type {string}
* @instance
* @memberOf UserRealm
* @name federationProtocol
*/
Object.defineProperty(UserRealm.prototype, 'federationProtocol', {
  get : function() {
    return this._federationProtocol;
  }
});

/**
* The Type of account.  Either managed or federated.
* @type {string}
* @instance
* @memberOf UserRealm
* @name accountType
*/
Object.defineProperty(UserRealm.prototype, 'accountType', {
  get : function() {
    return this._accountType;
  }
});

/**
* If this is a federated account then this property will contain the mex url.
* @type {string}
* @instance
* @memberOf UserRealm
* @name federationsMetadataUrl
*/
Object.defineProperty(UserRealm.prototype, 'federationMetadataUrl', {
  get : function() {
    return this._federationMetadataUrl;
  }
});

/**
* If the account is federated this will contain the authentication endpoint.
* @type {string}
* @instance
* @memberOf UserRealm
* @name federationActiveAuthUrl
*/
Object.defineProperty(UserRealm.prototype, 'federationActiveAuthUrl', {
  get : function() {
    return this._federationActiveAuthUrl;
  }
});

/**
* Given the authority url this method constructs a full user realm discovery url.
* @private
* @returns A full user realm discovery url including path and query string.
*/
UserRealm.prototype._getUserRealmUrl = function() {
  var userRealmUrl = util.copyUrl(this._authority);
  var urlEncodedUser = encodeURIComponent(this._userPrinciple);
  userRealmUrl.pathname = USER_REALM_PATH_TEMPLATE.replace('<user>', urlEncodedUser);

  var userRealmQuery = {
    'api-version' : this._apiVersion
  };

  userRealmUrl.search = querystring.stringify(userRealmQuery);

  userRealmUrl = util.copyUrl(userRealmUrl);

  return userRealmUrl;
};

/**
* Given a constants object and a value, validates that the value is a key in the constants object.
* @private
* @param {object} constants   An object containing constant key value pairs.
* @param {string}  value       A value to check against the constants
* @param {bool}   caseSensitive  set to true if comparisons should be made as case sensitive.  Defaults to false.
* @returns {bool|string}  If value passed in matches one of the constants then the return value is the matched constant.
*                         If a non case sensitive match was done, then the value returned may be different than the value
*                         passed in.  If there is no match then the method returns false.
*/
UserRealm.prototype._validateConstantValue = function(constants, value, caseSensitive) {
  if (!value) {
    return false;
  }
  if (!caseSensitive) {
    value = value.toLowerCase();
  }
  return _.contains(_.values(constants), value) ? value : false;
};

/**
* Checks whether an account type string is valid.
* @private
* @param {string} type  An account type string.
* @returns {bool}
*/
UserRealm.prototype._validateAccountType = function(type) {
  return this._validateConstantValue(AccountType, type);
};

/**
* Checks whether a federation protocol string is valid.
* @private
* @param {string} protocol  A federation protocol string.
* @returns {bool}
*/
UserRealm.prototype._validateFederationProtocol = function(protocol) {
  return this._validateConstantValue(FederationProtocolType, protocol);
};

/**
* Logs the values parsed as part of user realm discovery.
* @private
*/
UserRealm.prototype._logParsedResponse = function() {
  this._log.verbose('UserRealm response:');
  this._log.verbose(' AccountType:             ' + this.accountType);
  this._log.verbose(' FederationProtocol:      ' + this.federationProtocol);
  this._log.verbose(' FederationMetatdataUrl:  ' + this.federationMetadataUrl, true);
  this._log.verbose(' FederationActiveAuthUrl: ' + this.federationActiveAuthUrl, true);
};

/**
* Parses the response from a user realm discovery request.
* @private
* @param {string} body    The body returned as part of the http user realm discovery request.
* @param {UserRealm.DiscoverCallback} callback  Called when parsing is complete.
*/
UserRealm.prototype._parseDiscoveryResponse = function(body, callback) {
  this._log.verbose('Discovery response:\n' + body, true);

  var response;
  try {
    response = JSON.parse(body);
  } catch (err) {
    callback(this._log.createError('Parsing realm discovery respone JSON failed: ' + body, true));
    return;
  }

  var accountType = this._validateAccountType(response['account_type']);
  if (!accountType) {
    callback(this._log.createError('Cannot parse account_type: ' + accountType));
    return;
  }

  this._accountType = accountType;

  if (this._accountType === AccountType.Federated) {
    var protocol = this._validateFederationProtocol(response['federation_protocol']);

    if (!protocol) {
      callback(this._log.createError('Cannot parse federation protocol: ' + protocol));
      return;
    }

    this._federationProtocol = protocol;
    this._federationMetadataUrl = response['federation_metadata_url'];
    this._federationActiveAuthUrl = response['federation_active_auth_url'];
  }

  this._logParsedResponse();
  callback();
};

/**
* @callback DiscoverCallback
* @memberOf UserRealm
* @param {Error} error   If an error occurs during discovery then this parameter will be used to return the error.
*/

/**
* Performs user realm discovery and fills in the properties on this object.
* @private
* @param {UserRealm.DiscoverCallback} callback  Called when discovery is complete.
*/
UserRealm.prototype.discover = function(callback) {
  var self = this;
  var options = util.createRequestOptions(
    this,
    {
      headers : {
        Accept : 'application/json'
      }
    }
  );

  var userRealmUrl = this._getUserRealmUrl();
  this._log.verbose('Performing user realm discovery at: ' + url.format(userRealmUrl), true);
  request.get(userRealmUrl, options, util.createRequestHandler('User Realm Discovery', this._log, callback,
    function(response, body) {
      self._parseDiscoveryResponse(body, callback);
    })
  );
};

module.exports = UserRealm;