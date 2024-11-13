'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib = require('tslib');
var coreTracing = require('@azure/core-tracing');
var logger$h = require('@azure/logger');
var qs = _interopDefault(require('qs'));
var coreRestPipeline = require('@azure/core-rest-pipeline');
var coreClient = require('@azure/core-client');
var jws = _interopDefault(require('jws'));
var uuid = require('uuid');
var fs = require('fs');
var fs__default = _interopDefault(fs);
var crypto = require('crypto');
var child_process = require('child_process');
var os = _interopDefault(require('os'));
var path = _interopDefault(require('path'));
var msalNode = require('@azure/msal-node');
require('axios');
var open = _interopDefault(require('open'));
var http = _interopDefault(require('http'));
var stoppable = _interopDefault(require('stoppable'));

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
function isErrorResponse(errorResponse) {
    return (errorResponse &&
        typeof errorResponse.error === "string" &&
        typeof errorResponse.error_description === "string");
}
/**
 * This signifies that the credential that was tried in a chained credential
 * was not available to be used as the credential. Rather than treating this as
 * an error that should halt the chain, it's caught and the chain continues
 */
class CredentialUnavailable extends Error {
}
/**
 * The Error.name value of an AuthenticationError
 */
const AuthenticationErrorName = "AuthenticationError";
/**
 * Provides details about a failure to authenticate with Azure Active
 * Directory.  The `errorResponse` field contains more details about
 * the specific failure.
 */
class AuthenticationError extends Error {
    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(statusCode, errorBody) {
        let errorResponse = {
            error: "unknown",
            errorDescription: "An unknown error occurred and no additional details are available."
        };
        if (isErrorResponse(errorBody)) {
            errorResponse = convertOAuthErrorResponseToErrorResponse(errorBody);
        }
        else if (typeof errorBody === "string") {
            try {
                // Most error responses will contain JSON-formatted error details
                // in the response body
                const oauthErrorResponse = JSON.parse(errorBody);
                errorResponse = convertOAuthErrorResponseToErrorResponse(oauthErrorResponse);
            }
            catch (e) {
                if (statusCode === 400) {
                    errorResponse = {
                        error: "authority_not_found",
                        errorDescription: "The specified authority URL was not found."
                    };
                }
                else {
                    errorResponse = {
                        error: "unknown_error",
                        errorDescription: `An unknown error has occurred. Response body:\n\n${errorBody}`
                    };
                }
            }
        }
        else {
            errorResponse = {
                error: "unknown_error",
                errorDescription: "An unknown error occurred and no additional details are available."
            };
        }
        super(`${errorResponse.error}(status code ${statusCode}).\nMore details:\n${errorResponse.errorDescription}`);
        this.statusCode = statusCode;
        this.errorResponse = errorResponse;
        // Ensure that this type reports the correct name
        this.name = AuthenticationErrorName;
    }
}
/**
 * The Error.name value of an AggregateAuthenticationError
 */
const AggregateAuthenticationErrorName = "AggregateAuthenticationError";
/**
 * Provides an `errors` array containing {@link AuthenticationError} instance
 * for authentication failures from credentials in a {@link ChainedTokenCredential}.
 */
class AggregateAuthenticationError extends Error {
    constructor(errors, errorMessage) {
        const errorDetail = errors.join("\n");
        super(`${errorMessage}\n\n${errorDetail}`);
        this.errors = errors;
        // Ensure that this type reports the correct name
        this.name = AggregateAuthenticationErrorName;
    }
}
function convertOAuthErrorResponseToErrorResponse(errorBody) {
    return {
        error: errorBody.error,
        errorDescription: errorBody.error_description,
        correlationId: errorBody.correlation_id,
        errorCodes: errorBody.error_codes,
        timestamp: errorBody.timestamp,
        traceId: errorBody.trace_id
    };
}

// Copyright (c) Microsoft Corporation.
/**
 * Creates a span using the global tracer.
 * @internal
 */
const createSpan = coreTracing.createSpanFunction({
    packagePrefix: "Azure.Identity",
    namespace: "Microsoft.AAD"
});

// Copyright (c) Microsoft Corporation.
/**
 * The AzureLogger used for all clients within the identity package
 */
const logger = logger$h.createClientLogger("identity");
/**
 * Separates a list of environment variable names into a plain object with two arrays: an array of missing environment variables and another array with assigned environment variables.
 * @param supportedEnvVars - List of environment variable names
 */
function processEnvVars(supportedEnvVars) {
    return supportedEnvVars.reduce((acc, envVariable) => {
        if (process.env[envVariable]) {
            acc.assigned.push(envVariable);
        }
        else {
            acc.missing.push(envVariable);
        }
        return acc;
    }, { missing: [], assigned: [] });
}
/**
 * Formatting the success event on the credentials
 */
function formatSuccess(scope) {
    return `SUCCESS. Scopes: ${Array.isArray(scope) ? scope.join(", ") : scope}.`;
}
/**
 * Formatting the success event on the credentials
 */
function formatError(scope, error) {
    let message = "ERROR.";
    if (scope === null || scope === void 0 ? void 0 : scope.length) {
        message += ` Scopes: ${Array.isArray(scope) ? scope.join(", ") : scope}.`;
    }
    return `${message} Error message: ${typeof error === "string" ? error : error.message}.`;
}
/**
 * Generates a CredentialLoggerInstance.
 *
 * It logs with the format:
 *
 *   `[title] => [message]`
 *
 */
function credentialLoggerInstance(title, parent, log = logger) {
    const fullTitle = parent ? `${parent.fullTitle} ${title}` : title;
    function info(message) {
        log.info(`${fullTitle} =>`, message);
    }
    return {
        title,
        fullTitle,
        info
    };
}
/**
 * Generates a CredentialLogger, which is a logger declared at the credential's constructor, and used at any point in the credential.
 * It has all the properties of a CredentialLoggerInstance, plus other logger instances, one per method.
 *
 * It logs with the format:
 *
 *   `[title] => [message]`
 *   `[title] => getToken() => [message]`
 *
 */
function credentialLogger(title, log = logger) {
    const credLogger = credentialLoggerInstance(title, undefined, log);
    return Object.assign(Object.assign({}, credLogger), { getToken: credentialLoggerInstance("=> getToken()", credLogger, log) });
}

// Copyright (c) Microsoft Corporation.
const logger$1 = credentialLogger("ChainedTokenCredential");
/**
 * Enables multiple `TokenCredential` implementations to be tried in order
 * until one of the getToken methods returns an access token.
 */
class ChainedTokenCredential {
    /**
     * Creates an instance of ChainedTokenCredential using the given credentials.
     *
     * @param sources - `TokenCredential` implementations to be tried in order.
     *
     * Example usage:
     * ```javascript
     * const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
     * const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
     * const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
     * ```
     */
    constructor(...sources) {
        /**
         * The message to use when the chained token fails to get a token
         */
        this.UnavailableMessage = "ChainedTokenCredential => failed to retrieve a token from the included credentials";
        this._sources = [];
        this._sources = sources;
    }
    /**
     * Returns the first access token returned by one of the chained
     * `TokenCredential` implementations.  Throws an {@link AggregateAuthenticationError}
     * when one or more credentials throws an {@link AuthenticationError} and
     * no credentials have returned an access token.
     *
     * This method is called automatically by Azure SDK client libraries. You may call this method
     * directly, but you must also handle token caching and token refreshing.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */
    getToken(scopes, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            let token = null;
            const errors = [];
            const { span, updatedOptions: newOptions } = createSpan("ChainedTokenCredential-getToken", options);
            for (let i = 0; i < this._sources.length && token === null; i++) {
                try {
                    token = yield this._sources[i].getToken(scopes, newOptions);
                }
                catch (err) {
                    if (err instanceof CredentialUnavailable) {
                        errors.push(err);
                    }
                    else {
                        logger$1.getToken.info(formatError(scopes, err));
                        throw err;
                    }
                }
            }
            if (!token && errors.length > 0) {
                const err = new AggregateAuthenticationError(errors);
                span.setStatus({
                    code: coreTracing.SpanStatusCode.ERROR,
                    message: err.message
                });
                logger$1.getToken.info(formatError(scopes, err));
                throw err;
            }
            span.end();
            logger$1.getToken.info(formatSuccess(scopes));
            return token;
        });
    }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
