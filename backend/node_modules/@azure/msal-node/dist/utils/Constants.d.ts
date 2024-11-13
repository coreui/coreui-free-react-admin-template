/**
 * http methods
 */
export declare enum HttpMethod {
    GET = "get",
    POST = "post"
}
/**
 * Constant used for PKCE
 */
export declare const RANDOM_OCTET_SIZE = 32;
/**
 * Constants used in PKCE
 */
export declare const Hash: {
    SHA256: string;
};
/**
 * Constants for encoding schemes
 */
export declare const CharSet: {
    CV_CHARSET: string;
};
/**
 * Cache Constants
 */
export declare const CACHE: {
    FILE_CACHE: string;
    EXTENSION_LIB: string;
};
/**
 * Constants
 */
export declare const Constants: {
    MSAL_SKU: string;
    JWT_BEARER_ASSERTION_TYPE: string;
};
/**
 * API Codes for Telemetry purposes.
 * Before adding a new code you must claim it in the MSAL Telemetry tracker as these number spaces are shared across all MSALs
 * 0-99 Silent Flow
 * 600-699 Device Code Flow
 * 800-899 Auth Code Flow
 */
export declare enum ApiId {
    acquireTokenSilent = 62,
    acquireTokenByUsernamePassword = 371,
    acquireTokenByDeviceCode = 671,
    acquireTokenByClientCredential = 771,
    acquireTokenByCode = 871,
    acquireTokenByRefreshToken = 872
}
/**
 * JWT  constants
 */
export declare const JwtConstants: {
    ALGORITHM: string;
    RSA_256: string;
    X5T: string;
    X5C: string;
    AUDIENCE: string;
    EXPIRATION_TIME: string;
    ISSUER: string;
    SUBJECT: string;
    NOT_BEFORE: string;
    JWT_ID: string;
};
//# sourceMappingURL=Constants.d.ts.map