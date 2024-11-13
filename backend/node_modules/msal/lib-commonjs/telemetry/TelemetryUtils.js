"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBrowserPerformanceMeasurement = exports.endBrowserPerformanceMeasurement = exports.supportsBrowserPerformance = exports.prependEventNamePrefix = exports.hashPersonalIdentifier = exports.scrubTenantFromUri = void 0;
var TelemetryConstants_1 = require("./TelemetryConstants");
var CryptoUtils_1 = require("../utils/CryptoUtils");
var UrlUtils_1 = require("../utils/UrlUtils");
var Authority_1 = require("../authority/Authority");
exports.scrubTenantFromUri = function (uri) {
    var url = UrlUtils_1.UrlUtils.GetUrlComponents(uri);
    // validate trusted host
    if (Authority_1.Authority.isAdfs(uri)) {
        /**
         * returning what was passed because the library needs to work with uris that are non
         * AAD trusted but passed by users such as B2C or others.
         * HTTP Events for instance can take a url to the open id config endpoint
         */
        return uri;
    }
    var pathParams = url.PathSegments;
    if (pathParams && pathParams.length >= 2) {
        var tenantPosition = pathParams[1] === "tfp" ? 2 : 1;
        if (tenantPosition < pathParams.length) {
            pathParams[tenantPosition] = TelemetryConstants_1.TENANT_PLACEHOLDER;
        }
    }
    return url.Protocol + "//" + url.HostNameAndPort + "/" + pathParams.join("/");
};
exports.hashPersonalIdentifier = function (valueToHash) {
    /*
     * TODO sha256 this
     * Current test runner is being funny with node libs that are webpacked anyway
     * need a different solution
     */
    return CryptoUtils_1.CryptoUtils.base64Encode(valueToHash);
};
exports.prependEventNamePrefix = function (suffix) { return "" + TelemetryConstants_1.EVENT_NAME_PREFIX + (suffix || ""); };
exports.supportsBrowserPerformance = function () { return !!(typeof window !== "undefined" &&
    "performance" in window &&
    window.performance.mark &&
    window.performance.measure); };
exports.endBrowserPerformanceMeasurement = function (measureName, startMark, endMark) {
    if (exports.supportsBrowserPerformance()) {
        window.performance.mark(endMark);
        window.performance.measure(measureName, startMark, endMark);
        window.performance.clearMeasures(measureName);
        window.performance.clearMarks(startMark);
        window.performance.clearMarks(endMark);
    }
};
exports.startBrowserPerformanceMeasurement = function (startMark) {
    if (exports.supportsBrowserPerformance()) {
        window.performance.mark(startMark);
    }
};
//# sourceMappingURL=TelemetryUtils.js.map