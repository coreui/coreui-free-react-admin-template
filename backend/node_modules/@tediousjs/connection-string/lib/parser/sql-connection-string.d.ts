export declare enum SchemaTypes {
    BOOL = 0,
    STRING = 1,
    NUMBER = 2
}
export interface SchemaItem {
    type: SchemaTypes;
    allowedValues?: any[];
    default?: any;
    aliases?: string[];
    canonical?: string;
    coerce?(val: string): any;
    validator?(val: any): boolean;
}
export interface SchemaDefinition {
    [name: string]: SchemaItem;
}
export declare const SCHEMA: SchemaDefinition;
export default function parseSqlConnectionString(connectionString: string, canonicalProps?: boolean, allowUnknown?: boolean, strict?: boolean, schema?: SchemaDefinition): {};
