import { Account } from "./Account";
import { StringDict } from "./MsalTypes";
/**
 * @link AuthenticationParameters}AuthenticationParameters
 */
export declare type AuthenticationParameters = {
    scopes?: Array<string>;
    extraScopesToConsent?: Array<string>;
    prompt?: string;
    extraQueryParameters?: StringDict;
    claimsRequest?: string;
    authority?: string;
    state?: string;
    correlationId?: string;
    account?: Account;
    sid?: string;
    loginHint?: string;
    forceRefresh?: boolean;
    redirectUri?: string;
    redirectStartPage?: string;
    authorityMetadata?: string;
    onRedirectNavigate?: ((url: string) => void | boolean);
};
export declare function validateClaimsRequest(request: AuthenticationParameters): void;
