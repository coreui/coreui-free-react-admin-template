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

var axios = require('axios');
var argument = require('./argument');
var log = require('./log');
var util = require('./util');
var HttpErrorCode = require('./constants').HttpError;

/*
 * Constants
 */
var consts = {
  AUTHORIZATION_URI : 'authorization_uri',
  RESOURCE : 'resource',
  WWW_AUTHENTICATE_HEADER : 'www-authenticate'
};

/**
 * The AuthenticationParameters class holds the parameters that are parsed from an OAuth challenge
 * in the www-authenticate header.
 * @constructor
 * @param {string} authorizationUri The URI of an authority that can issues tokens for the
 *                                  resource that issued the challenge.
 * @param {string} resource         The resource for a which a token should be requested from the authority.
 */
function AuthenticationParameters(authorizationUri, resource) {
  this._authorizationUri = authorizationUri;
  this._resource = resource;
}

/**
 * The URI of an authority that can issues tokens for the resource that issued the challenge.
 * @instance
 * @memberOf AuthenticationParameters
 * @type {string}
 * @name authorizationUri
 */
Object.defineProperty(AuthenticationParameters.prototype, 'authorizationUri', {
  get : function() {
    return this._authorizationUri;
  }
});

/**
 * The resource for a which a token should be requested from the authority.
 * This property may be undefined if the resource was not returned in the challenge.
 * @instance
 * @memberOf AuthenticationParameters
 * @type {string}
 * @name authorizationUri
 */
Object.defineProperty(AuthenticationParameters.prototype, 'resource', {
  get : function() {
    return this._resource;
  }
});

var exports = {};

// The 401 challenge is a standard defined in RFC6750, which is based in part on RFC2617.
// The challenge has the following form.
// WWW-Authenticate : Bearer authorization_uri="https://login.windows.net/mytenant.com/oauth2/authorize",Resource_id="00000002-0000-0000-c000-000000000000"

// This regex is used to validate the structure of the challenge header.
// Match whole structure: ^\s*Bearer\s+([^,\s="]+?)="([^"]*?)"\s*(,\s*([^,\s="]+?)="([^"]*?)"\s*)*$
// ^                        Start at the beginning of the string.
// \s*Bearer\s+             Match 'Bearer' surrounded by one or more amount of whitespace.
// ([^,\s="]+?)             This cpatures the key which is composed of any characters except comma, whitespace or a quotes.
// =                        Match the = sign.
// "([^"]*?)"               Captures the value can be any number of non quote characters.  At this point only the first key value pair as been captured.
// \s*                      There can be any amount of white space after the first key value pair.
// (                        Start a capture group to retrieve the rest of the key value pairs that are separated by commas.
//    \s*                   There can be any amount of whitespace before the comma.
//    ,                     There must be a comma.
//    \s*                   There can be any amount of whitespace after the comma.
//    (([^,\s="]+?)         This will capture the key that comes after the comma.  It's made of a series of any character excpet comma, whitespace or quotes.
//    =                     Match the equal sign between the key and value.
//    "                     Match the opening quote of the value.
//    ([^"]*?)              This will capture the value which can be any number of non quote characters.
//    "                     Match the values closing quote.
//    \s*                   There can be any amount of whitespace before the next comma.
// )*                       Close the capture group for key value pairs.  There can be any number of these.
// $                      The rest of the string can be whitespace but nothing else up to the end of the string.
//
//
// In other some other languages the regex above would be all that was needed. However, in JavaScript the RegExp object does not
// return all of the captures in one go.  So the regex above needs to be broken up so that captures can be retrieved
// iteratively.
//

