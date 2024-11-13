// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { DefaultHttpClient } from "./defaultHttpClient";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse, RestResponse } from "./httpOperationResponse";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { OperationArguments } from "./operationArguments";
import {
  getPathStringFromParameter,
  getPathStringFromParameterPath,
  OperationParameter,
  ParameterPath,
} from "./operationParameter";
import { isStreamOperation, OperationSpec } from "./operationSpec";
import {
  deserializationPolicy,
  DeserializationContentTypes,
} from "./policies/deserializationPolicy";
import { exponentialRetryPolicy } from "./policies/exponentialRetryPolicy";
import { generateClientRequestIdPolicy } from "./policies/generateClientRequestIdPolicy";
import {
  userAgentPolicy,
  getDefaultUserAgentHeaderName,
  getDefaultUserAgentValue,
} from "./policies/userAgentPolicy";
import { DefaultRedirectOptions, RedirectOptions, redirectPolicy } from "./policies/redirectPolicy";
import {
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  RequestPolicyOptionsLike,
} from "./policies/requestPolicy";
import { rpRegistrationPolicy } from "./policies/rpRegistrationPolicy";
import { signingPolicy } from "./policies/signingPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { QueryCollectionFormat } from "./queryCollectionFormat";
import { CompositeMapper, DictionaryMapper, Mapper, MapperType, Serializer } from "./serializer";
import { URLBuilder } from "./url";
import * as utils from "./util/utils";
import { stringifyXML } from "./util/xml";
import {
  RequestOptionsBase,
  RequestPrepareOptions,
  WebResourceLike,
  isWebResourceLike,
  WebResource,
} from "./webResource";
import { OperationResponse } from "./operationResponse";
import { ServiceCallback } from "./util/utils";
import { agentPolicy } from "./policies/agentPolicy";
import { proxyPolicy, getDefaultProxySettings } from "./policies/proxyPolicy";
import { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
import { Agent } from "http";
import {
  AzureIdentityCredentialAdapter,
  azureResourceManagerEndpoints,
} from "./credentials/azureIdentityTokenCredentialAdapter";

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
  requestPolicyFactories?:
    | RequestPolicyFactory[]
    | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
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
export class ServiceClient {
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
  private readonly _httpClient: HttpClient;
  private readonly _requestPolicyOptions: RequestPolicyOptionsLike;

  private readonly _requestPolicyFactories: RequestPolicyFactory[];
  private readonly _withCredentials: boolean;

  /**
   * The ServiceClient constructor
   * @constructor
   * @param {ServiceClientCredentials} [credentials] The credentials object used for authentication.
   * @param {ServiceClientOptions} [options] The service client options that govern the behavior of the client.
   */
  constructor(
    credentials?: ServiceClientCredentials | TokenCredential,
    options?: ServiceClientOptions
  ) {
    if (!options) {
      options = {};
    }

    if (options.baseUri) {
      this.baseUri = options.baseUri;
    }

    let serviceClientCredentials: ServiceClientCredentials | undefined;
    if (isTokenCredential(credentials)) {
      let scope: string | undefined = undefined;
      if (options?.baseUri && azureResourceManagerEndpoints.includes(options?.baseUri)) {
        scope = `${options.baseUri}/.default`;
      }
      serviceClientCredentials = new AzureIdentityCredentialAdapter(credentials, scope);
    } else {
      serviceClientCredentials = credentials;
    }

    if (serviceClientCredentials && !serviceClientCredentials.signRequest) {
      throw new Error("credentials argument needs to implement signRequest method");
    }

    this._withCredentials = options.withCredentials || false;
    this._httpClient = options.httpClient || new DefaultHttpClient();
    this._requestPolicyOptions = new RequestPolicyOptions(options.httpPipelineLogger);

    let requestPolicyFactories: RequestPolicyFactory[];
    if (Array.isArray(options.requestPolicyFactories)) {
      requestPolicyFactories = options.requestPolicyFactories;
    } else {
      requestPolicyFactories = createDefaultRequestPolicyFactories(
        serviceClientCredentials,
        options
      );
      if (options.requestPolicyFactories) {
        const newRequestPolicyFactories:
          | void
          | RequestPolicyFactory[] = options.requestPolicyFactories(requestPolicyFactories);
        if (newRequestPolicyFactories) {
          requestPolicyFactories = newRequestPolicyFactories;
        }
      }
    }
    this._requestPolicyFactories = requestPolicyFactories;
  }

  /**
   * Send the provided httpRequest.
   */
  sendRequest(options: RequestPrepareOptions | WebResourceLike): Promise<HttpOperationResponse> {
    if (options === null || options === undefined || typeof options !== "object") {
      throw new Error("options cannot be null or undefined and it must be of type object.");
    }

    let httpRequest: WebResourceLike;
    try {
      if (isWebResourceLike(options)) {
        options.validateRequestProperties();
        httpRequest = options;
      } else {
        httpRequest = new WebResource();
        httpRequest = httpRequest.prepare(options);
      }
    } catch (error) {
      return Promise.reject(error);
    }

    let httpPipeline: RequestPolicy = this._httpClient;
    if (this._requestPolicyFactories && this._requestPolicyFactories.length > 0) {
      for (let i = this._requestPolicyFactories.length - 1; i >= 0; --i) {
        httpPipeline = this._requestPolicyFactories[i].create(
          httpPipeline,
          this._requestPolicyOptions
        );
      }
    }
    return httpPipeline.sendRequest(httpRequest);
  }

  /**
   * Send an HTTP request that is populated using the provided OperationSpec.
   * @param {OperationArguments} operationArguments The arguments that the HTTP request's templated values will be populated from.
   * @param {OperationSpec} operationSpec The OperationSpec to use to populate the httpRequest.
   * @param {ServiceCallback} callback The callback to call when the response is received.
   */
  sendOperationRequest(
    operationArguments: OperationArguments,
    operationSpec: OperationSpec,
    callback?: ServiceCallback<any>
  ): Promise<RestResponse> {
    if (typeof operationArguments.options === "function") {
      callback = operationArguments.options;
      operationArguments.options = undefined;
    }

    const httpRequest = new WebResource();

    let result: Promise<RestResponse>;
    try {
      const baseUri: string | undefined = operationSpec.baseUrl || this.baseUri;
      if (!baseUri) {
        throw new Error(
          "If operationSpec.baseUrl is not specified, then the ServiceClient must have a baseUri string property that contains the base URL to use."
        );
      }

      httpRequest.method = operationSpec.httpMethod;
      httpRequest.operationSpec = operationSpec;

      const requestUrl: URLBuilder = URLBuilder.parse(baseUri);
      if (operationSpec.path) {
        requestUrl.appendPath(operationSpec.path);
      }
      if (operationSpec.urlParameters && operationSpec.urlParameters.length > 0) {
        for (const urlParameter of operationSpec.urlParameters) {
          let urlParameterValue: string = getOperationArgumentValueFromParameter(
            this,
            operationArguments,
            urlParameter,
            operationSpec.serializer
          );
          urlParameterValue = operationSpec.serializer.serialize(
            urlParameter.mapper,
            urlParameterValue,
            getPathStringFromParameter(urlParameter)
          );
          if (!urlParameter.skipEncoding) {
            urlParameterValue = encodeURIComponent(urlParameterValue);
          }
          requestUrl.replaceAll(
            `{${urlParameter.mapper.serializedName || getPathStringFromParameter(urlParameter)}}`,
            urlParameterValue
          );
        }
      }
      if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
        for (const queryParameter of operationSpec.queryParameters) {
          let queryParameterValue: any = getOperationArgumentValueFromParameter(
            this,
            operationArguments,
            queryParameter,
            operationSpec.serializer
          );
          if (queryParameterValue != undefined) {
            queryParameterValue = operationSpec.serializer.serialize(
              queryParameter.mapper,
              queryParameterValue,
              getPathStringFromParameter(queryParameter)
            );
            if (queryParameter.collectionFormat != undefined) {
              if (queryParameter.collectionFormat === QueryCollectionFormat.Multi) {
                if (queryParameterValue.length === 0) {
                  queryParameterValue = "";
                } else {
                  for (const index in queryParameterValue) {
                    const item = queryParameterValue[index];
                    queryParameterValue[index] = item == undefined ? "" : item.toString();
                  }
                }
              } else if (
                queryParameter.collectionFormat === QueryCollectionFormat.Ssv ||
                queryParameter.collectionFormat === QueryCollectionFormat.Tsv
              ) {
                queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
              }
            }
            if (!queryParameter.skipEncoding) {
              if (Array.isArray(queryParameterValue)) {
                for (const index in queryParameterValue) {
                  if (
                    queryParameterValue[index] !== undefined &&
                    queryParameterValue[index] !== null
                  ) {
                    queryParameterValue[index] = encodeURIComponent(queryParameterValue[index]);
                  }
                }
              } else {
                queryParameterValue = encodeURIComponent(queryParameterValue);
              }
            }
            if (
              queryParameter.collectionFormat != undefined &&
              queryParameter.collectionFormat !== QueryCollectionFormat.Multi &&
              queryParameter.collectionFormat !== QueryCollectionFormat.Ssv &&
              queryParameter.collectionFormat !== QueryCollectionFormat.Tsv
            ) {
              queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
            }
            requestUrl.setQueryParameter(
              queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter),
              queryParameterValue
            );
          }
        }
      }
      httpRequest.url = requestUrl.toString();

      const contentType = operationSpec.contentType || this.requestContentType;
      if (contentType) {
        httpRequest.headers.set("Content-Type", contentType);
      }

      if (operationSpec.headerParameters) {
        for (const headerParameter of operationSpec.headerParameters) {
          let headerValue: any = getOperationArgumentValueFromParameter(
            this,
            operationArguments,
            headerParameter,
            operationSpec.serializer
          );
          if (headerValue != undefined) {
            headerValue = operationSpec.serializer.serialize(
              headerParameter.mapper,
              headerValue,
              getPathStringFromParameter(headerParameter)
            );
            const headerCollectionPrefix = (headerParameter.mapper as DictionaryMapper)
              .headerCollectionPrefix;
            if (headerCollectionPrefix) {
              for (const key of Object.keys(headerValue)) {
                httpRequest.headers.set(headerCollectionPrefix + key, headerValue[key]);
              }
            } else {
              httpRequest.headers.set(
                headerParameter.mapper.serializedName ||
                  getPathStringFromParameter(headerParameter),
                headerValue
              );
            }
          }
        }
      }

      const options: RequestOptionsBase | undefined = operationArguments.options;
      if (options) {
        if (options.customHeaders) {
          for (const customHeaderName in options.customHeaders) {
            httpRequest.headers.set(customHeaderName, options.customHeaders[customHeaderName]);
          }
        }

        if (options.abortSignal) {
          httpRequest.abortSignal = options.abortSignal;
        }

        if (options.timeout) {
          httpRequest.timeout = options.timeout;
        }

        if (options.onUploadProgress) {
          httpRequest.onUploadProgress = options.onUploadProgress;
        }

        if (options.onDownloadProgress) {
          httpRequest.onDownloadProgress = options.onDownloadProgress;
        }
      }

      httpRequest.withCredentials = this._withCredentials;

      serializeRequestBody(this, httpRequest, operationArguments, operationSpec);

      if (httpRequest.streamResponseBody == undefined) {
        httpRequest.streamResponseBody = isStreamOperation(operationSpec);
      }

      result = this.sendRequest(httpRequest).then((res) =>
        flattenResponse(res, operationSpec.responses[res.status])
      );
    } catch (error) {
      result = Promise.reject(error);
    }

    const cb = callback;
    if (cb) {
      result
        // tslint:disable-next-line:no-null-keyword
        .then((res) => cb(null, res._response.parsedBody, res._response.request, res._response))
        .catch((err) => cb(err));
    }

    return result;
  }
}

