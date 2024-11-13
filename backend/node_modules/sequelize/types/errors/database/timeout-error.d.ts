import { ErrorOptions } from '../base-error';
import DatabaseError, { DatabaseErrorParent } from '../database-error';
/**
 * Thrown when a database query times out because of a deadlock
 */
declare class TimeoutError extends DatabaseError {
    constructor(parent: DatabaseErrorParent, options?: ErrorOptions);
}
export default TimeoutError;