function parseChallenge(challenge) {
  // This regex checks the structure of the whole challenge header.  The complete
  // header needs to be checked for validity before we can be certain that
  // we will succeed in pulling out the individual parts.
  var bearerChallengeStructureValidation = /^\s*Bearer\s+([^,\s="]+?)="([^"]*?)"\s*(,\s*([^,\s="]+?)="([^"]*?)"\s*)*$/;

  // This regex pulls out the key and value from the very first pair.
  var firstKeyValuePairRegex = /^\s*Bearer\s+([^,\s="]+?)="([^"]*?)"\s*/;

  // This regex is used to pull out all of the key value pairs after the first one.
  // All of these begin with a comma.
  var allOtherKeyValuePairRegex = /(?:,\s*([^,\s="]+?)="([^"]*?)"\s*)/g;


  if (!bearerChallengeStructureValidation.test(challenge)) {
    throw new Error('The challenge is not parseable as an RFC6750 OAuth2 challenge');
  }

  var challengeParameters = {};
  for(var match = firstKeyValuePairRegex.exec(challenge);
      match;
      match = allOtherKeyValuePairRegex.exec(challenge)) {

    challengeParameters[match[1]] = match[2];
  }

  return challengeParameters;
}

exports.AuthenticationParameters = AuthenticationParameters;

/**
 * Creates an {@link AuthenticationParameters} object from the contents of a
 * www-authenticate header received from a HTTP 401 response from a resource server.
 * @param  {string} challenge The content fo the www-authenticate header.
 * @return {AuthenticationParameters}           An AuthenticationParameters object containing the parsed values from the header.
 */
exports.createAuthenticationParametersFromHeader = function(challenge) {
  argument.validateStringParameter(challenge, 'challenge');

  var challengeParameters = parseChallenge(challenge);

  var authorizationUri = challengeParameters[consts.AUTHORIZATION_URI];
  if (!authorizationUri) {
    throw new Error('Could not find \'authorization_uri\' in challenge header.');
  }

  var resource = challengeParameters[consts.RESOURCE];

  return new AuthenticationParameters(authorizationUri, resource);
};

/**
 * Create an {@link AuthenticationParameters} object from a node http.IncomingMessage
 * object that was created as a result of a request to a resource server.  This function
 * expects the response to contain a HTTP 401 error code with a www-authenticate
 * header.
 * @param  {http.IncomingMessage} response A response from a http request to a resource server.
 * @return {AuthenticationParameters}
 */
exports.createAuthenticationParametersFromResponse = function(response) {
  if (!response) {
    throw new Error('Mising required parameter: response');
  }

  if (!response.status) {
    throw new Error('The response parameter does not have the expected HTTP status field');
  }

  if (HttpErrorCode.UNAUTHORIZED !== response.status) {
    throw new Error('The response status code does not correspond to an OAuth challenge.  ' +
      'The status is expected to be 401 but is: ' + response.status);
  }

  if (!response.headers) {
    throw new Error('There were no headers found in the response.');
  }

  var challenge = response.headers[consts.WWW_AUTHENTICATE_HEADER];
  if (!challenge) {
    throw new Error('The response does not contain a WWW-Authenticate header that can be used to determine the authority_uri and resource.');
  }

  return exports.createAuthenticationParametersFromHeader(challenge);
};

function validateUrlObject(url) {
  if (!url || !url.href) {
    throw new Error('Parameter is of wrong type: url');
  }
}

/**
 * This is the callback that is passed to all acquireToken variants below.
 * @callback CreateAuthenticationParametersCallback
 * @memberOf AuthenticationContext
 * @param {Error}  [error]           If the request fails this parameter will contain an Error object.
 * @param {AuthenticationParameters} [parameters]   On a succesful request returns a {@link AuthenticationParameters}.
 */

/**
 * Creates an {@link AuthenticationParameters} object by sending a get request
 * to the url passed to this function, and parsing the resulting http 401
 * response.
 * @param  {string|url}               url               The url of a resource server.
 * @param  {AuthenticationParameters} callback          Called on error or request completion.
 * @param  {string}                   [correlationId]   An optional correlationId to pass along with the request and to include in any logs.
 */
exports.createAuthenticationParametersFromUrl = function(url, callback, correlationId) {
  argument.validateCallbackType(callback);
  try {
    if (!url) {
      callback(new Error('Missing required parameter: url'));
      return;
    }
    var challengeUrl;
    if ('string' === typeof(url)) {
      challengeUrl = url;
    } else {
      validateUrlObject(url);
      challengeUrl = url.href;
    }

    var logContext = log.createLogContext(correlationId);
    var logger = new log.Logger('AuthenticationParameters', logContext);

    logger.verbose('Attempting to retrieve authentication parameters');
    logger.verbose('Attempting to retrieve authentication parameters from: ' + challengeUrl, true);
    var options = util.createRequestOptions({ _callContext: { _logContext: logContext } });
    
    axios.get(challengeUrl, options).then((response) => {
      util.logReturnCorrelationId(logger, "Authentication Parameters", response);
      var parameters;
      try {
        parameters = exports.createAuthenticationParametersFromResponse(response);
      } catch (creationErr) {
        logger.error('Unable to parse response in to authentication parameters.', creationErr, true);
        callback(creationErr);
      }
      callback(null, parameters);
    }).catch((error) => {
      // status >= 400: error case
      if (error.response) {        
        var parameters;
        util.logReturnCorrelationId(logger, "Authentication Parameters", error.response);
        try {
          parameters = exports.createAuthenticationParametersFromResponse(error.response);
        } catch (creationErr) {
          logger.error('Unable to parse response in to authentication parameters.', creationErr, true);
          callback(creationErr);
          return;
        }
        callback(null, parameters);
      }
      // if there is no response from the server
      else if (error.request) {
        logger.error('AuthenticationParameters' + ' request was made but no response was received', error.request, true);
        callback(logger.createError('No response from the server'));
      }
      // request was never made
      else {
        logger.error('AuthenticationParameters http get failed.' + ' request was never made, please check', error.message, true);
        callback(error.message);
      }
    })
  } catch(err) {
    callback(err);
    return;
  }
};

module.exports = exports;