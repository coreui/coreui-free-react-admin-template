// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as http from "http";
import * as https from "https";
import * as tunnel from "tunnel";

import { ProxySettings } from "./serviceClient";
import { URLBuilder } from "./url";
import { HttpHeadersLike } from "./httpHeaders";

export type ProxyAgent = { isHttps: boolean; agent: http.Agent | https.Agent };
export function createProxyAgent(
  requestUrl: string,
  proxySettings: ProxySettings,
  headers?: HttpHeadersLike
): ProxyAgent {
  const tunnelOptions: tunnel.HttpsOverHttpsOptions = {
    proxy: {
      host: URLBuilder.parse(proxySettings.host).getHost() as string,
      port: proxySettings.port,
      headers: (headers && headers.rawHeaders()) || {},
    },
  };

  if (proxySettings.username && proxySettings.password) {
    tunnelOptions.proxy!.proxyAuth = `${proxySettings.username}:${proxySettings.password}`;
  } else if (proxySettings.username) {
    tunnelOptions.proxy!.proxyAuth = `${proxySettings.username}`;
  }

  const requestScheme = URLBuilder.parse(requestUrl).getScheme() || "";
  const isRequestHttps = requestScheme.toLowerCase() === "https";
  const proxyScheme = URLBuilder.parse(proxySettings.host).getScheme() || "";
  const isProxyHttps = proxyScheme.toLowerCase() === "https";

  const proxyAgent = {
    isHttps: isRequestHttps,
    agent: createTunnel(isRequestHttps, isProxyHttps, tunnelOptions),
  };

  return proxyAgent;
}

// Duplicate tunnel.HttpsOverHttpsOptions to avoid exporting createTunnel() with dependency on @types/tunnel
// createIunnel() is only imported by tests.
export interface HttpsProxyOptions {
  host: string;
  port: number;
  localAddress?: string;
  proxyAuth?: string;
  headers?: { [key: string]: any };
  ca?: Buffer[];
  servername?: string;
  key?: Buffer;
  cert?: Buffer;
}

interface HttpsOverHttpsOptions {
  maxSockets?: number;
  ca?: Buffer[];
  key?: Buffer;
  cert?: Buffer;
  proxy?: HttpsProxyOptions;
}

export function createTunnel(
  isRequestHttps: boolean,
  isProxyHttps: boolean,
  tunnelOptions: HttpsOverHttpsOptions
): http.Agent | https.Agent {
  if (isRequestHttps && isProxyHttps) {
    return tunnel.httpsOverHttps(tunnelOptions);
  } else if (isRequestHttps && !isProxyHttps) {
    return tunnel.httpsOverHttp(tunnelOptions);
  } else if (!isRequestHttps && isProxyHttps) {
    return tunnel.httpOverHttps(tunnelOptions);
  } else {
    return tunnel.httpOverHttp(tunnelOptions);
  }
}
