// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { BaseRequestPolicy, } from "./requestPolicy";
export function logPolicy(logger) {
    if (logger === void 0) { logger = console.log; }
    return {
        create: function (nextPolicy, options) {
            return new LogPolicy(nextPolicy, options, logger);
        },
    };
}
var LogPolicy = /** @class */ (function (_super) {
    __extends(LogPolicy, _super);
    function LogPolicy(nextPolicy, options, logger) {
        if (logger === void 0) { logger = console.log; }
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.logger = logger;
        return _this;
    }
    LogPolicy.prototype.sendRequest = function (request) {
        var _this = this;
        return this._nextPolicy.sendRequest(request).then(function (response) { return logResponse(_this, response); });
    };
    return LogPolicy;
}(BaseRequestPolicy));
export { LogPolicy };
function logResponse(policy, response) {
    policy.logger(">> Request: " + JSON.stringify(response.request, undefined, 2));
    policy.logger(">> Response status code: " + response.status);
    var responseBody = response.bodyAsText;
    policy.logger(">> Body: " + responseBody);
    return Promise.resolve(response);
}
//# sourceMappingURL=logPolicy.js.map