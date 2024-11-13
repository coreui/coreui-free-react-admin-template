import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike } from "./requestPolicy";
export declare function generateClientRequestIdPolicy(requestIdHeaderName?: string): RequestPolicyFactory;
export declare class GenerateClientRequestIdPolicy extends BaseRequestPolicy {
    private _requestIdHeaderName;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, _requestIdHeaderName: string);
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=generateClientRequestIdPolicy.d.ts.map