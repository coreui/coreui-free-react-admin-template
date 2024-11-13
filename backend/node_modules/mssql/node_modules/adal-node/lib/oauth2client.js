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
require('date-utils');  // Adds a number of convenience methods to the builtin Date object.
var querystring = require('querystring');
var uuid = require('uuid');
var axios = require('axios');
var url = require('url');
var async = require('async');

var constants = require('./constants');
var Logger = require('./log').Logger;
var util = require('./util');

var OAuth2Parameters = constants.OAuth2.Parameters;
var OAuth2ResponseParameters = constants.OAuth2.ResponseParameters;
var DeviceCodeResponseParameters = constants.OAuth2.DeviceCodeResponseParameters;
var IdTokenMap = constants.OAuth2.IdTokenMap;
var TokenResponseFields = constants.TokenResponseFields;
var UserCodeResponseFields = constants.UserCodeResponseFields;
var IdTokenFields = constants.IdTokenFields;

var TOKEN_RESPONSE_MAP = {};
TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.TOKEN_TYPE] = TokenResponseFields.TOKEN_TYPE;
TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.ACCESS_TOKEN] = TokenResponseFields.ACCESS_TOKEN;
TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.REFRESH_TOKEN] = TokenResponseFields.REFRESH_TOKEN;
TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.CREATED_ON] = TokenResponseFields.CREATED_ON;
TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.EXPIRES_ON] = TokenResponseFields.EXPIRES_ON;
TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.EXPIRES_IN] = TokenResponseFields.EXPIRES_IN;
TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.RESOURCE] = TokenResponseFields.RESOURCE;
TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.ERROR] = TokenResponseFields.ERROR;
TOKEN_RESPONSE_MAP[OAuth2ResponseParameters.ERROR_DESCRIPTION] = TokenResponseFields.ERROR_DESCRIPTION;


var DEVICE_CODE_RESPONSE_MAP = {};
DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.DEVICE_CODE] = UserCodeResponseFields.DEVICE_CODE;
DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.USER_CODE] = UserCodeResponseFields.USER_CODE;
DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.VERIFICATION_URL] = UserCodeResponseFields.VERIFICATION_URL;
DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.INTERVAL] = UserCodeResponseFields.INTERVAL;
DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.EXPIRES_IN] = UserCodeResponseFields.EXPIRES_IN;
DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.MESSAGE] = UserCodeResponseFields.MESSAGE;
DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.ERROR] = UserCodeResponseFields.ERROR;
DEVICE_CODE_RESPONSE_MAP[DeviceCodeResponseParameters.ERROR_DESCRIPTION] = UserCodeResponseFields.ERROR_DESCRIPTION;

/**
 * Constructs an instances of OAuth2Client
 * @constructor
 * @private
 * @param {object} callContext Contains any context information that applies to the request.
 * @param {string|url} authority  An url that points to an authority.
 */
function OAuth2Client(callContext, authority) {
  this._aadApiVersion = authority.aadApiVersion === undefined? '1.0' : authority.aadApiVersion;
  this._tokenEndpoint = authority.tokenEndpoint;
  this._deviceCodeEndpoint = authority.deviceCodeEndpoint;

  this._log = new Logger('OAuth2Client', callContext._logContext);
  this._callContext = callContext;
  this._cancelPollingRequest = false;
}

/**
 * Constructs an OAuth 2.0 token request url.
 * @private
 * @return {URL}
 */
OAuth2Client.prototype._createTokenUrl = function () {
  var tokenUrl = url.parse(this._tokenEndpoint);

  var parameters = {};
  parameters[OAuth2Parameters.AAD_API_VERSION] = this._aadApiVersion;

  tokenUrl.search = querystring.stringify(parameters);
  return tokenUrl;
};

/**
 * Constructs the user code info request url. 
 * @private 
 * @return {URL}
 */
OAuth2Client.prototype._createDeviceCodeUrl = function () {
   var deviceCodeUrl = url.parse(this._deviceCodeEndpoint);

   var parameters = {};
   parameters[OAuth2Parameters.AAD_API_VERSION] = this._aadApiVersion;

   deviceCodeUrl.search = querystring.stringify(parameters);

   return deviceCodeUrl;
};

