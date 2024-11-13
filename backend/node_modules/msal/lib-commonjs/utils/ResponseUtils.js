"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtils = void 0;
var tslib_1 = require("tslib");
var Constants_1 = require("./Constants");
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 */
var ResponseUtils = /** @class */ (function () {
    function ResponseUtils() {
    }
    ResponseUtils.setResponseIdToken = function (originalResponse, idTokenObj) {
        if (!originalResponse) {
            return null;
        }
        else if (!idTokenObj) {
            return originalResponse;
        }
        var exp = Number(idTokenObj.expiration);
        if (exp && !originalResponse.expiresOn) {
            originalResponse.expiresOn = new Date(exp * 1000);
        }
        return tslib_1.__assign(tslib_1.__assign({}, originalResponse), { idToken: idTokenObj, idTokenClaims: idTokenObj.claims, uniqueId: idTokenObj.objectId || idTokenObj.subject, tenantId: idTokenObj.tenantId });
    };
    ResponseUtils.buildAuthResponse = function (idToken, authResponse, serverAuthenticationRequest, account, scopes, accountState) {
        switch (serverAuthenticationRequest.responseType) {
            case Constants_1.ResponseTypes.id_token:
                var idTokenResponse = tslib_1.__assign(tslib_1.__assign({}, authResponse), { tokenType: Constants_1.ServerHashParamKeys.ID_TOKEN, account: account, scopes: scopes, accountState: accountState });
                idTokenResponse = ResponseUtils.setResponseIdToken(idTokenResponse, idToken);
                return (idTokenResponse.idToken) ? idTokenResponse : null;
            case Constants_1.ResponseTypes.id_token_token:
                var idTokeTokenResponse = ResponseUtils.setResponseIdToken(authResponse, idToken);
                return (idTokeTokenResponse && idTokeTokenResponse.accessToken && idTokeTokenResponse.idToken) ? idTokeTokenResponse : null;
            case Constants_1.ResponseTypes.token:
                var tokenResponse = ResponseUtils.setResponseIdToken(authResponse, idToken);
                return tokenResponse;
            default:
                return null;
        }
    };
    return ResponseUtils;
}());
exports.ResponseUtils = ResponseUtils;
//# sourceMappingURL=ResponseUtils.js.map