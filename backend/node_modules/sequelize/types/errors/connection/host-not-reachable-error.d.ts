import ConnectionError from '../connection-error';
/**
 * Thrown when a connection to a database has a hostname that was not reachable
 */
declare class HostNotReachableError extends ConnectionError {
    constructor(parent: Error);
}
export default HostNotReachableError;
