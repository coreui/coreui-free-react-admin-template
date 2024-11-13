/**
 * @hidden
 */
export interface ITenantDiscoveryResponse {
    AuthorizationEndpoint: string;
    EndSessionEndpoint: string;
    Issuer: string;
}
/**
 * Response type for openid-configuration endpoints
 */
export declare type OpenIdConfiguration = {
    authorization_endpoint: string;
    end_session_endpoint: string;
    issuer: string;
};
