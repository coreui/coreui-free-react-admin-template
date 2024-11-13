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
const tokenCredentialsBase_1 = require("./tokenCredentialsBase");
class UserTokenCredentials extends tokenCredentialsBase_1.TokenCredentialsBase {
    /**
     * Creates a new UserTokenCredentials object.
     *
     *
     * @param clientId - The active directory application client id.
     * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
     * for an example.
     * @param domain - The domain or tenant id containing this application.
     * @param username - The user name for the Organization Id account.
     * @param password - The password for the Organization Id account.
     * @param tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
     * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferably in a guid format).
     * @param environment - The azure environment to authenticate with.
     * @param tokenCache - The token cache. Default value is the MemoryCache object from adal.
     */
    constructor(clientId, domain, username, password, tokenAudience, environment, tokenCache) {
        if (!clientId || typeof clientId.valueOf() !== "string") {
            throw new Error("clientId must be a non empty string.");
        }
        if (!domain || typeof domain.valueOf() !== "string") {
            throw new Error("domain must be a non empty string.");
        }
        if (!username || typeof username.valueOf() !== "string") {
            throw new Error("username must be a non empty string.");
        }
        if (!password || typeof password.valueOf() !== "string") {
            throw new Error("password must be a non empty string.");
        }
        super(clientId, domain, tokenAudience, environment, tokenCache);
        this.username = username;
        this.password = password;
    }
    crossCheckUserNameWithToken(username, userIdFromToken) {
        // to maintain the casing consistency between "azureprofile.json" and token cache. (RD 1996587)
        // use the "userId" here, which should be the same with "username" except the casing.
        return username.toLowerCase() === userIdFromToken.toLowerCase();
    }
    /**
     * Tries to get the token from cache initially. If that is unsuccessful then it tries to get the token from ADAL.
     *
     * @returns The tokenResponse (tokenType and accessToken are the two important properties).
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getTokenFromCache(this.username);
            }
            catch (error) {
                const self = this;
                const resource = this.getActiveDirectoryResourceId();
                return new Promise((resolve, reject) => {
                    self.authContext.acquireTokenWithUsernamePassword(resource, self.username, self.password, self.clientId, (error, tokenResponse) => {
                        if (error) {
                            return reject(error);
                        }
                        if (tokenResponse.error || tokenResponse.errorDescription) {
                            return reject(tokenResponse);
                        }
                        tokenResponse = tokenResponse;
                        if (self.crossCheckUserNameWithToken(self.username, tokenResponse.userId)) {
                            return resolve(tokenResponse);
                        }
                        else {
                            return reject(`The userId "${tokenResponse.userId}" in access token doesn't match the username "${self.username}" provided during authentication.`);
                        }
                    });
                });
            }
        });
    }
}
exports.UserTokenCredentials = UserTokenCredentials;
//# sourceMappingURL=userTokenCredentials.js.map