"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const adal = require("adal-node");
const msRest = require("@azure/ms-rest-js");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const ms_rest_azure_env_1 = require("@azure/ms-rest-azure-env");
const applicationTokenCredentials_1 = require("./credentials/applicationTokenCredentials");
const applicationTokenCertificateCredentials_1 = require("./credentials/applicationTokenCertificateCredentials");
const deviceTokenCredentials_1 = require("./credentials/deviceTokenCredentials");
const userTokenCredentials_1 = require("./credentials/userTokenCredentials");
const authConstants_1 = require("./util/authConstants");
const subscriptionUtils_1 = require("./subscriptionManagement/subscriptionUtils");
const msiVmTokenCredentials_1 = require("./credentials/msiVmTokenCredentials");
const msiAppServiceTokenCredentials_1 = require("./credentials/msiAppServiceTokenCredentials");
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
        level: 3,
        log: function (level, message, error) {
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
function withUsernamePasswordWithAuthResponse(username, password, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            options = {};
        }
        if (!options.clientId) {
            options.clientId = authConstants_1.AuthConstants.DEFAULT_ADAL_CLIENT_ID;
        }
        if (!options.domain) {
            options.domain = authConstants_1.AuthConstants.AAD_COMMON_TENANT;
        }
        if (!options.environment) {
            options.environment = ms_rest_azure_env_1.Environment.AzureCloud;
        }
        const creds = new userTokenCredentials_1.UserTokenCredentials(options.clientId, options.domain, username, password, options.tokenAudience, options.environment, options.tokenCache);
        const tokenResponse = yield creds.getToken();
        // The token cache gets propulated for all the tenants as a part of building the tenantList.
        let tenantList = yield subscriptionUtils_1.buildTenantList(creds);
        if (tenantList.length === 0 && tokenResponse.tenantId) {
            tenantList = [tokenResponse.tenantId];
        }
        const subscriptionList = yield _getSubscriptions(creds, tenantList, options.tokenAudience);
        return { credentials: creds, subscriptions: subscriptionList };
    });
}
exports.withUsernamePasswordWithAuthResponse = withUsernamePasswordWithAuthResponse;
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
function withServicePrincipalSecretWithAuthResponse(clientId, secret, domain, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            options = {};
        }
        if (!options.environment) {
            options.environment = ms_rest_azure_env_1.Environment.AzureCloud;
        }
        const creds = new applicationTokenCredentials_1.ApplicationTokenCredentials(clientId, domain, secret, options.tokenAudience, options.environment, options.tokenCache);
        yield creds.getToken();
        const subscriptionList = yield _getSubscriptions(creds, [domain], options.tokenAudience);
        return { credentials: creds, subscriptions: subscriptionList };
    });
}
exports.withServicePrincipalSecretWithAuthResponse = withServicePrincipalSecretWithAuthResponse;
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
function withServicePrincipalCertificateWithAuthResponse(clientId, certificateStringOrFilePath, domain, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            options = {};
        }
        if (!options.environment) {
            options.environment = ms_rest_azure_env_1.Environment.AzureCloud;
        }
        const creds = applicationTokenCertificateCredentials_1.ApplicationTokenCertificateCredentials.create(clientId, certificateStringOrFilePath, domain, options);
        yield creds.getToken();
        const subscriptionList = yield _getSubscriptions(creds, [domain], options.tokenAudience);
        return { credentials: creds, subscriptions: subscriptionList };
    });
}
exports.withServicePrincipalCertificateWithAuthResponse = withServicePrincipalCertificateWithAuthResponse;
function validateAuthFileContent(credsObj, filePath) {
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
        throw new Error(`Either "clientSecret" or "clientCertificate" must be present in the auth file: ${filePath}.`);
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
function foundManagementEndpointUrl(authFileUrl, envUrl) {
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
function withAuthFileWithAuthResponse(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options)
            options = { filePath: "" };
        const filePath = options.filePath || process.env[authConstants_1.AuthConstants.AZURE_AUTH_LOCATION];
        const subscriptionEnvVariableName = options.subscriptionEnvVariableName || "AZURE_SUBSCRIPTION_ID";
        if (!filePath) {
            const msg = `Either provide an absolute file path to the auth file or set/export the environment variable - ${authConstants_1.AuthConstants.AZURE_AUTH_LOCATION}.`;
            throw new Error(msg);
        }
        let content, credsObj = {};
        const optionsForSp = {};
        content = fs_1.readFileSync(filePath, { encoding: "utf8" });
        credsObj = JSON.parse(content);
        validateAuthFileContent(credsObj, filePath);
        if (!credsObj.managementEndpointUrl) {
            credsObj.managementEndpointUrl = credsObj.resourceManagerEndpointUrl;
        }
        // setting the subscriptionId from auth file to the environment variable
        process.env[subscriptionEnvVariableName] = credsObj.subscriptionId;
        // get the AzureEnvironment or create a new AzureEnvironment based on the info provided in the auth file
        const envFound = {
            name: ""
        };
        const envNames = Object.keys(ms_rest_azure_env_1.Environment);
        for (let i = 0; i < envNames.length; i++) {
            const env = envNames[i];
            const environmentObj = ms_rest_azure_env_1.Environment[env];
            if (environmentObj &&
                environmentObj.managementEndpointUrl &&
                foundManagementEndpointUrl(credsObj.managementEndpointUrl, environmentObj.managementEndpointUrl)) {
                envFound.name = environmentObj.name;
                break;
            }
        }
        if (envFound.name) {
            optionsForSp.environment = ms_rest_azure_env_1.Environment[envFound.name];
        }
        else {
            // create a new environment with provided info.
            const envParams = {
                // try to find a logical name or set the filepath as the env name.
                name: credsObj.managementEndpointUrl.match(/.*management\.core\.(.*)\..*/i)[1] || filePath
            };
            const keys = Object.keys(credsObj);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (key.match(/^(clientId|clientSecret|clientCertificate|subscriptionId|tenantId)$/gi) === null) {
                    if (key === "activeDirectoryEndpointUrl" && !key.endsWith("/")) {
                        envParams[key] = credsObj[key] + "/";
                    }
                    else {
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
            optionsForSp.environment = ms_rest_azure_env_1.Environment.add(envParams);
        }
        if (credsObj.clientSecret) {
            return withServicePrincipalSecretWithAuthResponse(credsObj.clientId, credsObj.clientSecret, credsObj.tenantId, optionsForSp);
        }
        return withServicePrincipalCertificateWithAuthResponse(credsObj.clientId, credsObj.clientCertificate, credsObj.tenantId, optionsForSp);
    });
}
exports.withAuthFileWithAuthResponse = withAuthFileWithAuthResponse;
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
function withInteractiveWithAuthResponse(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            options = {};
        }
        if (!options.environment) {
            options.environment = ms_rest_azure_env_1.Environment.AzureCloud;
        }
        if (!options.domain) {
            options.domain = authConstants_1.AuthConstants.AAD_COMMON_TENANT;
        }
        if (!options.clientId) {
            options.clientId = authConstants_1.AuthConstants.DEFAULT_ADAL_CLIENT_ID;
        }
        if (!options.tokenCache) {
            options.tokenCache = new adal.MemoryCache();
        }
        if (!options.language) {
            options.language = authConstants_1.AuthConstants.DEFAULT_LANGUAGE;
        }
        if (!options.tokenAudience) {
            options.tokenAudience = options.environment.activeDirectoryResourceId;
        }
        const interactiveOptions = {};
        interactiveOptions.tokenAudience = options.tokenAudience;
        interactiveOptions.environment = options.environment;
        interactiveOptions.domain = options.domain;
        interactiveOptions.clientId = options.clientId;
        interactiveOptions.tokenCache = options.tokenCache;
        interactiveOptions.language = options.language;
        interactiveOptions.userCodeResponseLogger = options.userCodeResponseLogger;
        const authorityUrl = interactiveOptions.environment.activeDirectoryEndpointUrl + interactiveOptions.domain;
        const authContext = new adal.AuthenticationContext(authorityUrl, interactiveOptions.environment.validateAuthority, interactiveOptions.tokenCache);
        interactiveOptions.context = authContext;
        function tryAcquireToken(interactiveOptions, resolve, reject) {
            authContext.acquireUserCode(interactiveOptions.tokenAudience, interactiveOptions.clientId, interactiveOptions.language, (err, userCodeRes) => {
                if (err) {
                    if (err.error === "authorization_pending") {
                        setTimeout(() => {
                            tryAcquireToken(interactiveOptions, resolve, reject);
                        }, 1000);
                    }
                    else {
                        reject(err);
                    }
                    return;
                }
                if (interactiveOptions.userCodeResponseLogger) {
                    interactiveOptions.userCodeResponseLogger(userCodeRes.message);
                }
                else {
                    console.log(userCodeRes.message);
                }
                return resolve(userCodeRes);
            });
        }
        const getUserCode = new Promise((resolve, reject) => {
            return tryAcquireToken(interactiveOptions, resolve, reject);
        });
        const userCodeResponse = yield getUserCode;
        const creds = yield new Promise((resolve, reject) => {
            return authContext.acquireTokenWithDeviceCode(interactiveOptions.tokenAudience, interactiveOptions.clientId, userCodeResponse, (error, tokenResponse) => {
                if (error) {
                    return reject(error);
                }
                const response = tokenResponse;
                interactiveOptions.userName = response.userId;
                interactiveOptions.authorizationScheme = response.tokenType;
                let creds;
                try {
                    creds = new deviceTokenCredentials_1.DeviceTokenCredentials(interactiveOptions.clientId, interactiveOptions.domain, interactiveOptions.userName, interactiveOptions.tokenAudience, interactiveOptions.environment, interactiveOptions.tokenCache);
                }
                catch (err) {
                    return reject(err);
                }
                return resolve(creds);
            });
        });
        const tenants = yield subscriptionUtils_1.buildTenantList(creds);
        const subscriptions = yield _getSubscriptions(creds, tenants, interactiveOptions.tokenAudience);
        return { credentials: creds, subscriptions: subscriptions };
    });
}
exports.withInteractiveWithAuthResponse = withInteractiveWithAuthResponse;
function withAuthFile(options, callback) {
    if (!callback && typeof options === "function") {
        callback = options;
        options = undefined;
    }
    const cb = callback;
    if (!callback) {
        return withAuthFileWithAuthResponse(options).then((authRes) => {
            return authRes.credentials;
        });
    }
    else {
        msRest.promiseToCallback(withAuthFileWithAuthResponse(options))((err, authRes) => {
            if (err) {
                return cb(err);
            }
            return cb(undefined, authRes.credentials, authRes.subscriptions);
        });
    }
}
exports.withAuthFile = withAuthFile;
function interactive(options, callback) {
    if (!callback && typeof options === "function") {
        callback = options;
        options = undefined;
    }
    const cb = callback;
    if (!callback) {
        return withInteractiveWithAuthResponse(options).then((authRes) => {
            return authRes.credentials;
        });
    }
    else {
        msRest.promiseToCallback(withInteractiveWithAuthResponse(options))((err, authRes) => {
            if (err) {
                return cb(err);
            }
            return cb(undefined, authRes.credentials, authRes.subscriptions);
        });
    }
}
exports.interactive = interactive;
function withServicePrincipalSecret(clientId, secret, domain, options, callback) {
    if (!callback && typeof options === "function") {
        callback = options;
        options = undefined;
    }
    const cb = callback;
    if (!callback) {
        return withServicePrincipalSecretWithAuthResponse(clientId, secret, domain, options).then((authRes) => {
            return authRes.credentials;
        });
    }
    else {
        msRest.promiseToCallback(withServicePrincipalSecretWithAuthResponse(clientId, secret, domain, options))((err, authRes) => {
            if (err) {
                return cb(err);
            }
            return cb(undefined, authRes.credentials, authRes.subscriptions);
        });
    }
}
exports.withServicePrincipalSecret = withServicePrincipalSecret;
function withServicePrincipalCertificate(clientId, certificateStringOrFilePath, domain, options, callback) {
    if (!callback && typeof options === "function") {
        callback = options;
        options = undefined;
    }
    const cb = callback;
    if (!callback) {
        return withServicePrincipalCertificateWithAuthResponse(clientId, certificateStringOrFilePath, domain, options).then((authRes) => {
            return authRes.credentials;
        });
    }
    else {
        msRest.promiseToCallback(withServicePrincipalCertificateWithAuthResponse(clientId, certificateStringOrFilePath, domain, options))((err, authRes) => {
            if (err) {
                return cb(err);
            }
            return cb(undefined, authRes.credentials, authRes.subscriptions);
        });
    }
}
exports.withServicePrincipalCertificate = withServicePrincipalCertificate;
function withUsernamePassword(username, password, options, callback) {
    if (!callback && typeof options === "function") {
        callback = options;
        options = undefined;
    }
    const cb = callback;
    if (!callback) {
        return withUsernamePasswordWithAuthResponse(username, password, options).then((authRes) => {
            return authRes.credentials;
        });
    }
    else {
        msRest.promiseToCallback(withUsernamePasswordWithAuthResponse(username, password, options))((err, authRes) => {
            if (err) {
                return cb(err);
            }
            return cb(undefined, authRes.credentials, authRes.subscriptions);
        });
    }
}
exports.withUsernamePassword = withUsernamePassword;
/**
 * We only need to get the subscription list if the tokenAudience is for a management client.
 */
