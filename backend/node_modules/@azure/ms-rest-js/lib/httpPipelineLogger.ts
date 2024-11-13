// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

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
export class ConsoleHttpPipelineLogger implements HttpPipelineLogger {
  /**
   * Create a new ConsoleHttpPipelineLogger.
   * @param minimumLogLevel The log level threshold for what logs will be logged.
   */
  constructor(public minimumLogLevel: HttpPipelineLogLevel) {}

  /**
   * Log the provided message.
   * @param logLevel The HttpLogDetailLevel associated with this message.
   * @param message The message to log.
   */
  log(logLevel: HttpPipelineLogLevel, message: string): void {
    const logMessage = `${HttpPipelineLogLevel[logLevel]}: ${message}`;
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
  }
}
