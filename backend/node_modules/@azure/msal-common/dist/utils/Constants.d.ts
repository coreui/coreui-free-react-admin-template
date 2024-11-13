export declare const Constants: {
    LIBRARY_NAME: string;
    SKU: string;
    CACHE_PREFIX: string;
    DEFAULT_AUTHORITY: string;
    DEFAULT_AUTHORITY_HOST: string;
    ADFS: string;
    AAD_INSTANCE_DISCOVERY_ENDPT: string;
    RESOURCE_DELIM: string;
    NO_ACCOUNT: string;
    CLAIMS: string;
    CONSUMER_UTID: string;
    OPENID_SCOPE: string;
    PROFILE_SCOPE: string;
    OFFLINE_ACCESS_SCOPE: string;
    EMAIL_SCOPE: string;
    CODE_RESPONSE_TYPE: string;
    CODE_GRANT_TYPE: string;
    RT_GRANT_TYPE: string;
    FRAGMENT_RESPONSE_MODE: string;
    S256_CODE_CHALLENGE_METHOD: string;
    URL_FORM_CONTENT_TYPE: string;
    AUTHORIZATION_PENDING: string;
    NOT_DEFINED: string;
    EMPTY_STRING: string;
    FORWARD_SLASH: string;
    IMDS_ENDPOINT: string;
    IMDS_VERSION: string;
    IMDS_TIMEOUT: number;
    AZURE_REGION_AUTO_DISCOVER_FLAG: string;
    REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: string;
    KNOWN_PUBLIC_CLOUDS: string[];
};
export declare const OIDC_DEFAULT_SCOPES: string[];
export declare const OIDC_SCOPES: string[];
/**
 * Request header names
 */
export declare enum HeaderNames {
    CONTENT_TYPE = "Content-Type",
    RETRY_AFTER = "Retry-After",
    CCS_HEADER = "X-AnchorMailbox"
}
/**
 * Persistent cache keys MSAL which stay while user is logged in.
 */
export declare enum PersistentCacheKeys {
    ID_TOKEN = "idtoken",
    CLIENT_INFO = "client.info",
    ADAL_ID_TOKEN = "adal.idtoken",
    ERROR = "error",
    ERROR_DESC = "error.description",
    ACTIVE_ACCOUNT = "active-account"
}
/**
 * String constants related to AAD Authority
 */
export declare enum AADAuthorityConstants {
    COMMON = "common",
    ORGANIZATIONS = "organizations",
    CONSUMERS = "consumers"
}
/**
 * Keys in the hashParams sent by AAD Server
 */
export declare enum AADServerParamKeys {
    CLIENT_ID = "client_id",
    REDIRECT_URI = "redirect_uri",
    RESPONSE_TYPE = "response_type",
    RESPONSE_MODE = "response_mode",
    GRANT_TYPE = "grant_type",
    CLAIMS = "claims",
    SCOPE = "scope",
    ERROR = "error",
    ERROR_DESCRIPTION = "error_description",
    ACCESS_TOKEN = "access_token",
    ID_TOKEN = "id_token",
    REFRESH_TOKEN = "refresh_token",
    EXPIRES_IN = "expires_in",
    STATE = "state",
    NONCE = "nonce",
    PROMPT = "prompt",
    SESSION_STATE = "session_state",
    CLIENT_INFO = "client_info",
    CODE = "code",
    CODE_CHALLENGE = "code_challenge",
    CODE_CHALLENGE_METHOD = "code_challenge_method",
    CODE_VERIFIER = "code_verifier",
    CLIENT_REQUEST_ID = "client-request-id",
    X_CLIENT_SKU = "x-client-SKU",
    X_CLIENT_VER = "x-client-VER",
    X_CLIENT_OS = "x-client-OS",
    X_CLIENT_CPU = "x-client-CPU",
    X_CLIENT_CURR_TELEM = "x-client-current-telemetry",
    X_CLIENT_LAST_TELEM = "x-client-last-telemetry",
    X_MS_LIB_CAPABILITY = "x-ms-lib-capability",
    POST_LOGOUT_URI = "post_logout_redirect_uri",
    ID_TOKEN_HINT = "id_token_hint",
    DEVICE_CODE = "device_code",
    CLIENT_SECRET = "client_secret",
    CLIENT_ASSERTION = "client_assertion",
    CLIENT_ASSERTION_TYPE = "client_assertion_type",
    TOKEN_TYPE = "token_type",
    REQ_CNF = "req_cnf",
    OBO_ASSERTION = "assertion",
    REQUESTED_TOKEN_USE = "requested_token_use",
    ON_BEHALF_OF = "on_behalf_of",
    FOCI = "foci",
    CCS_HEADER = "X-AnchorMailbox"
}
/**
 * Claims request keys
 */
