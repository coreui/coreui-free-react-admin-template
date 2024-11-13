# ms-rest-azure-env [![Build Status](https://dev.azure.com/azure-public/adx/_apis/build/status/public.Azure.ms-rest-azure-env)](https://dev.azure.com/azure-public/adx/_build/latest?definitionId=7)

An isomorphic javascript library with typescript type definitions that provides a mechanism to access Azure Endpoints in different Azure clouds. It also provides a mechanism to add a custom environment.

### Example

```javascript
import { Environment, EnvironmentParameters } from "@azure/ms-rest-azure-env";

// Accesing predefined environment endpoints.
console.log(Environment.AzureCloud.resourceManagerEndpointUrl);
console.log(Environment.ChinaCloud.resourceManagerEndpointUrl);

//Adding a custom environment with required endpoint values.
let df: AzureEnvironmentParameters = {
  name: "Dogfood",
  portalUrl: "http://go.microsoft.com/fwlink/?LinkId=254433",
  managementEndpointUrl: "https://management.core.windows.net",
  resourceManagerEndpointUrl: "https://management.azure.com/",
  activeDirectoryEndpointUrl: "https://login.microsoftonline.com/",
  activeDirectoryResourceId: "https://management.core.windows.net/"
};
Environment.add(df);
let dfoodEnv = Environment.get("Dogfood");
console.log(dfoodEnv);
console.log(`Accessing the custom environment info: ${(<any>Environment)["Dogfood"].managementEndpointUrl}`);
```

### Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
