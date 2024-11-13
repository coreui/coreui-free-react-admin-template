"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCache = void 0;
var tslib_1 = require("tslib");
var Constants_1 = require("../utils/Constants");
var AccessTokenCacheItem_1 = require("./AccessTokenCacheItem");
var BrowserStorage_1 = require("./BrowserStorage");
var RequestUtils_1 = require("../utils/RequestUtils");
var StringUtils_1 = require("../utils/StringUtils");
var IdToken_1 = require("../IdToken");
var ClientAuthError_1 = require("../error/ClientAuthError");
/**
 * @hidden
 */
var AuthCache = /** @class */ (function (_super) {
    tslib_1.__extends(AuthCache, _super);
    function AuthCache(clientId, cacheLocation, storeAuthStateInCookie) {
        var _this = _super.call(this, cacheLocation) || this;
        _this.temporaryCache = new BrowserStorage_1.BrowserStorage(Constants_1.SESSION_STORAGE);
        _this.clientId = clientId;
        // This is hardcoded to true for now. We may make this configurable in the future
        _this.rollbackEnabled = true;
        _this.migrateCacheEntries(storeAuthStateInCookie);
        return _this;
    }
    /**
     * Support roll back to old cache schema until the next major release: true by default now
     * @param storeAuthStateInCookie
     */
    AuthCache.prototype.migrateCacheEntries = function (storeAuthStateInCookie) {
        var _this = this;
        var idTokenKey = Constants_1.Constants.cachePrefix + "." + Constants_1.PersistentCacheKeys.IDTOKEN;
        var clientInfoKey = Constants_1.Constants.cachePrefix + "." + Constants_1.PersistentCacheKeys.CLIENT_INFO;
        var errorKey = Constants_1.Constants.cachePrefix + "." + Constants_1.ErrorCacheKeys.ERROR;
        var errorDescKey = Constants_1.Constants.cachePrefix + "." + Constants_1.ErrorCacheKeys.ERROR_DESC;
        var idTokenValue = _super.prototype.getItem.call(this, idTokenKey);
        var idToken;
        if (idTokenValue) {
            try {
                idToken = new IdToken_1.IdToken(idTokenValue);
            }
            catch (e) {
                return;
            }
        }
        if (idToken && idToken.claims && idToken.claims.aud === this.clientId) {
            var clientInfoValue = _super.prototype.getItem.call(this, clientInfoKey);
            var errorValue = _super.prototype.getItem.call(this, errorKey);
            var errorDescValue = _super.prototype.getItem.call(this, errorDescKey);
            var values_1 = [idTokenValue, clientInfoValue, errorValue, errorDescValue];
            var keysToMigrate = [Constants_1.PersistentCacheKeys.IDTOKEN, Constants_1.PersistentCacheKeys.CLIENT_INFO, Constants_1.ErrorCacheKeys.ERROR, Constants_1.ErrorCacheKeys.ERROR_DESC];
            keysToMigrate.forEach(function (cacheKey, index) { return _this.duplicateCacheEntry(cacheKey, values_1[index], storeAuthStateInCookie); });
        }
    };
    /**
     * Utility function to help with roll back keys
     * @param newKey
     * @param value
     * @param storeAuthStateInCookie
     */
    AuthCache.prototype.duplicateCacheEntry = function (newKey, value, storeAuthStateInCookie) {
        if (value) {
            this.setItem(newKey, value, storeAuthStateInCookie);
        }
    };
    /**
     * Prepend msal.<client-id> to each key; Skip for any JSON object as Key (defined schemas do not need the key appended: AccessToken Keys or the upcoming schema)
     * @param key
     * @param addInstanceId
     */
    AuthCache.prototype.generateCacheKey = function (key, addInstanceId) {
        try {
            // Defined schemas do not need the key appended
            JSON.parse(key);
            return key;
        }
        catch (e) {
            if (key.indexOf("" + Constants_1.Constants.cachePrefix) === 0 || key.indexOf(Constants_1.Constants.adalIdToken) === 0) {
                return key;
            }
            return addInstanceId ? Constants_1.Constants.cachePrefix + "." + this.clientId + "." + key : Constants_1.Constants.cachePrefix + "." + key;
        }
    };
    /**
     * Validates that the input cache key contains the account search terms (clientId and homeAccountIdentifier) and
     * then whether or not it contains the "scopes", depending on the token type being searched for. With matching account
     * search terms, Access Token search tries to match the "scopes" keyword, while Id Token search expects "scopes" to not be included.
     * @param key
     * @param clientId
     * @param homeAccountIdentifier
     * @param tokenType
     */
    AuthCache.prototype.matchKeyForType = function (key, clientId, homeAccountIdentifier, tokenType) {
        // All valid token cache item keys are valid JSON objects, ignore keys that aren't
        var parsedKey = StringUtils_1.StringUtils.validateAndParseJsonCacheKey(key);
        if (!parsedKey) {
            return null;
        }
        // Does the cache item match the request account
        var accountMatches = key.match(clientId) && key.match(homeAccountIdentifier);
        // Does the cache item match the requested token type
        var tokenTypeMatches = false;
        switch (tokenType) {
            case Constants_1.ServerHashParamKeys.ACCESS_TOKEN:
                // Cache item is an access token if scopes are included in the cache item key
                tokenTypeMatches = !!key.match(Constants_1.Constants.scopes);
                break;
            case Constants_1.ServerHashParamKeys.ID_TOKEN:
                // Cache may be an ID token if scopes are NOT included in the cache item key
                tokenTypeMatches = !key.match(Constants_1.Constants.scopes);
                break;
        }
        return (accountMatches && tokenTypeMatches) ? parsedKey : null;
    };
    /**
     * add value to storage
     * @param key
     * @param value
     * @param enableCookieStorage
     */
    AuthCache.prototype.setItem = function (key, value, enableCookieStorage) {
        _super.prototype.setItem.call(this, this.generateCacheKey(key, true), value, enableCookieStorage);
        // Values stored in cookies will have rollback disabled to minimize cookie length
        if (this.rollbackEnabled && !enableCookieStorage) {
            _super.prototype.setItem.call(this, this.generateCacheKey(key, false), value, enableCookieStorage);
        }
    };
    /**
     * get one item by key from storage
     * @param key
     * @param enableCookieStorage
     */
    AuthCache.prototype.getItem = function (key, enableCookieStorage) {
        return _super.prototype.getItem.call(this, this.generateCacheKey(key, true), enableCookieStorage);
    };
    /**
     * remove value from storage
     * @param key
     */
    AuthCache.prototype.removeItem = function (key) {
        this.temporaryCache.removeItem(this.generateCacheKey(key, true));
        _super.prototype.removeItem.call(this, this.generateCacheKey(key, true));
        if (this.rollbackEnabled) {
            _super.prototype.removeItem.call(this, this.generateCacheKey(key, false));
        }
    };
    /**
     * Sets temporary cache value
     * @param key
     * @param value
     * @param enableCookieStorage
     */
    AuthCache.prototype.setTemporaryItem = function (key, value, enableCookieStorage) {
        this.temporaryCache.setItem(this.generateCacheKey(key, true), value, enableCookieStorage);
    };
    /**
     * Gets temporary cache value
     * @param key
     * @param enableCookieStorage
     */
    AuthCache.prototype.getTemporaryItem = function (key, enableCookieStorage) {
        return this.temporaryCache.getItem(this.generateCacheKey(key, true), enableCookieStorage);
    };
    /**
     * Reset the cache items
     */
    AuthCache.prototype.resetCacheItems = function () {
        var storage = window[this.cacheLocation];
        var key;
        for (key in storage) {
            // Check if key contains msal prefix; For now, we are clearing all cache items created by MSAL.js
            if (storage.hasOwnProperty(key) && (key.indexOf(Constants_1.Constants.cachePrefix) !== -1)) {
                _super.prototype.removeItem.call(this, key);
                // TODO: Clear cache based on client id (clarify use cases where this is needed)
            }
        }
    };
    /**
     * Reset all temporary cache items
     */
    AuthCache.prototype.resetTempCacheItems = function (state) {
        var _this = this;
        var stateId = state && RequestUtils_1.RequestUtils.parseLibraryState(state).id;
        var isTokenRenewalInProgress = this.tokenRenewalInProgress(state);
        var storage = window[this.cacheLocation];
        // check state and remove associated cache
        if (stateId && !isTokenRenewalInProgress) {
            Object.keys(storage).forEach(function (key) {
                if (key.indexOf(stateId) !== -1) {
                    _this.removeItem(key);
                    _super.prototype.clearItemCookie.call(_this, key);
                }
            });
        }
        // delete the interaction status cache
        this.setInteractionInProgress(false);
        this.removeItem(Constants_1.TemporaryCacheKeys.REDIRECT_REQUEST);
    };
    /**
     * Set cookies for IE
     * @param cName
     * @param cValue
     * @param expires
     */
    AuthCache.prototype.setItemCookie = function (cName, cValue, expires) {
        _super.prototype.setItemCookie.call(this, this.generateCacheKey(cName, true), cValue, expires);
        if (this.rollbackEnabled) {
            _super.prototype.setItemCookie.call(this, this.generateCacheKey(cName, false), cValue, expires);
        }
    };
    AuthCache.prototype.clearItemCookie = function (cName) {
        _super.prototype.clearItemCookie.call(this, this.generateCacheKey(cName, true));
        if (this.rollbackEnabled) {
            _super.prototype.clearItemCookie.call(this, this.generateCacheKey(cName, false));
        }
    };
    /**
     * get one item by key from cookies
     * @param cName
     */
    AuthCache.prototype.getItemCookie = function (cName) {
        return _super.prototype.getItemCookie.call(this, this.generateCacheKey(cName, true));
    };
    /**
     * Get all tokens of a certain type from the cache
     * @param clientId
     * @param homeAccountIdentifier
     * @param tokenType
     */
    AuthCache.prototype.getAllTokensByType = function (clientId, homeAccountIdentifier, tokenType) {
        var _this = this;
        var results = Object.keys(window[this.cacheLocation]).reduce(function (tokens, key) {
            var matchedTokenKey = _this.matchKeyForType(key, clientId, homeAccountIdentifier, tokenType);
            if (matchedTokenKey) {
                var value = _this.getItem(key);
                if (value) {
                    try {
                        var newAccessTokenCacheItem = new AccessTokenCacheItem_1.AccessTokenCacheItem(matchedTokenKey, JSON.parse(value));
                        return tokens.concat([newAccessTokenCacheItem]);
                    }
                    catch (err) {
                        // Skip cache items with non-valid JSON values
                        return tokens;
                    }
                }
            }
            return tokens;
        }, []);
        return results;
    };
    /**
     * Get all access tokens in the cache
     * @param clientId
     * @param homeAccountIdentifier
     */
    AuthCache.prototype.getAllAccessTokens = function (clientId, homeAccountIdentifier) {
        return this.getAllTokensByType(clientId, homeAccountIdentifier, Constants_1.ServerHashParamKeys.ACCESS_TOKEN);
    };
    /**
     * Get all id tokens in the cache in the form of AccessTokenCacheItem objects so they are
     * in a normalized format and can make use of the existing cached access token validation logic
     */
    AuthCache.prototype.getAllIdTokens = function (clientId, homeAccountIdentifier) {
        return this.getAllTokensByType(clientId, homeAccountIdentifier, Constants_1.ServerHashParamKeys.ID_TOKEN);
    };
    /**
     * Get all access and ID tokens in the cache
     * @param clientId
     * @param homeAccountIdentifier
     */
    AuthCache.prototype.getAllTokens = function (clientId, homeAccountIdentifier) {
        var accessTokens = this.getAllAccessTokens(clientId, homeAccountIdentifier);
        var idTokens = this.getAllIdTokens(clientId, homeAccountIdentifier);
        return tslib_1.__spreadArrays(accessTokens, idTokens);
    };
    /**
     * Returns whether or not interaction is currently in progress. Optionally scope it to just this clientId
     * @param forThisClient
     */
    AuthCache.prototype.isInteractionInProgress = function (matchClientId) {
        var clientId = this.getInteractionInProgress();
        if (matchClientId) {
            return clientId === this.clientId;
        }
        else {
            return !!clientId;
        }
    };
    /**
     * Returns the clientId of the interaction currently in progress
     */
    AuthCache.prototype.getInteractionInProgress = function () {
        return this.getTemporaryItem(this.generateCacheKey(Constants_1.TemporaryCacheKeys.INTERACTION_STATUS, false));
    };
    /**
     * Sets interaction in progress state
     * @param isInProgress
     */
    AuthCache.prototype.setInteractionInProgress = function (newInProgressValue) {
        if (newInProgressValue) {
            if (this.isInteractionInProgress(false)) {
                throw ClientAuthError_1.ClientAuthError.createAcquireTokenInProgressError();
            }
            else {
                // Ensure we don't overwrite interaction in progress for a different clientId
                this.setTemporaryItem(this.generateCacheKey(Constants_1.TemporaryCacheKeys.INTERACTION_STATUS, false), this.clientId);
            }
        }
        else if (!newInProgressValue && this.isInteractionInProgress(true)) {
            // Only remove if the current in progress interaction is for this clientId
            this.removeItem(this.generateCacheKey(Constants_1.TemporaryCacheKeys.INTERACTION_STATUS, false));
        }
    };
    /**
     * Return if the token renewal is still in progress
     *
     * @param stateValue
     */
    AuthCache.prototype.tokenRenewalInProgress = function (stateValue) {
        var renewStatus = this.getItem(AuthCache.generateTemporaryCacheKey(Constants_1.TemporaryCacheKeys.RENEW_STATUS, stateValue));
        return !!(renewStatus && renewStatus === Constants_1.Constants.inProgress);
    };
    /**
     * Clear all cookies
     */
    AuthCache.prototype.clearMsalCookie = function (state) {
        var _this = this;
        /*
         * If state is truthy, remove values associated with that request.
         * Otherwise, remove all MSAL cookies.
         */
        if (state) {
            this.clearItemCookie(AuthCache.generateTemporaryCacheKey(Constants_1.TemporaryCacheKeys.NONCE_IDTOKEN, state));
            this.clearItemCookie(AuthCache.generateTemporaryCacheKey(Constants_1.TemporaryCacheKeys.STATE_LOGIN, state));
            this.clearItemCookie(AuthCache.generateTemporaryCacheKey(Constants_1.TemporaryCacheKeys.LOGIN_REQUEST, state));
            this.clearItemCookie(AuthCache.generateTemporaryCacheKey(Constants_1.TemporaryCacheKeys.STATE_ACQ_TOKEN, state));
        }
        else {
            var cookies = document.cookie.split(";");
            cookies.forEach(function (cookieString) {
                var cookieName = cookieString.trim().split("=")[0];
                if (cookieName.indexOf(Constants_1.Constants.cachePrefix) > -1) {
                    _super.prototype.clearItemCookie.call(_this, cookieName);
                }
            });
        }
    };
    /**
     * Create acquireTokenAccountKey to cache account object
     * @param accountId
     * @param state
     */
    AuthCache.generateAcquireTokenAccountKey = function (accountId, state) {
        var stateId = RequestUtils_1.RequestUtils.parseLibraryState(state).id;
        return "" + Constants_1.TemporaryCacheKeys.ACQUIRE_TOKEN_ACCOUNT + Constants_1.Constants.resourceDelimiter + accountId + Constants_1.Constants.resourceDelimiter + stateId;
    };
    /**
     * Create authorityKey to cache authority
     * @param state
     */
    AuthCache.generateAuthorityKey = function (state) {
        return AuthCache.generateTemporaryCacheKey(Constants_1.TemporaryCacheKeys.AUTHORITY, state);
    };
    /**
     * Generates the cache key for temporary cache items, using request state
     * @param tempCacheKey Cache key prefix
     * @param state Request state value
     */
    AuthCache.generateTemporaryCacheKey = function (tempCacheKey, state) {
        // Use the state id (a guid), in the interest of shorter key names, which is important for cookies.
        var stateId = RequestUtils_1.RequestUtils.parseLibraryState(state).id;
        return "" + tempCacheKey + Constants_1.Constants.resourceDelimiter + stateId;
    };
    return AuthCache;
}(BrowserStorage_1.BrowserStorage));
exports.AuthCache = AuthCache;
//# sourceMappingURL=AuthCache.js.map