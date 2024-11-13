
Microsoft Authentication Library for JavaScript (MSAL.js)
=========================================================

| [Getting Started](https://docs.microsoft.com/azure/active-directory/develop/guidedsetups/active-directory-javascriptspa)| [AAD Docs](https://aka.ms/aaddevv2) | [Library Reference](https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal.html) | [Support](README.md#community-help-and-support) | [Samples](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Samples)
| --- | --- | --- | --- | --- |

⚠️⚠️⚠️ This library is no longer receiving new features and will only receive critical bug and security fixes. All new applications should use [@azure/msal-browser](https://www.npmjs.com/package/@azure/msal-browser) instead. ⚠️⚠️⚠️

MSAL for JavaScript enables client-side JavaScript web applications, running in a web browser, to authenticate users using [Azure AD](https://docs.microsoft.com/azure/active-directory/develop/v2-overview) work and school accounts (AAD), Microsoft personal accounts (MSA) and social identity providers like Facebook, Google, LinkedIn, Microsoft accounts, etc. through [Azure AD B2C](https://docs.microsoft.com/azure/active-directory-b2c/active-directory-b2c-overview#identity-providers) service. It also enables your app to get tokens to access [Microsoft Cloud](https://www.microsoft.com/enterprise) services such as [Microsoft Graph](https://graph.microsoft.io).

[![npm version](https://img.shields.io/npm/v/msal.svg?style=flat)](https://www.npmjs.com/package/msal)
[![npm version](https://img.shields.io/npm/dm/msal.svg)](https://nodei.co/npm/msal/)
[![codecov](https://codecov.io/gh/AzureAD/microsoft-authentication-library-for-js/branch/dev/graph/badge.svg?flag=msal-core)](https://codecov.io/gh/AzureAD/microsoft-authentication-library-for-js)

## Installation

### Via NPM:

    npm install msal

## Via CDN:

<!-- CDN_LATEST -->
```html
<script type="text/javascript" src="https://alcdn.msauth.net/lib/1.4.17/js/msal.min.js"></script>
```

[Complete details and best practices](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/docs/cdn-usage.md) for CDN usage are available in our documentation.

## What To Expect From This Library
Msal support on JavaScript is a collection of libraries. `msal-core` or just simply `msal`, is the framework agnostic core library. Once our core 1.x+ is stabilized, we are going to bring our `msal-angular` library with the latest 1.x improvements.  We are planning to deprecate support for `msal-angularjs` based on usage trends of the framework and the library indicating increased adoption of Angular 2+ instead of Angular 1x. After our current libraries are up to standards, we will begin balancing new feature requests, with new platforms such as `react` and `node.js`.

Our goal is to communicate extremely well with the community and to take their opinions into account. We would like to get to a monthly minor release schedule, with patches coming as often as needed.  The level of communication, planning, and granularity we want to get to will be a work in progress.

Please check our [roadmap](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki#roadmap) to see what we are working on and what we are tracking next.

## OAuth 2.0 and the Implicit Flow

Msal implements the [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow), as defined by the OAuth 2.0 protocol and is [OpenID](https://docs.microsoft.com/azure/active-directory/develop/v2-protocols-oidc) compliant.

Our goal is that the library abstracts enough of the protocol away so that you can get plug and play authentication, but it is important to know and understand the implicit flow from a security perspective.
The implicit flow runs in the context of a web browser which cannot manage client secrets securely. It is optimized for single page apps and has one less hop between client and server so tokens are returned directly to the browser. These aspects make it naturally less secure.
These security concerns are mitigated per standard practices such as- use of short lived tokens (and so no refresh tokens are returned), the library requiring a registered redirect URI for the app, library matching the request and response with a unique nonce and state parameter.

## Cache Storage

We offer two methods of storage for Msal, `localStorage` and `sessionStorage`.  Our recommendation is to use `sessionStorage` because it is more secure in storing tokens that are acquired by your users, but `localStorage` will give you Single Sign On accross tabs and user sessions.  We encourge you to explore the options and make the best decision for your application.

### forceRefresh to skip cache
If you would like to skip a cached token and go to the server, please pass in the boolean `forceRefresh` into the `AuthenticationParameters` object used to make a login / token request. **WARNING:** This should not be used by default, because of the performance impact on your application.  Relying on the cache will give your users a better experience, and skipping it should only be used in scenarios where you know the current cached data does not have up to date information.  Example: Admin tool to add roles to a user that needs to get a new token with updates roles.

## Usage
The example below walks you through how to login a user and acquire a token to be used for Microsoft's Graph Api.

#### Prerequisites

Before using MSAL.js you will need to [register an application in Azure AD](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app) to get a valid `clientId` for configuration, and to register the routes that your app will accept redirect traffic on.

#### 1. Instantiate the UserAgentApplication

`UserAgentApplication` can be configured with a variety of different options, detailed in our [Wiki](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL.js-1.0.0-api-release#configuration-options), but the only required parameter is `auth.clientId`.

After instantiating your instance, if you plan on using a redirect flow in MSAL 1.2.x or earlier (`loginRedirect` and `acquireTokenRedirect`), you must register a callback handler using `handleRedirectCallback(authCallback)` where `authCallback = function(AuthError, AuthResponse)`. As of MSAL 1.3.0 this is optional. The callback function is called after the authentication request is completed either successfully or with a failure. This is not required for the popup flows since they return promises.

```JavaScript
    import * as Msal from "msal";
    // if using cdn version, 'Msal' will be available in the global scope

    const msalConfig = {
        auth: {
            clientId: 'your_client_id'
        }
    };

    const msalInstance = new Msal.UserAgentApplication(msalConfig);

    msalInstance.handleRedirectCallback((error, response) => {
        // handle redirect response or error
    });

```

For details on the configuration options, read [Initializing client applications with MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-initializing-client-applications).

#### 2. Login the user

Your app must login the user with either the `loginPopup` or the `loginRedirect` method to establish user context.

When the login methods are called and the authentication of the user is completed by the Azure AD service, an [id token](https://docs.microsoft.com/azure/active-directory/develop/id-tokens) is returned which is used to identify the user with some basic information.

When you login a user, you can pass in scopes that the user can pre consent to on login, however this is not required. Please note that consenting to scopes on login, does not return an access_token for these scopes, but gives you the opportunity to obtain a token silently with these scopes passed in, with no further interaction from the user.

It is best practice to only request scopes you need when you need them, a concept called dynamic consent. While this can create more interactive consent for users in your application, it also reduces drop-off from users that may be uneasy granting a large list of permissions for features they are not yet using.

AAD will only allow you to get consent for 3 resources at a time, although you can request many scopes within a resource.
When the user makes a login request, you can pass in multiple resources and their corresponding scopes because AAD issues an idToken pre consenting those scopes. However acquireToken calls are valid only for one resource / multiple scopes. If you need to access multiple resources, please make separate acquireToken calls per resource.

```JavaScript
   var loginRequest = {
       scopes: ["user.read", "mail.send"] // optional Array<string>
   };

    msalInstance.loginPopup(loginRequest)
        .then(response => {
            // handle response
        })
        .catch(err => {
            // handle error
        });

```

##### ssoSilent

If you are confident that the user has an existing session and would like to establish user context without prompting for interaction, you can invoke `ssoSilent` with a `loginHint` or `sid` (available as an [optional claim](https://docs.microsoft.com/azure/active-directory/develop/active-directory-optional-claims)) and MSAL will attempt to silently SSO to the existing session and establish user context.

Note, if there is no active session for the given `loginHint` or `sid`, an error will be thrown, which should be handled by invoking an interactive login method (`loginPopup` or `loginRedirect`).

Example:

```js
const ssoRequest = {
    loginHint: "user@example.com"
};

msalInstance.ssoSilent(ssoRequest)
    .then(response => {
        // session silently established
    })
    .catch(error => {
        // handle error by invoking an interactive login method
        msalInstance.loginPopup(ssoRequest);
    });
```

#### 3. Get an access token to call an API

In MSAL, you can get access tokens for the APIs your app needs to call using the `acquireTokenSilent` method which makes a silent request (without prompting the user with UI) to Azure AD to obtain an access token. The Azure AD service then returns an [access token](https://docs.microsoft.com/azure/active-directory/develop/access-tokens) containing the user consented scopes to allow your app to securely call the API.

You can use `acquireTokenRedirect` or `acquireTokenPopup` to initiate interactive requests, although, it is best practice to only show interactive experiences if you are unable to obtain a token silently due to interaction required errors. If you are using an interactive token call, it must match the login method used in your application. (`loginPopup`=> `acquireTokenPopup`, `loginRedirect` => `acquireTokenRedirect`).

If the `acquireTokenSilent` call fails with an error of type `InteractionRequiredAuthError` you will need to initiate an interactive request.  This could happen for many reasons including scopes that have been revoked, expired tokens, or password changes.

`acquireTokenSilent` will look for a valid token in the cache, and if it is close to expiring or does not exist, will automatically try to refresh it for you.

See [Request and Response Data Types](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL.js-1.0.0-api-release#signing-in-and-getting-tokens-with-msaljs) for reference.

```JavaScript
    // if the user is already logged in you can acquire a token
    if (msalInstance.getAccount()) {
        var tokenRequest = {
            scopes: ["user.read", "mail.send"]
        };
        msalInstance.acquireTokenSilent(tokenRequest)
            .then(response => {
                // get access token from response
                // response.accessToken
            })
            .catch(err => {
                // could also check if err instance of InteractionRequiredAuthError if you can import the class.
                if (err.name === "InteractionRequiredAuthError") {
                    return msalInstance.acquireTokenPopup(tokenRequest)
                        .then(response => {
                            // get access token from response
                            // response.accessToken
                        })
                        .catch(err => {
                            // handle error
                        });
                }
            });
    } else {
        // user is not logged in, you will need to log them in to acquire a token
    }
```

#### 4. Use the token as a bearer in an HTTP request to call the Microsoft Graph or a Web API

```JavaScript
    var headers = new Headers();
    var bearer = "Bearer " + token;
    headers.append("Authorization", bearer);
    var options = {
         method: "GET",
         headers: headers
    };
    var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

    fetch(graphEndpoint, options)
        .then(resp => {
             //do something with response
        });
```

You can learn further details about MSAL.js functionality documented in the [MSAL Wiki](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki) and find complete [code samples](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Samples).

## Security Reporting

If you find a security issue with our libraries or services please report it to [secure@microsoft.com](mailto:secure@microsoft.com) with as much detail as possible. Your submission may be eligible for a bounty through the [Microsoft Bounty](http://aka.ms/bugbounty) program. Please do not post security issues to GitHub Issues or any other public site. We will contact you shortly upon receiving the information. We encourage you to get notifications of when security incidents occur by visiting [this page](https://technet.microsoft.com/security/dd252948) and subscribing to Security Advisory Alerts.

## License

Copyright (c) Microsoft Corporation.  All rights reserved. Licensed under the MIT License (the "License");

## We Value and Adhere to the Microsoft Open Source Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
