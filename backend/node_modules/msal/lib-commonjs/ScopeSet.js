"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeSet = void 0;
var tslib_1 = require("tslib");
var ClientConfigurationError_1 = require("./error/ClientConfigurationError");
var Constants_1 = require("./utils/Constants");
var ScopeSet = /** @class */ (function () {
    function ScopeSet() {
    }
    /**
     * Check if there are dup scopes in a given request
     *
     * @param cachedScopes
     * @param scopes
     */
    // TODO: Rename this, intersecting scopes isn't a great name for duplicate checker
    ScopeSet.isIntersectingScopes = function (cachedScopes, scopes) {
        var convertedCachedScopes = this.trimAndConvertArrayToLowerCase(tslib_1.__spreadArrays(cachedScopes));
        var requestScopes = this.trimAndConvertArrayToLowerCase(tslib_1.__spreadArrays(scopes));
        for (var i = 0; i < requestScopes.length; i++) {
            if (convertedCachedScopes.indexOf(requestScopes[i].toLowerCase()) > -1) {
                return true;
            }
        }
        return false;
    };
    /**
     * Check if a given scope is present in the request
     *
     * @param cachedScopes
     * @param scopes
     */
    ScopeSet.containsScope = function (cachedScopes, scopes) {
        var convertedCachedScopes = this.trimAndConvertArrayToLowerCase(tslib_1.__spreadArrays(cachedScopes));
        var requestScopes = this.trimAndConvertArrayToLowerCase(tslib_1.__spreadArrays(scopes));
        return requestScopes.every(function (value) { return convertedCachedScopes.indexOf(value.toString().toLowerCase()) >= 0; });
    };
    /**
     *  Trims and converts string to lower case
     *
     * @param scopes
     */
    // TODO: Rename this, too generic name for a function that only deals with scopes
    ScopeSet.trimAndConvertToLowerCase = function (scope) {
        return scope.trim().toLowerCase();
    };
    /**
     * Performs trimAndConvertToLowerCase on string array
     * @param scopes
     */
    ScopeSet.trimAndConvertArrayToLowerCase = function (scopes) {
        var _this = this;
        return scopes.map(function (scope) { return _this.trimAndConvertToLowerCase(scope); });
    };
    /**
     * Trims each scope in scopes array
     * @param scopes
     */
    ScopeSet.trimScopes = function (scopes) {
        return scopes.map(function (scope) { return scope.trim(); });
    };
    /**
     * Remove one element from a scope array
     *
     * @param scopes
     * @param scope
     */
    // TODO: Rename this, too generic name for a function that only deals with scopes
    ScopeSet.removeElement = function (scopes, scope) {
        var scopeVal = this.trimAndConvertToLowerCase(scope);
        return scopes.filter(function (value) { return value !== scopeVal; });
    };
    /**
     * Parse the scopes into a formatted scopeList
     * @param scopes
     */
    ScopeSet.parseScope = function (scopes) {
        var scopeList = "";
        if (scopes) {
            for (var i = 0; i < scopes.length; ++i) {
                scopeList += (i !== scopes.length - 1) ? scopes[i] + " " : scopes[i];
            }
        }
        return scopeList;
    };
    /**
     * @hidden
     *
     * Used to validate the scopes input parameter requested  by the developer.
     * @param {Array<string>} scopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
     * @ignore
     */
    ScopeSet.validateInputScope = function (scopes, scopesRequired) {
        if (!scopes) {
            if (scopesRequired) {
                throw ClientConfigurationError_1.ClientConfigurationError.createScopesRequiredError(scopes);
            }
            else {
                return;
            }
        }
        // Check that scopes is an array object (also throws error if scopes == null)
        if (!Array.isArray(scopes)) {
            throw ClientConfigurationError_1.ClientConfigurationError.createScopesNonArrayError(scopes);
        }
        // Check that scopes is not an empty array
        if (scopes.length < 1 && scopesRequired) {
            throw ClientConfigurationError_1.ClientConfigurationError.createEmptyScopesArrayError(scopes.toString());
        }
    };
    /**
     * @hidden
     *
     * Extracts scope value from the state sent with the authentication request.
     * @param {string} state
     * @returns {string} scope.
     * @ignore
     */
    ScopeSet.getScopeFromState = function (state) {
        if (state) {
            var splitIndex = state.indexOf(Constants_1.Constants.resourceDelimiter);
            if (splitIndex > -1 && splitIndex + 1 < state.length) {
                return state.substring(splitIndex + 1);
            }
        }
        return "";
    };
    /**
     * @ignore
     * Appends extraScopesToConsent if passed
     * @param {@link AuthenticationParameters}
     */
    ScopeSet.appendScopes = function (reqScopes, reqExtraScopesToConsent) {
        if (reqScopes) {
            var convertedExtraScopes = reqExtraScopesToConsent ? this.trimAndConvertArrayToLowerCase(tslib_1.__spreadArrays(reqExtraScopesToConsent)) : null;
            var convertedReqScopes = this.trimAndConvertArrayToLowerCase(tslib_1.__spreadArrays(reqScopes));
            return convertedExtraScopes ? tslib_1.__spreadArrays(convertedReqScopes, convertedExtraScopes) : convertedReqScopes;
        }
        return null;
    };
    // #endregion
    /**
     * @ignore
     * Returns true if the scopes array only contains openid and/or profile
     */
    ScopeSet.onlyContainsOidcScopes = function (scopes) {
        var scopesCount = scopes.length;
        var oidcScopesFound = 0;
        if (scopes.indexOf(Constants_1.Constants.openidScope) > -1) {
            oidcScopesFound += 1;
        }
        if (scopes.indexOf(Constants_1.Constants.profileScope) > -1) {
            oidcScopesFound += 1;
        }
        return (scopesCount > 0 && scopesCount === oidcScopesFound);
    };
    /**
     * @ignore
     * Returns true if the scopes array only contains openid and/or profile
     */
    ScopeSet.containsAnyOidcScopes = function (scopes) {
        var containsOpenIdScope = scopes.indexOf(Constants_1.Constants.openidScope) > -1;
        var containsProfileScope = scopes.indexOf(Constants_1.Constants.profileScope) > -1;
        return (containsOpenIdScope || containsProfileScope);
    };
    /**
     * @ignore
     * Returns true if the clientId is the only scope in the array
     */
    ScopeSet.onlyContainsClientId = function (scopes, clientId) {
        // Double negation to force false value returned in case scopes is null
        return !!scopes && (scopes.indexOf(clientId) > -1 && scopes.length === 1);
    };
    /**
     * @ignore
     * Adds missing OIDC scopes to scopes array without duplication. Since STS requires OIDC scopes for
     * all implicit flow requests, 'openid' and 'profile' should always be included in the final request
     */
    ScopeSet.appendDefaultScopes = function (scopes) {
        var extendedScopes = scopes;
        if (extendedScopes.indexOf(Constants_1.Constants.openidScope) === -1) {
            extendedScopes.push(Constants_1.Constants.openidScope);
        }
        if (extendedScopes.indexOf(Constants_1.Constants.profileScope) === -1) {
            extendedScopes.push(Constants_1.Constants.profileScope);
        }
        return extendedScopes;
    };
    /**
     * @ignore
     * Removes present OIDC scopes from scopes array.
     */
    ScopeSet.removeDefaultScopes = function (scopes) {
        return scopes.filter(function (scope) {
            return (scope !== Constants_1.Constants.openidScope && scope !== Constants_1.Constants.profileScope);
        });
    };
    /**
     * @ignore
     * Removes clientId from scopes array if included as only scope. If it's not the only scope, it is treated as a resource scope.
     * @param scopes Array<string>: Pre-normalized scopes array
     * @param clientId string: The application's clientId that is searched for in the scopes array
     */
    ScopeSet.translateClientIdIfSingleScope = function (scopes, clientId) {
        return this.onlyContainsClientId(scopes, clientId) ? Constants_1.Constants.oidcScopes : scopes;
    };
    return ScopeSet;
}());
exports.ScopeSet = ScopeSet;
//# sourceMappingURL=ScopeSet.js.map