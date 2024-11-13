"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClaimsRequest = void 0;
var ClientConfigurationError_1 = require("./error/ClientConfigurationError");
function validateClaimsRequest(request) {
    if (!request.claimsRequest) {
        return;
    }
    try {
        JSON.parse(request.claimsRequest);
    }
    catch (e) {
        throw ClientConfigurationError_1.ClientConfigurationError.createClaimsRequestParsingError(e);
    }
    // TODO: More validation will be added when the server team tells us how they have actually implemented claims
}
exports.validateClaimsRequest = validateClaimsRequest;
//# sourceMappingURL=AuthenticationParameters.js.map