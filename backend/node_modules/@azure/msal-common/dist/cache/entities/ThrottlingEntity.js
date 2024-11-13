/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { ThrottlingConstants } from '../../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ThrottlingEntity = /** @class */ (function () {
    function ThrottlingEntity() {
    }
    /**
     * validates if a given cache entry is "Throttling", parses <key,value>
     * @param key
     * @param entity
     */
    ThrottlingEntity.isThrottlingEntity = function (key, entity) {
        var validateKey = false;
        if (key) {
            validateKey = key.indexOf(ThrottlingConstants.THROTTLING_PREFIX) === 0;
        }
        var validateEntity = true;
        if (entity) {
            validateEntity = entity.hasOwnProperty("throttleTime");
        }
        return validateKey && validateEntity;
    };
    return ThrottlingEntity;
}());

export { ThrottlingEntity };
//# sourceMappingURL=ThrottlingEntity.js.map
