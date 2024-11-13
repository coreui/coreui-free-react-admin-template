// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Constants, WebResource, HttpClient, DefaultHttpClient } from "@azure/ms-rest-js";
import { TokenClientCredentials, TokenResponse } from "./tokenClientCredentials";
import { AuthConstants } from "../util/authConstants";

/**
 * Defines the optional parameters for authentication with MSI.
 */
export interface MSIOptions {
  /**
   * @prop {string} [resource] -  The resource uri or token audience for which the token is needed.
   * For example:
   * - Defaults to Azure Resource Manager from environment: AzureCloud. "https://management.azure.com/" (default)
   * - For ServiceManagement (ASM): "https://management.core.windows.net/"
   * - For Azure KeyVault: "https://vault.azure.net"
   * - For Azure Batch: "https://batch.core.windows.net"
   * - For Azure Active Directory Graph: "https://graph.windows.net"
   */
  resource?: string;

  /**
   * The client responsible for sending HTTP requests.
   * By default it is Axios-based {@link DefaultHttpClient}.
   */
  httpClient?: HttpClient;
}

/**
 * Describes the MSITokenResponse.
 */
export interface MSITokenResponse extends TokenResponse {
  /**
   * Placeholder for unknown properties.
   */
  readonly [x: string]: any;
}

/**
 * Provides information about managed service identity token credentials.
 * This object can only be used to acquire token on a virtual machine provisioned in Azure with managed service identity.
 */
export abstract class MSITokenCredentials implements TokenClientCredentials {
  /**
   * Azure resource endpoints.
   * - Defaults to Azure Resource Manager from environment: AzureCloud. "https://management.azure.com/"
   * - For ServiceManagement (ASM): "https://management.core.windows.net/"
   * - For Azure KeyVault: "https://vault.azure.net"
   * - For Azure Batch: "https://batch.core.windows.net"
   * - For Azure Active Directory Graph: "https://graph.windows.net"
   */
  resource: string;
  protected _httpClient: HttpClient;

  /**
   * Creates an instance of MSITokenCredentials.
   * @param options - Optional parameters
   * @param options.resource - The resource uri or token audience for which the token is needed.
   * For e.g. it can be:
   * - resource management endpoint "https://management.azure.com/"(default)
   * - management endpoint "https://management.core.windows.net/"
   */
  constructor(options: MSIOptions) {
    if (!options) options = {};

    if (!options.resource) {
      options.resource = AuthConstants.RESOURCE_MANAGER_ENDPOINT;
    } else if (typeof options.resource.valueOf() !== "string") {
      throw new Error("resource must be a uri.");
    }

    this.resource = options.resource;
    this._httpClient = options.httpClient || new DefaultHttpClient();
  }

  /**
   * Parses a tokenResponse json string into a object, and converts properties on the first level to camelCase.
   * This method tries to standardize the tokenResponse
   * @param  body - A json string
   * @returns The tokenResponse (tokenType and accessToken are the two important properties).
   */
  parseTokenResponse(body: string): TokenResponse {
    // Docs show different examples of possible MSI responses for different services. https://docs.microsoft.com/en-us/azure/active-directory/managed-service-identity/overview
    // expires_on - is a Date like string in this doc
    //   - https://docs.microsoft.com/en-us/azure/app-service/app-service-managed-service-identity#rest-protocol-examples
    // In other doc it is stringified number.
    //   - https://docs.microsoft.com/en-us/azure/active-directory/managed-service-identity/tutorial-linux-vm-access-arm#get-an-access-token-using-the-vms-identity-and-use-it-to-call-resource-manager
    const parsedBody = JSON.parse(body);
    parsedBody.accessToken = parsedBody["access_token"];
    delete parsedBody["access_token"];
    parsedBody.tokenType = parsedBody["token_type"];
    delete parsedBody["token_type"];
    if (parsedBody["refresh_token"]) {
      parsedBody.refreshToken = parsedBody["refresh_token"];
      delete parsedBody["refresh_token"];
    }
    if (parsedBody["expires_in"]) {
      parsedBody.expiresIn = parsedBody["expires_in"];
      if (typeof parsedBody["expires_in"] === "string") {
        // normal number as a string '1504130527'
        parsedBody.expiresIn = parseInt(parsedBody["expires_in"], 10);
      }
      delete parsedBody["expires_in"];
    }
    if (parsedBody["not_before"]) {
      parsedBody.notBefore = parsedBody["not_before"];
      if (typeof parsedBody["not_before"] === "string") {
        // normal number as a string '1504130527'
        parsedBody.notBefore = parseInt(parsedBody["not_before"], 10);
      }
      delete parsedBody["not_before"];
    }
    if (parsedBody["expires_on"]) {
      parsedBody.expiresOn = parsedBody["expires_on"];
      if (typeof parsedBody["expires_on"] === "string") {
        // possibly a Date string '09/14/2017 00:00:00 PM +00:00'
        if (parsedBody["expires_on"].includes(":") || parsedBody["expires_on"].includes("/")) {
          parsedBody.expiresOn = new Date(parseInt(parsedBody["expires_on"], 10));
        } else {
          // normal number as a string '1504130527'
          parsedBody.expiresOn = new Date(parseInt(parsedBody["expires_on"], 10));
        }
      }
      delete parsedBody["expires_on"];
    }
    return parsedBody;
  }

  /**
   * Prepares and sends a POST request to a service endpoint hosted on the Azure VM, which responds with the access token.
   * @param  callback - The callback in the form (err, result)
   * @returns Promise with the token response.
   */
  abstract async getToken(): Promise<MSITokenResponse>;

  protected abstract prepareRequestOptions(): WebResource;

  /**
   * Signs a request with the Authentication header.
   *
   * @param webResource - The WebResource to be signed.
   * @returns Promise with signed WebResource.
   */
  public async signRequest(webResource: WebResource): Promise<WebResource> {
    const tokenResponse = await this.getToken();
    webResource.headers.set(
      Constants.HeaderConstants.AUTHORIZATION,
      `${tokenResponse.tokenType} ${tokenResponse.accessToken}`
    );
    return webResource;
  }
}
