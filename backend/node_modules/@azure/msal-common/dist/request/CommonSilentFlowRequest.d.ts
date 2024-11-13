import { AccountInfo } from "../account/AccountInfo";
import { BaseAuthRequest } from "./BaseAuthRequest";
import { StringDict } from "../utils/MsalTypes";
/**
 * SilentFlow parameters passed by the user to retrieve credentials silently
 * - scopes                 - Array of scopes the application is requesting access to.
 * - claims                 - A stringified claims request which will be added to all /authorize and /token calls. When included on a silent request, cache lookup will be skipped and token will be refreshed.
 * - authority              - Url of the authority which the application acquires tokens from.
 * - correlationId          - Unique GUID set per request to trace a request end-to-end for telemetry purposes.
 * - account                - Account entity to lookup the credentials.
 * - forceRefresh           - Forces silent requests to make network calls if true.
 * - resourceRequestMethod      - HTTP Request type used to request data from the resource (i.e. "GET", "POST", etc.).  Used for proof-of-possession flows.
 * - resourceRequestUri         - URI that token will be used for. Used for proof-of-possession flows.
 */
export declare type CommonSilentFlowRequest = BaseAuthRequest & {
    account: AccountInfo;
    forceRefresh: boolean;
    tokenQueryParameters?: StringDict;
};
//# sourceMappingURL=CommonSilentFlowRequest.d.ts.map