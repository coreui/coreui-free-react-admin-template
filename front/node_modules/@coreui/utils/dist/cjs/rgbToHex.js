'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (v2.0.1): rgbToHex.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var rgbToHex = function (color) {
    if (typeof color === 'undefined') {
        throw new TypeError('Hex color is not defined');
    }
    if (color === 'transparent') {
        return '#00000000';
    }
    var rgb = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    if (!rgb) {
        throw new Error("".concat(color, " is not a valid rgb color"));
    }
    var r = "0".concat(parseInt(rgb[1], 10).toString(16));
    var g = "0".concat(parseInt(rgb[2], 10).toString(16));
    var b = "0".concat(parseInt(rgb[3], 10).toString(16));
    return "#".concat(r.slice(-2)).concat(g.slice(-2)).concat(b.slice(-2));
};

exports.default = rgbToHex;
//# sourceMappingURL=rgbToHex.js.map
