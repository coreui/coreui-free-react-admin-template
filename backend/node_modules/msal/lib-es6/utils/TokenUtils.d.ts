/**
 * @hidden
 */
export declare class TokenUtils {
    /**
     * decode a JWT
     *
     * @param jwtToken
     */
    static decodeJwt(jwtToken: string): object;
    /**
     * Evaluates whether token cache item expiration is within expiration offset range
     * @param tokenCacheItem
     */
    static validateExpirationIsWithinOffset(expiration: number, tokenRenewalOffsetSeconds: number): Boolean;
    /**
     * Extract IdToken by decoding the RAWIdToken
     *
     * @param encodedIdToken
     */
    static extractIdToken(encodedIdToken: string): object;
}