function getIdentityTokenEndpointSuffix(tenantId) {
    if (tenantId === "adfs") {
        return "oauth2/token";
    }
    else {
        return "oauth2/v2.0/token";
    }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * The default client ID for authentication
 * @internal
 */
// TODO: temporary - this is the Azure CLI clientID - we'll replace it when
// Developer Sign On application is available
// https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/identity/Azure.Identity/src/Constants.cs#L9
const DeveloperSignOnClientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";
/**
 * The default tenant for authentication
 * @internal
 */
const DefaultTenantId = "common";
(function (AzureAuthorityHosts) {
    /**
     * China-based Azure Authority Host
     */
    AzureAuthorityHosts["AzureChina"] = "https://login.chinacloudapi.cn";
    /**
     * Germany-based Azure Authority Host
     */
    AzureAuthorityHosts["AzureGermany"] = "https://login.microsoftonline.de";
    /**
     * US Government Azure Authority Host
     */
    AzureAuthorityHosts["AzureGovernment"] = "https://login.microsoftonline.us";
    /**
     * Public Cloud Azure Authority Host
     */
    AzureAuthorityHosts["AzurePublicCloud"] = "https://login.microsoftonline.com";
})(exports.AzureAuthorityHosts || (exports.AzureAuthorityHosts = {}));
/**
 * The default authority host.
 * @internal
 */
const DefaultAuthorityHost = exports.AzureAuthorityHosts.AzurePublicCloud;

// Copyright (c) Microsoft Corporation.
/**
 * Safe JSON parse.
 * @internal
 */
function parse(input) {
    if (!input) {
        return {};
    }
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return {};
    }
}
/**
 * @internal
 */
function getIdentityClientAuthorityHost(options) {
    // The authorityHost can come from options or from the AZURE_AUTHORITY_HOST environment variable.
    let authorityHost = options === null || options === void 0 ? void 0 : options.authorityHost;
    // The AZURE_AUTHORITY_HOST environment variable can only be provided in NodeJS.
    {
        authorityHost = authorityHost !== null && authorityHost !== void 0 ? authorityHost : process.env.AZURE_AUTHORITY_HOST;
    }
    // If the authorityHost is not provided, we use the default one from the public cloud: https://login.microsoftonline.com
    return authorityHost !== null && authorityHost !== void 0 ? authorityHost : DefaultAuthorityHost;
}
/**
 * The network module used by the Identity credentials.
 *
 * It allows for credentials to abort any pending request independently of the MSAL flow,
 * by calling to the `abortRequests()` method.
 *
 */
class IdentityClient extends coreClient.ServiceClient {
    constructor(options) {
        var _a;
        const packageDetails = `azsdk-js-identity/1.5.2`;
        const userAgentPrefix = ((_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix) ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
            : `${packageDetails}`;
        const baseUri = getIdentityClientAuthorityHost(options);
        if (!baseUri.startsWith("https:")) {
            throw new Error("The authorityHost address must use the 'https' protocol.");
        }
        super(Object.assign(Object.assign({ requestContentType: "application/json; charset=utf-8" }, options), { userAgentOptions: {
                userAgentPrefix
            }, baseUri }));
        this.authorityHost = baseUri;
    }
    sendTokenRequest(request, expiresOnParser) {
        var _a;
        return tslib.__awaiter(this, void 0, void 0, function* () {
            logger.info(`IdentityClient: sending token request to [${request.url}]`);
            const response = yield this.sendRequest(request);
            expiresOnParser =
                expiresOnParser ||
                    ((responseBody) => {
                        return Date.now() + responseBody.expires_in * 1000;
                    });
            if (response.bodyAsText && (response.status === 200 || response.status === 201)) {
                const parsedBody = parse(response.bodyAsText);
                const token = {
                    accessToken: {
                        token: (_a = parsedBody.token) !== null && _a !== void 0 ? _a : parsedBody.access_token,
                        expiresOnTimestamp: expiresOnParser(parsedBody)
                    },
                    refreshToken: parsedBody.refresh_token
                };
                logger.info(`IdentityClient: [${request.url}] token acquired, expires on ${token.accessToken.expiresOnTimestamp}`);
                return token;
            }
            else {
                const error = new AuthenticationError(response.status, response.bodyAsText);
                logger.warning(`IdentityClient: authentication error. HTTP status: ${response.status}, ${error.errorResponse.errorDescription}`);
                throw error;
            }
        });
    }
    refreshAccessToken(tenantId, clientId, scopes, refreshToken, clientSecret, expiresOnParser, options) {
        var _a, _b;
        return tslib.__awaiter(this, void 0, void 0, function* () {
            if (refreshToken === undefined) {
                return null;
            }
            logger.info(`IdentityClient: refreshing access token with client ID: ${clientId}, scopes: ${scopes} started`);
            const { span, updatedOptions } = createSpan("IdentityClient-refreshAccessToken", options);
            const refreshParams = {
                grant_type: "refresh_token",
                client_id: clientId,
                refresh_token: refreshToken,
                scope: scopes
            };
            if (clientSecret !== undefined) {
                refreshParams.client_secret = clientSecret;
            }
            try {
                const urlSuffix = getIdentityTokenEndpointSuffix(tenantId);
                const webResource = coreRestPipeline.createPipelineRequest({
                    url: `${this.authorityHost}/${tenantId}/${urlSuffix}`,
                    method: "POST",
                    body: qs.stringify(refreshParams),
                    abortSignal: options && options.abortSignal,
                    headers: coreRestPipeline.createHttpHeaders({
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }),
                    tracingOptions: {
                        spanOptions: (_a = updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.tracingOptions) === null || _a === void 0 ? void 0 : _a.spanOptions,
                        tracingContext: (_b = updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.tracingOptions) === null || _b === void 0 ? void 0 : _b.tracingContext
                    }
                });
                const response = yield this.sendTokenRequest(webResource, expiresOnParser);
                logger.info(`IdentityClient: refreshed token for client ID: ${clientId}`);
                return response;
            }
            catch (err) {
                if (err.name === AuthenticationErrorName &&
                    err.errorResponse.error === "interaction_required") {
                    // It's likely that the refresh token has expired, so
                    // return null so that the credential implementation will
                    // initiate the authentication flow again.
                    logger.info(`IdentityClient: interaction required for client ID: ${clientId}`);
                    span.setStatus({
                        code: coreTracing.SpanStatusCode.ERROR,
                        message: err.message
                    });
                    return null;
                }
                else {
                    logger.warning(`IdentityClient: failed refreshing token for client ID: ${clientId}: ${err}`);
                    span.setStatus({
                        code: coreTracing.SpanStatusCode.ERROR,
                        message: err.message
                    });
                    throw err;
                }
            }
            finally {
                span.end();
            }
        });
    }
    // The MSAL network module methods follow
    sendGetRequestAsync(url, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const request = coreRestPipeline.createPipelineRequest({
                url,
                method: "GET",
                body: options === null || options === void 0 ? void 0 : options.body,
                headers: coreRestPipeline.createHttpHeaders(options === null || options === void 0 ? void 0 : options.headers)
            });
            const response = yield this.sendRequest(request);
            return {
                body: parse(response.bodyAsText),
                headers: response.headers.toJSON(),
                status: response.status
            };
        });
    }
    sendPostRequestAsync(url, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const request = coreRestPipeline.createPipelineRequest({
                url,
                method: "POST",
                body: options === null || options === void 0 ? void 0 : options.body,
                headers: coreRestPipeline.createHttpHeaders(options === null || options === void 0 ? void 0 : options.headers)
            });
            const response = yield this.sendRequest(request);
            return {
                body: parse(response.bodyAsText),
                headers: response.headers.toJSON(),
                status: response.status
            };
        });
    }
}

// Copyright (c) Microsoft Corporation.
const logger$2 = credentialLogger("ClientSecretCredential");
/**
 * Enables authentication to Azure Active Directory using a client secret
 * that was generated for an App Registration.  More information on how
 * to configure a client secret can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application
 *
 */
