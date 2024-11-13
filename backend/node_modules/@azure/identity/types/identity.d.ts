import { AccessToken } from '@azure/core-auth';
import { AzureLogger } from '@azure/logger';
import { GetTokenOptions } from '@azure/core-auth';
import { PipelineOptions } from '@azure/core-rest-pipeline';
import { TokenCredential } from '@azure/core-auth';
export { AccessToken }

/**
 * Provides an `errors` array containing {@link AuthenticationError} instance
 * for authentication failures from credentials in a {@link ChainedTokenCredential}.
 */
export declare class AggregateAuthenticationError extends Error {
    /**
     * The array of error objects that were thrown while trying to authenticate
     * with the credentials in a {@link ChainedTokenCredential}.
     */
    errors: any[];
    constructor(errors: any[], errorMessage?: string);
}

/**
 * The Error.name value of an AggregateAuthenticationError
 */
export declare const AggregateAuthenticationErrorName = "AggregateAuthenticationError";

/**
 * Provides details about a failure to authenticate with Azure Active
 * Directory.  The `errorResponse` field contains more details about
 * the specific failure.
 */
export declare class AuthenticationError extends Error {
    /**
     * The HTTP status code returned from the authentication request.
     */
    readonly statusCode: number;
    /**
     * The error response details.
     */
    readonly errorResponse: ErrorResponse;
    constructor(statusCode: number, errorBody: object | string | undefined | null);
}

/**
 * The Error.name value of an AuthenticationError
 */
export declare const AuthenticationErrorName = "AuthenticationError";

/**
 * The record to use to find the cached tokens in the cache
 */
export declare interface AuthenticationRecord {
    /**
     * The associated authority, if used
     */
    authority?: string;
    /**
     * The home account Id
     */
    homeAccountId: string;
    /**
     * The login environment, eg "login.windows.net"
     */
    environment: string;
    /**
     * The associated tenant ID
     */
    tenantId: string;
    /**
     * Local, tenant-specific account identifer for this account object, usually used in legacy cases
     */
    localAccountId: string;
    /**
     * The username of the logged in account
     */
    username: string;
}

/**
 * Enables authentication to Azure Active Directory using an authorization code
 * that was obtained through the authorization code flow, described in more detail
 * in the Azure Active Directory documentation:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 */
