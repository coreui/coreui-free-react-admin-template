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
 * Provides information about managed service identity token credentials on a virtual machine provisioned in Azure.
 */
class MSIVmTokenCredentials extends msiTokenCredentials_1.MSITokenCredentials {
    constructor(options) {
        if (!options)
            options = {};
        super(options);
        if (!options.msiEndpoint) {
            options.msiEndpoint = "http://169.254.169.254/metadata/identity/oauth2/token";
        }
        else if (typeof options.msiEndpoint !== "string") {
            throw new Error("msiEndpoint must be a string.");
        }
        const urlBuilder = ms_rest_js_1.URLBuilder.parse(options.msiEndpoint);
        if (!urlBuilder.getScheme()) {
            options.msiEndpoint = `http://${options.msiEndpoint}`;
        }
        if (!options.apiVersion) {
            options.apiVersion = "2018-02-01";
        }
        else if (typeof options.apiVersion !== "string") {
            throw new Error("apiVersion must be a string.");
        }
        if (!options.httpMethod) {
            options.httpMethod = "GET";
        }
        this.apiVersion = options.apiVersion;
        this.msiEndpoint = options.msiEndpoint;
        this.httpMethod = options.httpMethod;
        this.objectId = options.objectId;
        this.clientId = options.clientId;
        this.identityId = options.identityId;
    }
    /**
     * Prepares and sends a POST request to a service endpoint hosted on the Azure VM, which responds with the access token.
     * @returns Promise with the tokenResponse (tokenType and accessToken are the two important properties).
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const reqOptions = this.prepareRequestOptions();
            const opRes = yield this._httpClient.sendRequest(reqOptions);
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
        const reqOptions = {
            url: this.msiEndpoint,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Metadata: "true"
            },
            method: this.httpMethod,
            queryParameters: {
                "api-version": this.apiVersion,
                resource: this.resource,
                object_id: this.objectId,
                client_id: this.clientId,
                mi_res_id: this.identityId
            }
        };
        const webResource = new ms_rest_js_1.WebResource();
        return webResource.prepare(reqOptions);
    }
}
exports.MSIVmTokenCredentials = MSIVmTokenCredentials;
//# sourceMappingURL=msiVmTokenCredentials.js.map