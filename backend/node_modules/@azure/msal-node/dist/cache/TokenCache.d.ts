import { NodeStorage } from "./NodeStorage";
import { AccountInfo, Logger, ISerializableTokenCache, ICachePlugin } from "@azure/msal-common";
import { CacheKVStore } from "./serializer/SerializerTypes";
import { ITokenCache } from "./ITokenCache";
/**
 * In-memory token cache manager
 * @public
 */
export declare class TokenCache implements ISerializableTokenCache, ITokenCache {
    private storage;
    private cacheHasChanged;
    private cacheSnapshot;
    private readonly persistence;
    private logger;
    constructor(storage: NodeStorage, logger: Logger, cachePlugin?: ICachePlugin);
    /**
     * Set to true if cache state has changed since last time serialize or writeToPersistence was called
     */
    hasChanged(): boolean;
    /**
     * Serializes in memory cache to JSON
     */
    serialize(): string;
    /**
     * Deserializes JSON to in-memory cache. JSON should be in MSAL cache schema format
     * @param cache - blob formatted cache
     */
    deserialize(cache: string): void;
    /**
     * Fetches the cache key-value map
     */
    getKVStore(): CacheKVStore;
    /**
     * API that retrieves all accounts currently in cache to the user
     */
    getAllAccounts(): Promise<AccountInfo[]>;
    /**
     * Returns the signed in account matching homeAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param homeAccountId - unique identifier for an account (uid.utid)
     */
    getAccountByHomeId(homeAccountId: string): Promise<AccountInfo | null>;
    /**
     * Returns the signed in account matching localAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param localAccountId - unique identifier of an account (sub/obj when homeAccountId cannot be populated)
     */
    getAccountByLocalId(localAccountId: string): Promise<AccountInfo | null>;
    /**
     * API to remove a specific account and the relevant data from cache
     * @param account - AccountInfo passed by the user
     */
    removeAccount(account: AccountInfo): Promise<void>;
    /**
     * Called when the cache has changed state.
     */
    private handleChangeEvent;
    /**
     * Merge in memory cache with the cache snapshot.
     * @param oldState - cache before changes
     * @param currentState - current cache state in the library
     */
    private mergeState;
    /**
     * Deep update of oldState based on newState values
     * @param oldState - cache before changes
     * @param newState - updated cache
     */
    private mergeUpdates;
    /**
     * Removes entities in oldState that the were removed from newState. If there are any unknown values in root of
     * oldState that are not recognized, they are left untouched.
     * @param oldState - cache before changes
     * @param newState - updated cache
     */
    private mergeRemovals;
    /**
     * Helper to merge new cache with the old one
     * @param oldState - cache before changes
     * @param newState - updated cache
     */
    private mergeRemovalsDict;
    /**
     * Helper to overlay as a part of cache merge
     * @param passedInCache - cache read from the blob
     */
    private overlayDefaults;
}
//# sourceMappingURL=TokenCache.d.ts.map