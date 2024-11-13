// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { HttpHeaders } from "../httpHeaders";
import { Constants } from "../util/constants";
import { getDefaultUserAgentKey, getPlatformSpecificData } from "./msRestUserAgentPolicy";
import { BaseRequestPolicy, } from "./requestPolicy";
function getRuntimeInfo() {
    var msRestRuntime = {
        key: "ms-rest-js",
        value: Constants.msRestVersion,
    };
    return [msRestRuntime];
}
function getUserAgentString(telemetryInfo, keySeparator, valueSeparator) {
    if (keySeparator === void 0) { keySeparator = " "; }
    if (valueSeparator === void 0) { valueSeparator = "/"; }
    return telemetryInfo
        .map(function (info) {
        var value = info.value ? "" + valueSeparator + info.value : "";
        return "" + info.key + value;
    })
        .join(keySeparator);
}
export var getDefaultUserAgentHeaderName = getDefaultUserAgentKey;
export function getDefaultUserAgentValue() {
    var runtimeInfo = getRuntimeInfo();
    var platformSpecificData = getPlatformSpecificData();
    var userAgent = getUserAgentString(runtimeInfo.concat(platformSpecificData));
    return userAgent;
}
export function userAgentPolicy(userAgentData) {
    var key = !userAgentData || userAgentData.key == undefined ? getDefaultUserAgentKey() : userAgentData.key;
    var value = !userAgentData || userAgentData.value == undefined
        ? getDefaultUserAgentValue()
        : userAgentData.value;
    return {
        create: function (nextPolicy, options) {
            return new UserAgentPolicy(nextPolicy, options, key, value);
        },
    };
}
var UserAgentPolicy = /** @class */ (function (_super) {
    __extends(UserAgentPolicy, _super);
    function UserAgentPolicy(_nextPolicy, _options, headerKey, headerValue) {
        var _this = _super.call(this, _nextPolicy, _options) || this;
        _this._nextPolicy = _nextPolicy;
        _this._options = _options;
        _this.headerKey = headerKey;
        _this.headerValue = headerValue;
        return _this;
    }
    UserAgentPolicy.prototype.sendRequest = function (request) {
        this.addUserAgentHeader(request);
        return this._nextPolicy.sendRequest(request);
    };
    UserAgentPolicy.prototype.addUserAgentHeader = function (request) {
        if (!request.headers) {
            request.headers = new HttpHeaders();
        }
        if (!request.headers.get(this.headerKey) && this.headerValue) {
            request.headers.set(this.headerKey, this.headerValue);
        }
    };
    return UserAgentPolicy;
}(BaseRequestPolicy));
export { UserAgentPolicy };
//# sourceMappingURL=userAgentPolicy.js.map