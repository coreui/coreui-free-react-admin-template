'use strict';

export class TimeoutError extends Error {
  previous: Error | undefined;

  constructor(message: string, previousError?: Error) {
    super(message);
    this.name = "TimeoutError";
    this.previous = previousError;
  }
}

export type MatchOption =
  | string
  | RegExp
  | Error
  | Function;

export interface Options {
  max: number;
  timeout?: number | undefined;
  match?: MatchOption[] | MatchOption | undefined;
  backoffBase?: number | undefined;
  backoffExponent?: number | undefined;
  report?: ((message: string, obj: CoercedOptions, err?: any) => void) | undefined;
  name?: string | undefined;
}

type CoercedOptions = {
  $current: number;
  max: number;
  timeout?: number | undefined;
  match: MatchOption[];
  backoffBase: number;
  backoffExponent: number;
  report?: ((message: string, obj: CoercedOptions, err?: any) => void) | undefined;
  name?: string | undefined;
}
type MaybePromise<T> = PromiseLike<T> | T;
type RetryCallback<T> = ({ current }: { current: CoercedOptions['$current'] }) => MaybePromise<T>;

function matches(match : MatchOption, err: Error) {
  if (typeof match === 'function') {
    try {
      if (err instanceof match) return true;
    } catch (_) {
      return !!match(err);
    }
  }
  if (match === err.toString()) return true;
  if (match === err.message) return true;
  return match instanceof RegExp
    && (match.test(err.message) || match.test(err.toString()));
}

export function retryAsPromised<T>(callback : RetryCallback<T>, optionsInput : Options | number | CoercedOptions) : Promise<T> {
  if (!callback || !optionsInput) {
    throw new Error(
      'retry-as-promised must be passed a callback and a options set'
    );
  }

  optionsInput = (typeof optionsInput === "number" ? {max: optionsInput} : optionsInput) as Options | CoercedOptions;

  const options : CoercedOptions = {
    $current: "$current" in optionsInput ? optionsInput.$current : 1,
    max: optionsInput.max,
    timeout: optionsInput.timeout || undefined,
    match: optionsInput.match ? Array.isArray(optionsInput.match) ? optionsInput.match : [optionsInput.match] : [],
    backoffBase: optionsInput.backoffBase === undefined ? 100 : optionsInput.backoffBase,
    backoffExponent: optionsInput.backoffExponent || 1.1,
    report: optionsInput.report,
    name: optionsInput.name || callback.name || 'unknown'
  };

  if (options.match && !Array.isArray(options.match)) options.match = [options.match];
  if (options.report) options.report('Trying ' + options.name + ' #' + options.$current + ' at ' + new Date().toLocaleTimeString(), options);

  return new Promise(function(resolve, reject) {
    let timeout : NodeJS.Timeout | undefined;
    let backoffTimeout : NodeJS.Timeout | undefined;
    let lastError : Error | undefined;

    if (options.timeout) {
      timeout = setTimeout(function() {
        if (backoffTimeout) clearTimeout(backoffTimeout);
        reject(new TimeoutError(options.name + ' timed out', lastError));
      }, options.timeout);
    }

    Promise.resolve(callback({ current: options.$current }))
      .then(resolve)
      .then(function() {
        if (timeout) clearTimeout(timeout);
        if (backoffTimeout) clearTimeout(backoffTimeout);
      })
      .catch(function(err) {
        if (timeout) clearTimeout(timeout);
        if (backoffTimeout) clearTimeout(backoffTimeout);

        lastError = err;
        if (options.report) options.report((err && err.toString()) || err, options, err);

        // Should not retry if max has been reached
        var shouldRetry = options.$current! < options.max;
        if (!shouldRetry) return reject(err);
        shouldRetry = options.match.length === 0 || options.match.some(function (match) {
          return matches(match, err)
        });
        if (!shouldRetry) return reject(err);

        var retryDelay = options.backoffBase * Math.pow(options.backoffExponent, options.$current - 1);

        // Do some accounting
        options.$current++;
        if (options.report) options.report(`Retrying ${options.name} (${options.$current})`, options);

        if (retryDelay) {
          // Use backoff function to ease retry rate
          if (options.report) options.report(`Delaying retry of ${options.name} by ${retryDelay}`, options);
          backoffTimeout = setTimeout(function() {
            retryAsPromised(callback, options)
              .then(resolve)
              .catch(reject);
          }, retryDelay);
        } else {
          retryAsPromised(callback, options)
            .then(resolve)
            .catch(reject);
        }
      });
  });
};

export default retryAsPromised;