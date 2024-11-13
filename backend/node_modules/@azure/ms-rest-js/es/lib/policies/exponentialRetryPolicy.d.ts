import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike } from "./requestPolicy";
export interface RetryData {
    retryCount: number;
    retryInterval: number;
    error?: RetryError;
}
export interface RetryError extends Error {
    message: string;
    code?: string;
    innerError?: RetryError;
}
export declare function exponentialRetryPolicy(retryCount?: number, retryInterval?: number, minRetryInterval?: number, maxRetryInterval?: number): RequestPolicyFactory;
/**
 * @class
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 */
export declare class ExponentialRetryPolicy extends BaseRequestPolicy {
    /**
     * The client retry count.
     */
    retryCount: number;
    /**
     * The client retry interval in milliseconds.
     */
    retryInterval: number;
    /**
     * The minimum retry interval in milliseconds.
     */
    minRetryInterval: number;
    /**
     * The maximum retry interval in milliseconds.
     */
    maxRetryInterval: number;
    /**
     * @constructor
     * @param {RequestPolicy} nextPolicy The next RequestPolicy in the pipeline chain.
     * @param {RequestPolicyOptionsLike} options The options for this RequestPolicy.
     * @param {number} [retryCount]        The client retry count.
     * @param {number} [retryInterval]     The client retry interval, in milliseconds.
     * @param {number} [minRetryInterval]  The minimum retry interval, in milliseconds.
     * @param {number} [maxRetryInterval]  The maximum retry interval, in milliseconds.
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, retryCount?: number, retryInterval?: number, minRetryInterval?: number, maxRetryInterval?: number);
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=exponentialRetryPolicy.d.ts.map