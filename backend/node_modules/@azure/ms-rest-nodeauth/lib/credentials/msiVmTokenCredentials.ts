// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { MSITokenCredentials, MSIOptions, MSITokenResponse } from "./msiTokenCredentials";
import { RequestPrepareOptions, WebResource, URLBuilder, HttpMethods } from "@azure/ms-rest-js";

/**
 * Defines the optional parameters for authentication with MSI for Virtual Machine.
 */
export interface MSIVmOptions extends MSIOptions {
  /**
   * Azure Instance Metadata Service identity endpoint.
   *
   * The default and recommended endpoint is "http://169.254.169.254/metadata/identity/oauth2/token"
   * per https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
   */
  msiEndpoint?: string;

  /**
   * The API version parameter specifies the Azure Instance Metadata Service version.
   * Use api-version=2018-02-01 (default) or higher.
   */
  apiVersion?: string;

  /**
   * HTTP method used to make HTTP request to MSI service. GET by default.
   */
  httpMethod?: HttpMethods;
  /**
   * The objectId of the managed identity you would like the token for. Required, if your
   * VM has multiple user-assigned managed identities.
   */
  objectId?: string;
  /**
   * The clientId of the managed identity you would like the token for. Required, if your
   * VM has multiple user-assigned managed identities.
   */
  clientId?: string;
  /**
   * The `Azure Resource ID` of the managed identity you would like the token for. Required,
   * if your VM has multiple user-assigned managed identities.
   */
  identityId?: string;
}

/**
 * Provides information about managed service identity token credentials on a virtual machine provisioned in Azure.
 */
export class MSIVmTokenCredentials extends MSITokenCredentials {
  msiEndpoint: string;
  apiVersion: string;
  httpMethod: HttpMethods;
  objectId?: string;
  clientId?: string;
  identityId?: string;

  constructor(options?: MSIVmOptions) {
    if (!options) options = {};
    super(options);

    if (!options.msiEndpoint) {
      options.msiEndpoint = "http://169.254.169.254/metadata/identity/oauth2/token";
    } else if (typeof options.msiEndpoint !== "string") {
      throw new Error("msiEndpoint must be a string.");
    }

    const urlBuilder = URLBuilder.parse(options.msiEndpoint);
    if (!urlBuilder.getScheme()) {
      options.msiEndpoint = `http://${options.msiEndpoint}`;
    }

    if (!options.apiVersion) {
      options.apiVersion = "2018-02-01";
    } else if (typeof options.apiVersion !== "string") {
      throw new Error("apiVersion must be a string.");
    }

    if (!options.httpMethod) {
      options.httpMethod = "GET";
    }

    this.apiVersion = options.apiVersion;
    this.msiEndpoint = options.msiEndpoint;
    this.httpMethod = options.httpMethod;
    this.objectId = options.objectId;
    this.clientId = options.clientId;
    this.identityId = options.identityId;
  }

  /**
   * Prepares and sends a POST request to a service endpoint hosted on the Azure VM, which responds with the access token.
   * @returns Promise with the tokenResponse (tokenType and accessToken are the two important properties).
   */
  async getToken(): Promise<MSITokenResponse> {
    const reqOptions = this.prepareRequestOptions();

    const opRes = await this._httpClient.sendRequest(reqOptions);
    const result = this.parseTokenResponse(opRes.bodyAsText!) as MSITokenResponse;
    if (!result.tokenType) {
      throw new Error(
        `Invalid token response, did not find tokenType. Response body is: ${opRes.bodyAsText}`
      );
    } else if (!result.accessToken) {
      throw new Error(
        `Invalid token response, did not find accessToken. Response body is: ${opRes.bodyAsText}`
      );
    }

    return result;
  }

  protected prepareRequestOptions(): WebResource {
    const reqOptions: RequestPrepareOptions = {
      url: this.msiEndpoint,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Metadata: "true"
      },
      method: this.httpMethod,
      queryParameters: {
        "api-version": this.apiVersion,
        resource: this.resource,
        object_id: this.objectId,
        client_id: this.clientId,
        mi_res_id: this.identityId
      }
    };

    const webResource = new WebResource();
    return webResource.prepare(reqOptions);
  }
}
