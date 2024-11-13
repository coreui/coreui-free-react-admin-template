// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ServiceClientCredentials } from "./serviceClientCredentials";
import { Constants as MSRestConstants } from "../util/constants";
import { WebResource } from "../webResource";

import { TokenCredential } from "@azure/core-auth";
import { TokenResponse } from "./tokenResponse";

const DEFAULT_AUTHORIZATION_SCHEME = "Bearer";

/**
 * Resource manager endpoints to match in order to specify a valid scope to the AzureIdentityCredentialAdapter.
 */
export const azureResourceManagerEndpoints = [
  "https://management.windows.net",
  "https://management.chinacloudapi.cn",
  "https://management.usgovcloudapi.net",
  "https://management.cloudapi.de",
];

/**
 * This class provides a simple extension to use {@link TokenCredential} from `@azure/identity` library to
 * use with legacy Azure SDKs that accept {@link ServiceClientCredentials} family of credentials for authentication.
 */
export class AzureIdentityCredentialAdapter implements ServiceClientCredentials {
  private azureTokenCredential: TokenCredential;
  private scopes: string | string[];
  constructor(
    azureTokenCredential: TokenCredential,
    scopes: string | string[] = "https://management.azure.com/.default"
  ) {
    this.azureTokenCredential = azureTokenCredential;
    this.scopes = scopes;
  }

  public async getToken(): Promise<TokenResponse> {
    const accessToken = await this.azureTokenCredential.getToken(this.scopes);
    if (accessToken !== null) {
      const result: TokenResponse = {
        accessToken: accessToken.token,
        tokenType: DEFAULT_AUTHORIZATION_SCHEME,
        expiresOn: accessToken.expiresOnTimestamp,
      };
      return result;
    } else {
      throw new Error("Could find token for scope");
    }
  }

  public async signRequest(webResource: WebResource) {
    const tokenResponse = await this.getToken();
    webResource.headers.set(
      MSRestConstants.HeaderConstants.AUTHORIZATION,
      `${tokenResponse.tokenType} ${tokenResponse.accessToken}`
    );
    return Promise.resolve(webResource);
  }
}
