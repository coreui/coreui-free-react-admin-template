import { type Debugger } from "./debug.js";
export type { Debugger } from "./debug.js";
/**
 * The AzureLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */
export declare const AzureLogger: AzureClientLogger;
/**
 * The log levels supported by the logger.
 * The log levels in order of most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export type AzureLogLevel = "verbose" | "info" | "warning" | "error";
/**
 * An AzureClientLogger is a function that can log to an appropriate severity level.
 */
export type AzureClientLogger = Debugger;
/**
 * Immediately enables logging at the specified log level. If no level is specified, logging is disabled.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export declare function setLogLevel(level?: AzureLogLevel): void;
/**
 * Retrieves the currently specified log level.
 */
export declare function getLogLevel(): AzureLogLevel | undefined;
/**
 * Defines the methods available on the SDK-facing logger.
 */
export interface AzureLogger {
    /**
     * Used for failures the program is unlikely to recover from,
     * such as Out of Memory.
     */
    error: Debugger;
    /**
     * Used when a function fails to perform its intended task.
     * Usually this means the function will throw an exception.
     * Not used for self-healing events (e.g. automatic retry)
     */
    warning: Debugger;
    /**
     * Used when a function operates normally.
     */
    info: Debugger;
    /**
     * Used for detailed troubleshooting scenarios. This is
     * intended for use by developers / system administrators
     * for diagnosing specific failures.
     */
    verbose: Debugger;
}
/**
 * Creates a logger for use by the Azure SDKs that inherits from `AzureLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */
export declare function createClientLogger(namespace: string): AzureLogger;
//# sourceMappingURL=index.d.ts.map