/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { AUTHORITY_METADATA_CONSTANTS } from '../../utils/Constants.js';
import { TimeUtils } from '../../utils/TimeUtils.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var AuthorityMetadataEntity = /** @class */ (function () {
    function AuthorityMetadataEntity() {
        this.expiresAt = TimeUtils.nowSeconds() + AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
    }
    /**
     * Update the entity with new aliases, preferred_cache and preferred_network values
     * @param metadata
     * @param fromNetwork
     */
    AuthorityMetadataEntity.prototype.updateCloudDiscoveryMetadata = function (metadata, fromNetwork) {
        this.aliases = metadata.aliases;
        this.preferred_cache = metadata.preferred_cache;
        this.preferred_network = metadata.preferred_network;
        this.aliasesFromNetwork = fromNetwork;
    };
    /**
     * Update the entity with new endpoints
     * @param metadata
     * @param fromNetwork
     */
    AuthorityMetadataEntity.prototype.updateEndpointMetadata = function (metadata, fromNetwork) {
        this.authorization_endpoint = metadata.authorization_endpoint;
        this.token_endpoint = metadata.token_endpoint;
        this.end_session_endpoint = metadata.end_session_endpoint;
        this.issuer = metadata.issuer;
        this.endpointsFromNetwork = fromNetwork;
    };
    /**
     * Save the authority that was used to create this cache entry
     * @param authority
     */
    AuthorityMetadataEntity.prototype.updateCanonicalAuthority = function (authority) {
        this.canonical_authority = authority;
    };
    /**
     * Reset the exiresAt value
     */
    AuthorityMetadataEntity.prototype.resetExpiresAt = function () {
        this.expiresAt = TimeUtils.nowSeconds() + AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
    };
    /**
     * Returns whether or not the data needs to be refreshed
     */
    AuthorityMetadataEntity.prototype.isExpired = function () {
        return this.expiresAt <= TimeUtils.nowSeconds();
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    AuthorityMetadataEntity.isAuthorityMetadataEntity = function (key, entity) {
        if (!entity) {
            return false;
        }
        return (key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) === 0 &&
            entity.hasOwnProperty("aliases") &&
            entity.hasOwnProperty("preferred_cache") &&
            entity.hasOwnProperty("preferred_network") &&
            entity.hasOwnProperty("canonical_authority") &&
            entity.hasOwnProperty("authorization_endpoint") &&
            entity.hasOwnProperty("token_endpoint") &&
            entity.hasOwnProperty("end_session_endpoint") &&
            entity.hasOwnProperty("issuer") &&
            entity.hasOwnProperty("aliasesFromNetwork") &&
            entity.hasOwnProperty("endpointsFromNetwork") &&
            entity.hasOwnProperty("expiresAt"));
    };
    return AuthorityMetadataEntity;
}());

export { AuthorityMetadataEntity };
//# sourceMappingURL=AuthorityMetadataEntity.js.map
