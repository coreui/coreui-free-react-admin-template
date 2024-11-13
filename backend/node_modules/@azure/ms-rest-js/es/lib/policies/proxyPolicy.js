// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { BaseRequestPolicy, } from "./requestPolicy";
import { Constants } from "../util/constants";
import { URLBuilder } from "../url";
/**
 * @internal
 */
export var noProxyList = loadNoProxy();
var byPassedList = new Map();
/**
 * @internal
 */
export function getEnvironmentValue(name) {
    if (process.env[name]) {
        return process.env[name];
    }
    else if (process.env[name.toLowerCase()]) {
        return process.env[name.toLowerCase()];
    }
    return undefined;
}
function loadEnvironmentProxyValue() {
    if (!process) {
        return undefined;
    }
    var httpsProxy = getEnvironmentValue(Constants.HTTPS_PROXY);
    var allProxy = getEnvironmentValue(Constants.ALL_PROXY);
    var httpProxy = getEnvironmentValue(Constants.HTTP_PROXY);
    return httpsProxy || allProxy || httpProxy;
}
// Check whether the host of a given `uri` is in the noProxyList.
// If there's a match, any request sent to the same host won't have the proxy settings set.
// This implementation is a port of https://github.com/Azure/azure-sdk-for-net/blob/8cca811371159e527159c7eb65602477898683e2/sdk/core/Azure.Core/src/Pipeline/Internal/HttpEnvironmentProxy.cs#L210
function isBypassed(uri) {
    if (noProxyList.length === 0) {
        return false;
    }
    var host = URLBuilder.parse(uri).getHost();
    if (byPassedList.has(host)) {
        return byPassedList.get(host);
    }
    var isBypassedFlag = false;
    for (var _i = 0, noProxyList_1 = noProxyList; _i < noProxyList_1.length; _i++) {
        var pattern = noProxyList_1[_i];
        if (pattern[0] === ".") {
            // This should match either domain it self or any subdomain or host
            // .foo.com will match foo.com it self or *.foo.com
            if (host.endsWith(pattern)) {
                isBypassedFlag = true;
            }
            else {
                if (host.length === pattern.length - 1 && host === pattern.slice(1)) {
                    isBypassedFlag = true;
                }
            }
        }
        else {
            if (host === pattern) {
                isBypassedFlag = true;
            }
        }
    }
    byPassedList.set(host, isBypassedFlag);
    return isBypassedFlag;
}
/**
 * @internal
 */
export function loadNoProxy() {
    var noProxy = getEnvironmentValue(Constants.NO_PROXY);
    if (noProxy) {
        return noProxy
            .split(",")
            .map(function (item) { return item.trim(); })
            .filter(function (item) { return item.length; });
    }
    return [];
}
/**
 * @internal
 */
function extractAuthFromUrl(url) {
    var atIndex = url.indexOf("@");
    if (atIndex === -1) {
        return { urlWithoutAuth: url };
    }
    var schemeIndex = url.indexOf("://");
    var authStart = schemeIndex !== -1 ? schemeIndex + 3 : 0;
    var auth = url.substring(authStart, atIndex);
    var colonIndex = auth.indexOf(":");
    var hasPassword = colonIndex !== -1;
    var username = hasPassword ? auth.substring(0, colonIndex) : auth;
    var password = hasPassword ? auth.substring(colonIndex + 1) : undefined;
    var urlWithoutAuth = url.substring(0, authStart) + url.substring(atIndex + 1);
    return {
        username: username,
        password: password,
        urlWithoutAuth: urlWithoutAuth,
    };
}
export function getDefaultProxySettings(proxyUrl) {
    if (!proxyUrl) {
        proxyUrl = loadEnvironmentProxyValue();
        if (!proxyUrl) {
            return undefined;
        }
    }
    var _a = extractAuthFromUrl(proxyUrl), username = _a.username, password = _a.password, urlWithoutAuth = _a.urlWithoutAuth;
    var parsedUrl = URLBuilder.parse(urlWithoutAuth);
    var schema = parsedUrl.getScheme() ? parsedUrl.getScheme() + "://" : "";
    return {
        host: schema + parsedUrl.getHost(),
        port: Number.parseInt(parsedUrl.getPort() || "80"),
        username: username,
        password: password,
    };
}
export function proxyPolicy(proxySettings) {
    if (!proxySettings) {
        proxySettings = getDefaultProxySettings();
    }
    return {
        create: function (nextPolicy, options) {
            return new ProxyPolicy(nextPolicy, options, proxySettings);
        },
    };
}
var ProxyPolicy = /** @class */ (function (_super) {
    __extends(ProxyPolicy, _super);
    function ProxyPolicy(nextPolicy, options, proxySettings) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.proxySettings = proxySettings;
        return _this;
    }
    ProxyPolicy.prototype.sendRequest = function (request) {
        if (!request.proxySettings && !isBypassed(request.url)) {
            request.proxySettings = this.proxySettings;
        }
        return this._nextPolicy.sendRequest(request);
    };
    return ProxyPolicy;
}(BaseRequestPolicy));
export { ProxyPolicy };
//# sourceMappingURL=proxyPolicy.js.map