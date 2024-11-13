/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends } from '../_virtual/_tslib.js';
import { Constants } from '../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * AuthErrorMessage class containing string constants used by error codes and messages.
 */
var AuthErrorMessage = {
    unexpectedError: {
        code: "unexpected_error",
        desc: "Unexpected error in authentication."
    }
};
/**
 * General error class thrown by the MSAL.js library.
 */
var AuthError = /** @class */ (function (_super) {
    __extends(AuthError, _super);
    function AuthError(errorCode, errorMessage, suberror) {
        var _this = this;
        var errorString = errorMessage ? errorCode + ": " + errorMessage : errorCode;
        _this = _super.call(this, errorString) || this;
        Object.setPrototypeOf(_this, AuthError.prototype);
        _this.errorCode = errorCode || Constants.EMPTY_STRING;
        _this.errorMessage = errorMessage || "";
        _this.subError = suberror || "";
        _this.name = "AuthError";
        return _this;
    }
    /**
     * Creates an error that is thrown when something unexpected happens in the library.
     * @param errDesc
     */
    AuthError.createUnexpectedError = function (errDesc) {
        return new AuthError(AuthErrorMessage.unexpectedError.code, AuthErrorMessage.unexpectedError.desc + ": " + errDesc);
    };
    return AuthError;
}(Error));

export { AuthError, AuthErrorMessage };
//# sourceMappingURL=AuthError.js.map
