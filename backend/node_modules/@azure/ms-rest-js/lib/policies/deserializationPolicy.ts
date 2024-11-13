// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { OperationResponse } from "../operationResponse";
import { OperationSpec, isStreamOperation } from "../operationSpec";
import { RestError } from "../restError";
import { Mapper, MapperType } from "../serializer";
import * as utils from "../util/utils";
import { parseXML } from "../util/xml";
import { WebResourceLike } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
} from "./requestPolicy";

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
export function deserializationPolicy(
  deserializationContentTypes?: DeserializationContentTypes
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new DeserializationPolicy(nextPolicy, deserializationContentTypes, options);
    },
  };
}

export const defaultJsonContentTypes = ["application/json", "text/json"];
export const defaultXmlContentTypes = ["application/xml", "application/atom+xml"];

/**
 * A RequestPolicy that will deserialize HTTP response bodies and headers as they pass through the
 * HTTP pipeline.
 */
export class DeserializationPolicy extends BaseRequestPolicy {
  public readonly jsonContentTypes: string[];
  public readonly xmlContentTypes: string[];

  constructor(
    nextPolicy: RequestPolicy,
    deserializationContentTypes: DeserializationContentTypes | undefined,
    options: RequestPolicyOptionsLike
  ) {
    super(nextPolicy, options);

    this.jsonContentTypes =
      (deserializationContentTypes && deserializationContentTypes.json) || defaultJsonContentTypes;
    this.xmlContentTypes =
      (deserializationContentTypes && deserializationContentTypes.xml) || defaultXmlContentTypes;
  }

  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy
      .sendRequest(request)
      .then((response: HttpOperationResponse) =>
        deserializeResponseBody(this.jsonContentTypes, this.xmlContentTypes, response)
      );
  }
}

function getOperationResponse(
  parsedResponse: HttpOperationResponse
): undefined | OperationResponse {
  let result: OperationResponse | undefined;
  const request: WebResourceLike = parsedResponse.request;
  const operationSpec: OperationSpec | undefined = request.operationSpec;
  if (operationSpec) {
    const operationResponseGetter:
      | undefined
      | ((
          operationSpec: OperationSpec,
          response: HttpOperationResponse
        ) => undefined | OperationResponse) = request.operationResponseGetter;
    if (!operationResponseGetter) {
      result = operationSpec.responses[parsedResponse.status];
    } else {
      result = operationResponseGetter(operationSpec, parsedResponse);
    }
  }
  return result;
}

function shouldDeserializeResponse(parsedResponse: HttpOperationResponse): boolean {
  const shouldDeserialize: undefined | boolean | ((response: HttpOperationResponse) => boolean) =
    parsedResponse.request.shouldDeserialize;
  let result: boolean;
  if (shouldDeserialize === undefined) {
    result = true;
  } else if (typeof shouldDeserialize === "boolean") {
    result = shouldDeserialize;
  } else {
    result = shouldDeserialize(parsedResponse);
  }
  return result;
}

