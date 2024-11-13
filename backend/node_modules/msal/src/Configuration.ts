/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Logger } from "./Logger";
import { UrlUtils } from "./utils/UrlUtils";
import { TelemetryEmitter } from "./telemetry/TelemetryTypes";

/**
 * Cache location options supported by MSAL are:
 * - local storage: MSAL uses browsers local storage to store its cache
 * - session storage: MSAL uses the browsers session storage to store its cache
 */
export type CacheLocation = "localStorage" | "sessionStorage";

/**
 * Defaults for the Configuration Options
 */
const FRAME_TIMEOUT = 6000;
const OFFSET = 300;
const NAVIGATE_FRAME_WAIT = 500;

/**
 * @type AuthOptions: Use this to configure the auth options in the Configuration object
 *
 *  - clientId                    - Client ID of your app registered with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview in Microsoft Identity Platform
 *  - authority                   - You can configure a specific authority, defaults to " " or "https://login.microsoftonline.com/common"
 *  - validateAuthority           - Used to turn authority validation on/off. When set to true (default), MSAL will compare the application's authority against well-known URLs templates representing well-formed authorities. It is useful when the authority is obtained at run time to prevent MSAL from displaying authentication prompts from malicious pages.
 *  - authorityMetadata           - OpenID configuration metadata for the configured authority. Must be passed as a JSON string.
 *  - knownAuthorities            - If validateAuthority is set to True, this will be used to set the Trusted Host list. Defaults to empty array
 *  - redirectUri                 - The redirect URI of the application, this should be same as the value in the application registration portal.Defaults to `window.location.href`.
 *  - postLogoutRedirectUri       - Used to redirect the user to this location after logout. Defaults to `window.location.href`.
 *  - navigateToLoginRequestUrl   - Used to turn off default navigation to start page after login. Default is true. This is used only for redirect flows.
 *
 */
export type AuthOptions = {
    clientId: string;
    authority?: string;
    validateAuthority?: boolean;
    authorityMetadata?: string;
    knownAuthorities?: Array<string>;
    redirectUri?: string | (() => string);
    postLogoutRedirectUri?: string | (() => string);
    navigateToLoginRequestUrl?: boolean;
};

/**
 * Use this to configure the below cache configuration options:
 *
 * - cacheLocation            - Used to specify the cacheLocation user wants to set. Valid values are "localStorage" and "sessionStorage"
 * - storeAuthStateInCookie   - If set, MSAL store's the auth request state required for validation of the auth flows in the browser cookies. By default this flag is set to false.
 */
export type CacheOptions = {
    cacheLocation?: CacheLocation;
    storeAuthStateInCookie?: boolean;
};

/**
 * Telemetry Config Options
 * - applicationName              - Name of the consuming apps application
 * - applicationVersion           - Verison of the consuming application
 * - telemetryEmitter             - Function where telemetry events are flushed to
 */
export type TelemetryOptions = {
    applicationName: string;
    applicationVersion: string;
    telemetryEmitter: TelemetryEmitter
    // TODO, add onlyAddFailureTelemetry option
};

/**
 * Library Specific Options
 *
 * - logger                       - Used to initialize the Logger object; TODO: Expand on logger details or link to the documentation on logger
 * - loadFrameTimeout             - maximum time the library should wait for a frame to load
 * - tokenRenewalOffsetSeconds    - sets the window of offset needed to renew the token before expiry
 * - navigateFrameWait            - sets the wait time for hidden iFrame navigation
 */
export type SystemOptions = {
    logger?: Logger;
    loadFrameTimeout?: number;
    tokenRenewalOffsetSeconds?: number;
    navigateFrameWait?: number;
    telemetry?: TelemetryOptions
};

/**
 * App/Framework specific environment support
 *
 * - isAngular                - flag set to determine if it is Angular Framework. MSAL uses this to broadcast tokens. More to come here: detangle this dependency from core.
 * - unprotectedResources     - Array of URI's which are unprotected resources. MSAL will not attach a token to outgoing requests that have these URI. Defaults to 'null'.
 * - protectedResourceMap     - This is mapping of resources to scopes used by MSAL for automatically attaching access tokens in web API calls.A single access token is obtained for the resource. So you can map a specific resource path as follows: {"https://graph.microsoft.com/v1.0/me", ["user.read"]}, or the app URL of the resource as: {"https://graph.microsoft.com/", ["user.read", "mail.send"]}. This is required for CORS calls.
 *
 */
export type FrameworkOptions = {
    isAngular?: boolean;
    unprotectedResources?: Array<string>;
    protectedResourceMap?: Map<string, Array<string>>;
};

/**
 * Use the configuration object to configure MSAL and initialize the UserAgentApplication.
 *
 * This object allows you to configure important elements of MSAL functionality:
 * - auth: this is where you configure auth elements like clientID,  authority used for authenticating against the Microsoft Identity Platform
 * - cache: this is where you configure cache location and whether to store cache in cookies
 * - system: this is where you can configure the logger, frame timeout etc.
 * - framework: this is where you can configure the running mode of angular. More to come here soon.
 */
export type Configuration = {
    auth: AuthOptions,
    cache?: CacheOptions,
    system?: SystemOptions,
    framework?: FrameworkOptions
};

const DEFAULT_AUTH_OPTIONS: AuthOptions = {
    clientId: "",
    authority: null,
    validateAuthority: true,
    authorityMetadata: "",
    knownAuthorities: [],
    redirectUri: () => UrlUtils.getCurrentUrl(),
    postLogoutRedirectUri: () => UrlUtils.getCurrentUrl(),
    navigateToLoginRequestUrl: true
};

const DEFAULT_CACHE_OPTIONS: CacheOptions = {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
};

const DEFAULT_SYSTEM_OPTIONS: SystemOptions = {
    logger: new Logger(null),
    loadFrameTimeout: FRAME_TIMEOUT,
    tokenRenewalOffsetSeconds: OFFSET,
    navigateFrameWait: NAVIGATE_FRAME_WAIT
};

const DEFAULT_FRAMEWORK_OPTIONS: FrameworkOptions = {
    isAngular: false,
    unprotectedResources: new Array<string>(),
    protectedResourceMap: new Map<string, Array<string>>()
};

/**
 * MSAL function that sets the default options when not explicitly configured from app developer
 *
 * @param TAuthOptions
 * @param TCacheOptions
 * @param TSystemOptions
 * @param TFrameworkOptions
 * @param TAuthorityDataOptions
 *
 * @returns TConfiguration object
 */

export function buildConfiguration({ auth, cache = {}, system = {}, framework = {}}: Configuration): Configuration {
    const overlayedConfig: Configuration = {
        auth: { ...DEFAULT_AUTH_OPTIONS, ...auth },
        cache: { ...DEFAULT_CACHE_OPTIONS, ...cache },
        system: { ...DEFAULT_SYSTEM_OPTIONS, ...system },
        framework: { ...DEFAULT_FRAMEWORK_OPTIONS, ...framework }
    };
    return overlayedConfig;
}

