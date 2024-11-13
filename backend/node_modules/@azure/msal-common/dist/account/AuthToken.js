/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { StringUtils } from '../utils/StringUtils.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * JWT Token representation class. Parses token string and generates claims object.
 */
var AuthToken = /** @class */ (function () {
    function AuthToken(rawToken, crypto) {
        if (StringUtils.isEmpty(rawToken)) {
            throw ClientAuthError.createTokenNullOrEmptyError(rawToken);
        }
        this.rawToken = rawToken;
        this.claims = AuthToken.extractTokenClaims(rawToken, crypto);
    }
    /**
     * Extract token by decoding the rawToken
     *
     * @param encodedToken
     */
    AuthToken.extractTokenClaims = function (encodedToken, crypto) {
        var decodedToken = StringUtils.decodeAuthToken(encodedToken);
        // token will be decoded to get the username
        try {
            var base64TokenPayload = decodedToken.JWSPayload;
            // base64Decode() should throw an error if there is an issue
            var base64Decoded = crypto.base64Decode(base64TokenPayload);
            return JSON.parse(base64Decoded);
        }
        catch (err) {
            throw ClientAuthError.createTokenParsingError(err);
        }
    };
    return AuthToken;
}());

export { AuthToken };
//# sourceMappingURL=AuthToken.js.map