class ClientSecretCredential {
    /**
     * Creates an instance of the ClientSecretCredential with the details
     * needed to authenticate against Azure Active Directory with a client
     * secret.
     *
     * @param tenantId - The Azure Active Directory tenant (directory) ID.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param clientSecret - A client secret that was generated for the App Registration.
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantId, clientId, clientSecret, options) {
        this.identityClient = new IdentityClient(options);
        this.tenantId = tenantId;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const { span, updatedOptions } = createSpan("ClientSecretCredential-getToken", options);
            try {
                const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
                const request = coreRestPipeline.createPipelineRequest({
                    url: `${this.identityClient.authorityHost}/${this.tenantId}/${urlSuffix}`,
                    method: "POST",
                    body: qs.stringify({
                        response_type: "token",
                        grant_type: "client_credentials",
                        client_id: this.clientId,
                        client_secret: this.clientSecret,
                        scope: typeof scopes === "string" ? scopes : scopes.join(" ")
                    }),
                    headers: coreRestPipeline.createHttpHeaders({
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }),
                    abortSignal: options && options.abortSignal,
                    tracingOptions: {
                        spanOptions: updatedOptions.tracingOptions && updatedOptions.tracingOptions.spanOptions,
                        tracingContext: updatedOptions.tracingOptions && updatedOptions.tracingOptions.tracingContext
                    }
                });
                const tokenResponse = yield this.identityClient.sendTokenRequest(request);
                logger$2.getToken.info(formatSuccess(scopes));
                return (tokenResponse && tokenResponse.accessToken) || null;
            }
            catch (err) {
                span.setStatus({
                    code: coreTracing.SpanStatusCode.ERROR,
                    message: err.message
                });
                logger$2.getToken.info(formatError(scopes, err));
                throw err;
            }
            finally {
                span.end();
            }
        });
    }
}

// Copyright (c) Microsoft Corporation.
function checkTenantId(logger, tenantId) {
    if (!tenantId.match(/^[0-9a-zA-Z-.:/]+$/)) {
        const error = new Error("Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://docs.microsoft.com/partner-center/find-ids-and-domain-names.");
        logger.info(formatError("", error));
        throw error;
    }
}

// Copyright (c) Microsoft Corporation.
const SelfSignedJwtLifetimeMins = 10;
function timestampInSeconds(date) {
    return Math.floor(date.getTime() / 1000);
}
function addMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}
const logger$3 = credentialLogger("ClientCertificateCredential");
/**
 * Enables authentication to Azure Active Directory using a PEM-encoded
 * certificate that is assigned to an App Registration.  More information
 * on how to configure certificate authentication can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-certificate-credentials#register-your-certificate-with-azure-ad
 *
 */
class ClientCertificateCredential {
    /**
     * Creates an instance of the ClientCertificateCredential with the details
     * needed to authenticate against Azure Active Directory with a certificate.
     *
     * @param tenantId - The Azure Active Directory tenant (directory) ID.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param certificatePath - The path to a PEM-encoded public/private key certificate on the filesystem.
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantId, clientId, certificatePath, options) {
        checkTenantId(logger$3, tenantId);
        this.identityClient = new IdentityClient(options);
        this.tenantId = tenantId;
        this.clientId = clientId;
        this.certificateString = fs.readFileSync(certificatePath, "utf8");
        const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
        const publicKeys = [];
        // Match all possible certificates, in the order they are in the file. These will form the chain that is used for x5c
        let match;
        do {
            match = certificatePattern.exec(this.certificateString);
            if (match) {
                publicKeys.push(match[3]);
            }
        } while (match);
        if (publicKeys.length === 0) {
            const error = new Error("The file at the specified path does not contain a PEM-encoded certificate.");
            logger$3.info(formatError("", error));
            throw error;
        }
        this.certificateThumbprint = crypto.createHash("sha1")
            .update(Buffer.from(publicKeys[0], "base64"))
            .digest("hex")
            .toUpperCase();
        this.certificateX5t = Buffer.from(this.certificateThumbprint, "hex").toString("base64");
        if (options && options.sendCertificateChain) {
            this.certificateX5c = publicKeys;
        }
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const { span, updatedOptions: newOptions } = createSpan("ClientCertificateCredential-getToken", options);
            try {
                const tokenId = uuid.v4();
                const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
                const audienceUrl = `${this.identityClient.authorityHost}/${this.tenantId}/${urlSuffix}`;
                let header;
                if (this.certificateX5c) {
                    header = {
                        typ: "JWT",
                        alg: "RS256",
                        x5t: this.certificateX5t,
                        x5c: this.certificateX5c
                    };
                }
                else {
                    header = {
                        typ: "JWT",
                        alg: "RS256",
                        x5t: this.certificateX5t
                    };
                }
                const payload = {
                    iss: this.clientId,
                    sub: this.clientId,
                    aud: audienceUrl,
                    jti: tokenId,
                    nbf: timestampInSeconds(new Date()),
                    exp: timestampInSeconds(addMinutes(new Date(), SelfSignedJwtLifetimeMins))
                };
                const clientAssertion = jws.sign({
                    header,
                    payload,
                    secret: this.certificateString
                });
                const webResource = coreRestPipeline.createPipelineRequest({
                    url: audienceUrl,
                    method: "POST",
                    body: qs.stringify({
                        response_type: "token",
                        grant_type: "client_credentials",
                        client_id: this.clientId,
                        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
                        client_assertion: clientAssertion,
                        scope: typeof scopes === "string" ? scopes : scopes.join(" ")
                    }),
                    headers: coreRestPipeline.createHttpHeaders({
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }),
                    abortSignal: options && options.abortSignal,
                    tracingOptions: {
                        spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions,
                        tracingContext: newOptions.tracingOptions && newOptions.tracingOptions.tracingContext
                    }
                });
                const tokenResponse = yield this.identityClient.sendTokenRequest(webResource);
                logger$3.getToken.info(formatSuccess(scopes));
                return (tokenResponse && tokenResponse.accessToken) || null;
            }
            catch (err) {
                span.setStatus({
                    code: coreTracing.SpanStatusCode.ERROR,
                    message: err.message
                });
                logger$3.getToken.info(formatError("", err));
                throw err;
            }
            finally {
                span.end();
            }
        });
    }
}

// Copyright (c) Microsoft Corporation.
const logger$4 = credentialLogger("UsernamePasswordCredential");
/**
 * Enables authentication to Azure Active Directory with a user's
 * username and password. This credential requires a high degree of
 * trust so you should only use it when other, more secure credential
 * types can't be used.
 */
class UsernamePasswordCredential {
    /**
     * Creates an instance of the UsernamePasswordCredential with the details
     * needed to authenticate against Azure Active Directory with a username
     * and password.
     *
     * @param tenantIdOrName - The Azure Active Directory tenant (directory) ID or name.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param username - The user account's e-mail address (user name).
     * @param password - The user account's account password
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantIdOrName, clientId, username, password, options) {
        checkTenantId(logger$4, tenantIdOrName);
        this.identityClient = new IdentityClient(options);
        this.tenantId = tenantIdOrName;
        this.clientId = clientId;
        this.username = username;
        this.password = password;
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const { span, updatedOptions: newOptions } = createSpan("UsernamePasswordCredential-getToken", options);
            try {
                const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
                const webResource = coreRestPipeline.createPipelineRequest({
                    url: `${this.identityClient.authorityHost}/${this.tenantId}/${urlSuffix}`,
                    method: "POST",
                    body: qs.stringify({
                        response_type: "token",
                        grant_type: "password",
                        client_id: this.clientId,
                        username: this.username,
                        password: this.password,
                        scope: typeof scopes === "string" ? scopes : scopes.join(" ")
                    }),
                    headers: coreRestPipeline.createHttpHeaders({
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }),
                    abortSignal: options && options.abortSignal,
                    tracingOptions: {
                        spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions,
                        tracingContext: newOptions.tracingOptions && newOptions.tracingOptions.tracingContext
                    }
                });
                const tokenResponse = yield this.identityClient.sendTokenRequest(webResource);
                logger$4.getToken.info(formatSuccess(scopes));
                return (tokenResponse && tokenResponse.accessToken) || null;
            }
            catch (err) {
                span.setStatus({
                    code: coreTracing.SpanStatusCode.ERROR,
                    message: err.message
                });
                logger$4.getToken.info(formatError(scopes, err));
                throw err;
            }
            finally {
                span.end();
            }
        });
    }
}

// Copyright (c) Microsoft Corporation.
/**
 * Contains the list of all supported environment variable names so that an
 * appropriate error message can be generated when no credentials can be
 * configured.
 *
 * @internal
 */
const AllSupportedEnvironmentVariables = [
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_ID",
    "AZURE_CLIENT_SECRET",
    "AZURE_CLIENT_CERTIFICATE_PATH",
    "AZURE_USERNAME",
    "AZURE_PASSWORD"
];
const logger$5 = credentialLogger("EnvironmentCredential");
/**
 * Enables authentication to Azure Active Directory using client secret
 * details configured in the following environment variables:
 *
 * - AZURE_TENANT_ID: The Azure Active Directory tenant (directory) ID.
 * - AZURE_CLIENT_ID: The client (application) ID of an App Registration in the tenant.
 * - AZURE_CLIENT_SECRET: A client secret that was generated for the App Registration.
 *
 * This credential ultimately uses a {@link ClientSecretCredential} to
 * perform the authentication using these details.  Please consult the
 * documentation of that class for more details.
 */
class EnvironmentCredential {
    /**
     * Creates an instance of the EnvironmentCredential class and reads
     * client secret details from environment variables.  If the expected
     * environment variables are not found at this time, the getToken method
     * will return null when invoked.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(options) {
        // Keep track of any missing environment variables for error details
        this._credential = undefined;
        const assigned = processEnvVars(AllSupportedEnvironmentVariables).assigned.join(", ");
        logger$5.info(`Found the following environment variables: ${assigned}`);
        const tenantId = process.env.AZURE_TENANT_ID, clientId = process.env.AZURE_CLIENT_ID, clientSecret = process.env.AZURE_CLIENT_SECRET;
        if (tenantId) {
            checkTenantId(logger$5, tenantId);
        }
        if (tenantId && clientId && clientSecret) {
            logger$5.info(`Invoking ClientSecretCredential with tenant ID: ${tenantId}, clientId: ${clientId} and clientSecret: [REDACTED]`);
            this._credential = new ClientSecretCredential(tenantId, clientId, clientSecret, options);
            return;
        }
        const certificatePath = process.env.AZURE_CLIENT_CERTIFICATE_PATH;
        if (tenantId && clientId && certificatePath) {
            logger$5.info(`Invoking ClientCertificateCredential with tenant ID: ${tenantId}, clientId: ${clientId} and certificatePath: ${certificatePath}`);
            this._credential = new ClientCertificateCredential(tenantId, clientId, certificatePath, options);
            return;
        }
        const username = process.env.AZURE_USERNAME;
        const password = process.env.AZURE_PASSWORD;
        if (tenantId && clientId && username && password) {
            logger$5.info(`Invoking UsernamePasswordCredential with tenant ID: ${tenantId}, clientId: ${clientId} and username: ${username}`);
            this._credential = new UsernamePasswordCredential(tenantId, clientId, username, password, options);
        }
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const { span, updatedOptions: newOptions } = createSpan("EnvironmentCredential-getToken", options);
            if (this._credential) {
                try {
                    const result = yield this._credential.getToken(scopes, newOptions);
                    logger$5.getToken.info(formatSuccess(scopes));
                    return result;
                }
                catch (err) {
                    span.setStatus({
                        code: coreTracing.SpanStatusCode.ERROR,
                        message: err.message
                    });
                    const authenticationError = new AuthenticationError(400, {
                        error: "EnvironmentCredential authentication failed.",
                        error_description: err.message
                            .toString()
                            .split("More details:")
                            .join("")
                    });
                    logger$5.getToken.info(formatError(scopes, authenticationError));
                    throw authenticationError;
                }
                finally {
                    span.end();
                }
            }
            // If by this point we don't have a credential, throw an exception so that
            // the user knows the credential was not configured appropriately
            span.setStatus({ code: coreTracing.SpanStatusCode.ERROR });
            span.end();
            const error = new CredentialUnavailable("EnvironmentCredential is unavailable. Environment variables are not fully configured.");
            logger$5.getToken.info(formatError(scopes, error));
            throw error;
        });
    }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const DefaultScopeSuffix = "/.default";
const imdsHost = "http://169.254.169.254";
const imdsEndpointPath = "/metadata/identity/oauth2/token";
const imdsApiVersion = "2018-02-01";
const azureArcAPIVersion = "2019-11-01";

// Copyright (c) Microsoft Corporation.
function mapScopesToResource(scopes) {
    let scope = "";
    if (Array.isArray(scopes)) {
        if (scopes.length !== 1) {
            throw new Error("To convert to a resource string the specified array must be exactly length 1");
        }
        scope = scopes[0];
    }
    else if (typeof scopes === "string") {
        scope = scopes;
    }
    if (!scope.endsWith(DefaultScopeSuffix)) {
        return scope;
    }
    return scope.substr(0, scope.lastIndexOf(DefaultScopeSuffix));
}
function msiGenericGetToken(identityClient, requestOptions, expiresInParser, getTokenOptions = {}) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        const request = coreRestPipeline.createPipelineRequest(Object.assign(Object.assign({ abortSignal: getTokenOptions.abortSignal, tracingOptions: {
                spanOptions: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.spanOptions,
                tracingContext: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.tracingContext
            } }, requestOptions), { allowInsecureConnection: true }));
        const tokenResponse = yield identityClient.sendTokenRequest(request, expiresInParser);
        return (tokenResponse && tokenResponse.accessToken) || null;
    });
}

// Copyright (c) Microsoft Corporation.
const logger$6 = credentialLogger("ManagedIdentityCredential - CloudShellMSI");
// Cloud Shell MSI doesn't have a special expiresIn parser.
const expiresInParser = undefined;
function prepareRequestOptions(resource, clientId) {
    const body = {
        resource
    };
    if (clientId) {
        body.client_id = clientId;
    }
    return {
        url: process.env.MSI_ENDPOINT,
        method: "POST",
        body: qs.stringify(body),
        headers: coreRestPipeline.createHttpHeaders({
            Accept: "application/json",
            Metadata: "true",
            "Content-Type": "application/x-www-form-urlencoded"
        })
    };
}
const cloudShellMsi = {
    isAvailable() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            return Boolean(process.env.MSI_ENDPOINT);
        });
    },
    getToken(identityClient, resource, clientId, getTokenOptions = {}) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            logger$6.info(`Using the endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the Cloud Shell to proceed with the authentication.`);
            return msiGenericGetToken(identityClient, prepareRequestOptions(resource, clientId), expiresInParser, getTokenOptions);
        });
    }
};

// Copyright (c) Microsoft Corporation.
const logger$7 = credentialLogger("ManagedIdentityCredential - IMDS");
function expiresInParser$1(requestBody) {
    if (requestBody.expires_on) {
        // Use the expires_on timestamp if it's available
        const expires = +requestBody.expires_on * 1000;
        logger$7.info(`IMDS using expires_on: ${expires} (original value: ${requestBody.expires_on})`);
        return expires;
    }
    else {
        // If these aren't possible, use expires_in and calculate a timestamp
        const expires = Date.now() + requestBody.expires_in * 1000;
        logger$7.info(`IMDS using expires_in: ${expires} (original value: ${requestBody.expires_in})`);
        return expires;
    }
}
function prepareRequestOptions$1(resource, clientId, options) {
    var _a;
    const queryParameters = {
        resource,
        "api-version": imdsApiVersion
    };
    if (clientId) {
        queryParameters.client_id = clientId;
    }
    const url = new URL(imdsEndpointPath, (_a = process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) !== null && _a !== void 0 ? _a : imdsHost);
    const { skipQuery, skipMetadataHeader } = options || {};
    // Pod Identity will try to process this request even if the Metadata header is missing.
    // We can exclude the request query to ensure no IMDS endpoint tries to process the ping request.
    let query = "";
    if (!skipQuery) {
        query = `?${qs.stringify(queryParameters)}`;
    }
    const headersSource = {
        Accept: "application/json",
        Metadata: "true"
    };
    // Remove the Metadata header to invoke a request error from some IMDS endpoints.
    if (skipMetadataHeader) {
        delete headersSource.Metadata;
    }
    return {
        url: `${url}${query}`,
        method: "GET",
        headers: coreRestPipeline.createHttpHeaders(headersSource)
    };
}
const imdsMsi = {
    isAvailable(identityClient, resource, clientId, getTokenOptions) {
        var _a, _b;
        return tslib.__awaiter(this, void 0, void 0, function* () {
            // if the PodIdenityEndpoint environment variable was set no need to probe the endpoint, it can be assumed to exist
            if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) {
                return true;
            }
            const { span, updatedOptions: options } = createSpan("ManagedIdentityCredential-pingImdsEndpoint", getTokenOptions);
            try {
                // Create a request with a timeout since we expect that
                // not having a "Metadata" header should cause an error to be
                // returned quickly from the endpoint, proving its availability.
                // Later we found that skipping the query parameters is also necessary in some cases.
                const requestOptions = prepareRequestOptions$1(resource, clientId, {
                    skipMetadataHeader: true,
                    skipQuery: true
                });
                requestOptions.tracingOptions = {
                    spanOptions: options.tracingOptions && options.tracingOptions.spanOptions,
                    tracingContext: options.tracingOptions && options.tracingOptions.tracingContext
                };
                const request = coreRestPipeline.createPipelineRequest(requestOptions);
                request.timeout = (_b = (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.timeout) !== null && _b !== void 0 ? _b : 300;
                // This MSI uses the imdsEndpoint to get the token, which only uses http://
                request.allowInsecureConnection = true;
                try {
                    logger$7.info(`Pinging IMDS endpoint`);
                    yield identityClient.sendRequest(request);
                }
                catch (err) {
                    if ((err instanceof coreRestPipeline.RestError && err.code === coreRestPipeline.RestError.REQUEST_SEND_ERROR) ||
                        err.name === "AbortError" ||
                        err.code === "ECONNREFUSED" || // connection refused
                        err.code === "EHOSTDOWN" // host is down
                    ) {
                        // If the request failed, or NodeJS was unable to establish a connection,
                        // or the host was down, we'll assume the IMDS endpoint isn't available.
                        logger$7.info(`IMDS endpoint unavailable`);
                        span.setStatus({
                            code: coreTracing.SpanStatusCode.ERROR,
                            message: err.message
                        });
                        // IMDS MSI unavailable.
                        return false;
                    }
                }
                // If we received any response, the endpoint is available
                logger$7.info(`IMDS endpoint is available`);
                // IMDS MSI available!
                return true;
            }
            catch (err) {
                // createWebResource failed.
                // This error should bubble up to the user.
                logger$7.info(`Error when creating the WebResource for the IMDS endpoint: ${err.message}`);
                span.setStatus({
                    code: coreTracing.SpanStatusCode.ERROR,
                    message: err.message
                });
                throw err;
            }
            finally {
                span.end();
            }
        });
    },
    getToken(identityClient, resource, clientId, getTokenOptions = {}) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            logger$7.info(`Using the IMDS endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`);
            return msiGenericGetToken(identityClient, prepareRequestOptions$1(resource, clientId), expiresInParser$1, getTokenOptions);
        });
    }
};

// Copyright (c) Microsoft Corporation.
const logger$8 = credentialLogger("ManagedIdentityCredential - AppServiceMSI 2017");
function expiresInParser$2(requestBody) {
    // Parse a date format like "06/20/2019 02:57:58 +00:00" and
    // convert it into a JavaScript-formatted date
    return Date.parse(requestBody.expires_on);
}
function prepareRequestOptions$2(resource, clientId) {
    const queryParameters = {
        resource,
        "api-version": "2017-09-01"
    };
    if (clientId) {
        queryParameters.clientid = clientId;
    }
    const query = qs.stringify(queryParameters);
    return {
        url: `${process.env.MSI_ENDPOINT}?${query}`,
        method: "GET",
        headers: coreRestPipeline.createHttpHeaders({
            Accept: "application/json",
            secret: process.env.MSI_SECRET
        })
    };
}
const appServiceMsi2017 = {
    isAvailable() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const env = process.env;
            const result = Boolean(env.MSI_ENDPOINT && env.MSI_SECRET);
            if (!result) {
                logger$8.info("The Azure App Service MSI 2017 is unavailable.");
            }
            return result;
        });
    },
    getToken(identityClient, resource, clientId, getTokenOptions = {}) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            logger$8.info(`Using the endpoint and the secret coming form the environment variables: MSI_ENDPOINT=${process.env.MSI_ENDPOINT} and MSI_SECRET=[REDACTED].`);
            return msiGenericGetToken(identityClient, prepareRequestOptions$2(resource, clientId), expiresInParser$2, getTokenOptions);
        });
    }
};

// Copyright (c) Microsoft Corporation.
const logger$9 = credentialLogger("ManagedIdentityCredential - ArcMSI");
// Azure Arc MSI doesn't have a special expiresIn parser.
const expiresInParser$3 = undefined;
function prepareRequestOptions$3(resource) {
    const queryParameters = {
        resource,
        "api-version": azureArcAPIVersion
    };
    const query = qs.stringify(queryParameters);
    return {
        // Should be similar to: http://localhost:40342/metadata/identity/oauth2/token
        url: `${process.env.IDENTITY_ENDPOINT}?${query}`,
        method: "GET",
        headers: coreRestPipeline.createHttpHeaders({
            Accept: "application/json",
            Metadata: "true"
        })
    };
}
// Since "fs"'s readFileSync locks the thread, and to avoid extra dependencies.
function readFileAsync(path, options) {
    return new Promise((resolve, reject) => fs.readFile(path, options, (err, data) => {
        if (err) {
            reject(err);
        }
        resolve(data);
    }));
}
function filePathRequest(identityClient, requestPrepareOptions) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        const response = yield identityClient.sendRequest(coreRestPipeline.createPipelineRequest(requestPrepareOptions));
        if (response.status !== 401) {
            let message = "";
            if (response.bodyAsText) {
                message = ` Response: ${response.bodyAsText}`;
            }
            throw new AuthenticationError(response.status, `To authenticate with Azure Arc MSI, status code 401 is expected on the first request.${message}`);
        }
        const authHeader = response.headers.get("www-authenticate") || "";
        return authHeader.split("=").slice(1)[0];
    });
}
const arcMsi = {
    isAvailable() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const result = Boolean(process.env.IMDS_ENDPOINT && process.env.IDENTITY_ENDPOINT);
            if (!result) {
                logger$9.info("The Azure Arc MSI is unavailable.");
            }
            return result;
        });
    },
    getToken(identityClient, resource, clientId, getTokenOptions = {}) {
        var _a;
        return tslib.__awaiter(this, void 0, void 0, function* () {
            logger$9.info(`Using the Azure Arc MSI to authenticate.`);
            if (clientId) {
                throw new Error("User assigned identity is not supported by the Azure Arc Managed Identity Endpoint. To authenticate with the system assigned identity omit the client id when constructing the ManagedIdentityCredential, or if authenticating with the DefaultAzureCredential ensure the AZURE_CLIENT_ID environment variable is not set.");
            }
            const requestOptions = Object.assign({ allowInsecureConnection: true, disableJsonStringifyOnBody: true, deserializationMapper: undefined, abortSignal: getTokenOptions.abortSignal, spanOptions: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.spanOptions }, prepareRequestOptions$3(resource));
            const filePath = yield filePathRequest(identityClient, requestOptions);
            if (!filePath) {
                throw new Error("Azure Arc MSI failed to find the token file.");
            }
            const key = yield readFileAsync(filePath, { encoding: "utf-8" });
            (_a = requestOptions.headers) === null || _a === void 0 ? void 0 : _a.set("Authorization", `Basic ${key}`);
            return msiGenericGetToken(identityClient, requestOptions, expiresInParser$3, getTokenOptions);
        });
    }
};

// Copyright (c) Microsoft Corporation.
const logger$a = credentialLogger("ManagedIdentityCredential");
/**
 * Attempts authentication using a managed identity that has been assigned
 * to the deployment environment.  This authentication type works in Azure VMs,
 * App Service and Azure Functions applications, and inside of Azure Cloud Shell.
 *
 * More information about configuring managed identities can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
 */
class ManagedIdentityCredential {
    /**
     * @internal
     * @hidden
     */
    constructor(clientIdOrOptions, options) {
        this.isEndpointUnavailable = null;
        if (typeof clientIdOrOptions === "string") {
            // clientId, options constructor
            this.clientId = clientIdOrOptions;
            this.identityClient = new IdentityClient(Object.assign({}, options));
        }
        else {
            // options only constructor
            this.identityClient = new IdentityClient(clientIdOrOptions);
        }
    }
    cachedAvailableMSI(resource, clientId, getTokenOptions) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            if (this.cachedMSI) {
                return this.cachedMSI;
            }
            // "fabricMsi" can't be added yet because our HTTPs pipeline doesn't allow skipping the SSL verification step,
            // which is necessary since Service Fabric only provides self-signed certificates on their Identity Endpoint.
            const MSIs = [appServiceMsi2017, cloudShellMsi, arcMsi, imdsMsi];
            for (const msi of MSIs) {
                if (yield msi.isAvailable(this.identityClient, resource, clientId, getTokenOptions)) {
                    this.cachedMSI = msi;
                    return msi;
                }
            }
            throw new CredentialUnavailable("ManagedIdentityCredential - No MSI credential available");
        });
    }
    authenticateManagedIdentity(scopes, clientId, getTokenOptions) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const resource = mapScopesToResource(scopes);
            const { span, updatedOptions: options } = createSpan("ManagedIdentityCredential-authenticateManagedIdentity", getTokenOptions);
            try {
                // Determining the available MSI, and avoiding checking for other MSIs while the program is running.
                const availableMSI = yield this.cachedAvailableMSI(resource, clientId, options);
                return availableMSI.getToken(this.identityClient, resource, clientId, options);
            }
            catch (err) {
                span.setStatus({
                    code: coreTracing.SpanStatusCode.ERROR,
                    message: err.message
                });
                throw err;
            }
            finally {
                span.end();
            }
        });
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            let result = null;
            const { span, updatedOptions: newOptions } = createSpan("ManagedIdentityCredential-getToken", options);
            try {
                // isEndpointAvailable can be true, false, or null,
                // If it's null, it means we don't yet know whether
                // the endpoint is available and need to check for it.
                if (this.isEndpointUnavailable !== true) {
                    result = yield this.authenticateManagedIdentity(scopes, this.clientId, newOptions);
                    if (result === null) {
                        // If authenticateManagedIdentity returns null,
                        // it means no MSI endpoints are available.
                        // If so, we avoid trying to reach to them in future requests.
                        this.isEndpointUnavailable = true;
                        // It also means that the endpoint answered with either 200 or 201 (see the sendTokenRequest method),
                        // yet we had no access token. For this reason, we'll throw once with a specific message:
                        const error = new CredentialUnavailable("The managed identity endpoint was reached, yet no tokens were received.");
                        logger$a.getToken.info(formatError(scopes, error));
                        throw error;
                    }
                    // Since `authenticateManagedIdentity` didn't throw, and the result was not null,
                    // We will assume that this endpoint is reachable from this point forward,
                    // and avoid pinging again to it.
                    this.isEndpointUnavailable = false;
                }
                else {
                    // We've previously determined that the endpoint was unavailable,
                    // either because it was unreachable or permanently unable to authenticate.
                    const error = new CredentialUnavailable("The managed identity endpoint is not currently available");
                    logger$a.getToken.info(formatError(scopes, error));
                    throw error;
                }
                logger$a.getToken.info(formatSuccess(scopes));
                return result;
            }
            catch (err) {
                // CredentialUnavailable errors are expected to reach here.
                // We intend them to bubble up, so that DefaultAzureCredential can catch them.
                if (err instanceof CredentialUnavailable) {
                    throw err;
                }
                // Expected errors to reach this point:
                // - Errors coming from a method unexpectedly breaking.
                // - When identityClient.sendTokenRequest throws, in which case
                //   if the status code was 400, it means that the endpoint is working,
                //   but no identity is available.
                span.setStatus({
                    code: coreTracing.SpanStatusCode.ERROR,
                    message: err.message
                });
                // If either the network is unreachable,
                // we can safely assume the credential is unavailable.
                if (err.code === "ENETUNREACH") {
                    const error = new CredentialUnavailable("ManagedIdentityCredential is unavailable. Network unreachable.");
                    logger$a.getToken.info(formatError(scopes, error));
                    throw error;
                }
                // If either the host was unreachable,
                // we can safely assume the credential is unavailable.
                if (err.code === "EHOSTUNREACH") {
                    const error = new CredentialUnavailable("ManagedIdentityCredential is unavailable. No managed identity endpoint found.");
                    logger$a.getToken.info(formatError(scopes, error));
                    throw error;
                }
                // If err.statusCode has a value of 400, it comes from sendTokenRequest,
                // and it means that the endpoint is working, but that no identity is available.
                if (err.statusCode === 400) {
                    throw new CredentialUnavailable("The managed identity endpoint is indicating there's no available identity");
                }
                // If the error has no status code, we can assume there was no available identity.
                // This will throw silently during any ChainedTokenCredential.
                if (err.statusCode === undefined) {
                    throw new CredentialUnavailable(`ManagedIdentityCredential authentication failed. Message ${err.message}`);
                }
                // Any other error should break the chain.
                throw new AuthenticationError(err.statusCode, {
                    error: "ManagedIdentityCredential authentication failed.",
                    error_description: err.message
                });
            }
            finally {
                // Finally is always called, both if we return and if we throw in the above try/catch.
                span.end();
            }
        });
    }
}

