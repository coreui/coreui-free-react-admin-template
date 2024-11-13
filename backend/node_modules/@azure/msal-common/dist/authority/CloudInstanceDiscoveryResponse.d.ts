import { CloudDiscoveryMetadata } from "./CloudDiscoveryMetadata";
/**
 * The OpenID Configuration Endpoint Response type. Used by the authority class to get relevant OAuth endpoints.
 */
export declare type CloudInstanceDiscoveryResponse = {
    tenant_discovery_endpoint: string;
    metadata: Array<CloudDiscoveryMetadata>;
};
export declare function isCloudInstanceDiscoveryResponse(response: object): boolean;
//# sourceMappingURL=CloudInstanceDiscoveryResponse.d.ts.map