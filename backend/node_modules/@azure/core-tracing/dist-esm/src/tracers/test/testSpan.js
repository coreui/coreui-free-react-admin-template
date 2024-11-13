// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { SpanStatusCode } from "../../interfaces";
import { NoOpSpan } from "../noop/noOpSpan";
/**
 * A mock span useful for testing.
 */
export class TestSpan extends NoOpSpan {
    /**
     * Starts a new Span.
     * @param parentTracer-  The tracer that created this Span
     * @param name - The name of the span.
     * @param context - The SpanContext this span belongs to
     * @param kind - The SpanKind of this Span
     * @param parentSpanId - The identifier of the parent Span
     * @param startTime - The startTime of the event (defaults to now)
     */
    constructor(parentTracer, name, context, kind, parentSpanId, startTime = Date.now()) {
        super();
        this._tracer = parentTracer;
        this.name = name;
        this.kind = kind;
        this.startTime = startTime;
        this.parentSpanId = parentSpanId;
        this.status = {
            code: SpanStatusCode.OK
        };
        this.endCalled = false;
        this._context = context;
        this.attributes = {};
    }
    /**
     * Returns the Tracer that created this Span
     */
    tracer() {
        return this._tracer;
    }
    /**
     * Returns the SpanContext associated with this Span.
     */
    spanContext() {
        return this._context;
    }
    /**
     * Marks the end of Span execution.
     * @param _endTime - The time to use as the Span's end time. Defaults to
     * the current time.
     */
    end(_endTime) {
        this.endCalled = true;
    }
    /**
     * Sets a status on the span. Overrides the default of SpanStatusCode.OK.
     * @param status - The status to set.
     */
    setStatus(status) {
        this.status = status;
        return this;
    }
    /**
     * Returns whether this span will be recorded
     */
    isRecording() {
        return true;
    }
    /**
     * Sets an attribute on the Span
     * @param key - The attribute key
     * @param value - The attribute value
     */
    setAttribute(key, value) {
        this.attributes[key] = value;
        return this;
    }
    /**
     * Sets attributes on the Span
     * @param attributes - The attributes to add
     */
    setAttributes(attributes) {
        for (const key of Object.keys(attributes)) {
            this.attributes[key] = attributes[key];
        }
        return this;
    }
}
//# sourceMappingURL=testSpan.js.map