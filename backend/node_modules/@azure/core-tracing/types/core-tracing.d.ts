
/**
 * OpenTelemetry compatible interface for Context
 */
export declare interface Context {
    /**
     * Get a value from the context.
     *
     * @param key - key which identifies a context value
     */
    getValue(key: symbol): unknown;
    /**
     * Create a new context which inherits from this context and has
     * the given key set to the given value.
     *
     * @param key - context key for which to set the value
     * @param value - value to set for the given key
     */
    setValue(key: symbol, value: unknown): Context;
    /**
     * Return a new context which inherits from this context but does
     * not contain a value for the given key.
     *
     * @param key - context key for which to clear a value
     */
    deleteValue(key: symbol): Context;
}

/** Entrypoint for context API */
export declare const context: ContextAPI;

/**
 * Singleton object which represents the entry point to the OpenTelemetry Context API
 */
export declare interface ContextAPI {
    /**
     * Get the currently active context
     */
    active(): Context;
}

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
export declare function createSpanFunction(args: CreateSpanFunctionArgs): <T extends {
    tracingOptions?: OperationTracingOptions | undefined;
}>(operationName: string, operationOptions: T | undefined) => {
    span: Span;
    updatedOptions: T;
};

/**
 * Arguments for `createSpanFunction` that allow you to specify the
 * prefix for each created span as well as the `az.namespace` attribute.
 *
 * @hidden
 */
export declare interface CreateSpanFunctionArgs {
    /**
     * Package name prefix.
     *
     * NOTE: if this is empty no prefix will be applied to created Span names.
     */
    packagePrefix: string;
    /**
     * Service namespace
     *
     * NOTE: if this is empty no `az.namespace` attribute will be added to created Spans.
     */
    namespace: string;
}

/**
 * An Exception for a Span.
 */
export declare type Exception = ExceptionWithCode | ExceptionWithMessage | ExceptionWithName | string;

/**
 * An Exception with a code.
 */
export declare interface ExceptionWithCode {
    /** The code. */
    code: string | number;
    /** The name. */
    name?: string;
    /** The message. */
    message?: string;
    /** The stack. */
    stack?: string;
}

/**
 * An Exception with a message.
 */
export declare interface ExceptionWithMessage {
    /** The code. */
    code?: string | number;
    /** The message. */
    message: string;
    /** The name. */
    name?: string;
    /** The stack. */
    stack?: string;
}

/**
 * An Exception with a name.
 */
export declare interface ExceptionWithName {
    /** The code. */
    code?: string | number;
    /** The message. */
    message?: string;
    /** The name. */
    name: string;
    /** The stack. */
    stack?: string;
}

/**
 * Generates a `SpanContext` given a `traceparent` header value.
 * @param traceParent - Serialized span context data as a `traceparent` header value.
 * @returns The `SpanContext` generated from the `traceparent` value.
 */
export declare function extractSpanContextFromTraceParentHeader(traceParentHeader: string): SpanContext | undefined;

/**
 * Return the span if one exists
 *
 * @param context - context to get span from
 */
export declare function getSpan(context: Context): Span | undefined;

/**
 * Get the span context of the span if it exists.
 *
 * @param context - context to get values from
 */
export declare function getSpanContext(context: Context): SpanContext | undefined;

/**
 * Generates a `traceparent` value given a span context.
 * @param spanContext - Contains context for a specific span.
 * @returns The `spanContext` represented as a `traceparent` value.
 */
export declare function getTraceParentHeader(spanContext: SpanContext): string | undefined;

/**
 * Retrieves the active tracer, or returns a
 * no-op implementation if one is not set.
 */
export declare function getTracer(): Tracer;

/**
 * Represents high resolution time.
 */
export declare type HrTime = [number, number];

/**
 * Used to specify a span that is linked to another.
 */
export declare interface Link {
    /** The {@link SpanContext} of a linked span. */
    context: SpanContext;
    /** A set of {@link SpanAttributes} on the link. */
    attributes?: SpanAttributes;
}

