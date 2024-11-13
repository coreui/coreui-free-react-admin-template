"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiringAccessTokenCache = exports.DefaultTokenRefreshBufferMs = void 0;
/**
 * Defines the default token refresh buffer duration.
 */
exports.DefaultTokenRefreshBufferMs = 2 * 60 * 1000; // 2 Minutes
/**
 * Provides an AccessTokenCache implementation which clears
 * the cached AccessToken's after the expiresOnTimestamp has
 * passed.
 * @internal
 */
class ExpiringAccessTokenCache {
    /**
     * Constructs an instance of ExpiringAccessTokenCache with
     * an optional expiration buffer time.
     */
    constructor(tokenRefreshBufferMs = exports.DefaultTokenRefreshBufferMs) {
        this.tokenRefreshBufferMs = tokenRefreshBufferMs;
    }
    setCachedToken(accessToken) {
        this.cachedToken = accessToken;
    }
    getCachedToken() {
        if (this.cachedToken &&
            Date.now() + this.tokenRefreshBufferMs >= this.cachedToken.expiresOnTimestamp) {
            this.cachedToken = undefined;
        }
        return this.cachedToken;
    }
}
exports.ExpiringAccessTokenCache = ExpiringAccessTokenCache;
//# sourceMappingURL=accessTokenCache.js.map