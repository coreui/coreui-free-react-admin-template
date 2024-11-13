/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __assign, __awaiter, __generator } from '../_virtual/_tslib.js';
import { DEFAULT_CRYPTO_IMPLEMENTATION } from '../crypto/ICrypto.js';
import { AuthError } from '../error/AuthError.js';
import { LogLevel } from '../logger/Logger.js';
import { Constants } from '../utils/Constants.js';
import { version } from '../packageMetadata.js';
import { DefaultStorageClass } from '../cache/CacheManager.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// Token renewal offset default in seconds
var DEFAULT_TOKEN_RENEWAL_OFFSET_SEC = 300;
var DEFAULT_SYSTEM_OPTIONS = {
    tokenRenewalOffsetSeconds: DEFAULT_TOKEN_RENEWAL_OFFSET_SEC,
    preventCorsPreflight: false
};
var DEFAULT_LOGGER_IMPLEMENTATION = {
    loggerCallback: function () {
        // allow users to not set loggerCallback
    },
    piiLoggingEnabled: false,
    logLevel: LogLevel.Info,
    correlationId: ""
};
var DEFAULT_NETWORK_IMPLEMENTATION = {
    sendGetRequestAsync: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Network interface - sendGetRequestAsync() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    },
    sendPostRequestAsync: function () {
        return __awaiter(this, void 0, void 0, function () {
            var notImplErr;
            return __generator(this, function (_a) {
                notImplErr = "Network interface - sendPostRequestAsync() has not been implemented";
                throw AuthError.createUnexpectedError(notImplErr);
            });
        });
    }
};
var DEFAULT_LIBRARY_INFO = {
    sku: Constants.SKU,
    version: version,
    cpu: "",
    os: ""
};
var DEFAULT_CLIENT_CREDENTIALS = {
    clientSecret: "",
    clientAssertion: undefined
};
/**
 * Function that sets the default options when not explicitly configured from app developer
 *
 * @param Configuration
 *
 * @returns Configuration
 */
function buildClientConfiguration(_a) {
    var userAuthOptions = _a.authOptions, userSystemOptions = _a.systemOptions, userLoggerOption = _a.loggerOptions, storageImplementation = _a.storageInterface, networkImplementation = _a.networkInterface, cryptoImplementation = _a.cryptoInterface, clientCredentials = _a.clientCredentials, libraryInfo = _a.libraryInfo, serverTelemetryManager = _a.serverTelemetryManager, persistencePlugin = _a.persistencePlugin, serializableCache = _a.serializableCache;
    return {
        authOptions: buildAuthOptions(userAuthOptions),
        systemOptions: __assign(__assign({}, DEFAULT_SYSTEM_OPTIONS), userSystemOptions),
        loggerOptions: __assign(__assign({}, DEFAULT_LOGGER_IMPLEMENTATION), userLoggerOption),
        storageInterface: storageImplementation || new DefaultStorageClass(userAuthOptions.clientId, DEFAULT_CRYPTO_IMPLEMENTATION),
        networkInterface: networkImplementation || DEFAULT_NETWORK_IMPLEMENTATION,
        cryptoInterface: cryptoImplementation || DEFAULT_CRYPTO_IMPLEMENTATION,
        clientCredentials: clientCredentials || DEFAULT_CLIENT_CREDENTIALS,
        libraryInfo: __assign(__assign({}, DEFAULT_LIBRARY_INFO), libraryInfo),
        serverTelemetryManager: serverTelemetryManager || null,
        persistencePlugin: persistencePlugin || null,
        serializableCache: serializableCache || null
    };
}
/**
 * Construct authoptions from the client and platform passed values
 * @param authOptions
 */
function buildAuthOptions(authOptions) {
    return __assign({ clientCapabilities: [] }, authOptions);
}

export { DEFAULT_SYSTEM_OPTIONS, buildClientConfiguration };
//# sourceMappingURL=ClientConfiguration.js.map
