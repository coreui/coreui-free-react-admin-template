/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __awaiter, __generator } from '../_virtual/_tslib.js';
import { AuthToken } from '../account/AuthToken.js';
import { TimeUtils } from '../utils/TimeUtils.js';
import { UrlString } from '../url/UrlString.js';
import { ClientAuthError } from '../error/ClientAuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var KeyLocation;
(function (KeyLocation) {
    KeyLocation["SW"] = "sw";
    KeyLocation["UHW"] = "uhw";
})(KeyLocation || (KeyLocation = {}));
var PopTokenGenerator = /** @class */ (function () {
    function PopTokenGenerator(cryptoUtils) {
        this.cryptoUtils = cryptoUtils;
    }
    PopTokenGenerator.prototype.generateCnf = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var kidThumbprint, reqCnf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cryptoUtils.getPublicKeyThumbprint(request)];
                    case 1:
                        kidThumbprint = _a.sent();
                        reqCnf = {
                            kid: kidThumbprint,
                            xms_ksl: KeyLocation.SW
                        };
                        return [2 /*return*/, this.cryptoUtils.base64Encode(JSON.stringify(reqCnf))];
                }
            });
        });
    };
    PopTokenGenerator.prototype.signPopToken = function (accessToken, request) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokenClaims, resourceRequestMethod, resourceRequestUri, shrClaims, resourceUrlString, resourceUrlComponents;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenClaims = AuthToken.extractTokenClaims(accessToken, this.cryptoUtils);
                        resourceRequestMethod = request.resourceRequestMethod, resourceRequestUri = request.resourceRequestUri, shrClaims = request.shrClaims;
                        resourceUrlString = (resourceRequestUri) ? new UrlString(resourceRequestUri) : undefined;
                        resourceUrlComponents = resourceUrlString === null || resourceUrlString === void 0 ? void 0 : resourceUrlString.getUrlComponents();
                        if (!((_a = tokenClaims === null || tokenClaims === void 0 ? void 0 : tokenClaims.cnf) === null || _a === void 0 ? void 0 : _a.kid)) {
                            throw ClientAuthError.createTokenClaimsRequiredError();
                        }
                        return [4 /*yield*/, this.cryptoUtils.signJwt({
                                at: accessToken,
                                ts: TimeUtils.nowSeconds(),
                                m: resourceRequestMethod === null || resourceRequestMethod === void 0 ? void 0 : resourceRequestMethod.toUpperCase(),
                                u: resourceUrlComponents === null || resourceUrlComponents === void 0 ? void 0 : resourceUrlComponents.HostNameAndPort,
                                nonce: this.cryptoUtils.createNewGuid(),
                                p: resourceUrlComponents === null || resourceUrlComponents === void 0 ? void 0 : resourceUrlComponents.AbsolutePath,
                                q: (resourceUrlComponents === null || resourceUrlComponents === void 0 ? void 0 : resourceUrlComponents.QueryString) ? [[], resourceUrlComponents.QueryString] : undefined,
                                client_claims: shrClaims || undefined
                            }, tokenClaims.cnf.kid)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return PopTokenGenerator;
}());

export { PopTokenGenerator };
//# sourceMappingURL=PopTokenGenerator.js.map
