/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { TENANT_PLACEHOLDER, EVENT_NAME_PREFIX } from "./TelemetryConstants";
import { CryptoUtils } from "../utils/CryptoUtils";
import { UrlUtils } from "../utils/UrlUtils";
import { Authority } from "../authority/Authority";
export var scrubTenantFromUri = function (uri) {
    var url = UrlUtils.GetUrlComponents(uri);
    // validate trusted host
    if (Authority.isAdfs(uri)) {
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
            pathParams[tenantPosition] = TENANT_PLACEHOLDER;
        }
    }
    return url.Protocol + "//" + url.HostNameAndPort + "/" + pathParams.join("/");
};
export var hashPersonalIdentifier = function (valueToHash) {
    /*
     * TODO sha256 this
     * Current test runner is being funny with node libs that are webpacked anyway
     * need a different solution
     */
    return CryptoUtils.base64Encode(valueToHash);
};
export var prependEventNamePrefix = function (suffix) { return "" + EVENT_NAME_PREFIX + (suffix || ""); };
export var supportsBrowserPerformance = function () { return !!(typeof window !== "undefined" &&
    "performance" in window &&
    window.performance.mark &&
    window.performance.measure); };
export var endBrowserPerformanceMeasurement = function (measureName, startMark, endMark) {
    if (supportsBrowserPerformance()) {
        window.performance.mark(endMark);
        window.performance.measure(measureName, startMark, endMark);
        window.performance.clearMeasures(measureName);
        window.performance.clearMarks(startMark);
        window.performance.clearMarks(endMark);
    }
};
export var startBrowserPerformanceMeasurement = function (startMark) {
    if (supportsBrowserPerformance()) {
        window.performance.mark(startMark);
    }
};
//# sourceMappingURL=TelemetryUtils.js.map