import { AuthenticationResult, Logger } from "@azure/msal-common";
import { AuthorizationCodeRequest } from "../request/AuthorizationCodeRequest";
import { AuthorizationUrlRequest } from "../request/AuthorizationUrlRequest";
import { DeviceCodeRequest } from "../request/DeviceCodeRequest";
import { RefreshTokenRequest } from "../request/RefreshTokenRequest";
import { SilentFlowRequest } from "../request/SilentFlowRequest";
import { UsernamePasswordRequest } from "../request/UsernamePasswordRequest";
import { TokenCache } from "../cache/TokenCache";
/**
 * Interface for the PublicClientApplication class defining the public API signatures
 * @public
 */
export interface IPublicClientApplication {
    /** Creates the URL of the authorization request */
    getAuthCodeUrl(request: AuthorizationUrlRequest): Promise<string>;
    /** Acquires a token by exchanging the authorization code received from the first step of OAuth 2.0 Authorization Code Flow */
    acquireTokenByCode(request: AuthorizationCodeRequest): Promise<AuthenticationResult | null>;
    /** Acquires a token silently when a user specifies the account the token is requested for */
    acquireTokenSilent(request: SilentFlowRequest): Promise<AuthenticationResult | null>;
    /** Acquires a token by exchanging the refresh token provided for a new set of tokens */
    acquireTokenByRefreshToken(request: RefreshTokenRequest): Promise<AuthenticationResult | null>;
    /** Acquires a token from the authority using OAuth2.0 device code flow */
    acquireTokenByDeviceCode(request: DeviceCodeRequest): Promise<AuthenticationResult | null>;
    /** Acquires tokens with password grant by exchanging client applications username and password for credentials */
    acquireTokenByUsernamePassword(request: UsernamePasswordRequest): Promise<AuthenticationResult | null>;
    /** Gets the token cache for the application */
    getTokenCache(): TokenCache;
    /** Returns the logger instance */
    getLogger(): Logger;
    /** Replaces the default logger set in configurations with new Logger with new configurations */
    setLogger(logger: Logger): void;
}
//# sourceMappingURL=IPublicClientApplication.d.ts.map