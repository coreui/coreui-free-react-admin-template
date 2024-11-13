/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __awaiter, __generator } from '../_virtual/_tslib.js';
import { AuthError } from '../error/AuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var DEFAULT_CRYPTO_IMPLEMENTATION = {
    createNewGuid: function () {
        var notImplErr = "Crypto interface - createNewGuid() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    base64Decode: function () {
        var notImplErr = "Crypto interface - base64Decode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    base64Encode: function () {
        var notImplErr = "Crypto interface - base64Encode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    generatePkceCodes: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Crypto interface - generatePkceCodes() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    },
    getPublicKeyThumbprint: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Crypto interface - getPublicKeyThumbprint() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    },
    signJwt: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Crypto interface - signJwt() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    }
};

export { DEFAULT_CRYPTO_IMPLEMENTATION };
//# sourceMappingURL=ICrypto.js.map
