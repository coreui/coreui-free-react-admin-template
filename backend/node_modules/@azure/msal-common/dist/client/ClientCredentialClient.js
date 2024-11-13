/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends, __awaiter, __generator } from '../_virtual/_tslib.js';
import { BaseClient } from './BaseClient.js';
import { RequestParameterBuilder } from '../request/RequestParameterBuilder.js';
import { ScopeSet } from '../request/ScopeSet.js';
import { CredentialType, GrantType, CacheOutcome } from '../utils/Constants.js';
import { ResponseHandler } from '../response/ResponseHandler.js';
import { TimeUtils } from '../utils/TimeUtils.js';
import { StringUtils } from '../utils/StringUtils.js';
import { ClientAuthError } from '../error/ClientAuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * OAuth2.0 client credential grant
 */
var ClientCredentialClient = /** @class */ (function (_super) {
    __extends(ClientCredentialClient, _super);
    function ClientCredentialClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Public API to acquire a token with ClientCredential Flow for Confidential clients
     * @param request
     */
    ClientCredentialClient.prototype.acquireToken = function (request) {
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
     * looks up cache if the tokens are cached already
     */
    ClientCredentialClient.prototype.getCachedAuthenticationResult = function (request) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var cachedAccessToken;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cachedAccessToken = this.readAccessTokenFromCache();
                        if (!cachedAccessToken) {
                            (_a = this.serverTelemetryManager) === null || _a === void 0 ? void 0 : _a.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
                            return [2 /*return*/, null];
                        }
                        if (TimeUtils.isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
                            (_b = this.serverTelemetryManager) === null || _b === void 0 ? void 0 : _b.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, {
                                account: null,
                                idToken: null,
                                accessToken: cachedAccessToken,
                                refreshToken: null,
                                appMetadata: null
                            }, true, request)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    /**
     * Reads access token from the cache
     * TODO: Move this call to cacheManager instead
     */
    ClientCredentialClient.prototype.readAccessTokenFromCache = function () {
        var accessTokenFilter = {
            homeAccountId: "",
            environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
            credentialType: CredentialType.ACCESS_TOKEN,
            clientId: this.config.authOptions.clientId,
            realm: this.authority.tenant,
            target: this.scopeSet.printScopesLowerCase()
        };
        var credentialCache = this.cacheManager.getCredentialsFilteredBy(accessTokenFilter);
        var accessTokens = Object.keys(credentialCache.accessTokens).map(function (key) { return credentialCache.accessTokens[key]; });
        if (accessTokens.length < 1) {
            return null;
        }
        else if (accessTokens.length > 1) {
            throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return accessTokens[0];
    };
    /**
     * Makes a network call to request the token from the service
     * @param request
     * @param authority
     */
    ClientCredentialClient.prototype.executeTokenRequest = function (request, authority) {
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
     * generate the request to the server in the acceptable format
     * @param request
     */
    ClientCredentialClient.prototype.createTokenRequestBody = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes, false);
        parameterBuilder.addGrantType(GrantType.CLIENT_CREDENTIALS_GRANT);
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            var clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(clientAssertion.assertion);
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return parameterBuilder.createQueryString();
    };
    return ClientCredentialClient;
}(BaseClient));

export { ClientCredentialClient };
//# sourceMappingURL=ClientCredentialClient.js.map
