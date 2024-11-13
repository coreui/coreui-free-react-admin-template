// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as tunnel from "tunnel";
import { URLBuilder } from "./url";
export function createProxyAgent(requestUrl, proxySettings, headers) {
    var tunnelOptions = {
        proxy: {
            host: URLBuilder.parse(proxySettings.host).getHost(),
            port: proxySettings.port,
            headers: (headers && headers.rawHeaders()) || {},
        },
    };
    if (proxySettings.username && proxySettings.password) {
        tunnelOptions.proxy.proxyAuth = proxySettings.username + ":" + proxySettings.password;
    }
    else if (proxySettings.username) {
        tunnelOptions.proxy.proxyAuth = "" + proxySettings.username;
    }
    var requestScheme = URLBuilder.parse(requestUrl).getScheme() || "";
    var isRequestHttps = requestScheme.toLowerCase() === "https";
    var proxyScheme = URLBuilder.parse(proxySettings.host).getScheme() || "";
    var isProxyHttps = proxyScheme.toLowerCase() === "https";
    var proxyAgent = {
        isHttps: isRequestHttps,
        agent: createTunnel(isRequestHttps, isProxyHttps, tunnelOptions),
    };
    return proxyAgent;
}
export function createTunnel(isRequestHttps, isProxyHttps, tunnelOptions) {
    if (isRequestHttps && isProxyHttps) {
        return tunnel.httpsOverHttps(tunnelOptions);
    }
    else if (isRequestHttps && !isProxyHttps) {
        return tunnel.httpsOverHttp(tunnelOptions);
    }
    else if (!isRequestHttps && isProxyHttps) {
        return tunnel.httpOverHttps(tunnelOptions);
    }
    else {
        return tunnel.httpOverHttp(tunnelOptions);
    }
}
//# sourceMappingURL=proxyAgent.js.map