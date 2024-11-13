export declare class ServerTelemetryEntity {
    failedRequests: Array<string | number>;
    errors: string[];
    cacheHits: number;
    constructor();
    /**
     * validates if a given cache entry is "Telemetry", parses <key,value>
     * @param key
     * @param entity
     */
    static isServerTelemetryEntity(key: string, entity?: object): boolean;
}
//# sourceMappingURL=ServerTelemetryEntity.d.ts.map