// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AgentSettings } from "../serviceClient";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";

const agentNotSupportedInBrowser = new Error("AgentPolicy is not supported in browser environment");

export function agentPolicy(_agentSettings?: AgentSettings): RequestPolicyFactory {
  return {
    create: (_nextPolicy: RequestPolicy, _options: RequestPolicyOptionsLike) => {
      throw agentNotSupportedInBrowser;
    },
  };
}

export class AgentPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) {
    super(nextPolicy, options);
    throw agentNotSupportedInBrowser;
  }

  public sendRequest(_request: WebResourceLike): Promise<HttpOperationResponse> {
    throw agentNotSupportedInBrowser;
  }
}
