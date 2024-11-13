/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Constants = {
    LIBRARY_NAME: "MSAL.JS",
    SKU: "msal.js.common",
    // Prefix for all library cache entries
    CACHE_PREFIX: "msal",
    // default authority
    DEFAULT_AUTHORITY: "https://login.microsoftonline.com/common/",
    DEFAULT_AUTHORITY_HOST: "login.microsoftonline.com",
    // ADFS String
    ADFS: "adfs",
    // Default AAD Instance Discovery Endpoint
    AAD_INSTANCE_DISCOVERY_ENDPT: "https://login.microsoftonline.com/common/discovery/instance?api-version=1.1&authorization_endpoint=",
    // Resource delimiter - used for certain cache entries
    RESOURCE_DELIM: "|",
    // Placeholder for non-existent account ids/objects
    NO_ACCOUNT: "NO_ACCOUNT",
    // Claims
    CLAIMS: "claims",
    // Consumer UTID
    CONSUMER_UTID: "9188040d-6c67-4c5b-b112-36a304b66dad",
    // Default scopes
    OPENID_SCOPE: "openid",
    PROFILE_SCOPE: "profile",
    OFFLINE_ACCESS_SCOPE: "offline_access",
    EMAIL_SCOPE: "email",
    // Default response type for authorization code flow
    CODE_RESPONSE_TYPE: "code",
    CODE_GRANT_TYPE: "authorization_code",
    RT_GRANT_TYPE: "refresh_token",
    FRAGMENT_RESPONSE_MODE: "fragment",
    S256_CODE_CHALLENGE_METHOD: "S256",
    URL_FORM_CONTENT_TYPE: "application/x-www-form-urlencoded;charset=utf-8",
    AUTHORIZATION_PENDING: "authorization_pending",
    NOT_DEFINED: "not_defined",
    EMPTY_STRING: "",
    FORWARD_SLASH: "/",
    IMDS_ENDPOINT: "http://169.254.169.254/metadata/instance/compute/location",
    IMDS_VERSION: "2020-06-01",
    IMDS_TIMEOUT: 2000,
    AZURE_REGION_AUTO_DISCOVER_FLAG: "TryAutoDetect",
    REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: "login.microsoft.com",
    KNOWN_PUBLIC_CLOUDS: ["login.microsoftonline.com", "login.windows.net", "login.microsoft.com", "sts.windows.net"]
};
var OIDC_DEFAULT_SCOPES = [
    Constants.OPENID_SCOPE,
    Constants.PROFILE_SCOPE,
    Constants.OFFLINE_ACCESS_SCOPE
];
var OIDC_SCOPES = __spreadArrays(OIDC_DEFAULT_SCOPES, [
    Constants.EMAIL_SCOPE
]);
/**
 * Request header names
 */
var HeaderNames;
(function (HeaderNames) {
    HeaderNames["CONTENT_TYPE"] = "Content-Type";
    HeaderNames["RETRY_AFTER"] = "Retry-After";
    HeaderNames["CCS_HEADER"] = "X-AnchorMailbox";
})(HeaderNames || (HeaderNames = {}));
/**
 * Persistent cache keys MSAL which stay while user is logged in.
 */
exports.PersistentCacheKeys = void 0;
(function (PersistentCacheKeys) {
    PersistentCacheKeys["ID_TOKEN"] = "idtoken";
    PersistentCacheKeys["CLIENT_INFO"] = "client.info";
    PersistentCacheKeys["ADAL_ID_TOKEN"] = "adal.idtoken";
    PersistentCacheKeys["ERROR"] = "error";
    PersistentCacheKeys["ERROR_DESC"] = "error.description";
    PersistentCacheKeys["ACTIVE_ACCOUNT"] = "active-account";
})(exports.PersistentCacheKeys || (exports.PersistentCacheKeys = {}));
/**
 * String constants related to AAD Authority
 */
var AADAuthorityConstants;
(function (AADAuthorityConstants) {
    AADAuthorityConstants["COMMON"] = "common";
    AADAuthorityConstants["ORGANIZATIONS"] = "organizations";
    AADAuthorityConstants["CONSUMERS"] = "consumers";
})(AADAuthorityConstants || (AADAuthorityConstants = {}));
/**
 * Keys in the hashParams sent by AAD Server
 */
var AADServerParamKeys;
(function (AADServerParamKeys) {
    AADServerParamKeys["CLIENT_ID"] = "client_id";
    AADServerParamKeys["REDIRECT_URI"] = "redirect_uri";
    AADServerParamKeys["RESPONSE_TYPE"] = "response_type";
    AADServerParamKeys["RESPONSE_MODE"] = "response_mode";
    AADServerParamKeys["GRANT_TYPE"] = "grant_type";
    AADServerParamKeys["CLAIMS"] = "claims";
    AADServerParamKeys["SCOPE"] = "scope";
    AADServerParamKeys["ERROR"] = "error";
    AADServerParamKeys["ERROR_DESCRIPTION"] = "error_description";
    AADServerParamKeys["ACCESS_TOKEN"] = "access_token";
    AADServerParamKeys["ID_TOKEN"] = "id_token";
    AADServerParamKeys["REFRESH_TOKEN"] = "refresh_token";
    AADServerParamKeys["EXPIRES_IN"] = "expires_in";
    AADServerParamKeys["STATE"] = "state";
    AADServerParamKeys["NONCE"] = "nonce";
    AADServerParamKeys["PROMPT"] = "prompt";
    AADServerParamKeys["SESSION_STATE"] = "session_state";
    AADServerParamKeys["CLIENT_INFO"] = "client_info";
    AADServerParamKeys["CODE"] = "code";
    AADServerParamKeys["CODE_CHALLENGE"] = "code_challenge";
    AADServerParamKeys["CODE_CHALLENGE_METHOD"] = "code_challenge_method";
    AADServerParamKeys["CODE_VERIFIER"] = "code_verifier";
    AADServerParamKeys["CLIENT_REQUEST_ID"] = "client-request-id";
    AADServerParamKeys["X_CLIENT_SKU"] = "x-client-SKU";
    AADServerParamKeys["X_CLIENT_VER"] = "x-client-VER";
    AADServerParamKeys["X_CLIENT_OS"] = "x-client-OS";
    AADServerParamKeys["X_CLIENT_CPU"] = "x-client-CPU";
    AADServerParamKeys["X_CLIENT_CURR_TELEM"] = "x-client-current-telemetry";
    AADServerParamKeys["X_CLIENT_LAST_TELEM"] = "x-client-last-telemetry";
    AADServerParamKeys["X_MS_LIB_CAPABILITY"] = "x-ms-lib-capability";
    AADServerParamKeys["POST_LOGOUT_URI"] = "post_logout_redirect_uri";
    AADServerParamKeys["ID_TOKEN_HINT"] = "id_token_hint";
    AADServerParamKeys["DEVICE_CODE"] = "device_code";
    AADServerParamKeys["CLIENT_SECRET"] = "client_secret";
    AADServerParamKeys["CLIENT_ASSERTION"] = "client_assertion";
    AADServerParamKeys["CLIENT_ASSERTION_TYPE"] = "client_assertion_type";
    AADServerParamKeys["TOKEN_TYPE"] = "token_type";
    AADServerParamKeys["REQ_CNF"] = "req_cnf";
    AADServerParamKeys["OBO_ASSERTION"] = "assertion";
    AADServerParamKeys["REQUESTED_TOKEN_USE"] = "requested_token_use";
    AADServerParamKeys["ON_BEHALF_OF"] = "on_behalf_of";
    AADServerParamKeys["FOCI"] = "foci";
    AADServerParamKeys["CCS_HEADER"] = "X-AnchorMailbox";
})(AADServerParamKeys || (AADServerParamKeys = {}));
/**
 * Claims request keys
 */
var ClaimsRequestKeys;
(function (ClaimsRequestKeys) {
    ClaimsRequestKeys["ACCESS_TOKEN"] = "access_token";
    ClaimsRequestKeys["XMS_CC"] = "xms_cc";
})(ClaimsRequestKeys || (ClaimsRequestKeys = {}));
/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 */
var PromptValue = {
    LOGIN: "login",
    SELECT_ACCOUNT: "select_account",
    CONSENT: "consent",
    NONE: "none",
    CREATE: "create"
};
/**
 * SSO Types - generated to populate hints
 */
var SSOTypes;
(function (SSOTypes) {
    SSOTypes["ACCOUNT"] = "account";
    SSOTypes["SID"] = "sid";
    SSOTypes["LOGIN_HINT"] = "login_hint";
    SSOTypes["ID_TOKEN"] = "id_token";
    SSOTypes["DOMAIN_HINT"] = "domain_hint";
    SSOTypes["ORGANIZATIONS"] = "organizations";
    SSOTypes["CONSUMERS"] = "consumers";
    SSOTypes["ACCOUNT_ID"] = "accountIdentifier";
    SSOTypes["HOMEACCOUNT_ID"] = "homeAccountIdentifier";
})(SSOTypes || (SSOTypes = {}));
/**
 * Disallowed extra query parameters.
 */
[
    SSOTypes.SID,
    SSOTypes.LOGIN_HINT
];
/**
 * allowed values for codeVerifier
 */
var CodeChallengeMethodValues = {
    PLAIN: "plain",
    S256: "S256"
};
/**
 * allowed values for response_mode
 */
exports.ResponseMode = void 0;
(function (ResponseMode) {
    ResponseMode["QUERY"] = "query";
    ResponseMode["FRAGMENT"] = "fragment";
    ResponseMode["FORM_POST"] = "form_post";
})(exports.ResponseMode || (exports.ResponseMode = {}));
/**
 * allowed grant_type
 */
var GrantType;
(function (GrantType) {
    GrantType["IMPLICIT_GRANT"] = "implicit";
    GrantType["AUTHORIZATION_CODE_GRANT"] = "authorization_code";
    GrantType["CLIENT_CREDENTIALS_GRANT"] = "client_credentials";
    GrantType["RESOURCE_OWNER_PASSWORD_GRANT"] = "password";
    GrantType["REFRESH_TOKEN_GRANT"] = "refresh_token";
    GrantType["DEVICE_CODE_GRANT"] = "device_code";
    GrantType["JWT_BEARER"] = "urn:ietf:params:oauth:grant-type:jwt-bearer";
})(GrantType || (GrantType = {}));
/**
 * Account types in Cache
 */
exports.CacheAccountType = void 0;
(function (CacheAccountType) {
    CacheAccountType["MSSTS_ACCOUNT_TYPE"] = "MSSTS";
    CacheAccountType["ADFS_ACCOUNT_TYPE"] = "ADFS";
    CacheAccountType["MSAV1_ACCOUNT_TYPE"] = "MSA";
    CacheAccountType["GENERIC_ACCOUNT_TYPE"] = "Generic"; // NTLM, Kerberos, FBA, Basic etc
})(exports.CacheAccountType || (exports.CacheAccountType = {}));
/**
 * Separators used in cache
 */
var Separators;
(function (Separators) {
    Separators["CACHE_KEY_SEPARATOR"] = "-";
    Separators["CLIENT_INFO_SEPARATOR"] = ".";
})(Separators || (Separators = {}));
/**
 * Credential Type stored in the cache
 */
exports.CredentialType = void 0;
(function (CredentialType) {
    CredentialType["ID_TOKEN"] = "IdToken";
    CredentialType["ACCESS_TOKEN"] = "AccessToken";
    CredentialType["ACCESS_TOKEN_WITH_AUTH_SCHEME"] = "AccessToken_With_AuthScheme";
    CredentialType["REFRESH_TOKEN"] = "RefreshToken";
})(exports.CredentialType || (exports.CredentialType = {}));
/**
 * Credential Type stored in the cache
 */
exports.CacheSchemaType = void 0;
(function (CacheSchemaType) {
    CacheSchemaType["ACCOUNT"] = "Account";
    CacheSchemaType["CREDENTIAL"] = "Credential";
    CacheSchemaType["ID_TOKEN"] = "IdToken";
    CacheSchemaType["ACCESS_TOKEN"] = "AccessToken";
    CacheSchemaType["REFRESH_TOKEN"] = "RefreshToken";
    CacheSchemaType["APP_METADATA"] = "AppMetadata";
    CacheSchemaType["TEMPORARY"] = "TempCache";
    CacheSchemaType["TELEMETRY"] = "Telemetry";
    CacheSchemaType["UNDEFINED"] = "Undefined";
    CacheSchemaType["THROTTLING"] = "Throttling";
})(exports.CacheSchemaType || (exports.CacheSchemaType = {}));
/**
 * Combine all cache types
 */
exports.CacheType = void 0;
(function (CacheType) {
    CacheType[CacheType["ADFS"] = 1001] = "ADFS";
    CacheType[CacheType["MSA"] = 1002] = "MSA";
    CacheType[CacheType["MSSTS"] = 1003] = "MSSTS";
    CacheType[CacheType["GENERIC"] = 1004] = "GENERIC";
    CacheType[CacheType["ACCESS_TOKEN"] = 2001] = "ACCESS_TOKEN";
    CacheType[CacheType["REFRESH_TOKEN"] = 2002] = "REFRESH_TOKEN";
    CacheType[CacheType["ID_TOKEN"] = 2003] = "ID_TOKEN";
    CacheType[CacheType["APP_METADATA"] = 3001] = "APP_METADATA";
    CacheType[CacheType["UNDEFINED"] = 9999] = "UNDEFINED";
})(exports.CacheType || (exports.CacheType = {}));
/**
 * More Cache related constants
 */
var APP_METADATA = "appmetadata";
var CLIENT_INFO = "client_info";
var THE_FAMILY_ID = "1";
var AUTHORITY_METADATA_CONSTANTS = {
    CACHE_KEY: "authority-metadata",
    REFRESH_TIME_SECONDS: 3600 * 24 // 24 Hours
};
var AuthorityMetadataSource;
(function (AuthorityMetadataSource) {
    AuthorityMetadataSource["CONFIG"] = "config";
    AuthorityMetadataSource["CACHE"] = "cache";
    AuthorityMetadataSource["NETWORK"] = "network";
})(AuthorityMetadataSource || (AuthorityMetadataSource = {}));
var SERVER_TELEM_CONSTANTS = {
    SCHEMA_VERSION: 5,
    MAX_CUR_HEADER_BYTES: 80,
    MAX_LAST_HEADER_BYTES: 330,
    MAX_CACHED_ERRORS: 50,
    CACHE_KEY: "server-telemetry",
    CATEGORY_SEPARATOR: "|",
    VALUE_SEPARATOR: ",",
    OVERFLOW_TRUE: "1",
    OVERFLOW_FALSE: "0",
    UNKNOWN_ERROR: "unknown_error"
};
/**
 * Type of the authentication request
 */
exports.AuthenticationScheme = void 0;
(function (AuthenticationScheme) {
    AuthenticationScheme["POP"] = "pop";
    AuthenticationScheme["BEARER"] = "Bearer";
})(exports.AuthenticationScheme || (exports.AuthenticationScheme = {}));
/**
 * Constants related to throttling
 */
var ThrottlingConstants = {
    // Default time to throttle RequestThumbprint in seconds
    DEFAULT_THROTTLE_TIME_SECONDS: 60,
    // Default maximum time to throttle in seconds, overrides what the server sends back
    DEFAULT_MAX_THROTTLE_TIME_SECONDS: 3600,
    // Prefix for storing throttling entries
    THROTTLING_PREFIX: "throttling",
    // Value assigned to the x-ms-lib-capability header to indicate to the server the library supports throttling
    X_MS_LIB_CAPABILITY_VALUE: "retry-after, h429"
};
var Errors = {
    INVALID_GRANT_ERROR: "invalid_grant",
    CLIENT_MISMATCH_ERROR: "client_mismatch",
};
/**
 * Password grant parameters
 */
var PasswordGrantConstants;
(function (PasswordGrantConstants) {
    PasswordGrantConstants["username"] = "username";
    PasswordGrantConstants["password"] = "password";
})(PasswordGrantConstants || (PasswordGrantConstants = {}));
/**
 * Response codes
 */
var ResponseCodes;
(function (ResponseCodes) {
    ResponseCodes[ResponseCodes["httpSuccess"] = 200] = "httpSuccess";
    ResponseCodes[ResponseCodes["httpBadRequest"] = 400] = "httpBadRequest";
})(ResponseCodes || (ResponseCodes = {}));
/**
 * Region Discovery Sources
 */
var RegionDiscoverySources;
(function (RegionDiscoverySources) {
    RegionDiscoverySources["FAILED_AUTO_DETECTION"] = "1";
    RegionDiscoverySources["INTERNAL_CACHE"] = "2";
    RegionDiscoverySources["ENVIRONMENT_VARIABLE"] = "3";
    RegionDiscoverySources["IMDS"] = "4";
})(RegionDiscoverySources || (RegionDiscoverySources = {}));
/**
 * Region Discovery Outcomes
 */
var RegionDiscoveryOutcomes;
(function (RegionDiscoveryOutcomes) {
    RegionDiscoveryOutcomes["CONFIGURED_MATCHES_DETECTED"] = "1";
    RegionDiscoveryOutcomes["CONFIGURED_NO_AUTO_DETECTION"] = "2";
    RegionDiscoveryOutcomes["CONFIGURED_NOT_DETECTED"] = "3";
    RegionDiscoveryOutcomes["AUTO_DETECTION_REQUESTED_SUCCESSFUL"] = "4";
    RegionDiscoveryOutcomes["AUTO_DETECTION_REQUESTED_FAILED"] = "5";
})(RegionDiscoveryOutcomes || (RegionDiscoveryOutcomes = {}));
var CacheOutcome;
(function (CacheOutcome) {
    CacheOutcome["NO_CACHE_HIT"] = "0";
    CacheOutcome["FORCE_REFRESH"] = "1";
    CacheOutcome["NO_CACHED_ACCESS_TOKEN"] = "2";
    CacheOutcome["CACHED_ACCESS_TOKEN_EXPIRED"] = "3";
    CacheOutcome["REFRESH_CACHED_ACCESS_TOKEN"] = "4";
})(CacheOutcome || (CacheOutcome = {}));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * AuthErrorMessage class containing string constants used by error codes and messages.
 */
var AuthErrorMessage = {
    unexpectedError: {
        code: "unexpected_error",
        desc: "Unexpected error in authentication."
    }
};
/**
 * General error class thrown by the MSAL.js library.
 */
var AuthError = /** @class */ (function (_super) {
    __extends(AuthError, _super);
    function AuthError(errorCode, errorMessage, suberror) {
        var _this = this;
        var errorString = errorMessage ? errorCode + ": " + errorMessage : errorCode;
        _this = _super.call(this, errorString) || this;
        Object.setPrototypeOf(_this, AuthError.prototype);
        _this.errorCode = errorCode || Constants.EMPTY_STRING;
        _this.errorMessage = errorMessage || "";
        _this.subError = suberror || "";
        _this.name = "AuthError";
        return _this;
    }
    /**
     * Creates an error that is thrown when something unexpected happens in the library.
     * @param errDesc
     */
    AuthError.createUnexpectedError = function (errDesc) {
        return new AuthError(AuthErrorMessage.unexpectedError.code, AuthErrorMessage.unexpectedError.desc + ": " + errDesc);
    };
    return AuthError;
}(Error));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var DEFAULT_CRYPTO_IMPLEMENTATION = {
    createNewGuid: function () {
        var notImplErr = "Crypto interface - createNewGuid() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    base64Decode: function () {
        var notImplErr = "Crypto interface - base64Decode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    base64Encode: function () {
        var notImplErr = "Crypto interface - base64Encode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    generatePkceCodes: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Crypto interface - generatePkceCodes() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    },
    getPublicKeyThumbprint: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Crypto interface - getPublicKeyThumbprint() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    },
    signJwt: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Crypto interface - signJwt() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    }
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientAuthErrorMessage class containing string constants used by error codes and messages.
 */