/**
 * A no-op implementation of Span that can safely be used without side-effects.
 */
export declare class NoOpSpan implements Span {
    /**
     * Returns the SpanContext associated with this Span.
     */
    spanContext(): SpanContext;
    /**
     * Marks the end of Span execution.
     * @param _endTime - The time to use as the Span's end time. Defaults to
     * the current time.
     */
    end(_endTime?: number): void;
    /**
     * Sets an attribute on the Span
     * @param _key - The attribute key
     * @param _value - The attribute value
     */
    setAttribute(_key: string, _value: unknown): this;
    /**
     * Sets attributes on the Span
     * @param _attributes - The attributes to add
     */
    setAttributes(_attributes: SpanAttributes): this;
    /**
     * Adds an event to the Span
     * @param _name - The name of the event
     * @param _attributes - The associated attributes to add for this event
     */
    addEvent(_name: string, _attributes?: SpanAttributes): this;
    /**
     * Sets a status on the span. Overrides the default of SpanStatusCode.OK.
     * @param _status - The status to set.
     */
    setStatus(_status: SpanStatus): this;
    /**
     * Updates the name of the Span
     * @param _name - the new Span name
     */
    updateName(_name: string): this;
    /**
     * Returns whether this span will be recorded
     */
    isRecording(): boolean;
    /**
     * Sets exception as a span event
     * @param exception - the exception the only accepted values are string or Error
     * @param time - the time to set as Span's event time. If not provided,
     *     use the current time.
     */
    recordException(_exception: Exception, _time?: TimeInput): void;
}

/**
 * A no-op implementation of Tracer that can be used when tracing
 * is disabled.
 */
export declare class NoOpTracer implements Tracer {
    /**
     * Starts a new Span.
     * @param _name - The name of the span.
     * @param _options - The SpanOptions used during Span creation.
     */
    startSpan(_name: string, _options?: SpanOptions): Span;
    /**
     * Returns the current Span from the current context, if available.
     */
    getCurrentSpan(): Span;
    /**
     * Executes the given function within the context provided by a Span.
     * @param _span - The span that provides the context.
     * @param fn - The function to be executed.
     */
    withSpan<T extends (...args: unknown[]) => ReturnType<T>>(_span: Span, fn: T): ReturnType<T>;
    /**
     * Bind a Span as the target's scope
     * @param target - An object to bind the scope.
     * @param _span - A specific Span to use. Otherwise, use the current one.
     */
    bind<T>(target: T, _span?: Span): T;
}

/**
 * Tracing options to set on an operation.
 */
export declare interface OperationTracingOptions {
    /**
     * OpenTelemetry SpanOptions used to create a span when tracing is enabled.
     */
    spanOptions?: SpanOptions;
    /**
     * OpenTelemetry context to use for created Spans.
     */
    tracingContext?: Context;
}

/**
 * Set the span on a context
 *
 * @param context - context to use as parent
 * @param span - span to set active
 */
export declare function setSpan(context: Context, span: Span): Context;

/**
 * Wrap span context in a NoopSpan and set as span in a new
 * context
 *
 * @param context - context to set active span on
 * @param spanContext - span context to be wrapped
 */
export declare function setSpanContext(context: Context, spanContext: SpanContext): Context;

/**
 * Sets the global tracer, enabling tracing for the Azure SDK.
 * @param tracer - An OpenTelemetry Tracer instance.
 */
export declare function setTracer(tracer: Tracer): void;

/**
 * An interface that represents a span. A span represents a single operation
 * within a trace. Examples of span might include remote procedure calls or a
 * in-process function calls to sub-components. A Trace has a single, top-level
 * "root" Span that in turn may have zero or more child Spans, which in turn
 * may have children.
 *
 * Spans are created by the {@link Tracer.startSpan} method.
 */
