/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends, __awaiter, __generator } from '../_virtual/_tslib.js';
import { BaseClient } from './BaseClient.js';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { RequestParameterBuilder } from '../request/RequestParameterBuilder.js';
import { GrantType, Constants } from '../utils/Constants.js';
import { TimeUtils } from '../utils/TimeUtils.js';
import { ResponseHandler } from '../response/ResponseHandler.js';
import { StringUtils } from '../utils/StringUtils.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * OAuth2.0 Device code client
 */
var DeviceCodeClient = /** @class */ (function (_super) {
    __extends(DeviceCodeClient, _super);
    function DeviceCodeClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Gets device code from device code endpoint, calls back to with device code response, and
     * polls token endpoint to exchange device code for tokens
     * @param request
     */
    DeviceCodeClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceCodeResponse, reqTimestamp, response, responseHandler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDeviceCode(request)];
                    case 1:
                        deviceCodeResponse = _a.sent();
                        request.deviceCodeCallback(deviceCodeResponse);
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.acquireTokenWithDeviceCode(request, deviceCodeResponse)];
                    case 2:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        // Validate response. This function throws a server error if an error is returned by the server.
                        responseHandler.validateTokenResponse(response);
                        return [4 /*yield*/, responseHandler.handleServerTokenResponse(response, this.authority, reqTimestamp, request)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Creates device code request and executes http GET
     * @param request
     */
    DeviceCodeClient.prototype.getDeviceCode = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString, headers, thumbprint;
            return __generator(this, function (_a) {
                queryString = this.createQueryString(request);
                headers = this.createTokenRequestHeaders();
                thumbprint = {
                    clientId: this.config.authOptions.clientId,
                    authority: request.authority,
                    scopes: request.scopes
                };
                return [2 /*return*/, this.executePostRequestToDeviceCodeEndpoint(this.authority.deviceCodeEndpoint, queryString, headers, thumbprint)];
            });
        });
    };
    /**
     * Executes POST request to device code endpoint
     * @param deviceCodeEndpoint
     * @param queryString
     * @param headers
     */
    DeviceCodeClient.prototype.executePostRequestToDeviceCodeEndpoint = function (deviceCodeEndpoint, queryString, headers, thumbprint) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userCode, deviceCode, verificationUri, expiresIn, interval, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.networkManager.sendPostRequest(thumbprint, deviceCodeEndpoint, {
                            body: queryString,
                            headers: headers
                        })];
                    case 1:
                        _a = (_b.sent()).body, userCode = _a.user_code, deviceCode = _a.device_code, verificationUri = _a.verification_uri, expiresIn = _a.expires_in, interval = _a.interval, message = _a.message;
                        return [2 /*return*/, {
                                userCode: userCode,
                                deviceCode: deviceCode,
                                verificationUri: verificationUri,
                                expiresIn: expiresIn,
                                interval: interval,
                                message: message
                            }];
                }
            });
        });
    };
    /**
     * Create device code endpoint query parameters and returns string
     */
    DeviceCodeClient.prototype.createQueryString = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        if (!StringUtils.isEmpty(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * Breaks the polling with specific conditions.
     * @param request CommonDeviceCodeRequest
     * @param deviceCodeResponse DeviceCodeResponse
     */
    DeviceCodeClient.prototype.continuePolling = function (deviceCodeExpirationTime, userSpecifiedTimeout, userSpecifiedCancelFlag) {
        if (userSpecifiedCancelFlag) {
            this.logger.error("Token request cancelled by setting DeviceCodeRequest.cancel = true");
            throw ClientAuthError.createDeviceCodeCancelledError();
        }
        else if (userSpecifiedTimeout && userSpecifiedTimeout < deviceCodeExpirationTime && TimeUtils.nowSeconds() > userSpecifiedTimeout) {
            this.logger.error("User defined timeout for device code polling reached. The timeout was set for " + userSpecifiedTimeout);
            throw ClientAuthError.createUserTimeoutReachedError();
        }
        else if (TimeUtils.nowSeconds() > deviceCodeExpirationTime) {
            if (userSpecifiedTimeout) {
                this.logger.verbose("User specified timeout ignored as the device code has expired before the timeout elapsed. The user specified timeout was set for " + userSpecifiedTimeout);
            }
            this.logger.error("Device code expired. Expiration time of device code was " + deviceCodeExpirationTime);
            throw ClientAuthError.createDeviceCodeExpiredError();
        }
        return true;
    };
    /**
     * Creates token request with device code response and polls token endpoint at interval set by the device code
     * response
     * @param request
     * @param deviceCodeResponse
     */
    DeviceCodeClient.prototype.acquireTokenWithDeviceCode = function (request, deviceCodeResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, headers, userSpecifiedTimeout, deviceCodeExpirationTime, pollingIntervalMilli, thumbprint, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestBody = this.createTokenRequestBody(request, deviceCodeResponse);
                        headers = this.createTokenRequestHeaders();
                        userSpecifiedTimeout = request.timeout ? TimeUtils.nowSeconds() + request.timeout : undefined;
                        deviceCodeExpirationTime = TimeUtils.nowSeconds() + deviceCodeResponse.expiresIn;
                        pollingIntervalMilli = deviceCodeResponse.interval * 1000;
                        _a.label = 1;
                    case 1:
                        if (!this.continuePolling(deviceCodeExpirationTime, userSpecifiedTimeout, request.cancel)) return [3 /*break*/, 6];
                        thumbprint = {
                            clientId: this.config.authOptions.clientId,
                            authority: request.authority,
                            scopes: request.scopes
                        };
                        return [4 /*yield*/, this.executePostToTokenEndpoint(this.authority.tokenEndpoint, requestBody, headers, thumbprint)];
                    case 2:
                        response = _a.sent();
                        if (!(response.body && response.body.error === Constants.AUTHORIZATION_PENDING)) return [3 /*break*/, 4];
                        // user authorization is pending. Sleep for polling interval and try again
                        this.logger.info(response.body.error_description || "Authorization pending. Continue polling.");
                        return [4 /*yield*/, TimeUtils.delay(pollingIntervalMilli)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.logger.verbose("Authorization completed successfully. Polling stopped.");
                        return [2 /*return*/, response.body];
                    case 5: return [3 /*break*/, 1];
                    case 6:
                        /*
                         * The above code should've thrown by this point, but to satisfy TypeScript,
                         * and in the rare case the conditionals in continuePolling() may not catch everything...
                         */
                        this.logger.error("Polling stopped for unknown reasons.");
                        throw ClientAuthError.createDeviceCodeUnknownError();
                }
            });
        });
    };
    /**
     * Creates query parameters and converts to string.
     * @param request
     * @param deviceCodeResponse
     */
    DeviceCodeClient.prototype.createTokenRequestBody = function (request, deviceCodeResponse) {
        var requestParameters = new RequestParameterBuilder();
        requestParameters.addScopes(request.scopes);
        requestParameters.addClientId(this.config.authOptions.clientId);
        requestParameters.addGrantType(GrantType.DEVICE_CODE_GRANT);
        requestParameters.addDeviceCode(deviceCodeResponse.deviceCode);
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        requestParameters.addCorrelationId(correlationId);
        requestParameters.addClientInfo();
        requestParameters.addLibraryInfo(this.config.libraryInfo);
        requestParameters.addThrottling();
        if (this.serverTelemetryManager) {
            requestParameters.addServerTelemetry(this.serverTelemetryManager);
        }
        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
            requestParameters.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return requestParameters.createQueryString();
    };
    return DeviceCodeClient;
}(BaseClient));

export { DeviceCodeClient };
//# sourceMappingURL=DeviceCodeClient.js.map
