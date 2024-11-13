# ms-rest-js

[![Build Status](https://dev.azure.com/azure-public/azsdk/_apis/build/status/public.Azure.ms-rest-js%20-%20CI)](https://dev.azure.com/azure-public/azsdk/_build/latest?definitionId=39)

Runtime for isomorphic javascript libraries (that work in the browser and node.js environment) generated via [Autorest](https://github.com/Azure/Autorest).

## Requirements
- Node.js version > 6.x
- `npm install -g typescript`

## Installation
- After cloning the repo, execute `npm install`

## Execution

### Node.js
- Set the subscriptionId and token as instructed in `samples/node-samples.ts`
- Run `npx ts-node samples/node-sample.js`

### In the browser
- Run `npm run build`
- Set the subscriptionId and token then
- Open index.html file in the browser. It should show the response from GET request on the storage account. From Chrome type Ctrl + Shift + I and you can see the logs in console.

## Architecture Overview

You can find an explanation of how this repository's code works by going to our [architecture overview](https://github.com/Azure/ms-rest-js/blob/master/docs/architectureOverview.md).

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