export declare interface Span {
    /**
     * Returns the {@link SpanContext} object associated with this Span.
     *
     * Get an immutable, serializable identifier for this span that can be used
     * to create new child spans. Returned SpanContext is usable even after the
     * span ends.
     *
     * @returns the SpanContext object associated with this Span.
     */
    spanContext(): SpanContext;
    /**
     * Sets an attribute to the span.
     *
     * Sets a single Attribute with the key and value passed as arguments.
     *
     * @param key - the key for this attribute.
     * @param value - the value for this attribute. Setting a value null or
     *              undefined is invalid and will result in undefined behavior.
     */
    setAttribute(key: string, value: SpanAttributeValue): this;
    /**
     * Sets attributes to the span.
     *
     * @param attributes - the attributes that will be added.
     *                   null or undefined attribute values
     *                   are invalid and will result in undefined behavior.
     */
    setAttributes(attributes: SpanAttributes): this;
    /**
     * Adds an event to the Span.
     *
     * @param name - the name of the event.
     * @param attributesOrStartTime -  the attributes that will be added; these are
     *     associated with this event. Can be also a start time
     *     if type is TimeInput and 3rd param is undefined
     * @param startTime - start time of the event.
     */
    addEvent(name: string, attributesOrStartTime?: SpanAttributes | TimeInput, startTime?: TimeInput): this;
    /**
     * Sets a status to the span. If used, this will override the default Span
     * status. Default is {@link SpanStatusCode.UNSET}. SetStatus overrides the value
     * of previous calls to SetStatus on the Span.
     *
     * @param status - the SpanStatus to set.
     */
    setStatus(status: SpanStatus): this;
    /**
     * Marks the end of Span execution.
     *
     * Call to End of a Span MUST not have any effects on child spans. Those may
     * still be running and can be ended later.
     *
     * Do not return `this`. The Span generally should not be used after it
     * is ended so chaining is not desired in this context.
     *
     * @param endTime - the time to set as Span's end time. If not provided,
     *     use the current time as the span's end time.
     */
    end(endTime?: TimeInput): void;
    /**
     * Returns the flag whether this span will be recorded.
     *
     * @returns true if this Span is active and recording information like events
     *     with the `AddEvent` operation and attributes using `setAttributes`.
     */
    isRecording(): boolean;
    /**
     * Sets exception as a span event
     * @param exception - the exception the only accepted values are string or Error
     * @param time - the time to set as Span's event time. If not provided,
     *     use the current time.
     */
    recordException(exception: Exception, time?: TimeInput): void;
    /**
     * Updates the Span name.
     *
     * This will override the name provided via {@link Tracer.startSpan}.
     *
     * Upon this update, any sampling behavior based on Span name will depend on
     * the implementation.
     *
     * @param name - the Span name.
     */
    updateName(name: string): this;
}

/**
 * Attributes for a Span.
 */
export declare interface SpanAttributes {
    /**
     * Attributes for a Span.
     */
    [attributeKey: string]: SpanAttributeValue | undefined;
}

/**
 * Attribute values may be any non-nullish primitive value except an object.
 *
 * null or undefined attribute values are invalid and will result in undefined behavior.
 */
export declare type SpanAttributeValue = string | number | boolean | Array<null | undefined | string> | Array<null | undefined | number> | Array<null | undefined | boolean>;

/**
 * A light interface that tries to be structurally compatible with OpenTelemetry
 */
export declare interface SpanContext {
    /**
     * UUID of a trace.
     */
    traceId: string;
    /**
     * UUID of a Span.
     */
    spanId: string;
    /**
     * https://www.w3.org/TR/trace-context/#trace-flags
     */
    traceFlags: number;
    /**
     * Tracing-system-specific info to propagate.
     *
     * The tracestate field value is a `list` as defined below. The `list` is a
     * series of `list-members` separated by commas `,`, and a list-member is a
     * key/value pair separated by an equals sign `=`. Spaces and horizontal tabs
     * surrounding `list-members` are ignored. There can be a maximum of 32
     * `list-members` in a `list`.
     * More Info: https://www.w3.org/TR/trace-context/#tracestate-field
     *
     * Examples:
     *     Single tracing system (generic format):
     *         tracestate: rojo=00f067aa0ba902b7
     *     Multiple tracing systems (with different formatting):
     *         tracestate: rojo=00f067aa0ba902b7,congo=t61rcWkgMzE
     */
    traceState?: TraceState;
}

