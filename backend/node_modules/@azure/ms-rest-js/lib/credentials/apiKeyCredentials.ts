// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpHeaders } from "../httpHeaders";
import { WebResourceLike } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";

/**
 * @interface ApiKeyCredentialOptions
 * Describes the options to be provided while creating an instance of ApiKeyCredentials
 */
export interface ApiKeyCredentialOptions {
  /**
   * A key value pair of the header parameters that need to be applied to the request.
   */
  inHeader?: { [x: string]: any };
  /**
   * A key value pair of the query parameters that need to be applied to the request.
   */
  inQuery?: { [x: string]: any };
}

/**
 * Authenticates to a service using an API key.
 */
export class ApiKeyCredentials implements ServiceClientCredentials {
  /**
   * A key value pair of the header parameters that need to be applied to the request.
   */
  private readonly inHeader?: { [x: string]: any };
  /**
   * A key value pair of the query parameters that need to be applied to the request.
   */
  private readonly inQuery?: { [x: string]: any };

  /**
   * @constructor
   * @param {object} options   Specifies the options to be provided for auth. Either header or query needs to be provided.
   */
  constructor(options: ApiKeyCredentialOptions) {
    if (!options || (options && !options.inHeader && !options.inQuery)) {
      throw new Error(
        `options cannot be null or undefined. Either "inHeader" or "inQuery" property of the options object needs to be provided.`
      );
    }
    this.inHeader = options.inHeader;
    this.inQuery = options.inQuery;
  }

  /**
   * Signs a request with the values provided in the inHeader and inQuery parameter.
   *
   * @param {WebResource} webResource The WebResource to be signed.
   * @returns {Promise<WebResource>} The signed request object.
   */
  signRequest(webResource: WebResourceLike): Promise<WebResourceLike> {
    if (!webResource) {
      return Promise.reject(
        new Error(`webResource cannot be null or undefined and must be of type "object".`)
      );
    }

    if (this.inHeader) {
      if (!webResource.headers) {
        webResource.headers = new HttpHeaders();
      }
      for (const headerName in this.inHeader) {
        webResource.headers.set(headerName, this.inHeader[headerName]);
      }
    }

    if (this.inQuery) {
      if (!webResource.url) {
        return Promise.reject(new Error(`url cannot be null in the request object.`));
      }
      if (webResource.url.indexOf("?") < 0) {
        webResource.url += "?";
      }
      for (const key in this.inQuery) {
        if (!webResource.url.endsWith("?")) {
          webResource.url += "&";
        }
        webResource.url += `${key}=${this.inQuery[key]}`;
      }
    }

    return Promise.resolve(webResource);
  }
}
