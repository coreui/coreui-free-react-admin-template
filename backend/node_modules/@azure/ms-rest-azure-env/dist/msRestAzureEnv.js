/** @license ms-rest-azure-env
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Azure = {})));
}(this, (function (exports) { 'use strict';

    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT License. See License.txt in the project root for license information.
    var Environment = /** @class */ (function () {
        function Environment(parameters) {
            /**
             * Determines whether the authentication endpoint should be validated with Azure AD. Default value is true.
             */
            this.validateAuthority = true;
            if (!parameters || typeof parameters !== "object") {
                throw new Error("'parameters' is a required parameter and must be of type 'object'.");
            }
            // Validate required parameters
            var requiredParams = ["name", "portalUrl", "managementEndpointUrl", "resourceManagerEndpointUrl",
                "activeDirectoryEndpointUrl", "activeDirectoryResourceId"];
            requiredParams.forEach(function (param) {
                if (!parameters[param] || typeof parameters[param].valueOf() !== "string") {
                    throw new Error("Please provide \"" + param + "\" for the environment and it must be of type \"string\".");
                }
            });
            this.name = parameters.name;
            this.portalUrl = parameters.portalUrl;
            this.managementEndpointUrl = parameters.managementEndpointUrl;
            this.resourceManagerEndpointUrl = parameters.resourceManagerEndpointUrl;
            this.activeDirectoryEndpointUrl = parameters.activeDirectoryEndpointUrl;
            this.activeDirectoryResourceId = parameters.activeDirectoryResourceId;
            if (this.activeDirectoryGraphApiVersion) {
                this.activeDirectoryGraphApiVersion = parameters.activeDirectoryGraphApiVersion;
            }
            if (this.activeDirectoryGraphResourceId) {
                this.activeDirectoryGraphResourceId = parameters.activeDirectoryGraphResourceId;
            }
            if (this.azureDataLakeAnalyticsCatalogAndJobEndpointSuffix) {
                this.azureDataLakeAnalyticsCatalogAndJobEndpointSuffix = parameters.azureDataLakeAnalyticsCatalogAndJobEndpointSuffix;
            }
            if (this.azureDataLakeStoreFileSystemEndpointSuffix) {
                this.azureDataLakeStoreFileSystemEndpointSuffix = parameters.azureDataLakeStoreFileSystemEndpointSuffix;
            }
            if (this.batchResourceId) {
                this.batchResourceId = parameters.batchResourceId;
            }
            if (this.galleryEndpointUrl) {
                this.galleryEndpointUrl = parameters.galleryEndpointUrl;
            }
            if (this.keyVaultDnsSuffix) {
                this.keyVaultDnsSuffix = parameters.keyVaultDnsSuffix;
            }
            if (this.publishingProfileUrl) {
                this.publishingProfileUrl = parameters.publishingProfileUrl;
            }
            if (this.sqlManagementEndpointUrl) {
                this.sqlManagementEndpointUrl = parameters.sqlManagementEndpointUrl;
            }
            if (this.sqlServerHostnameSuffix) {
                this.sqlServerHostnameSuffix = parameters.sqlServerHostnameSuffix;
            }
            if (this.storageEndpointSuffix) {
                this.storageEndpointSuffix = parameters.storageEndpointSuffix;
            }
        }
        Environment.add = function (parameters) {
            var envContainer = {};
            var envObj = new Environment(parameters);
            envContainer[parameters.name] = envObj;
            Object.assign(Environment, envContainer);
            return;
        };
        Environment.get = function (name) {
            if (!name) {
                throw new TypeError("name cannot be null or undefined and must be of type string.");
            }
            return Environment[name];
        };
        Environment.AzureCloud = {
            name: "AzureCloud",
            portalUrl: "https://portal.azure.com",
            publishingProfileUrl: "https://go.microsoft.com/fwlink/?LinkId=254432",
            managementEndpointUrl: "https://management.core.windows.net",
            resourceManagerEndpointUrl: "https://management.azure.com/",
            sqlManagementEndpointUrl: "https://management.core.windows.net:8443/",
            sqlServerHostnameSuffix: ".database.windows.net",
            galleryEndpointUrl: "https://gallery.azure.com/",
            activeDirectoryEndpointUrl: "https://login.microsoftonline.com/",
            activeDirectoryResourceId: "https://management.core.windows.net/",
            activeDirectoryGraphResourceId: "https://graph.windows.net/",
            batchResourceId: "https://batch.core.windows.net/",
            activeDirectoryGraphApiVersion: "2013-04-05",
            storageEndpointSuffix: "core.windows.net",
            keyVaultDnsSuffix: ".vault.azure.net",
            azureDataLakeStoreFileSystemEndpointSuffix: "azuredatalakestore.net",
            azureDataLakeAnalyticsCatalogAndJobEndpointSuffix: "azuredatalakeanalytics.net",
            validateAuthority: true
        };
        Environment.ChinaCloud = {
            name: "AzureChinaCloud",
            portalUrl: "https://portal.azure.cn",
            publishingProfileUrl: "https://go.microsoft.com/fwlink/?LinkID=301774",
            managementEndpointUrl: "https://management.core.chinacloudapi.cn",
            resourceManagerEndpointUrl: "https://management.chinacloudapi.cn",
            sqlManagementEndpointUrl: "https://management.core.chinacloudapi.cn:8443/",
            sqlServerHostnameSuffix: ".database.chinacloudapi.cn",
            galleryEndpointUrl: "https://gallery.chinacloudapi.cn/",
            activeDirectoryEndpointUrl: "https://login.chinacloudapi.cn/",
            activeDirectoryResourceId: "https://management.core.chinacloudapi.cn/",
            activeDirectoryGraphResourceId: "https://graph.chinacloudapi.cn/",
            activeDirectoryGraphApiVersion: "2013-04-05",
            batchResourceId: "https://batch.chinacloudapi.cn/",
            storageEndpointSuffix: "core.chinacloudapi.cn",
            keyVaultDnsSuffix: ".vault.azure.cn",
            // TODO: add dns suffixes for the china cloud for datalake store and datalake analytics once they are defined.
            azureDataLakeStoreFileSystemEndpointSuffix: "N/A",
            azureDataLakeAnalyticsCatalogAndJobEndpointSuffix: "N/A",
            validateAuthority: true
        };
        Environment.USGovernment = {
            name: "AzureUSGovernment",
            portalUrl: "https://portal.azure.us",
            publishingProfileUrl: "https://manage.windowsazure.us/publishsettings/index",
            managementEndpointUrl: "https://management.core.usgovcloudapi.net",
            resourceManagerEndpointUrl: "https://management.usgovcloudapi.net",
            sqlManagementEndpointUrl: "https://management.core.usgovcloudapi.net:8443/",
            sqlServerHostnameSuffix: ".database.usgovcloudapi.net",
            galleryEndpointUrl: "https://gallery.usgovcloudapi.net/",
            activeDirectoryEndpointUrl: "https://login.microsoftonline.us/",
            activeDirectoryResourceId: "https://management.core.usgovcloudapi.net/",
            activeDirectoryGraphResourceId: "https://graph.windows.net/",
            batchResourceId: "https://batch.core.usgovcloudapi.net/",
            activeDirectoryGraphApiVersion: "2013-04-05",
            storageEndpointSuffix: "core.usgovcloudapi.net",
            keyVaultDnsSuffix: ".vault.usgovcloudapi.net",
            azureDataLakeStoreFileSystemEndpointSuffix: "N/A",
            azureDataLakeAnalyticsCatalogAndJobEndpointSuffix: "N/A",
            validateAuthority: true
        };
        Environment.GermanCloud = {
            name: "AzureGermanCloud",
            portalUrl: "https://portal.microsoftazure.de/",
            publishingProfileUrl: "https://manage.microsoftazure.de/publishsettings/index",
            managementEndpointUrl: "https://management.core.cloudapi.de",
            resourceManagerEndpointUrl: "https://management.microsoftazure.de",
            sqlManagementEndpointUrl: "https://management.core.cloudapi.de:8443/",
            sqlServerHostnameSuffix: ".database.cloudapi.de",
            galleryEndpointUrl: "https://gallery.cloudapi.de/",
            activeDirectoryEndpointUrl: "https://login.microsoftonline.de/",
            activeDirectoryResourceId: "https://management.core.cloudapi.de/",
            activeDirectoryGraphResourceId: "https://graph.cloudapi.de/",
            batchResourceId: "https://batch.microsoftazure.de/",
            activeDirectoryGraphApiVersion: "2013-04-05",
            storageEndpointSuffix: "core.cloudapi.de",
            keyVaultDnsSuffix: ".vault.microsoftazure.de",
            azureDataLakeStoreFileSystemEndpointSuffix: "N/A",
            azureDataLakeAnalyticsCatalogAndJobEndpointSuffix: "N/A",
            validateAuthority: true
        };
        return Environment;
    }());

    exports.Environment = Environment;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=msRestAzureEnv.js.map
