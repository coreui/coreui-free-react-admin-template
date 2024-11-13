// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export { getTracer, setTracer } from "./tracerProxy";
// Tracers and wrappers
export { NoOpSpan } from "./tracers/noop/noOpSpan";
export { NoOpTracer } from "./tracers/noop/noOpTracer";
export { TestTracer } from "./tracers/test/testTracer";
export { TestSpan } from "./tracers/test/testSpan";
export { createSpanFunction } from "./createSpan";
// Shared interfaces
export { context, getSpan, getSpanContext, setSpan, setSpanContext, SpanKind, SpanStatusCode } from "./interfaces";
// Utilities
export { extractSpanContextFromTraceParentHeader, getTraceParentHeader } from "./utils/traceParentHeader";
//# sourceMappingURL=index.js.map