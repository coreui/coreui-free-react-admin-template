var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  noBoolOperatorAliases: () => noBoolOperatorAliases,
  noDoubleNestedGroup: () => noDoubleNestedGroup,
  noStringOperators: () => noStringOperators,
  noTrueLogging: () => noTrueLogging,
  unsupportedEngine: () => unsupportedEngine
});
var import_util = __toModule(require("util"));
const noop = () => {
};
const noTrueLogging = (0, import_util.deprecate)(noop, "The logging-option should be either a function or false. Default: console.log", "SEQUELIZE0002");
const noStringOperators = (0, import_util.deprecate)(noop, "String based operators are deprecated. Please use Symbol based operators for better security, read more at https://sequelize.org/master/manual/querying.html#operators", "SEQUELIZE0003");
const noBoolOperatorAliases = (0, import_util.deprecate)(noop, "A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.", "SEQUELIZE0004");
const noDoubleNestedGroup = (0, import_util.deprecate)(noop, "Passing a double nested nested array to `group` is unsupported and will be removed in v6.", "SEQUELIZE0005");
const unsupportedEngine = (0, import_util.deprecate)(noop, "This database engine version is not supported, please update your database server. More information https://github.com/sequelize/sequelize/blob/main/ENGINE.md", "SEQUELIZE0006");
//# sourceMappingURL=deprecations.js.map
