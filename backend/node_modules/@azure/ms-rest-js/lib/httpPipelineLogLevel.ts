// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * The different levels of logs that can be used with the HttpPipelineLogger.
 */
export enum HttpPipelineLogLevel {
  /**
   * A log level that indicates that no logs will be logged.
   */
  OFF,

  /**
   * An error log.
   */
  ERROR,

  /**
   * A warning log.
   */
  WARNING,

  /**
   * An information log.
   */
  INFO,
}
