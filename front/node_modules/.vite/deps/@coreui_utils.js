import "./chunk-DC5AMYBS.js";

// node_modules/@coreui/utils/dist/esm/deepObjectsMerge.js
var deepObjectsMerge = function(target, source) {
  for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
    var key = _a[_i];
    if (source[key] instanceof Object) {
      Object.assign(source[key], deepObjectsMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
};

// node_modules/@coreui/utils/dist/esm/getStyle.js
var getStyle = function(property, element) {
  if (typeof window === "undefined") {
    return;
  }
  if (typeof document === "undefined") {
    return;
  }
  var _element = element !== null && element !== void 0 ? element : document.body;
  return window.getComputedStyle(_element, null).getPropertyValue(property).replace(/^\s/, "");
};

// node_modules/@coreui/utils/dist/esm/getColor.js
var getColor = function(rawProperty, element) {
  if (element === void 0) {
    element = document.body;
  }
  var property = "--".concat(rawProperty);
  var style = getStyle(property, element);
  return style ? style : rawProperty;
};

// node_modules/@coreui/utils/dist/esm/hexToRgb.js
var hexToRgb = function(color) {
  if (typeof color === "undefined") {
    throw new TypeError("Hex color is not defined");
  }
  color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);
  var r;
  var g;
  var b;
  if (color.length === 7) {
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else {
    r = parseInt(color.slice(1, 2), 16);
    g = parseInt(color.slice(2, 3), 16);
    b = parseInt(color.slice(3, 5), 16);
  }
  return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ")");
};

// node_modules/@coreui/utils/dist/esm/hexToRgba.js
var hexToRgba = function(color, opacity) {
  if (opacity === void 0) {
    opacity = 100;
  }
  if (typeof color === "undefined") {
    throw new TypeError("Hex color is not defined");
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
  } else {
    r = parseInt(color.slice(1, 2), 16);
    g = parseInt(color.slice(2, 3), 16);
    b = parseInt(color.slice(3, 5), 16);
  }
  return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity / 100, ")");
};

// node_modules/@coreui/utils/dist/esm/makeUid.js
var makeUid = function() {
  var key = Math.random().toString(36).substr(2);
  return "uid-" + key;
};

// node_modules/@coreui/utils/dist/esm/omitByKeys.js
var omitByKeys = function(originalObject, keys) {
  var newObj = {};
  var objKeys = Object.keys(originalObject);
  for (var i = 0; i < objKeys.length; i++) {
    !keys.includes(objKeys[i]) && (newObj[objKeys[i]] = originalObject[objKeys[i]]);
  }
  return newObj;
};

// node_modules/@coreui/utils/dist/esm/pickByKeys.js
var pickByKeys = function(originalObject, keys) {
  var newObj = {};
  for (var i = 0; i < keys.length; i++) {
    newObj[keys[i]] = originalObject[keys[i]];
  }
  return newObj;
};

// node_modules/@coreui/utils/dist/esm/rgbToHex.js
var rgbToHex = function(color) {
  if (typeof color === "undefined") {
    throw new TypeError("Hex color is not defined");
  }
  if (color === "transparent") {
    return "#00000000";
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
export {
  deepObjectsMerge,
  getColor,
  getStyle,
  hexToRgb,
  hexToRgba,
  makeUid,
  omitByKeys,
  pickByKeys,
  rgbToHex
};
//# sourceMappingURL=@coreui_utils.js.map
