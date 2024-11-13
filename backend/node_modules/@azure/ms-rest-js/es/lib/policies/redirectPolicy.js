// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { URLBuilder } from "../url";
import { BaseRequestPolicy, } from "./requestPolicy";
export var DefaultRedirectOptions = {
    handleRedirects: true,
    maxRetries: 20,
};
export function redirectPolicy(maximumRetries) {
    if (maximumRetries === void 0) { maximumRetries = 20; }
    return {
        create: function (nextPolicy, options) {
            return new RedirectPolicy(nextPolicy, options, maximumRetries);
        },
    };
}
var RedirectPolicy = /** @class */ (function (_super) {
    __extends(RedirectPolicy, _super);
    function RedirectPolicy(nextPolicy, options, maxRetries) {
        if (maxRetries === void 0) { maxRetries = 20; }
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.maxRetries = maxRetries;
        return _this;
    }
    RedirectPolicy.prototype.sendRequest = function (request) {
        var _this = this;
        return this._nextPolicy
            .sendRequest(request)
            .then(function (response) { return handleRedirect(_this, response, 0); });
    };
    return RedirectPolicy;
}(BaseRequestPolicy));
export { RedirectPolicy };
function handleRedirect(policy, response, currentRetries) {
    var request = response.request, status = response.status;
    var locationHeader = response.headers.get("location");
    if (locationHeader &&
        (status === 300 ||
            (status === 301 && ["GET", "HEAD"].includes(request.method)) ||
            (status === 302 && ["GET", "POST", "HEAD"].includes(request.method)) ||
            (status === 303 && "POST" === request.method) ||
            status === 307) &&
        ((request.redirectLimit !== undefined && currentRetries < request.redirectLimit) ||
            (request.redirectLimit === undefined && currentRetries < policy.maxRetries))) {
        var builder = URLBuilder.parse(request.url);
        builder.setPath(locationHeader);
        request.url = builder.toString();
        // POST request with Status code 302 and 303 should be converted into a
        // redirected GET request if the redirect url is present in the location header
        // reference: https://tools.ietf.org/html/rfc7231#page-57 && https://fetch.spec.whatwg.org/#http-redirect-fetch
        if ((status === 302 || status === 303) && request.method === "POST") {
            request.method = "GET";
            delete request.body;
        }
        return policy._nextPolicy
            .sendRequest(request)
            .then(function (res) { return handleRedirect(policy, res, currentRetries + 1); })
            .then(function (res) { return recordRedirect(res, request.url); });
    }
    return Promise.resolve(response);
}
function recordRedirect(response, redirect) {
    // This is called as the recursive calls to handleRedirect() unwind,
    // only record the deepest/last redirect
    if (!response.redirected) {
        response.redirected = true;
        response.url = redirect;
    }
    return response;
}
//# sourceMappingURL=redirectPolicy.js.map