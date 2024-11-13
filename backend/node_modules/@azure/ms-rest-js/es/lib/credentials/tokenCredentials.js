// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { HttpHeaders } from "../httpHeaders";
import { Constants } from "../util/constants";
var HeaderConstants = Constants.HeaderConstants;
var DEFAULT_AUTHORIZATION_SCHEME = "Bearer";
/**
 * A credentials object that uses a token string and a authorzation scheme to authenticate.
 */
var TokenCredentials = /** @class */ (function () {
    /**
     * Creates a new TokenCredentials object.
     *
     * @constructor
     * @param {string} token The token.
     * @param {string} [authorizationScheme] The authorization scheme.
     */
    function TokenCredentials(token, authorizationScheme) {
        if (authorizationScheme === void 0) { authorizationScheme = DEFAULT_AUTHORIZATION_SCHEME; }
        this.authorizationScheme = DEFAULT_AUTHORIZATION_SCHEME;
        if (!token) {
            throw new Error("token cannot be null or undefined.");
        }
        this.token = token;
        this.authorizationScheme = authorizationScheme;
    }
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResourceLike} webResource The WebResourceLike to be signed.
     * @return {Promise<WebResourceLike>} The signed request object.
     */
    TokenCredentials.prototype.signRequest = function (webResource) {
        if (!webResource.headers)
            webResource.headers = new HttpHeaders();
        webResource.headers.set(HeaderConstants.AUTHORIZATION, this.authorizationScheme + " " + this.token);
        return Promise.resolve(webResource);
    };
    return TokenCredentials;
}());
export { TokenCredentials };
//# sourceMappingURL=tokenCredentials.js.map