import { AgentSettings } from "../serviceClient";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike } from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
export declare function agentPolicy(_agentSettings?: AgentSettings): RequestPolicyFactory;
export declare class AgentPolicy extends BaseRequestPolicy {
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike);
    sendRequest(_request: WebResourceLike): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=agentPolicy.browser.d.ts.map