var ClientAuthErrorMessage = {
    clientInfoDecodingError: {
        code: "client_info_decoding_error",
        desc: "The client info could not be parsed/decoded correctly. Please review the trace to determine the root cause."
    },
    clientInfoEmptyError: {
        code: "client_info_empty_error",
        desc: "The client info was empty. Please review the trace to determine the root cause."
    },
    tokenParsingError: {
        code: "token_parsing_error",
        desc: "Token cannot be parsed. Please review stack trace to determine root cause."
    },
    nullOrEmptyToken: {
        code: "null_or_empty_token",
        desc: "The token is null or empty. Please review the trace to determine the root cause."
    },
    endpointResolutionError: {
        code: "endpoints_resolution_error",
        desc: "Error: could not resolve endpoints. Please check network and try again."
    },
    networkError: {
        code: "network_error",
        desc: "Network request failed. Please check network trace to determine root cause."
    },
    unableToGetOpenidConfigError: {
        code: "openid_config_error",
        desc: "Could not retrieve endpoints. Check your authority and verify the .well-known/openid-configuration endpoint returns the required endpoints."
    },
    hashNotDeserialized: {
        code: "hash_not_deserialized",
        desc: "The hash parameters could not be deserialized. Please review the trace to determine the root cause."
    },
    blankGuidGenerated: {
        code: "blank_guid_generated",
        desc: "The guid generated was blank. Please review the trace to determine the root cause."
    },
    invalidStateError: {
        code: "invalid_state",
        desc: "State was not the expected format. Please check the logs to determine whether the request was sent using ProtocolUtils.setRequestState()."
    },
    stateMismatchError: {
        code: "state_mismatch",
        desc: "State mismatch error. Please check your network. Continued requests may cause cache overflow."
    },
    stateNotFoundError: {
        code: "state_not_found",
        desc: "State not found"
    },
    nonceMismatchError: {
        code: "nonce_mismatch",
        desc: "Nonce mismatch error. This may be caused by a race condition in concurrent requests."
    },
    nonceNotFoundError: {
        code: "nonce_not_found",
        desc: "nonce not found"
    },
    noTokensFoundError: {
        code: "no_tokens_found",
        desc: "No tokens were found for the given scopes, and no authorization code was passed to acquireToken. You must retrieve an authorization code before making a call to acquireToken()."
    },
    multipleMatchingTokens: {
        code: "multiple_matching_tokens",
        desc: "The cache contains multiple tokens satisfying the requirements. " +
            "Call AcquireToken again providing more requirements such as authority or account."
    },
    multipleMatchingAccounts: {
        code: "multiple_matching_accounts",
        desc: "The cache contains multiple accounts satisfying the given parameters. Please pass more info to obtain the correct account"
    },
    multipleMatchingAppMetadata: {
        code: "multiple_matching_appMetadata",
        desc: "The cache contains multiple appMetadata satisfying the given parameters. Please pass more info to obtain the correct appMetadata"
    },
    tokenRequestCannotBeMade: {
        code: "request_cannot_be_made",
        desc: "Token request cannot be made without authorization code or refresh token."
    },
    appendEmptyScopeError: {
        code: "cannot_append_empty_scope",
        desc: "Cannot append null or empty scope to ScopeSet. Please check the stack trace for more info."
    },
    removeEmptyScopeError: {
        code: "cannot_remove_empty_scope",
        desc: "Cannot remove null or empty scope from ScopeSet. Please check the stack trace for more info."
    },
    appendScopeSetError: {
        code: "cannot_append_scopeset",
        desc: "Cannot append ScopeSet due to error."
    },
    emptyInputScopeSetError: {
        code: "empty_input_scopeset",
        desc: "Empty input ScopeSet cannot be processed."
    },
    DeviceCodePollingCancelled: {
        code: "device_code_polling_cancelled",
        desc: "Caller has cancelled token endpoint polling during device code flow by setting DeviceCodeRequest.cancel = true."
    },
    DeviceCodeExpired: {
        code: "device_code_expired",
        desc: "Device code is expired."
    },
    DeviceCodeUnknownError: {
        code: "device_code_unknown_error",
        desc: "Device code stopped polling for unknown reasons."
    },
    NoAccountInSilentRequest: {
        code: "no_account_in_silent_request",
        desc: "Please pass an account object, silent flow is not supported without account information"
    },
    invalidCacheRecord: {
        code: "invalid_cache_record",
        desc: "Cache record object was null or undefined."
    },
    invalidCacheEnvironment: {
        code: "invalid_cache_environment",
        desc: "Invalid environment when attempting to create cache entry"
    },
    noAccountFound: {
        code: "no_account_found",
        desc: "No account found in cache for given key."
    },
    CachePluginError: {
        code: "no cache plugin set on CacheManager",
        desc: "ICachePlugin needs to be set before using readFromStorage or writeFromStorage"
    },
    noCryptoObj: {
        code: "no_crypto_object",
        desc: "No crypto object detected. This is required for the following operation: "
    },
    invalidCacheType: {
        code: "invalid_cache_type",
        desc: "Invalid cache type"
    },
    unexpectedAccountType: {
        code: "unexpected_account_type",
        desc: "Unexpected account type."
    },
    unexpectedCredentialType: {
        code: "unexpected_credential_type",
        desc: "Unexpected credential type."
    },
    invalidAssertion: {
        code: "invalid_assertion",
        desc: "Client assertion must meet requirements described in https://tools.ietf.org/html/rfc7515"
    },
    invalidClientCredential: {
        code: "invalid_client_credential",
        desc: "Client credential (secret, certificate, or assertion) must not be empty when creating a confidential client. An application should at most have one credential"
    },
    tokenRefreshRequired: {
        code: "token_refresh_required",
        desc: "Cannot return token from cache because it must be refreshed. This may be due to one of the following reasons: forceRefresh parameter is set to true, claims have been requested, there is no cached access token or it is expired."
    },
    userTimeoutReached: {
        code: "user_timeout_reached",
        desc: "User defined timeout for device code polling reached",
    },
    tokenClaimsRequired: {
        code: "token_claims_cnf_required_for_signedjwt",
        desc: "Cannot generate a POP jwt if the token_claims are not populated"
    },
    noAuthorizationCodeFromServer: {
        code: "authorization_code_missing_from_server_response",
        desc: "Server response does not contain an authorization code to proceed"
    },
    noAzureRegionDetected: {
        code: "no_azure_region_detected",
        desc: "No azure region was detected and no fallback was made available"
    },
    accessTokenEntityNullError: {
        code: "access_token_entity_null",
        desc: "Access token entity is null, please check logs and cache to ensure a valid access token is present."
    }
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
var ClientAuthError = /** @class */ (function (_super) {
    __extends(ClientAuthError, _super);
    function ClientAuthError(errorCode, errorMessage) {
        var _this = _super.call(this, errorCode, errorMessage) || this;
        _this.name = "ClientAuthError";
        Object.setPrototypeOf(_this, ClientAuthError.prototype);
        return _this;
    }
    /**
     * Creates an error thrown when client info object doesn't decode correctly.
     * @param caughtError
     */
    ClientAuthError.createClientInfoDecodingError = function (caughtError) {
        return new ClientAuthError(ClientAuthErrorMessage.clientInfoDecodingError.code, ClientAuthErrorMessage.clientInfoDecodingError.desc + " Failed with error: " + caughtError);
    };
    /**
     * Creates an error thrown if the client info is empty.
     * @param rawClientInfo
     */
    ClientAuthError.createClientInfoEmptyError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.clientInfoEmptyError.code, "" + ClientAuthErrorMessage.clientInfoEmptyError.desc);
    };
    /**
     * Creates an error thrown when the id token extraction errors out.
     * @param err
     */
    ClientAuthError.createTokenParsingError = function (caughtExtractionError) {
        return new ClientAuthError(ClientAuthErrorMessage.tokenParsingError.code, ClientAuthErrorMessage.tokenParsingError.desc + " Failed with error: " + caughtExtractionError);
    };
    /**
     * Creates an error thrown when the id token string is null or empty.
     * @param invalidRawTokenString
     */
    ClientAuthError.createTokenNullOrEmptyError = function (invalidRawTokenString) {
        return new ClientAuthError(ClientAuthErrorMessage.nullOrEmptyToken.code, ClientAuthErrorMessage.nullOrEmptyToken.desc + " Raw Token Value: " + invalidRawTokenString);
    };
    /**
     * Creates an error thrown when the endpoint discovery doesn't complete correctly.
     */
    ClientAuthError.createEndpointDiscoveryIncompleteError = function (errDetail) {
        return new ClientAuthError(ClientAuthErrorMessage.endpointResolutionError.code, ClientAuthErrorMessage.endpointResolutionError.desc + " Detail: " + errDetail);
    };
    /**
     * Creates an error thrown when the fetch client throws
     */
    ClientAuthError.createNetworkError = function (endpoint, errDetail) {
        return new ClientAuthError(ClientAuthErrorMessage.networkError.code, ClientAuthErrorMessage.networkError.desc + " | Fetch client threw: " + errDetail + " | Attempted to reach: " + endpoint.split("?")[0]);
    };
    /**
     * Creates an error thrown when the openid-configuration endpoint cannot be reached or does not contain the required data
     */
    ClientAuthError.createUnableToGetOpenidConfigError = function (errDetail) {
        return new ClientAuthError(ClientAuthErrorMessage.unableToGetOpenidConfigError.code, ClientAuthErrorMessage.unableToGetOpenidConfigError.desc + " Attempted to retrieve endpoints from: " + errDetail);
    };
    /**
     * Creates an error thrown when the hash cannot be deserialized.
     * @param hashParamObj
     */
    ClientAuthError.createHashNotDeserializedError = function (hashParamObj) {
        return new ClientAuthError(ClientAuthErrorMessage.hashNotDeserialized.code, ClientAuthErrorMessage.hashNotDeserialized.desc + " Given Object: " + hashParamObj);
    };
    /**
     * Creates an error thrown when the state cannot be parsed.
     * @param invalidState
     */
    ClientAuthError.createInvalidStateError = function (invalidState, errorString) {
        return new ClientAuthError(ClientAuthErrorMessage.invalidStateError.code, ClientAuthErrorMessage.invalidStateError.desc + " Invalid State: " + invalidState + ", Root Err: " + errorString);
    };
    /**
     * Creates an error thrown when two states do not match.
     */
    ClientAuthError.createStateMismatchError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.stateMismatchError.code, ClientAuthErrorMessage.stateMismatchError.desc);
    };
    /**
     * Creates an error thrown when the state is not present
     * @param missingState
     */
    ClientAuthError.createStateNotFoundError = function (missingState) {
        return new ClientAuthError(ClientAuthErrorMessage.stateNotFoundError.code, ClientAuthErrorMessage.stateNotFoundError.desc + ":  " + missingState);
    };
    /**
     * Creates an error thrown when the nonce does not match.
     */
    ClientAuthError.createNonceMismatchError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.nonceMismatchError.code, ClientAuthErrorMessage.nonceMismatchError.desc);
    };
    /**
     * Creates an error thrown when the mnonce is not present
     * @param missingNonce
     */
    ClientAuthError.createNonceNotFoundError = function (missingNonce) {
        return new ClientAuthError(ClientAuthErrorMessage.nonceNotFoundError.code, ClientAuthErrorMessage.nonceNotFoundError.desc + ":  " + missingNonce);
    };
    /**
     * Creates an error thrown when the authorization code required for a token request is null or empty.
     */
    ClientAuthError.createNoTokensFoundError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.noTokensFoundError.code, ClientAuthErrorMessage.noTokensFoundError.desc);
    };
    /**
     * Throws error when multiple tokens are in cache.
     */
    ClientAuthError.createMultipleMatchingTokensInCacheError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingTokens.code, ClientAuthErrorMessage.multipleMatchingTokens.desc + ".");
    };
    /**
     * Throws error when multiple accounts are in cache for the given params
     */
    ClientAuthError.createMultipleMatchingAccountsInCacheError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingAccounts.code, ClientAuthErrorMessage.multipleMatchingAccounts.desc);
    };
    /**
     * Throws error when multiple appMetada are in cache for the given clientId.
     */
    ClientAuthError.createMultipleMatchingAppMetadataInCacheError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingAppMetadata.code, ClientAuthErrorMessage.multipleMatchingAppMetadata.desc);
    };
    /**
     * Throws error when no auth code or refresh token is given to ServerTokenRequestParameters.
     */
    ClientAuthError.createTokenRequestCannotBeMadeError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.tokenRequestCannotBeMade.code, ClientAuthErrorMessage.tokenRequestCannotBeMade.desc);
    };
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    ClientAuthError.createAppendEmptyScopeToSetError = function (givenScope) {
        return new ClientAuthError(ClientAuthErrorMessage.appendEmptyScopeError.code, ClientAuthErrorMessage.appendEmptyScopeError.desc + " Given Scope: " + givenScope);
    };
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    ClientAuthError.createRemoveEmptyScopeFromSetError = function (givenScope) {
        return new ClientAuthError(ClientAuthErrorMessage.removeEmptyScopeError.code, ClientAuthErrorMessage.removeEmptyScopeError.desc + " Given Scope: " + givenScope);
    };
    /**
     * Throws error when attempting to append null or empty ScopeSet.
     * @param appendError
     */
    ClientAuthError.createAppendScopeSetError = function (appendError) {
        return new ClientAuthError(ClientAuthErrorMessage.appendScopeSetError.code, ClientAuthErrorMessage.appendScopeSetError.desc + " Detail Error: " + appendError);
    };
    /**
     * Throws error if ScopeSet is null or undefined.
     * @param givenScopeSet
     */
    ClientAuthError.createEmptyInputScopeSetError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.emptyInputScopeSetError.code, "" + ClientAuthErrorMessage.emptyInputScopeSetError.desc);
    };
    /**
     * Throws error if user sets CancellationToken.cancel = true during polling of token endpoint during device code flow
     */
    ClientAuthError.createDeviceCodeCancelledError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.DeviceCodePollingCancelled.code, "" + ClientAuthErrorMessage.DeviceCodePollingCancelled.desc);
    };
    /**
     * Throws error if device code is expired
     */
    ClientAuthError.createDeviceCodeExpiredError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.DeviceCodeExpired.code, "" + ClientAuthErrorMessage.DeviceCodeExpired.desc);
    };
    /**
     * Throws error if device code is expired
     */
    ClientAuthError.createDeviceCodeUnknownError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.DeviceCodeUnknownError.code, "" + ClientAuthErrorMessage.DeviceCodeUnknownError.desc);
    };
    /**
     * Throws error when silent requests are made without an account object
     */
    ClientAuthError.createNoAccountInSilentRequestError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.NoAccountInSilentRequest.code, "" + ClientAuthErrorMessage.NoAccountInSilentRequest.desc);
    };
    /**
     * Throws error when cache record is null or undefined.
     */
    ClientAuthError.createNullOrUndefinedCacheRecord = function () {
        return new ClientAuthError(ClientAuthErrorMessage.invalidCacheRecord.code, ClientAuthErrorMessage.invalidCacheRecord.desc);
    };
    /**
     * Throws error when provided environment is not part of the CloudDiscoveryMetadata object
     */
    ClientAuthError.createInvalidCacheEnvironmentError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.invalidCacheEnvironment.code, ClientAuthErrorMessage.invalidCacheEnvironment.desc);
    };
    /**
     * Throws error when account is not found in cache.
     */
    ClientAuthError.createNoAccountFoundError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.noAccountFound.code, ClientAuthErrorMessage.noAccountFound.desc);
    };
    /**
     * Throws error if ICachePlugin not set on CacheManager.
     */
    ClientAuthError.createCachePluginError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.CachePluginError.code, "" + ClientAuthErrorMessage.CachePluginError.desc);
    };
    /**
     * Throws error if crypto object not found.
     * @param operationName
     */
    ClientAuthError.createNoCryptoObjectError = function (operationName) {
        return new ClientAuthError(ClientAuthErrorMessage.noCryptoObj.code, "" + ClientAuthErrorMessage.noCryptoObj.desc + operationName);
    };
    /**
     * Throws error if cache type is invalid.
     */
    ClientAuthError.createInvalidCacheTypeError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.invalidCacheType.code, "" + ClientAuthErrorMessage.invalidCacheType.desc);
    };
    /**
     * Throws error if unexpected account type.
     */
    ClientAuthError.createUnexpectedAccountTypeError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.unexpectedAccountType.code, "" + ClientAuthErrorMessage.unexpectedAccountType.desc);
    };
    /**
     * Throws error if unexpected credential type.
     */
    ClientAuthError.createUnexpectedCredentialTypeError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.unexpectedCredentialType.code, "" + ClientAuthErrorMessage.unexpectedCredentialType.desc);
    };
    /**
     * Throws error if client assertion is not valid.
     */
    ClientAuthError.createInvalidAssertionError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.invalidAssertion.code, "" + ClientAuthErrorMessage.invalidAssertion.desc);
    };
    /**
     * Throws error if client assertion is not valid.
     */
    ClientAuthError.createInvalidCredentialError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.invalidClientCredential.code, "" + ClientAuthErrorMessage.invalidClientCredential.desc);
    };
    /**
     * Throws error if token cannot be retrieved from cache due to refresh being required.
     */
    ClientAuthError.createRefreshRequiredError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.tokenRefreshRequired.code, ClientAuthErrorMessage.tokenRefreshRequired.desc);
    };
    /**
     * Throws error if the user defined timeout is reached.
     */
    ClientAuthError.createUserTimeoutReachedError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.userTimeoutReached.code, ClientAuthErrorMessage.userTimeoutReached.desc);
    };
    /*
     * Throws error if token claims are not populated for a signed jwt generation
     */
    ClientAuthError.createTokenClaimsRequiredError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.tokenClaimsRequired.code, ClientAuthErrorMessage.tokenClaimsRequired.desc);
    };
    /**
     * Throws error when the authorization code is missing from the server response
     */
    ClientAuthError.createNoAuthCodeInServerResponseError = function () {
        return new ClientAuthError(ClientAuthErrorMessage.noAuthorizationCodeFromServer.code, ClientAuthErrorMessage.noAuthorizationCodeFromServer.desc);
    };
    return ClientAuthError;
}(AuthError));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 */
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    /**
     * decode a JWT
     *
     * @param authToken
     */
    StringUtils.decodeAuthToken = function (authToken) {
        if (StringUtils.isEmpty(authToken)) {
            throw ClientAuthError.createTokenNullOrEmptyError(authToken);
        }
        var tokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
        var matches = tokenPartsRegex.exec(authToken);
        if (!matches || matches.length < 4) {
            throw ClientAuthError.createTokenParsingError("Given token is malformed: " + JSON.stringify(authToken));
        }
        var crackedToken = {
            header: matches[1],
            JWSPayload: matches[2],
            JWSSig: matches[3]
        };
        return crackedToken;
    };
    /**
     * Check if a string is empty.
     *
     * @param str
     */
    StringUtils.isEmpty = function (str) {
        return (typeof str === "undefined" || !str || 0 === str.length);
    };
    /**
     * Check if stringified object is empty
     * @param strObj
     */
    StringUtils.isEmptyObj = function (strObj) {
        if (strObj && !StringUtils.isEmpty(strObj)) {
            try {
                var obj = JSON.parse(strObj);
                return Object.keys(obj).length === 0;
            }
            catch (e) { }
        }
        return true;
    };
    StringUtils.startsWith = function (str, search) {
        return str.indexOf(search) === 0;
    };
    StringUtils.endsWith = function (str, search) {
        return (str.length >= search.length) && (str.lastIndexOf(search) === (str.length - search.length));
    };
    /**
     * Parses string into an object.
     *
     * @param query
     */
    StringUtils.queryStringToObject = function (query) {
        var match; // Regex for replacing addition symbol with a space
        var pl = /\+/g;
        var search = /([^&=]+)=([^&]*)/g;
        var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
        var obj = {};
        match = search.exec(query);
        while (match) {
            obj[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }
        return obj;
    };
    /**
     * Trims entries in an array.
     *
     * @param arr
     */
    StringUtils.trimArrayEntries = function (arr) {
        return arr.map(function (entry) { return entry.trim(); });
    };
    /**
     * Removes empty strings from array
     * @param arr
     */
    StringUtils.removeEmptyStringsFromArray = function (arr) {
        return arr.filter(function (entry) {
            return !StringUtils.isEmpty(entry);
        });
    };
    /**
     * Attempts to parse a string into JSON
     * @param str
     */
    StringUtils.jsonParseHelper = function (str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return null;
        }
    };
    /**
     * Tests if a given string matches a given pattern, with support for wildcards and queries.
     * @param pattern Wildcard pattern to string match. Supports "*" for wildcards and "?" for queries
     * @param input String to match against
     */
    StringUtils.matchPattern = function (pattern, input) {
        /**
         * Wildcard support: https://stackoverflow.com/a/3117248/4888559
         * Queries: replaces "?" in string with escaped "\?" for regex test
         */
        var regex = new RegExp(pattern.replace(/\*/g, "[^ ]*").replace(/\?/g, "\\\?"));
        return regex.test(input);
    };
    return StringUtils;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Log message level.
 */
exports.LogLevel = void 0;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warning"] = 1] = "Warning";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
    LogLevel[LogLevel["Trace"] = 4] = "Trace";
})(exports.LogLevel || (exports.LogLevel = {}));
/**
 * Class which facilitates logging of messages to a specific place.
 */
var Logger = /** @class */ (function () {
    function Logger(loggerOptions, packageName, packageVersion) {
        // Current log level, defaults to info.
        this.level = exports.LogLevel.Info;
        var defaultLoggerCallback = function () { };
        this.localCallback = loggerOptions.loggerCallback || defaultLoggerCallback;
        this.piiLoggingEnabled = loggerOptions.piiLoggingEnabled || false;
        this.level = loggerOptions.logLevel || exports.LogLevel.Info;
        this.correlationId = loggerOptions.correlationId || "";
        this.packageName = packageName || Constants.EMPTY_STRING;
        this.packageVersion = packageVersion || Constants.EMPTY_STRING;
    }
    /**
     * Create new Logger with existing configurations.
     */
    Logger.prototype.clone = function (packageName, packageVersion, correlationId) {
        return new Logger({ loggerCallback: this.localCallback, piiLoggingEnabled: this.piiLoggingEnabled, logLevel: this.level, correlationId: correlationId || this.correlationId }, packageName, packageVersion);
    };
    /**
     * Log message with required options.
     */
    Logger.prototype.logMessage = function (logMessage, options) {
        if ((options.logLevel > this.level) || (!this.piiLoggingEnabled && options.containsPii)) {
            return;
        }
        var timestamp = new Date().toUTCString();
        // Add correlationId to logs if set, correlationId provided on log messages take precedence
        var logHeader;
        if (!StringUtils.isEmpty(options.correlationId)) {
            logHeader = "[" + timestamp + "] : [" + options.correlationId + "]";
        }
        else if (!StringUtils.isEmpty(this.correlationId)) {
            logHeader = "[" + timestamp + "] : [" + this.correlationId + "]";
        }
        else {
            logHeader = "[" + timestamp + "]";
        }
        var log = logHeader + " : " + this.packageName + "@" + this.packageVersion + " : " + exports.LogLevel[options.logLevel] + " - " + logMessage;
        // debug(`msal:${LogLevel[options.logLevel]}${options.containsPii ? "-Pii": ""}${options.context ? `:${options.context}` : ""}`)(logMessage);
        this.executeCallback(options.logLevel, log, options.containsPii || false);
    };
    /**
     * Execute callback with message.
     */
    Logger.prototype.executeCallback = function (level, message, containsPii) {
        if (this.localCallback) {
            this.localCallback(level, message, containsPii);
        }
    };
    /**
     * Logs error messages.
     */
    Logger.prototype.error = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Error,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs error messages with PII.
     */
    Logger.prototype.errorPii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Error,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs warning messages.
     */
    Logger.prototype.warning = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Warning,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs warning messages with PII.
     */
    Logger.prototype.warningPii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Warning,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs info messages.
     */
    Logger.prototype.info = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Info,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs info messages with PII.
     */
    Logger.prototype.infoPii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Info,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs verbose messages.
     */
    Logger.prototype.verbose = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Verbose,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs verbose messages with PII.
     */
    Logger.prototype.verbosePii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Verbose,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs trace messages.
     */
    Logger.prototype.trace = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Trace,
            containsPii: false,
            correlationId: correlationId || ""
        });
    };
    /**
     * Logs trace messages with PII.
     */
    Logger.prototype.tracePii = function (message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Trace,
            containsPii: true,
            correlationId: correlationId || ""
        });
    };
    /**
     * Returns whether PII Logging is enabled or not.
     */
    Logger.prototype.isPiiLoggingEnabled = function () {
        return this.piiLoggingEnabled || false;
    };
    return Logger;
}());

/* eslint-disable header/header */
var name = "@azure/msal-common";
var version = "4.5.1";

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base type for credentials to be stored in the cache: eg: ACCESS_TOKEN, ID_TOKEN etc
 *
 * Key:Value Schema:
 *
 * Key: <home_account_id*>-<environment>-<credential_type>-<client_id>-<realm*>-<target*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, usually only used for refresh tokens
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 *      oboAssertion: access token passed in as part of OBO request
 * }
 */
var CredentialEntity = /** @class */ (function () {
    function CredentialEntity() {
    }
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    CredentialEntity.prototype.generateAccountId = function () {
        return CredentialEntity.generateAccountIdForCacheKey(this.homeAccountId, this.environment);
    };
    /**
     * Generate Credential Id key component as per the schema: <credential_type>-<client_id>-<realm>
     */
    CredentialEntity.prototype.generateCredentialId = function () {
        return CredentialEntity.generateCredentialIdForCacheKey(this.credentialType, this.clientId, this.realm, this.familyId);
    };
    /**
     * Generate target key component as per schema: <target>
     */
    CredentialEntity.prototype.generateTarget = function () {
        return CredentialEntity.generateTargetForCacheKey(this.target);
    };
    /**
     * generates credential key
     */
    CredentialEntity.prototype.generateCredentialKey = function () {
        return CredentialEntity.generateCredentialCacheKey(this.homeAccountId, this.environment, this.credentialType, this.clientId, this.realm, this.target, this.familyId);
    };
    /**
     * returns the type of the cache (in this case credential)
     */
    CredentialEntity.prototype.generateType = function () {
        switch (this.credentialType) {
            case exports.CredentialType.ID_TOKEN:
                return exports.CacheType.ID_TOKEN;
            case exports.CredentialType.ACCESS_TOKEN:
                return exports.CacheType.ACCESS_TOKEN;
            case exports.CredentialType.REFRESH_TOKEN:
                return exports.CacheType.REFRESH_TOKEN;
            default: {
                throw ClientAuthError.createUnexpectedCredentialTypeError();
            }
        }
    };
    /**
     * helper function to return `CredentialType`
     * @param key
     */
    CredentialEntity.getCredentialType = function (key) {
        // First keyword search will match all "AccessToken" and "AccessToken_With_AuthScheme" credentials
        if (key.indexOf(exports.CredentialType.ACCESS_TOKEN.toLowerCase()) !== -1) {
            // Perform second search to differentiate between "AccessToken" and "AccessToken_With_AuthScheme" credential types
            if (key.indexOf(exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase()) !== -1) {
                return exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
            }
            return exports.CredentialType.ACCESS_TOKEN;
        }
        else if (key.indexOf(exports.CredentialType.ID_TOKEN.toLowerCase()) !== -1) {
            return exports.CredentialType.ID_TOKEN;
        }
        else if (key.indexOf(exports.CredentialType.REFRESH_TOKEN.toLowerCase()) !== -1) {
            return exports.CredentialType.REFRESH_TOKEN;
        }
        return Constants.NOT_DEFINED;
    };
    /**
     * generates credential key
     */
    CredentialEntity.generateCredentialCacheKey = function (homeAccountId, environment, credentialType, clientId, realm, target, familyId) {
        var credentialKey = [
            this.generateAccountIdForCacheKey(homeAccountId, environment),
            this.generateCredentialIdForCacheKey(credentialType, clientId, realm, familyId),
            this.generateTargetForCacheKey(target),
        ];
        return credentialKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    };
    /**
     * generates Account Id for keys
     * @param homeAccountId
     * @param environment
     */
    CredentialEntity.generateAccountIdForCacheKey = function (homeAccountId, environment) {
        var accountId = [homeAccountId, environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    };
    /**
     * Generates Credential Id for keys
     * @param credentialType
     * @param realm
     * @param clientId
     * @param familyId
     */
    CredentialEntity.generateCredentialIdForCacheKey = function (credentialType, clientId, realm, familyId) {
        var clientOrFamilyId = credentialType === exports.CredentialType.REFRESH_TOKEN
            ? familyId || clientId
            : clientId;
        var credentialId = [
            credentialType,
            clientOrFamilyId,
            realm || "",
        ];
        return credentialId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    };
    /**
     * Generate target key component as per schema: <target>
     */
    CredentialEntity.generateTargetForCacheKey = function (scopes) {
        return (scopes || "").toLowerCase();
    };
    return CredentialEntity;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientConfigurationErrorMessage class containing string constants used by error codes and messages.
 */
var ClientConfigurationErrorMessage = {
    redirectUriNotSet: {
        code: "redirect_uri_empty",
        desc: "A redirect URI is required for all calls, and none has been set."
    },
    postLogoutUriNotSet: {
        code: "post_logout_uri_empty",
        desc: "A post logout redirect has not been set."
    },
    claimsRequestParsingError: {
        code: "claims_request_parsing_error",
        desc: "Could not parse the given claims request object."
    },
    authorityUriInsecure: {
        code: "authority_uri_insecure",
        desc: "Authority URIs must use https.  Please see here for valid authority configuration options: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications#configuration-options"
    },
    urlParseError: {
        code: "url_parse_error",
        desc: "URL could not be parsed into appropriate segments."
    },
    urlEmptyError: {
        code: "empty_url_error",
        desc: "URL was empty or null."
    },
    emptyScopesError: {
        code: "empty_input_scopes_error",
        desc: "Scopes cannot be passed as null, undefined or empty array because they are required to obtain an access token."
    },
    nonArrayScopesError: {
        code: "nonarray_input_scopes_error",
        desc: "Scopes cannot be passed as non-array."
    },
    clientIdSingleScopeError: {
        code: "clientid_input_scopes_error",
        desc: "Client ID can only be provided as a single scope."
    },
    invalidPrompt: {
        code: "invalid_prompt_value",
        desc: "Supported prompt values are 'login', 'select_account', 'consent', 'create' and 'none'.  Please see here for valid configuration options: https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_common.html#commonauthorizationurlrequest",
    },
    invalidClaimsRequest: {
        code: "invalid_claims",
        desc: "Given claims parameter must be a stringified JSON object."
    },
    tokenRequestEmptyError: {
        code: "token_request_empty",
        desc: "Token request was empty and not found in cache."
    },
    logoutRequestEmptyError: {
        code: "logout_request_empty",
        desc: "The logout request was null or undefined."
    },
    invalidCodeChallengeMethod: {
        code: "invalid_code_challenge_method",
        desc: "code_challenge_method passed is invalid. Valid values are \"plain\" and \"S256\"."
    },
    invalidCodeChallengeParams: {
        code: "pkce_params_missing",
        desc: "Both params: code_challenge and code_challenge_method are to be passed if to be sent in the request"
    },
    invalidCloudDiscoveryMetadata: {
        code: "invalid_cloud_discovery_metadata",
        desc: "Invalid cloudDiscoveryMetadata provided. Must be a JSON object containing tenant_discovery_endpoint and metadata fields"
    },
    invalidAuthorityMetadata: {
        code: "invalid_authority_metadata",
        desc: "Invalid authorityMetadata provided. Must by a JSON object containing authorization_endpoint, token_endpoint, end_session_endpoint, issuer fields."
    },
    untrustedAuthority: {
        code: "untrusted_authority",
        desc: "The provided authority is not a trusted authority. Please include this authority in the knownAuthorities config parameter."
    }
};
/**
 * Error thrown when there is an error in configuration of the MSAL.js library.
 */
var ClientConfigurationError = /** @class */ (function (_super) {
    __extends(ClientConfigurationError, _super);
    function ClientConfigurationError(errorCode, errorMessage) {
        var _this = _super.call(this, errorCode, errorMessage) || this;
        _this.name = "ClientConfigurationError";
        Object.setPrototypeOf(_this, ClientConfigurationError.prototype);
        return _this;
    }
    /**
     * Creates an error thrown when the redirect uri is empty (not set by caller)
     */
    ClientConfigurationError.createRedirectUriEmptyError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.redirectUriNotSet.code, ClientConfigurationErrorMessage.redirectUriNotSet.desc);
    };
    /**
     * Creates an error thrown when the post-logout redirect uri is empty (not set by caller)
     */
    ClientConfigurationError.createPostLogoutRedirectUriEmptyError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.postLogoutUriNotSet.code, ClientConfigurationErrorMessage.postLogoutUriNotSet.desc);
    };
    /**
     * Creates an error thrown when the claims request could not be successfully parsed
     */
    ClientConfigurationError.createClaimsRequestParsingError = function (claimsRequestParseError) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.claimsRequestParsingError.code, ClientConfigurationErrorMessage.claimsRequestParsingError.desc + " Given value: " + claimsRequestParseError);
    };
    /**
     * Creates an error thrown if authority uri is given an insecure protocol.
     * @param urlString
     */
    ClientConfigurationError.createInsecureAuthorityUriError = function (urlString) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.authorityUriInsecure.code, ClientConfigurationErrorMessage.authorityUriInsecure.desc + " Given URI: " + urlString);
    };
    /**
     * Creates an error thrown if URL string does not parse into separate segments.
     * @param urlString
     */
    ClientConfigurationError.createUrlParseError = function (urlParseError) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.urlParseError.code, ClientConfigurationErrorMessage.urlParseError.desc + " Given Error: " + urlParseError);
    };
    /**
     * Creates an error thrown if URL string is empty or null.
     * @param urlString
     */
    ClientConfigurationError.createUrlEmptyError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.urlEmptyError.code, ClientConfigurationErrorMessage.urlEmptyError.desc);
    };
    /**
     * Error thrown when scopes are empty.
     * @param scopesValue
     */
    ClientConfigurationError.createEmptyScopesArrayError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.emptyScopesError.code, "" + ClientConfigurationErrorMessage.emptyScopesError.desc);
    };
    /**
     * Error thrown when client id scope is not provided as single scope.
     * @param inputScopes
     */
    ClientConfigurationError.createClientIdSingleScopeError = function (inputScopes) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.clientIdSingleScopeError.code, ClientConfigurationErrorMessage.clientIdSingleScopeError.desc + " Given Scopes: " + inputScopes);
    };
    /**
     * Error thrown when prompt is not an allowed type.
     * @param promptValue
     */
    ClientConfigurationError.createInvalidPromptError = function (promptValue) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidPrompt.code, ClientConfigurationErrorMessage.invalidPrompt.desc + " Given value: " + promptValue);
    };
    /**
     * Creates error thrown when claims parameter is not a stringified JSON object
     */
    ClientConfigurationError.createInvalidClaimsRequestError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidClaimsRequest.code, ClientConfigurationErrorMessage.invalidClaimsRequest.desc);
    };
    /**
     * Throws error when token request is empty and nothing cached in storage.
     */
    ClientConfigurationError.createEmptyLogoutRequestError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.logoutRequestEmptyError.code, ClientConfigurationErrorMessage.logoutRequestEmptyError.desc);
    };
    /**
     * Throws error when token request is empty and nothing cached in storage.
     */
    ClientConfigurationError.createEmptyTokenRequestError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.tokenRequestEmptyError.code, ClientConfigurationErrorMessage.tokenRequestEmptyError.desc);
    };
    /**
     * Throws error when an invalid code_challenge_method is passed by the user
     */
    ClientConfigurationError.createInvalidCodeChallengeMethodError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCodeChallengeMethod.code, ClientConfigurationErrorMessage.invalidCodeChallengeMethod.desc);
    };
    /**
     * Throws error when both params: code_challenge and code_challenge_method are not passed together
     */
    ClientConfigurationError.createInvalidCodeChallengeParamsError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCodeChallengeParams.code, ClientConfigurationErrorMessage.invalidCodeChallengeParams.desc);
    };
    /**
     * Throws an error when the user passes invalid cloudDiscoveryMetadata
     */
    ClientConfigurationError.createInvalidCloudDiscoveryMetadataError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCloudDiscoveryMetadata.code, ClientConfigurationErrorMessage.invalidCloudDiscoveryMetadata.desc);
    };
    /**
     * Throws an error when the user passes invalid cloudDiscoveryMetadata
     */
    ClientConfigurationError.createInvalidAuthorityMetadataError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAuthorityMetadata.code, ClientConfigurationErrorMessage.invalidAuthorityMetadata.desc);
    };
    /**
     * Throws error when provided authority is not a member of the trusted host list
     */
    ClientConfigurationError.createUntrustedAuthorityError = function () {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.untrustedAuthority.code, ClientConfigurationErrorMessage.untrustedAuthority.desc);
    };
    return ClientConfigurationError;
}(ClientAuthError));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The ScopeSet class creates a set of scopes. Scopes are case-insensitive, unique values, so the Set object in JS makes
 * the most sense to implement for this class. All scopes are trimmed and converted to lower case strings in intersection and union functions
 * to ensure uniqueness of strings.
 */