function _getSubscriptions(creds, tenants, tokenAudience) {
    if (tokenAudience &&
        !managementPlaneTokenAudiences.some((item) => {
            return item === tokenAudience.toLowerCase();
        })) {
        return Promise.resolve([]);
    }
    return subscriptionUtils_1.getSubscriptionsFromTenants(creds, tenants);
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
function _withMSI(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            options = {};
        }
        const creds = new msiVmTokenCredentials_1.MSIVmTokenCredentials(options);
        yield creds.getToken();
        return creds;
    });
}
function loginWithVmMSI(options, callback) {
    if (!callback && typeof options === "function") {
        callback = options;
        options = {};
    }
    const cb = callback;
    if (!callback) {
        return _withMSI(options);
    }
    else {
        msRest.promiseToCallback(_withMSI(options))((err, tokenRes) => {
            if (err) {
                return cb(err);
            }
            return cb(undefined, tokenRes);
        });
    }
}
exports.loginWithVmMSI = loginWithVmMSI;
/**
 * Private method
 */
function _withAppServiceMSI(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options) {
            options = {};
        }
        const creds = new msiAppServiceTokenCredentials_1.MSIAppServiceTokenCredentials(options);
        yield creds.getToken();
        return creds;
    });
}
function loginWithAppServiceMSI(options, callback) {
    if (!callback && typeof options === "function") {
        callback = options;
        options = {};
    }
    const cb = callback;
    if (!callback) {
        return _withAppServiceMSI(options);
    }
    else {
        msRest.promiseToCallback(_withAppServiceMSI(options))((err, tokenRes) => {
            if (err) {
                return cb(err);
            }
            return cb(undefined, tokenRes);
        });
    }
}
exports.loginWithAppServiceMSI = loginWithAppServiceMSI;
/**
 * Executes the azure cli command and returns the result. It will be `undefined` if the command did
 * not return anything or a `JSON object` if the command did return something.
 * @param cmdArguments Arguments to the az cli command to execute.
 */
function execAz(cmdArguments) {
    return __awaiter(this, void 0, void 0, function* () {
        const azCmd = process.platform === "win32" ? "az.cmd" : "az";
        return new Promise((resolve, reject) => {
            child_process_1.execFile(azCmd, [...cmdArguments, "--out", "json"], { encoding: "utf8" }, (error, stdout) => {
                if (error) {
                    return reject(error);
                }
                try {
                    return resolve(JSON.parse(stdout));
                }
                catch (err) {
                    const msg = `An error occurred while parsing the output "${stdout}", of ` +
                        `the cmd az "${cmdArguments}": ${err.stack}.`;
                    return reject(new Error(msg));
                }
            });
        });
    });
}
exports.execAz = execAz;
//# sourceMappingURL=login.js.map