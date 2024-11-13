import type { Model } from '..';
import BaseError from './base-error';
/**
 * Thrown when bulk operation fails, it represent per record level error.
 * Used with AggregateError
 *
 * @param error Error for a given record/instance
 * @param record DAO instance that error belongs to
 */
declare class BulkRecordError extends BaseError {
    errors: Error;
    record: Model;
    constructor(error: Error, record: Model);
}
export default BulkRecordError;
