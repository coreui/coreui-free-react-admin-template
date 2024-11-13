import { WebResource, HttpClient } from "@azure/ms-rest-js";
import { TokenClientCredentials, TokenResponse } from "./tokenClientCredentials";
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
export declare abstract class MSITokenCredentials implements TokenClientCredentials {
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
    constructor(options: MSIOptions);
    /**
     * Parses a tokenResponse json string into a object, and converts properties on the first level to camelCase.
     * This method tries to standardize the tokenResponse
     * @param  body - A json string
     * @returns The tokenResponse (tokenType and accessToken are the two important properties).
     */
    parseTokenResponse(body: string): TokenResponse;
    /**
     * Prepares and sends a POST request to a service endpoint hosted on the Azure VM, which responds with the access token.
     * @param  callback - The callback in the form (err, result)
     * @returns Promise with the token response.
     */
    abstract getToken(): Promise<MSITokenResponse>;
    protected abstract prepareRequestOptions(): WebResource;
    /**
     * Signs a request with the Authentication header.
     *
     * @param webResource - The WebResource to be signed.
     * @returns Promise with signed WebResource.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
}
//# sourceMappingURL=msiTokenCredentials.d.ts.map