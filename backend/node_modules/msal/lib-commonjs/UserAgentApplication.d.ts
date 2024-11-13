import { Authority } from "./authority/Authority";
import { Logger } from "./Logger";
import { AuthCache } from "./cache/AuthCache";
import { Account } from "./Account";
import { Configuration } from "./Configuration";
import { AuthenticationParameters } from "./AuthenticationParameters";
import { AuthError } from "./error/AuthError";
import { AuthResponse } from "./AuthResponse";
/**
 * Interface to handle iFrame generation, Popup Window creation and redirect handling
 */
declare global {
    interface Window {
        msal: Object;
        CustomEvent: CustomEvent;
        Event: Event;
        activeRenewals: {};
        renewStates: Array<string>;
        callbackMappedToRenewStates: {};
        promiseMappedToRenewStates: {};
        openedWindows: Array<Window>;
        requestType: string;
    }
}
/**
 * @hidden
 * @ignore
 */
export interface CacheResult {
    errorDesc: string;
    token: string;
    error: string;
}
/**
 * @hidden
 * @ignore
 * Data type to hold information about state returned from the server
 */
export declare type ResponseStateInfo = {
    state: string;
    timestamp: number;
    method: string;
    stateMatch: boolean;
    requestType: string;
};
/**
 * A type alias for an authResponseCallback function.
 * {@link (authResponseCallback:type)}
 * @param authErr error created for failure cases
 * @param response response containing token strings in success cases, or just state value in error cases
 */
export declare type authResponseCallback = (authErr: AuthError, response?: AuthResponse) => void;
/**
 * A type alias for a tokenReceivedCallback function.
 * {@link (tokenReceivedCallback:type)}
 * @returns response of type {@link (AuthResponse:type)}
 * The function that will get the call back once this API is completed (either successfully or with a failure).
 */
export declare type tokenReceivedCallback = (response: AuthResponse) => void;
/**
 * A type alias for a errorReceivedCallback function.
 * {@link (errorReceivedCallback:type)}
 * @returns response of type {@link (AuthError:class)}
 * @returns {string} account state
 */
export declare type errorReceivedCallback = (authErr: AuthError, accountState: string) => void;
/**
 * UserAgentApplication class
 *
 * Object Instance that the developer can use to make loginXX OR acquireTokenXX functions
 */
