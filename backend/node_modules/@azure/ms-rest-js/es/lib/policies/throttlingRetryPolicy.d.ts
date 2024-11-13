import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptionsLike, RequestPolicyFactory } from "./requestPolicy";
import { WebResourceLike } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";
/**
 * Options that control how to retry on response status code 429.
 */
export interface ThrottlingRetryOptions {
    /**
     * The maximum number of retry attempts.  Defaults to 3.
     */
    maxRetries?: number;
}
export declare function throttlingRetryPolicy(maxRetries?: number): RequestPolicyFactory;
/**
 * To learn more, please refer to
 * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
 * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
 * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 */
export declare class ThrottlingRetryPolicy extends BaseRequestPolicy {
    private retryLimit;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, retryLimit: number);
    sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse>;
    private retry;
    static parseRetryAfterHeader(headerValue: string): number | undefined;
    static parseDateRetryAfterHeader(headerValue: string): number | undefined;
}
//# sourceMappingURL=throttlingRetryPolicy.d.ts.map