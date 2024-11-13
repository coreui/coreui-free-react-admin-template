/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { __extends } from "tslib";
import TelemetryEvent from "./TelemetryEvent";
import { prependEventNamePrefix } from "./TelemetryUtils";
export var CACHE_EVENT_TYPES = {
    TokenCacheLookup: prependEventNamePrefix("token_cache_lookup"),
    TokenCacheWrite: prependEventNamePrefix("token_cache_write"),
    TokenCacheBeforeAccess: prependEventNamePrefix("token_cache_before_access"),
    TokenCacheAfterAccess: prependEventNamePrefix("token_cache_after_access"),
    TokenCacheBeforeWrite: prependEventNamePrefix("token_cache_before_write"),
    TokenCacheDelete: prependEventNamePrefix("token_cache_delete")
};
export var TOKEN_TYPES;
(function (TOKEN_TYPES) {
    TOKEN_TYPES["AT"] = "at";
    TOKEN_TYPES["ID"] = "id";
    TOKEN_TYPES["ACCOUNT"] = "account";
})(TOKEN_TYPES || (TOKEN_TYPES = {}));
export var TOKEN_TYPE_KEY = prependEventNamePrefix("token_type");
var CacheEvent = /** @class */ (function (_super) {
    __extends(CacheEvent, _super);
    function CacheEvent(eventName, correlationId) {
        return _super.call(this, eventName, correlationId, "CacheEvent") || this;
    }
    Object.defineProperty(CacheEvent.prototype, "tokenType", {
        set: function (tokenType) {
            this.event[TOKEN_TYPE_KEY] = tokenType;
        },
        enumerable: false,
        configurable: true
    });
    return CacheEvent;
}(TelemetryEvent));
export default CacheEvent;
//# sourceMappingURL=CacheEvent.js.map