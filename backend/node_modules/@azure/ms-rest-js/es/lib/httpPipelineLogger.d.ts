import { HttpPipelineLogLevel } from "./httpPipelineLogLevel";
/**
 * A Logger that can be added to a HttpPipeline. This enables each RequestPolicy to log messages
 * that can be used for debugging purposes.
 */
export interface HttpPipelineLogger {
    /**
     * The log level threshold for what logs will be logged.
     */
    minimumLogLevel: HttpPipelineLogLevel;
    /**
     * Log the provided message.
     * @param logLevel The HttpLogDetailLevel associated with this message.
     * @param message The message to log.
     */
    log(logLevel: HttpPipelineLogLevel, message: string): void;
}
/**
 * A HttpPipelineLogger that will send its logs to the console.
 */
export declare class ConsoleHttpPipelineLogger implements HttpPipelineLogger {
    minimumLogLevel: HttpPipelineLogLevel;
    /**
     * Create a new ConsoleHttpPipelineLogger.
     * @param minimumLogLevel The log level threshold for what logs will be logged.
     */
    constructor(minimumLogLevel: HttpPipelineLogLevel);
    /**
     * Log the provided message.
     * @param logLevel The HttpLogDetailLevel associated with this message.
     * @param message The message to log.
     */
    log(logLevel: HttpPipelineLogLevel, message: string): void;
}
//# sourceMappingURL=httpPipelineLogger.d.ts.map