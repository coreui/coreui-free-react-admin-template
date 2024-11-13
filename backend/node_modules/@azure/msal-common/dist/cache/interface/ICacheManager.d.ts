import { CredentialEntity } from "../entities/CredentialEntity";
import { AccountCache, CredentialCache, AccountFilter, CredentialFilter } from "../utils/CacheTypes";
import { CacheRecord } from "../entities/CacheRecord";
import { AccountEntity } from "../entities/AccountEntity";
import { AccountInfo } from "../../account/AccountInfo";
import { AppMetadataEntity } from "../entities/AppMetadataEntity";
import { ServerTelemetryEntity } from "../entities/ServerTelemetryEntity";
import { ThrottlingEntity } from "../entities/ThrottlingEntity";
import { IdTokenEntity } from "../entities/IdTokenEntity";
import { AccessTokenEntity } from "../entities/AccessTokenEntity";
import { RefreshTokenEntity } from "../entities/RefreshTokenEntity";
import { AuthorityMetadataEntity } from "../entities/AuthorityMetadataEntity";
export interface ICacheManager {
    /**
     * fetch the account entity from the platform cache
     * @param accountKey
     */
    getAccount(accountKey: string): AccountEntity | null;
    /**
     * set account entity in the platform cache
     * @param account
     */
    setAccount(account: AccountEntity): void;
    /**
     * fetch the idToken entity from the platform cache
     * @param idTokenKey
     */
    getIdTokenCredential(idTokenKey: string): IdTokenEntity | null;
    /**
     * set idToken entity to the platform cache
     * @param idToken
     */
    setIdTokenCredential(idToken: IdTokenEntity): void;
    /**
     * fetch the idToken entity from the platform cache
     * @param accessTokenKey
     */
    getAccessTokenCredential(accessTokenKey: string): AccessTokenEntity | null;
    /**
     * set idToken entity to the platform cache
     * @param accessToken
     */
    setAccessTokenCredential(accessToken: AccessTokenEntity): void;
    /**
     * fetch the idToken entity from the platform cache
     * @param refreshTokenKey
     */
    getRefreshTokenCredential(refreshTokenKey: string): RefreshTokenEntity | null;
    /**
     * set idToken entity to the platform cache
     * @param refreshToken
     */
    setRefreshTokenCredential(refreshToken: RefreshTokenEntity): void;
    /**
     * fetch appMetadata entity from the platform cache
     * @param appMetadataKey
     */
    getAppMetadata(appMetadataKey: string): AppMetadataEntity | null;
    /**
     * set appMetadata entity to the platform cache
     * @param appMetadata
     */
    setAppMetadata(appMetadata: AppMetadataEntity): void;
    /**
     * fetch server telemetry entity from the platform cache
     * @param serverTelemetryKey
     */
    getServerTelemetry(serverTelemetryKey: string): ServerTelemetryEntity | null;
    /**
     * set server telemetry entity to the platform cache
     * @param serverTelemetryKey
     * @param serverTelemetry
     */
    setServerTelemetry(serverTelemetryKey: string, serverTelemetry: ServerTelemetryEntity): void;
    /**
     * fetch cloud discovery metadata entity from the platform cache
     * @param key
     */
    getAuthorityMetadata(key: string): AuthorityMetadataEntity | null;
    /**
     * Get cache keys for authority metadata
     */
    getAuthorityMetadataKeys(): Array<string>;
    /**
     * set cloud discovery metadata entity to the platform cache
     * @param key
     * @param value
     */
    setAuthorityMetadata(key: string, value: AuthorityMetadataEntity): void;
    /**
     * Provide an alias to find a matching AuthorityMetadataEntity in cache
     * @param host
     */
    getAuthorityMetadataByAlias(host: string): AuthorityMetadataEntity | null;
    /**
     * given an authority generates the cache key for authorityMetadata
     * @param authority
     */
    generateAuthorityMetadataCacheKey(authority: string): string;
    /**
     * fetch throttling entity from the platform cache
     * @param throttlingCacheKey
     */
    getThrottlingCache(throttlingCacheKey: string): ThrottlingEntity | null;
    /**
     * set throttling entity to the platform cache
     * @param throttlingCacheKey
     * @param throttlingCache
     */
    setThrottlingCache(throttlingCacheKey: string, throttlingCache: ThrottlingEntity): void;
    /**
     * Returns all accounts in cache
     */
    getAllAccounts(): AccountInfo[];
    /**
     * saves a cache record
     * @param cacheRecord
     */
    saveCacheRecord(cacheRecord: CacheRecord): void;
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    getAccountsFilteredBy(filter: AccountFilter): AccountCache;
    /**
     * retrieve credentials matching all provided filters; if no filter is set, get all credentials
     * @param homeAccountId
     * @param environment
     * @param credentialType
     * @param clientId
     * @param realm
     * @param target
     */
    getCredentialsFilteredBy(filter: CredentialFilter): CredentialCache;
    /**
     * Removes all accounts and related tokens from cache.
     */
    removeAllAccounts(): boolean;
    /**
     * returns a boolean if the given account is removed
     * @param account
     */
    removeAccount(accountKey: string): boolean;
    /**
     * returns a boolean if the given account is removed
     * @param account
     */
    removeAccountContext(account: AccountEntity): boolean;
    /**
     * returns a boolean if the given credential is removed
     * @param credential
     */
    removeCredential(credential: CredentialEntity): boolean;
}
//# sourceMappingURL=ICacheManager.d.ts.map