// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { NoOpSpan } from "./noOpSpan";
/**
 * A no-op implementation of Tracer that can be used when tracing
 * is disabled.
 */
export class NoOpTracer {
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
//# sourceMappingURL=noOpTracer.js.map