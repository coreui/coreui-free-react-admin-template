import { ClientConfiguration } from "../config/ClientConfiguration";
import { BaseClient } from "./BaseClient";
import { AuthenticationResult } from "../response/AuthenticationResult";
import { CommonOnBehalfOfRequest } from "../request/CommonOnBehalfOfRequest";
/**
 * On-Behalf-Of client
 */
export declare class OnBehalfOfClient extends BaseClient {
    private scopeSet;
    constructor(configuration: ClientConfiguration);
    /**
     * Public API to acquire tokens with on behalf of flow
     * @param request
     */
    acquireToken(request: CommonOnBehalfOfRequest): Promise<AuthenticationResult | null>;
    /**
     * look up cache for tokens
     * @param request
     */
    private getCachedAuthenticationResult;
    /**
     * read access token from cache TODO: CacheManager API should be used here
     * @param request
     */
    private readAccessTokenFromCache;
    /**
     * read idtoken from cache TODO: CacheManager API should be used here instead
     * @param request
     */
    private readIdTokenFromCache;
    /**
     * read account from cache, TODO: CacheManager API should be used here instead
     * @param account
     */
    private readAccountFromCache;
    /**
     * Make a network call to the server requesting credentials
     * @param request
     * @param authority
     */
    private executeTokenRequest;
    /**
     * generate a server request in accepable format
     * @param request
     */
    private createTokenRequestBody;
}
//# sourceMappingURL=OnBehalfOfClient.d.ts.map