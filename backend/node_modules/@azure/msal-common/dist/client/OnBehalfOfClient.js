/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends, __awaiter, __generator } from '../_virtual/_tslib.js';
import { BaseClient } from './BaseClient.js';
import { RequestParameterBuilder } from '../request/RequestParameterBuilder.js';
import { ScopeSet } from '../request/ScopeSet.js';
import { CredentialType, GrantType, AADServerParamKeys, CacheOutcome, Constants } from '../utils/Constants.js';
import { ResponseHandler } from '../response/ResponseHandler.js';
import { TimeUtils } from '../utils/TimeUtils.js';
import { AuthToken } from '../account/AuthToken.js';
import { ClientAuthError } from '../error/ClientAuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * On-Behalf-Of client
 */
var OnBehalfOfClient = /** @class */ (function (_super) {
    __extends(OnBehalfOfClient, _super);
    function OnBehalfOfClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Public API to acquire tokens with on behalf of flow
     * @param request
     */
    OnBehalfOfClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedAuthenticationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.scopeSet = new ScopeSet(request.scopes || []);
                        if (!request.skipCache) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.executeTokenRequest(request, this.authority)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.getCachedAuthenticationResult(request)];
                    case 3:
                        cachedAuthenticationResult = _a.sent();
                        if (!cachedAuthenticationResult) return [3 /*break*/, 4];
                        return [2 /*return*/, cachedAuthenticationResult];
                    case 4: return [4 /*yield*/, this.executeTokenRequest(request, this.authority)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * look up cache for tokens
     * @param request
     */
    OnBehalfOfClient.prototype.getCachedAuthenticationResult = function (request) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cachedAccessToken, cachedIdToken, idTokenObject, cachedAccount, localAccountId, accountInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cachedAccessToken = this.readAccessTokenFromCache();
                        if (!cachedAccessToken ||
                            TimeUtils.isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
                            // Update the server telemetry outcome
                            (_a = this.serverTelemetryManager) === null || _a === void 0 ? void 0 : _a.setCacheOutcome(!cachedAccessToken ? CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED : CacheOutcome.NO_CACHED_ACCESS_TOKEN);
                            return [2 /*return*/, null];
                        }
                        cachedIdToken = this.readIdTokenFromCache(request);
                        cachedAccount = null;
                        if (cachedIdToken) {
                            idTokenObject = new AuthToken(cachedIdToken.secret, this.config.cryptoInterface);
                            localAccountId = idTokenObject.claims.oid ? idTokenObject.claims.oid : idTokenObject.claims.sub;
                            accountInfo = {
                                homeAccountId: cachedIdToken.homeAccountId,
                                environment: cachedIdToken.environment,
                                tenantId: cachedIdToken.realm,
                                username: Constants.EMPTY_STRING,
                                localAccountId: localAccountId || ""
                            };
                            cachedAccount = this.readAccountFromCache(accountInfo);
                        }
                        return [4 /*yield*/, ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, {
                                account: cachedAccount,
                                accessToken: cachedAccessToken,
                                idToken: cachedIdToken,
                                refreshToken: null,
                                appMetadata: null
                            }, true, request, idTokenObject)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * read access token from cache TODO: CacheManager API should be used here
     * @param request
     */
    OnBehalfOfClient.prototype.readAccessTokenFromCache = function () {
        var accessTokenFilter = {
            environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
            credentialType: CredentialType.ACCESS_TOKEN,
            clientId: this.config.authOptions.clientId,
            realm: this.authority.tenant,
            target: this.scopeSet.printScopesLowerCase(),
        };
        var credentialCache = this.cacheManager.getCredentialsFilteredBy(accessTokenFilter);
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
     * read idtoken from cache TODO: CacheManager API should be used here instead
     * @param request
     */
    OnBehalfOfClient.prototype.readIdTokenFromCache = function (request) {
        var idTokenFilter = {
            environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
            credentialType: CredentialType.ID_TOKEN,
            clientId: this.config.authOptions.clientId,
            realm: this.authority.tenant,
            oboAssertion: request.oboAssertion
        };
        var credentialCache = this.cacheManager.getCredentialsFilteredBy(idTokenFilter);
        var idTokens = Object.keys(credentialCache.idTokens).map(function (key) { return credentialCache.idTokens[key]; });
        // When acquiring a token on behalf of an application, there might not be an id token in the cache
        if (idTokens.length < 1) {
            return null;
        }
        return idTokens[0];
    };
    /**
     * read account from cache, TODO: CacheManager API should be used here instead
     * @param account
     */
    OnBehalfOfClient.prototype.readAccountFromCache = function (account) {
        return this.cacheManager.readAccountFromCache(account);
    };
    /**
     * Make a network call to the server requesting credentials
     * @param request
     * @param authority
     */
    OnBehalfOfClient.prototype.executeTokenRequest = function (request, authority) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, headers, thumbprint, reqTimestamp, response, responseHandler, tokenResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestBody = this.createTokenRequestBody(request);
                        headers = this.createTokenRequestHeaders();
                        thumbprint = {
                            clientId: this.config.authOptions.clientId,
                            authority: request.authority,
                            scopes: request.scopes
                        };
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.executePostToTokenEndpoint(authority.tokenEndpoint, requestBody, headers, thumbprint)];
                    case 1:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        responseHandler.validateTokenResponse(response.body);
                        return [4 /*yield*/, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request)];
                    case 2:
                        tokenResponse = _a.sent();
                        return [2 /*return*/, tokenResponse];
                }
            });
        });
    };
    /**
     * generate a server request in accepable format
     * @param request
     */
    OnBehalfOfClient.prototype.createTokenRequestBody = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addGrantType(GrantType.JWT_BEARER);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        parameterBuilder.addRequestTokenUse(AADServerParamKeys.ON_BEHALF_OF);
        parameterBuilder.addOboAssertion(request.oboAssertion);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            var clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(clientAssertion.assertion);
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        return parameterBuilder.createQueryString();
    };
    return OnBehalfOfClient;
}(BaseClient));

export { OnBehalfOfClient };
//# sourceMappingURL=OnBehalfOfClient.js.map
