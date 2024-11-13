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

var argument = require('./argument');
var Authority = require('./authority').Authority;
var TokenRequest = require('./token-request');
var CodeRequest = require('./code-request');
var createLogContext = require('./log').createLogContext;
var MemoryCache = require('./memory-cache');
var util = require('./util');
var constants = require('./constants');

var globalADALOptions = {};
var globalCache = new MemoryCache();


/**
 * This function is used to add or remove entries from a TokenCache
 * @typedef {function} ModifyCacheFunction
 * @param {Array} entries  An array of entries to either add or remove from the TokenCache
 * @param {function} callback A callback function to call when the add or remove operation is complete.
 *                            This function can take a single error argument.
 */

/**
 * This function is called by a TokenCache when a find operation completes.
 * @callback TokenCacheFindCallback
 * @param {Error} [err] If an error occurred during the find operation then it should be passed here.
 * @param {Array} [entries] If the find operation was succesful then the matched entries should be returned here.
 */

/**
 * This function is called by ADAL to query a TokenCache.  The query parameter is
 * a flat object which must be compared against entries in the cache. An entry
 * matches if it has all of the fields in the query and the values of those fields match
 * the values in the query. A matched object may have more fields than the query object.
 * @typedef {function} FindCacheFunction
 * @param {object}  query This object should be compared to cache entries and matches should be returned.
 * @param {TokenCacheFindCallback} callback This callback should be called when the find operation is complete.
 */

/**
 * This is an interface that can be implemented to provide custom token cache persistence.
 * @public
 * @class TokenCache
 * @property {ModifyCacheFunction}  add Called by ADAL when entries should be added to the cache.
 * @property {ModifyCacheFunction}  remove Called by ADAL when entries should be removed from the cache.
 * @property {FindCacheFunction}    find Called when ADAL needs to find entries in the cache.
 */


/**
 * Creates a new AuthenticationContext object.  By default the authority will be checked against
 * a list of known Azure Active Directory authorities.  If the authority is not recognized as
 * one of these well known authorities then token acquisition will fail.  This behavior can be
 * turned off via the validateAuthority parameter below.
 * @constructor
 * @param {string}  authority            A URL that identifies a token authority.
 * @param {bool}   [validateAuthority]   Turns authority validation on or off.  This parameter default to true.
 * @param {TokenCache}   [cache]         Sets the token cache used by this AuthenticationContext instance.  If this parameter is not set
 *                                       then a default, in memory cache is used.  The default in memory cache is global to the process and is
 *                                       shared by all AuthenticationContexts that are created with an empty cache parameter.  To control the
 *                                       scope and lifetime of a cache you can either create a {@link MemoryCache} instance and pass it when
 *                                       constructing an AuthenticationContext or implement a custom {@link TokenCache} and pass that.  Cache
 *                                       instances passed at AuthenticationContext construction time are only used by that instance of
 *                                       the AuthenticationContext and are not shared unless it has been manually passed during the
 *                                       construction of other AuthenticationContexts.
 *
 */
function AuthenticationContext(authority, validateAuthority, cache, aadApiVersion) {
  var validate = (validateAuthority === undefined || validateAuthority === null || validateAuthority);

  this._authority = new Authority(authority, validate);
  this._authority.aadApiVersion = aadApiVersion;
  this._oauth2client = null;
  this._correlationId = null;
  this._callContext = { options : globalADALOptions };
  this._cache = cache || globalCache;
  this._tokenRequestWithUserCode = {};
}

/**
 * Gets the authority url this AuthenticationContext was constructed with.
 * @instance
 * @memberOf AuthenticationContext
 * @type {string}
 * @name authority
 */
Object.defineProperty(AuthenticationContext.prototype, 'authority', {
  get: function () {
    return this._authority.url;
  }
});

/**
 * Gets/Sets the correlation id that will be used for the next acquireToken request.
 * @instance
 * @memberOf AuthenticationContext
 * @type {string}
 * @name correlationId
 */
Object.defineProperty(AuthenticationContext.prototype, 'correlationId', {
  get: function () {
    return this._correlationId;
  },
  set: function (id) {
    this._correlationId = id;
  }
});

/**
 * Get/Sets options that are applied to requests generated by this AuthenticationContext instance.
 * @instance
 * @memberOf AuthenticationContext
 * @type {object}
 * @name options
 */
