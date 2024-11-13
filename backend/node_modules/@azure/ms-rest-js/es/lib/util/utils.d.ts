import { HttpOperationResponse } from "../httpOperationResponse";
import { RestError } from "../restError";
import { WebResourceLike } from "../webResource";
/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export declare const isNode: boolean;
/**
 * Checks if a parsed URL is HTTPS
 *
 * @param {object} urlToCheck The url to check
 * @return {boolean} True if the URL is HTTPS; false otherwise.
 */
export declare function urlIsHTTPS(urlToCheck: {
    protocol: string;
}): boolean;
/**
 * Encodes an URI.
 *
 * @param {string} uri The URI to be encoded.
 * @return {string} The encoded URI.
 */
export declare function encodeUri(uri: string): string;
/**
 * Returns a stripped version of the Http Response which only contains body,
 * headers and the status.
 *
 * @param {HttpOperationResponse} response The Http Response
 *
 * @return {object} The stripped version of Http Response.
 */
export declare function stripResponse(response: HttpOperationResponse): any;
/**
 * Returns a stripped version of the Http Request that does not contain the
 * Authorization header.
 *
 * @param {WebResource} request The Http Request object
 *
 * @return {WebResource} The stripped version of Http Request.
 */
export declare function stripRequest(request: WebResourceLike): WebResourceLike;
/**
 * Validates the given uuid as a string
 *
 * @param {string} uuid The uuid as a string that needs to be validated
 *
 * @return {boolean} True if the uuid is valid; false otherwise.
 */
export declare function isValidUuid(uuid: string): boolean;
/**
 * Provides an array of values of an object. For example
 * for a given object { "a": "foo", "b": "bar" }, the method returns ["foo", "bar"].
 *
 * @param {object} obj An object whose properties need to be enumerated so that it"s values can be provided as an array
 *
 * @return {any[]} An array of values of the given object.
 */
export declare function objectValues(obj: {
    [key: string]: any;
}): any[];
/**
 * Generated UUID
 *
 * @return {string} RFC4122 v4 UUID.
 */
export declare function generateUuid(): string;
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
export declare function executePromisesSequentially(promiseFactories: Array<any>, kickstart: any): Promise<any>;
/**
 * Merges source object into the target object
 * @param {object} source The object that needs to be merged
 *
 * @param {object} target The object to be merged into
 *
 * @returns {object} Returns the merged target object.
 */
export declare function mergeObjects(source: {
    [key: string]: any;
}, target: {
    [key: string]: any;
}): {
    [key: string]: any;
};
/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param {number} t The number of milliseconds to be delayed.
 * @param {T} value The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} Resolved promise
 */
export declare function delay<T>(t: number, value?: T): Promise<T>;
/**
 * Service callback that is returned for REST requests initiated by the service client.
 */
export interface ServiceCallback<TResult> {
    /**
     * A method that will be invoked as a callback to a service function.
     * @param {Error | RestError | null} err The error occurred if any, while executing the request; otherwise null.
     * @param {TResult} [result] The deserialized response body if an error did not occur.
     * @param {WebResourceLike} [request] The raw/actual request sent to the server if an error did not occur.
     * @param {HttpOperationResponse} [response] The raw/actual response from the server if an error did not occur.
     */
    (err: Error | RestError | null, result?: TResult, request?: WebResourceLike, response?: HttpOperationResponse): void;
}
/**
 * Converts a Promise to a callback.
 * @param {Promise<any>} promise The Promise to be converted to a callback
 * @returns {Function} A function that takes the callback (cb: Function): void
 * @deprecated generated code should instead depend on responseToBody
 */
export declare function promiseToCallback(promise: Promise<any>): Function;
/**
 * Converts a Promise to a service callback.
 * @param {Promise<HttpOperationResponse>} promise - The Promise of HttpOperationResponse to be converted to a service callback
 * @returns {Function} A function that takes the service callback (cb: ServiceCallback<T>): void
 */
export declare function promiseToServiceCallback<T>(promise: Promise<HttpOperationResponse>): Function;
export declare function prepareXMLRootList(obj: any, elementName: string): {
    [x: string]: any;
};
/**
 * Applies the properties on the prototype of sourceCtors to the prototype of targetCtor
 * @param {object} targetCtor The target object on which the properties need to be applied.
 * @param {Array<object>} sourceCtors An array of source objects from which the properties need to be taken.
 */
export declare function applyMixins(targetCtor: any, sourceCtors: any[]): void;
/**
 * Indicates whether the given string is in ISO 8601 format.
 * @param {string} value The value to be validated for ISO 8601 duration format.
 * @return {boolean} `true` if valid, `false` otherwise.
 */
export declare function isDuration(value: string): boolean;
/**
 * Replace all of the instances of searchValue in value with the provided replaceValue.
 * @param {string | undefined} value The value to search and replace in.
 * @param {string} searchValue The value to search for in the value argument.
 * @param {string} replaceValue The value to replace searchValue with in the value argument.
 * @returns {string | undefined} The value where each instance of searchValue was replaced with replacedValue.
 */
export declare function replaceAll(value: string | undefined, searchValue: string, replaceValue: string): string | undefined;
/**
 * Determines whether the given enity is a basic/primitive type
 * (string, number, boolean, null, undefined).
 * @param value Any entity
 * @return boolean - true is it is primitive type, false otherwise.
 */
export declare function isPrimitiveType(value: any): boolean;
//# sourceMappingURL=utils.d.ts.map