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
export declare function systemErrorRetryPolicy(retryCount?: number, retryInterval?: number, minRetryInterval?: number, maxRetryInterval?: number): RequestPolicyFactory;
/**
 * @class
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 *
 * @constructor
 * @param {number} retryCount        The client retry count.
 * @param {number} retryInterval     The client retry interval, in milliseconds.
 * @param {number} minRetryInterval  The minimum retry interval, in milliseconds.
 * @param {number} maxRetryInterval  The maximum retry interval, in milliseconds.
 */
export declare class SystemErrorRetryPolicy extends BaseRequestPolicy {
    retryCount: number;
    retryInterval: number;
    minRetryInterval: number;
    maxRetryInterval: number;
    DEFAULT_CLIENT_RETRY_INTERVAL: number;
    DEFAULT_CLIENT_RETRY_COUNT: number;
    DEFAULT_CLIENT_MAX_RETRY_INTERVAL: number;
    DEFAULT_CLIENT_MIN_RETRY_INTERVAL: number;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, retryCount?: number, retryInterval?: number, minRetryInterval?: number, maxRetryInterval?: number);
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=systemErrorRetryPolicy.d.ts.map