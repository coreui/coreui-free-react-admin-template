import { ServerAuthorizationTokenResponse } from "./ServerAuthorizationTokenResponse";
import { ICrypto } from "../crypto/ICrypto";
import { ServerAuthorizationCodeResponse } from "./ServerAuthorizationCodeResponse";
import { Logger } from "../logger/Logger";
import { AuthToken } from "../account/AuthToken";
import { AuthenticationResult } from "./AuthenticationResult";
import { Authority } from "../authority/Authority";
import { CacheRecord } from "../cache/entities/CacheRecord";
import { CacheManager } from "../cache/CacheManager";
import { RequestStateObject } from "../utils/ProtocolUtils";
import { ICachePlugin } from "../cache/interface/ICachePlugin";
import { ISerializableTokenCache } from "../cache/interface/ISerializableTokenCache";
import { AuthorizationCodePayload } from "./AuthorizationCodePayload";
import { BaseAuthRequest } from "../request/BaseAuthRequest";
/**
 * Class that handles response parsing.
 */
export declare class ResponseHandler {
    private clientId;
    private cacheStorage;
    private cryptoObj;
    private logger;
    private homeAccountIdentifier;
    private serializableCache;
    private persistencePlugin;
    constructor(clientId: string, cacheStorage: CacheManager, cryptoObj: ICrypto, logger: Logger, serializableCache: ISerializableTokenCache | null, persistencePlugin: ICachePlugin | null);
    /**
     * Function which validates server authorization code response.
     * @param serverResponseHash
     * @param cachedState
     * @param cryptoObj
     */
    validateServerAuthorizationCodeResponse(serverResponseHash: ServerAuthorizationCodeResponse, cachedState: string, cryptoObj: ICrypto): void;
    /**
     * Function which validates server authorization token response.
     * @param serverResponse
     */
    validateTokenResponse(serverResponse: ServerAuthorizationTokenResponse): void;
    /**
     * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
     * @param serverTokenResponse
     * @param authority
     */
    handleServerTokenResponse(serverTokenResponse: ServerAuthorizationTokenResponse, authority: Authority, reqTimestamp: number, request: BaseAuthRequest, authCodePayload?: AuthorizationCodePayload, oboAssertion?: string, handlingRefreshTokenResponse?: boolean): Promise<AuthenticationResult>;
    /**
     * Generates CacheRecord
     * @param serverTokenResponse
     * @param idTokenObj
     * @param authority
     */
    private generateCacheRecord;
    /**
     * Generate Account
     * @param serverTokenResponse
     * @param idToken
     * @param authority
     */
    private generateAccountEntity;
    /**
     * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
     *
     * Optionally takes a state string that is set as-is in the response.
     *
     * @param cacheRecord
     * @param idTokenObj
     * @param fromTokenCache
     * @param stateString
     */
    static generateAuthenticationResult(cryptoObj: ICrypto, authority: Authority, cacheRecord: CacheRecord, fromTokenCache: boolean, request: BaseAuthRequest, idTokenObj?: AuthToken, requestState?: RequestStateObject): Promise<AuthenticationResult>;
}
//# sourceMappingURL=ResponseHandler.d.ts.map