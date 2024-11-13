/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { __extends } from "tslib";
import TelemetryEvent from "./TelemetryEvent";
import { prependEventNamePrefix } from "./TelemetryUtils";
export var EVENT_KEYS = {
    USER_CANCELLED: prependEventNamePrefix("user_cancelled"),
    ACCESS_DENIED: prependEventNamePrefix("access_denied")
};
var UiEvent = /** @class */ (function (_super) {
    __extends(UiEvent, _super);
    function UiEvent(correlationId) {
        return _super.call(this, prependEventNamePrefix("ui_event"), correlationId, "UiEvent") || this;
    }
    Object.defineProperty(UiEvent.prototype, "userCancelled", {
        set: function (userCancelled) {
            this.event[EVENT_KEYS.USER_CANCELLED] = userCancelled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UiEvent.prototype, "accessDenied", {
        set: function (accessDenied) {
            this.event[EVENT_KEYS.ACCESS_DENIED] = accessDenied;
        },
        enumerable: false,
        configurable: true
    });
    return UiEvent;
}(TelemetryEvent));
export default UiEvent;
//# sourceMappingURL=UiEvent.js.map