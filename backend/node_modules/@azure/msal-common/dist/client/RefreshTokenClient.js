/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends, __awaiter, __generator, __assign } from '../_virtual/_tslib.js';
import { BaseClient } from './BaseClient.js';
import { RequestParameterBuilder } from '../request/RequestParameterBuilder.js';
import { AuthenticationScheme, GrantType, Errors } from '../utils/Constants.js';
import { ResponseHandler } from '../response/ResponseHandler.js';
import { PopTokenGenerator } from '../crypto/PopTokenGenerator.js';
import { StringUtils } from '../utils/StringUtils.js';
import { ClientConfigurationError } from '../error/ClientConfigurationError.js';
import { ClientAuthError, ClientAuthErrorMessage } from '../error/ClientAuthError.js';
import { ServerError } from '../error/ServerError.js';
import { TimeUtils } from '../utils/TimeUtils.js';
import { UrlString } from '../url/UrlString.js';
import { CcsCredentialType } from '../account/CcsCredential.js';
import { buildClientInfoFromHomeAccountId } from '../account/ClientInfo.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * OAuth2.0 refresh token client
 */
var RefreshTokenClient = /** @class */ (function (_super) {
    __extends(RefreshTokenClient, _super);
    function RefreshTokenClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    RefreshTokenClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var reqTimestamp, response, responseHandler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.executeTokenRequest(request, this.authority)];
                    case 1:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        responseHandler.validateTokenResponse(response.body);
                        return [2 /*return*/, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, undefined, undefined, true)];
                }
            });
        });
    };
    /**
     * Gets cached refresh token and attaches to request, then calls acquireToken API
     * @param request
     */
    RefreshTokenClient.prototype.acquireTokenByRefreshToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var isFOCI, noFamilyRTInCache, clientMismatchErrorWithFamilyRT;
            return __generator(this, function (_a) {
                // Cannot renew token if no request object is given.
                if (!request) {
                    throw ClientConfigurationError.createEmptyTokenRequestError();
                }
                // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
                if (!request.account) {
                    throw ClientAuthError.createNoAccountInSilentRequestError();
                }
                isFOCI = this.cacheManager.isAppMetadataFOCI(request.account.environment, this.config.authOptions.clientId);
                // if the app is part of the family, retrive a Family refresh token if present and make a refreshTokenRequest
                if (isFOCI) {
                    try {
                        return [2 /*return*/, this.acquireTokenWithCachedRefreshToken(request, true)];
                    }
                    catch (e) {
                        noFamilyRTInCache = e instanceof ClientAuthError && e.errorCode === ClientAuthErrorMessage.noTokensFoundError.code;
                        clientMismatchErrorWithFamilyRT = e instanceof ServerError && e.errorCode === Errors.INVALID_GRANT_ERROR && e.subError === Errors.CLIENT_MISMATCH_ERROR;
                        // if family Refresh Token (FRT) cache acquisition fails or if client_mismatch error is seen with FRT, reattempt with application Refresh Token (ART)
                        if (noFamilyRTInCache || clientMismatchErrorWithFamilyRT) {
                            return [2 /*return*/, this.acquireTokenWithCachedRefreshToken(request, false)];
                            // throw in all other cases
                        }
                        else {
                            throw e;
                        }
                    }
                }
                // fall back to application refresh token acquisition
                return [2 /*return*/, this.acquireTokenWithCachedRefreshToken(request, false)];
            });
        });
    };
    /**
     * makes a network call to acquire tokens by exchanging RefreshToken available in userCache; throws if refresh token is not cached
     * @param request
     */
    RefreshTokenClient.prototype.acquireTokenWithCachedRefreshToken = function (request, foci) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, refreshTokenRequest;
            return __generator(this, function (_a) {
                refreshToken = this.cacheManager.readRefreshTokenFromCache(this.config.authOptions.clientId, request.account, foci);
                // no refresh Token
                if (!refreshToken) {
                    throw ClientAuthError.createNoTokensFoundError();
                }
                refreshTokenRequest = __assign(__assign({}, request), { refreshToken: refreshToken.secret, authenticationScheme: request.authenticationScheme || AuthenticationScheme.BEARER, ccsCredential: {
                        credential: request.account.homeAccountId,
                        type: CcsCredentialType.HOME_ACCOUNT_ID
                    } });
                return [2 /*return*/, this.acquireToken(refreshTokenRequest)];
            });
        });
    };
    /**
     * Constructs the network message and makes a NW call to the underlying secure token service
     * @param request
     * @param authority
     */
    RefreshTokenClient.prototype.executeTokenRequest = function (request, authority) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, queryParameters, headers, thumbprint, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTokenRequestBody(request)];
                    case 1:
                        requestBody = _a.sent();
                        queryParameters = this.createTokenQueryParameters(request);
                        headers = this.createTokenRequestHeaders(request.ccsCredential);
                        thumbprint = {
                            clientId: this.config.authOptions.clientId,
                            authority: authority.canonicalAuthority,
                            scopes: request.scopes
                        };
                        endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParameters);
                        return [2 /*return*/, this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint)];
                }
            });
        });
    };
    /**
     * Creates query string for the /token request
     * @param request
     */
    RefreshTokenClient.prototype.createTokenQueryParameters = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        if (request.tokenQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenQueryParameters);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * Helper function to create the token request body
     * @param request
     */
    RefreshTokenClient.prototype.createTokenRequestBody = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var parameterBuilder, correlationId, clientAssertion, popTokenGenerator, _a, _b, clientInfo;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        parameterBuilder = new RequestParameterBuilder();
                        parameterBuilder.addClientId(this.config.authOptions.clientId);
                        parameterBuilder.addScopes(request.scopes);
                        parameterBuilder.addGrantType(GrantType.REFRESH_TOKEN_GRANT);
                        parameterBuilder.addClientInfo();
                        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
                        parameterBuilder.addThrottling();
                        if (this.serverTelemetryManager) {
                            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
                        }
                        correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
                        parameterBuilder.addCorrelationId(correlationId);
                        parameterBuilder.addRefreshToken(request.refreshToken);
                        if (this.config.clientCredentials.clientSecret) {
                            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
                        }
                        if (this.config.clientCredentials.clientAssertion) {
                            clientAssertion = this.config.clientCredentials.clientAssertion;
                            parameterBuilder.addClientAssertion(clientAssertion.assertion);
                            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
                        }
                        if (!(request.authenticationScheme === AuthenticationScheme.POP)) return [3 /*break*/, 2];
                        popTokenGenerator = new PopTokenGenerator(this.cryptoUtils);
                        _b = (_a = parameterBuilder).addPopToken;
                        return [4 /*yield*/, popTokenGenerator.generateCnf(request)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 2;
                    case 2:
                        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
                            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
                        }
                        if (this.config.systemOptions.preventCorsPreflight && request.ccsCredential) {
                            switch (request.ccsCredential.type) {
                                case CcsCredentialType.HOME_ACCOUNT_ID:
                                    try {
                                        clientInfo = buildClientInfoFromHomeAccountId(request.ccsCredential.credential);
                                        parameterBuilder.addCcsOid(clientInfo);
                                    }
                                    catch (e) {
                                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                                    }
                                    break;
                                case CcsCredentialType.UPN:
                                    parameterBuilder.addCcsUpn(request.ccsCredential.credential);
                                    break;
                            }
                        }
                        return [2 /*return*/, parameterBuilder.createQueryString()];
                }
            });
        });
    };
    return RefreshTokenClient;
}(BaseClient));

export { RefreshTokenClient };
//# sourceMappingURL=RefreshTokenClient.js.map
