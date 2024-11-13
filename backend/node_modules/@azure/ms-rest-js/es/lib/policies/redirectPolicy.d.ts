import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike } from "./requestPolicy";
/**
 * Options for how redirect responses are handled.
 */
export interface RedirectOptions {
    handleRedirects: boolean;
    maxRetries?: number;
}
export declare const DefaultRedirectOptions: RedirectOptions;
export declare function redirectPolicy(maximumRetries?: number): RequestPolicyFactory;
export declare class RedirectPolicy extends BaseRequestPolicy {
    readonly maxRetries: number;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, maxRetries?: number);
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=redirectPolicy.d.ts.map