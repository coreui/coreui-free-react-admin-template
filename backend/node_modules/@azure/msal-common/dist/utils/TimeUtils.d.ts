/**
 * Utility class which exposes functions for managing date and time operations.
 */
export declare class TimeUtils {
    /**
     * return the current time in Unix time (seconds).
     */
    static nowSeconds(): number;
    /**
     * check if a token is expired based on given UTC time in seconds.
     * @param expiresOn
     */
    static isTokenExpired(expiresOn: string, offset: number): boolean;
    /**
     * If the current time is earlier than the time that a token was cached at, we must discard the token
     * i.e. The system clock was turned back after acquiring the cached token
     * @param cachedAt
     * @param offset
     */
    static wasClockTurnedBack(cachedAt: string): boolean;
    /**
     * Waits for t number of milliseconds
     * @param t number
     * @param value T
     */
    static delay<T>(t: number, value?: T): Promise<T | void>;
}
//# sourceMappingURL=TimeUtils.d.ts.map