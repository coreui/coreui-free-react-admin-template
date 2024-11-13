Version 0.1.28
--------------
Release Date: 26 Feburary 2018
* Added GDPR support per Microsoft policy.

Version 0.1.27
--------------
Release Date: 08 January 2018
* Fix Issue #185 Dependency "xpath.js" version does not have an OSI-approved license

Version 0.1.26
--------------
Release Date: 05 December 2017
* Added .npmignore to avoid publishing unnecessary files

Version 0.1.25
--------------
Release Date: 06 November 2017
* Fixed typing: acquireUserCode returns UserCodeInfo in the callback

Version 0.1.24
--------------
Release Date: 06 November 2017
* Added type definitions to the project. This should help users developing their apps in TypeScript #142, [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12586).
* Replaced `"node-uuid"` with `"uuid"` #170.

Version 0.1.23
--------------
Release Date: 26 Oct 2017
* Fix Issue #95 - Change npm licenses to license and use spdx syntax 
* Fix Issue #122 - Broken link on README file 
* Fix Issue #155 - remove need for dynamic access to package.json to obtain lib version (util.js)
* Fix Issue #172 - Add `login.microsoftonline.us` endpoint
* Added Windows Graph Sample 

Version 0.1.22
--------------
Release Date: 1 Aug 2016
* Fix Issue #132 - Trim developer provided authority to construct endpoints

Version 0.1.21
--------------
Release Date: 23 Jun 2016
* Policheck and credscan fixes

Version 0.1.20
--------------
Release Date: 17 Jun 2016
* Add support for resource owner grant flow for ADFS

Version 0.1.19
--------------
Release Date: 26 Apr 2016
* Fixed CredScan issue for the checked in pem file
* Policheck fixes
* Updated node-uuid
* Fixed Readme.md
* Inline the adal version during compile time
* Fix issue #71 - client-credential cert-bad-cert failing
* Fix issue #78 - Express dependency in package.json doesn't match syntax used in website-sample.js
* Fix issue #80 - Unreachable ADFS server results in misleading error message

Version 0.1.18
--------------
Release Date: 5 Feb 2016
* Add oid in IDTokenMap to expose for returned user info. 

Version 0.1.17
--------------
Release Date: 8 Oct 2015
* Add support for cross tenant refresh token

Version 0.1.16
--------------
Release Date: 3 Sep 2015
* Add support for device profile 

Version 0.1.15
--------------
Release Date: 4 Aug 2015
* Fix issue #68 - add support for wstrust 2005 endpoint. 
* Fix issue #62 - escape xml chars in password before creating a xml request for wstrust. 

Version 0.1.14
--------------
Release Date: 5 May 2015
* Add timestamp to the log entries.

Version 0.1.13
--------------
Release Date: 1 May 2015
* Scrub security sensitive data in WS-Trust exchange from log messages.
* Update the version of the jws dependency to the latest release.

Version 0.1.12
--------------
Release Date: 19 February 2015
* Add login.microsoftonline.com to the static list of known authorities.
* Bug fixes. (#36)

Version 0.1.11
--------------
Release Date: 16 December 2014
* Added support for certificate authentication for confidential clients.

Version 0.1.10
--------------
Release Date: 24 November 2014
* 0.1.9 published version was corrupt.

Version 0.1.9
--------------
Release Date: 24 November 2014
* Fixed issue #22 - ADAL needs a method that allows confidential clients
to acquire a new token via a refresh token.The `acquireTokenWithRefreshToken` function was updated to take an additional `clientSecret` argument. Passing this new argument is optional and the change should not breakapps using this function before the additional argument was added.

Version 0.1.8
--------------
Release Date: 29 October 2014
* Update version of xpath.js dependency to 1.0.5
* Fix a bug in the regular expression used to parse a 401 challenge.

Version 0.1.7
--------------
Release Date: 2 September 2014
* Add caching support to AuthenticationContext.acquireTokenWithClientCredentials
