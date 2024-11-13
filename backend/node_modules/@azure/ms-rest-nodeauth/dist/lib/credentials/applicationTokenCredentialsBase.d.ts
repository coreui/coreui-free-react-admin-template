import { TokenCredentialsBase } from "./tokenCredentialsBase";
import { Environment } from "@azure/ms-rest-azure-env";
import { TokenAudience } from "../util/authConstants";
import { TokenCache, TokenResponse } from "adal-node";
export declare abstract class ApplicationTokenCredentialsBase extends TokenCredentialsBase {
    /**
     * Creates a new ApplicationTokenCredentials object.
     * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
     * for detailed instructions on creating an Azure Active Directory application.
     *
     * @param clientId - The active directory application client id.
     * @param domain - The domain or tenant id containing this application.
     * @param tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
     * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferrably in a guid format).
     * @param environment - The azure environment to authenticate with.
     * @param tokenCache - The token cache. Default value is the MemoryCache object from adal.
     */
    constructor(clientId: string, domain: string, tokenAudience?: TokenAudience, environment?: Environment, tokenCache?: TokenCache);
    protected getTokenFromCache(): Promise<TokenResponse>;
    /**
     * Removes invalid items from token cache. This method is different. Here we never reject in case of error.
     * Rather we resolve with an object that says the result is false and error information is provided in
     * the details property of the resolved object. This is done to do better error handling in the above function
     * where removeInvalidItemsFromCache() is called.
     * @param query - The query to be used for finding the token for service principal from the cache
     * @returns resultObject with more info.
     */
    private removeInvalidItemsFromCache;
}
//# sourceMappingURL=applicationTokenCredentialsBase.d.ts.map