"use strict";
const _ = require("lodash");
const validator = _.cloneDeep(require("validator"));
const moment = require("moment");
const extensions = {
  extend(name, fn) {
    this[name] = fn;
    return this;
  },
  notEmpty(str) {
    return !str.match(/^[\s\t\r\n]*$/);
  },
  len(str, min, max) {
    return this.isLength(str, min, max);
  },
  isUrl(str) {
    return this.isURL(str);
  },
  isIPv6(str) {
    return this.isIP(str, 6);
  },
  isIPv4(str) {
    return this.isIP(str, 4);
  },
  notIn(str, values) {
    return !this.isIn(str, values);
  },
  regex(str, pattern, modifiers) {
    str += "";
    if (Object.prototype.toString.call(pattern).slice(8, -1) !== "RegExp") {
      pattern = new RegExp(pattern, modifiers);
    }
    return str.match(pattern);
  },
  notRegex(str, pattern, modifiers) {
    return !this.regex(str, pattern, modifiers);
  },
  isDecimal(str) {
    return str !== "" && !!str.match(/^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][+-]?(?:[0-9]+))?$/);
  },
  min(str, val) {
    const number = parseFloat(str);
    return isNaN(number) || number >= val;
  },
  max(str, val) {
    const number = parseFloat(str);
    return isNaN(number) || number <= val;
  },
  not(str, pattern, modifiers) {
    return this.notRegex(str, pattern, modifiers);
  },
  contains(str, elem) {
    return !!elem && str.includes(elem);
  },
  notContains(str, elem) {
    return !this.contains(str, elem);
  },
  is(str, pattern, modifiers) {
    return this.regex(str, pattern, modifiers);
  }
};
exports.extensions = extensions;
validator.isImmutable = function(value, validatorArgs, field, modelInstance) {
  return modelInstance.isNewRecord || modelInstance.dataValues[field] === modelInstance._previousDataValues[field];
};
validator.notNull = function(val) {
  return val !== null && val !== void 0;
};
_.forEach(extensions, (extend, key) => {
  validator[key] = extend;
});
validator.isNull = validator.isEmpty;
validator.isDate = function(dateString) {
  const parsed = Date.parse(dateString);
  if (isNaN(parsed)) {
    return false;
  }
  const date = new Date(parsed);
  return moment(date.toISOString()).isValid();
};
exports.validator = validator;
//# sourceMappingURL=validator-extras.js.map
