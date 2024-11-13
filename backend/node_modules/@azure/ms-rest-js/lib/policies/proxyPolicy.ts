// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { ProxySettings } from "../serviceClient";
import { WebResourceLike } from "../webResource";
import { Constants } from "../util/constants";
import { URLBuilder } from "../url";

/**
 * @internal
 */
export const noProxyList: string[] = loadNoProxy();
const byPassedList: Map<string, boolean> = new Map();

/**
 * @internal
 */
export function getEnvironmentValue(name: string): string | undefined {
  if (process.env[name]) {
    return process.env[name];
  } else if (process.env[name.toLowerCase()]) {
    return process.env[name.toLowerCase()];
  }
  return undefined;
}

function loadEnvironmentProxyValue(): string | undefined {
  if (!process) {
    return undefined;
  }

  const httpsProxy = getEnvironmentValue(Constants.HTTPS_PROXY);
  const allProxy = getEnvironmentValue(Constants.ALL_PROXY);
  const httpProxy = getEnvironmentValue(Constants.HTTP_PROXY);

  return httpsProxy || allProxy || httpProxy;
}

// Check whether the host of a given `uri` is in the noProxyList.
// If there's a match, any request sent to the same host won't have the proxy settings set.
// This implementation is a port of https://github.com/Azure/azure-sdk-for-net/blob/8cca811371159e527159c7eb65602477898683e2/sdk/core/Azure.Core/src/Pipeline/Internal/HttpEnvironmentProxy.cs#L210
function isBypassed(uri: string): boolean | undefined {
  if (noProxyList.length === 0) {
    return false;
  }
  const host = URLBuilder.parse(uri).getHost()!;
  if (byPassedList.has(host)) {
    return byPassedList.get(host);
  }
  let isBypassedFlag = false;
  for (const pattern of noProxyList) {
    if (pattern[0] === ".") {
      // This should match either domain it self or any subdomain or host
      // .foo.com will match foo.com it self or *.foo.com
      if (host.endsWith(pattern)) {
        isBypassedFlag = true;
      } else {
        if (host.length === pattern.length - 1 && host === pattern.slice(1)) {
          isBypassedFlag = true;
        }
      }
    } else {
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
export function loadNoProxy(): string[] {
  const noProxy = getEnvironmentValue(Constants.NO_PROXY);
  if (noProxy) {
    return noProxy
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length);
  }

  return [];
}

/**
 * @internal
 */
function extractAuthFromUrl(
  url: string
): { username?: string; password?: string; urlWithoutAuth: string } {
  const atIndex = url.indexOf("@");
  if (atIndex === -1) {
    return { urlWithoutAuth: url };
  }

  const schemeIndex = url.indexOf("://");
  const authStart = schemeIndex !== -1 ? schemeIndex + 3 : 0;
  const auth = url.substring(authStart, atIndex);
  const colonIndex = auth.indexOf(":");
  const hasPassword = colonIndex !== -1;
  const username = hasPassword ? auth.substring(0, colonIndex) : auth;
  const password = hasPassword ? auth.substring(colonIndex + 1) : undefined;
  const urlWithoutAuth = url.substring(0, authStart) + url.substring(atIndex + 1);
  return {
    username,
    password,
    urlWithoutAuth,
  };
}

export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined {
  if (!proxyUrl) {
    proxyUrl = loadEnvironmentProxyValue();
    if (!proxyUrl) {
      return undefined;
    }
  }

  const { username, password, urlWithoutAuth } = extractAuthFromUrl(proxyUrl);
  const parsedUrl = URLBuilder.parse(urlWithoutAuth);
  const schema = parsedUrl.getScheme() ? parsedUrl.getScheme() + "://" : "";
  return {
    host: schema + parsedUrl.getHost(),
    port: Number.parseInt(parsedUrl.getPort() || "80"),
    username,
    password,
  };
}

export function proxyPolicy(proxySettings?: ProxySettings): RequestPolicyFactory {
  if (!proxySettings) {
    proxySettings = getDefaultProxySettings();
  }
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new ProxyPolicy(nextPolicy, options, proxySettings!);
    },
  };
}

export class ProxyPolicy extends BaseRequestPolicy {
  proxySettings: ProxySettings;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    proxySettings: ProxySettings
  ) {
    super(nextPolicy, options);
    this.proxySettings = proxySettings;
  }

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (!request.proxySettings && !isBypassed(request.url)) {
      request.proxySettings = this.proxySettings;
    }
    return this._nextPolicy.sendRequest(request);
  }
}
