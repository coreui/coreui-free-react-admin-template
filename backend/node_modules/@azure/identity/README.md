## Azure Identity client library for JavaScript

The Azure Identity library provides Azure Active Directory token authentication support across the Azure SDK. It provides a set of [TokenCredential](https://docs.microsoft.com/javascript/api/@azure/core-auth/tokencredential) implementations which can be used to construct Azure SDK clients which support AAD token authentication.

You can find examples for these various credentials in [Azure Identity Examples Page](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md)

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity) | [Package (npm)](https://www.npmjs.com/package/@azure/identity) | [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/identity) | [Product documentation](https://azure.microsoft.com/services/active-directory/) | [Samples](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
  - **Note:** If your application runs on Node.js v8 or lower and you cannot upgrade your Node.js version to latest stable version, then pin your `@azure/identity` dependency to version 1.1.0.
- Latest versions of Safari, Chrome, Edge, and Firefox.
  - Note: Among the different credentials exported in this library, `InteractiveBrowserCredential` is the only one that is supported in the browser.
- See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Install the package

Install Azure Identity with `npm`:

```sh
npm install --save @azure/identity
```

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/).
- The [Azure CLI][azure_cli] can also be useful for authenticating in a development environment and managing account roles.

### Authenticate the client in development environment

While we recommend using managed identity or service principal authentication in your production application, it is typical for a developer to use their own account for authenticating calls to Azure services when debugging and executing code locally. There are several developer tools which can be used to perform this authentication in your development environment.

#### Authenticating via Visual Studio Code

Developers using Visual Studio Code can use the [Azure Account Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account), to authenticate via the IDE. Applications using the `DefaultAzureCredential` or the `VisualStudioCodeCredential` can then use this account to authenticate calls in their application when running locally.

To authenticate in Visual Studio Code, first ensure the [Azure Account Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) is installed. Once the extension is installed, press `F1` to open the command palette and run the `Azure: Sign In` command.

![Visual Studio Code Account Sign In][vscodelogincommand_image]

#### Authenticating via the Azure CLI

Applications using the `AzureCliCredential`, rather directly or via the `DefaultAzureCredential`, can use the Azure CLI account to authenticate calls in the application when running locally.

To authenticate with the [Azure CLI][azure_cli] users can run the command `az login`. For users running on a system with a default web browser the Azure cli will launch the browser to authenticate the user.

![Azure CLI Account Sign In][azureclilogin_image]

For systems without a default web browser, the `az login` command will use the device code authentication flow. The user can also force the Azure CLI to use the device code flow rather than launching a browser by specifying the `--use-device-code` argument.

![Azure CLI Account Device Code Sign In][azureclilogindevicecode_image]

### Authenticate the client in browsers

