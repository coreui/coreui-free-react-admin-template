export interface ILoggerCallback {
    (level: LogLevel, message: string, containsPii: boolean): void;
}
export declare enum LogLevel {
    Error = 0,
    Warning = 1,
    Info = 2,
    Verbose = 3
}
export declare class Logger {
    /**
     * @hidden
     */
    private static instance;
    /**
     * @hidden
     */
    private correlationId;
    /**
     * @hidden
     */
    private level;
    /**
     * @hidden
     */
    private piiLoggingEnabled;
    /**
     * @hidden
     */
    private localCallback;
    constructor(localCallback: ILoggerCallback, options?: {
        correlationId?: string;
        level?: LogLevel;
        piiLoggingEnabled?: boolean;
    });
    /**
     * @hidden
     */
    private logMessage;
    /**
     * @hidden
     */
    executeCallback(level: LogLevel, message: string, containsPii: boolean): void;
    /**
     * @hidden
     */
    error(message: string): void;
    /**
     * @hidden
     */
    errorPii(message: string): void;
    /**
     * @hidden
     */
    warning(message: string): void;
    /**
     * @hidden
     */
    warningPii(message: string): void;
    /**
     * @hidden
     */
    info(message: string): void;
    /**
     * @hidden
     */
    infoPii(message: string): void;
    /**
     * @hidden
     */
    verbose(message: string): void;
    /**
     * @hidden
     */
    verbosePii(message: string): void;
    isPiiLoggingEnabled(): boolean;
}
