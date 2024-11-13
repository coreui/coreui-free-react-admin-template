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
var select = require('xpath.js');
var XMLSerializer = require('@xmldom/xmldom').XMLSerializer;

var constants = require('./constants');

/**
 * @namespace XmlUtil
 * @private
 */

var XPATH_PATH_TEMPLATE = '*[local-name() = \'LOCAL_NAME\' and namespace-uri() = \'NAMESPACE\']';
/**
* The xpath implementation being used does not have a way of matching expanded namespace.
* This method takes an xpath query and expands all of the namespaces involved.  It then
* re-writes the query in to a longer form that directory matches the correct namespaces.
* @private
* @static
* @memberOf XmlUtil
* @param {string} xpath   The expath query string to expand.
* @returns {string} An expanded xpath query.
*/
function expandQNames(xpath) {
  var namespaces = constants.XmlNamespaces;
  var pathParts = xpath.split('/');
  for (var i=0; i < pathParts.length; i++) {
    if (pathParts[i].indexOf(':') !== -1) {
      var QNameParts = pathParts[i].split(':');
      if (QNameParts.length !== 2) {
        throw new Error('Unable to parse XPath string : ' + xpath + ' : with QName : ' + pathParts[i]);
      }
      var expandedPath = XPATH_PATH_TEMPLATE.replace('LOCAL_NAME', QNameParts[1]);
      expandedPath = expandedPath.replace('NAMESPACE', namespaces[QNameParts[0]]);
      pathParts[i] = expandedPath;
    }
  }
  return pathParts.join('/');
}

var exports = {

  /**
   * Performs an xpath select that does appropriate namespace matching since the imported
   * xpath module does not properly handle namespaces.
   * @static
   * @memberOf XmlUtil
   * @param  {object} dom     A dom object created by the xmldom module
   * @param  {string} xpath   An xpath expression
   * @return {array}          An array of matching dom nodes.
   */
  xpathSelect :  function (dom, xpath) {
    return select(dom, expandQNames(xpath));
  },

  /**
   * Given a dom node serializes all immediate children that are xml elements.
   * @static
   * @memberOf XmlUtil
   * @param  {object} node  An xml dom node.
   * @return {string}       Serialized xml.
   */
  serializeNodeChildren : function(node) {
    var doc = '';
    var sibling = node.firstChild;
    var serializer = new XMLSerializer();

    while (sibling) {
      if (this.isElementNode(sibling)) {
        doc += serializer.serializeToString(sibling);
      }
      sibling = sibling.nextSibling;
    }

    return doc !== '' ? doc : null;
  },

  /**
   * Detects whether the passed in dom node represents an xml element.
   * @static
   * @memberOf XmlUtil
   * @param  {object}  node   An xml dom node.
   * @return {Boolean}        true if the node represents an element.
   */
  isElementNode : function(node) {
    return _.has(node, 'tagName');
  },

  /**
   * Given an xmldom node this function returns any text data contained within.
   * @static
   * @memberOf XmlUtil
   * @param  {object} node  An xmldom node from which the data should be extracted.
   * @return {string}       Any data found within the element or null if none is found.
   */
  findElementText : function(node) {
    var sibling = node.firstChild;
    while (sibling && !sibling.data) {
      sibling = sibling.nextSibling;
    }

    return sibling.data ? sibling.data : null;
  }
};

module.exports = exports;