export declare class UserAgentApplication {
    private config;
    private authResponseCallback;
    private tokenReceivedCallback;
    private errorReceivedCallback;
    private logger;
    private clientId;
    private inCookie;
    private telemetryManager;
    protected cacheStorage: AuthCache;
    private account;
    private silentAuthenticationState;
    private silentLogin;
    private redirectResponse;
    private redirectError;
    protected authorityInstance: Authority;
    /**
     * setter for the authority URL
     * @param {string} authority
     */
    set authority(val: string);
    /**
     * Method to manage the authority URL.
     *
     * @returns {string} authority
     */
    get authority(): string;
    /**
     * Get the current authority instance from the MSAL configuration object
     *
     * @returns {@link Authority} authority instance
     */
    getAuthorityInstance(): Authority;
    /**
     * @constructor
     * Constructor for the UserAgentApplication used to instantiate the UserAgentApplication object
     *
     * Important attributes in the Configuration object for auth are:
     * - clientID: the application ID of your application.
     * You can obtain one by registering your application with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
     * - authority: the authority URL for your application.
     *
     * In Azure AD, authority is a URL indicating the Azure active directory that MSAL uses to obtain tokens.
     * It is of the form https://login.microsoftonline.com/&lt;Enter_the_Tenant_Info_Here&gt;.
     * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
     * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
     * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
     * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
     *
     *
     * In Azure B2C, authority is of the form https://&lt;instance&gt;/tfp/&lt;tenant&gt;/&lt;policyName&gt;/
     *
     * @param {@link (Configuration:type)} configuration object for the MSAL UserAgentApplication instance
     */
    constructor(configuration: Configuration);
    /**
     * @hidden
     * @ignore
     * Set the callback functions for the redirect flow to send back the success or error object.
     * @param {@link (tokenReceivedCallback:type)} successCallback - Callback which contains the AuthResponse object, containing data from the server.
     * @param {@link (errorReceivedCallback:type)} errorCallback - Callback which contains a AuthError object, containing error data from either the server
     * or the library, depending on the origin of the error.
     */
    handleRedirectCallback(tokenReceivedCallback: tokenReceivedCallback, errorReceivedCallback: errorReceivedCallback): void;
    handleRedirectCallback(authCallback: authResponseCallback): void;
    /**
     * Public API to verify if the URL contains the hash with known properties
     * @param hash
     */
    urlContainsHash(hash: string): boolean;
    private authResponseHandler;
    private authErrorHandler;
    /**
     * Use when initiating the login process by redirecting the user's browser to the authorization endpoint.
     * @param {@link (AuthenticationParameters:type)}
     */
    loginRedirect(userRequest?: AuthenticationParameters): void;
    /**
     * Use when you want to obtain an access_token for your API by redirecting the user's browser window to the authorization endpoint.
     * @param {@link (AuthenticationParameters:type)}
     *
     * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
     */
    acquireTokenRedirect(userRequest: AuthenticationParameters): void;
    /**
     * Use when initiating the login process via opening a popup window in the user's browser
     *
     * @param {@link (AuthenticationParameters:type)}
     *
     * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
     */
    loginPopup(userRequest?: AuthenticationParameters): Promise<AuthResponse>;
    /**
     * Use when you want to obtain an access_token for your API via opening a popup window in the user's browser
     * @param {@link AuthenticationParameters}
     *
     * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
     * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
     */
    acquireTokenPopup(userRequest: AuthenticationParameters): Promise<AuthResponse>;
    /**
     * Use when initiating the login process or when you want to obtain an access_token for your API,
     * either by redirecting the user's browser window to the authorization endpoint or via opening a popup window in the user's browser.
     * @param {@link (AuthenticationParameters:type)}
     *
     * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
     */
    private acquireTokenInteractive;
    /**
     * @hidden
     * @ignore
     * Helper function to acquireToken
     *
     */
    private acquireTokenHelper;
    /**
     * API interfacing idToken request when applications already have a session/hint acquired by authorization client applications
     * @param request
     */
    ssoSilent(request: AuthenticationParameters): Promise<AuthResponse>;
    /**
     * Use this function to obtain a token before every call to the API / resource provider
     *
     * MSAL return's a cached token when available
     * Or it send's a request to the STS to obtain a new token using a hidden iframe.
     *
     * @param {@link AuthenticationParameters}
     *
     * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
     * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
     *
     */
    acquireTokenSilent(userRequest: AuthenticationParameters): Promise<AuthResponse>;
    /**
     * @hidden
     *
     * Configures popup window for login.
     *
     * @param urlNavigate
     * @param title
     * @param popUpWidth
     * @param popUpHeight
     * @ignore
     * @hidden
     */
    private openPopup;
    /**
     * @hidden
     * Calling _loadFrame but with a timeout to signal failure in loadframeStatus. Callbacks are left.
     * registered when network errors occur and subsequent token requests for same resource are registered to the pending request.
     * @ignore
     */
    private loadIframeTimeout;
    /**
     * @hidden
     * Used to redirect the browser to the STS authorization endpoint
     * @param {string} urlNavigate - URL of the authorization endpoint
     */
    private navigateWindow;
    /**
     * @hidden
     * Used to add the developer requested callback to the array of callbacks for the specified scopes. The updated array is stored on the window object
     * @param {string} expectedState - Unique state identifier (guid).
     * @param {string} scope - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {Function} resolve - The resolve function of the promise object.
     * @param {Function} reject - The reject function of the promise object.
     * @ignore
     */
    private registerCallback;
    /**
     * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     */
    logout(correlationId?: string): void;
    /**
     * Async version of logout(). Use to log out the current user.
     * @param correlationId Request correlationId
     */
    private logoutAsync;
    /**
     * @hidden
     * Clear all access tokens and ID tokens in the cache.
     * @ignore
     */
    protected clearCache(): void;
    /**
     * @hidden
     * Clear a given access token from the cache.
     *
     * @param accessToken
     */
    protected clearCacheForScope(accessToken: string): void;
    /**
     * @hidden
     * @ignore
     * Checks if the redirect response is received from the STS. In case of redirect, the url fragment has either id_token, access_token or error.
     * @param {string} hash - Hash passed from redirect page.
     * @returns {Boolean} - true if response contains id_token, access_token or error, false otherwise.
     */
    isCallback(hash: string): boolean;
    /**
     * @hidden
     * Used to call the constructor callback with the token/error
     * @param {string} [hash=window.location.hash] - Hash fragment of Url.
     */
    private processCallBack;
    /**
     * @hidden
     * This method must be called for processing the response received from the STS if using popups or iframes. It extracts the hash, processes the token or error
     * information and saves it in the cache. It then resolves the promises with the result.
     * @param {string} [hash=window.location.hash] - Hash fragment of Url.
     */
    private handleAuthenticationResponse;
    /**
     * @hidden
     * This method must be called for processing the response received from the STS when using redirect flows. It extracts the hash, processes the token or error
     * information and saves it in the cache. The result can then be accessed by user registered callbacks.
     * @param {string} [hash=window.location.hash] - Hash fragment of Url.
     */
    private handleRedirectAuthenticationResponse;
    /**
     * @hidden
     * Creates a stateInfo object from the URL fragment and returns it.
     * @param {string} hash  -  Hash passed from redirect page
     * @returns {TokenResponse} an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
     * @ignore
     */
    protected getResponseState(hash: string): ResponseStateInfo;
    /**
     * @hidden
     * Used to get token for the specified set of scopes from the cache
     * @param {@link ServerRequestParameters} - Request sent to the STS to obtain an id_token/access_token
     * @param {Account} account - Account for which the scopes were requested
     */
    private getCachedToken;
    /**
     * @hidden
     *
     * Uses passed in authority to further filter an array of tokenCacheItems until only the token being searched for remains, then returns that tokenCacheItem.
     * This method will throw if authority filtering still yields multiple matching tokens and will return null if not tokens match the authority passed in.
     *
     * @param authority
     * @param tokenCacheItems
     * @param request
     * @param requestScopes
     * @param tokenType
     */
    private getTokenCacheItemByAuthority;
    /**
     *
     * @hidden
     *
     * Searches the token cache for an ID Token that matches the request parameter and returns it as an IdToken object.
     *
     * @param serverAuthenticationRequest
     * @param account
     */
    private getCachedIdToken;
    /**
     *
     * @hidden
     *
     * Searches the token cache for an access token that matches the request parameters and returns it as an AuthResponse.
     *
     * @param serverAuthenticationRequest
     * @param account
     * @param scopes
     */
    private getCachedAccessToken;
    /**
     * Returns true if the token passed in is within the acceptable expiration time offset, false if it is expired.
     * @param tokenCacheItem
     * @param serverAuthenticationRequest
     */
    private evaluateTokenExpiration;
    /**
     * @hidden
     * Check if ADAL id_token exists and return if exists.
     *
     */
    private extractADALIdToken;
    /**
     * @hidden
     * Acquires access token using a hidden iframe.
     * @ignore
     */
    private renewToken;
    /**
     * @hidden
     * Renews idtoken for app's own backend when clientId is passed as a single scope in the scopes array.
     * @ignore
     */
    private renewIdToken;
    /**
     * @hidden
     *
     * This method builds an Access Token Cache item and saves it to the cache, returning the original
     * AuthResponse augmented with a parsed expiresOn attribute.
     *
     * @param response The AuthResponse object that contains the token to be saved
     * @param authority The authority under which the ID token will be cached
     * @param scopes The scopes to be added to the cache item key (undefined for ID token cache items)
     * @param clientInfo Client Info object that is used to generate the homeAccountIdentifier
     * @param expiration Token expiration timestamp
     */
    private saveToken;
    /**
     * @hidden
     *
     * This method sets up the elements of an ID Token cache item and calls saveToken to save it in
     * Access Token Cache item format for the client application to use.
     *
     * @param response The AuthResponse object that will be used to build the cache item
     * @param authority The authority under which the ID token will be cached
     * @param parameters The response's Hash Params, which contain the ID token returned from the server
     * @param clientInfo Client Info object that is used to generate the homeAccountIdentifier
     * @param idTokenObj ID Token object from which the ID token's expiration is extracted
     */
    private saveIdToken;
    /**
     * @hidden
     *
     * This method sets up the elements of an Access Token cache item and calls saveToken to save it to the cache
     *
     * @param response The AuthResponse object that will be used to build the cache item
     * @param authority The authority under which the access token will be cached
     * @param parameters The response's Hash Params, which contain the access token returned from the server
     * @param clientInfo Client Info object that is used to generate the homeAccountIdentifier
     */
    private saveAccessToken;
    /**
     * @hidden
     * Saves token or error received in the response from AAD in the cache. In case of id_token, it also creates the account object.
     * @ignore
     */
    protected saveTokenFromHash(hash: string, stateInfo: ResponseStateInfo): AuthResponse;
    /**
     * Set Authority when saving Token from the hash
     * @param state
     * @param inCookie
     * @param cacheStorage
     * @param idTokenObj
     * @param response
     */
    private populateAuthority;
    /**
     * Returns the signed in account
     * (the account object is created at the time of successful login)
     * or null when no state is found
     * @returns {@link Account} - the account object stored in MSAL
     */
    getAccount(): Account;
    /**
     * @hidden
     *
     * Extracts state value from the accountState sent with the authentication request.
     * @returns {string} scope.
     * @ignore
     */
    getAccountState(state: string): string;
    /**
     * Use to get a list of unique accounts in MSAL cache based on homeAccountIdentifier.
     *
     * @param {@link Array<Account>} Account - all unique accounts in MSAL cache.
     */
    getAllAccounts(): Array<Account>;
    /**
     * @hidden
     *
     * Used to filter accounts based on homeAccountIdentifier
     * @param {Array<Account>}  Accounts - accounts saved in the cache
     * @ignore
     */
    private getUniqueAccounts;
    /**
     * @hidden
     *
     * Broadcast messages - Used only for Angular?  *
     * @param eventName
     * @param data
     */
    private broadcast;
    /**
     * @hidden
     *
     * Helper function to retrieve the cached token
     *
     * @param scopes
     * @param {@link Account} account
     * @param state
     * @return {@link AuthResponse} AuthResponse
     */
    protected getCachedTokenInternal(scopes: Array<string>, account: Account, state: string, correlationId?: string): AuthResponse;
    /**
     * @hidden
     *
     * Get scopes for the Endpoint - Used in Angular to track protected and unprotected resources without interaction from the developer app
     * Note: Please check if we need to set the "redirectUri" from the "request" which makes this call from Angular - for this.getRedirectUri()
     *
     * @param endpoint
     */
    protected getScopesForEndpoint(endpoint: string): Array<string>;
    /**
     * Return boolean flag to developer to help inform if login is in progress
     * @returns {boolean} true/false
     */
    getLoginInProgress(): boolean;
    /**
     * @hidden
     * @ignore
     *
     * @param loginInProgress
     */
    protected setInteractionInProgress(inProgress: boolean): void;
    /**
     * @hidden
     * @ignore
     *
     * @param loginInProgress
     */
    protected setloginInProgress(loginInProgress: boolean): void;
    /**
     * @hidden
     * @ignore
     *
     * returns the status of acquireTokenInProgress
     */
    protected getAcquireTokenInProgress(): boolean;
    /**
     * @hidden
     * @ignore
     *
     * @param acquireTokenInProgress
     */
    protected setAcquireTokenInProgress(acquireTokenInProgress: boolean): void;
    /**
     * @hidden
     * @ignore
     *
     * returns the logger handle
     */
    getLogger(): Logger;
    /**
     * Sets the logger callback.
     * @param logger Logger callback
     */
    setLogger(logger: Logger): void;
    /**
     * Use to get the redirect uri configured in MSAL or null.
     * Evaluates redirectUri if its a function, otherwise simply returns its value.
     *
     * @returns {string} redirect URL
     */
    getRedirectUri(reqRedirectUri?: string): string;
    /**
     * Use to get the post logout redirect uri configured in MSAL or null.
     * Evaluates postLogoutredirectUri if its a function, otherwise simply returns its value.
     *
     * @returns {string} post logout redirect URL
     */
    getPostLogoutRedirectUri(): string;
    /**
     * Use to get the current {@link Configuration} object in MSAL
     *
     * @returns {@link Configuration}
     */
    getCurrentConfiguration(): Configuration;
    /**
     * @ignore
     *
     * Utils function to create the Authentication
     * @param {@link account} account object
     * @param scopes
     *
     * @returns {string} token type: token, id_token or id_token token
     *
     */
    private getTokenType;
    /**
     * @hidden
     * @ignore
     *
     * Sets the cachekeys for and stores the account information in cache
     * @param account
     * @param state
     * @hidden
     */
    private setAccountCache;
    /**
     * @hidden
     * @ignore
     *
     * Sets the cacheKey for and stores the authority information in cache
     * @param state
     * @param authority
     * @hidden
     */
    private setAuthorityCache;
    /**
     * Updates account, authority, and nonce in cache
     * @param serverAuthenticationRequest
     * @param account
     * @hidden
     * @ignore
     */
    private updateCacheEntries;
    /**
     * Returns the unique identifier for the logged in account
     * @param account
     * @hidden
     * @ignore
     */
    private getAccountId;
    /**
     * @ignore
     * @param extraQueryParameters
     *
     * Construct 'tokenRequest' from the available data in adalIdToken
     */
    private buildIDTokenRequest;
    /**
     * @ignore
     * @param config
     * @param clientId
     *
     * Construct TelemetryManager from Configuration
     */
    private getTelemetryManagerFromConfig;
}
