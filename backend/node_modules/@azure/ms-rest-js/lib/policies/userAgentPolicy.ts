// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpHeaders } from "../httpHeaders";
import { HttpOperationResponse } from "../httpOperationResponse";
import { Constants } from "../util/constants";
import { WebResourceLike } from "../webResource";
import { getDefaultUserAgentKey, getPlatformSpecificData } from "./msRestUserAgentPolicy";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
} from "./requestPolicy";

export type TelemetryInfo = { key?: string; value?: string };

function getRuntimeInfo(): TelemetryInfo[] {
  const msRestRuntime = {
    key: "ms-rest-js",
    value: Constants.msRestVersion,
  };

  return [msRestRuntime];
}

function getUserAgentString(
  telemetryInfo: TelemetryInfo[],
  keySeparator = " ",
  valueSeparator = "/"
): string {
  return telemetryInfo
    .map((info) => {
      const value = info.value ? `${valueSeparator}${info.value}` : "";
      return `${info.key}${value}`;
    })
    .join(keySeparator);
}

export const getDefaultUserAgentHeaderName = getDefaultUserAgentKey;

export function getDefaultUserAgentValue(): string {
  const runtimeInfo = getRuntimeInfo();
  const platformSpecificData = getPlatformSpecificData();
  const userAgent = getUserAgentString(runtimeInfo.concat(platformSpecificData));
  return userAgent;
}

export function userAgentPolicy(userAgentData?: TelemetryInfo): RequestPolicyFactory {
  const key: string =
    !userAgentData || userAgentData.key == undefined ? getDefaultUserAgentKey() : userAgentData.key;
  const value: string =
    !userAgentData || userAgentData.value == undefined
      ? getDefaultUserAgentValue()
      : userAgentData.value;

  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new UserAgentPolicy(nextPolicy, options, key, value);
    },
  };
}

export class UserAgentPolicy extends BaseRequestPolicy {
  constructor(
    readonly _nextPolicy: RequestPolicy,
    readonly _options: RequestPolicyOptionsLike,
    protected headerKey: string,
    protected headerValue: string
  ) {
    super(_nextPolicy, _options);
  }

  sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    this.addUserAgentHeader(request);
    return this._nextPolicy.sendRequest(request);
  }

  addUserAgentHeader(request: WebResourceLike): void {
    if (!request.headers) {
      request.headers = new HttpHeaders();
    }

    if (!request.headers.get(this.headerKey) && this.headerValue) {
      request.headers.set(this.headerKey, this.headerValue);
    }
  }
}
