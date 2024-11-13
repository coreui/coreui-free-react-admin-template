import ConnectionError from '../connection-error';
/**
 * Thrown when a connection to a database times out
 */
declare class ConnectionTimedOutError extends ConnectionError {
    constructor(parent: Error);
}
export default ConnectionTimedOutError;
