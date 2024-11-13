"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TelemetryConstants_1 = require("./TelemetryConstants");
var TelemetryUtils_1 = require("./TelemetryUtils");
var CryptoUtils_1 = require("../utils/CryptoUtils");
var TelemetryEvent = /** @class */ (function () {
    function TelemetryEvent(eventName, correlationId, eventLabel) {
        var _a;
        this.eventId = CryptoUtils_1.CryptoUtils.createNewGuid();
        this.label = eventLabel;
        this.event = (_a = {},
            _a[TelemetryUtils_1.prependEventNamePrefix(TelemetryConstants_1.EVENT_NAME_KEY)] = eventName,
            _a[TelemetryUtils_1.prependEventNamePrefix(TelemetryConstants_1.ELAPSED_TIME_KEY)] = -1,
            _a["" + TelemetryConstants_1.TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey] = correlationId,
            _a);
    }
    TelemetryEvent.prototype.setElapsedTime = function (time) {
        this.event[TelemetryUtils_1.prependEventNamePrefix(TelemetryConstants_1.ELAPSED_TIME_KEY)] = time;
    };
    TelemetryEvent.prototype.stop = function () {
        // Set duration of event
        this.setElapsedTime(+Date.now() - +this.startTimestamp);
        TelemetryUtils_1.endBrowserPerformanceMeasurement(this.displayName, this.perfStartMark, this.perfEndMark);
    };
    TelemetryEvent.prototype.start = function () {
        this.startTimestamp = Date.now();
        this.event[TelemetryUtils_1.prependEventNamePrefix(TelemetryConstants_1.START_TIME_KEY)] = this.startTimestamp;
        TelemetryUtils_1.startBrowserPerformanceMeasurement(this.perfStartMark);
    };
    Object.defineProperty(TelemetryEvent.prototype, "telemetryCorrelationId", {
        get: function () {
            return this.event["" + TelemetryConstants_1.TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey];
        },
        set: function (value) {
            this.event["" + TelemetryConstants_1.TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TelemetryEvent.prototype, "eventName", {
        get: function () {
            return this.event[TelemetryUtils_1.prependEventNamePrefix(TelemetryConstants_1.EVENT_NAME_KEY)];
        },
        enumerable: false,
        configurable: true
    });
    TelemetryEvent.prototype.get = function () {
        return tslib_1.__assign(tslib_1.__assign({}, this.event), { eventId: this.eventId });
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
exports.default = TelemetryEvent;
//# sourceMappingURL=TelemetryEvent.js.map