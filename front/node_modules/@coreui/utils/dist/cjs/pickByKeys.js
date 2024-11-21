'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (v2.0.1): pickByKeys.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var pickByKeys = function (originalObject, keys) {
    var newObj = {};
    for (var i = 0; i < keys.length; i++) {
        newObj[keys[i]] = originalObject[keys[i]];
    }
    return newObj;
};

exports.default = pickByKeys;
//# sourceMappingURL=pickByKeys.js.map
