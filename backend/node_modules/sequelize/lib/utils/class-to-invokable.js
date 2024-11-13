var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  classToInvokable: () => classToInvokable
});
function classToInvokable(Class) {
  return new Proxy(Class, {
    apply(_target, _thisArg, args) {
      return new Class(...args);
    },
    construct(_target, args) {
      return new Class(...args);
    }
  });
}
//# sourceMappingURL=class-to-invokable.js.map
