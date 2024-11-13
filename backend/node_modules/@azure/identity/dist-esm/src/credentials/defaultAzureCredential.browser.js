// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";
import { AzureCliCredential } from "./azureCliCredential";
import { VisualStudioCodeCredential } from "./visualStudioCodeCredential";
/**
 * Provides a default {@link ChainedTokenCredential} configuration for
 * applications that will be deployed to Azure.  The following credential
 * types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link ManagedIdentityCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
    /**
     * Creates an instance of the DefaultAzureCredential class.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tokenCredentialOptions) {
        const credentials = [];
        credentials.push(new EnvironmentCredential(tokenCredentialOptions));
        credentials.push(new ManagedIdentityCredential(tokenCredentialOptions));
        credentials.push(new AzureCliCredential());
        credentials.push(new VisualStudioCodeCredential(tokenCredentialOptions));
        super(...credentials);
    }
}
//# sourceMappingURL=defaultAzureCredential.browser.js.map