export function serializeRequestBody(
  serviceClient: ServiceClient,
  httpRequest: WebResourceLike,
  operationArguments: OperationArguments,
  operationSpec: OperationSpec
): void {
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    httpRequest.body = getOperationArgumentValueFromParameter(
      serviceClient,
      operationArguments,
      operationSpec.requestBody,
      operationSpec.serializer
    );

    const bodyMapper = operationSpec.requestBody.mapper;
    const { required, xmlName, xmlElementName, serializedName } = bodyMapper;
    const typeName = bodyMapper.type.name;
    try {
      if (httpRequest.body != undefined || required) {
        const requestBodyParameterPathString: string = getPathStringFromParameter(
          operationSpec.requestBody
        );
        httpRequest.body = operationSpec.serializer.serialize(
          bodyMapper,
          httpRequest.body,
          requestBodyParameterPathString
        );
        const isStream = typeName === MapperType.Stream;
        if (operationSpec.isXML) {
          if (typeName === MapperType.Sequence) {
            httpRequest.body = stringifyXML(
              utils.prepareXMLRootList(
                httpRequest.body,
                xmlElementName || xmlName || serializedName!
              ),
              { rootName: xmlName || serializedName }
            );
          } else if (!isStream) {
            httpRequest.body = stringifyXML(httpRequest.body, {
              rootName: xmlName || serializedName,
            });
          }
        } else if (!isStream) {
          httpRequest.body = JSON.stringify(httpRequest.body);
        }
      }
    } catch (error) {
      throw new Error(
        `Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(
          serializedName,
          undefined,
          "  "
        )}.`
      );
    }
  } else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
    httpRequest.formData = {};
    for (const formDataParameter of operationSpec.formDataParameters) {
      const formDataParameterValue: any = getOperationArgumentValueFromParameter(
        serviceClient,
        operationArguments,
        formDataParameter,
        operationSpec.serializer
      );
      if (formDataParameterValue != undefined) {
        const formDataParameterPropertyName: string =
          formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
        httpRequest.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(
          formDataParameter.mapper,
          formDataParameterValue,
          getPathStringFromParameter(formDataParameter)
        );
      }
    }
  }
}