export declare enum ClaimsRequestKeys {
    ACCESS_TOKEN = "access_token",
    XMS_CC = "xms_cc"
}
/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 */
export declare const PromptValue: {
    LOGIN: string;
    SELECT_ACCOUNT: string;
    CONSENT: string;
    NONE: string;
    CREATE: string;
};
/**
 * SSO Types - generated to populate hints
 */
export declare enum SSOTypes {
    ACCOUNT = "account",
    SID = "sid",
    LOGIN_HINT = "login_hint",
    ID_TOKEN = "id_token",
    DOMAIN_HINT = "domain_hint",
    ORGANIZATIONS = "organizations",
    CONSUMERS = "consumers",
    ACCOUNT_ID = "accountIdentifier",
    HOMEACCOUNT_ID = "homeAccountIdentifier"
}
/**
 * Disallowed extra query parameters.
 */
export declare const BlacklistedEQParams: SSOTypes[];
/**
 * allowed values for codeVerifier
 */
export declare const CodeChallengeMethodValues: {
    PLAIN: string;
    S256: string;
};
/**
 * The method used to encode the code verifier for the code challenge parameter. can be one
 * of plain or s256. if excluded, code challenge is assumed to be plaintext. for more
 * information, see the pkce rcf: https://tools.ietf.org/html/rfc7636
 */
export declare const CodeChallengeMethodValuesArray: string[];
/**
 * allowed values for response_mode
 */
export declare enum ResponseMode {
    QUERY = "query",
    FRAGMENT = "fragment",
    FORM_POST = "form_post"
}
/**
 * allowed grant_type
 */
export declare enum GrantType {
    IMPLICIT_GRANT = "implicit",
    AUTHORIZATION_CODE_GRANT = "authorization_code",
    CLIENT_CREDENTIALS_GRANT = "client_credentials",
    RESOURCE_OWNER_PASSWORD_GRANT = "password",
    REFRESH_TOKEN_GRANT = "refresh_token",
    DEVICE_CODE_GRANT = "device_code",
    JWT_BEARER = "urn:ietf:params:oauth:grant-type:jwt-bearer"
}
/**
 * Account types in Cache
 */
export declare enum CacheAccountType {
    MSSTS_ACCOUNT_TYPE = "MSSTS",
    ADFS_ACCOUNT_TYPE = "ADFS",
    MSAV1_ACCOUNT_TYPE = "MSA",
    GENERIC_ACCOUNT_TYPE = "Generic"
}
/**
 * Separators used in cache
 */
export declare enum Separators {
    CACHE_KEY_SEPARATOR = "-",
    CLIENT_INFO_SEPARATOR = "."
}
/**
 * Credential Type stored in the cache
 */
export declare enum CredentialType {
    ID_TOKEN = "IdToken",
    ACCESS_TOKEN = "AccessToken",
    ACCESS_TOKEN_WITH_AUTH_SCHEME = "AccessToken_With_AuthScheme",
    REFRESH_TOKEN = "RefreshToken"
}
/**
 * Credential Type stored in the cache
 */
