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
        // In case a user assigned ID has been provided.
        const managedIdentityClientId = (tokenCredentialOptions === null || tokenCredentialOptions === void 0 ? void 0 : tokenCredentialOptions.managedIdentityClientId) || process.env.AZURE_CLIENT_ID;
        if (managedIdentityClientId) {
            credentials.push(new ManagedIdentityCredential(managedIdentityClientId, tokenCredentialOptions));
        }
        else {
            // If the user didn't provide an ID, we'll try with a system assigned ID.
            credentials.push(new ManagedIdentityCredential(tokenCredentialOptions));
        }
        credentials.push(new AzureCliCredential());
        credentials.push(new VisualStudioCodeCredential(tokenCredentialOptions));
        super(...credentials);
        this.UnavailableMessage =
            "DefaultAzureCredential => failed to retrieve a token from the included credentials";
    }
}
//# sourceMappingURL=defaultAzureCredential.js.map