// Copyright (c) Microsoft Corporation.
function getSafeWorkingDir() {
    if (process.platform === "win32") {
        if (!process.env.SystemRoot) {
            throw new Error("Azure CLI credential expects a 'SystemRoot' environment variable");
        }
        return process.env.SystemRoot;
    }
    else {
        return "/bin";
    }
}
const logger$b = credentialLogger("AzureCliCredential");
/**
 * This credential will use the currently logged-in user login information
 * via the Azure CLI ('az') commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure CLI command "az account get-access-token".
 * To be able to use this credential, ensure that you have already logged
 * in via the 'az' tool using the command "az login" from the commandline.
 */
class AzureCliCredential {
    /**
     * Gets the access token from Azure CLI
     * @param resource - The resource to use when getting the token
     */
    getAzureCliAccessToken(resource) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    child_process.exec(`az account get-access-token --output json --resource ${resource}`, { cwd: getSafeWorkingDir() }, (error, stdout, stderr) => {
                        resolve({ stdout: stdout, stderr: stderr, error });
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const scope = typeof scopes === "string" ? scopes : scopes[0];
                logger$b.getToken.info(`Using the scope ${scope}`);
                const resource = scope.replace(/\/.default$/, "");
                // Check to make sure the scope we get back is a valid scope
                if (!scope.match(/^[0-9a-zA-Z-.:/]+$/)) {
                    const error = new Error("Invalid scope was specified by the user or calling client");
                    logger$b.getToken.info(formatError(scopes, error));
                    throw error;
                }
                let responseData = "";
                const { span } = createSpan("AzureCliCredential-getToken", options);
                this.getAzureCliAccessToken(resource)
                    .then((obj) => {
                    if (obj.stderr) {
                        const isLoginError = obj.stderr.match("(.*)az login(.*)");
                        const isNotInstallError = obj.stderr.match("az:(.*)not found") ||
                            obj.stderr.startsWith("'az' is not recognized");
                        if (isNotInstallError) {
                            const error = new CredentialUnavailable("Azure CLI could not be found.  Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'.");
                            logger$b.getToken.info(formatError(scopes, error));
                            throw error;
                        }
                        else if (isLoginError) {
                            const error = new CredentialUnavailable("Please run 'az login' from a command prompt to authenticate before using this credential.");
                            logger$b.getToken.info(formatError(scopes, error));
                            throw error;
                        }
                        const error = new CredentialUnavailable(obj.stderr);
                        logger$b.getToken.info(formatError(scopes, error));
                        throw error;
                    }
                    else {
                        responseData = obj.stdout;
                        const response = JSON.parse(responseData);
                        logger$b.getToken.info(formatSuccess(scopes));
                        const returnValue = {
                            token: response.accessToken,
                            expiresOnTimestamp: new Date(response.expiresOn).getTime()
                        };
                        resolve(returnValue);
                        return returnValue;
                    }
                })
                    .catch((err) => {
                    span.setStatus({
                        code: coreTracing.SpanStatusCode.ERROR,
                        message: err.message
                    });
                    logger$b.getToken.info(formatError(scopes, err));
                    reject(err);
                });
            });
        });
    }
}

