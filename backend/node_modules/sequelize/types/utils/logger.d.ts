/**
 * @file Sequelize module for debug and deprecation messages.
 * It require a `context` for which messages will be printed.
 *
 * @module logging
 * @access package
 */
import nodeDebug from 'debug';
/**
 * The configuration for sequelize's logging interface.
 *
 * @access package
 */
export interface LoggerConfig {
    /**
     * The context which the logger should log in.
     *
     * @default 'sequelize'
     */
    context?: string;
}
export declare class Logger {
    protected config: LoggerConfig;
    constructor({ context, ...rest }?: Partial<LoggerConfig>);
    /**
     * Logs a warning in the logger's context.
     *
     * @param message The message of the warning.
     */
    warn(message: string): void;
    /**
     * Uses node's util.inspect to stringify a value.
     *
     * @param value The value which should be inspected.
     * @returns The string of the inspected value.
     */
    inspect(value: unknown): string;
    /**
     * Gets a debugger for a context.
     *
     * @param name The name of the context.
     * @returns A debugger interace which can be used to debug.
     */
    debugContext(name: string): nodeDebug.Debugger;
}
export declare const logger: Logger;
