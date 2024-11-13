/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __awaiter, __generator } from '../_virtual/_tslib.js';
import { buildClientInfo } from '../account/ClientInfo.js';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { StringUtils } from '../utils/StringUtils.js';
import { ServerError } from '../error/ServerError.js';
import { AuthToken } from '../account/AuthToken.js';
import { ScopeSet } from '../request/ScopeSet.js';
import { AccountEntity } from '../cache/entities/AccountEntity.js';
import { AuthorityType } from '../authority/AuthorityType.js';
import { IdTokenEntity } from '../cache/entities/IdTokenEntity.js';
import { AccessTokenEntity } from '../cache/entities/AccessTokenEntity.js';
import { RefreshTokenEntity } from '../cache/entities/RefreshTokenEntity.js';
import { InteractionRequiredAuthError } from '../error/InteractionRequiredAuthError.js';
import { CacheRecord } from '../cache/entities/CacheRecord.js';
import { ProtocolUtils } from '../utils/ProtocolUtils.js';
import { Constants, AuthenticationScheme, THE_FAMILY_ID } from '../utils/Constants.js';
import { PopTokenGenerator } from '../crypto/PopTokenGenerator.js';
import { AppMetadataEntity } from '../cache/entities/AppMetadataEntity.js';
import { TokenCacheContext } from '../cache/persistence/TokenCacheContext.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class that handles response parsing.
 */
