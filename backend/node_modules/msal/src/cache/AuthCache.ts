/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Constants, PersistentCacheKeys, TemporaryCacheKeys, ErrorCacheKeys, ServerHashParamKeys, SESSION_STORAGE} from "../utils/Constants";
import { AccessTokenCacheItem } from "./AccessTokenCacheItem";
import { CacheLocation } from "../Configuration";
import { BrowserStorage } from "./BrowserStorage";
import { RequestUtils } from "../utils/RequestUtils";
import { AccessTokenKey } from "./AccessTokenKey";
import { StringUtils } from "../utils/StringUtils";
import { IdToken } from "../IdToken";
import { ClientAuthError } from "../error/ClientAuthError";

/**
 * @hidden
 */
export class AuthCache extends BrowserStorage {// Singleton

    private clientId: string;
    private rollbackEnabled: boolean;
    private temporaryCache: BrowserStorage;

    constructor(clientId: string, cacheLocation: CacheLocation, storeAuthStateInCookie: boolean) {
        super(cacheLocation);
        this.temporaryCache = new BrowserStorage(SESSION_STORAGE);
        this.clientId = clientId;
        // This is hardcoded to true for now. We may make this configurable in the future
        this.rollbackEnabled = true;
        this.migrateCacheEntries(storeAuthStateInCookie);
    }

    /**
     * Support roll back to old cache schema until the next major release: true by default now
     * @param storeAuthStateInCookie
     */
    private migrateCacheEntries(storeAuthStateInCookie: boolean) {

        const idTokenKey = `${Constants.cachePrefix}.${PersistentCacheKeys.IDTOKEN}`;
        const clientInfoKey = `${Constants.cachePrefix}.${PersistentCacheKeys.CLIENT_INFO}`;
        const errorKey = `${Constants.cachePrefix}.${ErrorCacheKeys.ERROR}`;
        const errorDescKey = `${Constants.cachePrefix}.${ErrorCacheKeys.ERROR_DESC}`;

        const idTokenValue = super.getItem(idTokenKey);

        let idToken;

        if (idTokenValue) {
            try {
                idToken = new IdToken(idTokenValue);
            } catch (e) {
                return;
            }
        }

        if (idToken && idToken.claims && idToken.claims.aud === this.clientId) {
            const clientInfoValue = super.getItem(clientInfoKey);
            const errorValue = super.getItem(errorKey);
            const errorDescValue = super.getItem(errorDescKey);

            const values = [idTokenValue, clientInfoValue, errorValue, errorDescValue];
            const keysToMigrate = [PersistentCacheKeys.IDTOKEN, PersistentCacheKeys.CLIENT_INFO,ErrorCacheKeys.ERROR, ErrorCacheKeys.ERROR_DESC];

            keysToMigrate.forEach((cacheKey, index) => this.duplicateCacheEntry(cacheKey, values[index], storeAuthStateInCookie));
        }
    }

    /**
     * Utility function to help with roll back keys
     * @param newKey
     * @param value
     * @param storeAuthStateInCookie
     */
    private duplicateCacheEntry(newKey: string, value: string, storeAuthStateInCookie?: boolean) {
        if (value) {
            this.setItem(newKey, value, storeAuthStateInCookie);
        }
    }

    /**
     * Prepend msal.<client-id> to each key; Skip for any JSON object as Key (defined schemas do not need the key appended: AccessToken Keys or the upcoming schema)
     * @param key
     * @param addInstanceId
     */
    private generateCacheKey(key: string, addInstanceId: boolean): string {
        try {
            // Defined schemas do not need the key appended
            JSON.parse(key);
            return key;
        } catch (e) {
            if (key.indexOf(`${Constants.cachePrefix}`) === 0 || key.indexOf(Constants.adalIdToken) === 0){
                return key;
            }
            return addInstanceId ? `${Constants.cachePrefix}.${this.clientId}.${key}` : `${Constants.cachePrefix}.${key}`;
        }
    }

    /**
     * Validates that the input cache key contains the account search terms (clientId and homeAccountIdentifier) and
     * then whether or not it contains the "scopes", depending on the token type being searched for. With matching account
     * search terms, Access Token search tries to match the "scopes" keyword, while Id Token search expects "scopes" to not be included.
     * @param key 
     * @param clientId 
     * @param homeAccountIdentifier 
     * @param tokenType 
     */
    private matchKeyForType(key:string, clientId: string, homeAccountIdentifier: string, tokenType: string): AccessTokenKey {
        // All valid token cache item keys are valid JSON objects, ignore keys that aren't
        const parsedKey = StringUtils.validateAndParseJsonCacheKey(key);

        if (!parsedKey) {
            return null;
        }

        // Does the cache item match the request account
        const accountMatches = key.match(clientId) && key.match(homeAccountIdentifier);
        // Does the cache item match the requested token type
        let tokenTypeMatches = false;

        switch (tokenType) {
            case ServerHashParamKeys.ACCESS_TOKEN:
                // Cache item is an access token if scopes are included in the cache item key
                tokenTypeMatches = !!key.match(Constants.scopes);
                break;
            case ServerHashParamKeys.ID_TOKEN:
                // Cache may be an ID token if scopes are NOT included in the cache item key
                tokenTypeMatches = !key.match(Constants.scopes);
                break;
        }

        return (accountMatches && tokenTypeMatches) ? parsedKey : null;
    }

