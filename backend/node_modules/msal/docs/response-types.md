# Response Types

> :warning: This document only applies to `msal@1.x` which implements the Implicit Flow Grant type. For the Authorization Code Flow Grant type, please use the [msal-browser](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser) library.

## Quick Reference

> This section provides a summary of the main points this document addresses, without getting into any details. If you need more clarity or information about the functionality and behavior of Response Types in `msal@1.x`, please read the rest of this document.

The key takeaways of the way `msal@1.x` determines and handles `Response Types` are:

1. `loginRedirect`, `loginPopup` and `ssoSilent` will always return ID tokens and have a `response_type` of `id_token`.
2. `acquireToken` requests will always return an ID token if `openid` or `profile` are included in the request scopes.
3. `acquireToken` requests will always return an access token if a `resource scope` is requested.

If you're interested in learning more about the reasoning and implications around the way response types are determined and what they are used for, please read the rest of this document.

## Definition and Types
The `msal@1.x` library, in compliance of both the OAuth 2.0 protocol specification as well as the OpenID Connect specification, defines and supports three different `response types`:

* token
* id_token
* id_token token

The **`msal@1.x` library does not support the `code` response type because it does not implement the Authorization Code grant. If you are looking to implement the Authorization Code grant type, consider the [msal-browser](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser) library.**

The listed response types are possible values for the `response_type` parameter in OAuth 2.0 HTTP requests. Assuming a valid request, this parameter determines what kind of token is sent back by the Secure Token Service (STS) that `msal@1.x` requests access and ID tokens from.

| Response Type | Specification that defines it | Expected token type from successful request | Action |
| ------------- | ----------------------------- | ------------------------------------------- | ------ |
| `token` |[OAuth 2.0](https://tools.ietf.org/html/rfc6749#section-3.1.1) | Access Token | Authorization |
| `id_token`| [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html#Authentication) | ID Token | Authentication |
|`id_token token`| [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html#Authentication) | Access Token and ID token | Authorization & Authentication |

**Note: Given that `msal@1.x` uses the OAuth 2.0 Implicit Flow exclusively, which leverages URL fragments for token reception, it is important to be mindful of URL length limitations. Browsers like IE impose restrictions on the length of URLs, so getting both an access token and ID token in the same URL may cause unexpected or incorrect behavior.**

## Response Type configuration and behavior

The `response_type` attribute presented above cannot be configured directly. However, it is important to understand the way `msal@1.x` determines which response type is set and, therefore, what kind of token the developer can expect for each scenario. The factors that come into consideration when setting the request's `response_type` parameter are the following:

1. The `msal@1.x` API called
2. Whether the account passed into the request configuration matches the account in the MSAL cache
3. The contents of the `scopes` array in the Authorization Request Configuration object. For more information on `scopes` configuration, please consult the [Scopes](/docs/scopes.md) document.

**Important note: Login APIs will always set `response_type=id_token`, given that they are designed to perform user login (authentication).**

Login APIs include:

* loginRedirect
* loginPopup
* ssoSilent

In other words, whenever you call `loginRedirect` or `loginPopup` to sign a user in, you should expect to receive an ID token if the request is successful.

The following section contains quick reference tables for both `login` and `acquireToken` APIs that accurately map the request configuration to the resulting response type.

## Quick reference tables

### Login APIs

Applies to: `loginRedirect`, `loginPopup`, `ssoSilent`

| Input scopes | Account passed in | Response Type Result |
| ----------------- | ------------ | -------------------- |
| Any case | Any case | `id_token`|

### Acquire Token APIs

Applies to: `acquireTokenRedirect`, `acquireTokenPopup`, `acquireTokenSilent`

* *OIDC scopes: any combination of `openid` and/or `profile`*
* *OIDC scopes only: Same as OIDC scopes but with no other scopes in the array*

| Input scopes | Account passed in | Response Type Result |
| ----------------- | ------------ | -------------------- |
| ClientId as only scope | Any case | `id_token`|
| OIDC scopes only | Any case | `id_token`|
| ClientId with OIDC scopes | Any case | `id_token token` |
| Resource scope(s) with OIDC scopes (technically the same as above) | Any case | `id_token token` |
| Resource scope(s) only | Matches cached account object | `token` |
| Resource scope(s) and ClientId | Matches cached account object | `token` |
| Resource scope(s) only | Doesn't match cached account object | `id_token token` |

**Note: As seen in the table above, when ClientId is not the only scope, it is assumed to be a resource scope with no special behavior.**


