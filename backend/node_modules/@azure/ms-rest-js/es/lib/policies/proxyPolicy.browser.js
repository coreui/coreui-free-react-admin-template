// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { BaseRequestPolicy, } from "./requestPolicy";
var proxyNotSupportedInBrowser = new Error("ProxyPolicy is not supported in browser environment");
export function getDefaultProxySettings(_proxyUrl) {
    return undefined;
}
export function proxyPolicy(_proxySettings) {
    return {
        create: function (_nextPolicy, _options) {
            throw proxyNotSupportedInBrowser;
        },
    };
}
var ProxyPolicy = /** @class */ (function (_super) {
    __extends(ProxyPolicy, _super);
    function ProxyPolicy(nextPolicy, options) {
        var _this = _super.call(this, nextPolicy, options) || this;
        throw proxyNotSupportedInBrowser;
        return _this;
    }
    ProxyPolicy.prototype.sendRequest = function (_request) {
        throw proxyNotSupportedInBrowser;
    };
    return ProxyPolicy;
}(BaseRequestPolicy));
export { ProxyPolicy };
//# sourceMappingURL=proxyPolicy.browser.js.map