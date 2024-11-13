/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __spreadArrays } from '../_virtual/_tslib.js';
import { AADServerParamKeys, Constants, ResponseMode, OIDC_DEFAULT_SCOPES, SSOTypes, HeaderNames, CLIENT_INFO, ClaimsRequestKeys, PasswordGrantConstants, AuthenticationScheme, ThrottlingConstants } from '../utils/Constants.js';
import { ScopeSet } from './ScopeSet.js';
import { ClientConfigurationError } from '../error/ClientConfigurationError.js';
import { RequestValidator } from './RequestValidator.js';
import { StringUtils } from '../utils/StringUtils.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var RequestParameterBuilder = /** @class */ (function () {
    function RequestParameterBuilder() {
        this.parameters = new Map();
    }
    /**
     * add response_type = code
     */
    RequestParameterBuilder.prototype.addResponseTypeCode = function () {
        this.parameters.set(AADServerParamKeys.RESPONSE_TYPE, encodeURIComponent(Constants.CODE_RESPONSE_TYPE));
    };
    /**
     * add response_mode. defaults to query.
     * @param responseMode
     */
    RequestParameterBuilder.prototype.addResponseMode = function (responseMode) {
        this.parameters.set(AADServerParamKeys.RESPONSE_MODE, encodeURIComponent((responseMode) ? responseMode : ResponseMode.QUERY));
    };
    /**
     * add scopes. set addOidcScopes to false to prevent default scopes in non-user scenarios
     * @param scopeSet
     * @param addOidcScopes
     */
    RequestParameterBuilder.prototype.addScopes = function (scopes, addOidcScopes) {
        if (addOidcScopes === void 0) { addOidcScopes = true; }
        var requestScopes = addOidcScopes ? __spreadArrays(scopes || [], OIDC_DEFAULT_SCOPES) : scopes || [];
        var scopeSet = new ScopeSet(requestScopes);
        this.parameters.set(AADServerParamKeys.SCOPE, encodeURIComponent(scopeSet.printScopes()));
    };
    /**
     * add clientId
     * @param clientId
     */
    RequestParameterBuilder.prototype.addClientId = function (clientId) {
        this.parameters.set(AADServerParamKeys.CLIENT_ID, encodeURIComponent(clientId));
    };
    /**
     * add redirect_uri
     * @param redirectUri
     */
    RequestParameterBuilder.prototype.addRedirectUri = function (redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.REDIRECT_URI, encodeURIComponent(redirectUri));
    };
    /**
     * add post logout redirectUri
     * @param redirectUri
     */
    RequestParameterBuilder.prototype.addPostLogoutRedirectUri = function (redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.POST_LOGOUT_URI, encodeURIComponent(redirectUri));
    };
    /**
     * add id_token_hint to logout request
     * @param idTokenHint
     */
    RequestParameterBuilder.prototype.addIdTokenHint = function (idTokenHint) {
        this.parameters.set(AADServerParamKeys.ID_TOKEN_HINT, encodeURIComponent(idTokenHint));
    };
    /**
     * add domain_hint
     * @param domainHint
     */
    RequestParameterBuilder.prototype.addDomainHint = function (domainHint) {
        this.parameters.set(SSOTypes.DOMAIN_HINT, encodeURIComponent(domainHint));
    };
    /**
     * add login_hint
     * @param loginHint
     */
    RequestParameterBuilder.prototype.addLoginHint = function (loginHint) {
        this.parameters.set(SSOTypes.LOGIN_HINT, encodeURIComponent(loginHint));
    };
    /**
     * Adds the CCS (Cache Credential Service) query parameter for login_hint
     * @param loginHint
     */
    RequestParameterBuilder.prototype.addCcsUpn = function (loginHint) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent("UPN:" + loginHint));
    };
    /**
     * Adds the CCS (Cache Credential Service) query parameter for account object
     * @param loginHint
     */
    RequestParameterBuilder.prototype.addCcsOid = function (clientInfo) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent("Oid:" + clientInfo.uid + "@" + clientInfo.utid));
    };
    /**
     * add sid
     * @param sid
     */
    RequestParameterBuilder.prototype.addSid = function (sid) {
        this.parameters.set(SSOTypes.SID, encodeURIComponent(sid));
    };
    /**
     * add claims
     * @param claims
     */
    RequestParameterBuilder.prototype.addClaims = function (claims, clientCapabilities) {
        var mergedClaims = this.addClientCapabilitiesToClaims(claims, clientCapabilities);
        RequestValidator.validateClaims(mergedClaims);
        this.parameters.set(AADServerParamKeys.CLAIMS, encodeURIComponent(mergedClaims));
    };
    /**
     * add correlationId
     * @param correlationId
     */
    RequestParameterBuilder.prototype.addCorrelationId = function (correlationId) {
        this.parameters.set(AADServerParamKeys.CLIENT_REQUEST_ID, encodeURIComponent(correlationId));
    };
    /**
     * add library info query params
     * @param libraryInfo
     */
    RequestParameterBuilder.prototype.addLibraryInfo = function (libraryInfo) {
        // Telemetry Info
        this.parameters.set(AADServerParamKeys.X_CLIENT_SKU, libraryInfo.sku);
        this.parameters.set(AADServerParamKeys.X_CLIENT_VER, libraryInfo.version);
        this.parameters.set(AADServerParamKeys.X_CLIENT_OS, libraryInfo.os);
        this.parameters.set(AADServerParamKeys.X_CLIENT_CPU, libraryInfo.cpu);
    };
    /**
     * add prompt
     * @param prompt
     */
    RequestParameterBuilder.prototype.addPrompt = function (prompt) {
        RequestValidator.validatePrompt(prompt);
        this.parameters.set("" + AADServerParamKeys.PROMPT, encodeURIComponent(prompt));
    };
    /**
     * add state
     * @param state
     */
    RequestParameterBuilder.prototype.addState = function (state) {
        if (!StringUtils.isEmpty(state)) {
            this.parameters.set(AADServerParamKeys.STATE, encodeURIComponent(state));
        }
    };
    /**
     * add nonce
     * @param nonce
     */
    RequestParameterBuilder.prototype.addNonce = function (nonce) {
        this.parameters.set(AADServerParamKeys.NONCE, encodeURIComponent(nonce));
    };
    /**
     * add code_challenge and code_challenge_method
     * - throw if either of them are not passed
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    RequestParameterBuilder.prototype.addCodeChallengeParams = function (codeChallenge, codeChallengeMethod) {
        RequestValidator.validateCodeChallengeParams(codeChallenge, codeChallengeMethod);
        if (codeChallenge && codeChallengeMethod) {
            this.parameters.set(AADServerParamKeys.CODE_CHALLENGE, encodeURIComponent(codeChallenge));
            this.parameters.set(AADServerParamKeys.CODE_CHALLENGE_METHOD, encodeURIComponent(codeChallengeMethod));
        }
        else {
            throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        }
    };
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    RequestParameterBuilder.prototype.addAuthorizationCode = function (code) {
        this.parameters.set(AADServerParamKeys.CODE, encodeURIComponent(code));
    };
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    RequestParameterBuilder.prototype.addDeviceCode = function (code) {
        this.parameters.set(AADServerParamKeys.DEVICE_CODE, encodeURIComponent(code));
    };
    /**
     * add the `refreshToken` passed by the user
     * @param refreshToken
     */
    RequestParameterBuilder.prototype.addRefreshToken = function (refreshToken) {
        this.parameters.set(AADServerParamKeys.REFRESH_TOKEN, encodeURIComponent(refreshToken));
    };
    /**
     * add the `code_verifier` passed by the user to exchange for a token
     * @param codeVerifier
     */
    RequestParameterBuilder.prototype.addCodeVerifier = function (codeVerifier) {
        this.parameters.set(AADServerParamKeys.CODE_VERIFIER, encodeURIComponent(codeVerifier));
    };
    /**
     * add client_secret
     * @param clientSecret
     */
    RequestParameterBuilder.prototype.addClientSecret = function (clientSecret) {
        this.parameters.set(AADServerParamKeys.CLIENT_SECRET, encodeURIComponent(clientSecret));
    };
    /**
     * add clientAssertion for confidential client flows
     * @param clientAssertion
     */
    RequestParameterBuilder.prototype.addClientAssertion = function (clientAssertion) {
        this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION, encodeURIComponent(clientAssertion));
    };
    /**
     * add clientAssertionType for confidential client flows
     * @param clientAssertionType
     */
    RequestParameterBuilder.prototype.addClientAssertionType = function (clientAssertionType) {
        this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION_TYPE, encodeURIComponent(clientAssertionType));
    };
    /**
     * add OBO assertion for confidential client flows
     * @param clientAssertion
     */
    RequestParameterBuilder.prototype.addOboAssertion = function (oboAssertion) {
        this.parameters.set(AADServerParamKeys.OBO_ASSERTION, encodeURIComponent(oboAssertion));
    };
    /**
     * add grant type
     * @param grantType
     */
    RequestParameterBuilder.prototype.addRequestTokenUse = function (tokenUse) {
        this.parameters.set(AADServerParamKeys.REQUESTED_TOKEN_USE, encodeURIComponent(tokenUse));
    };
    /**
     * add grant type
     * @param grantType
     */
    RequestParameterBuilder.prototype.addGrantType = function (grantType) {
        this.parameters.set(AADServerParamKeys.GRANT_TYPE, encodeURIComponent(grantType));
    };
    /**
     * add client info
     *
     */
    RequestParameterBuilder.prototype.addClientInfo = function () {
        this.parameters.set(CLIENT_INFO, "1");
    };
    /**
     * add extraQueryParams
     * @param eQparams
     */
    RequestParameterBuilder.prototype.addExtraQueryParameters = function (eQparams) {
        var _this = this;
        RequestValidator.sanitizeEQParams(eQparams, this.parameters);
        Object.keys(eQparams).forEach(function (key) {
            _this.parameters.set(key, eQparams[key]);
        });
    };
    RequestParameterBuilder.prototype.addClientCapabilitiesToClaims = function (claims, clientCapabilities) {
        var mergedClaims;
        // Parse provided claims into JSON object or initialize empty object
        if (!claims) {
            mergedClaims = {};
        }
        else {
            try {
                mergedClaims = JSON.parse(claims);
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidClaimsRequestError();
            }
        }
        if (clientCapabilities && clientCapabilities.length > 0) {
            if (!mergedClaims.hasOwnProperty(ClaimsRequestKeys.ACCESS_TOKEN)) {
                // Add access_token key to claims object
                mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN] = {};
            }
            // Add xms_cc claim with provided clientCapabilities to access_token key
            mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN][ClaimsRequestKeys.XMS_CC] = {
                values: clientCapabilities
            };
        }
        return JSON.stringify(mergedClaims);
    };
    /**
     * adds `username` for Password Grant flow
     * @param username
     */
    RequestParameterBuilder.prototype.addUsername = function (username) {
        this.parameters.set(PasswordGrantConstants.username, username);
    };
    /**
     * adds `password` for Password Grant flow
     * @param password
     */
    RequestParameterBuilder.prototype.addPassword = function (password) {
        this.parameters.set(PasswordGrantConstants.password, password);
    };
    /**
     * add pop_jwk to query params
     * @param cnfString
     */
    RequestParameterBuilder.prototype.addPopToken = function (cnfString) {
        if (!StringUtils.isEmpty(cnfString)) {
            this.parameters.set(AADServerParamKeys.TOKEN_TYPE, AuthenticationScheme.POP);
            this.parameters.set(AADServerParamKeys.REQ_CNF, encodeURIComponent(cnfString));
        }
    };
    /**
     * add server telemetry fields
     * @param serverTelemetryManager
     */
    RequestParameterBuilder.prototype.addServerTelemetry = function (serverTelemetryManager) {
        this.parameters.set(AADServerParamKeys.X_CLIENT_CURR_TELEM, serverTelemetryManager.generateCurrentRequestHeaderValue());
        this.parameters.set(AADServerParamKeys.X_CLIENT_LAST_TELEM, serverTelemetryManager.generateLastRequestHeaderValue());
    };
    /**
     * Adds parameter that indicates to the server that throttling is supported
     */
    RequestParameterBuilder.prototype.addThrottling = function () {
        this.parameters.set(AADServerParamKeys.X_MS_LIB_CAPABILITY, ThrottlingConstants.X_MS_LIB_CAPABILITY_VALUE);
    };
    /**
     * Utility to create a URL from the params map
     */
    RequestParameterBuilder.prototype.createQueryString = function () {
        var queryParameterArray = new Array();
        this.parameters.forEach(function (value, key) {
            queryParameterArray.push(key + "=" + value);
        });
        return queryParameterArray.join("&");
    };
    return RequestParameterBuilder;
}());

export { RequestParameterBuilder };
//# sourceMappingURL=RequestParameterBuilder.js.map
