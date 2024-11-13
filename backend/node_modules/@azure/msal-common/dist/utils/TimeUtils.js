/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility class which exposes functions for managing date and time operations.
 */
var TimeUtils = /** @class */ (function () {
    function TimeUtils() {
    }
    /**
     * return the current time in Unix time (seconds).
     */
    TimeUtils.nowSeconds = function () {
        // Date.getTime() returns in milliseconds.
        return Math.round(new Date().getTime() / 1000.0);
    };
    /**
     * check if a token is expired based on given UTC time in seconds.
     * @param expiresOn
     */
    TimeUtils.isTokenExpired = function (expiresOn, offset) {
        // check for access token expiry
        var expirationSec = Number(expiresOn) || 0;
        var offsetCurrentTimeSec = TimeUtils.nowSeconds() + offset;
        // If current time + offset is greater than token expiration time, then token is expired.
        return (offsetCurrentTimeSec > expirationSec);
    };
    /**
     * If the current time is earlier than the time that a token was cached at, we must discard the token
     * i.e. The system clock was turned back after acquiring the cached token
     * @param cachedAt
     * @param offset
     */
    TimeUtils.wasClockTurnedBack = function (cachedAt) {
        var cachedAtSec = Number(cachedAt);
        return cachedAtSec > TimeUtils.nowSeconds();
    };
    /**
     * Waits for t number of milliseconds
     * @param t number
     * @param value T
     */
    TimeUtils.delay = function (t, value) {
        return new Promise(function (resolve) { return setTimeout(function () { return resolve(value); }, t); });
    };
    return TimeUtils;
}());

export { TimeUtils };
//# sourceMappingURL=TimeUtils.js.map
