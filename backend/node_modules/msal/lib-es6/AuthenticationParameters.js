/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ClientConfigurationError } from "./error/ClientConfigurationError";
export function validateClaimsRequest(request) {
    if (!request.claimsRequest) {
        return;
    }
    try {
        JSON.parse(request.claimsRequest);
    }
    catch (e) {
        throw ClientConfigurationError.createClaimsRequestParsingError(e);
    }
    // TODO: More validation will be added when the server team tells us how they have actually implemented claims
}
//# sourceMappingURL=AuthenticationParameters.js.map