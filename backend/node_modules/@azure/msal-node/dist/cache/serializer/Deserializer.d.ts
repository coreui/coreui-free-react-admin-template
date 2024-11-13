import { AccountCache, IdTokenCache, AccessTokenCache, RefreshTokenCache, AppMetadataCache } from "@azure/msal-common";
import { JsonCache, InMemoryCache, SerializedAccountEntity, SerializedIdTokenEntity, SerializedAccessTokenEntity, SerializedRefreshTokenEntity, SerializedAppMetadataEntity } from "./SerializerTypes";
/**
 * This class deserializes cache entities read from the file into in memory object types defined internally
 */
export declare class Deserializer {
    /**
     * Parse the JSON blob in memory and deserialize the content
     * @param cachedJson
     */
    static deserializeJSONBlob(jsonFile: string): JsonCache;
    /**
     * Deserializes accounts to AccountEntity objects
     * @param accounts
     */
    static deserializeAccounts(accounts: Record<string, SerializedAccountEntity>): AccountCache;
    /**
     * Deserializes id tokens to IdTokenEntity objects
     * @param idTokens
     */
    static deserializeIdTokens(idTokens: Record<string, SerializedIdTokenEntity>): IdTokenCache;
    /**
     * Deserializes access tokens to AccessTokenEntity objects
     * @param accessTokens
     */
    static deserializeAccessTokens(accessTokens: Record<string, SerializedAccessTokenEntity>): AccessTokenCache;
    /**
     * Deserializes refresh tokens to RefreshTokenEntity objects
     * @param refreshTokens
     */
    static deserializeRefreshTokens(refreshTokens: Record<string, SerializedRefreshTokenEntity>): RefreshTokenCache;
    /**
     * Deserializes appMetadata to AppMetaData objects
     * @param appMetadata
     */
    static deserializeAppMetadata(appMetadata: Record<string, SerializedAppMetadataEntity>): AppMetadataCache;
    /**
     * Deserialize an inMemory Cache
     * @param jsonCache
     */
    static deserializeAllCache(jsonCache: JsonCache): InMemoryCache;
}
//# sourceMappingURL=Deserializer.d.ts.map