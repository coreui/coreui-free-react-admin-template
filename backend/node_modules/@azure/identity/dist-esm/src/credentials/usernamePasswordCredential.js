// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import qs from "qs";
import { createPipelineRequest, createHttpHeaders } from "@azure/core-rest-pipeline";
import { IdentityClient } from "../client/identityClient";
import { createSpan } from "../util/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
import { checkTenantId } from "../util/checkTenantId";
const logger = credentialLogger("UsernamePasswordCredential");
/**
 * Enables authentication to Azure Active Directory with a user's
 * username and password. This credential requires a high degree of
 * trust so you should only use it when other, more secure credential
 * types can't be used.
 */
export class UsernamePasswordCredential {
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
        checkTenantId(logger, tenantIdOrName);
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
        return __awaiter(this, void 0, void 0, function* () {
            const { span, updatedOptions: newOptions } = createSpan("UsernamePasswordCredential-getToken", options);
            try {
                const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
                const webResource = createPipelineRequest({
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
                const tokenResponse = yield this.identityClient.sendTokenRequest(webResource);
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
//# sourceMappingURL=usernamePasswordCredential.js.map