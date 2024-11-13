// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DefaultAzureCredential } from "./credentials/defaultAzureCredential";
export { ChainedTokenCredential } from "./credentials/chainedTokenCredential";
export { EnvironmentCredential } from "./credentials/environmentCredential";
export { ClientSecretCredential } from "./credentials/clientSecretCredential";
export { ClientCertificateCredential } from "./credentials/clientCertificateCredential";
export { InteractiveBrowserCredential } from "./credentials/interactiveBrowserCredential";
export { VisualStudioCodeCredential } from "./credentials/visualStudioCodeCredential";
export { AzureCliCredential } from "./credentials/azureCliCredential";
export { ManagedIdentityCredential } from "./credentials/managedIdentityCredential";
export { DeviceCodeCredential } from "./credentials/deviceCodeCredential";
export { DefaultAzureCredential } from "./credentials/defaultAzureCredential";
export { UsernamePasswordCredential } from "./credentials/usernamePasswordCredential";
export { AuthorizationCodeCredential } from "./credentials/authorizationCodeCredential";
export { AuthenticationError, AggregateAuthenticationError, AuthenticationErrorName, AggregateAuthenticationErrorName, CredentialUnavailable } from "./client/errors";
export { logger } from "./util/logging";
export { AzureAuthorityHosts } from "./constants";
/**
 * Returns a new instance of the {@link DefaultAzureCredential}.
 */
export function getDefaultAzureCredential() {
    return new DefaultAzureCredential();
}
//# sourceMappingURL=index.js.map