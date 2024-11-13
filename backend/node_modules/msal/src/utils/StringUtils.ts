/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { AccessTokenKey } from "../cache/AccessTokenKey";

/**
 * @hidden
 */
export class StringUtils {
    /**
     * Check if a string is empty
     *
     * @param str
     */
    static isEmpty(str: string): boolean {
        return (typeof str === "undefined" || !str || 0 === str.length);
    }

    /**
     * Check if a string's value is a valid JSON object
     *
     * @param str
     */
    static validateAndParseJsonCacheKey(str: string): AccessTokenKey {
        try {
            const parsedKey = JSON.parse(str);
            /**
             * There are edge cases in which JSON.parse will successfully parse a non-valid JSON object 
             * (e.g. JSON.parse will parse an escaped string into an unescaped string), so adding a type check
             * of the parsed value is necessary in order to be certain that the string represents a valid JSON object.
             *
             */
            return (parsedKey && typeof parsedKey === "object") ? parsedKey : null;
        } catch (error) {
            return null;
        }
    }
}
