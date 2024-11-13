// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as adal from "adal-node";
import * as msRest from "@azure/ms-rest-js";
import { execFile } from "child_process";
import { readFileSync } from "fs";
import { Environment } from "@azure/ms-rest-azure-env";
import { TokenCredentialsBase } from "./credentials/tokenCredentialsBase";
import { ApplicationTokenCredentials } from "./credentials/applicationTokenCredentials";
import { ApplicationTokenCertificateCredentials } from "./credentials/applicationTokenCertificateCredentials";
import { DeviceTokenCredentials } from "./credentials/deviceTokenCredentials";
import { UserTokenCredentials } from "./credentials/userTokenCredentials";
import { AuthConstants, TokenAudience } from "./util/authConstants";
import {
  buildTenantList,
  getSubscriptionsFromTenants,
  LinkedSubscription
} from "./subscriptionManagement/subscriptionUtils";
import { MSIVmTokenCredentials, MSIVmOptions } from "./credentials/msiVmTokenCredentials";
import {
  MSIAppServiceTokenCredentials,
  MSIAppServiceOptions
} from "./credentials/msiAppServiceTokenCredentials";
import { MSITokenResponse } from "./credentials/msiTokenCredentials";

/**
 * Urls for management plane token
 * audience across different azure environments.
 */
const managementPlaneTokenAudiences = [
  "https://management.core.windows.net/",
  "https://management.core.chinacloudapi.cn/",
  "https://management.core.usgovcloudapi.net/",
  "https://management.core.cloudapi.de/",
  "https://management.azure.com/",
  "https://management.core.windows.net",
  "https://management.core.chinacloudapi.cn",
  "https://management.core.usgovcloudapi.net",
  "https://management.core.cloudapi.de",
  "https://management.azure.com"
];

function turnOnLogging() {
  const log = adal.Logging;
  log.setLoggingOptions({
    level: 3, // Please use log.LOGGING_LEVEL.VERBOSE once AD TypeScript mappings are updated,
    log: function (level: any, message: any, error: any) {
      level;
      console.info(message);
      if (error) {
        console.error(error);
      }
    }
  });
}

if (process.env["AZURE_ADAL_LOGGING_ENABLED"]) {
  turnOnLogging();
}

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
export type Callback<TResult> = (error?: Error, result?: TResult) => void;
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
export async function withUsernamePasswordWithAuthResponse(
  username: string,
  password: string,
  options?: LoginWithUsernamePasswordOptions
): Promise<AuthResponse<UserTokenCredentials>> {
  if (!options) {
    options = {};
  }
  if (!options.clientId) {
    options.clientId = AuthConstants.DEFAULT_ADAL_CLIENT_ID;
  }
  if (!options.domain) {
    options.domain = AuthConstants.AAD_COMMON_TENANT;
  }
  if (!options.environment) {
    options.environment = Environment.AzureCloud;
  }

  const creds = new UserTokenCredentials(
    options.clientId,
    options.domain,
    username,
    password,
    options.tokenAudience,
    options.environment,
    options.tokenCache
  );
  const tokenResponse = await creds.getToken();

  // The token cache gets propulated for all the tenants as a part of building the tenantList.
  let tenantList = await buildTenantList(creds);
  if (tenantList.length === 0 && tokenResponse.tenantId) {
    tenantList = [tokenResponse.tenantId];
  }

  const subscriptionList: LinkedSubscription[] = await _getSubscriptions(
    creds,
    tenantList,
    options.tokenAudience
  );

  return { credentials: creds, subscriptions: subscriptionList };
}

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
export async function withServicePrincipalSecretWithAuthResponse(
  clientId: string,
  secret: string,
  domain: string,
  options?: AzureTokenCredentialsOptions
): Promise<AuthResponse<ApplicationTokenCredentials>> {
  if (!options) {
    options = {};
  }
  if (!options.environment) {
    options.environment = Environment.AzureCloud;
  }

  const creds = new ApplicationTokenCredentials(
    clientId,
    domain,
    secret,
    options.tokenAudience,
    options.environment,
    options.tokenCache
  );
  await creds.getToken();

  const subscriptionList = await _getSubscriptions(creds, [domain], options.tokenAudience);

  return { credentials: creds, subscriptions: subscriptionList };
}

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
export async function withServicePrincipalCertificateWithAuthResponse(
  clientId: string,
  certificateStringOrFilePath: string,
  domain: string,
  options?: AzureTokenCredentialsOptions
): Promise<AuthResponse<ApplicationTokenCertificateCredentials>> {
  if (!options) {
    options = {};
  }
  if (!options.environment) {
    options.environment = Environment.AzureCloud;
  }

  const creds = ApplicationTokenCertificateCredentials.create(
    clientId,
    certificateStringOrFilePath,
    domain,
    options
  );
  await creds.getToken();

  const subscriptionList = await _getSubscriptions(creds, [domain], options.tokenAudience);

  return { credentials: creds, subscriptions: subscriptionList };
}

