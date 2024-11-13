// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __awaiter, __extends, __generator } from "tslib";
import { BaseRequestPolicy, } from "./requestPolicy";
import { Constants } from "../util/constants";
import { delay } from "../util/utils";
var StatusCodes = Constants.HttpConstants.StatusCodes;
var DEFAULT_RETRY_COUNT = 3;
export function throttlingRetryPolicy(maxRetries) {
    if (maxRetries === void 0) { maxRetries = DEFAULT_RETRY_COUNT; }
    return {
        create: function (nextPolicy, options) {
            return new ThrottlingRetryPolicy(nextPolicy, options, maxRetries);
        },
    };
}
/**
 * To learn more, please refer to
 * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
 * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
 * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 */
var ThrottlingRetryPolicy = /** @class */ (function (_super) {
    __extends(ThrottlingRetryPolicy, _super);
    function ThrottlingRetryPolicy(nextPolicy, options, retryLimit) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.retryLimit = retryLimit;
        return _this;
    }
    ThrottlingRetryPolicy.prototype.sendRequest = function (httpRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this._nextPolicy.sendRequest(httpRequest.clone()).then(function (response) {
                        return _this.retry(httpRequest, response, 0);
                    })];
            });
        });
    };
    ThrottlingRetryPolicy.prototype.retry = function (httpRequest, httpResponse, retryCount) {
        return __awaiter(this, void 0, void 0, function () {
            var retryAfterHeader, delayInMs, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (httpResponse.status !== StatusCodes.TooManyRequests) {
                            return [2 /*return*/, httpResponse];
                        }
                        retryAfterHeader = httpResponse.headers.get(Constants.HeaderConstants.RETRY_AFTER);
                        if (!(retryAfterHeader && retryCount < this.retryLimit)) return [3 /*break*/, 3];
                        delayInMs = ThrottlingRetryPolicy.parseRetryAfterHeader(retryAfterHeader);
                        if (!delayInMs) return [3 /*break*/, 3];
                        return [4 /*yield*/, delay(delayInMs)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._nextPolicy.sendRequest(httpRequest)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, this.retry(httpRequest, res, retryCount + 1)];
                    case 3: return [2 /*return*/, httpResponse];
                }
            });
        });
    };
    ThrottlingRetryPolicy.parseRetryAfterHeader = function (headerValue) {
        var retryAfterInSeconds = Number(headerValue);
        if (Number.isNaN(retryAfterInSeconds)) {
            return ThrottlingRetryPolicy.parseDateRetryAfterHeader(headerValue);
        }
        else {
            return retryAfterInSeconds * 1000;
        }
    };
    ThrottlingRetryPolicy.parseDateRetryAfterHeader = function (headerValue) {
        try {
            var now = Date.now();
            var date = Date.parse(headerValue);
            var diff = date - now;
            return Number.isNaN(diff) ? undefined : diff;
        }
        catch (error) {
            return undefined;
        }
    };
    return ThrottlingRetryPolicy;
}(BaseRequestPolicy));
export { ThrottlingRetryPolicy };
//# sourceMappingURL=throttlingRetryPolicy.js.map