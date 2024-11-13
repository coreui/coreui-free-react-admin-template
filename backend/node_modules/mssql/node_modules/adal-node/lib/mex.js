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
var url = require('url');
var DOMParser = require('@xmldom/xmldom').DOMParser;
var _ = require('underscore');
var Logger = require('./log').Logger;
var util = require('./util');

var xmlutil = require('./xmlutil');
var select = xmlutil.xpathSelect;

var Namespaces = require('./constants').XmlNamespaces;

var WSTrustVersion = require('./constants').WSTrustVersion;

/**
 * Create a new Mex object.
 * @private
 * @constructor
 * @param {object} callContext Contains any context information that applies to the request.
 * @param {string} url  The url of the mex endpoint.
 */
function Mex(callContext, url) {
  this._log = new Logger('MEX', callContext._logContext);
  this._callContext = callContext;
  this._url = url;
  this._dom = null;
  this._mexDoc = null;
  this._usernamePasswordPolicy = {};
  this._log.verbose('Mex created');
  this._log.verbose('Mex created with url: ' + url, true);
}

/**
* Returns the policy containing IDP url and wstrust version from which a username passwowrd can be exchanged for a token.
* @instance
* @memberOf Mex
* @name usernamePasswordPolicy
*/
Object.defineProperty(Mex.prototype, 'usernamePasswordPolicy', {
  get: function() {
    return this._usernamePasswordPolicy;
  }
});

/**
* @callback DiscoverCallback
* @memberOf Mex
* @param {object} error
*/

/**
* Performs Mex discovery.  This method will retrieve the mex document, parse it, and extract
* the username password ws-trust endpoint.
* @private
* @param {Mex.DiscoverCallback}  callback  Called when discover is complete.
*/
Mex.prototype.discover = function (callback) {
  this._log.verbose('Retrieving mex');
  this._log.verbose('Retrieving mex at: ' + this._url);
  var self = this;
  var options = util.createRequestOptions(self, { headers: { 'Content-Type': 'application/soap+xml' } });
  axios.get(this._url, options).then((response) => {
    util.logReturnCorrelationId(this._log, 'Mex Get', response);

    // status >= 300 && < 400
    if (!util.isHttpSuccess(response.status)) {
      var returnErrorString = 'Mex Get' + ' request returned http error: ' + response.status + ' and server response: ' + response.status;;
      callback(this._log.createError(returnErrorString, true), response.data);
    }

    // Success case: status >= 200 && < 300
    try {
        self._mexDoc = response.data;
        var options = {
          errorHandler : self._log.error
        };
        self._dom = new DOMParser(options).parseFromString(self._mexDoc);
        self._parse(callback);
        return;
      } catch (err) {
        self._log.error('Failed to parse mex response in to DOM', err, true);
        callback(err);
      }
  }).catch((error) => {
    // status >= 400: error case
    if (error.response) {
      this._log.error('Mex Get' + ' request failed with', error.response.status, true);
      util.logReturnCorrelationId(this._log, 'Mex Get', error.response);
      var returnErrorString = 'Mex Get' + ' request returned http error: ' + error.response.status + ' and server response: ' + JSON.stringify(error.response.data);;
      callback(self._log.createError(returnErrorString, true), error.response.data);
    }
    // if there is no response from the server
    else if (error.request) {
      this._log.error('Mex Get' + ' request was made but no response was received', error.request, true);
      callback(self._log.createError('No response from the server'));
    }
    // request was never made
    else {
      this._log.error('Mex Get' + ' request was never made, please check', error.message, true);
      callback(error.message);
    }
  });
};

var TRANSPORT_BINDING_XPATH = 'wsp:ExactlyOne/wsp:All/sp:TransportBinding';
var TRANSPORT_BINDING_2005_XPATH = 'wsp:ExactlyOne/wsp:All/sp2005:TransportBinding';
/**
* Checks a DOM policy node that is a potentialy appplicable username password policy
* to ensure that it has the correct transport.
* @private
* @param {object} policyNode  The policy node to check.
* @returns {string} If the policy matches the desired transport then the id of the policy is returned.
*                   If not then null is returned.
*/
Mex.prototype._checkPolicy = function(policyNode) {
  var policyId = null;
  var id = policyNode.getAttributeNS(Namespaces.wsu, 'Id');
  var transportBindingNodes = select(policyNode, TRANSPORT_BINDING_XPATH);
  if (0 === transportBindingNodes.length) {
    transportBindingNodes = select(policyNode, TRANSPORT_BINDING_2005_XPATH);
  }
  if (0 !== transportBindingNodes.length) {
    if (id) {
      policyId = id;
    }
  }
  if (policyId) {
    this._log.verbose('found matching policy id');
    this._log.verbose('found matching policy id: ' + policyId, true);
  } else {
    if (!id) {
      id = '<no id>';
    }
    this._log.verbose('potential policy did not match required transport binding');
    this._log.verbose('potential policy did not match required transport binding: ' + id, true);
  }
  return policyId;
};

