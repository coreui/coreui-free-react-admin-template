/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { Separators, APP_METADATA } from '../../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * APP_METADATA Cache
 *
 * Key:Value Schema:
 *
 * Key: appmetadata-<environment>-<client_id>
 *
 * Value:
 * {
 *      clientId: client ID of the application
 *      environment: entity that issued the token, represented as a full host
 *      familyId: Family ID identifier, '1' represents Microsoft Family
 * }
 */
var AppMetadataEntity = /** @class */ (function () {
    function AppMetadataEntity() {
    }
    /**
     * Generate AppMetadata Cache Key as per the schema: appmetadata-<environment>-<client_id>
     */
    AppMetadataEntity.prototype.generateAppMetadataKey = function () {
        return AppMetadataEntity.generateAppMetadataCacheKey(this.environment, this.clientId);
    };
    /**
     * Generate AppMetadata Cache Key
     */
    AppMetadataEntity.generateAppMetadataCacheKey = function (environment, clientId) {
        var appMetaDataKeyArray = [
            APP_METADATA,
            environment,
            clientId,
        ];
        return appMetaDataKeyArray.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    };
    /**
     * Creates AppMetadataEntity
     * @param clientId
     * @param environment
     * @param familyId
     */
    AppMetadataEntity.createAppMetadataEntity = function (clientId, environment, familyId) {
        var appMetadata = new AppMetadataEntity();
        appMetadata.clientId = clientId;
        appMetadata.environment = environment;
        if (familyId) {
            appMetadata.familyId = familyId;
        }
        return appMetadata;
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    AppMetadataEntity.isAppMetadataEntity = function (key, entity) {
        if (!entity) {
            return false;
        }
        return (key.indexOf(APP_METADATA) === 0 &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("environment"));
    };
    return AppMetadataEntity;
}());

export { AppMetadataEntity };
//# sourceMappingURL=AppMetadataEntity.js.map
