/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (v2.0.1): omitByKeys.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var omitByKeys = function (originalObject, keys) {
    var newObj = {};
    var objKeys = Object.keys(originalObject);
    for (var i = 0; i < objKeys.length; i++) {
        !keys.includes(objKeys[i]) && (newObj[objKeys[i]] = originalObject[objKeys[i]]);
    }
    return newObj;
};

export { omitByKeys as default };
//# sourceMappingURL=omitByKeys.js.map
