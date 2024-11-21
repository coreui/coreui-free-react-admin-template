/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (v2.0.1): getStyle.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var getStyle = function (property, element) {
    if (typeof window === 'undefined') {
        return;
    }
    if (typeof document === 'undefined') {
        return;
    }
    var _element = element !== null && element !== void 0 ? element : document.body;
    return window.getComputedStyle(_element, null).getPropertyValue(property).replace(/^\s/, '');
};

export { getStyle as default };
//# sourceMappingURL=getStyle.js.map
