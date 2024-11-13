// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Constants as MSRestConstants, WebResource } from "@azure/ms-rest-js";
import { TokenClientCredentials, TokenResponse } from "./tokenClientCredentials";
import { LinkedSubscription } from "../subscriptionManagement/subscriptionUtils";
import { execAz } from "../login";

interface ParsedToken {
  /**
   * The token audience or the resource.
   */
  aud: string;
  [prop: string]: any;
}

/**
 * Describes the access token retrieved from Azure CLI.
 */
export interface CliAccessToken {
  /**
   * The access token for the resource
   */
  accessToken: string;
  /**
   * Time when the access token expires.
   */
  expiresOn: Date;
  /**
   * SubscriptionId associated with the token.
   */
  subscription: string;
  /**
   * tenantId associated with the token.
   */
  tenant: string;
  /**
   * The token type. example: "Bearer".
   */
  tokenType: string;
}

/**
 * Describes the options that can be provided while listing all the subscriptions/accounts via
 * Azure CLI.
 */
export interface ListAllSubscriptionOptions {
  /**
   * List all subscriptions, rather just 'Enabled' ones.
   */
  all?: boolean;
  /**
   * Retrieve up-to-date subscriptions from server.
   */
  refresh?: boolean;
}

export interface AccessTokenOptions {
  /**
   * The subscription id or name for which the access token is required.
   */
  subscriptionIdOrName?: string;
  /**
   * Azure resource endpoints.
   * - Defaults to Azure Resource Manager from environment: AzureCloud. "https://management.azure.com"
   * - For Azure KeyVault: "https://vault.azure.net"
   * - For Azure Batch: "https://batch.core.windows.net"
   * - For Azure Active Directory Graph: "https://graph.windows.net"
   *
   * To get the resource for other clouds:
   * - `az cloud list`
   */
  resource?: string;
}

/**
 * Describes the credentials by retrieving token via Azure CLI.
 */
export class AzureCliCredentials implements TokenClientCredentials {
  /**
   * Provides information about the default/current subscription for Azure CLI.
   */
  subscriptionInfo: LinkedSubscription;
  /**
   * Provides information about the access token for the corresponding subscription for Azure CLI.
   */
  tokenInfo: CliAccessToken;

  /**
   * Azure resource endpoints.
   * - Defaults to Azure Resource Manager from environment: AzureCloud. "https://management.azure.com"
   * - For Azure KeyVault: "https://vault.azure.net"
   * - For Azure Batch: "https://batch.core.windows.net"
   * - For Azure Active Directory Graph: "https://graph.windows.net"
   *
   * To get the resource for other clouds:
   * - `az cloud list`
   */
  // tslint:disable-next-line: no-inferrable-types
  resource: string = "https://management.azure.com";

  /**
   * The number of seconds within which it is good to renew the token.
   *  A constant set to 270 seconds (4.5 minutes).
   */
  private readonly _tokenRenewalMarginInSeconds: number = 270;

  constructor(
    subscriptionInfo: LinkedSubscription,
    tokenInfo: CliAccessToken,
    // tslint:disable-next-line: no-inferrable-types
    resource: string = "https://management.azure.com"
  ) {
    this.subscriptionInfo = subscriptionInfo;
    this.tokenInfo = tokenInfo;
    this.resource = resource;
  }

  /**
   * Tries to get the new token from Azure CLI, if the token has expired or the subscription has
   * changed else uses the cached accessToken.
   * @returns The tokenResponse (tokenType and accessToken are the two important properties).
   */
  public async getToken(): Promise<TokenResponse> {
    if (this._hasTokenExpired() || this._hasSubscriptionChanged() || this._hasResourceChanged()) {
      try {
        // refresh the access token
        this.tokenInfo = await AzureCliCredentials.getAccessToken({
          subscriptionIdOrName: this.subscriptionInfo.id,
          resource: this.resource
        });
      } catch (err) {
        throw new Error(
          `An error occurred while refreshing the new access ` +
            `token:${err.stderr ? err.stderr : err.message}`
        );
      }
    }
    const result: TokenResponse = {
      accessToken: this.tokenInfo.accessToken,
      tokenType: this.tokenInfo.tokenType,
      expiresOn: this.tokenInfo.expiresOn,
      tenantId: this.tokenInfo.tenant
    };
    return result;
  }

  /**
   * Signs a request with the Authentication header.
   * @param The request to be signed.
   */
  public async signRequest(webResource: WebResource): Promise<WebResource> {
    const tokenResponse = await this.getToken();
    webResource.headers.set(
      MSRestConstants.HeaderConstants.AUTHORIZATION,
      `${tokenResponse.tokenType} ${tokenResponse.accessToken}`
    );
    return webResource;
  }

  private _hasTokenExpired(): boolean {
    let result = true;
    const now = Math.floor(Date.now() / 1000);
    if (
      this.tokenInfo.expiresOn &&
      this.tokenInfo.expiresOn instanceof Date &&
      Math.floor(this.tokenInfo.expiresOn.getTime() / 1000) - now >
        this._tokenRenewalMarginInSeconds
    ) {
      result = false;
    }
    return result;
  }

  private _hasSubscriptionChanged(): boolean {
    return this.subscriptionInfo.id !== this.tokenInfo.subscription;
  }

