/**
 * A class that handles the query portion of a URLBuilder.
 */
export declare class URLQuery {
    private readonly _rawQuery;
    /**
     * Get whether or not there any query parameters in this URLQuery.
     */
    any(): boolean;
    /**
     * Set a query parameter with the provided name and value. If the parameterValue is undefined or
     * empty, then this will attempt to remove an existing query parameter with the provided
     * parameterName.
     */
    set(parameterName: string, parameterValue: any): void;
    /**
     * Get the value of the query parameter with the provided name. If no parameter exists with the
     * provided parameter name, then undefined will be returned.
     */
    get(parameterName: string): string | string[] | undefined;
    /**
     * Get the string representation of this query. The return value will not start with a "?".
     */
    toString(): string;
    /**
     * Parse a URLQuery from the provided text.
     */
    static parse(text: string): URLQuery;
}
/**
 * A class that handles creating, modifying, and parsing URLs.
 */
export declare class URLBuilder {
    private _scheme;
    private _host;
    private _port;
    private _path;
    private _query;
    /**
     * Set the scheme/protocol for this URL. If the provided scheme contains other parts of a URL
     * (such as a host, port, path, or query), those parts will be added to this URL as well.
     */
    setScheme(scheme: string | undefined): void;
    /**
     * Get the scheme that has been set in this URL.
     */
    getScheme(): string | undefined;
    /**
     * Set the host for this URL. If the provided host contains other parts of a URL (such as a
     * port, path, or query), those parts will be added to this URL as well.
     */
    setHost(host: string | undefined): void;
    /**
     * Get the host that has been set in this URL.
     */
    getHost(): string | undefined;
    /**
     * Set the port for this URL. If the provided port contains other parts of a URL (such as a
     * path or query), those parts will be added to this URL as well.
     */
    setPort(port: number | string | undefined): void;
    /**
     * Get the port that has been set in this URL.
     */
    getPort(): string | undefined;
    /**
     * Set the path for this URL. If the provided path contains a query, then it will be added to
     * this URL as well.
     */
    setPath(path: string | undefined): void;
    /**
     * Append the provided path to this URL's existing path. If the provided path contains a query,
     * then it will be added to this URL as well.
     */
    appendPath(path: string | undefined): void;
    /**
     * Get the path that has been set in this URL.
     */
    getPath(): string | undefined;
    /**
     * Set the query in this URL.
     */
    setQuery(query: string | undefined): void;
    /**
     * Set a query parameter with the provided name and value in this URL's query. If the provided
     * query parameter value is undefined or empty, then the query parameter will be removed if it
     * existed.
     */
    setQueryParameter(queryParameterName: string, queryParameterValue: any): void;
    /**
     * Get the value of the query parameter with the provided query parameter name. If no query
     * parameter exists with the provided name, then undefined will be returned.
     */
    getQueryParameterValue(queryParameterName: string): string | string[] | undefined;
    /**
     * Get the query in this URL.
     */
    getQuery(): string | undefined;
    /**
     * Set the parts of this URL by parsing the provided text using the provided startState.
     */
    private set;
    toString(): string;
    /**
     * If the provided searchValue is found in this URLBuilder, then replace it with the provided
     * replaceValue.
     */
    replaceAll(searchValue: string, replaceValue: string): void;
    static parse(text: string): URLBuilder;
}
declare type URLTokenizerState = "SCHEME" | "SCHEME_OR_HOST" | "HOST" | "PORT" | "PATH" | "QUERY" | "DONE";
declare type URLTokenType = "SCHEME" | "HOST" | "PORT" | "PATH" | "QUERY";
export declare class URLToken {
    readonly text: string;
    readonly type: URLTokenType;
    constructor(text: string, type: URLTokenType);
    static scheme(text: string): URLToken;
    static host(text: string): URLToken;
    static port(text: string): URLToken;
    static path(text: string): URLToken;
    static query(text: string): URLToken;
}
/**
 * Get whether or not the provided character (single character string) is an alphanumeric (letter or
 * digit) character.
 */
export declare function isAlphaNumericCharacter(character: string): boolean;
/**
 * A class that tokenizes URL strings.
 */
export declare class URLTokenizer {
    readonly _text: string;
    readonly _textLength: number;
    _currentState: URLTokenizerState;
    _currentIndex: number;
    _currentToken: URLToken | undefined;
    constructor(_text: string, state?: URLTokenizerState);
    /**
     * Get the current URLToken this URLTokenizer is pointing at, or undefined if the URLTokenizer
     * hasn't started or has finished tokenizing.
     */
    current(): URLToken | undefined;
    /**
     * Advance to the next URLToken and return whether or not a URLToken was found.
     */
    next(): boolean;
}
export {};
//# sourceMappingURL=url.d.ts.map