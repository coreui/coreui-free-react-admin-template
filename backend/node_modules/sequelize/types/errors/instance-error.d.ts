import BaseError from './base-error';
/**
 * Thrown when a some problem occurred with Instance methods (see message for details)
 */
declare class InstanceError extends BaseError {
    constructor(message: string);
}
export default InstanceError;
