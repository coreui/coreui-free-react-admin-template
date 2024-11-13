# ms-rest-nodeauth [![Build Status](https://dev.azure.com/azure-public/adx/_apis/build/status/public.Azure.ms-rest-nodeauth)](https://dev.azure.com/azure-public/adx/_build/latest?definitionId=9)

The `@azure/ms-rest-nodeauth` package provides different authentication mechanisms meant to be used with a select set of packages from the [Azure SDK for JavaScript and TypeScript](https://github.com/Azure/azure-sdk-for-js).

There is no active development for `@azure/ms-rest-nodeauth` other than critical bug fixes. Please refer to the below table to find suggested alternatives for each Azure service for which you have been using credentials from `@azure/ms-rest-nodeauth`.

| Azure service          | Package                                         | Alternative to @azure/ms-rest-nodeauth                                                                                                                                                                                                                                                                          |
| ---------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Azure Resource Manager | Packages with names starting with `@azure/arm-` | As of December 2021, new major versions of all packages targetting the Azure Resource Manager will drop support for credentials from `@azure/ms-rest-nodeauth`. Refer to the [migration guide to use @azure/identity](https://github.com/Azure/ms-rest-nodeauth/blob/master/migrate-to-identity-v2.md) instead. |
| Application Insights   | @azure/applicationinsights-query                | Not planned as this package will be deprecated in favor of `@azure/monitor-query` in early 2022.                                                                                                                                                                                                                |
| Application Insights   | @azure/loganalytics                             | Not planned as this package will be deprecated in favor of `@azure/monitor-query` in early 2022.                                                                                                                                                                                                                |
| Batch                  | @azure/batch                                    | No alternatives yet                                                                                                                                                                                                                                                                                             |
| Graph                  | @azure/graph                                    | Not planned as this service will be deprecated in June 2022.                                                                                                                                                                                                                                                    |
| Service Fabric         | @azure/servicefabric                            | Not planned as there is no active development for this package.                                                                                                                                                                                                                                                 |
| Storage Data Lake      | @azure/storage-datalake                         | Not planned as there is no active development for this package.                                                                                                                                                                                                                                                 |

All the authentication methods support callbacks as well as promises. If they are called within an async method in your application then you can use the async/await pattern as well.

**Things to consider when using personal accounts:**

When using personal accounts, the `domain` property in the options passed to the authentication methods is mandatory and should be set to the tenant Id. If this property is not set, the credentials created by the authentication methods will not be able to access any of the resources of the personal account. For that same reason, the list of subscriptions expected in the return value of these methods will be empty.

You can get the tenant Id from Azure portal or the Azure CLI. If you need to fetch the tenant Id programmatically, follow the below steps:

- Use any of the authentication methods without setting the domain to get a credential.
  - Call the `buildTenantLists(credential)` method by sending that same credential as the first parameter to get the list of all tenants in your account.

You can now use any of the authentication methods and pass in the tenant Id or use the `setDomain()` method on the existing credential to change the tenant it uses to create the tokens.

### Known issue with proxy support

This package uses `adal-node` which has moved to `axios` from `request` as the package of choice for httpRequests since npm support for `request` is discontinued. However it was noticed later that [`axios` does not support proxies](https://github.com/axios/axios/issues/2072). The `adal-node` package is taking only security changes and will not be fixing this issue. Therefore, we recommend using `https-proxy-agent` as suggested in the issue linked in case you need proxies for your application. For example:

```
// paste this code to support proxy environment
// reference:
// https://github.com/axios/axios/issues/2072#issuecomment-567473812
const HttpsProxyAgent = require('https-proxy-agent');
const axios = require('axios')
axios.defaults.proxy = false
axios.defaults.httpsAgent = new HttpsProxyAgent('http://MY_PROXY:8888')
```

### Example

### username/password based login

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

const username = process.env["AZURE_USERNAME"];
const password = process.env["AZURE_PASSWORD"];

msRestNodeAuth
  .loginWithUsernamePasswordWithAuthResponse(username, password)
  .then((authres) => {
    console.dir(authres, { depth: null });
  })
  .catch((err) => {
    console.log(err);
  });
```

### service-principal and secret based login

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

const clientId = process.env["CLIENT_ID"];
const secret = process.env["APPLICATION_SECRET"];
const tenantId = process.env["DOMAIN"];

msRestNodeAuth
  .loginWithServicePrincipalSecretWithAuthResponse(clientId, secret, tenantId)
  .then((authres) => {
    console.dir(authres, { depth: null });
  })
  .catch((err) => {
    console.log(err);
  });
```

#### service-principal and certificate based login by providing an ABSOLUTE file path to the .pem file

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

const clientId = process.env["CLIENT_ID"];
const tenantId = process.env["DOMAIN"];

msRestNodeAuth
  .loginWithServicePrincipalCertificateWithAuthResponse(clientId, "/Users/user1/foo.pem", tenantId)
  .then((authres) => {
    console.dir(authres, { depth: null });
  })
  .catch((err) => {
    console.log(err);
  });
```

#### service-principal and certificate based login by providing the certificate and private key (contents of the .pem file)

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

const clientId = process.env["CLIENT_ID"];
const tenantId = process.env["DOMAIN"];
const certificate = `
-----BEGIN PRIVATE KEY-----
xxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxx
-----END PRIVATE KEY-----
-----BEGIN CERTIFICATE-----
yyyyyyyyyyyyyyyyy
yyyyyyyyyyyyyyyyy
-----END CERTIFICATE-----
`;

msRestNodeAuth
  .loginWithServicePrincipalCertificateWithAuthResponse(clientId, certificate, tenantId)
  .then((authres) => {
    console.dir(authres, { depth: null });
  })
  .catch((err) => {
    console.log(err);
  });
```

### interactive/device-code flow login

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

msRestNodeAuth
  .interactiveLoginWithAuthResponse()
  .then((authres) => {
    console.dir(authres, { depth: null });
  })
  .catch((err) => {
    console.log(err);
  });
```

### service-principal authentication from auth file on disk

Before using this method please install az cli from https://github.com/Azure/azure-cli/releases.
Then execute `az ad sp create-for-rbac --sdk-auth > ${yourFilename.json}`.

If you want to create the sp for a different cloud/environment then please execute:

1.  az cloud list
2.  az cloud set –n <name of the environment>
3.  az ad sp create-for-rbac --sdk-auth > auth.json // create sp with **secret**.
    OR

    az ad sp create-for-rbac --create-cert --sdk-auth > auth.json // create sp with **certificate**.
    If the service principal is already created then login with service principal info:

4.  az login --service-principal -u `<clientId>` -p `<clientSecret>` -t `<tenantId>`
5.  az account show --sdk-auth > auth.json

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

const options: msRestNodeAuth.LoginWithAuthFileOptions = {
  filePath: "<file path to auth file>"
};
msRestNodeAuth
  .loginWithAuthFileWithAuthResponse(options)
  .then((authRes) => {
    console.log(authRes);
    console.log(process.env["AZURE_SUBSCRIPTION_ID"]);
  })
  .catch((err) => {
    console.log(err);
  });
```

### MSI (Managed Service Identity) based login from a virtual machine created in Azure.

The code below works for both system managed and user-assigned managed identities. You can leave the `options` empty if you want to use system managed identity. If you want to use the user-assigned managed identity, you must at least provide the `clientId` in the options. If your VM has multiple user-assigned managed identities, you must include `objectId` and `identityId` in the options as well.

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

const options: msRestNodeAuth.MSIVmOptions = {
  // The objectId of the managed identity you would like the token for.
  // Required, if your VM has multiple user-assigned managed identities.
  //
  //     objectId: "your-managed-identity-object-id",
  //
  // The clientId of the managed identity you would like the token for.
  // Required, if your VM has any user-assigned managed identity.
  //
  //     clientId: "your-managed-identity-client-id",
  //
  // The `Azure Resource ID` of the managed identity you would like the token for.
  // Required, if your VM has multiple user-assigned managed identities.
  //
  //     identityId: "your-managed-identity-identity-id",
  //
};

msRestNodeAuth
  .loginWithVmMSI(options)
  .then((msiTokenRes) => {
    console.log(msiTokenRes);
  })
  .catch((err) => {
    console.log(err);
  });
```

### MSI (Managed Service Identity) based login from an AppService or Azure Function created in Azure.

The code below works for both system managed and user-assigned managed identities. You can leave the `options` empty if you want to use system managed identity. If you want to use the user-assigned managed identity, you must at least provide the `clientId` in the options.

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

const options: msRestNodeAuth.MSIAppServiceOptions = {
  // The clientId of the managed identity you would like the token for.
  // Required, if your app service has user-assigned managed identities.
  //
  //     clientId: "your-managed-identity-client-id"
  //
};

msRestNodeAuth
  .loginWithAppServiceMSI(options)
  .then((msiTokenRes) => {
    console.log(msiTokenRes);
  })
  .catch((err) => {
    console.log(err);
  });
```

### Getting credentials via Azure CLI.

**Pre-requisite**

- **Install azure-cli**. For more information see [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
- **Login via `az login`**
- Detailed sample over [here](./samples/getCredentialsFromAzureCli.ts).

```typescript
import { AzureCliCredentials } from "@azure/ms-rest-nodeauth";
import { ServiceClient, RequestPrepareOptions } from "@azure/ms-rest-js";

async function main(): Promise<void> {
  try {
    // Please make sure you have logged in via Azure CLI `az login` before executing this script.
    const creds = await AzureCliCredentials.create();
    const client = new ServiceClient(creds);
    console.log(
      ">>> Subscription associated with the access token: '%s'.",
      creds.tokenInfo.subscription
    );

    const request: RequestPrepareOptions = {
      url: getUrl(creds.subscriptionInfo.id),
      method: "GET"
    };
    console.log(">>> Request url: '%s'.", request.url);

    const res = await client.sendRequest(request);
    console.log(
      "List of resource groups from subscriptionId '%s': \n%O",
      creds.subscriptionInfo.id,
      res.parsedBody
    );

    // Let us change the subscriptionId, which should trigger refreshing the access token.
    const subscriptions = await AzureCliCredentials.listAllSubscriptions();
    creds.subscriptionInfo = subscriptions[1];

    console.log(
      ">>> The new subscription Id associated with the credential object is: '%s'.",
      creds.subscriptionInfo.id
    );
    request.url = getUrl(creds.subscriptionInfo.id);
    console.log(">>> Request url: '%s'.", request.url);

    const res2 = await client.sendRequest(request);
    console.log(
      "List of resource groups from subscriptionId '%s': \n%O",
      creds.subscriptionInfo.id,
      res2.parsedBody
    );

    console.log(
      ">>> Subscription associated with the access token: '%s'.",
      creds.tokenInfo.subscription
    );
  } catch (err) {
    console.log(err);
  }
}

function getUrl(subscriptionId: string): string {
  return `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups?api-version=2018-05-01`;
}

main();
```

### Authenticating with an existing token

If you have acquired a valid Azure Active Directory token from another source, you can use it to authenticate with Azure SDK libraries using the following code snippet:

```js
const { HttpHeaders } = require("@azure/ms-rest-js");

function getCredentialForToken(accessToken) {
  return {
    signRequest: (request) => {
      if (!request.headers) request.headers = new HttpHeaders();
      request.headers.set("Authorization", `Bearer ${accessToken}`);
      return Promise.resolve(request);
    }
  };
}

const creds = getCredentialForToken("your existing token");
```

### Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
