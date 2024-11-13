import { NetworkResponse } from "./NetworkManager";
import { ServerAuthorizationTokenResponse } from "../response/ServerAuthorizationTokenResponse";
import { CacheManager } from "../cache/CacheManager";
import { RequestThumbprint } from "./RequestThumbprint";
export declare class ThrottlingUtils {
    /**
     * Prepares a RequestThumbprint to be stored as a key.
     * @param thumbprint
     */
    static generateThrottlingStorageKey(thumbprint: RequestThumbprint): string;
    /**
     * Performs necessary throttling checks before a network request.
     * @param cacheManager
     * @param thumbprint
     */
    static preProcess(cacheManager: CacheManager, thumbprint: RequestThumbprint): void;
    /**
     * Performs necessary throttling checks after a network request.
     * @param cacheManager
     * @param thumbprint
     * @param response
     */
    static postProcess(cacheManager: CacheManager, thumbprint: RequestThumbprint, response: NetworkResponse<ServerAuthorizationTokenResponse>): void;
    /**
     * Checks a NetworkResponse object's status codes against 429 or 5xx
     * @param response
     */
    static checkResponseStatus(response: NetworkResponse<ServerAuthorizationTokenResponse>): boolean;
    /**
     * Checks a NetworkResponse object's RetryAfter header
     * @param response
     */
    static checkResponseForRetryAfter(response: NetworkResponse<ServerAuthorizationTokenResponse>): boolean;
    /**
     * Calculates the Unix-time value for a throttle to expire given throttleTime in seconds.
     * @param throttleTime
     */
    static calculateThrottleTime(throttleTime: number): number;
    static removeThrottle(cacheManager: CacheManager, clientId: string, authority: string, scopes: Array<string>, homeAccountIdentifier?: string): boolean;
}
//# sourceMappingURL=ThrottlingUtils.d.ts.map