Object.defineProperty(AuthenticationContext.prototype, 'options', {
  get: function() {
    return this._callContext.options;
  },
  set: function (value) {
    this._callContext.options = value;
  }
});

/**
 * Get the token cache used by this AuthenticationContext instance.
 * @instance
 * @memberOf AuthenticationContext
 * @type {object}
 * @name cache
 */
Object.defineProperty(AuthenticationContext.prototype, 'cache', {
  get: function() {
    return this._cache;
  },
});

/**
 * This will be returned in case the OAuth 2 service returns an error.
 * @typedef ErrorResponse
 * @property {string} [error] A server error.
 * @property {string} [errorDescription] A description of the error returned.
 */

/**
 * Contains tokens and metadata upon successful completion of an acquireToken call.
 * @typedef TokenResponse
 * @property {string} tokenType The type of token returned.
 * @property {string} accessToken The returned access token.
 * @property {string} [refreshToken] A refresh token.
 * @property {Date} [createdOn] The date on which the access token was created.
 * @property {Date} expiresOn The Date on which the access token expires.
 * @property {int} expiresIn The amount of time, in seconds, for which the token is valid.
 * @property {string} [userId] An id for the user.  May be a displayable value if is_user_id_displayable is true.
 * @property {bool}   [isUserIdDisplayable] Indicates whether the user_id property will be meaningful if displayed to a user.
 * @property {string} [tenantId] The identifier of the tenant under which the access token was issued.
 * @property {string} [givenName] The given name of the principal represented by the access token.
 * @property {string} [familyName] The family name of the principal represented by the access token.
 * @property {string} [identityProvider] Identifies the identity provider that issued the access token.
 */

/**
 * This is the callback that is passed to all acquireToken variants below.
 * @callback AcquireTokenCallback
 * @param {Error}  [error]           If the request fails this parameter will contain an Error object.
 * @param {TokenResponse|ErrorResponse} [response]   On a succesful request returns a {@link TokenResposne}.
 */

/**
 * This function implements code that is common to all acquireToken flows.
 * @private
 * @param {AcquireTokenCallback} callback
 * @param {Function} tokenFunction This is the function to call to actually acquire the token after common flow has completed.
 */
AuthenticationContext.prototype._acquireToken = function(callback, tokenFunction) {
  var self = this;
  this._callContext._logContext = createLogContext(this.correlationId);
  this._authority.validate(this._callContext, function(err) {
    if (err) {
      callback(err);
      return;
    }
    tokenFunction.call(self);
  });
};

AuthenticationContext.prototype._acquireUserCode = function (callback, codeFunction) { 
    var self = this;
    this._callContext._logContext = createLogContext(this.correlationId);
    this._authority.validate(this._callContext, function (err) { 
        if (err) { 
            callback(err);
            return;
        } 

        codeFunction.call(self);
    });
};

/**
 * Gets a token for a given resource.
 * @param {string}   resource                            A URI that identifies the resource for which the token is valid.
 * @param {string}   [userId]                            The username of the user on behalf this application is authenticating.
 * @param {string}   [clientId]                          The OAuth client id of the calling application.
 * @param {AcquireTokenCallback}   callback              The callback function.
 */
AuthenticationContext.prototype.acquireToken = function(resource, userId, clientId, callback) {
  argument.validateCallbackType(callback);
  try {
    argument.validateStringParameter(resource, 'resource');
    argument.validateStringParameter(clientId, 'clientId');
  } catch(err) {
    callback(err);
    return;
  }

  this._acquireToken(callback, function() {
    var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource);
    tokenRequest.getTokenFromCacheWithRefresh(userId, callback);
  });
};

/**
 * Gets a token for a given resource.
 * @param {string}   resource                            A URI that identifies the resource for which the token is valid.
 * @param {string}   username                            The username of the user on behalf this application is authenticating.
 * @param {string}   password                            The password of the user named in the username parameter.
 * @param {string}   clientId                            The OAuth client id of the calling application.
 * @param {AcquireTokenCallback}   callback              The callback function.
 */
