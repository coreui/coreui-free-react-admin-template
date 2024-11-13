import { AccountInfo } from "../account/AccountInfo";
/**
 * CommonEndSessionRequest
 * - account                - Account object that will be logged out of. All tokens tied to this account will be cleared.
 * - postLogoutRedirectUri  - URI to navigate to after logout page.
 * - correlationId          - Unique GUID set per request to trace a request end-to-end for telemetry purposes.
 * - idTokenHint            - ID Token used by B2C to validate logout if required by the policy
 */
export declare type CommonEndSessionRequest = {
    correlationId: string;
    account?: AccountInfo | null;
    postLogoutRedirectUri?: string | null;
    idTokenHint?: string;
};
//# sourceMappingURL=CommonEndSessionRequest.d.ts.map