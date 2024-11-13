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
var adalIdConstants = require('./constants').AdalIdParameters;
var os = require('os');
var url = require('url');

var ADAL_VERSION;

/**
 * @namespace  Util
 * @private
 */

function loadAdalVersion() {
  ADAL_VERSION = require('../package.json').version;
}

function adalInit() {
  loadAdalVersion();
}

/**
 * @static
 * @memberOf Util
 * @param {string|int}   statusCode  An HTTP status code.
 */
function isHttpSuccess(statusCode) {
  return statusCode >= 200 && statusCode < 300;
}

function addDefaultRequestHeaders (self, options) {
  if (!options.headers) {
    options.headers = {};
  }
  var headers = options.headers;
  if (!headers['Accept-Charset']) {
    headers['Accept-Charset'] = 'utf-8';
  }
  headers['client-request-id'] = self._callContext._logContext.correlationId;
  headers['return-client-request-id'] = 'true';

  // ADAL Id headers
  headers[adalIdConstants.SKU] = adalIdConstants.NODE_SKU;
  headers[adalIdConstants.VERSION] = ADAL_VERSION;
  headers[adalIdConstants.OS] = os.platform();
  headers[adalIdConstants.CPU] = os.arch();
}

/**
* Central place for housing default request options.  This is a place holder
* for when SSL validation is implemented an all requests are subject to that
* policy.
* @static
* @memberOf Util
* @param {object} options   A set of options that will be merged with teh default options
*                           These will override any default options.
* @returns {object}         Returns the merged options.
*/
function createRequestOptions(self, options) {
  var defaultOptions = {}; //{ strictSSL : true };
  var mergedOptions = defaultOptions;
  if (options) {
    _.extend(mergedOptions, options);
  }
  if (self._callContext.options && self._callContext.options.http) {
    _.extend(mergedOptions, self._callContext.options.http);
  }

  addDefaultRequestHeaders(self, mergedOptions);
  return mergedOptions;
}

function logReturnCorrelationId(log, operationMessage, response) {
  if (response && response.headers && response.headers['client-request-id']) {
    log.info(operationMessage + 'Server returned this correlationId: ' + response.headers['client-request-id'], true);
  }
}

/**
* Creates a function that can be used as the callback for http request operations.  This is meant
* to centralize error handling in one place.
* @static
* @memberOf Util
* @param {string} operationMessage  A message to be prepended to logged error strings.  This should be something like 'Mex Request'
*                                   and summarize the purpose of the http request.
* @param {object} log               A Logger object being used by the calling component.
* @param {Util.CreateRequestHandlerErrorCallback}    errorCallback   Called in the event of an error.
* @param {Util.CreateRequestHandlerSuccessCallabck}  successCallback Called on successfull completion of the request.
*/
function createRequestHandler(operationMessage, log, errorCallback, successCallback) {
  return function(err, response, body) {
    logReturnCorrelationId(log, operationMessage, response);
    if (err) {
      log.error(operationMessage + ' request failed with', err, true);
      errorCallback(err);
      return;
    }
    if (!isHttpSuccess(response.statusCode)) {
      var returnErrorString = operationMessage + ' request returned http error: ' + response.statusCode;
      var errorResponse;
      if (body) {
        returnErrorString += ' and server response: ' + body;
        try {
          errorResponse = JSON.parse(body);
        } catch (e) {
          // No problem if it doesn't parse.
        }
      }
      errorCallback(log.createError(returnErrorString, true), errorResponse);
      return;
    }

    successCallback(response, body);
  };
}

/**
* @callback CreateRequestHandlerErrorCallback
* @memberOf Util
* @param {Error}  error  An error object.
*/

/**
* @callback CreateRequestHandlerSuccessCallabck
* @memberOf Util
* @param {object} response    The response object returned from request.
* @param {string} body        The body of the http response.
*/

/**
* Deep copies a url object.
* @static
* @memberOf Util
* @param {URL} urlSource   The source url object to copy.
* @returns {URL}           A deep copy of sourceUrl.
*/
function copyUrl(urlSource) {
  return url.parse(url.format(urlSource));
}

function convertUrlSafeToRegularBase64EncodedString(str) {
  return str.replace(/-/g, '+').replace(/_/g, '/');
}

function convertRegularToUrlSafeBase64EncodedString(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64DecodeStringUrlSafe(str) {
  var base64 = convertUrlSafeToRegularBase64EncodedString(str);
  return (new Buffer(base64, 'base64')).toString('utf8');
}

function base64EncodeStringUrlSafe(str) {
  var base64 = (new Buffer(str, 'utf8').toString('base64'));
  var converted = convertRegularToUrlSafeBase64EncodedString(base64);
  return converted;
}

module.exports.adalInit = adalInit;
module.exports.isHttpSuccess = isHttpSuccess;
module.exports.createRequestHandler = createRequestHandler;
module.exports.createRequestOptions = createRequestOptions;
module.exports.copyUrl = copyUrl;
module.exports.base64DecodeStringUrlSafe = base64DecodeStringUrlSafe;
module.exports.base64EncodeStringUrlSafe = base64EncodeStringUrlSafe;
module.exports.convertRegularToUrlSafeBase64EncodedString = convertRegularToUrlSafeBase64EncodedString;