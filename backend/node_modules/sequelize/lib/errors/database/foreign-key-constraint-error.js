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
  RelationshipType: () => RelationshipType,
  default: () => foreign_key_constraint_error_default
});
var import_database_error = __toModule(require("../database-error"));
var RelationshipType = /* @__PURE__ */ ((RelationshipType2) => {
  RelationshipType2["parent"] = "parent";
  RelationshipType2["child"] = "child";
  return RelationshipType2;
})(RelationshipType || {});
class ForeignKeyConstraintError extends import_database_error.default {
  constructor(options) {
    options = options || {};
    options.parent = options.parent || { sql: "", name: "", message: "" };
    super(options.parent, { stack: options.stack });
    __publicField(this, "table");
    __publicField(this, "fields");
    __publicField(this, "value");
    __publicField(this, "index");
    __publicField(this, "reltype");
    this.name = "SequelizeForeignKeyConstraintError";
    this.message = options.message || options.parent.message || "Database Error";
    this.fields = options.fields;
    this.table = options.table;
    this.value = options.value;
    this.index = options.index;
    this.reltype = options.reltype;
  }
}
var foreign_key_constraint_error_default = ForeignKeyConstraintError;
//# sourceMappingURL=foreign-key-constraint-error.js.map