var ScopeSet = /** @class */ (function () {
    function ScopeSet(inputScopes) {
        var _this = this;
        // Filter empty string and null/undefined array items
        var scopeArr = inputScopes ? StringUtils.trimArrayEntries(__spreadArrays(inputScopes)) : [];
        var filteredInput = scopeArr ? StringUtils.removeEmptyStringsFromArray(scopeArr) : [];
        // Validate and filter scopes (validate function throws if validation fails)
        this.validateInputScopes(filteredInput);
        this.scopes = new Set(); // Iterator in constructor not supported by IE11
        filteredInput.forEach(function (scope) { return _this.scopes.add(scope); });
    }
    /**
     * Factory method to create ScopeSet from space-delimited string
     * @param inputScopeString
     * @param appClientId
     * @param scopesRequired
     */
    ScopeSet.fromString = function (inputScopeString) {
        var scopeString = inputScopeString || "";
        var inputScopes = scopeString.split(" ");
        return new ScopeSet(inputScopes);
    };
    /**
     * Used to validate the scopes input parameter requested  by the developer.
     * @param {Array<string>} inputScopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
     */
    ScopeSet.prototype.validateInputScopes = function (inputScopes) {
        // Check if scopes are required but not given or is an empty array
        if (!inputScopes || inputScopes.length < 1) {
            throw ClientConfigurationError.createEmptyScopesArrayError();
        }
    };
    /**
     * Check if a given scope is present in this set of scopes.
     * @param scope
     */
    ScopeSet.prototype.containsScope = function (scope) {
        var lowerCaseScopes = this.printScopesLowerCase().split(" ");
        var lowerCaseScopesSet = new ScopeSet(lowerCaseScopes);
        // compare lowercase scopes
        return !StringUtils.isEmpty(scope) ? lowerCaseScopesSet.scopes.has(scope.toLowerCase()) : false;
    };
    /**
     * Check if a set of scopes is present in this set of scopes.
     * @param scopeSet
     */
    ScopeSet.prototype.containsScopeSet = function (scopeSet) {
        var _this = this;
        if (!scopeSet || scopeSet.scopes.size <= 0) {
            return false;
        }
        return (this.scopes.size >= scopeSet.scopes.size && scopeSet.asArray().every(function (scope) { return _this.containsScope(scope); }));
    };
    /**
     * Check if set of scopes contains only the defaults
     */
    ScopeSet.prototype.containsOnlyOIDCScopes = function () {
        var _this = this;
        var defaultScopeCount = 0;
        OIDC_SCOPES.forEach(function (defaultScope) {
            if (_this.containsScope(defaultScope)) {
                defaultScopeCount += 1;
            }
        });
        return this.scopes.size === defaultScopeCount;
    };
    /**
     * Appends single scope if passed
     * @param newScope
     */
    ScopeSet.prototype.appendScope = function (newScope) {
        if (!StringUtils.isEmpty(newScope)) {
            this.scopes.add(newScope.trim());
        }
    };
    /**
     * Appends multiple scopes if passed
     * @param newScopes
     */
    ScopeSet.prototype.appendScopes = function (newScopes) {
        var _this = this;
        try {
            newScopes.forEach(function (newScope) { return _this.appendScope(newScope); });
        }
        catch (e) {
            throw ClientAuthError.createAppendScopeSetError(e);
        }
    };
    /**
     * Removes element from set of scopes.
     * @param scope
     */
    ScopeSet.prototype.removeScope = function (scope) {
        if (StringUtils.isEmpty(scope)) {
            throw ClientAuthError.createRemoveEmptyScopeFromSetError(scope);
        }
        this.scopes.delete(scope.trim());
    };
    /**
     * Removes default scopes from set of scopes
     * Primarily used to prevent cache misses if the default scopes are not returned from the server
     */
    ScopeSet.prototype.removeOIDCScopes = function () {
        var _this = this;
        OIDC_SCOPES.forEach(function (defaultScope) {
            _this.scopes.delete(defaultScope);
        });
    };
    /**
     * Combines an array of scopes with the current set of scopes.
     * @param otherScopes
     */
    ScopeSet.prototype.unionScopeSets = function (otherScopes) {
        if (!otherScopes) {
            throw ClientAuthError.createEmptyInputScopeSetError();
        }
        var unionScopes = new Set(); // Iterator in constructor not supported in IE11
        otherScopes.scopes.forEach(function (scope) { return unionScopes.add(scope.toLowerCase()); });
        this.scopes.forEach(function (scope) { return unionScopes.add(scope.toLowerCase()); });
        return unionScopes;
    };
    /**
     * Check if scopes intersect between this set and another.
     * @param otherScopes
     */
    ScopeSet.prototype.intersectingScopeSets = function (otherScopes) {
        if (!otherScopes) {
            throw ClientAuthError.createEmptyInputScopeSetError();
        }
        // Do not allow OIDC scopes to be the only intersecting scopes
        if (!otherScopes.containsOnlyOIDCScopes()) {
            otherScopes.removeOIDCScopes();
        }
        var unionScopes = this.unionScopeSets(otherScopes);
        var sizeOtherScopes = otherScopes.getScopeCount();
        var sizeThisScopes = this.getScopeCount();
        var sizeUnionScopes = unionScopes.size;
        return sizeUnionScopes < (sizeThisScopes + sizeOtherScopes);
    };
    /**
     * Returns size of set of scopes.
     */
    ScopeSet.prototype.getScopeCount = function () {
        return this.scopes.size;
    };
    /**
     * Returns the scopes as an array of string values
     */
    ScopeSet.prototype.asArray = function () {
        var array = [];
        this.scopes.forEach(function (val) { return array.push(val); });
        return array;
    };
    /**
     * Prints scopes into a space-delimited string
     */
    ScopeSet.prototype.printScopes = function () {
        if (this.scopes) {
            var scopeArr = this.asArray();
            return scopeArr.join(" ");
        }
        return "";
    };
    /**
     * Prints scopes into a space-delimited lower-case string (used for caching)
     */
    ScopeSet.prototype.printScopesLowerCase = function () {
        return this.printScopes().toLowerCase();
    };
    return ScopeSet;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Function to build a client info object from server clientInfo string
 * @param rawClientInfo
 * @param crypto
 */
function buildClientInfo(rawClientInfo, crypto) {
    if (StringUtils.isEmpty(rawClientInfo)) {
        throw ClientAuthError.createClientInfoEmptyError();
    }
    try {
        var decodedClientInfo = crypto.base64Decode(rawClientInfo);
        return JSON.parse(decodedClientInfo);
    }
    catch (e) {
        throw ClientAuthError.createClientInfoDecodingError(e);
    }
}
/**
 * Function to build a client info object from cached homeAccountId string
 * @param homeAccountId
 */
function buildClientInfoFromHomeAccountId(homeAccountId) {
    if (StringUtils.isEmpty(homeAccountId)) {
        throw ClientAuthError.createClientInfoDecodingError("Home account ID was empty.");
    }
    var clientInfoParts = homeAccountId.split(Separators.CLIENT_INFO_SEPARATOR, 2);
    return {
        uid: clientInfoParts[0],
        utid: clientInfoParts.length < 2 ? Constants.EMPTY_STRING : clientInfoParts[1]
    };
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Authority types supported by MSAL.
 */
exports.AuthorityType = void 0;
(function (AuthorityType) {
    AuthorityType[AuthorityType["Default"] = 0] = "Default";
    AuthorityType[AuthorityType["Adfs"] = 1] = "Adfs";
})(exports.AuthorityType || (exports.AuthorityType = {}));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Type that defines required and optional parameters for an Account field (based on universal cache schema implemented by all MSALs).
 *
 * Key : Value Schema
 *
 * Key: <home_account_id>-<environment>-<realm*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      localAccountId: Original tenant-specific accountID, usually used for legacy cases
 *      username: primary username that represents the user, usually corresponds to preferred_username in the v2 endpt
 *      authorityType: Accounts authority type as a string
 *      name: Full name for the account, including given name and family name,
 *      clientInfo: Full base64 encoded client info received from ESTS
 *      lastModificationTime: last time this entity was modified in the cache
 *      lastModificationApp:
 *      oboAssertion: access token passed in as part of OBO request
 *      idTokenClaims: Object containing claims parsed from ID token
 * }
 */
var AccountEntity = /** @class */ (function () {
    function AccountEntity() {
    }
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    AccountEntity.prototype.generateAccountId = function () {
        var accountId = [this.homeAccountId, this.environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    };
    /**
     * Generate Account Cache Key as per the schema: <home_account_id>-<environment>-<realm*>
     */
    AccountEntity.prototype.generateAccountKey = function () {
        return AccountEntity.generateAccountCacheKey({
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId
        });
    };
    /**
     * returns the type of the cache (in this case account)
     */
    AccountEntity.prototype.generateType = function () {
        switch (this.authorityType) {
            case exports.CacheAccountType.ADFS_ACCOUNT_TYPE:
                return exports.CacheType.ADFS;
            case exports.CacheAccountType.MSAV1_ACCOUNT_TYPE:
                return exports.CacheType.MSA;
            case exports.CacheAccountType.MSSTS_ACCOUNT_TYPE:
                return exports.CacheType.MSSTS;
            case exports.CacheAccountType.GENERIC_ACCOUNT_TYPE:
                return exports.CacheType.GENERIC;
            default: {
                throw ClientAuthError.createUnexpectedAccountTypeError();
            }
        }
    };
    /**
     * Returns the AccountInfo interface for this account.
     */
    AccountEntity.prototype.getAccountInfo = function () {
        return {
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId,
            name: this.name,
            idTokenClaims: this.idTokenClaims
        };
    };
    /**
     * Generates account key from interface
     * @param accountInterface
     */
    AccountEntity.generateAccountCacheKey = function (accountInterface) {
        var accountKey = [
            accountInterface.homeAccountId,
            accountInterface.environment || "",
            accountInterface.tenantId || "",
        ];
        return accountKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    };
    /**
     * Build Account cache from IdToken, clientInfo and authority/policy. Associated with AAD.
     * @param clientInfo
     * @param authority
     * @param idToken
     * @param policy
     */
    AccountEntity.createAccount = function (clientInfo, homeAccountId, authority, idToken, oboAssertion, cloudGraphHostName, msGraphHost) {
        var _a, _b, _c, _d, _e, _f;
        var account = new AccountEntity();
        account.authorityType = exports.CacheAccountType.MSSTS_ACCOUNT_TYPE;
        account.clientInfo = clientInfo;
        account.homeAccountId = homeAccountId;
        var env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        account.environment = env;
        // non AAD scenarios can have empty realm
        account.realm = ((_a = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _a === void 0 ? void 0 : _a.tid) || "";
        account.oboAssertion = oboAssertion;
        if (idToken) {
            account.idTokenClaims = idToken.claims;
            // How do you account for MSA CID here?
            account.localAccountId = ((_b = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _b === void 0 ? void 0 : _b.oid) || ((_c = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _c === void 0 ? void 0 : _c.sub) || "";
            /*
             * In B2C scenarios the emails claim is used instead of preferred_username and it is an array. In most cases it will contain a single email.
             * This field should not be relied upon if a custom policy is configured to return more than 1 email.
             */
            account.username = ((_d = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _d === void 0 ? void 0 : _d.preferred_username) || (((_e = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _e === void 0 ? void 0 : _e.emails) ? idToken.claims.emails[0] : "");
            account.name = (_f = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _f === void 0 ? void 0 : _f.name;
        }
        account.cloudGraphHostName = cloudGraphHostName;
        account.msGraphHost = msGraphHost;
        return account;
    };
    /**
     * Builds non-AAD/ADFS account.
     * @param authority
     * @param idToken
     */
    AccountEntity.createGenericAccount = function (authority, homeAccountId, idToken, oboAssertion, cloudGraphHostName, msGraphHost) {
        var _a, _b, _c, _d;
        var account = new AccountEntity();
        account.authorityType = (authority.authorityType === exports.AuthorityType.Adfs) ? exports.CacheAccountType.ADFS_ACCOUNT_TYPE : exports.CacheAccountType.GENERIC_ACCOUNT_TYPE;
        account.homeAccountId = homeAccountId;
        // non AAD scenarios can have empty realm
        account.realm = "";
        account.oboAssertion = oboAssertion;
        var env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        if (idToken) {
            // How do you account for MSA CID here?
            account.localAccountId = ((_a = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _a === void 0 ? void 0 : _a.oid) || ((_b = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _b === void 0 ? void 0 : _b.sub) || "";
            // upn claim for most ADFS scenarios
            account.username = ((_c = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _c === void 0 ? void 0 : _c.upn) || "";
            account.name = ((_d = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _d === void 0 ? void 0 : _d.name) || "";
            account.idTokenClaims = idToken === null || idToken === void 0 ? void 0 : idToken.claims;
        }
        account.environment = env;
        account.cloudGraphHostName = cloudGraphHostName;
        account.msGraphHost = msGraphHost;
        /*
         * add uniqueName to claims
         * account.name = idToken.claims.uniqueName;
         */
        return account;
    };
    /**
     * Generate HomeAccountId from server response
     * @param serverClientInfo
     * @param authType
     */
    AccountEntity.generateHomeAccountId = function (serverClientInfo, authType, logger, cryptoObj, idToken) {
        var _a;
        var accountId = ((_a = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _a === void 0 ? void 0 : _a.sub) ? idToken.claims.sub : Constants.EMPTY_STRING;
        // since ADFS does not have tid and does not set client_info
        if (authType === exports.AuthorityType.Adfs) {
            return accountId;
        }
        // for cases where there is clientInfo
        if (serverClientInfo) {
            try {
                var clientInfo = buildClientInfo(serverClientInfo, cryptoObj);
                if (!StringUtils.isEmpty(clientInfo.uid) && !StringUtils.isEmpty(clientInfo.utid)) {
                    return "" + clientInfo.uid + Separators.CLIENT_INFO_SEPARATOR + clientInfo.utid;
                }
            }
            catch (e) { }
        }
        // default to "sub" claim
        logger.verbose("No client info in response");
        return accountId;
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    AccountEntity.isAccountEntity = function (entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("localAccountId") &&
            entity.hasOwnProperty("username") &&
            entity.hasOwnProperty("authorityType"));
    };
    /**
     * Helper function to determine whether 2 accountInfo objects represent the same account
     * @param accountA
     * @param accountB
     * @param compareClaims - If set to true idTokenClaims will also be compared to determine account equality
     */
    AccountEntity.accountInfoIsEqual = function (accountA, accountB, compareClaims) {
        if (!accountA || !accountB) {
            return false;
        }
        var claimsMatch = true; // default to true so as to not fail comparison below if compareClaims: false
        if (compareClaims) {
            var accountAClaims = (accountA.idTokenClaims || {});
            var accountBClaims = (accountB.idTokenClaims || {});
            // issued at timestamp and nonce are expected to change each time a new id token is acquired
            claimsMatch = (accountAClaims.iat === accountBClaims.iat) &&
                (accountAClaims.nonce === accountBClaims.nonce);
        }
        return (accountA.homeAccountId === accountB.homeAccountId) &&
            (accountA.localAccountId === accountB.localAccountId) &&
            (accountA.username === accountB.username) &&
            (accountA.tenantId === accountB.tenantId) &&
            (accountA.environment === accountB.environment) &&
            claimsMatch;
    };
    return AccountEntity;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * JWT Token representation class. Parses token string and generates claims object.
 */
var AuthToken = /** @class */ (function () {
    function AuthToken(rawToken, crypto) {
        if (StringUtils.isEmpty(rawToken)) {
            throw ClientAuthError.createTokenNullOrEmptyError(rawToken);
        }
        this.rawToken = rawToken;
        this.claims = AuthToken.extractTokenClaims(rawToken, crypto);
    }
    /**
     * Extract token by decoding the rawToken
     *
     * @param encodedToken
     */
    AuthToken.extractTokenClaims = function (encodedToken, crypto) {
        var decodedToken = StringUtils.decodeAuthToken(encodedToken);
        // token will be decoded to get the username
        try {
            var base64TokenPayload = decodedToken.JWSPayload;
            // base64Decode() should throw an error if there is an issue
            var base64Decoded = crypto.base64Decode(base64TokenPayload);
            return JSON.parse(base64Decoded);
        }
        catch (err) {
            throw ClientAuthError.createTokenParsingError(err);
        }
    };
    return AuthToken;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Interface class which implement cache storage functions used by MSAL to perform validity checks, and store tokens.
 */
var CacheManager = /** @class */ (function () {
    function CacheManager(clientId, cryptoImpl) {
        this.clientId = clientId;
        this.cryptoImpl = cryptoImpl;
    }
    /**
     * Returns all accounts in cache
     */
    CacheManager.prototype.getAllAccounts = function () {
        var _this = this;
        var currentAccounts = this.getAccountsFilteredBy();
        var accountValues = Object.keys(currentAccounts).map(function (accountKey) { return currentAccounts[accountKey]; });
        var numAccounts = accountValues.length;
        if (numAccounts < 1) {
            return [];
        }
        else {
            var allAccounts = accountValues.map(function (value) {
                var accountEntity = CacheManager.toObject(new AccountEntity(), value);
                var accountInfo = accountEntity.getAccountInfo();
                var idToken = _this.readIdTokenFromCache(_this.clientId, accountInfo);
                if (idToken && !accountInfo.idTokenClaims) {
                    accountInfo.idTokenClaims = new AuthToken(idToken.secret, _this.cryptoImpl).claims;
                }
                return accountInfo;
            });
            return allAccounts;
        }
    };
    /**
     * saves a cache record
     * @param cacheRecord
     */
    CacheManager.prototype.saveCacheRecord = function (cacheRecord) {
        if (!cacheRecord) {
            throw ClientAuthError.createNullOrUndefinedCacheRecord();
        }
        if (!!cacheRecord.account) {
            this.setAccount(cacheRecord.account);
        }
        if (!!cacheRecord.idToken) {
            this.setIdTokenCredential(cacheRecord.idToken);
        }
        if (!!cacheRecord.accessToken) {
            this.saveAccessToken(cacheRecord.accessToken);
        }
        if (!!cacheRecord.refreshToken) {
            this.setRefreshTokenCredential(cacheRecord.refreshToken);
        }
        if (!!cacheRecord.appMetadata) {
            this.setAppMetadata(cacheRecord.appMetadata);
        }
    };
    /**
     * saves access token credential
     * @param credential
     */
    CacheManager.prototype.saveAccessToken = function (credential) {
        var _this = this;
        var currentTokenCache = this.getCredentialsFilteredBy({
            clientId: credential.clientId,
            credentialType: credential.credentialType,
            environment: credential.environment,
            homeAccountId: credential.homeAccountId,
            realm: credential.realm,
        });
        var currentScopes = ScopeSet.fromString(credential.target);
        var currentAccessTokens = Object.keys(currentTokenCache.accessTokens).map(function (key) { return currentTokenCache.accessTokens[key]; });
        if (currentAccessTokens) {
            currentAccessTokens.forEach(function (tokenEntity) {
                var tokenScopeSet = ScopeSet.fromString(tokenEntity.target);
                if (tokenScopeSet.intersectingScopeSets(currentScopes)) {
                    _this.removeCredential(tokenEntity);
                }
            });
        }
        this.setAccessTokenCredential(credential);
    };
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    CacheManager.prototype.getAccountsFilteredBy = function (accountFilter) {
        return this.getAccountsFilteredByInternal(accountFilter ? accountFilter.homeAccountId : "", accountFilter ? accountFilter.environment : "", accountFilter ? accountFilter.realm : "");
    };
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    CacheManager.prototype.getAccountsFilteredByInternal = function (homeAccountId, environment, realm) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var matchingAccounts = {};
        allCacheKeys.forEach(function (cacheKey) {
            var entity = _this.getAccount(cacheKey);
            if (!entity) {
                return;
            }
            if (!!homeAccountId && !_this.matchHomeAccountId(entity, homeAccountId)) {
                return;
            }
            if (!!environment && !_this.matchEnvironment(entity, environment)) {
                return;
            }
            if (!!realm && !_this.matchRealm(entity, realm)) {
                return;
            }
            matchingAccounts[cacheKey] = entity;
        });
        return matchingAccounts;
    };
    /**
     * retrieve credentails matching all provided filters; if no filter is set, get all credentials
     * @param homeAccountId
     * @param environment
     * @param credentialType
     * @param clientId
     * @param realm
     * @param target
     */
    CacheManager.prototype.getCredentialsFilteredBy = function (filter) {
        return this.getCredentialsFilteredByInternal(filter.homeAccountId, filter.environment, filter.credentialType, filter.clientId, filter.familyId, filter.realm, filter.target, filter.oboAssertion);
    };
    /**
     * Support function to help match credentials
     * @param homeAccountId
     * @param environment
     * @param credentialType
     * @param clientId
     * @param realm
     * @param target
     */
    CacheManager.prototype.getCredentialsFilteredByInternal = function (homeAccountId, environment, credentialType, clientId, familyId, realm, target, oboAssertion) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var matchingCredentials = {
            idTokens: {},
            accessTokens: {},
            refreshTokens: {},
        };
        allCacheKeys.forEach(function (cacheKey) {
            // don't parse any non-credential type cache entities
            var credType = CredentialEntity.getCredentialType(cacheKey);
            if (credType === Constants.NOT_DEFINED) {
                return;
            }
            // Attempt retrieval
            var entity = _this.getSpecificCredential(cacheKey, credType);
            if (!entity) {
                return;
            }
            if (!!oboAssertion && !_this.matchOboAssertion(entity, oboAssertion)) {
                return;
            }
            if (!!homeAccountId && !_this.matchHomeAccountId(entity, homeAccountId)) {
                return;
            }
            if (!!environment && !_this.matchEnvironment(entity, environment)) {
                return;
            }
            if (!!realm && !_this.matchRealm(entity, realm)) {
                return;
            }
            if (!!credentialType && !_this.matchCredentialType(entity, credentialType)) {
                return;
            }
            if (!!clientId && !_this.matchClientId(entity, clientId)) {
                return;
            }
            if (!!familyId && !_this.matchFamilyId(entity, familyId)) {
                return;
            }
            /*
             * idTokens do not have "target", target specific refreshTokens do exist for some types of authentication
             * Resource specific refresh tokens case will be added when the support is deemed necessary
             */
            if (!!target && !_this.matchTarget(entity, target)) {
                return;
            }
            switch (credType) {
                case exports.CredentialType.ID_TOKEN:
                    matchingCredentials.idTokens[cacheKey] = entity;
                    break;
                case exports.CredentialType.ACCESS_TOKEN:
                case exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME:
                    matchingCredentials.accessTokens[cacheKey] = entity;
                    break;
                case exports.CredentialType.REFRESH_TOKEN:
                    matchingCredentials.refreshTokens[cacheKey] = entity;
                    break;
            }
        });
        return matchingCredentials;
    };
    /**
     * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
     * @param filter
     */
    CacheManager.prototype.getAppMetadataFilteredBy = function (filter) {
        return this.getAppMetadataFilteredByInternal(filter.environment, filter.clientId);
    };
    /**
     * Support function to help match appMetadata
     * @param environment
     * @param clientId
     */
    CacheManager.prototype.getAppMetadataFilteredByInternal = function (environment, clientId) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var matchingAppMetadata = {};
        allCacheKeys.forEach(function (cacheKey) {
            // don't parse any non-appMetadata type cache entities
            if (!_this.isAppMetadata(cacheKey)) {
                return;
            }
            // Attempt retrieval
            var entity = _this.getAppMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (!!environment && !_this.matchEnvironment(entity, environment)) {
                return;
            }
            if (!!clientId && !_this.matchClientId(entity, clientId)) {
                return;
            }
            matchingAppMetadata[cacheKey] = entity;
        });
        return matchingAppMetadata;
    };
    /**
     * retrieve authorityMetadata that contains a matching alias
     * @param filter
     */
    CacheManager.prototype.getAuthorityMetadataByAlias = function (host) {
        var _this = this;
        var allCacheKeys = this.getAuthorityMetadataKeys();
        var matchedEntity = null;
        allCacheKeys.forEach(function (cacheKey) {
            // don't parse any non-authorityMetadata type cache entities
            if (!_this.isAuthorityMetadata(cacheKey) || cacheKey.indexOf(_this.clientId) === -1) {
                return;
            }
            // Attempt retrieval
            var entity = _this.getAuthorityMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (entity.aliases.indexOf(host) === -1) {
                return;
            }
            matchedEntity = entity;
        });
        return matchedEntity;
    };
    /**
     * Removes all accounts and related tokens from cache.
     */
    CacheManager.prototype.removeAllAccounts = function () {
        var _this = this;
        var allCacheKeys = this.getKeys();
        allCacheKeys.forEach(function (cacheKey) {
            var entity = _this.getAccount(cacheKey);
            if (!entity) {
                return;
            }
            _this.removeAccount(cacheKey);
        });
        return true;
    };
    /**
     * returns a boolean if the given account is removed
     * @param account
     */
    CacheManager.prototype.removeAccount = function (accountKey) {
        var account = this.getAccount(accountKey);
        if (!account) {
            throw ClientAuthError.createNoAccountFoundError();
        }
        return (this.removeAccountContext(account) && this.removeItem(accountKey, exports.CacheSchemaType.ACCOUNT));
    };
    /**
     * returns a boolean if the given account is removed
     * @param account
     */
    CacheManager.prototype.removeAccountContext = function (account) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var accountId = account.generateAccountId();
        allCacheKeys.forEach(function (cacheKey) {
            // don't parse any non-credential type cache entities
            var credType = CredentialEntity.getCredentialType(cacheKey);
            if (credType === Constants.NOT_DEFINED) {
                return;
            }
            var cacheEntity = _this.getSpecificCredential(cacheKey, credType);
            if (!!cacheEntity && accountId === cacheEntity.generateAccountId()) {
                _this.removeCredential(cacheEntity);
            }
        });
        return true;
    };
    /**
     * returns a boolean if the given credential is removed
     * @param credential
     */
    CacheManager.prototype.removeCredential = function (credential) {
        var key = credential.generateCredentialKey();
        return this.removeItem(key, exports.CacheSchemaType.CREDENTIAL);
    };
    /**
     * Removes all app metadata objects from cache.
     */
    CacheManager.prototype.removeAppMetadata = function () {
        var _this = this;
        var allCacheKeys = this.getKeys();
        allCacheKeys.forEach(function (cacheKey) {
            if (_this.isAppMetadata(cacheKey)) {
                _this.removeItem(cacheKey, exports.CacheSchemaType.APP_METADATA);
            }
        });
        return true;
    };
    /**
     * Retrieve the cached credentials into a cacherecord
     * @param account
     * @param clientId
     * @param scopes
     * @param environment
     * @param authScheme
     */
    CacheManager.prototype.readCacheRecord = function (account, clientId, scopes, environment, authScheme) {
        var cachedAccount = this.readAccountFromCache(account);
        var cachedIdToken = this.readIdTokenFromCache(clientId, account);
        var cachedAccessToken = this.readAccessTokenFromCache(clientId, account, scopes, authScheme);
        var cachedRefreshToken = this.readRefreshTokenFromCache(clientId, account, false);
        var cachedAppMetadata = this.readAppMetadataFromCache(environment, clientId);
        if (cachedAccount && cachedIdToken) {
            cachedAccount.idTokenClaims = new AuthToken(cachedIdToken.secret, this.cryptoImpl).claims;
        }
        return {
            account: cachedAccount,
            idToken: cachedIdToken,
            accessToken: cachedAccessToken,
            refreshToken: cachedRefreshToken,
            appMetadata: cachedAppMetadata,
        };
    };
    /**
     * Retrieve AccountEntity from cache
     * @param account
     */
    CacheManager.prototype.readAccountFromCache = function (account) {
        var accountKey = AccountEntity.generateAccountCacheKey(account);
        return this.getAccount(accountKey);
    };
    /**
     * Retrieve IdTokenEntity from cache
     * @param clientId
     * @param account
     * @param inputRealm
     */
    CacheManager.prototype.readIdTokenFromCache = function (clientId, account) {
        var idTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: exports.CredentialType.ID_TOKEN,
            clientId: clientId,
            realm: account.tenantId,
        };
        var credentialCache = this.getCredentialsFilteredBy(idTokenFilter);
        var idTokens = Object.keys(credentialCache.idTokens).map(function (key) { return credentialCache.idTokens[key]; });
        var numIdTokens = idTokens.length;
        if (numIdTokens < 1) {
            return null;
        }
        else if (numIdTokens > 1) {
            throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return idTokens[0];
    };
    /**
     * Retrieve AccessTokenEntity from cache
     * @param clientId
     * @param account
     * @param scopes
     * @param authScheme
     */
    CacheManager.prototype.readAccessTokenFromCache = function (clientId, account, scopes, authScheme) {
        var credentialType = (authScheme === exports.AuthenticationScheme.POP) ? exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME : exports.CredentialType.ACCESS_TOKEN;
        var accessTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: credentialType,
            clientId: clientId,
            realm: account.tenantId,
            target: scopes.printScopesLowerCase(),
        };
        var credentialCache = this.getCredentialsFilteredBy(accessTokenFilter);
        var accessTokens = Object.keys(credentialCache.accessTokens).map(function (key) { return credentialCache.accessTokens[key]; });
        var numAccessTokens = accessTokens.length;
        if (numAccessTokens < 1) {
            return null;
        }
        else if (numAccessTokens > 1) {
            throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return accessTokens[0];
    };
    /**
     * Helper to retrieve the appropriate refresh token from cache
     * @param clientId
     * @param account
     * @param familyRT
     */
    CacheManager.prototype.readRefreshTokenFromCache = function (clientId, account, familyRT) {
        var id = familyRT ? THE_FAMILY_ID : undefined;
        var refreshTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: exports.CredentialType.REFRESH_TOKEN,
            clientId: clientId,
            familyId: id
        };
        var credentialCache = this.getCredentialsFilteredBy(refreshTokenFilter);
        var refreshTokens = Object.keys(credentialCache.refreshTokens).map(function (key) { return credentialCache.refreshTokens[key]; });
        var numRefreshTokens = refreshTokens.length;
        if (numRefreshTokens < 1) {
            return null;
        }
        // address the else case after remove functions address environment aliases
        return refreshTokens[0];
    };
    /**
     * Retrieve AppMetadataEntity from cache
     */
    CacheManager.prototype.readAppMetadataFromCache = function (environment, clientId) {
        var appMetadataFilter = {
            environment: environment,
            clientId: clientId,
        };
        var appMetadata = this.getAppMetadataFilteredBy(appMetadataFilter);
        var appMetadataEntries = Object.keys(appMetadata).map(function (key) { return appMetadata[key]; });
        var numAppMetadata = appMetadataEntries.length;
        if (numAppMetadata < 1) {
            return null;
        }
        else if (numAppMetadata > 1) {
            throw ClientAuthError.createMultipleMatchingAppMetadataInCacheError();
        }
        return appMetadataEntries[0];
    };
    /**
     * Return the family_id value associated  with FOCI
     * @param environment
     * @param clientId
     */
    CacheManager.prototype.isAppMetadataFOCI = function (environment, clientId) {
        var appMetadata = this.readAppMetadataFromCache(environment, clientId);
        return !!(appMetadata && appMetadata.familyId === THE_FAMILY_ID);
    };
    /**
     * helper to match account ids
     * @param value
     * @param homeAccountId
     */
    CacheManager.prototype.matchHomeAccountId = function (entity, homeAccountId) {
        return !!(entity.homeAccountId && homeAccountId === entity.homeAccountId);
    };
    /**
     * helper to match assertion
     * @param value
     * @param oboAssertion
     */
    CacheManager.prototype.matchOboAssertion = function (entity, oboAssertion) {
        return !!(entity.oboAssertion && oboAssertion === entity.oboAssertion);
    };
    /**
     * helper to match environment
     * @param value
     * @param environment
     */
    CacheManager.prototype.matchEnvironment = function (entity, environment) {
        var cloudMetadata = this.getAuthorityMetadataByAlias(environment);
        if (cloudMetadata && cloudMetadata.aliases.indexOf(entity.environment) > -1) {
            return true;
        }
        return false;
    };
    /**
     * helper to match credential type
     * @param entity
     * @param credentialType
     */
    CacheManager.prototype.matchCredentialType = function (entity, credentialType) {
        return (entity.credentialType && credentialType.toLowerCase() === entity.credentialType.toLowerCase());
    };
    /**
     * helper to match client ids
     * @param entity
     * @param clientId
     */
    CacheManager.prototype.matchClientId = function (entity, clientId) {
        return !!(entity.clientId && clientId === entity.clientId);
    };
    /**
     * helper to match family ids
     * @param entity
     * @param familyId
     */
    CacheManager.prototype.matchFamilyId = function (entity, familyId) {
        return !!(entity.familyId && familyId === entity.familyId);
    };
    /**
     * helper to match realm
     * @param entity
     * @param realm
     */
    CacheManager.prototype.matchRealm = function (entity, realm) {
        return !!(entity.realm && realm === entity.realm);
    };
    /**
     * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
     * @param entity
     * @param target
     */
    CacheManager.prototype.matchTarget = function (entity, target) {
        var isNotAccessTokenCredential = (entity.credentialType !== exports.CredentialType.ACCESS_TOKEN && entity.credentialType !== exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME);
        if (isNotAccessTokenCredential || !entity.target) {
            return false;
        }
        var entityScopeSet = ScopeSet.fromString(entity.target);
        var requestTargetScopeSet = ScopeSet.fromString(target);
        if (!requestTargetScopeSet.containsOnlyOIDCScopes()) {
            requestTargetScopeSet.removeOIDCScopes(); // ignore OIDC scopes
        }
        else {
            requestTargetScopeSet.removeScope(Constants.OFFLINE_ACCESS_SCOPE);
        }
        return entityScopeSet.containsScopeSet(requestTargetScopeSet);
    };
    /**
     * returns if a given cache entity is of the type appmetadata
     * @param key
     */
    CacheManager.prototype.isAppMetadata = function (key) {
        return key.indexOf(APP_METADATA) !== -1;
    };
    /**
     * returns if a given cache entity is of the type authoritymetadata
     * @param key
     */
    CacheManager.prototype.isAuthorityMetadata = function (key) {
        return key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) !== -1;
    };
    /**
     * returns cache key used for cloud instance metadata
     */
    CacheManager.prototype.generateAuthorityMetadataCacheKey = function (authority) {
        return AUTHORITY_METADATA_CONSTANTS.CACHE_KEY + "-" + this.clientId + "-" + authority;
    };
    /**
     * Returns the specific credential (IdToken/AccessToken/RefreshToken) from the cache
     * @param key
     * @param credType
     */
    CacheManager.prototype.getSpecificCredential = function (key, credType) {
        switch (credType) {
            case exports.CredentialType.ID_TOKEN: {
                return this.getIdTokenCredential(key);
            }
            case exports.CredentialType.ACCESS_TOKEN:
            case exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME: {
                return this.getAccessTokenCredential(key);
            }
            case exports.CredentialType.REFRESH_TOKEN: {
                return this.getRefreshTokenCredential(key);
            }
            default:
                return null;
        }
    };
    /**
     * Helper to convert serialized data to object
     * @param obj
     * @param json
     */
    CacheManager.toObject = function (obj, json) {
        for (var propertyName in json) {
            obj[propertyName] = json[propertyName];
        }
        return obj;
    };
    return CacheManager;
}());
var DefaultStorageClass = /** @class */ (function (_super) {
    __extends(DefaultStorageClass, _super);
    function DefaultStorageClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultStorageClass.prototype.setAccount = function () {
        var notImplErr = "Storage interface - setAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAccount = function () {
        var notImplErr = "Storage interface - getAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setIdTokenCredential = function () {
        var notImplErr = "Storage interface - setIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getIdTokenCredential = function () {
        var notImplErr = "Storage interface - getIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setAccessTokenCredential = function () {
        var notImplErr = "Storage interface - setAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAccessTokenCredential = function () {
        var notImplErr = "Storage interface - getAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setRefreshTokenCredential = function () {
        var notImplErr = "Storage interface - setRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getRefreshTokenCredential = function () {
        var notImplErr = "Storage interface - getRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setAppMetadata = function () {
        var notImplErr = "Storage interface - setAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAppMetadata = function () {
        var notImplErr = "Storage interface - getAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setServerTelemetry = function () {
        var notImplErr = "Storage interface - setServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getServerTelemetry = function () {
        var notImplErr = "Storage interface - getServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setAuthorityMetadata = function () {
        var notImplErr = "Storage interface - setAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAuthorityMetadata = function () {
        var notImplErr = "Storage interface - getAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getAuthorityMetadataKeys = function () {
        var notImplErr = "Storage interface - getAuthorityMetadataKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.setThrottlingCache = function () {
        var notImplErr = "Storage interface - setThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getThrottlingCache = function () {
        var notImplErr = "Storage interface - getThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.removeItem = function () {
        var notImplErr = "Storage interface - removeItem() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.containsKey = function () {
        var notImplErr = "Storage interface - containsKey() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.getKeys = function () {
        var notImplErr = "Storage interface - getKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    DefaultStorageClass.prototype.clear = function () {
        var notImplErr = "Storage interface - clear() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    };
    return DefaultStorageClass;
}(CacheManager));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// Token renewal offset default in seconds
var DEFAULT_TOKEN_RENEWAL_OFFSET_SEC = 300;
var DEFAULT_SYSTEM_OPTIONS = {
    tokenRenewalOffsetSeconds: DEFAULT_TOKEN_RENEWAL_OFFSET_SEC,
    preventCorsPreflight: false
};
var DEFAULT_LOGGER_IMPLEMENTATION = {
    loggerCallback: function () {
        // allow users to not set loggerCallback
    },
    piiLoggingEnabled: false,
    logLevel: exports.LogLevel.Info,
    correlationId: ""
};
var DEFAULT_NETWORK_IMPLEMENTATION = {
    sendGetRequestAsync: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Network interface - sendGetRequestAsync() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    },
    sendPostRequestAsync: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Network interface - sendPostRequestAsync() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    }
};
var DEFAULT_LIBRARY_INFO = {
    sku: Constants.SKU,
    version: version,
    cpu: "",
    os: ""
};
var DEFAULT_CLIENT_CREDENTIALS = {
    clientSecret: "",
    clientAssertion: undefined
};
/**
 * Function that sets the default options when not explicitly configured from app developer
 *
 * @param Configuration
 *
 * @returns Configuration
 */
function buildClientConfiguration(_a) {
    var userAuthOptions = _a.authOptions, userSystemOptions = _a.systemOptions, userLoggerOption = _a.loggerOptions, storageImplementation = _a.storageInterface, networkImplementation = _a.networkInterface, cryptoImplementation = _a.cryptoInterface, clientCredentials = _a.clientCredentials, libraryInfo = _a.libraryInfo, serverTelemetryManager = _a.serverTelemetryManager, persistencePlugin = _a.persistencePlugin, serializableCache = _a.serializableCache;
    return {
        authOptions: buildAuthOptions(userAuthOptions),
        systemOptions: __assign(__assign({}, DEFAULT_SYSTEM_OPTIONS), userSystemOptions),
        loggerOptions: __assign(__assign({}, DEFAULT_LOGGER_IMPLEMENTATION), userLoggerOption),
        storageInterface: storageImplementation || new DefaultStorageClass(userAuthOptions.clientId, DEFAULT_CRYPTO_IMPLEMENTATION),
        networkInterface: networkImplementation || DEFAULT_NETWORK_IMPLEMENTATION,
        cryptoInterface: cryptoImplementation || DEFAULT_CRYPTO_IMPLEMENTATION,
        clientCredentials: clientCredentials || DEFAULT_CLIENT_CREDENTIALS,
        libraryInfo: __assign(__assign({}, DEFAULT_LIBRARY_INFO), libraryInfo),
        serverTelemetryManager: serverTelemetryManager || null,
        persistencePlugin: persistencePlugin || null,
        serializableCache: serializableCache || null
    };
}
/**
 * Construct authoptions from the client and platform passed values
 * @param authOptions
 */
function buildAuthOptions(authOptions) {
    return __assign({ clientCapabilities: [] }, authOptions);
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(errorCode, errorMessage, subError) {
        var _this = _super.call(this, errorCode, errorMessage, subError) || this;
        _this.name = "ServerError";
        Object.setPrototypeOf(_this, ServerError.prototype);
        return _this;
    }
    return ServerError;
}(AuthError));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ThrottlingUtils = /** @class */ (function () {
    function ThrottlingUtils() {
    }
    /**
     * Prepares a RequestThumbprint to be stored as a key.
     * @param thumbprint
     */
    ThrottlingUtils.generateThrottlingStorageKey = function (thumbprint) {
        return ThrottlingConstants.THROTTLING_PREFIX + "." + JSON.stringify(thumbprint);
    };
    /**
     * Performs necessary throttling checks before a network request.
     * @param cacheManager
     * @param thumbprint
     */
    ThrottlingUtils.preProcess = function (cacheManager, thumbprint) {
        var _a;
        var key = ThrottlingUtils.generateThrottlingStorageKey(thumbprint);
        var value = cacheManager.getThrottlingCache(key);
        if (value) {
            if (value.throttleTime < Date.now()) {
                cacheManager.removeItem(key, exports.CacheSchemaType.THROTTLING);
                return;
            }
            throw new ServerError(((_a = value.errorCodes) === null || _a === void 0 ? void 0 : _a.join(" ")) || Constants.EMPTY_STRING, value.errorMessage, value.subError);
        }
    };
    /**
     * Performs necessary throttling checks after a network request.
     * @param cacheManager
     * @param thumbprint
     * @param response
     */
    ThrottlingUtils.postProcess = function (cacheManager, thumbprint, response) {
        if (ThrottlingUtils.checkResponseStatus(response) || ThrottlingUtils.checkResponseForRetryAfter(response)) {
            var thumbprintValue = {
                throttleTime: ThrottlingUtils.calculateThrottleTime(parseInt(response.headers[HeaderNames.RETRY_AFTER])),
                error: response.body.error,
                errorCodes: response.body.error_codes,
                errorMessage: response.body.error_description,
                subError: response.body.suberror
            };
            cacheManager.setThrottlingCache(ThrottlingUtils.generateThrottlingStorageKey(thumbprint), thumbprintValue);
        }
    };
    /**
     * Checks a NetworkResponse object's status codes against 429 or 5xx
     * @param response
     */
    ThrottlingUtils.checkResponseStatus = function (response) {
        return response.status === 429 || response.status >= 500 && response.status < 600;
    };
    /**
     * Checks a NetworkResponse object's RetryAfter header
     * @param response
     */
    ThrottlingUtils.checkResponseForRetryAfter = function (response) {
        if (response.headers) {
            return response.headers.hasOwnProperty(HeaderNames.RETRY_AFTER) && (response.status < 200 || response.status >= 300);
        }
        return false;
    };
    /**
     * Calculates the Unix-time value for a throttle to expire given throttleTime in seconds.
     * @param throttleTime
     */
    ThrottlingUtils.calculateThrottleTime = function (throttleTime) {
        var time = throttleTime <= 0 ? 0 : throttleTime;
        var currentSeconds = Date.now() / 1000;
        return Math.floor(Math.min(currentSeconds + (time || ThrottlingConstants.DEFAULT_THROTTLE_TIME_SECONDS), currentSeconds + ThrottlingConstants.DEFAULT_MAX_THROTTLE_TIME_SECONDS) * 1000);
    };
    ThrottlingUtils.removeThrottle = function (cacheManager, clientId, authority, scopes, homeAccountIdentifier) {
        var thumbprint = {
            clientId: clientId,
            authority: authority,
            scopes: scopes,
            homeAccountIdentifier: homeAccountIdentifier
        };
        var key = this.generateThrottlingStorageKey(thumbprint);
        return cacheManager.removeItem(key, exports.CacheSchemaType.THROTTLING);
    };
    return ThrottlingUtils;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var NetworkManager = /** @class */ (function () {
    function NetworkManager(networkClient, cacheManager) {
        this.networkClient = networkClient;
        this.cacheManager = cacheManager;
    }
    /**
     * Wraps sendPostRequestAsync with necessary preflight and postflight logic
     * @param thumbprint
     * @param tokenEndpoint
     * @param options
     */
    NetworkManager.prototype.sendPostRequest = function (thumbprint, tokenEndpoint, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ThrottlingUtils.preProcess(this.cacheManager, thumbprint);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.networkClient.sendPostRequestAsync(tokenEndpoint, options)];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1 instanceof AuthError) {
                            throw e_1;
                        }
                        else {
                            throw ClientAuthError.createNetworkError(tokenEndpoint, e_1);
                        }
                    case 4:
                        ThrottlingUtils.postProcess(this.cacheManager, thumbprint, response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return NetworkManager;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
exports.CcsCredentialType = void 0;
(function (CcsCredentialType) {
    CcsCredentialType["HOME_ACCOUNT_ID"] = "home_account_id";
    CcsCredentialType["UPN"] = "UPN";
})(exports.CcsCredentialType || (exports.CcsCredentialType = {}));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base application class which will construct requests to send to and handle responses from the Microsoft STS using the authorization code flow.
 */
var BaseClient = /** @class */ (function () {
    function BaseClient(configuration) {
        // Set the configuration
        this.config = buildClientConfiguration(configuration);
        // Initialize the logger
        this.logger = new Logger(this.config.loggerOptions, name, version);
        // Initialize crypto
        this.cryptoUtils = this.config.cryptoInterface;
        // Initialize storage interface
        this.cacheManager = this.config.storageInterface;
        // Set the network interface
        this.networkClient = this.config.networkInterface;
        // Set the NetworkManager
        this.networkManager = new NetworkManager(this.networkClient, this.cacheManager);
        // Set TelemetryManager
        this.serverTelemetryManager = this.config.serverTelemetryManager;
        // set Authority
        this.authority = this.config.authOptions.authority;
    }
    /**
     * Creates default headers for requests to token endpoint
     */
    BaseClient.prototype.createTokenRequestHeaders = function (ccsCred) {
        var headers = {};
        headers[HeaderNames.CONTENT_TYPE] = Constants.URL_FORM_CONTENT_TYPE;
        if (!this.config.systemOptions.preventCorsPreflight && ccsCred) {
            switch (ccsCred.type) {
                case exports.CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        var clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                        headers[HeaderNames.CCS_HEADER] = "Oid:" + clientInfo.uid + "@" + clientInfo.utid;
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                    }
                    break;
                case exports.CcsCredentialType.UPN:
                    headers[HeaderNames.CCS_HEADER] = "UPN: " + ccsCred.credential;
                    break;
            }
        }
        return headers;
    };
    /**
     * Http post to token endpoint
     * @param tokenEndpoint
     * @param queryString
     * @param headers
     * @param thumbprint
     */
    BaseClient.prototype.executePostToTokenEndpoint = function (tokenEndpoint, queryString, headers, thumbprint) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.networkManager.sendPostRequest(thumbprint, tokenEndpoint, { body: queryString, headers: headers })];
                    case 1:
                        response = _a.sent();
                        if (this.config.serverTelemetryManager && response.status < 500 && response.status !== 429) {
                            // Telemetry data successfully logged by server, clear Telemetry cache
                            this.config.serverTelemetryManager.clearTelemetryCache();
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Updates the authority object of the client. Endpoint discovery must be completed.
     * @param updatedAuthority
     */
    BaseClient.prototype.updateAuthority = function (updatedAuthority) {
        if (!updatedAuthority.discoveryComplete()) {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Updated authority has not completed endpoint discovery.");
        }
        this.authority = updatedAuthority;
    };
    return BaseClient;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Validates server consumable params from the "request" objects
 */
var RequestValidator = /** @class */ (function () {
    function RequestValidator() {
    }
    /**
     * Utility to check if the `redirectUri` in the request is a non-null value
     * @param redirectUri
     */
    RequestValidator.validateRedirectUri = function (redirectUri) {
        if (StringUtils.isEmpty(redirectUri)) {
            throw ClientConfigurationError.createRedirectUriEmptyError();
        }
    };
    /**
     * Utility to validate prompt sent by the user in the request
     * @param prompt
     */
    RequestValidator.validatePrompt = function (prompt) {
        var promptValues = [];
        for (var value in PromptValue) {
            promptValues.push(PromptValue[value]);
        }
        if (promptValues.indexOf(prompt) < 0) {
            throw ClientConfigurationError.createInvalidPromptError(prompt);
        }
    };
    RequestValidator.validateClaims = function (claims) {
        try {
            JSON.parse(claims);
        }
        catch (e) {
            throw ClientConfigurationError.createInvalidClaimsRequestError();
        }
    };
    /**
     * Utility to validate code_challenge and code_challenge_method
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    RequestValidator.validateCodeChallengeParams = function (codeChallenge, codeChallengeMethod) {
        if (StringUtils.isEmpty(codeChallenge) || StringUtils.isEmpty(codeChallengeMethod)) {
            throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        }
        else {
            this.validateCodeChallengeMethod(codeChallengeMethod);
        }
    };
    /**
     * Utility to validate code_challenge_method
     * @param codeChallengeMethod
     */
    RequestValidator.validateCodeChallengeMethod = function (codeChallengeMethod) {
        if ([
            CodeChallengeMethodValues.PLAIN,
            CodeChallengeMethodValues.S256
        ].indexOf(codeChallengeMethod) < 0) {
            throw ClientConfigurationError.createInvalidCodeChallengeMethodError();
        }
    };
    /**
     * Removes unnecessary or duplicate query parameters from extraQueryParameters
     * @param request
     */
    RequestValidator.sanitizeEQParams = function (eQParams, queryParams) {
        if (!eQParams) {
            return {};
        }
        // Remove any query parameters already included in SSO params
        queryParams.forEach(function (value, key) {
            if (eQParams[key]) {
                delete eQParams[key];
            }
        });
        return eQParams;
    };
    return RequestValidator;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var RequestParameterBuilder = /** @class */ (function () {
    function RequestParameterBuilder() {
        this.parameters = new Map();
    }
    /**
     * add response_type = code
     */
    RequestParameterBuilder.prototype.addResponseTypeCode = function () {
        this.parameters.set(AADServerParamKeys.RESPONSE_TYPE, encodeURIComponent(Constants.CODE_RESPONSE_TYPE));
    };
    /**
     * add response_mode. defaults to query.
     * @param responseMode
     */
    RequestParameterBuilder.prototype.addResponseMode = function (responseMode) {
        this.parameters.set(AADServerParamKeys.RESPONSE_MODE, encodeURIComponent((responseMode) ? responseMode : exports.ResponseMode.QUERY));
    };
    /**
     * add scopes. set addOidcScopes to false to prevent default scopes in non-user scenarios
     * @param scopeSet
     * @param addOidcScopes
     */
    RequestParameterBuilder.prototype.addScopes = function (scopes, addOidcScopes) {
        if (addOidcScopes === void 0) { addOidcScopes = true; }
        var requestScopes = addOidcScopes ? __spreadArrays(scopes || [], OIDC_DEFAULT_SCOPES) : scopes || [];
        var scopeSet = new ScopeSet(requestScopes);
        this.parameters.set(AADServerParamKeys.SCOPE, encodeURIComponent(scopeSet.printScopes()));
    };
    /**
     * add clientId
     * @param clientId
     */
    RequestParameterBuilder.prototype.addClientId = function (clientId) {
        this.parameters.set(AADServerParamKeys.CLIENT_ID, encodeURIComponent(clientId));
    };
    /**
     * add redirect_uri
     * @param redirectUri
     */
    RequestParameterBuilder.prototype.addRedirectUri = function (redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.REDIRECT_URI, encodeURIComponent(redirectUri));
    };
    /**
     * add post logout redirectUri
     * @param redirectUri
     */
    RequestParameterBuilder.prototype.addPostLogoutRedirectUri = function (redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.POST_LOGOUT_URI, encodeURIComponent(redirectUri));
    };
    /**
     * add id_token_hint to logout request
     * @param idTokenHint
     */
    RequestParameterBuilder.prototype.addIdTokenHint = function (idTokenHint) {
        this.parameters.set(AADServerParamKeys.ID_TOKEN_HINT, encodeURIComponent(idTokenHint));
    };
    /**
     * add domain_hint
     * @param domainHint
     */
    RequestParameterBuilder.prototype.addDomainHint = function (domainHint) {
        this.parameters.set(SSOTypes.DOMAIN_HINT, encodeURIComponent(domainHint));
    };
    /**
     * add login_hint
     * @param loginHint
     */
    RequestParameterBuilder.prototype.addLoginHint = function (loginHint) {
        this.parameters.set(SSOTypes.LOGIN_HINT, encodeURIComponent(loginHint));
    };
    /**
     * Adds the CCS (Cache Credential Service) query parameter for login_hint
     * @param loginHint
     */
    RequestParameterBuilder.prototype.addCcsUpn = function (loginHint) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent("UPN:" + loginHint));
    };
    /**
     * Adds the CCS (Cache Credential Service) query parameter for account object
     * @param loginHint
     */
    RequestParameterBuilder.prototype.addCcsOid = function (clientInfo) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent("Oid:" + clientInfo.uid + "@" + clientInfo.utid));
    };
    /**
     * add sid
     * @param sid
     */
    RequestParameterBuilder.prototype.addSid = function (sid) {
        this.parameters.set(SSOTypes.SID, encodeURIComponent(sid));
    };
    /**
     * add claims
     * @param claims
     */
    RequestParameterBuilder.prototype.addClaims = function (claims, clientCapabilities) {
        var mergedClaims = this.addClientCapabilitiesToClaims(claims, clientCapabilities);
        RequestValidator.validateClaims(mergedClaims);
        this.parameters.set(AADServerParamKeys.CLAIMS, encodeURIComponent(mergedClaims));
    };
    /**
     * add correlationId
     * @param correlationId
     */
    RequestParameterBuilder.prototype.addCorrelationId = function (correlationId) {
        this.parameters.set(AADServerParamKeys.CLIENT_REQUEST_ID, encodeURIComponent(correlationId));
    };
    /**
     * add library info query params
     * @param libraryInfo
     */
    RequestParameterBuilder.prototype.addLibraryInfo = function (libraryInfo) {
        // Telemetry Info
        this.parameters.set(AADServerParamKeys.X_CLIENT_SKU, libraryInfo.sku);
        this.parameters.set(AADServerParamKeys.X_CLIENT_VER, libraryInfo.version);
        this.parameters.set(AADServerParamKeys.X_CLIENT_OS, libraryInfo.os);
        this.parameters.set(AADServerParamKeys.X_CLIENT_CPU, libraryInfo.cpu);
    };
    /**
     * add prompt
     * @param prompt
     */
    RequestParameterBuilder.prototype.addPrompt = function (prompt) {
        RequestValidator.validatePrompt(prompt);
        this.parameters.set("" + AADServerParamKeys.PROMPT, encodeURIComponent(prompt));
    };
    /**
     * add state
     * @param state
     */
    RequestParameterBuilder.prototype.addState = function (state) {
        if (!StringUtils.isEmpty(state)) {
            this.parameters.set(AADServerParamKeys.STATE, encodeURIComponent(state));
        }
    };
    /**
     * add nonce
     * @param nonce
     */
    RequestParameterBuilder.prototype.addNonce = function (nonce) {
        this.parameters.set(AADServerParamKeys.NONCE, encodeURIComponent(nonce));
    };
    /**
     * add code_challenge and code_challenge_method
     * - throw if either of them are not passed
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    RequestParameterBuilder.prototype.addCodeChallengeParams = function (codeChallenge, codeChallengeMethod) {
        RequestValidator.validateCodeChallengeParams(codeChallenge, codeChallengeMethod);
        if (codeChallenge && codeChallengeMethod) {
            this.parameters.set(AADServerParamKeys.CODE_CHALLENGE, encodeURIComponent(codeChallenge));
            this.parameters.set(AADServerParamKeys.CODE_CHALLENGE_METHOD, encodeURIComponent(codeChallengeMethod));
        }
        else {
            throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        }
    };
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    RequestParameterBuilder.prototype.addAuthorizationCode = function (code) {
        this.parameters.set(AADServerParamKeys.CODE, encodeURIComponent(code));
    };
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    RequestParameterBuilder.prototype.addDeviceCode = function (code) {
        this.parameters.set(AADServerParamKeys.DEVICE_CODE, encodeURIComponent(code));
    };
    /**
     * add the `refreshToken` passed by the user
     * @param refreshToken
     */
    RequestParameterBuilder.prototype.addRefreshToken = function (refreshToken) {
        this.parameters.set(AADServerParamKeys.REFRESH_TOKEN, encodeURIComponent(refreshToken));
    };
    /**
     * add the `code_verifier` passed by the user to exchange for a token
     * @param codeVerifier
     */
    RequestParameterBuilder.prototype.addCodeVerifier = function (codeVerifier) {
        this.parameters.set(AADServerParamKeys.CODE_VERIFIER, encodeURIComponent(codeVerifier));
    };
    /**
     * add client_secret
     * @param clientSecret
     */
    RequestParameterBuilder.prototype.addClientSecret = function (clientSecret) {
        this.parameters.set(AADServerParamKeys.CLIENT_SECRET, encodeURIComponent(clientSecret));
    };
    /**
     * add clientAssertion for confidential client flows
     * @param clientAssertion
     */
    RequestParameterBuilder.prototype.addClientAssertion = function (clientAssertion) {
        this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION, encodeURIComponent(clientAssertion));
    };
    /**
     * add clientAssertionType for confidential client flows
     * @param clientAssertionType
     */
    RequestParameterBuilder.prototype.addClientAssertionType = function (clientAssertionType) {
        this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION_TYPE, encodeURIComponent(clientAssertionType));
    };
    /**
     * add OBO assertion for confidential client flows
     * @param clientAssertion
     */
    RequestParameterBuilder.prototype.addOboAssertion = function (oboAssertion) {
        this.parameters.set(AADServerParamKeys.OBO_ASSERTION, encodeURIComponent(oboAssertion));
    };
    /**
     * add grant type
     * @param grantType
     */
    RequestParameterBuilder.prototype.addRequestTokenUse = function (tokenUse) {
        this.parameters.set(AADServerParamKeys.REQUESTED_TOKEN_USE, encodeURIComponent(tokenUse));
    };
    /**
     * add grant type
     * @param grantType
     */
    RequestParameterBuilder.prototype.addGrantType = function (grantType) {
        this.parameters.set(AADServerParamKeys.GRANT_TYPE, encodeURIComponent(grantType));
    };
    /**
     * add client info
     *
     */
    RequestParameterBuilder.prototype.addClientInfo = function () {
        this.parameters.set(CLIENT_INFO, "1");
    };
    /**
     * add extraQueryParams
     * @param eQparams
     */
    RequestParameterBuilder.prototype.addExtraQueryParameters = function (eQparams) {
        var _this = this;
        RequestValidator.sanitizeEQParams(eQparams, this.parameters);
        Object.keys(eQparams).forEach(function (key) {
            _this.parameters.set(key, eQparams[key]);
        });
    };
    RequestParameterBuilder.prototype.addClientCapabilitiesToClaims = function (claims, clientCapabilities) {
        var mergedClaims;
        // Parse provided claims into JSON object or initialize empty object
        if (!claims) {
            mergedClaims = {};
        }
        else {
            try {
                mergedClaims = JSON.parse(claims);
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidClaimsRequestError();
            }
        }
        if (clientCapabilities && clientCapabilities.length > 0) {
            if (!mergedClaims.hasOwnProperty(ClaimsRequestKeys.ACCESS_TOKEN)) {
                // Add access_token key to claims object
                mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN] = {};
            }
            // Add xms_cc claim with provided clientCapabilities to access_token key
            mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN][ClaimsRequestKeys.XMS_CC] = {
                values: clientCapabilities
            };
        }
        return JSON.stringify(mergedClaims);
    };
    /**
     * adds `username` for Password Grant flow
     * @param username
     */
    RequestParameterBuilder.prototype.addUsername = function (username) {
        this.parameters.set(PasswordGrantConstants.username, username);
    };
    /**
     * adds `password` for Password Grant flow
     * @param password
     */
    RequestParameterBuilder.prototype.addPassword = function (password) {
        this.parameters.set(PasswordGrantConstants.password, password);
    };
    /**
     * add pop_jwk to query params
     * @param cnfString
     */
    RequestParameterBuilder.prototype.addPopToken = function (cnfString) {
        if (!StringUtils.isEmpty(cnfString)) {
            this.parameters.set(AADServerParamKeys.TOKEN_TYPE, exports.AuthenticationScheme.POP);
            this.parameters.set(AADServerParamKeys.REQ_CNF, encodeURIComponent(cnfString));
        }
    };
    /**
     * add server telemetry fields
     * @param serverTelemetryManager
     */
    RequestParameterBuilder.prototype.addServerTelemetry = function (serverTelemetryManager) {
        this.parameters.set(AADServerParamKeys.X_CLIENT_CURR_TELEM, serverTelemetryManager.generateCurrentRequestHeaderValue());
        this.parameters.set(AADServerParamKeys.X_CLIENT_LAST_TELEM, serverTelemetryManager.generateLastRequestHeaderValue());
    };
    /**
     * Adds parameter that indicates to the server that throttling is supported
     */
    RequestParameterBuilder.prototype.addThrottling = function () {
        this.parameters.set(AADServerParamKeys.X_MS_LIB_CAPABILITY, ThrottlingConstants.X_MS_LIB_CAPABILITY_VALUE);
    };
    /**
     * Utility to create a URL from the params map
     */
    RequestParameterBuilder.prototype.createQueryString = function () {
        var queryParameterArray = new Array();
        this.parameters.forEach(function (value, key) {
            queryParameterArray.push(key + "=" + value);
        });
        return queryParameterArray.join("&");
    };
    return RequestParameterBuilder;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ID_TOKEN Cache
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-idtoken-clientId-contoso.com-
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      realm: Full tenant or organizational identifier that the account belongs to
 * }
 */
var IdTokenEntity = /** @class */ (function (_super) {
    __extends(IdTokenEntity, _super);
    function IdTokenEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create IdTokenEntity
     * @param homeAccountId
     * @param authenticationResult
     * @param clientId
     * @param authority
     */
    IdTokenEntity.createIdTokenEntity = function (homeAccountId, environment, idToken, clientId, tenantId, oboAssertion) {
        var idTokenEntity = new IdTokenEntity();
        idTokenEntity.credentialType = exports.CredentialType.ID_TOKEN;
        idTokenEntity.homeAccountId = homeAccountId;
        idTokenEntity.environment = environment;
        idTokenEntity.clientId = clientId;
        idTokenEntity.secret = idToken;
        idTokenEntity.realm = tenantId;
        idTokenEntity.oboAssertion = oboAssertion;
        return idTokenEntity;
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    IdTokenEntity.isIdTokenEntity = function (entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity["credentialType"] === exports.CredentialType.ID_TOKEN);
    };
    return IdTokenEntity;
}(CredentialEntity));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility class which exposes functions for managing date and time operations.
 */
var TimeUtils = /** @class */ (function () {
    function TimeUtils() {
    }
    /**
     * return the current time in Unix time (seconds).
     */
    TimeUtils.nowSeconds = function () {
        // Date.getTime() returns in milliseconds.
        return Math.round(new Date().getTime() / 1000.0);
    };
    /**
     * check if a token is expired based on given UTC time in seconds.
     * @param expiresOn
     */
    TimeUtils.isTokenExpired = function (expiresOn, offset) {
        // check for access token expiry
        var expirationSec = Number(expiresOn) || 0;
        var offsetCurrentTimeSec = TimeUtils.nowSeconds() + offset;
        // If current time + offset is greater than token expiration time, then token is expired.
        return (offsetCurrentTimeSec > expirationSec);
    };
    /**
     * If the current time is earlier than the time that a token was cached at, we must discard the token
     * i.e. The system clock was turned back after acquiring the cached token
     * @param cachedAt
     * @param offset
     */
    TimeUtils.wasClockTurnedBack = function (cachedAt) {
        var cachedAtSec = Number(cachedAt);
        return cachedAtSec > TimeUtils.nowSeconds();
    };
    /**
     * Waits for t number of milliseconds
     * @param t number
     * @param value T
     */
    TimeUtils.delay = function (t, value) {
        return new Promise(function (resolve) { return setTimeout(function () { return resolve(value); }, t); });
    };
    return TimeUtils;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ACCESS_TOKEN Credential Type
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-accesstoken-clientId-contoso.com-user.read
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, usually only used for refresh tokens
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 *      cachedAt: Absolute device time when entry was created in the cache.
 *      expiresOn: Token expiry time, calculated based on current UTC time in seconds. Represented as a string.
 *      extendedExpiresOn: Additional extended expiry time until when token is valid in case of server-side outage. Represented as string in UTC seconds.
 *      keyId: used for POP and SSH tokenTypes
 *      tokenType: Type of the token issued. Usually "Bearer"
 * }
 */
var AccessTokenEntity = /** @class */ (function (_super) {
    __extends(AccessTokenEntity, _super);
    function AccessTokenEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create AccessTokenEntity
     * @param homeAccountId
     * @param environment
     * @param accessToken
     * @param clientId
     * @param tenantId
     * @param scopes
     * @param expiresOn
     * @param extExpiresOn
     */
    AccessTokenEntity.createAccessTokenEntity = function (homeAccountId, environment, accessToken, clientId, tenantId, scopes, expiresOn, extExpiresOn, cryptoUtils, refreshOn, tokenType, oboAssertion) {
        var _a;
        var atEntity = new AccessTokenEntity();
        atEntity.homeAccountId = homeAccountId;
        atEntity.credentialType = exports.CredentialType.ACCESS_TOKEN;
        atEntity.secret = accessToken;
        var currentTime = TimeUtils.nowSeconds();
        atEntity.cachedAt = currentTime.toString();
        /*
         * Token expiry time.
         * This value should be  calculated based on the current UTC time measured locally and the value  expires_in Represented as a string in JSON.
         */
        atEntity.expiresOn = expiresOn.toString();
        atEntity.extendedExpiresOn = extExpiresOn.toString();
        if (refreshOn) {
            atEntity.refreshOn = refreshOn.toString();
        }
        atEntity.environment = environment;
        atEntity.clientId = clientId;
        atEntity.realm = tenantId;
        atEntity.target = scopes;
        atEntity.oboAssertion = oboAssertion;
        atEntity.tokenType = StringUtils.isEmpty(tokenType) ? exports.AuthenticationScheme.BEARER : tokenType;
        // Create Access Token With AuthScheme instead of regular access token
        if (atEntity.tokenType === exports.AuthenticationScheme.POP) {
            atEntity.credentialType = exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
            // Make sure keyId is present and add it to credential
            var tokenClaims = AuthToken.extractTokenClaims(accessToken, cryptoUtils);
            if (!((_a = tokenClaims === null || tokenClaims === void 0 ? void 0 : tokenClaims.cnf) === null || _a === void 0 ? void 0 : _a.kid)) {
                throw ClientAuthError.createTokenClaimsRequiredError();
            }
            atEntity.keyId = tokenClaims.cnf.kid;
        }
        return atEntity;
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    AccessTokenEntity.isAccessTokenEntity = function (entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity.hasOwnProperty("target") &&
            (entity["credentialType"] === exports.CredentialType.ACCESS_TOKEN || entity["credentialType"] === exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME));
    };
    return AccessTokenEntity;
}(CredentialEntity));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * REFRESH_TOKEN Cache
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-refreshtoken-clientId--
 *
 * Value:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, '1' represents Microsoft Family
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 * }
 */
var RefreshTokenEntity = /** @class */ (function (_super) {
    __extends(RefreshTokenEntity, _super);
    function RefreshTokenEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create RefreshTokenEntity
     * @param homeAccountId
     * @param authenticationResult
     * @param clientId
     * @param authority
     */
    RefreshTokenEntity.createRefreshTokenEntity = function (homeAccountId, environment, refreshToken, clientId, familyId, oboAssertion) {
        var rtEntity = new RefreshTokenEntity();
        rtEntity.clientId = clientId;
        rtEntity.credentialType = exports.CredentialType.REFRESH_TOKEN;
        rtEntity.environment = environment;
        rtEntity.homeAccountId = homeAccountId;
        rtEntity.secret = refreshToken;
        rtEntity.oboAssertion = oboAssertion;
        if (familyId)
            rtEntity.familyId = familyId;
        return rtEntity;
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    RefreshTokenEntity.isRefreshTokenEntity = function (entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity["credentialType"] === exports.CredentialType.REFRESH_TOKEN);
    };
    return RefreshTokenEntity;
}(CredentialEntity));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * InteractionRequiredAuthErrorMessage class containing string constants used by error codes and messages.
 */
var InteractionRequiredAuthErrorMessage = [
    "interaction_required",
    "consent_required",
    "login_required"
];
var InteractionRequiredAuthSubErrorMessage = [
    "message_only",
    "additional_action",
    "basic_action",
    "user_password_expired",
    "consent_required"
];
/**
 * Error thrown when user interaction is required at the auth server.
 */
var InteractionRequiredAuthError = /** @class */ (function (_super) {
    __extends(InteractionRequiredAuthError, _super);
    function InteractionRequiredAuthError(errorCode, errorMessage, subError) {
        var _this = _super.call(this, errorCode, errorMessage, subError) || this;
        _this.name = "InteractionRequiredAuthError";
        Object.setPrototypeOf(_this, InteractionRequiredAuthError.prototype);
        return _this;
    }
    InteractionRequiredAuthError.isInteractionRequiredError = function (errorCode, errorString, subError) {
        var isInteractionRequiredErrorCode = !!errorCode && InteractionRequiredAuthErrorMessage.indexOf(errorCode) > -1;
        var isInteractionRequiredSubError = !!subError && InteractionRequiredAuthSubErrorMessage.indexOf(subError) > -1;
        var isInteractionRequiredErrorDesc = !!errorString && InteractionRequiredAuthErrorMessage.some(function (irErrorCode) {
            return errorString.indexOf(irErrorCode) > -1;
        });
        return isInteractionRequiredErrorCode || isInteractionRequiredErrorDesc || isInteractionRequiredSubError;
    };
    return InteractionRequiredAuthError;
}(ServerError));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var CacheRecord = /** @class */ (function () {
    function CacheRecord(accountEntity, idTokenEntity, accessTokenEntity, refreshTokenEntity, appMetadataEntity) {
        this.account = accountEntity || null;
        this.idToken = idTokenEntity || null;
        this.accessToken = accessTokenEntity || null;
        this.refreshToken = refreshTokenEntity || null;
        this.appMetadata = appMetadataEntity || null;
    }
    return CacheRecord;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class which provides helpers for OAuth 2.0 protocol specific values
 */
var ProtocolUtils = /** @class */ (function () {
    function ProtocolUtils() {
    }
    /**
     * Appends user state with random guid, or returns random guid.
     * @param userState
     * @param randomGuid
     */
    ProtocolUtils.setRequestState = function (cryptoObj, userState, meta) {
        var libraryState = ProtocolUtils.generateLibraryState(cryptoObj, meta);
        return !StringUtils.isEmpty(userState) ? "" + libraryState + Constants.RESOURCE_DELIM + userState : libraryState;
    };
    /**
     * Generates the state value used by the common library.
     * @param randomGuid
     * @param cryptoObj
     */
    ProtocolUtils.generateLibraryState = function (cryptoObj, meta) {
        if (!cryptoObj) {
            throw ClientAuthError.createNoCryptoObjectError("generateLibraryState");
        }
        // Create a state object containing a unique id and the timestamp of the request creation
        var stateObj = {
            id: cryptoObj.createNewGuid()
        };
        if (meta) {
            stateObj.meta = meta;
        }
        var stateString = JSON.stringify(stateObj);
        return cryptoObj.base64Encode(stateString);
    };
    /**
     * Parses the state into the RequestStateObject, which contains the LibraryState info and the state passed by the user.
     * @param state
     * @param cryptoObj
     */
    ProtocolUtils.parseRequestState = function (cryptoObj, state) {
        if (!cryptoObj) {
            throw ClientAuthError.createNoCryptoObjectError("parseRequestState");
        }
        if (StringUtils.isEmpty(state)) {
            throw ClientAuthError.createInvalidStateError(state, "Null, undefined or empty state");
        }
        try {
            // Split the state between library state and user passed state and decode them separately
            var splitState = state.split(Constants.RESOURCE_DELIM);
            var libraryState = splitState[0];
            var userState = splitState.length > 1 ? splitState.slice(1).join(Constants.RESOURCE_DELIM) : "";
            var libraryStateString = cryptoObj.base64Decode(libraryState);
            var libraryStateObj = JSON.parse(libraryStateString);
            return {
                userRequestState: !StringUtils.isEmpty(userState) ? userState : "",
                libraryState: libraryStateObj
            };
        }
        catch (e) {
            throw ClientAuthError.createInvalidStateError(state, e);
        }
    };
    return ProtocolUtils;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Url object class which can perform various transformations on url strings.
 */
var UrlString = /** @class */ (function () {
    function UrlString(url) {
        this._urlString = url;
        if (StringUtils.isEmpty(this._urlString)) {
            // Throws error if url is empty
            throw ClientConfigurationError.createUrlEmptyError();
        }
        if (StringUtils.isEmpty(this.getHash())) {
            this._urlString = UrlString.canonicalizeUri(url);
        }
    }
    Object.defineProperty(UrlString.prototype, "urlString", {
        get: function () {
            return this._urlString;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Ensure urls are lower case and end with a / character.
     * @param url
     */
    UrlString.canonicalizeUri = function (url) {
        if (url) {
            var lowerCaseUrl = url.toLowerCase();
            if (StringUtils.endsWith(lowerCaseUrl, "?")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -1);
            }
            else if (StringUtils.endsWith(lowerCaseUrl, "?/")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -2);
            }
            if (!StringUtils.endsWith(lowerCaseUrl, "/")) {
                lowerCaseUrl += "/";
            }
            return lowerCaseUrl;
        }
        return url;
    };
    /**
     * Throws if urlString passed is not a valid authority URI string.
     */
    UrlString.prototype.validateAsUri = function () {
        // Attempts to parse url for uri components
        var components;
        try {
            components = this.getUrlComponents();
        }
        catch (e) {
            throw ClientConfigurationError.createUrlParseError(e);
        }
        // Throw error if URI or path segments are not parseable.
        if (!components.HostNameAndPort || !components.PathSegments) {
            throw ClientConfigurationError.createUrlParseError("Given url string: " + this.urlString);
        }
        // Throw error if uri is insecure.
        if (!components.Protocol || components.Protocol.toLowerCase() !== "https:") {
            throw ClientConfigurationError.createInsecureAuthorityUriError(this.urlString);
        }
    };
    /**
     * Function to remove query string params from url. Returns the new url.
     * @param url
     * @param name
     */
    UrlString.prototype.urlRemoveQueryStringParameter = function (name) {
        var regex = new RegExp("(\\&" + name + "=)[^\&]+");
        this._urlString = this.urlString.replace(regex, "");
        // name=value&
        regex = new RegExp("(" + name + "=)[^\&]+&");
        this._urlString = this.urlString.replace(regex, "");
        // name=value
        regex = new RegExp("(" + name + "=)[^\&]+");
        this._urlString = this.urlString.replace(regex, "");
        return this.urlString;
    };
    /**
     * Given a url and a query string return the url with provided query string appended
     * @param url
     * @param queryString
     */
    UrlString.appendQueryString = function (url, queryString) {
        if (StringUtils.isEmpty(queryString)) {
            return url;
        }
        return url.indexOf("?") < 0 ? url + "?" + queryString : url + "&" + queryString;
    };
    /**
     * Returns a url with the hash removed
     * @param url
     */
    UrlString.removeHashFromUrl = function (url) {
        return UrlString.canonicalizeUri(url.split("#")[0]);
    };
    /**
     * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
     * @param href The url
     * @param tenantId The tenant id to replace
     */
    UrlString.prototype.replaceTenantPath = function (tenantId) {
        var urlObject = this.getUrlComponents();
        var pathArray = urlObject.PathSegments;
        if (tenantId && (pathArray.length !== 0 && (pathArray[0] === AADAuthorityConstants.COMMON || pathArray[0] === AADAuthorityConstants.ORGANIZATIONS))) {
            pathArray[0] = tenantId;
        }
        return UrlString.constructAuthorityUriFromObject(urlObject);
    };
    /**
     * Returns the anchor part(#) of the URL
     */
    UrlString.prototype.getHash = function () {
        return UrlString.parseHash(this.urlString);
    };
    /**
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    UrlString.prototype.getUrlComponents = function () {
        // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
        var regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        // If url string does not match regEx, we throw an error
        var match = this.urlString.match(regEx);
        if (!match) {
            throw ClientConfigurationError.createUrlParseError("Given url string: " + this.urlString);
        }
        // Url component object
        var urlComponents = {
            Protocol: match[1],
            HostNameAndPort: match[4],
            AbsolutePath: match[5],
            QueryString: match[7]
        };
        var pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter(function (val) { return val && val.length > 0; }); // remove empty elements
        urlComponents.PathSegments = pathSegments;
        if (!StringUtils.isEmpty(urlComponents.QueryString) && urlComponents.QueryString.endsWith("/")) {
            urlComponents.QueryString = urlComponents.QueryString.substring(0, urlComponents.QueryString.length - 1);
        }
        return urlComponents;
    };
    UrlString.getDomainFromUrl = function (url) {
        var regEx = RegExp("^([^:/?#]+://)?([^/?#]*)");
        var match = url.match(regEx);
        if (!match) {
            throw ClientConfigurationError.createUrlParseError("Given url string: " + url);
        }
        return match[2];
    };
    UrlString.getAbsoluteUrl = function (relativeUrl, baseUrl) {
        if (relativeUrl[0] === Constants.FORWARD_SLASH) {
            var url = new UrlString(baseUrl);
            var baseComponents = url.getUrlComponents();
            return baseComponents.Protocol + "//" + baseComponents.HostNameAndPort + relativeUrl;
        }
        return relativeUrl;
    };
    /**
     * Parses hash string from given string. Returns empty string if no hash symbol is found.
     * @param hashString
     */
    UrlString.parseHash = function (hashString) {
        var hashIndex1 = hashString.indexOf("#");
        var hashIndex2 = hashString.indexOf("#/");
        if (hashIndex2 > -1) {
            return hashString.substring(hashIndex2 + 2);
        }
        else if (hashIndex1 > -1) {
            return hashString.substring(hashIndex1 + 1);
        }
        return "";
    };
    UrlString.constructAuthorityUriFromObject = function (urlObject) {
        return new UrlString(urlObject.Protocol + "//" + urlObject.HostNameAndPort + "/" + urlObject.PathSegments.join("/"));
    };
    /**
     * Returns URL hash as server auth code response object.
     */
    UrlString.getDeserializedHash = function (hash) {
        // Check if given hash is empty
        if (StringUtils.isEmpty(hash)) {
            return {};
        }
        // Strip the # symbol if present
        var parsedHash = UrlString.parseHash(hash);
        // If # symbol was not present, above will return empty string, so give original hash value
        var deserializedHash = StringUtils.queryStringToObject(StringUtils.isEmpty(parsedHash) ? hash : parsedHash);
        // Check if deserialization didn't work
        if (!deserializedHash) {
            throw ClientAuthError.createHashNotDeserializedError(JSON.stringify(deserializedHash));
        }
        return deserializedHash;
    };
    /**
     * Check if the hash of the URL string contains known properties
     */
    UrlString.hashContainsKnownProperties = function (hash) {
        if (StringUtils.isEmpty(hash)) {
            return false;
        }
        var parameters = UrlString.getDeserializedHash(hash);
        return !!(parameters.code ||
            parameters.error_description ||
            parameters.error ||
            parameters.state);
    };
    return UrlString;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var KeyLocation;
(function (KeyLocation) {
    KeyLocation["SW"] = "sw";
    KeyLocation["UHW"] = "uhw";
})(KeyLocation || (KeyLocation = {}));
var PopTokenGenerator = /** @class */ (function () {
    function PopTokenGenerator(cryptoUtils) {
        this.cryptoUtils = cryptoUtils;
    }
    PopTokenGenerator.prototype.generateCnf = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var kidThumbprint, reqCnf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cryptoUtils.getPublicKeyThumbprint(request)];
                    case 1:
                        kidThumbprint = _a.sent();
                        reqCnf = {
                            kid: kidThumbprint,
                            xms_ksl: KeyLocation.SW
                        };
                        return [2 /*return*/, this.cryptoUtils.base64Encode(JSON.stringify(reqCnf))];
                }
            });
        });
    };
    PopTokenGenerator.prototype.signPopToken = function (accessToken, request) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokenClaims, resourceRequestMethod, resourceRequestUri, shrClaims, resourceUrlString, resourceUrlComponents;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenClaims = AuthToken.extractTokenClaims(accessToken, this.cryptoUtils);
                        resourceRequestMethod = request.resourceRequestMethod, resourceRequestUri = request.resourceRequestUri, shrClaims = request.shrClaims;
                        resourceUrlString = (resourceRequestUri) ? new UrlString(resourceRequestUri) : undefined;
                        resourceUrlComponents = resourceUrlString === null || resourceUrlString === void 0 ? void 0 : resourceUrlString.getUrlComponents();
                        if (!((_a = tokenClaims === null || tokenClaims === void 0 ? void 0 : tokenClaims.cnf) === null || _a === void 0 ? void 0 : _a.kid)) {
                            throw ClientAuthError.createTokenClaimsRequiredError();
                        }
                        return [4 /*yield*/, this.cryptoUtils.signJwt({
                                at: accessToken,
                                ts: TimeUtils.nowSeconds(),
                                m: resourceRequestMethod === null || resourceRequestMethod === void 0 ? void 0 : resourceRequestMethod.toUpperCase(),
                                u: resourceUrlComponents === null || resourceUrlComponents === void 0 ? void 0 : resourceUrlComponents.HostNameAndPort,
                                nonce: this.cryptoUtils.createNewGuid(),
                                p: resourceUrlComponents === null || resourceUrlComponents === void 0 ? void 0 : resourceUrlComponents.AbsolutePath,
                                q: (resourceUrlComponents === null || resourceUrlComponents === void 0 ? void 0 : resourceUrlComponents.QueryString) ? [[], resourceUrlComponents.QueryString] : undefined,
                                client_claims: shrClaims || undefined
                            }, tokenClaims.cnf.kid)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return PopTokenGenerator;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * APP_METADATA Cache
 *
 * Key:Value Schema:
 *
 * Key: appmetadata-<environment>-<client_id>
 *
 * Value:
 * {
 *      clientId: client ID of the application
 *      environment: entity that issued the token, represented as a full host
 *      familyId: Family ID identifier, '1' represents Microsoft Family
 * }
 */
var AppMetadataEntity = /** @class */ (function () {
    function AppMetadataEntity() {
    }
    /**
     * Generate AppMetadata Cache Key as per the schema: appmetadata-<environment>-<client_id>
     */
    AppMetadataEntity.prototype.generateAppMetadataKey = function () {
        return AppMetadataEntity.generateAppMetadataCacheKey(this.environment, this.clientId);
    };
    /**
     * Generate AppMetadata Cache Key
     */
    AppMetadataEntity.generateAppMetadataCacheKey = function (environment, clientId) {
        var appMetaDataKeyArray = [
            APP_METADATA,
            environment,
            clientId,
        ];
        return appMetaDataKeyArray.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    };
    /**
     * Creates AppMetadataEntity
     * @param clientId
     * @param environment
     * @param familyId
     */
    AppMetadataEntity.createAppMetadataEntity = function (clientId, environment, familyId) {
        var appMetadata = new AppMetadataEntity();
        appMetadata.clientId = clientId;
        appMetadata.environment = environment;
        if (familyId) {
            appMetadata.familyId = familyId;
        }
        return appMetadata;
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    AppMetadataEntity.isAppMetadataEntity = function (key, entity) {
        if (!entity) {
            return false;
        }
        return (key.indexOf(APP_METADATA) === 0 &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("environment"));
    };
    return AppMetadataEntity;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class instance helps track the memory changes facilitating
 * decisions to read from and write to the persistent cache
 */ var TokenCacheContext = /** @class */ (function () {
    function TokenCacheContext(tokenCache, hasChanged) {
        this.cache = tokenCache;
        this.hasChanged = hasChanged;
    }
    Object.defineProperty(TokenCacheContext.prototype, "cacheHasChanged", {
        /**
         * boolean which indicates the changes in cache
         */
        get: function () {
            return this.hasChanged;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TokenCacheContext.prototype, "tokenCache", {
        /**
         * function to retrieve the token cache
         */
        get: function () {
            return this.cache;
        },
        enumerable: false,
        configurable: true
    });
    return TokenCacheContext;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class that handles response parsing.
 */
var ResponseHandler = /** @class */ (function () {
    function ResponseHandler(clientId, cacheStorage, cryptoObj, logger, serializableCache, persistencePlugin) {
        this.clientId = clientId;
        this.cacheStorage = cacheStorage;
        this.cryptoObj = cryptoObj;
        this.logger = logger;
        this.serializableCache = serializableCache;
        this.persistencePlugin = persistencePlugin;
    }
    /**
     * Function which validates server authorization code response.
     * @param serverResponseHash
     * @param cachedState
     * @param cryptoObj
     */
    ResponseHandler.prototype.validateServerAuthorizationCodeResponse = function (serverResponseHash, cachedState, cryptoObj) {
        if (!serverResponseHash.state || !cachedState) {
            throw !serverResponseHash.state ? ClientAuthError.createStateNotFoundError("Server State") : ClientAuthError.createStateNotFoundError("Cached State");
        }
        if (decodeURIComponent(serverResponseHash.state) !== decodeURIComponent(cachedState)) {
            throw ClientAuthError.createStateMismatchError();
        }
        // Check for error
        if (serverResponseHash.error || serverResponseHash.error_description || serverResponseHash.suberror) {
            if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponseHash.error, serverResponseHash.error_description, serverResponseHash.suberror)) {
                throw new InteractionRequiredAuthError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror);
            }
            throw new ServerError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror);
        }
        if (serverResponseHash.client_info) {
            buildClientInfo(serverResponseHash.client_info, cryptoObj);
        }
    };
    /**
     * Function which validates server authorization token response.
     * @param serverResponse
     */
    ResponseHandler.prototype.validateTokenResponse = function (serverResponse) {
        // Check for error
        if (serverResponse.error || serverResponse.error_description || serverResponse.suberror) {
            if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponse.error, serverResponse.error_description, serverResponse.suberror)) {
                throw new InteractionRequiredAuthError(serverResponse.error, serverResponse.error_description, serverResponse.suberror);
            }
            var errString = serverResponse.error_codes + " - [" + serverResponse.timestamp + "]: " + serverResponse.error_description + " - Correlation ID: " + serverResponse.correlation_id + " - Trace ID: " + serverResponse.trace_id;
            throw new ServerError(serverResponse.error, errString, serverResponse.suberror);
        }
    };
    /**
     * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
     * @param serverTokenResponse
     * @param authority
     */
    ResponseHandler.prototype.handleServerTokenResponse = function (serverTokenResponse, authority, reqTimestamp, request, authCodePayload, oboAssertion, handlingRefreshTokenResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var idTokenObj, requestStateObj, cacheRecord, cacheContext, key, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (serverTokenResponse.id_token) {
                            idTokenObj = new AuthToken(serverTokenResponse.id_token || Constants.EMPTY_STRING, this.cryptoObj);
                            // token nonce check (TODO: Add a warning if no nonce is given?)
                            if (authCodePayload && !StringUtils.isEmpty(authCodePayload.nonce)) {
                                if (idTokenObj.claims.nonce !== authCodePayload.nonce) {
                                    throw ClientAuthError.createNonceMismatchError();
                                }
                            }
                        }
                        // generate homeAccountId
                        this.homeAccountIdentifier = AccountEntity.generateHomeAccountId(serverTokenResponse.client_info || Constants.EMPTY_STRING, authority.authorityType, this.logger, this.cryptoObj, idTokenObj);
                        if (!!authCodePayload && !!authCodePayload.state) {
                            requestStateObj = ProtocolUtils.parseRequestState(this.cryptoObj, authCodePayload.state);
                        }
                        cacheRecord = this.generateCacheRecord(serverTokenResponse, authority, reqTimestamp, idTokenObj, request.scopes, oboAssertion, authCodePayload);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 4, 7]);
                        if (!(this.persistencePlugin && this.serializableCache)) return [3 /*break*/, 3];
                        this.logger.verbose("Persistence enabled, calling beforeCacheAccess");
                        cacheContext = new TokenCacheContext(this.serializableCache, true);
                        return [4 /*yield*/, this.persistencePlugin.beforeCacheAccess(cacheContext)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        /*
                         * When saving a refreshed tokens to the cache, it is expected that the account that was used is present in the cache.
                         * If not present, we should return null, as it's the case that another application called removeAccount in between
                         * the calls to getAllAccounts and acquireTokenSilent. We should not overwrite that removal.
                         */
                        if (handlingRefreshTokenResponse && cacheRecord.account) {
                            key = cacheRecord.account.generateAccountKey();
                            account = this.cacheStorage.getAccount(key);
                            if (!account) {
                                this.logger.warning("Account used to refresh tokens not in persistence, refreshed tokens will not be stored in the cache");
                                return [2 /*return*/, ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenObj, requestStateObj)];
                            }
                        }
                        this.cacheStorage.saveCacheRecord(cacheRecord);
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(this.persistencePlugin && this.serializableCache && cacheContext)) return [3 /*break*/, 6];
                        this.logger.verbose("Persistence enabled, calling afterCacheAccess");
                        return [4 /*yield*/, this.persistencePlugin.afterCacheAccess(cacheContext)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/, ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenObj, requestStateObj)];
                }
            });
        });
    };
    /**
     * Generates CacheRecord
     * @param serverTokenResponse
     * @param idTokenObj
     * @param authority
     */
    ResponseHandler.prototype.generateCacheRecord = function (serverTokenResponse, authority, reqTimestamp, idTokenObj, requestScopes, oboAssertion, authCodePayload) {
        var env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        // IdToken: non AAD scenarios can have empty realm
        var cachedIdToken;
        var cachedAccount;
        if (!StringUtils.isEmpty(serverTokenResponse.id_token) && !!idTokenObj) {
            cachedIdToken = IdTokenEntity.createIdTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.id_token || Constants.EMPTY_STRING, this.clientId, idTokenObj.claims.tid || Constants.EMPTY_STRING, oboAssertion);
            cachedAccount = this.generateAccountEntity(serverTokenResponse, idTokenObj, authority, oboAssertion, authCodePayload);
        }
        // AccessToken
        var cachedAccessToken = null;
        if (!StringUtils.isEmpty(serverTokenResponse.access_token)) {
            // If scopes not returned in server response, use request scopes
            var responseScopes = serverTokenResponse.scope ? ScopeSet.fromString(serverTokenResponse.scope) : new ScopeSet(requestScopes || []);
            /*
             * Use timestamp calculated before request
             * Server may return timestamps as strings, parse to numbers if so.
             */
            var expiresIn = (typeof serverTokenResponse.expires_in === "string" ? parseInt(serverTokenResponse.expires_in, 10) : serverTokenResponse.expires_in) || 0;
            var extExpiresIn = (typeof serverTokenResponse.ext_expires_in === "string" ? parseInt(serverTokenResponse.ext_expires_in, 10) : serverTokenResponse.ext_expires_in) || 0;
            var refreshIn = (typeof serverTokenResponse.refresh_in === "string" ? parseInt(serverTokenResponse.refresh_in, 10) : serverTokenResponse.refresh_in) || undefined;
            var tokenExpirationSeconds = reqTimestamp + expiresIn;
            var extendedTokenExpirationSeconds = tokenExpirationSeconds + extExpiresIn;
            var refreshOnSeconds = refreshIn && refreshIn > 0 ? reqTimestamp + refreshIn : undefined;
            // non AAD scenarios can have empty realm
            cachedAccessToken = AccessTokenEntity.createAccessTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.access_token || Constants.EMPTY_STRING, this.clientId, idTokenObj ? idTokenObj.claims.tid || Constants.EMPTY_STRING : authority.tenant, responseScopes.printScopes(), tokenExpirationSeconds, extendedTokenExpirationSeconds, this.cryptoObj, refreshOnSeconds, serverTokenResponse.token_type, oboAssertion);
        }
        // refreshToken
        var cachedRefreshToken = null;
        if (!StringUtils.isEmpty(serverTokenResponse.refresh_token)) {
            cachedRefreshToken = RefreshTokenEntity.createRefreshTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.refresh_token || Constants.EMPTY_STRING, this.clientId, serverTokenResponse.foci, oboAssertion);
        }
        // appMetadata
        var cachedAppMetadata = null;
        if (!StringUtils.isEmpty(serverTokenResponse.foci)) {
            cachedAppMetadata = AppMetadataEntity.createAppMetadataEntity(this.clientId, env, serverTokenResponse.foci);
        }
        return new CacheRecord(cachedAccount, cachedIdToken, cachedAccessToken, cachedRefreshToken, cachedAppMetadata);
    };
    /**
     * Generate Account
     * @param serverTokenResponse
     * @param idToken
     * @param authority
     */
    ResponseHandler.prototype.generateAccountEntity = function (serverTokenResponse, idToken, authority, oboAssertion, authCodePayload) {
        var authorityType = authority.authorityType;
        var cloudGraphHostName = authCodePayload ? authCodePayload.cloud_graph_host_name : "";
        var msGraphhost = authCodePayload ? authCodePayload.msgraph_host : "";
        // ADFS does not require client_info in the response
        if (authorityType === exports.AuthorityType.Adfs) {
            this.logger.verbose("Authority type is ADFS, creating ADFS account");
            return AccountEntity.createGenericAccount(authority, this.homeAccountIdentifier, idToken, oboAssertion, cloudGraphHostName, msGraphhost);
        }
        // This fallback applies to B2C as well as they fall under an AAD account type.
        if (StringUtils.isEmpty(serverTokenResponse.client_info) && authority.protocolMode === "AAD") {
            throw ClientAuthError.createClientInfoEmptyError();
        }
        return serverTokenResponse.client_info ?
            AccountEntity.createAccount(serverTokenResponse.client_info, this.homeAccountIdentifier, authority, idToken, oboAssertion, cloudGraphHostName, msGraphhost) :
            AccountEntity.createGenericAccount(authority, this.homeAccountIdentifier, idToken, oboAssertion, cloudGraphHostName, msGraphhost);
    };
    /**
     * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
     *
     * Optionally takes a state string that is set as-is in the response.
     *
     * @param cacheRecord
     * @param idTokenObj
     * @param fromTokenCache
     * @param stateString
     */
    ResponseHandler.generateAuthenticationResult = function (cryptoObj, authority, cacheRecord, fromTokenCache, request, idTokenObj, requestState) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, responseScopes, expiresOn, extExpiresOn, familyId, popTokenGenerator, uid, tid;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        accessToken = "";
                        responseScopes = [];
                        expiresOn = null;
                        familyId = Constants.EMPTY_STRING;
                        if (!cacheRecord.accessToken) return [3 /*break*/, 4];
                        if (!(cacheRecord.accessToken.tokenType === exports.AuthenticationScheme.POP)) return [3 /*break*/, 2];
                        popTokenGenerator = new PopTokenGenerator(cryptoObj);
                        return [4 /*yield*/, popTokenGenerator.signPopToken(cacheRecord.accessToken.secret, request)];
                    case 1:
                        accessToken = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        accessToken = cacheRecord.accessToken.secret;
                        _d.label = 3;
                    case 3:
                        responseScopes = ScopeSet.fromString(cacheRecord.accessToken.target).asArray();
                        expiresOn = new Date(Number(cacheRecord.accessToken.expiresOn) * 1000);
                        extExpiresOn = new Date(Number(cacheRecord.accessToken.extendedExpiresOn) * 1000);
                        _d.label = 4;
                    case 4:
                        if (cacheRecord.appMetadata) {
                            familyId = cacheRecord.appMetadata.familyId === THE_FAMILY_ID ? THE_FAMILY_ID : Constants.EMPTY_STRING;
                        }
                        uid = (idTokenObj === null || idTokenObj === void 0 ? void 0 : idTokenObj.claims.oid) || (idTokenObj === null || idTokenObj === void 0 ? void 0 : idTokenObj.claims.sub) || Constants.EMPTY_STRING;
                        tid = (idTokenObj === null || idTokenObj === void 0 ? void 0 : idTokenObj.claims.tid) || Constants.EMPTY_STRING;
                        return [2 /*return*/, {
                                authority: authority.canonicalAuthority,
                                uniqueId: uid,
                                tenantId: tid,
                                scopes: responseScopes,
                                account: cacheRecord.account ? cacheRecord.account.getAccountInfo() : null,
                                idToken: idTokenObj ? idTokenObj.rawToken : Constants.EMPTY_STRING,
                                idTokenClaims: idTokenObj ? idTokenObj.claims : {},
                                accessToken: accessToken,
                                fromCache: fromTokenCache,
                                expiresOn: expiresOn,
                                extExpiresOn: extExpiresOn,
                                familyId: familyId,
                                tokenType: ((_a = cacheRecord.accessToken) === null || _a === void 0 ? void 0 : _a.tokenType) || Constants.EMPTY_STRING,
                                state: requestState ? requestState.userRequestState : Constants.EMPTY_STRING,
                                cloudGraphHostName: ((_b = cacheRecord.account) === null || _b === void 0 ? void 0 : _b.cloudGraphHostName) || Constants.EMPTY_STRING,
                                msGraphHost: ((_c = cacheRecord.account) === null || _c === void 0 ? void 0 : _c.msGraphHost) || Constants.EMPTY_STRING
                            }];
                }
            });
        });
    };
    return ResponseHandler;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Oauth2.0 Authorization Code client
 */
