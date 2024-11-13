import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { getDefaultUserAgentKey } from "./msRestUserAgentPolicy";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike } from "./requestPolicy";
export declare type TelemetryInfo = {
    key?: string;
    value?: string;
};
export declare const getDefaultUserAgentHeaderName: typeof getDefaultUserAgentKey;
export declare function getDefaultUserAgentValue(): string;
export declare function userAgentPolicy(userAgentData?: TelemetryInfo): RequestPolicyFactory;
export declare class UserAgentPolicy extends BaseRequestPolicy {
    readonly _nextPolicy: RequestPolicy;
    readonly _options: RequestPolicyOptionsLike;
    protected headerKey: string;
    protected headerValue: string;
    constructor(_nextPolicy: RequestPolicy, _options: RequestPolicyOptionsLike, headerKey: string, headerValue: string);
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
    addUserAgentHeader(request: WebResourceLike): void;
}
//# sourceMappingURL=userAgentPolicy.d.ts.map