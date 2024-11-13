// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import qs from "qs";
import { createSpan } from "../util/tracing";
import { createPipelineRequest, createHttpHeaders } from "@azure/core-rest-pipeline";
import { IdentityClient } from "../client/identityClient";
import { SpanStatusCode } from "@azure/core-tracing";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
import { checkTenantId } from "../util/checkTenantId";
const logger = credentialLogger("AuthorizationCodeCredential");
/**
 * Enables authentication to Azure Active Directory using an authorization code
 * that was obtained through the authorization code flow, described in more detail
 * in the Azure Active Directory documentation:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 */
export class AuthorizationCodeCredential {
    /**
     * @hidden
     * @internal
     */
    constructor(tenantId, clientId, clientSecretOrAuthorizationCode, authorizationCodeOrRedirectUri, redirectUriOrOptions, options) {
        this.lastTokenResponse = null;
        checkTenantId(logger, tenantId);
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
        return __awaiter(this, void 0, void 0, function* () {
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
                    const webResource = createPipelineRequest({
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
                        headers: createHttpHeaders({
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
                logger.getToken.info(formatSuccess(scopes));
                return (tokenResponse && tokenResponse.accessToken) || null;
            }
            catch (err) {
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: err.message
                });
                logger.getToken.info(formatError(scopes, err));
                throw err;
            }
            finally {
                span.end();
            }
        });
    }
}
//# sourceMappingURL=authorizationCodeCredential.js.map