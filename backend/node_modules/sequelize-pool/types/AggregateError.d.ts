export declare class AggregateError extends Error {
    errors: Error[];
    constructor(errors: Error[]);
    toString(): string;
}
