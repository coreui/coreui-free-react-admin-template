import { AbortSignalLike } from "@azure/abort-controller";
import { TracingContext } from "./tracing.js";
/**
 * Represents a credential capable of providing an authentication token.
 */
export interface TokenCredential {
    /**
     * Gets the token provided by this credential.
     *
     * This method is called automatically by Azure SDK client libraries. You may call this method
     * directly, but you must also handle token caching and token refreshing.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}
/**
 * Defines options for TokenCredential.getToken.
 */
export interface GetTokenOptions {
    /**
     * The signal which can be used to abort requests.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Options used when creating and sending HTTP requests for this operation.
     */
    requestOptions?: {
        /**
         * The number of milliseconds a request can take before automatically being terminated.
         */
        timeout?: number;
    };
    /**
     * Options used when tracing is enabled.
     */
    tracingOptions?: {
        /**
         * Tracing Context for the current request.
         */
        tracingContext?: TracingContext;
    };
    /**
     * Claim details to perform the Continuous Access Evaluation authentication flow
     */
    claims?: string;
    /**
     * Indicates whether to enable the Continuous Access Evaluation authentication flow
     */
    enableCae?: boolean;
    /**
     * Allows specifying a tenantId. Useful to handle challenges that provide tenant Id hints.
     */
    tenantId?: string;
}
/**
 * Represents an access token with an expiration time.
 */
export interface AccessToken {
    /**
     * The access token returned by the authentication service.
     */
    token: string;
    /**
     * The access token's expiration timestamp in milliseconds, UNIX epoch time.
     */
    expiresOnTimestamp: number;
}
/**
 * Tests an object to determine whether it implements TokenCredential.
 *
 * @param credential - The assumed TokenCredential to be tested.
 */
export declare function isTokenCredential(credential: unknown): credential is TokenCredential;
//# sourceMappingURL=tokenCredential.d.ts.map