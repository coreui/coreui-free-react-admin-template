// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import { credentialLogger, formatError } from "../../util/logging";
const BrowserNotSupportedError = new Error("ManagedIdentityCredential is not supported in the browser.");
const logger = credentialLogger("ManagedIdentityCredential");
export class ManagedIdentityCredential {
    constructor() {
        logger.info(formatError("", BrowserNotSupportedError));
        throw BrowserNotSupportedError;
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.getToken.info(formatError("", BrowserNotSupportedError));
            throw BrowserNotSupportedError;
        });
    }
}
//# sourceMappingURL=index.browser.js.map