/**
 * @private
 * @param {object}   obj         An object in which integer values may reside.
 * @param {array}    keys        An array of strings that specify keys in which integers may need parsing.
 */
OAuth2Client.prototype._parseOptionalInts = function (obj, keys) {
  var self = this;
  keys.forEach(function(element) {
    if (_.has(obj, element)) {
      obj[element] = parseInt(obj[element], 10);
      if (isNaN(obj[element])) {
        throw self._log.createError(element + ' could not be parsed as an int.');
      }
    }
  });
};

/**
 * Parses a JWS encoded JWT into it's three parts.
 * @param  {string} jwtToken The token to parse.
 * @return {object}          The three JWS parts, header, JWSPayload, and JWSSig, or undefined.
 */
OAuth2Client.prototype._crackJwt = function(jwtToken) {
  var idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;

  var matches = idTokenPartsRegex.exec(jwtToken);
  if (!matches || matches.length < 4) {
    this._log.warn('The returned id_token is not parseable.');
    return;
  }

  var crackedToken = {
    header : matches[1],
    JWSPayload : matches[2],
    JWSSig : matches[3]
  };

  return crackedToken;
};

/**
 * Finds the value that should be used as the userId value.
 * @param {object} idToken The id token that parsed.
 * @returns {object} An object with a userId field and maybe a userIdIsDisplayable field.
 */
OAuth2Client.prototype._getUserId = function(idToken) {
  var userId;
  var isDisplayable;

  if (idToken.upn) {
    userId = idToken.upn;
    isDisplayable = true;
  } else if (idToken.email) {
    userId = idToken.email;
    isDisplayable = true;
  } else if (idToken.sub) {
    userId = idToken.sub;
  }

  if (!userId) {
    // generate a random GUID.
    userId = uuid.v4();
  }

  var userIdVals = {};
  userIdVals[IdTokenFields.USER_ID] = userId;
  if (isDisplayable) {
    userIdVals[IdTokenFields.IS_USER_ID_DISPLAYABLE] = true;
  }

  return userIdVals;
};

function mapFields(inObj, outObj, map) {
  for (var key in inObj) {
    if (map[key]) {
      var mappedKey = map[key];
      outObj[mappedKey] = inObj[key];
    }
  }
}

/**
 * Given a decoded id token off the wire, this function extracts the values that
 * ADAL commonly returns to callers and translates the names to more user
 * friendly names.
 * @param  {Object} idToken A decoded id token.
 * @return {Object}         The set of extracted values with their new names.
 */
OAuth2Client.prototype._extractIdTokenValues = function(idToken) {
  var extractedValues = {};
  _.extend(extractedValues, this._getUserId(idToken));

  mapFields(idToken, extractedValues, IdTokenMap);

  return extractedValues;
};

/**
 * Parses the value of the id_token OAuth 2 Reponse.
 * @param  {string} encodedIdToken An unencrypted JWT token.
 * @return {object}                 returns the decoded id_token or undefined.
 */
OAuth2Client.prototype._parseIdToken = function(encodedIdToken) {
  var crackedToken = this._crackJwt(encodedIdToken);
  if (!crackedToken) {
    return;
  }

  var idToken;
  try {
    var base64IdToken = crackedToken.JWSPayload;
    var base64Decoded = util.base64DecodeStringUrlSafe(base64IdToken);
    if (!base64Decoded) {
      this._log.warn('The returned id_token could not be base64 url safe decoded.');
      return;
    }

    idToken = JSON.parse(base64Decoded);
  } catch (err) {
    this._log.warn('the returned id_token could not be decoded');
    this._log.warn('The returned id_token could not be decoded: ' + err.stack, true);
    return;
  }

  return this._extractIdTokenValues(idToken);
};

/**
 * Validates the response returned from an OAuth 2.0 token request.
 * @private
 * @param  {string} body  The response as a string encoded JSON object.
 * @return {object}       The parsed response.
 */