var AuthorizationCodeClient = /** @class */ (function (_super) {
    __extends(AuthorizationCodeClient, _super);
    function AuthorizationCodeClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Creates the URL of the authorization request letting the user input credentials and consent to the
     * application. The URL target the /authorize endpoint of the authority configured in the
     * application object.
     *
     * Once the user inputs their credentials and consents, the authority will send a response to the redirect URI
     * sent in the request and should contain an authorization code, which can then be used to acquire tokens via
     * acquireToken(AuthorizationCodeRequest)
     * @param request
     */
    AuthorizationCodeClient.prototype.getAuthCodeUrl = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = this.createAuthCodeUrlQueryString(request);
                return [2 /*return*/, UrlString.appendQueryString(this.authority.authorizationEndpoint, queryString)];
            });
        });
    };
    /**
     * API to acquire a token in exchange of 'authorization_code` acquired by the user in the first leg of the
     * authorization_code_grant
     * @param request
     */
    AuthorizationCodeClient.prototype.acquireToken = function (request, authCodePayload) {
        return __awaiter(this, void 0, void 0, function () {
            var reqTimestamp, response, responseHandler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("in acquireToken call");
                        if (!request || StringUtils.isEmpty(request.code)) {
                            throw ClientAuthError.createTokenRequestCannotBeMadeError();
                        }
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.executeTokenRequest(this.authority, request)];
                    case 1:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        // Validate response. This function throws a server error if an error is returned by the server.
                        responseHandler.validateTokenResponse(response.body);
                        return [4 /*yield*/, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, authCodePayload)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Handles the hash fragment response from public client code request. Returns a code response used by
     * the client to exchange for a token in acquireToken.
     * @param hashFragment
     */
    AuthorizationCodeClient.prototype.handleFragmentResponse = function (hashFragment, cachedState) {
        // Handle responses.
        var responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, null, null);
        // Deserialize hash fragment response parameters.
        var hashUrlString = new UrlString(hashFragment);
        // Deserialize hash fragment response parameters.
        var serverParams = UrlString.getDeserializedHash(hashUrlString.getHash());
        // Get code response
        responseHandler.validateServerAuthorizationCodeResponse(serverParams, cachedState, this.cryptoUtils);
        // throw when there is no auth code in the response
        if (!serverParams.code) {
            throw ClientAuthError.createNoAuthCodeInServerResponseError();
        }
        return __assign(__assign({}, serverParams), { 
            // Code param is optional in ServerAuthorizationCodeResponse but required in AuthorizationCodePaylod
            code: serverParams.code });
    };
    /**
     * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param authorityUri
     */
    AuthorizationCodeClient.prototype.getLogoutUri = function (logoutRequest) {
        // Throw error if logoutRequest is null/undefined
        if (!logoutRequest) {
            throw ClientConfigurationError.createEmptyLogoutRequestError();
        }
        if (logoutRequest.account) {
            // Clear given account.
            this.cacheManager.removeAccount(AccountEntity.generateAccountCacheKey(logoutRequest.account));
        }
        else {
            // Clear all accounts and tokens
            this.cacheManager.clear();
        }
        var queryString = this.createLogoutUrlQueryString(logoutRequest);
        // Construct logout URI.
        return UrlString.appendQueryString(this.authority.endSessionEndpoint, queryString);
    };
    /**
     * Executes POST request to token endpoint
     * @param authority
     * @param request
     */
    AuthorizationCodeClient.prototype.executeTokenRequest = function (authority, request) {
        return __awaiter(this, void 0, void 0, function () {
            var thumbprint, requestBody, queryParameters, ccsCredential, clientInfo, headers, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thumbprint = {
                            clientId: this.config.authOptions.clientId,
                            authority: authority.canonicalAuthority,
                            scopes: request.scopes
                        };
                        return [4 /*yield*/, this.createTokenRequestBody(request)];
                    case 1:
                        requestBody = _a.sent();
                        queryParameters = this.createTokenQueryParameters(request);
                        ccsCredential = undefined;
                        if (request.clientInfo) {
                            try {
                                clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                                ccsCredential = {
                                    credential: "" + clientInfo.uid + Separators.CLIENT_INFO_SEPARATOR + clientInfo.utid,
                                    type: exports.CcsCredentialType.HOME_ACCOUNT_ID
                                };
                            }
                            catch (e) {
                                this.logger.verbose("Could not parse client info for CCS Header: " + e);
                            }
                        }
                        headers = this.createTokenRequestHeaders(ccsCredential || request.ccsCredential);
                        endpoint = StringUtils.isEmpty(queryParameters) ? authority.tokenEndpoint : authority.tokenEndpoint + "?" + queryParameters;
                        return [2 /*return*/, this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint)];
                }
            });
        });
    };
    /**
     * Creates query string for the /token request
     * @param request
     */
    AuthorizationCodeClient.prototype.createTokenQueryParameters = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        if (request.tokenQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenQueryParameters);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * Generates a map for all the params to be sent to the service
     * @param request
     */
    AuthorizationCodeClient.prototype.createTokenRequestBody = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var parameterBuilder, clientAssertion, popTokenGenerator, cnfString, correlationId, ccsCred, clientInfo, clientInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameterBuilder = new RequestParameterBuilder();
                        parameterBuilder.addClientId(this.config.authOptions.clientId);
                        // validate the redirectUri (to be a non null value)
                        parameterBuilder.addRedirectUri(request.redirectUri);
                        // Add scope array, parameter builder will add default scopes and dedupe
                        parameterBuilder.addScopes(request.scopes);
                        // add code: user set, not validated
                        parameterBuilder.addAuthorizationCode(request.code);
                        // Add library metadata
                        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
                        parameterBuilder.addThrottling();
                        if (this.serverTelemetryManager) {
                            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
                        }
                        // add code_verifier if passed
                        if (request.codeVerifier) {
                            parameterBuilder.addCodeVerifier(request.codeVerifier);
                        }
                        if (this.config.clientCredentials.clientSecret) {
                            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
                        }
                        if (this.config.clientCredentials.clientAssertion) {
                            clientAssertion = this.config.clientCredentials.clientAssertion;
                            parameterBuilder.addClientAssertion(clientAssertion.assertion);
                            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
                        }
                        parameterBuilder.addGrantType(GrantType.AUTHORIZATION_CODE_GRANT);
                        parameterBuilder.addClientInfo();
                        if (!(request.authenticationScheme === exports.AuthenticationScheme.POP)) return [3 /*break*/, 2];
                        popTokenGenerator = new PopTokenGenerator(this.cryptoUtils);
                        return [4 /*yield*/, popTokenGenerator.generateCnf(request)];
                    case 1:
                        cnfString = _a.sent();
                        parameterBuilder.addPopToken(cnfString);
                        _a.label = 2;
                    case 2:
                        correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
                        parameterBuilder.addCorrelationId(correlationId);
                        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
                            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
                        }
                        ccsCred = undefined;
                        if (request.clientInfo) {
                            try {
                                clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                                ccsCred = {
                                    credential: "" + clientInfo.uid + Separators.CLIENT_INFO_SEPARATOR + clientInfo.utid,
                                    type: exports.CcsCredentialType.HOME_ACCOUNT_ID
                                };
                            }
                            catch (e) {
                                this.logger.verbose("Could not parse client info for CCS Header: " + e);
                            }
                        }
                        else {
                            ccsCred = request.ccsCredential;
                        }
                        // Adds these as parameters in the request instead of headers to prevent CORS preflight request
                        if (this.config.systemOptions.preventCorsPreflight && ccsCred) {
                            switch (ccsCred.type) {
                                case exports.CcsCredentialType.HOME_ACCOUNT_ID:
                                    try {
                                        clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                                        parameterBuilder.addCcsOid(clientInfo);
                                    }
                                    catch (e) {
                                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                                    }
                                    break;
                                case exports.CcsCredentialType.UPN:
                                    parameterBuilder.addCcsUpn(ccsCred.credential);
                                    break;
                            }
                        }
                        return [2 /*return*/, parameterBuilder.createQueryString()];
                }
            });
        });
    };
    /**
     * This API validates the `AuthorizationCodeUrlRequest` and creates a URL
     * @param request
     */
    AuthorizationCodeClient.prototype.createAuthCodeUrlQueryString = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        var requestScopes = __spreadArrays(request.scopes || [], request.extraScopesToConsent || []);
        parameterBuilder.addScopes(requestScopes);
        // validate the redirectUri (to be a non null value)
        parameterBuilder.addRedirectUri(request.redirectUri);
        // generate the correlationId if not set by the user and add
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        // add response_mode. If not passed in it defaults to query.
        parameterBuilder.addResponseMode(request.responseMode);
        // add response_type = code
        parameterBuilder.addResponseTypeCode();
        // add library info parameters
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        // add client_info=1
        parameterBuilder.addClientInfo();
        if (request.codeChallenge && request.codeChallengeMethod) {
            parameterBuilder.addCodeChallengeParams(request.codeChallenge, request.codeChallengeMethod);
        }
        if (request.prompt) {
            parameterBuilder.addPrompt(request.prompt);
        }
        if (request.domainHint) {
            parameterBuilder.addDomainHint(request.domainHint);
        }
        // Add sid or loginHint with preference for sid -> loginHint -> username of AccountInfo object
        if (request.prompt !== PromptValue.SELECT_ACCOUNT) {
            // AAD will throw if prompt=select_account is passed with an account hint
            if (request.sid && request.prompt === PromptValue.NONE) {
                // SessionID is only used in silent calls
                this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from request");
                parameterBuilder.addSid(request.sid);
            }
            else if (request.account) {
                var accountSid = this.extractAccountSid(request.account);
                // If account and loginHint are provided, we will check account first for sid before adding loginHint
                if (accountSid && request.prompt === PromptValue.NONE) {
                    // SessionId is only used in silent calls
                    this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from account");
                    parameterBuilder.addSid(accountSid);
                    try {
                        var clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                    }
                }
                else if (request.loginHint) {
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from request");
                    parameterBuilder.addLoginHint(request.loginHint);
                    parameterBuilder.addCcsUpn(request.loginHint);
                }
                else if (request.account.username) {
                    // Fallback to account username if provided
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from account");
                    parameterBuilder.addLoginHint(request.account.username);
                    try {
                        var clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                    }
                }
            }
            else if (request.loginHint) {
                this.logger.verbose("createAuthCodeUrlQueryString: No account, adding login_hint from request");
                parameterBuilder.addLoginHint(request.loginHint);
                parameterBuilder.addCcsUpn(request.loginHint);
            }
        }
        else {
            this.logger.verbose("createAuthCodeUrlQueryString: Prompt is select_account, ignoring account hints");
        }
        if (request.nonce) {
            parameterBuilder.addNonce(request.nonce);
        }
        if (request.state) {
            parameterBuilder.addState(request.state);
        }
        if (!StringUtils.isEmpty(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (request.extraQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.extraQueryParameters);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * This API validates the `EndSessionRequest` and creates a URL
     * @param request
     */
    AuthorizationCodeClient.prototype.createLogoutUrlQueryString = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        if (request.postLogoutRedirectUri) {
            parameterBuilder.addPostLogoutRedirectUri(request.postLogoutRedirectUri);
        }
        if (request.correlationId) {
            parameterBuilder.addCorrelationId(request.correlationId);
        }
        if (request.idTokenHint) {
            parameterBuilder.addIdTokenHint(request.idTokenHint);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * Helper to get sid from account. Returns null if idTokenClaims are not present or sid is not present.
     * @param account
     */
    AuthorizationCodeClient.prototype.extractAccountSid = function (account) {
        if (account.idTokenClaims) {
            var tokenClaims = account.idTokenClaims;
            return tokenClaims.sid || null;
        }
        return null;
    };
    return AuthorizationCodeClient;
}(BaseClient));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * OAuth2.0 Device code client
 */
var DeviceCodeClient = /** @class */ (function (_super) {
    __extends(DeviceCodeClient, _super);
    function DeviceCodeClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Gets device code from device code endpoint, calls back to with device code response, and
     * polls token endpoint to exchange device code for tokens
     * @param request
     */
    DeviceCodeClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceCodeResponse, reqTimestamp, response, responseHandler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDeviceCode(request)];
                    case 1:
                        deviceCodeResponse = _a.sent();
                        request.deviceCodeCallback(deviceCodeResponse);
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.acquireTokenWithDeviceCode(request, deviceCodeResponse)];
                    case 2:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        // Validate response. This function throws a server error if an error is returned by the server.
                        responseHandler.validateTokenResponse(response);
                        return [4 /*yield*/, responseHandler.handleServerTokenResponse(response, this.authority, reqTimestamp, request)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Creates device code request and executes http GET
     * @param request
     */
    DeviceCodeClient.prototype.getDeviceCode = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString, headers, thumbprint;
            return __generator(this, function (_a) {
                queryString = this.createQueryString(request);
                headers = this.createTokenRequestHeaders();
                thumbprint = {
                    clientId: this.config.authOptions.clientId,
                    authority: request.authority,
                    scopes: request.scopes
                };
                return [2 /*return*/, this.executePostRequestToDeviceCodeEndpoint(this.authority.deviceCodeEndpoint, queryString, headers, thumbprint)];
            });
        });
    };
    /**
     * Executes POST request to device code endpoint
     * @param deviceCodeEndpoint
     * @param queryString
     * @param headers
     */
    DeviceCodeClient.prototype.executePostRequestToDeviceCodeEndpoint = function (deviceCodeEndpoint, queryString, headers, thumbprint) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userCode, deviceCode, verificationUri, expiresIn, interval, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.networkManager.sendPostRequest(thumbprint, deviceCodeEndpoint, {
                            body: queryString,
                            headers: headers
                        })];
                    case 1:
                        _a = (_b.sent()).body, userCode = _a.user_code, deviceCode = _a.device_code, verificationUri = _a.verification_uri, expiresIn = _a.expires_in, interval = _a.interval, message = _a.message;
                        return [2 /*return*/, {
                                userCode: userCode,
                                deviceCode: deviceCode,
                                verificationUri: verificationUri,
                                expiresIn: expiresIn,
                                interval: interval,
                                message: message
                            }];
                }
            });
        });
    };
    /**
     * Create device code endpoint query parameters and returns string
     */
    DeviceCodeClient.prototype.createQueryString = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        if (!StringUtils.isEmpty(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * Breaks the polling with specific conditions.
     * @param request CommonDeviceCodeRequest
     * @param deviceCodeResponse DeviceCodeResponse
     */
    DeviceCodeClient.prototype.continuePolling = function (deviceCodeExpirationTime, userSpecifiedTimeout, userSpecifiedCancelFlag) {
        if (userSpecifiedCancelFlag) {
            this.logger.error("Token request cancelled by setting DeviceCodeRequest.cancel = true");
            throw ClientAuthError.createDeviceCodeCancelledError();
        }
        else if (userSpecifiedTimeout && userSpecifiedTimeout < deviceCodeExpirationTime && TimeUtils.nowSeconds() > userSpecifiedTimeout) {
            this.logger.error("User defined timeout for device code polling reached. The timeout was set for " + userSpecifiedTimeout);
            throw ClientAuthError.createUserTimeoutReachedError();
        }
        else if (TimeUtils.nowSeconds() > deviceCodeExpirationTime) {
            if (userSpecifiedTimeout) {
                this.logger.verbose("User specified timeout ignored as the device code has expired before the timeout elapsed. The user specified timeout was set for " + userSpecifiedTimeout);
            }
            this.logger.error("Device code expired. Expiration time of device code was " + deviceCodeExpirationTime);
            throw ClientAuthError.createDeviceCodeExpiredError();
        }
        return true;
    };
    /**
     * Creates token request with device code response and polls token endpoint at interval set by the device code
     * response
     * @param request
     * @param deviceCodeResponse
     */
    DeviceCodeClient.prototype.acquireTokenWithDeviceCode = function (request, deviceCodeResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, headers, userSpecifiedTimeout, deviceCodeExpirationTime, pollingIntervalMilli, thumbprint, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestBody = this.createTokenRequestBody(request, deviceCodeResponse);
                        headers = this.createTokenRequestHeaders();
                        userSpecifiedTimeout = request.timeout ? TimeUtils.nowSeconds() + request.timeout : undefined;
                        deviceCodeExpirationTime = TimeUtils.nowSeconds() + deviceCodeResponse.expiresIn;
                        pollingIntervalMilli = deviceCodeResponse.interval * 1000;
                        _a.label = 1;
                    case 1:
                        if (!this.continuePolling(deviceCodeExpirationTime, userSpecifiedTimeout, request.cancel)) return [3 /*break*/, 6];
                        thumbprint = {
                            clientId: this.config.authOptions.clientId,
                            authority: request.authority,
                            scopes: request.scopes
                        };
                        return [4 /*yield*/, this.executePostToTokenEndpoint(this.authority.tokenEndpoint, requestBody, headers, thumbprint)];
                    case 2:
                        response = _a.sent();
                        if (!(response.body && response.body.error === Constants.AUTHORIZATION_PENDING)) return [3 /*break*/, 4];
                        // user authorization is pending. Sleep for polling interval and try again
                        this.logger.info(response.body.error_description || "Authorization pending. Continue polling.");
                        return [4 /*yield*/, TimeUtils.delay(pollingIntervalMilli)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.logger.verbose("Authorization completed successfully. Polling stopped.");
                        return [2 /*return*/, response.body];
                    case 5: return [3 /*break*/, 1];
                    case 6:
                        /*
                         * The above code should've thrown by this point, but to satisfy TypeScript,
                         * and in the rare case the conditionals in continuePolling() may not catch everything...
                         */
                        this.logger.error("Polling stopped for unknown reasons.");
                        throw ClientAuthError.createDeviceCodeUnknownError();
                }
            });
        });
    };
    /**
     * Creates query parameters and converts to string.
     * @param request
     * @param deviceCodeResponse
     */
    DeviceCodeClient.prototype.createTokenRequestBody = function (request, deviceCodeResponse) {
        var requestParameters = new RequestParameterBuilder();
        requestParameters.addScopes(request.scopes);
        requestParameters.addClientId(this.config.authOptions.clientId);
        requestParameters.addGrantType(GrantType.DEVICE_CODE_GRANT);
        requestParameters.addDeviceCode(deviceCodeResponse.deviceCode);
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        requestParameters.addCorrelationId(correlationId);
        requestParameters.addClientInfo();
        requestParameters.addLibraryInfo(this.config.libraryInfo);
        requestParameters.addThrottling();
        if (this.serverTelemetryManager) {
            requestParameters.addServerTelemetry(this.serverTelemetryManager);
        }
        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
            requestParameters.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return requestParameters.createQueryString();
    };
    return DeviceCodeClient;
}(BaseClient));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * OAuth2.0 refresh token client
 */
