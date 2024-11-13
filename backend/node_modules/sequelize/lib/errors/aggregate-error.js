var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
__export(exports, {
  default: () => aggregate_error_default
});
var import_base_error = __toModule(require("./base-error"));
class AggregateError extends import_base_error.default {
  constructor(errors) {
    super();
    __publicField(this, "errors");
    this.errors = errors;
    this.name = "AggregateError";
  }
  toString() {
    const message = `AggregateError of:
${this.errors.map((error) => error === this ? "[Circular AggregateError]" : error instanceof AggregateError ? String(error).replace(/\n$/, "").replace(/^/gm, "  ") : String(error).replace(/^/gm, "    ").substring(2)).join("\n")}
`;
    return message;
  }
}
var aggregate_error_default = AggregateError;
//# sourceMappingURL=aggregate-error.js.map
