/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { __assign } from "tslib";
import { ResponseTypes, ServerHashParamKeys } from "./Constants";
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
        return __assign(__assign({}, originalResponse), { idToken: idTokenObj, idTokenClaims: idTokenObj.claims, uniqueId: idTokenObj.objectId || idTokenObj.subject, tenantId: idTokenObj.tenantId });
    };
    ResponseUtils.buildAuthResponse = function (idToken, authResponse, serverAuthenticationRequest, account, scopes, accountState) {
        switch (serverAuthenticationRequest.responseType) {
            case ResponseTypes.id_token:
                var idTokenResponse = __assign(__assign({}, authResponse), { tokenType: ServerHashParamKeys.ID_TOKEN, account: account, scopes: scopes, accountState: accountState });
                idTokenResponse = ResponseUtils.setResponseIdToken(idTokenResponse, idToken);
                return (idTokenResponse.idToken) ? idTokenResponse : null;
            case ResponseTypes.id_token_token:
                var idTokeTokenResponse = ResponseUtils.setResponseIdToken(authResponse, idToken);
                return (idTokeTokenResponse && idTokeTokenResponse.accessToken && idTokeTokenResponse.idToken) ? idTokeTokenResponse : null;
            case ResponseTypes.token:
                var tokenResponse = ResponseUtils.setResponseIdToken(authResponse, idToken);
                return tokenResponse;
            default:
                return null;
        }
    };
    return ResponseUtils;
}());
export { ResponseUtils };
//# sourceMappingURL=ResponseUtils.js.map