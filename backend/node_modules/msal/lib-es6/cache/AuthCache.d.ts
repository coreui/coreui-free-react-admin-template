import { TemporaryCacheKeys } from "../utils/Constants";
import { AccessTokenCacheItem } from "./AccessTokenCacheItem";
import { CacheLocation } from "../Configuration";
import { BrowserStorage } from "./BrowserStorage";
/**
 * @hidden
 */
export declare class AuthCache extends BrowserStorage {
    private clientId;
    private rollbackEnabled;
    private temporaryCache;
    constructor(clientId: string, cacheLocation: CacheLocation, storeAuthStateInCookie: boolean);
    /**
     * Support roll back to old cache schema until the next major release: true by default now
     * @param storeAuthStateInCookie
     */
    private migrateCacheEntries;
    /**
     * Utility function to help with roll back keys
     * @param newKey
     * @param value
     * @param storeAuthStateInCookie
     */
    private duplicateCacheEntry;
    /**
     * Prepend msal.<client-id> to each key; Skip for any JSON object as Key (defined schemas do not need the key appended: AccessToken Keys or the upcoming schema)
     * @param key
     * @param addInstanceId
     */
    private generateCacheKey;
    /**
     * Validates that the input cache key contains the account search terms (clientId and homeAccountIdentifier) and
     * then whether or not it contains the "scopes", depending on the token type being searched for. With matching account
     * search terms, Access Token search tries to match the "scopes" keyword, while Id Token search expects "scopes" to not be included.
     * @param key
     * @param clientId
     * @param homeAccountIdentifier
     * @param tokenType
     */
    private matchKeyForType;
    /**
     * add value to storage
     * @param key
     * @param value
     * @param enableCookieStorage
     */
    setItem(key: string, value: string, enableCookieStorage?: boolean): void;
    /**
     * get one item by key from storage
     * @param key
     * @param enableCookieStorage
     */
    getItem(key: string, enableCookieStorage?: boolean): string;
    /**
     * remove value from storage
     * @param key
     */
    removeItem(key: string): void;
    /**
     * Sets temporary cache value
     * @param key
     * @param value
     * @param enableCookieStorage
     */
    setTemporaryItem(key: string, value: string, enableCookieStorage?: boolean): void;
    /**
     * Gets temporary cache value
     * @param key
     * @param enableCookieStorage
     */
    getTemporaryItem(key: string, enableCookieStorage?: boolean): string;
    /**
     * Reset the cache items
     */
    resetCacheItems(): void;
    /**
     * Reset all temporary cache items
     */
    resetTempCacheItems(state?: string): void;
    /**
     * Set cookies for IE
     * @param cName
     * @param cValue
     * @param expires
     */
    setItemCookie(cName: string, cValue: string, expires?: number): void;
    clearItemCookie(cName: string): void;
    /**
     * get one item by key from cookies
     * @param cName
     */
    getItemCookie(cName: string): string;
    /**
     * Get all tokens of a certain type from the cache
     * @param clientId
     * @param homeAccountIdentifier
     * @param tokenType
     */
    getAllTokensByType(clientId: string, homeAccountIdentifier: string, tokenType: string): Array<AccessTokenCacheItem>;
    /**
     * Get all access tokens in the cache
     * @param clientId
     * @param homeAccountIdentifier
     */
    getAllAccessTokens(clientId: string, homeAccountIdentifier: string): Array<AccessTokenCacheItem>;
    /**
     * Get all id tokens in the cache in the form of AccessTokenCacheItem objects so they are
     * in a normalized format and can make use of the existing cached access token validation logic
     */
    getAllIdTokens(clientId: string, homeAccountIdentifier: string): Array<AccessTokenCacheItem>;
    /**
     * Get all access and ID tokens in the cache
     * @param clientId
     * @param homeAccountIdentifier
     */
    getAllTokens(clientId: string, homeAccountIdentifier: string): Array<AccessTokenCacheItem>;
    /**
     * Returns whether or not interaction is currently in progress. Optionally scope it to just this clientId
     * @param forThisClient
     */
    isInteractionInProgress(matchClientId: boolean): boolean;
    /**
     * Returns the clientId of the interaction currently in progress
     */
    getInteractionInProgress(): string;
    /**
     * Sets interaction in progress state
     * @param isInProgress
     */
    setInteractionInProgress(newInProgressValue: boolean): void;
    /**
     * Return if the token renewal is still in progress
     *
     * @param stateValue
     */
    private tokenRenewalInProgress;
    /**
     * Clear all cookies
     */
    clearMsalCookie(state?: string): void;
    /**
     * Create acquireTokenAccountKey to cache account object
     * @param accountId
     * @param state
     */
    static generateAcquireTokenAccountKey(accountId: string, state: string): string;
    /**
     * Create authorityKey to cache authority
     * @param state
     */
    static generateAuthorityKey(state: string): string;
    /**
     * Generates the cache key for temporary cache items, using request state
     * @param tempCacheKey Cache key prefix
     * @param state Request state value
     */
    static generateTemporaryCacheKey(tempCacheKey: TemporaryCacheKeys, state: string): string;
}
