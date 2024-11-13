"use strict";
const _ = require("lodash");
const { logger } = require("./utils/logger");
const debug = logger.debugContext("hooks");
const hookTypes = {
  beforeValidate: { params: 2 },
  afterValidate: { params: 2 },
  validationFailed: { params: 3 },
  beforeCreate: { params: 2 },
  afterCreate: { params: 2 },
  beforeDestroy: { params: 2 },
  afterDestroy: { params: 2 },
  beforeRestore: { params: 2 },
  afterRestore: { params: 2 },
  beforeUpdate: { params: 2 },
  afterUpdate: { params: 2 },
  beforeSave: { params: 2, proxies: ["beforeUpdate", "beforeCreate"] },
  afterSave: { params: 2, proxies: ["afterUpdate", "afterCreate"] },
  beforeUpsert: { params: 2 },
  afterUpsert: { params: 2 },
  beforeBulkCreate: { params: 2 },
  afterBulkCreate: { params: 2 },
  beforeBulkDestroy: { params: 1 },
  afterBulkDestroy: { params: 1 },
  beforeBulkRestore: { params: 1 },
  afterBulkRestore: { params: 1 },
  beforeBulkUpdate: { params: 1 },
  afterBulkUpdate: { params: 1 },
  beforeFind: { params: 1 },
  beforeFindAfterExpandIncludeAll: { params: 1 },
  beforeFindAfterOptions: { params: 1 },
  afterFind: { params: 2 },
  beforeCount: { params: 1 },
  beforeDefine: { params: 2, sync: true, noModel: true },
  afterDefine: { params: 1, sync: true, noModel: true },
  beforeInit: { params: 2, sync: true, noModel: true },
  afterInit: { params: 1, sync: true, noModel: true },
  beforeAssociate: { params: 2, sync: true },
  afterAssociate: { params: 2, sync: true },
  beforeConnect: { params: 1, noModel: true },
  afterConnect: { params: 2, noModel: true },
  beforeDisconnect: { params: 1, noModel: true },
  afterDisconnect: { params: 1, noModel: true },
  beforePoolAcquire: { params: 1, noModel: true },
  afterPoolAcquire: { params: 2, noModel: true },
  beforeSync: { params: 1 },
  afterSync: { params: 1 },
  beforeBulkSync: { params: 1 },
  afterBulkSync: { params: 1 },
  beforeQuery: { params: 2 },
  afterQuery: { params: 2 }
};
exports.hooks = hookTypes;
const getProxiedHooks = (hookType) => hookTypes[hookType].proxies ? hookTypes[hookType].proxies.concat(hookType) : [hookType];
function getHooks(hooked, hookType) {
  return (hooked.options.hooks || {})[hookType] || [];
}
const Hooks = {
  _setupHooks(hooks) {
    this.options.hooks = {};
    _.map(hooks || {}, (hooksArray, hookName) => {
      if (!Array.isArray(hooksArray))
        hooksArray = [hooksArray];
      hooksArray.forEach((hookFn) => this.addHook(hookName, hookFn));
    });
  },
  async runHooks(hooks, ...hookArgs) {
    if (!hooks)
      throw new Error("runHooks requires at least 1 argument");
    let hookType;
    if (typeof hooks === "string") {
      hookType = hooks;
      hooks = getHooks(this, hookType);
      if (this.sequelize) {
        hooks = hooks.concat(getHooks(this.sequelize, hookType));
      }
    }
    if (!Array.isArray(hooks)) {
      hooks = [hooks];
    }
    if (hookTypes[hookType] && hookTypes[hookType].sync) {
      for (let hook of hooks) {
        if (typeof hook === "object") {
          hook = hook.fn;
        }
        debug(`running hook(sync) ${hookType}`);
        hook.apply(this, hookArgs);
      }
      return;
    }
    for (let hook of hooks) {
      if (typeof hook === "object") {
        hook = hook.fn;
      }
      debug(`running hook ${hookType}`);
      await hook.apply(this, hookArgs);
    }
  },
  addHook(hookType, name, fn) {
    if (typeof name === "function") {
      fn = name;
      name = null;
    }
    debug(`adding hook ${hookType}`);
    hookType = getProxiedHooks(hookType);
    hookType.forEach((type) => {
      const hooks = getHooks(this, type);
      hooks.push(name ? { name, fn } : fn);
      this.options.hooks[type] = hooks;
    });
    return this;
  },
  removeHook(hookType, name) {
    const isReference = typeof name === "function" ? true : false;
    if (!this.hasHook(hookType)) {
      return this;
    }
    debug(`removing hook ${hookType}`);
    hookType = getProxiedHooks(hookType);
    for (const type of hookType) {
      this.options.hooks[type] = this.options.hooks[type].filter((hook) => {
        if (isReference && typeof hook === "function") {
          return hook !== name;
        }
        if (!isReference && typeof hook === "object") {
          return hook.name !== name;
        }
        return true;
      });
    }
    return this;
  },
  hasHook(hookType) {
    return this.options.hooks[hookType] && !!this.options.hooks[hookType].length;
  }
};
Hooks.hasHooks = Hooks.hasHook;
function applyTo(target, isModel = false) {
  _.mixin(target, Hooks);
  for (const hook of Object.keys(hookTypes)) {
    if (isModel && hookTypes[hook].noModel) {
      continue;
    }
    target[hook] = function(name, callback) {
      return this.addHook(hook, name, callback);
    };
  }
}
exports.applyTo = applyTo;
//# sourceMappingURL=hooks.js.map