  private _parseToken(): ParsedToken {
    try {
      const base64Url: string = this.tokenInfo.accessToken.split(".")[1];
      const base64: string = decodeURIComponent(
        Buffer.from(base64Url, "base64")
          .toString("binary")
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(base64);
    } catch (err) {
      const msg = `An error occurred while parsing the access token: ${err.stack}`;
      throw new Error(msg);
    }
  }

  private _isAzureResourceManagerEndpoint(newResource: string, currentResource: string): boolean {
    if (newResource.endsWith("/")) newResource = newResource.slice(0, -1);
    if (currentResource.endsWith("/")) currentResource = currentResource.slice(0, -1);
    return (
      (newResource === "https://management.core.windows.net" &&
        currentResource === "https://management.azure.com") ||
      (newResource === "https://management.azure.com" &&
        currentResource === "https://management.core.windows.net")
    );
  }

  private _hasResourceChanged(): boolean {
    const parsedToken: ParsedToken = this._parseToken();
    // normalize the resource string, since it is possible to
    // provide a resource without a trailing slash
    const currentResource =
      parsedToken.aud && parsedToken.aud.endsWith("/")
        ? parsedToken.aud.slice(0, -1)
        : parsedToken.aud;
    const newResource = this.resource.endsWith("/") ? this.resource.slice(0, -1) : this.resource;
    const result = this._isAzureResourceManagerEndpoint(newResource, currentResource)
      ? false
      : currentResource !== newResource;
    return result;
  }

  /**
   * Gets the access token for the default or specified subscription.
   * @param options Optional parameters that can be provided to get the access token.
   */
  static async getAccessToken(options: AccessTokenOptions = {}): Promise<CliAccessToken> {
    try {
      const cmdArguments = ["account", "get-access-token"];
      if (options.subscriptionIdOrName) {
        cmdArguments.push("-s");
        cmdArguments.push(options.subscriptionIdOrName);
      }
      if (options.resource) {
        cmdArguments.push("--resource");
        cmdArguments.push(options.resource);
      }
      const result: any = await execAz(cmdArguments);
      result.expiresOn = new Date(result.expiresOn);
      return result as CliAccessToken;
    } catch (err) {
      const message =
        `An error occurred while getting credentials from ` + `Azure CLI: ${err.stack}`;
      throw new Error(message);
    }
  }

  /**
   * Gets the subscription from Azure CLI.
   * @param subscriptionIdOrName - The name or id of the subscription for which the information is
   * required.
   */
  static async getSubscription(subscriptionIdOrName?: string): Promise<LinkedSubscription> {
    if (
      subscriptionIdOrName &&
      (typeof subscriptionIdOrName !== "string" || !subscriptionIdOrName.length)
    ) {
      throw new Error("'subscriptionIdOrName' must be a non-empty string.");
    }
    try {
      const cmdArguments = ["account", "show"];
      if (subscriptionIdOrName) {
        cmdArguments.push("-s");
        cmdArguments.push(subscriptionIdOrName);
      }
      const result: LinkedSubscription = await execAz(cmdArguments);
      return result;
    } catch (err) {
      const message =
        `An error occurred while getting information about the current subscription from ` +
        `Azure CLI: ${err.stack}`;
      throw new Error(message);
    }
  }

  /**
   * Sets the specified subscription as the default subscription for Azure CLI.
   * @param subscriptionIdOrName The name or id of the subsciption that needs to be set as the
   * default subscription.
   */
  static async setDefaultSubscription(subscriptionIdOrName: string): Promise<void> {
    try {
      await execAz(["account", "set", "-s", subscriptionIdOrName]);
    } catch (err) {
      const message =
        `An error occurred while setting the current subscription from ` +
        `Azure CLI: ${err.stack}`;
      throw new Error(message);
    }
  }

  /**
   * Returns a list of all the subscriptions from Azure CLI.
   * @param options Optional parameters that can be provided while listing all the subcriptions.
   */
  static async listAllSubscriptions(
    options: ListAllSubscriptionOptions = {}
  ): Promise<LinkedSubscription[]> {
    let subscriptionList: any[] = [];
    try {
      const cmdArguments = ["account", "list"];
      if (options.all) {
        cmdArguments.push(" --all");
      }
      if (options.refresh) {
        cmdArguments.push("--refresh");
      }
      subscriptionList = await execAz(cmdArguments);
      if (subscriptionList && subscriptionList.length) {
        for (const sub of subscriptionList) {
          if (sub.cloudName) {
            sub.environmentName = sub.cloudName;
            delete sub.cloudName;
          }
        }
      }
      return subscriptionList;
    } catch (err) {
      const message =
        `An error occurred while getting a list of all the subscription from ` +
        `Azure CLI: ${err.stack}`;
      throw new Error(message);
    }
  }

  /**
   * Provides credentials that can be used by the JS SDK to interact with Azure via azure cli.
   * **Pre-requisite**
   * - **install azure-cli** . For more information see
   * {@link https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest Install Azure CLI}
   * - **login via `az login`**
   * @param options - Optional parameters that can be provided while creating AzureCliCredentials.
   */
  static async create(options: AccessTokenOptions = {}): Promise<AzureCliCredentials> {
    const [subscriptinInfo, accessToken] = await Promise.all([
      AzureCliCredentials.getSubscription(options.subscriptionIdOrName),
      AzureCliCredentials.getAccessToken(options)
    ]);
    return new AzureCliCredentials(subscriptinInfo, accessToken, options.resource);
  }
}
