// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { context as otContext, trace as otTrace } from "@opentelemetry/api";
/**
 * The kind of span.
 */
export var SpanKind;
(function (SpanKind) {
    /** Default value. Indicates that the span is used internally. */
    SpanKind[SpanKind["INTERNAL"] = 0] = "INTERNAL";
    /**
     * Indicates that the span covers server-side handling of an RPC or other
     * remote request.
     */
    SpanKind[SpanKind["SERVER"] = 1] = "SERVER";
    /**
     * Indicates that the span covers the client-side wrapper around an RPC or
     * other remote request.
     */
    SpanKind[SpanKind["CLIENT"] = 2] = "CLIENT";
    /**
     * Indicates that the span describes producer sending a message to a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */
    SpanKind[SpanKind["PRODUCER"] = 3] = "PRODUCER";
    /**
     * Indicates that the span describes consumer receiving a message from a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */
    SpanKind[SpanKind["CONSUMER"] = 4] = "CONSUMER";
})(SpanKind || (SpanKind = {}));
/**
 * Return the span if one exists
 *
 * @param context - context to get span from
 */
export function getSpan(context) {
    return otTrace.getSpan(context);
}
/**
 * Set the span on a context
 *
 * @param context - context to use as parent
 * @param span - span to set active
 */
export function setSpan(context, span) {
    return otTrace.setSpan(context, span);
}
/**
 * Wrap span context in a NoopSpan and set as span in a new
 * context
 *
 * @param context - context to set active span on
 * @param spanContext - span context to be wrapped
 */
export function setSpanContext(context, spanContext) {
    return otTrace.setSpanContext(context, spanContext);
}
/**
 * Get the span context of the span if it exists.
 *
 * @param context - context to get values from
 */
export function getSpanContext(context) {
    return otTrace.getSpanContext(context);
}
/** Entrypoint for context API */
export const context = otContext;
/** SpanStatusCode */
export var SpanStatusCode;
(function (SpanStatusCode) {
    /**
     * The default status.
     */
    SpanStatusCode[SpanStatusCode["UNSET"] = 0] = "UNSET";
    /**
     * The operation has been validated by an Application developer or
     * Operator to have completed successfully.
     */
    SpanStatusCode[SpanStatusCode["OK"] = 1] = "OK";
    /**
     * The operation contains an error.
     */
    SpanStatusCode[SpanStatusCode["ERROR"] = 2] = "ERROR";
})(SpanStatusCode || (SpanStatusCode = {}));
//# sourceMappingURL=interfaces.js.map