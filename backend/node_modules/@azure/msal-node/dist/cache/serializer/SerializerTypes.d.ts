import { AccountCache, IdTokenCache, AccessTokenCache, RefreshTokenCache, AppMetadataCache, ValidCacheType } from "@azure/msal-common";
/**
 * Key value store for in-memory cache
 * @public
 */
export declare type CacheKVStore = Record<string, ValidCacheType>;
/**
 * Cache format read from the cache blob provided to the configuration during app instantiation
 * @public
 */
export declare type JsonCache = {
    Account: Record<string, SerializedAccountEntity>;
    IdToken: Record<string, SerializedIdTokenEntity>;
    AccessToken: Record<string, SerializedAccessTokenEntity>;
    RefreshToken: Record<string, SerializedRefreshTokenEntity>;
    AppMetadata: Record<string, SerializedAppMetadataEntity>;
};
/**
 * Intermittent type to handle in-memory data objects with defined types
 * @public
 */
export declare type InMemoryCache = {
    accounts: AccountCache;
    idTokens: IdTokenCache;
    accessTokens: AccessTokenCache;
    refreshTokens: RefreshTokenCache;
    appMetadata: AppMetadataCache;
};
/**
 * Account type
 * @public
 */
export declare type SerializedAccountEntity = {
    home_account_id: string;
    environment: string;
    realm: string;
    local_account_id: string;
    username: string;
    authority_type: string;
    name?: string;
    client_info?: string;
    last_modification_time?: string;
    last_modification_app?: string;
};
/**
 * Idtoken credential type
 * @public
 */
export declare type SerializedIdTokenEntity = {
    home_account_id: string;
    environment: string;
    credential_type: string;
    client_id: string;
    secret: string;
    realm: string;
};
/**
 * Access token credential type
 * @public
 */
export declare type SerializedAccessTokenEntity = {
    home_account_id: string;
    environment: string;
    credential_type: string;
    client_id: string;
    secret: string;
    realm: string;
    target: string;
    cached_at: string;
    expires_on: string;
    extended_expires_on?: string;
    refresh_on?: string;
    key_id?: string;
    token_type?: string;
};
/**
 * Refresh token credential type
 * @public
 */
export declare type SerializedRefreshTokenEntity = {
    home_account_id: string;
    environment: string;
    credential_type: string;
    client_id: string;
    secret: string;
    family_id?: string;
    target?: string;
    realm?: string;
};
/**
 * AppMetadata type
 * @public
 */
export declare type SerializedAppMetadataEntity = {
    client_id: string;
    environment: string;
    family_id?: string;
};
//# sourceMappingURL=SerializerTypes.d.ts.map