import { MSITokenCredentials, MSIOptions, MSITokenResponse } from "./msiTokenCredentials";
import { WebResource } from "@azure/ms-rest-js";
/**
 * Defines the optional parameters for authentication with MSI for AppService.
 */
export interface MSIAppServiceOptions extends MSIOptions {
    /**
     * The local URL from which your app can request tokens.
     * Unless this property is specified, any of the two environment variables `IDENTITY_ENDPOINT` or `MSI_ENDPOINT` will be used as the default value.
     */
    msiEndpoint?: string;
    /**
     * The secret used in communication between your code and the local MSI agent.
     * Unless this property is specified, any of the two environment variables `IDENTITY_SECRET` or `MSI_SECRET` will be used as the default value.
     */
    msiSecret?: string;
    /**
     * The api-version of the local MSI agent. Default value is "2017-09-01".
     */
    msiApiVersion?: string;
    /**
     * The clientId of the managed identity you would like the token for. Required, if
     * your app service has user-assigned managed identities.
     */
    clientId?: string;
}
/**
 * Provides information about managed service identity token credentials in an App Service environment.
 */
export declare class MSIAppServiceTokenCredentials extends MSITokenCredentials {
    /**
     * The local URL from which your app can request tokens.
     * Unless this property is specified, any of the two environment variables `IDENTITY_ENDPOINT` or `MSI_ENDPOINT` will be used as the default value.
     */
    msiEndpoint: string;
    /**
     * The secret used in communication between your code and the local MSI agent.
     * Unless this property is specified, any of the two environment variables `IDENTITY_SECRET` or `MSI_SECRET` will be used as the default value.
     */
    msiSecret: string;
    /**
     * The api-version of the local MSI agent. Default value is "2017-09-01".
     */
    msiApiVersion?: string;
    /**
     * The clientId of the managed identity you would like the token for. Required, if
     * your app service has user-assigned managed identities.
     */
    clientId?: string;
    /**
     * Creates an instance of MSIAppServiceTokenCredentials.
     * @param options.msiEndpoint - The local URL from which your app can request tokens.
     * Unless this property is specified, any of the two environment variables `IDENTITY_ENDPOINT` or `MSI_ENDPOINT` will be used as the default value.
     * @param options.msiSecret - The secret used in communication between your code and the local MSI agent.
     * Unless this property is specified, any of the two environment variables `IDENTITY_SECRET` or `MSI_SECRET` will be used as the default value.
     * @param options.resource - The resource uri or token audience for which the token is needed.
     * For e.g. it can be:
     * - resource management endpoint "https://management.azure.com/" (default)
     * - management endpoint "https://management.core.windows.net/"
     * @param options.msiApiVersion - The api-version of the local MSI agent. Default value is "2017-09-01".
     * @param options.clientId - The clientId of the managed identity you would like the token for. Required, if
     * your app service has user-assigned managed identities.
     */
    constructor(options?: MSIAppServiceOptions);
    /**
     * Prepares and sends a GET request to a service endpoint indicated by the app service, which responds with the access token.
     * @returns Promise with the tokenResponse (tokenType and accessToken are the two important properties).
     */
    getToken(): Promise<MSITokenResponse>;
    protected prepareRequestOptions(): WebResource;
}
//# sourceMappingURL=msiAppServiceTokenCredentials.d.ts.map