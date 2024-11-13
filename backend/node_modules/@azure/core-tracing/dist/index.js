'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var api = require('@opentelemetry/api');

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * A no-op implementation of Span that can safely be used without side-effects.
 */
class NoOpSpan {
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

// Copyright (c) Microsoft Corporation.
/**
 * A no-op implementation of Tracer that can be used when tracing
 * is disabled.
 */
class NoOpTracer {
    /**
     * Starts a new Span.
     * @param _name - The name of the span.
     * @param _options - The SpanOptions used during Span creation.
     */
    startSpan(_name, _options) {
        return new NoOpSpan();
    }
    /**
     * Returns the current Span from the current context, if available.
     */
    getCurrentSpan() {
        return new NoOpSpan();
    }
    /**
     * Executes the given function within the context provided by a Span.
     * @param _span - The span that provides the context.
     * @param fn - The function to be executed.
     */
    withSpan(_span, fn) {
        return fn();
    }
    /**
     * Bind a Span as the target's scope
     * @param target - An object to bind the scope.
     * @param _span - A specific Span to use. Otherwise, use the current one.
     */
    bind(target, _span) {
        return target;
    }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
function getGlobalObject() {
    return global;
}

// Copyright (c) Microsoft Corporation.
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
function getCache() {
    if (!cache) {
        loadTracerCache();
    }
    return cache;
}

// Copyright (c) Microsoft Corporation.
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
function setTracer(tracer) {
    const cache = getCache();
    cache.tracer = tracer;
}
/**
 * Retrieves the active tracer, or returns a
 * no-op implementation if one is not set.
 */
function getTracer() {
    const cache = getCache();
    if (!cache.tracer) {
        return getDefaultTracer();
    }
    return cache.tracer;
}

// Copyright (c) Microsoft Corporation.
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
})(exports.SpanKind || (exports.SpanKind = {}));
/**
 * Return the span if one exists
 *
 * @param context - context to get span from
 */
function getSpan(context) {
    return api.trace.getSpan(context);
}
/**
 * Set the span on a context
 *
 * @param context - context to use as parent
 * @param span - span to set active
 */
function setSpan(context, span) {
    return api.trace.setSpan(context, span);
}
/**
 * Wrap span context in a NoopSpan and set as span in a new
 * context
 *
 * @param context - context to set active span on
 * @param spanContext - span context to be wrapped
 */
function setSpanContext(context, spanContext) {
    return api.trace.setSpanContext(context, spanContext);
}
/**
 * Get the span context of the span if it exists.
 *
 * @param context - context to get values from
 */
function getSpanContext(context) {
    return api.trace.getSpanContext(context);
}
/** Entrypoint for context API */
const context = api.context;
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
})(exports.SpanStatusCode || (exports.SpanStatusCode = {}));

// Copyright (c) Microsoft Corporation.
/**
 * A mock span useful for testing.
 */
