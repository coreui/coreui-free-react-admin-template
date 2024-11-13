import { WebResource } from "@azure/ms-rest-js";
import { Environment } from "@azure/ms-rest-azure-env";
import { TokenClientCredentials } from "./tokenClientCredentials";
import { TokenResponse, AuthenticationContext, TokenCache } from "adal-node";
export declare abstract class TokenCredentialsBase implements TokenClientCredentials {
    readonly clientId: string;
    domain: string;
    readonly tokenAudience?: string | undefined;
    readonly environment: Environment;
    tokenCache: TokenCache;
    authContext: AuthenticationContext;
    constructor(clientId: string, domain: string, tokenAudience?: string | undefined, environment?: Environment, tokenCache?: TokenCache);
    setDomain(domain: string): void;
    protected getActiveDirectoryResourceId(): string;
    protected getTokenFromCache(username?: string): Promise<TokenResponse>;
    /**
     * Tries to get the token from cache initially. If that is unsuccessful then it tries to get the token from ADAL.
     *
     * @returns The tokenResponse (tokenType and accessToken are the two important properties).
     */
    abstract getToken(): Promise<TokenResponse>;
    /**
     * Signs a request with the Authentication header.
     *
     * @param webResource - The WebResource to be signed.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
}
//# sourceMappingURL=tokenCredentialsBase.d.ts.map