"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const Utils = require("./../utils");
const Helpers = require("./helpers");
const _ = require("lodash");
const Association = require("./base");
const Op = require("../operators");
class HasOne extends Association {
  constructor(source, target, options) {
    super(source, target, options);
    this.associationType = "HasOne";
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
        Utils.singularize(this.options.as || this.source.name),
        this.source.primaryKeyAttribute
      ].join("_"));
    }
    if (this.options.sourceKey && !this.source.rawAttributes[this.options.sourceKey]) {
      throw new Error(`Unknown attribute "${this.options.sourceKey}" passed as sourceKey, define this attribute on model "${this.source.name}" first`);
    }
    this.sourceKey = this.sourceKeyAttribute = this.options.sourceKey || this.source.primaryKeyAttribute;
    this.sourceKeyField = this.source.rawAttributes[this.sourceKey].field || this.sourceKey;
    this.sourceKeyIsPrimary = this.sourceKey === this.source.primaryKeyAttribute;
    this.associationAccessor = this.as;
    this.options.useHooks = options.useHooks;
    if (this.target.rawAttributes[this.foreignKey]) {
      this.identifierField = this.target.rawAttributes[this.foreignKey].field || this.foreignKey;
    }
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
        type: this.options.keyType || this.source.rawAttributes[this.sourceKey].type,
        allowNull: true
      }, this.foreignKeyAttribute)
    };
    if (this.options.constraints !== false) {
      const target = this.target.rawAttributes[this.foreignKey] || newAttributes[this.foreignKey];
      this.options.onDelete = this.options.onDelete || (target.allowNull ? "SET NULL" : "CASCADE");
      this.options.onUpdate = this.options.onUpdate || "CASCADE";
    }
    Helpers.addForeignKeyConstraints(newAttributes[this.foreignKey], this.source, this.target, this.options, this.sourceKeyField);
    Utils.mergeDefaults(this.target.rawAttributes, newAttributes);
    this.target.refreshAttributes();
    this.identifierField = this.target.rawAttributes[this.foreignKey].field || this.foreignKey;
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
      where[this.foreignKey] = {
        [Op.in]: instances.map((_instance) => _instance.get(this.sourceKey))
      };
    } else {
      where[this.foreignKey] = instance.get(this.sourceKey);
    }
    if (this.scope) {
      Object.assign(where, this.scope);
    }
    options.where = options.where ? { [Op.and]: [where, options.where] } : where;
    if (instances) {
      const results = await Target.findAll(options);
      const result = {};
      for (const _instance of instances) {
        result[_instance.get(this.sourceKey, { raw: true })] = null;
      }
      for (const _instance of results) {
        result[_instance.get(this.foreignKey, { raw: true })] = _instance;
      }
      return result;
    }
    return Target.findOne(options);
  }
  async set(sourceInstance, associatedInstance, options) {
    options = __spreadProps(__spreadValues({}, options), { scope: false });
    const oldInstance = await sourceInstance[this.accessors.get](options);
    const alreadyAssociated = oldInstance && associatedInstance && this.target.primaryKeyAttributes.every((attribute) => oldInstance.get(attribute, { raw: true }) === (associatedInstance.get ? associatedInstance.get(attribute, { raw: true }) : associatedInstance));
    if (oldInstance && !alreadyAssociated) {
      oldInstance[this.foreignKey] = null;
      await oldInstance.save(__spreadProps(__spreadValues({}, options), {
        fields: [this.foreignKey],
        allowNull: [this.foreignKey],
        association: true
      }));
    }
    if (associatedInstance && !alreadyAssociated) {
      if (!(associatedInstance instanceof this.target)) {
        const tmpInstance = {};
        tmpInstance[this.target.primaryKeyAttribute] = associatedInstance;
        associatedInstance = this.target.build(tmpInstance, {
          isNewRecord: false
        });
      }
      Object.assign(associatedInstance, this.scope);
      associatedInstance.set(this.foreignKey, sourceInstance.get(this.sourceKeyAttribute));
      return associatedInstance.save(options);
    }
    return null;
  }
  async create(sourceInstance, values, options) {
    values = values || {};
    options = options || {};
    if (this.scope) {
      for (const attribute of Object.keys(this.scope)) {
        values[attribute] = this.scope[attribute];
        if (options.fields) {
          options.fields.push(attribute);
        }
      }
    }
    values[this.foreignKey] = sourceInstance.get(this.sourceKeyAttribute);
    if (options.fields) {
      options.fields.push(this.foreignKey);
    }
    return await this.target.create(values, options);
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
module.exports = HasOne;
//# sourceMappingURL=has-one.js.map
