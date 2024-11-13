import ConnectionError from '../connection-error';
/**
 * Thrown when a connection to a database is refused due to insufficient privileges
 */
declare class AccessDeniedError extends ConnectionError {
    constructor(parent: Error);
}
export default AccessDeniedError;
