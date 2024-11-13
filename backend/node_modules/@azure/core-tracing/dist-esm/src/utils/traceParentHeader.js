// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const VERSION = "00";
/**
 * Generates a `SpanContext` given a `traceparent` header value.
 * @param traceParent - Serialized span context data as a `traceparent` header value.
 * @returns The `SpanContext` generated from the `traceparent` value.
 */
export function extractSpanContextFromTraceParentHeader(traceParentHeader) {
    const parts = traceParentHeader.split("-");
    if (parts.length !== 4) {
        return;
    }
    const [version, traceId, spanId, traceOptions] = parts;
    if (version !== VERSION) {
        return;
    }
    const traceFlags = parseInt(traceOptions, 16);
    const spanContext = {
        spanId,
        traceId,
        traceFlags
    };
    return spanContext;
}
/**
 * Generates a `traceparent` value given a span context.
 * @param spanContext - Contains context for a specific span.
 * @returns The `spanContext` represented as a `traceparent` value.
 */
export function getTraceParentHeader(spanContext) {
    const missingFields = [];
    if (!spanContext.traceId) {
        missingFields.push("traceId");
    }
    if (!spanContext.spanId) {
        missingFields.push("spanId");
    }
    if (missingFields.length) {
        return;
    }
    const flags = spanContext.traceFlags || 0 /* NONE */;
    const hexFlags = flags.toString(16);
    const traceFlags = hexFlags.length === 1 ? `0${hexFlags}` : hexFlags;
    // https://www.w3.org/TR/trace-context/#traceparent-header-field-values
    return `${VERSION}-${spanContext.traceId}-${spanContext.spanId}-${traceFlags}`;
}
//# sourceMappingURL=traceParentHeader.js.map