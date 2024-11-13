/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { __extends } from "tslib";
import TelemetryEvent from "./TelemetryEvent";
import { scrubTenantFromUri, prependEventNamePrefix } from "./TelemetryUtils";
import { ServerRequestParameters } from "../ServerRequestParameters";
export var EVENT_KEYS = {
    HTTP_PATH: prependEventNamePrefix("http_path"),
    USER_AGENT: prependEventNamePrefix("user_agent"),
    QUERY_PARAMETERS: prependEventNamePrefix("query_parameters"),
    API_VERSION: prependEventNamePrefix("api_version"),
    RESPONSE_CODE: prependEventNamePrefix("response_code"),
    O_AUTH_ERROR_CODE: prependEventNamePrefix("oauth_error_code"),
    HTTP_METHOD: prependEventNamePrefix("http_method"),
    REQUEST_ID_HEADER: prependEventNamePrefix("request_id_header"),
    SPE_INFO: prependEventNamePrefix("spe_info"),
    SERVER_ERROR_CODE: prependEventNamePrefix("server_error_code"),
    SERVER_SUB_ERROR_CODE: prependEventNamePrefix("server_sub_error_code"),
    URL: prependEventNamePrefix("url")
};
var HttpEvent = /** @class */ (function (_super) {
    __extends(HttpEvent, _super);
    function HttpEvent(correlationId, eventLabel) {
        return _super.call(this, prependEventNamePrefix("http_event"), correlationId, eventLabel) || this;
    }
    Object.defineProperty(HttpEvent.prototype, "url", {
        set: function (url) {
            var scrubbedUri = scrubTenantFromUri(url);
            this.event[EVENT_KEYS.URL] = scrubbedUri && scrubbedUri.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "httpPath", {
        set: function (httpPath) {
            this.event[EVENT_KEYS.HTTP_PATH] = scrubTenantFromUri(httpPath).toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "userAgent", {
        set: function (userAgent) {
            this.event[EVENT_KEYS.USER_AGENT] = userAgent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "queryParams", {
        set: function (queryParams) {
            this.event[EVENT_KEYS.QUERY_PARAMETERS] = ServerRequestParameters.generateQueryParametersString(queryParams);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "apiVersion", {
        set: function (apiVersion) {
            this.event[EVENT_KEYS.API_VERSION] = apiVersion.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "httpResponseStatus", {
        set: function (statusCode) {
            this.event[EVENT_KEYS.RESPONSE_CODE] = statusCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "oAuthErrorCode", {
        set: function (errorCode) {
            this.event[EVENT_KEYS.O_AUTH_ERROR_CODE] = errorCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "httpMethod", {
        set: function (httpMethod) {
            this.event[EVENT_KEYS.HTTP_METHOD] = httpMethod;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "requestIdHeader", {
        set: function (requestIdHeader) {
            this.event[EVENT_KEYS.REQUEST_ID_HEADER] = requestIdHeader;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "speInfo", {
        /**
         * Indicates whether the request was executed on a ring serving SPE traffic.
         * An empty string indicates this occurred on an outer ring, and the string "I"
         * indicates the request occurred on the inner ring
         */
        set: function (speInfo) {
            this.event[EVENT_KEYS.SPE_INFO] = speInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "serverErrorCode", {
        set: function (errorCode) {
            this.event[EVENT_KEYS.SERVER_ERROR_CODE] = errorCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "serverSubErrorCode", {
        set: function (subErrorCode) {
            this.event[EVENT_KEYS.SERVER_SUB_ERROR_CODE] = subErrorCode;
        },
        enumerable: false,
        configurable: true
    });
    return HttpEvent;
}(TelemetryEvent));
export default HttpEvent;
//# sourceMappingURL=HttpEvent.js.map