AuthenticationContext.prototype.acquireTokenWithUsernamePassword = function(resource, username, password, clientId, callback)  {
  argument.validateCallbackType(callback);
  try {
    argument.validateStringParameter(resource, 'resource');
    argument.validateStringParameter(username, 'username');
    argument.validateStringParameter(password, 'password');
    argument.validateStringParameter(clientId, 'clientId');
  } catch(err) {
    callback(err);
    return;
  }

  this._acquireToken(callback, function() {
    var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource);
    tokenRequest.getTokenWithUsernamePassword(username, password, callback);
  });
};

/**
 * Gets a token for a given resource.
 * @param {string}   resource                            A URI that identifies the resource for which the token is valid.
 * @param {string}   clientId                            The OAuth client id of the calling application.
 * @param {string}   clientSecret                        The OAuth client secret of the calling application.
 * @param {AcquireTokenCallback}   callback              The callback function.
 */
AuthenticationContext.prototype.acquireTokenWithClientCredentials = function(resource, clientId, clientSecret, callback) {
  argument.validateCallbackType(callback);
  try {
    argument.validateStringParameter(resource, 'resource');
    argument.validateStringParameter(clientId, 'clientId');
    argument.validateStringParameter(clientSecret, 'clientSecret');
  } catch (err) {
    callback(err);
    return;
  }

  this._acquireToken(callback, function() {
    var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource);
    tokenRequest.getTokenWithClientCredentials(clientSecret, callback);
  });
};

/**
 * Gets a token for a given resource.
 * @param {string}   authorizationCode                   An authorization code returned from a client.
 * @param {string}   redirectUri                         The redirect uri that was used in the authorize call.
 * @param {string}   resource                            A URI that identifies the resource for which the token is valid.
 * @param {string}   clientId                            The OAuth client id of the calling application.
 * @param {string}   clientSecret                        The OAuth client secret of the calling application.
 * @param {AcquireTokenCallback}   callback              The callback function.
 */
AuthenticationContext.prototype.acquireTokenWithAuthorizationCode = function(authorizationCode, redirectUri, resource, clientId, clientSecret, callback) {
  argument.validateCallbackType(callback);
  try {
    argument.validateStringParameter(resource, 'resource');
    argument.validateStringParameter(authorizationCode, 'authorizationCode');
    argument.validateStringParameter(redirectUri, 'redirectUri');
    argument.validateStringParameter(clientId, 'clientId');
  } catch(err) {
    callback(err);
    return;
  }

  this._acquireToken(callback, function() {
    var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource, redirectUri);
    tokenRequest.getTokenWithAuthorizationCode(authorizationCode, clientSecret, callback);
  });
};

/**
 * Gets a new access token via a previously issued refresh token.
 * @param  {string}   refreshToken                        A refresh token returned in a tokne response from a previous invocation of acquireToken.
 * @param  {string}   clientId                            The OAuth client id of the calling application.
 * @param  {string}   [clientSecret]                      The OAuth client secret of the calling application.  (Note: this parameter is a late addition.
 *                                                        This parameter may be ommitted entirely so that applications built before this change will continue
 *                                                        to work unchanged.)
 * @param  {string}   resource                            The OAuth resource for which a token is being request.  This parameter is optional and can be set to null.
 * @param  {AcquireTokenCallback}   callback              The callback function.
 */
AuthenticationContext.prototype.acquireTokenWithRefreshToken = function(refreshToken, clientId, clientSecret, resource, callback) {
  // Fix up the arguments.  Older clients may pass fewer arguments as the clientSecret paramter did not always exist.
  // The code needs to make adjustments for those clients.
  var clientSecretPresent = (5 === arguments.length);
  var actualClientSecret = clientSecretPresent ? clientSecret : null;
  var actualCallback = clientSecretPresent ? arguments[4] : arguments[3];
  var actualResource = clientSecretPresent ? arguments[3] : arguments[2];

  argument.validateCallbackType(actualCallback);
  try {
    argument.validateStringParameter(refreshToken, 'refreshToken');
    argument.validateStringParameter(clientId, 'clientId');
  } catch(err) {
    callback(err);
    return;
  }

  this._acquireToken(callback, function() {
    var tokenRequest = new TokenRequest(this._callContext, this, clientId, actualResource);
    tokenRequest.getTokenWithRefreshToken(refreshToken, actualClientSecret, actualCallback);
  });
};

