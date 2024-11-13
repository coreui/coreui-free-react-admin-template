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
const BelongsTo = require("./belongs-to");
const HasMany = require("./has-many");
const HasOne = require("./has-one");
const AssociationError = require("../errors").AssociationError;
const EmptyResultError = require("../errors").EmptyResultError;
const Op = require("../operators");
class BelongsToMany extends Association {
  constructor(source, target, options) {
    super(source, target, options);
    if (this.options.through === void 0 || this.options.through === true || this.options.through === null) {
      throw new AssociationError(`${source.name}.belongsToMany(${target.name}) requires through option, pass either a string or a model`);
    }
    if (!this.options.through.model) {
      this.options.through = {
        model: options.through
      };
    }
    this.associationType = "BelongsToMany";
    this.targetAssociation = null;
    this.sequelize = source.sequelize;
    this.through = __spreadValues({}, this.options.through);
    this.isMultiAssociation = true;
    this.doubleLinked = false;
    if (!this.as && this.isSelfAssociation) {
      throw new AssociationError("'as' must be defined for many-to-many self-associations");
    }
    if (this.as) {
      this.isAliased = true;
      if (_.isPlainObject(this.as)) {
        this.options.name = this.as;
        this.as = this.as.plural;
      } else {
        this.options.name = {
          plural: this.as,
          singular: Utils.singularize(this.as)
        };
      }
    } else {
      this.as = this.target.options.name.plural;
      this.options.name = this.target.options.name;
    }
    this.combinedTableName = Utils.combineTableNames(this.source.tableName, this.isSelfAssociation ? this.as || this.target.tableName : this.target.tableName);
    if (this.isSelfAssociation) {
      this.targetAssociation = this;
    }
    _.each(this.target.associations, (association) => {
      if (association.associationType !== "BelongsToMany")
        return;
      if (association.target !== this.source)
        return;
      if (this.options.through.model === association.options.through.model) {
        this.paired = association;
        association.paired = this;
      }
    });
    this.sourceKey = this.options.sourceKey || this.source.primaryKeyAttribute;
    this.sourceKeyField = this.source.rawAttributes[this.sourceKey].field || this.sourceKey;
    if (this.options.targetKey) {
      this.targetKey = this.options.targetKey;
      this.targetKeyField = this.target.rawAttributes[this.targetKey].field || this.targetKey;
    } else {
      this.targetKeyDefault = true;
      this.targetKey = this.target.primaryKeyAttribute;
      this.targetKeyField = this.target.rawAttributes[this.targetKey].field || this.targetKey;
    }
    this._createForeignAndOtherKeys();
    if (typeof this.through.model === "string") {
      if (!this.sequelize.isDefined(this.through.model)) {
        this.through.model = this.sequelize.define(this.through.model, {}, Object.assign(this.options, {
          tableName: this.through.model,
          indexes: [],
          paranoid: this.through.paranoid ? this.through.paranoid : false,
          validate: {}
        }));
      } else {
        this.through.model = this.sequelize.model(this.through.model);
      }
    }
    Object.assign(this.options, _.pick(this.through.model.options, [
      "timestamps",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "paranoid"
    ]));
    if (this.paired) {
      let needInjectPaired = false;
      if (this.targetKeyDefault) {
        this.targetKey = this.paired.sourceKey;
        this.targetKeyField = this.paired.sourceKeyField;
        this._createForeignAndOtherKeys();
      }
      if (this.paired.targetKeyDefault) {
        if (this.paired.targetKey !== this.sourceKey) {
          delete this.through.model.rawAttributes[this.paired.otherKey];
          this.paired.targetKey = this.sourceKey;
          this.paired.targetKeyField = this.sourceKeyField;
          this.paired._createForeignAndOtherKeys();
          needInjectPaired = true;
        }
      }
      if (this.otherKeyDefault) {
        this.otherKey = this.paired.foreignKey;
      }
      if (this.paired.otherKeyDefault) {
        if (this.paired.otherKey !== this.foreignKey) {
          delete this.through.model.rawAttributes[this.paired.otherKey];
          this.paired.otherKey = this.foreignKey;
          needInjectPaired = true;
        }
      }
      if (needInjectPaired) {
        this.paired._injectAttributes();
      }
    }
    if (this.through) {
      this.throughModel = this.through.model;
    }
    this.options.tableName = this.combinedName = this.through.model === Object(this.through.model) ? this.through.model.tableName : this.through.model;
    this.associationAccessor = this.as;
    const plural = _.upperFirst(this.options.name.plural);
    const singular = _.upperFirst(this.options.name.singular);
    this.accessors = {
      get: `get${plural}`,
      set: `set${plural}`,
      addMultiple: `add${plural}`,
      add: `add${singular}`,
      create: `create${singular}`,
      remove: `remove${singular}`,
      removeMultiple: `remove${plural}`,
      hasSingle: `has${singular}`,
      hasAll: `has${plural}`,
      count: `count${plural}`
    };
  }
  _createForeignAndOtherKeys() {
    if (_.isObject(this.options.foreignKey)) {
      this.foreignKeyAttribute = this.options.foreignKey;
      this.foreignKey = this.foreignKeyAttribute.name || this.foreignKeyAttribute.fieldName;
    } else {
      this.foreignKeyAttribute = {};
      this.foreignKey = this.options.foreignKey || Utils.camelize([
        this.source.options.name.singular,
        this.sourceKey
      ].join("_"));
    }
    if (_.isObject(this.options.otherKey)) {
      this.otherKeyAttribute = this.options.otherKey;
      this.otherKey = this.otherKeyAttribute.name || this.otherKeyAttribute.fieldName;
    } else {
      if (!this.options.otherKey) {
        this.otherKeyDefault = true;
      }
      this.otherKeyAttribute = {};
      this.otherKey = this.options.otherKey || Utils.camelize([
        this.isSelfAssociation ? Utils.singularize(this.as) : this.target.options.name.singular,
        this.targetKey
      ].join("_"));
    }
  }
  _injectAttributes() {
    this.identifier = this.foreignKey;
    this.foreignIdentifier = this.otherKey;
    _.each(this.through.model.rawAttributes, (attribute, attributeName) => {
      if (attribute.primaryKey === true && attribute._autoGenerated === true) {
        if ([this.foreignKey, this.otherKey].includes(attributeName)) {
          attribute.primaryKey = false;
        } else {
          delete this.through.model.rawAttributes[attributeName];
        }
        this.primaryKeyDeleted = true;
      }
    });
    const sourceKey = this.source.rawAttributes[this.sourceKey];
    const sourceKeyType = sourceKey.type;
    const sourceKeyField = this.sourceKeyField;
    const targetKey = this.target.rawAttributes[this.targetKey];
    const targetKeyType = targetKey.type;
    const targetKeyField = this.targetKeyField;
    const sourceAttribute = __spreadValues({ type: sourceKeyType }, this.foreignKeyAttribute);
    const targetAttribute = __spreadValues({ type: targetKeyType }, this.otherKeyAttribute);
    if (this.primaryKeyDeleted === true) {
      targetAttribute.primaryKey = sourceAttribute.primaryKey = true;
    } else if (this.through.unique !== false) {
      let uniqueKey;
      if (typeof this.options.uniqueKey === "string" && this.options.uniqueKey !== "") {
        uniqueKey = this.options.uniqueKey;
      } else {
        uniqueKey = [this.through.model.tableName, this.foreignKey, this.otherKey, "unique"].join("_");
      }
      targetAttribute.unique = sourceAttribute.unique = uniqueKey;
    }
    if (!this.through.model.rawAttributes[this.foreignKey]) {
      this.through.model.rawAttributes[this.foreignKey] = {
        _autoGenerated: true
      };
    }
    if (!this.through.model.rawAttributes[this.otherKey]) {
      this.through.model.rawAttributes[this.otherKey] = {
        _autoGenerated: true
      };
    }
    if (this.options.constraints !== false) {
      sourceAttribute.references = {
        model: this.source.getTableName(),
        key: sourceKeyField
      };
      sourceAttribute.onDelete = this.options.onDelete || this.through.model.rawAttributes[this.foreignKey].onDelete;
      sourceAttribute.onUpdate = this.options.onUpdate || this.through.model.rawAttributes[this.foreignKey].onUpdate;
      if (!sourceAttribute.onDelete)
        sourceAttribute.onDelete = "CASCADE";
      if (!sourceAttribute.onUpdate)
        sourceAttribute.onUpdate = "CASCADE";
      targetAttribute.references = {
        model: this.target.getTableName(),
        key: targetKeyField
      };
      targetAttribute.onDelete = this.through.model.rawAttributes[this.otherKey].onDelete || this.options.onDelete;
      targetAttribute.onUpdate = this.through.model.rawAttributes[this.otherKey].onUpdate || this.options.onUpdate;
      if (!targetAttribute.onDelete)
        targetAttribute.onDelete = "CASCADE";
      if (!targetAttribute.onUpdate)
        targetAttribute.onUpdate = "CASCADE";
    }
    Object.assign(this.through.model.rawAttributes[this.foreignKey], sourceAttribute);
    Object.assign(this.through.model.rawAttributes[this.otherKey], targetAttribute);
    this.through.model.refreshAttributes();
    this.identifierField = this.through.model.rawAttributes[this.foreignKey].field || this.foreignKey;
    this.foreignIdentifierField = this.through.model.rawAttributes[this.otherKey].field || this.otherKey;
    if (this.options.sequelize.options.dialect === "db2" && this.source.rawAttributes[this.sourceKey].primaryKey !== true) {
      this.source.rawAttributes[this.sourceKey].unique = true;
    }
    if (this.paired && !this.paired.foreignIdentifierField) {
      this.paired.foreignIdentifierField = this.through.model.rawAttributes[this.paired.otherKey].field || this.paired.otherKey;
    }
    this.toSource = new BelongsTo(this.through.model, this.source, {
      foreignKey: this.foreignKey
    });
    this.manyFromSource = new HasMany(this.source, this.through.model, {
      foreignKey: this.foreignKey
    });
    this.oneFromSource = new HasOne(this.source, this.through.model, {
      foreignKey: this.foreignKey,
      sourceKey: this.sourceKey,
      as: this.through.model.name
    });
    this.toTarget = new BelongsTo(this.through.model, this.target, {
      foreignKey: this.otherKey
    });
    this.manyFromTarget = new HasMany(this.target, this.through.model, {
      foreignKey: this.otherKey
    });
    this.oneFromTarget = new HasOne(this.target, this.through.model, {
      foreignKey: this.otherKey,
      sourceKey: this.targetKey,
      as: this.through.model.name
    });
    if (this.paired && this.paired.otherKeyDefault) {
      this.paired.toTarget = new BelongsTo(this.paired.through.model, this.paired.target, {
        foreignKey: this.paired.otherKey
      });
      this.paired.oneFromTarget = new HasOne(this.paired.target, this.paired.through.model, {
        foreignKey: this.paired.otherKey,
        sourceKey: this.paired.targetKey,
        as: this.paired.through.model.name
      });
    }
    Helpers.checkNamingCollision(this);
    return this;
  }
  mixin(obj) {
    const methods = ["get", "count", "hasSingle", "hasAll", "set", "add", "addMultiple", "remove", "removeMultiple", "create"];
    const aliases = {
      hasSingle: "has",
      hasAll: "has",
      addMultiple: "add",
      removeMultiple: "remove"
    };
    Helpers.mixinMethods(this, obj, methods, aliases);
  }
  async get(instance, options) {
    options = Utils.cloneDeep(options) || {};
    const through = this.through;
    let scopeWhere;
    let throughWhere;
    if (this.scope) {
      scopeWhere = __spreadValues({}, this.scope);
    }
    options.where = {
      [Op.and]: [
        scopeWhere,
        options.where
      ]
    };
    if (Object(through.model) === through.model) {
      throughWhere = {};
      throughWhere[this.foreignKey] = instance.get(this.sourceKey);
      if (through.scope) {
        Object.assign(throughWhere, through.scope);
      }
      if (options.through && options.through.where) {
        throughWhere = {
          [Op.and]: [throughWhere, options.through.where]
        };
      }
      options.include = options.include || [];
      options.include.push({
        association: this.oneFromTarget,
        attributes: options.joinTableAttributes,
        required: true,
        paranoid: _.get(options.through, "paranoid", true),
        where: throughWhere
      });
    }
    let model = this.target;
    if (Object.prototype.hasOwnProperty.call(options, "scope")) {
      if (!options.scope) {
        model = model.unscoped();
      } else {
        model = model.scope(options.scope);
      }
    }
    if (Object.prototype.hasOwnProperty.call(options, "schema")) {
      model = model.schema(options.schema, options.schemaDelimiter);
    }
    return model.findAll(options);
  }
  async count(instance, options) {
    const sequelize = this.target.sequelize;
    options = Utils.cloneDeep(options);
    options.attributes = [
      [sequelize.fn("COUNT", sequelize.col([this.target.name, this.targetKeyField].join("."))), "count"]
    ];
    options.joinTableAttributes = [];
    options.raw = true;
    options.plain = true;
    const result = await this.get(instance, options);
    return parseInt(result.count, 10);
  }
  async has(sourceInstance, instances, options) {
    if (!Array.isArray(instances)) {
      instances = [instances];
    }
    options = __spreadProps(__spreadValues({
      raw: true
    }, options), {
      scope: false,
      attributes: [this.targetKey],
      joinTableAttributes: []
    });
    const instancePrimaryKeys = instances.map((instance) => {
      if (instance instanceof this.target) {
        return instance.where();
      }
      return {
        [this.targetKey]: instance
      };
    });
    options.where = {
      [Op.and]: [
        { [Op.or]: instancePrimaryKeys },
        options.where
      ]
    };
    const associatedObjects = await this.get(sourceInstance, options);
    return _.differenceWith(instancePrimaryKeys, associatedObjects, (a, b) => _.isEqual(a[this.targetKey], b[this.targetKey])).length === 0;
  }
  async set(sourceInstance, newAssociatedObjects, options) {
    options = options || {};
    const sourceKey = this.sourceKey;
    const targetKey = this.targetKey;
    const identifier = this.identifier;
    const foreignIdentifier = this.foreignIdentifier;
    if (newAssociatedObjects === null) {
      newAssociatedObjects = [];
    } else {
      newAssociatedObjects = this.toInstanceArray(newAssociatedObjects);
    }
    const where = __spreadValues({
      [identifier]: sourceInstance.get(sourceKey)
    }, this.through.scope);
    const updateAssociations = (currentRows) => {
      const obsoleteAssociations = [];
      const promises = [];
      const defaultAttributes = options.through || {};
      const unassociatedObjects = newAssociatedObjects.filter((obj) => !currentRows.some((currentRow) => currentRow[foreignIdentifier] === obj.get(targetKey)));
      for (const currentRow of currentRows) {
        const newObj = newAssociatedObjects.find((obj) => currentRow[foreignIdentifier] === obj.get(targetKey));
        if (!newObj) {
          obsoleteAssociations.push(currentRow);
        } else {
          let throughAttributes = newObj[this.through.model.name];
          if (throughAttributes instanceof this.through.model) {
            throughAttributes = {};
          }
          const attributes = __spreadValues(__spreadValues({}, defaultAttributes), throughAttributes);
          if (Object.keys(attributes).length) {
            promises.push(this.through.model.update(attributes, Object.assign(options, {
              where: {
                [identifier]: sourceInstance.get(sourceKey),
                [foreignIdentifier]: newObj.get(targetKey)
              }
            })));
          }
        }
      }
      if (obsoleteAssociations.length > 0) {
        promises.push(this.through.model.destroy(__spreadProps(__spreadValues({}, options), {
          where: __spreadValues({
            [identifier]: sourceInstance.get(sourceKey),
            [foreignIdentifier]: obsoleteAssociations.map((obsoleteAssociation) => obsoleteAssociation[foreignIdentifier])
          }, this.through.scope)
        })));
      }
      if (unassociatedObjects.length > 0) {
        const bulk = unassociatedObjects.map((unassociatedObject) => {
          return __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, defaultAttributes), unassociatedObject[this.through.model.name]), {
            [identifier]: sourceInstance.get(sourceKey),
            [foreignIdentifier]: unassociatedObject.get(targetKey)
          }), this.through.scope);
        });
        promises.push(this.through.model.bulkCreate(bulk, __spreadValues({ validate: true }, options)));
      }
      return Promise.all(promises);
    };
    try {
      const currentRows = await this.through.model.findAll(__spreadProps(__spreadValues({}, options), { where, raw: true }));
      return await updateAssociations(currentRows);
    } catch (error) {
      if (error instanceof EmptyResultError)
        return updateAssociations([]);
      throw error;
    }
  }
  async add(sourceInstance, newInstances, options) {
    if (!newInstances)
      return Promise.resolve();
    options = __spreadValues({}, options);
    const association = this;
    const sourceKey = association.sourceKey;
    const targetKey = association.targetKey;
    const identifier = association.identifier;
    const foreignIdentifier = association.foreignIdentifier;
    const defaultAttributes = options.through || {};
    newInstances = association.toInstanceArray(newInstances);
    const where = __spreadValues({
      [identifier]: sourceInstance.get(sourceKey),
      [foreignIdentifier]: newInstances.map((newInstance) => newInstance.get(targetKey))
    }, association.through.scope);
    const updateAssociations = (currentRows) => {
      const promises = [];
      const unassociatedObjects = [];
      const changedAssociations = [];
      for (const obj of newInstances) {
        const existingAssociation = currentRows && currentRows.find((current) => current[foreignIdentifier] === obj.get(targetKey));
        if (!existingAssociation) {
          unassociatedObjects.push(obj);
        } else {
          const throughAttributes = obj[association.through.model.name];
          const attributes = __spreadValues(__spreadValues({}, defaultAttributes), throughAttributes);
          if (Object.keys(attributes).some((attribute) => attributes[attribute] !== existingAssociation[attribute])) {
            changedAssociations.push(obj);
          }
        }
      }
      if (unassociatedObjects.length > 0) {
        const bulk = unassociatedObjects.map((unassociatedObject) => {
          const throughAttributes = unassociatedObject[association.through.model.name];
          const attributes = __spreadValues(__spreadValues({}, defaultAttributes), throughAttributes);
          attributes[identifier] = sourceInstance.get(sourceKey);
          attributes[foreignIdentifier] = unassociatedObject.get(targetKey);
          Object.assign(attributes, association.through.scope);
          return attributes;
        });
        promises.push(association.through.model.bulkCreate(bulk, __spreadValues({ validate: true }, options)));
      }
      for (const assoc of changedAssociations) {
        let throughAttributes = assoc[association.through.model.name];
        const attributes = __spreadValues(__spreadValues({}, defaultAttributes), throughAttributes);
        if (throughAttributes instanceof association.through.model) {
          throughAttributes = {};
        }
        promises.push(association.through.model.update(attributes, Object.assign(options, { where: {
          [identifier]: sourceInstance.get(sourceKey),
          [foreignIdentifier]: assoc.get(targetKey)
        } })));
      }
      return Promise.all(promises);
    };
    try {
      const currentRows = await association.through.model.findAll(__spreadProps(__spreadValues({}, options), { where, raw: true }));
      const [associations] = await updateAssociations(currentRows);
      return associations;
    } catch (error) {
      if (error instanceof EmptyResultError)
        return updateAssociations();
      throw error;
    }
  }
  remove(sourceInstance, oldAssociatedObjects, options) {
    const association = this;
    options = options || {};
    oldAssociatedObjects = association.toInstanceArray(oldAssociatedObjects);
    const where = {
      [association.identifier]: sourceInstance.get(association.sourceKey),
      [association.foreignIdentifier]: oldAssociatedObjects.map((newInstance) => newInstance.get(association.targetKey))
    };
    return association.through.model.destroy(__spreadProps(__spreadValues({}, options), { where }));
  }
  async create(sourceInstance, values, options) {
    const association = this;
    options = options || {};
    values = values || {};
    if (Array.isArray(options)) {
      options = {
        fields: options
      };
    }
    if (association.scope) {
      Object.assign(values, association.scope);
      if (options.fields) {
        options.fields = options.fields.concat(Object.keys(association.scope));
      }
    }
    const newAssociatedObject = await association.target.create(values, options);
    await sourceInstance[association.accessors.add](newAssociatedObject, _.omit(options, ["fields"]));
    return newAssociatedObject;
  }
  verifyAssociationAlias(alias) {
    if (typeof alias === "string") {
      return this.as === alias;
    }
    if (alias && alias.plural) {
      return this.as === alias.plural;
    }
    return !this.isAliased;
  }
}
module.exports = BelongsToMany;
module.exports.BelongsToMany = BelongsToMany;
module.exports.default = BelongsToMany;
//# sourceMappingURL=belongs-to-many.js.map
