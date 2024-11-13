"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_TYPE_KEY = exports.TOKEN_TYPES = exports.CACHE_EVENT_TYPES = void 0;
var tslib_1 = require("tslib");
var TelemetryEvent_1 = tslib_1.__importDefault(require("./TelemetryEvent"));
var TelemetryUtils_1 = require("./TelemetryUtils");
exports.CACHE_EVENT_TYPES = {
    TokenCacheLookup: TelemetryUtils_1.prependEventNamePrefix("token_cache_lookup"),
    TokenCacheWrite: TelemetryUtils_1.prependEventNamePrefix("token_cache_write"),
    TokenCacheBeforeAccess: TelemetryUtils_1.prependEventNamePrefix("token_cache_before_access"),
    TokenCacheAfterAccess: TelemetryUtils_1.prependEventNamePrefix("token_cache_after_access"),
    TokenCacheBeforeWrite: TelemetryUtils_1.prependEventNamePrefix("token_cache_before_write"),
    TokenCacheDelete: TelemetryUtils_1.prependEventNamePrefix("token_cache_delete")
};
var TOKEN_TYPES;
(function (TOKEN_TYPES) {
    TOKEN_TYPES["AT"] = "at";
    TOKEN_TYPES["ID"] = "id";
    TOKEN_TYPES["ACCOUNT"] = "account";
})(TOKEN_TYPES = exports.TOKEN_TYPES || (exports.TOKEN_TYPES = {}));
exports.TOKEN_TYPE_KEY = TelemetryUtils_1.prependEventNamePrefix("token_type");
var CacheEvent = /** @class */ (function (_super) {
    tslib_1.__extends(CacheEvent, _super);
    function CacheEvent(eventName, correlationId) {
        return _super.call(this, eventName, correlationId, "CacheEvent") || this;
    }
    Object.defineProperty(CacheEvent.prototype, "tokenType", {
        set: function (tokenType) {
            this.event[exports.TOKEN_TYPE_KEY] = tokenType;
        },
        enumerable: false,
        configurable: true
    });
    return CacheEvent;
}(TelemetryEvent_1.default));
exports.default = CacheEvent;
//# sourceMappingURL=CacheEvent.js.map