OAuth2Client.prototype._validateTokenResponse = function (body) {
  var wireResponse;
  var tokenResponse = {};

  try {
    wireResponse = body;
  } catch(e) {
    throw new Error('The token response returned from the server is unparseable as JSON');
  }

  var intKeys = [
    OAuth2ResponseParameters.EXPIRES_ON,
    OAuth2ResponseParameters.EXPIRES_IN,
    OAuth2ResponseParameters.CREATED_ON
  ];

  this._parseOptionalInts(wireResponse, intKeys);

  if (wireResponse[OAuth2ResponseParameters.EXPIRES_IN]) {
    var expiresIn = wireResponse[OAuth2ResponseParameters.EXPIRES_IN];
    var now = new Date();
    wireResponse[OAuth2ResponseParameters.EXPIRES_ON] = now.add( { seconds : expiresIn });
  }

  if (wireResponse[OAuth2ResponseParameters.CREATED_ON]) {
    var tempDate = new Date();
    var createdOn = wireResponse[OAuth2ResponseParameters.CREATED_ON];
    tempDate.setTime(createdOn);
    wireResponse[OAuth2ResponseParameters.CREATED_ON] = tempDate;
  }

  if (!wireResponse[OAuth2ResponseParameters.TOKEN_TYPE]) {
    throw this._log.createError('wireResponse is missing token_type');
  }
  if (!wireResponse[OAuth2ResponseParameters.ACCESS_TOKEN]) {
    throw this._log.createError('wireResponse missing access_token');
  }
  
  mapFields(wireResponse, tokenResponse, TOKEN_RESPONSE_MAP);

  if (wireResponse[OAuth2ResponseParameters.ID_TOKEN]) {
    var idToken = this._parseIdToken(wireResponse[OAuth2ResponseParameters.ID_TOKEN]);
    if (idToken) {
      _.extend(tokenResponse, idToken);
    }
  }

  return tokenResponse;
};

/**
 * Validates the response returned from an OAuth 2.0 device code request.
 * @private
 * @param  {string} body  The response as a string encoded JSON object.
 * @return {object}       The parsed response.
 */
OAuth2Client.prototype._validateDeviceCodeResponse = function(body) {
   var wireResponse;
   var deviceCodeResponse = {};

   try {
     wireResponse = body;
   } catch(e) {
      throw new Error('The device code response returned from the server is unparseable as JSON.');
   }

   var intKeys = [
        DeviceCodeResponseParameters.EXPIRES_IN, 
        DeviceCodeResponseParameters.INTERVAL
   ];

   this._parseOptionalInts(wireResponse, intKeys);
  
   if (!wireResponse[DeviceCodeResponseParameters.EXPIRES_IN]){
      throw this._log.createError('wireResponse is missing expires_in');
   }

   if (!wireResponse[DeviceCodeResponseParameters.DEVICE_CODE]) {
      throw this._log.createError('wireResponse is missing device code');
   }

   if (!wireResponse[DeviceCodeResponseParameters.USER_CODE]) {
      throw this._log.createError('wireResponse is missing user code');
   }

   mapFields(wireResponse, deviceCodeResponse, DEVICE_CODE_RESPONSE_MAP);

   return deviceCodeResponse;
};

/**
 * @private
 * @param {string}                   body        The body of a http token response.
 */
OAuth2Client.prototype._handlePollingResponse = function(body) {
    //handle token error response
    var tokenResponse = this._handlePollingRequestErrorResponse(body);
    if (_.isEmpty(tokenResponse)){
       tokenResponse = this._validateTokenResponse(body);
    }

    return tokenResponse;
};

/**
 * @private
 * @param {string}                   body        The body of a http token response.
 */
OAuth2Client.prototype._handlePollingRequestErrorResponse = function(body) {
   var wireResponse;
   var tokenResponse = {};

   try {
     wireResponse = body;
   } catch (e) {
      throw new Error ('The token response returned from the server is unparsable as JSON');
   }

   if (wireResponse[OAuth2ResponseParameters.ERROR]) {
      mapFields(wireResponse, tokenResponse, TOKEN_RESPONSE_MAP);
   }

   return tokenResponse;
};

/**
 * @private
 * @param {object}                   response    An http response object.
 * @param {string}                   body        The body of a http token response.
 * @param {OAuth2Client.GetTokenCallback}    callback    A call back function.  The body parameter is the body parameter passed
 *                                               into this function.
 */
