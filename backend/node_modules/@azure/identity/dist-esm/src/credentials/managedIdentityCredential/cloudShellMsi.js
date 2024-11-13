// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import qs from "qs";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { credentialLogger } from "../../util/logging";
import { msiGenericGetToken } from "./utils";
const logger = credentialLogger("ManagedIdentityCredential - CloudShellMSI");
// Cloud Shell MSI doesn't have a special expiresIn parser.
const expiresInParser = undefined;
function prepareRequestOptions(resource, clientId) {
    const body = {
        resource
    };
    if (clientId) {
        body.client_id = clientId;
    }
    return {
        url: process.env.MSI_ENDPOINT,
        method: "POST",
        body: qs.stringify(body),
        headers: createHttpHeaders({
            Accept: "application/json",
            Metadata: "true",
            "Content-Type": "application/x-www-form-urlencoded"
        })
    };
}
export const cloudShellMsi = {
    isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return Boolean(process.env.MSI_ENDPOINT);
        });
    },
    getToken(identityClient, resource, clientId, getTokenOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`Using the endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the Cloud Shell to proceed with the authentication.`);
            return msiGenericGetToken(identityClient, prepareRequestOptions(resource, clientId), expiresInParser, getTokenOptions);
        });
    }
};
//# sourceMappingURL=cloudShellMsi.js.map