import { TokenCredentialsBase } from "./tokenCredentialsBase";
import { Environment } from "@azure/ms-rest-azure-env";
import { TokenAudience } from "../util/authConstants";
import { TokenResponse, TokenCache } from "adal-node";
export declare class DeviceTokenCredentials extends TokenCredentialsBase {
    readonly username: string;
    /**
     * Creates a new DeviceTokenCredentials object that gets a new access token using userCodeInfo (contains user_code, device_code)
     * for authenticating user on device.
     *
     * When this credential is used, the script will provide a url and code. The user needs to copy the url and the code, paste it
     * in a browser and authenticate over there. If successful, the script will get the access token.
     *
     *
     * @param clientId - The active directory application client id.
     * @param domain - The domain or tenant id containing this application. Default value is "common"
     * @param username - The user name for account in the form: "user@example.com".
     * @param tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
     * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferrably in a guid format).
     * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
     * for an example.
     * @param environment - The azure environment to authenticate with. Default environment is "Azure" popularly known as "Public Azure Cloud".
     * @param tokenCache - The token cache. Default value is the MemoryCache object from adal.
     */
    constructor(clientId?: string, domain?: string, username?: string, tokenAudience?: TokenAudience, environment?: Environment, tokenCache?: TokenCache);
    getToken(): Promise<TokenResponse>;
}
//# sourceMappingURL=deviceTokenCredentials.d.ts.map