// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __assign, __spreadArrays } from "tslib";
import { isTokenCredential } from "@azure/core-auth";
import { DefaultHttpClient } from "./defaultHttpClient";
import { getPathStringFromParameter, getPathStringFromParameterPath, } from "./operationParameter";
import { isStreamOperation } from "./operationSpec";
import { deserializationPolicy, } from "./policies/deserializationPolicy";
import { exponentialRetryPolicy } from "./policies/exponentialRetryPolicy";
import { generateClientRequestIdPolicy } from "./policies/generateClientRequestIdPolicy";
import { userAgentPolicy, getDefaultUserAgentHeaderName, getDefaultUserAgentValue, } from "./policies/userAgentPolicy";
import { DefaultRedirectOptions, redirectPolicy } from "./policies/redirectPolicy";
import { RequestPolicyOptions, } from "./policies/requestPolicy";
import { rpRegistrationPolicy } from "./policies/rpRegistrationPolicy";
import { signingPolicy } from "./policies/signingPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { QueryCollectionFormat } from "./queryCollectionFormat";
import { MapperType } from "./serializer";
import { URLBuilder } from "./url";
import * as utils from "./util/utils";
import { stringifyXML } from "./util/xml";
import { isWebResourceLike, WebResource, } from "./webResource";
import { agentPolicy } from "./policies/agentPolicy";
import { proxyPolicy, getDefaultProxySettings } from "./policies/proxyPolicy";
import { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
import { AzureIdentityCredentialAdapter, azureResourceManagerEndpoints, } from "./credentials/azureIdentityTokenCredentialAdapter";
/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
var ServiceClient = /** @class */ (function () {
    /**
     * The ServiceClient constructor
     * @constructor
     * @param {ServiceClientCredentials} [credentials] The credentials object used for authentication.
     * @param {ServiceClientOptions} [options] The service client options that govern the behavior of the client.
     */
    function ServiceClient(credentials, options) {
        if (!options) {
            options = {};
        }
        if (options.baseUri) {
            this.baseUri = options.baseUri;
        }
        var serviceClientCredentials;
        if (isTokenCredential(credentials)) {
            var scope = undefined;
            if ((options === null || options === void 0 ? void 0 : options.baseUri) && azureResourceManagerEndpoints.includes(options === null || options === void 0 ? void 0 : options.baseUri)) {
                scope = options.baseUri + "/.default";
            }
            serviceClientCredentials = new AzureIdentityCredentialAdapter(credentials, scope);
        }
        else {
            serviceClientCredentials = credentials;
        }
        if (serviceClientCredentials && !serviceClientCredentials.signRequest) {
            throw new Error("credentials argument needs to implement signRequest method");
        }
        this._withCredentials = options.withCredentials || false;
        this._httpClient = options.httpClient || new DefaultHttpClient();
        this._requestPolicyOptions = new RequestPolicyOptions(options.httpPipelineLogger);
        var requestPolicyFactories;
        if (Array.isArray(options.requestPolicyFactories)) {
            requestPolicyFactories = options.requestPolicyFactories;
        }
        else {
            requestPolicyFactories = createDefaultRequestPolicyFactories(serviceClientCredentials, options);
            if (options.requestPolicyFactories) {
                var newRequestPolicyFactories = options.requestPolicyFactories(requestPolicyFactories);
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
    ServiceClient.prototype.sendRequest = function (options) {
        if (options === null || options === undefined || typeof options !== "object") {
            throw new Error("options cannot be null or undefined and it must be of type object.");
        }
        var httpRequest;
        try {
            if (isWebResourceLike(options)) {
                options.validateRequestProperties();
                httpRequest = options;
            }
            else {
                httpRequest = new WebResource();
                httpRequest = httpRequest.prepare(options);
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
        var httpPipeline = this._httpClient;
        if (this._requestPolicyFactories && this._requestPolicyFactories.length > 0) {
            for (var i = this._requestPolicyFactories.length - 1; i >= 0; --i) {
                httpPipeline = this._requestPolicyFactories[i].create(httpPipeline, this._requestPolicyOptions);
            }
        }
        return httpPipeline.sendRequest(httpRequest);
    };
    /**
     * Send an HTTP request that is populated using the provided OperationSpec.
     * @param {OperationArguments} operationArguments The arguments that the HTTP request's templated values will be populated from.
     * @param {OperationSpec} operationSpec The OperationSpec to use to populate the httpRequest.
     * @param {ServiceCallback} callback The callback to call when the response is received.
     */
    ServiceClient.prototype.sendOperationRequest = function (operationArguments, operationSpec, callback) {
        if (typeof operationArguments.options === "function") {
            callback = operationArguments.options;
            operationArguments.options = undefined;
        }
        var httpRequest = new WebResource();
        var result;
        try {
            var baseUri = operationSpec.baseUrl || this.baseUri;
            if (!baseUri) {
                throw new Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a baseUri string property that contains the base URL to use.");
            }
            httpRequest.method = operationSpec.httpMethod;
            httpRequest.operationSpec = operationSpec;
            var requestUrl = URLBuilder.parse(baseUri);
            if (operationSpec.path) {
                requestUrl.appendPath(operationSpec.path);
            }
            if (operationSpec.urlParameters && operationSpec.urlParameters.length > 0) {
                for (var _i = 0, _a = operationSpec.urlParameters; _i < _a.length; _i++) {
                    var urlParameter = _a[_i];
                    var urlParameterValue = getOperationArgumentValueFromParameter(this, operationArguments, urlParameter, operationSpec.serializer);
                    urlParameterValue = operationSpec.serializer.serialize(urlParameter.mapper, urlParameterValue, getPathStringFromParameter(urlParameter));
                    if (!urlParameter.skipEncoding) {
                        urlParameterValue = encodeURIComponent(urlParameterValue);
                    }
                    requestUrl.replaceAll("{" + (urlParameter.mapper.serializedName || getPathStringFromParameter(urlParameter)) + "}", urlParameterValue);
                }
            }
            if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
                for (var _b = 0, _c = operationSpec.queryParameters; _b < _c.length; _b++) {
                    var queryParameter = _c[_b];
                    var queryParameterValue = getOperationArgumentValueFromParameter(this, operationArguments, queryParameter, operationSpec.serializer);
                    if (queryParameterValue != undefined) {
                        queryParameterValue = operationSpec.serializer.serialize(queryParameter.mapper, queryParameterValue, getPathStringFromParameter(queryParameter));
                        if (queryParameter.collectionFormat != undefined) {
                            if (queryParameter.collectionFormat === QueryCollectionFormat.Multi) {
                                if (queryParameterValue.length === 0) {
                                    queryParameterValue = "";
                                }
                                else {
                                    for (var index in queryParameterValue) {
                                        var item = queryParameterValue[index];
                                        queryParameterValue[index] = item == undefined ? "" : item.toString();
                                    }
                                }
                            }
                            else if (queryParameter.collectionFormat === QueryCollectionFormat.Ssv ||
                                queryParameter.collectionFormat === QueryCollectionFormat.Tsv) {
                                queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
                            }
                        }
                        if (!queryParameter.skipEncoding) {
                            if (Array.isArray(queryParameterValue)) {
                                for (var index in queryParameterValue) {
                                    if (queryParameterValue[index] !== undefined &&
                                        queryParameterValue[index] !== null) {
                                        queryParameterValue[index] = encodeURIComponent(queryParameterValue[index]);
                                    }
                                }
                            }
                            else {
                                queryParameterValue = encodeURIComponent(queryParameterValue);
                            }
                        }
                        if (queryParameter.collectionFormat != undefined &&
                            queryParameter.collectionFormat !== QueryCollectionFormat.Multi &&
                            queryParameter.collectionFormat !== QueryCollectionFormat.Ssv &&
                            queryParameter.collectionFormat !== QueryCollectionFormat.Tsv) {
                            queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
                        }
                        requestUrl.setQueryParameter(queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter), queryParameterValue);
                    }
                }
            }
            httpRequest.url = requestUrl.toString();
            var contentType = operationSpec.contentType || this.requestContentType;
            if (contentType) {
                httpRequest.headers.set("Content-Type", contentType);
            }
            if (operationSpec.headerParameters) {
                for (var _d = 0, _e = operationSpec.headerParameters; _d < _e.length; _d++) {
                    var headerParameter = _e[_d];
                    var headerValue = getOperationArgumentValueFromParameter(this, operationArguments, headerParameter, operationSpec.serializer);
                    if (headerValue != undefined) {
                        headerValue = operationSpec.serializer.serialize(headerParameter.mapper, headerValue, getPathStringFromParameter(headerParameter));
                        var headerCollectionPrefix = headerParameter.mapper
                            .headerCollectionPrefix;
                        if (headerCollectionPrefix) {
                            for (var _f = 0, _g = Object.keys(headerValue); _f < _g.length; _f++) {
                                var key = _g[_f];
                                httpRequest.headers.set(headerCollectionPrefix + key, headerValue[key]);
                            }
                        }
                        else {
                            httpRequest.headers.set(headerParameter.mapper.serializedName ||
                                getPathStringFromParameter(headerParameter), headerValue);
                        }
                    }
                }
            }
            var options = operationArguments.options;
            if (options) {
                if (options.customHeaders) {
                    for (var customHeaderName in options.customHeaders) {
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
            result = this.sendRequest(httpRequest).then(function (res) {
                return flattenResponse(res, operationSpec.responses[res.status]);
            });
        }
        catch (error) {
            result = Promise.reject(error);
        }
        var cb = callback;
        if (cb) {
            result
                // tslint:disable-next-line:no-null-keyword
                .then(function (res) { return cb(null, res._response.parsedBody, res._response.request, res._response); })
                .catch(function (err) { return cb(err); });
        }
        return result;
    };
    return ServiceClient;
}());
export { ServiceClient };
export function serializeRequestBody(serviceClient, httpRequest, operationArguments, operationSpec) {
    if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
        httpRequest.body = getOperationArgumentValueFromParameter(serviceClient, operationArguments, operationSpec.requestBody, operationSpec.serializer);
        var bodyMapper = operationSpec.requestBody.mapper;
        var required = bodyMapper.required, xmlName = bodyMapper.xmlName, xmlElementName = bodyMapper.xmlElementName, serializedName = bodyMapper.serializedName;
        var typeName = bodyMapper.type.name;
        try {
            if (httpRequest.body != undefined || required) {
                var requestBodyParameterPathString = getPathStringFromParameter(operationSpec.requestBody);
                httpRequest.body = operationSpec.serializer.serialize(bodyMapper, httpRequest.body, requestBodyParameterPathString);
                var isStream = typeName === MapperType.Stream;
                if (operationSpec.isXML) {
                    if (typeName === MapperType.Sequence) {
                        httpRequest.body = stringifyXML(utils.prepareXMLRootList(httpRequest.body, xmlElementName || xmlName || serializedName), { rootName: xmlName || serializedName });
                    }
                    else if (!isStream) {
                        httpRequest.body = stringifyXML(httpRequest.body, {
                            rootName: xmlName || serializedName,
                        });
                    }
                }
                else if (!isStream) {
                    httpRequest.body = JSON.stringify(httpRequest.body);
                }
            }
        }
        catch (error) {
            throw new Error("Error \"" + error.message + "\" occurred in serializing the payload - " + JSON.stringify(serializedName, undefined, "  ") + ".");
        }
    }
    else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
        httpRequest.formData = {};
        for (var _i = 0, _a = operationSpec.formDataParameters; _i < _a.length; _i++) {
            var formDataParameter = _a[_i];
            var formDataParameterValue = getOperationArgumentValueFromParameter(serviceClient, operationArguments, formDataParameter, operationSpec.serializer);
            if (formDataParameterValue != undefined) {
                var formDataParameterPropertyName = formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
                httpRequest.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(formDataParameter.mapper, formDataParameterValue, getPathStringFromParameter(formDataParameter));
            }
        }
    }
}
function isRequestPolicyFactory(instance) {
    return typeof instance.create === "function";
}
function getValueOrFunctionResult(value, defaultValueCreator) {
    var result;
    if (typeof value === "string") {
        result = value;
    }
    else {
        result = defaultValueCreator();
        if (typeof value === "function") {
            result = value(result);
        }
    }
    return result;
}
function createDefaultRequestPolicyFactories(credentials, options) {
    var factories = [];
    if (options.generateClientRequestIdHeader) {
        factories.push(generateClientRequestIdPolicy(options.clientRequestIdHeaderName));
    }
    if (credentials) {
        if (isRequestPolicyFactory(credentials)) {
            factories.push(credentials);
        }
        else {
            factories.push(signingPolicy(credentials));
        }
    }
    var userAgentHeaderName = getValueOrFunctionResult(options.userAgentHeaderName, getDefaultUserAgentHeaderName);
    var userAgentHeaderValue = getValueOrFunctionResult(options.userAgent, getDefaultUserAgentValue);
    if (userAgentHeaderName && userAgentHeaderValue) {
        factories.push(userAgentPolicy({ key: userAgentHeaderName, value: userAgentHeaderValue }));
    }
    var redirectOptions = __assign(__assign({}, DefaultRedirectOptions), options.redirectOptions);
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
    var proxySettings = options.proxySettings || getDefaultProxySettings();
    if (proxySettings) {
        factories.push(proxyPolicy(proxySettings));
    }
    if (options.agentSettings) {
        factories.push(agentPolicy(options.agentSettings));
    }
    return factories;
}
/**
 * Get the property parent for the property at the provided path when starting with the provided
 * parent object.
 */
export function getPropertyParent(parent, propertyPath) {
    if (parent && propertyPath) {
        var propertyPathLength = propertyPath.length;
        for (var i = 0; i < propertyPathLength - 1; ++i) {
            var propertyName = propertyPath[i];
            if (!parent[propertyName]) {
                parent[propertyName] = {};
            }
            parent = parent[propertyName];
        }
    }
    return parent;
}
function getOperationArgumentValueFromParameter(serviceClient, operationArguments, parameter, serializer) {
    return getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameter.parameterPath, parameter.mapper, serializer);
}
export function getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, serializer) {
    var value;
    if (typeof parameterPath === "string") {
        parameterPath = [parameterPath];
    }
    if (Array.isArray(parameterPath)) {
        if (parameterPath.length > 0) {
            if (parameterMapper.isConstant) {
                value = parameterMapper.defaultValue;
            }
            else {
                var propertySearchResult = getPropertyFromParameterPath(operationArguments, parameterPath);
                if (!propertySearchResult.propertyFound) {
                    propertySearchResult = getPropertyFromParameterPath(serviceClient, parameterPath);
                }
                var useDefaultValue = false;
                if (!propertySearchResult.propertyFound) {
                    useDefaultValue =
                        parameterMapper.required ||
                            (parameterPath[0] === "options" && parameterPath.length === 2);
                }
                value = useDefaultValue ? parameterMapper.defaultValue : propertySearchResult.propertyValue;
            }
            // Serialize just for validation purposes.
            var parameterPathString = getPathStringFromParameterPath(parameterPath, parameterMapper);
            serializer.serialize(parameterMapper, value, parameterPathString);
        }
    }
    else {
        if (parameterMapper.required) {
            value = {};
        }
        for (var propertyName in parameterPath) {
            var propertyMapper = parameterMapper.type.modelProperties[propertyName];
            var propertyPath = parameterPath[propertyName];
            var propertyValue = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, propertyPath, propertyMapper, serializer);
            // Serialize just for validation purposes.
            var propertyPathString = getPathStringFromParameterPath(propertyPath, propertyMapper);
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
function getPropertyFromParameterPath(parent, parameterPath) {
    var result = { propertyFound: false };
    var i = 0;
    for (; i < parameterPath.length; ++i) {
        var parameterPathPart = parameterPath[i];
        // Make sure to check inherited properties too, so don't use hasOwnProperty().
        if (parent != undefined && parameterPathPart in parent) {
            parent = parent[parameterPathPart];
        }
        else {
            break;
        }
    }
    if (i === parameterPath.length) {
        result.propertyValue = parent;
        result.propertyFound = true;
    }
    return result;
}
export function flattenResponse(_response, responseSpec) {
    var parsedHeaders = _response.parsedHeaders;
    var bodyMapper = responseSpec && responseSpec.bodyMapper;
    var addOperationResponse = function (obj) {
        return Object.defineProperty(obj, "_response", {
            value: _response,
        });
    };
    if (bodyMapper) {
        var typeName = bodyMapper.type.name;
        if (typeName === "Stream") {
            return addOperationResponse(__assign(__assign({}, parsedHeaders), { blobBody: _response.blobBody, readableStreamBody: _response.readableStreamBody }));
        }
        var modelProperties_1 = (typeName === "Composite" && bodyMapper.type.modelProperties) || {};
        var isPageableResponse = Object.keys(modelProperties_1).some(function (k) { return modelProperties_1[k].serializedName === ""; });
        if (typeName === "Sequence" || isPageableResponse) {
            // We're expecting a sequece(array) make sure that the response body is in the
            // correct format, if not make it an empty array []
            var parsedBody = Array.isArray(_response.parsedBody) ? _response.parsedBody : [];
            var arrayResponse = __spreadArrays(parsedBody);
            for (var _i = 0, _a = Object.keys(modelProperties_1); _i < _a.length; _i++) {
                var key = _a[_i];
                if (modelProperties_1[key].serializedName) {
                    arrayResponse[key] = _response.parsedBody[key];
                }
            }
            if (parsedHeaders) {
                for (var _b = 0, _c = Object.keys(parsedHeaders); _b < _c.length; _b++) {
                    var key = _c[_b];
                    arrayResponse[key] = parsedHeaders[key];
                }
            }
            addOperationResponse(arrayResponse);
            return arrayResponse;
        }
        if (typeName === "Composite" || typeName === "Dictionary") {
            return addOperationResponse(__assign(__assign({}, parsedHeaders), _response.parsedBody));
        }
    }
    if (bodyMapper ||
        _response.request.method === "HEAD" ||
        utils.isPrimitiveType(_response.parsedBody)) {
        // primitive body types and HEAD booleans
        return addOperationResponse(__assign(__assign({}, parsedHeaders), { body: _response.parsedBody }));
    }
    return addOperationResponse(__assign(__assign({}, parsedHeaders), _response.parsedBody));
}
//# sourceMappingURL=serviceClient.js.map