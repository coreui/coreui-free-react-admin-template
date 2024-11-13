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
const ms_rest_azure_env_1 = require("@azure/ms-rest-azure-env");
const adal_node_1 = require("adal-node");
class TokenCredentialsBase {
    constructor(clientId, domain, tokenAudience, environment = ms_rest_azure_env_1.Environment.AzureCloud, tokenCache = new adal_node_1.MemoryCache()) {
        this.clientId = clientId;
        this.domain = domain;
        this.tokenAudience = tokenAudience;
        this.environment = environment;
        this.tokenCache = tokenCache;
        if (!clientId || typeof clientId.valueOf() !== "string") {
            throw new Error("clientId must be a non empty string.");
        }
        if (!domain || typeof domain.valueOf() !== "string") {
            throw new Error("domain must be a non empty string.");
        }
        if (this.tokenAudience === "graph" && this.domain.toLowerCase() === "common") {
            throw new Error(`${'If the tokenAudience is specified as "graph" then "domain" cannot be defaulted to "common" tenant.\
        It must be the actual tenant (preferably a string in a guid format).'}`);
        }
        const authorityUrl = this.environment.activeDirectoryEndpointUrl + this.domain;
        this.authContext = new adal_node_1.AuthenticationContext(authorityUrl, this.environment.validateAuthority, this.tokenCache);
    }
    setDomain(domain) {
        this.domain = domain;
        const authorityUrl = this.environment.activeDirectoryEndpointUrl + this.domain;
        this.authContext = new adal_node_1.AuthenticationContext(authorityUrl, this.environment.validateAuthority, this.tokenCache);
    }
    getActiveDirectoryResourceId() {
        let resource = this.environment.activeDirectoryResourceId;
        if (this.tokenAudience) {
            resource = this.tokenAudience;
            if (this.tokenAudience.toLowerCase() === "graph") {
                resource = this.environment.activeDirectoryGraphResourceId;
            }
            else if (this.tokenAudience.toLowerCase() === "batch") {
                resource = this.environment.batchResourceId;
            }
        }
        return resource;
    }
    getTokenFromCache(username) {
        const self = this;
        const resource = this.getActiveDirectoryResourceId();
        return new Promise((resolve, reject) => {
            self.authContext.acquireToken(resource, username, self.clientId, (error, tokenResponse) => {
                if (error) {
                    return reject(error);
                }
                if (tokenResponse.error || tokenResponse.errorDescription) {
                    return reject(tokenResponse);
                }
                return resolve(tokenResponse);
            });
        });
    }
    /**
     * Signs a request with the Authentication header.
     *
     * @param webResource - The WebResource to be signed.
     */
    signRequest(webResource) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenResponse = yield this.getToken();
            webResource.headers.set(ms_rest_js_1.Constants.HeaderConstants.AUTHORIZATION, `${tokenResponse.tokenType} ${tokenResponse.accessToken}`);
            return webResource;
        });
    }
}
exports.TokenCredentialsBase = TokenCredentialsBase;
//# sourceMappingURL=tokenCredentialsBase.js.map