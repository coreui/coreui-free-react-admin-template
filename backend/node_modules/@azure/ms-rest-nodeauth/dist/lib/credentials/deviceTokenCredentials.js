"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const tokenCredentialsBase_1 = require("./tokenCredentialsBase");
const authConstants_1 = require("../util/authConstants");
class DeviceTokenCredentials extends tokenCredentialsBase_1.TokenCredentialsBase {
    /**
     * Creates a new DeviceTokenCredentials object that gets a new access token using userCodeInfo (contains user_code, device_code)
     * for authenticating user on device.
     *
     * When this credential is used, the script will provide a url and code. The user needs to copy the url and the code, paste it
     * in a browser and authenticate over there. If successful, the script will get the access token.
     *
     *
     * @param clientId - The active directory application client id.
     * @param domain - The domain or tenant id containing this application. Default value is "common"
     * @param username - The user name for account in the form: "user@example.com".
     * @param tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
     * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferrably in a guid format).
     * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
     * for an example.
     * @param environment - The azure environment to authenticate with. Default environment is "Azure" popularly known as "Public Azure Cloud".
     * @param tokenCache - The token cache. Default value is the MemoryCache object from adal.
     */
    constructor(clientId, domain, username, tokenAudience, environment, tokenCache) {
        if (!username) {
            username = "user@example.com";
        }
        if (!domain) {
            domain = authConstants_1.AuthConstants.AAD_COMMON_TENANT;
        }
        if (!clientId) {
            clientId = authConstants_1.AuthConstants.DEFAULT_ADAL_CLIENT_ID;
        }
        super(clientId, domain, tokenAudience, environment, tokenCache);
        this.username = username;
    }
    getToken() {
        // For device auth, this is just getTokenFromCache.
        return this.getTokenFromCache(this.username);
    }
}
exports.DeviceTokenCredentials = DeviceTokenCredentials;
//# sourceMappingURL=deviceTokenCredentials.js.map