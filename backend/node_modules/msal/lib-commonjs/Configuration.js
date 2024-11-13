"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConfiguration = void 0;
var tslib_1 = require("tslib");
var Logger_1 = require("./Logger");
var UrlUtils_1 = require("./utils/UrlUtils");
/**
 * Defaults for the Configuration Options
 */
var FRAME_TIMEOUT = 6000;
var OFFSET = 300;
var NAVIGATE_FRAME_WAIT = 500;
var DEFAULT_AUTH_OPTIONS = {
    clientId: "",
    authority: null,
    validateAuthority: true,
    authorityMetadata: "",
    knownAuthorities: [],
    redirectUri: function () { return UrlUtils_1.UrlUtils.getCurrentUrl(); },
    postLogoutRedirectUri: function () { return UrlUtils_1.UrlUtils.getCurrentUrl(); },
    navigateToLoginRequestUrl: true
};
var DEFAULT_CACHE_OPTIONS = {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
};
var DEFAULT_SYSTEM_OPTIONS = {
    logger: new Logger_1.Logger(null),
    loadFrameTimeout: FRAME_TIMEOUT,
    tokenRenewalOffsetSeconds: OFFSET,
    navigateFrameWait: NAVIGATE_FRAME_WAIT
};
var DEFAULT_FRAMEWORK_OPTIONS = {
    isAngular: false,
    unprotectedResources: new Array(),
    protectedResourceMap: new Map()
};
/**
 * MSAL function that sets the default options when not explicitly configured from app developer
 *
 * @param TAuthOptions
 * @param TCacheOptions
 * @param TSystemOptions
 * @param TFrameworkOptions
 * @param TAuthorityDataOptions
 *
 * @returns TConfiguration object
 */
function buildConfiguration(_a) {
    var auth = _a.auth, _b = _a.cache, cache = _b === void 0 ? {} : _b, _c = _a.system, system = _c === void 0 ? {} : _c, _d = _a.framework, framework = _d === void 0 ? {} : _d;
    var overlayedConfig = {
        auth: tslib_1.__assign(tslib_1.__assign({}, DEFAULT_AUTH_OPTIONS), auth),
        cache: tslib_1.__assign(tslib_1.__assign({}, DEFAULT_CACHE_OPTIONS), cache),
        system: tslib_1.__assign(tslib_1.__assign({}, DEFAULT_SYSTEM_OPTIONS), system),
        framework: tslib_1.__assign(tslib_1.__assign({}, DEFAULT_FRAMEWORK_OPTIONS), framework)
    };
    return overlayedConfig;
}
exports.buildConfiguration = buildConfiguration;
//# sourceMappingURL=Configuration.js.map