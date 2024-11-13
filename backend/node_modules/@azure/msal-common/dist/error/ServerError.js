/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends } from '../_virtual/_tslib.js';
import { AuthError } from './AuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(errorCode, errorMessage, subError) {
        var _this = _super.call(this, errorCode, errorMessage, subError) || this;
        _this.name = "ServerError";
        Object.setPrototypeOf(_this, ServerError.prototype);
        return _this;
    }
    return ServerError;
}(AuthError));

export { ServerError };
//# sourceMappingURL=ServerError.js.map
