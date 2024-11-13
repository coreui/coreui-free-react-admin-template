import { HttpClient } from "./httpClient";
import { WebResourceLike } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
import { HttpHeadersLike } from "./httpHeaders";
export declare type CommonRequestInfo = string;
export declare type CommonRequestInit = Omit<RequestInit, "body" | "headers" | "signal"> & {
    body?: any;
    headers?: any;
    signal?: any;
};
export declare type CommonResponse = Omit<Response, "body" | "trailer" | "formData"> & {
    body: any;
    trailer: any;
    formData: any;
};
export declare abstract class FetchHttpClient implements HttpClient {
    sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse>;
    abstract prepareRequest(httpRequest: WebResourceLike): Promise<Partial<RequestInit>>;
    abstract processRequest(operationResponse: HttpOperationResponse): Promise<void>;
    abstract fetch(input: CommonRequestInfo, init?: CommonRequestInit): Promise<CommonResponse>;
}
export declare function parseHeaders(headers: Headers): HttpHeadersLike;
//# sourceMappingURL=fetchHttpClient.d.ts.map