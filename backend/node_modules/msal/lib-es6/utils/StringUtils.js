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
     * Check if a string is empty
     *
     * @param str
     */
    StringUtils.isEmpty = function (str) {
        return (typeof str === "undefined" || !str || 0 === str.length);
    };
    /**
     * Check if a string's value is a valid JSON object
     *
     * @param str
     */
    StringUtils.validateAndParseJsonCacheKey = function (str) {
        try {
            var parsedKey = JSON.parse(str);
            /**
             * There are edge cases in which JSON.parse will successfully parse a non-valid JSON object
             * (e.g. JSON.parse will parse an escaped string into an unescaped string), so adding a type check
             * of the parsed value is necessary in order to be certain that the string represents a valid JSON object.
             *
             */
            return (parsedKey && typeof parsedKey === "object") ? parsedKey : null;
        }
        catch (error) {
            return null;
        }
    };
    return StringUtils;
}());
export { StringUtils };
//# sourceMappingURL=StringUtils.js.map