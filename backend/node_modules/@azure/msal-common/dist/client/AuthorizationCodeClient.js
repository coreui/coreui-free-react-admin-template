/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends, __awaiter, __generator, __assign, __spreadArrays } from '../_virtual/_tslib.js';
import { BaseClient } from './BaseClient.js';
import { RequestParameterBuilder } from '../request/RequestParameterBuilder.js';
import { PromptValue, Separators, GrantType, AuthenticationScheme } from '../utils/Constants.js';
import { ResponseHandler } from '../response/ResponseHandler.js';
import { StringUtils } from '../utils/StringUtils.js';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { UrlString } from '../url/UrlString.js';
import { AccountEntity } from '../cache/entities/AccountEntity.js';
import { ClientConfigurationError } from '../error/ClientConfigurationError.js';
import { PopTokenGenerator } from '../crypto/PopTokenGenerator.js';
import { TimeUtils } from '../utils/TimeUtils.js';
import { buildClientInfoFromHomeAccountId, buildClientInfo } from '../account/ClientInfo.js';
import { CcsCredentialType } from '../account/CcsCredential.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Oauth2.0 Authorization Code client
 */
var AuthorizationCodeClient = /** @class */ (function (_super) {
    __extends(AuthorizationCodeClient, _super);
    function AuthorizationCodeClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Creates the URL of the authorization request letting the user input credentials and consent to the
     * application. The URL target the /authorize endpoint of the authority configured in the
     * application object.
     *
     * Once the user inputs their credentials and consents, the authority will send a response to the redirect URI
     * sent in the request and should contain an authorization code, which can then be used to acquire tokens via
     * acquireToken(AuthorizationCodeRequest)
     * @param request
     */
    AuthorizationCodeClient.prototype.getAuthCodeUrl = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = this.createAuthCodeUrlQueryString(request);
                return [2 /*return*/, UrlString.appendQueryString(this.authority.authorizationEndpoint, queryString)];
            });
        });
    };
    /**
     * API to acquire a token in exchange of 'authorization_code` acquired by the user in the first leg of the
     * authorization_code_grant
     * @param request
     */
    AuthorizationCodeClient.prototype.acquireToken = function (request, authCodePayload) {
        return __awaiter(this, void 0, void 0, function () {
            var reqTimestamp, response, responseHandler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("in acquireToken call");
                        if (!request || StringUtils.isEmpty(request.code)) {
                            throw ClientAuthError.createTokenRequestCannotBeMadeError();
                        }
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.executeTokenRequest(this.authority, request)];
                    case 1:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        // Validate response. This function throws a server error if an error is returned by the server.
                        responseHandler.validateTokenResponse(response.body);
                        return [4 /*yield*/, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, authCodePayload)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Handles the hash fragment response from public client code request. Returns a code response used by
     * the client to exchange for a token in acquireToken.
     * @param hashFragment
     */
    AuthorizationCodeClient.prototype.handleFragmentResponse = function (hashFragment, cachedState) {
        // Handle responses.
        var responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, null, null);
        // Deserialize hash fragment response parameters.
        var hashUrlString = new UrlString(hashFragment);
        // Deserialize hash fragment response parameters.
        var serverParams = UrlString.getDeserializedHash(hashUrlString.getHash());
        // Get code response
        responseHandler.validateServerAuthorizationCodeResponse(serverParams, cachedState, this.cryptoUtils);
        // throw when there is no auth code in the response
        if (!serverParams.code) {
            throw ClientAuthError.createNoAuthCodeInServerResponseError();
        }
        return __assign(__assign({}, serverParams), { 
            // Code param is optional in ServerAuthorizationCodeResponse but required in AuthorizationCodePaylod
            code: serverParams.code });
    };
    /**
     * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param authorityUri
     */
    AuthorizationCodeClient.prototype.getLogoutUri = function (logoutRequest) {
        // Throw error if logoutRequest is null/undefined
        if (!logoutRequest) {
            throw ClientConfigurationError.createEmptyLogoutRequestError();
        }
        if (logoutRequest.account) {
            // Clear given account.
            this.cacheManager.removeAccount(AccountEntity.generateAccountCacheKey(logoutRequest.account));
        }
        else {
            // Clear all accounts and tokens
            this.cacheManager.clear();
        }
        var queryString = this.createLogoutUrlQueryString(logoutRequest);
        // Construct logout URI.
        return UrlString.appendQueryString(this.authority.endSessionEndpoint, queryString);
    };
    /**
     * Executes POST request to token endpoint
     * @param authority
     * @param request
     */
    AuthorizationCodeClient.prototype.executeTokenRequest = function (authority, request) {
        return __awaiter(this, void 0, void 0, function () {
            var thumbprint, requestBody, queryParameters, ccsCredential, clientInfo, headers, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thumbprint = {
                            clientId: this.config.authOptions.clientId,
                            authority: authority.canonicalAuthority,
                            scopes: request.scopes
                        };
                        return [4 /*yield*/, this.createTokenRequestBody(request)];
                    case 1:
                        requestBody = _a.sent();
                        queryParameters = this.createTokenQueryParameters(request);
                        ccsCredential = undefined;
                        if (request.clientInfo) {
                            try {
                                clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                                ccsCredential = {
                                    credential: "" + clientInfo.uid + Separators.CLIENT_INFO_SEPARATOR + clientInfo.utid,
                                    type: CcsCredentialType.HOME_ACCOUNT_ID
                                };
                            }
                            catch (e) {
                                this.logger.verbose("Could not parse client info for CCS Header: " + e);
                            }
                        }
                        headers = this.createTokenRequestHeaders(ccsCredential || request.ccsCredential);
                        endpoint = StringUtils.isEmpty(queryParameters) ? authority.tokenEndpoint : authority.tokenEndpoint + "?" + queryParameters;
                        return [2 /*return*/, this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint)];
                }
            });
        });
    };
    /**
     * Creates query string for the /token request
     * @param request
     */
    AuthorizationCodeClient.prototype.createTokenQueryParameters = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        if (request.tokenQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenQueryParameters);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * Generates a map for all the params to be sent to the service
     * @param request
     */
    AuthorizationCodeClient.prototype.createTokenRequestBody = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var parameterBuilder, clientAssertion, popTokenGenerator, cnfString, correlationId, ccsCred, clientInfo, clientInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameterBuilder = new RequestParameterBuilder();
                        parameterBuilder.addClientId(this.config.authOptions.clientId);
                        // validate the redirectUri (to be a non null value)
                        parameterBuilder.addRedirectUri(request.redirectUri);
                        // Add scope array, parameter builder will add default scopes and dedupe
                        parameterBuilder.addScopes(request.scopes);
                        // add code: user set, not validated
                        parameterBuilder.addAuthorizationCode(request.code);
                        // Add library metadata
                        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
                        parameterBuilder.addThrottling();
                        if (this.serverTelemetryManager) {
                            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
                        }
                        // add code_verifier if passed
                        if (request.codeVerifier) {
                            parameterBuilder.addCodeVerifier(request.codeVerifier);
                        }
                        if (this.config.clientCredentials.clientSecret) {
                            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
                        }
                        if (this.config.clientCredentials.clientAssertion) {
                            clientAssertion = this.config.clientCredentials.clientAssertion;
                            parameterBuilder.addClientAssertion(clientAssertion.assertion);
                            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
                        }
                        parameterBuilder.addGrantType(GrantType.AUTHORIZATION_CODE_GRANT);
                        parameterBuilder.addClientInfo();
                        if (!(request.authenticationScheme === AuthenticationScheme.POP)) return [3 /*break*/, 2];
                        popTokenGenerator = new PopTokenGenerator(this.cryptoUtils);
                        return [4 /*yield*/, popTokenGenerator.generateCnf(request)];
                    case 1:
                        cnfString = _a.sent();
                        parameterBuilder.addPopToken(cnfString);
                        _a.label = 2;
                    case 2:
                        correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
                        parameterBuilder.addCorrelationId(correlationId);
                        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
                            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
                        }
                        ccsCred = undefined;
                        if (request.clientInfo) {
                            try {
                                clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                                ccsCred = {
                                    credential: "" + clientInfo.uid + Separators.CLIENT_INFO_SEPARATOR + clientInfo.utid,
                                    type: CcsCredentialType.HOME_ACCOUNT_ID
                                };
                            }
                            catch (e) {
                                this.logger.verbose("Could not parse client info for CCS Header: " + e);
                            }
                        }
                        else {
                            ccsCred = request.ccsCredential;
                        }
                        // Adds these as parameters in the request instead of headers to prevent CORS preflight request
                        if (this.config.systemOptions.preventCorsPreflight && ccsCred) {
                            switch (ccsCred.type) {
                                case CcsCredentialType.HOME_ACCOUNT_ID:
                                    try {
                                        clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                                        parameterBuilder.addCcsOid(clientInfo);
                                    }
                                    catch (e) {
                                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                                    }
                                    break;
                                case CcsCredentialType.UPN:
                                    parameterBuilder.addCcsUpn(ccsCred.credential);
                                    break;
                            }
                        }
                        return [2 /*return*/, parameterBuilder.createQueryString()];
                }
            });
        });
    };
    /**
     * This API validates the `AuthorizationCodeUrlRequest` and creates a URL
     * @param request
     */
    AuthorizationCodeClient.prototype.createAuthCodeUrlQueryString = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        var requestScopes = __spreadArrays(request.scopes || [], request.extraScopesToConsent || []);
        parameterBuilder.addScopes(requestScopes);
        // validate the redirectUri (to be a non null value)
        parameterBuilder.addRedirectUri(request.redirectUri);
        // generate the correlationId if not set by the user and add
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        // add response_mode. If not passed in it defaults to query.
        parameterBuilder.addResponseMode(request.responseMode);
        // add response_type = code
        parameterBuilder.addResponseTypeCode();
        // add library info parameters
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        // add client_info=1
        parameterBuilder.addClientInfo();
        if (request.codeChallenge && request.codeChallengeMethod) {
            parameterBuilder.addCodeChallengeParams(request.codeChallenge, request.codeChallengeMethod);
        }
        if (request.prompt) {
            parameterBuilder.addPrompt(request.prompt);
        }
        if (request.domainHint) {
            parameterBuilder.addDomainHint(request.domainHint);
        }
        // Add sid or loginHint with preference for sid -> loginHint -> username of AccountInfo object
        if (request.prompt !== PromptValue.SELECT_ACCOUNT) {
            // AAD will throw if prompt=select_account is passed with an account hint
            if (request.sid && request.prompt === PromptValue.NONE) {
                // SessionID is only used in silent calls
                this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from request");
                parameterBuilder.addSid(request.sid);
            }
            else if (request.account) {
                var accountSid = this.extractAccountSid(request.account);
                // If account and loginHint are provided, we will check account first for sid before adding loginHint
                if (accountSid && request.prompt === PromptValue.NONE) {
                    // SessionId is only used in silent calls
                    this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from account");
                    parameterBuilder.addSid(accountSid);
                    try {
                        var clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                    }
                }
                else if (request.loginHint) {
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from request");
                    parameterBuilder.addLoginHint(request.loginHint);
                    parameterBuilder.addCcsUpn(request.loginHint);
                }
                else if (request.account.username) {
                    // Fallback to account username if provided
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from account");
                    parameterBuilder.addLoginHint(request.account.username);
                    try {
                        var clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                    }
                }
            }
            else if (request.loginHint) {
                this.logger.verbose("createAuthCodeUrlQueryString: No account, adding login_hint from request");
                parameterBuilder.addLoginHint(request.loginHint);
                parameterBuilder.addCcsUpn(request.loginHint);
            }
        }
        else {
            this.logger.verbose("createAuthCodeUrlQueryString: Prompt is select_account, ignoring account hints");
        }
        if (request.nonce) {
            parameterBuilder.addNonce(request.nonce);
        }
        if (request.state) {
            parameterBuilder.addState(request.state);
        }
        if (!StringUtils.isEmpty(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (request.extraQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.extraQueryParameters);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * This API validates the `EndSessionRequest` and creates a URL
     * @param request
     */
    AuthorizationCodeClient.prototype.createLogoutUrlQueryString = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        if (request.postLogoutRedirectUri) {
            parameterBuilder.addPostLogoutRedirectUri(request.postLogoutRedirectUri);
        }
        if (request.correlationId) {
            parameterBuilder.addCorrelationId(request.correlationId);
        }
        if (request.idTokenHint) {
            parameterBuilder.addIdTokenHint(request.idTokenHint);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * Helper to get sid from account. Returns null if idTokenClaims are not present or sid is not present.
     * @param account
     */
    AuthorizationCodeClient.prototype.extractAccountSid = function (account) {
        if (account.idTokenClaims) {
            var tokenClaims = account.idTokenClaims;
            return tokenClaims.sid || null;
        }
        return null;
    };
    return AuthorizationCodeClient;
}(BaseClient));

export { AuthorizationCodeClient };
//# sourceMappingURL=AuthorizationCodeClient.js.map
