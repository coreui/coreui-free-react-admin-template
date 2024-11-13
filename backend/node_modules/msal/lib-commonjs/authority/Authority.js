"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authority = exports.AuthorityType = void 0;
var tslib_1 = require("tslib");
var ClientConfigurationError_1 = require("../error/ClientConfigurationError");
var XHRClient_1 = require("../XHRClient");
var UrlUtils_1 = require("../utils/UrlUtils");
var TrustedAuthority_1 = require("./TrustedAuthority");
var Constants_1 = require("../utils/Constants");
/**
 * @hidden
 */
var AuthorityType;
(function (AuthorityType) {
    AuthorityType[AuthorityType["Default"] = 0] = "Default";
    AuthorityType[AuthorityType["Adfs"] = 1] = "Adfs";
})(AuthorityType = exports.AuthorityType || (exports.AuthorityType = {}));
/**
 * @hidden
 */
var Authority = /** @class */ (function () {
    function Authority(authority, validateAuthority, authorityMetadata) {
        this.IsValidationEnabled = validateAuthority;
        this.CanonicalAuthority = authority;
        this.validateAsUri();
        this.tenantDiscoveryResponse = authorityMetadata;
    }
    Authority.isAdfs = function (authorityUrl) {
        var components = UrlUtils_1.UrlUtils.GetUrlComponents(authorityUrl);
        var pathSegments = components.PathSegments;
        return (pathSegments.length && pathSegments[0].toLowerCase() === Constants_1.Constants.ADFS);
    };
    Object.defineProperty(Authority.prototype, "AuthorityType", {
        get: function () {
            return Authority.isAdfs(this.canonicalAuthority) ? AuthorityType.Adfs : AuthorityType.Default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "Tenant", {
        get: function () {
            return this.CanonicalAuthorityUrlComponents.PathSegments[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "AuthorizationEndpoint", {
        get: function () {
            this.validateResolved();
            return this.tenantDiscoveryResponse.AuthorizationEndpoint.replace(/{tenant}|{tenantid}/g, this.Tenant);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "EndSessionEndpoint", {
        get: function () {
            this.validateResolved();
            return this.tenantDiscoveryResponse.EndSessionEndpoint.replace(/{tenant}|{tenantid}/g, this.Tenant);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "SelfSignedJwtAudience", {
        get: function () {
            this.validateResolved();
            return this.tenantDiscoveryResponse.Issuer.replace(/{tenant}|{tenantid}/g, this.Tenant);
        },
        enumerable: false,
        configurable: true
    });
    Authority.prototype.validateResolved = function () {
        if (!this.hasCachedMetadata()) {
            throw "Please call ResolveEndpointsAsync first";
        }
    };
    Object.defineProperty(Authority.prototype, "CanonicalAuthority", {
        /**
         * A URL that is the authority set by the developer
         */
        get: function () {
            return this.canonicalAuthority;
        },
        set: function (url) {
            this.canonicalAuthority = UrlUtils_1.UrlUtils.CanonicalizeUri(url);
            this.canonicalAuthorityUrlComponents = null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "CanonicalAuthorityUrlComponents", {
        get: function () {
            if (!this.canonicalAuthorityUrlComponents) {
                this.canonicalAuthorityUrlComponents = UrlUtils_1.UrlUtils.GetUrlComponents(this.CanonicalAuthority);
            }
            return this.canonicalAuthorityUrlComponents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "DefaultOpenIdConfigurationEndpoint", {
        // http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
        get: function () {
            return (this.AuthorityType === AuthorityType.Adfs) ? "" + this.CanonicalAuthority + Constants_1.WELL_KNOWN_SUFFIX : this.CanonicalAuthority + "v2.0/" + Constants_1.WELL_KNOWN_SUFFIX;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Given a string, validate that it is of the form https://domain/path
     */
    Authority.prototype.validateAsUri = function () {
        var components;
        try {
            components = this.CanonicalAuthorityUrlComponents;
        }
        catch (e) {
            throw ClientConfigurationError_1.ClientConfigurationErrorMessage.invalidAuthorityType;
        }
        if (!components.Protocol || components.Protocol.toLowerCase() !== "https:") {
            throw ClientConfigurationError_1.ClientConfigurationErrorMessage.authorityUriInsecure;
        }
        if (!components.PathSegments || components.PathSegments.length < 1) {
            throw ClientConfigurationError_1.ClientConfigurationErrorMessage.authorityUriInvalidPath;
        }
    };
    /**
     * Calls the OIDC endpoint and returns the response
     */
    Authority.prototype.DiscoverEndpoints = function (openIdConfigurationEndpoint, telemetryManager, correlationId) {
        var client = new XHRClient_1.XhrClient();
        var httpMethod = Constants_1.NetworkRequestType.GET;
        var httpEvent = telemetryManager.createAndStartHttpEvent(correlationId, httpMethod, openIdConfigurationEndpoint, "openIdConfigurationEndpoint");
        return client.sendRequestAsync(openIdConfigurationEndpoint, httpMethod, /* enableCaching: */ true)
            .then(function (response) {
            httpEvent.httpResponseStatus = response.statusCode;
            telemetryManager.stopEvent(httpEvent);
            return {
                AuthorizationEndpoint: response.body["authorization_endpoint"],
                EndSessionEndpoint: response.body["end_session_endpoint"],
                Issuer: response.body["issuer"]
            };
        })
            .catch(function (err) {
            httpEvent.serverErrorCode = err;
            telemetryManager.stopEvent(httpEvent);
            throw err;
        });
    };
    /**
     * Returns a promise.
     * Checks to see if the authority is in the cache
     * Discover endpoints via openid-configuration
     * If successful, caches the endpoint for later use in OIDC
     */
    Authority.prototype.resolveEndpointsAsync = function (telemetryManager, correlationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var host, openIdConfigurationEndpointResponse, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.IsValidationEnabled) return [3 /*break*/, 3];
                        host = this.canonicalAuthorityUrlComponents.HostNameAndPort;
                        if (!(TrustedAuthority_1.TrustedAuthority.getTrustedHostList().length === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, TrustedAuthority_1.TrustedAuthority.setTrustedAuthoritiesFromNetwork(this.canonicalAuthority, telemetryManager, correlationId)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!TrustedAuthority_1.TrustedAuthority.IsInTrustedHostList(host)) {
                            throw ClientConfigurationError_1.ClientConfigurationError.createUntrustedAuthorityError(host);
                        }
                        _b.label = 3;
                    case 3:
                        openIdConfigurationEndpointResponse = this.GetOpenIdConfigurationEndpoint();
                        _a = this;
                        return [4 /*yield*/, this.DiscoverEndpoints(openIdConfigurationEndpointResponse, telemetryManager, correlationId)];
                    case 4:
                        _a.tenantDiscoveryResponse = _b.sent();
                        return [2 /*return*/, this.tenantDiscoveryResponse];
                }
            });
        });
    };
    /**
     * Checks if there is a cached tenant discovery response with required fields.
     */
    Authority.prototype.hasCachedMetadata = function () {
        return !!(this.tenantDiscoveryResponse &&
            this.tenantDiscoveryResponse.AuthorizationEndpoint &&
            this.tenantDiscoveryResponse.EndSessionEndpoint &&
            this.tenantDiscoveryResponse.Issuer);
    };
    /**
     * Returns a promise which resolves to the OIDC endpoint
     * Only responds with the endpoint
     */
    Authority.prototype.GetOpenIdConfigurationEndpoint = function () {
        return this.DefaultOpenIdConfigurationEndpoint;
    };
    return Authority;
}());
exports.Authority = Authority;
//# sourceMappingURL=Authority.js.map