# Scope Configuration and Behavior

## Contents
* [Quick Reference](#quick-reference)
* [Scopes](#scopes)
    * [Scope Functions](#scope-functions)
    * [Scope Types](#scope-types)
        * [Resource scopes for Authorization](#resource-scopes-for-authorization)
        * [OpenID Connect Scopes for Authentication](#openid-connect-scopes-for-authentication)
* [Scopes Behavior](#scopes-behavior)
    * [Default Scopes in Authorization Requests](#default-scopes-on-authorization-requests)
    * [Special OIDC Scopes behavior cases](#special-oidc-scopes-behavior-cases)

## Quick Reference

> This section provides a summary of the main points this document addresses, without getting into any details. If you need more clarity or information about the functionality and behavior of Scopes in `msal@1.x`, please read the rest of this document.

The key takeaways of the way `msal@1.x` handles and uses scopes are:

1. The `msal@1.x` library will always append `openid` and `profile` as scopes in every outgoing request.
2. Setting the value of the application's ClientId as the only scope will result in it being replaced by `openid` and `profile` and an ID Token being returned

If you're interested in learning more about the reasoning and implications around these two specific behaviors, please read on.



## Scopes

Microsoft identity platform access tokens, which `msal@1.x` acquires in compliance with the OAuth 2.0 protocol specification, are issued to applications as proof of authorization on behalf of a user for a certain resource. The issuing of these tokens is not only specific to an `audience`, or application, but also specific to a set of `scopes` or permissions.

### Scope Functions

#### Function of scopes in OAuth 2.0

The main function of the `scopes` configuration, per the [OAuth 2.0 Access Token Scope Reference](https://tools.ietf.org/html/rfc6749#section-3.3), is to determine the permissions for which an application requests `authorization` on behalf of the user. Said function is both supported and covered by `msal@1.x` and the Microsoft identity platform in general. For more information on the regular function of authorization scopes, please consult the official [Microsoft identity platform documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent).

#### Special use of scopes in msal@1.x

In addition to the global concept and use of `scopes`, it is important to understand that `msal@1.x` gives scopes a special use that adds to the importance of their configuration. In short, `msal@1.x` allows developers to leverage certain scopes in order to determine the `response_type` for the final request. For more information on the way the scopes configuration determines the `response_type` parameter, please refer to the [Response Types Document](/docs/response-types.md).



## Scope Types

As far as `msal@1.x` is concerned, there are two main types of `scopes` that can be configured in a token request.

### Resource scopes for Authorization

`Resource scopes` are the main type of access token `scopes` that `msal@1.x` deals with. These are the `scopes` that represent permissions for specific actions against a particular resource. In other words, these  `scopes` determine what actions and resources the requesting application is `authorized` to access on behalf of the user. The following are some examples of the `resource scopes` that the [Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview) service can authorize an application for given the user's consent:

* `User.Read`: Authorizes the application to read a user's account details.
* `Mail.Read`: Authorizes the application to read a user's e-mails.

Including resource scopes in the configuration for a token request doesn't always mean that the response will include an **access token** for said scopes. In the specific case of `msal@1.x`'s `login` APIs (`loginRedirect`, `loginPopup`), adding resource scopes may allow the user to **constent** to said scopes ahead of time, but successful `login` API calls always result in an **ID Token, not an access token**, being returned.

### OpenID Connect Scopes for Authentication

`OpenID Connect (OIDC) scopes` are a specific set of scopes that can be added to requests when `authenticating` a user. In most cases, `OIDC scopes` are added to configure the claims included in an ID Token ([OIDC Reference](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) / [Microsoft Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes)). Some services, such as the Secure Token Service that `msal@1.x` acquires tokens from, also use OIDC scopes in their internal logic. For this reason, it is important to understand and pay attention to the special behavior `msal@1.x` has around OIDC scopes (described in the [next section](#default-scopes-on-authorization-requests)).

The OIDC scopes that `msal@1.x` pays particular attention to are outlined in the table below.

| OIDC Scope | Required by OIDC Specification | Function | OIDC Reference | Microsoft Docs |
| ---------- | ------------------------------ | -------- | -------------- | -------------- |
| `openid`| Mandatory   |  Main `OIDC scope` that indicates a request for `authentication` [per the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest). In AAD requests, this is the scope that prompts the "Sign in" permission that a user can consent to. | [Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)| [Permissions and consent in the Microsoft identity platform endpoint](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc#send-the-sign-in-request)|
|`profile`| Optional | Used for ID Token `claims` configuration. Adds the end-user's default profile information as a claim to the ID token returned | [Requesting Claims using Scopes Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) | [OpenID Permissions](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent)|


## Scopes Behavior

### Default Scopes on Authorization Requests

Understanding how `OIDC scopes` configure the claims included in an authentication response's ID Token is important when using `msal@1.x` to acquire said ID Tokens. However, there is an important note to be made on how the `openid` and `profile` scopes are added by `msal@1.x` to all server requests by default that does not directly relate to the OpenID Connect specification.

Like previously mentioned, the Secure Token Service that `msal@1.x` requests access and ID tokens from also makes use of the `openid` and `profile` scopes. Specifically, the STS expects these two scopes in order to configure and provide the `client_info` parameter in authorization and authentication responses. The `msal@1.x` library depends on the contents of `client_info` in order to successfully cache tokens and, therefore, provide silent token acquisition as a feature.

**For this reason, whether or not the developer adds the `openid` or `profile` scopes to their request configuration, `msal@1.x` will make sure they are included before sending the request to the STS.**

### Special OIDC Scopes behavior cases

The following is a list of practical implications and examples of the default scope behavior described in the previous section.

- If the scopes array does not include either `openid` or `profile`, whichever is missing (could be both) will be added to the scopes array by default before the request is sent out.

    Examples:

    ```js
        { scopes: ['User.Read'] } // becomes { scopes: ['User.Read', 'openid', 'profile'] } before the request is sent

        { scopes: ['User.Read', 'openid'] } // becomes { scopes ['User.Read', 'openid', 'profile']} before the request is sent

        { scopes: ['User.Read', 'profile'] } // becomes { scopes ['User.Read', 'profile', 'openid']} before the request is sent

        { scopes: ['http://contoso.com/scope'] } // becomes { scopes ['http://contoso.com/scope', 'openid', 'profile'] }
    ```
- ClientId is removed from the scopes array when it is the only scope in the configuration. If it is not the only scope, it is treated as a resource scope and will be sent in the final server request.

    Examples:
    
    ```js
        { scopes: ['YOUR_CLIENT_ID'] } // becomes { scopes: ['openid', 'profile'] } before the request is sent (ClientId is spliced out)

        { scopes: ['YOUR_CLIENT_ID', 'User.Read'] } // becomes { scopes ['YOUR_CLIENT_ID', 'User.Read', 'openid', 'profile']} before the request is sent (ClientId is treated as resource scope and therefore not spliced out)

        { scopes: ['YOUR_CLIENT_ID', 'openid'] } // becomes { scopes ['YOUR_CLIENT_ID', 'openid', 'profile']} before the request is sent
    ```