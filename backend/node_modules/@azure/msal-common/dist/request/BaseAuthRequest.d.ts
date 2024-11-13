import { AuthenticationScheme } from "../utils/Constants";
/**
 * BaseAuthRequest
 * - authority               - URL of the authority, the security token service (STS) from which MSAL will acquire tokens. Defaults to https://login.microsoftonline.com/common. If using the same authority for all request, authority should set on client application object and not request, to avoid resolving authority endpoints multiple times.
 * - correlationId           - Unique GUID set per request to trace a request end-to-end for telemetry purposes.
 * - scopes                  - Array of scopes the application is requesting access to.
 * - authenticationScheme       - The type of token retrieved. Defaults to "Bearer". Can also be type "pop".
 * - claims                  - A stringified claims request which will be added to all /authorize and /token calls
 * - shrClaims               - A stringified claims object which will be added to a Signed HTTP Request
 * - resourceRequestMethod      - HTTP Request type used to request data from the resource (i.e. "GET", "POST", etc.).  Used for proof-of-possession flows.
 * - resourceRequestUri         - URI that token will be used for. Used for proof-of-possession flows.
 */
export declare type BaseAuthRequest = {
    authority: string;
    correlationId: string;
    scopes: Array<string>;
    authenticationScheme?: AuthenticationScheme;
    claims?: string;
    shrClaims?: string;
    resourceRequestMethod?: string;
    resourceRequestUri?: string;
};
//# sourceMappingURL=BaseAuthRequest.d.ts.map