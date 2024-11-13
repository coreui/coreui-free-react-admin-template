# Release History

## 1.5.2 (2021-09-01)

- Fixed a bug introduced on 1.5.0 that caused the `ManagedIdentityCredential` to fail authenticating in Arc environments. Since our new core disables unsafe requests by default, we had to change the security settings for the first request of the Arc MSI, which retrieves the file path where the authentication value is stored since this request generally happens through an HTTP endpoint.

## 1.5.1 (2021-08-12)

- Fixed how we verify the IMDS endpoint is available. Now, besides skipping the `Metadata` header, we skip the URL query. Both will ensure that all the known IMDS endpoints return as early as possible.
- Added support for the `AZURE_POD_IDENTITY_AUTHORITY_HOST` environment variable. If present, the IMDS endpoint initial verification will be skipped.

## 1.5.0 (2021-07-19)

- With this release, we've migrated from using `@azure/core-http` to `@azure/core-rest-pipeline` for the handling of HTTP requests. See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move. This removes our dependency on `node-fetch` and along with it issues we have seen in using this dependency in specific environments like Kubernetes pods.

## 1.4.0 (2021-07-09)

- With this release, we drop support for Node.js versions that have reached the end of life, like Node.js 8. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated the default timeout of the first request of the IMDS MSI from half a second to three seconds to compensate for the slowness caused by `node-fetch` for initial requests in specific environments, like Kubernetes pods.
- Upgraded `@azure/core-http` to version `^2.0.0`, and `@azure/core-tracing` to version `1.0.0-preview.12`.

## 1.3.0 (2021-04-05)

### Breaking Changes

- Updated @azure/core-tracing to version `1.0.0-preview.11`. See [@azure/core-tracing CHANGELOG](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/core/core-tracing/CHANGELOG.md) for details about breaking changes with tracing.

## 1.2.5 (2021-03-25)

- For the `InteractiveBrowserCredential` for Node.js, we've replaced the use of the `express` module with a native HTTP server, shrinking the resulting `@azure/identity` module considerably.

## 1.2.4 (2021-03-08)

