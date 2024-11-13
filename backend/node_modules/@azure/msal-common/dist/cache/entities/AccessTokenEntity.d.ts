import { CredentialEntity } from "./CredentialEntity";
import { ICrypto } from "../../crypto/ICrypto";
/**
 * ACCESS_TOKEN Credential Type
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-accesstoken-clientId-contoso.com-user.read
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
 *      cachedAt: Absolute device time when entry was created in the cache.
 *      expiresOn: Token expiry time, calculated based on current UTC time in seconds. Represented as a string.
 *      extendedExpiresOn: Additional extended expiry time until when token is valid in case of server-side outage. Represented as string in UTC seconds.
 *      keyId: used for POP and SSH tokenTypes
 *      tokenType: Type of the token issued. Usually "Bearer"
 * }
 */
export declare class AccessTokenEntity extends CredentialEntity {
    realm: string;
    target: string;
    cachedAt: string;
    expiresOn: string;
    extendedExpiresOn?: string;
    refreshOn?: string;
    keyId?: string;
    tokenType?: string;
    /**
     * Create AccessTokenEntity
     * @param homeAccountId
     * @param environment
     * @param accessToken
     * @param clientId
     * @param tenantId
     * @param scopes
     * @param expiresOn
     * @param extExpiresOn
     */
    static createAccessTokenEntity(homeAccountId: string, environment: string, accessToken: string, clientId: string, tenantId: string, scopes: string, expiresOn: number, extExpiresOn: number, cryptoUtils: ICrypto, refreshOn?: number, tokenType?: string, oboAssertion?: string): AccessTokenEntity;
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAccessTokenEntity(entity: object): boolean;
}
//# sourceMappingURL=AccessTokenEntity.d.ts.map