"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCacheUtils = void 0;
var ScopeSet_1 = require("../ScopeSet");
var UrlUtils_1 = require("./UrlUtils");
/**
 * @hidden
 */
var AuthCacheUtils = /** @class */ (function () {
    function AuthCacheUtils() {
    }
    AuthCacheUtils.filterTokenCacheItemsByScope = function (tokenCacheItems, requestScopes) {
        return tokenCacheItems.filter(function (cacheItem) {
            var cachedScopes = cacheItem.key.scopes.split(" ");
            var searchScopes = ScopeSet_1.ScopeSet.removeDefaultScopes(requestScopes);
            // If requestScopes contain only default scopes search for default scopes otherwise search for everything but default scopes
            return searchScopes.length === 0 ? ScopeSet_1.ScopeSet.containsScope(cachedScopes, requestScopes) : ScopeSet_1.ScopeSet.containsScope(cachedScopes, searchScopes);
        });
    };
    AuthCacheUtils.filterTokenCacheItemsByAuthority = function (tokenCacheItems, authority) {
        return tokenCacheItems.filter(function (cacheItem) { return UrlUtils_1.UrlUtils.CanonicalizeUri(cacheItem.key.authority) === authority; });
    };
    AuthCacheUtils.filterTokenCacheItemsByDomain = function (tokenCacheItems, requestDomain) {
        return tokenCacheItems.filter(function (cacheItem) {
            var cacheItemDomain = UrlUtils_1.UrlUtils.GetUrlComponents(cacheItem.key.authority).HostNameAndPort;
            return cacheItemDomain === requestDomain;
        });
    };
    return AuthCacheUtils;
}());
exports.AuthCacheUtils = AuthCacheUtils;
//# sourceMappingURL=AuthCacheUtils.js.map