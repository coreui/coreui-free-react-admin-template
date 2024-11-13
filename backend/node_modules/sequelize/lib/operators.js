var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  Op: () => Op,
  default: () => operators_default
});
const Op = {
  eq: Symbol.for("eq"),
  ne: Symbol.for("ne"),
  gte: Symbol.for("gte"),
  gt: Symbol.for("gt"),
  lte: Symbol.for("lte"),
  lt: Symbol.for("lt"),
  not: Symbol.for("not"),
  is: Symbol.for("is"),
  in: Symbol.for("in"),
  notIn: Symbol.for("notIn"),
  like: Symbol.for("like"),
  notLike: Symbol.for("notLike"),
  iLike: Symbol.for("iLike"),
  notILike: Symbol.for("notILike"),
  startsWith: Symbol.for("startsWith"),
  endsWith: Symbol.for("endsWith"),
  substring: Symbol.for("substring"),
  regexp: Symbol.for("regexp"),
  notRegexp: Symbol.for("notRegexp"),
  iRegexp: Symbol.for("iRegexp"),
  notIRegexp: Symbol.for("notIRegexp"),
  between: Symbol.for("between"),
  notBetween: Symbol.for("notBetween"),
  overlap: Symbol.for("overlap"),
  contains: Symbol.for("contains"),
  contained: Symbol.for("contained"),
  adjacent: Symbol.for("adjacent"),
  strictLeft: Symbol.for("strictLeft"),
  strictRight: Symbol.for("strictRight"),
  noExtendRight: Symbol.for("noExtendRight"),
  noExtendLeft: Symbol.for("noExtendLeft"),
  and: Symbol.for("and"),
  or: Symbol.for("or"),
  any: Symbol.for("any"),
  all: Symbol.for("all"),
  values: Symbol.for("values"),
  col: Symbol.for("col"),
  placeholder: Symbol.for("placeholder"),
  join: Symbol.for("join"),
  match: Symbol.for("match")
};
var operators_default = Op;
module.exports = Op;
//# sourceMappingURL=operators.js.map