export declare enum CacheSchemaType {
    ACCOUNT = "Account",
    CREDENTIAL = "Credential",
    ID_TOKEN = "IdToken",
    ACCESS_TOKEN = "AccessToken",
    REFRESH_TOKEN = "RefreshToken",
    APP_METADATA = "AppMetadata",
    TEMPORARY = "TempCache",
    TELEMETRY = "Telemetry",
    UNDEFINED = "Undefined",
    THROTTLING = "Throttling"
}
/**
 * Combine all cache types
 */
export declare enum CacheType {
    ADFS = 1001,
    MSA = 1002,
    MSSTS = 1003,
    GENERIC = 1004,
    ACCESS_TOKEN = 2001,
    REFRESH_TOKEN = 2002,
    ID_TOKEN = 2003,
    APP_METADATA = 3001,
    UNDEFINED = 9999
}
/**
 * More Cache related constants
 */
export declare const APP_METADATA = "appmetadata";
export declare const CLIENT_INFO = "client_info";
export declare const THE_FAMILY_ID = "1";
export declare const AUTHORITY_METADATA_CONSTANTS: {
    CACHE_KEY: string;
    REFRESH_TIME_SECONDS: number;
};
export declare enum AuthorityMetadataSource {
    CONFIG = "config",
    CACHE = "cache",
    NETWORK = "network"
}
export declare const SERVER_TELEM_CONSTANTS: {
    SCHEMA_VERSION: number;
    MAX_CUR_HEADER_BYTES: number;
    MAX_LAST_HEADER_BYTES: number;
    MAX_CACHED_ERRORS: number;
    CACHE_KEY: string;
    CATEGORY_SEPARATOR: string;
    VALUE_SEPARATOR: string;
    OVERFLOW_TRUE: string;
    OVERFLOW_FALSE: string;
    UNKNOWN_ERROR: string;
};
/**
 * Type of the authentication request
 */
export declare enum AuthenticationScheme {
    POP = "pop",
    BEARER = "Bearer"
}
/**
 * Constants related to throttling
 */
export declare const ThrottlingConstants: {
    DEFAULT_THROTTLE_TIME_SECONDS: number;
    DEFAULT_MAX_THROTTLE_TIME_SECONDS: number;
    THROTTLING_PREFIX: string;
    X_MS_LIB_CAPABILITY_VALUE: string;
};
export declare const Errors: {
    INVALID_GRANT_ERROR: string;
    CLIENT_MISMATCH_ERROR: string;
};
/**
 * Password grant parameters
 */
export declare enum PasswordGrantConstants {
    username = "username",
    password = "password"
}
/**
 * Response codes
 */
export declare enum ResponseCodes {
    httpSuccess = 200,
    httpBadRequest = 400
}
/**
 * Region Discovery Sources
 */
export declare enum RegionDiscoverySources {
    FAILED_AUTO_DETECTION = "1",
    INTERNAL_CACHE = "2",
    ENVIRONMENT_VARIABLE = "3",
    IMDS = "4"
}
/**
 * Region Discovery Outcomes
 */
export declare enum RegionDiscoveryOutcomes {
    CONFIGURED_MATCHES_DETECTED = "1",
    CONFIGURED_NO_AUTO_DETECTION = "2",
    CONFIGURED_NOT_DETECTED = "3",
    AUTO_DETECTION_REQUESTED_SUCCESSFUL = "4",
    AUTO_DETECTION_REQUESTED_FAILED = "5"
}
export declare enum CacheOutcome {
    NO_CACHE_HIT = "0",
    FORCE_REFRESH = "1",
    NO_CACHED_ACCESS_TOKEN = "2",
    CACHED_ACCESS_TOKEN_EXPIRED = "3",
    REFRESH_CACHED_ACCESS_TOKEN = "4"
}
//# sourceMappingURL=Constants.d.ts.map