import { AccountCache, AccountFilter, CredentialFilter, CredentialCache, AppMetadataFilter, AppMetadataCache } from "./utils/CacheTypes";
import { CacheRecord } from "./entities/CacheRecord";
import { AuthenticationScheme } from "../utils/Constants";
import { CredentialEntity } from "./entities/CredentialEntity";
import { ScopeSet } from "../request/ScopeSet";
import { AccountEntity } from "./entities/AccountEntity";
import { AccessTokenEntity } from "./entities/AccessTokenEntity";
import { IdTokenEntity } from "./entities/IdTokenEntity";
import { RefreshTokenEntity } from "./entities/RefreshTokenEntity";
import { ICacheManager } from "./interface/ICacheManager";
import { AccountInfo } from "../account/AccountInfo";
import { AppMetadataEntity } from "./entities/AppMetadataEntity";
import { ServerTelemetryEntity } from "./entities/ServerTelemetryEntity";
import { ThrottlingEntity } from "./entities/ThrottlingEntity";
import { ICrypto } from "../crypto/ICrypto";
import { AuthorityMetadataEntity } from "./entities/AuthorityMetadataEntity";
/**
 * Interface class which implement cache storage functions used by MSAL to perform validity checks, and store tokens.
 */
export declare abstract class CacheManager implements ICacheManager {
    protected clientId: string;
    protected cryptoImpl: ICrypto;
    constructor(clientId: string, cryptoImpl: ICrypto);
    /**
     * fetch the account entity from the platform cache
     *  @param accountKey
     */
    abstract getAccount(accountKey: string): AccountEntity | null;
    /**
     * set account entity in the platform cache
     * @param account
     */
    abstract setAccount(account: AccountEntity): void;
    /**
     * fetch the idToken entity from the platform cache
     * @param idTokenKey
     */
    abstract getIdTokenCredential(idTokenKey: string): IdTokenEntity | null;
    /**
     * set idToken entity to the platform cache
     * @param idToken
     */
    abstract setIdTokenCredential(idToken: IdTokenEntity): void;
    /**
     * fetch the idToken entity from the platform cache
     * @param accessTokenKey
     */
    abstract getAccessTokenCredential(accessTokenKey: string): AccessTokenEntity | null;
    /**
     * set idToken entity to the platform cache
     * @param accessToken
     */
    abstract setAccessTokenCredential(accessToken: AccessTokenEntity): void;
    /**
     * fetch the idToken entity from the platform cache
     * @param refreshTokenKey
     */
    abstract getRefreshTokenCredential(refreshTokenKey: string): RefreshTokenEntity | null;
    /**
     * set idToken entity to the platform cache
     * @param refreshToken
     */
    abstract setRefreshTokenCredential(refreshToken: RefreshTokenEntity): void;
    /**
     * fetch appMetadata entity from the platform cache
     * @param appMetadataKey
     */
    abstract getAppMetadata(appMetadataKey: string): AppMetadataEntity | null;
    /**
     * set appMetadata entity to the platform cache
     * @param appMetadata
     */
    abstract setAppMetadata(appMetadata: AppMetadataEntity): void;
    /**
     * fetch server telemetry entity from the platform cache
     * @param serverTelemetryKey
     */
    abstract getServerTelemetry(serverTelemetryKey: string): ServerTelemetryEntity | null;
    /**
     * set server telemetry entity to the platform cache
     * @param serverTelemetryKey
     * @param serverTelemetry
     */
    abstract setServerTelemetry(serverTelemetryKey: string, serverTelemetry: ServerTelemetryEntity): void;
    /**
     * fetch cloud discovery metadata entity from the platform cache
     * @param key
     */
    abstract getAuthorityMetadata(key: string): AuthorityMetadataEntity | null;
    /**
     *
     */
    abstract getAuthorityMetadataKeys(): Array<string>;
    /**
     * set cloud discovery metadata entity to the platform cache
     * @param key
     * @param value
     */
    abstract setAuthorityMetadata(key: string, value: AuthorityMetadataEntity): void;
    /**
     * fetch throttling entity from the platform cache
     * @param throttlingCacheKey
     */
    abstract getThrottlingCache(throttlingCacheKey: string): ThrottlingEntity | null;
    /**
     * set throttling entity to the platform cache
     * @param throttlingCacheKey
     * @param throttlingCache
     */
    abstract setThrottlingCache(throttlingCacheKey: string, throttlingCache: ThrottlingEntity): void;
    /**
     * Function to remove an item from cache given its key.
     * @param key
     */
    abstract removeItem(key: string, type?: string): boolean;
    /**
     * Function which returns boolean whether cache contains a specific key.
     * @param key
     */
    abstract containsKey(key: string, type?: string): boolean;
    /**
     * Function which retrieves all current keys from the cache.
     */
    abstract getKeys(): string[];
    /**
     * Function which clears cache.
     */
    abstract clear(): void;
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
     * saves access token credential
     * @param credential
     */
    private saveAccessToken;
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    getAccountsFilteredBy(accountFilter?: AccountFilter): AccountCache;
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    private getAccountsFilteredByInternal;
    /**
     * retrieve credentails matching all provided filters; if no filter is set, get all credentials
     * @param homeAccountId
     * @param environment
     * @param credentialType
     * @param clientId
     * @param realm
     * @param target
     */
    getCredentialsFilteredBy(filter: CredentialFilter): CredentialCache;
    /**
     * Support function to help match credentials
     * @param homeAccountId
     * @param environment
     * @param credentialType
     * @param clientId
     * @param realm
     * @param target
     */
    private getCredentialsFilteredByInternal;
    /**
     * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
     * @param filter
     */
    getAppMetadataFilteredBy(filter: AppMetadataFilter): AppMetadataCache;
    /**
     * Support function to help match appMetadata
     * @param environment
     * @param clientId
     */
    private getAppMetadataFilteredByInternal;
    /**
     * retrieve authorityMetadata that contains a matching alias
     * @param filter
     */
    getAuthorityMetadataByAlias(host: string): AuthorityMetadataEntity | null;
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
    /**
     * Removes all app metadata objects from cache.
     */
    removeAppMetadata(): boolean;
    /**
     * Retrieve the cached credentials into a cacherecord
     * @param account
     * @param clientId
     * @param scopes
     * @param environment
     * @param authScheme
     */
    readCacheRecord(account: AccountInfo, clientId: string, scopes: ScopeSet, environment: string, authScheme: AuthenticationScheme): CacheRecord;
    /**
     * Retrieve AccountEntity from cache
     * @param account
     */
    readAccountFromCache(account: AccountInfo): AccountEntity | null;
    /**
     * Retrieve IdTokenEntity from cache
     * @param clientId
     * @param account
     * @param inputRealm
     */
    readIdTokenFromCache(clientId: string, account: AccountInfo): IdTokenEntity | null;
    /**
     * Retrieve AccessTokenEntity from cache
     * @param clientId
     * @param account
     * @param scopes
     * @param authScheme
     */
    readAccessTokenFromCache(clientId: string, account: AccountInfo, scopes: ScopeSet, authScheme: AuthenticationScheme): AccessTokenEntity | null;
    /**
     * Helper to retrieve the appropriate refresh token from cache
     * @param clientId
     * @param account
     * @param familyRT
     */
    readRefreshTokenFromCache(clientId: string, account: AccountInfo, familyRT: boolean): RefreshTokenEntity | null;
    /**
     * Retrieve AppMetadataEntity from cache
     */
    readAppMetadataFromCache(environment: string, clientId: string): AppMetadataEntity | null;
    /**
     * Return the family_id value associated  with FOCI
     * @param environment
     * @param clientId
     */
    isAppMetadataFOCI(environment: string, clientId: string): boolean;
    /**
     * helper to match account ids
     * @param value
     * @param homeAccountId
     */
    private matchHomeAccountId;
    /**
     * helper to match assertion
     * @param value
     * @param oboAssertion
     */
    private matchOboAssertion;
    /**
     * helper to match environment
     * @param value
     * @param environment
     */
    private matchEnvironment;
    /**
     * helper to match credential type
     * @param entity
     * @param credentialType
     */
    private matchCredentialType;
    /**
     * helper to match client ids
     * @param entity
     * @param clientId
     */
    private matchClientId;
    /**
     * helper to match family ids
     * @param entity
     * @param familyId
     */
    private matchFamilyId;
    /**
     * helper to match realm
     * @param entity
     * @param realm
     */
    private matchRealm;
    /**
     * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
     * @param entity
     * @param target
     */
    private matchTarget;
    /**
     * returns if a given cache entity is of the type appmetadata
     * @param key
     */
    private isAppMetadata;
    /**
     * returns if a given cache entity is of the type authoritymetadata
     * @param key
     */
    protected isAuthorityMetadata(key: string): boolean;
    /**
     * returns cache key used for cloud instance metadata
     */
    generateAuthorityMetadataCacheKey(authority: string): string;
    /**
     * Returns the specific credential (IdToken/AccessToken/RefreshToken) from the cache
     * @param key
     * @param credType
     */
    private getSpecificCredential;
    /**
     * Helper to convert serialized data to object
     * @param obj
     * @param json
     */
    static toObject<T>(obj: T, json: object): T;
}
export declare class DefaultStorageClass extends CacheManager {
    setAccount(): void;
    getAccount(): AccountEntity;
    setIdTokenCredential(): void;
    getIdTokenCredential(): IdTokenEntity;
    setAccessTokenCredential(): void;
    getAccessTokenCredential(): AccessTokenEntity;
    setRefreshTokenCredential(): void;
    getRefreshTokenCredential(): RefreshTokenEntity;
    setAppMetadata(): void;
    getAppMetadata(): AppMetadataEntity;
    setServerTelemetry(): void;
    getServerTelemetry(): ServerTelemetryEntity;
    setAuthorityMetadata(): void;
    getAuthorityMetadata(): AuthorityMetadataEntity | null;
    getAuthorityMetadataKeys(): Array<string>;
    setThrottlingCache(): void;
    getThrottlingCache(): ThrottlingEntity;
    removeItem(): boolean;
    containsKey(): boolean;
    getKeys(): string[];
    clear(): void;
}
//# sourceMappingURL=CacheManager.d.ts.map