    /**
     * add value to storage
     * @param key
     * @param value
     * @param enableCookieStorage
     */
    setItem(key: string, value: string, enableCookieStorage?: boolean): void {
        super.setItem(this.generateCacheKey(key, true), value, enableCookieStorage);

        // Values stored in cookies will have rollback disabled to minimize cookie length
        if (this.rollbackEnabled && !enableCookieStorage) {
            super.setItem(this.generateCacheKey(key, false), value, enableCookieStorage);
        }
    }

    /**
     * get one item by key from storage
     * @param key
     * @param enableCookieStorage
     */
    getItem(key: string, enableCookieStorage?: boolean): string {
        return super.getItem(this.generateCacheKey(key, true), enableCookieStorage);
    }

    /**
     * remove value from storage
     * @param key
     */
    removeItem(key: string): void {
        this.temporaryCache.removeItem(this.generateCacheKey(key, true));
        super.removeItem(this.generateCacheKey(key, true));
        if (this.rollbackEnabled) {
            super.removeItem(this.generateCacheKey(key, false));
        }
    }

    /**
     * Sets temporary cache value
     * @param key 
     * @param value 
     * @param enableCookieStorage 
     */
    setTemporaryItem(key: string, value: string, enableCookieStorage?: boolean): void {
        this.temporaryCache.setItem(this.generateCacheKey(key, true), value, enableCookieStorage);
    }

    /**
     * Gets temporary cache value
     * @param key 
     * @param enableCookieStorage 
     */
    getTemporaryItem(key: string, enableCookieStorage?: boolean): string {
        return this.temporaryCache.getItem(this.generateCacheKey(key, true), enableCookieStorage);
    }

    /**
     * Reset the cache items
     */
    resetCacheItems(): void {
        const storage = window[this.cacheLocation];
        let key: string;
        for (key in storage) {
            // Check if key contains msal prefix; For now, we are clearing all cache items created by MSAL.js
            if (storage.hasOwnProperty(key) && (key.indexOf(Constants.cachePrefix) !== -1)) {
                super.removeItem(key);
                // TODO: Clear cache based on client id (clarify use cases where this is needed)
            }
        }
    }

    /**
     * Reset all temporary cache items
     */
    resetTempCacheItems(state?: string): void {
        const stateId = state && RequestUtils.parseLibraryState(state).id;
        const isTokenRenewalInProgress = this.tokenRenewalInProgress(state);

        const storage = window[this.cacheLocation];
        // check state and remove associated cache
        if (stateId && !isTokenRenewalInProgress) {
            Object.keys(storage).forEach(key => {
                if (key.indexOf(stateId) !== -1) {
                    this.removeItem(key);
                    super.clearItemCookie(key);
                }
            });
        }
        // delete the interaction status cache
        this.setInteractionInProgress(false);
        this.removeItem(TemporaryCacheKeys.REDIRECT_REQUEST);
    }

    /**
     * Set cookies for IE
     * @param cName
     * @param cValue
     * @param expires
     */
    setItemCookie(cName: string, cValue: string, expires?: number): void {
        super.setItemCookie(this.generateCacheKey(cName, true), cValue, expires);
        if (this.rollbackEnabled) {
            super.setItemCookie(this.generateCacheKey(cName, false), cValue, expires);
        }
    }

    clearItemCookie(cName: string): void {
        super.clearItemCookie(this.generateCacheKey(cName, true));
        if (this.rollbackEnabled) {
            super.clearItemCookie(this.generateCacheKey(cName, false));
        }
    }

    /**
     * get one item by key from cookies
     * @param cName
     */
    getItemCookie(cName: string): string {
        return super.getItemCookie(this.generateCacheKey(cName, true));
    }

    /**
     * Get all tokens of a certain type from the cache
     * @param clientId 
     * @param homeAccountIdentifier 
     * @param tokenType
     */
    getAllTokensByType(clientId: string, homeAccountIdentifier: string, tokenType: string): Array<AccessTokenCacheItem> {
        const results = Object.keys(window[this.cacheLocation]).reduce((tokens, key) => {
            const matchedTokenKey: AccessTokenKey = this.matchKeyForType(key, clientId, homeAccountIdentifier, tokenType);
            if (matchedTokenKey) {
                const value = this.getItem(key);
                if (value) {
                    try {
                        const newAccessTokenCacheItem = new AccessTokenCacheItem(matchedTokenKey, JSON.parse(value));
                        return tokens.concat([ newAccessTokenCacheItem ]);
                    } catch (err) {
                        // Skip cache items with non-valid JSON values
                        return tokens;
                    }
                }
            }

            return tokens;
        }, []);
        return results;
    }

