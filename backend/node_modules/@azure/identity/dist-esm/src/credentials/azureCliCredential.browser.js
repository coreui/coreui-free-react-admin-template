// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { credentialLogger, formatError } from "../util/logging";
const BrowserNotSupportedError = new Error("AzureCliCredential is not supported in the browser.");
const logger = credentialLogger("AzureCliCredential");
export class AzureCliCredential {
    constructor() {
        logger.info(formatError("", BrowserNotSupportedError));
        throw BrowserNotSupportedError;
    }
    getToken() {
        logger.getToken.info(formatError("", BrowserNotSupportedError));
        throw BrowserNotSupportedError;
    }
}
//# sourceMappingURL=azureCliCredential.browser.js.map