function validateAuthFileContent(credsObj: any, filePath: string) {
  if (!credsObj) {
    throw new Error("Please provide a credsObj to validate.");
  }
  if (!filePath) {
    throw new Error("Please provide a filePath.");
  }
  if (!credsObj.clientId) {
    throw new Error(`"clientId" is missing from the auth file: ${filePath}.`);
  }
  if (!credsObj.clientSecret && !credsObj.clientCertificate) {
    throw new Error(
      `Either "clientSecret" or "clientCertificate" must be present in the auth file: ${filePath}.`
    );
  }
  if (!credsObj.subscriptionId) {
    throw new Error(`"subscriptionId" is missing from the auth file: ${filePath}.`);
  }
  if (!credsObj.tenantId) {
    throw new Error(`"tenantId" is missing from the auth file: ${filePath}.`);
  }
  if (!credsObj.activeDirectoryEndpointUrl) {
    throw new Error(`"activeDirectoryEndpointUrl" is missing from the auth file: ${filePath}.`);
  }
  if (!credsObj.resourceManagerEndpointUrl) {
    throw new Error(`"resourceManagerEndpointUrl" is missing from the auth file: ${filePath}.`);
  }
  if (!credsObj.activeDirectoryGraphResourceId) {
    throw new Error(`"activeDirectoryGraphResourceId" is missing from the auth file: ${filePath}.`);
  }
  if (!credsObj.sqlManagementEndpointUrl) {
    throw new Error(`"sqlManagementEndpointUrl" is missing from the auth file: ${filePath}.`);
  }
}

