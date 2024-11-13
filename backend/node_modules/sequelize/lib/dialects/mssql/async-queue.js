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
  AsyncQueueError: () => AsyncQueueError,
  default: () => async_queue_default
});
var import_base_error = __toModule(require("../../errors/base-error"));
var import_connection_error = __toModule(require("../../errors/connection-error"));
class AsyncQueueError extends import_base_error.default {
  constructor(message) {
    super(message);
    this.name = "SequelizeAsyncQueueError";
  }
}
class AsyncQueue {
  constructor() {
    __publicField(this, "previous");
    __publicField(this, "closed");
    __publicField(this, "rejectCurrent");
    this.previous = Promise.resolve();
    this.closed = false;
    this.rejectCurrent = () => {
    };
  }
  close() {
    this.closed = true;
    this.rejectCurrent(new import_connection_error.default(new AsyncQueueError("the connection was closed before this query could finish executing")));
  }
  enqueue(asyncFunction) {
    return new Promise((resolve, reject) => {
      this.previous = this.previous.then(() => {
        this.rejectCurrent = reject;
        if (this.closed) {
          return reject(new import_connection_error.default(new AsyncQueueError("the connection was closed before this query could be executed")));
        }
        return asyncFunction().then(resolve, reject);
      });
    });
  }
}
var async_queue_default = AsyncQueue;
//# sourceMappingURL=async-queue.js.map
