// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { BaseRequestPolicy, } from "./requestPolicy";
export function agentPolicy(agentSettings) {
    return {
        create: function (nextPolicy, options) {
            return new AgentPolicy(nextPolicy, options, agentSettings);
        },
    };
}
var AgentPolicy = /** @class */ (function (_super) {
    __extends(AgentPolicy, _super);
    function AgentPolicy(nextPolicy, options, agentSettings) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.agentSettings = agentSettings;
        return _this;
    }
    AgentPolicy.prototype.sendRequest = function (request) {
        if (!request.agentSettings) {
            request.agentSettings = this.agentSettings;
        }
        return this._nextPolicy.sendRequest(request);
    };
    return AgentPolicy;
}(BaseRequestPolicy));
export { AgentPolicy };
//# sourceMappingURL=agentPolicy.js.map