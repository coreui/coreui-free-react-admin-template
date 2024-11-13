"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorityFactory = void 0;
var tslib_1 = require("tslib");
/**
 * @hidden
 */
var Authority_1 = require("./Authority");
var StringUtils_1 = require("../utils/StringUtils");
var ClientConfigurationError_1 = require("../error/ClientConfigurationError");
var AuthorityFactory = /** @class */ (function () {
    function AuthorityFactory() {
    }
    AuthorityFactory.saveMetadataFromNetwork = function (authorityInstance, telemetryManager, correlationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var metadata;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authorityInstance.resolveEndpointsAsync(telemetryManager, correlationId)];
                    case 1:
                        metadata = _a.sent();
                        this.metadataMap.set(authorityInstance.CanonicalAuthority, metadata);
                        return [2 /*return*/, metadata];
                }
            });
        });
    };
    AuthorityFactory.getMetadata = function (authorityUrl) {
        return this.metadataMap.get(authorityUrl);
    };
    AuthorityFactory.saveMetadataFromConfig = function (authorityUrl, authorityMetadataJson) {
        try {
            if (authorityMetadataJson) {
                var parsedMetadata = JSON.parse(authorityMetadataJson);
                if (!parsedMetadata.authorization_endpoint || !parsedMetadata.end_session_endpoint || !parsedMetadata.issuer) {
                    throw ClientConfigurationError_1.ClientConfigurationError.createInvalidAuthorityMetadataError();
                }
                this.metadataMap.set(authorityUrl, {
                    AuthorizationEndpoint: parsedMetadata.authorization_endpoint,
                    EndSessionEndpoint: parsedMetadata.end_session_endpoint,
                    Issuer: parsedMetadata.issuer
                });
            }
        }
        catch (e) {
            throw ClientConfigurationError_1.ClientConfigurationError.createInvalidAuthorityMetadataError();
        }
    };
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (eg aad, b2c)
     */
    AuthorityFactory.CreateInstance = function (authorityUrl, validateAuthority, authorityMetadata) {
        if (StringUtils_1.StringUtils.isEmpty(authorityUrl)) {
            return null;
        }
        if (authorityMetadata) {
            // todo: log statements
            this.saveMetadataFromConfig(authorityUrl, authorityMetadata);
        }
        return new Authority_1.Authority(authorityUrl, validateAuthority, this.metadataMap.get(authorityUrl));
    };
    AuthorityFactory.metadataMap = new Map();
    return AuthorityFactory;
}());
exports.AuthorityFactory = AuthorityFactory;
//# sourceMappingURL=AuthorityFactory.js.map