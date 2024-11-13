/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { ThrottlingConstants, CacheSchemaType, Constants, HeaderNames } from '../utils/Constants.js';
import { ServerError } from '../error/ServerError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ThrottlingUtils = /** @class */ (function () {
    function ThrottlingUtils() {
    }
    /**
     * Prepares a RequestThumbprint to be stored as a key.
     * @param thumbprint
     */
    ThrottlingUtils.generateThrottlingStorageKey = function (thumbprint) {
        return ThrottlingConstants.THROTTLING_PREFIX + "." + JSON.stringify(thumbprint);
    };
    /**
     * Performs necessary throttling checks before a network request.
     * @param cacheManager
     * @param thumbprint
     */
    ThrottlingUtils.preProcess = function (cacheManager, thumbprint) {
        var _a;
        var key = ThrottlingUtils.generateThrottlingStorageKey(thumbprint);
        var value = cacheManager.getThrottlingCache(key);
        if (value) {
            if (value.throttleTime < Date.now()) {
                cacheManager.removeItem(key, CacheSchemaType.THROTTLING);
                return;
            }
            throw new ServerError(((_a = value.errorCodes) === null || _a === void 0 ? void 0 : _a.join(" ")) || Constants.EMPTY_STRING, value.errorMessage, value.subError);
        }
    };
    /**
     * Performs necessary throttling checks after a network request.
     * @param cacheManager
     * @param thumbprint
     * @param response
     */
    ThrottlingUtils.postProcess = function (cacheManager, thumbprint, response) {
        if (ThrottlingUtils.checkResponseStatus(response) || ThrottlingUtils.checkResponseForRetryAfter(response)) {
            var thumbprintValue = {
                throttleTime: ThrottlingUtils.calculateThrottleTime(parseInt(response.headers[HeaderNames.RETRY_AFTER])),
                error: response.body.error,
                errorCodes: response.body.error_codes,
                errorMessage: response.body.error_description,
                subError: response.body.suberror
            };
            cacheManager.setThrottlingCache(ThrottlingUtils.generateThrottlingStorageKey(thumbprint), thumbprintValue);
        }
    };
    /**
     * Checks a NetworkResponse object's status codes against 429 or 5xx
     * @param response
     */
    ThrottlingUtils.checkResponseStatus = function (response) {
        return response.status === 429 || response.status >= 500 && response.status < 600;
    };
    /**
     * Checks a NetworkResponse object's RetryAfter header
     * @param response
     */
    ThrottlingUtils.checkResponseForRetryAfter = function (response) {
        if (response.headers) {
            return response.headers.hasOwnProperty(HeaderNames.RETRY_AFTER) && (response.status < 200 || response.status >= 300);
        }
        return false;
    };
    /**
     * Calculates the Unix-time value for a throttle to expire given throttleTime in seconds.
     * @param throttleTime
     */
    ThrottlingUtils.calculateThrottleTime = function (throttleTime) {
        var time = throttleTime <= 0 ? 0 : throttleTime;
        var currentSeconds = Date.now() / 1000;
        return Math.floor(Math.min(currentSeconds + (time || ThrottlingConstants.DEFAULT_THROTTLE_TIME_SECONDS), currentSeconds + ThrottlingConstants.DEFAULT_MAX_THROTTLE_TIME_SECONDS) * 1000);
    };
    ThrottlingUtils.removeThrottle = function (cacheManager, clientId, authority, scopes, homeAccountIdentifier) {
        var thumbprint = {
            clientId: clientId,
            authority: authority,
            scopes: scopes,
            homeAccountIdentifier: homeAccountIdentifier
        };
        var key = this.generateThrottlingStorageKey(thumbprint);
        return cacheManager.removeItem(key, CacheSchemaType.THROTTLING);
    };
    return ThrottlingUtils;
}());

export { ThrottlingUtils };
//# sourceMappingURL=ThrottlingUtils.js.map