function isRequestPolicyFactory(instance: any): instance is RequestPolicyFactory {
  return typeof instance.create === "function";
}

function getValueOrFunctionResult(
  value: undefined | string | ((defaultValue: string) => string),
  defaultValueCreator: () => string
): string {
  let result: string;
  if (typeof value === "string") {
    result = value;
  } else {
    result = defaultValueCreator();
    if (typeof value === "function") {
      result = value(result);
    }
  }
  return result;
}

function createDefaultRequestPolicyFactories(
  credentials: ServiceClientCredentials | RequestPolicyFactory | undefined,
  options: ServiceClientOptions
): RequestPolicyFactory[] {
  const factories: RequestPolicyFactory[] = [];

  if (options.generateClientRequestIdHeader) {
    factories.push(generateClientRequestIdPolicy(options.clientRequestIdHeaderName));
  }

  if (credentials) {
    if (isRequestPolicyFactory(credentials)) {
      factories.push(credentials);
    } else {
      factories.push(signingPolicy(credentials));
    }
  }

  const userAgentHeaderName: string = getValueOrFunctionResult(
    options.userAgentHeaderName,
    getDefaultUserAgentHeaderName
  );
  const userAgentHeaderValue: string = getValueOrFunctionResult(
    options.userAgent,
    getDefaultUserAgentValue
  );
  if (userAgentHeaderName && userAgentHeaderValue) {
    factories.push(userAgentPolicy({ key: userAgentHeaderName, value: userAgentHeaderValue }));
  }

  const redirectOptions = {
    ...DefaultRedirectOptions,
    ...options.redirectOptions,
  };
  if (redirectOptions.handleRedirects) {
    factories.push(redirectPolicy(redirectOptions.maxRetries));
  }

  factories.push(rpRegistrationPolicy(options.rpRegistrationRetryTimeout));

  if (!options.noRetryPolicy) {
    factories.push(exponentialRetryPolicy());
    factories.push(systemErrorRetryPolicy());
    factories.push(throttlingRetryPolicy());
  }

  factories.push(deserializationPolicy(options.deserializationContentTypes));

  const proxySettings = options.proxySettings || getDefaultProxySettings();
  if (proxySettings) {
    factories.push(proxyPolicy(proxySettings));
  }

  if (options.agentSettings) {
    factories.push(agentPolicy(options.agentSettings));
  }

  return factories;
}

