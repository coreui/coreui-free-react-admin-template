/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { __assign } from "tslib";
import { TELEMETRY_BLOB_EVENT_NAMES, EVENT_NAME_KEY, START_TIME_KEY, ELAPSED_TIME_KEY } from "./TelemetryConstants";
import { prependEventNamePrefix, startBrowserPerformanceMeasurement, endBrowserPerformanceMeasurement } from "./TelemetryUtils";
import { CryptoUtils } from "../utils/CryptoUtils";
var TelemetryEvent = /** @class */ (function () {
    function TelemetryEvent(eventName, correlationId, eventLabel) {
        var _a;
        this.eventId = CryptoUtils.createNewGuid();
        this.label = eventLabel;
        this.event = (_a = {},
            _a[prependEventNamePrefix(EVENT_NAME_KEY)] = eventName,
            _a[prependEventNamePrefix(ELAPSED_TIME_KEY)] = -1,
            _a["" + TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey] = correlationId,
            _a);
    }
    TelemetryEvent.prototype.setElapsedTime = function (time) {
        this.event[prependEventNamePrefix(ELAPSED_TIME_KEY)] = time;
    };
    TelemetryEvent.prototype.stop = function () {
        // Set duration of event
        this.setElapsedTime(+Date.now() - +this.startTimestamp);
        endBrowserPerformanceMeasurement(this.displayName, this.perfStartMark, this.perfEndMark);
    };
    TelemetryEvent.prototype.start = function () {
        this.startTimestamp = Date.now();
        this.event[prependEventNamePrefix(START_TIME_KEY)] = this.startTimestamp;
        startBrowserPerformanceMeasurement(this.perfStartMark);
    };
    Object.defineProperty(TelemetryEvent.prototype, "telemetryCorrelationId", {
        get: function () {
            return this.event["" + TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey];
        },
        set: function (value) {
            this.event["" + TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TelemetryEvent.prototype, "eventName", {
        get: function () {
            return this.event[prependEventNamePrefix(EVENT_NAME_KEY)];
        },
        enumerable: false,
        configurable: true
    });
    TelemetryEvent.prototype.get = function () {
        return __assign(__assign({}, this.event), { eventId: this.eventId });
    };
    Object.defineProperty(TelemetryEvent.prototype, "key", {
        get: function () {
            return this.telemetryCorrelationId + "_" + this.eventId + "-" + this.eventName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TelemetryEvent.prototype, "displayName", {
        get: function () {
            return "Msal-" + this.label + "-" + this.telemetryCorrelationId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TelemetryEvent.prototype, "perfStartMark", {
        get: function () {
            return "start-" + this.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TelemetryEvent.prototype, "perfEndMark", {
        get: function () {
            return "end-" + this.key;
        },
        enumerable: false,
        configurable: true
    });
    return TelemetryEvent;
}());
export default TelemetryEvent;
//# sourceMappingURL=TelemetryEvent.js.map