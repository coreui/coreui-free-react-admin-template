import { CredentialType } from "../../utils/Constants";
/**
 * Base type for credentials to be stored in the cache: eg: ACCESS_TOKEN, ID_TOKEN etc
 *
 * Key:Value Schema:
 *
 * Key: <home_account_id*>-<environment>-<credential_type>-<client_id>-<realm*>-<target*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, usually only used for refresh tokens
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 *      oboAssertion: access token passed in as part of OBO request
 * }
 */
export declare class CredentialEntity {
    homeAccountId: string;
    environment: string;
    credentialType: CredentialType;
    clientId: string;
    secret: string;
    familyId?: string;
    realm?: string;
    target?: string;
    oboAssertion?: string;
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    generateAccountId(): string;
    /**
     * Generate Credential Id key component as per the schema: <credential_type>-<client_id>-<realm>
     */
    generateCredentialId(): string;
    /**
     * Generate target key component as per schema: <target>
     */
    generateTarget(): string;
    /**
     * generates credential key
     */
    generateCredentialKey(): string;
    /**
     * returns the type of the cache (in this case credential)
     */
    generateType(): number;
    /**
     * helper function to return `CredentialType`
     * @param key
     */
    static getCredentialType(key: string): string;
    /**
     * generates credential key
     */
    static generateCredentialCacheKey(homeAccountId: string, environment: string, credentialType: CredentialType, clientId: string, realm?: string, target?: string, familyId?: string): string;
    /**
     * generates Account Id for keys
     * @param homeAccountId
     * @param environment
     */
    private static generateAccountIdForCacheKey;
    /**
     * Generates Credential Id for keys
     * @param credentialType
     * @param realm
     * @param clientId
     * @param familyId
     */
    private static generateCredentialIdForCacheKey;
    /**
     * Generate target key component as per schema: <target>
     */
    private static generateTargetForCacheKey;
}
//# sourceMappingURL=CredentialEntity.d.ts.map