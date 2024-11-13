// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { HttpPipelineLogLevel } from "./httpPipelineLogLevel";
/**
 * A HttpPipelineLogger that will send its logs to the console.
 */
var ConsoleHttpPipelineLogger = /** @class */ (function () {
    /**
     * Create a new ConsoleHttpPipelineLogger.
     * @param minimumLogLevel The log level threshold for what logs will be logged.
     */
    function ConsoleHttpPipelineLogger(minimumLogLevel) {
        this.minimumLogLevel = minimumLogLevel;
    }
    /**
     * Log the provided message.
     * @param logLevel The HttpLogDetailLevel associated with this message.
     * @param message The message to log.
     */
    ConsoleHttpPipelineLogger.prototype.log = function (logLevel, message) {
        var logMessage = HttpPipelineLogLevel[logLevel] + ": " + message;
        switch (logLevel) {
            case HttpPipelineLogLevel.ERROR:
                console.error(logMessage);
                break;
            case HttpPipelineLogLevel.WARNING:
                console.warn(logMessage);
                break;
            case HttpPipelineLogLevel.INFO:
                console.log(logMessage);
                break;
        }
    };
    return ConsoleHttpPipelineLogger;
}());
export { ConsoleHttpPipelineLogger };
//# sourceMappingURL=httpPipelineLogger.js.map