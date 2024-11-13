/**
 * An individual header within a HttpHeaders collection.
 */
export interface HttpHeader {
    /**
     * The name of the header.
     */
    name: string;
    /**
     * The value of the header.
     */
    value: string;
}
/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export declare type RawHttpHeaders = {
    [headerName: string]: string;
};
/**
 * A collection of HTTP header key/value pairs.
 */
export interface HttpHeadersLike {
    /**
     * Set a header in this collection with the provided name and value. The name is
     * case-insensitive.
     * @param headerName The name of the header to set. This value is case-insensitive.
     * @param headerValue The value of the header to set.
     */
    set(headerName: string, headerValue: string | number): void;
    /**
     * Get the header value for the provided header name, or undefined if no header exists in this
     * collection with the provided name.
     * @param headerName The name of the header.
     */
    get(headerName: string): string | undefined;
    /**
     * Get whether or not this header collection contains a header entry for the provided header name.
     */
    contains(headerName: string): boolean;
    /**
     * Remove the header with the provided headerName. Return whether or not the header existed and
     * was removed.
     * @param headerName The name of the header to remove.
     */
    remove(headerName: string): boolean;
    /**
     * Get the headers that are contained this collection as an object.
     */
    rawHeaders(): RawHttpHeaders;
    /**
     * Get the headers that are contained in this collection as an array.
     */
    headersArray(): HttpHeader[];
    /**
     * Get the header names that are contained in this collection.
     */
    headerNames(): string[];
    /**
     * Get the header values that are contained in this collection.
     */
    headerValues(): string[];
    /**
     * Create a deep clone/copy of this HttpHeaders collection.
     */
    clone(): HttpHeadersLike;
    /**
     * Get the JSON object representation of this HTTP header collection.
     * The result is the same as `rawHeaders()`.
     */
    toJson(): RawHttpHeaders;
}
export declare function isHttpHeadersLike(object?: any): object is HttpHeadersLike;
/**
 * A collection of HTTP header key/value pairs.
 */
export declare class HttpHeaders {
    private readonly _headersMap;
    constructor(rawHeaders?: RawHttpHeaders);
    /**
     * Set a header in this collection with the provided name and value. The name is
     * case-insensitive.
     * @param headerName The name of the header to set. This value is case-insensitive.
     * @param headerValue The value of the header to set.
     */
    set(headerName: string, headerValue: string | number): void;
    /**
     * Get the header value for the provided header name, or undefined if no header exists in this
     * collection with the provided name.
     * @param headerName The name of the header.
     */
    get(headerName: string): string | undefined;
    /**
     * Get whether or not this header collection contains a header entry for the provided header name.
     */
    contains(headerName: string): boolean;
    /**
     * Remove the header with the provided headerName. Return whether or not the header existed and
     * was removed.
     * @param headerName The name of the header to remove.
     */
    remove(headerName: string): boolean;
    /**
     * Get the headers that are contained this collection as an object.
     */
    rawHeaders(): RawHttpHeaders;
    /**
     * Get the headers that are contained in this collection as an array.
     */
    headersArray(): HttpHeader[];
    /**
     * Get the header names that are contained in this collection.
     */
    headerNames(): string[];
    /**
     * Get the header names that are contained in this collection.
     */
    headerValues(): string[];
    /**
     * Get the JSON object representation of this HTTP header collection.
     */
    toJson(): RawHttpHeaders;
    /**
     * Get the string representation of this HTTP header collection.
     */
    toString(): string;
    /**
     * Create a deep clone/copy of this HttpHeaders collection.
     */
    clone(): HttpHeaders;
}
//# sourceMappingURL=httpHeaders.d.ts.map