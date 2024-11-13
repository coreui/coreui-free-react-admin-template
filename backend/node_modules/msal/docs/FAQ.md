# Table of Contents

***
**[Compatibility](#compatibility)**

1. [What browsers are supported by MSAL.js?](#what-browsers-are-supported-by-msaljs)
1. [I am moving from ADAL.js to MSAL.js. What should I know?](#i-am-moving-from-adaljs-to-msaljs-what-should-i-know)
1. [I am moving from MSAL-Angular 0.x to MSAL-Angular 1.x. What should I know?](#i-am-moving-from-msal-angular-0x-to-msal-angular-1x-what-should-i-know)

**[Authentication](#authentication)**

1. [I don't understand the redirect flow. How does the handleRedirectCallback function work?](#i-dont-understand-the-redirect-flow-how-does-the-handleredirectcallback-function-work)
1. [How can I support authentication with personal Microsoft accounts only?](#how-can-i-support-authentication-with-personal-microsoft-accounts-only)
1. [How do I log in multiple users to my application?](#how-do-i-log-in-multiple-users-to-my-application)

**[Single Sign-On](#single-sign-on)**

1. [How to get single sign-on in my application with MSAL.js?](#how-to-get-single-sign-on-in-my-application-with-msaljs)
1. [How can my application recognize a user after sign-in? How do I correlate users between applications?](#how-can-my-application-recognize-a-user-after-sign-in-how-do-i-correlate-users-between-applications)

**[Configuration](#configuration)**

1. [How do I decide what to set as my redirectUri?](#how-do-i-decide-what-to-set-as-my-redirecturi)
1. [How do I pass custom state parameter value in MSAL.js authentication request? For example: When you want to pass the page the user is on or custom info to your redirect_uri](#how-do-i-pass-custom-state-parameter-value-in-msaljs-authentication-request-for-example-when-you-want-to-pass-the-page-the-user-is-on-or-custom-info-to-your-redirect_uri)
1. [What is the difference between sessionStorage and localStorage?](#what-is-the-difference-between-sessionstorage-and-localstorage)
1. [Where is the authority string on Azure AD Portal?](#where-is-the-authority-domain-string-on-azure-ad-portal)

**[Tokens](#tokens)**

1. [How do I renew tokens with MSAL.js?](#how-do-i-renew-tokens-with-msaljs)
1. [How can I acquire tokens faster?](#how-can-i-acquire-tokens-faster)
1. [How long do tokens last? How long are they valid for?](#how-long-do-tokens-last-how-long-are-they-valid-for)
1. [Why is the accessToken field in the response empty?](#why-is-the-accessToken-field-in-the-response-empty)

**[Scopes & Resources](#scopes--resources)**

1. [My application has multiple resources it needs to access to. How should I handle scopes for access tokens?](#my-application-has-multiple-resources-it-needs-to-access-to-how-should-i-handle-scopes-for-access-tokens)
1. [In the samples, I see scopes passed in loginRequest and tokenRequest objects. What is the difference between passing scopes during login vs. passing scopes during token acquisition?](#in-the-samples-i-see-scopes-passed-in-loginrequest-and-tokenrequest-objects-what-is-the-difference-between-passing-scopes-during-login-vs-passing-scopes-during-token-acquisition)
1. [I'm seeing scopes openid, profile, email, offline_access in my tokens, even though I haven't requested them. What are they?](#im-seeing-scopes-openid-profile-email-offline_access-and-userread-in-my-tokens-even-though-i-havent-requested-them-what-are-they)

**[Tenancy & Audience](#tenancy--audience)**

1. [What do I need to make my app multi-tenant?](#what-do-i-need-to-make-my-app-multi-tenant)
1. [How do I provide admin consent for an app that has no user-interaction capability, like a web API?](#how-do-i-provide-admin-consent-for-an-app-that-has-no-user-interaction-capability-like-a-web-api)
1. [What are the differences between supported audiences and account types?](#what-are-the-differences-between-supported-audiences-and-account-types)

**[B2C](#b2c)**

1. [My B2C application has more than one user-flow/policy. How do I work with multiple policies in MSAL.js?](#my-b2c-application-has-more-than-one-user-flowpolicy-how-do-i-work-with-multiple-policies-in-msaljs)
1. [How can I implement password reset user flow in my B2C application with MSAL.js?](#how-can-i-implement-password-reset-user-flow-in-my-b2c-application-with-msaljs)
1. [I logged out of my application. Why am I not asked for credentials when I try to log back in?](#i-logged-out-of-my-application-why-am-i-not-asked-for-credentials-when-i-try-to-log-back-in)
1. [Why am I not signed in when returning from an invite link?](#why-am-i-not-signed-in-when-returning-from-an-invite-link)
1. [What should I do if I believe my issue is with the B2C service itself rather than with the library](#what-should-i-do-if-i-believe-my-issue-is-with-the-b2c-service-itself-rather-than-with-the-library)

**[Common Issues](#common-issues)**
1. [How to avoid page reloads when acquiring and renewing tokens silently?](#how-to-avoid-page-reloads-when-acquiring-and-renewing-tokens-silently)
1. [Why is my application stuck in an infinite redirect loop?](#why-is-my-application-stuck-in-an-infinite-redirect-loop)
1. [I'm using one of your samples on Internet Explorer and I get the error SignIn() is not defined](#im-using-one-of-your-samples-on-internet-explorer-and-i-get-the-error-signin-is-not-defined)
1. [Why is MSAL throwing an error?](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-core/docs/errors.md)

***

# Compatibility

## What browsers are supported by MSAL.js?

MSAL.js has been tested with the following browsers:

IE 11, Edge, Chrome, Firefox and Safari

Keep these steps in mind when [using MSAL.js with IE](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Using-msal.js-with-Internet-Explorer).

There are certain known issues and mitigations documented for Safari, IE and Edge. Please check out:
* [Known issues on IE and Edge](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
* [Known issue on Safari](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issue-on-Safari)

## I am moving from ADAL.js to MSAL.js. What should I know?

MSAL.js integrates with the Azure AD v2.0 endpoint, whereas ADAL.js integrates with the Azure AD v1.0 endpoint. The v1.0 endpoint supports work and school accounts, but not personal Microsoft accounts. The v2.0 endpoint combines work, school and personal Microsoft accounts into a single authentication system. Additionally, with MSAL.js you can also achieve authentication for Azure AD B2C.

**Key differences in authentication with v1.0 versus v2.0 endpoint**

* **Scope instead of resource parameter in authentication requests**

    Azure AD v2.0 protocol uses scopes instead of resource in the requests. In other words, when your application needs to request tokens with permissions for a resource such as MS Graph, the difference in values passed to the library methods is as follows:

    v1.0: resource = `https://graph.microsoft.com`

    v2.0: scope = `https://graph.microsoft.com/User.Read`

You can request scopes for any resource API using URI of the API in this format: appidURI/scope
For example: https://mytenant.onmicrosoft.com/myapi/api.read

> Note: For the MS Graph API, a scope value `User.Read` maps to https://graph.microsoft.com/User.Read and can be used interchangeably.

* **Dynamic scopes for incremental consent.**

    When building applications using Azure AD v1.0, you needed to register the full set of permissions (static scopes) required by the application for the user to consent to at the time of login.  In Azure AD v2.0, you can use the scope parameter to request the permissions at the time you want them. These are called **dynamic scopes**. This allows the user to provide incremental consent to scopes. So if at the beginning you just want the user to sign in to your application and you don’t need any kind of access, you can do so. If later you need the ability to read the calendar of the user, you can then request the calendar scope in the `acquireToken*` methods and get the user's consent.

    For example:

    ```JavaScript
    const tokenRequest = {
          scopes: ["User.Read", "Calendar.Read"],
    }

    myMsalObj.acquireTokenPopup(tokenRequest );
    ```

* **Scopes for V1.0 APIs**

    When getting tokens for V1.0 APIs using MSAL.js, you can request all the static scopes registered on the API by appending `.default` to the App ID URI of the API as scope.

    For example:

    ```javaScript

    const tokenRequest = {
          scopes: [ appidURI + "/.default"],
    }

    acquireTokenPopup(tokenRequest);
    ```

* **Token versions**

    You can acquire both v1.0 and v2.0 tokens and use V1.0 tokens against the V1.0 APIs with MSAL.js.

Refer to [Azure AD v1.0 and v2.0 comparison](https://docs.microsoft.com/azure/active-directory/develop/active-directory-v2-compare) for more details.

## I am moving from MSAL-Angular 0.x to MSAL-Angular 1.x. What should I know?
Please refer to our migration guide [here](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/0.x-1.x-upgrade-guide.md).

# Authentication

## I don't understand the redirect flow. How does the `handleRedirectCallback` function work?

The redirect flow can be confusing, as redirecting away from the page means you are creating a whole new instance of the application when you return. This means that calling a redirect method cannot return anything. Rather what happens is, the page is redirected away, you enter your credentials and you are redirected back to your application with the response in the url hash.

If `navigateToRequestUrl` property in MSAL configuration parameters is set to **true**, you will be redirected again to the page you were on when you called `loginRedirect`, unless that page was also set as your `redirectUri`. When the application is done with all redirects the hash will be processed and your tokens will be cached in local/session storage.

Calling `handleRedirectCallback()` allows you to execute a function after the response has been processed similar to what you might want to do in the `.then` and `.catch` clauses of `loginPopup`.

Please review one of our samples ([for instance](https://github.com/Azure-Samples/ms-identity-javascript-v2)) to see the redirect flow in action.

## How can I support authentication with personal Microsoft accounts only?

Simply set your `authority` in your MSAL app configuration to **consumers** tenant e.g. https://login.microsoftonline.com/consumers.

## How do I log in multiple users to my application?
Msal.js v1.x does not support multiple concurrent users. If this is a use case your app needs to support please upgrade to the msal-browser library.

Switching users is possible by calling either `loginRedirect` or `loginPopup` and including `prompt: "select_account"` in your request like so:
```javascript
request = {
    scopes: [User.Read],
    prompt: "select_account"
}
```
Note that when switching users, the previous user's tokens will be cleared from local/session storage but their session may remain active with AAD. It is recommended that you call `logout()` before switching users.

# Single Sign-On

## How to get single sign-on in my application with MSAL.js?

Please read the documentation on [Single Sign-On](https://docs.microsoft.com/azure/active-directory/develop/msal-js-sso) to learn about different scenarios in which MSAL.js enables single sign-on.

## How can my application recognize a user after sign-in? How do I correlate users between applications?

You can use the `accountIdentifier` property on the Account in the `AuthResponse`.

```js
loginPopup().then((response) => {
    const uniqueID = response.account.accountIdentifier;
})
```

# Configuration

## How do I decide what to set as my `redirectUri`?

`redirectUri` is a parameter you can provide to your msal instance and/or to each individual request to tell the IDP where to redirect back to when authentication is complete. There are a couple things you need to keep in mind when deciding what to set as your `redirectUri`

If no `redirectUri` is explicitly provided, msal will use the current page as the `redirectUri`

**Note:** All `redirectUris` must be registered in the Azure App Portal for your application and must be an exact match, including any hashes or query parameters

### When using a Redirect API

`loginRedirect`, `acquireTokenRedirect`

When using a redirect API to acquire a token, the page at the `redirectUri`, in addition to, the page that ultimately processes the response must initialize msal to complete the login and/or cache the token. Please also ensure this page does not manipulate the hash in the url until **after** msal has successfully processed the response.

- If `navigateToLoginRequestUrl: false` in the msal auth config, the provided `redirectUri` will be the final page and will process the response.
- If `navigateToLoginRequestUrl: true` (default), the IDP will redirect to the provided `redirectUri` which will then redirect **again** to the page that initiated the request. This final page will now process the response.

**Note:** Only urls that are passed to `redirectUri` need to be registered in the app portal. If `navigateToLoginRequestUrl: true` you do not need to register the requesting url as a `redirectUri` in the app portal, as long as you have specified a different `redirectUri` in the request.

### When using a Popup or Silent API

`loginPopup`, `acquireTokenPopup`, `ssoSilent`, `acquireTokenSilent`

When using a popup or silent API to acquire a token we recommend setting the `redirectUri` to a blank page that does not require authentication and does not initialize msal. This is because the popup window will ask you for your credentials or consent and the parent app will parse the response. Similarly, the hidden iframe in the silent scenario will redirect to the IDP and redirect back to the `redirectUri`. There is no need for the popup or hidden iframe to render your app, in fact it may cause unexpected issues, including but not limited to, degraded performance, popups not closing, token renewal timeouts.

```javascript
request = {
    scopes: ["User.Read"],
    redirectUri: "http://myapp.com/blank.html"
}
```

## How do I pass custom state parameter value in MSAL.js authentication request? For example: When you want to pass the page the user is on or custom info to your `redirect_uri`.

The state parameter as defined by OAuth 2.0 is a value included in the request that will also be returned in the token response typically used for preventing **cross-site request forgery** attacks. By default, MSAL.js passes a randomly generated unique `state` value for this purpose in the authentication requests.

This parameter can also be used to encode information of the app's state before redirect. You can pass the user's state in the app, such as the page or view they were on as input to this parameter.

The MSAL.js library allows you to pass your custom state as `state` parameter in the Request object.

```javascript
// Request type
export type AuthenticationParameters = {
    scopes?: Array<string>;
    extraScopesToConsent?: Array<string>;
    prompt?: string;
    extraQueryParameters?: QPDict;
    claimsRequest?: string;
    authority?: string;
    state?: string;
    correlationId?: string;
    account?: Account;
    sid?: string;
    loginHint?: string;
};
```

For example:

```javascript
let loginRequest = {
    scopes: ["user.read", "user.write"],
    state: “page_url”
}

myMSALObj.loginPopup(loginRequest);
```

The passed in state is appended to the unique `GUID` set by MSAL.js when sending the request. When the response is returned, MSAL.js checks for a state match and then returns the custom passed in state in the Response object as `accountState`.

```javascript
export type AuthResponse = {
    uniqueId: string;
    tenantId: string;
    tokenType: string;
    idToken: IdToken;
    accessToken: string;
    scopes: Array<string>;
    expiresOn: Date;
    account: Account;
    accountState: string;
};
```

## What is the difference between `sessionStorage` and `localStorage`?

We offer two methods of storage for Msal, `localStorage` and `sessionStorage`.  Our recommendation is to use `sessionStorage` because it is more secure in storing tokens that are acquired by your users, but `localStorage` will give you Single Sign On accross tabs and user sessions.  We encourage you to explore the options and make the best decision for your application.

## Where is the `authority` domain string on Azure AD Portal?

The `authority` string that you need to supplant to MSAL app configuration is not explicitly listed among the **Endpoint** links on `Azure Portal/AzureAD/App Registration/Overview` page. It is simply the domain part of a `/token` or `/authorize` endpoint, followed by the tenant name or ID e.g. `https://login.microsoftonline.com/common`.

# Tokens

## How do I renew tokens with MSAL.js?

MSAL.js provides the `acquireTokenSilent` method which handles token renewal by making silent token requests without prompting the user. The method first looks for a valid cached token in the browser storage. If it does not find one, the library makes the silent request to Azure AD and if there is an active user session (determined by a cookie set in browser on the Azure AD domain), a fresh token is returned. The library does not automatically invoke the `acquireTokenSilent` method. It is recommended that you call `acquireTokenSilent` in your app before making an API call to get the valid token.

In certain cases, the `acquireTokenSilent` method's attempt to get the token silently fails. Some examples of this are when there is an expired user session with Azure AD or a password change by the user, etc. which requires user interaction. When the `acquireTokenSilent` fails, you need to call one of the interactive acquire token methods.(`acquireTokenPopup` or `acquireTokenRedirect`).

The tokens returned by Azure AD have a default lifetime of 1 hour. However, as long as the user is active on your application and a valid Azure AD session exists in the browser, the `acquireTokenSilent` method can be used to renew tokens. The Azure AD session is valid for 24 hours and can be extended by the user by choosing "Keep me signed in" option on the sign-in screen. For more details, read the [token and session lifetimes](https://docs.microsoft.com/azure/active-directory/develop/active-directory-configurable-token-lifetimes) document.

## How can I acquire tokens faster?

Please refer to our performance guide [here](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/docs/performance.md)

## How long do tokens last? How long are they valid for?

Token lifetimes are 1 hour and the session lifetime is 24 hours. This means that if no requests have been made in 24 hours, you will need to login again before requesting a new token.

## Why is the accessToken field in the response empty?

If you are requesting scopes `clientId`, `openid` and/or `profile`, these are **ID token** scopes. Previously, in versions <1.4.0, MSAL.js would get an **ID token** and put it into the `accessToken` and `idToken` fields (both with the same value). In version 1.4.0 this behavior was changed to be in-line with what the AAD/B2C server is sending back. Now MSAL.js gets the same **ID token** but puts it under `idToken` field and leaves the `accessToken` field empty. If you need an access token you should request a scope other than `clientId`, `openid` or `profile`

See the [documentation on scopes](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/docs/scopes.md) for more information.

# Scopes & Resources

## My application has multiple resources it needs to access to. How should I handle scopes for access tokens?

Please see the doc about resources and scopes [here](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md)

## In the samples, I see scopes passed in `loginRequest` and `tokenRequest` objects. What is the difference between passing scopes during login vs. passing scopes during token acquisition?

The difference is about at which stage the user will be asked for consent.

Consider this:

```JavaScript
const loginRequest = {
  scopes: ["User.Read"]
};

const tokenRequest = {
  scopes: ["Mail.Read"]
};

msalInstance.loginPopup(loginRequest);
// ...

msalInstance.acquireTokenSilent(tokenRequest);
// ...
```

In the above code snippet, the user will consent to `User.Read` scope once s/he authenticates. Later, if s/he requests an `access_token` for `User.Read`, s/he will not be asked for consent again (in other words, s/he can acquire a token **silently**). On the other hand, the user did not consented to `Mail.Read` at the authentication stage. As such, s/he will be asked for consent when s/he requests an `access_token` for that scope. 

See the documentation on [Permissions and Consent](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent) for a longer treatment of this subject

## I'm seeing scopes `openid`, `profile`, `email`, `offline_access` and `User.Read` in my tokens, even though I haven't requested them. What are they?

The first four (`openid`, `profile`, `email` and `offline_access`) are called **default scopes**. They are added to Azure AD as part of Azure AD - OAuth 2.0/OpenID Connect compliance. They are **not** part of any particular API. You can read more about them [here](https://openid.net/specs/openid-connect-core-1_0.html). 

The scope `User.Read`, on the other hand, is an MS Graph API scope. It is also added by default to every app registration. However if your application is not calling MS Graph API, you can simply ignore it.

# Tenancy & Audience

## What do I need to make my app multi-tenant?

Please see the [MSAL.js Multi-tenant Application sample](https://github.com/Azure-Samples/ms-identity-javascript-angular-spa-aspnet-webapi-multitenant).

## How do I provide admin consent for an app that has no user-interaction capability, like a web API?

The solution for this is to allow the user (in this case, an admin-user) to consent to web API at the same time they consent to the front-end application i.e. give a _combined consent_. `/.default` scope can be used to this effect, allowing you to consent to many different scopes at one step. 

> **The .default scope**: This is a built-in scope for every application that refers to the static list of permissions configured on the application registration. Basically, it bundles all the permissions in one scope. The `/.default` scope can be used in any OAuth 2.0 flow, but is necessary when using the v2.0 `/adminconsent` endpoint to request application permissions.

The remaining problem is to configure the web API know that the consent comes from a recognized front-end application, as opposed to some foreign application? For this, you can use the `KnownClientApplications` feature.

> **KnownClientApplications**: an attribute in application manifest. It is used for bundling consent if you have a solution that contains two (or more) parts: a client app and a custom web API. If you enter the appID (clientID) of the client app into this array, the user will only have to consent only once to the client app. Azure AD will know that consenting to the client means implicitly consenting to the web API. It will automatically provision service principals for both the client and web API at the same time. Both the client and the web API app must be registered in the same tenant.

To use it, find the KnownClientApplications in your application manifest (on Azure Portal/App Registration), and add the Application (client) ID of the client application `KnownClientApplications: ["your-client-id-for-client-application"]`. Once you do that, your web API will be able to correctly identify your front-end and the combined consent will be successfully carried out.

## What are the differences between supported audiences and account types?

Please see the documentation on [Tenancy in Azure Active Directory](https://docs.microsoft.com/azure/active-directory/develop/single-and-multi-tenant-apps#who-can-sign-in-to-your-app)

# B2C

## My B2C application has more than one user-flow/policy. How do I work with multiple policies in MSAL.js?

MSAL.js allows you to provide an authority on a per-request basis. To acquire an access token for a different policy than the one you signed in with, simply pass the relevant authority as a part of the request object.

```javascript
const request = {
scopes: ["https://b2ctenant.onmicrosoft.com/exampleApi/exampleScope"],
authority: "https://b2ctenant.b2clogin.com/b2ctenant.onmicrosoft.com/examplePolicy"
}

msal.acquireTokenPopup(request);
```

A few additional things to keep in mind regarding multiple policy scenarios:

- MSAL.js 1.x is only able to cache one id_token at a time, which means that obtaining an id_token for a different policy will overwrite the cached id_token from the previous policy.
- Some policies, such as profile_edit and password_reset, require interaction and cannot be used to renew tokens silently. Obtaining a cached access token via `acquireTokenSilent` is still possible, however, if the token is expired the service will throw an "X-Frame Options DENY" error when MSAL attempts to renew it. When this happens your application must catch this error and fallback to calling an interactive method (`acquireTokenRedirect` or `acquireTokenPopup`)

## How can I implement password reset user flow in my B2C application with MSAL.js?

Please checkout our sample [here](https://github.com/Azure-Samples/active-directory-b2c-javascript-msal-singlepageapp) to see how to implement the **password reset** user flow.

## I logged out of my application. Why am I not asked for credentials when I try to log back in?

When you log out of a B2C application by calling MSAL's `logout()` API, MSAL.js will first clear browser storage of your user's tokens then redirect you to the Azure B2C logout endpoint. The B2C service will then close your session but may not log you out of your federated IDP. This happens because the service does not make any assumptions about other apps you may want to log out of. What this means in practice is that when a user attempts to login again the B2C service will prompt the user to select which Social IDP they would like to sign in with. When the user makes their selection, they may be signed back in without interaction.

You can read more about this behavior [here](https://docs.microsoft.com/azure/active-directory-b2c/session-overview#sign-out)

## Why am I not signed in when returning from an invite link?

MSAL.js will only process tokens which it originally requested. If your flow requires that you send a user a link they can use to sign up, you will need to ensure that the link points to your app, not the B2C service directly. An example flow can be seen in the [working with B2C](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/working-with-b2c.md) doc.

## What should I do if I believe my issue is with the B2C service itself rather than with the library

In that case, please file a support ticket with the B2C team by following the instructions here: [B2C support options](https://docs.microsoft.com/azure/active-directory-b2c/support-options).

# Common Issues

## How to avoid page reloads when acquiring and renewing tokens silently?

MSAL.js uses hidden iframes to acquire and renew tokens silently in the background. Azure AD returns the token back to the registered `redirect_uri` specified in the token request. Since the response is a 302, it results in the HTML corresponding to the `redirect_uri` getting loaded in the iframe. Usually (by default) the app's `redirect_uri` is the root page and this causes it to reload.

In other cases, if navigating to the app's root page requires authentication, it might lead to **nested iframes** or **XFRAME DENY error**.

Since, MSAL.js cannot dismiss the 302 issued by Azure AD and is required to process the returned token, it cannot prevent the `redirect_uri` from getting loaded in the iframe.

To avoid the entire app reloading again or other errors caused due to this, please follow these workarounds:

* **Specify a different html for the iframe:**

    Set `redirect_uri` property on config to a simple page, that does not require authentication. You have to make sure that it matches with the `redirect_uri` registered in Azure portal. This will not affect user's login experience as MSAL saves the start page when user begins the login process and redirects back to the exact location after login is completed.

* **Conditional initialization in your main app file:**

    If your app is structured such that there is one central JavaScript file that defines the app's initialization, routing and other stuff, you can conditionally load your app modules based on whether the app is loading in an iframe or not. For example:

    *In AngularJS: app.js*
    ```js

    // Check that the window is an iframe and not popup
    if (window !== window.parent && !window.opener) {
    angular.module('todoApp', ['ui.router', 'MsalAngular'])
        .config(['$httpProvider', 'msalAuthenticationServiceProvider','$locationProvider', function ($httpProvider, msalProvider,$locationProvider) {
            msalProvider.init(
                // msal configuration
            );

            $locationProvider.html5Mode(false).hashPrefix('');
        }]);
    }
    else {
        angular.module('todoApp', ['ui.router', 'MsalAngular'])
            .config(['$stateProvider', '$httpProvider', 'msalAuthenticationServiceProvider', '$locationProvider', function ($stateProvider, $httpProvider, msalProvider, $locationProvider) {
                $stateProvider.state("Home", {
                    url: '/Home',
                    controller: "homeCtrl",
                    templateUrl: "/App/Views/Home.html",
                }).state("TodoList", {
                    url: '/TodoList',
                    controller: "todoListCtrl",
                    templateUrl: "/App/Views/TodoList.html",
                    requireLogin: true
                })

                $locationProvider.html5Mode(false).hashPrefix('');

                msalProvider.init(
                    // msal configuration
                );
            }]);
    }
    ```

    *In Angular: app.module.ts*

    ```js
    // Imports...
    @NgModule({
      declarations: [
        AppComponent,
        MsalComponent,
        MainMenuComponent,
        AccountMenuComponent,
        OsNavComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        MsalModule.forRoot(environment.MsalConfig),
        SuiModule,
        PagesModule
      ],
      providers: [
        HttpServiceHelper,
        {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true},
        AuthService
      ],
      entryComponents: [
        AppComponent,
        MsalComponent
      ]
    })
    export class AppModule {
      constructor() {
        console.log('APP Module Constructor!');
      }

      ngDoBootstrap(ref: ApplicationRef) {
        if (window !== window.parent && !window.opener)
        {
          console.log("Bootstrap: MSAL");
          ref.bootstrap(MsalComponent);
        }
        else
        {
        //this.router.resetConfig(RouterModule);
          console.log("Bootstrap: App");
          ref.bootstrap(AppComponent);
        }
      }
    }
    ```
    *MsalComponent:*

    ```js
    import { Component} from '@angular/core';
    import { MsalService } from '@azure/msal-angular';

    // This component is used only to avoid Angular reload
    // when doing acquireTokenSilent()

    @Component({
      selector: 'app-root',
      template: '',
    })
    export class MsalComponent {
      constructor(private Msal: MsalService) {
      }
    }
    ```

## Why is my application stuck in an infinite redirect loop?

Redirect loops occur most commonly when an app automatically triggers a `loginRedirect` call on page load. Your app should first verify a user is signed-in before attempting to login.

```javascript
if (!msalObj.getAccount()) {
    msalObj.loginRedirect(request);
} else {
    // User signed in!
}
```

### Solutions

- If using msal-angular and your app relies on the broadcast events, ensure your app calls `handleRedirectCallback()` on the page that handles the response containing the token.
- Set `navigateToLoginRequestUrl: false` in your msal config. When this is set to true, the IDP will redirect back to the configured `redirectUri` and then msal will additionally redirect to the page that initiated the login request. Setting this to false ensures navigation ends when the `redirectUri` is reached

```javascript
msal = new Msal.UserAgentApplication({
    auth: {
        clientId: your-client-id,
        redirectUri: your-redirect-uri
        navigateToLoginRequestUrl: false
    }
});
```

- Ensure your app is not clearing the response hash before msal can parse it. 
- Check your network trace for the response to the /authorize request. If it contains an `id_token` but your app is triggering another login, verify your app's logic
- If using IE11 or non-chromium Edge browsers set the `storeAuthStateInCookie: true` in your msal cache config

```javascript
msal = new Msal.UserAgentApplication({
    auth: {
        clientId: your-client-id,
    },
    cache: {
       storeAuthStateInCookie: true 
    }
})
```

## I'm using one of your samples on Internet Explorer and I get the error "SignIn() is not defined"

Our samples use [ES6](http://www.ecma-international.org/ecma-262/6.0/) conventions, in particular **promises**, **arrow functions** and **template literals**. As such, they will **not** work on Internet Explorer out-of-the-box. For **promises**, you need to add a polyfill, i.e.:

```html
<head>
   <!-- adding pollyfil for promises on IE11  -->
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.42/polyfill.min.js"> 
   </script>
</head>
```

For **arrow functions** and **template literals**, you need to transpile them to old JavaScript. You can use [this tool](https://babeljs.io/repl) to help with the process.
