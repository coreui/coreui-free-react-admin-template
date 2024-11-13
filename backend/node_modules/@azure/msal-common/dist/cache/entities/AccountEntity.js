/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { Separators, CacheAccountType, CacheType, Constants } from '../../utils/Constants.js';
import { buildClientInfo } from '../../account/ClientInfo.js';
import { StringUtils } from '../../utils/StringUtils.js';
import { ClientAuthError } from '../../error/ClientAuthError.js';
import { AuthorityType } from '../../authority/AuthorityType.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Type that defines required and optional parameters for an Account field (based on universal cache schema implemented by all MSALs).
 *
 * Key : Value Schema
 *
 * Key: <home_account_id>-<environment>-<realm*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      localAccountId: Original tenant-specific accountID, usually used for legacy cases
 *      username: primary username that represents the user, usually corresponds to preferred_username in the v2 endpt
 *      authorityType: Accounts authority type as a string
 *      name: Full name for the account, including given name and family name,
 *      clientInfo: Full base64 encoded client info received from ESTS
 *      lastModificationTime: last time this entity was modified in the cache
 *      lastModificationApp:
 *      oboAssertion: access token passed in as part of OBO request
 *      idTokenClaims: Object containing claims parsed from ID token
 * }
 */
var AccountEntity = /** @class */ (function () {
    function AccountEntity() {
    }
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    AccountEntity.prototype.generateAccountId = function () {
        var accountId = [this.homeAccountId, this.environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    };
    /**
     * Generate Account Cache Key as per the schema: <home_account_id>-<environment>-<realm*>
     */
    AccountEntity.prototype.generateAccountKey = function () {
        return AccountEntity.generateAccountCacheKey({
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId
        });
    };
    /**
     * returns the type of the cache (in this case account)
     */
    AccountEntity.prototype.generateType = function () {
        switch (this.authorityType) {
            case CacheAccountType.ADFS_ACCOUNT_TYPE:
                return CacheType.ADFS;
            case CacheAccountType.MSAV1_ACCOUNT_TYPE:
                return CacheType.MSA;
            case CacheAccountType.MSSTS_ACCOUNT_TYPE:
                return CacheType.MSSTS;
            case CacheAccountType.GENERIC_ACCOUNT_TYPE:
                return CacheType.GENERIC;
            default: {
                throw ClientAuthError.createUnexpectedAccountTypeError();
            }
        }
    };
    /**
     * Returns the AccountInfo interface for this account.
     */
    AccountEntity.prototype.getAccountInfo = function () {
        return {
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId,
            name: this.name,
            idTokenClaims: this.idTokenClaims
        };
    };
    /**
     * Generates account key from interface
     * @param accountInterface
     */
    AccountEntity.generateAccountCacheKey = function (accountInterface) {
        var accountKey = [
            accountInterface.homeAccountId,
            accountInterface.environment || "",
            accountInterface.tenantId || "",
        ];
        return accountKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    };
    /**
     * Build Account cache from IdToken, clientInfo and authority/policy. Associated with AAD.
     * @param clientInfo
     * @param authority
     * @param idToken
     * @param policy
     */
    AccountEntity.createAccount = function (clientInfo, homeAccountId, authority, idToken, oboAssertion, cloudGraphHostName, msGraphHost) {
        var _a, _b, _c, _d, _e, _f;
        var account = new AccountEntity();
        account.authorityType = CacheAccountType.MSSTS_ACCOUNT_TYPE;
        account.clientInfo = clientInfo;
        account.homeAccountId = homeAccountId;
        var env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        account.environment = env;
        // non AAD scenarios can have empty realm
        account.realm = ((_a = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _a === void 0 ? void 0 : _a.tid) || "";
        account.oboAssertion = oboAssertion;
        if (idToken) {
            account.idTokenClaims = idToken.claims;
            // How do you account for MSA CID here?
            account.localAccountId = ((_b = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _b === void 0 ? void 0 : _b.oid) || ((_c = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _c === void 0 ? void 0 : _c.sub) || "";
            /*
             * In B2C scenarios the emails claim is used instead of preferred_username and it is an array. In most cases it will contain a single email.
             * This field should not be relied upon if a custom policy is configured to return more than 1 email.
             */
            account.username = ((_d = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _d === void 0 ? void 0 : _d.preferred_username) || (((_e = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _e === void 0 ? void 0 : _e.emails) ? idToken.claims.emails[0] : "");
            account.name = (_f = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _f === void 0 ? void 0 : _f.name;
        }
        account.cloudGraphHostName = cloudGraphHostName;
        account.msGraphHost = msGraphHost;
        return account;
    };
    /**
     * Builds non-AAD/ADFS account.
     * @param authority
     * @param idToken
     */
    AccountEntity.createGenericAccount = function (authority, homeAccountId, idToken, oboAssertion, cloudGraphHostName, msGraphHost) {
        var _a, _b, _c, _d;
        var account = new AccountEntity();
        account.authorityType = (authority.authorityType === AuthorityType.Adfs) ? CacheAccountType.ADFS_ACCOUNT_TYPE : CacheAccountType.GENERIC_ACCOUNT_TYPE;
        account.homeAccountId = homeAccountId;
        // non AAD scenarios can have empty realm
        account.realm = "";
        account.oboAssertion = oboAssertion;
        var env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        if (idToken) {
            // How do you account for MSA CID here?
            account.localAccountId = ((_a = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _a === void 0 ? void 0 : _a.oid) || ((_b = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _b === void 0 ? void 0 : _b.sub) || "";
            // upn claim for most ADFS scenarios
            account.username = ((_c = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _c === void 0 ? void 0 : _c.upn) || "";
            account.name = ((_d = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _d === void 0 ? void 0 : _d.name) || "";
            account.idTokenClaims = idToken === null || idToken === void 0 ? void 0 : idToken.claims;
        }
        account.environment = env;
        account.cloudGraphHostName = cloudGraphHostName;
        account.msGraphHost = msGraphHost;
        /*
         * add uniqueName to claims
         * account.name = idToken.claims.uniqueName;
         */
        return account;
    };
    /**
     * Generate HomeAccountId from server response
     * @param serverClientInfo
     * @param authType
     */
    AccountEntity.generateHomeAccountId = function (serverClientInfo, authType, logger, cryptoObj, idToken) {
        var _a;
        var accountId = ((_a = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _a === void 0 ? void 0 : _a.sub) ? idToken.claims.sub : Constants.EMPTY_STRING;
        // since ADFS does not have tid and does not set client_info
        if (authType === AuthorityType.Adfs) {
            return accountId;
        }
        // for cases where there is clientInfo
        if (serverClientInfo) {
            try {
                var clientInfo = buildClientInfo(serverClientInfo, cryptoObj);
                if (!StringUtils.isEmpty(clientInfo.uid) && !StringUtils.isEmpty(clientInfo.utid)) {
                    return "" + clientInfo.uid + Separators.CLIENT_INFO_SEPARATOR + clientInfo.utid;
                }
            }
            catch (e) { }
        }
        // default to "sub" claim
        logger.verbose("No client info in response");
        return accountId;
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    AccountEntity.isAccountEntity = function (entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("localAccountId") &&
            entity.hasOwnProperty("username") &&
            entity.hasOwnProperty("authorityType"));
    };
    /**
     * Helper function to determine whether 2 accountInfo objects represent the same account
     * @param accountA
     * @param accountB
     * @param compareClaims - If set to true idTokenClaims will also be compared to determine account equality
     */
    AccountEntity.accountInfoIsEqual = function (accountA, accountB, compareClaims) {
        if (!accountA || !accountB) {
            return false;
        }
        var claimsMatch = true; // default to true so as to not fail comparison below if compareClaims: false
        if (compareClaims) {
            var accountAClaims = (accountA.idTokenClaims || {});
            var accountBClaims = (accountB.idTokenClaims || {});
            // issued at timestamp and nonce are expected to change each time a new id token is acquired
            claimsMatch = (accountAClaims.iat === accountBClaims.iat) &&
                (accountAClaims.nonce === accountBClaims.nonce);
        }
        return (accountA.homeAccountId === accountB.homeAccountId) &&
            (accountA.localAccountId === accountB.localAccountId) &&
            (accountA.username === accountB.username) &&
            (accountA.tenantId === accountB.tenantId) &&
            (accountA.environment === accountB.environment) &&
            claimsMatch;
    };
    return AccountEntity;
}());

export { AccountEntity };
//# sourceMappingURL=AccountEntity.js.map