export type PropertyParent = { [propertyName: string]: any };

/**
 * Get the property parent for the property at the provided path when starting with the provided
 * parent object.
 */
export function getPropertyParent(parent: PropertyParent, propertyPath: string[]): PropertyParent {
  if (parent && propertyPath) {
    const propertyPathLength: number = propertyPath.length;
    for (let i = 0; i < propertyPathLength - 1; ++i) {
      const propertyName: string = propertyPath[i];
      if (!parent[propertyName]) {
        parent[propertyName] = {};
      }
      parent = parent[propertyName];
    }
  }
  return parent;
}

function getOperationArgumentValueFromParameter(
  serviceClient: ServiceClient,
  operationArguments: OperationArguments,
  parameter: OperationParameter,
  serializer: Serializer
): any {
  return getOperationArgumentValueFromParameterPath(
    serviceClient,
    operationArguments,
    parameter.parameterPath,
    parameter.mapper,
    serializer
  );
}

export function getOperationArgumentValueFromParameterPath(
  serviceClient: ServiceClient,
  operationArguments: OperationArguments,
  parameterPath: ParameterPath,
  parameterMapper: Mapper,
  serializer: Serializer
): any {
  let value: any;
  if (typeof parameterPath === "string") {
    parameterPath = [parameterPath];
  }
  if (Array.isArray(parameterPath)) {
    if (parameterPath.length > 0) {
      if (parameterMapper.isConstant) {
        value = parameterMapper.defaultValue;
      } else {
        let propertySearchResult: PropertySearchResult = getPropertyFromParameterPath(
          operationArguments,
          parameterPath
        );
        if (!propertySearchResult.propertyFound) {
          propertySearchResult = getPropertyFromParameterPath(serviceClient, parameterPath);
        }

        let useDefaultValue = false;
        if (!propertySearchResult.propertyFound) {
          useDefaultValue =
            parameterMapper.required ||
            (parameterPath[0] === "options" && parameterPath.length === 2);
        }
        value = useDefaultValue ? parameterMapper.defaultValue : propertySearchResult.propertyValue;
      }

      // Serialize just for validation purposes.
      const parameterPathString: string = getPathStringFromParameterPath(
        parameterPath,
        parameterMapper
      );
      serializer.serialize(parameterMapper, value, parameterPathString);
    }
  } else {
    if (parameterMapper.required) {
      value = {};
    }

    for (const propertyName in parameterPath) {
      const propertyMapper: Mapper = (parameterMapper as CompositeMapper).type.modelProperties![
        propertyName
      ];
      const propertyPath: ParameterPath = parameterPath[propertyName];
      const propertyValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        propertyPath,
        propertyMapper,
        serializer
      );
      // Serialize just for validation purposes.
      const propertyPathString: string = getPathStringFromParameterPath(
        propertyPath,
        propertyMapper
      );
      serializer.serialize(propertyMapper, propertyValue, propertyPathString);
      if (propertyValue !== undefined) {
        if (!value) {
          value = {};
        }
        value[propertyName] = propertyValue;
      }
    }
  }
  return value;
}

