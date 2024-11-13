import { CommonRefreshTokenRequest } from "@azure/msal-common";
/**
 * CommonRefreshTokenRequest
 * - scopes                  - Array of scopes the application is requesting access to.
 * - claims                  - A stringified claims request which will be added to all /authorize and /token calls
 * - authority               - URL of the authority, the security token service (STS) from which MSAL will acquire tokens.
 * - correlationId           - Unique GUID set per request to trace a request end-to-end for telemetry purposes.
 * - refreshToken            - A refresh token returned from a previous request to the Identity provider.
 * @public
 */
export declare type RefreshTokenRequest = Partial<Omit<CommonRefreshTokenRequest, "scopes" | "refreshToken" | "authenticationScheme" | "resourceRequestMethod" | "resourceRequestUri">> & {
    scopes: Array<string>;
    refreshToken: string;
};
//# sourceMappingURL=RefreshTokenRequest.d.ts.map