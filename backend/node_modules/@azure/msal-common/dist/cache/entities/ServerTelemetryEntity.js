/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { SERVER_TELEM_CONSTANTS } from '../../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ServerTelemetryEntity = /** @class */ (function () {
    function ServerTelemetryEntity() {
        this.failedRequests = [];
        this.errors = [];
        this.cacheHits = 0;
    }
    /**
     * validates if a given cache entry is "Telemetry", parses <key,value>
     * @param key
     * @param entity
     */
    ServerTelemetryEntity.isServerTelemetryEntity = function (key, entity) {
        var validateKey = key.indexOf(SERVER_TELEM_CONSTANTS.CACHE_KEY) === 0;
        var validateEntity = true;
        if (entity) {
            validateEntity =
                entity.hasOwnProperty("failedRequests") &&
                    entity.hasOwnProperty("errors") &&
                    entity.hasOwnProperty("cacheHits");
        }
        return validateKey && validateEntity;
    };
    return ServerTelemetryEntity;
}());

export { ServerTelemetryEntity };
//# sourceMappingURL=ServerTelemetryEntity.js.map
