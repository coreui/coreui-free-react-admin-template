/**
 * APP_METADATA Cache
 *
 * Key:Value Schema:
 *
 * Key: appmetadata-<environment>-<client_id>
 *
 * Value:
 * {
 *      clientId: client ID of the application
 *      environment: entity that issued the token, represented as a full host
 *      familyId: Family ID identifier, '1' represents Microsoft Family
 * }
 */
export declare class AppMetadataEntity {
    clientId: string;
    environment: string;
    familyId?: string;
    /**
     * Generate AppMetadata Cache Key as per the schema: appmetadata-<environment>-<client_id>
     */
    generateAppMetadataKey(): string;
    /**
     * Generate AppMetadata Cache Key
     */
    static generateAppMetadataCacheKey(environment: string, clientId: string): string;
    /**
     * Creates AppMetadataEntity
     * @param clientId
     * @param environment
     * @param familyId
     */
    static createAppMetadataEntity(clientId: string, environment: string, familyId?: string): AppMetadataEntity;
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAppMetadataEntity(key: string, entity: object): boolean;
}
//# sourceMappingURL=AppMetadataEntity.d.ts.map