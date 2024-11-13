/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __awaiter, __generator } from '../_virtual/_tslib.js';
import { Authority } from './Authority.js';
import { ClientConfigurationError } from '../error/ClientConfigurationError.js';
import { StringUtils } from '../utils/StringUtils.js';
import { ClientAuthError } from '../error/ClientAuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var AuthorityFactory = /** @class */ (function () {
    function AuthorityFactory() {
    }
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Also performs endpoint discovery.
     *
     * @param authorityUri
     * @param networkClient
     * @param protocolMode
     */
    AuthorityFactory.createDiscoveredInstance = function (authorityUri, networkClient, cacheManager, authorityOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var acquireTokenAuthority, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        acquireTokenAuthority = AuthorityFactory.createInstance(authorityUri, networkClient, cacheManager, authorityOptions);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, acquireTokenAuthority.resolveEndpointsAsync()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, acquireTokenAuthority];
                    case 3:
                        e_1 = _a.sent();
                        throw ClientAuthError.createEndpointDiscoveryIncompleteError(e_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Does not perform endpoint discovery.
     *
     * @param authorityUrl
     * @param networkInterface
     * @param protocolMode
     */
    AuthorityFactory.createInstance = function (authorityUrl, networkInterface, cacheManager, authorityOptions) {
        // Throw error if authority url is empty
        if (StringUtils.isEmpty(authorityUrl)) {
            throw ClientConfigurationError.createUrlEmptyError();
        }
        return new Authority(authorityUrl, networkInterface, cacheManager, authorityOptions);
    };
    return AuthorityFactory;
}());

export { AuthorityFactory };
//# sourceMappingURL=AuthorityFactory.js.map
