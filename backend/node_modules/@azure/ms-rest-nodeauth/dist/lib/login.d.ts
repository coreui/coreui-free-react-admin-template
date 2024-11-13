import * as adal from "adal-node";
import { Environment } from "@azure/ms-rest-azure-env";
import { TokenCredentialsBase } from "./credentials/tokenCredentialsBase";
import { ApplicationTokenCredentials } from "./credentials/applicationTokenCredentials";
import { ApplicationTokenCertificateCredentials } from "./credentials/applicationTokenCertificateCredentials";
import { DeviceTokenCredentials } from "./credentials/deviceTokenCredentials";
import { UserTokenCredentials } from "./credentials/userTokenCredentials";
import { TokenAudience } from "./util/authConstants";
import { LinkedSubscription } from "./subscriptionManagement/subscriptionUtils";
import { MSIVmTokenCredentials, MSIVmOptions } from "./credentials/msiVmTokenCredentials";
import { MSIAppServiceTokenCredentials, MSIAppServiceOptions } from "./credentials/msiAppServiceTokenCredentials";
/**
 * Describes optional parameters for servicePrincipal/secret authentication.
 */
export interface AzureTokenCredentialsOptions {
    /**
     * The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
     * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferably in a guid format).
     */
    tokenAudience?: TokenAudience;
    /**
     * The Azure environment to authenticate with.
     */
    environment?: Environment;
    /**
     * The token cache. Default value is MemoryCache from adal.
     */
    tokenCache?: adal.TokenCache;
}
/**
 * Describes optional parameters for username/password authentication.
 */
export interface LoginWithUsernamePasswordOptions extends AzureTokenCredentialsOptions {
    /**
     * The active directory application client id.
     * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
     * for an example.
     */
    clientId?: string;
    /**
     * The domain or tenant Id containing this application. Default value is "common".
     */
    domain?: string;
}
/**
 * Describes optional parameters for interactive authentication.
 */
export interface InteractiveLoginOptions extends LoginWithUsernamePasswordOptions {
    /**
     * A logger that logs the user code response message required for interactive login. When
     * this option is specified the usercode response message will not be logged to console.
     */
    userCodeResponseLogger?: any;
    /**
     * The language code specifying how the message should be localized to. Default value "en-us".
     */
    language?: string;
}
/**
 * Describes the authentication response.
 */
export interface AuthResponse<T extends TokenCredentialsBase = TokenCredentialsBase> {
    /**
     *  The credentials object.
     */
    credentials: T;
    /**
     * List of associated subscriptions. It will be empty for personal accounts, unless the login method is called with a tenant Id sent as the `domain` optional parameter.
     */
    subscriptions?: LinkedSubscription[];
}
/**
 * Describes optional parameters for login withAuthFile.
 */
export interface LoginWithAuthFileOptions {
    /**
     * Absolute file path to the auth file. If not provided
     * then please set the environment variable AZURE_AUTH_LOCATION.
     */
    filePath?: string;
    /**
     * The subscriptionId environment variable
     * name. Default is "AZURE_SUBSCRIPTION_ID".
     */
    subscriptionEnvVariableName?: string;
}
/**
 * Generic callback type definition.
 *
 * The error occurred if any, while executing the request; otherwise undefined
 * Result when call was successful.
 */
export declare type Callback<TResult> = (error?: Error, result?: TResult) => void;
/**
 * Provides a UserTokenCredentials object and the list of subscriptions associated with that userId across all the applicable tenants.
 * This method is applicable only for organizational ids that are not 2FA enabled otherwise please use interactive login.
 *
 * When using personal accounts, the `domain` property in the `options` parameter is required to be set to the Id of a tenant for that account. Otherwise, the resulting credential will not be able to access the account's resources.
 *
 * @param username - The user name for the Organization Id account.
 * @param password - The password for the Organization Id account.
 * @param options - Object representing optional parameters.
 * @param options.clientId - The active directory application client id.
 * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
 * for an example.
 * @param options.tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
 * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferably in a guid format).
 * @param options.domain - The domain or tenant Id containing this application. Default value "common".
 * @param options.environment - The azure environment to authenticate with.
 * @param options.tokenCache - The token cache. Default value is the MemoryCache object from adal.
 *
 * @returns A Promise that resolves to AuthResponse, which contains `credentials` and an optional `subscriptions` array, and rejects with an Error.
 */
