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
const msRest = require("@azure/ms-rest-js");
const applicationTokenCredentialsBase_1 = require("../credentials/applicationTokenCredentialsBase");
const authConstants_1 = require("../util/authConstants");
/**
 * Builds an array of tenantIds.
 * @param credentials - The credentials.
 * @param apiVersion - default value 2016-06-01
 * @returns A promise that resolves to an array of tenantIds and rejects with an error.
 */
function buildTenantList(credentials, apiVersion = "2016-06-01") {
    return __awaiter(this, void 0, void 0, function* () {
        if (credentials.domain && credentials.domain !== authConstants_1.AuthConstants.AAD_COMMON_TENANT) {
            return [credentials.domain];
        }
        const client = new msRest.ServiceClient(credentials);
        const baseUrl = credentials.environment.resourceManagerEndpointUrl;
        const reqUrl = `${baseUrl}${baseUrl.endsWith("/") ? "" : "/"}tenants?api-version=${apiVersion}`;
        const req = {
            url: reqUrl,
            method: "GET"
        };
        const res = yield client.sendRequest(req);
        const result = [];
        if (res.status < 300) {
            const tenants = res.parsedBody;
            for (const tenant of tenants.value) {
                result.push(tenant.tenantId);
            }
        }
        return result;
    });
}
exports.buildTenantList = buildTenantList;
function getSubscriptionsFromTenants(credentials, tenantList, apiVersion = "2016-06-01") {
    return __awaiter(this, void 0, void 0, function* () {
        let subscriptions = [];
        let userType = "user";
        let username;
        const originalDomain = credentials.domain;
        if (credentials instanceof applicationTokenCredentialsBase_1.ApplicationTokenCredentialsBase) {
            userType = "servicePrincipal";
            username = credentials.clientId;
        }
        else {
            username = credentials.username;
        }
        for (const tenant of tenantList) {
            credentials.domain = tenant;
            const client = new msRest.ServiceClient(credentials);
            const baseUrl = credentials.environment.resourceManagerEndpointUrl;
            const reqUrl = `${baseUrl}${baseUrl.endsWith("/") ? "" : "/"}subscriptions?api-version=${apiVersion}`;
            const req = {
                url: reqUrl,
                method: "GET"
            };
            const res = yield client.sendRequest(req);
            const subscriptionList = res.parsedBody.value;
            subscriptions = subscriptions.concat(subscriptionList.map((s) => {
                s.tenantId = tenant;
                s.user = { name: username, type: userType };
                s.environmentName = credentials.environment.name;
                s.name = s.displayName;
                s.id = s.subscriptionId;
                delete s.displayName;
                delete s.subscriptionId;
                delete s.subscriptionPolicies;
                return s;
            }));
        }
        // Reset the original domain.
        credentials.domain = originalDomain;
        return subscriptions;
    });
}
exports.getSubscriptionsFromTenants = getSubscriptionsFromTenants;
//# sourceMappingURL=subscriptionUtils.js.map