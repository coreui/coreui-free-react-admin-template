import { WebResource } from "@azure/ms-rest-js";
import { TokenClientCredentials, TokenResponse } from "./tokenClientCredentials";
import { LinkedSubscription } from "../subscriptionManagement/subscriptionUtils";
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
export declare class AzureCliCredentials implements TokenClientCredentials {
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
    resource: string;
    /**
     * The number of seconds within which it is good to renew the token.
     *  A constant set to 270 seconds (4.5 minutes).
     */
    private readonly _tokenRenewalMarginInSeconds;
    constructor(subscriptionInfo: LinkedSubscription, tokenInfo: CliAccessToken, resource?: string);
    /**
     * Tries to get the new token from Azure CLI, if the token has expired or the subscription has
     * changed else uses the cached accessToken.
     * @returns The tokenResponse (tokenType and accessToken are the two important properties).
     */
    getToken(): Promise<TokenResponse>;
    /**
     * Signs a request with the Authentication header.
     * @param The request to be signed.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
    private _hasTokenExpired;
    private _hasSubscriptionChanged;
    private _parseToken;
    private _isAzureResourceManagerEndpoint;
    private _hasResourceChanged;
    /**
     * Gets the access token for the default or specified subscription.
     * @param options Optional parameters that can be provided to get the access token.
     */
    static getAccessToken(options?: AccessTokenOptions): Promise<CliAccessToken>;
    /**
     * Gets the subscription from Azure CLI.
     * @param subscriptionIdOrName - The name or id of the subscription for which the information is
     * required.
     */
    static getSubscription(subscriptionIdOrName?: string): Promise<LinkedSubscription>;
    /**
     * Sets the specified subscription as the default subscription for Azure CLI.
     * @param subscriptionIdOrName The name or id of the subsciption that needs to be set as the
     * default subscription.
     */
    static setDefaultSubscription(subscriptionIdOrName: string): Promise<void>;
    /**
     * Returns a list of all the subscriptions from Azure CLI.
     * @param options Optional parameters that can be provided while listing all the subcriptions.
     */
    static listAllSubscriptions(options?: ListAllSubscriptionOptions): Promise<LinkedSubscription[]>;
    /**
     * Provides credentials that can be used by the JS SDK to interact with Azure via azure cli.
     * **Pre-requisite**
     * - **install azure-cli** . For more information see
     * {@link https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest Install Azure CLI}
     * - **login via `az login`**
     * @param options - Optional parameters that can be provided while creating AzureCliCredentials.
     */
    static create(options?: AccessTokenOptions): Promise<AzureCliCredentials>;
}
//# sourceMappingURL=azureCliCredentials.d.ts.map