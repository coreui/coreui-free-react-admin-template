import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike } from "./requestPolicy";
export declare function logPolicy(logger?: any): RequestPolicyFactory;
export declare class LogPolicy extends BaseRequestPolicy {
    logger?: any;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, logger?: any);
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=logPolicy.d.ts.map