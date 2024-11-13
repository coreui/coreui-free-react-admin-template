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

var constants = require('./constants');
var Logger = require('./log').Logger;
var Mex = require('./mex');
var OAuth2Client = require('./oauth2client');

var OAuth2Parameters = constants.OAuth2.Parameters;
var TokenResponseFields = constants.TokenResponseFields;
var OAuth2GrantType = constants.OAuth2.GrantType;
var OAuth2Scope = constants.OAuth2.Scope;

/**
 * Constructs a new CodeRequest object.
 * @constructor
 * @private
 * @param {object} callContext Contains any context information that applies to the request.
 * @param {AuthenticationContext} authenticationContext
 * @param {string} resource
 * @param {string} clientId
 */
// TODO: probably need to modify the parameter list. 
function CodeRequest(callContext, authenticationContext, clientId, resource) {
    this._log = new Logger('DeviceCodeRequest', callContext._logContext);
    this._callContext = callContext;
    this._authenticationContext = authenticationContext;
    this._resource = resource;
    this._clientId = clientId;
    
    // This should be set at the beginning of getToken
    // functions that have a userId.
    this._userId = null;
};

/**
 * Get user code info. 
 * @private
 * @param {object} oauthParameters containing all the parameters needed to get the user code info. 
 * @param {callback} callback
 */
CodeRequest.prototype._getUserCodeInfo = function (oauthParameters, callback) {
   var oauth2Client = this._createOAuth2Client();
   oauth2Client.getUserCodeInfo(oauthParameters, callback);
};

CodeRequest.prototype._createOAuth2Client = function () {
    return new OAuth2Client(this._callContext, this._authenticationContext._authority);
};

/**
 * Creates a set of basic, common, OAuthParameters based on values that the CodeRequest was created with.
 * @private
 * @return {object} containing all the basic parameters. 
 */
CodeRequest.prototype._createOAuthParameters = function () {
    var oauthParameters = {};
    
    oauthParameters[OAuth2Parameters.CLIENT_ID] = this._clientId;
    oauthParameters[OAuth2Parameters.RESOURCE] = this._resource;

    return oauthParameters;
};

/**
 * Get the user code information. 
 * @param {string} language optional parameter used to get the user code info. 
 * @param {callback} callback
 */
CodeRequest.prototype.getUserCodeInfo = function(language, callback) {
    this._log.info('Getting user code info.');

    var oauthParameters = this._createOAuthParameters();
    if (language){
       oauthParameters[OAuth2Parameters.LANGUAGE] = language;
    }

    this._getUserCodeInfo(oauthParameters, callback);
};
module.exports = CodeRequest;