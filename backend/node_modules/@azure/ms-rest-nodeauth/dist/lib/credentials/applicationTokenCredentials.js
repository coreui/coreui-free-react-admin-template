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
const applicationTokenCredentialsBase_1 = require("./applicationTokenCredentialsBase");
const authConstants_1 = require("../util/authConstants");
class ApplicationTokenCredentials extends applicationTokenCredentialsBase_1.ApplicationTokenCredentialsBase {
    /**
     * Creates a new ApplicationTokenCredentials object.
     * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
     * for detailed instructions on creating an Azure Active Directory application.
     *
     * @param clientId - The active directory application client id.
     * @param domain - The domain or tenant id containing this application.
     * @param secret - The authentication secret for the application.
     * @param tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
     * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferrably in a guid format).
     * @param environment - The azure environment to authenticate with.
     * @param tokenCache - The token cache. Default value is the MemoryCache object from adal.
     */
    constructor(clientId, domain, secret, tokenAudience, environment, tokenCache) {
        if (!secret || typeof secret.valueOf() !== "string") {
            throw new Error("secret must be a non empty string.");
        }
        super(clientId, domain, tokenAudience, environment, tokenCache);
        this.secret = secret;
    }
    /**
     * Tries to get the token from cache initially. If that is unsuccessfull then it tries to get the token from ADAL.
     * @returns A promise that resolves to TokenResponse and rejects with an Error.
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getTokenFromCache();
            }
            catch (error) {
                if (error.message && error.message.startsWith(authConstants_1.AuthConstants.SDK_INTERNAL_ERROR)) {
                    throw error;
                }
                const resource = this.getActiveDirectoryResourceId();
                return new Promise((resolve, reject) => {
                    this.authContext.acquireTokenWithClientCredentials(resource, this.clientId, this.secret, (error, tokenResponse) => {
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
        });
    }
}
exports.ApplicationTokenCredentials = ApplicationTokenCredentials;
//# sourceMappingURL=applicationTokenCredentials.js.map