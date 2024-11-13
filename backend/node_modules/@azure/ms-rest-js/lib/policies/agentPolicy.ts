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

export function agentPolicy(agentSettings?: AgentSettings): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new AgentPolicy(nextPolicy, options, agentSettings!);
    },
  };
}

export class AgentPolicy extends BaseRequestPolicy {
  agentSettings: AgentSettings;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    agentSettings: AgentSettings
  ) {
    super(nextPolicy, options);
    this.agentSettings = agentSettings;
  }

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (!request.agentSettings) {
      request.agentSettings = this.agentSettings;
    }
    return this._nextPolicy.sendRequest(request);
  }
}
