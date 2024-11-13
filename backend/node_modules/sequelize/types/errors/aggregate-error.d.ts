import BaseError from './base-error';
/**
 * A wrapper for multiple Errors
 *
 * @param errors The aggregated errors that occurred
 */
declare class AggregateError extends BaseError {
    /** the aggregated errors that occurred */
    readonly errors: Array<AggregateError | Error>;
    constructor(errors: Array<AggregateError | Error>);
    toString(): string;
}
export default AggregateError;