export declare function withUsernamePasswordWithAuthResponse(username: string, password: string, options?: LoginWithUsernamePasswordOptions): Promise<AuthResponse<UserTokenCredentials>>;
/**
 * Provides an ApplicationTokenCredentials object and the list of subscriptions associated with that servicePrincipalId/clientId across all the applicable tenants.
 *
 * When using personal accounts, the `domain` parameter is required to be set to the Id of a tenant for that account. Otherwise, the resulting credential will not be able to access the account's resources.
 *
 * @param clientId - The active directory application client Id also known as the SPN (ServicePrincipal Name).
 * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
 * for an example.
 * @param secret - The application secret for the service principal.
 * @param domain - The domain or tenant Id containing this application.
 * @param options - Object representing optional parameters.
 * @param options.tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
 * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferably in a guid format).
 * @param options.environment - The azure environment to authenticate with.
 * @param options.tokenCache - The token cache. Default value is the MemoryCache object from adal.
 *
 * @returns A Promise that resolves to AuthResponse, which contains "credentials" and optional "subscriptions" array and rejects with an Error.
 */
export declare function withServicePrincipalSecretWithAuthResponse(clientId: string, secret: string, domain: string, options?: AzureTokenCredentialsOptions): Promise<AuthResponse<ApplicationTokenCredentials>>;
/**
 * Provides an ApplicationTokenCertificateCredentials object and the list of subscriptions associated with that servicePrincipalId/clientId across all the applicable tenants.
 *
 * When using personal accounts, the `domain` parameter is required to be set to the Id of a tenant for that account. Otherwise, the resulting credential will not be able to access the account's resources.
 *
 * @param clientId - The active directory application client Id also known as the SPN (ServicePrincipal Name).
 * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
 * for an example.
 * @param certificateStringOrFilePath - A PEM encoded certificate and private key OR an absolute filepath to the .pem file containing that information. For example:
 * - CertificateString: "-----BEGIN PRIVATE KEY-----\n<xxxxx>\n-----END PRIVATE KEY-----\n-----BEGIN CERTIFICATE-----\n<yyyyy>\n-----END CERTIFICATE-----\n"
 * - CertificateFilePath: **Absolute** file path of the .pem file.
 * @param domain - The domain or tenant Id containing this application.
 * @param options - Object representing optional parameters.
 * @param options.tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
 * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferably in a guid format).
 * @param options.environment - The azure environment to authenticate with.
 * @param options.tokenCache - The token cache. Default value is the MemoryCache object from adal.
 *
 * @returns A Promise that resolves to AuthResponse, which contains "credentials" and optional "subscriptions" array and rejects with an Error.
 */
export declare function withServicePrincipalCertificateWithAuthResponse(clientId: string, certificateStringOrFilePath: string, domain: string, options?: AzureTokenCredentialsOptions): Promise<AuthResponse<ApplicationTokenCertificateCredentials>>;
/**
 * Before using this method please install az cli from https://github.com/Azure/azure-cli/releases. Then execute `az ad sp create-for-rbac --sdk-auth > ${yourFilename.json}`.
 * If you want to create the sp for a different cloud/environment then please execute:
 * 1. az cloud list
 * 2. az cloud set –n <name of the environment>
 * 3. az ad sp create-for-rbac --sdk-auth > auth.json // create sp with secret
 *  **OR**
 * 3. az ad sp create-for-rbac --create-cert --sdk-auth > auth.json // create sp with certificate
 * If the service principal is already created then login with service principal info:
 * 4. az login --service-principal -u <clientId> -p <clientSecret> -t <tenantId>
 * 5. az account show --sdk-auth > auth.json
 *
 * Authenticates using the service principal information provided in the auth file. This method will set
 * the subscriptionId from the auth file to the user provided environment variable in the options
 * parameter or the default "AZURE_SUBSCRIPTION_ID".
 *
 * @param options - Optional parameters
 * @param options.filePath - Absolute file path to the auth file. If not provided
 * then please set the environment variable AZURE_AUTH_LOCATION.
 * @param options.subscriptionEnvVariableName - The subscriptionId environment variable
 * name. Default is "AZURE_SUBSCRIPTION_ID".
 * @param optionalCallback - The optional callback.
 *
 * @returns A Promise that resolves to AuthResponse, which contains "credentials" and optional "subscriptions" array and rejects with an Error.
 */
