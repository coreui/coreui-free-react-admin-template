// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import qs from "qs";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { credentialLogger } from "../../util/logging";
import { msiGenericGetToken } from "./utils";
const logger = credentialLogger("ManagedIdentityCredential - AppServiceMSI 2017");
function expiresInParser(requestBody) {
    // Parse a date format like "06/20/2019 02:57:58 +00:00" and
    // convert it into a JavaScript-formatted date
    return Date.parse(requestBody.expires_on);
}
function prepareRequestOptions(resource, clientId) {
    const queryParameters = {
        resource,
        "api-version": "2017-09-01"
    };
    if (clientId) {
        queryParameters.clientid = clientId;
    }
    const query = qs.stringify(queryParameters);
    return {
        url: `${process.env.MSI_ENDPOINT}?${query}`,
        method: "GET",
        headers: createHttpHeaders({
            Accept: "application/json",
            secret: process.env.MSI_SECRET
        })
    };
}
export const appServiceMsi2017 = {
    isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const env = process.env;
            const result = Boolean(env.MSI_ENDPOINT && env.MSI_SECRET);
            if (!result) {
                logger.info("The Azure App Service MSI 2017 is unavailable.");
            }
            return result;
        });
    },
    getToken(identityClient, resource, clientId, getTokenOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`Using the endpoint and the secret coming form the environment variables: MSI_ENDPOINT=${process.env.MSI_ENDPOINT} and MSI_SECRET=[REDACTED].`);
            return msiGenericGetToken(identityClient, prepareRequestOptions(resource, clientId), expiresInParser, getTokenOptions);
        });
    }
};
//# sourceMappingURL=appServiceMsi2017.js.map