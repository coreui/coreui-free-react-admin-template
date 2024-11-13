export declare class GuidGenerator {
    /**
     *
     * RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or pseudo-random numbers.
     * uuidv4 generates guids from cryprtographically-string random
     */
    static generateGuid(): string;
    /**
     * verifies if a string is  GUID
     * @param guid
     */
    static isGuid(guid: string): boolean;
}
//# sourceMappingURL=GuidGenerator.d.ts.map