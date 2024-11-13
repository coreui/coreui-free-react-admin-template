import { AccessTokenCacheItem } from "../cache/AccessTokenCacheItem";
/**
 * @hidden
 */
export declare class AuthCacheUtils {
    static filterTokenCacheItemsByScope(tokenCacheItems: Array<AccessTokenCacheItem>, requestScopes: string[]): Array<AccessTokenCacheItem>;
    static filterTokenCacheItemsByAuthority(tokenCacheItems: Array<AccessTokenCacheItem>, authority: string): Array<AccessTokenCacheItem>;
    static filterTokenCacheItemsByDomain(tokenCacheItems: Array<AccessTokenCacheItem>, requestDomain: string): Array<AccessTokenCacheItem>;
}
