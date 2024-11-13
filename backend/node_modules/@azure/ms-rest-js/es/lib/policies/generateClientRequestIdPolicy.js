// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import * as utils from "../util/utils";
import { BaseRequestPolicy, } from "./requestPolicy";
export function generateClientRequestIdPolicy(requestIdHeaderName) {
    if (requestIdHeaderName === void 0) { requestIdHeaderName = "x-ms-client-request-id"; }
    return {
        create: function (nextPolicy, options) {
            return new GenerateClientRequestIdPolicy(nextPolicy, options, requestIdHeaderName);
        },
    };
}
var GenerateClientRequestIdPolicy = /** @class */ (function (_super) {
    __extends(GenerateClientRequestIdPolicy, _super);
    function GenerateClientRequestIdPolicy(nextPolicy, options, _requestIdHeaderName) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this._requestIdHeaderName = _requestIdHeaderName;
        return _this;
    }
    GenerateClientRequestIdPolicy.prototype.sendRequest = function (request) {
        if (!request.headers.contains(this._requestIdHeaderName)) {
            request.headers.set(this._requestIdHeaderName, utils.generateUuid());
        }
        return this._nextPolicy.sendRequest(request);
    };
    return GenerateClientRequestIdPolicy;
}(BaseRequestPolicy));
export { GenerateClientRequestIdPolicy };
//# sourceMappingURL=generateClientRequestIdPolicy.js.map