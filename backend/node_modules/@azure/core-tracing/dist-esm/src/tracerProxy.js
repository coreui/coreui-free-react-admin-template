// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { NoOpTracer } from "./tracers/noop/noOpTracer";
import { getCache } from "./utils/cache";
let defaultTracer;
function getDefaultTracer() {
    if (!defaultTracer) {
        defaultTracer = new NoOpTracer();
    }
    return defaultTracer;
}
/**
 * Sets the global tracer, enabling tracing for the Azure SDK.
 * @param tracer - An OpenTelemetry Tracer instance.
 */
export function setTracer(tracer) {
    const cache = getCache();
    cache.tracer = tracer;
}
/**
 * Retrieves the active tracer, or returns a
 * no-op implementation if one is not set.
 */
export function getTracer() {
    const cache = getCache();
    if (!cache.tracer) {
        return getDefaultTracer();
    }
    return cache.tracer;
}
//# sourceMappingURL=tracerProxy.js.map