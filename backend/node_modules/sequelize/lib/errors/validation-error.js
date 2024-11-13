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
  ValidationErrorItem: () => ValidationErrorItem,
  ValidationErrorItemOrigin: () => ValidationErrorItemOrigin,
  ValidationErrorItemType: () => ValidationErrorItemType,
  default: () => validation_error_default
});
var import_base_error = __toModule(require("./base-error"));
var ValidationErrorItemType = /* @__PURE__ */ ((ValidationErrorItemType2) => {
  ValidationErrorItemType2["notnull violation"] = "CORE";
  ValidationErrorItemType2["string violation"] = "CORE";
  ValidationErrorItemType2["unique violation"] = "DB";
  ValidationErrorItemType2["validation error"] = "FUNCTION";
  return ValidationErrorItemType2;
})(ValidationErrorItemType || {});
var ValidationErrorItemOrigin = /* @__PURE__ */ ((ValidationErrorItemOrigin2) => {
  ValidationErrorItemOrigin2["CORE"] = "CORE";
  ValidationErrorItemOrigin2["DB"] = "DB";
  ValidationErrorItemOrigin2["FUNCTION"] = "FUNCTION";
  return ValidationErrorItemOrigin2;
})(ValidationErrorItemOrigin || {});
class ValidationErrorItem {
  constructor(message, type, path, value, instance, validatorKey, fnName, fnArgs) {
    __publicField(this, "message");
    __publicField(this, "type");
    __publicField(this, "path");
    __publicField(this, "value");
    __publicField(this, "origin");
    __publicField(this, "instance");
    __publicField(this, "validatorKey");
    __publicField(this, "validatorName");
    __publicField(this, "validatorArgs");
    this.message = message || "";
    this.type = null;
    this.path = path || null;
    this.value = value !== void 0 ? value : null;
    this.origin = null;
    this.instance = instance || null;
    this.validatorKey = validatorKey || null;
    this.validatorName = fnName || null;
    this.validatorArgs = fnArgs || [];
    if (type) {
      if (this.isValidationErrorItemOrigin(type)) {
        this.origin = type;
      } else {
        const lowercaseType = this.normalizeString(type);
        const realType = ValidationErrorItemType[lowercaseType];
        if (realType && ValidationErrorItemOrigin[realType]) {
          this.origin = realType;
          this.type = type;
        }
      }
    }
  }
  isValidationErrorItemOrigin(origin) {
    return ValidationErrorItemOrigin[origin] !== void 0;
  }
  normalizeString(str) {
    return str.toLowerCase().trim();
  }
  getValidatorKey(useTypeAsNS, NSSeparator) {
    const useTANS = useTypeAsNS === void 0 || !!useTypeAsNS;
    const NSSep = NSSeparator === void 0 ? "." : NSSeparator;
    const type = this.origin;
    const key = this.validatorKey || this.validatorName;
    const useNS = useTANS && type && ValidationErrorItemOrigin[type];
    if (useNS && (typeof NSSep !== "string" || !NSSep.length)) {
      throw new Error("Invalid namespace separator given, must be a non-empty string");
    }
    if (!(typeof key === "string" && key.length)) {
      return "";
    }
    return (useNS ? [this.origin, key].join(NSSep) : key).toLowerCase().trim();
  }
}
__publicField(ValidationErrorItem, "TypeStringMap", ValidationErrorItemType);
__publicField(ValidationErrorItem, "Origins", ValidationErrorItemOrigin);
class ValidationError extends import_base_error.default {
  constructor(message, errors, options = {}) {
    super(message);
    __publicField(this, "errors");
    this.name = "SequelizeValidationError";
    this.message = "Validation Error";
    this.errors = errors || [];
    if (message) {
      this.message = message;
    } else if (this.errors.length > 0 && this.errors[0].message) {
      this.message = this.errors.map((err) => `${err.type || err.origin}: ${err.message}`).join(",\n");
    }
    if (options.stack) {
      this.stack = options.stack;
    }
  }
  get(path) {
    return this.errors.reduce((reduced, error) => {
      if (error.path === path) {
        reduced.push(error);
      }
      return reduced;
    }, []);
  }
}
var validation_error_default = ValidationError;
//# sourceMappingURL=validation-error.js.map
