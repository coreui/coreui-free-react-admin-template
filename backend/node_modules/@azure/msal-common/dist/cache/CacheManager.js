/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends } from '../_virtual/_tslib.js';
import { Constants, CredentialType, CacheSchemaType, THE_FAMILY_ID, APP_METADATA, AUTHORITY_METADATA_CONSTANTS, AuthenticationScheme } from '../utils/Constants.js';
import { CredentialEntity } from './entities/CredentialEntity.js';
import { ScopeSet } from '../request/ScopeSet.js';
import { AccountEntity } from './entities/AccountEntity.js';
import { AuthError } from '../error/AuthError.js';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { AuthToken } from '../account/AuthToken.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Interface class which implement cache storage functions used by MSAL to perform validity checks, and store tokens.
 */
var CacheManager = /** @class */ (function () {
    function CacheManager(clientId, cryptoImpl) {
        this.clientId = clientId;
        this.cryptoImpl = cryptoImpl;
    }
    /**
     * Returns all accounts in cache
     */
    CacheManager.prototype.getAllAccounts = function () {
        var _this = this;
        var currentAccounts = this.getAccountsFilteredBy();
        var accountValues = Object.keys(currentAccounts).map(function (accountKey) { return currentAccounts[accountKey]; });
        var numAccounts = accountValues.length;
        if (numAccounts < 1) {
            return [];
        }
        else {
            var allAccounts = accountValues.map(function (value) {
                var accountEntity = CacheManager.toObject(new AccountEntity(), value);
                var accountInfo = accountEntity.getAccountInfo();
                var idToken = _this.readIdTokenFromCache(_this.clientId, accountInfo);
                if (idToken && !accountInfo.idTokenClaims) {
                    accountInfo.idTokenClaims = new AuthToken(idToken.secret, _this.cryptoImpl).claims;
                }
                return accountInfo;
            });
            return allAccounts;
        }
    };
    /**
     * saves a cache record
     * @param cacheRecord
     */
    CacheManager.prototype.saveCacheRecord = function (cacheRecord) {
        if (!cacheRecord) {
            throw ClientAuthError.createNullOrUndefinedCacheRecord();
        }
        if (!!cacheRecord.account) {
            this.setAccount(cacheRecord.account);
        }
        if (!!cacheRecord.idToken) {
            this.setIdTokenCredential(cacheRecord.idToken);
        }
        if (!!cacheRecord.accessToken) {
            this.saveAccessToken(cacheRecord.accessToken);
        }
        if (!!cacheRecord.refreshToken) {
            this.setRefreshTokenCredential(cacheRecord.refreshToken);
        }
        if (!!cacheRecord.appMetadata) {
            this.setAppMetadata(cacheRecord.appMetadata);
        }
    };
    /**
     * saves access token credential
     * @param credential
     */
    CacheManager.prototype.saveAccessToken = function (credential) {
        var _this = this;
        var currentTokenCache = this.getCredentialsFilteredBy({
            clientId: credential.clientId,
            credentialType: credential.credentialType,
            environment: credential.environment,
            homeAccountId: credential.homeAccountId,
            realm: credential.realm,
        });
        var currentScopes = ScopeSet.fromString(credential.target);
        var currentAccessTokens = Object.keys(currentTokenCache.accessTokens).map(function (key) { return currentTokenCache.accessTokens[key]; });
        if (currentAccessTokens) {
            currentAccessTokens.forEach(function (tokenEntity) {
                var tokenScopeSet = ScopeSet.fromString(tokenEntity.target);
                if (tokenScopeSet.intersectingScopeSets(currentScopes)) {
                    _this.removeCredential(tokenEntity);
                }
            });
        }
        this.setAccessTokenCredential(credential);
    };
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    CacheManager.prototype.getAccountsFilteredBy = function (accountFilter) {
        return this.getAccountsFilteredByInternal(accountFilter ? accountFilter.homeAccountId : "", accountFilter ? accountFilter.environment : "", accountFilter ? accountFilter.realm : "");
    };
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    CacheManager.prototype.getAccountsFilteredByInternal = function (homeAccountId, environment, realm) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var matchingAccounts = {};
        allCacheKeys.forEach(function (cacheKey) {
            var entity = _this.getAccount(cacheKey);
            if (!entity) {
                return;
            }
            if (!!homeAccountId && !_this.matchHomeAccountId(entity, homeAccountId)) {
                return;
            }
            if (!!environment && !_this.matchEnvironment(entity, environment)) {
                return;
            }
            if (!!realm && !_this.matchRealm(entity, realm)) {
                return;
            }
            matchingAccounts[cacheKey] = entity;
        });
        return matchingAccounts;
    };
    /**
     * retrieve credentails matching all provided filters; if no filter is set, get all credentials
     * @param homeAccountId
     * @param environment
     * @param credentialType
     * @param clientId
     * @param realm
     * @param target
     */
    CacheManager.prototype.getCredentialsFilteredBy = function (filter) {
        return this.getCredentialsFilteredByInternal(filter.homeAccountId, filter.environment, filter.credentialType, filter.clientId, filter.familyId, filter.realm, filter.target, filter.oboAssertion);
    };
    /**
     * Support function to help match credentials
     * @param homeAccountId
     * @param environment
     * @param credentialType
     * @param clientId
     * @param realm
     * @param target
     */
    CacheManager.prototype.getCredentialsFilteredByInternal = function (homeAccountId, environment, credentialType, clientId, familyId, realm, target, oboAssertion) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var matchingCredentials = {
            idTokens: {},
            accessTokens: {},
            refreshTokens: {},
        };
        allCacheKeys.forEach(function (cacheKey) {
            // don't parse any non-credential type cache entities
            var credType = CredentialEntity.getCredentialType(cacheKey);
            if (credType === Constants.NOT_DEFINED) {
                return;
            }
            // Attempt retrieval
            var entity = _this.getSpecificCredential(cacheKey, credType);
            if (!entity) {
                return;
            }
            if (!!oboAssertion && !_this.matchOboAssertion(entity, oboAssertion)) {
                return;
            }
            if (!!homeAccountId && !_this.matchHomeAccountId(entity, homeAccountId)) {
                return;
            }
            if (!!environment && !_this.matchEnvironment(entity, environment)) {
                return;
            }
            if (!!realm && !_this.matchRealm(entity, realm)) {
                return;
            }
            if (!!credentialType && !_this.matchCredentialType(entity, credentialType)) {
                return;
            }
            if (!!clientId && !_this.matchClientId(entity, clientId)) {
                return;
            }
            if (!!familyId && !_this.matchFamilyId(entity, familyId)) {
                return;
            }
            /*
             * idTokens do not have "target", target specific refreshTokens do exist for some types of authentication
             * Resource specific refresh tokens case will be added when the support is deemed necessary
             */
            if (!!target && !_this.matchTarget(entity, target)) {
                return;
            }
            switch (credType) {
                case CredentialType.ID_TOKEN:
                    matchingCredentials.idTokens[cacheKey] = entity;
                    break;
                case CredentialType.ACCESS_TOKEN:
                case CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME:
                    matchingCredentials.accessTokens[cacheKey] = entity;
                    break;
                case CredentialType.REFRESH_TOKEN:
                    matchingCredentials.refreshTokens[cacheKey] = entity;
                    break;
            }
        });
        return matchingCredentials;
    };
    /**
     * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
     * @param filter
     */
    CacheManager.prototype.getAppMetadataFilteredBy = function (filter) {
        return this.getAppMetadataFilteredByInternal(filter.environment, filter.clientId);
    };
    /**
     * Support function to help match appMetadata
     * @param environment
     * @param clientId
     */
    CacheManager.prototype.getAppMetadataFilteredByInternal = function (environment, clientId) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var matchingAppMetadata = {};
        allCacheKeys.forEach(function (cacheKey) {
            // don't parse any non-appMetadata type cache entities
            if (!_this.isAppMetadata(cacheKey)) {
                return;
            }
            // Attempt retrieval
            var entity = _this.getAppMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (!!environment && !_this.matchEnvironment(entity, environment)) {
                return;
            }
            if (!!clientId && !_this.matchClientId(entity, clientId)) {
                return;
            }
            matchingAppMetadata[cacheKey] = entity;
        });
        return matchingAppMetadata;
    };
    /**
     * retrieve authorityMetadata that contains a matching alias
     * @param filter
     */
    CacheManager.prototype.getAuthorityMetadataByAlias = function (host) {
        var _this = this;
        var allCacheKeys = this.getAuthorityMetadataKeys();
        var matchedEntity = null;
        allCacheKeys.forEach(function (cacheKey) {
            // don't parse any non-authorityMetadata type cache entities
            if (!_this.isAuthorityMetadata(cacheKey) || cacheKey.indexOf(_this.clientId) === -1) {
                return;
            }
            // Attempt retrieval
            var entity = _this.getAuthorityMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (entity.aliases.indexOf(host) === -1) {
                return;
            }
            matchedEntity = entity;
        });
        return matchedEntity;
    };
    /**
     * Removes all accounts and related tokens from cache.
     */
    CacheManager.prototype.removeAllAccounts = function () {
        var _this = this;
        var allCacheKeys = this.getKeys();
        allCacheKeys.forEach(function (cacheKey) {
            var entity = _this.getAccount(cacheKey);
            if (!entity) {
                return;
            }
            _this.removeAccount(cacheKey);
        });
        return true;
    };
    /**
     * returns a boolean if the given account is removed
     * @param account
     */
    CacheManager.prototype.removeAccount = function (accountKey) {
        var account = this.getAccount(accountKey);
        if (!account) {
            throw ClientAuthError.createNoAccountFoundError();
        }
        return (this.removeAccountContext(account) && this.removeItem(accountKey, CacheSchemaType.ACCOUNT));
    };
    /**
     * returns a boolean if the given account is removed
     * @param account
     */
    CacheManager.prototype.removeAccountContext = function (account) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var accountId = account.generateAccountId();
        allCacheKeys.forEach(function (cacheKey) {
            // don't parse any non-credential type cache entities
            var credType = CredentialEntity.getCredentialType(cacheKey);
            if (credType === Constants.NOT_DEFINED) {
                return;
            }
            var cacheEntity = _this.getSpecificCredential(cacheKey, credType);
            if (!!cacheEntity && accountId === cacheEntity.generateAccountId()) {
                _this.removeCredential(cacheEntity);
            }
        });
        return true;
    };
    /**
     * returns a boolean if the given credential is removed
     * @param credential
     */
    CacheManager.prototype.removeCredential = function (credential) {
        var key = credential.generateCredentialKey();
        return this.removeItem(key, CacheSchemaType.CREDENTIAL);
    };
    /**
     * Removes all app metadata objects from cache.
     */
    CacheManager.prototype.removeAppMetadata = function () {
        var _this = this;
        var allCacheKeys = this.getKeys();
        allCacheKeys.forEach(function (cacheKey) {
            if (_this.isAppMetadata(cacheKey)) {
                _this.removeItem(cacheKey, CacheSchemaType.APP_METADATA);
            }
        });
        return true;
    };
    /**
     * Retrieve the cached credentials into a cacherecord
     * @param account
     * @param clientId
     * @param scopes
     * @param environment
     * @param authScheme
     */
    CacheManager.prototype.readCacheRecord = function (account, clientId, scopes, environment, authScheme) {
        var cachedAccount = this.readAccountFromCache(account);
        var cachedIdToken = this.readIdTokenFromCache(clientId, account);
        var cachedAccessToken = this.readAccessTokenFromCache(clientId, account, scopes, authScheme);
        var cachedRefreshToken = this.readRefreshTokenFromCache(clientId, account, false);
        var cachedAppMetadata = this.readAppMetadataFromCache(environment, clientId);
        if (cachedAccount && cachedIdToken) {
            cachedAccount.idTokenClaims = new AuthToken(cachedIdToken.secret, this.cryptoImpl).claims;
        }
        return {
            account: cachedAccount,
            idToken: cachedIdToken,
            accessToken: cachedAccessToken,
            refreshToken: cachedRefreshToken,
            appMetadata: cachedAppMetadata,
        };
    };
    /**
     * Retrieve AccountEntity from cache
     * @param account
     */
    CacheManager.prototype.readAccountFromCache = function (account) {
        var accountKey = AccountEntity.generateAccountCacheKey(account);
        return this.getAccount(accountKey);
    };
    /**
     * Retrieve IdTokenEntity from cache
     * @param clientId
     * @param account
     * @param inputRealm
     */
    CacheManager.prototype.readIdTokenFromCache = function (clientId, account) {
        var idTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: CredentialType.ID_TOKEN,
            clientId: clientId,
            realm: account.tenantId,
        };
        var credentialCache = this.getCredentialsFilteredBy(idTokenFilter);
        var idTokens = Object.keys(credentialCache.idTokens).map(function (key) { return credentialCache.idTokens[key]; });
        var numIdTokens = idTokens.length;
        if (numIdTokens < 1) {
            return null;
        }
        else if (numIdTokens > 1) {
            throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return idTokens[0];
    };
    /**
     * Retrieve AccessTokenEntity from cache
     * @param clientId
     * @param account
     * @param scopes
     * @param authScheme
     */
    CacheManager.prototype.readAccessTokenFromCache = function (clientId, account, scopes, authScheme) {
        var credentialType = (authScheme === AuthenticationScheme.POP) ? CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME : CredentialType.ACCESS_TOKEN;
        var accessTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: credentialType,
            clientId: clientId,
            realm: account.tenantId,
            target: scopes.printScopesLowerCase(),
        };
        var credentialCache = this.getCredentialsFilteredBy(accessTokenFilter);
        var accessTokens = Object.keys(credentialCache.accessTokens).map(function (key) { return credentialCache.accessTokens[key]; });
        var numAccessTokens = accessTokens.length;
        if (numAccessTokens < 1) {
            return null;
        }
        else if (numAccessTokens > 1) {
            throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return accessTokens[0];
    };
    /**
     * Helper to retrieve the appropriate refresh token from cache
     * @param clientId
     * @param account
     * @param familyRT
     */
    CacheManager.prototype.readRefreshTokenFromCache = function (clientId, account, familyRT) {
        var id = familyRT ? THE_FAMILY_ID : undefined;
        var refreshTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: CredentialType.REFRESH_TOKEN,
            clientId: clientId,
            familyId: id
        };
        var credentialCache = this.getCredentialsFilteredBy(refreshTokenFilter);
        var refreshTokens = Object.keys(credentialCache.refreshTokens).map(function (key) { return credentialCache.refreshTokens[key]; });
        var numRefreshTokens = refreshTokens.length;
        if (numRefreshTokens < 1) {
            return null;
        }
        // address the else case after remove functions address environment aliases
        return refreshTokens[0];
    };
    /**
     * Retrieve AppMetadataEntity from cache
     */
    CacheManager.prototype.readAppMetadataFromCache = function (environment, clientId) {
        var appMetadataFilter = {
            environment: environment,
            clientId: clientId,
        };
        var appMetadata = this.getAppMetadataFilteredBy(appMetadataFilter);
        var appMetadataEntries = Object.keys(appMetadata).map(function (key) { return appMetadata[key]; });
        var numAppMetadata = appMetadataEntries.length;
        if (numAppMetadata < 1) {
            return null;
        }
        else if (numAppMetadata > 1) {
            throw ClientAuthError.createMultipleMatchingAppMetadataInCacheError();
        }
        return appMetadataEntries[0];
    };
    /**
     * Return the family_id value associated  with FOCI
     * @param environment
     * @param clientId
     */
    CacheManager.prototype.isAppMetadataFOCI = function (environment, clientId) {
        var appMetadata = this.readAppMetadataFromCache(environment, clientId);
        return !!(appMetadata && appMetadata.familyId === THE_FAMILY_ID);
    };
    /**
     * helper to match account ids
     * @param value
     * @param homeAccountId
     */
    CacheManager.prototype.matchHomeAccountId = function (entity, homeAccountId) {
        return !!(entity.homeAccountId && homeAccountId === entity.homeAccountId);
    };
    /**
     * helper to match assertion
     * @param value
     * @param oboAssertion
     */
    CacheManager.prototype.matchOboAssertion = function (entity, oboAssertion) {
        return !!(entity.oboAssertion && oboAssertion === entity.oboAssertion);
    };
    /**
     * helper to match environment
     * @param value
     * @param environment
     */
    CacheManager.prototype.matchEnvironment = function (entity, environment) {
        var cloudMetadata = this.getAuthorityMetadataByAlias(environment);
        if (cloudMetadata && cloudMetadata.aliases.indexOf(entity.environment) > -1) {
            return true;
        }
        return false;
    };
    /**
     * helper to match credential type
     * @param entity
     * @param credentialType
     */
    CacheManager.prototype.matchCredentialType = function (entity, credentialType) {
        return (entity.credentialType && credentialType.toLowerCase() === entity.credentialType.toLowerCase());
    };
    /**
     * helper to match client ids
     * @param entity
     * @param clientId
     */
    CacheManager.prototype.matchClientId = function (entity, clientId) {
        return !!(entity.clientId && clientId === entity.clientId);
    };
    /**
     * helper to match family ids
     * @param entity
     * @param familyId
     */
    CacheManager.prototype.matchFamilyId = function (entity, familyId) {
        return !!(entity.familyId && familyId === entity.familyId);
    };
    /**
     * helper to match realm
     * @param entity
     * @param realm
     */
    CacheManager.prototype.matchRealm = function (entity, realm) {
        return !!(entity.realm && realm === entity.realm);
    };
    /**
     * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
     * @param entity
     * @param target
     */
    CacheManager.prototype.matchTarget = function (entity, target) {
        var isNotAccessTokenCredential = (entity.credentialType !== CredentialType.ACCESS_TOKEN && entity.credentialType !== CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME);
        if (isNotAccessTokenCredential || !entity.target) {
            return false;
        }
        var entityScopeSet = ScopeSet.fromString(entity.target);
        var requestTargetScopeSet = ScopeSet.fromString(target);
        if (!requestTargetScopeSet.containsOnlyOIDCScopes()) {
            requestTargetScopeSet.removeOIDCScopes(); // ignore OIDC scopes
        }
        else {
            requestTargetScopeSet.removeScope(Constants.OFFLINE_ACCESS_SCOPE);
        }
        return entityScopeSet.containsScopeSet(requestTargetScopeSet);
    };
    /**
     * returns if a given cache entity is of the type appmetadata
     * @param key
     */
    CacheManager.prototype.isAppMetadata = function (key) {
        return key.indexOf(APP_METADATA) !== -1;
    };
    /**
     * returns if a given cache entity is of the type authoritymetadata
     * @param key
     */
    CacheManager.prototype.isAuthorityMetadata = function (key) {
        return key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) !== -1;
    };
    /**
     * returns cache key used for cloud instance metadata
     */
    CacheManager.prototype.generateAuthorityMetadataCacheKey = function (authority) {
        return AUTHORITY_METADATA_CONSTANTS.CACHE_KEY + "-" + this.clientId + "-" + authority;
    };
    /**
     * Returns the specific credential (IdToken/AccessToken/RefreshToken) from the cache
     * @param key
     * @param credType
     */
    CacheManager.prototype.getSpecificCredential = function (key, credType) {
        switch (credType) {
            case CredentialType.ID_TOKEN: {
                return this.getIdTokenCredential(key);
            }
            case CredentialType.ACCESS_TOKEN:
            case CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME: {
                return this.getAccessTokenCredential(key);
            }
            case CredentialType.REFRESH_TOKEN: {
                return this.getRefreshTokenCredential(key);
            }
            default:
                return null;
        }
    };
    /**
     * Helper to convert serialized data to object
     * @param obj
     * @param json
     */
    CacheManager.toObject = function (obj, json) {
        for (var propertyName in json) {
            obj[propertyName] = json[propertyName];
        }
        return obj;
    };
    return CacheManager;
}());
var DefaultStorageClass = /** @class */ (function (_super) {
    __extends(DefaultStorageClass, _super);
    function DefaultStorageClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultStorageClass.prototype.setAccount = function () {
        var notImplErr = "Storage interface - setAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAccount = function () {
        var notImplErr = "Storage interface - getAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setIdTokenCredential = function () {
        var notImplErr = "Storage interface - setIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getIdTokenCredential = function () {
        var notImplErr = "Storage interface - getIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setAccessTokenCredential = function () {
        var notImplErr = "Storage interface - setAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAccessTokenCredential = function () {
        var notImplErr = "Storage interface - getAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setRefreshTokenCredential = function () {
        var notImplErr = "Storage interface - setRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getRefreshTokenCredential = function () {
        var notImplErr = "Storage interface - getRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setAppMetadata = function () {
        var notImplErr = "Storage interface - setAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAppMetadata = function () {
        var notImplErr = "Storage interface - getAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setServerTelemetry = function () {
        var notImplErr = "Storage interface - setServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getServerTelemetry = function () {
        var notImplErr = "Storage interface - getServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setAuthorityMetadata = function () {
        var notImplErr = "Storage interface - setAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAuthorityMetadata = function () {
        var notImplErr = "Storage interface - getAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAuthorityMetadataKeys = function () {
        var notImplErr = "Storage interface - getAuthorityMetadataKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setThrottlingCache = function () {
        var notImplErr = "Storage interface - setThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getThrottlingCache = function () {
        var notImplErr = "Storage interface - getThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.removeItem = function () {
        var notImplErr = "Storage interface - removeItem() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.containsKey = function () {
        var notImplErr = "Storage interface - containsKey() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getKeys = function () {
        var notImplErr = "Storage interface - getKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.clear = function () {
        var notImplErr = "Storage interface - clear() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    return DefaultStorageClass;
}(CacheManager));

export { CacheManager, DefaultStorageClass };
//# sourceMappingURL=CacheManager.js.map
