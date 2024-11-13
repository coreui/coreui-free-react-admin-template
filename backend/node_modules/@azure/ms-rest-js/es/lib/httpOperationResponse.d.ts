/// <reference types="node" />
import { WebResourceLike } from "./webResource";
import { HttpHeadersLike } from "./httpHeaders";
/**
 * The properties on an HTTP response which will always be present.
 */
export interface HttpResponse {
    /**
     * The raw request
     */
    request: WebResourceLike;
    /**
     * The HTTP response status (e.g. 200)
     */
    status: number;
    /**
     * The HTTP response headers.
     */
    headers: HttpHeadersLike;
}
declare global {
    /**
     * Stub declaration of the browser-only Blob type.
     * Full type information can be obtained by including "lib": ["dom"] in tsconfig.json.
     */
    interface Blob {
    }
}
/**
 * Wrapper object for http request and response. Deserialized object is stored in
 * the `parsedBody` property when the response body is received in JSON or XML.
 */
export interface HttpOperationResponse extends HttpResponse {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders?: {
        [key: string]: any;
    };
    /**
     * The response body as text (string format)
     */
    bodyAsText?: string | null;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody?: any;
    /**
     * BROWSER ONLY
     *
     * The response body as a browser Blob.
     * Always undefined in node.js.
     */
    blobBody?: Promise<Blob>;
    /**
     * NODEJS ONLY
     *
     * The response body as a node.js Readable stream.
     * Always undefined in the browser.
     */
    readableStreamBody?: NodeJS.ReadableStream;
    /**
     * The redirected property indicates whether the response is the result of a request which was redirected.
     */
    redirected?: boolean;
    /**
     * The url property contains the URL of the response. The value will be the final URL obtained after any redirects.
     */
    url?: string;
}
/**
 * The flattened response to a REST call.
 * Contains the underlying HttpOperationResponse as well as
 * the merged properties of the parsedBody, parsedHeaders, etc.
 */
export interface RestResponse {
    /**
     * The underlying HTTP response containing both raw and deserialized response data.
     */
    _response: HttpOperationResponse;
    [key: string]: any;
}
//# sourceMappingURL=httpOperationResponse.d.ts.map