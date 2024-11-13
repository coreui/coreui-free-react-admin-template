/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import TelemetryEvent from "./TelemetryEvent";
import { prependEventNamePrefix } from "./TelemetryUtils";

export const CACHE_EVENT_TYPES = {
    TokenCacheLookup: prependEventNamePrefix("token_cache_lookup"),
    TokenCacheWrite: prependEventNamePrefix("token_cache_write"),
    TokenCacheBeforeAccess: prependEventNamePrefix("token_cache_before_access"),
    TokenCacheAfterAccess: prependEventNamePrefix("token_cache_after_access"),
    TokenCacheBeforeWrite: prependEventNamePrefix("token_cache_before_write"),
    TokenCacheDelete: prependEventNamePrefix("token_cache_delete")
};

export enum TOKEN_TYPES {
    AT = "at",
    ID = "id",
    ACCOUNT = "account"
}

export const TOKEN_TYPE_KEY = prependEventNamePrefix("token_type");

export default class CacheEvent extends TelemetryEvent {
    constructor(eventName: string, correlationId: string) {
        super(eventName, correlationId, "CacheEvent");
    }

    public set tokenType(tokenType: string) {
        this.event[TOKEN_TYPE_KEY] = tokenType;
    }

}
