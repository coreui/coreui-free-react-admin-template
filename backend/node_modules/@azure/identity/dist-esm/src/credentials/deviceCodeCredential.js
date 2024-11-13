import { __awaiter } from "tslib";
import { AuthenticationRequired, MsalClient } from "../client/msalClient";
import { createSpan } from "../util/tracing";
import { credentialLogger, formatError, formatSuccess } from "../util/logging";
import { SpanStatusCode } from "@azure/core-tracing";
import { checkTenantId } from "../util/checkTenantId";
import { DeveloperSignOnClientId } from "../constants";
const logger = credentialLogger("DeviceCodeCredential");
/**
 * Method that logs the user code from the DeviceCodeCredential.
 * @param deviceCodeInfo - The device code.
 */
export function defaultDeviceCodePromptCallback(deviceCodeInfo) {
    console.log(deviceCodeInfo.message);
}
/**
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
export class DeviceCodeCredential {
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
        checkTenantId(logger, tenantId);
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
        return __awaiter(this, void 0, void 0, function* () {
            const { span } = createSpan("DeviceCodeCredential-getToken", options);
            const scopeArray = typeof scopes === "object" ? scopes : [scopes];
            const deviceCodeRequest = {
                deviceCodeCallback: this.userPromptCallback,
                scopes: scopeArray
            };
            logger.info(`DeviceCodeCredential invoked. Scopes: ${scopeArray.join(", ")}`);
            return this.msalClient.acquireTokenFromCache(scopeArray).catch((e) => __awaiter(this, void 0, void 0, function* () {
                if (e instanceof AuthenticationRequired) {
                    try {
                        const token = yield this.acquireTokenByDeviceCode(deviceCodeRequest, scopeArray);
                        logger.getToken.info(formatSuccess(scopeArray));
                        return token;
                    }
                    catch (err) {
                        span.setStatus({
                            code: SpanStatusCode.ERROR,
                            message: err.message
                        });
                        logger.getToken.info(formatError(scopeArray, err));
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deviceResponse = yield this.msalClient.acquireTokenByDeviceCode(deviceCodeRequest);
                if (deviceResponse && deviceResponse.expiresOn) {
                    const expiresOnTimestamp = deviceResponse.expiresOn.getTime();
                    logger.getToken.info(formatSuccess(scopes));
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
//# sourceMappingURL=deviceCodeCredential.js.map