/**
 * Contains all the spans for a particular TraceID
 * starting at unparented roots
 */
export declare interface SpanGraph {
    /**
     * All Spans without a parentSpanId
     */
    roots: SpanGraphNode[];
}

/**
 * Simple representation of a Span that only has name and child relationships.
 * Children should be arranged in the order they were created.
 */
export declare interface SpanGraphNode {
    /**
     * The Span name
     */
    name: string;
    /**
     * All child Spans of this Span
     */
    children: SpanGraphNode[];
}

/**
 * The kind of span.
 */
export declare enum SpanKind {
    /** Default value. Indicates that the span is used internally. */
    INTERNAL = 0,
    /**
     * Indicates that the span covers server-side handling of an RPC or other
     * remote request.
     */
    SERVER = 1,
    /**
     * Indicates that the span covers the client-side wrapper around an RPC or
     * other remote request.
     */
    CLIENT = 2,
    /**
     * Indicates that the span describes producer sending a message to a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */
    PRODUCER = 3,
    /**
     * Indicates that the span describes consumer receiving a message from a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */
    CONSUMER = 4
}

/**
 * An interface that enables manual propagation of Spans
 */
export declare interface SpanOptions {
    /**
     * Attributes to set on the Span
     */
    attributes?: SpanAttributes;
    /** {@link Link}s span to other spans */
    links?: Link[];
    /**
     * The type of Span. Default to SpanKind.INTERNAL
     */
    kind?: SpanKind;
    /**
     * A manually specified start time for the created `Span` object.
     */
    startTime?: TimeInput;
}

/**
 * The status for a span.
 */
export declare interface SpanStatus {
    /** The status code of this message. */
    code: SpanStatusCode;
    /** A developer-facing error message. */
    message?: string;
}

/** SpanStatusCode */
export declare enum SpanStatusCode {
    /**
     * The default status.
     */
    UNSET = 0,
    /**
     * The operation has been validated by an Application developer or
     * Operator to have completed successfully.
     */
    OK = 1,
    /**
     * The operation contains an error.
     */
    ERROR = 2
}

/**
 * A mock span useful for testing.
 */
export declare class TestSpan extends NoOpSpan {
    /**
     * The Span's current name
     */
    name: string;
    /**
     * The Span's current status
     */
    status: SpanStatus;
    /**
     * The Span's kind
     */
    kind: SpanKind;
    /**
     * True if end() has been called on the Span
     */
    endCalled: boolean;
    /**
     * The start time of the Span
     */
    readonly startTime: TimeInput;
    /**
     * The id of the parent Span, if any.
     */
    readonly parentSpanId?: string;
    /**
     * Known attributes, if any.
     */
    readonly attributes: SpanAttributes;
    private _context;
    private readonly _tracer;
    /**
     * Starts a new Span.
     * @param parentTracer-  The tracer that created this Span
     * @param name - The name of the span.
     * @param context - The SpanContext this span belongs to
     * @param kind - The SpanKind of this Span
     * @param parentSpanId - The identifier of the parent Span
     * @param startTime - The startTime of the event (defaults to now)
     */
    constructor(parentTracer: Tracer, name: string, context: SpanContext, kind: SpanKind, parentSpanId?: string, startTime?: TimeInput);
    /**
     * Returns the Tracer that created this Span
     */
    tracer(): Tracer;
    /**
     * Returns the SpanContext associated with this Span.
     */
    spanContext(): SpanContext;
    /**
     * Marks the end of Span execution.
     * @param _endTime - The time to use as the Span's end time. Defaults to
     * the current time.
     */
    end(_endTime?: number): void;
    /**
     * Sets a status on the span. Overrides the default of SpanStatusCode.OK.
     * @param status - The status to set.
     */
    setStatus(status: SpanStatus): this;
    /**
     * Returns whether this span will be recorded
     */
    isRecording(): boolean;
    /**
     * Sets an attribute on the Span
     * @param key - The attribute key
     * @param value - The attribute value
     */
    setAttribute(key: string, value: SpanAttributeValue): this;
    /**
     * Sets attributes on the Span
     * @param attributes - The attributes to add
     */
    setAttributes(attributes: SpanAttributes): this;
}