/**
 * Gets a new access token using via a certificate credential.
 * @param  {string}   resource                            A URI that identifies the resource for which the token is valid.
 * @param  {string}   clientId                            The OAuth client id of the calling application.
 * @param  {string}   certificate                         A PEM encoded certificate private key.
 * @param  {string}   thumbprint                          A hex encoded thumbprint of the certificate.
 * @param  {AcquireTokenCallback}   callback              The callback function.
 */
AuthenticationContext.prototype.acquireTokenWithClientCertificate = function(resource, clientId, certificate, thumbprint, callback) {
  argument.validateCallbackType(callback);
  try {
    argument.validateStringParameter(resource, 'resource');
    argument.validateStringParameter(certificate, 'certificate');
    argument.validateStringParameter(thumbprint, 'thumbprint');
  } catch(err) {
    callback(err);
    return;
  }

  this._acquireToken(callback, function() {
    var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource);
    tokenRequest.getTokenWithCertificate(certificate, thumbprint, callback);
  });
};

/**
 * Gets the userCodeInfo which contains user_code, device_code for authenticating user on device. 
 * @param  {string}   resource                            A URI that identifies the resource for which the device_code and user_code is valid for.
 * @param  {string}   clientId                            The OAuth client id of the calling application.
 * @param  {string}   language                            The language code specifying how the message should be localized to. 
 * @param  {AcquireTokenCallback}   callback              The callback function.
 */
AuthenticationContext.prototype.acquireUserCode = function(resource, clientId, language, callback) { 
    argument.validateCallbackType(callback);
    
    try { 
        argument.validateStringParameter(resource, 'resource');
        argument.validateStringParameter(clientId, 'clientId');
    } catch (err) { 
        callback(err);
        return;
    }    

    this._acquireUserCode(callback, function () { 
        var codeRequest = new CodeRequest(this._callContext, this, clientId, resource);
        codeRequest.getUserCodeInfo(language, callback);   
    });
};

/**
 * Gets a new access token using via a device code.
 * @note This method doesn't look up the cache, it only stores the returned token into cache. To look up cache before making a new request, 
 *       please use acquireToken.  
 * @param  {string}   clientId                            The OAuth client id of the calling application.
 * @param  {object}   userCodeInfo                        Contains device_code, retry interval, and expire time for the request for get the token. 
 * @param  {AcquireTokenCallback}   callback              The callback function.
 */
AuthenticationContext.prototype.acquireTokenWithDeviceCode = function(resource, clientId, userCodeInfo, callback){
    argument.validateCallbackType(callback);

    try{
       argument.validateUserCodeInfo(userCodeInfo);
    } catch (err) {
       callback(err);
       return;
    }

    var self = this;
    this._acquireToken(callback, function() {
        var tokenRequest = new TokenRequest(this._callContext, this, clientId, resource, null);
        self._tokenRequestWithUserCode[userCodeInfo[constants.UserCodeResponseFields.DEVICE_CODE]] = tokenRequest;
        tokenRequest.getTokenWithDeviceCode(userCodeInfo, callback); 
    })
};

/**
 * Cancels the polling request to get token with device code. 
 * @param  {object}   userCodeInfo                        Contains device_code, retry interval, and expire time for the request for get the token. 
 * @param  {AcquireTokenCallback}   callback              The callback function.
 */
AuthenticationContext.prototype.cancelRequestToGetTokenWithDeviceCode = function (userCodeInfo, callback) {
    argument.validateCallbackType(callback);

    try {
       argument.validateUserCodeInfo(userCodeInfo);
    } catch (err) {
       callback(err);
       return;
    }

    if (!this._tokenRequestWithUserCode || !this._tokenRequestWithUserCode[userCodeInfo[constants.UserCodeResponseFields.DEVICE_CODE]]) {
       callback(new Error('No acquireTokenWithDeviceCodeRequest existed to be cancelled')); 
       return;
    }

    var tokenRequestToBeCancelled = this._tokenRequestWithUserCode[userCodeInfo[constants.UserCodeResponseFields.DEVICE_CODE]];
    tokenRequestToBeCancelled.cancelTokenRequestWithDeviceCode();

    delete this._tokenRequestWithUserCode[constants.UserCodeResponseFields.DEVICE_CODE];
};

var exports = {
  AuthenticationContext : AuthenticationContext,
  setGlobalADALOptions : function(options) {
    globalADALOptions = options;
  },
  getGlobalADALOptions : function() {
    return globalADALOptions;
  }
};

util.adalInit();
module.exports = exports;
