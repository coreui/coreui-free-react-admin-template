// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
var RestError = /** @class */ (function (_super) {
    __extends(RestError, _super);
    function RestError(message, code, statusCode, request, response, body) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.statusCode = statusCode;
        _this.request = request;
        _this.response = response;
        _this.body = body;
        Object.setPrototypeOf(_this, RestError.prototype);
        return _this;
    }
    RestError.REQUEST_SEND_ERROR = "REQUEST_SEND_ERROR";
    RestError.REQUEST_ABORTED_ERROR = "REQUEST_ABORTED_ERROR";
    RestError.PARSE_ERROR = "PARSE_ERROR";
    return RestError;
}(Error));
export { RestError };
//# sourceMappingURL=restError.js.map