// Copyright (c) Microsoft Corporation.
let keytar;
try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    keytar = require("keytar");
}
catch (er) {
    keytar = null;
}
const CommonTenantId = "common";
const AzureAccountClientId = "aebc6443-996d-45c2-90f0-388ff96faa56"; // VSC: 'aebc6443-996d-45c2-90f0-388ff96faa56'
const VSCodeUserName = "VS Code Azure";
const logger$c = credentialLogger("VisualStudioCodeCredential");
// Map of unsupported Tenant IDs and the errors we will be throwing.
const unsupportedTenantIds = {
    adfs: "The VisualStudioCodeCredential does not support authentication with ADFS tenants."
};
function checkUnsupportedTenant(tenantId) {
    // If the Tenant ID isn't supported, we throw.
    const unsupportedTenantError = unsupportedTenantIds[tenantId];
    if (unsupportedTenantError) {
        throw new CredentialUnavailable(unsupportedTenantError);
    }
}
const mapVSCodeAuthorityHosts = {
    AzureCloud: exports.AzureAuthorityHosts.AzurePublicCloud,
    AzureChina: exports.AzureAuthorityHosts.AzureChina,
    AzureGermanCloud: exports.AzureAuthorityHosts.AzureGermany,
    AzureUSGovernment: exports.AzureAuthorityHosts.AzureGovernment
};
/**
 * Attempts to load a specific property from the VSCode configurations of the current OS.
 * If it fails at any point, returns undefined.
 */
