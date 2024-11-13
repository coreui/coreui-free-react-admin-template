import { Authority } from "./authority/Authority";
import { AuthenticationParameters } from "./AuthenticationParameters";
import { StringDict } from "./MsalTypes";
import { Account } from "./Account";
/**
 * Nonce: OIDC Nonce definition: https://openid.net/specs/openid-connect-core-1_0.html#IDToken
 * State: OAuth Spec: https://tools.ietf.org/html/rfc6749#section-10.12
 * @hidden
 */
export declare class ServerRequestParameters {
    authorityInstance: Authority;
    clientId: string;
    scopes: Array<string>;
    nonce: string;
    state: string;
    xClientVer: string;
    xClientSku: string;
    correlationId: string;
    responseType: string;
    redirectUri: string;
    promptValue: string;
    claimsValue: string;
    queryParameters: string;
    extraQueryParameters: string;
    get authority(): string;
    /**
     * Constructor
     * @param authority
     * @param clientId
     * @param scope
     * @param responseType
     * @param redirectUri
     * @param state
     */
    constructor(authority: Authority, clientId: string, responseType: string, redirectUri: string, scopes: Array<string>, state: string, correlationId: string);
    /**
     * @hidden
     * @ignore
     *
     * Utility to populate QueryParameters and ExtraQueryParameters to ServerRequestParamerers
     * @param request
     * @param serverAuthenticationRequest
     */
    populateQueryParams(account: Account, request: AuthenticationParameters | null, adalIdTokenObject?: object, silentCall?: boolean): void;
    /**
     * Constructs extraQueryParameters to be sent to the server for the AuthenticationParameters set by the developer
     * in any login() or acquireToken() calls
     * @param idTokenObject
     * @param extraQueryParameters
     * @param sid
     * @param loginHint
     */
    private constructUnifiedCacheQueryParameter;
    /**
     * @hidden
     *
     * Adds login_hint to authorization URL which is used to pre-fill the username field of sign in page for the user if known ahead of time
     * domain_hint if added skips the email based discovery process of the user - only supported for interactive calls in implicit_flow
     * domain_req utid received as part of the clientInfo
     * login_req uid received as part of clientInfo
     * Also does a sanity check for extraQueryParameters passed by the user to ensure no repeat queryParameters
     *
     * @param {@link Account} account - Account for which the token is requested
     * @param queryparams
     * @param {@link ServerRequestParameters}
     * @ignore
     */
    private addHintParameters;
    /**
     * Add SID to extraQueryParameters
     * @param sid
     */
    private addSSOParameter;
    /**
     * Utility to generate a QueryParameterString from a Key-Value mapping of extraQueryParameters passed
     * @param extraQueryParameters
     */
    static generateQueryParametersString(queryParameters?: StringDict, silentCall?: boolean): string | null;
    /**
     * Check to see if there are SSO params set in the Request
     * @param request
     */
    static isSSOParam(request: AuthenticationParameters): boolean;
    /**
     * Returns the correct response_type string attribute for an acquireToken request configuration
     * @param accountsMatch boolean: Determines whether the account in the request matches the cached account
     * @param scopes Array<string>: AuthenticationRequest scopes configuration
     * @param loginScopesOnly boolean: True if the scopes array ONLY contains the clientId or any combination of OIDC scopes, without resource scopes
     */
    static determineResponseType(accountsMatch: boolean, scopes: Array<string>): string;
    /**
     * Returns the correct response_type string attribute for an acquireToken request configuration that contains an
     * account that matches the account in the MSAL cache.
     * @param scopes Array<string>: AuthenticationRequest scopes configuration
     */
    private static responseTypeForMatchingAccounts;
}