var RefreshTokenClient = /** @class */ (function (_super) {
    __extends(RefreshTokenClient, _super);
    function RefreshTokenClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    RefreshTokenClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var reqTimestamp, response, responseHandler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.executeTokenRequest(request, this.authority)];
                    case 1:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        responseHandler.validateTokenResponse(response.body);
                        return [2 /*return*/, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, undefined, undefined, true)];
                }
            });
        });
    };
    /**
     * Gets cached refresh token and attaches to request, then calls acquireToken API
     * @param request
     */
    RefreshTokenClient.prototype.acquireTokenByRefreshToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var isFOCI, noFamilyRTInCache, clientMismatchErrorWithFamilyRT;
            return __generator(this, function (_a) {
                // Cannot renew token if no request object is given.
                if (!request) {
                    throw ClientConfigurationError.createEmptyTokenRequestError();
                }
                // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
                if (!request.account) {
                    throw ClientAuthError.createNoAccountInSilentRequestError();
                }
                isFOCI = this.cacheManager.isAppMetadataFOCI(request.account.environment, this.config.authOptions.clientId);
                // if the app is part of the family, retrive a Family refresh token if present and make a refreshTokenRequest
                if (isFOCI) {
                    try {
                        return [2 /*return*/, this.acquireTokenWithCachedRefreshToken(request, true)];
                    }
                    catch (e) {
                        noFamilyRTInCache = e instanceof ClientAuthError && e.errorCode === ClientAuthErrorMessage.noTokensFoundError.code;
                        clientMismatchErrorWithFamilyRT = e instanceof ServerError && e.errorCode === Errors.INVALID_GRANT_ERROR && e.subError === Errors.CLIENT_MISMATCH_ERROR;
                        // if family Refresh Token (FRT) cache acquisition fails or if client_mismatch error is seen with FRT, reattempt with application Refresh Token (ART)
                        if (noFamilyRTInCache || clientMismatchErrorWithFamilyRT) {
                            return [2 /*return*/, this.acquireTokenWithCachedRefreshToken(request, false)];
                            // throw in all other cases
                        }
                        else {
                            throw e;
                        }
                    }
                }
                // fall back to application refresh token acquisition
                return [2 /*return*/, this.acquireTokenWithCachedRefreshToken(request, false)];
            });
        });
    };
    /**
     * makes a network call to acquire tokens by exchanging RefreshToken available in userCache; throws if refresh token is not cached
     * @param request
     */
    RefreshTokenClient.prototype.acquireTokenWithCachedRefreshToken = function (request, foci) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, refreshTokenRequest;
            return __generator(this, function (_a) {
                refreshToken = this.cacheManager.readRefreshTokenFromCache(this.config.authOptions.clientId, request.account, foci);
                // no refresh Token
                if (!refreshToken) {
                    throw ClientAuthError.createNoTokensFoundError();
                }
                refreshTokenRequest = __assign(__assign({}, request), { refreshToken: refreshToken.secret, authenticationScheme: request.authenticationScheme || exports.AuthenticationScheme.BEARER, ccsCredential: {
                        credential: request.account.homeAccountId,
                        type: exports.CcsCredentialType.HOME_ACCOUNT_ID
                    } });
                return [2 /*return*/, this.acquireToken(refreshTokenRequest)];
            });
        });
    };
    /**
     * Constructs the network message and makes a NW call to the underlying secure token service
     * @param request
     * @param authority
     */
    RefreshTokenClient.prototype.executeTokenRequest = function (request, authority) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, queryParameters, headers, thumbprint, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTokenRequestBody(request)];
                    case 1:
                        requestBody = _a.sent();
                        queryParameters = this.createTokenQueryParameters(request);
                        headers = this.createTokenRequestHeaders(request.ccsCredential);
                        thumbprint = {
                            clientId: this.config.authOptions.clientId,
                            authority: authority.canonicalAuthority,
                            scopes: request.scopes
                        };
                        endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParameters);
                        return [2 /*return*/, this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint)];
                }
            });
        });
    };
    /**
     * Creates query string for the /token request
     * @param request
     */
    RefreshTokenClient.prototype.createTokenQueryParameters = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        if (request.tokenQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenQueryParameters);
        }
        return parameterBuilder.createQueryString();
    };
    /**
     * Helper function to create the token request body
     * @param request
     */
    RefreshTokenClient.prototype.createTokenRequestBody = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var parameterBuilder, correlationId, clientAssertion, popTokenGenerator, _a, _b, clientInfo;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        parameterBuilder = new RequestParameterBuilder();
                        parameterBuilder.addClientId(this.config.authOptions.clientId);
                        parameterBuilder.addScopes(request.scopes);
                        parameterBuilder.addGrantType(GrantType.REFRESH_TOKEN_GRANT);
                        parameterBuilder.addClientInfo();
                        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
                        parameterBuilder.addThrottling();
                        if (this.serverTelemetryManager) {
                            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
                        }
                        correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
                        parameterBuilder.addCorrelationId(correlationId);
                        parameterBuilder.addRefreshToken(request.refreshToken);
                        if (this.config.clientCredentials.clientSecret) {
                            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
                        }
                        if (this.config.clientCredentials.clientAssertion) {
                            clientAssertion = this.config.clientCredentials.clientAssertion;
                            parameterBuilder.addClientAssertion(clientAssertion.assertion);
                            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
                        }
                        if (!(request.authenticationScheme === exports.AuthenticationScheme.POP)) return [3 /*break*/, 2];
                        popTokenGenerator = new PopTokenGenerator(this.cryptoUtils);
                        _b = (_a = parameterBuilder).addPopToken;
                        return [4 /*yield*/, popTokenGenerator.generateCnf(request)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 2;
                    case 2:
                        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
                            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
                        }
                        if (this.config.systemOptions.preventCorsPreflight && request.ccsCredential) {
                            switch (request.ccsCredential.type) {
                                case exports.CcsCredentialType.HOME_ACCOUNT_ID:
                                    try {
                                        clientInfo = buildClientInfoFromHomeAccountId(request.ccsCredential.credential);
                                        parameterBuilder.addCcsOid(clientInfo);
                                    }
                                    catch (e) {
                                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                                    }
                                    break;
                                case exports.CcsCredentialType.UPN:
                                    parameterBuilder.addCcsUpn(request.ccsCredential.credential);
                                    break;
                            }
                        }
                        return [2 /*return*/, parameterBuilder.createQueryString()];
                }
            });
        });
    };
    return RefreshTokenClient;
}(BaseClient));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * OAuth2.0 client credential grant
 */
