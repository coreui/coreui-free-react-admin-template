// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import { IdentityClient } from "../../client/identityClient";
import { createSpan } from "../../util/tracing";
import { AuthenticationError, CredentialUnavailable } from "../../client/errors";
import { SpanStatusCode } from "@azure/core-tracing";
import { credentialLogger, formatSuccess, formatError } from "../../util/logging";
import { mapScopesToResource } from "./utils";
import { cloudShellMsi } from "./cloudShellMsi";
import { imdsMsi } from "./imdsMsi";
import { appServiceMsi2017 } from "./appServiceMsi2017";
import { arcMsi } from "./arcMsi";
const logger = credentialLogger("ManagedIdentityCredential");
/**
 * Attempts authentication using a managed identity that has been assigned
 * to the deployment environment.  This authentication type works in Azure VMs,
 * App Service and Azure Functions applications, and inside of Azure Cloud Shell.
 *
 * More information about configuring managed identities can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
 */
export class ManagedIdentityCredential {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
            const resource = mapScopesToResource(scopes);
            const { span, updatedOptions: options } = createSpan("ManagedIdentityCredential-authenticateManagedIdentity", getTokenOptions);
            try {
                // Determining the available MSI, and avoiding checking for other MSIs while the program is running.
                const availableMSI = yield this.cachedAvailableMSI(resource, clientId, options);
                return availableMSI.getToken(this.identityClient, resource, clientId, options);
            }
            catch (err) {
                span.setStatus({
                    code: SpanStatusCode.ERROR,
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
        return __awaiter(this, void 0, void 0, function* () {
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
                        logger.getToken.info(formatError(scopes, error));
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
                    logger.getToken.info(formatError(scopes, error));
                    throw error;
                }
                logger.getToken.info(formatSuccess(scopes));
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
                    code: SpanStatusCode.ERROR,
                    message: err.message
                });
                // If either the network is unreachable,
                // we can safely assume the credential is unavailable.
                if (err.code === "ENETUNREACH") {
                    const error = new CredentialUnavailable("ManagedIdentityCredential is unavailable. Network unreachable.");
                    logger.getToken.info(formatError(scopes, error));
                    throw error;
                }
                // If either the host was unreachable,
                // we can safely assume the credential is unavailable.
                if (err.code === "EHOSTUNREACH") {
                    const error = new CredentialUnavailable("ManagedIdentityCredential is unavailable. No managed identity endpoint found.");
                    logger.getToken.info(formatError(scopes, error));
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
//# sourceMappingURL=index.js.map