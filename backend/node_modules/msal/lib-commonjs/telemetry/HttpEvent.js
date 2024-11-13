"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_KEYS = void 0;
var tslib_1 = require("tslib");
var TelemetryEvent_1 = tslib_1.__importDefault(require("./TelemetryEvent"));
var TelemetryUtils_1 = require("./TelemetryUtils");
var ServerRequestParameters_1 = require("../ServerRequestParameters");
exports.EVENT_KEYS = {
    HTTP_PATH: TelemetryUtils_1.prependEventNamePrefix("http_path"),
    USER_AGENT: TelemetryUtils_1.prependEventNamePrefix("user_agent"),
    QUERY_PARAMETERS: TelemetryUtils_1.prependEventNamePrefix("query_parameters"),
    API_VERSION: TelemetryUtils_1.prependEventNamePrefix("api_version"),
    RESPONSE_CODE: TelemetryUtils_1.prependEventNamePrefix("response_code"),
    O_AUTH_ERROR_CODE: TelemetryUtils_1.prependEventNamePrefix("oauth_error_code"),
    HTTP_METHOD: TelemetryUtils_1.prependEventNamePrefix("http_method"),
    REQUEST_ID_HEADER: TelemetryUtils_1.prependEventNamePrefix("request_id_header"),
    SPE_INFO: TelemetryUtils_1.prependEventNamePrefix("spe_info"),
    SERVER_ERROR_CODE: TelemetryUtils_1.prependEventNamePrefix("server_error_code"),
    SERVER_SUB_ERROR_CODE: TelemetryUtils_1.prependEventNamePrefix("server_sub_error_code"),
    URL: TelemetryUtils_1.prependEventNamePrefix("url")
};
var HttpEvent = /** @class */ (function (_super) {
    tslib_1.__extends(HttpEvent, _super);
    function HttpEvent(correlationId, eventLabel) {
        return _super.call(this, TelemetryUtils_1.prependEventNamePrefix("http_event"), correlationId, eventLabel) || this;
    }
    Object.defineProperty(HttpEvent.prototype, "url", {
        set: function (url) {
            var scrubbedUri = TelemetryUtils_1.scrubTenantFromUri(url);
            this.event[exports.EVENT_KEYS.URL] = scrubbedUri && scrubbedUri.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "httpPath", {
        set: function (httpPath) {
            this.event[exports.EVENT_KEYS.HTTP_PATH] = TelemetryUtils_1.scrubTenantFromUri(httpPath).toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "userAgent", {
        set: function (userAgent) {
            this.event[exports.EVENT_KEYS.USER_AGENT] = userAgent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "queryParams", {
        set: function (queryParams) {
            this.event[exports.EVENT_KEYS.QUERY_PARAMETERS] = ServerRequestParameters_1.ServerRequestParameters.generateQueryParametersString(queryParams);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "apiVersion", {
        set: function (apiVersion) {
            this.event[exports.EVENT_KEYS.API_VERSION] = apiVersion.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "httpResponseStatus", {
        set: function (statusCode) {
            this.event[exports.EVENT_KEYS.RESPONSE_CODE] = statusCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "oAuthErrorCode", {
        set: function (errorCode) {
            this.event[exports.EVENT_KEYS.O_AUTH_ERROR_CODE] = errorCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "httpMethod", {
        set: function (httpMethod) {
            this.event[exports.EVENT_KEYS.HTTP_METHOD] = httpMethod;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "requestIdHeader", {
        set: function (requestIdHeader) {
            this.event[exports.EVENT_KEYS.REQUEST_ID_HEADER] = requestIdHeader;
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
            this.event[exports.EVENT_KEYS.SPE_INFO] = speInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "serverErrorCode", {
        set: function (errorCode) {
            this.event[exports.EVENT_KEYS.SERVER_ERROR_CODE] = errorCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpEvent.prototype, "serverSubErrorCode", {
        set: function (subErrorCode) {
            this.event[exports.EVENT_KEYS.SERVER_SUB_ERROR_CODE] = subErrorCode;
        },
        enumerable: false,
        configurable: true
    });
    return HttpEvent;
}(TelemetryEvent_1.default));
exports.default = HttpEvent;
//# sourceMappingURL=HttpEvent.js.map