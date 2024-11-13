import type { AbstractDialect } from '../dialects/abstract/index.js';
type BindOrReplacements = {
    [key: string]: unknown;
} | unknown[];
/**
 * Inlines replacements in places where they would be valid SQL values.
 *
 * @param sqlString The SQL that contains the replacements
 * @param dialect The dialect of the SQL
 * @param replacements if provided, this method will replace ':named' replacements & positional replacements (?)
 *
 * @returns The SQL with replacements rewritten in their dialect-specific syntax.
 */
export declare function injectReplacements(sqlString: string, dialect: AbstractDialect, replacements: BindOrReplacements): string;
export {};