function getPropertyFromVSCode(property) {
    const settingsPath = ["User", "settings.json"];
    // Eventually we can add more folders for more versions of VSCode.
    const vsCodeFolder = "Code";
    const homedir = os.homedir();
    function loadProperty(...pathSegments) {
        const fullPath = path.join(...pathSegments, vsCodeFolder, ...settingsPath);
        const settings = JSON.parse(fs__default.readFileSync(fullPath, { encoding: "utf8" }));
        return settings[property];
    }
    try {
        let appData;
        switch (process.platform) {
            case "win32":
                appData = process.env.APPDATA;
                return appData ? loadProperty(appData) : undefined;
            case "darwin":
                return loadProperty(homedir, "Library", "Application Support");
            case "linux":
                return loadProperty(homedir, ".config");
            default:
                return;
        }
    }
    catch (e) {
        logger$c.info(`Failed to load the Visual Studio Code configuration file. Error: ${e.message}`);
        return;
    }
}
/**
 * Connect to Azure using the credential provided by the VSCode extension 'Azure Account'.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 */
class VisualStudioCodeCredential {
    /**
     * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(options) {
        // We want to make sure we use the one assigned by the user on the VSCode settings.
        // Or just `AzureCloud` by default.
        this.cloudName = (getPropertyFromVSCode("azure.cloud") || "AzureCloud");
        // Picking an authority host based on the cloud name.
        const authorityHost = mapVSCodeAuthorityHosts[this.cloudName];
        this.identityClient = new IdentityClient(Object.assign({ authorityHost }, options));
        if (options && options.tenantId) {
            checkTenantId(logger$c, options.tenantId);
            this.tenantId = options.tenantId;
        }
        else {
            this.tenantId = CommonTenantId;
        }
        checkUnsupportedTenant(this.tenantId);
    }
    /**
     * Runs preparations for any further getToken request.
     */
    prepare() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            // Attempts to load the tenant from the VSCode configuration file.
            const settingsTenant = getPropertyFromVSCode("azure.tenant");
            if (settingsTenant) {
                this.tenantId = settingsTenant;
            }
            checkUnsupportedTenant(this.tenantId);
        });
    }
    /**
     * Runs preparations for any further getToken, but only once.
     */
    prepareOnce() {
        if (this.preparePromise) {
            return this.preparePromise;
        }
        this.preparePromise = this.prepare();
        return this.preparePromise;
    }
    /**
     * Returns the token found by searching VSCode's authentication cache or
     * returns null if no token could be found.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */
    getToken(scopes, _options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield this.prepareOnce();
            if (!keytar) {
                throw new CredentialUnavailable("Visual Studio Code credential requires the optional dependency 'keytar' to work correctly");
            }
            let scopeString = typeof scopes === "string" ? scopes : scopes.join(" ");
            // Check to make sure the scope we get back is a valid scope
            if (!scopeString.match(/^[0-9a-zA-Z-.:/]+$/)) {
                const error = new Error("Invalid scope was specified by the user or calling client");
                logger$c.getToken.info(formatError(scopes, error));
                throw error;
            }
            if (scopeString.indexOf("offline_access") < 0) {
                scopeString += " offline_access";
            }
            // findCredentials returns an array similar to:
            // [
            //   {
            //     account: "",
            //     password: "",
            //   },
            //   /* ... */
            // ]
            const credentials = yield keytar.findCredentials(VSCodeUserName);
            // If we can't find the credential based on the name, we'll pick the first one available.
            const { password } = credentials.find((cred) => cred.account === this.cloudName) ||
                credentials[0] ||
                {};
            // Assuming we found something, the refresh token is the "password" property.
            const refreshToken = password;
            if (refreshToken) {
                const tokenResponse = yield this.identityClient.refreshAccessToken(this.tenantId, AzureAccountClientId, scopeString, refreshToken, undefined);
                if (tokenResponse) {
                    logger$c.getToken.info(formatSuccess(scopes));
                    return tokenResponse.accessToken;
                }
                else {
                    const error = new CredentialUnavailable("Could not retrieve the token associated with Visual Studio Code. Have you connected using the 'Azure Account' extension recently?");
                    logger$c.getToken.info(formatError(scopes, error));
                    throw error;
                }
            }
            else {
                const error = new CredentialUnavailable("Could not retrieve the token associated with Visual Studio Code. Did you connect using the 'Azure Account' extension?");
                logger$c.getToken.info(formatError(scopes, error));
                throw error;
            }
        });
    }
}