export declare class AuthorizationCodeCredential implements TokenCredential {
    private identityClient;
    private tenantId;
    private clientId;
    private clientSecret;
    private authorizationCode;
    private redirectUri;
    private lastTokenResponse;
    /**
     * Creates an instance of CodeFlowCredential with the details needed
     * to request an access token using an authentication that was obtained
     * from Azure Active Directory.
     *
     * It is currently necessary for the user of this credential to initiate
     * the authorization code flow to obtain an authorization code to be used
     * with this credential.  A full example of this flow is provided here:
     *
     * https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/manual/authorizationCodeSample.ts
     *
     * @param tenantId - The Azure Active Directory tenant (directory) ID or name.
     *                 'common' may be used when dealing with multi-tenant scenarios.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param clientSecret - A client secret that was generated for the App Registration
     * @param authorizationCode - An authorization code that was received from following the
                                authorization code flow.  This authorization code must not
                                have already been used to obtain an access token.
     * @param redirectUri - The redirect URI that was used to request the authorization code.
                          Must be the same URI that is configured for the App Registration.
     * @param options - Options for configuring the client which makes the access token request.
     */
    constructor(tenantId: string | "common", clientId: string, clientSecret: string, authorizationCode: string, redirectUri: string, options?: TokenCredentialOptions);
    /**
     * Creates an instance of CodeFlowCredential with the details needed
     * to request an access token using an authentication that was obtained
     * from Azure Active Directory.
     *
     * It is currently necessary for the user of this credential to initiate
     * the authorization code flow to obtain an authorization code to be used
     * with this credential.  A full example of this flow is provided here:
     *
     * https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/manual/authorizationCodeSample.ts
     *
     * @param tenantId - The Azure Active Directory tenant (directory) ID or name.
     *                 'common' may be used when dealing with multi-tenant scenarios.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param authorizationCode - An authorization code that was received from following the
                                authorization code flow.  This authorization code must not
                                have already been used to obtain an access token.
     * @param redirectUri - The redirect URI that was used to request the authorization code.
                          Must be the same URI that is configured for the App Registration.
     * @param options - Options for configuring the client which makes the access token request.
     */
    constructor(tenantId: string | "common", clientId: string, authorizationCode: string, redirectUri: string, options?: TokenCredentialOptions);
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * A list of known Azure authority hosts
 */
export declare enum AzureAuthorityHosts {
    /**
     * China-based Azure Authority Host
     */
    AzureChina = "https://login.chinacloudapi.cn",
    /**
     * Germany-based Azure Authority Host
     */
    AzureGermany = "https://login.microsoftonline.de",
    /**
     * US Government Azure Authority Host
     */
    AzureGovernment = "https://login.microsoftonline.us",
    /**
     * Public Cloud Azure Authority Host
     */
    AzurePublicCloud = "https://login.microsoftonline.com"
}

/**
 * This credential will use the currently logged-in user login information
 * via the Azure CLI ('az') commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure CLI command "az account get-access-token".
 * To be able to use this credential, ensure that you have already logged
 * in via the 'az' tool using the command "az login" from the commandline.
 */
export declare class AzureCliCredential implements TokenCredential {
    /**
     * Gets the access token from Azure CLI
     * @param resource - The resource to use when getting the token
     */
    protected getAzureCliAccessToken(resource: string): Promise<{
        stdout: string;
        stderr: string;
        error: Error | null;
    }>;
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * The "login style" to use in the authentication flow:
 * - "redirect" redirects the user to the authentication page and then
 *   redirects them back to the page once authentication is completed.
 * - "popup" opens a new browser window through with the redirect flow
 *   is initiated.  The user's existing browser window does not leave
 *   the current page
 */
export declare type BrowserLoginStyle = "redirect" | "popup";

/**
 * Enables multiple `TokenCredential` implementations to be tried in order
 * until one of the getToken methods returns an access token.
 */
export declare class ChainedTokenCredential implements TokenCredential {
    /**
     * The message to use when the chained token fails to get a token
     */
    protected UnavailableMessage: string;
    private _sources;
    /**
     * Creates an instance of ChainedTokenCredential using the given credentials.
     *
     * @param sources - `TokenCredential` implementations to be tried in order.
     *
     * Example usage:
     * ```javascript
     * const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
     * const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
     * const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
     * ```
     */
    constructor(...sources: TokenCredential[]);
    /**
     * Returns the first access token returned by one of the chained
     * `TokenCredential` implementations.  Throws an {@link AggregateAuthenticationError}
     * when one or more credentials throws an {@link AuthenticationError} and
     * no credentials have returned an access token.
     *
     * This method is called automatically by Azure SDK client libraries. You may call this method
     * directly, but you must also handle token caching and token refreshing.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * Enables authentication to Azure Active Directory using a PEM-encoded
 * certificate that is assigned to an App Registration.  More information
 * on how to configure certificate authentication can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-certificate-credentials#register-your-certificate-with-azure-ad
 *
 */
export declare class ClientCertificateCredential implements TokenCredential {
    private identityClient;
    private tenantId;
    private clientId;
    private certificateString;
    private certificateThumbprint;
    private certificateX5t;
    private certificateX5c?;
    /**
     * Creates an instance of the ClientCertificateCredential with the details
     * needed to authenticate against Azure Active Directory with a certificate.
     *
     * @param tenantId - The Azure Active Directory tenant (directory) ID.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param certificatePath - The path to a PEM-encoded public/private key certificate on the filesystem.
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantId: string, clientId: string, certificatePath: string, options?: ClientCertificateCredentialOptions);
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * Defines options for the SubjectNameAndIssuerCredential class.
 */
export declare interface ClientCertificateCredentialOptions extends TokenCredentialOptions {
    /**
     * Option to include x5c header for SubjectName and Issuer name authorization.
     * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
     */
    sendCertificateChain?: boolean;
}

/**
 * Enables authentication to Azure Active Directory using a client secret
 * that was generated for an App Registration.  More information on how
 * to configure a client secret can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application
 *
 */
export declare class ClientSecretCredential implements TokenCredential {
    private identityClient;
    private tenantId;
    private clientId;
    private clientSecret;
    /**
     * Creates an instance of the ClientSecretCredential with the details
     * needed to authenticate against Azure Active Directory with a client
     * secret.
     *
     * @param tenantId - The Azure Active Directory tenant (directory) ID.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param clientSecret - A client secret that was generated for the App Registration.
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantId: string, clientId: string, clientSecret: string, options?: TokenCredentialOptions);
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * This signifies that the credential that was tried in a chained credential
 * was not available to be used as the credential. Rather than treating this as
 * an error that should halt the chain, it's caught and the chain continues
 */
export declare class CredentialUnavailable extends Error {
}

/**
 * Provides a default {@link ChainedTokenCredential} configuration for
 * applications that will be deployed to Azure.  The following credential
 * types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link ManagedIdentityCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
export declare class DefaultAzureCredential extends ChainedTokenCredential {
    /**
     * Creates an instance of the DefaultAzureCredential class.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tokenCredentialOptions?: DefaultAzureCredentialOptions);
}

/**
 * Provides options to configure the default Azure credentials.
 */
export declare interface DefaultAzureCredentialOptions extends TokenCredentialOptions {
    /**
     * Optionally pass in a Tenant ID to be used as part of the credential
     */
    tenantId?: string;
    /**
     * Optionally pass in a user assigned client ID for the ManagedIdentityCredential
     */
    managedIdentityClientId?: string;
}

/**
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
export declare class DeviceCodeCredential implements TokenCredential {
    private userPromptCallback;
    private msalClient;
    /**
     * Creates an instance of DeviceCodeCredential with the details needed
     * to initiate the device code authorization flow with Azure Active Directory.
     *
     * @param tenantId - The Azure Active Directory tenant (directory) ID or name.
     *                   The default value is 'organizations'.
     *                   'organizations' may be used when dealing with multi-tenant scenarios.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     *                   By default we will try to use the Azure CLI's client ID to authenticate.
     * @param userPromptCallback - A callback function that will be invoked to show
                                 {@link DeviceCodeInfo} to the user. If left unassigned, we will automatically log the device code information and the authentication instructions in the console.
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantId?: string, clientId?: string, userPromptCallback?: DeviceCodePromptCallback, options?: TokenCredentialOptions);
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
    private acquireTokenByDeviceCode;
}

/**
 * Provides the user code and verification URI where the code must be
 * entered.  Also provides a message to display to the user which
 * contains an instruction with these details.
 */
export declare interface DeviceCodeInfo {
    /**
     * The device code that the user must enter into the verification page.
     */
    userCode: string;
    /**
     * The verification URI to which the user must navigate to enter the device
     * code.
     */
    verificationUri: string;
    /**
     * A message that may be shown to the user to instruct them on how to enter
     * the device code in the page specified by the verification URI.
     */
    message: string;
}

/**
 * Defines the signature of a callback which will be passed to
 * DeviceCodeCredential for the purpose of displaying authentication
 * details to the user.
 */
export declare type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;

/**
 * Enables authentication to Azure Active Directory using client secret
 * details configured in the following environment variables:
 *
 * - AZURE_TENANT_ID: The Azure Active Directory tenant (directory) ID.
 * - AZURE_CLIENT_ID: The client (application) ID of an App Registration in the tenant.
 * - AZURE_CLIENT_SECRET: A client secret that was generated for the App Registration.
 *
 * This credential ultimately uses a {@link ClientSecretCredential} to
 * perform the authentication using these details.  Please consult the
 * documentation of that class for more details.
 */
export declare class EnvironmentCredential implements TokenCredential {
    private _credential?;
    /**
     * Creates an instance of the EnvironmentCredential class and reads
     * client secret details from environment variables.  If the expected
     * environment variables are not found at this time, the getToken method
     * will return null when invoked.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(options?: TokenCredentialOptions);
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * See the official documentation for more details:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v1-protocols-oauth-code#error-response-1
 *
 * NOTE: This documentation is for v1 OAuth support but the same error
 * response details still apply to v2.
 */
export declare interface ErrorResponse {
    /**
     * The string identifier for the error.
     */
    error: string;
    /**
     * The error's description.
     */
    errorDescription: string;
    /**
     * An array of codes pertaining to the error(s) that occurred.
     */
    errorCodes?: number[];
    /**
     * The timestamp at which the error occurred.
     */
    timestamp?: string;
    /**
     * The trace identifier for this error occurrence.
     */
    traceId?: string;
    /**
     * The correlation ID to be used for tracking the source of the error.
     */
    correlationId?: string;
}

/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
export declare function getDefaultAzureCredential(): TokenCredential;
export { GetTokenOptions }

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.  This credential is not currently supported in Node.js.
 */
export declare class InteractiveBrowserCredential implements TokenCredential {
    private redirectUri;
    private port;
    private hostname;
    private msalClient;
    constructor(options?: InteractiveBrowserCredentialOptions);
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                  TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    private openAuthCodeUrl;
    private acquireTokenFromBrowser;
}

/**
 * Defines options for the InteractiveBrowserCredential class.
 */
export declare interface InteractiveBrowserCredentialOptions extends TokenCredentialOptions {
    /**
     * Specifies whether a redirect or a popup window should be used to
     * initiate the user authentication flow. Possible values are "redirect"
     * or "popup" (default) for browser and "popup" (default) for node.
     *
     */
    loginStyle?: BrowserLoginStyle;
    /**
     * Gets the redirect URI of the application. This should be same as the value
     * in the application registration portal.  Defaults to `window.location.href`.
     */
    redirectUri?: string | (() => string);
    /**
     * Gets the URI to which the user will be redirected when logging out.
     * Defaults to `window.location.href`.
     */
    postLogoutRedirectUri?: string | (() => string);
    /**
     * The Azure Active Directory tenant (directory) ID.
     */
    tenantId?: string;
    /**
     * The client (application) ID of an App Registration in the tenant.
     */
    clientId?: string;
}

/**
 * The AzureLogger used for all clients within the identity package
 */
export declare const logger: AzureLogger;

/**
 * Attempts authentication using a managed identity that has been assigned
 * to the deployment environment.  This authentication type works in Azure VMs,
 * App Service and Azure Functions applications, and inside of Azure Cloud Shell.
 *
 * More information about configuring managed identities can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
 */
export declare class ManagedIdentityCredential implements TokenCredential {
    private identityClient;
    private clientId;
    private isEndpointUnavailable;
    /**
     * Creates an instance of ManagedIdentityCredential with the client ID of a
     * user-assigned identity.
     *
     * @param clientId - The client ID of the user-assigned identity.
     * @param options - Options for configuring the client which makes the access token request.
     */
    constructor(clientId: string, options?: TokenCredentialOptions);
    /**
     * Creates an instance of ManagedIdentityCredential
     *
     * @param options - Options for configuring the client which makes the access token request.
     */
    constructor(options?: TokenCredentialOptions);
    private cachedMSI;
    private cachedAvailableMSI;
    private authenticateManagedIdentity;
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}
export { TokenCredential }

/**
 * Provides options to configure how the Identity library makes authentication
 * requests to Azure Active Directory.
 */
export declare interface TokenCredentialOptions extends PipelineOptions {
    /**
     * The authority host to use for authentication requests.
     * Possible values are available through {@link AzureAuthorityHosts}.
     * The default is "https://login.microsoftonline.com".
     */
    authorityHost?: string;
}

/**
 * Enables authentication to Azure Active Directory with a user's
 * username and password. This credential requires a high degree of
 * trust so you should only use it when other, more secure credential
 * types can't be used.
 */
export declare class UsernamePasswordCredential implements TokenCredential {
    private identityClient;
    private tenantId;
    private clientId;
    private username;
    private password;
    /**
     * Creates an instance of the UsernamePasswordCredential with the details
     * needed to authenticate against Azure Active Directory with a username
     * and password.
     *
     * @param tenantIdOrName - The Azure Active Directory tenant (directory) ID or name.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param username - The user account's e-mail address (user name).
     * @param password - The user account's account password
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantIdOrName: string, clientId: string, username: string, password: string, options?: TokenCredentialOptions);
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * Connect to Azure using the credential provided by the VSCode extension 'Azure Account'.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 */
export declare class VisualStudioCodeCredential implements TokenCredential {
    private identityClient;
    private tenantId;
    private cloudName;
    /**
     * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(options?: VisualStudioCodeCredentialOptions);
    /**
     * Runs preparations for any further getToken request.
     */
    private prepare;
    /**
     * The promise of the single preparation that will be executed at the first getToken request for an instance of this class.
     */
    private preparePromise;
    /**
     * Runs preparations for any further getToken, but only once.
     */
    private prepareOnce;
    /**
     * Returns the token found by searching VSCode's authentication cache or
     * returns null if no token could be found.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */
    getToken(scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/**
 * Provides options to configure the Visual Studio Code credential.
 */
export declare interface VisualStudioCodeCredentialOptions extends TokenCredentialOptions {
    /**
     * Optionally pass in a Tenant ID to be used as part of the credential
     */
    tenantId?: string;
}

export { }
