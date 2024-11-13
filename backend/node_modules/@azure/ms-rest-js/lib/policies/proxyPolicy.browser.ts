// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ProxySettings } from "../serviceClient";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";

const proxyNotSupportedInBrowser = new Error("ProxyPolicy is not supported in browser environment");

export function getDefaultProxySettings(_proxyUrl?: string): ProxySettings | undefined {
  return undefined;
}

export function proxyPolicy(_proxySettings?: ProxySettings): RequestPolicyFactory {
  return {
    create: (_nextPolicy: RequestPolicy, _options: RequestPolicyOptionsLike) => {
      throw proxyNotSupportedInBrowser;
    },
  };
}

export class ProxyPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) {
    super(nextPolicy, options);
    throw proxyNotSupportedInBrowser;
  }

  public sendRequest(_request: WebResourceLike): Promise<HttpOperationResponse> {
    throw proxyNotSupportedInBrowser;
  }
}
