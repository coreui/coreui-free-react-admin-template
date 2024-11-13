/**
 * @internal
 */
export interface SanitizerOptions {
    /**
     * Header names whose values will be logged when logging is enabled.
     * Defaults include a list of well-known safe headers. Any headers
     * specified in this field will be added to that list.  Any other values will
     * be written to logs as "REDACTED".
     */
    additionalAllowedHeaderNames?: string[];
    /**
     * Query string names whose values will be logged when logging is enabled. By default no
     * query string values are logged.
     */
    additionalAllowedQueryParameters?: string[];
}
/**
 * @internal
 */
export declare class Sanitizer {
    private allowedHeaderNames;
    private allowedQueryParameters;
    constructor({ additionalAllowedHeaderNames: allowedHeaderNames, additionalAllowedQueryParameters: allowedQueryParameters, }?: SanitizerOptions);
    sanitize(obj: unknown): string;
    sanitizeUrl(value: string): string;
    private sanitizeHeaders;
    private sanitizeQuery;
}
//# sourceMappingURL=sanitizer.d.ts.map