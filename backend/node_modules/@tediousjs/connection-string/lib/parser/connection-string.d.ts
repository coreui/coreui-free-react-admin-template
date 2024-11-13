export interface CollectionConfig {
    terminator: string;
    quotes: {
        [index: string]: string;
    };
}
export interface ParserConfig {
    key: CollectionConfig;
    value: CollectionConfig;
}
export default function connectionStringParser(connectionString: string, parserConfig?: ParserConfig): object;