- Bug fix: Now if the `managedIdentityClientId` optional parameter is provided to `DefaultAzureCredential`, it will be properly passed through to the underlying `ManagedIdentityCredential`. Related to customer issue: [13872](https://github.com/Azure/azure-sdk-for-js/issues/13872).
- Bug fix: `ManagedIdentityCredential` now also properly handles `EHOSTUNREACH` errors. Fixes issue [13894](https://github.com/Azure/azure-sdk-for-js/issues/13894).

## 1.2.3 (2021-02-09)

- Fixed Azure Stack support for the NodeJS version of the `InteractiveBrowserCredential`.
- The 'keytar' dependency has been updated to the latest version.
- No longer overrides global Axios defaults. This includes an update in `@azure/identity`'s source, and an update of the `@azure/msal-node` dependency. Fixes issue [13343](https://github.com/Azure/azure-sdk-for-js/issues/13343).

## 1.2.2 (2021-01-12)

- Upgrading to the msal-node dependency due to a severe vulnerability in Axios. Link to the documented vulnerability: [link](https://npmjs.com/advisories/1594). Fixes issue [13088](https://github.com/Azure/azure-sdk-for-js/issues/13088).

## 1.2.1 (2021-01-07)

- Upgrading to Axios 0.21.1 due to a severe vulnerability in Axios. Link to the documented vulnerability: [link](https://npmjs.com/advisories/1594). Fixes issue [13088](https://github.com/Azure/azure-sdk-for-js/issues/13088).

## 1.2.0 (2020-11-11)

### Changes since 1.1.\*

- With 1.2, we've added support for Azure Arc to our Managed Identity credential.
- We've also added an Interactive Browser credential for Node, which spawns the user's browser and connects via
  a browser-based auth code flow. This is powered by the Microsoft Authentication Library (MSAL)
- We've moved `DeviceCodeCredential` to also use the Microsoft Authentication Library (MSAL)
- Identity now supports Subject Name/Issuer (SNI) as part of authentication for ClientCertificateCredential.
- Added Active Directory Federation Services authority host support to the node credentials.
- `ManagedIdentityCredential` has been aligned with other languages, and now treats expected errors properly.
- Added support for multiple clouds on `VisualStudioCodeCredential`.

### Changes since the latest 1.2-beta

- `ManagedIdentityCredential` now only checks for available MSIs once per class instance.
- `ManagedIdentityCredential` now supports Azure Arc environments.
- `ManagedIdentityCredential` now supports Azure Service Fabric environments.
- Added authority host for multiple clouds on `VisualStudioCodeCredential`, and specified `AzureCloud` as the default cloud name.
- `DeviceCodeCredential` now has both of its constructor parameters, `tenantId` and `clientId`, as optional parameters. The default value of `tenantId` is "organizations", and the Azure CLI's client ID is the default value of `clientId`.
- We've removed the persistent cache support from the previous beta.

## 1.2.0-beta.2 (2020-10-06)

- `DeviceCodeCredential` now by default shows the Device Code message on the console. This can still be overwritten with a custom behavior by specifying a function as the third parameter, `userPromptCallback`.
- Added support for multiple clouds on `VisualStudioCodeCredential`. Fixes customer issue [11452](https://github.com/Azure/azure-sdk-for-js/issues/11452).
- `ManagedIdentityCredential` has been aligned with other languages, now treating expected errors properly. This fixes customer issue [11451](https://github.com/Azure/azure-sdk-for-js/issues/11451).
- `InteractiveBrowserCredential` authentication now uses the silent flow if the user provides a cache and authentication record for lookup.
- Added Active Directory Federation Services authority host support to the node credentials.
- Reverted a change in 1.2.0-beta.1 which moved `@rollup/plugin-json` from `devDependencies` to `dependencies`. `@rollup/plugin-json` was placed as a dependency due to an oversight, and it is not a necessary dependency for `@azure/identity`.

## 1.2.0-beta.1 (2020-09-08)

- A new `InteractiveBrowserCredential` for node which will spawn a web server, start a web browser, and allow the user to interactively authenticate with the browser.
- With 1.2.0-beta.1, Identity will now use [MSAL](https://www.npmjs.com/package/@azure/msal-node) to perform authentication. With this beta, DeviceCodeCredential and a new InteractiveBrowserCredential for node are powered by MSAL.
- Identity now supports Subject Name/Issuer (SNI) as part of authentication for ClientCertificateCredential
- Upgraded App Services MSI API version

## 1.1.0 (2020-08-11)

### Changes since 1.0.\*

- With 1.1.0, new developer credentials are now available: `VisualStudioCodeCredential` and `AzureCliCredential`.
  - `VisualStudioCodeCredential` allows developers to log into Azure using the credentials available after logging in through the Azure Account extension in Visual Studio Code.
  - `AzureCliCredential` allows developers to log into Azure using the login credentials after an "az login" call.
- Both `VisualStudioCodeCredential` and `AzureCliCredential` may be used directly or indirectly as part of `DefaultAzureCredential`.
- Added the ability to configure the Managed Identity with a user-assigned client ID via a new option available in the `DefaultAzureCredential` constructor options: `managedIdentityClientId`.
- Made a list of known authorities is now available via a new top-level constant: `AzureAuthorityHosts`.
- Introduced the `CredentialUnavailable` error, which allows developers to differentiate between a credential not being available and an error happening during authentication.

### Changes since the latest 1.1-preview

- Renamed the `VSCodeCredential` to `VisualStudioCodeCredential`, and its options parameter from `VSCodeCredentialOptions` to `VisualStudioCodeCredentialOptions`.
- Tenant information is now loaded from the Visual Studio Code settings file when the `VisualStudioCodeCredential` is used.
- Added `managedIdentityClientId` to optionally pass in a user-assigned client ID for the `ManagedIdentityCredential`.

## 1.1.0-preview.5 (2020-07-22)

- Make the keytar dependency optional, allowing for building and running on platforms not supported by keytar [PR #10142](https://github.com/Azure/azure-sdk-for-js/pull/10142)
- DefaultAzureCredential and VSCodeCredential can now take a tenant id as part of the options object
- KnownAuthorityHosts has been renamed to AzureAuthorityHosts

## 1.1.0-preview.4 (2020-06-09)

- Switch to using CredentialUnavailable to differentiate from expected and unexpected errors during DefaultAzureCredential startup. [PR #8172](https://github.com/Azure/azure-sdk-for-js/pull/8127)
- Make all developer credentials public as well as the list used by DefaultAzureCredential [PR #9274](https://github.com/Azure/azure-sdk-for-js/pull/9274)

## 1.1.0-preview.3 (2020-05-05)

- Add ability to read AZURE_AUTHORITY_HOST from environment ([PR #8226](https://github.com/Azure/azure-sdk-for-js/pull/8226) [PR #8343](https://github.com/Azure/azure-sdk-for-js/pull/8343))
- Update to OpenTelemetry 0.6 ([PR #7998](https://github.com/Azure/azure-sdk-for-js/pull/7998))
- Set expires_on at a higher precedence for IMDS ([PR #8591](https://github.com/Azure/azure-sdk-for-js/pull/8591))

## 1.1.0-preview.2 (2020-04-07)

- Make KnownAuthorityHosts constants available
- Extended DefaultAzureCredential with an experimental credential that uses the login credential from VSCode's Azure Account extension

## 1.1.0-preview1 (2020-03-10)

- Extended DefaultAzureCredential with an experimental credential that uses the login credential from Azure CLI
- Fix tracing to set correct span attributes ([PR #6565](https://github.com/Azure/azure-sdk-for-js/pull/6565)).

## 1.0.2 (2019-12-03)

- Fixed an issue where an authorization error occurs due to wrong access token being returned by the MSI endpoint when using a user-assigned managed identity with `ManagedIdentityCredential` ([PR #6134](https://github.com/Azure/azure-sdk-for-js/pull/6134))
- Fixed an issue in `EnvironmentCredential` where authentication silently fails when one or more of the expected environment variables is not present ([PR #6313](https://github.com/Azure/azure-sdk-for-js/pull/6313))
- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`

## 1.0.0 (2019-10-29)

- This release marks the general availability of the `@azure/identity` package.
- `EnvironmentCredential` now looks for additional environment variables: ([PR #5743](https://github.com/Azure/azure-sdk-for-js/pull/5743))
  - `AZURE_CLIENT_CERTIFICATE_PATH` to configure `ClientCertificateCredential`
  - `AZURE_USERNAME` and `AZURE_PASSWORD` to configure `UsernamePasswordCredential`
- `GetTokenOptions` now extends the interface `OperationOptions` ([PR #5899](https://github.com/Azure/azure-sdk-for-js/pull/5899))
- `TokenCredentialOptions` now extends the interface `PipelineOptions` ([PR #5711](https://github.com/azure/azure-sdk-for-js/pull/5711))
- Renamed `IdentityClientOptions` to `TokenCredentialOptions` ([PR #5797](https://github.com/Azure/azure-sdk-for-js/pull/5797))
- Removed the browser bundle. A browser-compatible library can still be created through the use of a bundler such as Rollup, Webpack, or Parcel
  ([PR #5863](https://github.com/Azure/azure-sdk-for-js/pull/5863))

## 1.0.0-preview.6 (2019-10-22)

- Renamed `DeviceCodeDetails` to `DeviceCodeInfo` and improved casing of the fields in the `ErrorResponse` type ([PR #5662](https://github.com/Azure/azure-sdk-for-js/pull/5662))
- Improved the constructor signatures for `AuthorizationCodeCredential`, `DeviceCodeCredential`, `InteractiveBrowserCredential` and `managedIdentityCredential` so that it's clearer which parameters are optional and what additional values they accept ([PR #5668](https://github.com/Azure/azure-sdk-for-js/pull/5668))
- Added logging for authentication flows via the new `@azure/logger` package ([PR #5611](https://github.com/Azure/azure-sdk-for-js/pull/5611))
- Fixed an issue in `DeviceCodeCredential` where an unexpected authentication error could cause an infinite polling loop ([PR #5430](https://github.com/Azure/azure-sdk-for-js/pull/5430))
- Improved the details that appear in the `AggregateAuthenticationError` ([PR #5409](https://github.com/Azure/azure-sdk-for-js/pull/5409))

## 1.0.0-preview.5 (2019-10-08)

- Update `@azure/core-tracing` dependency to resolve an issue when running in Internet Explorer 11 ([PR #5472](https://github.com/Azure/azure-sdk-for-js/pull/5472))

## 1.0.0-preview.4 (2019-10-07)

- Introduced the `AuthorizationCodeCredential` for performing the [authorization code flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with AAD ([PR #5356](https://github.com/Azure/azure-sdk-for-js/pull/5356))
- Fixed an issue preventing the `ManagedIdentityCredential` from working inside of Azure Function Apps ([PR #5144](https://github.com/Azure/azure-sdk-for-js/pull/5144))
- Added tracing to `IdentityClient` and credential implementations ([PR #5283](https://github.com/Azure/azure-sdk-for-js/pull/5283))
- Improved the exception message for `AggregateAuthenticationError` so that errors thrown from `DefaultAzureCredential` are now more actionable ([PR #5409](https://github.com/Azure/azure-sdk-for-js/pull/5409))

## 1.0.0-preview.3 (2019-09-09)

- Fixed a ping timeout issue. The timeout is now configurable. ([PR #4941](https://github.com/Azure/azure-sdk-for-js/pull/4941))
- Fixed IMDS endpoint detection false positive ([PR #4909](https://github.com/Azure/azure-sdk-for-js/pull/4909))

## 1.0.0-preview.2 (2019-08-05)

- Introduced the following credential types:
  - `DeviceCodeCredential`.
  - `InteractiveBrowserCredential`.
  - `UsernamePasswordCredential`.
- This library can now be used in the browser! The following credential types supported in browser builds:
  - `ClientSecretCredential`.
  - `UsernamePasswordCredential`.
  - `InteractiveBrowserCredential`.

## 1.0.0-preview.1 (2019-06-27)

For release notes and more information please visit https://aka.ms/azsdk/releases/july2019preview

- Introduced the following credential types:
  - `DefaultAzureCredential`.
  - `EnvironmentCredential`.
  - `ManagedIdentityCredential`.
  - `ClientSecretCredential`.
  - `ClientCertificateCredential`.
  - `ChainedTokenCredential`.
