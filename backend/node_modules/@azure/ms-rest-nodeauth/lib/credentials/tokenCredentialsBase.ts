// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Constants as MSRestConstants, WebResource } from "@azure/ms-rest-js";
import { Environment } from "@azure/ms-rest-azure-env";
import { TokenAudience } from "../util/authConstants";
import { TokenClientCredentials } from "./tokenClientCredentials";
import {
  TokenResponse,
  AuthenticationContext,
  MemoryCache,
  ErrorResponse,
  TokenCache
} from "adal-node";

export abstract class TokenCredentialsBase implements TokenClientCredentials {
  public authContext: AuthenticationContext;

  public constructor(
    public readonly clientId: string,
    public domain: string,
    public readonly tokenAudience?: TokenAudience,
    public readonly environment: Environment = Environment.AzureCloud,
    public tokenCache: TokenCache = new MemoryCache()
  ) {
    if (!clientId || typeof clientId.valueOf() !== "string") {
      throw new Error("clientId must be a non empty string.");
    }

    if (!domain || typeof domain.valueOf() !== "string") {
      throw new Error("domain must be a non empty string.");
    }

    if (this.tokenAudience === "graph" && this.domain.toLowerCase() === "common") {
      throw new Error(
        `${'If the tokenAudience is specified as "graph" then "domain" cannot be defaulted to "common" tenant.\
        It must be the actual tenant (preferably a string in a guid format).'}`
      );
    }

    const authorityUrl = this.environment.activeDirectoryEndpointUrl + this.domain;
    this.authContext = new AuthenticationContext(
      authorityUrl,
      this.environment.validateAuthority,
      this.tokenCache
    );
  }

  public setDomain(domain: string): void {
    this.domain = domain;
    const authorityUrl = this.environment.activeDirectoryEndpointUrl + this.domain;
    this.authContext = new AuthenticationContext(
      authorityUrl,
      this.environment.validateAuthority,
      this.tokenCache
    );
  }

  protected getActiveDirectoryResourceId(): string {
    let resource = this.environment.activeDirectoryResourceId;
    if (this.tokenAudience) {
      resource = this.tokenAudience;
      if (this.tokenAudience.toLowerCase() === "graph") {
        resource = this.environment.activeDirectoryGraphResourceId as string;
      } else if (this.tokenAudience.toLowerCase() === "batch") {
        resource = this.environment.batchResourceId as string;
      }
    }
    return resource;
  }

  protected getTokenFromCache(username?: string): Promise<TokenResponse> {
    const self = this;
    const resource = this.getActiveDirectoryResourceId();

    return new Promise<TokenResponse>((resolve, reject) => {
      self.authContext.acquireToken(
        resource,
        username!,
        self.clientId,
        (error: Error, tokenResponse: TokenResponse | ErrorResponse) => {
          if (error) {
            return reject(error);
          }

          if (tokenResponse.error || tokenResponse.errorDescription) {
            return reject(tokenResponse);
          }

          return resolve(tokenResponse as TokenResponse);
        }
      );
    });
  }

  /**
   * Tries to get the token from cache initially. If that is unsuccessful then it tries to get the token from ADAL.
   *
   * @returns The tokenResponse (tokenType and accessToken are the two important properties).
   */
  public abstract async getToken(): Promise<TokenResponse>;

  /**
   * Signs a request with the Authentication header.
   *
   * @param webResource - The WebResource to be signed.
   */
  public async signRequest(webResource: WebResource): Promise<WebResource> {
    const tokenResponse = await this.getToken();
    webResource.headers.set(
      MSRestConstants.HeaderConstants.AUTHORIZATION,
      `${tokenResponse.tokenType} ${tokenResponse.accessToken}`
    );
    return webResource;
  }
}
