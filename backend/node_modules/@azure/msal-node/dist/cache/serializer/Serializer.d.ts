import { AccountCache, IdTokenCache, AccessTokenCache, RefreshTokenCache, AppMetadataCache } from "@azure/msal-common";
import { InMemoryCache, JsonCache, SerializedAccountEntity, SerializedIdTokenEntity, SerializedAccessTokenEntity, SerializedRefreshTokenEntity, SerializedAppMetadataEntity } from "./SerializerTypes";
export declare class Serializer {
    /**
     * serialize the JSON blob
     * @param data
     */
    static serializeJSONBlob(data: JsonCache): string;
    /**
     * Serialize Accounts
     * @param accCache
     */
    static serializeAccounts(accCache: AccountCache): Record<string, SerializedAccountEntity>;
    /**
     * Serialize IdTokens
     * @param idTCache
     */
    static serializeIdTokens(idTCache: IdTokenCache): Record<string, SerializedIdTokenEntity>;
    /**
     * Serializes AccessTokens
     * @param atCache
     */
    static serializeAccessTokens(atCache: AccessTokenCache): Record<string, SerializedAccessTokenEntity>;
    /**
     * Serialize refreshTokens
     * @param rtCache
     */
    static serializeRefreshTokens(rtCache: RefreshTokenCache): Record<string, SerializedRefreshTokenEntity>;
    /**
     * Serialize amdtCache
     * @param amdtCache
     */
    static serializeAppMetadata(amdtCache: AppMetadataCache): Record<string, SerializedAppMetadataEntity>;
    /**
     * Serialize the cache
     * @param jsonContent
     */
    static serializeAllCache(inMemCache: InMemoryCache): JsonCache;
}
//# sourceMappingURL=Serializer.d.ts.map