var ClientCredentialClient = /** @class */ (function (_super) {
    __extends(ClientCredentialClient, _super);
    function ClientCredentialClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Public API to acquire a token with ClientCredential Flow for Confidential clients
     * @param request
     */
    ClientCredentialClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedAuthenticationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.scopeSet = new ScopeSet(request.scopes || []);
                        if (!request.skipCache) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.executeTokenRequest(request, this.authority)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.getCachedAuthenticationResult(request)];
                    case 3:
                        cachedAuthenticationResult = _a.sent();
                        if (!cachedAuthenticationResult) return [3 /*break*/, 4];
                        return [2 /*return*/, cachedAuthenticationResult];
                    case 4: return [4 /*yield*/, this.executeTokenRequest(request, this.authority)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * looks up cache if the tokens are cached already
     */
    ClientCredentialClient.prototype.getCachedAuthenticationResult = function (request) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var cachedAccessToken;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cachedAccessToken = this.readAccessTokenFromCache();
                        if (!cachedAccessToken) {
                            (_a = this.serverTelemetryManager) === null || _a === void 0 ? void 0 : _a.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
                            return [2 /*return*/, null];
                        }
                        if (TimeUtils.isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
                            (_b = this.serverTelemetryManager) === null || _b === void 0 ? void 0 : _b.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, {
                                account: null,
                                idToken: null,
                                accessToken: cachedAccessToken,
                                refreshToken: null,
                                appMetadata: null
                            }, true, request)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    /**
     * Reads access token from the cache
     * TODO: Move this call to cacheManager instead
     */
    ClientCredentialClient.prototype.readAccessTokenFromCache = function () {
        var accessTokenFilter = {
            homeAccountId: "",
            environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
            credentialType: exports.CredentialType.ACCESS_TOKEN,
            clientId: this.config.authOptions.clientId,
            realm: this.authority.tenant,
            target: this.scopeSet.printScopesLowerCase()
        };
        var credentialCache = this.cacheManager.getCredentialsFilteredBy(accessTokenFilter);
        var accessTokens = Object.keys(credentialCache.accessTokens).map(function (key) { return credentialCache.accessTokens[key]; });
        if (accessTokens.length < 1) {
            return null;
        }
        else if (accessTokens.length > 1) {
            throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return accessTokens[0];
    };
    /**
     * Makes a network call to request the token from the service
     * @param request
     * @param authority
     */
    ClientCredentialClient.prototype.executeTokenRequest = function (request, authority) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, headers, thumbprint, reqTimestamp, response, responseHandler, tokenResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestBody = this.createTokenRequestBody(request);
                        headers = this.createTokenRequestHeaders();
                        thumbprint = {
                            clientId: this.config.authOptions.clientId,
                            authority: request.authority,
                            scopes: request.scopes
                        };
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.executePostToTokenEndpoint(authority.tokenEndpoint, requestBody, headers, thumbprint)];
                    case 1:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        responseHandler.validateTokenResponse(response.body);
                        return [4 /*yield*/, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request)];
                    case 2:
                        tokenResponse = _a.sent();
                        return [2 /*return*/, tokenResponse];
                }
            });
        });
    };
    /**
     * generate the request to the server in the acceptable format
     * @param request
     */
    ClientCredentialClient.prototype.createTokenRequestBody = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes, false);
        parameterBuilder.addGrantType(GrantType.CLIENT_CREDENTIALS_GRANT);
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            var clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(clientAssertion.assertion);
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return parameterBuilder.createQueryString();
    };
    return ClientCredentialClient;
}(BaseClient));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * On-Behalf-Of client
 */
