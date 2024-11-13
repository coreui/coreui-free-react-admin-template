import { Authority } from "../../authority/Authority";
import { AuthToken } from "../../account/AuthToken";
import { ICrypto } from "../../crypto/ICrypto";
import { AccountInfo } from "../../account/AccountInfo";
import { AuthorityType } from "../../authority/AuthorityType";
import { Logger } from "../../logger/Logger";
import { TokenClaims } from "../../account/TokenClaims";
/**
 * Type that defines required and optional parameters for an Account field (based on universal cache schema implemented by all MSALs).
 *
 * Key : Value Schema
 *
 * Key: <home_account_id>-<environment>-<realm*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      localAccountId: Original tenant-specific accountID, usually used for legacy cases
 *      username: primary username that represents the user, usually corresponds to preferred_username in the v2 endpt
 *      authorityType: Accounts authority type as a string
 *      name: Full name for the account, including given name and family name,
 *      clientInfo: Full base64 encoded client info received from ESTS
 *      lastModificationTime: last time this entity was modified in the cache
 *      lastModificationApp:
 *      oboAssertion: access token passed in as part of OBO request
 *      idTokenClaims: Object containing claims parsed from ID token
 * }
 */
export declare class AccountEntity {
    homeAccountId: string;
    environment: string;
    realm: string;
    localAccountId: string;
    username: string;
    authorityType: string;
    name?: string;
    clientInfo?: string;
    lastModificationTime?: string;
    lastModificationApp?: string;
    oboAssertion?: string;
    cloudGraphHostName?: string;
    msGraphHost?: string;
    idTokenClaims?: TokenClaims;
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    generateAccountId(): string;
    /**
     * Generate Account Cache Key as per the schema: <home_account_id>-<environment>-<realm*>
     */
    generateAccountKey(): string;
    /**
     * returns the type of the cache (in this case account)
     */
    generateType(): number;
    /**
     * Returns the AccountInfo interface for this account.
     */
    getAccountInfo(): AccountInfo;
    /**
     * Generates account key from interface
     * @param accountInterface
     */
    static generateAccountCacheKey(accountInterface: AccountInfo): string;
    /**
     * Build Account cache from IdToken, clientInfo and authority/policy. Associated with AAD.
     * @param clientInfo
     * @param authority
     * @param idToken
     * @param policy
     */
    static createAccount(clientInfo: string, homeAccountId: string, authority: Authority, idToken: AuthToken, oboAssertion?: string, cloudGraphHostName?: string, msGraphHost?: string): AccountEntity;
    /**
     * Builds non-AAD/ADFS account.
     * @param authority
     * @param idToken
     */
    static createGenericAccount(authority: Authority, homeAccountId: string, idToken: AuthToken, oboAssertion?: string, cloudGraphHostName?: string, msGraphHost?: string): AccountEntity;
    /**
     * Generate HomeAccountId from server response
     * @param serverClientInfo
     * @param authType
     */
    static generateHomeAccountId(serverClientInfo: string, authType: AuthorityType, logger: Logger, cryptoObj: ICrypto, idToken?: AuthToken): string;
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAccountEntity(entity: object): boolean;
    /**
     * Helper function to determine whether 2 accountInfo objects represent the same account
     * @param accountA
     * @param accountB
     * @param compareClaims - If set to true idTokenClaims will also be compared to determine account equality
     */
    static accountInfoIsEqual(accountA: AccountInfo | null, accountB: AccountInfo | null, compareClaims?: boolean): boolean;
}
//# sourceMappingURL=AccountEntity.d.ts.map