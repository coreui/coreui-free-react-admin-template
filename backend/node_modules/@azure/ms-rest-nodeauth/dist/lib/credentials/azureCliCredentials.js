"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_rest_js_1 = require("@azure/ms-rest-js");
const login_1 = require("../login");
/**
 * Describes the credentials by retrieving token via Azure CLI.
 */
class AzureCliCredentials {
    constructor(subscriptionInfo, tokenInfo, 
    // tslint:disable-next-line: no-inferrable-types
    resource = "https://management.azure.com") {
        /**
         * Azure resource endpoints.
         * - Defaults to Azure Resource Manager from environment: AzureCloud. "https://management.azure.com"
         * - For Azure KeyVault: "https://vault.azure.net"
         * - For Azure Batch: "https://batch.core.windows.net"
         * - For Azure Active Directory Graph: "https://graph.windows.net"
         *
         * To get the resource for other clouds:
         * - `az cloud list`
         */
        // tslint:disable-next-line: no-inferrable-types
        this.resource = "https://management.azure.com";
        /**
         * The number of seconds within which it is good to renew the token.
         *  A constant set to 270 seconds (4.5 minutes).
         */
        this._tokenRenewalMarginInSeconds = 270;
        this.subscriptionInfo = subscriptionInfo;
        this.tokenInfo = tokenInfo;
        this.resource = resource;
    }
    /**
     * Tries to get the new token from Azure CLI, if the token has expired or the subscription has
     * changed else uses the cached accessToken.
     * @returns The tokenResponse (tokenType and accessToken are the two important properties).
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._hasTokenExpired() || this._hasSubscriptionChanged() || this._hasResourceChanged()) {
                try {
                    // refresh the access token
                    this.tokenInfo = yield AzureCliCredentials.getAccessToken({
                        subscriptionIdOrName: this.subscriptionInfo.id,
                        resource: this.resource
                    });
                }
                catch (err) {
                    throw new Error(`An error occurred while refreshing the new access ` +
                        `token:${err.stderr ? err.stderr : err.message}`);
                }
            }
            const result = {
                accessToken: this.tokenInfo.accessToken,
                tokenType: this.tokenInfo.tokenType,
                expiresOn: this.tokenInfo.expiresOn,
                tenantId: this.tokenInfo.tenant
            };
            return result;
        });
    }
    /**
     * Signs a request with the Authentication header.
     * @param The request to be signed.
     */
    signRequest(webResource) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenResponse = yield this.getToken();
            webResource.headers.set(ms_rest_js_1.Constants.HeaderConstants.AUTHORIZATION, `${tokenResponse.tokenType} ${tokenResponse.accessToken}`);
            return webResource;
        });
    }
    _hasTokenExpired() {
        let result = true;
        const now = Math.floor(Date.now() / 1000);
        if (this.tokenInfo.expiresOn &&
            this.tokenInfo.expiresOn instanceof Date &&
            Math.floor(this.tokenInfo.expiresOn.getTime() / 1000) - now >
                this._tokenRenewalMarginInSeconds) {
            result = false;
        }
        return result;
    }
    _hasSubscriptionChanged() {
        return this.subscriptionInfo.id !== this.tokenInfo.subscription;
    }
    _parseToken() {
        try {
            const base64Url = this.tokenInfo.accessToken.split(".")[1];
            const base64 = decodeURIComponent(Buffer.from(base64Url, "base64")
                .toString("binary")
                .split("")
                .map((c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
                .join(""));
            return JSON.parse(base64);
        }
        catch (err) {
            const msg = `An error occurred while parsing the access token: ${err.stack}`;
            throw new Error(msg);
        }
    }
    _isAzureResourceManagerEndpoint(newResource, currentResource) {
        if (newResource.endsWith("/"))
            newResource = newResource.slice(0, -1);
        if (currentResource.endsWith("/"))
            currentResource = currentResource.slice(0, -1);
        return ((newResource === "https://management.core.windows.net" &&
            currentResource === "https://management.azure.com") ||
            (newResource === "https://management.azure.com" &&
                currentResource === "https://management.core.windows.net"));
    }
    _hasResourceChanged() {
        const parsedToken = this._parseToken();
        // normalize the resource string, since it is possible to
        // provide a resource without a trailing slash
        const currentResource = parsedToken.aud && parsedToken.aud.endsWith("/")
            ? parsedToken.aud.slice(0, -1)
            : parsedToken.aud;
        const newResource = this.resource.endsWith("/") ? this.resource.slice(0, -1) : this.resource;
        const result = this._isAzureResourceManagerEndpoint(newResource, currentResource)
            ? false
            : currentResource !== newResource;
        return result;
    }
    /**
     * Gets the access token for the default or specified subscription.
     * @param options Optional parameters that can be provided to get the access token.
     */
    static getAccessToken(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cmdArguments = ["account", "get-access-token"];
                if (options.subscriptionIdOrName) {
                    cmdArguments.push("-s");
                    cmdArguments.push(options.subscriptionIdOrName);
                }
                if (options.resource) {
                    cmdArguments.push("--resource");
                    cmdArguments.push(options.resource);
                }
                const result = yield login_1.execAz(cmdArguments);
                result.expiresOn = new Date(result.expiresOn);
                return result;
            }
            catch (err) {
                const message = `An error occurred while getting credentials from ` + `Azure CLI: ${err.stack}`;
                throw new Error(message);
            }
        });
    }
    /**
     * Gets the subscription from Azure CLI.
     * @param subscriptionIdOrName - The name or id of the subscription for which the information is
     * required.
     */
    static getSubscription(subscriptionIdOrName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (subscriptionIdOrName &&
                (typeof subscriptionIdOrName !== "string" || !subscriptionIdOrName.length)) {
                throw new Error("'subscriptionIdOrName' must be a non-empty string.");
            }
            try {
                const cmdArguments = ["account", "show"];
                if (subscriptionIdOrName) {
                    cmdArguments.push("-s");
                    cmdArguments.push(subscriptionIdOrName);
                }
                const result = yield login_1.execAz(cmdArguments);
                return result;
            }
            catch (err) {
                const message = `An error occurred while getting information about the current subscription from ` +
                    `Azure CLI: ${err.stack}`;
                throw new Error(message);
            }
        });
    }
    /**
     * Sets the specified subscription as the default subscription for Azure CLI.
     * @param subscriptionIdOrName The name or id of the subsciption that needs to be set as the
     * default subscription.
     */
    static setDefaultSubscription(subscriptionIdOrName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield login_1.execAz(["account", "set", "-s", subscriptionIdOrName]);
            }
            catch (err) {
                const message = `An error occurred while setting the current subscription from ` +
                    `Azure CLI: ${err.stack}`;
                throw new Error(message);
            }
        });
    }
    /**
     * Returns a list of all the subscriptions from Azure CLI.
     * @param options Optional parameters that can be provided while listing all the subcriptions.
     */
    static listAllSubscriptions(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let subscriptionList = [];
            try {
                const cmdArguments = ["account", "list"];
                if (options.all) {
                    cmdArguments.push(" --all");
                }
                if (options.refresh) {
                    cmdArguments.push("--refresh");
                }
                subscriptionList = yield login_1.execAz(cmdArguments);
                if (subscriptionList && subscriptionList.length) {
                    for (const sub of subscriptionList) {
                        if (sub.cloudName) {
                            sub.environmentName = sub.cloudName;
                            delete sub.cloudName;
                        }
                    }
                }
                return subscriptionList;
            }
            catch (err) {
                const message = `An error occurred while getting a list of all the subscription from ` +
                    `Azure CLI: ${err.stack}`;
                throw new Error(message);
            }
        });
    }
    /**
     * Provides credentials that can be used by the JS SDK to interact with Azure via azure cli.
     * **Pre-requisite**
     * - **install azure-cli** . For more information see
     * {@link https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest Install Azure CLI}
     * - **login via `az login`**
     * @param options - Optional parameters that can be provided while creating AzureCliCredentials.
     */
    static create(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const [subscriptinInfo, accessToken] = yield Promise.all([
                AzureCliCredentials.getSubscription(options.subscriptionIdOrName),
                AzureCliCredentials.getAccessToken(options)
            ]);
            return new AzureCliCredentials(subscriptinInfo, accessToken, options.resource);
        });
    }
}
exports.AzureCliCredentials = AzureCliCredentials;
//# sourceMappingURL=azureCliCredentials.js.map