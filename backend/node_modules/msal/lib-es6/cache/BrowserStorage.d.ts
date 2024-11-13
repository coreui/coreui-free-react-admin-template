import { CacheLocation } from "../Configuration";
/**
 * @hidden
 */
export declare class BrowserStorage {
    protected cacheLocation: CacheLocation;
    constructor(cacheLocation: CacheLocation);
    /**
     * add value to storage
     * @param key
     * @param value
     * @param enableCookieStorage
     */
    setItem(key: string, value: string, enableCookieStorage?: boolean): void;
    /**
     * get one item by key from storage
     * @param key
     * @param enableCookieStorage
     */
    getItem(key: string, enableCookieStorage?: boolean): string;
    /**
     * remove value from storage
     * @param key
     */
    removeItem(key: string): void;
    /**
     * clear storage (remove all items from it)
     */
    clear(): void;
    /**
     * add value to cookies
     * @param cName
     * @param cValue
     * @param expires
     */
    setItemCookie(cName: string, cValue: string, expires?: number): void;
    /**
     * get one item by key from cookies
     * @param cName
     */
    getItemCookie(cName: string): string;
    /**
     * Clear an item in the cookies by key
     * @param cName
     */
    clearItemCookie(cName: string): void;
    /**
     * Get cookie expiration time
     * @param cookieLifeDays
     */
    getCookieExpirationTime(cookieLifeDays: number): string;
}