// Copyright (c) Microsoft Corporation.
/**
 * Provides a default {@link ChainedTokenCredential} configuration for
 * applications that will be deployed to Azure.  The following credential
 * types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link ManagedIdentityCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
class DefaultAzureCredential extends ChainedTokenCredential {
    /**
     * Creates an instance of the DefaultAzureCredential class.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tokenCredentialOptions) {
        const credentials = [];
        credentials.push(new EnvironmentCredential(tokenCredentialOptions));
        // In case a user assigned ID has been provided.
        const managedIdentityClientId = (tokenCredentialOptions === null || tokenCredentialOptions === void 0 ? void 0 : tokenCredentialOptions.managedIdentityClientId) || process.env.AZURE_CLIENT_ID;
        if (managedIdentityClientId) {
            credentials.push(new ManagedIdentityCredential(managedIdentityClientId, tokenCredentialOptions));
        }
        else {
            // If the user didn't provide an ID, we'll try with a system assigned ID.
            credentials.push(new ManagedIdentityCredential(tokenCredentialOptions));
        }
        credentials.push(new AzureCliCredential());
        credentials.push(new VisualStudioCodeCredential(tokenCredentialOptions));
        super(...credentials);
        this.UnavailableMessage =
            "DefaultAzureCredential => failed to retrieve a token from the included credentials";
    }
}

// Copyright (c) Microsoft Corporation.
const logger$d = credentialLogger("InteractiveBrowserCredential");
class AuthenticationRequired extends CredentialUnavailable {
}
class MsalClient {
    constructor(msalConfig, persistenceEnabled, authenticationRecord, options) {
        this.identityClient = new IdentityClient(options);
        this.msalConfig = msalConfig;
        this.persistenceEnabled = persistenceEnabled;
        this.authenticationRecord = authenticationRecord;
    }
    prepareClientApplications() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            // If we've already initialized the public client application, return
            if (this.pca) {
                return;
            }
            // Construct the public client application, since it hasn't been initialized, yet
            const clientConfig = {
                auth: this.msalConfig,
                cache: undefined,
                system: { networkClient: this.identityClient }
            };
            this.pca = new msalNode.PublicClientApplication(clientConfig);
        });
    }
    acquireTokenFromCache(scopes) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield this.prepareClientApplications();
            if (!this.persistenceEnabled || !this.authenticationRecord) {
                throw new AuthenticationRequired();
            }
            const silentRequest = {
                account: this.authenticationRecord,
                scopes
            };
            try {
                const response = yield this.pca.acquireTokenSilent(silentRequest);
                logger$d.info("Successful silent token acquisition");
                if (response && response.expiresOn) {
                    return {
                        expiresOnTimestamp: response.expiresOn.getTime(),
                        token: response.accessToken
                    };
                }
                else {
                    throw new AuthenticationRequired("Could not authenticate silently using the cache");
                }
            }
            catch (e) {
                throw new AuthenticationRequired("Could not authenticate silently using the cache");
            }
        });
    }
    getAuthCodeUrl(request) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield this.prepareClientApplications();
            return this.pca.getAuthCodeUrl(request);
        });
    }
    acquireTokenByCode(request) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield this.prepareClientApplications();
            return this.pca.acquireTokenByCode(request);
        });
    }
    acquireTokenByDeviceCode(request) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield this.prepareClientApplications();
            return this.pca.acquireTokenByDeviceCode(request);
        });
    }
    acquireTokenByClientCredential(request) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            yield this.prepareClientApplications();
            return this.cca.acquireTokenByClientCredential(request);
        });
    }
}
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["POST"] = "post";
})(HttpMethod || (HttpMethod = {}));

// Copyright (c) Microsoft Corporation.
const logger$e = credentialLogger("InteractiveBrowserCredential");
/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.  This credential is not currently supported in Node.js.
 */
class InteractiveBrowserCredential {
    constructor(options) {
        const tenantId = (options && options.tenantId) || DefaultTenantId;
        const clientId = (options && options.clientId) || DeveloperSignOnClientId;
        checkTenantId(logger$e, tenantId);
        // const persistenceEnabled = options?.persistenceEnabled ? options?.persistenceEnabled : false;
        // const authenticationRecord = options?.authenticationRecord;
        if (options && options.redirectUri) {
            if (typeof options.redirectUri === "string") {
                this.redirectUri = options.redirectUri;
            }
            else {
                this.redirectUri = options.redirectUri();
            }
        }
        else {
            this.redirectUri = "http://localhost";
        }
        const url = new URL(this.redirectUri);
        this.port = parseInt(url.port);
        if (isNaN(this.port)) {
            this.port = 80;
        }
        this.hostname = url.hostname;
        let authorityHost;
        if (options && options.authorityHost) {
            if (options.authorityHost.endsWith("/")) {
                authorityHost = options.authorityHost + tenantId;
            }
            else {
                authorityHost = options.authorityHost + "/" + tenantId;
            }
        }
        else {
            authorityHost = "https://login.microsoftonline.com/" + tenantId;
        }
        this.msalClient = new MsalClient({
            clientId,
            authority: authorityHost,
            knownAuthorities: tenantId === "adfs" ? (authorityHost ? [authorityHost] : []) : []
        }, false, undefined, options);
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                  TokenCredential implementation might make.
     */
    getToken(scopes, _options) {
        const scopeArray = typeof scopes === "object" ? scopes : [scopes];
        return this.msalClient.acquireTokenFromCache(scopeArray).catch((e) => {
            if (e instanceof AuthenticationRequired) {
                return this.acquireTokenFromBrowser(scopeArray);
            }
            else {
                logger$e.getToken.info(formatError(scopes, e));
                throw e;
            }
        });
    }
    openAuthCodeUrl(scopeArray) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const authCodeUrlParameters = {
                scopes: scopeArray,
                redirectUri: this.redirectUri
            };
            const response = yield this.msalClient.getAuthCodeUrl(authCodeUrlParameters);
            yield open(response);
        });
    }
    acquireTokenFromBrowser(scopeArray) {
        return new Promise((resolve, reject) => {
            const socketToDestroy = [];
            const requestListener = (req, res) => {
                if (!req.url) {
                    reject(new Error(`Interactive Browser Authentication Error "Did not receive token with a valid expiration"`));
                    return;
                }
                let url;
                try {
                    url = new URL(req.url, this.redirectUri);
                }
                catch (e) {
                    reject(new Error(`Interactive Browser Authentication Error "Did not receive token with a valid expiration"`));
                    return;
                }
                const tokenRequest = {
                    code: url.searchParams.get("code"),
                    redirectUri: this.redirectUri,
                    scopes: scopeArray
                };
                this.msalClient
                    .acquireTokenByCode(tokenRequest)
                    .then((authResponse) => {
                    const successMessage = `Authentication Complete. You can close the browser and return to the application.`;
                    if (authResponse && authResponse.expiresOn) {
                        const expiresOnTimestamp = authResponse === null || authResponse === void 0 ? void 0 : authResponse.expiresOn.valueOf();
                        res.writeHead(200);
                        res.end(successMessage);
                        logger$e.getToken.info(formatSuccess(scopeArray));
                        resolve({
                            expiresOnTimestamp,
                            token: authResponse.accessToken
                        });
                    }
                    else {
                        const errorMessage = formatError(scopeArray, `${url.searchParams.get("error")}. ${url.searchParams.get("error_description")}`);
                        res.writeHead(500);
                        res.end(errorMessage);
                        logger$e.getToken.info(errorMessage);
                        reject(new Error(`Interactive Browser Authentication Error "Did not receive token with a valid expiration"`));
                    }
                    cleanup();
                    return;
                })
                    .catch(() => {
                    const errorMessage = formatError(scopeArray, `${url.searchParams.get("error")}. ${url.searchParams.get("error_description")}`);
                    res.writeHead(500);
                    res.end(errorMessage);
                    logger$e.getToken.info(errorMessage);
                    reject(new Error(`Interactive Browser Authentication Error "Did not receive token with a valid expiration"`));
                    cleanup();
                });
            };
            const app = http.createServer(requestListener);
            const listen = app.listen(this.port, this.hostname, () => logger$e.info(`InteractiveBrowerCredential listening on port ${this.port}!`));
            app.on("connection", (socket) => socketToDestroy.push(socket));
            const server = stoppable(app);
            this.openAuthCodeUrl(scopeArray).catch((e) => {
                cleanup();
                reject(e);
            });
            function cleanup() {
                if (listen) {
                    listen.close();
                }
                for (const socket of socketToDestroy) {
                    socket.destroy();
                }
                if (server) {
                    server.close();
                    server.stop();
                }
            }
        });
    }
}