export declare function withAuthFileWithAuthResponse(options?: LoginWithAuthFileOptions): Promise<AuthResponse<ApplicationTokenCredentials | ApplicationTokenCertificateCredentials>>;
/**
 * Provides a url and code that needs to be copy and pasted in a browser and authenticated over there. If successful, the user will get a DeviceTokenCredentials object and the list of subscriptions associated with that userId across all the applicable tenants.
 *
 * When using personal accounts, the `domain` property in the `options` parameter is required to be set to the Id of a tenant for that account. Otherwise, the resulting credential will not be able to access the account's resources.
 *
 * @param options - Object representing optional parameters.
 *
 * @param options.clientId - The active directory application client id.
 * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
 * for an example.
 *
 * @param options.tokenAudience - The audience for which the token is requested. Valid value is "graph".If tokenAudience is provided
 * then domain should also be provided its value should not be the default "common" tenant. It must be a string (preferably in a guid format).
 *
 * @param options.domain - The domain or tenant Id containing this application. Default value is "common".
 *
 * @param options.environment - The azure environment to authenticate with. Default environment is "Public Azure".
 *
 * @param options.tokenCache - The token cache. Default value is the MemoryCache object from adal.
 *
 * @param options.language - The language code specifying how the message should be localized to. Default value "en-us".
 *
 * @param options.userCodeResponseLogger - A logger that logs the user code response message required for interactive login. When
 * this option is specified the usercode response message will not be logged to console.
 *
 * @param optionalCallback - The optional callback.
 *
 * @returns A Promise that resolves to AuthResponse, which contains "credentials" and optional "subscriptions" array and rejects with an Error.
 */
export declare function withInteractiveWithAuthResponse(options?: InteractiveLoginOptions): Promise<AuthResponse<DeviceTokenCredentials>>;
/**
 * Before using this method please install az cli from https://github.com/Azure/azure-cli/releases. Then execute `az ad sp create-for-rbac --sdk-auth > ${yourFilename.json}`.
 * If you want to create the sp for a different cloud/environment then please execute:
 * 1. az cloud list
 * 2. az cloud set –n <name of the environment>
 * 3. az ad sp create-for-rbac --sdk-auth > auth.json // create sp with secret
 *  **OR**
 * 3. az ad sp create-for-rbac --create-cert --sdk-auth > auth.json // create sp with certificate
 * If the service principal is already created then login with service principal info:
 * 4. az login --service-principal -u <clientId> -p <clientSecret> -t <tenantId>
 * 5. az account show --sdk-auth > auth.json
 *
 * Authenticates using the service principal information provided in the auth file. This method will set
 * the subscriptionId from the auth file to the user provided environment variable in the options
 * parameter or the default "AZURE_SUBSCRIPTION_ID".
 *
 * @param options - Optional parameters
 * @param options.filePath - Absolute file path to the auth file. If not provided
 * then please set the environment variable AZURE_AUTH_LOCATION.
 * @param options.subscriptionEnvVariableName - The subscriptionId environment variable
 * name. Default is "AZURE_SUBSCRIPTION_ID".
 * @param optionalCallback - The optional callback.
 *
 * @returns If a callback was passed as the last parameter then it returns void else returns a Promise.
 * The callback is called with the resulting ApplicationTokenCredentials or ApplicationTokenCertificateCredentials
 * object and a list of associated subscriptions across all the applicable tenants.
 */
