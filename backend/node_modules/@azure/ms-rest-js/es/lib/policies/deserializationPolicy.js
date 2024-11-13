// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __awaiter, __extends, __generator } from "tslib";
import { isStreamOperation } from "../operationSpec";
import { RestError } from "../restError";
import { MapperType } from "../serializer";
import * as utils from "../util/utils";
import { parseXML } from "../util/xml";
import { BaseRequestPolicy, } from "./requestPolicy";
/**
 * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
 * pass through the HTTP pipeline.
 */
export function deserializationPolicy(deserializationContentTypes) {
    return {
        create: function (nextPolicy, options) {
            return new DeserializationPolicy(nextPolicy, deserializationContentTypes, options);
        },
    };
}
export var defaultJsonContentTypes = ["application/json", "text/json"];
export var defaultXmlContentTypes = ["application/xml", "application/atom+xml"];
/**
 * A RequestPolicy that will deserialize HTTP response bodies and headers as they pass through the
 * HTTP pipeline.
 */
var DeserializationPolicy = /** @class */ (function (_super) {
    __extends(DeserializationPolicy, _super);
    function DeserializationPolicy(nextPolicy, deserializationContentTypes, options) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.jsonContentTypes =
            (deserializationContentTypes && deserializationContentTypes.json) || defaultJsonContentTypes;
        _this.xmlContentTypes =
            (deserializationContentTypes && deserializationContentTypes.xml) || defaultXmlContentTypes;
        return _this;
    }
    DeserializationPolicy.prototype.sendRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this._nextPolicy
                        .sendRequest(request)
                        .then(function (response) {
                        return deserializeResponseBody(_this.jsonContentTypes, _this.xmlContentTypes, response);
                    })];
            });
        });
    };
    return DeserializationPolicy;
}(BaseRequestPolicy));
export { DeserializationPolicy };
function getOperationResponse(parsedResponse) {
    var result;
    var request = parsedResponse.request;
    var operationSpec = request.operationSpec;
    if (operationSpec) {
        var operationResponseGetter = request.operationResponseGetter;
        if (!operationResponseGetter) {
            result = operationSpec.responses[parsedResponse.status];
        }
        else {
            result = operationResponseGetter(operationSpec, parsedResponse);
        }
    }
    return result;
}
function shouldDeserializeResponse(parsedResponse) {
    var shouldDeserialize = parsedResponse.request.shouldDeserialize;
    var result;
    if (shouldDeserialize === undefined) {
        result = true;
    }
    else if (typeof shouldDeserialize === "boolean") {
        result = shouldDeserialize;
    }
    else {
        result = shouldDeserialize(parsedResponse);
    }
    return result;
}
export function deserializeResponseBody(jsonContentTypes, xmlContentTypes, response) {
    return parse(jsonContentTypes, xmlContentTypes, response).then(function (parsedResponse) {
        var shouldDeserialize = shouldDeserializeResponse(parsedResponse);
        if (shouldDeserialize) {
            var operationSpec = parsedResponse.request.operationSpec;
            if (operationSpec && operationSpec.responses) {
                var statusCode = parsedResponse.status;
                var expectedStatusCodes = Object.keys(operationSpec.responses);
                var hasNoExpectedStatusCodes = expectedStatusCodes.length === 0 ||
                    (expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default");
                var responseSpec = getOperationResponse(parsedResponse);
                var isExpectedStatusCode = hasNoExpectedStatusCodes
                    ? 200 <= statusCode && statusCode < 300
                    : !!responseSpec;
                if (!isExpectedStatusCode) {
                    var defaultResponseSpec = operationSpec.responses.default;
                    if (defaultResponseSpec) {
                        var initialErrorMessage = isStreamOperation(operationSpec)
                            ? "Unexpected status code: " + statusCode
                            : parsedResponse.bodyAsText;
                        var error = new RestError(initialErrorMessage);
                        error.statusCode = statusCode;
                        error.request = utils.stripRequest(parsedResponse.request);
                        error.response = utils.stripResponse(parsedResponse);
                        var parsedErrorResponse = parsedResponse.parsedBody;
                        try {
                            if (parsedErrorResponse) {
                                var defaultResponseBodyMapper = defaultResponseSpec.bodyMapper;
                                if (defaultResponseBodyMapper &&
                                    defaultResponseBodyMapper.serializedName === "CloudError") {
                                    if (parsedErrorResponse.error) {
                                        parsedErrorResponse = parsedErrorResponse.error;
                                    }
                                    if (parsedErrorResponse.code) {
                                        error.code = parsedErrorResponse.code;
                                    }
                                    if (parsedErrorResponse.message) {
                                        error.message = parsedErrorResponse.message;
                                    }
                                }
                                else {
                                    var internalError = parsedErrorResponse;
                                    if (parsedErrorResponse.error) {
                                        internalError = parsedErrorResponse.error;
                                    }
                                    error.code = internalError.code;
                                    if (internalError.message) {
                                        error.message = internalError.message;
                                    }
                                }
                                if (defaultResponseBodyMapper) {
                                    var valueToDeserialize = parsedErrorResponse;
                                    if (operationSpec.isXML &&
                                        defaultResponseBodyMapper.type.name === MapperType.Sequence) {
                                        valueToDeserialize =
                                            typeof parsedErrorResponse === "object"
                                                ? parsedErrorResponse[defaultResponseBodyMapper.xmlElementName]
                                                : [];
                                    }
                                    error.body = operationSpec.serializer.deserialize(defaultResponseBodyMapper, valueToDeserialize, "error.body");
                                }
                            }
                        }
                        catch (defaultError) {
                            error.message = "Error \"" + defaultError.message + "\" occurred in deserializing the responseBody - \"" + parsedResponse.bodyAsText + "\" for the default response.";
                        }
                        return Promise.reject(error);
                    }
                }
                else if (responseSpec) {
                    if (responseSpec.bodyMapper) {
                        var valueToDeserialize = parsedResponse.parsedBody;
                        if (operationSpec.isXML && responseSpec.bodyMapper.type.name === MapperType.Sequence) {
                            valueToDeserialize =
                                typeof valueToDeserialize === "object"
                                    ? valueToDeserialize[responseSpec.bodyMapper.xmlElementName]
                                    : [];
                        }
                        try {
                            parsedResponse.parsedBody = operationSpec.serializer.deserialize(responseSpec.bodyMapper, valueToDeserialize, "operationRes.parsedBody");
                        }
                        catch (error) {
                            var restError = new RestError("Error " + error + " occurred in deserializing the responseBody - " + parsedResponse.bodyAsText);
                            restError.request = utils.stripRequest(parsedResponse.request);
                            restError.response = utils.stripResponse(parsedResponse);
                            return Promise.reject(restError);
                        }
                    }
                    else if (operationSpec.httpMethod === "HEAD") {
                        // head methods never have a body, but we return a boolean to indicate presence/absence of the resource
                        parsedResponse.parsedBody = response.status >= 200 && response.status < 300;
                    }
                    if (responseSpec.headersMapper) {
                        parsedResponse.parsedHeaders = operationSpec.serializer.deserialize(responseSpec.headersMapper, parsedResponse.headers.rawHeaders(), "operationRes.parsedHeaders");
                    }
                }
            }
        }
        return Promise.resolve(parsedResponse);
    });
}
function parse(jsonContentTypes, xmlContentTypes, operationResponse) {
    var errorHandler = function (err) {
        var msg = "Error \"" + err + "\" occurred while parsing the response body - " + operationResponse.bodyAsText + ".";
        var errCode = err.code || RestError.PARSE_ERROR;
        var e = new RestError(msg, errCode, operationResponse.status, operationResponse.request, operationResponse, operationResponse.bodyAsText);
        return Promise.reject(e);
    };
    if (!operationResponse.request.streamResponseBody && operationResponse.bodyAsText) {
        var text_1 = operationResponse.bodyAsText;
        var contentType = operationResponse.headers.get("Content-Type") || "";
        var contentComponents = !contentType
            ? []
            : contentType.split(";").map(function (component) { return component.toLowerCase(); });
        if (contentComponents.length === 0 ||
            contentComponents.some(function (component) { return jsonContentTypes.indexOf(component) !== -1; })) {
            return new Promise(function (resolve) {
                operationResponse.parsedBody = JSON.parse(text_1);
                resolve(operationResponse);
            }).catch(errorHandler);
        }
        else if (contentComponents.some(function (component) { return xmlContentTypes.indexOf(component) !== -1; })) {
            return parseXML(text_1)
                .then(function (body) {
                operationResponse.parsedBody = body;
                return operationResponse;
            })
                .catch(errorHandler);
        }
    }
    return Promise.resolve(operationResponse);
}
//# sourceMappingURL=deserializationPolicy.js.map