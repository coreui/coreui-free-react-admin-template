// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import qs from "qs";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { credentialLogger } from "../../util/logging";
import { msiGenericGetToken } from "./utils";
import { azureFabricVersion } from "./constants";
const logger = credentialLogger("ManagedIdentityCredential - Fabric MSI");
function expiresInParser(requestBody) {
    // Parses a string representation of the seconds since epoch into a number value
    return Number(requestBody.expires_on);
}
function prepareRequestOptions(resource, clientId) {
    const queryParameters = {
        resource,
        "api-version": azureFabricVersion
    };
    if (clientId) {
        queryParameters.client_id = clientId;
    }
    const query = qs.stringify(queryParameters);
    return {
        url: `${process.env.IDENTITY_ENDPOINT}?${query}`,
        method: "GET",
        headers: createHttpHeaders({
            Accept: "application/json",
            Secret: process.env.IDENTITY_HEADER
        })
    };
}
// This credential can be easily tested by deploying a container to Azure Service Fabric with the Dockerfile:
//
//   FROM node:12
//   RUN wget https://host.any/path/bash.sh
//   CMD ["bash", "bash.sh"]
//
// Where the bash script contains:
//
//   curl --insecure $IDENTITY_ENDPOINT'?api-version=2019-07-01-preview&resource=https://vault.azure.net/' -H "Secret: $IDENTITY_HEADER"
//
export const fabricMsi = {
    isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const env = process.env;
            return Boolean(env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER && env.IDENTITY_SERVER_THUMBPRINT);
        });
    },
    getToken(identityClient, resource, clientId, getTokenOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info([
                "Using the endpoint and the secret coming from the environment variables:",
                `IDENTITY_ENDPOINT=${process.env.IDENTITY_ENDPOINT},`,
                "IDENTITY_HEADER=[REDACTED] and",
                "IDENTITY_SERVER_THUMBPRINT=[REDACTED]."
            ].join(" "));
            return msiGenericGetToken(identityClient, prepareRequestOptions(resource, clientId), expiresInParser, getTokenOptions);
        });
    }
};
//# sourceMappingURL=fabricMsi.js.map