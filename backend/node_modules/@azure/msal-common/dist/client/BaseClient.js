/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __awaiter, __generator } from '../_virtual/_tslib.js';
import { buildClientConfiguration } from '../config/ClientConfiguration.js';
import { NetworkManager } from '../network/NetworkManager.js';
import { Logger } from '../logger/Logger.js';
import { HeaderNames, Constants } from '../utils/Constants.js';
import { name, version } from '../packageMetadata.js';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { CcsCredentialType } from '../account/CcsCredential.js';
import { buildClientInfoFromHomeAccountId } from '../account/ClientInfo.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base application class which will construct requests to send to and handle responses from the Microsoft STS using the authorization code flow.
 */
var BaseClient = /** @class */ (function () {
    function BaseClient(configuration) {
        // Set the configuration
        this.config = buildClientConfiguration(configuration);
        // Initialize the logger
        this.logger = new Logger(this.config.loggerOptions, name, version);
        // Initialize crypto
        this.cryptoUtils = this.config.cryptoInterface;
        // Initialize storage interface
        this.cacheManager = this.config.storageInterface;
        // Set the network interface
        this.networkClient = this.config.networkInterface;
        // Set the NetworkManager
        this.networkManager = new NetworkManager(this.networkClient, this.cacheManager);
        // Set TelemetryManager
        this.serverTelemetryManager = this.config.serverTelemetryManager;
        // set Authority
        this.authority = this.config.authOptions.authority;
    }
    /**
     * Creates default headers for requests to token endpoint
     */
    BaseClient.prototype.createTokenRequestHeaders = function (ccsCred) {
        var headers = {};
        headers[HeaderNames.CONTENT_TYPE] = Constants.URL_FORM_CONTENT_TYPE;
        if (!this.config.systemOptions.preventCorsPreflight && ccsCred) {
            switch (ccsCred.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        var clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                        headers[HeaderNames.CCS_HEADER] = "Oid:" + clientInfo.uid + "@" + clientInfo.utid;
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    headers[HeaderNames.CCS_HEADER] = "UPN: " + ccsCred.credential;
                    break;
            }
        }
        return headers;
    };
    /**
     * Http post to token endpoint
     * @param tokenEndpoint
     * @param queryString
     * @param headers
     * @param thumbprint
     */
    BaseClient.prototype.executePostToTokenEndpoint = function (tokenEndpoint, queryString, headers, thumbprint) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.networkManager.sendPostRequest(thumbprint, tokenEndpoint, { body: queryString, headers: headers })];
                    case 1:
                        response = _a.sent();
                        if (this.config.serverTelemetryManager && response.status < 500 && response.status !== 429) {
                            // Telemetry data successfully logged by server, clear Telemetry cache
                            this.config.serverTelemetryManager.clearTelemetryCache();
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Updates the authority object of the client. Endpoint discovery must be completed.
     * @param updatedAuthority
     */
    BaseClient.prototype.updateAuthority = function (updatedAuthority) {
        if (!updatedAuthority.discoveryComplete()) {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Updated authority has not completed endpoint discovery.");
        }
        this.authority = updatedAuthority;
    };
    return BaseClient;
}());

export { BaseClient };
//# sourceMappingURL=BaseClient.js.map
