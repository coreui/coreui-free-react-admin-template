/// <reference types="node" />
import { HttpHeadersLike } from "./httpHeaders";
import { OperationSpec } from "./operationSpec";
import { Mapper } from "./serializer";
import { HttpOperationResponse } from "./httpOperationResponse";
import { OperationResponse } from "./operationResponse";
import { AgentSettings, ProxySettings } from "./serviceClient";
export declare type HttpMethods = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE";
export declare type HttpRequestBody = Blob | string | ArrayBuffer | ArrayBufferView | (() => NodeJS.ReadableStream);
/**
 * Fired in response to upload or download progress.
 */
export declare type TransferProgressEvent = {
    /**
     * The number of bytes loaded so far.
     */
    loadedBytes: number;
};
/**
 * Allows the request to be aborted upon firing of the "abort" event.
 * Compatible with the browser built-in AbortSignal and common polyfills.
 */
export interface AbortSignalLike {
    readonly aborted: boolean;
    dispatchEvent: (event: Event) => boolean;
    onabort: ((this: AbortSignalLike, ev: Event) => any) | null;
    addEventListener: (type: "abort", listener: (this: AbortSignalLike, ev: Event) => any, options?: any) => void;
    removeEventListener: (type: "abort", listener: (this: AbortSignalLike, ev: Event) => any, options?: any) => void;
}
/**
 * An abstraction over a REST call.
 */
export interface WebResourceLike {
    /**
     * The URL being accessed by the request.
     */
    url: string;
    /**
     * The HTTP method to use when making the request.
     */
    method: HttpMethods;
    /**
     * The HTTP body contents of the request.
     */
    body?: any;
    /**
     * The HTTP headers to use when making the request.
     */
    headers: HttpHeadersLike;
    /**
     * Whether or not the body of the HttpOperationResponse should be treated as a stream.
     */
    streamResponseBody?: boolean;
    /**
     * Whether or not the HttpOperationResponse should be deserialized. If this is undefined, then the
     * HttpOperationResponse should be deserialized.
     */
    shouldDeserialize?: boolean | ((response: HttpOperationResponse) => boolean);
    /**
     * A function that returns the proper OperationResponse for the given OperationSpec and
     * HttpOperationResponse combination. If this is undefined, then a simple status code lookup will
     * be used.
     */
    operationResponseGetter?: (operationSpec: OperationSpec, response: HttpOperationResponse) => undefined | OperationResponse;
    formData?: any;
    /**
     * A query string represented as an object.
     */
    query?: {
        [key: string]: any;
    };
    /**
     * Used to parse the response.
     */
    operationSpec?: OperationSpec;
    /**
     * If credentials (cookies) should be sent along during an XHR.
     */
    withCredentials: boolean;
    /**
     * The number of milliseconds a request can take before automatically being terminated.
     * If the request is terminated, an `AbortError` is thrown.
     */
    timeout: number;
    /**
     * Proxy configuration.
     */
    proxySettings?: ProxySettings;
    /**
     * HTTP(S) agent configuration.
     */
    agentSettings?: AgentSettings;
    /**
     * If the connection should be reused.
     */
    keepAlive?: boolean;
    /**
     * Limit the number of redirects followed for this request. If set to 0, redirects will not be followed.
     * If left undefined the default redirect behaviour of the underlying node_fetch will apply.
     */
    redirectLimit?: number;
    /**
     * Used to abort the request later.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Callback which fires upon upload progress.
     */
    onUploadProgress?: (progress: TransferProgressEvent) => void;
    /** Callback which fires upon download progress. */
    onDownloadProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Validates that the required properties such as method, url, headers["Content-Type"],
     * headers["accept-language"] are defined. It will throw an error if one of the above
     * mentioned properties are not defined.
     */
    validateRequestProperties(): void;
    /**
     * Sets options on the request.
     */
    prepare(options: RequestPrepareOptions): WebResourceLike;
    /**
     * Clone this request object.
     */
    clone(): WebResourceLike;
}
export declare function isWebResourceLike(object: any): object is WebResourceLike;
/**
 * Creates a new WebResource object.
 *
 * This class provides an abstraction over a REST call by being library / implementation agnostic and wrapping the necessary
 * properties to initiate a request.
 *
 * @constructor
 */