var ResponseHandler = /** @class */ (function () {
    function ResponseHandler(clientId, cacheStorage, cryptoObj, logger, serializableCache, persistencePlugin) {
        this.clientId = clientId;
        this.cacheStorage = cacheStorage;
        this.cryptoObj = cryptoObj;
        this.logger = logger;
        this.serializableCache = serializableCache;
        this.persistencePlugin = persistencePlugin;
    }
    /**
     * Function which validates server authorization code response.
     * @param serverResponseHash
     * @param cachedState
     * @param cryptoObj
     */
    ResponseHandler.prototype.validateServerAuthorizationCodeResponse = function (serverResponseHash, cachedState, cryptoObj) {
        if (!serverResponseHash.state || !cachedState) {
            throw !serverResponseHash.state ? ClientAuthError.createStateNotFoundError("Server State") : ClientAuthError.createStateNotFoundError("Cached State");
        }
        if (decodeURIComponent(serverResponseHash.state) !== decodeURIComponent(cachedState)) {
            throw ClientAuthError.createStateMismatchError();
        }
        // Check for error
        if (serverResponseHash.error || serverResponseHash.error_description || serverResponseHash.suberror) {
            if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponseHash.error, serverResponseHash.error_description, serverResponseHash.suberror)) {
                throw new InteractionRequiredAuthError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror);
            }
            throw new ServerError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror);
        }
        if (serverResponseHash.client_info) {
            buildClientInfo(serverResponseHash.client_info, cryptoObj);
        }
    };
    /**
     * Function which validates server authorization token response.
     * @param serverResponse
     */
    ResponseHandler.prototype.validateTokenResponse = function (serverResponse) {
        // Check for error
        if (serverResponse.error || serverResponse.error_description || serverResponse.suberror) {
            if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponse.error, serverResponse.error_description, serverResponse.suberror)) {
                throw new InteractionRequiredAuthError(serverResponse.error, serverResponse.error_description, serverResponse.suberror);
            }
            var errString = serverResponse.error_codes + " - [" + serverResponse.timestamp + "]: " + serverResponse.error_description + " - Correlation ID: " + serverResponse.correlation_id + " - Trace ID: " + serverResponse.trace_id;
            throw new ServerError(serverResponse.error, errString, serverResponse.suberror);
        }
    };
    /**
     * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
     * @param serverTokenResponse
     * @param authority
     */
    ResponseHandler.prototype.handleServerTokenResponse = function (serverTokenResponse, authority, reqTimestamp, request, authCodePayload, oboAssertion, handlingRefreshTokenResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var idTokenObj, requestStateObj, cacheRecord, cacheContext, key, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (serverTokenResponse.id_token) {
                            idTokenObj = new AuthToken(serverTokenResponse.id_token || Constants.EMPTY_STRING, this.cryptoObj);
                            // token nonce check (TODO: Add a warning if no nonce is given?)
                            if (authCodePayload && !StringUtils.isEmpty(authCodePayload.nonce)) {
                                if (idTokenObj.claims.nonce !== authCodePayload.nonce) {
                                    throw ClientAuthError.createNonceMismatchError();
                                }
                            }
                        }
                        // generate homeAccountId
                        this.homeAccountIdentifier = AccountEntity.generateHomeAccountId(serverTokenResponse.client_info || Constants.EMPTY_STRING, authority.authorityType, this.logger, this.cryptoObj, idTokenObj);
                        if (!!authCodePayload && !!authCodePayload.state) {
                            requestStateObj = ProtocolUtils.parseRequestState(this.cryptoObj, authCodePayload.state);
                        }
                        cacheRecord = this.generateCacheRecord(serverTokenResponse, authority, reqTimestamp, idTokenObj, request.scopes, oboAssertion, authCodePayload);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 4, 7]);
                        if (!(this.persistencePlugin && this.serializableCache)) return [3 /*break*/, 3];
                        this.logger.verbose("Persistence enabled, calling beforeCacheAccess");
                        cacheContext = new TokenCacheContext(this.serializableCache, true);
                        return [4 /*yield*/, this.persistencePlugin.beforeCacheAccess(cacheContext)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        /*
                         * When saving a refreshed tokens to the cache, it is expected that the account that was used is present in the cache.
                         * If not present, we should return null, as it's the case that another application called removeAccount in between
                         * the calls to getAllAccounts and acquireTokenSilent. We should not overwrite that removal.
                         */
                        if (handlingRefreshTokenResponse && cacheRecord.account) {
                            key = cacheRecord.account.generateAccountKey();
                            account = this.cacheStorage.getAccount(key);
                            if (!account) {
                                this.logger.warning("Account used to refresh tokens not in persistence, refreshed tokens will not be stored in the cache");
                                return [2 /*return*/, ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenObj, requestStateObj)];
                            }
                        }
                        this.cacheStorage.saveCacheRecord(cacheRecord);
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(this.persistencePlugin && this.serializableCache && cacheContext)) return [3 /*break*/, 6];
                        this.logger.verbose("Persistence enabled, calling afterCacheAccess");
                        return [4 /*yield*/, this.persistencePlugin.afterCacheAccess(cacheContext)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/, ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenObj, requestStateObj)];
                }
            });
        });
    };
    /**
     * Generates CacheRecord
     * @param serverTokenResponse
     * @param idTokenObj
     * @param authority
     */
    ResponseHandler.prototype.generateCacheRecord = function (serverTokenResponse, authority, reqTimestamp, idTokenObj, requestScopes, oboAssertion, authCodePayload) {
        var env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        // IdToken: non AAD scenarios can have empty realm
        var cachedIdToken;
        var cachedAccount;
        if (!StringUtils.isEmpty(serverTokenResponse.id_token) && !!idTokenObj) {
            cachedIdToken = IdTokenEntity.createIdTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.id_token || Constants.EMPTY_STRING, this.clientId, idTokenObj.claims.tid || Constants.EMPTY_STRING, oboAssertion);
            cachedAccount = this.generateAccountEntity(serverTokenResponse, idTokenObj, authority, oboAssertion, authCodePayload);
        }
        // AccessToken
        var cachedAccessToken = null;
        if (!StringUtils.isEmpty(serverTokenResponse.access_token)) {
            // If scopes not returned in server response, use request scopes
            var responseScopes = serverTokenResponse.scope ? ScopeSet.fromString(serverTokenResponse.scope) : new ScopeSet(requestScopes || []);
            /*
             * Use timestamp calculated before request
             * Server may return timestamps as strings, parse to numbers if so.
             */
            var expiresIn = (typeof serverTokenResponse.expires_in === "string" ? parseInt(serverTokenResponse.expires_in, 10) : serverTokenResponse.expires_in) || 0;
            var extExpiresIn = (typeof serverTokenResponse.ext_expires_in === "string" ? parseInt(serverTokenResponse.ext_expires_in, 10) : serverTokenResponse.ext_expires_in) || 0;
            var refreshIn = (typeof serverTokenResponse.refresh_in === "string" ? parseInt(serverTokenResponse.refresh_in, 10) : serverTokenResponse.refresh_in) || undefined;
            var tokenExpirationSeconds = reqTimestamp + expiresIn;
            var extendedTokenExpirationSeconds = tokenExpirationSeconds + extExpiresIn;
            var refreshOnSeconds = refreshIn && refreshIn > 0 ? reqTimestamp + refreshIn : undefined;
            // non AAD scenarios can have empty realm
            cachedAccessToken = AccessTokenEntity.createAccessTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.access_token || Constants.EMPTY_STRING, this.clientId, idTokenObj ? idTokenObj.claims.tid || Constants.EMPTY_STRING : authority.tenant, responseScopes.printScopes(), tokenExpirationSeconds, extendedTokenExpirationSeconds, this.cryptoObj, refreshOnSeconds, serverTokenResponse.token_type, oboAssertion);
        }
        // refreshToken
        var cachedRefreshToken = null;
        if (!StringUtils.isEmpty(serverTokenResponse.refresh_token)) {
            cachedRefreshToken = RefreshTokenEntity.createRefreshTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.refresh_token || Constants.EMPTY_STRING, this.clientId, serverTokenResponse.foci, oboAssertion);
        }
        // appMetadata
        var cachedAppMetadata = null;
        if (!StringUtils.isEmpty(serverTokenResponse.foci)) {
            cachedAppMetadata = AppMetadataEntity.createAppMetadataEntity(this.clientId, env, serverTokenResponse.foci);
        }
        return new CacheRecord(cachedAccount, cachedIdToken, cachedAccessToken, cachedRefreshToken, cachedAppMetadata);
    };
    /**
     * Generate Account
     * @param serverTokenResponse
     * @param idToken
     * @param authority
     */
    ResponseHandler.prototype.generateAccountEntity = function (serverTokenResponse, idToken, authority, oboAssertion, authCodePayload) {
        var authorityType = authority.authorityType;
        var cloudGraphHostName = authCodePayload ? authCodePayload.cloud_graph_host_name : "";
        var msGraphhost = authCodePayload ? authCodePayload.msgraph_host : "";
        // ADFS does not require client_info in the response
        if (authorityType === AuthorityType.Adfs) {
            this.logger.verbose("Authority type is ADFS, creating ADFS account");
            return AccountEntity.createGenericAccount(authority, this.homeAccountIdentifier, idToken, oboAssertion, cloudGraphHostName, msGraphhost);
        }
        // This fallback applies to B2C as well as they fall under an AAD account type.
        if (StringUtils.isEmpty(serverTokenResponse.client_info) && authority.protocolMode === "AAD") {
            throw ClientAuthError.createClientInfoEmptyError();
        }
        return serverTokenResponse.client_info ?
            AccountEntity.createAccount(serverTokenResponse.client_info, this.homeAccountIdentifier, authority, idToken, oboAssertion, cloudGraphHostName, msGraphhost) :
            AccountEntity.createGenericAccount(authority, this.homeAccountIdentifier, idToken, oboAssertion, cloudGraphHostName, msGraphhost);
    };
    /**
     * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
     *
     * Optionally takes a state string that is set as-is in the response.
     *
     * @param cacheRecord
     * @param idTokenObj
     * @param fromTokenCache
     * @param stateString
     */
    ResponseHandler.generateAuthenticationResult = function (cryptoObj, authority, cacheRecord, fromTokenCache, request, idTokenObj, requestState) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, responseScopes, expiresOn, extExpiresOn, familyId, popTokenGenerator, uid, tid;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        accessToken = "";
                        responseScopes = [];
                        expiresOn = null;
                        familyId = Constants.EMPTY_STRING;
                        if (!cacheRecord.accessToken) return [3 /*break*/, 4];
                        if (!(cacheRecord.accessToken.tokenType === AuthenticationScheme.POP)) return [3 /*break*/, 2];
                        popTokenGenerator = new PopTokenGenerator(cryptoObj);
                        return [4 /*yield*/, popTokenGenerator.signPopToken(cacheRecord.accessToken.secret, request)];
                    case 1:
                        accessToken = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        accessToken = cacheRecord.accessToken.secret;
                        _d.label = 3;
                    case 3:
                        responseScopes = ScopeSet.fromString(cacheRecord.accessToken.target).asArray();
                        expiresOn = new Date(Number(cacheRecord.accessToken.expiresOn) * 1000);
                        extExpiresOn = new Date(Number(cacheRecord.accessToken.extendedExpiresOn) * 1000);
                        _d.label = 4;
                    case 4:
                        if (cacheRecord.appMetadata) {
                            familyId = cacheRecord.appMetadata.familyId === THE_FAMILY_ID ? THE_FAMILY_ID : Constants.EMPTY_STRING;
                        }
                        uid = (idTokenObj === null || idTokenObj === void 0 ? void 0 : idTokenObj.claims.oid) || (idTokenObj === null || idTokenObj === void 0 ? void 0 : idTokenObj.claims.sub) || Constants.EMPTY_STRING;
                        tid = (idTokenObj === null || idTokenObj === void 0 ? void 0 : idTokenObj.claims.tid) || Constants.EMPTY_STRING;
                        return [2 /*return*/, {
                                authority: authority.canonicalAuthority,
                                uniqueId: uid,
                                tenantId: tid,
                                scopes: responseScopes,
                                account: cacheRecord.account ? cacheRecord.account.getAccountInfo() : null,
                                idToken: idTokenObj ? idTokenObj.rawToken : Constants.EMPTY_STRING,
                                idTokenClaims: idTokenObj ? idTokenObj.claims : {},
                                accessToken: accessToken,
                                fromCache: fromTokenCache,
                                expiresOn: expiresOn,
                                extExpiresOn: extExpiresOn,
                                familyId: familyId,
                                tokenType: ((_a = cacheRecord.accessToken) === null || _a === void 0 ? void 0 : _a.tokenType) || Constants.EMPTY_STRING,
                                state: requestState ? requestState.userRequestState : Constants.EMPTY_STRING,
                                cloudGraphHostName: ((_b = cacheRecord.account) === null || _b === void 0 ? void 0 : _b.cloudGraphHostName) || Constants.EMPTY_STRING,
                                msGraphHost: ((_c = cacheRecord.account) === null || _c === void 0 ? void 0 : _c.msGraphHost) || Constants.EMPTY_STRING
                            }];
                }
            });
        });
    };
    return ResponseHandler;
}());

export { ResponseHandler };
//# sourceMappingURL=ResponseHandler.js.map
