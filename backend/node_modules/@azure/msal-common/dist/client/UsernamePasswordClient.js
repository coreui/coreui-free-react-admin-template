/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends, __awaiter, __generator } from '../_virtual/_tslib.js';
import { BaseClient } from './BaseClient.js';
import { ResponseHandler } from '../response/ResponseHandler.js';
import { RequestParameterBuilder } from '../request/RequestParameterBuilder.js';
import { GrantType } from '../utils/Constants.js';
import { StringUtils } from '../utils/StringUtils.js';
import { TimeUtils } from '../utils/TimeUtils.js';
import { CcsCredentialType } from '../account/CcsCredential.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Oauth2.0 Password grant client
 * Note: We are only supporting public clients for password grant and for purely testing purposes
 */
var UsernamePasswordClient = /** @class */ (function (_super) {
    __extends(UsernamePasswordClient, _super);
    function UsernamePasswordClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * API to acquire a token by passing the username and password to the service in exchage of credentials
     * password_grant
     * @param request
     */
    UsernamePasswordClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var reqTimestamp, response, responseHandler, tokenResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("in acquireToken call");
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.executeTokenRequest(this.authority, request)];
                    case 1:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        // Validate response. This function throws a server error if an error is returned by the server.
                        responseHandler.validateTokenResponse(response.body);
                        tokenResponse = responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request);
                        return [2 /*return*/, tokenResponse];
                }
            });
        });
    };
    /**
     * Executes POST request to token endpoint
     * @param authority
     * @param request
     */
    UsernamePasswordClient.prototype.executeTokenRequest = function (authority, request) {
        return __awaiter(this, void 0, void 0, function () {
            var thumbprint, requestBody, headers;
            return __generator(this, function (_a) {
                thumbprint = {
                    clientId: this.config.authOptions.clientId,
                    authority: authority.canonicalAuthority,
                    scopes: request.scopes
                };
                requestBody = this.createTokenRequestBody(request);
                headers = this.createTokenRequestHeaders({
                    credential: request.username,
                    type: CcsCredentialType.UPN
                });
                return [2 /*return*/, this.executePostToTokenEndpoint(authority.tokenEndpoint, requestBody, headers, thumbprint)];
            });
        });
    };
    /**
     * Generates a map for all the params to be sent to the service
     * @param request
     */
    UsernamePasswordClient.prototype.createTokenRequestBody = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addUsername(request.username);
        parameterBuilder.addPassword(request.password);
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addGrantType(GrantType.RESOURCE_OWNER_PASSWORD_GRANT);
        parameterBuilder.addClientInfo();
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
        if (this.config.systemOptions.preventCorsPreflight && request.username) {
            parameterBuilder.addCcsUpn(request.username);
        }
        return parameterBuilder.createQueryString();
    };
    return UsernamePasswordClient;
}(BaseClient));

export { UsernamePasswordClient };
//# sourceMappingURL=UsernamePasswordClient.js.map
