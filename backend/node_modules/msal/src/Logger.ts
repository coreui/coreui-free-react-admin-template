/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { StringUtils } from "./utils/StringUtils";
import { version as libraryVersion } from "./packageMetadata";

export interface ILoggerCallback {
    (level: LogLevel, message: string, containsPii: boolean): void;
}

export enum LogLevel {
    Error,
    Warning,
    Info,
    Verbose
}

export class Logger {// Singleton Class

    /**
     * @hidden
     */
    // TODO: This does not seem to be a singleton!! Change or Delete.
    private static instance: Logger;

    /**
     * @hidden
     */
    private correlationId: string;

    /**
     * @hidden
     */
    private level: LogLevel = LogLevel.Info;

    /**
     * @hidden
     */
    private piiLoggingEnabled: boolean;

    /**
     * @hidden
     */
    private localCallback: ILoggerCallback;

    constructor(localCallback: ILoggerCallback,
        options:
        {
            correlationId?: string,
            level?: LogLevel,
            piiLoggingEnabled?: boolean,
        } = {}) {
        const {
            correlationId = "",
            level = LogLevel.Info,
            piiLoggingEnabled = false
        } = options;

        this.localCallback = localCallback;
        this.correlationId = correlationId;
        this.level = level;
        this.piiLoggingEnabled = piiLoggingEnabled;
    }

    /**
     * @hidden
     */
    private logMessage(logLevel: LogLevel, logMessage: string, containsPii: boolean): void {
        if ((logLevel > this.level) || (!this.piiLoggingEnabled && containsPii)) {
            return;
        }
        const timestamp = new Date().toUTCString();
        let log: string;
        if (!StringUtils.isEmpty(this.correlationId)) {
            log = timestamp + ":" + this.correlationId + "-" + libraryVersion + "-" + LogLevel[logLevel] + (containsPii ? "-pii" : "") + " " + logMessage;
        }
        else {
            log = timestamp + ":" + libraryVersion + "-" + LogLevel[logLevel] + (containsPii ? "-pii" : "") + " " + logMessage;
        }
        this.executeCallback(logLevel, log, containsPii);
    }

    /**
     * @hidden
     */
    executeCallback(level: LogLevel, message: string, containsPii: boolean): void {
        if (this.localCallback) {
            this.localCallback(level, message, containsPii);
        }
    }

    /**
     * @hidden
     */
    error(message: string): void {
        this.logMessage(LogLevel.Error, message, false);
    }

    /**
     * @hidden
     */
    errorPii(message: string): void {
        this.logMessage(LogLevel.Error, message, true);
    }

    /**
     * @hidden
     */
    warning(message: string): void {
        this.logMessage(LogLevel.Warning, message, false);
    }

    /**
     * @hidden
     */
    warningPii(message: string): void {
        this.logMessage(LogLevel.Warning, message, true);
    }

    /**
     * @hidden
     */
    info(message: string): void {
        this.logMessage(LogLevel.Info, message, false);
    }

    /**
     * @hidden
     */
    infoPii(message: string): void {
        this.logMessage(LogLevel.Info, message, true);
    }

    /**
     * @hidden
     */
    verbose(message: string): void {
        this.logMessage(LogLevel.Verbose, message, false);
    }

    /**
     * @hidden
     */
    verbosePii(message: string): void {
        this.logMessage(LogLevel.Verbose, message, true);
    }

    isPiiLoggingEnabled(): boolean {
        return this.piiLoggingEnabled;
    }
}
