/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __awaiter, __generator, __assign } from '../_virtual/_tslib.js';
import { AuthorityType } from './AuthorityType.js';
import { isOpenIdConfigResponse } from './OpenIdConfigResponse.js';
import { UrlString } from '../url/UrlString.js';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { Constants, AuthorityMetadataSource, RegionDiscoveryOutcomes } from '../utils/Constants.js';
import { ClientConfigurationError } from '../error/ClientConfigurationError.js';
import { ProtocolMode } from './ProtocolMode.js';
import { AuthorityMetadataEntity } from '../cache/entities/AuthorityMetadataEntity.js';
import { isCloudInstanceDiscoveryResponse } from './CloudInstanceDiscoveryResponse.js';
import { RegionDiscovery } from './RegionDiscovery.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The authority class validates the authority URIs used by the user, and retrieves the OpenID Configuration Data from the
 * endpoint. It will store the pertinent config data in this object for use during token calls.
 */
var Authority = /** @class */ (function () {
    function Authority(authority, networkInterface, cacheManager, authorityOptions) {
        this.canonicalAuthority = authority;
        this._canonicalAuthority.validateAsUri();
        this.networkInterface = networkInterface;
        this.cacheManager = cacheManager;
        this.authorityOptions = authorityOptions;
        this.regionDiscovery = new RegionDiscovery(networkInterface);
        this.regionDiscoveryMetadata = { region_used: undefined, region_source: undefined, region_outcome: undefined };
    }
    Object.defineProperty(Authority.prototype, "authorityType", {
        // See above for AuthorityType
        get: function () {
            var pathSegments = this.canonicalAuthorityUrlComponents.PathSegments;
            if (pathSegments.length && pathSegments[0].toLowerCase() === Constants.ADFS) {
                return AuthorityType.Adfs;
            }
            return AuthorityType.Default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "protocolMode", {
        /**
         * ProtocolMode enum representing the way endpoints are constructed.
         */
        get: function () {
            return this.authorityOptions.protocolMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "options", {
        /**
         * Returns authorityOptions which can be used to reinstantiate a new authority instance
         */
        get: function () {
            return this.authorityOptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "canonicalAuthority", {
        /**
         * A URL that is the authority set by the developer
         */
        get: function () {
            return this._canonicalAuthority.urlString;
        },
        /**
         * Sets canonical authority.
         */
        set: function (url) {
            this._canonicalAuthority = new UrlString(url);
            this._canonicalAuthority.validateAsUri();
            this._canonicalAuthorityUrlComponents = null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "canonicalAuthorityUrlComponents", {
        /**
         * Get authority components.
         */
        get: function () {
            if (!this._canonicalAuthorityUrlComponents) {
                this._canonicalAuthorityUrlComponents = this._canonicalAuthority.getUrlComponents();
            }
            return this._canonicalAuthorityUrlComponents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "hostnameAndPort", {
        /**
         * Get hostname and port i.e. login.microsoftonline.com
         */
        get: function () {
            return this.canonicalAuthorityUrlComponents.HostNameAndPort.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "tenant", {
        /**
         * Get tenant for authority.
         */
        get: function () {
            return this.canonicalAuthorityUrlComponents.PathSegments[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "authorizationEndpoint", {
        /**
         * OAuth /authorize endpoint for requests
         */
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.authorization_endpoint);
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "tokenEndpoint", {
        /**
         * OAuth /token endpoint for requests
         */
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.token_endpoint);
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "deviceCodeEndpoint", {
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "endSessionEndpoint", {
        /**
         * OAuth logout endpoint for requests
         */
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.end_session_endpoint);
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "selfSignedJwtAudience", {
        /**
         * OAuth issuer for requests
         */
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.issuer);
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Replaces tenant in url path with current tenant. Defaults to common.
     * @param urlString
     */
    Authority.prototype.replaceTenant = function (urlString) {
        return urlString.replace(/{tenant}|{tenantid}/g, this.tenant);
    };
    /**
     * Replaces path such as tenant or policy with the current tenant or policy.
     * @param urlString
     */
    Authority.prototype.replacePath = function (urlString) {
        var endpoint = urlString;
        var cachedAuthorityUrl = new UrlString(this.metadata.canonical_authority);
        var cachedAuthorityParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
        var currentAuthorityParts = this.canonicalAuthorityUrlComponents.PathSegments;
        currentAuthorityParts.forEach(function (currentPart, index) {
            var cachedPart = cachedAuthorityParts[index];
            if (currentPart !== cachedPart) {
                endpoint = endpoint.replace("/" + cachedPart + "/", "/" + currentPart + "/");
            }
        });
        return endpoint;
    };
    Object.defineProperty(Authority.prototype, "defaultOpenIdConfigurationEndpoint", {
        /**
         * The default open id configuration endpoint for any canonical authority.
         */
        get: function () {
            if (this.authorityType === AuthorityType.Adfs || this.protocolMode === ProtocolMode.OIDC) {
                return this.canonicalAuthority + ".well-known/openid-configuration";
            }
            return this.canonicalAuthority + "v2.0/.well-known/openid-configuration";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Boolean that returns whethr or not tenant discovery has been completed.
     */
    Authority.prototype.discoveryComplete = function () {
        return !!this.metadata;
    };
    /**
     * Perform endpoint discovery to discover aliases, preferred_cache, preferred_network
     * and the /authorize, /token and logout endpoints.
     */
    Authority.prototype.resolveEndpointsAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metadataEntity, cloudDiscoverySource, endpointSource, cacheKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadataEntity = this.cacheManager.getAuthorityMetadataByAlias(this.hostnameAndPort);
                        if (!metadataEntity) {
                            metadataEntity = new AuthorityMetadataEntity();
                            metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
                        }
                        return [4 /*yield*/, this.updateCloudDiscoveryMetadata(metadataEntity)];
                    case 1:
                        cloudDiscoverySource = _a.sent();
                        this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, metadataEntity.preferred_network);
                        return [4 /*yield*/, this.updateEndpointMetadata(metadataEntity)];
                    case 2:
                        endpointSource = _a.sent();
                        if (cloudDiscoverySource !== AuthorityMetadataSource.CACHE && endpointSource !== AuthorityMetadataSource.CACHE) {
                            // Reset the expiration time unless both values came from a successful cache lookup
                            metadataEntity.resetExpiresAt();
                            metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
                        }
                        cacheKey = this.cacheManager.generateAuthorityMetadataCacheKey(metadataEntity.preferred_cache);
                        this.cacheManager.setAuthorityMetadata(cacheKey, metadataEntity);
                        this.metadata = metadataEntity;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update AuthorityMetadataEntity with new endpoints and return where the information came from
     * @param metadataEntity
     */
    Authority.prototype.updateEndpointMetadata = function (metadataEntity) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var metadata, autodetectedRegionName, azureRegion;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        metadata = this.getEndpointMetadataFromConfig();
                        if (metadata) {
                            metadataEntity.updateEndpointMetadata(metadata, false);
                            return [2 /*return*/, AuthorityMetadataSource.CONFIG];
                        }
                        if (this.isAuthoritySameType(metadataEntity) && metadataEntity.endpointsFromNetwork && !metadataEntity.isExpired()) {
                            // No need to update
                            return [2 /*return*/, AuthorityMetadataSource.CACHE];
                        }
                        return [4 /*yield*/, this.getEndpointMetadataFromNetwork()];
                    case 1:
                        metadata = _b.sent();
                        if (!metadata) return [3 /*break*/, 4];
                        if (!((_a = this.authorityOptions.azureRegionConfiguration) === null || _a === void 0 ? void 0 : _a.azureRegion)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.regionDiscovery.detectRegion(this.authorityOptions.azureRegionConfiguration.environmentRegion, this.regionDiscoveryMetadata)];
                    case 2:
                        autodetectedRegionName = _b.sent();
                        azureRegion = this.authorityOptions.azureRegionConfiguration.azureRegion === Constants.AZURE_REGION_AUTO_DISCOVER_FLAG
                            ? autodetectedRegionName
                            : this.authorityOptions.azureRegionConfiguration.azureRegion;
                        if (this.authorityOptions.azureRegionConfiguration.azureRegion === Constants.AZURE_REGION_AUTO_DISCOVER_FLAG) {
                            this.regionDiscoveryMetadata.region_outcome = autodetectedRegionName ?
                                RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_SUCCESSFUL :
                                RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_FAILED;
                        }
                        else {
                            if (autodetectedRegionName) {
                                this.regionDiscoveryMetadata.region_outcome = (this.authorityOptions.azureRegionConfiguration.azureRegion === autodetectedRegionName) ?
                                    RegionDiscoveryOutcomes.CONFIGURED_MATCHES_DETECTED :
                                    RegionDiscoveryOutcomes.CONFIGURED_NOT_DETECTED;
                            }
                            else {
                                this.regionDiscoveryMetadata.region_outcome = RegionDiscoveryOutcomes.CONFIGURED_NO_AUTO_DETECTION;
                            }
                        }
                        if (azureRegion) {
                            this.regionDiscoveryMetadata.region_used = azureRegion;
                            metadata = Authority.replaceWithRegionalInformation(metadata, azureRegion);
                        }
                        _b.label = 3;
                    case 3:
                        metadataEntity.updateEndpointMetadata(metadata, true);
                        return [2 /*return*/, AuthorityMetadataSource.NETWORK];
                    case 4: throw ClientAuthError.createUnableToGetOpenidConfigError(this.defaultOpenIdConfigurationEndpoint);
                }
            });
        });
    };
    /**
     * Compares the number of url components after the domain to determine if the cached authority metadata can be used for the requested authority
     * Protects against same domain different authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
     * @param metadataEntity
     */
    Authority.prototype.isAuthoritySameType = function (metadataEntity) {
        var cachedAuthorityUrl = new UrlString(metadataEntity.canonical_authority);
        var cachedParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
        return cachedParts.length === this.canonicalAuthorityUrlComponents.PathSegments.length;
    };
    /**
     * Parse authorityMetadata config option
     */
    Authority.prototype.getEndpointMetadataFromConfig = function () {
        if (this.authorityOptions.authorityMetadata) {
            try {
                return JSON.parse(this.authorityOptions.authorityMetadata);
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidAuthorityMetadataError();
            }
        }
        return null;
    };
    /**
     * Gets OAuth endpoints from the given OpenID configuration endpoint.
     */
    Authority.prototype.getEndpointMetadataFromNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.networkInterface.sendGetRequestAsync(this.defaultOpenIdConfigurationEndpoint)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, isOpenIdConfigResponse(response.body) ? response.body : null];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates the AuthorityMetadataEntity with new aliases, preferred_network and preferred_cache and returns where the information was retrived from
     * @param cachedMetadata
     * @param newMetadata
     */
    Authority.prototype.updateCloudDiscoveryMetadata = function (metadataEntity) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = this.getCloudDiscoveryMetadataFromConfig();
                        if (metadata) {
                            metadataEntity.updateCloudDiscoveryMetadata(metadata, false);
                            return [2 /*return*/, AuthorityMetadataSource.CONFIG];
                        }
                        // If The cached metadata came from config but that config was not passed to this instance, we must go to the network
                        if (this.isAuthoritySameType(metadataEntity) && metadataEntity.aliasesFromNetwork && !metadataEntity.isExpired()) {
                            // No need to update
                            return [2 /*return*/, AuthorityMetadataSource.CACHE];
                        }
                        return [4 /*yield*/, this.getCloudDiscoveryMetadataFromNetwork()];
                    case 1:
                        metadata = _a.sent();
                        if (metadata) {
                            metadataEntity.updateCloudDiscoveryMetadata(metadata, true);
                            return [2 /*return*/, AuthorityMetadataSource.NETWORK];
                        }
                        else {
                            // Metadata could not be obtained from config, cache or network
                            throw ClientConfigurationError.createUntrustedAuthorityError();
                        }
                }
            });
        });
    };
    /**
     * Parse cloudDiscoveryMetadata config or check knownAuthorities
     */
    Authority.prototype.getCloudDiscoveryMetadataFromConfig = function () {
        // Check if network response was provided in config
        if (this.authorityOptions.cloudDiscoveryMetadata) {
            try {
                var parsedResponse = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata);
                var metadata = Authority.getCloudDiscoveryMetadataFromNetworkResponse(parsedResponse.metadata, this.hostnameAndPort);
                if (metadata) {
                    return metadata;
                }
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidCloudDiscoveryMetadataError();
            }
        }
        // If cloudDiscoveryMetadata is empty or does not contain the host, check knownAuthorities
        if (this.isInKnownAuthorities()) {
            return Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        return null;
    };
    /**
     * Called to get metadata from network if CloudDiscoveryMetadata was not populated by config
     * @param networkInterface
     */
    Authority.prototype.getCloudDiscoveryMetadataFromNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var instanceDiscoveryEndpoint, match, response, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instanceDiscoveryEndpoint = "" + Constants.AAD_INSTANCE_DISCOVERY_ENDPT + this.canonicalAuthority + "oauth2/v2.0/authorize";
                        match = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.networkInterface.sendGetRequestAsync(instanceDiscoveryEndpoint)];
                    case 2:
                        response = _a.sent();
                        metadata = isCloudInstanceDiscoveryResponse(response.body) ? response.body.metadata : [];
                        if (metadata.length === 0) {
                            // If no metadata is returned, authority is untrusted
                            return [2 /*return*/, null];
                        }
                        match = Authority.getCloudDiscoveryMetadataFromNetworkResponse(metadata, this.hostnameAndPort);
                        return [3 /*break*/, 4];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4:
                        if (!match) {
                            // Custom Domain scenario, host is trusted because Instance Discovery call succeeded 
                            match = Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
                        }
                        return [2 /*return*/, match];
                }
            });
        });
    };
    /**
     * Helper function to determine if this host is included in the knownAuthorities config option
     */
    Authority.prototype.isInKnownAuthorities = function () {
        var _this = this;
        var matches = this.authorityOptions.knownAuthorities.filter(function (authority) {
            return UrlString.getDomainFromUrl(authority).toLowerCase() === _this.hostnameAndPort;
        });
        return matches.length > 0;
    };
    /**
     * Creates cloud discovery metadata object from a given host
     * @param host
     */
    Authority.createCloudDiscoveryMetadataFromHost = function (host) {
        return {
            preferred_network: host,
            preferred_cache: host,
            aliases: [host]
        };
    };
    /**
     * Searches instance discovery network response for the entry that contains the host in the aliases list
     * @param response
     * @param authority
     */
    Authority.getCloudDiscoveryMetadataFromNetworkResponse = function (response, authority) {
        for (var i = 0; i < response.length; i++) {
            var metadata = response[i];
            if (metadata.aliases.indexOf(authority) > -1) {
                return metadata;
            }
        }
        return null;
    };
    /**
     * helper function to generate environment from authority object
     */
    Authority.prototype.getPreferredCache = function () {
        if (this.discoveryComplete()) {
            return this.metadata.preferred_cache;
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    };
    /**
     * Returns whether or not the provided host is an alias of this authority instance
     * @param host
     */
    Authority.prototype.isAlias = function (host) {
        return this.metadata.aliases.indexOf(host) > -1;
    };
    /**
     * Checks whether the provided host is that of a public cloud authority
     *
     * @param authority string
     * @returns bool
     */
    Authority.isPublicCloudAuthority = function (host) {
        return Constants.KNOWN_PUBLIC_CLOUDS.indexOf(host) >= 0;
    };
    /**
     * Rebuild the authority string with the region
     *
     * @param host string
     * @param region string
     */
    Authority.buildRegionalAuthorityString = function (host, region, queryString) {
        // Create and validate a Url string object with the initial authority string
        var authorityUrlInstance = new UrlString(host);
        authorityUrlInstance.validateAsUri();
        var authorityUrlParts = authorityUrlInstance.getUrlComponents();
        var hostNameAndPort = region + "." + authorityUrlParts.HostNameAndPort;
        if (this.isPublicCloudAuthority(authorityUrlParts.HostNameAndPort)) {
            hostNameAndPort = region + "." + Constants.REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX;
        }
        // Include the query string portion of the url
        var url = UrlString.constructAuthorityUriFromObject(__assign(__assign({}, authorityUrlInstance.getUrlComponents()), { HostNameAndPort: hostNameAndPort })).urlString;
        // Add the query string if a query string was provided
        if (queryString)
            return url + "?" + queryString;
        return url;
    };
    /**
     * Replace the endpoints in the metadata object with their regional equivalents.
     *
     * @param metadata OpenIdConfigResponse
     * @param azureRegion string
     */
    Authority.replaceWithRegionalInformation = function (metadata, azureRegion) {
        metadata.authorization_endpoint = Authority.buildRegionalAuthorityString(metadata.authorization_endpoint, azureRegion);
        // TODO: Enquire on whether we should leave the query string or remove it before releasing the feature
        metadata.token_endpoint = Authority.buildRegionalAuthorityString(metadata.token_endpoint, azureRegion, "allowestsrnonmsi=true");
        metadata.end_session_endpoint = Authority.buildRegionalAuthorityString(metadata.end_session_endpoint, azureRegion);
        return metadata;
    };
    return Authority;
}());

export { Authority };
//# sourceMappingURL=Authority.js.map