export declare function withAuthFile(): Promise<ApplicationTokenCredentials | ApplicationTokenCertificateCredentials>;
export declare function withAuthFile(options: LoginWithAuthFileOptions): Promise<ApplicationTokenCredentials | ApplicationTokenCertificateCredentials>;
export declare function withAuthFile(options: LoginWithAuthFileOptions, callback: {
    (err: Error, credentials: ApplicationTokenCredentials | ApplicationTokenCertificateCredentials, subscriptions: Array<LinkedSubscription>): void;
}): void;
export declare function withAuthFile(callback: any): void;
/**
 * Provides a url and code that needs to be copy and pasted in a browser and authenticated over there. If successful, the user will get a DeviceTokenCredentials object and the list of subscriptions associated with that userId across all the applicable tenants.
 *
 * When using personal accounts, the `domain` property in the `options` parameter is required to be set to the Id of a tenant for that account. Otherwise, the resulting credential will not be able to access the account's resources.
 *
 * @param options - Object representing optional parameters.
 * @param options.clientId - The active directory application client id.
 * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
 * for an example.
 * @param options.tokenAudience - The audience for which the token is requested. Valid value is "graph".If tokenAudience is provided
 * then domain should also be provided its value should not be the default "common" tenant. It must be a string (preferably in a guid format).
 * @param options.domain - The domain or tenant Id containing this application. Default value is "common".
 * @param options.environment - The azure environment to authenticate with. Default environment is "Public Azure".
 * @param options.tokenCache - The token cache. Default value is the MemoryCache object from adal.
 * @param options.language - The language code specifying how the message should be localized to. Default value "en-us".
 * @param options.userCodeResponseLogger - A logger that logs the user code response message required for interactive login. When
 * this option is specified the usercode response message will not be logged to console.
 * @param optionalCallback - The optional callback.
 *
 * @returns If a callback was passed as the last parameter then it returns void else returns a Promise.
 * The callback is called with the resulting DeviceTokenCredentials object and a list of
 * associated subscriptions across all the applicable tenants.
 */
export declare function interactive(): Promise<DeviceTokenCredentials>;
export declare function interactive(options: InteractiveLoginOptions): Promise<DeviceTokenCredentials>;
export declare function interactive(options: InteractiveLoginOptions, callback: {
    (err: Error, credentials: DeviceTokenCredentials, subscriptions: Array<LinkedSubscription>): void;
}): void;
export declare function interactive(callback: any): void;
/**
 * Provides an ApplicationTokenCredentials object and the list of subscriptions associated with that servicePrincipalId/clientId across all the applicable tenants.
 *
 * When using personal accounts, the `domain` parameter is required to be set to the Id of a tenant for that account. Otherwise, the resulting credential will not be able to access the account's resources.
 *
 * @param clientId - The active directory application client Id also known as the SPN (ServicePrincipal Name).
 * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
 * for an example.
 * @param secret - The application secret for the service principal.
 * @param domain - The domain or tenant Id containing this application.
 * @param options - Object representing optional parameters.
 * @param options.tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
 * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferably in a guid format).
 * @param options.environment - The azure environment to authenticate with.
 * @param options.tokenCache - The token cache. Default value is the MemoryCache object from adal.
 * @param optionalCallback - The optional callback.
 *
 * @returns If a callback was passed as the last parameter then it returns void else returns a Promise.
 * The callback is called with the resulting ApplicationTokenCredentials object and a list of
 * associated subscriptions across all the applicable tenants.
 */
