/// <reference types="node" />
import { TokenCredential } from "@azure/core-auth";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse, RestResponse } from "./httpOperationResponse";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { OperationArguments } from "./operationArguments";
import { ParameterPath } from "./operationParameter";
import { OperationSpec } from "./operationSpec";
import { DeserializationContentTypes } from "./policies/deserializationPolicy";
import { RedirectOptions } from "./policies/redirectPolicy";
import { RequestPolicyFactory } from "./policies/requestPolicy";
import { Mapper, Serializer } from "./serializer";
import { RequestPrepareOptions, WebResourceLike } from "./webResource";
import { OperationResponse } from "./operationResponse";
import { ServiceCallback } from "./util/utils";
import { Agent } from "http";
/**
 * HTTP proxy settings (Node.js only)
 */
export interface ProxySettings {
    host: string;
    port: number;
    username?: string;
    password?: string;
}
/**
 * HTTP and HTTPS agents (Node.js only)
 */
export interface AgentSettings {
    http: Agent;
    https: Agent;
}
/**
 * Options to be provided while creating the client.
 */
export interface ServiceClientOptions {
    /**
     * An array of factories which get called to create the RequestPolicy pipeline used to send a HTTP
     * request on the wire, or a function that takes in the defaultRequestPolicyFactories and returns
     * the requestPolicyFactories that will be used.
     */
    requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
    /**
     * The HttpClient that will be used to send HTTP requests.
     */
    httpClient?: HttpClient;
    /**
     * The HttpPipelineLogger that can be used to debug RequestPolicies within the HTTP pipeline.
     */
    httpPipelineLogger?: HttpPipelineLogger;
    /**
     * If set to true, turn off the default retry policy.
     */
    noRetryPolicy?: boolean;
    /**
     * Gets or sets the retry timeout in seconds for AutomaticRPRegistration. Default value is 30.
     */
    rpRegistrationRetryTimeout?: number;
    /**
     * Whether or not to generate a client request ID header for each HTTP request.
     */
    generateClientRequestIdHeader?: boolean;
    /**
     * Whether to include credentials in CORS requests in the browser.
     * See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials for more information.
     */
    withCredentials?: boolean;
    /**
     * If specified, a GenerateRequestIdPolicy will be added to the HTTP pipeline that will add a
     * header to all outgoing requests with this header name and a random UUID as the request ID.
     */
    clientRequestIdHeaderName?: string;
    /**
     * The content-types that will be associated with JSON or XML serialization.
     */
    deserializationContentTypes?: DeserializationContentTypes;
    /**
     * The header name to use for the telemetry header while sending the request. If this is not
     * specified, then "User-Agent" will be used when running on Node.js and "x-ms-command-name" will
     * be used when running in a browser.
     */
    userAgentHeaderName?: string | ((defaultUserAgentHeaderName: string) => string);
    /**
     * The string to be set to the telemetry header while sending the request, or a function that
     * takes in the default user-agent string and returns the user-agent string that will be used.
     */
    userAgent?: string | ((defaultUserAgent: string) => string);
    /**
     * Proxy settings which will be used for every HTTP request (Node.js only).
     */
    proxySettings?: ProxySettings;
    /**
     * Options for how redirect responses are handled.
     */
    redirectOptions?: RedirectOptions;
    /**
     * HTTP and HTTPS agents which will be used for every HTTP request (Node.js only).
     */
    agentSettings?: AgentSettings;
    /**
     * If specified:
     * - This `baseUri` becomes the base URI that requests will be made against for this ServiceClient.
     * - If the `baseUri` matches a known resource manager endpoint and if a `TokenCredential` was passed through the constructor, this `baseUri` defines the `getToken` scope to be `${options.baseUri}/.default`. Otherwise, the scope would default to "https://management.azure.com/.default".
     *
     * If it is not specified:
     * - All OperationSpecs must contain a baseUrl property.
     * - If a `TokenCredential` was passed through the constructor, the `getToken` scope is set to be "https://management.azure.com/.default".
     */
    baseUri?: string;
}
/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
export declare class ServiceClient {
    /**
     * The base URI against which requests will be made when using this ServiceClient instance.
     *
     * This can be set either by setting the `baseUri` in the `options` parameter to the ServiceClient constructor or directly after constructing the ServiceClient.
     * If set via the ServiceClient constructor when using the overload that takes the `TokenCredential`, and if it matches a known resource manager endpoint, this base URI sets the scope used to get the AAD token to `${baseUri}/.default` instead of the default "https://management.azure.com/.default"
     *
     * If it is not specified, all OperationSpecs must contain a baseUrl property.
     */
    protected baseUri?: string;
    /**
     * The default request content type for the service.
     * Used if no requestContentType is present on an OperationSpec.
     */
    protected requestContentType?: string;
    /**
     * The HTTP client that will be used to send requests.
     */
    private readonly _httpClient;
    private readonly _requestPolicyOptions;
    private readonly _requestPolicyFactories;
    private readonly _withCredentials;
    /**
     * The ServiceClient constructor
     * @constructor
     * @param {ServiceClientCredentials} [credentials] The credentials object used for authentication.
     * @param {ServiceClientOptions} [options] The service client options that govern the behavior of the client.
     */
    constructor(credentials?: ServiceClientCredentials | TokenCredential, options?: ServiceClientOptions);
    /**
     * Send the provided httpRequest.
     */
    sendRequest(options: RequestPrepareOptions | WebResourceLike): Promise<HttpOperationResponse>;
    /**
     * Send an HTTP request that is populated using the provided OperationSpec.
     * @param {OperationArguments} operationArguments The arguments that the HTTP request's templated values will be populated from.
     * @param {OperationSpec} operationSpec The OperationSpec to use to populate the httpRequest.
     * @param {ServiceCallback} callback The callback to call when the response is received.
     */
    sendOperationRequest(operationArguments: OperationArguments, operationSpec: OperationSpec, callback?: ServiceCallback<any>): Promise<RestResponse>;
}
export declare function serializeRequestBody(serviceClient: ServiceClient, httpRequest: WebResourceLike, operationArguments: OperationArguments, operationSpec: OperationSpec): void;
export declare type PropertyParent = {
    [propertyName: string]: any;
};
/**
 * Get the property parent for the property at the provided path when starting with the provided
 * parent object.
 */
export declare function getPropertyParent(parent: PropertyParent, propertyPath: string[]): PropertyParent;
export declare function getOperationArgumentValueFromParameterPath(serviceClient: ServiceClient, operationArguments: OperationArguments, parameterPath: ParameterPath, parameterMapper: Mapper, serializer: Serializer): any;
export declare function flattenResponse(_response: HttpOperationResponse, responseSpec: OperationResponse | undefined): RestResponse;
//# sourceMappingURL=serviceClient.d.ts.map