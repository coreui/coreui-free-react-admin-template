// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { v4 as uuidv4 } from "uuid";
import { Constants } from "./constants";
/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export var isNode = typeof process !== "undefined" &&
    !!process.version &&
    !!process.versions &&
    !!process.versions.node;
/**
 * Checks if a parsed URL is HTTPS
 *
 * @param {object} urlToCheck The url to check
 * @return {boolean} True if the URL is HTTPS; false otherwise.
 */
export function urlIsHTTPS(urlToCheck) {
    return urlToCheck.protocol.toLowerCase() === Constants.HTTPS;
}
/**
 * Encodes an URI.
 *
 * @param {string} uri The URI to be encoded.
 * @return {string} The encoded URI.
 */
export function encodeUri(uri) {
    return encodeURIComponent(uri)
        .replace(/!/g, "%21")
        .replace(/"/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/\*/g, "%2A");
}
/**
 * Returns a stripped version of the Http Response which only contains body,
 * headers and the status.
 *
 * @param {HttpOperationResponse} response The Http Response
 *
 * @return {object} The stripped version of Http Response.
 */
export function stripResponse(response) {
    var strippedResponse = {};
    strippedResponse.body = response.bodyAsText;
    strippedResponse.headers = response.headers;
    strippedResponse.status = response.status;
    return strippedResponse;
}
/**
 * Returns a stripped version of the Http Request that does not contain the
 * Authorization header.
 *
 * @param {WebResource} request The Http Request object
 *
 * @return {WebResource} The stripped version of Http Request.
 */
export function stripRequest(request) {
    var strippedRequest = request.clone();
    if (strippedRequest.headers) {
        strippedRequest.headers.remove("authorization");
    }
    return strippedRequest;
}
/**
 * Validates the given uuid as a string
 *
 * @param {string} uuid The uuid as a string that needs to be validated
 *
 * @return {boolean} True if the uuid is valid; false otherwise.
 */
export function isValidUuid(uuid) {
    var validUuidRegex = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", "ig");
    return validUuidRegex.test(uuid);
}
/**
 * Provides an array of values of an object. For example
 * for a given object { "a": "foo", "b": "bar" }, the method returns ["foo", "bar"].
 *
 * @param {object} obj An object whose properties need to be enumerated so that it"s values can be provided as an array
 *
 * @return {any[]} An array of values of the given object.
 */
export function objectValues(obj) {
    var result = [];
    if (obj && obj instanceof Object) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(obj[key]);
            }
        }
    }
    else {
        throw new Error("The provided object " + JSON.stringify(obj, undefined, 2) + " is not a valid object that can be " + "enumerated to provide its values as an array.");
    }
    return result;
}
/**
 * Generated UUID
 *
 * @return {string} RFC4122 v4 UUID.
 */
export function generateUuid() {
    return uuidv4();
}
/**
 * Executes an array of promises sequentially. Inspiration of this method is here:
 * https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html. An awesome blog on promises!
 *
 * @param {Array} promiseFactories An array of promise factories(A function that return a promise)
 *
 * @param {any} [kickstart] Input to the first promise that is used to kickstart the promise chain.
 * If not provided then the promise chain starts with undefined.
 *
 * @return A chain of resolved or rejected promises
 */
export function executePromisesSequentially(promiseFactories, kickstart) {
    var result = Promise.resolve(kickstart);
    promiseFactories.forEach(function (promiseFactory) {
        result = result.then(promiseFactory);
    });
    return result;
}
/**
 * Merges source object into the target object
 * @param {object} source The object that needs to be merged
 *
 * @param {object} target The object to be merged into
 *
 * @returns {object} Returns the merged target object.
 */
export function mergeObjects(source, target) {
    Object.keys(source).forEach(function (key) {
        target[key] = source[key];
    });
    return target;
}
/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param {number} t The number of milliseconds to be delayed.
 * @param {T} value The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} Resolved promise
 */
export function delay(t, value) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(value); }, t); });
}
/**
 * Converts a Promise to a callback.
 * @param {Promise<any>} promise The Promise to be converted to a callback
 * @returns {Function} A function that takes the callback (cb: Function): void
 * @deprecated generated code should instead depend on responseToBody
 */
export function promiseToCallback(promise) {
    if (typeof promise.then !== "function") {
        throw new Error("The provided input is not a Promise.");
    }
    return function (cb) {
        promise.then(function (data) {
            cb(undefined, data);
        }, function (err) {
            cb(err);
        });
    };
}
/**
 * Converts a Promise to a service callback.
 * @param {Promise<HttpOperationResponse>} promise - The Promise of HttpOperationResponse to be converted to a service callback
 * @returns {Function} A function that takes the service callback (cb: ServiceCallback<T>): void
 */
export function promiseToServiceCallback(promise) {
    if (typeof promise.then !== "function") {
        throw new Error("The provided input is not a Promise.");
    }
    return function (cb) {
        promise.then(function (data) {
            process.nextTick(cb, undefined, data.parsedBody, data.request, data);
        }, function (err) {
            process.nextTick(cb, err);
        });
    };
}
export function prepareXMLRootList(obj, elementName) {
    var _a;
    if (!Array.isArray(obj)) {
        obj = [obj];
    }
    return _a = {}, _a[elementName] = obj, _a;
}
/**
 * Applies the properties on the prototype of sourceCtors to the prototype of targetCtor
 * @param {object} targetCtor The target object on which the properties need to be applied.
 * @param {Array<object>} sourceCtors An array of source objects from which the properties need to be taken.
 */
export function applyMixins(targetCtor, sourceCtors) {
    sourceCtors.forEach(function (sourceCtors) {
        Object.getOwnPropertyNames(sourceCtors.prototype).forEach(function (name) {
            targetCtor.prototype[name] = sourceCtors.prototype[name];
        });
    });
}
var validateISODuration = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
/**
 * Indicates whether the given string is in ISO 8601 format.
 * @param {string} value The value to be validated for ISO 8601 duration format.
 * @return {boolean} `true` if valid, `false` otherwise.
 */
export function isDuration(value) {
    return validateISODuration.test(value);
}
/**
 * Replace all of the instances of searchValue in value with the provided replaceValue.
 * @param {string | undefined} value The value to search and replace in.
 * @param {string} searchValue The value to search for in the value argument.
 * @param {string} replaceValue The value to replace searchValue with in the value argument.
 * @returns {string | undefined} The value where each instance of searchValue was replaced with replacedValue.
 */
export function replaceAll(value, searchValue, replaceValue) {
    return !value || !searchValue ? value : value.split(searchValue).join(replaceValue || "");
}
/**
 * Determines whether the given enity is a basic/primitive type
 * (string, number, boolean, null, undefined).
 * @param value Any entity
 * @return boolean - true is it is primitive type, false otherwise.
 */
export function isPrimitiveType(value) {
    return (typeof value !== "object" && typeof value !== "function") || value === null;
}
//# sourceMappingURL=utils.js.map