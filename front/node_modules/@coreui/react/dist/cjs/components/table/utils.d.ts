import type { Column, Item } from './types';
export declare const pretifyName: (name: string) => string;
export declare const getColumnLabel: (column: Column | string) => string;
export declare const getColumnNames: (columns: (string | Column)[] | undefined, items?: Item[]) => string[] | undefined;
export declare const getColumnNamesFromItems: (items: Item[]) => string[];
