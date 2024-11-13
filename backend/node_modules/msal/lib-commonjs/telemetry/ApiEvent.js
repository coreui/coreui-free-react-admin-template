"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_EVENT_IDENTIFIER = exports.API_CODE = exports.EVENT_KEYS = void 0;
var tslib_1 = require("tslib");
var TelemetryEvent_1 = tslib_1.__importDefault(require("./TelemetryEvent"));
var TelemetryConstants_1 = require("./TelemetryConstants");
var TelemetryUtils_1 = require("./TelemetryUtils");
exports.EVENT_KEYS = {
    AUTHORITY: TelemetryUtils_1.prependEventNamePrefix("authority"),
    AUTHORITY_TYPE: TelemetryUtils_1.prependEventNamePrefix("authority_type"),
    PROMPT: TelemetryUtils_1.prependEventNamePrefix("ui_behavior"),
    TENANT_ID: TelemetryUtils_1.prependEventNamePrefix("tenant_id"),
    USER_ID: TelemetryUtils_1.prependEventNamePrefix("user_id"),
    WAS_SUCESSFUL: TelemetryUtils_1.prependEventNamePrefix("was_successful"),
    API_ERROR_CODE: TelemetryUtils_1.prependEventNamePrefix("api_error_code"),
    LOGIN_HINT: TelemetryUtils_1.prependEventNamePrefix("login_hint")
};
var API_CODE;
(function (API_CODE) {
    API_CODE[API_CODE["AcquireTokenRedirect"] = 2001] = "AcquireTokenRedirect";
    API_CODE[API_CODE["AcquireTokenSilent"] = 2002] = "AcquireTokenSilent";
    API_CODE[API_CODE["AcquireTokenPopup"] = 2003] = "AcquireTokenPopup";
    API_CODE[API_CODE["LoginRedirect"] = 2004] = "LoginRedirect";
    API_CODE[API_CODE["LoginPopup"] = 2005] = "LoginPopup";
    API_CODE[API_CODE["Logout"] = 2006] = "Logout";
})(API_CODE = exports.API_CODE || (exports.API_CODE = {}));
var API_EVENT_IDENTIFIER;
(function (API_EVENT_IDENTIFIER) {
    API_EVENT_IDENTIFIER["AcquireTokenRedirect"] = "AcquireTokenRedirect";
    API_EVENT_IDENTIFIER["AcquireTokenSilent"] = "AcquireTokenSilent";
    API_EVENT_IDENTIFIER["AcquireTokenPopup"] = "AcquireTokenPopup";
    API_EVENT_IDENTIFIER["LoginRedirect"] = "LoginRedirect";
    API_EVENT_IDENTIFIER["LoginPopup"] = "LoginPopup";
    API_EVENT_IDENTIFIER["Logout"] = "Logout";
})(API_EVENT_IDENTIFIER = exports.API_EVENT_IDENTIFIER || (exports.API_EVENT_IDENTIFIER = {}));
var mapEventIdentiferToCode = (_a = {},
    _a[API_EVENT_IDENTIFIER.AcquireTokenSilent] = API_CODE.AcquireTokenSilent,
    _a[API_EVENT_IDENTIFIER.AcquireTokenPopup] = API_CODE.AcquireTokenPopup,
    _a[API_EVENT_IDENTIFIER.AcquireTokenRedirect] = API_CODE.AcquireTokenRedirect,
    _a[API_EVENT_IDENTIFIER.LoginPopup] = API_CODE.LoginPopup,
    _a[API_EVENT_IDENTIFIER.LoginRedirect] = API_CODE.LoginRedirect,
    _a[API_EVENT_IDENTIFIER.Logout] = API_CODE.Logout,
    _a);
var ApiEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ApiEvent, _super);
    function ApiEvent(correlationId, piiEnabled, apiEventIdentifier) {
        var _this = _super.call(this, TelemetryUtils_1.prependEventNamePrefix("api_event"), correlationId, apiEventIdentifier) || this;
        if (apiEventIdentifier) {
            _this.apiCode = mapEventIdentiferToCode[apiEventIdentifier];
            _this.apiEventIdentifier = apiEventIdentifier;
        }
        _this.piiEnabled = piiEnabled;
        return _this;
    }
    Object.defineProperty(ApiEvent.prototype, "apiEventIdentifier", {
        set: function (apiEventIdentifier) {
            this.event[TelemetryConstants_1.TELEMETRY_BLOB_EVENT_NAMES.ApiTelemIdConstStrKey] = apiEventIdentifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiEvent.prototype, "apiCode", {
        set: function (apiCode) {
            this.event[TelemetryConstants_1.TELEMETRY_BLOB_EVENT_NAMES.ApiIdConstStrKey] = apiCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiEvent.prototype, "authority", {
        set: function (uri) {
            this.event[exports.EVENT_KEYS.AUTHORITY] = TelemetryUtils_1.scrubTenantFromUri(uri).toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiEvent.prototype, "apiErrorCode", {
        set: function (errorCode) {
            this.event[exports.EVENT_KEYS.API_ERROR_CODE] = errorCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiEvent.prototype, "tenantId", {
        set: function (tenantId) {
            this.event[exports.EVENT_KEYS.TENANT_ID] = this.piiEnabled && tenantId ?
                TelemetryUtils_1.hashPersonalIdentifier(tenantId)
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiEvent.prototype, "accountId", {
        set: function (accountId) {
            this.event[exports.EVENT_KEYS.USER_ID] = this.piiEnabled && accountId ?
                TelemetryUtils_1.hashPersonalIdentifier(accountId)
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiEvent.prototype, "wasSuccessful", {
        get: function () {
            return this.event[exports.EVENT_KEYS.WAS_SUCESSFUL] === true;
        },
        set: function (wasSuccessful) {
            this.event[exports.EVENT_KEYS.WAS_SUCESSFUL] = wasSuccessful;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiEvent.prototype, "loginHint", {
        set: function (loginHint) {
            this.event[exports.EVENT_KEYS.LOGIN_HINT] = this.piiEnabled && loginHint ?
                TelemetryUtils_1.hashPersonalIdentifier(loginHint)
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiEvent.prototype, "authorityType", {
        set: function (authorityType) {
            this.event[exports.EVENT_KEYS.AUTHORITY_TYPE] = authorityType.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiEvent.prototype, "promptType", {
        set: function (promptType) {
            this.event[exports.EVENT_KEYS.PROMPT] = promptType.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    return ApiEvent;
}(TelemetryEvent_1.default));
exports.default = ApiEvent;
//# sourceMappingURL=ApiEvent.js.map