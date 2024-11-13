import { ServiceClientCredentials } from "./serviceClientCredentials";
import { WebResource } from "../webResource";
import { TokenCredential } from "@azure/core-auth";
import { TokenResponse } from "./tokenResponse";
/**
 * Resource manager endpoints to match in order to specify a valid scope to the AzureIdentityCredentialAdapter.
 */
export declare const azureResourceManagerEndpoints: string[];
/**
 * This class provides a simple extension to use {@link TokenCredential} from `@azure/identity` library to
 * use with legacy Azure SDKs that accept {@link ServiceClientCredentials} family of credentials for authentication.
 */
export declare class AzureIdentityCredentialAdapter implements ServiceClientCredentials {
    private azureTokenCredential;
    private scopes;
    constructor(azureTokenCredential: TokenCredential, scopes?: string | string[]);
    getToken(): Promise<TokenResponse>;
    signRequest(webResource: WebResource): Promise<WebResource>;
}
//# sourceMappingURL=azureIdentityTokenCredentialAdapter.d.ts.map