class TestSpan extends NoOpSpan {
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
            code: exports.SpanStatusCode.OK
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

// Copyright (c) Microsoft Corporation.
/**
 * A mock tracer useful for testing
 */
class TestTracer extends NoOpTracer {
    constructor() {
        super(...arguments);
        this.traceIdCounter = 0;
        this.spanIdCounter = 0;
        this.rootSpans = [];
        this.knownSpans = [];
    }
    getNextTraceId() {
        this.traceIdCounter++;
        return String(this.traceIdCounter);
    }
    getNextSpanId() {
        this.spanIdCounter++;
        return String(this.spanIdCounter);
    }
    /**
     * Returns all Spans that were created without a parent
     */
    getRootSpans() {
        return this.rootSpans;
    }
    /**
     * Returns all Spans this Tracer knows about
     */
    getKnownSpans() {
        return this.knownSpans;
    }
    /**
     * Returns all Spans where end() has not been called
     */
    getActiveSpans() {
        return this.knownSpans.filter((span) => {
            return !span.endCalled;
        });
    }
    /**
     * Return all Spans for a particular trace, grouped by their
     * parent Span in a tree-like structure
     * @param traceId - The traceId to return the graph for
     */
    getSpanGraph(traceId) {
        const traceSpans = this.knownSpans.filter((span) => {
            return span.spanContext().traceId === traceId;
        });
        const roots = [];
        const nodeMap = new Map();
        for (const span of traceSpans) {
            const spanId = span.spanContext().spanId;
            const node = {
                name: span.name,
                children: []
            };
            nodeMap.set(spanId, node);
            if (span.parentSpanId) {
                const parent = nodeMap.get(span.parentSpanId);
                if (!parent) {
                    throw new Error(`Span with name ${node.name} has an unknown parentSpan with id ${span.parentSpanId}`);
                }
                parent.children.push(node);
            }
            else {
                roots.push(node);
            }
        }
        return {
            roots
        };
    }
    /**
     * Starts a new Span.
     * @param name - The name of the span.
     * @param options - The SpanOptions used during Span creation.
     */
    startSpan(name, options, context$1) {
        const parentContext = getSpanContext(context$1 || context.active());
        let traceId;
        let isRootSpan = false;
        if (parentContext && parentContext.traceId) {
            traceId = parentContext.traceId;
        }
        else {
            traceId = this.getNextTraceId();
            isRootSpan = true;
        }
        const spanContext = {
            traceId,
            spanId: this.getNextSpanId(),
            traceFlags: 0 /* NONE */
        };
        const span = new TestSpan(this, name, spanContext, (options === null || options === void 0 ? void 0 : options.kind) || exports.SpanKind.INTERNAL, parentContext ? parentContext.spanId : undefined, options === null || options === void 0 ? void 0 : options.startTime);
        this.knownSpans.push(span);
        if (isRootSpan) {
            this.rootSpans.push(span);
        }
        return span;
    }
}

// Copyright (c) Microsoft Corporation.
/**
 * Creates a function that can be used to create spans using the global tracer.
 *
 * Usage:
 *
 * ```typescript
 * // once
 * const createSpan = createSpanFunction({ packagePrefix: "Azure.Data.AppConfiguration", namespace: "Microsoft.AppConfiguration" });
 *
 * // in each operation
 * const span = createSpan("deleteConfigurationSetting", operationOptions);
 *    // code...
 * span.end();
 * ```
 *
 * @hidden
 * @param args - allows configuration of the prefix for each span as well as the az.namespace field.
 */
function createSpanFunction(args) {
    return function (operationName, operationOptions) {
        const tracer = getTracer();
        const tracingOptions = (operationOptions === null || operationOptions === void 0 ? void 0 : operationOptions.tracingOptions) || {};
        const spanOptions = Object.assign({ kind: exports.SpanKind.INTERNAL }, tracingOptions.spanOptions);
        const spanName = args.packagePrefix ? `${args.packagePrefix}.${operationName}` : operationName;
        const span = tracer.startSpan(spanName, spanOptions, tracingOptions.tracingContext);
        if (args.namespace) {
            span.setAttribute("az.namespace", args.namespace);
        }
        let newSpanOptions = tracingOptions.spanOptions || {};
        if (span.isRecording() && args.namespace) {
            newSpanOptions = Object.assign(Object.assign({}, tracingOptions.spanOptions), { attributes: Object.assign(Object.assign({}, spanOptions.attributes), { "az.namespace": args.namespace }) });
        }
        const newTracingOptions = Object.assign(Object.assign({}, tracingOptions), { spanOptions: newSpanOptions, tracingContext: setSpan(tracingOptions.tracingContext || context.active(), span) });
        const newOperationOptions = Object.assign(Object.assign({}, operationOptions), { tracingOptions: newTracingOptions });
        return {
            span,
            updatedOptions: newOperationOptions
        };
    };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const VERSION = "00";
/**
 * Generates a `SpanContext` given a `traceparent` header value.
 * @param traceParent - Serialized span context data as a `traceparent` header value.
 * @returns The `SpanContext` generated from the `traceparent` value.
 */
function extractSpanContextFromTraceParentHeader(traceParentHeader) {
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
function getTraceParentHeader(spanContext) {
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

exports.NoOpSpan = NoOpSpan;
exports.NoOpTracer = NoOpTracer;
exports.TestSpan = TestSpan;
exports.TestTracer = TestTracer;
exports.context = context;
exports.createSpanFunction = createSpanFunction;
exports.extractSpanContextFromTraceParentHeader = extractSpanContextFromTraceParentHeader;
exports.getSpan = getSpan;
exports.getSpanContext = getSpanContext;
exports.getTraceParentHeader = getTraceParentHeader;
exports.getTracer = getTracer;
exports.setSpan = setSpan;
exports.setSpanContext = setSpanContext;
exports.setTracer = setTracer;
//# sourceMappingURL=index.js.map
