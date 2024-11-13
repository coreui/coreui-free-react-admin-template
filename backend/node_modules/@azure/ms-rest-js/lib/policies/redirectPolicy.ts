// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { URLBuilder } from "../url";
import { WebResourceLike } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
} from "./requestPolicy";

/**
 * Options for how redirect responses are handled.
 */
export interface RedirectOptions {
  /*
   * When true, redirect responses are followed.  Defaults to true.
   */
  handleRedirects: boolean;

  /*
   * The maximum number of times the redirect URL will be tried before
   * failing.  Defaults to 20.
   */
  maxRetries?: number;
}

export const DefaultRedirectOptions: RedirectOptions = {
  handleRedirects: true,
  maxRetries: 20,
};

export function redirectPolicy(maximumRetries = 20): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new RedirectPolicy(nextPolicy, options, maximumRetries);
    },
  };
}

export class RedirectPolicy extends BaseRequestPolicy {
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    readonly maxRetries = 20
  ) {
    super(nextPolicy, options);
  }

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy
      .sendRequest(request)
      .then((response) => handleRedirect(this, response, 0));
  }
}

function handleRedirect(
  policy: RedirectPolicy,
  response: HttpOperationResponse,
  currentRetries: number
): Promise<HttpOperationResponse> {
  const { request, status } = response;
  const locationHeader = response.headers.get("location");
  if (
    locationHeader &&
    (status === 300 ||
      (status === 301 && ["GET", "HEAD"].includes(request.method)) ||
      (status === 302 && ["GET", "POST", "HEAD"].includes(request.method)) ||
      (status === 303 && "POST" === request.method) ||
      status === 307) &&
    ((request.redirectLimit !== undefined && currentRetries < request.redirectLimit) ||
      (request.redirectLimit === undefined && currentRetries < policy.maxRetries))
  ) {
    const builder = URLBuilder.parse(request.url);
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
      .then((res) => handleRedirect(policy, res, currentRetries + 1))
      .then((res) => recordRedirect(res, request.url));
  }

  return Promise.resolve(response);
}

function recordRedirect(response: HttpOperationResponse, redirect: string): HttpOperationResponse {
  // This is called as the recursive calls to handleRedirect() unwind,
  // only record the deepest/last redirect
  if (!response.redirected) {
    response.redirected = true;
    response.url = redirect;
  }
  return response;
}