function foundManagementEndpointUrl(authFileUrl: string, envUrl: string): boolean {
  if (!authFileUrl || (authFileUrl && typeof authFileUrl.valueOf() !== "string")) {
    throw new Error("authFileUrl cannot be null or undefined and must be of type string.");
  }

  if (!envUrl || (envUrl && typeof envUrl.valueOf() !== "string")) {
    throw new Error("envUrl cannot be null or undefined and must be of type string.");
  }

  authFileUrl = authFileUrl.endsWith("/") ? authFileUrl.slice(0, -1) : authFileUrl;
  envUrl = envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
  return authFileUrl.toLowerCase() === envUrl.toLowerCase();
}

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
export async function withAuthFileWithAuthResponse(
  options?: LoginWithAuthFileOptions
): Promise<AuthResponse<ApplicationTokenCredentials | ApplicationTokenCertificateCredentials>> {
  if (!options) options = { filePath: "" };
  const filePath = options.filePath || process.env[AuthConstants.AZURE_AUTH_LOCATION];
  const subscriptionEnvVariableName =
    options.subscriptionEnvVariableName || "AZURE_SUBSCRIPTION_ID";
  if (!filePath) {
    const msg = `Either provide an absolute file path to the auth file or set/export the environment variable - ${AuthConstants.AZURE_AUTH_LOCATION}.`;
    throw new Error(msg);
  }
  let content: string,
    credsObj: any = {};
  const optionsForSp: any = {};

  content = readFileSync(filePath, { encoding: "utf8" });
  credsObj = JSON.parse(content);
  validateAuthFileContent(credsObj, filePath);

  if (!credsObj.managementEndpointUrl) {
    credsObj.managementEndpointUrl = credsObj.resourceManagerEndpointUrl;
  }
  // setting the subscriptionId from auth file to the environment variable
  process.env[subscriptionEnvVariableName] = credsObj.subscriptionId;
  // get the AzureEnvironment or create a new AzureEnvironment based on the info provided in the auth file
  const envFound: any = {
    name: ""
  };
  const envNames = Object.keys(Environment);
  for (let i = 0; i < envNames.length; i++) {
    const env = envNames[i];
    const environmentObj = (Environment as any)[env];
    if (
      environmentObj &&
      environmentObj.managementEndpointUrl &&
      foundManagementEndpointUrl(
        credsObj.managementEndpointUrl,
        environmentObj.managementEndpointUrl
      )
    ) {
      envFound.name = environmentObj.name;
      break;
    }
  }
  if (envFound.name) {
    optionsForSp.environment = (Environment as any)[envFound.name];
  } else {
    // create a new environment with provided info.
    const envParams: any = {
      // try to find a logical name or set the filepath as the env name.
      name: credsObj.managementEndpointUrl.match(/.*management\.core\.(.*)\..*/i)[1] || filePath
    };
    const keys = Object.keys(credsObj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (
        key.match(/^(clientId|clientSecret|clientCertificate|subscriptionId|tenantId)$/gi) === null
      ) {
        if (key === "activeDirectoryEndpointUrl" && !key.endsWith("/")) {
          envParams[key] = credsObj[key] + "/";
        } else {
          envParams[key] = credsObj[key];
        }
      }
    }
    if (!envParams.activeDirectoryResourceId) {
      envParams.activeDirectoryResourceId = credsObj.managementEndpointUrl;
    }
    if (!envParams.portalUrl) {
      envParams.portalUrl = "https://portal.azure.com";
    }
    optionsForSp.environment = Environment.add(envParams);
  }
  if (credsObj.clientSecret) {
    return withServicePrincipalSecretWithAuthResponse(
      credsObj.clientId,
      credsObj.clientSecret,
      credsObj.tenantId,
      optionsForSp
    );
  }

  return withServicePrincipalCertificateWithAuthResponse(
    credsObj.clientId,
    credsObj.clientCertificate,
    credsObj.tenantId,
    optionsForSp
  );
}

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
export async function withInteractiveWithAuthResponse(
  options?: InteractiveLoginOptions
): Promise<AuthResponse<DeviceTokenCredentials>> {
  if (!options) {
    options = {};
  }

  if (!options.environment) {
    options.environment = Environment.AzureCloud;
  }

  if (!options.domain) {
    options.domain = AuthConstants.AAD_COMMON_TENANT;
  }

  if (!options.clientId) {
    options.clientId = AuthConstants.DEFAULT_ADAL_CLIENT_ID;
  }

  if (!options.tokenCache) {
    options.tokenCache = new adal.MemoryCache();
  }

  if (!options.language) {
    options.language = AuthConstants.DEFAULT_LANGUAGE;
  }

  if (!options.tokenAudience) {
    options.tokenAudience = options.environment.activeDirectoryResourceId;
  }
  const interactiveOptions: any = {};
  interactiveOptions.tokenAudience = options.tokenAudience;
  interactiveOptions.environment = options.environment;
  interactiveOptions.domain = options.domain;
  interactiveOptions.clientId = options.clientId;
  interactiveOptions.tokenCache = options.tokenCache;
  interactiveOptions.language = options.language;
  interactiveOptions.userCodeResponseLogger = options.userCodeResponseLogger;
  const authorityUrl: string =
    interactiveOptions.environment.activeDirectoryEndpointUrl + interactiveOptions.domain;
  const authContext = new adal.AuthenticationContext(
    authorityUrl,
    interactiveOptions.environment.validateAuthority,
    interactiveOptions.tokenCache
  );
  interactiveOptions.context = authContext;

  function tryAcquireToken(interactiveOptions: InteractiveLoginOptions, resolve: any, reject: any) {
    authContext.acquireUserCode(
      interactiveOptions.tokenAudience!,
      interactiveOptions.clientId!,
      interactiveOptions.language!,
      (err: any, userCodeRes: adal.UserCodeInfo) => {
        if (err) {
          if (err.error === "authorization_pending") {
            setTimeout(() => {
              tryAcquireToken(interactiveOptions, resolve, reject);
            }, 1000);
          } else {
            reject(err);
          }

          return;
        }

        if (interactiveOptions.userCodeResponseLogger) {
          interactiveOptions.userCodeResponseLogger(userCodeRes.message);
        } else {
          console.log(userCodeRes.message);
        }

        return resolve(userCodeRes);
      }
    );
  }

  const getUserCode = new Promise<adal.UserCodeInfo>((resolve, reject) => {
    return tryAcquireToken(interactiveOptions, resolve, reject);
  });

  const userCodeResponse = await getUserCode;
  const creds = await new Promise<DeviceTokenCredentials>((resolve, reject) => {
    return authContext.acquireTokenWithDeviceCode(
      interactiveOptions.tokenAudience,
      interactiveOptions.clientId,
      userCodeResponse,
      (error, tokenResponse) => {
        if (error) {
          return reject(error);
        }

        const response = tokenResponse as adal.TokenResponse;
        interactiveOptions.userName = response.userId;
        interactiveOptions.authorizationScheme = response.tokenType;

        let creds;
        try {
          creds = new DeviceTokenCredentials(
            interactiveOptions.clientId,
            interactiveOptions.domain,
            interactiveOptions.userName,
            interactiveOptions.tokenAudience,
            interactiveOptions.environment,
            interactiveOptions.tokenCache
          );
        } catch (err) {
          return reject(err);
        }
        return resolve(creds);
      }
    );
  });

  const tenants = await buildTenantList(creds);
  const subscriptions = await _getSubscriptions(creds, tenants, interactiveOptions.tokenAudience);

  return { credentials: creds, subscriptions: subscriptions };
}

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
export function withAuthFile(): Promise<
  ApplicationTokenCredentials | ApplicationTokenCertificateCredentials
