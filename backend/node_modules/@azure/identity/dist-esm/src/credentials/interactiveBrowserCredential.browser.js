// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import * as msal from "msal";
import { createSpan } from "../util/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { DefaultAuthorityHost, DefaultTenantId, DeveloperSignOnClientId } from "../constants";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
const logger = credentialLogger("InteractiveBrowserCredential");
/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.
 */
export class InteractiveBrowserCredential {
    /**
     * Creates an instance of the InteractiveBrowserCredential with the
     * details needed to authenticate against Azure Active Directory with
     * a user identity.
     *
     * @param tenantId - The Azure Active Directory tenant (directory) ID.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(options) {
        options = Object.assign(Object.assign({ authorityHost: DefaultAuthorityHost }, options), { tenantId: (options && options.tenantId) || DefaultTenantId, 
            // TODO: temporary - this is the Azure CLI clientID - we'll replace it when
            // Developer Sign On application is available
            // https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/identity/Azure.Identity/src/Constants.cs#L9
            clientId: (options && options.clientId) || DeveloperSignOnClientId });
        this.loginStyle = options.loginStyle || "popup";
        if (["redirect", "popup"].indexOf(this.loginStyle) === -1) {
            const error = new Error(`Invalid loginStyle: ${options.loginStyle}`);
            logger.info(formatError("", error));
            throw error;
        }
        const knownAuthorities = options.tenantId === "adfs" ? (options.authorityHost ? [options.authorityHost] : []) : [];
        this.msalConfig = {
            auth: Object.assign(Object.assign({ clientId: options.clientId, authority: `${options.authorityHost}/${options.tenantId}`, knownAuthorities }, (options.redirectUri && { redirectUri: options.redirectUri })), (options.postLogoutRedirectUri && { redirectUri: options.postLogoutRedirectUri })),
            cache: {
                cacheLocation: "localStorage",
                storeAuthStateInCookie: true
            }
        };
        this.msalObject = new msal.UserAgentApplication(this.msalConfig);
    }
    login() {
        switch (this.loginStyle) {
            case "redirect": {
                const loginPromise = new Promise((resolve, reject) => {
                    this.msalObject.handleRedirectCallback(resolve, reject);
                });
                this.msalObject.loginRedirect();
                return loginPromise;
            }
            case "popup":
                return this.msalObject.loginPopup();
        }
    }
    acquireToken(authParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let authResponse;
            try {
                logger.info("Attempting to acquire token silently");
                authResponse = yield this.msalObject.acquireTokenSilent(authParams);
            }
            catch (err) {
                if (err instanceof msal.AuthError) {
                    switch (err.errorCode) {
                        case "consent_required":
                        case "interaction_required":
                        case "login_required":
                            logger.info(`Authentication returned errorCode ${err.errorCode}`);
                            break;
                        default:
                            logger.info(formatError(authParams.scopes, `Failed to acquire token: ${err.message}`));
                            throw err;
                    }
                }
            }
            let authPromise;
            if (authResponse === undefined) {
                logger.info(`Silent authentication failed, falling back to interactive method ${this.loginStyle}`);
                switch (this.loginStyle) {
                    case "redirect":
                        authPromise = new Promise((resolve, reject) => {
                            this.msalObject.handleRedirectCallback(resolve, reject);
                        });
                        this.msalObject.acquireTokenRedirect(authParams);
                        break;
                    case "popup":
                        authPromise = this.msalObject.acquireTokenPopup(authParams);
                        break;
                }
                authResponse = authPromise && (yield authPromise);
            }
            return authResponse;
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
     *                  TokenCredential implementation might make.
     */
    getToken(scopes, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { span } = createSpan("InteractiveBrowserCredential-getToken", options);
            try {
                if (!this.msalObject.getAccount()) {
                    yield this.login();
                }
                const authResponse = yield this.acquireToken({
                    scopes: Array.isArray(scopes) ? scopes : scopes.split(",")
                });
                if (authResponse) {
                    const expiresOnTimestamp = authResponse.expiresOn.getTime();
                    logger.getToken.info(formatSuccess(scopes));
                    return {
                        token: authResponse.accessToken,
                        expiresOnTimestamp
                    };
                }
                else {
                    logger.getToken.info("No response");
                    return null;
                }
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
//# sourceMappingURL=interactiveBrowserCredential.browser.js.map