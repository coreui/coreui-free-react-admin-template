// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import qs from "qs";
import { createPipelineRequest, createHttpHeaders } from "@azure/core-rest-pipeline";
import { IdentityClient } from "../client/identityClient";
import { createSpan } from "../util/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { credentialLogger, formatError, formatSuccess } from "../util/logging";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
const logger = credentialLogger("ClientSecretCredential");
/**
 * Enables authentication to Azure Active Directory using a client secret
 * that was generated for an App Registration.  More information on how
 * to configure a client secret can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application
 *
 */
export class ClientSecretCredential {
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
        return __awaiter(this, void 0, void 0, function* () {
            const { span, updatedOptions } = createSpan("ClientSecretCredential-getToken", options);
            try {
                const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
                const request = createPipelineRequest({
                    url: `${this.identityClient.authorityHost}/${this.tenantId}/${urlSuffix}`,
                    method: "POST",
                    body: qs.stringify({
                        response_type: "token",
                        grant_type: "client_credentials",
                        client_id: this.clientId,
                        client_secret: this.clientSecret,
                        scope: typeof scopes === "string" ? scopes : scopes.join(" ")
                    }),
                    headers: createHttpHeaders({
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
//# sourceMappingURL=clientSecretCredential.js.map