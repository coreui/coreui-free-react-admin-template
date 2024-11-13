/**
 * @hidden
 */
import { Authority } from "./Authority";
import { ITenantDiscoveryResponse } from "./ITenantDiscoveryResponse";
import TelemetryManager from "../telemetry/TelemetryManager";
export declare class AuthorityFactory {
    private static metadataMap;
    static saveMetadataFromNetwork(authorityInstance: Authority, telemetryManager: TelemetryManager, correlationId: string): Promise<ITenantDiscoveryResponse>;
    static getMetadata(authorityUrl: string): ITenantDiscoveryResponse;
    static saveMetadataFromConfig(authorityUrl: string, authorityMetadataJson: string): void;
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (eg aad, b2c)
     */
    static CreateInstance(authorityUrl: string, validateAuthority: boolean, authorityMetadata?: string): Authority;
}
