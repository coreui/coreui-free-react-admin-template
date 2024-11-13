// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __awaiter, __generator } from "tslib";
import { Constants as MSRestConstants } from "../util/constants";
var DEFAULT_AUTHORIZATION_SCHEME = "Bearer";
/**
 * Resource manager endpoints to match in order to specify a valid scope to the AzureIdentityCredentialAdapter.
 */
export var azureResourceManagerEndpoints = [
    "https://management.windows.net",
    "https://management.chinacloudapi.cn",
    "https://management.usgovcloudapi.net",
    "https://management.cloudapi.de",
];
/**
 * This class provides a simple extension to use {@link TokenCredential} from `@azure/identity` library to
 * use with legacy Azure SDKs that accept {@link ServiceClientCredentials} family of credentials for authentication.
 */
var AzureIdentityCredentialAdapter = /** @class */ (function () {
    function AzureIdentityCredentialAdapter(azureTokenCredential, scopes) {
        if (scopes === void 0) { scopes = "https://management.azure.com/.default"; }
        this.azureTokenCredential = azureTokenCredential;
        this.scopes = scopes;
    }
    AzureIdentityCredentialAdapter.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.azureTokenCredential.getToken(this.scopes)];
                    case 1:
                        accessToken = _a.sent();
                        if (accessToken !== null) {
                            result = {
                                accessToken: accessToken.token,
                                tokenType: DEFAULT_AUTHORIZATION_SCHEME,
                                expiresOn: accessToken.expiresOnTimestamp,
                            };
                            return [2 /*return*/, result];
                        }
                        else {
                            throw new Error("Could find token for scope");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AzureIdentityCredentialAdapter.prototype.signRequest = function (webResource) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken()];
                    case 1:
                        tokenResponse = _a.sent();
                        webResource.headers.set(MSRestConstants.HeaderConstants.AUTHORIZATION, tokenResponse.tokenType + " " + tokenResponse.accessToken);
                        return [2 /*return*/, Promise.resolve(webResource)];
                }
            });
        });
    };
    return AzureIdentityCredentialAdapter;
}());
export { AzureIdentityCredentialAdapter };
//# sourceMappingURL=azureIdentityTokenCredentialAdapter.js.map