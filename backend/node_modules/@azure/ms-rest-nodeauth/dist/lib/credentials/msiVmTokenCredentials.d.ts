import { MSITokenCredentials, MSIOptions, MSITokenResponse } from "./msiTokenCredentials";
import { WebResource, HttpMethods } from "@azure/ms-rest-js";
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
export declare class MSIVmTokenCredentials extends MSITokenCredentials {
    msiEndpoint: string;
    apiVersion: string;
    httpMethod: HttpMethods;
    objectId?: string;
    clientId?: string;
    identityId?: string;
    constructor(options?: MSIVmOptions);
    /**
     * Prepares and sends a POST request to a service endpoint hosted on the Azure VM, which responds with the access token.
     * @returns Promise with the tokenResponse (tokenType and accessToken are the two important properties).
     */
    getToken(): Promise<MSITokenResponse>;
    protected prepareRequestOptions(): WebResource;
}
//# sourceMappingURL=msiVmTokenCredentials.d.ts.map