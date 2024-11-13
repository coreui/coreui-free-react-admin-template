import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike } from "./requestPolicy";
/**
 * The content-types that will indicate that an operation response should be deserialized in a
 * particular way.
 */
export interface DeserializationContentTypes {
    /**
     * The content-types that indicate that an operation response should be deserialized as JSON.
     * Defaults to [ "application/json", "text/json" ].
     */
    json?: string[];
    /**
     * The content-types that indicate that an operation response should be deserialized as XML.
     * Defaults to [ "application/xml", "application/atom+xml" ].
     */
    xml?: string[];
}
/**
 * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
 * pass through the HTTP pipeline.
 */
export declare function deserializationPolicy(deserializationContentTypes?: DeserializationContentTypes): RequestPolicyFactory;
export declare const defaultJsonContentTypes: string[];
export declare const defaultXmlContentTypes: string[];
/**
 * A RequestPolicy that will deserialize HTTP response bodies and headers as they pass through the
 * HTTP pipeline.
 */
export declare class DeserializationPolicy extends BaseRequestPolicy {
    readonly jsonContentTypes: string[];
    readonly xmlContentTypes: string[];
    constructor(nextPolicy: RequestPolicy, deserializationContentTypes: DeserializationContentTypes | undefined, options: RequestPolicyOptionsLike);
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
}
export declare function deserializeResponseBody(jsonContentTypes: string[], xmlContentTypes: string[], response: HttpOperationResponse): Promise<HttpOperationResponse>;
//# sourceMappingURL=deserializationPolicy.d.ts.map