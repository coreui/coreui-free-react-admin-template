// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { HttpHeaders, isHttpHeadersLike } from "./httpHeaders";
import { Serializer } from "./serializer";
import { generateUuid } from "./util/utils";
export function isWebResourceLike(object) {
    if (typeof object !== "object") {
        return false;
    }
    if (typeof object.url === "string" &&
        typeof object.method === "string" &&
        typeof object.headers === "object" &&
        isHttpHeadersLike(object.headers) &&
        typeof object.validateRequestProperties === "function" &&
        typeof object.prepare === "function" &&
        typeof object.clone === "function") {
        return true;
    }
    return false;
}
/**
 * Creates a new WebResource object.
 *
 * This class provides an abstraction over a REST call by being library / implementation agnostic and wrapping the necessary
 * properties to initiate a request.
 *
 * @constructor
 */
var WebResource = /** @class */ (function () {
    function WebResource(url, method, body, query, headers, streamResponseBody, withCredentials, abortSignal, timeout, onUploadProgress, onDownloadProgress, proxySettings, keepAlive, agentSettings, redirectLimit) {
        this.streamResponseBody = streamResponseBody;
        this.url = url || "";
        this.method = method || "GET";
        this.headers = isHttpHeadersLike(headers) ? headers : new HttpHeaders(headers);
        this.body = body;
        this.query = query;
        this.formData = undefined;
        this.withCredentials = withCredentials || false;
        this.abortSignal = abortSignal;
        this.timeout = timeout || 0;
        this.onUploadProgress = onUploadProgress;
        this.onDownloadProgress = onDownloadProgress;
        this.proxySettings = proxySettings;
        this.keepAlive = keepAlive;
        this.agentSettings = agentSettings;
        this.redirectLimit = redirectLimit;
    }
    /**
     * Validates that the required properties such as method, url, headers["Content-Type"],
     * headers["accept-language"] are defined. It will throw an error if one of the above
     * mentioned properties are not defined.
     */
    WebResource.prototype.validateRequestProperties = function () {
        if (!this.method) {
            throw new Error("WebResource.method is required.");
        }
        if (!this.url) {
            throw new Error("WebResource.url is required.");
        }
    };
    /**
     * Prepares the request.
     * @param {RequestPrepareOptions} options Options to provide for preparing the request.
     * @returns {WebResource} Returns the prepared WebResource (HTTP Request) object that needs to be given to the request pipeline.
     */
    WebResource.prototype.prepare = function (options) {
        if (!options) {
            throw new Error("options object is required");
        }
        if (options.method == undefined || typeof options.method.valueOf() !== "string") {
            throw new Error("options.method must be a string.");
        }
        if (options.url && options.pathTemplate) {
            throw new Error("options.url and options.pathTemplate are mutually exclusive. Please provide exactly one of them.");
        }
        if ((options.pathTemplate == undefined || typeof options.pathTemplate.valueOf() !== "string") &&
            (options.url == undefined || typeof options.url.valueOf() !== "string")) {
            throw new Error("Please provide exactly one of options.pathTemplate or options.url.");
        }
        // set the url if it is provided.
        if (options.url) {
            if (typeof options.url !== "string") {
                throw new Error('options.url must be of type "string".');
            }
            this.url = options.url;
        }
        // set the method
        if (options.method) {
            var validMethods = ["GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST", "PATCH", "TRACE"];
            if (validMethods.indexOf(options.method.toUpperCase()) === -1) {
                throw new Error('The provided method "' +
                    options.method +
                    '" is invalid. Supported HTTP methods are: ' +
                    JSON.stringify(validMethods));
            }
        }
        this.method = options.method.toUpperCase();
        // construct the url if path template is provided
        if (options.pathTemplate) {
            var pathTemplate_1 = options.pathTemplate, pathParameters_1 = options.pathParameters;
            if (typeof pathTemplate_1 !== "string") {
                throw new Error('options.pathTemplate must be of type "string".');
            }
            if (!options.baseUrl) {
                options.baseUrl = "https://management.azure.com";
            }
            var baseUrl = options.baseUrl;
            var url_1 = baseUrl +
                (baseUrl.endsWith("/") ? "" : "/") +
                (pathTemplate_1.startsWith("/") ? pathTemplate_1.slice(1) : pathTemplate_1);
            var segments = url_1.match(/({\w*\s*\w*})/gi);
            if (segments && segments.length) {
                if (!pathParameters_1) {
                    throw new Error("pathTemplate: " + pathTemplate_1 + " has been provided. Hence, options.pathParameters must also be provided.");
                }
                segments.forEach(function (item) {
                    var pathParamName = item.slice(1, -1);
                    var pathParam = pathParameters_1[pathParamName];
                    if (pathParam === null ||
                        pathParam === undefined ||
                        !(typeof pathParam === "string" || typeof pathParam === "object")) {
                        throw new Error("pathTemplate: " + pathTemplate_1 + " contains the path parameter " + pathParamName +
                            (" however, it is not present in " + pathParameters_1 + " - " + JSON.stringify(pathParameters_1, undefined, 2) + ".") +
                            ("The value of the path parameter can either be a \"string\" of the form { " + pathParamName + ": \"some sample value\" } or ") +
                            ("it can be an \"object\" of the form { \"" + pathParamName + "\": { value: \"some sample value\", skipUrlEncoding: true } }."));
                    }
                    if (typeof pathParam.valueOf() === "string") {
                        url_1 = url_1.replace(item, encodeURIComponent(pathParam));
                    }
                    if (typeof pathParam.valueOf() === "object") {
                        if (!pathParam.value) {
                            throw new Error("options.pathParameters[" + pathParamName + "] is of type \"object\" but it does not contain a \"value\" property.");
                        }
                        if (pathParam.skipUrlEncoding) {
                            url_1 = url_1.replace(item, pathParam.value);
                        }
                        else {
                            url_1 = url_1.replace(item, encodeURIComponent(pathParam.value));
                        }
                    }
                });
            }
            this.url = url_1;
        }
        // append query parameters to the url if they are provided. They can be provided with pathTemplate or url option.
        if (options.queryParameters) {
            var queryParameters = options.queryParameters;
            if (typeof queryParameters !== "object") {
                throw new Error("options.queryParameters must be of type object. It should be a JSON object " +
                    "of \"query-parameter-name\" as the key and the \"query-parameter-value\" as the value. " +
                    "The \"query-parameter-value\" may be fo type \"string\" or an \"object\" of the form { value: \"query-parameter-value\", skipUrlEncoding: true }.");
            }
            // append question mark if it is not present in the url
            if (this.url && this.url.indexOf("?") === -1) {
                this.url += "?";
            }
            // construct queryString
            var queryParams = [];
            // We need to populate this.query as a dictionary if the request is being used for Sway's validateRequest().
            this.query = {};
            for (var queryParamName in queryParameters) {
                var queryParam = queryParameters[queryParamName];
                if (queryParam) {
                    if (typeof queryParam === "string") {
                        queryParams.push(queryParamName + "=" + encodeURIComponent(queryParam));
                        this.query[queryParamName] = encodeURIComponent(queryParam);
                    }
                    else if (typeof queryParam === "object") {
                        if (!queryParam.value) {
                            throw new Error("options.queryParameters[" + queryParamName + "] is of type \"object\" but it does not contain a \"value\" property.");
                        }
                        if (queryParam.skipUrlEncoding) {
                            queryParams.push(queryParamName + "=" + queryParam.value);
                            this.query[queryParamName] = queryParam.value;
                        }
                        else {
                            queryParams.push(queryParamName + "=" + encodeURIComponent(queryParam.value));
                            this.query[queryParamName] = encodeURIComponent(queryParam.value);
                        }
                    }
                }
            } // end-of-for
            // append the queryString
            this.url += queryParams.join("&");
        }
        // add headers to the request if they are provided
        if (options.headers) {
            var headers = options.headers;
            for (var _i = 0, _a = Object.keys(options.headers); _i < _a.length; _i++) {
                var headerName = _a[_i];
                this.headers.set(headerName, headers[headerName]);
            }
        }
        // ensure accept-language is set correctly
        if (!this.headers.get("accept-language")) {
            this.headers.set("accept-language", "en-US");
        }
        // ensure the request-id is set correctly
        if (!this.headers.get("x-ms-client-request-id") && !options.disableClientRequestId) {
            this.headers.set("x-ms-client-request-id", generateUuid());
        }
        // default
        if (!this.headers.get("Content-Type")) {
            this.headers.set("Content-Type", "application/json; charset=utf-8");
        }
        // set the request body. request.js automatically sets the Content-Length request header, so we need not set it explicilty
        this.body = options.body;
        if (options.body != undefined) {
            // body as a stream special case. set the body as-is and check for some special request headers specific to sending a stream.
            if (options.bodyIsStream) {
                if (!this.headers.get("Transfer-Encoding")) {
                    this.headers.set("Transfer-Encoding", "chunked");
                }
                if (this.headers.get("Content-Type") !== "application/octet-stream") {
                    this.headers.set("Content-Type", "application/octet-stream");
                }
            }
            else {
                if (options.serializationMapper) {
                    this.body = new Serializer(options.mappers).serialize(options.serializationMapper, options.body, "requestBody");
                }
                if (!options.disableJsonStringifyOnBody) {
                    this.body = JSON.stringify(options.body);
                }
            }
        }
        this.abortSignal = options.abortSignal;
        this.onDownloadProgress = options.onDownloadProgress;
        this.onUploadProgress = options.onUploadProgress;
        this.redirectLimit = options.redirectLimit;
        this.streamResponseBody = options.streamResponseBody;
        return this;
    };
    /**
     * Clone this WebResource HTTP request object.
     * @returns {WebResource} The clone of this WebResource HTTP request object.
     */
    WebResource.prototype.clone = function () {
        var result = new WebResource(this.url, this.method, this.body, this.query, this.headers && this.headers.clone(), this.streamResponseBody, this.withCredentials, this.abortSignal, this.timeout, this.onUploadProgress, this.onDownloadProgress, this.proxySettings, this.keepAlive, this.agentSettings, this.redirectLimit);
        if (this.formData) {
            result.formData = this.formData;
        }
        if (this.operationSpec) {
            result.operationSpec = this.operationSpec;
        }
        if (this.shouldDeserialize) {
            result.shouldDeserialize = this.shouldDeserialize;
        }
        if (this.operationResponseGetter) {
            result.operationResponseGetter = this.operationResponseGetter;
        }
        return result;
    };
    return WebResource;
}());
export { WebResource };
//# sourceMappingURL=webResource.js.map