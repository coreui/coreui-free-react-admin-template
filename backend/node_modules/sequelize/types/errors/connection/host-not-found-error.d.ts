import ConnectionError from '../connection-error';
/**
 * Thrown when a connection to a database has a hostname that was not found
 */
declare class HostNotFoundError extends ConnectionError {
    constructor(parent: Error);
}
export default HostNotFoundError;
