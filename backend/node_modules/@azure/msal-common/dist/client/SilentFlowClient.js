/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends, __awaiter, __generator } from '../_virtual/_tslib.js';
import { BaseClient } from './BaseClient.js';
import { ScopeSet } from '../request/ScopeSet.js';
import { AuthToken } from '../account/AuthToken.js';
import { TimeUtils } from '../utils/TimeUtils.js';
import { RefreshTokenClient } from './RefreshTokenClient.js';
import { ClientAuthError, ClientAuthErrorMessage } from '../error/ClientAuthError.js';
import { ClientConfigurationError } from '../error/ClientConfigurationError.js';
import { ResponseHandler } from '../response/ResponseHandler.js';
import { CacheOutcome, AuthenticationScheme } from '../utils/Constants.js';
import { StringUtils } from '../utils/StringUtils.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var SilentFlowClient = /** @class */ (function (_super) {
    __extends(SilentFlowClient, _super);
    function SilentFlowClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Retrieves a token from cache if it is still valid, or uses the cached refresh token to renew
     * the given token and returns the renewed token
     * @param request
     */
    SilentFlowClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, refreshTokenClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.acquireCachedToken(request)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof ClientAuthError && e_1.errorCode === ClientAuthErrorMessage.tokenRefreshRequired.code) {
                            refreshTokenClient = new RefreshTokenClient(this.config);
                            return [2 /*return*/, refreshTokenClient.acquireTokenByRefreshToken(request)];
                        }
                        else {
                            throw e_1;
                        }
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves token from cache or throws an error if it must be refreshed.
     * @param request
     */
    SilentFlowClient.prototype.acquireCachedToken = function (request) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var requestScopes, environment, authScheme, cacheRecord;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // Cannot renew token if no request object is given.
                        if (!request) {
                            throw ClientConfigurationError.createEmptyTokenRequestError();
                        }
                        // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
                        if (!request.account) {
                            throw ClientAuthError.createNoAccountInSilentRequestError();
                        }
                        requestScopes = new ScopeSet(request.scopes || []);
                        environment = request.authority || this.authority.getPreferredCache();
                        authScheme = request.authenticationScheme || AuthenticationScheme.BEARER;
                        cacheRecord = this.cacheManager.readCacheRecord(request.account, this.config.authOptions.clientId, requestScopes, environment, authScheme);
                        if (request.forceRefresh) {
                            // Must refresh due to present force_refresh flag.
                            (_a = this.serverTelemetryManager) === null || _a === void 0 ? void 0 : _a.setCacheOutcome(CacheOutcome.FORCE_REFRESH);
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        else if (!cacheRecord.accessToken) {
                            // Must refresh due to non-existent access_token.
                            (_b = this.serverTelemetryManager) === null || _b === void 0 ? void 0 : _b.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        else if (TimeUtils.wasClockTurnedBack(cacheRecord.accessToken.cachedAt) ||
                            TimeUtils.isTokenExpired(cacheRecord.accessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
                            // Must refresh due to expired access_token.
                            (_c = this.serverTelemetryManager) === null || _c === void 0 ? void 0 : _c.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        else if (cacheRecord.accessToken.refreshOn && TimeUtils.isTokenExpired(cacheRecord.accessToken.refreshOn, 0)) {
                            // Must refresh due to the refresh_in value.
                            (_d = this.serverTelemetryManager) === null || _d === void 0 ? void 0 : _d.setCacheOutcome(CacheOutcome.REFRESH_CACHED_ACCESS_TOKEN);
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        else if (!StringUtils.isEmptyObj(request.claims)) {
                            // Must refresh due to request parameters.
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        if (this.config.serverTelemetryManager) {
                            this.config.serverTelemetryManager.incrementCacheHits();
                        }
                        return [4 /*yield*/, this.generateResultFromCacheRecord(cacheRecord, request)];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /**
     * Helper function to build response object from the CacheRecord
     * @param cacheRecord
     */
    SilentFlowClient.prototype.generateResultFromCacheRecord = function (cacheRecord, request) {
        return __awaiter(this, void 0, void 0, function () {
            var idTokenObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cacheRecord.idToken) {
                            idTokenObj = new AuthToken(cacheRecord.idToken.secret, this.config.cryptoInterface);
                        }
                        return [4 /*yield*/, ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, cacheRecord, true, request, idTokenObj)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SilentFlowClient;
}(BaseClient));

export { SilentFlowClient };
//# sourceMappingURL=SilentFlowClient.js.map
