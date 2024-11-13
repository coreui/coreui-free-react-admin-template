// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { HttpPipelineLogLevel } from "../httpPipelineLogLevel";
var BaseRequestPolicy = /** @class */ (function () {
    function BaseRequestPolicy(_nextPolicy, _options) {
        this._nextPolicy = _nextPolicy;
        this._options = _options;
    }
    /**
     * Get whether or not a log with the provided log level should be logged.
     * @param logLevel The log level of the log that will be logged.
     * @returns Whether or not a log with the provided log level should be logged.
     */
    BaseRequestPolicy.prototype.shouldLog = function (logLevel) {
        return this._options.shouldLog(logLevel);
    };
    /**
     * Attempt to log the provided message to the provided logger. If no logger was provided or if
     * the log level does not meat the logger's threshold, then nothing will be logged.
     * @param logLevel The log level of this log.
     * @param message The message of this log.
     */
    BaseRequestPolicy.prototype.log = function (logLevel, message) {
        this._options.log(logLevel, message);
    };
    return BaseRequestPolicy;
}());
export { BaseRequestPolicy };
/**
 * Optional properties that can be used when creating a RequestPolicy.
 */
var RequestPolicyOptions = /** @class */ (function () {
    function RequestPolicyOptions(_logger) {
        this._logger = _logger;
    }
    /**
     * Get whether or not a log with the provided log level should be logged.
     * @param logLevel The log level of the log that will be logged.
     * @returns Whether or not a log with the provided log level should be logged.
     */
    RequestPolicyOptions.prototype.shouldLog = function (logLevel) {
        return (!!this._logger &&
            logLevel !== HttpPipelineLogLevel.OFF &&
            logLevel <= this._logger.minimumLogLevel);
    };
    /**
     * Attempt to log the provided message to the provided logger. If no logger was provided or if
     * the log level does not meat the logger's threshold, then nothing will be logged.
     * @param logLevel The log level of this log.
     * @param message The message of this log.
     */
    RequestPolicyOptions.prototype.log = function (logLevel, message) {
        if (this._logger && this.shouldLog(logLevel)) {
            this._logger.log(logLevel, message);
        }
    };
    return RequestPolicyOptions;
}());
export { RequestPolicyOptions };
//# sourceMappingURL=requestPolicy.js.map