import { HttpClient } from "./httpClient";
import { HttpHeaders } from "./httpHeaders";
import { WebResourceLike } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
/**
 * A HttpClient implementation that uses XMLHttpRequest to send HTTP requests.
 */
export declare class XhrHttpClient implements HttpClient {
    sendRequest(request: WebResourceLike): Promise<HttpOperationResponse>;
}
export declare function parseHeaders(xhr: XMLHttpRequest): HttpHeaders;
//# sourceMappingURL=xhrHttpClient.d.ts.map