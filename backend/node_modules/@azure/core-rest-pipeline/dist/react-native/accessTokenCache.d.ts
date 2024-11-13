import type { AccessToken } from "@azure/core-auth";
/**
 * Defines the default token refresh buffer duration.
 */
export declare const DefaultTokenRefreshBufferMs: number;
/**
 * Provides a cache for an AccessToken that was that
 * was returned from a TokenCredential.
 */
export interface AccessTokenCache {
    /**
     * Sets the cached token.
     *
     * @param accessToken - The AccessToken to be cached or null to
     *   clear the cached token.
     */
    setCachedToken(accessToken: AccessToken | undefined): void;
    /**
     * Returns the cached AccessToken or undefined if nothing is cached.
     */
    getCachedToken(): AccessToken | undefined;
}
/**
 * Provides an AccessTokenCache implementation which clears
 * the cached AccessToken's after the expiresOnTimestamp has
 * passed.
 * @internal
 */
export declare class ExpiringAccessTokenCache implements AccessTokenCache {
    private tokenRefreshBufferMs;
    private cachedToken?;
    /**
     * Constructs an instance of ExpiringAccessTokenCache with
     * an optional expiration buffer time.
     */
    constructor(tokenRefreshBufferMs?: number);
    setCachedToken(accessToken: AccessToken | undefined): void;
    getCachedToken(): AccessToken | undefined;
}
//# sourceMappingURL=accessTokenCache.d.ts.map