// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { BaseRequestPolicy, } from "./requestPolicy";
var agentNotSupportedInBrowser = new Error("AgentPolicy is not supported in browser environment");
export function agentPolicy(_agentSettings) {
    return {
        create: function (_nextPolicy, _options) {
            throw agentNotSupportedInBrowser;
        },
    };
}
var AgentPolicy = /** @class */ (function (_super) {
    __extends(AgentPolicy, _super);
    function AgentPolicy(nextPolicy, options) {
        var _this = _super.call(this, nextPolicy, options) || this;
        throw agentNotSupportedInBrowser;
        return _this;
    }
    AgentPolicy.prototype.sendRequest = function (_request) {
        throw agentNotSupportedInBrowser;
    };
    return AgentPolicy;
}(BaseRequestPolicy));
export { AgentPolicy };
//# sourceMappingURL=agentPolicy.browser.js.map