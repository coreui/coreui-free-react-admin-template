// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export function getAuthorityHostEnvironment() {
    if (process.env.AZURE_AUTHORITY_HOST) {
        return {
            authorityHost: process.env.AZURE_AUTHORITY_HOST
        };
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=authHostEnv.js.map