export declare function withServicePrincipalSecret(clientId: string, secret: string, domain: string): Promise<ApplicationTokenCredentials>;
export declare function withServicePrincipalSecret(clientId: string, secret: string, domain: string, options: AzureTokenCredentialsOptions): Promise<ApplicationTokenCredentials>;
export declare function withServicePrincipalSecret(clientId: string, secret: string, domain: string, options: AzureTokenCredentialsOptions, callback: {
    (err: Error, credentials: ApplicationTokenCredentials, subscriptions: Array<LinkedSubscription>): void;
}): void;
export declare function withServicePrincipalSecret(clientId: string, secret: string, domain: string, callback: any): void;
/**
 * Provides an ApplicationTokenCertificateCredentials object and the list of subscriptions associated with that servicePrincipalId/clientId across all the applicable tenants.
 *
 * When using personal accounts, the `domain` parameter is required to be set to the Id of a tenant for that account. Otherwise, the resulting credential will not be able to access the account's resources.
 *
 * @param clientId - The active directory application client Id also known as the SPN (ServicePrincipal Name).
 * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
 * for an example.
 * @param certificateStringOrFilePath - A PEM encoded certificate and private key OR an absolute filepath to the .pem file containing that information. For example:
 * - CertificateString: "-----BEGIN PRIVATE KEY-----\n<xxxxx>\n-----END PRIVATE KEY-----\n-----BEGIN CERTIFICATE-----\n<yyyyy>\n-----END CERTIFICATE-----\n"
 * - CertificateFilePath: **Absolute** file path of the .pem file.
 * @param domain - The domain or tenant Id containing this application.
 * @param options - Object representing optional parameters.
 * @param options.tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
 * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferably in a guid format).
 * @param options.environment - The azure environment to authenticate with.
 * @param options.tokenCache - The token cache. Default value is the MemoryCache object from adal.
 * @param optionalCallback - The optional callback.
 *
 * @returns If a callback was passed as the last parameter then it returns void else returns a Promise.
 * The callback is called with the resulting ApplicationTokenCertificateCredentials object and a list of
 * associated subscriptions across all the applicable tenants.
 */
export declare function withServicePrincipalCertificate(clientId: string, certificateStringOrFilePath: string, domain: string): Promise<ApplicationTokenCertificateCredentials>;
export declare function withServicePrincipalCertificate(clientId: string, certificateStringOrFilePath: string, domain: string, options: AzureTokenCredentialsOptions): Promise<ApplicationTokenCertificateCredentials>;
export declare function withServicePrincipalCertificate(clientId: string, certificateStringOrFilePath: string, domain: string, options: AzureTokenCredentialsOptions, callback: {
    (err: Error, credentials: ApplicationTokenCertificateCredentials, subscriptions: Array<LinkedSubscription>): void;
}): void;
export declare function withServicePrincipalCertificate(clientId: string, certificateStringOrFilePath: string, domain: string, callback: any): void;
/**
 * Provides a UserTokenCredentials object and the list of subscriptions associated with that userId across all the applicable tenants.
 *
 * This method is applicable only for organizational ids that are not 2FA enabled otherwise please use interactive login.
 *
 * When using personal accounts, the `domain` property in the `options` parameter is required to be set to the Id of a tenant for that account. Otherwise, the resulting credential will not be able to access the account's resources.
 *
 * @param username - The user name for the Organization Id account.
 * @param password - The password for the Organization Id account.
 * @param options - Object representing optional parameters.
 * @param options.clientId - The active directory application client id.
 * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
 * for an example.
 * @param options.tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
 * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferably in a guid format).
 * @param options.domain - The domain or tenant Id containing this application. Default value "common".
 * @param options.environment - The azure environment to authenticate with.
 * @param options.tokenCache - The token cache. Default value is the MemoryCache object from adal.
 * @param optionalCallback - The optional callback.
 *
 * @returns If a callback was passed as the last parameter then it returns void else returns a Promise.
 * The callback is called with the resulting UserTokenCredentials object and a list of
 * associated subscriptions across all the applicable tenants.
 */
