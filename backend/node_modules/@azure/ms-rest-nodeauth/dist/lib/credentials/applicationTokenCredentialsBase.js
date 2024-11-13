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
const authConstants_1 = require("../util/authConstants");
class ApplicationTokenCredentialsBase extends tokenCredentialsBase_1.TokenCredentialsBase {
    /**
     * Creates a new ApplicationTokenCredentials object.
     * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
     * for detailed instructions on creating an Azure Active Directory application.
     *
     * @param clientId - The active directory application client id.
     * @param domain - The domain or tenant id containing this application.
     * @param tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
     * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferrably in a guid format).
     * @param environment - The azure environment to authenticate with.
     * @param tokenCache - The token cache. Default value is the MemoryCache object from adal.
     */
    constructor(clientId, domain, tokenAudience, environment, tokenCache) {
        super(clientId, domain, tokenAudience, environment, tokenCache);
    }
    getTokenFromCache() {
        const _super = Object.create(null, {
            getTokenFromCache: { get: () => super.getTokenFromCache }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // a thin wrapper over the base implementation. try get token from cache, additionaly clean up cache if required.
            try {
                return yield _super.getTokenFromCache.call(this, undefined);
            }
            catch (error) {
                // Remove the stale token from the tokencache. ADAL gives the same error message "Entry not found in cache."
                // for entry not being present in the cache and for accessToken being expired in the cache. We do not want the token cache
                // to contain the expired token, we clean it up here.
                const status = yield this.removeInvalidItemsFromCache({
                    _clientId: this.clientId
                });
                if (status.result) {
                    throw error;
                }
                const message = status && status.details && status.details.message
                    ? status.details.message
                    : status.details;
                throw new Error(authConstants_1.AuthConstants.SDK_INTERNAL_ERROR +
                    " : " +
                    "critical failure while removing expired token for service principal from token cache. " +
                    message);
            }
        });
    }
    /**
     * Removes invalid items from token cache. This method is different. Here we never reject in case of error.
     * Rather we resolve with an object that says the result is false and error information is provided in
     * the details property of the resolved object. This is done to do better error handling in the above function
     * where removeInvalidItemsFromCache() is called.
     * @param query - The query to be used for finding the token for service principal from the cache
     * @returns resultObject with more info.
     */
    removeInvalidItemsFromCache(query) {
        const self = this;
        return new Promise((resolve) => {
            self.tokenCache.find(query, (error, entries) => {
                if (error) {
                    return resolve({ result: false, details: error });
                }
                if (entries && entries.length > 0) {
                    return self.tokenCache.remove(entries, (err) => {
                        if (err) {
                            return resolve({ result: false, details: err });
                        }
                        return resolve({ result: true });
                    });
                }
                else {
                    return resolve({ result: true });
                }
            });
        });
    }
}
exports.ApplicationTokenCredentialsBase = ApplicationTokenCredentialsBase;
//# sourceMappingURL=applicationTokenCredentialsBase.js.map