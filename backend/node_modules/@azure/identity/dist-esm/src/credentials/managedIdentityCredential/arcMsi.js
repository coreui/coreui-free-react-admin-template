// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import qs from "qs";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { credentialLogger } from "../../util/logging";
import { msiGenericGetToken } from "./utils";
import { azureArcAPIVersion } from "./constants";
import { AuthenticationError } from "../../client/errors";
import { readFile } from "fs";
const logger = credentialLogger("ManagedIdentityCredential - ArcMSI");
// Azure Arc MSI doesn't have a special expiresIn parser.
const expiresInParser = undefined;
function prepareRequestOptions(resource) {
    const queryParameters = {
        resource,
        "api-version": azureArcAPIVersion
    };
    const query = qs.stringify(queryParameters);
    return {
        // Should be similar to: http://localhost:40342/metadata/identity/oauth2/token
        url: `${process.env.IDENTITY_ENDPOINT}?${query}`,
        method: "GET",
        headers: createHttpHeaders({
            Accept: "application/json",
            Metadata: "true"
        })
    };
}
// Since "fs"'s readFileSync locks the thread, and to avoid extra dependencies.
function readFileAsync(path, options) {
    return new Promise((resolve, reject) => readFile(path, options, (err, data) => {
        if (err) {
            reject(err);
        }
        resolve(data);
    }));
}
function filePathRequest(identityClient, requestPrepareOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield identityClient.sendRequest(createPipelineRequest(requestPrepareOptions));
        if (response.status !== 401) {
            let message = "";
            if (response.bodyAsText) {
                message = ` Response: ${response.bodyAsText}`;
            }
            throw new AuthenticationError(response.status, `To authenticate with Azure Arc MSI, status code 401 is expected on the first request.${message}`);
        }
        const authHeader = response.headers.get("www-authenticate") || "";
        return authHeader.split("=").slice(1)[0];
    });
}
export const arcMsi = {
    isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = Boolean(process.env.IMDS_ENDPOINT && process.env.IDENTITY_ENDPOINT);
            if (!result) {
                logger.info("The Azure Arc MSI is unavailable.");
            }
            return result;
        });
    },
    getToken(identityClient, resource, clientId, getTokenOptions = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`Using the Azure Arc MSI to authenticate.`);
            if (clientId) {
                throw new Error("User assigned identity is not supported by the Azure Arc Managed Identity Endpoint. To authenticate with the system assigned identity omit the client id when constructing the ManagedIdentityCredential, or if authenticating with the DefaultAzureCredential ensure the AZURE_CLIENT_ID environment variable is not set.");
            }
            const requestOptions = Object.assign({ allowInsecureConnection: true, disableJsonStringifyOnBody: true, deserializationMapper: undefined, abortSignal: getTokenOptions.abortSignal, spanOptions: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.spanOptions }, prepareRequestOptions(resource));
            const filePath = yield filePathRequest(identityClient, requestOptions);
            if (!filePath) {
                throw new Error("Azure Arc MSI failed to find the token file.");
            }
            const key = yield readFileAsync(filePath, { encoding: "utf-8" });
            (_a = requestOptions.headers) === null || _a === void 0 ? void 0 : _a.set("Authorization", `Basic ${key}`);
            return msiGenericGetToken(identityClient, requestOptions, expiresInParser, getTokenOptions);
        });
    }
};
//# sourceMappingURL=arcMsi.js.map