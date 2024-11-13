export declare class ThrottlingEntity {
    throttleTime: number;
    error?: string;
    errorCodes?: Array<string>;
    errorMessage?: string;
    subError?: string;
    /**
     * validates if a given cache entry is "Throttling", parses <key,value>
     * @param key
     * @param entity
     */
    static isThrottlingEntity(key: string, entity?: object): boolean;
}
//# sourceMappingURL=ThrottlingEntity.d.ts.map