import { RequestOptionsBase } from "./webResource";
/**
 * A collection of properties that apply to a single invocation of an operation.
 */
export interface OperationArguments {
    /**
     * The parameters that were passed to the operation method.
     */
    [parameterName: string]: any;
    /**
     * The optional arugments that are provided to an operation.
     */
    options?: RequestOptionsBase;
}
//# sourceMappingURL=operationArguments.d.ts.map