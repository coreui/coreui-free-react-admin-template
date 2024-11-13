// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { getTracer } from "../src/tracerProxy";
import { SpanKind, setSpan, context as otContext } from "./interfaces";
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
export function createSpanFunction(args) {
    return function (operationName, operationOptions) {
        const tracer = getTracer();
        const tracingOptions = (operationOptions === null || operationOptions === void 0 ? void 0 : operationOptions.tracingOptions) || {};
        const spanOptions = Object.assign({ kind: SpanKind.INTERNAL }, tracingOptions.spanOptions);
        const spanName = args.packagePrefix ? `${args.packagePrefix}.${operationName}` : operationName;
        const span = tracer.startSpan(spanName, spanOptions, tracingOptions.tracingContext);
        if (args.namespace) {
            span.setAttribute("az.namespace", args.namespace);
        }
        let newSpanOptions = tracingOptions.spanOptions || {};
        if (span.isRecording() && args.namespace) {
            newSpanOptions = Object.assign(Object.assign({}, tracingOptions.spanOptions), { attributes: Object.assign(Object.assign({}, spanOptions.attributes), { "az.namespace": args.namespace }) });
        }
        const newTracingOptions = Object.assign(Object.assign({}, tracingOptions), { spanOptions: newSpanOptions, tracingContext: setSpan(tracingOptions.tracingContext || otContext.active(), span) });
        const newOperationOptions = Object.assign(Object.assign({}, operationOptions), { tracingOptions: newTracingOptions });
        return {
            span,
            updatedOptions: newOperationOptions
        };
    };
}
//# sourceMappingURL=createSpan.js.map