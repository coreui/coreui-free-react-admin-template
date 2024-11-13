/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { __spreadArrays } from "tslib";
import { CryptoUtils } from "./utils/CryptoUtils";
import { SSOTypes, Constants, PromptState, ResponseTypes } from "./utils/Constants";
import { ScopeSet } from "./ScopeSet";
import { version as libraryVersion } from "./packageMetadata";
/**
 * Nonce: OIDC Nonce definition: https://openid.net/specs/openid-connect-core-1_0.html#IDToken
 * State: OAuth Spec: https://tools.ietf.org/html/rfc6749#section-10.12
 * @hidden
 */
var ServerRequestParameters = /** @class */ (function () {
    /**
     * Constructor
     * @param authority
     * @param clientId
     * @param scope
     * @param responseType
     * @param redirectUri
     * @param state
     */
    function ServerRequestParameters(authority, clientId, responseType, redirectUri, scopes, state, correlationId) {
        this.authorityInstance = authority;
        this.clientId = clientId;
        this.nonce = CryptoUtils.createNewGuid();
        // set scope to clientId if null
        this.scopes = scopes ? __spreadArrays(scopes) : Constants.oidcScopes;
        this.scopes = ScopeSet.trimScopes(this.scopes);
        // set state (already set at top level)
        this.state = state;
        // set correlationId
        this.correlationId = correlationId;
        // telemetry information
        this.xClientSku = "MSAL.JS";
        this.xClientVer = libraryVersion;
        this.responseType = responseType;
        this.redirectUri = redirectUri;
    }
    Object.defineProperty(ServerRequestParameters.prototype, "authority", {
        get: function () {
            return this.authorityInstance ? this.authorityInstance.CanonicalAuthority : null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @hidden
     * @ignore
     *
     * Utility to populate QueryParameters and ExtraQueryParameters to ServerRequestParamerers
     * @param request
     * @param serverAuthenticationRequest
     */
    ServerRequestParameters.prototype.populateQueryParams = function (account, request, adalIdTokenObject, silentCall) {
        var queryParameters = {};
        if (request) {
            // add the prompt parameter to serverRequestParameters if passed
            if (request.prompt) {
                this.promptValue = request.prompt;
            }
            // Add claims challenge to serverRequestParameters if passed
            if (request.claimsRequest) {
                this.claimsValue = request.claimsRequest;
            }
            // if the developer provides one of these, give preference to developer choice
            if (ServerRequestParameters.isSSOParam(request)) {
                queryParameters = this.constructUnifiedCacheQueryParameter(request, null);
            }
        }
        if (adalIdTokenObject) {
            queryParameters = this.constructUnifiedCacheQueryParameter(null, adalIdTokenObject);
        }
        /*
         * adds sid/login_hint if not populated
         * this.logger.verbose("Calling addHint parameters");
         */
        queryParameters = this.addHintParameters(account, queryParameters);
        // sanity check for developer passed extraQueryParameters
        var eQParams = request ? request.extraQueryParameters : null;
        // Populate the extraQueryParameters to be sent to the server
        this.queryParameters = ServerRequestParameters.generateQueryParametersString(queryParameters);
        this.extraQueryParameters = ServerRequestParameters.generateQueryParametersString(eQParams, silentCall);
    };
    // #region QueryParam helpers
    /**
     * Constructs extraQueryParameters to be sent to the server for the AuthenticationParameters set by the developer
     * in any login() or acquireToken() calls
     * @param idTokenObject
     * @param extraQueryParameters
     * @param sid
     * @param loginHint
     */
    // TODO: check how this behaves when domain_hint only is sent in extraparameters and idToken has no upn.
    ServerRequestParameters.prototype.constructUnifiedCacheQueryParameter = function (request, idTokenObject) {
        var _a;
        // preference order: account > sid > login_hint
        var ssoType;
        var ssoData;
        var serverReqParam = {};
        // if account info is passed, account.login_hint claim > account.sid > account.username
        if (request) {
            if (request.account) {
                var account = request.account;
                if ((_a = account.idTokenClaims) === null || _a === void 0 ? void 0 : _a.login_hint) {
                    ssoType = SSOTypes.LOGIN_HINT;
                    ssoData = account.idTokenClaims.login_hint;
                }
                else if (account.sid) {
                    ssoType = SSOTypes.SID;
                    ssoData = account.sid;
                }
                else if (account.userName) {
                    ssoType = SSOTypes.LOGIN_HINT;
                    ssoData = account.userName;
                }
            }
            // sid from request
            else if (request.sid) {
                ssoType = SSOTypes.SID;
                ssoData = request.sid;
            }
            // loginHint from request
            else if (request.loginHint) {
                ssoType = SSOTypes.LOGIN_HINT;
                ssoData = request.loginHint;
            }
        }
        // adalIdToken retrieved from cache
        else if (idTokenObject) {
            if (idTokenObject.hasOwnProperty(Constants.upn)) {
                ssoType = SSOTypes.ID_TOKEN;
                ssoData = idTokenObject["upn"];
            }
        }
        serverReqParam = this.addSSOParameter(ssoType, ssoData);
        return serverReqParam;
    };
    /**
     * @hidden
     *
     * Adds login_hint to authorization URL which is used to pre-fill the username field of sign in page for the user if known ahead of time
     * domain_hint if added skips the email based discovery process of the user - only supported for interactive calls in implicit_flow
     * domain_req utid received as part of the clientInfo
     * login_req uid received as part of clientInfo
     * Also does a sanity check for extraQueryParameters passed by the user to ensure no repeat queryParameters
     *
     * @param {@link Account} account - Account for which the token is requested
     * @param queryparams
     * @param {@link ServerRequestParameters}
     * @ignore
     */
    ServerRequestParameters.prototype.addHintParameters = function (account, params) {
        var _a, _b;
        /*
         * This is a final check for all queryParams added so far; preference order: sid > login_hint
         * sid cannot be passed along with login_hint or domain_hint, hence we check both are not populated yet in queryParameters
         */
        var qParams = params;
        if (account) {
            if (!qParams[SSOTypes.SID] && !qParams[SSOTypes.LOGIN_HINT]) {
                if ((_a = account.idTokenClaims) === null || _a === void 0 ? void 0 : _a.login_hint) {
                    // Use login_hint claim if available over sid or email/upn
                    qParams = this.addSSOParameter(SSOTypes.LOGIN_HINT, (_b = account.idTokenClaims) === null || _b === void 0 ? void 0 : _b.login_hint, qParams);
                }
                else if (account.sid && this.promptValue === PromptState.NONE) {
                    // sid - populate only if login_hint is not already populated and the account has sid
                    qParams = this.addSSOParameter(SSOTypes.SID, account.sid, qParams);
                }
                else if (account.userName) {
                    // Add username/upn as loginHint if nothing else available
                    qParams = this.addSSOParameter(SSOTypes.LOGIN_HINT, account.userName, qParams);
                }
            }
        }
        return qParams;
    };
    /**
     * Add SID to extraQueryParameters
     * @param sid
     */
    ServerRequestParameters.prototype.addSSOParameter = function (ssoType, ssoData, params) {
        var ssoParam = params || {};
        if (!ssoData) {
            return ssoParam;
        }
        switch (ssoType) {
            case SSOTypes.SID: {
                ssoParam[SSOTypes.SID] = ssoData;
                break;
            }
            case SSOTypes.ID_TOKEN: {
                ssoParam[SSOTypes.LOGIN_HINT] = ssoData;
                break;
            }
            case SSOTypes.LOGIN_HINT: {
                ssoParam[SSOTypes.LOGIN_HINT] = ssoData;
                break;
            }
        }
        return ssoParam;
    };
    /**
     * Utility to generate a QueryParameterString from a Key-Value mapping of extraQueryParameters passed
     * @param extraQueryParameters
     */
    ServerRequestParameters.generateQueryParametersString = function (queryParameters, silentCall) {
        var paramsString = null;
        if (queryParameters) {
            Object.keys(queryParameters).forEach(function (key) {
                // sid cannot be passed along with login_hint or domain_hint
                if (key === Constants.domain_hint && (silentCall || queryParameters[SSOTypes.SID])) {
                    return;
                }
                if (!paramsString) {
                    paramsString = key + "=" + encodeURIComponent(queryParameters[key]);
                }
                else {
                    paramsString += "&" + key + "=" + encodeURIComponent(queryParameters[key]);
                }
            });
        }
        return paramsString;
    };
    // #endregion
    /**
     * Check to see if there are SSO params set in the Request
     * @param request
     */
    ServerRequestParameters.isSSOParam = function (request) {
        return !!(request && (request.account || request.sid || request.loginHint));
    };
    /**
     * Returns the correct response_type string attribute for an acquireToken request configuration
     * @param accountsMatch boolean: Determines whether the account in the request matches the cached account
     * @param scopes Array<string>: AuthenticationRequest scopes configuration
     * @param loginScopesOnly boolean: True if the scopes array ONLY contains the clientId or any combination of OIDC scopes, without resource scopes
     */
    ServerRequestParameters.determineResponseType = function (accountsMatch, scopes) {
        // Supports getting an id_token by sending in clientId as only scope or OIDC scopes as only scopes
        if (ScopeSet.onlyContainsOidcScopes(scopes)) {
            return ResponseTypes.id_token;
        }
        // If accounts match, check if OIDC scopes are included, otherwise return id_token_token
        return (accountsMatch) ? this.responseTypeForMatchingAccounts(scopes) : ResponseTypes.id_token_token;
    };
    /**
     * Returns the correct response_type string attribute for an acquireToken request configuration that contains an
     * account that matches the account in the MSAL cache.
     * @param scopes Array<string>: AuthenticationRequest scopes configuration
     */
    ServerRequestParameters.responseTypeForMatchingAccounts = function (scopes) {
        // Opt-into also requesting an ID token by sending in 'openid', 'profile' or both along with resource scopes when login is not necessary.
        return (ScopeSet.containsAnyOidcScopes(scopes)) ? ResponseTypes.id_token_token : ResponseTypes.token;
    };
    return ServerRequestParameters;
}());
export { ServerRequestParameters };
//# sourceMappingURL=ServerRequestParameters.js.map