interface PropertySearchResult {
  propertyValue?: any;
  propertyFound: boolean;
}

function getPropertyFromParameterPath(
  parent: { [parameterName: string]: any },
  parameterPath: string[]
): PropertySearchResult {
  const result: PropertySearchResult = { propertyFound: false };
  let i = 0;
  for (; i < parameterPath.length; ++i) {
    const parameterPathPart: string = parameterPath[i];
    // Make sure to check inherited properties too, so don't use hasOwnProperty().
    if (parent != undefined && parameterPathPart in parent) {
      parent = parent[parameterPathPart];
    } else {
      break;
    }
  }
  if (i === parameterPath.length) {
    result.propertyValue = parent;
    result.propertyFound = true;
  }
  return result;
}

export function flattenResponse(
  _response: HttpOperationResponse,
  responseSpec: OperationResponse | undefined
): RestResponse {
  const parsedHeaders = _response.parsedHeaders;
  const bodyMapper = responseSpec && responseSpec.bodyMapper;

  const addOperationResponse = (obj: {}) =>
    Object.defineProperty(obj, "_response", {
      value: _response,
    });

  if (bodyMapper) {
    const typeName = bodyMapper.type.name;
    if (typeName === "Stream") {
      return addOperationResponse({
        ...parsedHeaders,
        blobBody: _response.blobBody,
        readableStreamBody: _response.readableStreamBody,
      });
    }

    const modelProperties =
      (typeName === "Composite" && (bodyMapper as CompositeMapper).type.modelProperties) || {};
    const isPageableResponse = Object.keys(modelProperties).some(
      (k) => modelProperties[k].serializedName === ""
    );
    if (typeName === "Sequence" || isPageableResponse) {
      // We're expecting a sequece(array) make sure that the response body is in the
      // correct format, if not make it an empty array []
      const parsedBody = Array.isArray(_response.parsedBody) ? _response.parsedBody : [];
      const arrayResponse = [...parsedBody] as RestResponse & any[];

      for (const key of Object.keys(modelProperties)) {
        if (modelProperties[key].serializedName) {
          arrayResponse[key] = _response.parsedBody[key];
        }
      }

      if (parsedHeaders) {
        for (const key of Object.keys(parsedHeaders)) {
          arrayResponse[key] = parsedHeaders[key];
        }
      }
      addOperationResponse(arrayResponse);
      return arrayResponse;
    }

    if (typeName === "Composite" || typeName === "Dictionary") {
      return addOperationResponse({
        ...parsedHeaders,
        ..._response.parsedBody,
      });
    }
  }

  if (
    bodyMapper ||
    _response.request.method === "HEAD" ||
    utils.isPrimitiveType(_response.parsedBody)
  ) {
    // primitive body types and HEAD booleans
    return addOperationResponse({
      ...parsedHeaders,
      body: _response.parsedBody,
    });
  }

  return addOperationResponse({
    ...parsedHeaders,
    ..._response.parsedBody,
  });
}