const logger$f = credentialLogger("DeviceCodeCredential");
/**
 * Method that logs the user code from the DeviceCodeCredential.
 * @param deviceCodeInfo - The device code.
 */
function defaultDeviceCodePromptCallback(deviceCodeInfo) {
    console.log(deviceCodeInfo.message);
}
/**
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
class DeviceCodeCredential {
    /**
     * Creates an instance of DeviceCodeCredential with the details needed
     * to initiate the device code authorization flow with Azure Active Directory.
     *
     * @param tenantId - The Azure Active Directory tenant (directory) ID or name.
     *                   The default value is 'organizations'.
     *                   'organizations' may be used when dealing with multi-tenant scenarios.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     *                   By default we will try to use the Azure CLI's client ID to authenticate.
     * @param userPromptCallback - A callback function that will be invoked to show
                                 {@link DeviceCodeInfo} to the user. If left unassigned, we will automatically log the device code information and the authentication instructions in the console.
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantId = "organizations", clientId = DeveloperSignOnClientId, userPromptCallback = defaultDeviceCodePromptCallback, options) {
        checkTenantId(logger$f, tenantId);
        this.userPromptCallback = userPromptCallback;
        let authorityHost;
        if (options && options.authorityHost) {
            if (options.authorityHost.endsWith("/")) {
                authorityHost = options.authorityHost + tenantId;
            }
            else {
                authorityHost = options.authorityHost + "/" + tenantId;
            }
        }
        else {
            authorityHost = "https://login.microsoftonline.com/" + tenantId;
        }
        this.msalClient = new MsalClient({ clientId: clientId, authority: authorityHost }, false, undefined, options);
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const { span } = createSpan("DeviceCodeCredential-getToken", options);
            const scopeArray = typeof scopes === "object" ? scopes : [scopes];
            const deviceCodeRequest = {
                deviceCodeCallback: this.userPromptCallback,
                scopes: scopeArray
            };
            logger$f.info(`DeviceCodeCredential invoked. Scopes: ${scopeArray.join(", ")}`);
            return this.msalClient.acquireTokenFromCache(scopeArray).catch((e) => tslib.__awaiter(this, void 0, void 0, function* () {
                if (e instanceof AuthenticationRequired) {
                    try {
                        const token = yield this.acquireTokenByDeviceCode(deviceCodeRequest, scopeArray);
                        logger$f.getToken.info(formatSuccess(scopeArray));
                        return token;
                    }
                    catch (err) {
                        span.setStatus({
                            code: coreTracing.SpanStatusCode.ERROR,
                            message: err.message
                        });
                        logger$f.getToken.info(formatError(scopeArray, err));
                        throw err;
                    }
                    finally {
                        span.end();
                    }
                }
                else {
                    throw e;
                }
            }));
        });
    }
    acquireTokenByDeviceCode(deviceCodeRequest, scopes) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            try {
                const deviceResponse = yield this.msalClient.acquireTokenByDeviceCode(deviceCodeRequest);
                if (deviceResponse && deviceResponse.expiresOn) {
                    const expiresOnTimestamp = deviceResponse.expiresOn.getTime();
                    logger$f.getToken.info(formatSuccess(scopes));
                    return {
                        expiresOnTimestamp,
                        token: deviceResponse.accessToken
                    };
                }
                else {
                    throw new Error("Did not receive token with a valid expiration");
                }
            }
            catch (error) {
                throw new Error(`Device Authentication Error "${JSON.stringify(error)}"`);
            }
        });
    }
}

// Copyright (c) Microsoft Corporation.
const logger$g = credentialLogger("AuthorizationCodeCredential");
/**
 * Enables authentication to Azure Active Directory using an authorization code
 * that was obtained through the authorization code flow, described in more detail
 * in the Azure Active Directory documentation:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 */
class AuthorizationCodeCredential {
    /**
     * @hidden
     * @internal
     */
    constructor(tenantId, clientId, clientSecretOrAuthorizationCode, authorizationCodeOrRedirectUri, redirectUriOrOptions, options) {
        this.lastTokenResponse = null;
        checkTenantId(logger$g, tenantId);
        this.clientId = clientId;
        this.tenantId = tenantId;
        if (typeof redirectUriOrOptions === "string") {
            // the clientId+clientSecret constructor
            this.clientSecret = clientSecretOrAuthorizationCode;
            this.authorizationCode = authorizationCodeOrRedirectUri;
            this.redirectUri = redirectUriOrOptions;
            // options okay
        }
        else {
            // clientId only
            this.clientSecret = undefined;
            this.authorizationCode = clientSecretOrAuthorizationCode;
            this.redirectUri = authorizationCodeOrRedirectUri;
            options = redirectUriOrOptions;
        }
        this.identityClient = new IdentityClient(options);
    }
    /**
     * Authenticates with Azure Active Directory and returns an access token if
     * successful.  If authentication cannot be performed at this time, this method may
     * return null.  If an error occurs during authentication, an {@link AuthenticationError}
     * containing failure details will be thrown.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    getToken(scopes, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const { span, updatedOptions: newOptions } = createSpan("AuthorizationCodeCredential-getToken", options);
            try {
                let tokenResponse = null;
                let scopeString = typeof scopes === "string" ? scopes : scopes.join(" ");
                if (scopeString.indexOf("offline_access") < 0) {
                    scopeString += " offline_access";
                }
                // Try to use the refresh token first
                if (this.lastTokenResponse && this.lastTokenResponse.refreshToken) {
                    tokenResponse = yield this.identityClient.refreshAccessToken(this.tenantId, this.clientId, scopeString, this.lastTokenResponse.refreshToken, this.clientSecret, undefined, newOptions);
                }
                if (tokenResponse === null) {
                    const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
                    const webResource = coreRestPipeline.createPipelineRequest({
                        url: `${this.identityClient.authorityHost}/${this.tenantId}/${urlSuffix}`,
                        method: "POST",
                        body: qs.stringify({
                            client_id: this.clientId,
                            grant_type: "authorization_code",
                            scope: scopeString,
                            code: this.authorizationCode,
                            redirect_uri: this.redirectUri,
                            client_secret: this.clientSecret
                        }),
                        headers: coreRestPipeline.createHttpHeaders({
                            Accept: "application/json",
                            "Content-Type": "application/x-www-form-urlencoded"
                        }),
                        abortSignal: options && options.abortSignal,
                        tracingOptions: {
                            spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions,
                            tracingContext: newOptions.tracingOptions && newOptions.tracingOptions.tracingContext
                        }
                    });
                    tokenResponse = yield this.identityClient.sendTokenRequest(webResource);
                }
                this.lastTokenResponse = tokenResponse;
                logger$g.getToken.info(formatSuccess(scopes));
                return (tokenResponse && tokenResponse.accessToken) || null;
            }
            catch (err) {
                span.setStatus({
                    code: coreTracing.SpanStatusCode.ERROR,
                    message: err.message
                });
                logger$g.getToken.info(formatError(scopes, err));
                throw err;
            }
            finally {
                span.end();
            }
        });
    }
}

// Copyright (c) Microsoft Corporation.
/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
function getDefaultAzureCredential() {
    return new DefaultAzureCredential();
}

exports.AggregateAuthenticationError = AggregateAuthenticationError;
exports.AggregateAuthenticationErrorName = AggregateAuthenticationErrorName;
exports.AuthenticationError = AuthenticationError;
exports.AuthenticationErrorName = AuthenticationErrorName;
exports.AuthorizationCodeCredential = AuthorizationCodeCredential;
exports.AzureCliCredential = AzureCliCredential;
exports.ChainedTokenCredential = ChainedTokenCredential;
exports.ClientCertificateCredential = ClientCertificateCredential;
exports.ClientSecretCredential = ClientSecretCredential;
exports.CredentialUnavailable = CredentialUnavailable;
exports.DefaultAzureCredential = DefaultAzureCredential;
exports.DeviceCodeCredential = DeviceCodeCredential;
exports.EnvironmentCredential = EnvironmentCredential;
exports.InteractiveBrowserCredential = InteractiveBrowserCredential;
exports.ManagedIdentityCredential = ManagedIdentityCredential;
exports.UsernamePasswordCredential = UsernamePasswordCredential;
exports.VisualStudioCodeCredential = VisualStudioCodeCredential;
exports.getDefaultAzureCredential = getDefaultAzureCredential;
exports.logger = logger;
//# sourceMappingURL=index.js.map
