// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { getGlobalObject } from "./global";
// tracerCache will be updated when a new incompatible version of OTel is
// shipped in core-tracing.
// tracerCache3 - OpenTelemetry 1.0.0-rc.1
// tracerCache4 - OpenTelemetry 0.20.0
const GLOBAL_TRACER_SYMBOL = Symbol.for(`@azure/core-tracing.tracerCache4`);
let cache;
function loadTracerCache() {
    const globalObj = getGlobalObject();
    if (!globalObj[GLOBAL_TRACER_SYMBOL]) {
        globalObj[GLOBAL_TRACER_SYMBOL] = {
            tracer: undefined
        };
    }
    cache = globalObj[GLOBAL_TRACER_SYMBOL];
}
export function getCache() {
    if (!cache) {
        loadTracerCache();
    }
    return cache;
}
//# sourceMappingURL=cache.js.map