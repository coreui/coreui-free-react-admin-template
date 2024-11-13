// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createFetchHttpClient } from "./fetchHttpClient.js";
/**
 * Create the correct HttpClient for the current environment.
 */
export function createDefaultHttpClient() {
    return createFetchHttpClient();
}
//# sourceMappingURL=defaultHttpClient-browser.mjs.map