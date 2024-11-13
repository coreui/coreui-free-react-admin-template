import { AgentSettings } from "../serviceClient";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike } from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
export declare function agentPolicy(agentSettings?: AgentSettings): RequestPolicyFactory;
export declare class AgentPolicy extends BaseRequestPolicy {
    agentSettings: AgentSettings;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, agentSettings: AgentSettings);
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=agentPolicy.d.ts.map