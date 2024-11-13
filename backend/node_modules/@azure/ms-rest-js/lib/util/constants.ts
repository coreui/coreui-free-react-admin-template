// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export const Constants = {
  /**
   * The ms-rest version
   * @const
   * @type {string}
   */
  msRestVersion: "2.7.0",

  /**
   * Specifies HTTP.
   *
   * @const
   * @type {string}
   */
  HTTP: "http:",

  /**
   * Specifies HTTPS.
   *
   * @const
   * @type {string}
   */
  HTTPS: "https:",

  /**
   * Specifies HTTP Proxy.
   *
   * @const
   * @type {string}
   */
  HTTP_PROXY: "HTTP_PROXY",

  /**
   * Specifies HTTPS Proxy.
   *
   * @const
   * @type {string}
   */
  HTTPS_PROXY: "HTTPS_PROXY",

  /**
   * Specifies NO Proxy.
   */
  NO_PROXY: "NO_PROXY",

  /**
   * Specifies ALL Proxy.
   */
  ALL_PROXY: "ALL_PROXY",

  HttpConstants: {
    /**
     * Http Verbs
     *
     * @const
     * @enum {string}
     */
    HttpVerbs: {
      PUT: "PUT",
      GET: "GET",
      DELETE: "DELETE",
      POST: "POST",
      MERGE: "MERGE",
      HEAD: "HEAD",
      PATCH: "PATCH",
    },

    StatusCodes: {
      TooManyRequests: 429,
    },
  },

  /**
   * Defines constants for use with HTTP headers.
   */
  HeaderConstants: {
    /**
     * The Authorization header.
     *
     * @const
     * @type {string}
     */
    AUTHORIZATION: "authorization",

    AUTHORIZATION_SCHEME: "Bearer",

    /**
     * The Retry-After response-header field can be used with a 503 (Service
     * Unavailable) or 349 (Too Many Requests) responses to indicate how long
     * the service is expected to be unavailable to the requesting client.
     *
     * @const
     * @type {string}
     */
    RETRY_AFTER: "Retry-After",

    /**
     * The UserAgent header.
     *
     * @const
     * @type {string}
     */
    USER_AGENT: "User-Agent",
  },
};
