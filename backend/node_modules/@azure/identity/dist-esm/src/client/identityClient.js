// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import qs from "qs";
import { SpanStatusCode } from "@azure/core-tracing";
import { ServiceClient } from "@azure/core-client";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { AuthenticationError, AuthenticationErrorName } from "./errors";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
import { DefaultAuthorityHost } from "../constants";
import { createSpan } from "../util/tracing";
import { logger } from "../util/logging";
import { isNode } from "../util/isNode";
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
export function getIdentityClientAuthorityHost(options) {
    // The authorityHost can come from options or from the AZURE_AUTHORITY_HOST environment variable.
    let authorityHost = options === null || options === void 0 ? void 0 : options.authorityHost;
    // The AZURE_AUTHORITY_HOST environment variable can only be provided in NodeJS.
    if (isNode) {
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
export class IdentityClient extends ServiceClient {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
                const webResource = createPipelineRequest({
                    url: `${this.authorityHost}/${tenantId}/${urlSuffix}`,
                    method: "POST",
                    body: qs.stringify(refreshParams),
                    abortSignal: options && options.abortSignal,
                    headers: createHttpHeaders({
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
                        code: SpanStatusCode.ERROR,
                        message: err.message
                    });
                    return null;
                }
                else {
                    logger.warning(`IdentityClient: failed refreshing token for client ID: ${clientId}: ${err}`);
                    span.setStatus({
                        code: SpanStatusCode.ERROR,
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
        return __awaiter(this, void 0, void 0, function* () {
            const request = createPipelineRequest({
                url,
                method: "GET",
                body: options === null || options === void 0 ? void 0 : options.body,
                headers: createHttpHeaders(options === null || options === void 0 ? void 0 : options.headers)
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
        return __awaiter(this, void 0, void 0, function* () {
            const request = createPipelineRequest({
                url,
                method: "POST",
                body: options === null || options === void 0 ? void 0 : options.body,
                headers: createHttpHeaders(options === null || options === void 0 ? void 0 : options.headers)
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
//# sourceMappingURL=identityClient.js.map