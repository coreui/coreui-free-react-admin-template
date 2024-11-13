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
exports.EVENT_KEYS = {
    USER_CANCELLED: TelemetryUtils_1.prependEventNamePrefix("user_cancelled"),
    ACCESS_DENIED: TelemetryUtils_1.prependEventNamePrefix("access_denied")
};
var UiEvent = /** @class */ (function (_super) {
    tslib_1.__extends(UiEvent, _super);
    function UiEvent(correlationId) {
        return _super.call(this, TelemetryUtils_1.prependEventNamePrefix("ui_event"), correlationId, "UiEvent") || this;
    }
    Object.defineProperty(UiEvent.prototype, "userCancelled", {
        set: function (userCancelled) {
            this.event[exports.EVENT_KEYS.USER_CANCELLED] = userCancelled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UiEvent.prototype, "accessDenied", {
        set: function (accessDenied) {
            this.event[exports.EVENT_KEYS.ACCESS_DENIED] = accessDenied;
        },
        enumerable: false,
        configurable: true
    });
    return UiEvent;
}(TelemetryEvent_1.default));
exports.default = UiEvent;
//# sourceMappingURL=UiEvent.js.map