OAuth2Client.prototype._handleGetTokenResponse = function(body, callback) {
  var tokenResponse;
  try {
    tokenResponse = this._validateTokenResponse(body);
  } catch (e) {
    this._log.error('Error validating get token response', e, true);
    callback(e);
    return;
  }
  callback(null, tokenResponse);
};

OAuth2Client.prototype._handleGetDeviceCodeResponse = function(body, callback) {
   var deviceCodeResponse;
   try {
      deviceCodeResponse = this._validateDeviceCodeResponse(body);
   } catch (e) {
      this._log.error('Error validating get user code response', e, true);
      callback(e);
      return;
   }

   callback(null, deviceCodeResponse);
};

OAuth2Client.prototype._getTokenWithPolling = function (postOptions, callback) {
    var self = this;
    if (self._cancelPollingRequest === true) {
        callback(null, new Error('Polling_Request_Cancelled'));
        return;
    }

    axios(postOptions).then((response) => {
      var tokenResponse;
      util.logReturnCorrelationId(this._log, 'GetToken', response);
      try {
        tokenResponse = self._handlePollingResponse(response.data);
      } catch (e) {
        self._log.error('Error validating get token response', e, true);
        callback(null, e);
        return;
      }
      callback(null, tokenResponse);
    }).catch((error) => {
      // status >= 400: error case
      if (error.response) {
        util.logReturnCorrelationId(this._log, 'GetToken', error.response);
        // error response callback, for error response, it's already parsed as Json. 
        if (error.response && error.response.data.hasOwnProperty(TokenResponseFields.ERROR) && error.response.data[TokenResponseFields.ERROR] === 'authorization_pending') {
          callback(new Error(error.response.data[TokenResponseFields.ERROR]), error.response.data);
        }
      }
      // if there is no response from the server
      else if (error.request) {
        self._log.error('GetToken' + ' request was made but no response was received', error.request, true);
        callback(self._log.createError('No response from the server'));
      }
      // request was never made
      else if (error.message) {
        self._log.error('GetToken http get failed.' + ' request was never made, please check', error.message, true);
        callback(error.message);
      }
      // unknown error
      else {
        self._log.error('GetToken' + ' failed with unknown error', "unknown error", true);
        callback(self._log.createError('failed with an unknown error'));
      }
    });
};

OAuth2Client.prototype._createPostOption = function (postUrl, urlEncodedRequestForm) {
  
    var postOptions = util.createRequestOptions(
        this,
      {
            method : 'POST',
            url : url.format(postUrl),
            data : urlEncodedRequestForm,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            maxRedirects: 0,
            encoding: 'utf8',
        }
    );
   
    return postOptions;
};

/**
 * @callback GetTokenCallback
 * @memberOf OAuth2Client
 * @param {Error} [error] In case of an error this will hold the associated Error object.
 * @param {TokenResponse} tokenResponse Contains the parsed result of a get token request.
 */

/**
* @param {object}                           oauthParameters     An object whose keys come from
*                                                               Constants.OAuth2.Parameters
* @param {OAuth2Client.GetTokenCallback}   callback            The callback function.
*/
OAuth2Client.prototype.getToken = function(oauthParameters, callback) {
  var self = this;
  var tokenUrl = self._createTokenUrl();

  var urlEncodedTokenRequestForm = querystring.stringify(oauthParameters);
  var postOptions = self._createPostOption(tokenUrl, urlEncodedTokenRequestForm);

  axios(postOptions).then((response) => {
    util.logReturnCorrelationId(this._log, 'Get Token', response);
    // status >= 300 && < 400
    if (!util.isHttpSuccess(response.status)) {
      var returnErrorString = 'Get Token' + ' request returned http error: ' + response.status + ' and server response: ' + JSON.stringify(error.response.data);
      callback(this._log.createError(returnErrorString, true), response.data);
    }
    // Success case: status >= 200 && < 300
    self._handleGetTokenResponse(response.data, callback);
  }).catch((error) => {
    // status >= 400: error case
    if (error.response) {
      util.logReturnCorrelationId(this._log, 'Get Token', error.response);
      this._log.error('Get Token' + ' request failed with', error.response.status, true);
      var returnErrorString = 'Get Token' + ' request returned http error: ' + error.response.status + ' and server response: ' + JSON.stringify(error.response.data);
      callback(self._log.createError(returnErrorString, true), error.response.data);
    }
    // if there is no response from the server
    else if (error.request) {
      this._log.error('Get Token' + ' request was made but no response was received', error.request, true);
      callback(self._log.createError('No response from the server'));
    }
    // request was never made
    else if (error.message) {
      this._log.error('Get Token' + ' request was never made, please check', error.message, true);
      callback(error.message);
    }
    // unknown error
    else {
      self._log.error('GetToken' + ' failed with unknown error', "unknown error", true);
      callback(self._log.createError('failed with an unknown error'));
    }
  });
};

