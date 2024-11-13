import { CommonClientCredentialRequest } from "@azure/msal-common";
/**
 * CommonClientCredentialRequest
 * - scopes                  - Array of scopes the application is requesting access to.
 * - authority               - URL of the authority, the security token service (STS) from which MSAL will acquire tokens.
 * - correlationId           - Unique GUID set per request to trace a request end-to-end for telemetry purposes.
 * - skipCache               - Skip token cache lookup and force request to authority to get a a new token. Defaults to false.
 * @public
 */
export declare type ClientCredentialRequest = Partial<Omit<CommonClientCredentialRequest, "scopes" | "resourceRequestMethod" | "resourceRequestUri">> & {
    scopes: Array<string>;
};
//# sourceMappingURL=ClientCredentialRequest.d.ts.map