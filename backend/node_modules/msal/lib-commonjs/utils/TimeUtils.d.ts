/**
 * @hidden
 */
export declare class TimeUtils {
    /**
     * Returns time in seconds for expiration based on string value passed in.
     *
     * @param expiresIn
     */
    static parseExpiresIn(expiresIn: string): number;
    /**
     * Return the current time in Unix time (seconds). Date.getTime() returns in milliseconds.
     */
    static now(): number;
    /**
     * Returns the amount of time in milliseconds since the page loaded.
     */
    static relativeNowMs(): number;
}
