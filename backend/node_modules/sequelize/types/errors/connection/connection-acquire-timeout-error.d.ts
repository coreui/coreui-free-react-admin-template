import ConnectionError from '../connection-error';
/**
 * Thrown when connection is not acquired due to timeout
 */
declare class ConnectionAcquireTimeoutError extends ConnectionError {
    constructor(parent: Error);
}
export default ConnectionAcquireTimeoutError;
