# Microsoft Authentication Library for JavaScript (MSAL.js) Common Protocols Package

[![npm version](https://img.shields.io/npm/v/@azure/msal-common.svg?style=flat)](https://www.npmjs.com/package/@azure/msal-common/)
[![npm version](https://img.shields.io/npm/dm/@azure/msal-common.svg)](https://nodei.co/npm/@azure/msal-common/)
[![codecov](https://codecov.io/gh/AzureAD/microsoft-authentication-library-for-js/branch/dev/graph/badge.svg?flag=msal-common)](https://codecov.io/gh/AzureAD/microsoft-authentication-library-for-js)

| <a href="https://docs.microsoft.com/azure/active-directory/develop/guidedsetups/active-directory-javascriptspa" target="_blank">Getting Started</a> | <a href="https://aka.ms/aaddevv2" target="_blank">AAD Docs</a> | <a href="https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_common.html" target="_blank">Library Reference</a> |
| --- | --- | --- |

1. [About](#about)
2. [FAQ](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/FAQ.md)
3. [Releases](#releases)
4. [Prerequisites and Usage](#prerequisites-and-usage)
5. [Installation](#installation)
6. [Security Reporting](#security-reporting)
7. [License](#license)
8. [Code of Conduct](#we-value-and-adhere-to-the-microsoft-open-source-code-of-conduct)

## About

The MSAL library for JavaScript enables client-side JavaScript applications to authenticate users using [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview) work and school accounts (AAD), Microsoft personal accounts (MSA) and social identity providers like Facebook, Google, LinkedIn, Microsoft accounts, etc. through [Azure AD B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-overview#identity-providers) service. It also enables your app to get tokens to access [Microsoft Cloud](https://www.microsoft.com/enterprise) services such as [Microsoft Graph](https://graph.microsoft.io). 

The `@azure/msal-common` package described by the code in this folder serves as a common package dependency for the `@azure/msal-browser` package (and in the future, the msal-node package). Be aware that this is an internal library, and is subject to frequent change. **It is not meant for production consumption by itself.**

## FAQ

See [here](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/FAQ.md).

## Releases

*Expect us to detail our major and minor releases moving forward, while leaving out our patch releases.  Patch release notes can be found in our change log.*

| Date | Release | Announcement | Main features |
| ------| ------- | ---------| --------- |
| August 4, 2020 | @azure/msal-common v1.1.0 | [Release Notes](https://https://github.com/AzureAD/microsoft-authentication-library-for-js/releases/tag/msal-common-v1.1.0)
| July 20, 2020 | @azure/msal-common v1.0.0 | [Release Notes](https://github.com/AzureAD/microsoft-authentication-library-for-js/releases/tag/msal-common-v1.0.0) | Full release version of the `@azure/msal-common` |
| May 11, 2020 | @azure/msal-common v1.0.0-beta | Beta version of the `@azure/msal-common` package |
| January 17, 2020 | @azure/msal-common v1.0.0-alpha | No release notes yet | Alpha version of the `@azure/msal-common` package with authorization code flow for SPAs working in dev. |

## Prerequisites and Usage
This library is not meant for production use. Please use one of these packages specific to the platform you are developing for:

- [MSAL for Single Page Applications (SPAs)](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser)
- [MSAL for Node.js](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node)

## Installation
### Via NPM:

    npm install @azure/msal-common

## Security Reporting

If you find a security issue with our libraries or services please report it to [secure@microsoft.com](mailto:secure@microsoft.com) with as much detail as possible. Your submission may be eligible for a bounty through the [Microsoft Bounty](http://aka.ms/bugbounty) program. Please do not post security issues to GitHub Issues or any other public site. We will contact you shortly upon receiving the information. We encourage you to get notifications of when security incidents occur by visiting [this page](https://technet.microsoft.com/en-us/security/dd252948) and subscribing to Security Advisory Alerts.

## License

Copyright (c) Microsoft Corporation.  All rights reserved. Licensed under the MIT License (the "License");

## We Value and Adhere to the Microsoft Open Source Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
