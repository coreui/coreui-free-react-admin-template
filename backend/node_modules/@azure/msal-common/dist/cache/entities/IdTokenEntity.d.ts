import { CredentialEntity } from "./CredentialEntity";
/**
 * ID_TOKEN Cache
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-idtoken-clientId-contoso.com-
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      realm: Full tenant or organizational identifier that the account belongs to
 * }
 */
export declare class IdTokenEntity extends CredentialEntity {
    realm: string;
    /**
     * Create IdTokenEntity
     * @param homeAccountId
     * @param authenticationResult
     * @param clientId
     * @param authority
     */
    static createIdTokenEntity(homeAccountId: string, environment: string, idToken: string, clientId: string, tenantId: string, oboAssertion?: string): IdTokenEntity;
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isIdTokenEntity(entity: object): boolean;
}
//# sourceMappingURL=IdTokenEntity.d.ts.map