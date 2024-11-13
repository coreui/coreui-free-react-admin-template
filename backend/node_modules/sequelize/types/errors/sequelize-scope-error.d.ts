import BaseError from './base-error';
/**
 * Scope Error. Thrown when the sequelize cannot query the specified scope.
 */
declare class SequelizeScopeError extends BaseError {
    constructor(message: string);
}
export default SequelizeScopeError;
