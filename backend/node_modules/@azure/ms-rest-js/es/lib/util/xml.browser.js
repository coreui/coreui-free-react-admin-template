// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var _a, _b;
var parser = new DOMParser();
// Policy to make our code Trusted Types compliant.
//   https://github.com/w3c/webappsec-trusted-types
// We are calling DOMParser.parseFromString() to parse XML payload from Azure services.
// The parsed DOM object is not exposed to outside. Scripts are disabled when parsing
// according to the spec.  There are no HTML/XSS security concerns on the usage of
// parseFromString() here.
var ttPolicy;
try {
    if (typeof self.trustedTypes !== "undefined") {
        ttPolicy = self.trustedTypes.createPolicy("@azure/ms-rest-js#xml.browser", {
            createHTML: function (s) { return s; },
        });
    }
}
catch (e) {
    console.warn('Could not create trusted types policy "@azure/ms-rest-js#xml.browser"');
}
export function parseXML(str) {
    var _a;
    try {
        var dom = parser.parseFromString(((_a = ttPolicy === null || ttPolicy === void 0 ? void 0 : ttPolicy.createHTML(str)) !== null && _a !== void 0 ? _a : str), "application/xml");
        throwIfError(dom);
        var obj = domToObject(dom.childNodes[0]);
        return Promise.resolve(obj);
    }
    catch (err) {
        return Promise.reject(err);
    }
}
var errorNS = "";
try {
    var invalidXML = ((_a = ttPolicy === null || ttPolicy === void 0 ? void 0 : ttPolicy.createHTML("INVALID")) !== null && _a !== void 0 ? _a : "INVALID");
    errorNS = (_b = parser.parseFromString(invalidXML, "text/xml").getElementsByTagName("parsererror")[0]
        .namespaceURI) !== null && _b !== void 0 ? _b : "";
}
catch (ignored) {
    // Most browsers will return a document containing <parsererror>, but IE will throw.
}
function throwIfError(dom) {
    if (errorNS) {
        var parserErrors = dom.getElementsByTagNameNS(errorNS, "parsererror");
        if (parserErrors.length) {
            throw new Error(parserErrors.item(0).innerHTML);
        }
    }
}
function isElement(node) {
    return !!node.attributes;
}
/**
 * Get the Element-typed version of the provided Node if the provided node is an element with
 * attributes. If it isn't, then undefined is returned.
 */
function asElementWithAttributes(node) {
    return isElement(node) && node.hasAttributes() ? node : undefined;
}
function domToObject(node) {
    var result = {};
    var childNodeCount = node.childNodes.length;
    var firstChildNode = node.childNodes[0];
    var onlyChildTextValue = (firstChildNode &&
        childNodeCount === 1 &&
        firstChildNode.nodeType === Node.TEXT_NODE &&
        firstChildNode.nodeValue) ||
        undefined;
    var elementWithAttributes = asElementWithAttributes(node);
    if (elementWithAttributes) {
        result["$"] = {};
        for (var i = 0; i < elementWithAttributes.attributes.length; i++) {
            var attr = elementWithAttributes.attributes[i];
            result["$"][attr.nodeName] = attr.nodeValue;
        }
        if (onlyChildTextValue) {
            result["_"] = onlyChildTextValue;
        }
    }
    else if (childNodeCount === 0) {
        result = "";
    }
    else if (onlyChildTextValue) {
        result = onlyChildTextValue;
    }
    if (!onlyChildTextValue) {
        for (var i = 0; i < childNodeCount; i++) {
            var child = node.childNodes[i];
            // Ignore leading/trailing whitespace nodes
            if (child.nodeType !== Node.TEXT_NODE) {
                var childObject = domToObject(child);
                if (!result[child.nodeName]) {
                    result[child.nodeName] = childObject;
                }
                else if (Array.isArray(result[child.nodeName])) {
                    result[child.nodeName].push(childObject);
                }
                else {
                    result[child.nodeName] = [result[child.nodeName], childObject];
                }
            }
        }
    }
    return result;
}
// tslint:disable-next-line:no-null-keyword
var doc = document.implementation.createDocument(null, null, null);
var serializer = new XMLSerializer();
export function stringifyXML(obj, opts) {
    var rootName = (opts && opts.rootName) || "root";
    var dom = buildNode(obj, rootName)[0];
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + serializer.serializeToString(dom));
}
function buildAttributes(attrs) {
    var result = [];
    for (var _i = 0, _a = Object.keys(attrs); _i < _a.length; _i++) {
        var key = _a[_i];
        var attr = doc.createAttribute(key);
        attr.value = attrs[key].toString();
        result.push(attr);
    }
    return result;
}
function buildNode(obj, elementName) {
    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
        var elem = doc.createElement(elementName);
        elem.textContent = obj.toString();
        return [elem];
    }
    else if (Array.isArray(obj)) {
        var result = [];
        for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
            var arrayElem = obj_1[_i];
            for (var _a = 0, _b = buildNode(arrayElem, elementName); _a < _b.length; _a++) {
                var child = _b[_a];
                result.push(child);
            }
        }
        return result;
    }
    else if (typeof obj === "object") {
        var elem = doc.createElement(elementName);
        for (var _c = 0, _d = Object.keys(obj); _c < _d.length; _c++) {
            var key = _d[_c];
            if (key === "$") {
                for (var _e = 0, _f = buildAttributes(obj[key]); _e < _f.length; _e++) {
                    var attr = _f[_e];
                    elem.attributes.setNamedItem(attr);
                }
            }
            else {
                for (var _g = 0, _h = buildNode(obj[key], key); _g < _h.length; _g++) {
                    var child = _h[_g];
                    elem.appendChild(child);
                }
            }
        }
        return [elem];
    }
    else {
        throw new Error("Illegal value passed to buildObject: " + obj);
    }
}
//# sourceMappingURL=xml.browser.js.map