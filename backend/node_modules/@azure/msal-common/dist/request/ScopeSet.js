/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __spreadArrays } from '../_virtual/_tslib.js';
import { ClientConfigurationError } from '../error/ClientConfigurationError.js';
import { StringUtils } from '../utils/StringUtils.js';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { OIDC_SCOPES } from '../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The ScopeSet class creates a set of scopes. Scopes are case-insensitive, unique values, so the Set object in JS makes
 * the most sense to implement for this class. All scopes are trimmed and converted to lower case strings in intersection and union functions
 * to ensure uniqueness of strings.
 */
var ScopeSet = /** @class */ (function () {
    function ScopeSet(inputScopes) {
        var _this = this;
        // Filter empty string and null/undefined array items
        var scopeArr = inputScopes ? StringUtils.trimArrayEntries(__spreadArrays(inputScopes)) : [];
        var filteredInput = scopeArr ? StringUtils.removeEmptyStringsFromArray(scopeArr) : [];
        // Validate and filter scopes (validate function throws if validation fails)
        this.validateInputScopes(filteredInput);
        this.scopes = new Set(); // Iterator in constructor not supported by IE11
        filteredInput.forEach(function (scope) { return _this.scopes.add(scope); });
    }
    /**
     * Factory method to create ScopeSet from space-delimited string
     * @param inputScopeString
     * @param appClientId
     * @param scopesRequired
     */
    ScopeSet.fromString = function (inputScopeString) {
        var scopeString = inputScopeString || "";
        var inputScopes = scopeString.split(" ");
        return new ScopeSet(inputScopes);
    };
    /**
     * Used to validate the scopes input parameter requested  by the developer.
     * @param {Array<string>} inputScopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
     */
    ScopeSet.prototype.validateInputScopes = function (inputScopes) {
        // Check if scopes are required but not given or is an empty array
        if (!inputScopes || inputScopes.length < 1) {
            throw ClientConfigurationError.createEmptyScopesArrayError();
        }
    };
    /**
     * Check if a given scope is present in this set of scopes.
     * @param scope
     */
    ScopeSet.prototype.containsScope = function (scope) {
        var lowerCaseScopes = this.printScopesLowerCase().split(" ");
        var lowerCaseScopesSet = new ScopeSet(lowerCaseScopes);
        // compare lowercase scopes
        return !StringUtils.isEmpty(scope) ? lowerCaseScopesSet.scopes.has(scope.toLowerCase()) : false;
    };
    /**
     * Check if a set of scopes is present in this set of scopes.
     * @param scopeSet
     */
    ScopeSet.prototype.containsScopeSet = function (scopeSet) {
        var _this = this;
        if (!scopeSet || scopeSet.scopes.size <= 0) {
            return false;
        }
        return (this.scopes.size >= scopeSet.scopes.size && scopeSet.asArray().every(function (scope) { return _this.containsScope(scope); }));
    };
    /**
     * Check if set of scopes contains only the defaults
     */
    ScopeSet.prototype.containsOnlyOIDCScopes = function () {
        var _this = this;
        var defaultScopeCount = 0;
        OIDC_SCOPES.forEach(function (defaultScope) {
            if (_this.containsScope(defaultScope)) {
                defaultScopeCount += 1;
            }
        });
        return this.scopes.size === defaultScopeCount;
    };
    /**
     * Appends single scope if passed
     * @param newScope
     */
    ScopeSet.prototype.appendScope = function (newScope) {
        if (!StringUtils.isEmpty(newScope)) {
            this.scopes.add(newScope.trim());
        }
    };
    /**
     * Appends multiple scopes if passed
     * @param newScopes
     */
    ScopeSet.prototype.appendScopes = function (newScopes) {
        var _this = this;
        try {
            newScopes.forEach(function (newScope) { return _this.appendScope(newScope); });
        }
        catch (e) {
            throw ClientAuthError.createAppendScopeSetError(e);
        }
    };
    /**
     * Removes element from set of scopes.
     * @param scope
     */
    ScopeSet.prototype.removeScope = function (scope) {
        if (StringUtils.isEmpty(scope)) {
            throw ClientAuthError.createRemoveEmptyScopeFromSetError(scope);
        }
        this.scopes.delete(scope.trim());
    };
    /**
     * Removes default scopes from set of scopes
     * Primarily used to prevent cache misses if the default scopes are not returned from the server
     */
    ScopeSet.prototype.removeOIDCScopes = function () {
        var _this = this;
        OIDC_SCOPES.forEach(function (defaultScope) {
            _this.scopes.delete(defaultScope);
        });
    };
    /**
     * Combines an array of scopes with the current set of scopes.
     * @param otherScopes
     */
    ScopeSet.prototype.unionScopeSets = function (otherScopes) {
        if (!otherScopes) {
            throw ClientAuthError.createEmptyInputScopeSetError();
        }
        var unionScopes = new Set(); // Iterator in constructor not supported in IE11
        otherScopes.scopes.forEach(function (scope) { return unionScopes.add(scope.toLowerCase()); });
        this.scopes.forEach(function (scope) { return unionScopes.add(scope.toLowerCase()); });
        return unionScopes;
    };
    /**
     * Check if scopes intersect between this set and another.
     * @param otherScopes
     */
    ScopeSet.prototype.intersectingScopeSets = function (otherScopes) {
        if (!otherScopes) {
            throw ClientAuthError.createEmptyInputScopeSetError();
        }
        // Do not allow OIDC scopes to be the only intersecting scopes
        if (!otherScopes.containsOnlyOIDCScopes()) {
            otherScopes.removeOIDCScopes();
        }
        var unionScopes = this.unionScopeSets(otherScopes);
        var sizeOtherScopes = otherScopes.getScopeCount();
        var sizeThisScopes = this.getScopeCount();
        var sizeUnionScopes = unionScopes.size;
        return sizeUnionScopes < (sizeThisScopes + sizeOtherScopes);
    };
    /**
     * Returns size of set of scopes.
     */
    ScopeSet.prototype.getScopeCount = function () {
        return this.scopes.size;
    };
    /**
     * Returns the scopes as an array of string values
     */
    ScopeSet.prototype.asArray = function () {
        var array = [];
        this.scopes.forEach(function (val) { return array.push(val); });
        return array;
    };
    /**
     * Prints scopes into a space-delimited string
     */
    ScopeSet.prototype.printScopes = function () {
        if (this.scopes) {
            var scopeArr = this.asArray();
            return scopeArr.join(" ");
        }
        return "";
    };
    /**
     * Prints scopes into a space-delimited lower-case string (used for caching)
     */
    ScopeSet.prototype.printScopesLowerCase = function () {
        return this.printScopes().toLowerCase();
    };
    return ScopeSet;
}());

export { ScopeSet };
//# sourceMappingURL=ScopeSet.js.map
