---

This library, ADAL for Node.js, will no longer receive new feature improvements. Instead, use the new library
[MSAL for Node.js](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node).

* If you are starting a new project, you can get started with the
  [MSAL for Node.js docs](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node)
  for details about the scenarios, usage, and relevant concepts.
* If your application is using the previous ADAL for Node.js library, you can follow this
  [migration guide for Node.js apps](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/migration.md).
* Existing applications relying on ADAL for Node.js will continue to work.

---

| [Feedback](https://forms.office.com/r/er9wCuPXsv) |
|---|

## Update to MSAL for Node.js now!

[MSAL for Node.js](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node) is the new authentication library to be used with the Microsoft identity platform

Building on top of ADAL, MSAL works with the new and Open ID Connect certified Azure AD V2 endpoint and the new social identity solution from Microsoft, Azure AD B2C.

ADAL for Node.js is in maintenance mode and no new features will be added to the ADAL library anymore. All our ongoing efforts will be focused on improving the new [MSAL for Node.js](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node). MSAL’s documentation also contains a [migration guide](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/migration.md) which simplifies upgrading from ADAL for Node.js.

# Windows Azure Active Directory Authentication Library (ADAL) for Node.js
The ADAL for node.js library makes it easy for node.js applications to authenticate to AAD in order to access AAD protected web resources.  It supports 3 authentication modes shown in the quickstart code below.

## Versions
You can find the changes for each version in the [change log](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/maintenance/adal-node/changelog.md).

## Samples and Documentation

[We provide a full suite of sample applications and documentation on GitHub](https://github.com/azure-samples?q=active-directory) to help you get started with learning the Azure Identity system. This includes tutorials for native clients such as Windows, Windows Phone, iOS, OSX, Android, and Linux. We also provide full walkthroughs for authentication flows such as OAuth2, OpenID Connect, Graph API, and other awesome features.

## Community Help and Support

We leverage [Stack Overflow](http://stackoverflow.com/) to work with the community on supporting Azure Active Directory and its SDKs, including this one! We highly recommend you ask your questions on Stack Overflow (we're all on there!) Also browse existing issues to see if someone has had your question before.

We recommend you use the "adal" tag so we can see it! Here is the latest Q&A on Stack Overflow for ADAL: [http://stackoverflow.com/questions/tagged/adal](http://stackoverflow.com/questions/tagged/adal)

## Submit Feedback
We'd like your thoughts on this library. Please complete [this short survey.](https://forms.office.com/r/er9wCuPXsv)

## Security Reporting

If you find a security issue with our libraries or services please report it to [secure@microsoft.com](mailto:secure@microsoft.com) with as much detail as possible. Your submission may be eligible for a bounty through the [Microsoft Bounty](http://aka.ms/bugbounty) program. Please do not post security issues to GitHub Issues or any other public site. We will contact you shortly upon receiving the information. We encourage you to get notifications of when security incidents occur by visiting [this page](https://technet.microsoft.com/en-us/security/dd252948) and subscribing to Security Advisory Alerts.

## Contributing

All code is licensed under the Apache 2.0 license and we triage actively on GitHub. We enthusiastically welcome contributions and feedback. You can clone the repo and start contributing now.

## Quick Start
### Installation

``` $ npm install adal-node ```

### Configure the logging

#### Personal Identifiable Information (PII) & Organizational Identifiable Information (OII)

By default, ADAL logging does not capture or log any PII or OII. The library allows app developers to turn this on by configuring the `loggingWithPII` flag in the logging options. By turning on PII or OII, the app takes responsibility for safely handling highly-sensitive data and complying with any regulatory requirements.

```javascript
var logging = require('adal-node').Logging;

//PII or OII logging disabled. Default Logger does not capture any PII or OII.
logging.setLoggingOptions({
  log: function(level, message, error) {
    // provide your own implementation of the log function
  },
  level: logging.LOGGING_LEVEL.VERBOSE, // provide the logging level
  loggingWithPII: false  // Determine if you want to log personal identification information. The default value is false.
});

//PII or OII logging enabled.
logging.setLoggingOptions({
  log: function(level, message, error) {
    // provide your own implementation of the log function
  },
  level: logging.LOGGING_LEVEL.VERBOSE,
  loggingWithPII: true
});
```

### Authorization Code

See the [website sample](https://github.com/MSOpenTech/azure-activedirectory-library-for-nodejs/blob/master/sample/website-sample.js) for a complete bare bones express based web site that makes use of the code below.

```javascript
var AuthenticationContext = require('adal-node').AuthenticationContext;

var clientId = 'yourClientIdHere';
var clientSecret = 'yourAADIssuedClientSecretHere'
var authorityHostUrl = 'https://login.windows.net';
var tenant = 'myTenant';
var authorityUrl = authorityHostUrl + '/' + tenant;
var redirectUri = 'http://localhost:3000/getAToken';
var resource = '00000002-0000-0000-c000-000000000000';
var templateAuthzUrl = 'https://login.windows.net/' +
                        tenant +
                        '/oauth2/authorize?response_type=code&client_id=' +
                        clientId +
                        '&redirect_uri=' +
                        redirectUri +
                        '&state=<state>&resource=' +
                        resource;

function createAuthorizationUrl(state) {
  return templateAuthzUrl.replace('<state>', state);
}

// Clients get redirected here in order to create an OAuth authorize url and redirect them to AAD.
// There they will authenticate and give their consent to allow this app access to
// some resource they own.
app.get('/auth', function(req, res) {
  crypto.randomBytes(48, function(ex, buf) {
    var token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');

    res.cookie('authstate', token);
    var authorizationUrl = createAuthorizationUrl(token);

    res.redirect(authorizationUrl);
  });
});

// After consent is granted AAD redirects here.  The ADAL library is invoked via the
// AuthenticationContext and retrieves an access token that can be used to access the
// user owned resource.
app.get('/getAToken', function(req, res) {
  if (req.cookies.authstate !== req.query.state) {
    res.send('error: state does not match');
  }

  var authenticationContext = new AuthenticationContext(authorityUrl);

  authenticationContext.acquireTokenWithAuthorizationCode(
    req.query.code,
    redirectUri,
    resource,
    clientId,
    clientSecret,
    function(err, response) {
      var errorMessage = '';
      if (err) {
        errorMessage = 'error: ' + err.message + '\n';
      }
      errorMessage += 'response: ' + JSON.stringify(response);
      res.send(errorMessage);
    }
  );
});
```

### Server to Server via Client Credentials

See the [client credentials sample](https://github.com/MSOpenTech/azure-activedirectory-library-for-nodejs/blob/master/sample/client-credentials-sample.js).

```javascript
var AuthenticationContext = require('adal-node').AuthenticationContext;

var authorityHostUrl = 'https://login.windows.net';
var tenant = 'myTenant.onmicrosoft.com'; // AAD Tenant name.
var authorityUrl = authorityHostUrl + '/' + tenant;
var applicationId = 'yourApplicationIdHere'; // Application Id of app registered under AAD.
var clientSecret = 'yourAADIssuedClientSecretHere'; // Secret generated for app. Read this environment variable.
var resource = '00000002-0000-0000-c000-000000000000'; // URI that identifies the resource for which the token is valid.

var context = new AuthenticationContext(authorityUrl);

context.acquireTokenWithClientCredentials(resource, applicationId, clientSecret, function(err, tokenResponse) {
  if (err) {
    console.log('well that didn\'t work: ' + err.stack);
  } else {
    console.log(tokenResponse);
  }
});
```

### Note on Proxy support for adal-node
We have moved to `axios` as the package of choice for HTTP requests for adal-node from `request` since the npm support for `request` is discontinued. However we noticed later that `axios` does not support proxies -filed [here](https://github.com/axios/axios/issues/2072#issuecomment-567473812). Since we are making only security changes to `adal-node`, we are refraining from making any changes. However, we do recommend using `https-proxy-agent` as suggested in the issue linked in case you need proxies for your application.

## License
Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved. Licensed under the Apache License, Version 2.0 (the "License")

## We Value and Adhere to the Microsoft Open Source Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
