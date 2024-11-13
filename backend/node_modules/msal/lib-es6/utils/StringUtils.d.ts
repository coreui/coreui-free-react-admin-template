import { AccessTokenKey } from "../cache/AccessTokenKey";
/**
 * @hidden
 */
export declare class StringUtils {
    /**
     * Check if a string is empty
     *
     * @param str
     */
    static isEmpty(str: string): boolean;
    /**
     * Check if a string's value is a valid JSON object
     *
     * @param str
     */
    static validateAndParseJsonCacheKey(str: string): AccessTokenKey;
}
