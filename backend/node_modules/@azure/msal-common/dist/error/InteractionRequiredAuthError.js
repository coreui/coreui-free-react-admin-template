/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends } from '../_virtual/_tslib.js';
import { ServerError } from './ServerError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * InteractionRequiredAuthErrorMessage class containing string constants used by error codes and messages.
 */
var InteractionRequiredAuthErrorMessage = [
    "interaction_required",
    "consent_required",
    "login_required"
];
var InteractionRequiredAuthSubErrorMessage = [
    "message_only",
    "additional_action",
    "basic_action",
    "user_password_expired",
    "consent_required"
];
/**
 * Error thrown when user interaction is required at the auth server.
 */
var InteractionRequiredAuthError = /** @class */ (function (_super) {
    __extends(InteractionRequiredAuthError, _super);
    function InteractionRequiredAuthError(errorCode, errorMessage, subError) {
        var _this = _super.call(this, errorCode, errorMessage, subError) || this;
        _this.name = "InteractionRequiredAuthError";
        Object.setPrototypeOf(_this, InteractionRequiredAuthError.prototype);
        return _this;
    }
    InteractionRequiredAuthError.isInteractionRequiredError = function (errorCode, errorString, subError) {
        var isInteractionRequiredErrorCode = !!errorCode && InteractionRequiredAuthErrorMessage.indexOf(errorCode) > -1;
        var isInteractionRequiredSubError = !!subError && InteractionRequiredAuthSubErrorMessage.indexOf(subError) > -1;
        var isInteractionRequiredErrorDesc = !!errorString && InteractionRequiredAuthErrorMessage.some(function (irErrorCode) {
            return errorString.indexOf(irErrorCode) > -1;
        });
        return isInteractionRequiredErrorCode || isInteractionRequiredErrorDesc || isInteractionRequiredSubError;
    };
    return InteractionRequiredAuthError;
}(ServerError));

export { InteractionRequiredAuthError, InteractionRequiredAuthErrorMessage, InteractionRequiredAuthSubErrorMessage };
//# sourceMappingURL=InteractionRequiredAuthError.js.map
