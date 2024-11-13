var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => base_error_default
});
class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "SequelizeBaseError";
  }
}
var base_error_default = BaseError;
//# sourceMappingURL=base-error.js.map
