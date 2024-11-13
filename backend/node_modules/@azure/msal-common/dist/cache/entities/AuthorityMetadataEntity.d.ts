import { CloudDiscoveryMetadata } from "../../authority/CloudDiscoveryMetadata";
import { OpenIdConfigResponse } from "../../authority/OpenIdConfigResponse";
export declare class AuthorityMetadataEntity {
    aliases: Array<string>;
    preferred_cache: string;
    preferred_network: string;
    canonical_authority: string;
    authorization_endpoint: string;
    token_endpoint: string;
    end_session_endpoint: string;
    issuer: string;
    aliasesFromNetwork: boolean;
    endpointsFromNetwork: boolean;
    expiresAt: number;
    constructor();
    /**
     * Update the entity with new aliases, preferred_cache and preferred_network values
     * @param metadata
     * @param fromNetwork
     */
    updateCloudDiscoveryMetadata(metadata: CloudDiscoveryMetadata, fromNetwork: boolean): void;
    /**
     * Update the entity with new endpoints
     * @param metadata
     * @param fromNetwork
     */
    updateEndpointMetadata(metadata: OpenIdConfigResponse, fromNetwork: boolean): void;
    /**
     * Save the authority that was used to create this cache entry
     * @param authority
     */
    updateCanonicalAuthority(authority: string): void;
    /**
     * Reset the exiresAt value
     */
    resetExpiresAt(): void;
    /**
     * Returns whether or not the data needs to be refreshed
     */
    isExpired(): boolean;
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAuthorityMetadataEntity(key: string, entity: object): boolean;
}
//# sourceMappingURL=AuthorityMetadataEntity.d.ts.map