>;
export function withAuthFile(
  options: LoginWithAuthFileOptions
): Promise<ApplicationTokenCredentials | ApplicationTokenCertificateCredentials>;
export function withAuthFile(
  options: LoginWithAuthFileOptions,
  callback: {
    (
      err: Error,
      credentials: ApplicationTokenCredentials | ApplicationTokenCertificateCredentials,
      subscriptions: Array<LinkedSubscription>
    ): void;
  }
): void;
export function withAuthFile(callback: any): void;
export function withAuthFile(
  options?: LoginWithAuthFileOptions,
  callback?: {
    (
      err: Error,
      credentials: ApplicationTokenCredentials | ApplicationTokenCertificateCredentials,
      subscriptions: Array<LinkedSubscription>
    ): void;
  }
): any {
  if (!callback && typeof options === "function") {
    callback = options;
    options = undefined;
  }
  const cb = callback as Function;
  if (!callback) {
    return withAuthFileWithAuthResponse(options).then((authRes) => {
      return authRes.credentials;
    });
  } else {
    msRest.promiseToCallback(withAuthFileWithAuthResponse(options))(
      (
        err: Error,
        authRes: AuthResponse<ApplicationTokenCredentials | ApplicationTokenCertificateCredentials>
      ) => {
        if (err) {
          return cb(err);
        }
        return cb(undefined, authRes.credentials, authRes.subscriptions);
      }
    );
  }
}

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
export function interactive(): Promise<DeviceTokenCredentials>;
export function interactive(options: InteractiveLoginOptions): Promise<DeviceTokenCredentials>;
export function interactive(
  options: InteractiveLoginOptions,
  callback: {
    (
      err: Error,
      credentials: DeviceTokenCredentials,
      subscriptions: Array<LinkedSubscription>
    ): void;
  }
): void;
export function interactive(callback: any): void;
export function interactive(
  options?: InteractiveLoginOptions,
  callback?: {
    (
      err: Error,
      credentials: DeviceTokenCredentials,
      subscriptions: Array<LinkedSubscription>
    ): void;
  }
): any {
  if (!callback && typeof options === "function") {
    callback = options;
    options = undefined;
  }
  const cb = callback as Function;
  if (!callback) {
    return withInteractiveWithAuthResponse(options).then((authRes) => {
      return authRes.credentials;
    });
  } else {
    msRest.promiseToCallback(withInteractiveWithAuthResponse(options))(
      (err: Error, authRes: AuthResponse<DeviceTokenCredentials>) => {
        if (err) {
          return cb(err);
        }
        return cb(undefined, authRes.credentials, authRes.subscriptions);
      }
    );
  }
}

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
export function withServicePrincipalSecret(
  clientId: string,
  secret: string,
  domain: string
): Promise<ApplicationTokenCredentials>;
export function withServicePrincipalSecret(
  clientId: string,
  secret: string,
  domain: string,
  options: AzureTokenCredentialsOptions
): Promise<ApplicationTokenCredentials>;
export function withServicePrincipalSecret(
  clientId: string,
  secret: string,
  domain: string,
  options: AzureTokenCredentialsOptions,
  callback: {
    (
      err: Error,
      credentials: ApplicationTokenCredentials,
      subscriptions: Array<LinkedSubscription>
    ): void;
  }
): void;
export function withServicePrincipalSecret(
  clientId: string,
  secret: string,
  domain: string,
  callback: any
): void;
export function withServicePrincipalSecret(
  clientId: string,
  secret: string,
  domain: string,
  options?: AzureTokenCredentialsOptions,
  callback?: {
    (
      err: Error,
      credentials: ApplicationTokenCredentials,
      subscriptions: Array<LinkedSubscription>
    ): void;
  }
): any {
  if (!callback && typeof options === "function") {
    callback = options;
    options = undefined;
  }
  const cb = callback as Function;
  if (!callback) {
    return withServicePrincipalSecretWithAuthResponse(clientId, secret, domain, options).then(
      (authRes) => {
        return authRes.credentials;
      }
    );
  } else {
    msRest.promiseToCallback(
      withServicePrincipalSecretWithAuthResponse(clientId, secret, domain, options)
    )((err: Error, authRes: AuthResponse) => {
      if (err) {
        return cb(err);
      }
      return cb(undefined, authRes.credentials, authRes.subscriptions);
    });
  }
}

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
export function withServicePrincipalCertificate(
  clientId: string,
  certificateStringOrFilePath: string,
  domain: string
): Promise<ApplicationTokenCertificateCredentials>;
export function withServicePrincipalCertificate(
  clientId: string,
  certificateStringOrFilePath: string,
  domain: string,
  options: AzureTokenCredentialsOptions
): Promise<ApplicationTokenCertificateCredentials>;
export function withServicePrincipalCertificate(
  clientId: string,
  certificateStringOrFilePath: string,
  domain: string,
  options: AzureTokenCredentialsOptions,
  callback: {
    (
      err: Error,
      credentials: ApplicationTokenCertificateCredentials,
      subscriptions: Array<LinkedSubscription>
    ): void;
  }
): void;
export function withServicePrincipalCertificate(
  clientId: string,
  certificateStringOrFilePath: string,
  domain: string,
  callback: any
): void;
export function withServicePrincipalCertificate(
  clientId: string,
  certificateStringOrFilePath: string,
  domain: string,
  options?: AzureTokenCredentialsOptions,
  callback?: {
    (
      err: Error,
      credentials: ApplicationTokenCertificateCredentials,
      subscriptions: Array<LinkedSubscription>
    ): void;
  }
): any {
  if (!callback && typeof options === "function") {
    callback = options;
    options = undefined;
  }
  const cb = callback as Function;
  if (!callback) {
    return withServicePrincipalCertificateWithAuthResponse(
      clientId,
      certificateStringOrFilePath,
      domain,
      options
    ).then((authRes) => {
      return authRes.credentials;
    });
  } else {
    msRest.promiseToCallback(
      withServicePrincipalCertificateWithAuthResponse(
        clientId,
        certificateStringOrFilePath,
        domain,
        options
      )
    )((err: Error, authRes: AuthResponse) => {
      if (err) {
        return cb(err);
      }
      return cb(undefined, authRes.credentials, authRes.subscriptions);
    });
  }
}

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
export function withUsernamePassword(
  username: string,
  password: string
): Promise<UserTokenCredentials>;
export function withUsernamePassword(
  username: string,
  password: string,
  options: LoginWithUsernamePasswordOptions
): Promise<UserTokenCredentials>;
export function withUsernamePassword(username: string, password: string, callback: any): void;
export function withUsernamePassword(
  username: string,
  password: string,
  options: LoginWithUsernamePasswordOptions,
  callback: {
    (err: Error, credentials: UserTokenCredentials, subscriptions: Array<LinkedSubscription>): void;
  }
): void;
export function withUsernamePassword(
  username: string,
  password: string,
  options?: LoginWithUsernamePasswordOptions,
  callback?: {
    (err: Error, credentials: UserTokenCredentials, subscriptions: Array<LinkedSubscription>): void;
  }
): any {
  if (!callback && typeof options === "function") {
    callback = options;
    options = undefined;
  }
  const cb = callback as Function;
  if (!callback) {
    return withUsernamePasswordWithAuthResponse(username, password, options).then((authRes) => {
      return authRes.credentials;
    });
  } else {
    msRest.promiseToCallback(withUsernamePasswordWithAuthResponse(username, password, options))(
      (err: Error, authRes: AuthResponse) => {
        if (err) {
          return cb(err);
        }
        return cb(undefined, authRes.credentials, authRes.subscriptions);
      }
    );
  }
}

