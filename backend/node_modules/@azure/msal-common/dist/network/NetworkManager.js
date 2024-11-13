/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __awaiter, __generator } from '../_virtual/_tslib.js';
import { ThrottlingUtils } from './ThrottlingUtils.js';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { AuthError } from '../error/AuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var NetworkManager = /** @class */ (function () {
    function NetworkManager(networkClient, cacheManager) {
        this.networkClient = networkClient;
        this.cacheManager = cacheManager;
    }
    /**
     * Wraps sendPostRequestAsync with necessary preflight and postflight logic
     * @param thumbprint
     * @param tokenEndpoint
     * @param options
     */
    NetworkManager.prototype.sendPostRequest = function (thumbprint, tokenEndpoint, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ThrottlingUtils.preProcess(this.cacheManager, thumbprint);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.networkClient.sendPostRequestAsync(tokenEndpoint, options)];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1 instanceof AuthError) {
                            throw e_1;
                        }
                        else {
                            throw ClientAuthError.createNetworkError(tokenEndpoint, e_1);
                        }
                    case 4:
                        ThrottlingUtils.postProcess(this.cacheManager, thumbprint, response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return NetworkManager;
}());

export { NetworkManager };
//# sourceMappingURL=NetworkManager.js.map
