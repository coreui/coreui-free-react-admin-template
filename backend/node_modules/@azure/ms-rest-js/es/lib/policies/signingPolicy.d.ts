import { ServiceClientCredentials } from "../credentials/serviceClientCredentials";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { BaseRequestPolicy, RequestPolicyFactory, RequestPolicy, RequestPolicyOptionsLike } from "./requestPolicy";
export declare function signingPolicy(authenticationProvider: ServiceClientCredentials): RequestPolicyFactory;
export declare class SigningPolicy extends BaseRequestPolicy {
    authenticationProvider: ServiceClientCredentials;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, authenticationProvider: ServiceClientCredentials);
    signRequest(request: WebResourceLike): Promise<WebResourceLike>;
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=signingPolicy.d.ts.map