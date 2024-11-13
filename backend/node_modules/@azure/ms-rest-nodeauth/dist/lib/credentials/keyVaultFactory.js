"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const applicationTokenCredentials_1 = require("./applicationTokenCredentials");
const applicationTokenCertificateCredentials_1 = require("./applicationTokenCertificateCredentials");
const deviceTokenCredentials_1 = require("./deviceTokenCredentials");
const msiAppServiceTokenCredentials_1 = require("./msiAppServiceTokenCredentials");
const msiTokenCredentials_1 = require("./msiTokenCredentials");
const msiVmTokenCredentials_1 = require("./msiVmTokenCredentials");
const tokenCredentialsBase_1 = require("./tokenCredentialsBase");
const userTokenCredentials_1 = require("./userTokenCredentials");
const adal_node_1 = require("adal-node");
function createAuthenticator(credentials) {
    const convertedCredentials = _convert(credentials);
    const authenticator = _createAuthenticatorMapper(convertedCredentials);
    return authenticator;
}
exports.createAuthenticator = createAuthenticator;
function _convert(credentials) {
    if (credentials instanceof msiAppServiceTokenCredentials_1.MSIAppServiceTokenCredentials) {
        return new msiAppServiceTokenCredentials_1.MSIAppServiceTokenCredentials({
            msiEndpoint: credentials.msiEndpoint,
            msiSecret: credentials.msiSecret,
            msiApiVersion: credentials.msiApiVersion,
            resource: credentials.resource
        });
    }
    else if (credentials instanceof msiVmTokenCredentials_1.MSIVmTokenCredentials) {
        return new msiVmTokenCredentials_1.MSIVmTokenCredentials({
            resource: credentials.resource,
            msiEndpoint: credentials.msiEndpoint
        });
    }
    else if (credentials instanceof msiTokenCredentials_1.MSITokenCredentials) {
        throw new Error("MSI-credentials not one of: MSIVmTokenCredentials, MSIAppServiceTokenCredentials");
    }
    else {
        return credentials;
    }
}
function _createAuthenticatorMapper(credentials) {
    return (challenge) => new Promise((resolve, reject) => {
        // Function to take token Response and format a authorization value
        const _formAuthorizationValue = (err, tokenResponse) => {
            if (err) {
                return reject(err);
            }
            if (tokenResponse.error) {
                return reject(tokenResponse.error);
            }
            tokenResponse = tokenResponse;
            // Calculate the value to be set in the request's Authorization header and resume the call.
            const authorizationValue = tokenResponse.tokenType + " " + tokenResponse.accessToken;
            return resolve(authorizationValue);
        };
        // Create a new authentication context.
        if (credentials instanceof tokenCredentialsBase_1.TokenCredentialsBase) {
            const context = new adal_node_1.AuthenticationContext(challenge.authorization, true, credentials.authContext && credentials.authContext.cache);
            if (credentials instanceof applicationTokenCredentials_1.ApplicationTokenCredentials) {
                return context.acquireTokenWithClientCredentials(challenge.resource, credentials.clientId, credentials.secret, _formAuthorizationValue);
            }
            else if (credentials instanceof applicationTokenCertificateCredentials_1.ApplicationTokenCertificateCredentials) {
                return context.acquireTokenWithClientCertificate(challenge.resource, credentials.clientId, credentials.certificate, credentials.thumbprint, _formAuthorizationValue);
            }
            else if (credentials instanceof userTokenCredentials_1.UserTokenCredentials) {
                return context.acquireTokenWithUsernamePassword(challenge.resource, credentials.username, credentials.password, credentials.clientId, _formAuthorizationValue);
            }
            else if (credentials instanceof deviceTokenCredentials_1.DeviceTokenCredentials) {
                return context.acquireToken(challenge.resource, credentials.username, credentials.clientId, _formAuthorizationValue);
            }
        }
        else if (credentials instanceof msiTokenCredentials_1.MSITokenCredentials) {
            return credentials.getToken();
        }
        else {
            return reject(new Error("credentials must be one of: ApplicationTokenCredentials, UserTokenCredentials, " +
                "DeviceTokenCredentials, MSITokenCredentials"));
        }
    });
}
//# sourceMappingURL=keyVaultFactory.js.map