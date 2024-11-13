/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ScopeSet } from "../ScopeSet";
import { UrlUtils } from "./UrlUtils";
/**
 * @hidden
 */
var AuthCacheUtils = /** @class */ (function () {
    function AuthCacheUtils() {
    }
    AuthCacheUtils.filterTokenCacheItemsByScope = function (tokenCacheItems, requestScopes) {
        return tokenCacheItems.filter(function (cacheItem) {
            var cachedScopes = cacheItem.key.scopes.split(" ");
            var searchScopes = ScopeSet.removeDefaultScopes(requestScopes);
            // If requestScopes contain only default scopes search for default scopes otherwise search for everything but default scopes
            return searchScopes.length === 0 ? ScopeSet.containsScope(cachedScopes, requestScopes) : ScopeSet.containsScope(cachedScopes, searchScopes);
        });
    };
    AuthCacheUtils.filterTokenCacheItemsByAuthority = function (tokenCacheItems, authority) {
        return tokenCacheItems.filter(function (cacheItem) { return UrlUtils.CanonicalizeUri(cacheItem.key.authority) === authority; });
    };
    AuthCacheUtils.filterTokenCacheItemsByDomain = function (tokenCacheItems, requestDomain) {
        return tokenCacheItems.filter(function (cacheItem) {
            var cacheItemDomain = UrlUtils.GetUrlComponents(cacheItem.key.authority).HostNameAndPort;
            return cacheItemDomain === requestDomain;
        });
    };
    return AuthCacheUtils;
}());
export { AuthCacheUtils };
//# sourceMappingURL=AuthCacheUtils.js.map