/**
 * @param {object}                          oauthParameters     An object whose keys come from
 *                                                               Constants.OAuth2.Parameters
 * @param {integer}                         refresh_interval    The interval for polling request. 
 * @param {integer}                         exipres_in          The timeout for polling request. 
 * @param {OAuth2Client.GetTokenCallback}   callback            The callback function.
 */
OAuth2Client.prototype.getTokenWithPolling = function(oauthParameters, refresh_interval, expires_in, callback){
   var self = this; 
   var maxTimesForRetry = Math.floor(expires_in / refresh_interval);
  
   var tokenUrl = self._createTokenUrl();
   var urlEncodedTokenRequestForm = querystring.stringify(oauthParameters);
   var postOptions = self._createPostOption(tokenUrl, urlEncodedTokenRequestForm);

   var optionsForRetry = {times: maxTimesForRetry, interval: refresh_interval * 1000};

   async.retry(optionsForRetry, function(retryCallback, response) {
      self._getTokenWithPolling(postOptions, retryCallback);
   }, function(err, response) {
      if (response && response instanceof Error) {
         callback(response);
         return;
      }
      else if (response && response.hasOwnProperty(DeviceCodeResponseParameters.ERROR)) {
         callback(response);
         return;
      }
      callback(err, response);
   });
};

OAuth2Client.prototype.getUserCodeInfo = function(oauthParameters, callback) {
    // for now make it as a post request
    var self = this;
    var deviceCodeUrl = self._createDeviceCodeUrl();

    var urlEncodedDeviceCodeRequestForm = querystring.stringify(oauthParameters);
    
    var postOptions = self._createPostOption(deviceCodeUrl, urlEncodedDeviceCodeRequestForm);
  
    axios(postOptions).then((response) => {
      util.logReturnCorrelationId(this._log, 'Get Device Code', response);
      // status >= 300 && < 400
      if (!util.isHttpSuccess(response.status)) {
        var returnErrorString = 'Get Device Code' + ' request returned http error: ' + response.status + ' and server response: ' + JSON.stringify(error.response.data);
        callback(this._log.createError(returnErrorString, true), response.data);
      }
      // Success case: status >= 200 && < 300
      self._handleGetDeviceCodeResponse(response.data, callback);
    }).catch((error) => {
      // status >= 400: error case
      if (error.response) {
      util.logReturnCorrelationId(this._log, 'Get Device Code', error.response);
        this._log.error('Get Device Code' + ' request failed with', error.response.status, true);
        var returnErrorString = 'Get Device Code' + ' request returned http error: ' + error.response.status + ' and server response: ' + JSON.stringify(error.response.data);
        callback(self._log.createError(returnErrorString, true), error.response.data);
      }
      // if there is no response from the server
      else if (error.request) {
        this._log.error('Get Device Code' + ' request was made but no response was received', error.request, true);
        callback(self._log.createError('No response from the server'));
      }
      // request was never made
      else if (error.message) {
        this._log.error('Get Device Code' + ' request was never made, please check', error.message, true);
        callback(error.message);
      }
      // unknown error
      else {
        self._log.error('Get Device Code' + ' failed with unknown error', "unknown error", true);
        callback(self._log.createError('failed with an unknown error'));
      }
    });
  };

/**
 * Cancel the polling request made for acquiring token by device code. 
 */
OAuth2Client.prototype.cancelPollingRequest = function() {
   this._cancelPollingRequest = true;
};

module.exports = OAuth2Client;
