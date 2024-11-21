/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (v2.0.1): hexToRgb.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/* eslint-disable no-magic-numbers */
var hexToRgb = function (color) {
    if (typeof color === 'undefined') {
        throw new TypeError('Hex color is not defined');
    }
    color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);
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
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ")");
};

export { hexToRgb as default };
//# sourceMappingURL=hexToRgb.js.map
