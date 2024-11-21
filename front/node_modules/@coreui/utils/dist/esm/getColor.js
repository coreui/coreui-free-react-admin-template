import getStyle from './getStyle.js';

/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (v2.0.1): getColor.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var getColor = function (rawProperty, element) {
    if (element === void 0) { element = document.body; }
    var property = "--".concat(rawProperty);
    var style = getStyle(property, element);
    return style ? style : rawProperty;
};

export { getColor as default };
//# sourceMappingURL=getColor.js.map
