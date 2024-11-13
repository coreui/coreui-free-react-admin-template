// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { credentialLogger, formatError } from "../util/logging";
const BrowserNotSupportedError = new Error("EnvironmentCredential is not supported in the browser.");
const logger = credentialLogger("EnvironmentCredential");
export class EnvironmentCredential {
    constructor() {
        logger.info(formatError("", BrowserNotSupportedError));
        throw BrowserNotSupportedError;
    }
    getToken() {
        logger.getToken.info(formatError("", BrowserNotSupportedError));
        throw BrowserNotSupportedError;
    }
}
//# sourceMappingURL=environmentCredential.browser.js.map