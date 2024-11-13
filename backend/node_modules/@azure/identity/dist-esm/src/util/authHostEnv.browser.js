// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const BrowserNotSupportedError = new Error("getAuthorityHostEnvironment is not supported in the browser.");
export function getAuthorityHostEnvironment() {
    throw BrowserNotSupportedError;
}
//# sourceMappingURL=authHostEnv.browser.js.map