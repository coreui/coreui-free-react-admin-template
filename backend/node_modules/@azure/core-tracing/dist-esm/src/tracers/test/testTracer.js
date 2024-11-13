// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TestSpan } from "./testSpan";
import { NoOpTracer } from "../noop/noOpTracer";
import { SpanKind, context as otContext, getSpanContext } from "../../interfaces";
/**
 * A mock tracer useful for testing
 */
export class TestTracer extends NoOpTracer {
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
    startSpan(name, options, context) {
        const parentContext = getSpanContext(context || otContext.active());
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
        const span = new TestSpan(this, name, spanContext, (options === null || options === void 0 ? void 0 : options.kind) || SpanKind.INTERNAL, parentContext ? parentContext.spanId : undefined, options === null || options === void 0 ? void 0 : options.startTime);
        this.knownSpans.push(span);
        if (isRootSpan) {
            this.rootSpans.push(span);
        }
        return span;
    }
}
//# sourceMappingURL=testTracer.js.map