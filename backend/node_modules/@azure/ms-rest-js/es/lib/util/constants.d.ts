export declare const Constants: {
    /**
     * The ms-rest version
     * @const
     * @type {string}
     */
    msRestVersion: string;
    /**
     * Specifies HTTP.
     *
     * @const
     * @type {string}
     */
    HTTP: string;
    /**
     * Specifies HTTPS.
     *
     * @const
     * @type {string}
     */
    HTTPS: string;
    /**
     * Specifies HTTP Proxy.
     *
     * @const
     * @type {string}
     */
    HTTP_PROXY: string;
    /**
     * Specifies HTTPS Proxy.
     *
     * @const
     * @type {string}
     */
    HTTPS_PROXY: string;
    /**
     * Specifies NO Proxy.
     */
    NO_PROXY: string;
    /**
     * Specifies ALL Proxy.
     */
    ALL_PROXY: string;
    HttpConstants: {
        /**
         * Http Verbs
         *
         * @const
         * @enum {string}
         */
        HttpVerbs: {
            PUT: string;
            GET: string;
            DELETE: string;
            POST: string;
            MERGE: string;
            HEAD: string;
            PATCH: string;
        };
        StatusCodes: {
            TooManyRequests: number;
        };
    };
    /**
     * Defines constants for use with HTTP headers.
     */
    HeaderConstants: {
        /**
         * The Authorization header.
         *
         * @const
         * @type {string}
         */
        AUTHORIZATION: string;
        AUTHORIZATION_SCHEME: string;
        /**
         * The Retry-After response-header field can be used with a 503 (Service
         * Unavailable) or 349 (Too Many Requests) responses to indicate how long
         * the service is expected to be unavailable to the requesting client.
         *
         * @const
         * @type {string}
         */
        RETRY_AFTER: string;
        /**
         * The UserAgent header.
         *
         * @const
         * @type {string}
         */
        USER_AGENT: string;
    };
};
//# sourceMappingURL=constants.d.ts.map