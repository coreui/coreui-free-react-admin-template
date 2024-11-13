import { CommonRequestInfo, CommonRequestInit, CommonResponse, FetchHttpClient } from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResourceLike } from "./webResource";
export declare class BrowserFetchHttpClient extends FetchHttpClient {
    prepareRequest(_httpRequest: WebResourceLike): Promise<Partial<RequestInit>>;
    processRequest(_operationResponse: HttpOperationResponse): Promise<void>;
    fetch(input: CommonRequestInfo, init?: CommonRequestInit): Promise<CommonResponse>;
}
//# sourceMappingURL=browserFetchHttpClient.d.ts.map