// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptionsLike,
  RequestPolicyFactory,
} from "./requestPolicy";
import { WebResourceLike } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";
import { Constants } from "../util/constants";
import { delay } from "../util/utils";

const StatusCodes = Constants.HttpConstants.StatusCodes;
const DEFAULT_RETRY_COUNT = 3;

/**
 * Options that control how to retry on response status code 429.
 */
export interface ThrottlingRetryOptions {
  /**
   * The maximum number of retry attempts.  Defaults to 3.
   */
  maxRetries?: number;
}

export function throttlingRetryPolicy(
  maxRetries: number = DEFAULT_RETRY_COUNT
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new ThrottlingRetryPolicy(nextPolicy, options, maxRetries);
    },
  };
}

/**
 * To learn more, please refer to
 * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
 * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
 * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 */
export class ThrottlingRetryPolicy extends BaseRequestPolicy {
  private retryLimit: number;

  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, retryLimit: number) {
    super(nextPolicy, options);
    this.retryLimit = retryLimit;
  }

  public async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(httpRequest.clone()).then((response) => {
      return this.retry(httpRequest, response, 0);
    });
  }

  private async retry(
    httpRequest: WebResourceLike,
    httpResponse: HttpOperationResponse,
    retryCount: number
  ): Promise<HttpOperationResponse> {
    if (httpResponse.status !== StatusCodes.TooManyRequests) {
      return httpResponse;
    }

    const retryAfterHeader: string | undefined = httpResponse.headers.get(
      Constants.HeaderConstants.RETRY_AFTER
    );

    if (retryAfterHeader && retryCount < this.retryLimit) {
      const delayInMs: number | undefined = ThrottlingRetryPolicy.parseRetryAfterHeader(
        retryAfterHeader
      );
      if (delayInMs) {
        await delay(delayInMs);
        const res = await this._nextPolicy.sendRequest(httpRequest);
        return this.retry(httpRequest, res, retryCount + 1);
      }
    }

    return httpResponse;
  }

  public static parseRetryAfterHeader(headerValue: string): number | undefined {
    const retryAfterInSeconds = Number(headerValue);
    if (Number.isNaN(retryAfterInSeconds)) {
      return ThrottlingRetryPolicy.parseDateRetryAfterHeader(headerValue);
    } else {
      return retryAfterInSeconds * 1000;
    }
  }

  public static parseDateRetryAfterHeader(headerValue: string): number | undefined {
    try {
      const now: number = Date.now();
      const date: number = Date.parse(headerValue);
      const diff = date - now;

      return Number.isNaN(diff) ? undefined : diff;
    } catch (error) {
      return undefined;
    }
  }
}
