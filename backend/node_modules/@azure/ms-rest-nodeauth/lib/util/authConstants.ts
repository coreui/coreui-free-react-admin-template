// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export const AuthConstants = {
  AAD_COMMON_TENANT: "common",
  DEFAULT_ADAL_CLIENT_ID: "04b07795-8ddb-461a-bbee-02f9e1bf7b46",
  SDK_INTERNAL_ERROR: "SDK_INTERNAL_ERROR",
  DEFAULT_LANGUAGE: "en-us",
  AZURE_AUTH_LOCATION: "AZURE_AUTH_LOCATION",
  RESOURCE_MANAGER_ENDPOINT: "https://management.azure.com/"
};

export type TokenAudience = "graph" | "batch" | string | undefined;