export declare function withUsernamePassword(username: string, password: string): Promise<UserTokenCredentials>;
export declare function withUsernamePassword(username: string, password: string, options: LoginWithUsernamePasswordOptions): Promise<UserTokenCredentials>;
export declare function withUsernamePassword(username: string, password: string, callback: any): void;
export declare function withUsernamePassword(username: string, password: string, options: LoginWithUsernamePasswordOptions, callback: {
    (err: Error, credentials: UserTokenCredentials, subscriptions: Array<LinkedSubscription>): void;
}): void;
/**
 * Before using this method please install az cli from https://github.com/Azure/azure-cli/releases.
 * If you have an Azure virtual machine provisioned with az cli and has MSI enabled,
 * you can then use this method to get auth tokens from the VM.
 *
 * To create a new VM, enable MSI, please execute this command:
 * az vm create -g <resource_group_name> -n <vm_name> --assign-identity --image <os_image_name>
 * Note: the above command enables a service endpoint on the host, with a default port 50342
 *
 * To enable MSI on a already provisioned VM, execute the following command:
 * az vm --assign-identity -g <resource_group_name> -n <vm_name> --port <custom_port_number>
 *
 * To know more about this command, please execute:
 * az vm --assign-identity -h
 *
 * Authenticates using the identity service running on an Azure virtual machine.
 * This method makes a request to the authentication service hosted on the VM
 * and gets back an access token.
 *
 * @param options - Optional parameters
 * @param options.port - port on which the MSI service is running on the host VM. Default port is 50342
 * @param options.resource - The resource uri or token audience for which the token is needed.
 * For e.g. it can be:
 * - resourcemanagement endpoint "https://management.azure.com/"(default)
 * - management endpoint "https://management.core.windows.net/"
 * @param optionalCallback - The optional callback.
 *
 * @returns If a callback was passed as the last parameter then it returns void else returns a Promise.
 * The callback is called with the resulting MSIVmTokenCredentials object.
 */
export declare function loginWithVmMSI(): Promise<MSIVmTokenCredentials>;
export declare function loginWithVmMSI(options: MSIVmOptions): Promise<MSIVmTokenCredentials>;
export declare function loginWithVmMSI(options: MSIVmOptions, callback: Callback<MSIVmTokenCredentials>): void;
export declare function loginWithVmMSI(callback: Callback<MSIVmTokenCredentials>): void;
/**
 * Authenticate using the App Service MSI.
 * @param options - Optional parameters
 * @param options.msiEndpoint - The local URL from which your app can request tokens.
 * Either provide this parameter or set the environment variable `MSI_ENDPOINT`.
 * For example: `MSI_ENDPOINT="http://127.0.0.1:41741/MSI/token/"`
 * @param options.msiSecret - The secret used in communication between your code and the local MSI agent.
 * Either provide this parameter or set the environment variable `MSI_SECRET`.
 * For example: `MSI_SECRET="69418689F1E342DD946CB82994CDA3CB"`
 * @param options.resource - The resource uri or token audience for which the token is needed.
 * For example, it can be:
 * - resourcemanagement endpoint "https://management.azure.com/"(default)
 * - management endpoint "https://management.core.windows.net/"
 * @param options.msiApiVersion - The api-version of the local MSI agent. Default value is "2017-09-01".
 * @param optionalCallback -  The optional callback.
 * @returns If a callback was passed as the last parameter then it returns void else returns a Promise.
 * The callback is called with the resulting MSIAppServiceTokenCredentials object.
 */
export declare function loginWithAppServiceMSI(): Promise<MSIAppServiceTokenCredentials>;
export declare function loginWithAppServiceMSI(options: MSIAppServiceOptions): Promise<MSIAppServiceTokenCredentials>;
export declare function loginWithAppServiceMSI(options: MSIAppServiceOptions, callback: Callback<MSIAppServiceTokenCredentials>): void;
export declare function loginWithAppServiceMSI(callback: Callback<MSIAppServiceTokenCredentials>): void;
/**
 * Executes the azure cli command and returns the result. It will be `undefined` if the command did
 * not return anything or a `JSON object` if the command did return something.
 * @param cmdArguments Arguments to the az cli command to execute.
 */
export declare function execAz(cmdArguments: string[]): Promise<any>;
//# sourceMappingURL=login.d.ts.map