import TelemetryEvent from "./TelemetryEvent";
export declare const CACHE_EVENT_TYPES: {
    TokenCacheLookup: string;
    TokenCacheWrite: string;
    TokenCacheBeforeAccess: string;
    TokenCacheAfterAccess: string;
    TokenCacheBeforeWrite: string;
    TokenCacheDelete: string;
};
export declare enum TOKEN_TYPES {
    AT = "at",
    ID = "id",
    ACCOUNT = "account"
}
export declare const TOKEN_TYPE_KEY: string;
export default class CacheEvent extends TelemetryEvent {
    constructor(eventName: string, correlationId: string);
    set tokenType(tokenType: string);
}