/**
 * A mock tracer useful for testing
 */
export declare class TestTracer extends NoOpTracer {
    private traceIdCounter;
    private getNextTraceId;
    private spanIdCounter;
    private getNextSpanId;
    private rootSpans;
    private knownSpans;
    /**
     * Returns all Spans that were created without a parent
     */
    getRootSpans(): TestSpan[];
    /**
     * Returns all Spans this Tracer knows about
     */
    getKnownSpans(): TestSpan[];
    /**
     * Returns all Spans where end() has not been called
     */
    getActiveSpans(): TestSpan[];
    /**
     * Return all Spans for a particular trace, grouped by their
     * parent Span in a tree-like structure
     * @param traceId - The traceId to return the graph for
     */
    getSpanGraph(traceId: string): SpanGraph;
    /**
     * Starts a new Span.
     * @param name - The name of the span.
     * @param options - The SpanOptions used during Span creation.
     */
    startSpan(name: string, options?: SpanOptions, context?: Context): TestSpan;
}

/**
 * Used to represent a Time.
 */
export declare type TimeInput = HrTime | number | Date;

/**
 * Shorthand enum for common traceFlags values inside SpanContext
 */
export declare const enum TraceFlags {
    /** No flag set. */
    NONE = 0,
    /** Caller is collecting trace information. */
    SAMPLED = 1
}

/**
 * A Tracer.
 */
export declare interface Tracer {
    /**
     * Starts a new {@link Span}. Start the span without setting it on context.
     *
     * This method does NOT modify the current Context.
     *
     * @param name - The name of the span
     * @param options - SpanOptions used for span creation
     * @param context - Context to use to extract parent
     * @returns The newly created span
     * @example
     *     const span = tracer.startSpan('op');
     *     span.setAttribute('key', 'value');
     *     span.end();
     */
    startSpan(name: string, options?: SpanOptions, context?: Context): Span;
}

/**
 * TraceState.
 */
export declare interface TraceState {
    /**
     * Create a new TraceState which inherits from this TraceState and has the
     * given key set.
     * The new entry will always be added in the front of the list of states.
     *
     * @param key - key of the TraceState entry.
     * @param value - value of the TraceState entry.
     */
    set(key: string, value: string): TraceState;
    /**
     * Return a new TraceState which inherits from this TraceState but does not
     * contain the given key.
     *
     * @param key - the key for the TraceState entry to be removed.
     */
    unset(key: string): TraceState;
    /**
     * Returns the value to which the specified key is mapped, or `undefined` if
     * this map contains no mapping for the key.
     *
     * @param key - with which the specified value is to be associated.
     * @returns the value to which the specified key is mapped, or `undefined` if
     *     this map contains no mapping for the key.
     */
    get(key: string): string | undefined;
    /**
     * Serializes the TraceState to a `list` as defined below. The `list` is a
     * series of `list-members` separated by commas `,`, and a list-member is a
     * key/value pair separated by an equals sign `=`. Spaces and horizontal tabs
     * surrounding `list-members` are ignored. There can be a maximum of 32
     * `list-members` in a `list`.
     *
     * @returns the serialized string.
     */
    serialize(): string;
}

export { }