var OnBehalfOfClient = /** @class */ (function (_super) {
    __extends(OnBehalfOfClient, _super);
    function OnBehalfOfClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Public API to acquire tokens with on behalf of flow
     * @param request
     */
    OnBehalfOfClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedAuthenticationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.scopeSet = new ScopeSet(request.scopes || []);
                        if (!request.skipCache) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.executeTokenRequest(request, this.authority)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.getCachedAuthenticationResult(request)];
                    case 3:
                        cachedAuthenticationResult = _a.sent();
                        if (!cachedAuthenticationResult) return [3 /*break*/, 4];
                        return [2 /*return*/, cachedAuthenticationResult];
                    case 4: return [4 /*yield*/, this.executeTokenRequest(request, this.authority)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * look up cache for tokens
     * @param request
     */
    OnBehalfOfClient.prototype.getCachedAuthenticationResult = function (request) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cachedAccessToken, cachedIdToken, idTokenObject, cachedAccount, localAccountId, accountInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cachedAccessToken = this.readAccessTokenFromCache();
                        if (!cachedAccessToken ||
                            TimeUtils.isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
                            // Update the server telemetry outcome
                            (_a = this.serverTelemetryManager) === null || _a === void 0 ? void 0 : _a.setCacheOutcome(!cachedAccessToken ? CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED : CacheOutcome.NO_CACHED_ACCESS_TOKEN);
                            return [2 /*return*/, null];
                        }
                        cachedIdToken = this.readIdTokenFromCache(request);
                        cachedAccount = null;
                        if (cachedIdToken) {
                            idTokenObject = new AuthToken(cachedIdToken.secret, this.config.cryptoInterface);
                            localAccountId = idTokenObject.claims.oid ? idTokenObject.claims.oid : idTokenObject.claims.sub;
                            accountInfo = {
                                homeAccountId: cachedIdToken.homeAccountId,
                                environment: cachedIdToken.environment,
                                tenantId: cachedIdToken.realm,
                                username: Constants.EMPTY_STRING,
                                localAccountId: localAccountId || ""
                            };
                            cachedAccount = this.readAccountFromCache(accountInfo);
                        }
                        return [4 /*yield*/, ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, {
                                account: cachedAccount,
                                accessToken: cachedAccessToken,
                                idToken: cachedIdToken,
                                refreshToken: null,
                                appMetadata: null
                            }, true, request, idTokenObject)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * read access token from cache TODO: CacheManager API should be used here
     * @param request
     */
    OnBehalfOfClient.prototype.readAccessTokenFromCache = function () {
        var accessTokenFilter = {
            environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
            credentialType: exports.CredentialType.ACCESS_TOKEN,
            clientId: this.config.authOptions.clientId,
            realm: this.authority.tenant,
            target: this.scopeSet.printScopesLowerCase(),
        };
        var credentialCache = this.cacheManager.getCredentialsFilteredBy(accessTokenFilter);
        var accessTokens = Object.keys(credentialCache.accessTokens).map(function (key) { return credentialCache.accessTokens[key]; });
        var numAccessTokens = accessTokens.length;
        if (numAccessTokens < 1) {
            return null;
        }
        else if (numAccessTokens > 1) {
            throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return accessTokens[0];
    };
    /**
     * read idtoken from cache TODO: CacheManager API should be used here instead
     * @param request
     */
    OnBehalfOfClient.prototype.readIdTokenFromCache = function (request) {
        var idTokenFilter = {
            environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
            credentialType: exports.CredentialType.ID_TOKEN,
            clientId: this.config.authOptions.clientId,
            realm: this.authority.tenant,
            oboAssertion: request.oboAssertion
        };
        var credentialCache = this.cacheManager.getCredentialsFilteredBy(idTokenFilter);
        var idTokens = Object.keys(credentialCache.idTokens).map(function (key) { return credentialCache.idTokens[key]; });
        // When acquiring a token on behalf of an application, there might not be an id token in the cache
        if (idTokens.length < 1) {
            return null;
        }
        return idTokens[0];
    };
    /**
     * read account from cache, TODO: CacheManager API should be used here instead
     * @param account
     */
    OnBehalfOfClient.prototype.readAccountFromCache = function (account) {
        return this.cacheManager.readAccountFromCache(account);
    };
    /**
     * Make a network call to the server requesting credentials
     * @param request
     * @param authority
     */
    OnBehalfOfClient.prototype.executeTokenRequest = function (request, authority) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, headers, thumbprint, reqTimestamp, response, responseHandler, tokenResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestBody = this.createTokenRequestBody(request);
                        headers = this.createTokenRequestHeaders();
                        thumbprint = {
                            clientId: this.config.authOptions.clientId,
                            authority: request.authority,
                            scopes: request.scopes
                        };
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.executePostToTokenEndpoint(authority.tokenEndpoint, requestBody, headers, thumbprint)];
                    case 1:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        responseHandler.validateTokenResponse(response.body);
                        return [4 /*yield*/, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request)];
                    case 2:
                        tokenResponse = _a.sent();
                        return [2 /*return*/, tokenResponse];
                }
            });
        });
    };
    /**
     * generate a server request in accepable format
     * @param request
     */
    OnBehalfOfClient.prototype.createTokenRequestBody = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addGrantType(GrantType.JWT_BEARER);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        parameterBuilder.addRequestTokenUse(AADServerParamKeys.ON_BEHALF_OF);
        parameterBuilder.addOboAssertion(request.oboAssertion);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            var clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(clientAssertion.assertion);
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        return parameterBuilder.createQueryString();
    };
    return OnBehalfOfClient;
}(BaseClient));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var SilentFlowClient = /** @class */ (function (_super) {
    __extends(SilentFlowClient, _super);
    function SilentFlowClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * Retrieves a token from cache if it is still valid, or uses the cached refresh token to renew
     * the given token and returns the renewed token
     * @param request
     */
    SilentFlowClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, refreshTokenClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.acquireCachedToken(request)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof ClientAuthError && e_1.errorCode === ClientAuthErrorMessage.tokenRefreshRequired.code) {
                            refreshTokenClient = new RefreshTokenClient(this.config);
                            return [2 /*return*/, refreshTokenClient.acquireTokenByRefreshToken(request)];
                        }
                        else {
                            throw e_1;
                        }
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves token from cache or throws an error if it must be refreshed.
     * @param request
     */
    SilentFlowClient.prototype.acquireCachedToken = function (request) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var requestScopes, environment, authScheme, cacheRecord;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // Cannot renew token if no request object is given.
                        if (!request) {
                            throw ClientConfigurationError.createEmptyTokenRequestError();
                        }
                        // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
                        if (!request.account) {
                            throw ClientAuthError.createNoAccountInSilentRequestError();
                        }
                        requestScopes = new ScopeSet(request.scopes || []);
                        environment = request.authority || this.authority.getPreferredCache();
                        authScheme = request.authenticationScheme || exports.AuthenticationScheme.BEARER;
                        cacheRecord = this.cacheManager.readCacheRecord(request.account, this.config.authOptions.clientId, requestScopes, environment, authScheme);
                        if (request.forceRefresh) {
                            // Must refresh due to present force_refresh flag.
                            (_a = this.serverTelemetryManager) === null || _a === void 0 ? void 0 : _a.setCacheOutcome(CacheOutcome.FORCE_REFRESH);
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        else if (!cacheRecord.accessToken) {
                            // Must refresh due to non-existent access_token.
                            (_b = this.serverTelemetryManager) === null || _b === void 0 ? void 0 : _b.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        else if (TimeUtils.wasClockTurnedBack(cacheRecord.accessToken.cachedAt) ||
                            TimeUtils.isTokenExpired(cacheRecord.accessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
                            // Must refresh due to expired access_token.
                            (_c = this.serverTelemetryManager) === null || _c === void 0 ? void 0 : _c.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        else if (cacheRecord.accessToken.refreshOn && TimeUtils.isTokenExpired(cacheRecord.accessToken.refreshOn, 0)) {
                            // Must refresh due to the refresh_in value.
                            (_d = this.serverTelemetryManager) === null || _d === void 0 ? void 0 : _d.setCacheOutcome(CacheOutcome.REFRESH_CACHED_ACCESS_TOKEN);
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        else if (!StringUtils.isEmptyObj(request.claims)) {
                            // Must refresh due to request parameters.
                            throw ClientAuthError.createRefreshRequiredError();
                        }
                        if (this.config.serverTelemetryManager) {
                            this.config.serverTelemetryManager.incrementCacheHits();
                        }
                        return [4 /*yield*/, this.generateResultFromCacheRecord(cacheRecord, request)];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /**
     * Helper function to build response object from the CacheRecord
     * @param cacheRecord
     */
    SilentFlowClient.prototype.generateResultFromCacheRecord = function (cacheRecord, request) {
        return __awaiter(this, void 0, void 0, function () {
            var idTokenObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cacheRecord.idToken) {
                            idTokenObj = new AuthToken(cacheRecord.idToken.secret, this.config.cryptoInterface);
                        }
                        return [4 /*yield*/, ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, cacheRecord, true, request, idTokenObj)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SilentFlowClient;
}(BaseClient));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Oauth2.0 Password grant client
 * Note: We are only supporting public clients for password grant and for purely testing purposes
 */
var UsernamePasswordClient = /** @class */ (function (_super) {
    __extends(UsernamePasswordClient, _super);
    function UsernamePasswordClient(configuration) {
        return _super.call(this, configuration) || this;
    }
    /**
     * API to acquire a token by passing the username and password to the service in exchage of credentials
     * password_grant
     * @param request
     */
    UsernamePasswordClient.prototype.acquireToken = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var reqTimestamp, response, responseHandler, tokenResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("in acquireToken call");
                        reqTimestamp = TimeUtils.nowSeconds();
                        return [4 /*yield*/, this.executeTokenRequest(this.authority, request)];
                    case 1:
                        response = _a.sent();
                        responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                        // Validate response. This function throws a server error if an error is returned by the server.
                        responseHandler.validateTokenResponse(response.body);
                        tokenResponse = responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request);
                        return [2 /*return*/, tokenResponse];
                }
            });
        });
    };
    /**
     * Executes POST request to token endpoint
     * @param authority
     * @param request
     */
    UsernamePasswordClient.prototype.executeTokenRequest = function (authority, request) {
        return __awaiter(this, void 0, void 0, function () {
            var thumbprint, requestBody, headers;
            return __generator(this, function (_a) {
                thumbprint = {
                    clientId: this.config.authOptions.clientId,
                    authority: authority.canonicalAuthority,
                    scopes: request.scopes
                };
                requestBody = this.createTokenRequestBody(request);
                headers = this.createTokenRequestHeaders({
                    credential: request.username,
                    type: exports.CcsCredentialType.UPN
                });
                return [2 /*return*/, this.executePostToTokenEndpoint(authority.tokenEndpoint, requestBody, headers, thumbprint)];
            });
        });
    };
    /**
     * Generates a map for all the params to be sent to the service
     * @param request
     */
    UsernamePasswordClient.prototype.createTokenRequestBody = function (request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addUsername(request.username);
        parameterBuilder.addPassword(request.password);
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addGrantType(GrantType.RESOURCE_OWNER_PASSWORD_GRANT);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            var clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(clientAssertion.assertion);
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (this.config.systemOptions.preventCorsPreflight && request.username) {
            parameterBuilder.addCcsUpn(request.username);
        }
        return parameterBuilder.createQueryString();
    };
    return UsernamePasswordClient;
}(BaseClient));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isOpenIdConfigResponse(response) {
    return (response.hasOwnProperty("authorization_endpoint") &&
        response.hasOwnProperty("token_endpoint") &&
        response.hasOwnProperty("end_session_endpoint") &&
        response.hasOwnProperty("issuer"));
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Protocol modes supported by MSAL.
 */
exports.ProtocolMode = void 0;
(function (ProtocolMode) {
    ProtocolMode["AAD"] = "AAD";
    ProtocolMode["OIDC"] = "OIDC";
})(exports.ProtocolMode || (exports.ProtocolMode = {}));

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var AuthorityMetadataEntity = /** @class */ (function () {
    function AuthorityMetadataEntity() {
        this.expiresAt = TimeUtils.nowSeconds() + AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
    }
    /**
     * Update the entity with new aliases, preferred_cache and preferred_network values
     * @param metadata
     * @param fromNetwork
     */
    AuthorityMetadataEntity.prototype.updateCloudDiscoveryMetadata = function (metadata, fromNetwork) {
        this.aliases = metadata.aliases;
        this.preferred_cache = metadata.preferred_cache;
        this.preferred_network = metadata.preferred_network;
        this.aliasesFromNetwork = fromNetwork;
    };
    /**
     * Update the entity with new endpoints
     * @param metadata
     * @param fromNetwork
     */
    AuthorityMetadataEntity.prototype.updateEndpointMetadata = function (metadata, fromNetwork) {
        this.authorization_endpoint = metadata.authorization_endpoint;
        this.token_endpoint = metadata.token_endpoint;
        this.end_session_endpoint = metadata.end_session_endpoint;
        this.issuer = metadata.issuer;
        this.endpointsFromNetwork = fromNetwork;
    };
    /**
     * Save the authority that was used to create this cache entry
     * @param authority
     */
    AuthorityMetadataEntity.prototype.updateCanonicalAuthority = function (authority) {
        this.canonical_authority = authority;
    };
    /**
     * Reset the exiresAt value
     */
    AuthorityMetadataEntity.prototype.resetExpiresAt = function () {
        this.expiresAt = TimeUtils.nowSeconds() + AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
    };
    /**
     * Returns whether or not the data needs to be refreshed
     */
    AuthorityMetadataEntity.prototype.isExpired = function () {
        return this.expiresAt <= TimeUtils.nowSeconds();
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    AuthorityMetadataEntity.isAuthorityMetadataEntity = function (key, entity) {
        if (!entity) {
            return false;
        }
        return (key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) === 0 &&
            entity.hasOwnProperty("aliases") &&
            entity.hasOwnProperty("preferred_cache") &&
            entity.hasOwnProperty("preferred_network") &&
            entity.hasOwnProperty("canonical_authority") &&
            entity.hasOwnProperty("authorization_endpoint") &&
            entity.hasOwnProperty("token_endpoint") &&
            entity.hasOwnProperty("end_session_endpoint") &&
            entity.hasOwnProperty("issuer") &&
            entity.hasOwnProperty("aliasesFromNetwork") &&
            entity.hasOwnProperty("endpointsFromNetwork") &&
            entity.hasOwnProperty("expiresAt"));
    };
    return AuthorityMetadataEntity;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isCloudInstanceDiscoveryResponse(response) {
    return (response.hasOwnProperty("tenant_discovery_endpoint") &&
        response.hasOwnProperty("metadata"));
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var RegionDiscovery = /** @class */ (function () {
    function RegionDiscovery(networkInterface) {
        this.networkInterface = networkInterface;
    }
    /**
     * Detect the region from the application's environment.
     *
     * @returns Promise<string | null>
     */
    RegionDiscovery.prototype.detectRegion = function (environmentRegion, regionDiscoveryMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            var autodetectedRegionName, localIMDSVersionResponse, currentIMDSVersion, currentIMDSVersionResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        autodetectedRegionName = environmentRegion;
                        if (!!autodetectedRegionName) return [3 /*break*/, 8];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.getRegionFromIMDS(Constants.IMDS_VERSION)];
                    case 2:
                        localIMDSVersionResponse = _a.sent();
                        if (localIMDSVersionResponse.status === ResponseCodes.httpSuccess) {
                            autodetectedRegionName = localIMDSVersionResponse.body;
                            regionDiscoveryMetadata.region_source = RegionDiscoverySources.IMDS;
                        }
                        if (!(localIMDSVersionResponse.status === ResponseCodes.httpBadRequest)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getCurrentVersion()];
                    case 3:
                        currentIMDSVersion = _a.sent();
                        if (!currentIMDSVersion) {
                            regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.getRegionFromIMDS(currentIMDSVersion)];
                    case 4:
                        currentIMDSVersionResponse = _a.sent();
                        if (currentIMDSVersionResponse.status === ResponseCodes.httpSuccess) {
                            autodetectedRegionName = currentIMDSVersionResponse.body;
                            regionDiscoveryMetadata.region_source = RegionDiscoverySources.IMDS;
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        _a.sent();
                        regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
                        return [2 /*return*/, null];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        regionDiscoveryMetadata.region_source = RegionDiscoverySources.ENVIRONMENT_VARIABLE;
                        _a.label = 9;
                    case 9:
                        // If no region was auto detected from the environment or from the IMDS endpoint, mark the attempt as a FAILED_AUTO_DETECTION
                        if (!autodetectedRegionName) {
                            regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
                        }
                        return [2 /*return*/, autodetectedRegionName || null];
                }
            });
        });
    };
    /**
     * Make the call to the IMDS endpoint
     *
     * @param imdsEndpointUrl
     * @returns Promise<NetworkResponse<string>>
     */
    RegionDiscovery.prototype.getRegionFromIMDS = function (version) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.networkInterface.sendGetRequestAsync(Constants.IMDS_ENDPOINT + "?api-version=" + version + "&format=text", RegionDiscovery.IMDS_OPTIONS, Constants.IMDS_TIMEOUT)];
            });
        });
    };
    /**
     * Get the most recent version of the IMDS endpoint available
     *
     * @returns Promise<string | null>
     */
    RegionDiscovery.prototype.getCurrentVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.networkInterface.sendGetRequestAsync(Constants.IMDS_ENDPOINT + "?format=json", RegionDiscovery.IMDS_OPTIONS)];
                    case 1:
                        response = _a.sent();
                        // When IMDS endpoint is called without the api version query param, bad request response comes back with latest version.
                        if (response.status === ResponseCodes.httpBadRequest && response.body && response.body["newest-versions"] && response.body["newest-versions"].length > 0) {
                            return [2 /*return*/, response.body["newest-versions"][0]];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Options for the IMDS endpoint request
    RegionDiscovery.IMDS_OPTIONS = { headers: { "Metadata": "true" } };
    return RegionDiscovery;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The authority class validates the authority URIs used by the user, and retrieves the OpenID Configuration Data from the
 * endpoint. It will store the pertinent config data in this object for use during token calls.
 */
var Authority = /** @class */ (function () {
    function Authority(authority, networkInterface, cacheManager, authorityOptions) {
        this.canonicalAuthority = authority;
        this._canonicalAuthority.validateAsUri();
        this.networkInterface = networkInterface;
        this.cacheManager = cacheManager;
        this.authorityOptions = authorityOptions;
        this.regionDiscovery = new RegionDiscovery(networkInterface);
        this.regionDiscoveryMetadata = { region_used: undefined, region_source: undefined, region_outcome: undefined };
    }
    Object.defineProperty(Authority.prototype, "authorityType", {
        // See above for AuthorityType
        get: function () {
            var pathSegments = this.canonicalAuthorityUrlComponents.PathSegments;
            if (pathSegments.length && pathSegments[0].toLowerCase() === Constants.ADFS) {
                return exports.AuthorityType.Adfs;
            }
            return exports.AuthorityType.Default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "protocolMode", {
        /**
         * ProtocolMode enum representing the way endpoints are constructed.
         */
        get: function () {
            return this.authorityOptions.protocolMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "options", {
        /**
         * Returns authorityOptions which can be used to reinstantiate a new authority instance
         */
        get: function () {
            return this.authorityOptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "canonicalAuthority", {
        /**
         * A URL that is the authority set by the developer
         */
        get: function () {
            return this._canonicalAuthority.urlString;
        },
        /**
         * Sets canonical authority.
         */
        set: function (url) {
            this._canonicalAuthority = new UrlString(url);
            this._canonicalAuthority.validateAsUri();
            this._canonicalAuthorityUrlComponents = null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "canonicalAuthorityUrlComponents", {
        /**
         * Get authority components.
         */
        get: function () {
            if (!this._canonicalAuthorityUrlComponents) {
                this._canonicalAuthorityUrlComponents = this._canonicalAuthority.getUrlComponents();
            }
            return this._canonicalAuthorityUrlComponents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "hostnameAndPort", {
        /**
         * Get hostname and port i.e. login.microsoftonline.com
         */
        get: function () {
            return this.canonicalAuthorityUrlComponents.HostNameAndPort.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "tenant", {
        /**
         * Get tenant for authority.
         */
        get: function () {
            return this.canonicalAuthorityUrlComponents.PathSegments[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "authorizationEndpoint", {
        /**
         * OAuth /authorize endpoint for requests
         */
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.authorization_endpoint);
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "tokenEndpoint", {
        /**
         * OAuth /token endpoint for requests
         */
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.token_endpoint);
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "deviceCodeEndpoint", {
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "endSessionEndpoint", {
        /**
         * OAuth logout endpoint for requests
         */
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.end_session_endpoint);
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "selfSignedJwtAudience", {
        /**
         * OAuth issuer for requests
         */
        get: function () {
            if (this.discoveryComplete()) {
                var endpoint = this.replacePath(this.metadata.issuer);
                return this.replaceTenant(endpoint);
            }
            else {
                throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Replaces tenant in url path with current tenant. Defaults to common.
     * @param urlString
     */
    Authority.prototype.replaceTenant = function (urlString) {
        return urlString.replace(/{tenant}|{tenantid}/g, this.tenant);
    };
    /**
     * Replaces path such as tenant or policy with the current tenant or policy.
     * @param urlString
     */
    Authority.prototype.replacePath = function (urlString) {
        var endpoint = urlString;
        var cachedAuthorityUrl = new UrlString(this.metadata.canonical_authority);
        var cachedAuthorityParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
        var currentAuthorityParts = this.canonicalAuthorityUrlComponents.PathSegments;
        currentAuthorityParts.forEach(function (currentPart, index) {
            var cachedPart = cachedAuthorityParts[index];
            if (currentPart !== cachedPart) {
                endpoint = endpoint.replace("/" + cachedPart + "/", "/" + currentPart + "/");
            }
        });
        return endpoint;
    };
    Object.defineProperty(Authority.prototype, "defaultOpenIdConfigurationEndpoint", {
        /**
         * The default open id configuration endpoint for any canonical authority.
         */
        get: function () {
            if (this.authorityType === exports.AuthorityType.Adfs || this.protocolMode === exports.ProtocolMode.OIDC) {
                return this.canonicalAuthority + ".well-known/openid-configuration";
            }
            return this.canonicalAuthority + "v2.0/.well-known/openid-configuration";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Boolean that returns whethr or not tenant discovery has been completed.
     */
    Authority.prototype.discoveryComplete = function () {
        return !!this.metadata;
    };
    /**
     * Perform endpoint discovery to discover aliases, preferred_cache, preferred_network
     * and the /authorize, /token and logout endpoints.
     */
    Authority.prototype.resolveEndpointsAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metadataEntity, cloudDiscoverySource, endpointSource, cacheKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadataEntity = this.cacheManager.getAuthorityMetadataByAlias(this.hostnameAndPort);
                        if (!metadataEntity) {
                            metadataEntity = new AuthorityMetadataEntity();
                            metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
                        }
                        return [4 /*yield*/, this.updateCloudDiscoveryMetadata(metadataEntity)];
                    case 1:
                        cloudDiscoverySource = _a.sent();
                        this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, metadataEntity.preferred_network);
                        return [4 /*yield*/, this.updateEndpointMetadata(metadataEntity)];
                    case 2:
                        endpointSource = _a.sent();
                        if (cloudDiscoverySource !== AuthorityMetadataSource.CACHE && endpointSource !== AuthorityMetadataSource.CACHE) {
                            // Reset the expiration time unless both values came from a successful cache lookup
                            metadataEntity.resetExpiresAt();
                            metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
                        }
                        cacheKey = this.cacheManager.generateAuthorityMetadataCacheKey(metadataEntity.preferred_cache);
                        this.cacheManager.setAuthorityMetadata(cacheKey, metadataEntity);
                        this.metadata = metadataEntity;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update AuthorityMetadataEntity with new endpoints and return where the information came from
     * @param metadataEntity
     */
    Authority.prototype.updateEndpointMetadata = function (metadataEntity) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var metadata, autodetectedRegionName, azureRegion;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        metadata = this.getEndpointMetadataFromConfig();
                        if (metadata) {
                            metadataEntity.updateEndpointMetadata(metadata, false);
                            return [2 /*return*/, AuthorityMetadataSource.CONFIG];
                        }
                        if (this.isAuthoritySameType(metadataEntity) && metadataEntity.endpointsFromNetwork && !metadataEntity.isExpired()) {
                            // No need to update
                            return [2 /*return*/, AuthorityMetadataSource.CACHE];
                        }
                        return [4 /*yield*/, this.getEndpointMetadataFromNetwork()];
                    case 1:
                        metadata = _b.sent();
                        if (!metadata) return [3 /*break*/, 4];
                        if (!((_a = this.authorityOptions.azureRegionConfiguration) === null || _a === void 0 ? void 0 : _a.azureRegion)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.regionDiscovery.detectRegion(this.authorityOptions.azureRegionConfiguration.environmentRegion, this.regionDiscoveryMetadata)];
                    case 2:
                        autodetectedRegionName = _b.sent();
                        azureRegion = this.authorityOptions.azureRegionConfiguration.azureRegion === Constants.AZURE_REGION_AUTO_DISCOVER_FLAG
                            ? autodetectedRegionName
                            : this.authorityOptions.azureRegionConfiguration.azureRegion;
                        if (this.authorityOptions.azureRegionConfiguration.azureRegion === Constants.AZURE_REGION_AUTO_DISCOVER_FLAG) {
                            this.regionDiscoveryMetadata.region_outcome = autodetectedRegionName ?
                                RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_SUCCESSFUL :
                                RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_FAILED;
                        }
                        else {
                            if (autodetectedRegionName) {
                                this.regionDiscoveryMetadata.region_outcome = (this.authorityOptions.azureRegionConfiguration.azureRegion === autodetectedRegionName) ?
                                    RegionDiscoveryOutcomes.CONFIGURED_MATCHES_DETECTED :
                                    RegionDiscoveryOutcomes.CONFIGURED_NOT_DETECTED;
                            }
                            else {
                                this.regionDiscoveryMetadata.region_outcome = RegionDiscoveryOutcomes.CONFIGURED_NO_AUTO_DETECTION;
                            }
                        }
                        if (azureRegion) {
                            this.regionDiscoveryMetadata.region_used = azureRegion;
                            metadata = Authority.replaceWithRegionalInformation(metadata, azureRegion);
                        }
                        _b.label = 3;
                    case 3:
                        metadataEntity.updateEndpointMetadata(metadata, true);
                        return [2 /*return*/, AuthorityMetadataSource.NETWORK];
                    case 4: throw ClientAuthError.createUnableToGetOpenidConfigError(this.defaultOpenIdConfigurationEndpoint);
                }
            });
        });
    };
    /**
     * Compares the number of url components after the domain to determine if the cached authority metadata can be used for the requested authority
     * Protects against same domain different authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
     * @param metadataEntity
     */
    Authority.prototype.isAuthoritySameType = function (metadataEntity) {
        var cachedAuthorityUrl = new UrlString(metadataEntity.canonical_authority);
        var cachedParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
        return cachedParts.length === this.canonicalAuthorityUrlComponents.PathSegments.length;
    };
    /**
     * Parse authorityMetadata config option
     */
    Authority.prototype.getEndpointMetadataFromConfig = function () {
        if (this.authorityOptions.authorityMetadata) {
            try {
                return JSON.parse(this.authorityOptions.authorityMetadata);
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidAuthorityMetadataError();
            }
        }
        return null;
    };
    /**
     * Gets OAuth endpoints from the given OpenID configuration endpoint.
     */
    Authority.prototype.getEndpointMetadataFromNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.networkInterface.sendGetRequestAsync(this.defaultOpenIdConfigurationEndpoint)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, isOpenIdConfigResponse(response.body) ? response.body : null];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates the AuthorityMetadataEntity with new aliases, preferred_network and preferred_cache and returns where the information was retrived from
     * @param cachedMetadata
     * @param newMetadata
     */
    Authority.prototype.updateCloudDiscoveryMetadata = function (metadataEntity) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = this.getCloudDiscoveryMetadataFromConfig();
                        if (metadata) {
                            metadataEntity.updateCloudDiscoveryMetadata(metadata, false);
                            return [2 /*return*/, AuthorityMetadataSource.CONFIG];
                        }
                        // If The cached metadata came from config but that config was not passed to this instance, we must go to the network
                        if (this.isAuthoritySameType(metadataEntity) && metadataEntity.aliasesFromNetwork && !metadataEntity.isExpired()) {
                            // No need to update
                            return [2 /*return*/, AuthorityMetadataSource.CACHE];
                        }
                        return [4 /*yield*/, this.getCloudDiscoveryMetadataFromNetwork()];
                    case 1:
                        metadata = _a.sent();
                        if (metadata) {
                            metadataEntity.updateCloudDiscoveryMetadata(metadata, true);
                            return [2 /*return*/, AuthorityMetadataSource.NETWORK];
                        }
                        else {
                            // Metadata could not be obtained from config, cache or network
                            throw ClientConfigurationError.createUntrustedAuthorityError();
                        }
                }
            });
        });
    };
    /**
     * Parse cloudDiscoveryMetadata config or check knownAuthorities
     */
    Authority.prototype.getCloudDiscoveryMetadataFromConfig = function () {
        // Check if network response was provided in config
        if (this.authorityOptions.cloudDiscoveryMetadata) {
            try {
                var parsedResponse = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata);
                var metadata = Authority.getCloudDiscoveryMetadataFromNetworkResponse(parsedResponse.metadata, this.hostnameAndPort);
                if (metadata) {
                    return metadata;
                }
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidCloudDiscoveryMetadataError();
            }
        }
        // If cloudDiscoveryMetadata is empty or does not contain the host, check knownAuthorities
        if (this.isInKnownAuthorities()) {
            return Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        return null;
    };
    /**
     * Called to get metadata from network if CloudDiscoveryMetadata was not populated by config
     * @param networkInterface
     */
    Authority.prototype.getCloudDiscoveryMetadataFromNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var instanceDiscoveryEndpoint, match, response, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instanceDiscoveryEndpoint = "" + Constants.AAD_INSTANCE_DISCOVERY_ENDPT + this.canonicalAuthority + "oauth2/v2.0/authorize";
                        match = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.networkInterface.sendGetRequestAsync(instanceDiscoveryEndpoint)];
                    case 2:
                        response = _a.sent();
                        metadata = isCloudInstanceDiscoveryResponse(response.body) ? response.body.metadata : [];
                        if (metadata.length === 0) {
                            // If no metadata is returned, authority is untrusted
                            return [2 /*return*/, null];
                        }
                        match = Authority.getCloudDiscoveryMetadataFromNetworkResponse(metadata, this.hostnameAndPort);
                        return [3 /*break*/, 4];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4:
                        if (!match) {
                            // Custom Domain scenario, host is trusted because Instance Discovery call succeeded 
                            match = Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
                        }
                        return [2 /*return*/, match];
                }
            });
        });
    };
    /**
     * Helper function to determine if this host is included in the knownAuthorities config option
     */
    Authority.prototype.isInKnownAuthorities = function () {
        var _this = this;
        var matches = this.authorityOptions.knownAuthorities.filter(function (authority) {
            return UrlString.getDomainFromUrl(authority).toLowerCase() === _this.hostnameAndPort;
        });
        return matches.length > 0;
    };
    /**
     * Creates cloud discovery metadata object from a given host
     * @param host
     */
    Authority.createCloudDiscoveryMetadataFromHost = function (host) {
        return {
            preferred_network: host,
            preferred_cache: host,
            aliases: [host]
        };
    };
    /**
     * Searches instance discovery network response for the entry that contains the host in the aliases list
     * @param response
     * @param authority
     */
    Authority.getCloudDiscoveryMetadataFromNetworkResponse = function (response, authority) {
        for (var i = 0; i < response.length; i++) {
            var metadata = response[i];
            if (metadata.aliases.indexOf(authority) > -1) {
                return metadata;
            }
        }
        return null;
    };
    /**
     * helper function to generate environment from authority object
     */
    Authority.prototype.getPreferredCache = function () {
        if (this.discoveryComplete()) {
            return this.metadata.preferred_cache;
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    };
    /**
     * Returns whether or not the provided host is an alias of this authority instance
     * @param host
     */
    Authority.prototype.isAlias = function (host) {
        return this.metadata.aliases.indexOf(host) > -1;
    };
    /**
     * Checks whether the provided host is that of a public cloud authority
     *
     * @param authority string
     * @returns bool
     */
    Authority.isPublicCloudAuthority = function (host) {
        return Constants.KNOWN_PUBLIC_CLOUDS.indexOf(host) >= 0;
    };
    /**
     * Rebuild the authority string with the region
     *
     * @param host string
     * @param region string
     */
    Authority.buildRegionalAuthorityString = function (host, region, queryString) {
        // Create and validate a Url string object with the initial authority string
        var authorityUrlInstance = new UrlString(host);
        authorityUrlInstance.validateAsUri();
        var authorityUrlParts = authorityUrlInstance.getUrlComponents();
        var hostNameAndPort = region + "." + authorityUrlParts.HostNameAndPort;
        if (this.isPublicCloudAuthority(authorityUrlParts.HostNameAndPort)) {
            hostNameAndPort = region + "." + Constants.REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX;
        }
        // Include the query string portion of the url
        var url = UrlString.constructAuthorityUriFromObject(__assign(__assign({}, authorityUrlInstance.getUrlComponents()), { HostNameAndPort: hostNameAndPort })).urlString;
        // Add the query string if a query string was provided
        if (queryString)
            return url + "?" + queryString;
        return url;
    };
    /**
     * Replace the endpoints in the metadata object with their regional equivalents.
     *
     * @param metadata OpenIdConfigResponse
     * @param azureRegion string
     */
    Authority.replaceWithRegionalInformation = function (metadata, azureRegion) {
        metadata.authorization_endpoint = Authority.buildRegionalAuthorityString(metadata.authorization_endpoint, azureRegion);
        // TODO: Enquire on whether we should leave the query string or remove it before releasing the feature
        metadata.token_endpoint = Authority.buildRegionalAuthorityString(metadata.token_endpoint, azureRegion, "allowestsrnonmsi=true");
        metadata.end_session_endpoint = Authority.buildRegionalAuthorityString(metadata.end_session_endpoint, azureRegion);
        return metadata;
    };
    return Authority;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var AuthorityFactory = /** @class */ (function () {
    function AuthorityFactory() {
    }
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Also performs endpoint discovery.
     *
     * @param authorityUri
     * @param networkClient
     * @param protocolMode
     */
    AuthorityFactory.createDiscoveredInstance = function (authorityUri, networkClient, cacheManager, authorityOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var acquireTokenAuthority, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        acquireTokenAuthority = AuthorityFactory.createInstance(authorityUri, networkClient, cacheManager, authorityOptions);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, acquireTokenAuthority.resolveEndpointsAsync()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, acquireTokenAuthority];
                    case 3:
                        e_1 = _a.sent();
                        throw ClientAuthError.createEndpointDiscoveryIncompleteError(e_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Does not perform endpoint discovery.
     *
     * @param authorityUrl
     * @param networkInterface
     * @param protocolMode
     */
    AuthorityFactory.createInstance = function (authorityUrl, networkInterface, cacheManager, authorityOptions) {
        // Throw error if authority url is empty
        if (StringUtils.isEmpty(authorityUrl)) {
            throw ClientConfigurationError.createUrlEmptyError();
        }
        return new Authority(authorityUrl, networkInterface, cacheManager, authorityOptions);
    };
    return AuthorityFactory;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ServerTelemetryEntity = /** @class */ (function () {
    function ServerTelemetryEntity() {
        this.failedRequests = [];
        this.errors = [];
        this.cacheHits = 0;
    }
    /**
     * validates if a given cache entry is "Telemetry", parses <key,value>
     * @param key
     * @param entity
     */
    ServerTelemetryEntity.isServerTelemetryEntity = function (key, entity) {
        var validateKey = key.indexOf(SERVER_TELEM_CONSTANTS.CACHE_KEY) === 0;
        var validateEntity = true;
        if (entity) {
            validateEntity =
                entity.hasOwnProperty("failedRequests") &&
                    entity.hasOwnProperty("errors") &&
                    entity.hasOwnProperty("cacheHits");
        }
        return validateKey && validateEntity;
    };
    return ServerTelemetryEntity;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ThrottlingEntity = /** @class */ (function () {
    function ThrottlingEntity() {
    }
    /**
     * validates if a given cache entry is "Throttling", parses <key,value>
     * @param key
     * @param entity
     */
    ThrottlingEntity.isThrottlingEntity = function (key, entity) {
        var validateKey = false;
        if (key) {
            validateKey = key.indexOf(ThrottlingConstants.THROTTLING_PREFIX) === 0;
        }
        var validateEntity = true;
        if (entity) {
            validateEntity = entity.hasOwnProperty("throttleTime");
        }
        return validateKey && validateEntity;
    };
    return ThrottlingEntity;
}());

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var StubbedNetworkModule = {
    sendGetRequestAsync: function () {
        var notImplErr = "Network interface - sendGetRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
    },
    sendPostRequestAsync: function () {
        var notImplErr = "Network interface - sendPostRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
    }
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ServerTelemetryManager = /** @class */ (function () {
    function ServerTelemetryManager(telemetryRequest, cacheManager) {
        this.cacheOutcome = CacheOutcome.NO_CACHE_HIT;
        this.cacheManager = cacheManager;
        this.apiId = telemetryRequest.apiId;
        this.correlationId = telemetryRequest.correlationId;
        this.wrapperSKU = telemetryRequest.wrapperSKU || Constants.EMPTY_STRING;
        this.wrapperVer = telemetryRequest.wrapperVer || Constants.EMPTY_STRING;
        this.telemetryCacheKey = SERVER_TELEM_CONSTANTS.CACHE_KEY + Separators.CACHE_KEY_SEPARATOR + telemetryRequest.clientId;
    }
    /**
     * API to add MSER Telemetry to request
     */
    ServerTelemetryManager.prototype.generateCurrentRequestHeaderValue = function () {
        var request = "" + this.apiId + SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR + this.cacheOutcome;
        var platformFields = [this.wrapperSKU, this.wrapperVer].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        var regionDiscoveryFields = this.getRegionDiscoveryFields();
        var requestWithRegionDiscoveryFields = [request, regionDiscoveryFields].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [SERVER_TELEM_CONSTANTS.SCHEMA_VERSION, requestWithRegionDiscoveryFields, platformFields].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    };
    /**
     * API to add MSER Telemetry for the last failed request
     */
    ServerTelemetryManager.prototype.generateLastRequestHeaderValue = function () {
        var lastRequests = this.getLastRequests();
        var maxErrors = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        var failedRequests = lastRequests.failedRequests.slice(0, 2 * maxErrors).join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        var errors = lastRequests.errors.slice(0, maxErrors).join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        var errorCount = lastRequests.errors.length;
        // Indicate whether this header contains all data or partial data
        var overflow = maxErrors < errorCount ? SERVER_TELEM_CONSTANTS.OVERFLOW_TRUE : SERVER_TELEM_CONSTANTS.OVERFLOW_FALSE;
        var platformFields = [errorCount, overflow].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [SERVER_TELEM_CONSTANTS.SCHEMA_VERSION, lastRequests.cacheHits, failedRequests, errors, platformFields].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    };
    /**
     * API to cache token failures for MSER data capture
     * @param error
     */
    ServerTelemetryManager.prototype.cacheFailedRequest = function (error) {
        var lastRequests = this.getLastRequests();
        if (lastRequests.errors.length >= SERVER_TELEM_CONSTANTS.MAX_CACHED_ERRORS) {
            // Remove a cached error to make room, first in first out
            lastRequests.failedRequests.shift(); // apiId
            lastRequests.failedRequests.shift(); // correlationId
            lastRequests.errors.shift();
        }
        lastRequests.failedRequests.push(this.apiId, this.correlationId);
        if (!StringUtils.isEmpty(error.subError)) {
            lastRequests.errors.push(error.subError);
        }
        else if (!StringUtils.isEmpty(error.errorCode)) {
            lastRequests.errors.push(error.errorCode);
        }
        else if (!!error && error.toString()) {
            lastRequests.errors.push(error.toString());
        }
        else {
            lastRequests.errors.push(SERVER_TELEM_CONSTANTS.UNKNOWN_ERROR);
        }
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return;
    };
    /**
     * Update server telemetry cache entry by incrementing cache hit counter
     */
    ServerTelemetryManager.prototype.incrementCacheHits = function () {
        var lastRequests = this.getLastRequests();
        lastRequests.cacheHits += 1;
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return lastRequests.cacheHits;
    };
    /**
     * Get the server telemetry entity from cache or initialize a new one
     */
    ServerTelemetryManager.prototype.getLastRequests = function () {
        var initialValue = new ServerTelemetryEntity();
        var lastRequests = this.cacheManager.getServerTelemetry(this.telemetryCacheKey);
        return lastRequests || initialValue;
    };
    /**
     * Remove server telemetry cache entry
     */
    ServerTelemetryManager.prototype.clearTelemetryCache = function () {
        var lastRequests = this.getLastRequests();
        var numErrorsFlushed = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        var errorCount = lastRequests.errors.length;
        if (numErrorsFlushed === errorCount) {
            // All errors were sent on last request, clear Telemetry cache
            this.cacheManager.removeItem(this.telemetryCacheKey);
        }
        else {
            // Partial data was flushed to server, construct a new telemetry cache item with errors that were not flushed
            var serverTelemEntity = new ServerTelemetryEntity();
            serverTelemEntity.failedRequests = lastRequests.failedRequests.slice(numErrorsFlushed * 2); // failedRequests contains 2 items for each error
            serverTelemEntity.errors = lastRequests.errors.slice(numErrorsFlushed);
            this.cacheManager.setServerTelemetry(this.telemetryCacheKey, serverTelemEntity);
        }
    };
    /**
     * Returns the maximum number of errors that can be flushed to the server in the next network request
     * @param serverTelemetryEntity
     */
    ServerTelemetryManager.maxErrorsToSend = function (serverTelemetryEntity) {
        var i;
        var maxErrors = 0;
        var dataSize = 0;
        var errorCount = serverTelemetryEntity.errors.length;
        for (i = 0; i < errorCount; i++) {
            // failedRequests parameter contains pairs of apiId and correlationId, multiply index by 2 to preserve pairs
            var apiId = serverTelemetryEntity.failedRequests[2 * i] || Constants.EMPTY_STRING;
            var correlationId = serverTelemetryEntity.failedRequests[2 * i + 1] || Constants.EMPTY_STRING;
            var errorCode = serverTelemetryEntity.errors[i] || Constants.EMPTY_STRING;
            // Count number of characters that would be added to header, each character is 1 byte. Add 3 at the end to account for separators
            dataSize += apiId.toString().length + correlationId.toString().length + errorCode.length + 3;
            if (dataSize < SERVER_TELEM_CONSTANTS.MAX_LAST_HEADER_BYTES) {
                // Adding this entry to the header would still keep header size below the limit
                maxErrors += 1;
            }
            else {
                break;
            }
        }
        return maxErrors;
    };
    /**
     * Get the region discovery fields
     *
     * @returns string
     */
    ServerTelemetryManager.prototype.getRegionDiscoveryFields = function () {
        var regionDiscoveryFields = [];
        regionDiscoveryFields.push(this.regionUsed || "");
        regionDiscoveryFields.push(this.regionSource || "");
        regionDiscoveryFields.push(this.regionOutcome || "");
        return regionDiscoveryFields.join(",");
    };
    /**
     * Update the region discovery metadata
     *
     * @param regionDiscoveryMetadata
     * @returns void
     */
    ServerTelemetryManager.prototype.updateRegionDiscoveryMetadata = function (regionDiscoveryMetadata) {
        this.regionUsed = regionDiscoveryMetadata.region_used;
        this.regionSource = regionDiscoveryMetadata.region_source;
        this.regionOutcome = regionDiscoveryMetadata.region_outcome;
    };
    /**
     * Set cache outcome
     */
    ServerTelemetryManager.prototype.setCacheOutcome = function (cacheOutcome) {
        this.cacheOutcome = cacheOutcome;
    };
    return ServerTelemetryManager;
}());

exports.AccessTokenEntity = AccessTokenEntity;
exports.AccountEntity = AccountEntity;
exports.AppMetadataEntity = AppMetadataEntity;
exports.AuthError = AuthError;
exports.AuthErrorMessage = AuthErrorMessage;
exports.AuthToken = AuthToken;
exports.Authority = Authority;
exports.AuthorityFactory = AuthorityFactory;
exports.AuthorityMetadataEntity = AuthorityMetadataEntity;
exports.AuthorizationCodeClient = AuthorizationCodeClient;
exports.CacheManager = CacheManager;
exports.ClientAuthError = ClientAuthError;
exports.ClientAuthErrorMessage = ClientAuthErrorMessage;
exports.ClientConfigurationError = ClientConfigurationError;
exports.ClientConfigurationErrorMessage = ClientConfigurationErrorMessage;
exports.ClientCredentialClient = ClientCredentialClient;
exports.Constants = Constants;
exports.CredentialEntity = CredentialEntity;
exports.DEFAULT_CRYPTO_IMPLEMENTATION = DEFAULT_CRYPTO_IMPLEMENTATION;
exports.DEFAULT_SYSTEM_OPTIONS = DEFAULT_SYSTEM_OPTIONS;
exports.DefaultStorageClass = DefaultStorageClass;
exports.DeviceCodeClient = DeviceCodeClient;
exports.IdToken = AuthToken;
exports.IdTokenEntity = IdTokenEntity;
exports.InteractionRequiredAuthError = InteractionRequiredAuthError;
exports.Logger = Logger;
exports.NetworkManager = NetworkManager;
exports.OIDC_DEFAULT_SCOPES = OIDC_DEFAULT_SCOPES;
exports.OnBehalfOfClient = OnBehalfOfClient;
exports.PromptValue = PromptValue;
exports.ProtocolUtils = ProtocolUtils;
exports.RefreshTokenClient = RefreshTokenClient;
exports.RefreshTokenEntity = RefreshTokenEntity;
exports.ServerError = ServerError;
exports.ServerTelemetryEntity = ServerTelemetryEntity;
exports.ServerTelemetryManager = ServerTelemetryManager;
exports.SilentFlowClient = SilentFlowClient;
exports.StringUtils = StringUtils;
exports.StubbedNetworkModule = StubbedNetworkModule;
exports.ThrottlingEntity = ThrottlingEntity;
exports.ThrottlingUtils = ThrottlingUtils;
exports.TimeUtils = TimeUtils;
exports.TokenCacheContext = TokenCacheContext;
exports.UrlString = UrlString;
exports.UsernamePasswordClient = UsernamePasswordClient;
//# sourceMappingURL=index.cjs.js.map
