// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import qs from "qs";
import { createHttpHeaders, createPipelineRequest, RestError } from "@azure/core-rest-pipeline";
import { SpanStatusCode } from "@azure/core-tracing";
import { credentialLogger } from "../../util/logging";
import { createSpan } from "../../util/tracing";
import { imdsApiVersion, imdsHost, imdsEndpointPath } from "./constants";
import { msiGenericGetToken } from "./utils";
const logger = credentialLogger("ManagedIdentityCredential - IMDS");
function expiresInParser(requestBody) {
    if (requestBody.expires_on) {
        // Use the expires_on timestamp if it's available
        const expires = +requestBody.expires_on * 1000;
        logger.info(`IMDS using expires_on: ${expires} (original value: ${requestBody.expires_on})`);
        return expires;
    }
    else {
        // If these aren't possible, use expires_in and calculate a timestamp
        const expires = Date.now() + requestBody.expires_in * 1000;
        logger.info(`IMDS using expires_in: ${expires} (original value: ${requestBody.expires_in})`);
        return expires;
    }
}
function prepareRequestOptions(resource, clientId, options) {
    var _a;
    const queryParameters = {
        resource,
        "api-version": imdsApiVersion
    };
    if (clientId) {
        queryParameters.client_id = clientId;
    }
    const url = new URL(imdsEndpointPath, (_a = process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) !== null && _a !== void 0 ? _a : imdsHost);
    const { skipQuery, skipMetadataHeader } = options || {};
    // Pod Identity will try to process this request even if the Metadata header is missing.
    // We can exclude the request query to ensure no IMDS endpoint tries to process the ping request.
    let query = "";
    if (!skipQuery) {
        query = `?${qs.stringify(queryParameters)}`;
    }
    const headersSource = {
        Accept: "application/json",
        Metadata: "true"
    };
    // Remove the Metadata header to invoke a request error from some IMDS endpoints.
    if (skipMetadataHeader) {
        delete headersSource.Metadata;
    }
    return {
        url: `${url}${query}`,
        method: "GET",
        headers: createHttpHeaders(headersSource)
    };
}
export const imdsMsi = {
    isAvailable(identityClient, resource, clientId, getTokenOptions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // if the PodIdenityEndpoint environment variable was set no need to probe the endpoint, it can be assumed to exist
            if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) {
                return true;
            }
            const { span, updatedOptions: options } = createSpan("ManagedIdentityCredential-pingImdsEndpoint", getTokenOptions);
            try {
                // Create a request with a timeout since we expect that
                // not having a "Metadata" header should cause an error to be
                // returned quickly from the endpoint, proving its availability.
                // Later we found that skipping the query parameters is also necessary in some cases.
                const requestOptions = prepareRequestOptions(resource, clientId, {
                    skipMetadataHeader: true,
                    skipQuery: true
                });
                requestOptions.tracingOptions = {
                    spanOptions: options.tracingOptions && options.tracingOptions.spanOptions,
                    tracingContext: options.tracingOptions && options.tracingOptions.tracingContext
                };
                const request = createPipelineRequest(requestOptions);
                request.timeout = (_b = (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.timeout) !== null && _b !== void 0 ? _b : 300;
                // This MSI uses the imdsEndpoint to get the token, which only uses http://
                request.allowInsecureConnection = true;
                try {
                    logger.info(`Pinging IMDS endpoint`);
                    yield identityClient.sendRequest(request);
                }
                catch (err) {
                    if ((err instanceof RestError && err.code === RestError.REQUEST_SEND_ERROR) ||
                        err.name === "AbortError" ||
                        err.code === "ECONNREFUSED" || // connection refused
                        err.code === "EHOSTDOWN" // host is down
                    ) {
                        // If the request failed, or NodeJS was unable to establish a connection,
                        // or the host was down, we'll assume the IMDS endpoint isn't available.
                        logger.info(`IMDS endpoint unavailable`);
                        span.setStatus({
                            code: SpanStatusCode.ERROR,
                            message: err.message
                        });
                        // IMDS MSI unavailable.
                        return false;
                    }
                }
                // If we received any response, the endpoint is available
                logger.info(`IMDS endpoint is available`);
                // IMDS MSI available!
                return true;
            }
            catch (err) {
                // createWebResource failed.
                // This error should bubble up to the user.
                logger.info(`Error when creating the WebResource for the IMDS endpoint: ${err.message}`);
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: err.message
                });
                throw err;
            }
            finally {
                span.end();
            }
        });
    },
    getToken(identityClient, resource, clientId, getTokenOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`Using the IMDS endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`);
            return msiGenericGetToken(identityClient, prepareRequestOptions(resource, clientId), expiresInParser, getTokenOptions);
        });
    }
};
//# sourceMappingURL=imdsMsi.js.map