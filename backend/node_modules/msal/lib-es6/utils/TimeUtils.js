/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 */
var TimeUtils = /** @class */ (function () {
    function TimeUtils() {
    }
    /**
     * Returns time in seconds for expiration based on string value passed in.
     *
     * @param expiresIn
     */
    TimeUtils.parseExpiresIn = function (expiresIn) {
        // if AAD did not send "expires_in" property, use default expiration of 3599 seconds, for some reason AAD sends 3599 as "expires_in" value instead of 3600
        var expires = expiresIn || "3599";
        return parseInt(expires, 10);
    };
    /**
     * Return the current time in Unix time (seconds). Date.getTime() returns in milliseconds.
     */
    TimeUtils.now = function () {
        return Math.round(new Date().getTime() / 1000.0);
    };
    /**
     * Returns the amount of time in milliseconds since the page loaded.
     */
    TimeUtils.relativeNowMs = function () {
        return window.performance.now();
    };
    return TimeUtils;
}());
export { TimeUtils };
//# sourceMappingURL=TimeUtils.js.map