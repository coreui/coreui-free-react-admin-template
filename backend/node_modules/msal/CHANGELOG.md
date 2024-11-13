# Change Log - msal

This log was last generated on Mon, 01 May 2023 20:47:42 GMT and should not be manually modified.

<!-- Start content -->

## 1.4.18

Mon, 01 May 2023 20:47:42 GMT

### Patches

- Update polycheck version, rename Blacklist params (#5901) (sameera.gajjarapu@microsoft.com)

## 1.4.17

Mon, 01 Aug 2022 22:22:36 GMT

### Patches

- Use login_hint claim over sid/upn for msal v1 #4995 (janutter@microsoft.com)

## 1.4.16

Tue, 08 Feb 2022 00:41:07 GMT

### Patches

- Improve reliability of interaction_in_progress #4466 (thomas.norling@microsoft.com)

## 1.4.15

Mon, 01 Nov 2021 23:53:22 GMT

### Patches

- Remove fallback logic for iframe creation in msal-core #4182 (janutter@microsoft.com)

## 1.4.14

Mon, 04 Oct 2021 23:12:35 GMT

### Patches

- Export library version #4124 (thomas.norling@microsoft.com)

## 1.4.13

Tue, 07 Sep 2021 23:22:24 GMT

### Patches

- Throw interaction in progress if any msal instance has interaction in progress #4014 (thomas.norling@microsoft.com)

## 1.4.12

Thu, 22 Jul 2021 22:50:22 GMT

### Patches

- Fix bug causing acquireTokenSilent to hang and never return #3867 (thomas.norling@microsoft.com)

## 1.4.11

Wed, 12 May 2021 18:35:03 GMT

### Patches

- Remove idtoken hash from browser history in msal-core #3587 (hemoral@microsoft.com)

## 1.4.10

Thu, 22 Apr 2021 23:26:08 GMT

### Patches

- Encode control characters in cookies set by MSAL.js v1 #3469 (janutter@microsoft.com)
- Add .browserslistrc #3471 (thomas.norling@microsoft.com)

## 1.4.9

Wed, 31 Mar 2021 22:25:57 GMT

### Patches

- Fix token cache for /consumers authority #3327 (thomas.norling@microsoft.com)

## 1.4.8

Mon, 15 Mar 2021 23:45:17 GMT

### Patches

- Dont migrate tokens for different clientId #3188 (thomas.norling@microsoft.com)

## 1.4.7

Wed, 03 Mar 2021 21:47:05 GMT

### Patches

- Fix lib version on request (#3080)  (thomas.norling@microsoft.com)

## 1.4.6

Tue, 09 Feb 2021 01:48:22 GMT

### Patches

- Fix version.json import errors (#2993) (thomas.norling@microsoft.com)

## 1.4.5

Tue, 02 Feb 2021 01:56:47 GMT

### Patches

- Get package version from version.json (#2915) (thomas.norling@microsoft.com)

## 1.4.4

Wed, 11 Nov 2020 23:33:20 GMT

### Patches

- Fix multiple matching tokens error (#2582) (thomas.norling@microsoft.com)

## 1.4.3

Thu, 29 Oct 2020 20:36:48 GMT

### Patches

- Fix ID token matching logic to ignore non-JSON cache keys (#2510) (hemoral@microsoft.com)
- Ensure history.replaceState is a function (janutter@microsoft.com)

## 1.4.2

Tue, 20 Oct 2020 23:47:28 GMT

### Patches

- Fix issue where concurrent acquireTokenSilent call closed window used by acquireTokenPopup (#2355) (hemoral@microsoft.com)
- Use history API to clear hash to remove # sign (janutter@microsoft.com)
- Fix issues with ID token caching and cache lookup (#2376) (hemoral@microsoft.com)

## 1.4.1

Wed, 30 Sep 2020 17:58:33 GMT

### Patches

- Fix ID Token cache lookup. PR #2206 (hemoral@microsoft.com)

## 1.4.0

Tue, 25 Aug 2020 00:40:45 GMT

### Minor changes

- B2C Multiple Policy Support (#1757) (thomas.norling@microsoft.com)
- ADFS 2019 Support (#1668) (thomas.l.norling@gmail.com)
- Enables idToken acquisition in acquireToken API calls through the use of OIDC scopes by redefining the way response_type is determined. (PR #2022) (hemoral@microsoft.com)

# 1.3.4

## Bugs
* Fix lowercase scopes issue (#1945)
* Fix Redirect Error Callback (#1942)
* Replace /organizations with tenant ID in replaceTenantPath (#1974)
* Fix cache miss when common authority is provided (#2015)
* Fix back button behavior (#2081)

# 1.3.3

##  Enhancements
* Add monitorIframeForHash to ensure silent requests timeout. (#1823)
* Use instance discovery for trusted hosts and combine authority classes. ([#1583](https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/1583)
* Add custom authority lookup. (#1836)
* Ensure cookies are minimal size and deleted when necessary. (#1829)
* Logging improvements. (#1777, #1767, #1752)

# 1.3.2

## Bugs
* Ensure decoding query parameters doesnt remove plus signs twice. (#1746)
* Fix popup about:blank errors. (#1667)
* Fix processing and redirection of acquireTokenRedirect. (#1758)

## Enhancements
* Remove url from timeout error message, move to errorPii logger. (#1686)
* Add onRedirectNavigate callback to stop navigatation and get redirect url. (#1691)
* Allow applications to bypass network request for OpenID configuration. (#1578)
* Extend acquireTokenSilent Instrumentation. (#1629)
* Add performance instrumentation to TelemetryManager events. (#1643) 

# 1.3.1

## Bugs

* Prevent adding unnecessary entries into browser history. (#1577)
* Add aria-hidden to hidden iframes. (#1581)
* Fix regression for redirect URIs that included query strings. (#1604)

# 1.3.0

## Features
* Add ssoSilent API (#1166)

## Enhancements
* Turn library state into encoded string that contains guid and timestamp. (#1395)
* Fix behavior of `handleRedirectCallback`, and make it no longer required. (#1358)
* `domain_hint` is no longer supported in silent calls or when `sid` or `login_hint` is passed. (#1299)
* Update the framename to reflect authority and scopes (#1267)
* Switch to file-based sourcemaps for msal.js and msal.min.js (#1525)
* Set sideEffects to false to enable better tree-shaking (#1526)
* Add TelemetryManager to public APIs (#1399)

## Bugs
* Ensure responses from redirect requests are always processed. (#1413)
* Ensure state is decoded before it is processed. (#1456)
* B2C Authority Fixes. (#1276)
* Check if request is null in populateQueryParams (#1531)
* Fix token caching for acquireToken calls (#1516)
* Unblock popup scrolling for IE11 (#1426)

# 1.2.2

## Features
* Add `setLogger` function to `UserAgentApplication`. (#1251)

## Enhancements
* Render hidden iframes synchronously if `navigateFrameWait` is set to `0`. (#1278)
* Add `redirectStartPage` property to `AuthenticationParameters` to allow apps to indicate which page triggered the redirect. (#1343)

## Bugs
* Properly remove temporary cache entries. (#1339)
* Always send back the accessToken and scopes if the response includes them. (#1351)
* Ensure silent operations timeout if the iframe never returns to the app domain. (#1354)
* Ensure hidden iframes are properly removed. (#1415)

## Logging / Telemetry
* Add telemetry for `acquireTokenSilent`. (#1388)

# 1.2.1

## Bugs
* `urlContainsHash()` is restored as a public API (#1202)
* `allow-forms` added in sandbox properties for the iframes created by `msal js` to support certain B2C scenarios(#1191)

## Enhancements
* `isAngular` flag removal from `redirect` use cases(#1193)

# 1.2.0

## Features:
* Iframes Support added  (#939, #975, #1053, #1075); msal js now added support for authentication in applications embedded in iframes which implies that an application can now call `loginSilent()`, `acquireTokenSilent()` and `acquireTokenPopup()` from iframes.
* `redirectUri` supported as a request parameter (#1116); This feature in conjunction with iframes support improves performance, by providing the application the capability to avoid a full reload of a SPA on redirect. Please refer to the [sample](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/VanillaJSTestApp/index_blankPageRedirectUri.html) in the release [notes](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-JS-1.2.0) for the usage details
* Multiple Instances (#980, #1010)
* Cache changes - to support iframes, multiple instances and other enhancements (#983, #1042, #1067)
* fromCache flag added in response to indicate cache vs network response for a request (#1114)
* Instance Aware support (#969)

## Bugs
* `request.correlationId` is now passed to the service (#1083)
* response_mode explicitly set to fragment for all use cases (#1090)
* verbose messages and monitoring for timeout errors (#1098, #1113)
* handle `loginRedirect` set to null (#1047)
* Fix japanese decoding (#1036, #1054)
* Fix Unified cache, Redirect and B2C samples (#933, #959, #1027, #973)
* Change `location.replace` to `location.assign` to support history in redirect APIs (#1002)

## Dev tools
* linting added (#931, #935, #947)
* CI/CD pipeline (#924)
* Removed karma from UT and migrate completely to mocha/chai (#956)
* Added Code coverage, introduce coveralls (#972, #1105)
* Fix unit tests for unix environments (#977)
* Move samples to top level (#987)
* Added SRI tags to CDN files (#1020, #1024, #1030)

## Documentation
* Simplify root readme file (#1004)
* Remove generated doc files from repo, deploy them to Github Pages (#1131)

# 1.1.3
* Introduction of Azure Pipelines (#912)
* Removing uuid library that is incompatible with ES6 modules (#878)
* Update lerna dependency to resolve to safe version of lodash (#910)
* Refactoring (#886)

# 1.1.2
* Minor fixes to docs and samples (#859, #857, #757)
* Fixes issue where scope object was being mutated (#875)
* Fixes issue where token type wasn't being set correctly when renewing id token (#873)
* Refactoring (#805, #806)

# 1.1.1
* Fixed an issue where cacheLocation was no longer accepting string values (#862)

# 1.1.0
* Core
    * idTokenClaims has been added to the API surface in AuthResponse and Account (#804)
    * Added forceRefresh parameter to request object, which will force acquireTokenSilent to fetch tokens from cache (#823)
    * Added scaffolding for telemetry (#737, #802, #840)
        * The full telemetry feature will be available in a future release
    * Fixed issue where server was sending a null errorDesc which caused a problem in error response processing (#811)
        * MSAL.js now throws a ServerError when the user chooses not to grant consent or clicks back in multi-account selection
    * Updating the comments in Configuration.ts to show the correct parameters (#780)
    * CacheLocation changed to enum to avoid type widening (#851)
    * MSAL.js sends log messages when removing sid and login_hint from extraQueryParameters (#781)
    * Improved formatting and docs in README and issue template (#789, #793, #795)
    * Fixed bug where expiresIn was not calculating correctly (#799)
    * Fixed issue where errors did not display for failed redirect login attempts in the React sample. (#820)
    * Fixed `npm audit` security warnings (#828)
    * Updated references to `cloud.microsoft.com` since domain no longer works properly (#830)
    * AcquireToken APIs throw empty request errors when given null or empty request objects (#831)
    * Switched from tslint to eslint for linting configuration (#849)
    * Removed dependency on base64-js package due to incompatability with ES modules, removed unused encoding functions (#826)
    * Refactoring (#792)

* Other Updates
    * Fixed issues with Angular and Angular-JS samples (#813)

# 1.0.2
* Fixed broken link in docs for error message and module docs (#731)
* Fix typo in README (#743, #749)
* Update lerna version (#748)
* Fix Interaction_Required error to throw on all interaction_required error types (#753)
* Added a react sample (#727)
* Fix for bug preventing asynchronous acquireTokenSilent calls (#768)

# 1.0.1
* Fixed bug where navigateToLoginRequestURL = false would cause callback to not fire (#696)
* Fixed bug where null request object would cause null pointer exception for state parameter (#698)
* All msal related cache items are deleted on logout (#709)
* Fixed bug where "user cancelled" error in acquireTokenPopup would not throw (#707)
* Logout endpoint now uses the given EndSessionEndpoint from the oauth discovery endpoint response (#716)
* Now uses base64.js instead of window.atob (#712)
* Fixed bug where login_hint was added if sid was already populated. (#700)

# 1.0.0
* Formal release of msal-1.0.0 which includes all the msal-1.0.0-preview.x changes.
* Includes breaking API Changes - please find the details @https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL.js-1.0.0-preview-api-release

# 1.0.0-preview.5
* Error First Callbacks PR #658
* Claims Request Support PR #664
* loginInProgress() as a public function #671
* 'state' moved from config to request, returning the user state if passed stripping the GUID #674 #679 #681
* cache cleanup of all values (keys cleanup will be done in next release) #675
* made loading iFrame timeout in silent calls configurable, 'navigateFrameWait' #676
* readme updated with latest code patterns #672

# 1.0.0-preview.4
Add dist back into npm package as a valid build artifact

# 1.0.0-preview.3
Add a hook in package.json to build msal js before npm publish to have the libraries up to date

# 1.0.0-preview.2
## Bug Fixes

* Fix for the multiple_authorities issue seen due to non Canonalized authority storage in cache PR #656
* Populate scopes from cache for getCachedToken Response object PR #657.
* ES6 modules are added back into the npm #654

# 1.0.0-preview.1
## Bug Fixes

* Fix dependencies for non typescript environments

# 1.0.0-preview.0
## New Features (Breaking Changes)

As announced earlier @https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL.js-1.0.0-preview-changes we are excited to announce the preview release.

### Release notes:

#### Configuration
* Initialization of the MSAL JS library – We introduced a 'Configuration' object that can be sent through the constructor of UserAgentApplication() class.

##### Configuration datatype :

```javascript
    // make CacheStorage a fixed type to limit it to specific inputs
    type storage = "localStorage" | "sessionStorage";

    // Protocol Support
    export type AuthOptions = {
        clientId: string;
        authority?: string;
        validateAuthority?: boolean;
        redirectUri?: string | (() => string);
        postLogoutRedirectUri?: string | (() => string);
        state?: string;
        navigateToLoginRequestUrl?: boolean;
    };

    // Cache Support
    export type CacheOptions = {
        cacheLocation?: CacheLocation;
        storeAuthStateInCookie?: boolean;
    };

    // Library support
    export type SystemOptions = {
        logger?: Logger;
        loadFrameTimeout?: number;
        tokenRenewalOffsetSeconds?: number;
    };

    // Developer App Environment Support
    export type FrameworkOptions = {
        isAngular?: boolean;
        unprotectedResources?: Array<string>;
        protectedResourceMap?: Map<string, Array<string>>;
    };

    // Configuration Object
    export type Configuration = {
        auth: AuthOptions,
        cache?: CacheOptions,
        system?: SystemOptions,
        framework?: FrameworkOptions
    };
```

##### Example Config object:

```javascript
    var config = {
        auth: {
            clientId: applicationConfig.clientID,
            authority: applicationConfig.authority,
            validateAuthority: true
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: true
        },
        system: {
            logger: devLogger
        }
    };
 ```

##### Before (<= 0.2.4)

```javascript
    // initialize the MSAL JS configuration options
    var myMSALObj = new Msal.UserAgentApplication(
        applicationConfig.clientID,
        applicationConfig.authority,
        acquireTokenRedirectCallBack,
        {storeAuthStateInCookie: true, cacheLocation: "localStorage"}
    );
```
##### After (>= 1.0.0-preview.0)

```javascript
    // initialize the configuration object
    var config = {
        auth: {
            clientId: applicationConfig.clientID,
            authority: applicationConfig.authority,
            validateAuthority: true
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: true
        }
    };
     
// initialize the MSAL JS with a configuration object
var myMSALObj = new Msal.UserAgentApplication(config);
 
// register redirect call backs : for Success and Error
myMSALObj.handleRedirectCallbacks(acquireTokenRedirectCallBack, acquireTokenErrorRedirectCallBack);
```

#### Request Object

* 'Request' object is introduced for all login/accessToken calls, this replaces previous overloading of login/acquireToken calls.
* Users can choose to pass optional parameters to finetune their requests for authentication and authorization.
* 'User' object is now replaced with 'Account' => the public API getUser() is now getAccount() with more enhanced data.

###### Request Object datatype

```javascript
    export type QPDict = {[key: string]: string};

    // Request type
    export type AuthenticationParameters = {
        scopes?: Array<string>;
        extraScopesToConsent?: Array<string>;
        prompt?: string;
        extraQueryParameters?: QPDict;
        claimsRequest?: null;
        authority?: string;
        correlationId?: string;
        account?: Account;
        sid?: string;
        loginHint?: string;
    };

    // Account Class
    export class Account {

        accountIdentifier: string;
        homeAccountIdentifier: string;
        userName: string;
        name: string;
        idToken: Object;
        sid: string;
        environment: string;

        ....
    }
```
##### Before (<= 0.2.4)

```javascript
    // login request
    loginPopup(applicationConfig.graphScopes);

```

##### After (>= 1.0.0-preview.0)

```javascript

    let loginRequest = {
        scopes: applicationConfig.graphScopes
    };

    loginPopup(loginRequest).then(function (loginResponse) {
        //Login Success
    }).catch(function (error) {
        console.log(error);
    });
```

#### Response Object
* 'Response' and 'Error' objects are introduced for server responses and app failures
    - For 'Redirect' usecases, explicit success and failure call backs should be passed to 'handleRedirectCallbacks()'.
    - For 'Popup' and 'Silent' usecases,  a promise pattern i.e.,' .then and .catch'  can be used.

###### Response Object datatype

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

###### Error Object datatype
- Note: Error objects are better classified and messaged with this release. Detailed documentation for Error Handling will be added soon.

```javascript
    export class AuthError extends Error {
        errorCode: string;
        errorMessage: string;
        ...
    }
```

##### Before (<= 0.2.4)
```javascript

    // Login using Popup
    function signIn() {
        myMSALObj.loginPopup(applicationConfig.graphScopes).then(function (idToken) { ... }
    }

    // Request for Access Token
    myMSALObj.acquireTokenSilent(applicationConfig.graphScopes).then(function (accessToken) {
        callMSGraph(applicationConfig.graphEndpoint, accessToken, graphAPICallback);
    }, function (error) {
        console.log(error);
        // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure due to consent or interaction required ONLY
        if (error.indexOf("consent_required") !== -1 || error.indexOf("interaction_required") !== -1 || error.indexOf("login_required") !== -1) {
            myMSALObj.acquireTokenPopup(applicationConfig.graphScopes).then(function (accessToken) {
                callMSGraph(applicationConfig.graphEndpoint, accessToken, graphAPICallback);
            }, function (error) {
                console.log(error);
            });
        }
    });
```

##### After (>= 1.0.0-preview.0)

```javascript
    myMSALObj = new UserAgentApplication(config);

    // Login
    loginPopup(loginRequest).then(function(response) {
        var idToken = response.idToken;
        // etc.
    }).catch(function(error) {
        // Catches any rejects thrown by loginPopup. Also catches errors thrown the above 'then' block
        if (error.ClientConfigurationError) {
            // Error with configuration, please check your parameters.
        } else if (error instanceof ClientAuthError) {
            // authentication could not be completed due to protocol error, browser error or already in progress
        } else if (error instanceof ServerError) {
            // server may be temporarily unavailable, or the request that was sent was invalid or not acceptable. Please check error returned and retry.
        } else {
            // Unexpected error, console.log and report on Github or StackOverflow
        }
    });

    // access token
    acquireTokenPopup(tokenRequest).then(function(response) {
        var idToken = response.idToken;
        var accessToken = response.accessToken;
        // etc.
    }).catch(function(error) {
        // Catches any rejects thrown by loginPopup. Also catches errors thrown the above 'then' block
        if (error.ClientConfigurationError) {
            // Error with configuration, please check your parameters.
        } else if (error instanceof ClientAuthError) {
            // authentication could not be completed due to protocol error, browser error or already in progress
        } else if (error instanceof ServerError) {
            // server may be temporarily unavailable, or the request that was sent was invalid or not acceptable. Please check error returned and retry.
        } else {
            // Unexpected error, console.log and report on Github or StackOverflow
        }
    });
```

We will follow up with a detailed blog post and a Quickstart Application soon with these changes.


# 0.2.4
## New Features
* Unified Cache - This is to support migration from ADAL.js to MSAL.js. If your app is currently using ADAL.js and if user already has an existing session there, when your app migrates to MSAL.js,
MSAL.js will do a Silent login.
* Removal of prompt-select account - Removes prompt parameter from interactive login and acquireToken requests. acquireTokenSilent will continue to pass prompt=none.
* End-to-end testing for msal-core
* Support for redirect URI as a function

# 0.2.3
## New Features
* Single Sign on
* IE and edge bug fix if navigateToLoginRequestUrl=false (cookies not deleted)
* IE and edge bug fix for login_popup (state mismatch)
* User state not passed to callback if navigateToLoginrequestUrl = false
* Added sample app for single sign on


# 0.2.2
## New Features
* Added support to handle the issue of the session storage and local storage getting cleared in IE and edge browsers during redirects across different security zones. This can be enabled by setting storeAuthStateInCookie flag in config to true. Default value is false.
https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/347


# 0.2.1
## New Features
* Added State parameter in login request. https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/262

* Removed istanbul code coverage due to webpack bundle size issue.

# 0.2.0
## New Features
Moved npmjs package to @azure/msal

# 0.1.9
## New Features

* Fixed bug to use acquireTokenRedirect to call your own APIS. https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/333
* Fixed bug to delete temporary cache entries in cases of errors. https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/327


# 0.1.7
## New Features

* Fixed bug with resolveAuthority in acquireTokenSilent. https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/322
* Fixed bug with window.opener for cases when app is opened due to a click event. https://github.com/AzureAD/microsoft-authentication-library-for-js/pull/318

# 0.1.6
## New Features

* Fixed bug with concurrent acquireToken requests. https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/274
* Added catchHandler for authority validation
* Fixed bug to handle the case for id_token with special characters.

# 0.1.5
## Breaking Changes

* The constructor function in Msal is no longer asynchronous. To use the instance of userAgentApplication in the callback function passed in the constructor, use "this" in the calback function scope. Please see below:
```
 var userAgentApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, authCallback);
        function authCallback(errorDesc, token, error, tokenType) {
                   console.log(userAgentApplication) //this will print undefined, use this instead
                   var self  = this// self is instance of userAgentApplication
           }
```

## New Features

* By default, msal tries to take you back to the loginStartPage after successful authentication. To disable this setting, you can pass navigateToLoginRequestUrl:false
in the options object in the constructor. In that case, msal will just set the url hash to null and call the provided callback, thereby avoiding an additional reload. Please see snippet below:
```
 var userAgentApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, authCallback, { navigateToLoginRequestUrl:false });
```
* The idToken object is now added as a property on user object in msal which can be used to query claims and the User class itself is exported under the global namespace.
* loadFrameTimout(msec) is now configurable by setting it to a value in the options object passed to the userAgentApplication contructor. The default timeout is 6000 msec. Please see the snippet below to change it:
```
 var userAgentApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, authCallback, { loadFrameTimout:10000 });
```

# 0.1.4-beta

## Bug Fixes

* Test version

# 0.1.3

## Bug Fixes

* Added ability to import msal as es-5 or es-6 module.
* Added webpack to create a umd bundle with a global variable Msal exported to the window  object.
* Fixed bug related to browser refresh.
* Set user object from cache if available before every acquireToken request.
* Enable logging by passing a logger in the constructor function.

# 0.1.2
## Bug Fixes
* Fixed bug with renewal of id_token.
* Added support for multiple asynchronous acquireToken requests.
* Added "user_cancelled" event for popup window.

# 0.1.1
## Bug Fixes
* Fix browser specific issues.

# 0.1.0
Preview Release
