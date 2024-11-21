'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (v2.0.1): deepObjectsMerge.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var deepObjectsMerge = function (target, source) {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
        var key = _a[_i];
        if (source[key] instanceof Object) {
            Object.assign(source[key], deepObjectsMerge(target[key], source[key]));
        }
    }
    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
};

exports.default = deepObjectsMerge;
//# sourceMappingURL=deepObjectsMerge.js.map
