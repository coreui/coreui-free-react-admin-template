'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (v2.0.1): hexToRgba.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/* eslint-disable no-magic-numbers */
var hexToRgba = function (color, opacity) {
    if (opacity === void 0) { opacity = 100; }
    if (typeof color === 'undefined') {
        throw new TypeError('Hex color is not defined');
    }
    var hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);
    if (!hex) {
        throw new Error("".concat(color, " is not a valid hex color"));
    }
    var r;
    var g;
    var b;
    if (color.length === 7) {
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
    }
    else {
        r = parseInt(color.slice(1, 2), 16);
        g = parseInt(color.slice(2, 3), 16);
        b = parseInt(color.slice(3, 5), 16);
    }
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity / 100, ")");
};

exports.default = hexToRgba;
//# sourceMappingURL=hexToRgba.js.map