export function deserializeResponseBody(
  jsonContentTypes: string[],
  xmlContentTypes: string[],
  response: HttpOperationResponse
): Promise<HttpOperationResponse> {
  return parse(jsonContentTypes, xmlContentTypes, response).then((parsedResponse) => {
    const shouldDeserialize: boolean = shouldDeserializeResponse(parsedResponse);
    if (shouldDeserialize) {
      const operationSpec: OperationSpec | undefined = parsedResponse.request.operationSpec;
      if (operationSpec && operationSpec.responses) {
        const statusCode: number = parsedResponse.status;

        const expectedStatusCodes: string[] = Object.keys(operationSpec.responses);

        const hasNoExpectedStatusCodes: boolean =
          expectedStatusCodes.length === 0 ||
          (expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default");

        const responseSpec: OperationResponse | undefined = getOperationResponse(parsedResponse);

        const isExpectedStatusCode: boolean = hasNoExpectedStatusCodes
          ? 200 <= statusCode && statusCode < 300
          : !!responseSpec;
        if (!isExpectedStatusCode) {
          const defaultResponseSpec: OperationResponse = operationSpec.responses.default;
          if (defaultResponseSpec) {
            const initialErrorMessage: string = isStreamOperation(operationSpec)
              ? `Unexpected status code: ${statusCode}`
              : (parsedResponse.bodyAsText as string);

            const error = new RestError(initialErrorMessage);
            error.statusCode = statusCode;
            error.request = utils.stripRequest(parsedResponse.request);
            error.response = utils.stripResponse(parsedResponse);

            let parsedErrorResponse: { [key: string]: any } = parsedResponse.parsedBody;
            try {
              if (parsedErrorResponse) {
                const defaultResponseBodyMapper: Mapper | undefined =
                  defaultResponseSpec.bodyMapper;
                if (
                  defaultResponseBodyMapper &&
                  defaultResponseBodyMapper.serializedName === "CloudError"
                ) {
                  if (parsedErrorResponse.error) {
                    parsedErrorResponse = parsedErrorResponse.error;
                  }
                  if (parsedErrorResponse.code) {
                    error.code = parsedErrorResponse.code;
                  }
                  if (parsedErrorResponse.message) {
                    error.message = parsedErrorResponse.message;
                  }
                } else {
                  let internalError: any = parsedErrorResponse;
                  if (parsedErrorResponse.error) {
                    internalError = parsedErrorResponse.error;
                  }

                  error.code = internalError.code;
                  if (internalError.message) {
                    error.message = internalError.message;
                  }
                }

                if (defaultResponseBodyMapper) {
                  let valueToDeserialize: any = parsedErrorResponse;
                  if (
                    operationSpec.isXML &&
                    defaultResponseBodyMapper.type.name === MapperType.Sequence
                  ) {
                    valueToDeserialize =
                      typeof parsedErrorResponse === "object"
                        ? parsedErrorResponse[defaultResponseBodyMapper.xmlElementName!]
                        : [];
                  }
                  error.body = operationSpec.serializer.deserialize(
                    defaultResponseBodyMapper,
                    valueToDeserialize,
                    "error.body"
                  );
                }
              }
            } catch (defaultError) {
              error.message = `Error \"${defaultError.message}\" occurred in deserializing the responseBody - \"${parsedResponse.bodyAsText}\" for the default response.`;
            }
            return Promise.reject(error);
          }
        } else if (responseSpec) {
          if (responseSpec.bodyMapper) {
            let valueToDeserialize: any = parsedResponse.parsedBody;
            if (operationSpec.isXML && responseSpec.bodyMapper.type.name === MapperType.Sequence) {
              valueToDeserialize =
                typeof valueToDeserialize === "object"
                  ? valueToDeserialize[responseSpec.bodyMapper.xmlElementName!]
                  : [];
            }
            try {
              parsedResponse.parsedBody = operationSpec.serializer.deserialize(
                responseSpec.bodyMapper,
                valueToDeserialize,
                "operationRes.parsedBody"
              );
            } catch (error) {
              const restError = new RestError(
                `Error ${error} occurred in deserializing the responseBody - ${parsedResponse.bodyAsText}`
              );
              restError.request = utils.stripRequest(parsedResponse.request);
              restError.response = utils.stripResponse(parsedResponse);
              return Promise.reject(restError);
            }
          } else if (operationSpec.httpMethod === "HEAD") {
            // head methods never have a body, but we return a boolean to indicate presence/absence of the resource
            parsedResponse.parsedBody = response.status >= 200 && response.status < 300;
          }

          if (responseSpec.headersMapper) {
            parsedResponse.parsedHeaders = operationSpec.serializer.deserialize(
              responseSpec.headersMapper,
              parsedResponse.headers.rawHeaders(),
              "operationRes.parsedHeaders"
            );
          }
        }
      }
    }
    return Promise.resolve(parsedResponse);
  });
}

function parse(
  jsonContentTypes: string[],
  xmlContentTypes: string[],
  operationResponse: HttpOperationResponse
): Promise<HttpOperationResponse> {
  const errorHandler = (err: Error & { code: string }) => {
    const msg = `Error "${err}" occurred while parsing the response body - ${operationResponse.bodyAsText}.`;
    const errCode = err.code || RestError.PARSE_ERROR;
    const e = new RestError(
      msg,
      errCode,
      operationResponse.status,
      operationResponse.request,
      operationResponse,
      operationResponse.bodyAsText
    );
    return Promise.reject(e);
  };

  if (!operationResponse.request.streamResponseBody && operationResponse.bodyAsText) {
    const text = operationResponse.bodyAsText;
    const contentType: string = operationResponse.headers.get("Content-Type") || "";
    const contentComponents: string[] = !contentType
      ? []
      : contentType.split(";").map((component) => component.toLowerCase());
    if (
      contentComponents.length === 0 ||
      contentComponents.some((component) => jsonContentTypes.indexOf(component) !== -1)
    ) {
      return new Promise<HttpOperationResponse>((resolve) => {
        operationResponse.parsedBody = JSON.parse(text);
        resolve(operationResponse);
      }).catch(errorHandler);
    } else if (contentComponents.some((component) => xmlContentTypes.indexOf(component) !== -1)) {
      return parseXML(text)
        .then((body) => {
          operationResponse.parsedBody = body;
          return operationResponse;
        })
        .catch(errorHandler);
    }
  }

  return Promise.resolve(operationResponse);
}
