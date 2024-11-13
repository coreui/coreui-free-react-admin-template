"use strict";
const Toposort = require("toposort-class");
const _ = require("lodash");
class ModelManager {
  constructor(sequelize) {
    this.models = [];
    this.sequelize = sequelize;
  }
  addModel(model) {
    this.models.push(model);
    this.sequelize.models[model.name] = model;
    return model;
  }
  removeModel(modelToRemove) {
    this.models = this.models.filter((model) => model.name !== modelToRemove.name);
    delete this.sequelize.models[modelToRemove.name];
  }
  getModel(against, options) {
    options = _.defaults(options || {}, {
      attribute: "name"
    });
    return this.models.find((model) => model[options.attribute] === against);
  }
  findModel(callback) {
    return this.models.find(callback);
  }
  get all() {
    return this.models;
  }
  getModelsTopoSortedByForeignKey() {
    const models = /* @__PURE__ */ new Map();
    const sorter = new Toposort();
    for (const model of this.models) {
      let deps = [];
      let tableName = model.getTableName();
      if (_.isObject(tableName)) {
        tableName = `${tableName.schema}.${tableName.tableName}`;
      }
      models.set(tableName, model);
      for (const attrName in model.rawAttributes) {
        if (Object.prototype.hasOwnProperty.call(model.rawAttributes, attrName)) {
          const attribute = model.rawAttributes[attrName];
          if (attribute.references) {
            let dep = attribute.references.model;
            if (_.isObject(dep)) {
              dep = `${dep.schema}.${dep.tableName}`;
            }
            deps.push(dep);
          }
        }
      }
      deps = deps.filter((dep) => tableName !== dep);
      sorter.add(tableName, deps);
    }
    let sorted;
    try {
      sorted = sorter.sort();
    } catch (e) {
      if (!e.message.startsWith("Cyclic dependency found.")) {
        throw e;
      }
      return null;
    }
    return sorted.map((modelName) => {
      return models.get(modelName);
    }).filter(Boolean);
  }
  forEachModel(iterator, options) {
    const sortedModels = this.getModelsTopoSortedByForeignKey();
    if (sortedModels == null) {
      throw new Error("Cyclic dependency found.");
    }
    options = _.defaults(options || {}, {
      reverse: true
    });
    if (options.reverse) {
      sortedModels.reverse();
    }
    for (const model of sortedModels) {
      iterator(model);
    }
  }
}
module.exports = ModelManager;
module.exports.ModelManager = ModelManager;
module.exports.default = ModelManager;
//# sourceMappingURL=model-manager.js.map