To authenticate Azure SDKs within web browsers, we currently offer the `InteractiveBrowserCredential`, which can be set to use redirection or popups to complete the authentication flow. It is necessary to [create an Azure App Registration](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the portal for your web application first.

## Key concepts

If this is your first time using `@azure/identity` or the Microsoft identity platform (Azure Active Directory), we recommend that you read [Using `@azure/identity` with Microsoft Identity Platform](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/using-azure-identity.md) first. This document will give you a deeper understanding of the platform and how to configure your Azure account correctly.

### Credentials

A credential is a class which contains or can obtain the data needed for a service client to authenticate requests. Service clients across Azure SDK accept credentials when they are constructed, and service clients use those credentials to authenticate requests to the service.

The Azure Identity library focuses on OAuth authentication with Azure Active directory, and it offers a variety of credential classes capable of acquiring an AAD token to authenticate service requests. All of the credential classes in this library are implementations of the [TokenCredential](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/core/core-auth/src/tokenCredential.ts) abstract class, and any of them can be used by to construct service clients capable of authenticating with a TokenCredential.

See [Credential Classes](#credential-classes).

### DefaultAzureCredential

The `DefaultAzureCredential` is appropriate for most scenarios where the application is intended to ultimately be run in the Azure Cloud. This is because the `DefaultAzureCredential` combines credentials commonly used to authenticate when deployed, with credentials used to authenticate in a development environment. The `DefaultAzureCredential` will attempt to authenticate via the following mechanisms in order.

![DefaultAzureCredential authentication flow][defaultauthflow_image]

- Environment - The `DefaultAzureCredential` will read account information specified via [environment variables](#environment-variables) and use it to authenticate.
- Managed Identity - If the application is deployed to an Azure host with Managed Identity enabled, the `DefaultAzureCredential` will authenticate with that account.
- Visual Studio Code - If the developer has authenticated via the Visual Studio Code Azure Account plugin, the `DefaultAzureCredential` will authenticate with that account.
- Azure CLI - If the developer has authenticated an account via the Azure CLI `az login` command, the `DefaultAzureCredential` will authenticate with that account.

## Environment Variables

`DefaultAzureCredential` and `EnvironmentCredential` can be configured with environment variables. Each type of authentication requires values for specific variables:

#### Service principal with secret

| variable name         | value                                                 |
| --------------------- | ----------------------------------------------------- |
| `AZURE_CLIENT_ID`     | id of an Azure Active Directory application           |
| `AZURE_TENANT_ID`     | id of the application's Azure Active Directory tenant |
| `AZURE_CLIENT_SECRET` | one of the application's client secrets               |

#### Service principal with certificate

| variable name                   | value                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------ |
| `AZURE_CLIENT_ID`               | id of an Azure Active Directory application                                                |
| `AZURE_TENANT_ID`               | id of the application's Azure Active Directory tenant                                      |
| `AZURE_CLIENT_CERTIFICATE_PATH` | path to a PEM-encoded certificate file including private key (without password protection) |

#### Username and password

| variable name     | value                                       |
| ----------------- | ------------------------------------------- |
| `AZURE_CLIENT_ID` | id of an Azure Active Directory application |
| `AZURE_USERNAME`  | a username (usually an email address)       |
| `AZURE_PASSWORD`  | that user's password                        |

Configuration is attempted in the above order. For example, if values for a client secret and certificate are both present, the client secret will be used.

## Examples

You can find more examples of using various credentials in [Azure Identity Examples Page](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md)

### Authenticating with the `DefaultAzureCredential`

This example demonstrates authenticating the `KeyClient` from the [@azure/keyvault-keys](https://www.npmjs.com/package/@azure/keyvault-keys) client library using the `DefaultAzureCredential`.

```javascript
// The default credential first checks environment variables for configuration as described above.
// If environment configuration is incomplete, it will try managed identity.

// Azure Key Vault service to use
const { KeyClient } = require("@azure/keyvault-keys");

// Azure authentication library to access Azure Key Vault
const { DefaultAzureCredential } = require("@azure/identity");

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential();

// Create authenticated client
const client = new KeyClient(vaultUrl, credential);

// Use service from authenticated client
const getResult = await client.getKey("MyKeyName");
```

### Specifying a user assigned managed identity with the `DefaultAzureCredential`

A relatively common scenario involves authenticating using a user assigned managed identity for an Azure resource. Explore the [example on Authenticating a user assigned managed identity with DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-assigned-managed-identity-with-defaultazurecredential) to see how this is made a relatively straightforward task that can be configured using environment variables or in code.

### Define a custom authentication flow with the `ChainedTokenCredential`

While the `DefaultAzureCredential` is generally the quickest way to get started developing applications for Azure, more advanced users may want to customize the credentials considered when authenticating. The `ChainedTokenCredential` enables users to combine multiple credential instances to define a customized chain of credentials. This example demonstrates creating a `ChainedTokenCredential` which will attempt to authenticate using two differently configured instances of `ClientSecretCredential`, to then authenticate the `KeyClient` from the [@azure/keyvault-keys](https://www.npmjs.com/package/@azure/keyvault-keys):

```javascript
const { ClientSecretCredential, ChainedTokenCredential } = require("@azure/identity");

// When an access token is requested, the chain will try each
// credential in order, stopping when one provides a token
const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);

// The chain can be used anywhere a credential is required
const { KeyClient } = require("@azure/keyvault-keys");
const client = new KeyClient(vaultUrl, credentialChain);
```

## Managed Identity Support

The [Managed identity authentication](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview) is supported via either the `DefaultAzureCredential` or the `ManagedIdentityCredential` credential classes directly for the following Azure hosts:

- [Azure Virtual Machines](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/how-to-use-vm-token)
- [Azure App Service](https://docs.microsoft.com/azure/app-service/overview-managed-identity)
- [Azure Kubernetes Service](https://docs.microsoft.com/azure/aks/use-managed-identity)
- [Azure Cloud Shell](https://docs.microsoft.com/azure/cloud-shell/msi-authorization)
- [Azure Arc](https://docs.microsoft.com/azure/azure-arc/servers/managed-identity-authentication)
- [Azure Service Fabric](https://docs.microsoft.com/azure/service-fabric/concepts-managed-identity)

For examples of how to use managed identity for authentication please refer to [the examples](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-in-azure-with-managed-identity)

## Credential Classes

### Authenticating Azure Hosted Applications

| credential                  | usage                                                                                                            | example                                                                                                                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DefaultAzureCredential`    | Provides a simplified authentication experience to quickly start developing applications run in the Azure cloud. | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-defaultazurecredential)                      |
| `ChainedTokenCredential`    | Allows users to define custom authentication flows composing multiple credentials.                               | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#chaining-credentials)                                            |
| `EnvironmentCredential`     | Authenticates a service principal or user via credential information specified in environment variables.         | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-service-principal-with-environment-credentials) |
| `ManagedIdentityCredential` | Authenticates the managed identity of an Azure resource.                                                         | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-in-azure-with-managed-identity)                   |

### Authenticating Service Principals

| credential                    | usage                                                  | example                                                                                                                                                                                             | reference                                                                                                                        |
| ----------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `ClientSecretCredential`      | Authenticates a service principal using a secret.      | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-service-principal-with-a-client-secret)      | [Service principal authentication](https://docs.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals) |
| `ClientCertificateCredential` | Authenticates a service principal using a certificate. | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-service-principal-with-a-client-certificate) | [Service principal authentication](https://docs.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals) |

### Authenticating Users

| credential                     | usage                                                                                                                                                                                                                       | example                                                                                                                                                                                           | reference                                                                                                        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `InteractiveBrowserCredential` | Interactively authenticates a user with the default system browser. Read more about how this happens [here](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/interactive-browser-credential.md). | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-interactively-in-the-browser) | [OAuth2 authentication code](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) |
| `DeviceCodeCredential`         | Interactively authenticates a user on devices with limited UI.                                                                                                                                                              | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-device-code-flow)        | [Device code authentication](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-device-code)    |
| `UserPasswordCredential`       | Authenticates a user with a username and password.                                                                                                                                                                          | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-username-and-password)   | [Username + password authentication](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth-ropc)    |
| `AuthorizationCodeCredential`  | Authenticate a user with a previously obtained authorization code.                                                                                                                                                          | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-auth-code-flow)          | [OAuth2 authentication code](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) |

### Authenticating via Development Tools

| credential                   | usage                                                              | example                                                                                                                                                                                      | reference                                                                               |
| ---------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `AzureCliCredential`         | Authenticate in a development environment with the Azure CLI.      | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-azure-cli)          | [Azure CLI authentication](https://docs.microsoft.com/cli/azure/authenticate-azure-cli) |
| `VisualStudioCodeCredential` | Authenticate in a development environment with Visual Studio Code. | [example](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-a-user-account-with-visual-studio-code) | [VS Code Azure extension](https://code.visualstudio.com/docs/azure/extensions)          |

## Troubleshooting

### Error Handling

Credentials raise `AuthenticationError` when they fail to authenticate. This class has a `message` field which describes why authentication failed. An `AggregateAuthenticationError` will be raised by `ChainedTokenCredential` with an `errors` field containing an array of errors from each credential in the chain.

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

### Read the documentation

API documentation for this library can be found on our [documentation site](https://docs.microsoft.com/javascript/api/@azure/identity).

### Provide Feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

[1]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/defaultazurecredential.html
[2]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/managedidentitycredential.html
[3]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/environmentcredential.html
[4]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/clientsecretcredential.html
[5]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/clientcertificatecredential.html
[6]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/devicecodecredential.html
[7]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/authorizationcodecredential.html
[8]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/interactivebrowsercredential.html
[9]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/usernamepasswordcredential.html
[azure_cli]: https://docs.microsoft.com/cli/azure
[vscodelogincommand_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/sdk/identity/identity/images/VsCodeLoginCommand.png
[azureclilogin_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/sdk/identity/identity/images/AzureCliLogin.png
[azureclilogindevicecode_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/sdk/identity/identity/images/AzureCliLoginDeviceCode.png
[defaultauthflow_image]: https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/sdk/identity/identity/images/DefaultAzureCredentialAuthenticationFlow.png

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2FREADME.png)
