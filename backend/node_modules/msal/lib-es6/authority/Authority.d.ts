import { IUri } from "../IUri";
import { ITenantDiscoveryResponse } from "./ITenantDiscoveryResponse";
import TelemetryManager from "../telemetry/TelemetryManager";
/**
 * @hidden
 */
export declare enum AuthorityType {
    Default = 0,
    Adfs = 1
}
/**
 * @hidden
 */
export declare class Authority {
    constructor(authority: string, validateAuthority: boolean, authorityMetadata?: ITenantDiscoveryResponse);
    static isAdfs(authorityUrl: string): boolean;
    get AuthorityType(): AuthorityType;
    IsValidationEnabled: boolean;
    get Tenant(): string;
    private tenantDiscoveryResponse;
    get AuthorizationEndpoint(): string;
    get EndSessionEndpoint(): string;
    get SelfSignedJwtAudience(): string;
    private validateResolved;
    /**
     * A URL that is the authority set by the developer
     */
    get CanonicalAuthority(): string;
    set CanonicalAuthority(url: string);
    private canonicalAuthority;
    private canonicalAuthorityUrlComponents;
    get CanonicalAuthorityUrlComponents(): IUri;
    protected get DefaultOpenIdConfigurationEndpoint(): string;
    /**
     * Given a string, validate that it is of the form https://domain/path
     */
    private validateAsUri;
    /**
     * Calls the OIDC endpoint and returns the response
     */
    private DiscoverEndpoints;
    /**
     * Returns a promise.
     * Checks to see if the authority is in the cache
     * Discover endpoints via openid-configuration
     * If successful, caches the endpoint for later use in OIDC
     */
    resolveEndpointsAsync(telemetryManager: TelemetryManager, correlationId: string): Promise<ITenantDiscoveryResponse>;
    /**
     * Checks if there is a cached tenant discovery response with required fields.
     */
    hasCachedMetadata(): boolean;
    /**
     * Returns a promise which resolves to the OIDC endpoint
     * Only responds with the endpoint
     */
    GetOpenIdConfigurationEndpoint(): string;
}
