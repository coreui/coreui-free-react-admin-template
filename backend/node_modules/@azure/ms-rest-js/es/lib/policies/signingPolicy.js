// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { BaseRequestPolicy, } from "./requestPolicy";
export function signingPolicy(authenticationProvider) {
    return {
        create: function (nextPolicy, options) {
            return new SigningPolicy(nextPolicy, options, authenticationProvider);
        },
    };
}
var SigningPolicy = /** @class */ (function (_super) {
    __extends(SigningPolicy, _super);
    function SigningPolicy(nextPolicy, options, authenticationProvider) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.authenticationProvider = authenticationProvider;
        return _this;
    }
    SigningPolicy.prototype.signRequest = function (request) {
        return this.authenticationProvider.signRequest(request);
    };
    SigningPolicy.prototype.sendRequest = function (request) {
        var _this = this;
        return this.signRequest(request).then(function (nextRequest) {
            return _this._nextPolicy.sendRequest(nextRequest);
        });
    };
    return SigningPolicy;
}(BaseRequestPolicy));
export { SigningPolicy };
//# sourceMappingURL=signingPolicy.js.map