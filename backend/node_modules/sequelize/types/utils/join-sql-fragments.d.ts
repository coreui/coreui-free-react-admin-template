import { SQLFragment } from '../generic/sql-fragment';
/**
 * Joins an array with a single space, auto trimming when needed.
 *
 * Certain elements do not get leading/trailing spaces.
 *
 * @param {SQLFragment[]} array The array to be joined. Falsy values are skipped. If an
 * element is another array, this function will be called recursively on that array.
 * Otherwise, if a non-string, non-falsy value is present, a TypeError will be thrown.
 *
 * @returns {string} The joined string.
 *
 * @private
 */
export declare function joinSQLFragments(array: SQLFragment[]): string;
export declare class JoinSQLFragmentsError extends TypeError {
    args: SQLFragment[];
    fragment: any;
    constructor(args: SQLFragment[], fragment: any, message: string);
}