/**
 * We only need to get the subscription list if the tokenAudience is for a management client.
 */
function _getSubscriptions(
  creds: TokenCredentialsBase,
  tenants: string[],
  tokenAudience?: string
): Promise<LinkedSubscription[]> {
  if (
    tokenAudience &&
    !managementPlaneTokenAudiences.some((item) => {
      return item === tokenAudience!.toLowerCase();
    })
  ) {
    return Promise.resolve([]);
  }
  return getSubscriptionsFromTenants(creds, tenants);
}

/**
 * Initializes MSITokenCredentials class and calls getToken and returns a token response.
 *
 * @param domain - - required. The tenant id.
 * @param options - - Optional parameters
 * @param options.port - port on which the MSI service is running on the host VM. Default port is 50342
 * @param options.resource - The resource uri or token audience for which the token is needed. Default - "https://management.azure.com/"
 * @param options.aadEndpoint - The add endpoint for authentication. default - "https://login.microsoftonline.com"
 * @param callback - - the callback function.
 */
async function _withMSI(options?: MSIVmOptions): Promise<MSIVmTokenCredentials> {
  if (!options) {
    options = {};
  }

  const creds = new MSIVmTokenCredentials(options);
  await creds.getToken();
  return creds;
}

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
export function loginWithVmMSI(): Promise<MSIVmTokenCredentials>;
export function loginWithVmMSI(options: MSIVmOptions): Promise<MSIVmTokenCredentials>;
export function loginWithVmMSI(
  options: MSIVmOptions,
  callback: Callback<MSIVmTokenCredentials>
): void;
export function loginWithVmMSI(callback: Callback<MSIVmTokenCredentials>): void;
export function loginWithVmMSI(
  options?: MSIVmOptions | Callback<MSIVmTokenCredentials>,
  callback?: Callback<MSIVmTokenCredentials>
): void | Promise<MSIVmTokenCredentials> {
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  const cb = callback as Function;
  if (!callback) {
    return _withMSI(options as MSIVmOptions);
  } else {
    msRest.promiseToCallback(_withMSI(options as MSIVmOptions))(
      (err: Error, tokenRes: MSITokenResponse) => {
        if (err) {
          return cb(err);
        }
        return cb(undefined, tokenRes);
      }
    );
  }
}