    /**
     * Get all access tokens in the cache
     * @param clientId
     * @param homeAccountIdentifier
     */
    getAllAccessTokens(clientId: string, homeAccountIdentifier: string): Array<AccessTokenCacheItem> {
        return this.getAllTokensByType(clientId, homeAccountIdentifier, ServerHashParamKeys.ACCESS_TOKEN);
    }

    /**
     * Get all id tokens in the cache in the form of AccessTokenCacheItem objects so they are 
     * in a normalized format and can make use of the existing cached access token validation logic
     */
    getAllIdTokens(clientId: string, homeAccountIdentifier: string): Array<AccessTokenCacheItem> {
        return this.getAllTokensByType(clientId, homeAccountIdentifier, ServerHashParamKeys.ID_TOKEN);
    }

    /**
     * Get all access and ID tokens in the cache
     * @param clientId 
     * @param homeAccountIdentifier 
     */
    getAllTokens(clientId: string, homeAccountIdentifier: string): Array<AccessTokenCacheItem> {
        const accessTokens = this.getAllAccessTokens(clientId, homeAccountIdentifier);
        const idTokens =  this.getAllIdTokens(clientId, homeAccountIdentifier);
        return [...accessTokens, ...idTokens];
    }

    /**
     * Returns whether or not interaction is currently in progress. Optionally scope it to just this clientId
     * @param forThisClient 
     */
    isInteractionInProgress(matchClientId: boolean): boolean {
        const clientId = this.getInteractionInProgress();
        if (matchClientId) {
            return clientId === this.clientId;
        } else {
            return !!clientId;
        }
    }

    /**
     * Returns the clientId of the interaction currently in progress
     */
    getInteractionInProgress(): string {
        return this.getTemporaryItem(this.generateCacheKey(TemporaryCacheKeys.INTERACTION_STATUS, false));
    }

    /**
     * Sets interaction in progress state
     * @param isInProgress 
     */
    setInteractionInProgress(newInProgressValue: boolean): void {
        if (newInProgressValue) {
            if (this.isInteractionInProgress(false)) {
                throw ClientAuthError.createAcquireTokenInProgressError();
            } else {
                // Ensure we don't overwrite interaction in progress for a different clientId
                this.setTemporaryItem(this.generateCacheKey(TemporaryCacheKeys.INTERACTION_STATUS, false), this.clientId);
            }
        } else if (!newInProgressValue && this.isInteractionInProgress(true)) {
            // Only remove if the current in progress interaction is for this clientId
            this.removeItem(this.generateCacheKey(TemporaryCacheKeys.INTERACTION_STATUS, false));
        }
    }

    /**
     * Return if the token renewal is still in progress
     * 
     * @param stateValue
     */
    private tokenRenewalInProgress(stateValue: string): boolean {
        const renewStatus = this.getItem(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.RENEW_STATUS, stateValue));
        return !!(renewStatus && renewStatus === Constants.inProgress);
    }

    /**
     * Clear all cookies
     */
    public clearMsalCookie(state?: string): void {
        /*
         * If state is truthy, remove values associated with that request.
         * Otherwise, remove all MSAL cookies.
         */
        if (state) {
            this.clearItemCookie(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.NONCE_IDTOKEN, state));
            this.clearItemCookie(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.STATE_LOGIN, state));
            this.clearItemCookie(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.LOGIN_REQUEST, state));
            this.clearItemCookie(AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.STATE_ACQ_TOKEN, state));
        } else {
            const cookies = document.cookie.split(";");
            cookies.forEach(cookieString => {
                const [
                    cookieName
                ] = cookieString.trim().split("=");

                if (cookieName.indexOf(Constants.cachePrefix) > -1) {
                    super.clearItemCookie(cookieName);
                }
            });
        }
    }

    /**
     * Create acquireTokenAccountKey to cache account object
     * @param accountId
     * @param state
     */
    public static generateAcquireTokenAccountKey(accountId: string, state: string): string {
        const stateId = RequestUtils.parseLibraryState(state).id;
        return `${TemporaryCacheKeys.ACQUIRE_TOKEN_ACCOUNT}${Constants.resourceDelimiter}${accountId}${Constants.resourceDelimiter}${stateId}`;
    }

    /**
     * Create authorityKey to cache authority
     * @param state
     */
    public static generateAuthorityKey(state: string): string {
        return AuthCache.generateTemporaryCacheKey(TemporaryCacheKeys.AUTHORITY, state);
    }

    /**
     * Generates the cache key for temporary cache items, using request state
     * @param tempCacheKey Cache key prefix
     * @param state Request state value
     */
    public static generateTemporaryCacheKey(tempCacheKey: TemporaryCacheKeys, state: string): string {
        // Use the state id (a guid), in the interest of shorter key names, which is important for cookies.
        const stateId = RequestUtils.parseLibraryState(state).id;
        return `${tempCacheKey}${Constants.resourceDelimiter}${stateId}`;
    }
}
