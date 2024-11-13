// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { HttpPipelineLogger } from "../httpPipelineLogger";
import { HttpPipelineLogLevel } from "../httpPipelineLogLevel";
import { WebResourceLike } from "../webResource";

/**
 * Creates a new RequestPolicy per-request that uses the provided nextPolicy.
 */
export type RequestPolicyFactory = {
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): RequestPolicy;
};

export interface RequestPolicy {
  sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse>;
}

export abstract class BaseRequestPolicy implements RequestPolicy {
  protected constructor(
    readonly _nextPolicy: RequestPolicy,
    readonly _options: RequestPolicyOptionsLike
  ) {}

  public abstract sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse>;

  /**
   * Get whether or not a log with the provided log level should be logged.
   * @param logLevel The log level of the log that will be logged.
   * @returns Whether or not a log with the provided log level should be logged.
   */
  public shouldLog(logLevel: HttpPipelineLogLevel): boolean {
    return this._options.shouldLog(logLevel);
  }

  /**
   * Attempt to log the provided message to the provided logger. If no logger was provided or if
   * the log level does not meat the logger's threshold, then nothing will be logged.
   * @param logLevel The log level of this log.
   * @param message The message of this log.
   */
  public log(logLevel: HttpPipelineLogLevel, message: string): void {
    this._options.log(logLevel, message);
  }
}

/**
 * Optional properties that can be used when creating a RequestPolicy.
 */
export interface RequestPolicyOptionsLike {
  /**
   * Get whether or not a log with the provided log level should be logged.
   * @param logLevel The log level of the log that will be logged.
   * @returns Whether or not a log with the provided log level should be logged.
   */
  shouldLog(logLevel: HttpPipelineLogLevel): boolean;

  /**
   * Attempt to log the provided message to the provided logger. If no logger was provided or if
   * the log level does not meet the logger's threshold, then nothing will be logged.
   * @param logLevel The log level of this log.
   * @param message The message of this log.
   */
  log(logLevel: HttpPipelineLogLevel, message: string): void;
}

/**
 * Optional properties that can be used when creating a RequestPolicy.
 */
export class RequestPolicyOptions implements RequestPolicyOptionsLike {
  constructor(private _logger?: HttpPipelineLogger) {}

  /**
   * Get whether or not a log with the provided log level should be logged.
   * @param logLevel The log level of the log that will be logged.
   * @returns Whether or not a log with the provided log level should be logged.
   */
  public shouldLog(logLevel: HttpPipelineLogLevel): boolean {
    return (
      !!this._logger &&
      logLevel !== HttpPipelineLogLevel.OFF &&
      logLevel <= this._logger.minimumLogLevel
    );
  }

  /**
   * Attempt to log the provided message to the provided logger. If no logger was provided or if
   * the log level does not meat the logger's threshold, then nothing will be logged.
   * @param logLevel The log level of this log.
   * @param message The message of this log.
   */
  public log(logLevel: HttpPipelineLogLevel, message: string): void {
    if (this._logger && this.shouldLog(logLevel)) {
      this._logger.log(logLevel, message);
    }
  }
}