/**
* Finds all username password policies within the mex document.
* @private
* @param xpath The xpath expression for selecting username token nodes. 
* @returns {object} A map object that contains objects containing the id of username password polices.
*/
Mex.prototype._selectUsernamePasswordPolicies = function(xpath) {
  var policies = {};
  var usernameTokenNodes = select(this._dom, xpath);
  if (!usernameTokenNodes.length) {
    this._log.warn('no username token policy nodes found');
    return;
  }
  for (var i=0; i < usernameTokenNodes.length; i++) {
    var policyNode = usernameTokenNodes[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var id = this._checkPolicy(policyNode);
    if (id) {
      var idRef = '#' + id;
      policies[idRef] = { id : idRef };
    }
  }
  return _.isEmpty(policies) ? null : policies;
};

var SOAP_ACTION_XPATH = 'wsdl:operation/soap12:operation/@soapAction';
var RST_SOAP_ACTION_13 = 'http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue';
var RST_SOAP_ACTION_2005 = 'http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue';
var SOAP_TRANSPORT_XPATH = 'soap12:binding/@transport';
var SOAP_HTTP_TRANSPORT_VALUE = 'http://schemas.xmlsoap.org/soap/http';
/**
* Given a DOM binding node determines whether it matches the correct soap action and transport.
* @private
* @param {object} bindingNode   The DOM node to check.
* @returns {bool}
*/
Mex.prototype._checkSoapActionAndTransport = function(bindingNode) {
  var soapTransportAttributes;
  var soapAction;
  var soapTransport;
  var bindingName = bindingNode.getAttribute('name');
  var soapActionAttributes = select(bindingNode, SOAP_ACTION_XPATH);
  if (soapActionAttributes.length) {
    soapAction = soapActionAttributes[0].value;
    soapTransportAttributes = select(bindingNode, SOAP_TRANSPORT_XPATH);
  }
  if (soapTransportAttributes.length) {
    soapTransport = soapTransportAttributes[0].value;
  }

  if (soapTransport === SOAP_HTTP_TRANSPORT_VALUE) {
    if (soapAction === RST_SOAP_ACTION_13) {
      this._log.verbose('foud binding matching Action and Transport: ' + bindingName);
      return WSTrustVersion.WSTRUST13;
    }
    else if (soapAction === RST_SOAP_ACTION_2005) {
      this._log.verbose('found binding matching Action and Transport: ' + bindingName);
      return WSTrustVersion.WSTRUST2005;
    }
  }

  this._log.verbose('binding node did not match soap Action or Transport: ' + bindingName);
  return WSTrustVersion.UNDEFINED;
};

/**
* Given a map with policy id keys, finds the bindings in the mex document that are linked to thos policies.
* @private
* @param {object}   policies  A map with policy id keys.
* @returns {object} a map of bindings id's to policy id's.
*/
Mex.prototype._getMatchingBindings = function(policies) {
  var bindings = {};
  var bindingPolicyRefNodes = select(this._dom, '//wsdl:definitions/wsdl:binding/wsp:PolicyReference');
  for (var i=0; i < bindingPolicyRefNodes.length; i++) {
    var node = bindingPolicyRefNodes[i];
    var uri = node.getAttribute('URI');
    var policy = policies[uri];
    if (policy) {
      var bindingNode = node.parentNode;
      var bindingName = bindingNode.getAttribute('name');
      var version = this._checkSoapActionAndTransport(bindingNode);
      if (version !== WSTrustVersion.UNDEFINED) {
         var bindingPolicy = {};
         bindingPolicy.url = uri;
         bindingPolicy.version = version;

         bindings[bindingName] = bindingPolicy;
      }
    }
  }
  return _.isEmpty(bindings) ? null : bindings;
};

/**
* Ensures that a url points to an SSL endpoint.
* @private
* @param {string} endpointUrl   The url to check.
* @returns {bool}
*/
Mex.prototype._urlIsSecure = function(endpointUrl) {
  var parsedUrl = url.parse(endpointUrl);
  return parsedUrl.protocol === 'https:';
};

var PORT_XPATH = '//wsdl:definitions/wsdl:service/wsdl:port';
var ADDRESS_XPATH = 'wsa10:EndpointReference/wsa10:Address';
/**
* Finds all of the wsdl ports in the mex document that are associated with username password policies.  Augments
* the passed in bindings with the endpoint url of the correct port.
* @private
* @param {object} bindings  A map of binding id's to policy id's.
*/
Mex.prototype._getPortsForPolicyBindings = function(bindings, policies) {
  var portNodes = select(this._dom, PORT_XPATH);
  if (0 === portNodes.length) {
    this._log.warning('no ports found');
  }
  for (var i=0; i < portNodes.length; i++) {
    var portNode = portNodes[i];
    var bindingId = portNode.getAttribute('binding');

    // Clear any prefix
    var bindingIdParts = bindingId.split(':');
    bindingId = bindingIdParts[bindingIdParts.length - 1];

    var trustPolicy = bindings[bindingId];
    if (trustPolicy) {
      var bindingPolicy = policies[trustPolicy.url];

      if (bindingPolicy && !bindingPolicy.url) {
        bindingPolicy.version = trustPolicy.version;
        var addressNode = select(portNode, ADDRESS_XPATH);
        if (0 === addressNode) {
          throw this._log.createError('no address nodes on port.');
        }
        var address = xmlutil.findElementText(addressNode[0]);
        if (this._urlIsSecure(address)) {
          bindingPolicy.url = address;
        } else {
          this._log.warn('skipping insecure endpoint: ' + address);
        }
      }
    }
  }
};

/**
* Given a list of username password policies chooses one of them at random as the policy chosen by this Mex instance.
* @private
* @param {object} policies  A map of policy id's to an object containing username password ws-trust endpoint addresses.
*/
Mex.prototype._selectSingleMatchingPolicy = function(policies) {
  // if both wstrust13 and wstrust2005 policy exists, then choose wstrust13, otherwise choose whatever exists.
  var matchingPolicies = _.filter(policies, function(policy) { return policy.url ? true : false; });
  if (!matchingPolicies) {
    this._log.warn('no policies found with an url');
    return;
  }

  var wstrust13Policy = null, wstrust2005Policy = null;
  for(var i = 0; i < matchingPolicies.length; ++i) {
    var matchingPolicy = matchingPolicies[i];
    if (WSTrustVersion.WSTRUST13 === matchingPolicy.version) {
      wstrust13Policy = matchingPolicy;
    }
    else if (WSTrustVersion.WSTRUST2005 === matchingPolicy.version) {
      wstrust2005Policy = matchingPolicy;
    }
  }

  if (!wstrust13Policy && !wstrust2005Policy) {
    this._log.warn('no policies found with an url');
    this._usernamePasswordPolicy = null;
    return;
  }

  this._usernamePasswordPolicy = wstrust13Policy ? wstrust13Policy : wstrust2005Policy;
};

/**
* Parses the mex document previously retrieved.
* @private
* @param {Mex.DiscoverCallback} callback
*/
Mex.prototype._parse = function(callback) {
  var self = this;
  var xpathExpression = '//wsdl:definitions/wsp:Policy/wsp:ExactlyOne/wsp:All/sp:SignedEncryptedSupportingTokens/wsp:Policy/sp:UsernameToken/wsp:Policy/sp:WssUsernameToken10'; 
  var policies = self._selectUsernamePasswordPolicies(xpathExpression);

  xpathExpression = '//wsdl:definitions/wsp:Policy/wsp:ExactlyOne/wsp:All/sp2005:SignedSupportingTokens/wsp:Policy/sp2005:UsernameToken/wsp:Policy/sp2005:WssUsernameToken10';

  if (policies) {
    _.extend(policies, self._selectUsernamePasswordPolicies(xpathExpression));
  }
  else {
    policies = self._selectUsernamePasswordPolicies(xpathExpression);
  }

  if (!policies) {
    callback(self._log.createError('No matching policies'));
    return;
  }
  var bindings = self._getMatchingBindings(policies);
  if (!bindings) {
    callback(self._log.createError('No matching bindings'));
    return;
  }
  self._getPortsForPolicyBindings(bindings, policies);
  self._selectSingleMatchingPolicy(policies);
  var err = this._url ? undefined : this._log.createError('No ws-trust endpoints match requirements.');
  callback(err);
};

module.exports = Mex;
