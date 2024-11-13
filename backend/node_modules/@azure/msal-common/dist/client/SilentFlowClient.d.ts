import { BaseClient } from "./BaseClient";
import { ClientConfiguration } from "../config/ClientConfiguration";
import { CommonSilentFlowRequest } from "../request/CommonSilentFlowRequest";
import { AuthenticationResult } from "../response/AuthenticationResult";
export declare class SilentFlowClient extends BaseClient {
    constructor(configuration: ClientConfiguration);
    /**
     * Retrieves a token from cache if it is still valid, or uses the cached refresh token to renew
     * the given token and returns the renewed token
     * @param request
     */
    acquireToken(request: CommonSilentFlowRequest): Promise<AuthenticationResult>;
    /**
     * Retrieves token from cache or throws an error if it must be refreshed.
     * @param request
     */
    acquireCachedToken(request: CommonSilentFlowRequest): Promise<AuthenticationResult>;
    /**
     * Helper function to build response object from the CacheRecord
     * @param cacheRecord
     */
    private generateResultFromCacheRecord;
}
//# sourceMappingURL=SilentFlowClient.d.ts.map