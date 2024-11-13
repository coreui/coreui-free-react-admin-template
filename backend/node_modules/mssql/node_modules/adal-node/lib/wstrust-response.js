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

var xmldom = require('@xmldom/xmldom');

var xmlutil = require('./xmlutil');

var Logger = require('./log').Logger;

var WSTrustVersion = require('./constants').WSTrustVersion;

var select = xmlutil.xpathSelect;
var DOMParser = xmldom.DOMParser;

// A regular expression for finding the SAML Assertion in an RSTR.  Used to remove the SAML
// assertion when logging the RSTR.
var assertionRegEx = /RequestedSecurityToken.*?((<.*?:Assertion.*?>).*<\/.*?Assertion>).*?/;

/**
 * Creates a log message that contains the RSTR scrubbed of the actual SAML assertion.
 * @private
 * @return {string} A log message.
 */
function scrubRSTRLogMessage(RSTR) {
  var scrubbedRSTR = null;

  var singleLineRSTR = RSTR.replace(/(\r\n|\n|\r)/gm,'');

  var matchResult = assertionRegEx.exec(singleLineRSTR);
  if (null === matchResult) {
    // No Assertion was matched so just return the RSTR as is.
    scrubbedRSTR = singleLineRSTR;
  } else {
    var samlAssertion = matchResult[1];
    var samlAssertionStartTag = matchResult[2];

    scrubbedRSTR = singleLineRSTR.replace(samlAssertion, samlAssertionStartTag + 'ASSERTION CONTENTS REDACTED</saml:Assertion>');
  }

  return 'RSTR Response: ' + scrubbedRSTR;
}

/**
 * Creates a new WSTrustResponse instance.
 * @constructor
 * @private
 * @param {object} callContext Contains any context information that applies to the request.
 * @param {string} response   A soap response from a WS-Trust request.
 * @param {sting}  wstrustVersion The version for the WS-Trust request. 
 */
function WSTrustResponse(callContext, response, wstrustVersion) {
  this._log = new Logger('WSTrustResponse', callContext._logContext);
  this._callContext = callContext;
  this._response = response;
  this._dom = null;
  this._errorCode = null;
  this._faultMessage = null;
  this._tokenType = null;
  this._token = null;
  this._wstrustVersion = wstrustVersion;

  this._log.verbose(function(){return scrubRSTRLogMessage(response);});
}

/**
 * If the soap response contained a soap fault then this property will contain the fault
 * error code.  Otherwise it will return null
 * @instance
 * @type {string}
 * @memberOf WSTrustResponse
 * @name errorCode
 */
Object.defineProperty(WSTrustResponse.prototype, 'errorCode', {
  get: function() {
    return this._errorCode;
  }
});

/**
 * @property {string} FaultMessage If the soap resopnse contained a soap fault with a fault message then it will
 * be returned by this property.
 * @instance
 * @type {string}
 * @memberOf WSTrustResponse
 * @name faultMessage
 */
Object.defineProperty(WSTrustResponse.prototype, 'faultMessage', {
  get: function() {
    return this._faultMessage;
  }
});

/**
 * @property {string} TokenType If the soap resonse contained a token then this property will contain
 * the token type uri
 * @instance
 * @type {string}
 * @memberOf WSTrustResponse
 * @name tokenType
 */
Object.defineProperty(WSTrustResponse.prototype, 'tokenType', {
  get: function() {
    return this._tokenType;
  }
});

/**
 * @property {string} Token If the soap response contained a token then this property will hold that token.
 * @instance
 * @type {string}
 * @memberOf WSTrustResponse
 * @name token
 */
Object.defineProperty(WSTrustResponse.prototype, 'token', {
  get: function() {
    return this._token;
  }
});

    // Sample error message
    //<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
    //   <s:Header>
    //    <a:Action s:mustUnderstand="1">http://www.w3.org/2005/08/addressing/soap/fault</a:Action>
    //  - <o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
    //      <u:Timestamp u:Id="_0">
    //      <u:Created>2013-07-30T00:32:21.989Z</u:Created>
    //      <u:Expires>2013-07-30T00:37:21.989Z</u:Expires>
    //      </u:Timestamp>
    //    </o:Security>
    //    </s:Header>
    //  <s:Body>
    //    <s:Fault>
    //      <s:Code>
    //        <s:Value>s:Sender</s:Value>
    //        <s:Subcode>
    //        <s:Value xmlns:a="http://docs.oasis-open.org/ws-sx/ws-trust/200512">a:RequestFailed</s:Value>
    //        </s:Subcode>
    //      </s:Code>
    //      <s:Reason>
    //      <s:Text xml:lang="en-US">MSIS3127: The specified request failed.</s:Text>
    //      </s:Reason>
    //    </s:Fault>
    // </s:Body>
    //</s:Envelope>

