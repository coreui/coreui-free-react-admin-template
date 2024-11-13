import DatabaseError, { DatabaseErrorSubclassOptions } from '../database-error';
interface UnknownConstraintErrorOptions {
    constraint?: string;
    fields?: Record<string, string | number>;
    table?: string;
}
/**
 * Thrown when constraint name is not found in the database
 */
declare class UnknownConstraintError extends DatabaseError implements UnknownConstraintErrorOptions {
    constraint: string | undefined;
    fields: Record<string, string | number> | undefined;
    table: string | undefined;
    constructor(options: UnknownConstraintErrorOptions & DatabaseErrorSubclassOptions);
}
export default UnknownConstraintError;
