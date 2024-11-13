// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import { CredentialUnavailable } from "./errors";
import { PublicClientApplication } from "@azure/msal-node";
import axios from "axios";
import { IdentityClient } from "./identityClient";
import { credentialLogger } from "../util/logging";
const logger = credentialLogger("InteractiveBrowserCredential");
export class AuthenticationRequired extends CredentialUnavailable {
}
export class MsalClient {
    constructor(msalConfig, persistenceEnabled, authenticationRecord, options) {
        this.identityClient = new IdentityClient(options);
        this.msalConfig = msalConfig;
        this.persistenceEnabled = persistenceEnabled;
        this.authenticationRecord = authenticationRecord;
    }
    prepareClientApplications() {
        return __awaiter(this, void 0, void 0, function* () {
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
            this.pca = new PublicClientApplication(clientConfig);
        });
    }
    acquireTokenFromCache(scopes) {
        return __awaiter(this, void 0, void 0, function* () {
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
                logger.info("Successful silent token acquisition");
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
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepareClientApplications();
            return this.pca.getAuthCodeUrl(request);
        });
    }
    acquireTokenByCode(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepareClientApplications();
            return this.pca.acquireTokenByCode(request);
        });
    }
    acquireTokenByDeviceCode(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepareClientApplications();
            return this.pca.acquireTokenByDeviceCode(request);
        });
    }
    acquireTokenByClientCredential(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepareClientApplications();
            return this.cca.acquireTokenByClientCredential(request);
        });
    }
}
export var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["POST"] = "post";
})(HttpMethod || (HttpMethod = {}));
/**
 * This class implements the API for network requests.
 */
export class HttpClient {
    /**
     * Http Get request
     * @param url -
     * @param options -
     */
    sendGetRequestAsync(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                method: HttpMethod.GET,
                url: url,
                headers: options && options.headers,
                validateStatus: () => true
            };
            const response = yield axios(request);
            const out = {
                headers: response.headers,
                body: response.data,
                status: response.status
            };
            return out;
        });
    }
    /**
     * Http Post request
     * @param url -
     * @param options -
     */
    sendPostRequestAsync(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                method: HttpMethod.POST,
                url: url,
                data: (options && options.body) || "",
                headers: options && options.headers,
                validateStatus: () => true
            };
            const response = yield axios(request);
            const out = {
                headers: response.headers,
                body: response.data,
                status: response.status
            };
            return out;
        });
    }
}
//# sourceMappingURL=msalClient.js.map