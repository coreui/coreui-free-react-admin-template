// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * A no-op implementation of Span that can safely be used without side-effects.
 */
export class NoOpSpan {
    /**
     * Returns the SpanContext associated with this Span.
     */
    spanContext() {
        return {
            spanId: "",
            traceId: "",
            traceFlags: 0 /* NONE */
        };
    }
    /**
     * Marks the end of Span execution.
     * @param _endTime - The time to use as the Span's end time. Defaults to
     * the current time.
     */
    end(_endTime) {
        /* Noop */
    }
    /**
     * Sets an attribute on the Span
     * @param _key - The attribute key
     * @param _value - The attribute value
     */
    setAttribute(_key, _value) {
        return this;
    }
    /**
     * Sets attributes on the Span
     * @param _attributes - The attributes to add
     */
    setAttributes(_attributes) {
        return this;
    }
    /**
     * Adds an event to the Span
     * @param _name - The name of the event
     * @param _attributes - The associated attributes to add for this event
     */
    addEvent(_name, _attributes) {
        return this;
    }
    /**
     * Sets a status on the span. Overrides the default of SpanStatusCode.OK.
     * @param _status - The status to set.
     */
    setStatus(_status) {
        return this;
    }
    /**
     * Updates the name of the Span
     * @param _name - the new Span name
     */
    updateName(_name) {
        return this;
    }
    /**
     * Returns whether this span will be recorded
     */
    isRecording() {
        return false;
    }
    /**
     * Sets exception as a span event
     * @param exception - the exception the only accepted values are string or Error
     * @param time - the time to set as Span's event time. If not provided,
     *     use the current time.
     */
    recordException(_exception, _time) {
        /* do nothing */
    }
}
//# sourceMappingURL=noOpSpan.js.map