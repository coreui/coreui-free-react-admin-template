// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { DefaultScopeSuffix } from "./constants";
export function mapScopesToResource(scopes) {
    let scope = "";
    if (Array.isArray(scopes)) {
        if (scopes.length !== 1) {
            throw new Error("To convert to a resource string the specified array must be exactly length 1");
        }
        scope = scopes[0];
    }
    else if (typeof scopes === "string") {
        scope = scopes;
    }
    if (!scope.endsWith(DefaultScopeSuffix)) {
        return scope;
    }
    return scope.substr(0, scope.lastIndexOf(DefaultScopeSuffix));
}
export function msiGenericGetToken(identityClient, requestOptions, expiresInParser, getTokenOptions = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = createPipelineRequest(Object.assign(Object.assign({ abortSignal: getTokenOptions.abortSignal, tracingOptions: {
                spanOptions: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.spanOptions,
                tracingContext: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.tracingContext
            } }, requestOptions), { allowInsecureConnection: true }));
        const tokenResponse = yield identityClient.sendTokenRequest(request, expiresInParser);
        return (tokenResponse && tokenResponse.accessToken) || null;
    });
}
//# sourceMappingURL=utils.js.map