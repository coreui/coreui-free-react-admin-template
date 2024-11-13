/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { ClientAuthError } from '../error/ClientAuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 */
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    /**
     * decode a JWT
     *
     * @param authToken
     */
    StringUtils.decodeAuthToken = function (authToken) {
        if (StringUtils.isEmpty(authToken)) {
            throw ClientAuthError.createTokenNullOrEmptyError(authToken);
        }
        var tokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
        var matches = tokenPartsRegex.exec(authToken);
        if (!matches || matches.length < 4) {
            throw ClientAuthError.createTokenParsingError("Given token is malformed: " + JSON.stringify(authToken));
        }
        var crackedToken = {
            header: matches[1],
            JWSPayload: matches[2],
            JWSSig: matches[3]
        };
        return crackedToken;
    };
    /**
     * Check if a string is empty.
     *
     * @param str
     */
    StringUtils.isEmpty = function (str) {
        return (typeof str === "undefined" || !str || 0 === str.length);
    };
    /**
     * Check if stringified object is empty
     * @param strObj
     */
    StringUtils.isEmptyObj = function (strObj) {
        if (strObj && !StringUtils.isEmpty(strObj)) {
            try {
                var obj = JSON.parse(strObj);
                return Object.keys(obj).length === 0;
            }
            catch (e) { }
        }
        return true;
    };
    StringUtils.startsWith = function (str, search) {
        return str.indexOf(search) === 0;
    };
    StringUtils.endsWith = function (str, search) {
        return (str.length >= search.length) && (str.lastIndexOf(search) === (str.length - search.length));
    };
    /**
     * Parses string into an object.
     *
     * @param query
     */
    StringUtils.queryStringToObject = function (query) {
        var match; // Regex for replacing addition symbol with a space
        var pl = /\+/g;
        var search = /([^&=]+)=([^&]*)/g;
        var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
        var obj = {};
        match = search.exec(query);
        while (match) {
            obj[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }
        return obj;
    };
    /**
     * Trims entries in an array.
     *
     * @param arr
     */
    StringUtils.trimArrayEntries = function (arr) {
        return arr.map(function (entry) { return entry.trim(); });
    };
    /**
     * Removes empty strings from array
     * @param arr
     */
    StringUtils.removeEmptyStringsFromArray = function (arr) {
        return arr.filter(function (entry) {
            return !StringUtils.isEmpty(entry);
        });
    };
    /**
     * Attempts to parse a string into JSON
     * @param str
     */
    StringUtils.jsonParseHelper = function (str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return null;
        }
    };
    /**
     * Tests if a given string matches a given pattern, with support for wildcards and queries.
     * @param pattern Wildcard pattern to string match. Supports "*" for wildcards and "?" for queries
     * @param input String to match against
     */
    StringUtils.matchPattern = function (pattern, input) {
        /**
         * Wildcard support: https://stackoverflow.com/a/3117248/4888559
         * Queries: replaces "?" in string with escaped "\?" for regex test
         */
        var regex = new RegExp(pattern.replace(/\*/g, "[^ ]*").replace(/\?/g, "\\\?"));
        return regex.test(input);
    };
    return StringUtils;
}());

export { StringUtils };
//# sourceMappingURL=StringUtils.js.map
