/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isOpenIdConfigResponse(response) {
    return (response.hasOwnProperty("authorization_endpoint") &&
        response.hasOwnProperty("token_endpoint") &&
        response.hasOwnProperty("end_session_endpoint") &&
        response.hasOwnProperty("issuer"));
}

export { isOpenIdConfigResponse };
//# sourceMappingURL=OpenIdConfigResponse.js.map
