import { ClientConfiguration } from "../config/ClientConfiguration";
import { BaseClient } from "./BaseClient";
import { AuthenticationResult } from "../response/AuthenticationResult";
import { CommonClientCredentialRequest } from "../request/CommonClientCredentialRequest";
/**
 * OAuth2.0 client credential grant
 */
export declare class ClientCredentialClient extends BaseClient {
    private scopeSet;
    constructor(configuration: ClientConfiguration);
    /**
     * Public API to acquire a token with ClientCredential Flow for Confidential clients
     * @param request
     */
    acquireToken(request: CommonClientCredentialRequest): Promise<AuthenticationResult | null>;
    /**
     * looks up cache if the tokens are cached already
     */
    private getCachedAuthenticationResult;
    /**
     * Reads access token from the cache
     * TODO: Move this call to cacheManager instead
     */
    private readAccessTokenFromCache;
    /**
     * Makes a network call to request the token from the service
     * @param request
     * @param authority
     */
    private executeTokenRequest;
    /**
     * generate the request to the server in the acceptable format
     * @param request
     */
    private createTokenRequestBody;
}
//# sourceMappingURL=ClientCredentialClient.d.ts.map