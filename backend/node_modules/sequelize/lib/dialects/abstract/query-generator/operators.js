"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _ = require("lodash");
const Op = require("../../../operators");
const Utils = require("../../../utils");
const OperatorHelpers = {
  OperatorMap: {
    [Op.eq]: "=",
    [Op.ne]: "!=",
    [Op.gte]: ">=",
    [Op.gt]: ">",
    [Op.lte]: "<=",
    [Op.lt]: "<",
    [Op.not]: "IS NOT",
    [Op.is]: "IS",
    [Op.in]: "IN",
    [Op.notIn]: "NOT IN",
    [Op.like]: "LIKE",
    [Op.notLike]: "NOT LIKE",
    [Op.iLike]: "ILIKE",
    [Op.notILike]: "NOT ILIKE",
    [Op.startsWith]: "LIKE",
    [Op.endsWith]: "LIKE",
    [Op.substring]: "LIKE",
    [Op.regexp]: "~",
    [Op.notRegexp]: "!~",
    [Op.iRegexp]: "~*",
    [Op.notIRegexp]: "!~*",
    [Op.between]: "BETWEEN",
    [Op.notBetween]: "NOT BETWEEN",
    [Op.overlap]: "&&",
    [Op.contains]: "@>",
    [Op.contained]: "<@",
    [Op.adjacent]: "-|-",
    [Op.strictLeft]: "<<",
    [Op.strictRight]: ">>",
    [Op.noExtendRight]: "&<",
    [Op.noExtendLeft]: "&>",
    [Op.any]: "ANY",
    [Op.all]: "ALL",
    [Op.and]: " AND ",
    [Op.or]: " OR ",
    [Op.col]: "COL",
    [Op.placeholder]: "$$PLACEHOLDER$$",
    [Op.match]: "@@"
  },
  OperatorsAliasMap: {},
  setOperatorsAliases(aliases) {
    if (!aliases || _.isEmpty(aliases)) {
      this.OperatorsAliasMap = false;
    } else {
      this.OperatorsAliasMap = __spreadValues({}, aliases);
    }
  },
  _replaceAliases(orig) {
    const obj = {};
    if (!this.OperatorsAliasMap) {
      return orig;
    }
    Utils.getOperators(orig).forEach((op) => {
      const item = orig[op];
      if (_.isPlainObject(item)) {
        obj[op] = this._replaceAliases(item);
      } else {
        obj[op] = item;
      }
    });
    _.forOwn(orig, (item, prop) => {
      prop = this.OperatorsAliasMap[prop] || prop;
      if (_.isPlainObject(item)) {
        item = this._replaceAliases(item);
      }
      obj[prop] = item;
    });
    return obj;
  }
};
module.exports = OperatorHelpers;
//# sourceMappingURL=operators.js.map
