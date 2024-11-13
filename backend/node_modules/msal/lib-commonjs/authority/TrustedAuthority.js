"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustedAuthority = void 0;
var tslib_1 = require("tslib");
var XHRClient_1 = require("../XHRClient");
var Constants_1 = require("../utils/Constants");
var UrlUtils_1 = require("../utils/UrlUtils");
var TrustedAuthority = /** @class */ (function () {
    function TrustedAuthority() {
    }
    /**
     *
     * @param validateAuthority
     * @param knownAuthorities
     */
    TrustedAuthority.setTrustedAuthoritiesFromConfig = function (validateAuthority, knownAuthorities) {
        if (validateAuthority && !this.getTrustedHostList().length) {
            knownAuthorities.forEach(function (authority) {
                TrustedAuthority.TrustedHostList.push(authority.toLowerCase());
            });
        }
    };
    /**
     *
     * @param telemetryManager
     * @param correlationId
     */
    TrustedAuthority.getAliases = function (authorityToVerify, telemetryManager, correlationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, httpMethod, instanceDiscoveryEndpoint, httpEvent;
            return tslib_1.__generator(this, function (_a) {
                client = new XHRClient_1.XhrClient();
                httpMethod = Constants_1.NetworkRequestType.GET;
                instanceDiscoveryEndpoint = "" + Constants_1.AAD_INSTANCE_DISCOVERY_ENDPOINT + authorityToVerify + "oauth2/v2.0/authorize";
                httpEvent = telemetryManager.createAndStartHttpEvent(correlationId, httpMethod, instanceDiscoveryEndpoint, "getAliases");
                return [2 /*return*/, client.sendRequestAsync(instanceDiscoveryEndpoint, httpMethod, true)
                        .then(function (response) {
                        httpEvent.httpResponseStatus = response.statusCode;
                        telemetryManager.stopEvent(httpEvent);
                        return response.body["metadata"];
                    })
                        .catch(function (err) {
                        httpEvent.serverErrorCode = err;
                        telemetryManager.stopEvent(httpEvent);
                        throw err;
                    })];
            });
        });
    };
    /**
     *
     * @param telemetryManager
     * @param correlationId
     */
    TrustedAuthority.setTrustedAuthoritiesFromNetwork = function (authorityToVerify, telemetryManager, correlationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var metadata, host;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAliases(authorityToVerify, telemetryManager, correlationId)];
                    case 1:
                        metadata = _a.sent();
                        metadata.forEach(function (entry) {
                            var authorities = entry["aliases"];
                            authorities.forEach(function (authority) {
                                TrustedAuthority.TrustedHostList.push(authority.toLowerCase());
                            });
                        });
                        host = UrlUtils_1.UrlUtils.GetUrlComponents(authorityToVerify).HostNameAndPort;
                        if (TrustedAuthority.getTrustedHostList().length && !TrustedAuthority.IsInTrustedHostList(host)) {
                            // Custom Domain scenario, host is trusted because Instance Discovery call succeeded
                            TrustedAuthority.TrustedHostList.push(host.toLowerCase());
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TrustedAuthority.getTrustedHostList = function () {
        return this.TrustedHostList;
    };
    /**
     * Checks to see if the host is in a list of trusted hosts
     * @param host
     */
    TrustedAuthority.IsInTrustedHostList = function (host) {
        return this.TrustedHostList.indexOf(host.toLowerCase()) > -1;
    };
    TrustedAuthority.TrustedHostList = [];
    return TrustedAuthority;
}());
exports.TrustedAuthority = TrustedAuthority;
//# sourceMappingURL=TrustedAuthority.js.map