/**
 * Attempts to parse an error from the soap response.  If there is one then it
 * will fill in the error related properties.  Otherwsie it will do nothing.
 * @private
 * @returns {bool} true if an error was found and parsed in the response.
 */
WSTrustResponse.prototype._parseError = function() {
  var errorFound = false;

  var faultNode = select(this._dom, '//s:Envelope/s:Body/s:Fault/s:Reason');
  if (faultNode.length) {
    this._faultMessage = xmlutil.serializeNodeChildren(faultNode[0]);

    if (this._faultMessage) {
      errorFound = true;
    }
  }

  // Subcode has minoccurs=0 and maxoccurs=1(default) according to the http://www.w3.org/2003/05/soap-envelope
  // Subcode may have another subcode as well. This is only targetting at top level subcode.
  // Subcode value may have different messages not always uses http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd.
  // text inside the value is not possible to select without prefix, so substring is necessary
  var subcodeNode = select(this._dom, '//s:Envelope/s:Body/s:Fault/s:Code/s:Subcode/s:Value');
  if (1 < subcodeNode.length) {
    throw this._log.createError('Found too many fault code values:' + subcodeNode.length);
  }

  if (subcodeNode.length) {
    var errorCode = subcodeNode[0].firstChild.data;
    this._errorCode = (errorCode.split(':'))[1];
    errorFound = true;
  }

  return errorFound;
};

/**
 * Attempts to parse a token from the soap response.  If there is one then it will fill in the
 * token related properties.  Otherwise it does nothing.
 * @private
 * @throws {Error} If the response is not parseable, or too many tokens are found.
 */
WSTrustResponse.prototype._parseToken = function() {
  var xPath = this._wstrustVersion === WSTrustVersion.WSTRUST2005 ? '//s:Envelope/s:Body/t:RequestSecurityTokenResponse/t:TokenType' : '//s:Envelope/s:Body/wst:RequestSecurityTokenResponseCollection/wst:RequestSecurityTokenResponse/wst:TokenType';

  var tokenTypeNodes = select(this._dom, xPath);
  if (!tokenTypeNodes.length) {
    this._log.warn('No TokenType elements found in RSTR');
  }

  for (var i = 0, length = tokenTypeNodes.length; i < length; i++) {
    if (this._token) {
      this._log.warn('Found more than one returned token.  Using the first.');
      break;
    }

    var tokenTypeNode = tokenTypeNodes[i];
    var tokenType = xmlutil.findElementText(tokenTypeNode);
    if (!tokenType) {
      this._log.warn('Could not find token type in RSTR token');
    }

    var securityTokenPath = this._wstrustVersion === WSTrustVersion.WSTRUST2005 ? 't:RequestedSecurityToken' : 'wst:RequestedSecurityToken';
    var requestedTokenNode = select(tokenTypeNode.parentNode, securityTokenPath);
    if (1 < requestedTokenNode) {
      throw this._log.createError('Found too many RequestedSecurityToken nodes for token type: ' + tokenType);
    }
    if (!requestedTokenNode.length) {
      this._log.warn('Unable to find RequestsSecurityToken element associated with TokenType element: ' + tokenType);
      continue;
    }

    var token = xmlutil.serializeNodeChildren(requestedTokenNode[0]);
    if (!token) {
      this._log.warn('Unable to find token associated with TokenType element: ' + tokenType);
      continue;
    }

    this._token = token;
    this._tokenType = tokenType;

    this._log.info('Found token of type: ' + this._tokenType);
  }

  if (!this._token) {
    throw this._log.createError('Unable to find any tokens in RSTR.');
  }
};

/**
 * This method parses the soap response that was passed in at construction.
 * @throws {Error} If the server returned an error, or there was any failure to parse the response.
 */
WSTrustResponse.prototype.parse = function() {
  if (!this._response) {
    throw this._log.createError('Received empty RSTR response body.');
  }

  try {
    try {
      var options = {
        errorHandler : this._log.error
      };
      this._dom = new DOMParser(options).parseFromString(this._response);
    } catch (err) {
      throw this._log.createError('Failed to parse RSTR in to DOM', err, true);
    }

    var errorFound = this._parseError();

    if (errorFound) {
      var stringErrorCode = this.ErrorCode || 'NONE';
      var stringFaultMessage = this.FaultMessage || 'NONE';
      throw this._log.createError('Server returned error in RSTR - ErrorCode: ' + stringErrorCode + ' : FaultMessage: ' + stringFaultMessage, true);
    }

    this._parseToken();
  } catch (err) {
    delete this._dom;
    throw err;
  }
};

module.exports = WSTrustResponse;
