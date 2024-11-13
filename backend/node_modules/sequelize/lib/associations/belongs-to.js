"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const Utils = require("./../utils");
const Helpers = require("./helpers");
const _ = require("lodash");
const Association = require("./base");
const Op = require("../operators");
class BelongsTo extends Association {
  constructor(source, target, options) {
    super(source, target, options);
    this.associationType = "BelongsTo";
    this.isSingleAssociation = true;
    this.foreignKeyAttribute = {};
    if (this.as) {
      this.isAliased = true;
      this.options.name = {
        singular: this.as
      };
    } else {
      this.as = this.target.options.name.singular;
      this.options.name = this.target.options.name;
    }
    if (_.isObject(this.options.foreignKey)) {
      this.foreignKeyAttribute = this.options.foreignKey;
      this.foreignKey = this.foreignKeyAttribute.name || this.foreignKeyAttribute.fieldName;
    } else if (this.options.foreignKey) {
      this.foreignKey = this.options.foreignKey;
    }
    if (!this.foreignKey) {
      this.foreignKey = Utils.camelize([
        this.as,
        this.target.primaryKeyAttribute
      ].join("_"));
    }
    this.identifier = this.foreignKey;
    if (this.source.rawAttributes[this.identifier]) {
      this.identifierField = this.source.rawAttributes[this.identifier].field || this.identifier;
    }
    if (this.options.targetKey && !this.target.rawAttributes[this.options.targetKey]) {
      throw new Error(`Unknown attribute "${this.options.targetKey}" passed as targetKey, define this attribute on model "${this.target.name}" first`);
    }
    this.targetKey = this.options.targetKey || this.target.primaryKeyAttribute;
    this.targetKeyField = this.target.rawAttributes[this.targetKey].field || this.targetKey;
    this.targetKeyIsPrimary = this.targetKey === this.target.primaryKeyAttribute;
    this.targetIdentifier = this.targetKey;
    this.associationAccessor = this.as;
    this.options.useHooks = options.useHooks;
    const singular = _.upperFirst(this.options.name.singular);
    this.accessors = {
      get: `get${singular}`,
      set: `set${singular}`,
      create: `create${singular}`
    };
  }
  _injectAttributes() {
    const newAttributes = {
      [this.foreignKey]: __spreadValues({
        type: this.options.keyType || this.target.rawAttributes[this.targetKey].type,
        allowNull: true
      }, this.foreignKeyAttribute)
    };
    if (this.options.constraints !== false) {
      const source = this.source.rawAttributes[this.foreignKey] || newAttributes[this.foreignKey];
      this.options.onDelete = this.options.onDelete || (source.allowNull ? "SET NULL" : "NO ACTION");
      this.options.onUpdate = this.options.onUpdate || "CASCADE";
    }
    Helpers.addForeignKeyConstraints(newAttributes[this.foreignKey], this.target, this.source, this.options, this.targetKeyField);
    Utils.mergeDefaults(this.source.rawAttributes, newAttributes);
    this.source.refreshAttributes();
    this.identifierField = this.source.rawAttributes[this.foreignKey].field || this.foreignKey;
    Helpers.checkNamingCollision(this);
    return this;
  }
  mixin(obj) {
    const methods = ["get", "set", "create"];
    Helpers.mixinMethods(this, obj, methods);
  }
  async get(instances, options) {
    const where = {};
    let Target = this.target;
    let instance;
    options = Utils.cloneDeep(options);
    if (Object.prototype.hasOwnProperty.call(options, "scope")) {
      if (!options.scope) {
        Target = Target.unscoped();
      } else {
        Target = Target.scope(options.scope);
      }
    }
    if (Object.prototype.hasOwnProperty.call(options, "schema")) {
      Target = Target.schema(options.schema, options.schemaDelimiter);
    }
    if (!Array.isArray(instances)) {
      instance = instances;
      instances = void 0;
    }
    if (instances) {
      where[this.targetKey] = {
        [Op.in]: instances.map((_instance) => _instance.get(this.foreignKey))
      };
    } else {
      if (this.targetKeyIsPrimary && !options.where) {
        return Target.findByPk(instance.get(this.foreignKey), options);
      }
      where[this.targetKey] = instance.get(this.foreignKey);
      options.limit = null;
    }
    options.where = options.where ? { [Op.and]: [where, options.where] } : where;
    if (instances) {
      const results = await Target.findAll(options);
      const result = {};
      for (const _instance of instances) {
        result[_instance.get(this.foreignKey, { raw: true })] = null;
      }
      for (const _instance of results) {
        result[_instance.get(this.targetKey, { raw: true })] = _instance;
      }
      return result;
    }
    return Target.findOne(options);
  }
  async set(sourceInstance, associatedInstance, options = {}) {
    let value = associatedInstance;
    if (associatedInstance instanceof this.target) {
      value = associatedInstance[this.targetKey];
    }
    sourceInstance.set(this.foreignKey, value);
    if (options.save === false)
      return;
    options = __spreadValues({
      fields: [this.foreignKey],
      allowNull: [this.foreignKey],
      association: true
    }, options);
    return await sourceInstance.save(options);
  }
  async create(sourceInstance, values, options) {
    values = values || {};
    options = options || {};
    const newAssociatedObject = await this.target.create(values, options);
    await sourceInstance[this.accessors.set](newAssociatedObject, options);
    return newAssociatedObject;
  }
  verifyAssociationAlias(alias) {
    if (typeof alias === "string") {
      return this.as === alias;
    }
    if (alias && alias.singular) {
      return this.as === alias.singular;
    }
    return !this.isAliased;
  }
}
module.exports = BelongsTo;
module.exports.BelongsTo = BelongsTo;
module.exports.default = BelongsTo;
//# sourceMappingURL=belongs-to.js.map
