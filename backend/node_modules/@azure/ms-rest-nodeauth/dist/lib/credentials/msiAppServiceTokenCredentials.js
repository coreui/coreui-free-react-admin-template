"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const msiTokenCredentials_1 = require("./msiTokenCredentials");
const ms_rest_js_1 = require("@azure/ms-rest-js");
/**
 * Provides information about managed service identity token credentials in an App Service environment.
 */
class MSIAppServiceTokenCredentials extends msiTokenCredentials_1.MSITokenCredentials {
    /**
     * Creates an instance of MSIAppServiceTokenCredentials.
     * @param options.msiEndpoint - The local URL from which your app can request tokens.
     * Unless this property is specified, any of the two environment variables `IDENTITY_ENDPOINT` or `MSI_ENDPOINT` will be used as the default value.
     * @param options.msiSecret - The secret used in communication between your code and the local MSI agent.
     * Unless this property is specified, any of the two environment variables `IDENTITY_SECRET` or `MSI_SECRET` will be used as the default value.
     * @param options.resource - The resource uri or token audience for which the token is needed.
     * For e.g. it can be:
     * - resource management endpoint "https://management.azure.com/" (default)
     * - management endpoint "https://management.core.windows.net/"
     * @param options.msiApiVersion - The api-version of the local MSI agent. Default value is "2017-09-01".
     * @param options.clientId - The clientId of the managed identity you would like the token for. Required, if
     * your app service has user-assigned managed identities.
     */
    constructor(options) {
        if (!options)
            options = {};
        super(options);
        options.msiEndpoint =
            options.msiEndpoint || process.env["IDENTITY_ENDPOINT"] || process.env["MSI_ENDPOINT"];
        options.msiSecret =
            options.msiSecret || process.env["IDENTITY_SECRET"] || process.env["MSI_SECRET"];
        if (!options.msiEndpoint ||
            (options.msiEndpoint && typeof options.msiEndpoint.valueOf() !== "string")) {
            throw new Error('Either provide "msiEndpoint" as a property of the "options" object ' +
                'or set the environment variable "IDENTITY_ENDPOINT" or "MSI_ENDPOINT" and it must be of type "string".');
        }
        if (!options.msiSecret ||
            (options.msiSecret && typeof options.msiSecret.valueOf() !== "string")) {
            throw new Error('Either provide "msiSecret" as a property of the "options" object ' +
                'or set the environment variable "IDENTITY_SECRET" or "MSI_SECRET" and it must be of type "string".');
        }
        if (!options.msiApiVersion) {
            options.msiApiVersion = "2017-09-01";
        }
        else if (typeof options.msiApiVersion.valueOf() !== "string") {
            throw new Error("msiApiVersion must be a uri.");
        }
        this.msiEndpoint = options.msiEndpoint;
        this.msiSecret = options.msiSecret;
        this.msiApiVersion = options.msiApiVersion;
        this.clientId = options.clientId;
    }
    /**
     * Prepares and sends a GET request to a service endpoint indicated by the app service, which responds with the access token.
     * @returns Promise with the tokenResponse (tokenType and accessToken are the two important properties).
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const reqOptions = this.prepareRequestOptions();
            const opRes = yield this._httpClient.sendRequest(reqOptions);
            if (opRes.bodyAsText === undefined || opRes.bodyAsText.indexOf("ExceptionMessage") !== -1) {
                throw new Error(`MSI: Failed to retrieve a token from "${reqOptions.url}" with an error: ${opRes.bodyAsText}`);
            }
            const result = this.parseTokenResponse(opRes.bodyAsText);
            if (!result.tokenType) {
                throw new Error(`Invalid token response, did not find tokenType. Response body is: ${opRes.bodyAsText}`);
            }
            else if (!result.accessToken) {
                throw new Error(`Invalid token response, did not find accessToken. Response body is: ${opRes.bodyAsText}`);
            }
            return result;
        });
    }
    prepareRequestOptions() {
        const endpoint = this.msiEndpoint.endsWith("/") ? this.msiEndpoint : `${this.msiEndpoint}/`;
        const reqOptions = {
            url: endpoint,
            headers: {
                secret: this.msiSecret
            },
            queryParameters: {
                resource: this.resource,
                "api-version": this.msiApiVersion,
                clientid: this.clientId
            },
            method: "GET"
        };
        const webResource = new ms_rest_js_1.WebResource();
        return webResource.prepare(reqOptions);
    }
}
exports.MSIAppServiceTokenCredentials = MSIAppServiceTokenCredentials;
//# sourceMappingURL=msiAppServiceTokenCredentials.js.map