export declare class WebResource {
    url: string;
    method: HttpMethods;
    body?: any;
    headers: HttpHeadersLike;
    /**
     * Whether or not the body of the HttpOperationResponse should be treated as a stream.
     */
    streamResponseBody?: boolean;
    /**
     * Whether or not the HttpOperationResponse should be deserialized. If this is undefined, then the
     * HttpOperationResponse should be deserialized.
     */
    shouldDeserialize?: boolean | ((response: HttpOperationResponse) => boolean);
    /**
     * A function that returns the proper OperationResponse for the given OperationSpec and
     * HttpOperationResponse combination. If this is undefined, then a simple status code lookup will
     * be used.
     */
    operationResponseGetter?: (operationSpec: OperationSpec, response: HttpOperationResponse) => undefined | OperationResponse;
    formData?: any;
    query?: {
        [key: string]: any;
    };
    operationSpec?: OperationSpec;
    withCredentials: boolean;
    timeout: number;
    proxySettings?: ProxySettings;
    keepAlive?: boolean;
    agentSettings?: AgentSettings;
    redirectLimit?: number;
    abortSignal?: AbortSignalLike;
    /** Callback which fires upon upload progress. */
    onUploadProgress?: (progress: TransferProgressEvent) => void;
    /** Callback which fires upon download progress. */
    onDownloadProgress?: (progress: TransferProgressEvent) => void;
    constructor(url?: string, method?: HttpMethods, body?: any, query?: {
        [key: string]: any;
    }, headers?: {
        [key: string]: any;
    } | HttpHeadersLike, streamResponseBody?: boolean, withCredentials?: boolean, abortSignal?: AbortSignalLike, timeout?: number, onUploadProgress?: (progress: TransferProgressEvent) => void, onDownloadProgress?: (progress: TransferProgressEvent) => void, proxySettings?: ProxySettings, keepAlive?: boolean, agentSettings?: AgentSettings, redirectLimit?: number);
    /**
     * Validates that the required properties such as method, url, headers["Content-Type"],
     * headers["accept-language"] are defined. It will throw an error if one of the above
     * mentioned properties are not defined.
     */
    validateRequestProperties(): void;
    /**
     * Prepares the request.
     * @param {RequestPrepareOptions} options Options to provide for preparing the request.
     * @returns {WebResource} Returns the prepared WebResource (HTTP Request) object that needs to be given to the request pipeline.
     */
    prepare(options: RequestPrepareOptions): WebResource;
    /**
     * Clone this WebResource HTTP request object.
     * @returns {WebResource} The clone of this WebResource HTTP request object.
     */
    clone(): WebResource;
}
export interface RequestPrepareOptions {
    /**
     * The HTTP request method. Valid values are "GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST",
     * or "PATCH".
     */
    method: HttpMethods;
    /**
     * The request url. It may or may not have query parameters in it. Either provide the "url" or
     * provide the "pathTemplate" in the options object. Both the options are mutually exclusive.
     */
    url?: string;
    /**
     * A dictionary of query parameters to be appended to the url, where
     * the "key" is the "query-parameter-name" and the "value" is the "query-parameter-value".
     * The "query-parameter-value" can be of type "string" or it can be of type "object".
     * The "object" format should be used when you want to skip url encoding. While using the object format,
     * the object must have a property named value which provides the "query-parameter-value".
     * Example:
     *    - query-parameter-value in "object" format: { "query-parameter-name": { value: "query-parameter-value", skipUrlEncoding: true } }
     *    - query-parameter-value in "string" format: { "query-parameter-name": "query-parameter-value"}.
     * Note: "If options.url already has some query parameters, then the value provided in options.queryParameters will be appended to the url.
     */
    queryParameters?: {
        [key: string]: any | ParameterValue;
    };
    /**
     * The path template of the request url. Either provide the "url" or provide the "pathTemplate" in
     * the options object. Both the options are mutually exclusive.
     * Example: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}"
     */
    pathTemplate?: string;
    /**
     * The base url of the request. Default value is: "https://management.azure.com". This is
     * applicable only with pathTemplate. If you are providing options.url then it is expected that
     * you provide the complete url.
     */
    baseUrl?: string;
    /**
     * A dictionary of path parameters that need to be replaced with actual values in the pathTemplate.
     * Here the key is the "path-parameter-name" and the value is the "path-parameter-value".
     * The "path-parameter-value" can be of type "string"  or it can be of type "object".
     * The "object" format should be used when you want to skip url encoding. While using the object format,
     * the object must have a property named value which provides the "path-parameter-value".
     * Example:
     *    - path-parameter-value in "object" format: { "path-parameter-name": { value: "path-parameter-value", skipUrlEncoding: true } }
     *    - path-parameter-value in "string" format: { "path-parameter-name": "path-parameter-value" }.
     */
    pathParameters?: {
        [key: string]: any | ParameterValue;
    };
    formData?: {
        [key: string]: any;
    };
    /**
     * A dictionary of request headers that need to be applied to the request.
     * Here the key is the "header-name" and the value is the "header-value". The header-value MUST be of type string.
     *  - ContentType must be provided with the key name as "Content-Type". Default value "application/json; charset=utf-8".
     *  - "Transfer-Encoding" is set to "chunked" by default if "options.bodyIsStream" is set to true.
     *  - "Content-Type" is set to "application/octet-stream" by default if "options.bodyIsStream" is set to true.
     *  - "accept-language" by default is set to "en-US"
     *  - "x-ms-client-request-id" by default is set to a new Guid. To not generate a guid for the request, please set options.disableClientRequestId to true
     */
    headers?: {
        [key: string]: any;
    };
    /**
     * When set to true, instructs the client to not set "x-ms-client-request-id" header to a new Guid().
     */
    disableClientRequestId?: boolean;
    /**
     * The request body. It can be of any type. This value will be serialized if it is not a stream.
     */
    body?: any;
    /**
     * Provides information on how to serialize the request body.
     */
    serializationMapper?: Mapper;
    /**
     * A dictionary of mappers that may be used while [de]serialization.
     */
    mappers?: {
        [x: string]: any;
    };
    /**
     * Provides information on how to deserialize the response body.
     */
    deserializationMapper?: object;
    /**
     * Indicates whether this method should JSON.stringify() the request body. Default value: false.
     */
    disableJsonStringifyOnBody?: boolean;
    /**
     * Indicates whether the request body is a stream (useful for file upload scenarios).
     */
    bodyIsStream?: boolean;
    abortSignal?: AbortSignalLike;
    /**
     * Limit the number of redirects followed for this request. If set to 0, redirects will not be followed.
     * If left undefined the default redirect behaviour of the underlying node_fetch will apply.
     */
    redirectLimit?: number;
    onUploadProgress?: (progress: TransferProgressEvent) => void;
    onDownloadProgress?: (progress: TransferProgressEvent) => void;
    streamResponseBody?: boolean;
}
/**
 * The Parameter value provided for path or query parameters in RequestPrepareOptions
 */
export interface ParameterValue {
    value: any;
    skipUrlEncoding: boolean;
    [key: string]: any;
}
/**
 * Describes the base structure of the options object that will be used in every operation.
 */
export interface RequestOptionsBase {
    /**
     * @property {object} [customHeaders] User defined custom request headers that
     * will be applied before the request is sent.
     */
    customHeaders?: {
        [key: string]: string;
    };
    /**
     * The signal which can be used to abort requests.
     */
    abortSignal?: AbortSignalLike;
    /**
     * The number of milliseconds a request can take before automatically being terminated.
     */
    timeout?: number;
    /**
     * Callback which fires upon upload progress.
     */
    onUploadProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Callback which fires upon download progress.
     */
    onDownloadProgress?: (progress: TransferProgressEvent) => void;
    [key: string]: any;
}
//# sourceMappingURL=webResource.d.ts.map