/**
 * Private method
 */
async function _withAppServiceMSI(
  options: MSIAppServiceOptions
): Promise<MSIAppServiceTokenCredentials> {
  if (!options) {
    options = {};
  }

  const creds = new MSIAppServiceTokenCredentials(options);
  await creds.getToken();
  return creds;
}

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
export function loginWithAppServiceMSI(): Promise<MSIAppServiceTokenCredentials>;
export function loginWithAppServiceMSI(
  options: MSIAppServiceOptions
): Promise<MSIAppServiceTokenCredentials>;
export function loginWithAppServiceMSI(
  options: MSIAppServiceOptions,
  callback: Callback<MSIAppServiceTokenCredentials>
): void;
export function loginWithAppServiceMSI(callback: Callback<MSIAppServiceTokenCredentials>): void;
export function loginWithAppServiceMSI(
  options?: MSIAppServiceOptions | Callback<MSIAppServiceTokenCredentials>,
  callback?: Callback<MSIAppServiceTokenCredentials>
): void | Promise<MSIAppServiceTokenCredentials> {
  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }
  const cb = callback as Function;
  if (!callback) {
    return _withAppServiceMSI(options as MSIAppServiceOptions);
  } else {
    msRest.promiseToCallback(_withAppServiceMSI(options as MSIAppServiceOptions))(
      (err: Error, tokenRes: MSITokenResponse) => {
        if (err) {
          return cb(err);
        }
        return cb(undefined, tokenRes);
      }
    );
  }
}

/**
 * Executes the azure cli command and returns the result. It will be `undefined` if the command did
 * not return anything or a `JSON object` if the command did return something.
 * @param cmdArguments Arguments to the az cli command to execute.
 */
export async function execAz(cmdArguments: string[]): Promise<any> {
  const azCmd = process.platform === "win32" ? "az.cmd" : "az";
  return new Promise<any>((resolve, reject) => {
    execFile(azCmd, [...cmdArguments, "--out", "json"], { encoding: "utf8" }, (error, stdout) => {
      if (error) {
        return reject(error);
      }
      try {
        return resolve(JSON.parse(stdout));
      } catch (err) {
        const msg =
          `An error occurred while parsing the output "${stdout}", of ` +
          `the cmd az "${cmdArguments}": ${err.stack}.`;
        return reject(new Error(msg));
      }
    });
  });
}
