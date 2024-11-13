/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { StringUtils } from '../utils/StringUtils.js';
import { Constants } from '../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Log message level.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warning"] = 1] = "Warning";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
    LogLevel[LogLevel["Trace"] = 4] = "Trace";
})(LogLevel || (LogLevel = {}));
/**
 * Class which facilitates logging of messages to a specific place.
 */
var Logger = /** @class */ (function () {
    function Logger(loggerOptions, packageName, packageVersion) {
        // Current log level, defaults to info.
        this.level = LogLevel.Info;
        var defaultLoggerCallback = function () { };
        this.localCallback = loggerOptions.loggerCallback || defaultLoggerCallback;
        this.piiLoggingEnabled = loggerOptions.piiLoggingEnabled || false;
        this.level = loggerOptions.logLevel || LogLevel.Info;
        this.correlationId = loggerOptions.correlationId || "";
        this.packageName = packageName || Constants.EMPTY_STRING;
        this.packageVersion = packageVersion || Constants.EMPTY_STRING;
    }
    /**
     * Create new Logger with existing configurations.
     */
    Logger.prototype.clone = function (packageName, packageVersion, correlationId) {
        return new Logger({ loggerCallback: this.localCallback, piiLoggingEnabled: this.piiLoggingEnabled, logLevel: this.level, correlationId: correlationId || this.correlationId }, packageName, packageVersion);
    };
    /**
     * Log message with required options.
     */
    Logger.prototype.logMessage = function (logMessage, options) {
        if ((options.logLevel > this.level) || (!this.piiLoggingEnabled && options.containsPii)) {
            return;
        }
        var timestamp = new Date().toUTCString();
        // Add correlationId to logs if set, correlationId provided on log messages take precedence
        var logHeader;
        if (!StringUtils.isEmpty(options.correlationId)) {
            logHeader = "[" + timestamp + "] : [" + options.correlationId + "]";
        }
        else if (!StringUtils.isEmpty(this.correlationId)) {
            logHeader = "[" + timestamp + "] : [" + this.correlationId + "]";
        }
        else {
            logHeader = "[" + timestamp + "]";
        }
        var log = logHeader + " : " + this.packageName + "@" + this.packageVersion + " : " + LogLevel[options.logLevel] + " - " + logMessage;
        // debug(`msal:${LogLevel[options.logLevel]}${options.containsPii ? "-Pii": ""}${options.context ? `:${options.context}` : ""}`)(logMessage);
        this.executeCallback(options.logLevel, log, options.containsPii || false);
    };
    /**
     * Execute callback with message.
     */
    Logger.prototype.executeCallback = function (level, message, containsPii) {
        if (this.localCallback) {
            this.localCallback(level, message, containsPii);
        }
    };
    /**
     * Logs error messages.
     */
    Logger.prototype.error = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Error,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs error messages with PII.
     */
    Logger.prototype.errorPii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Error,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs warning messages.
     */
    Logger.prototype.warning = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Warning,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs warning messages with PII.
     */
    Logger.prototype.warningPii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Warning,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs info messages.
     */
    Logger.prototype.info = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Info,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs info messages with PII.
     */
    Logger.prototype.infoPii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Info,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs verbose messages.
     */
    Logger.prototype.verbose = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Verbose,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs verbose messages with PII.
     */
    Logger.prototype.verbosePii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Verbose,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs trace messages.
     */
    Logger.prototype.trace = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Trace,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs trace messages with PII.
     */
    Logger.prototype.tracePii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: LogLevel.Trace,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Returns whether PII Logging is enabled or not.
     */
    Logger.prototype.isPiiLoggingEnabled = function () {
        return this.piiLoggingEnabled || false;
    };
    return Logger;
}());

export { LogLevel, Logger };
//# sourceMappingURL=Logger.js.map
