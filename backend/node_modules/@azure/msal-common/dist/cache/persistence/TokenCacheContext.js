/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class instance helps track the memory changes facilitating
 * decisions to read from and write to the persistent cache
 */ var TokenCacheContext = /** @class */ (function () {
    function TokenCacheContext(tokenCache, hasChanged) {
        this.cache = tokenCache;
        this.hasChanged = hasChanged;
    }
    Object.defineProperty(TokenCacheContext.prototype, "cacheHasChanged", {
        /**
         * boolean which indicates the changes in cache
         */
        get: function () {
            return this.hasChanged;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TokenCacheContext.prototype, "tokenCache", {
        /**
         * function to retrieve the token cache
         */
        get: function () {
            return this.cache;
        },
        enumerable: false,
        configurable: true
    });
    return TokenCacheContext;
}());

export { TokenCacheContext };
//# sourceMappingURL=TokenCacheContext.js.map
