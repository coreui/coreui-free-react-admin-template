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
const assert = require("assert");
const _ = require("lodash");
const Dottie = require("dottie");
const Utils = require("./utils");
const { logger } = require("./utils/logger");
const BelongsTo = require("./associations/belongs-to");
const BelongsToMany = require("./associations/belongs-to-many");
const InstanceValidator = require("./instance-validator");
const QueryTypes = require("./query-types");
const sequelizeErrors = require("./errors");
const Association = require("./associations/base");
const HasMany = require("./associations/has-many");
const DataTypes = require("./data-types");
const Hooks = require("./hooks");
const associationsMixin = require("./associations/mixin");
const Op = require("./operators");
const { noDoubleNestedGroup } = require("./utils/deprecations");
const validQueryKeywords = /* @__PURE__ */ new Set([
  "where",
  "attributes",
  "paranoid",
  "include",
  "order",
  "limit",
  "offset",
  "transaction",
  "lock",
  "raw",
  "logging",
  "benchmark",
  "having",
  "searchPath",
  "rejectOnEmpty",
  "plain",
  "scope",
  "group",
  "through",
  "defaults",
  "distinct",
  "primary",
  "exception",
  "type",
  "hooks",
  "force",
  "name"
]);
const nonCascadingOptions = ["include", "attributes", "originalAttributes", "order", "where", "limit", "offset", "plain", "group", "having"];
class Model {
  static get queryInterface() {
    return this.sequelize.getQueryInterface();
  }
  static get queryGenerator() {
    return this.queryInterface.queryGenerator;
  }
  get sequelize() {
    return this.constructor.sequelize;
  }
  constructor(values = {}, options = {}) {
    if (!this.constructor._overwrittenAttributesChecked) {
      this.constructor._overwrittenAttributesChecked = true;
      setTimeout(() => {
        const overwrittenAttributes = [];
        for (const key of Object.keys(this.constructor._attributeManipulation)) {
          if (Object.prototype.hasOwnProperty.call(this, key)) {
            overwrittenAttributes.push(key);
          }
        }
        if (overwrittenAttributes.length > 0) {
          logger.warn(`Model ${JSON.stringify(this.constructor.name)} is declaring public class fields for attribute(s): ${overwrittenAttributes.map((attr) => JSON.stringify(attr)).join(", ")}.
These class fields are shadowing Sequelize's attribute getters & setters.
See https://sequelize.org/main/manual/model-basics.html#caveat-with-public-class-fields`);
        }
      }, 0);
    }
    options = __spreadValues({
      isNewRecord: true,
      _schema: this.constructor._schema,
      _schemaDelimiter: this.constructor._schemaDelimiter
    }, options);
    if (options.attributes) {
      options.attributes = options.attributes.map((attribute) => Array.isArray(attribute) ? attribute[1] : attribute);
    }
    if (!options.includeValidated) {
      this.constructor._conformIncludes(options, this.constructor);
      if (options.include) {
        this.constructor._expandIncludeAll(options);
        this.constructor._validateIncludedElements(options);
      }
    }
    this.dataValues = {};
    this._previousDataValues = {};
    this.uniqno = 1;
    this._changed = /* @__PURE__ */ new Set();
    this._options = options;
    this.isNewRecord = options.isNewRecord;
    this._initValues(values, options);
  }
  _initValues(values, options) {
    let defaults;
    let key;
    values = __spreadValues({}, values);
    if (options.isNewRecord) {
      defaults = {};
      if (this.constructor._hasDefaultValues) {
        defaults = _.mapValues(this.constructor._defaultValues, (valueFn) => {
          const value = valueFn();
          return value && value instanceof Utils.SequelizeMethod ? value : _.cloneDeep(value);
        });
      }
      if (this.constructor.primaryKeyAttributes.length) {
        this.constructor.primaryKeyAttributes.forEach((primaryKeyAttribute) => {
          if (!Object.prototype.hasOwnProperty.call(defaults, primaryKeyAttribute)) {
            defaults[primaryKeyAttribute] = null;
          }
        });
      }
      if (this.constructor._timestampAttributes.createdAt && defaults[this.constructor._timestampAttributes.createdAt]) {
        this.dataValues[this.constructor._timestampAttributes.createdAt] = Utils.toDefaultValue(defaults[this.constructor._timestampAttributes.createdAt], this.sequelize.options.dialect);
        delete defaults[this.constructor._timestampAttributes.createdAt];
      }
      if (this.constructor._timestampAttributes.updatedAt && defaults[this.constructor._timestampAttributes.updatedAt]) {
        this.dataValues[this.constructor._timestampAttributes.updatedAt] = Utils.toDefaultValue(defaults[this.constructor._timestampAttributes.updatedAt], this.sequelize.options.dialect);
        delete defaults[this.constructor._timestampAttributes.updatedAt];
      }
      if (this.constructor._timestampAttributes.deletedAt && defaults[this.constructor._timestampAttributes.deletedAt]) {
        this.dataValues[this.constructor._timestampAttributes.deletedAt] = Utils.toDefaultValue(defaults[this.constructor._timestampAttributes.deletedAt], this.sequelize.options.dialect);
        delete defaults[this.constructor._timestampAttributes.deletedAt];
      }
      for (key in defaults) {
        if (values[key] === void 0) {
          this.set(key, Utils.toDefaultValue(defaults[key], this.sequelize.options.dialect), { raw: true });
          delete values[key];
        }
      }
    }
    this.set(values, options);
  }
  static _paranoidClause(model, options = {}) {
    if (options.include) {
      for (const include of options.include) {
        this._paranoidClause(include.model, include);
      }
    }
    if (_.get(options, "groupedLimit.on.options.paranoid")) {
      const throughModel = _.get(options, "groupedLimit.on.through.model");
      if (throughModel) {
        options.groupedLimit.through = this._paranoidClause(throughModel, options.groupedLimit.through);
      }
    }
    if (!model.options.timestamps || !model.options.paranoid || options.paranoid === false) {
      return options;
    }
    const deletedAtCol = model._timestampAttributes.deletedAt;
    const deletedAtAttribute = model.rawAttributes[deletedAtCol];
    const deletedAtObject = {};
    let deletedAtDefaultValue = Object.prototype.hasOwnProperty.call(deletedAtAttribute, "defaultValue") ? deletedAtAttribute.defaultValue : null;
    deletedAtDefaultValue = deletedAtDefaultValue || {
      [Op.eq]: null
    };
    deletedAtObject[deletedAtAttribute.field || deletedAtCol] = deletedAtDefaultValue;
    if (Utils.isWhereEmpty(options.where)) {
      options.where = deletedAtObject;
    } else {
      options.where = { [Op.and]: [deletedAtObject, options.where] };
    }
    return options;
  }
  static _addDefaultAttributes() {
    const tail = {};
    let head = {};
    if (!_.some(this.rawAttributes, "primaryKey")) {
      if ("id" in this.rawAttributes) {
        throw new Error(`A column called 'id' was added to the attributes of '${this.tableName}' but not marked with 'primaryKey: true'`);
      }
      head = {
        id: {
          type: new DataTypes.INTEGER(),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          _autoGenerated: true
        }
      };
    }
    if (this._timestampAttributes.createdAt) {
      tail[this._timestampAttributes.createdAt] = {
        type: DataTypes.DATE,
        allowNull: false,
        _autoGenerated: true
      };
    }
    if (this._timestampAttributes.updatedAt) {
      tail[this._timestampAttributes.updatedAt] = {
        type: DataTypes.DATE,
        allowNull: false,
        _autoGenerated: true
      };
    }
    if (this._timestampAttributes.deletedAt) {
      tail[this._timestampAttributes.deletedAt] = {
        type: DataTypes.DATE,
        _autoGenerated: true
      };
    }
    if (this._versionAttribute) {
      tail[this._versionAttribute] = {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        _autoGenerated: true
      };
    }
    const newRawAttributes = __spreadValues(__spreadValues({}, head), this.rawAttributes);
    _.each(tail, (value, attr) => {
      if (newRawAttributes[attr] === void 0) {
        newRawAttributes[attr] = value;
      }
    });
    this.rawAttributes = newRawAttributes;
    if (!Object.keys(this.primaryKeys).length) {
      this.primaryKeys.id = this.rawAttributes.id;
    }
  }
  static getAttributes() {
    return this.rawAttributes;
  }
  static _findAutoIncrementAttribute() {
    this.autoIncrementAttribute = null;
    for (const name in this.rawAttributes) {
      if (Object.prototype.hasOwnProperty.call(this.rawAttributes, name)) {
        const definition = this.rawAttributes[name];
        if (definition && definition.autoIncrement) {
          if (this.autoIncrementAttribute) {
            throw new Error("Invalid Instance definition. Only one autoincrement field allowed.");
          }
          this.autoIncrementAttribute = name;
        }
      }
    }
  }
  static _conformIncludes(options, self) {
    if (!options.include)
      return;
    if (!Array.isArray(options.include)) {
      options.include = [options.include];
    } else if (!options.include.length) {
      delete options.include;
      return;
    }
    options.include = options.include.map((include) => this._conformInclude(include, self));
  }
  static _transformStringAssociation(include, self) {
    if (self && typeof include === "string") {
      if (!Object.prototype.hasOwnProperty.call(self.associations, include)) {
        throw new Error(`Association with alias "${include}" does not exist on ${self.name}`);
      }
      return self.associations[include];
    }
    return include;
  }
  static _conformInclude(include, self) {
    if (include) {
      let model;
      if (include._pseudo)
        return include;
      include = this._transformStringAssociation(include, self);
      if (include instanceof Association) {
        if (self && include.target.name === self.name) {
          model = include.source;
        } else {
          model = include.target;
        }
        return { model, association: include, as: include.as };
      }
      if (include.prototype && include.prototype instanceof Model) {
        return { model: include };
      }
      if (_.isPlainObject(include)) {
        if (include.association) {
          include.association = this._transformStringAssociation(include.association, self);
          if (self && include.association.target.name === self.name) {
            model = include.association.source;
          } else {
            model = include.association.target;
          }
          if (!include.model)
            include.model = model;
          if (!include.as)
            include.as = include.association.as;
          this._conformIncludes(include, model);
          return include;
        }
        if (include.model) {
          this._conformIncludes(include, include.model);
          return include;
        }
        if (include.all) {
          this._conformIncludes(include);
          return include;
        }
      }
    }
    throw new Error("Include unexpected. Element has to be either a Model, an Association or an object.");
  }
  static _expandIncludeAllElement(includes, include) {
    let all = include.all;
    delete include.all;
    if (all !== true) {
      if (!Array.isArray(all)) {
        all = [all];
      }
      const validTypes = {
        BelongsTo: true,
        HasOne: true,
        HasMany: true,
        One: ["BelongsTo", "HasOne"],
        Has: ["HasOne", "HasMany"],
        Many: ["HasMany"]
      };
      for (let i = 0; i < all.length; i++) {
        const type = all[i];
        if (type === "All") {
          all = true;
          break;
        }
        const types = validTypes[type];
        if (!types) {
          throw new sequelizeErrors.EagerLoadingError(`include all '${type}' is not valid - must be BelongsTo, HasOne, HasMany, One, Has, Many or All`);
        }
        if (types !== true) {
          all.splice(i, 1);
          i--;
          for (let j = 0; j < types.length; j++) {
            if (!all.includes(types[j])) {
              all.unshift(types[j]);
              i++;
            }
          }
        }
      }
    }
    const nested = include.nested;
    if (nested) {
      delete include.nested;
      if (!include.include) {
        include.include = [];
      } else if (!Array.isArray(include.include)) {
        include.include = [include.include];
      }
    }
    const used = [];
    (function addAllIncludes(parent, includes2) {
      _.forEach(parent.associations, (association) => {
        if (all !== true && !all.includes(association.associationType)) {
          return;
        }
        const model = association.target;
        const as = association.options.as;
        const predicate = { model };
        if (as) {
          predicate.as = as;
        }
        if (_.some(includes2, predicate)) {
          return;
        }
        if (nested && used.includes(model)) {
          return;
        }
        used.push(parent);
        const thisInclude = Utils.cloneDeep(include);
        thisInclude.model = model;
        if (as) {
          thisInclude.as = as;
        }
        includes2.push(thisInclude);
        if (nested) {
          addAllIncludes(model, thisInclude.include);
          if (thisInclude.include.length === 0)
            delete thisInclude.include;
        }
      });
      used.pop();
    })(this, includes);
  }
  static _validateIncludedElements(options, tableNames) {
    if (!options.model)
      options.model = this;
    tableNames = tableNames || {};
    options.includeNames = [];
    options.includeMap = {};
    options.hasSingleAssociation = false;
    options.hasMultiAssociation = false;
    if (!options.parent) {
      options.topModel = options.model;
      options.topLimit = options.limit;
    }
    options.include = options.include.map((include) => {
      include = this._conformInclude(include);
      include.parent = options;
      include.topLimit = options.topLimit;
      this._validateIncludedElement.call(options.model, include, tableNames, options);
      if (include.duplicating === void 0) {
        include.duplicating = include.association.isMultiAssociation;
      }
      include.hasDuplicating = include.hasDuplicating || include.duplicating;
      include.hasRequired = include.hasRequired || include.required;
      options.hasDuplicating = options.hasDuplicating || include.hasDuplicating;
      options.hasRequired = options.hasRequired || include.required;
      options.hasWhere = options.hasWhere || include.hasWhere || !!include.where;
      return include;
    });
    for (const include of options.include) {
      include.hasParentWhere = options.hasParentWhere || !!options.where;
      include.hasParentRequired = options.hasParentRequired || !!options.required;
      if (include.subQuery !== false && options.hasDuplicating && options.topLimit) {
        if (include.duplicating) {
          include.subQuery = include.subQuery || false;
          include.subQueryFilter = include.hasRequired;
        } else {
          include.subQuery = include.hasRequired;
          include.subQueryFilter = false;
        }
      } else {
        include.subQuery = include.subQuery || false;
        if (include.duplicating) {
          include.subQueryFilter = include.subQuery;
        } else {
          include.subQueryFilter = false;
          include.subQuery = include.subQuery || include.hasParentRequired && include.hasRequired && !include.separate;
        }
      }
      options.includeMap[include.as] = include;
      options.includeNames.push(include.as);
      if (options.topModel === options.model && options.subQuery === void 0 && options.topLimit) {
        if (include.subQuery) {
          options.subQuery = include.subQuery;
        } else if (include.hasDuplicating) {
          options.subQuery = true;
        }
      }
      options.hasIncludeWhere = options.hasIncludeWhere || include.hasIncludeWhere || !!include.where;
      options.hasIncludeRequired = options.hasIncludeRequired || include.hasIncludeRequired || !!include.required;
      if (include.association.isMultiAssociation || include.hasMultiAssociation) {
        options.hasMultiAssociation = true;
      }
      if (include.association.isSingleAssociation || include.hasSingleAssociation) {
        options.hasSingleAssociation = true;
      }
    }
    if (options.topModel === options.model && options.subQuery === void 0) {
      options.subQuery = false;
    }
    return options;
  }
  static _validateIncludedElement(include, tableNames, options) {
    tableNames[include.model.getTableName()] = true;
    if (include.attributes && !options.raw) {
      include.model._expandAttributes(include);
      include.originalAttributes = include.model._injectDependentVirtualAttributes(include.attributes);
      include = Utils.mapFinderOptions(include, include.model);
      if (include.attributes.length) {
        _.each(include.model.primaryKeys, (attr, key) => {
          if (!include.attributes.some((includeAttr) => {
            if (attr.field !== key) {
              return Array.isArray(includeAttr) && includeAttr[0] === attr.field && includeAttr[1] === key;
            }
            return includeAttr === key;
          })) {
            include.attributes.unshift(key);
          }
        });
      }
    } else {
      include = Utils.mapFinderOptions(include, include.model);
    }
    if (include._pseudo) {
      if (!include.attributes) {
        include.attributes = Object.keys(include.model.tableAttributes);
      }
      return Utils.mapFinderOptions(include, include.model);
    }
    const association = include.association || this._getIncludedAssociation(include.model, include.as);
    include.association = association;
    include.as = association.as;
    if (include.association.through && Object(include.association.through.model) === include.association.through.model) {
      if (!include.include)
        include.include = [];
      const through = include.association.through;
      include.through = _.defaults(include.through || {}, {
        model: through.model,
        as: through.model.name,
        association: {
          isSingleAssociation: true
        },
        _pseudo: true,
        parent: include
      });
      if (through.scope) {
        include.through.where = include.through.where ? { [Op.and]: [include.through.where, through.scope] } : through.scope;
      }
      include.include.push(include.through);
      tableNames[through.tableName] = true;
    }
    let model;
    if (include.model.scoped === true) {
      model = include.model;
    } else {
      model = include.association.target.name === include.model.name ? include.association.target : include.association.source;
    }
    model._injectScope(include);
    if (!include.attributes) {
      include.attributes = Object.keys(include.model.tableAttributes);
    }
    include = Utils.mapFinderOptions(include, include.model);
    if (include.required === void 0) {
      include.required = !!include.where;
    }
    if (include.association.scope) {
      include.where = include.where ? { [Op.and]: [include.where, include.association.scope] } : include.association.scope;
    }
    if (include.limit && include.separate === void 0) {
      include.separate = true;
    }
    if (include.separate === true) {
      if (!(include.association instanceof HasMany)) {
        throw new Error("Only HasMany associations support include.separate");
      }
      include.duplicating = false;
      if (options.attributes && options.attributes.length && !_.flattenDepth(options.attributes, 2).includes(association.sourceKey)) {
        options.attributes.push(association.sourceKey);
      }
      if (include.attributes && include.attributes.length && !_.flattenDepth(include.attributes, 2).includes(association.foreignKey)) {
        include.attributes.push(association.foreignKey);
      }
    }
    if (Object.prototype.hasOwnProperty.call(include, "include")) {
      this._validateIncludedElements.call(include.model, include, tableNames);
    }
    return include;
  }
  static _getIncludedAssociation(targetModel, targetAlias) {
    const associations = this.getAssociations(targetModel);
    let association = null;
    if (associations.length === 0) {
      throw new sequelizeErrors.EagerLoadingError(`${targetModel.name} is not associated to ${this.name}!`);
    }
    if (associations.length === 1) {
      association = this.getAssociationForAlias(targetModel, targetAlias);
      if (association) {
        return association;
      }
      if (targetAlias) {
        const existingAliases = this.getAssociations(targetModel).map((association2) => association2.as);
        throw new sequelizeErrors.EagerLoadingError(`${targetModel.name} is associated to ${this.name} using an alias. You've included an alias (${targetAlias}), but it does not match the alias(es) defined in your association (${existingAliases.join(", ")}).`);
      }
      throw new sequelizeErrors.EagerLoadingError(`${targetModel.name} is associated to ${this.name} using an alias. You must use the 'as' keyword to specify the alias within your include statement.`);
    }
    association = this.getAssociationForAlias(targetModel, targetAlias);
    if (!association) {
      throw new sequelizeErrors.EagerLoadingError(`${targetModel.name} is associated to ${this.name} multiple times. To identify the correct association, you must use the 'as' keyword to specify the alias of the association you want to include.`);
    }
    return association;
  }
  static _expandIncludeAll(options) {
    const includes = options.include;
    if (!includes) {
      return;
    }
    for (let index = 0; index < includes.length; index++) {
      const include = includes[index];
      if (include.all) {
        includes.splice(index, 1);
        index--;
        this._expandIncludeAllElement(includes, include);
      }
    }
    includes.forEach((include) => {
      this._expandIncludeAll.call(include.model, include);
    });
  }
  static _conformIndex(index) {
    if (!index.fields) {
      throw new Error('Missing "fields" property for index definition');
    }
    index = _.defaults(index, {
      type: "",
      parser: null
    });
    if (index.type && index.type.toLowerCase() === "unique") {
      index.unique = true;
      delete index.type;
    }
    return index;
  }
  static _uniqIncludes(options) {
    if (!options.include)
      return;
    options.include = _(options.include).groupBy((include) => `${include.model && include.model.name}-${include.as}`).map((includes) => this._assignOptions(...includes)).value();
  }
  static _baseMerge(...args) {
    _.assignWith(...args);
    this._conformIncludes(args[0], this);
    this._uniqIncludes(args[0]);
    return args[0];
  }
  static _mergeFunction(objValue, srcValue, key) {
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
      return _.union(objValue, srcValue);
    }
    if (["where", "having"].includes(key)) {
      if (this.options && this.options.whereMergeStrategy === "and") {
        return combineWheresWithAnd(objValue, srcValue);
      }
      if (srcValue instanceof Utils.SequelizeMethod) {
        srcValue = { [Op.and]: srcValue };
      }
      if (_.isPlainObject(objValue) && _.isPlainObject(srcValue)) {
        return Object.assign(objValue, srcValue);
      }
    } else if (key === "attributes" && _.isPlainObject(objValue) && _.isPlainObject(srcValue)) {
      return _.assignWith(objValue, srcValue, (objValue2, srcValue2) => {
        if (Array.isArray(objValue2) && Array.isArray(srcValue2)) {
          return _.union(objValue2, srcValue2);
        }
      });
    }
    if (srcValue) {
      return Utils.cloneDeep(srcValue, true);
    }
    return srcValue === void 0 ? objValue : srcValue;
  }
  static _assignOptions(...args) {
    return this._baseMerge(...args, this._mergeFunction.bind(this));
  }
  static _defaultsOptions(target, opts) {
    return this._baseMerge(target, opts, (srcValue, objValue, key) => {
      return this._mergeFunction(objValue, srcValue, key);
    });
  }
  static init(attributes, options = {}) {
    if (!options.sequelize) {
      throw new Error("No Sequelize instance passed");
    }
    this.sequelize = options.sequelize;
    const globalOptions = this.sequelize.options;
    options = Utils.merge(_.cloneDeep(globalOptions.define), options);
    if (!options.modelName) {
      options.modelName = this.name;
    }
    options = Utils.merge({
      name: {
        plural: Utils.pluralize(options.modelName),
        singular: Utils.singularize(options.modelName)
      },
      indexes: [],
      omitNull: globalOptions.omitNull,
      schema: globalOptions.schema
    }, options);
    this.sequelize.runHooks("beforeDefine", attributes, options);
    if (options.modelName !== this.name) {
      Object.defineProperty(this, "name", { value: options.modelName });
    }
    delete options.modelName;
    this.options = __spreadValues({
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: false,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: null,
      schema: null,
      schemaDelimiter: "",
      defaultScope: {},
      scopes: {},
      indexes: [],
      whereMergeStrategy: "overwrite"
    }, options);
    if (this.sequelize.isDefined(this.name)) {
      this.sequelize.modelManager.removeModel(this.sequelize.modelManager.getModel(this.name));
    }
    this.associations = {};
    this._setupHooks(options.hooks);
    this.underscored = this.options.underscored;
    if (!this.options.tableName) {
      this.tableName = this.options.freezeTableName ? this.name : Utils.underscoredIf(Utils.pluralize(this.name), this.underscored);
    } else {
      this.tableName = this.options.tableName;
    }
    this._schema = this.options.schema;
    this._schemaDelimiter = this.options.schemaDelimiter;
    _.each(options.validate, (validator, validatorType) => {
      if (Object.prototype.hasOwnProperty.call(attributes, validatorType)) {
        throw new Error(`A model validator function must not have the same name as a field. Model: ${this.name}, field/validation name: ${validatorType}`);
      }
      if (typeof validator !== "function") {
        throw new Error(`Members of the validate option must be functions. Model: ${this.name}, error with validate member ${validatorType}`);
      }
    });
    if (!_.includes(["and", "overwrite"], this.options && this.options.whereMergeStrategy)) {
      throw new Error(`Invalid value ${this.options && this.options.whereMergeStrategy} for whereMergeStrategy. Allowed values are 'and' and 'overwrite'.`);
    }
    this.rawAttributes = _.mapValues(attributes, (attribute, name) => {
      attribute = this.sequelize.normalizeAttribute(attribute);
      if (attribute.type === void 0) {
        throw new Error(`Unrecognized datatype for attribute "${this.name}.${name}"`);
      }
      if (attribute.allowNull !== false && _.get(attribute, "validate.notNull")) {
        throw new Error(`Invalid definition for "${this.name}.${name}", "notNull" validator is only allowed with "allowNull:false"`);
      }
      if (_.get(attribute, "references.model.prototype") instanceof Model) {
        attribute.references.model = attribute.references.model.getTableName();
      }
      return attribute;
    });
    const tableName = this.getTableName();
    this._indexes = this.options.indexes.map((index) => Utils.nameIndex(this._conformIndex(index), tableName));
    this.primaryKeys = {};
    this._readOnlyAttributes = /* @__PURE__ */ new Set();
    this._timestampAttributes = {};
    if (this.options.timestamps) {
      for (const key of ["createdAt", "updatedAt", "deletedAt"]) {
        if (!["undefined", "string", "boolean"].includes(typeof this.options[key])) {
          throw new Error(`Value for "${key}" option must be a string or a boolean, got ${typeof this.options[key]}`);
        }
        if (this.options[key] === "") {
          throw new Error(`Value for "${key}" option cannot be an empty string`);
        }
      }
      if (this.options.createdAt !== false) {
        this._timestampAttributes.createdAt = typeof this.options.createdAt === "string" ? this.options.createdAt : "createdAt";
        this._readOnlyAttributes.add(this._timestampAttributes.createdAt);
      }
      if (this.options.updatedAt !== false) {
        this._timestampAttributes.updatedAt = typeof this.options.updatedAt === "string" ? this.options.updatedAt : "updatedAt";
        this._readOnlyAttributes.add(this._timestampAttributes.updatedAt);
      }
      if (this.options.paranoid && this.options.deletedAt !== false) {
        this._timestampAttributes.deletedAt = typeof this.options.deletedAt === "string" ? this.options.deletedAt : "deletedAt";
        this._readOnlyAttributes.add(this._timestampAttributes.deletedAt);
      }
    }
    if (this.options.version) {
      this._versionAttribute = typeof this.options.version === "string" ? this.options.version : "version";
      this._readOnlyAttributes.add(this._versionAttribute);
    }
    this._hasReadOnlyAttributes = this._readOnlyAttributes.size > 0;
    this._addDefaultAttributes();
    this.refreshAttributes();
    this._findAutoIncrementAttribute();
    this._scope = this.options.defaultScope;
    this._scopeNames = ["defaultScope"];
    this.sequelize.modelManager.addModel(this);
    this.sequelize.runHooks("afterDefine", this);
    return this;
  }
  static refreshAttributes() {
    const attributeManipulation = {};
    this.prototype._customGetters = {};
    this.prototype._customSetters = {};
    ["get", "set"].forEach((type) => {
      const opt = `${type}terMethods`;
      const funcs = __spreadValues({}, this.options[opt]);
      const _custom = type === "get" ? this.prototype._customGetters : this.prototype._customSetters;
      _.each(funcs, (method, attribute) => {
        _custom[attribute] = method;
        if (type === "get") {
          funcs[attribute] = function() {
            return this.get(attribute);
          };
        }
        if (type === "set") {
          funcs[attribute] = function(value) {
            return this.set(attribute, value);
          };
        }
      });
      _.each(this.rawAttributes, (options, attribute) => {
        if (Object.prototype.hasOwnProperty.call(options, type)) {
          _custom[attribute] = options[type];
        }
        if (type === "get") {
          funcs[attribute] = function() {
            return this.get(attribute);
          };
        }
        if (type === "set") {
          funcs[attribute] = function(value) {
            return this.set(attribute, value);
          };
        }
      });
      _.each(funcs, (fct, name) => {
        if (!attributeManipulation[name]) {
          attributeManipulation[name] = {
            configurable: true
          };
        }
        attributeManipulation[name][type] = fct;
      });
    });
    this._dataTypeChanges = {};
    this._dataTypeSanitizers = {};
    this._hasBooleanAttributes = false;
    this._hasDateAttributes = false;
    this._jsonAttributes = /* @__PURE__ */ new Set();
    this._virtualAttributes = /* @__PURE__ */ new Set();
    this._defaultValues = {};
    this.prototype.validators = {};
    this.fieldRawAttributesMap = {};
    this.primaryKeys = {};
    this.uniqueKeys = {};
    _.each(this.rawAttributes, (definition, name) => {
      definition.type = this.sequelize.normalizeDataType(definition.type);
      definition.Model = this;
      definition.fieldName = name;
      definition._modelAttribute = true;
      if (definition.field === void 0) {
        definition.field = Utils.underscoredIf(name, this.underscored);
      }
      if (definition.primaryKey === true) {
        this.primaryKeys[name] = definition;
      }
      this.fieldRawAttributesMap[definition.field] = definition;
      if (definition.type._sanitize) {
        this._dataTypeSanitizers[name] = definition.type._sanitize;
      }
      if (definition.type._isChanged) {
        this._dataTypeChanges[name] = definition.type._isChanged;
      }
      if (definition.type instanceof DataTypes.BOOLEAN) {
        this._hasBooleanAttributes = true;
      } else if (definition.type instanceof DataTypes.DATE || definition.type instanceof DataTypes.DATEONLY) {
        this._hasDateAttributes = true;
      } else if (definition.type instanceof DataTypes.JSON) {
        this._jsonAttributes.add(name);
      } else if (definition.type instanceof DataTypes.VIRTUAL) {
        this._virtualAttributes.add(name);
      }
      if (Object.prototype.hasOwnProperty.call(definition, "defaultValue")) {
        this._defaultValues[name] = () => Utils.toDefaultValue(definition.defaultValue, this.sequelize.options.dialect);
      }
      if (Object.prototype.hasOwnProperty.call(definition, "unique") && definition.unique) {
        let idxName;
        if (typeof definition.unique === "object" && Object.prototype.hasOwnProperty.call(definition.unique, "name")) {
          idxName = definition.unique.name;
        } else if (typeof definition.unique === "string") {
          idxName = definition.unique;
        } else {
          idxName = `${this.tableName}_${name}_unique`;
        }
        const idx = this.uniqueKeys[idxName] || { fields: [] };
        idx.fields.push(definition.field);
        idx.msg = idx.msg || definition.unique.msg || null;
        idx.name = idxName || false;
        idx.column = name;
        idx.customIndex = definition.unique !== true;
        this.uniqueKeys[idxName] = idx;
      }
      if (Object.prototype.hasOwnProperty.call(definition, "validate")) {
        this.prototype.validators[name] = definition.validate;
      }
      if (definition.index === true && definition.type instanceof DataTypes.JSONB) {
        this._indexes.push(Utils.nameIndex(this._conformIndex({
          fields: [definition.field || name],
          using: "gin"
        }), this.getTableName()));
        delete definition.index;
      }
    });
    this.fieldAttributeMap = _.reduce(this.fieldRawAttributesMap, (map, value, key) => {
      if (key !== value.fieldName) {
        map[key] = value.fieldName;
      }
      return map;
    }, {});
    this._hasJsonAttributes = !!this._jsonAttributes.size;
    this._hasVirtualAttributes = !!this._virtualAttributes.size;
    this._hasDefaultValues = !_.isEmpty(this._defaultValues);
    this.tableAttributes = _.omitBy(this.rawAttributes, (_a, key) => this._virtualAttributes.has(key));
    this.prototype._hasCustomGetters = Object.keys(this.prototype._customGetters).length;
    this.prototype._hasCustomSetters = Object.keys(this.prototype._customSetters).length;
    for (const key of Object.keys(attributeManipulation)) {
      if (Object.prototype.hasOwnProperty.call(Model.prototype, key)) {
        this.sequelize.log(`Not overriding built-in method from model attribute: ${key}`);
        continue;
      }
      Object.defineProperty(this.prototype, key, attributeManipulation[key]);
    }
    this.prototype.rawAttributes = this.rawAttributes;
    this.prototype._isAttribute = (key) => Object.prototype.hasOwnProperty.call(this.prototype.rawAttributes, key);
    this.primaryKeyAttributes = Object.keys(this.primaryKeys);
    this.primaryKeyAttribute = this.primaryKeyAttributes[0];
    if (this.primaryKeyAttribute) {
      this.primaryKeyField = this.rawAttributes[this.primaryKeyAttribute].field || this.primaryKeyAttribute;
    }
    this._hasPrimaryKeys = this.primaryKeyAttributes.length > 0;
    this._isPrimaryKey = (key) => this.primaryKeyAttributes.includes(key);
    this._attributeManipulation = attributeManipulation;
  }
  static removeAttribute(attribute) {
    delete this.rawAttributes[attribute];
    this.refreshAttributes();
  }
  static async sync(options) {
    options = __spreadValues(__spreadValues({}, this.options), options);
    options.hooks = options.hooks === void 0 ? true : !!options.hooks;
    const attributes = this.tableAttributes;
    const rawAttributes = this.fieldRawAttributesMap;
    if (options.hooks) {
      await this.runHooks("beforeSync", options);
    }
    const tableName = this.getTableName(options);
    let tableExists;
    if (options.force) {
      await this.drop(options);
      tableExists = false;
    } else {
      tableExists = await this.queryInterface.tableExists(tableName, options);
    }
    if (!tableExists) {
      await this.queryInterface.createTable(tableName, attributes, options, this);
    } else {
      await this.queryInterface.ensureEnums(tableName, attributes, options, this);
    }
    if (tableExists && options.alter) {
      const tableInfos = await Promise.all([
        this.queryInterface.describeTable(tableName, options),
        this.queryInterface.getForeignKeyReferencesForTable(tableName, options)
      ]);
      const columns = tableInfos[0];
      const foreignKeyReferences = tableInfos[1];
      const removedConstraints = {};
      for (const columnName in attributes) {
        if (!Object.prototype.hasOwnProperty.call(attributes, columnName))
          continue;
        if (!columns[columnName] && !columns[attributes[columnName].field]) {
          await this.queryInterface.addColumn(tableName, attributes[columnName].field || columnName, attributes[columnName], options);
        }
      }
      if (options.alter === true || typeof options.alter === "object" && options.alter.drop !== false) {
        for (const columnName in columns) {
          if (!Object.prototype.hasOwnProperty.call(columns, columnName))
            continue;
          const currentAttribute = rawAttributes[columnName];
          if (!currentAttribute) {
            await this.queryInterface.removeColumn(tableName, columnName, options);
            continue;
          }
          if (currentAttribute.primaryKey)
            continue;
          const references = currentAttribute.references;
          if (currentAttribute.references) {
            const database = this.sequelize.config.database;
            const schema = this.sequelize.config.schema;
            for (const foreignKeyReference of foreignKeyReferences) {
              const constraintName = foreignKeyReference.constraintName;
              if (!!constraintName && foreignKeyReference.tableCatalog === database && (schema ? foreignKeyReference.tableSchema === schema : true) && foreignKeyReference.referencedTableName === references.model && foreignKeyReference.referencedColumnName === references.key && (schema ? foreignKeyReference.referencedTableSchema === schema : true) && !removedConstraints[constraintName]) {
                await this.queryInterface.removeConstraint(tableName, constraintName, options);
                removedConstraints[constraintName] = true;
              }
            }
          }
          await this.queryInterface.changeColumn(tableName, columnName, currentAttribute, options);
        }
      }
    }
    const existingIndexes = await this.queryInterface.showIndex(tableName, options);
    const missingIndexes = this._indexes.filter((item1) => !existingIndexes.some((item2) => item1.name === item2.name)).sort((index1, index2) => {
      if (this.sequelize.options.dialect === "postgres") {
        if (index1.concurrently === true)
          return 1;
        if (index2.concurrently === true)
          return -1;
      }
      return 0;
    });
    for (const index of missingIndexes) {
      await this.queryInterface.addIndex(tableName, __spreadValues(__spreadValues({}, options), index));
    }
    if (options.hooks) {
      await this.runHooks("afterSync", options);
    }
    return this;
  }
  static async drop(options) {
    return await this.queryInterface.dropTable(this.getTableName(options), options);
  }
  static async dropSchema(schema) {
    return await this.queryInterface.dropSchema(schema);
  }
  static schema(schema, options) {
    const clone = class extends this {
    };
    Object.defineProperty(clone, "name", { value: this.name });
    clone._schema = schema;
    if (options) {
      if (typeof options === "string") {
        clone._schemaDelimiter = options;
      } else if (options.schemaDelimiter) {
        clone._schemaDelimiter = options.schemaDelimiter;
      }
    }
    return clone;
  }
  static getTableName() {
    return this.queryGenerator.addSchema(this);
  }
  static unscoped() {
    return this.scope();
  }
  static addScope(name, scope, options) {
    options = __spreadValues({ override: false }, options);
    if ((name === "defaultScope" && Object.keys(this.options.defaultScope).length > 0 || name in this.options.scopes) && options.override === false) {
      throw new Error(`The scope ${name} already exists. Pass { override: true } as options to silence this error`);
    }
    if (name === "defaultScope") {
      this.options.defaultScope = this._scope = scope;
    } else {
      this.options.scopes[name] = scope;
    }
  }
  static scope(option) {
    const self = class extends this {
    };
    let scope;
    let scopeName;
    Object.defineProperty(self, "name", { value: this.name });
    self._scope = {};
    self._scopeNames = [];
    self.scoped = true;
    if (!option) {
      return self;
    }
    const options = _.flatten(arguments);
    for (const option2 of options) {
      scope = null;
      scopeName = null;
      if (_.isPlainObject(option2)) {
        if (option2.method) {
          if (Array.isArray(option2.method) && !!self.options.scopes[option2.method[0]]) {
            scopeName = option2.method[0];
            scope = self.options.scopes[scopeName].apply(self, option2.method.slice(1));
          } else if (self.options.scopes[option2.method]) {
            scopeName = option2.method;
            scope = self.options.scopes[scopeName].apply(self);
          }
        } else {
          scope = option2;
        }
      } else if (option2 === "defaultScope" && _.isPlainObject(self.options.defaultScope)) {
        scope = self.options.defaultScope;
      } else {
        scopeName = option2;
        scope = self.options.scopes[scopeName];
        if (typeof scope === "function") {
          scope = scope();
        }
      }
      if (scope) {
        this._conformIncludes(scope, this);
        this._assignOptions(self._scope, Utils.cloneDeep(scope));
        self._scopeNames.push(scopeName ? scopeName : "defaultScope");
      } else {
        throw new sequelizeErrors.SequelizeScopeError(`Invalid scope ${scopeName} called.`);
      }
    }
    return self;
  }
  static async findAll(options) {
    if (options !== void 0 && !_.isPlainObject(options)) {
      throw new sequelizeErrors.QueryError("The argument passed to findAll must be an options object, use findByPk if you wish to pass a single primary key value");
    }
    if (options !== void 0 && options.attributes) {
      if (!Array.isArray(options.attributes) && !_.isPlainObject(options.attributes)) {
        throw new sequelizeErrors.QueryError("The attributes option must be an array of column names or an object");
      }
    }
    this.warnOnInvalidOptions(options, Object.keys(this.rawAttributes));
    const tableNames = {};
    tableNames[this.getTableName(options)] = true;
    options = Utils.cloneDeep(options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    _.defaults(options, { hooks: true });
    options.rejectOnEmpty = Object.prototype.hasOwnProperty.call(options, "rejectOnEmpty") ? options.rejectOnEmpty : this.options.rejectOnEmpty;
    this._injectScope(options);
    if (options.hooks) {
      await this.runHooks("beforeFind", options);
    }
    this._conformIncludes(options, this);
    this._expandAttributes(options);
    this._expandIncludeAll(options);
    if (options.hooks) {
      await this.runHooks("beforeFindAfterExpandIncludeAll", options);
    }
    options.originalAttributes = this._injectDependentVirtualAttributes(options.attributes);
    if (options.include) {
      options.hasJoin = true;
      this._validateIncludedElements(options, tableNames);
      if (options.attributes && !options.raw && this.primaryKeyAttribute && !options.attributes.includes(this.primaryKeyAttribute) && (!options.group || !options.hasSingleAssociation || options.hasMultiAssociation)) {
        options.attributes = [this.primaryKeyAttribute].concat(options.attributes);
      }
    }
    if (!options.attributes) {
      options.attributes = Object.keys(this.rawAttributes);
      options.originalAttributes = this._injectDependentVirtualAttributes(options.attributes);
    }
    this.options.whereCollection = options.where || null;
    Utils.mapFinderOptions(options, this);
    options = this._paranoidClause(this, options);
    if (options.hooks) {
      await this.runHooks("beforeFindAfterOptions", options);
    }
    const selectOptions = __spreadProps(__spreadValues({}, options), { tableNames: Object.keys(tableNames) });
    const results = await this.queryInterface.select(this, this.getTableName(selectOptions), selectOptions);
    if (options.hooks) {
      await this.runHooks("afterFind", results, options);
    }
    if (_.isEmpty(results) && options.rejectOnEmpty) {
      if (typeof options.rejectOnEmpty === "function") {
        throw new options.rejectOnEmpty();
      }
      if (typeof options.rejectOnEmpty === "object") {
        throw options.rejectOnEmpty;
      }
      throw new sequelizeErrors.EmptyResultError();
    }
    return await Model._findSeparate(results, options);
  }
  static warnOnInvalidOptions(options, validColumnNames) {
    if (!_.isPlainObject(options)) {
      return;
    }
    const unrecognizedOptions = Object.keys(options).filter((k) => !validQueryKeywords.has(k));
    const unexpectedModelAttributes = _.intersection(unrecognizedOptions, validColumnNames);
    if (!options.where && unexpectedModelAttributes.length > 0) {
      logger.warn(`Model attributes (${unexpectedModelAttributes.join(", ")}) passed into finder method options of model ${this.name}, but the options.where object is empty. Did you forget to use options.where?`);
    }
  }
  static _injectDependentVirtualAttributes(attributes) {
    if (!this._hasVirtualAttributes)
      return attributes;
    if (!attributes || !Array.isArray(attributes))
      return attributes;
    for (const attribute of attributes) {
      if (this._virtualAttributes.has(attribute) && this.rawAttributes[attribute].type.fields) {
        attributes = attributes.concat(this.rawAttributes[attribute].type.fields);
      }
    }
    attributes = _.uniq(attributes);
    return attributes;
  }
  static async _findSeparate(results, options) {
    if (!options.include || options.raw || !results)
      return results;
    const original = results;
    if (options.plain)
      results = [results];
    if (!results.length)
      return original;
    await Promise.all(options.include.map(async (include) => {
      if (!include.separate) {
        return await Model._findSeparate(results.reduce((memo, result) => {
          let associations = result.get(include.association.as);
          if (!associations)
            return memo;
          if (!Array.isArray(associations))
            associations = [associations];
          for (let i = 0, len = associations.length; i !== len; ++i) {
            memo.push(associations[i]);
          }
          return memo;
        }, []), __spreadProps(__spreadValues({}, _.omit(options, "include", "attributes", "order", "where", "limit", "offset", "plain", "scope")), {
          include: include.include || []
        }));
      }
      const map = await include.association.get(results, __spreadValues(__spreadValues({}, _.omit(options, nonCascadingOptions)), _.omit(include, ["parent", "association", "as", "originalAttributes"])));
      for (const result of results) {
        result.set(include.association.as, map[result.get(include.association.sourceKey)], { raw: true });
      }
    }));
    return original;
  }
  static async findByPk(param, options) {
    if ([null, void 0].includes(param)) {
      return null;
    }
    options = Utils.cloneDeep(options) || {};
    if (typeof param === "number" || typeof param === "bigint" || typeof param === "string" || Buffer.isBuffer(param)) {
      options.where = {
        [this.primaryKeyAttribute]: param
      };
    } else {
      throw new Error(`Argument passed to findByPk is invalid: ${param}`);
    }
    return await this.findOne(options);
  }
  static async findOne(options) {
    if (options !== void 0 && !_.isPlainObject(options)) {
      throw new Error("The argument passed to findOne must be an options object, use findByPk if you wish to pass a single primary key value");
    }
    options = Utils.cloneDeep(options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    if (options.limit === void 0) {
      const uniqueSingleColumns = _.chain(this.uniqueKeys).values().filter((c) => c.fields.length === 1).map("column").value();
      if (!options.where || !_.some(options.where, (value, key) => (key === this.primaryKeyAttribute || uniqueSingleColumns.includes(key)) && (Utils.isPrimitive(value) || Buffer.isBuffer(value)))) {
        options.limit = 1;
      }
    }
    return await this.findAll(_.defaults(options, {
      plain: true
    }));
  }
  static async aggregate(attribute, aggregateFunction, options) {
    options = Utils.cloneDeep(options);
    const prevAttributes = options.attributes;
    this._injectScope(options);
    options.attributes = prevAttributes;
    this._conformIncludes(options, this);
    if (options.include) {
      this._expandIncludeAll(options);
      this._validateIncludedElements(options);
    }
    const attrOptions = this.rawAttributes[attribute];
    const field = attrOptions && attrOptions.field || attribute;
    let aggregateColumn = this.sequelize.col(field);
    if (options.distinct) {
      aggregateColumn = this.sequelize.fn("DISTINCT", aggregateColumn);
    }
    let { group } = options;
    if (Array.isArray(group) && Array.isArray(group[0])) {
      noDoubleNestedGroup();
      group = _.flatten(group);
    }
    options.attributes = _.unionBy(options.attributes, group, [[this.sequelize.fn(aggregateFunction, aggregateColumn), aggregateFunction]], (a) => Array.isArray(a) ? a[1] : a);
    if (!options.dataType) {
      if (attrOptions) {
        options.dataType = attrOptions.type;
      } else {
        options.dataType = new DataTypes.FLOAT();
      }
    } else {
      options.dataType = this.sequelize.normalizeDataType(options.dataType);
    }
    Utils.mapOptionFieldNames(options, this);
    options = this._paranoidClause(this, options);
    const value = await this.queryInterface.rawSelect(this.getTableName(options), options, aggregateFunction, this);
    return value;
  }
  static async count(options) {
    options = Utils.cloneDeep(options);
    options = _.defaults(options, { hooks: true });
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    options.raw = true;
    if (options.hooks) {
      await this.runHooks("beforeCount", options);
    }
    let col = options.col || "*";
    if (options.include) {
      col = `${this.name}.${options.col || this.primaryKeyField}`;
    }
    if (options.distinct && col === "*") {
      col = this.primaryKeyField;
    }
    options.plain = !options.group;
    options.dataType = new DataTypes.INTEGER();
    options.includeIgnoreAttributes = false;
    options.limit = null;
    options.offset = null;
    options.order = null;
    const result = await this.aggregate(col, "count", options);
    if (Array.isArray(result)) {
      return result.map((item) => __spreadProps(__spreadValues({}, item), {
        count: Number(item.count)
      }));
    }
    return result;
  }
  static async findAndCountAll(options) {
    if (options !== void 0 && !_.isPlainObject(options)) {
      throw new Error("The argument passed to findAndCountAll must be an options object, use findByPk if you wish to pass a single primary key value");
    }
    const countOptions = Utils.cloneDeep(options);
    if (countOptions.attributes) {
      countOptions.attributes = void 0;
    }
    const [count, rows] = await Promise.all([
      this.count(countOptions),
      this.findAll(options)
    ]);
    return {
      count,
      rows: count === 0 ? [] : rows
    };
  }
  static async max(field, options) {
    return await this.aggregate(field, "max", options);
  }
  static async min(field, options) {
    return await this.aggregate(field, "min", options);
  }
  static async sum(field, options) {
    return await this.aggregate(field, "sum", options);
  }
  static build(values, options) {
    if (Array.isArray(values)) {
      return this.bulkBuild(values, options);
    }
    return new this(values, options);
  }
  static bulkBuild(valueSets, options) {
    options = __spreadValues({ isNewRecord: true }, options);
    if (!options.includeValidated) {
      this._conformIncludes(options, this);
      if (options.include) {
        this._expandIncludeAll(options);
        this._validateIncludedElements(options);
      }
    }
    if (options.attributes) {
      options.attributes = options.attributes.map((attribute) => Array.isArray(attribute) ? attribute[1] : attribute);
    }
    return valueSets.map((values) => this.build(values, options));
  }
  static async create(values, options) {
    options = Utils.cloneDeep(options || {});
    return await this.build(values, {
      isNewRecord: true,
      attributes: options.fields,
      include: options.include,
      raw: options.raw,
      silent: options.silent
    }).save(options);
  }
  static async findOrBuild(options) {
    if (!options || !options.where || arguments.length > 1) {
      throw new Error("Missing where attribute in the options parameter passed to findOrBuild. Please note that the API has changed, and is now options only (an object with where, defaults keys, transaction etc.)");
    }
    let values;
    let instance = await this.findOne(options);
    if (instance === null) {
      values = __spreadValues({}, options.defaults);
      if (_.isPlainObject(options.where)) {
        values = Utils.defaults(values, options.where);
      }
      instance = this.build(values, options);
      return [instance, true];
    }
    return [instance, false];
  }
  static async findOrCreate(options) {
    if (!options || !options.where || arguments.length > 1) {
      throw new Error("Missing where attribute in the options parameter passed to findOrCreate. Please note that the API has changed, and is now options only (an object with where, defaults keys, transaction etc.)");
    }
    options = __spreadValues({}, options);
    if (options.defaults) {
      const defaults = Object.keys(options.defaults);
      const unknownDefaults = defaults.filter((name) => !this.rawAttributes[name]);
      if (unknownDefaults.length) {
        logger.warn(`Unknown attributes (${unknownDefaults}) passed to defaults option of findOrCreate`);
      }
    }
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    const internalTransaction = !options.transaction;
    let values;
    let transaction;
    try {
      const t = await this.sequelize.transaction(options);
      transaction = t;
      options.transaction = t;
      const found = await this.findOne(Utils.defaults({ transaction }, options));
      if (found !== null) {
        return [found, false];
      }
      values = __spreadValues({}, options.defaults);
      if (_.isPlainObject(options.where)) {
        values = Utils.defaults(values, options.where);
      }
      options.exception = true;
      options.returning = true;
      try {
        const created = await this.create(values, options);
        if (created.get(this.primaryKeyAttribute, { raw: true }) === null) {
          throw new sequelizeErrors.UniqueConstraintError();
        }
        return [created, true];
      } catch (err) {
        if (!(err instanceof sequelizeErrors.UniqueConstraintError))
          throw err;
        const flattenedWhere = Utils.flattenObjectDeep(options.where);
        const flattenedWhereKeys = Object.keys(flattenedWhere).map((name) => _.last(name.split(".")));
        const whereFields = flattenedWhereKeys.map((name) => _.get(this.rawAttributes, `${name}.field`, name));
        const defaultFields = options.defaults && Object.keys(options.defaults).filter((name) => this.rawAttributes[name]).map((name) => this.rawAttributes[name].field || name);
        const errFieldKeys = Object.keys(err.fields);
        const errFieldsWhereIntersects = Utils.intersects(errFieldKeys, whereFields);
        if (defaultFields && !errFieldsWhereIntersects && Utils.intersects(errFieldKeys, defaultFields)) {
          throw err;
        }
        if (errFieldsWhereIntersects) {
          _.each(err.fields, (value, key) => {
            const name = this.fieldRawAttributesMap[key].fieldName;
            if (value.toString() !== options.where[name].toString()) {
              throw new Error(`${this.name}#findOrCreate: value used for ${name} was not equal for both the find and the create calls, '${options.where[name]}' vs '${value}'`);
            }
          });
        }
        const otherCreated = await this.findOne(Utils.defaults({
          transaction: internalTransaction ? null : transaction
        }, options));
        if (otherCreated === null)
          throw err;
        return [otherCreated, false];
      }
    } finally {
      if (internalTransaction && transaction) {
        await transaction.commit();
      }
    }
  }
  static async findCreateFind(options) {
    if (!options || !options.where) {
      throw new Error("Missing where attribute in the options parameter passed to findCreateFind.");
    }
    let values = __spreadValues({}, options.defaults);
    if (_.isPlainObject(options.where)) {
      values = Utils.defaults(values, options.where);
    }
    const found = await this.findOne(options);
    if (found)
      return [found, false];
    try {
      const createOptions = __spreadValues({}, options);
      if (this.sequelize.options.dialect === "postgres" && options.transaction) {
        createOptions.ignoreDuplicates = true;
      }
      const created = await this.create(values, createOptions);
      return [created, true];
    } catch (err) {
      if (!(err instanceof sequelizeErrors.UniqueConstraintError || err instanceof sequelizeErrors.EmptyResultError)) {
        throw err;
      }
      const foundAgain = await this.findOne(options);
      return [foundAgain, false];
    }
  }
  static async upsert(values, options) {
    options = __spreadValues({
      hooks: true,
      returning: true,
      validate: true
    }, Utils.cloneDeep(options));
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    const createdAtAttr = this._timestampAttributes.createdAt;
    const updatedAtAttr = this._timestampAttributes.updatedAt;
    const hasPrimary = this.primaryKeyField in values || this.primaryKeyAttribute in values;
    const instance = this.build(values);
    options.model = this;
    options.instance = instance;
    const changed = Array.from(instance._changed);
    if (!options.fields) {
      options.fields = changed;
    }
    if (options.validate) {
      await instance.validate(options);
    }
    const updatedDataValues = _.pick(instance.dataValues, changed);
    const insertValues = Utils.mapValueFieldNames(instance.dataValues, Object.keys(instance.rawAttributes), this);
    const updateValues = Utils.mapValueFieldNames(updatedDataValues, options.fields, this);
    const now = Utils.now(this.sequelize.options.dialect);
    if (createdAtAttr && !insertValues[createdAtAttr]) {
      const field = this.rawAttributes[createdAtAttr].field || createdAtAttr;
      insertValues[field] = this._getDefaultTimestamp(createdAtAttr) || now;
    }
    if (updatedAtAttr && !insertValues[updatedAtAttr]) {
      const field = this.rawAttributes[updatedAtAttr].field || updatedAtAttr;
      insertValues[field] = updateValues[field] = this._getDefaultTimestamp(updatedAtAttr) || now;
    }
    if (this.sequelize.options.dialect === "db2") {
      this.uniqno = this.sequelize.dialect.queryGenerator.addUniqueFields(insertValues, this.rawAttributes, this.uniqno);
    }
    if (!hasPrimary && this.primaryKeyAttribute && !this.rawAttributes[this.primaryKeyAttribute].defaultValue) {
      delete insertValues[this.primaryKeyField];
      delete updateValues[this.primaryKeyField];
    }
    if (options.hooks) {
      await this.runHooks("beforeUpsert", values, options);
    }
    const result = await this.queryInterface.upsert(this.getTableName(options), insertValues, updateValues, instance.where(), options);
    const [record] = result;
    record.isNewRecord = false;
    if (options.hooks) {
      await this.runHooks("afterUpsert", result, options);
      return result;
    }
    return result;
  }
  static async bulkCreate(records, options = {}) {
    if (!records.length) {
      return [];
    }
    const dialect = this.sequelize.options.dialect;
    const now = Utils.now(this.sequelize.options.dialect);
    options = Utils.cloneDeep(options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    options.model = this;
    if (!options.includeValidated) {
      this._conformIncludes(options, this);
      if (options.include) {
        this._expandIncludeAll(options);
        this._validateIncludedElements(options);
      }
    }
    const instances = records.map((values) => this.build(values, { isNewRecord: true, include: options.include }));
    const recursiveBulkCreate = async (instances2, options2) => {
      options2 = __spreadValues({
        validate: false,
        hooks: true,
        individualHooks: false,
        ignoreDuplicates: false
      }, options2);
      if (options2.returning === void 0) {
        if (options2.association) {
          options2.returning = false;
        } else {
          options2.returning = true;
        }
      }
      if (options2.ignoreDuplicates && !this.sequelize.dialect.supports.inserts.ignoreDuplicates && !this.sequelize.dialect.supports.inserts.onConflictDoNothing) {
        throw new Error(`${dialect} does not support the ignoreDuplicates option.`);
      }
      if (options2.updateOnDuplicate && (dialect !== "mysql" && dialect !== "mariadb" && dialect !== "sqlite" && dialect !== "postgres")) {
        throw new Error(`${dialect} does not support the updateOnDuplicate option.`);
      }
      const model = options2.model;
      options2.fields = options2.fields || Object.keys(model.rawAttributes);
      const createdAtAttr = model._timestampAttributes.createdAt;
      const updatedAtAttr = model._timestampAttributes.updatedAt;
      if (options2.updateOnDuplicate !== void 0) {
        if (Array.isArray(options2.updateOnDuplicate) && options2.updateOnDuplicate.length) {
          options2.updateOnDuplicate = _.intersection(_.without(Object.keys(model.tableAttributes), createdAtAttr), options2.updateOnDuplicate);
        } else {
          throw new Error("updateOnDuplicate option only supports non-empty array.");
        }
      }
      if (options2.hooks) {
        await model.runHooks("beforeBulkCreate", instances2, options2);
      }
      if (options2.validate) {
        const errors = [];
        const validateOptions = __spreadValues({}, options2);
        validateOptions.hooks = options2.individualHooks;
        await Promise.all(instances2.map(async (instance) => {
          try {
            await instance.validate(validateOptions);
          } catch (err) {
            errors.push(new sequelizeErrors.BulkRecordError(err, instance));
          }
        }));
        delete options2.skip;
        if (errors.length) {
          throw new sequelizeErrors.AggregateError(errors);
        }
      }
      if (options2.individualHooks) {
        await Promise.all(instances2.map(async (instance) => {
          const individualOptions = __spreadProps(__spreadValues({}, options2), {
            validate: false,
            hooks: true
          });
          delete individualOptions.fields;
          delete individualOptions.individualHooks;
          delete individualOptions.ignoreDuplicates;
          await instance.save(individualOptions);
        }));
      } else {
        if (options2.include && options2.include.length) {
          await Promise.all(options2.include.filter((include) => include.association instanceof BelongsTo).map(async (include) => {
            const associationInstances = [];
            const associationInstanceIndexToInstanceMap = [];
            for (const instance of instances2) {
              const associationInstance = instance.get(include.as);
              if (associationInstance) {
                associationInstances.push(associationInstance);
                associationInstanceIndexToInstanceMap.push(instance);
              }
            }
            if (!associationInstances.length) {
              return;
            }
            const includeOptions = _(Utils.cloneDeep(include)).omit(["association"]).defaults({
              transaction: options2.transaction,
              logging: options2.logging
            }).value();
            const createdAssociationInstances = await recursiveBulkCreate(associationInstances, includeOptions);
            for (const idx in createdAssociationInstances) {
              const associationInstance = createdAssociationInstances[idx];
              const instance = associationInstanceIndexToInstanceMap[idx];
              await include.association.set(instance, associationInstance, { save: false, logging: options2.logging });
            }
          }));
        }
        records = instances2.map((instance) => {
          const values = instance.dataValues;
          if (createdAtAttr && !values[createdAtAttr]) {
            values[createdAtAttr] = now;
            if (!options2.fields.includes(createdAtAttr)) {
              options2.fields.push(createdAtAttr);
            }
          }
          if (updatedAtAttr && !values[updatedAtAttr]) {
            values[updatedAtAttr] = now;
            if (!options2.fields.includes(updatedAtAttr)) {
              options2.fields.push(updatedAtAttr);
            }
          }
          const out = Utils.mapValueFieldNames(values, options2.fields, model);
          for (const key of model._virtualAttributes) {
            delete out[key];
          }
          return out;
        });
        const fieldMappedAttributes = {};
        for (const attr in model.tableAttributes) {
          fieldMappedAttributes[model.rawAttributes[attr].field || attr] = model.rawAttributes[attr];
        }
        if (options2.updateOnDuplicate) {
          options2.updateOnDuplicate = options2.updateOnDuplicate.map((attr) => model.rawAttributes[attr].field || attr);
          if (options2.conflictAttributes) {
            options2.upsertKeys = options2.conflictAttributes.map((attrName) => model.rawAttributes[attrName].field || attrName);
          } else {
            const upsertKeys = [];
            for (const i of model._indexes) {
              if (i.unique && !i.where) {
                upsertKeys.push(...i.fields);
              }
            }
            const firstUniqueKey = Object.values(model.uniqueKeys).find((c) => c.fields.length > 0);
            if (firstUniqueKey && firstUniqueKey.fields) {
              upsertKeys.push(...firstUniqueKey.fields);
            }
            options2.upsertKeys = upsertKeys.length > 0 ? upsertKeys : Object.values(model.primaryKeys).map((x) => x.field);
          }
        }
        if (options2.returning && Array.isArray(options2.returning)) {
          options2.returning = options2.returning.map((attr) => _.get(model.rawAttributes[attr], "field", attr));
        }
        const results = await model.queryInterface.bulkInsert(model.getTableName(options2), records, options2, fieldMappedAttributes);
        if (Array.isArray(results)) {
          results.forEach((result, i) => {
            const instance = instances2[i];
            for (const key in result) {
              if (!instance || key === model.primaryKeyAttribute && instance.get(model.primaryKeyAttribute) && ["mysql", "mariadb", "sqlite"].includes(dialect)) {
                continue;
              }
              if (Object.prototype.hasOwnProperty.call(result, key)) {
                const record = result[key];
                const attr = _.find(model.rawAttributes, (attribute) => attribute.fieldName === key || attribute.field === key);
                instance.dataValues[attr && attr.fieldName || key] = record;
              }
            }
          });
        }
      }
      if (options2.include && options2.include.length) {
        await Promise.all(options2.include.filter((include) => !(include.association instanceof BelongsTo || include.parent && include.parent.association instanceof BelongsToMany)).map(async (include) => {
          const associationInstances = [];
          const associationInstanceIndexToInstanceMap = [];
          for (const instance of instances2) {
            let associated = instance.get(include.as);
            if (!Array.isArray(associated))
              associated = [associated];
            for (const associationInstance of associated) {
              if (associationInstance) {
                if (!(include.association instanceof BelongsToMany)) {
                  associationInstance.set(include.association.foreignKey, instance.get(include.association.sourceKey || instance.constructor.primaryKeyAttribute, { raw: true }), { raw: true });
                  Object.assign(associationInstance, include.association.scope);
                }
                associationInstances.push(associationInstance);
                associationInstanceIndexToInstanceMap.push(instance);
              }
            }
          }
          if (!associationInstances.length) {
            return;
          }
          const includeOptions = _(Utils.cloneDeep(include)).omit(["association"]).defaults({
            transaction: options2.transaction,
            logging: options2.logging
          }).value();
          const createdAssociationInstances = await recursiveBulkCreate(associationInstances, includeOptions);
          if (include.association instanceof BelongsToMany) {
            const valueSets = [];
            for (const idx in createdAssociationInstances) {
              const associationInstance = createdAssociationInstances[idx];
              const instance = associationInstanceIndexToInstanceMap[idx];
              const values = __spreadValues({
                [include.association.foreignKey]: instance.get(instance.constructor.primaryKeyAttribute, { raw: true }),
                [include.association.otherKey]: associationInstance.get(associationInstance.constructor.primaryKeyAttribute, { raw: true })
              }, include.association.through.scope);
              if (associationInstance[include.association.through.model.name]) {
                for (const attr of Object.keys(include.association.through.model.rawAttributes)) {
                  if (include.association.through.model.rawAttributes[attr]._autoGenerated || attr === include.association.foreignKey || attr === include.association.otherKey || typeof associationInstance[include.association.through.model.name][attr] === "undefined") {
                    continue;
                  }
                  values[attr] = associationInstance[include.association.through.model.name][attr];
                }
              }
              valueSets.push(values);
            }
            const throughOptions = _(Utils.cloneDeep(include)).omit(["association", "attributes"]).defaults({
              transaction: options2.transaction,
              logging: options2.logging
            }).value();
            throughOptions.model = include.association.throughModel;
            const throughInstances = include.association.throughModel.bulkBuild(valueSets, throughOptions);
            await recursiveBulkCreate(throughInstances, throughOptions);
          }
        }));
      }
      instances2.forEach((instance) => {
        for (const attr in model.rawAttributes) {
          if (model.rawAttributes[attr].field && instance.dataValues[model.rawAttributes[attr].field] !== void 0 && model.rawAttributes[attr].field !== attr) {
            instance.dataValues[attr] = instance.dataValues[model.rawAttributes[attr].field];
            delete instance.dataValues[model.rawAttributes[attr].field];
          }
          instance._previousDataValues[attr] = instance.dataValues[attr];
          instance.changed(attr, false);
        }
        instance.isNewRecord = false;
      });
      if (options2.hooks) {
        await model.runHooks("afterBulkCreate", instances2, options2);
      }
      return instances2;
    };
    return await recursiveBulkCreate(instances, options);
  }
  static async truncate(options) {
    options = Utils.cloneDeep(options) || {};
    options.truncate = true;
    return await this.destroy(options);
  }
  static async destroy(options) {
    options = Utils.cloneDeep(options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    this._injectScope(options);
    if (!options || !(options.where || options.truncate)) {
      throw new Error("Missing where or truncate attribute in the options parameter of model.destroy.");
    }
    if (!options.truncate && !_.isPlainObject(options.where) && !Array.isArray(options.where) && !(options.where instanceof Utils.SequelizeMethod)) {
      throw new Error("Expected plain object, array or sequelize method in the options.where parameter of model.destroy.");
    }
    options = _.defaults(options, {
      hooks: true,
      individualHooks: false,
      force: false,
      cascade: false,
      restartIdentity: false
    });
    options.type = QueryTypes.BULKDELETE;
    Utils.mapOptionFieldNames(options, this);
    options.model = this;
    if (options.hooks) {
      await this.runHooks("beforeBulkDestroy", options);
    }
    let instances;
    if (options.individualHooks) {
      instances = await this.findAll({ where: options.where, transaction: options.transaction, logging: options.logging, benchmark: options.benchmark });
      await Promise.all(instances.map((instance) => this.runHooks("beforeDestroy", instance, options)));
    }
    let result;
    if (this._timestampAttributes.deletedAt && !options.force) {
      options.type = QueryTypes.BULKUPDATE;
      const attrValueHash = {};
      const deletedAtAttribute = this.rawAttributes[this._timestampAttributes.deletedAt];
      const field = this.rawAttributes[this._timestampAttributes.deletedAt].field;
      const where = {
        [field]: Object.prototype.hasOwnProperty.call(deletedAtAttribute, "defaultValue") ? deletedAtAttribute.defaultValue : null
      };
      attrValueHash[field] = Utils.now(this.sequelize.options.dialect);
      result = await this.queryInterface.bulkUpdate(this.getTableName(options), attrValueHash, Object.assign(where, options.where), options, this.rawAttributes);
    } else {
      result = await this.queryInterface.bulkDelete(this.getTableName(options), options.where, options, this);
    }
    if (options.individualHooks) {
      await Promise.all(instances.map((instance) => this.runHooks("afterDestroy", instance, options)));
    }
    if (options.hooks) {
      await this.runHooks("afterBulkDestroy", options);
    }
    return result;
  }
  static async restore(options) {
    if (!this._timestampAttributes.deletedAt)
      throw new Error("Model is not paranoid");
    options = __spreadValues({
      hooks: true,
      individualHooks: false
    }, options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    options.type = QueryTypes.RAW;
    options.model = this;
    Utils.mapOptionFieldNames(options, this);
    if (options.hooks) {
      await this.runHooks("beforeBulkRestore", options);
    }
    let instances;
    if (options.individualHooks) {
      instances = await this.findAll({ where: options.where, transaction: options.transaction, logging: options.logging, benchmark: options.benchmark, paranoid: false });
      await Promise.all(instances.map((instance) => this.runHooks("beforeRestore", instance, options)));
    }
    const attrValueHash = {};
    const deletedAtCol = this._timestampAttributes.deletedAt;
    const deletedAtAttribute = this.rawAttributes[deletedAtCol];
    const deletedAtDefaultValue = Object.prototype.hasOwnProperty.call(deletedAtAttribute, "defaultValue") ? deletedAtAttribute.defaultValue : null;
    attrValueHash[deletedAtAttribute.field || deletedAtCol] = deletedAtDefaultValue;
    options.omitNull = false;
    const result = await this.queryInterface.bulkUpdate(this.getTableName(options), attrValueHash, options.where, options, this.rawAttributes);
    if (options.individualHooks) {
      await Promise.all(instances.map((instance) => this.runHooks("afterRestore", instance, options)));
    }
    if (options.hooks) {
      await this.runHooks("afterBulkRestore", options);
    }
    return result;
  }
  static async update(values, options) {
    options = Utils.cloneDeep(options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    this._injectScope(options);
    this._optionsMustContainWhere(options);
    options = this._paranoidClause(this, _.defaults(options, {
      validate: true,
      hooks: true,
      individualHooks: false,
      returning: false,
      force: false,
      sideEffects: true
    }));
    options.type = QueryTypes.BULKUPDATE;
    values = _.omitBy(values, (value) => value === void 0);
    if (options.fields && options.fields instanceof Array) {
      for (const key of Object.keys(values)) {
        if (!options.fields.includes(key)) {
          delete values[key];
        }
      }
    } else {
      const updatedAtAttr = this._timestampAttributes.updatedAt;
      options.fields = _.intersection(Object.keys(values), Object.keys(this.tableAttributes));
      if (updatedAtAttr && !options.fields.includes(updatedAtAttr)) {
        options.fields.push(updatedAtAttr);
      }
    }
    if (this._timestampAttributes.updatedAt && !options.silent) {
      values[this._timestampAttributes.updatedAt] = this._getDefaultTimestamp(this._timestampAttributes.updatedAt) || Utils.now(this.sequelize.options.dialect);
    }
    options.model = this;
    let valuesUse;
    if (options.validate) {
      const build = this.build(values);
      build.set(this._timestampAttributes.updatedAt, values[this._timestampAttributes.updatedAt], { raw: true });
      if (options.sideEffects) {
        Object.assign(values, _.pick(build.get(), build.changed()));
        options.fields = _.union(options.fields, Object.keys(values));
      }
      options.skip = _.difference(Object.keys(this.rawAttributes), Object.keys(values));
      const attributes = await build.validate(options);
      options.skip = void 0;
      if (attributes && attributes.dataValues) {
        values = _.pick(attributes.dataValues, Object.keys(values));
      }
    }
    if (options.hooks) {
      options.attributes = values;
      await this.runHooks("beforeBulkUpdate", options);
      values = options.attributes;
      delete options.attributes;
    }
    valuesUse = values;
    let instances;
    let updateDoneRowByRow = false;
    if (options.individualHooks) {
      instances = await this.findAll({
        where: options.where,
        transaction: options.transaction,
        logging: options.logging,
        benchmark: options.benchmark,
        paranoid: options.paranoid
      });
      if (instances.length) {
        let changedValues;
        let different = false;
        instances = await Promise.all(instances.map(async (instance) => {
          Object.assign(instance.dataValues, values);
          _.forIn(valuesUse, (newValue, attr) => {
            if (newValue !== instance._previousDataValues[attr]) {
              instance.setDataValue(attr, newValue);
            }
          });
          await this.runHooks("beforeUpdate", instance, options);
          if (!different) {
            const thisChangedValues = {};
            _.forIn(instance.dataValues, (newValue, attr) => {
              if (newValue !== instance._previousDataValues[attr]) {
                thisChangedValues[attr] = newValue;
              }
            });
            if (!changedValues) {
              changedValues = thisChangedValues;
            } else {
              different = !_.isEqual(changedValues, thisChangedValues);
            }
          }
          return instance;
        }));
        if (!different) {
          const keys = Object.keys(changedValues);
          if (keys.length) {
            valuesUse = changedValues;
            options.fields = _.union(options.fields, keys);
          }
        } else {
          instances = await Promise.all(instances.map(async (instance) => {
            const individualOptions = __spreadProps(__spreadValues({}, options), {
              hooks: false,
              validate: false
            });
            delete individualOptions.individualHooks;
            return instance.save(individualOptions);
          }));
          updateDoneRowByRow = true;
        }
      }
    }
    let result;
    if (updateDoneRowByRow) {
      result = [instances.length, instances];
    } else if (_.isEmpty(valuesUse) || Object.keys(valuesUse).length === 1 && valuesUse[this._timestampAttributes.updatedAt]) {
      result = [0];
    } else {
      valuesUse = Utils.mapValueFieldNames(valuesUse, options.fields, this);
      options = Utils.mapOptionFieldNames(options, this);
      options.hasTrigger = this.options ? this.options.hasTrigger : false;
      const affectedRows = await this.queryInterface.bulkUpdate(this.getTableName(options), valuesUse, options.where, options, this.tableAttributes);
      if (options.returning) {
        result = [affectedRows.length, affectedRows];
        instances = affectedRows;
      } else {
        result = [affectedRows];
      }
    }
    if (options.individualHooks) {
      await Promise.all(instances.map((instance) => this.runHooks("afterUpdate", instance, options)));
      result[1] = instances;
    }
    if (options.hooks) {
      options.attributes = values;
      await this.runHooks("afterBulkUpdate", options);
      delete options.attributes;
    }
    return result;
  }
  static async describe(schema, options) {
    return await this.queryInterface.describeTable(this.tableName, __spreadValues({ schema: schema || this._schema || void 0 }, options));
  }
  static _getDefaultTimestamp(attr) {
    if (!!this.rawAttributes[attr] && !!this.rawAttributes[attr].defaultValue) {
      return Utils.toDefaultValue(this.rawAttributes[attr].defaultValue, this.sequelize.options.dialect);
    }
    return void 0;
  }
  static _expandAttributes(options) {
    if (!_.isPlainObject(options.attributes)) {
      return;
    }
    let attributes = Object.keys(this.rawAttributes);
    if (options.attributes.exclude) {
      attributes = attributes.filter((elem) => !options.attributes.exclude.includes(elem));
    }
    if (options.attributes.include) {
      attributes = attributes.concat(options.attributes.include);
    }
    options.attributes = attributes;
  }
  static _injectScope(options) {
    const scope = Utils.cloneDeep(this._scope);
    this._defaultsOptions(options, scope);
  }
  static [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.name;
  }
  static hasAlias(alias) {
    return Object.prototype.hasOwnProperty.call(this.associations, alias);
  }
  static async increment(fields, options) {
    options = options || {};
    if (typeof fields === "string")
      fields = [fields];
    if (Array.isArray(fields)) {
      fields = fields.map((f) => {
        if (this.rawAttributes[f] && this.rawAttributes[f].field && this.rawAttributes[f].field !== f) {
          return this.rawAttributes[f].field;
        }
        return f;
      });
    } else if (fields && typeof fields === "object") {
      fields = Object.keys(fields).reduce((rawFields, f) => {
        if (this.rawAttributes[f] && this.rawAttributes[f].field && this.rawAttributes[f].field !== f) {
          rawFields[this.rawAttributes[f].field] = fields[f];
        } else {
          rawFields[f] = fields[f];
        }
        return rawFields;
      }, {});
    }
    this._injectScope(options);
    this._optionsMustContainWhere(options);
    options = Utils.defaults({}, options, {
      by: 1,
      where: {},
      increment: true
    });
    const isSubtraction = !options.increment;
    Utils.mapOptionFieldNames(options, this);
    const where = __spreadValues({}, options.where);
    let incrementAmountsByField = {};
    if (Array.isArray(fields)) {
      incrementAmountsByField = {};
      for (const field of fields) {
        incrementAmountsByField[field] = options.by;
      }
    } else {
      incrementAmountsByField = fields;
    }
    if (this._versionAttribute) {
      incrementAmountsByField[this._versionAttribute] = isSubtraction ? -1 : 1;
    }
    const extraAttributesToBeUpdated = {};
    const updatedAtAttr = this._timestampAttributes.updatedAt;
    if (!options.silent && updatedAtAttr && !incrementAmountsByField[updatedAtAttr]) {
      const attrName = this.rawAttributes[updatedAtAttr].field || updatedAtAttr;
      extraAttributesToBeUpdated[attrName] = this._getDefaultTimestamp(updatedAtAttr) || Utils.now(this.sequelize.options.dialect);
    }
    const tableName = this.getTableName(options);
    let affectedRows;
    if (isSubtraction) {
      affectedRows = await this.queryInterface.decrement(this, tableName, where, incrementAmountsByField, extraAttributesToBeUpdated, options);
    } else {
      affectedRows = await this.queryInterface.increment(this, tableName, where, incrementAmountsByField, extraAttributesToBeUpdated, options);
    }
    if (options.returning) {
      return [affectedRows, affectedRows.length];
    }
    return [affectedRows];
  }
  static async decrement(fields, options) {
    return this.increment(fields, __spreadProps(__spreadValues({
      by: 1
    }, options), {
      increment: false
    }));
  }
  static _optionsMustContainWhere(options) {
    assert(options && options.where, "Missing where attribute in the options parameter");
    assert(_.isPlainObject(options.where) || Array.isArray(options.where) || options.where instanceof Utils.SequelizeMethod, "Expected plain object, array or sequelize method in the options.where parameter");
  }
  where(checkVersion) {
    const where = this.constructor.primaryKeyAttributes.reduce((result, attribute) => {
      result[attribute] = this.get(attribute, { raw: true });
      return result;
    }, {});
    if (_.size(where) === 0) {
      return this.constructor.options.whereCollection;
    }
    const versionAttr = this.constructor._versionAttribute;
    if (checkVersion && versionAttr) {
      where[versionAttr] = this.get(versionAttr, { raw: true });
    }
    return Utils.mapWhereFieldNames(where, this.constructor);
  }
  toString() {
    return `[object SequelizeInstance:${this.constructor.name}]`;
  }
  getDataValue(key) {
    return this.dataValues[key];
  }
  setDataValue(key, value) {
    const originalValue = this._previousDataValues[key];
    if (!_.isEqual(value, originalValue)) {
      this.changed(key, true);
    }
    this.dataValues[key] = value;
  }
  get(key, options) {
    if (options === void 0 && typeof key === "object") {
      options = key;
      key = void 0;
    }
    options = options || {};
    if (key) {
      if (Object.prototype.hasOwnProperty.call(this._customGetters, key) && !options.raw) {
        return this._customGetters[key].call(this, key, options);
      }
      if (options.plain && this._options.include && this._options.includeNames.includes(key)) {
        if (Array.isArray(this.dataValues[key])) {
          return this.dataValues[key].map((instance) => instance.get(options));
        }
        if (this.dataValues[key] instanceof Model) {
          return this.dataValues[key].get(options);
        }
        return this.dataValues[key];
      }
      return this.dataValues[key];
    }
    if (this._hasCustomGetters || options.plain && this._options.include || options.clone) {
      const values = {};
      let _key;
      if (this._hasCustomGetters) {
        for (_key in this._customGetters) {
          if (this._options.attributes && !this._options.attributes.includes(_key)) {
            continue;
          }
          if (Object.prototype.hasOwnProperty.call(this._customGetters, _key)) {
            values[_key] = this.get(_key, options);
          }
        }
      }
      for (_key in this.dataValues) {
        if (!Object.prototype.hasOwnProperty.call(values, _key) && Object.prototype.hasOwnProperty.call(this.dataValues, _key)) {
          values[_key] = this.get(_key, options);
        }
      }
      return values;
    }
    return this.dataValues;
  }
  set(key, value, options) {
    let values;
    let originalValue;
    if (typeof key === "object" && key !== null) {
      values = key;
      options = value || {};
      if (options.reset) {
        this.dataValues = {};
        for (const key2 in values) {
          this.changed(key2, false);
        }
      }
      if (options.raw && !(this._options && this._options.include) && !(options && options.attributes) && !this.constructor._hasDateAttributes && !this.constructor._hasBooleanAttributes) {
        if (Object.keys(this.dataValues).length) {
          Object.assign(this.dataValues, values);
        } else {
          this.dataValues = values;
        }
        this._previousDataValues = __spreadValues({}, this.dataValues);
      } else {
        if (options.attributes) {
          const setKeys = (data) => {
            for (const k of data) {
              if (values[k] === void 0) {
                continue;
              }
              this.set(k, values[k], options);
            }
          };
          setKeys(options.attributes);
          if (this.constructor._hasVirtualAttributes) {
            setKeys(this.constructor._virtualAttributes);
          }
          if (this._options.includeNames) {
            setKeys(this._options.includeNames);
          }
        } else {
          for (const key2 in values) {
            this.set(key2, values[key2], options);
          }
        }
        if (options.raw) {
          this._previousDataValues = __spreadValues({}, this.dataValues);
        }
      }
      return this;
    }
    if (!options)
      options = {};
    if (!options.raw) {
      originalValue = this.dataValues[key];
    }
    if (!options.raw && this._customSetters[key]) {
      this._customSetters[key].call(this, value, key);
      const newValue = this.dataValues[key];
      if (!_.isEqual(newValue, originalValue)) {
        this._previousDataValues[key] = originalValue;
        this.changed(key, true);
      }
    } else {
      if (this._options && this._options.include && this._options.includeNames.includes(key)) {
        this._setInclude(key, value, options);
        return this;
      }
      if (!options.raw) {
        if (!this._isAttribute(key)) {
          if (key.includes(".") && this.constructor._jsonAttributes.has(key.split(".")[0])) {
            const previousNestedValue = Dottie.get(this.dataValues, key);
            if (!_.isEqual(previousNestedValue, value)) {
              Dottie.set(this.dataValues, key, value);
              this.changed(key.split(".")[0], true);
            }
          }
          return this;
        }
        if (this.constructor._hasPrimaryKeys && originalValue && this.constructor._isPrimaryKey(key)) {
          return this;
        }
        if (!this.isNewRecord && this.constructor._hasReadOnlyAttributes && this.constructor._readOnlyAttributes.has(key)) {
          return this;
        }
      }
      if (!(value instanceof Utils.SequelizeMethod) && Object.prototype.hasOwnProperty.call(this.constructor._dataTypeSanitizers, key)) {
        value = this.constructor._dataTypeSanitizers[key].call(this, value, options);
      }
      if (!options.raw && (value instanceof Utils.SequelizeMethod || !(value instanceof Utils.SequelizeMethod) && this.constructor._dataTypeChanges[key] && this.constructor._dataTypeChanges[key].call(this, value, originalValue, options) || !this.constructor._dataTypeChanges[key] && !_.isEqual(value, originalValue))) {
        this._previousDataValues[key] = originalValue;
        this.changed(key, true);
      }
      this.dataValues[key] = value;
    }
    return this;
  }
  setAttributes(updates) {
    return this.set(updates);
  }
  changed(key, value) {
    if (key === void 0) {
      if (this._changed.size > 0) {
        return Array.from(this._changed);
      }
      return false;
    }
    if (value === true) {
      this._changed.add(key);
      return this;
    }
    if (value === false) {
      this._changed.delete(key);
      return this;
    }
    return this._changed.has(key);
  }
  previous(key) {
    if (key) {
      return this._previousDataValues[key];
    }
    return _.pickBy(this._previousDataValues, (value, key2) => this.changed(key2));
  }
  _setInclude(key, value, options) {
    if (!Array.isArray(value))
      value = [value];
    if (value[0] instanceof Model) {
      value = value.map((instance) => instance.dataValues);
    }
    const include = this._options.includeMap[key];
    const association = include.association;
    const accessor = key;
    const primaryKeyAttribute = include.model.primaryKeyAttribute;
    const childOptions = {
      isNewRecord: this.isNewRecord,
      include: include.include,
      includeNames: include.includeNames,
      includeMap: include.includeMap,
      includeValidated: true,
      raw: options.raw,
      attributes: include.originalAttributes
    };
    let isEmpty;
    if (include.originalAttributes === void 0 || include.originalAttributes.length) {
      if (association.isSingleAssociation) {
        if (Array.isArray(value)) {
          value = value[0];
        }
        isEmpty = value && value[primaryKeyAttribute] === null || value === null;
        this[accessor] = this.dataValues[accessor] = isEmpty ? null : include.model.build(value, childOptions);
      } else {
        isEmpty = value[0] && value[0][primaryKeyAttribute] === null;
        this[accessor] = this.dataValues[accessor] = isEmpty ? [] : include.model.bulkBuild(value, childOptions);
      }
    }
  }
  async save(options) {
    if (arguments.length > 1) {
      throw new Error("The second argument was removed in favor of the options object.");
    }
    options = Utils.cloneDeep(options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    options = _.defaults(options, {
      hooks: true,
      validate: true
    });
    if (!options.fields) {
      if (this.isNewRecord) {
        options.fields = Object.keys(this.constructor.rawAttributes);
      } else {
        options.fields = _.intersection(this.changed(), Object.keys(this.constructor.rawAttributes));
      }
      options.defaultFields = options.fields;
    }
    if (options.returning === void 0) {
      if (options.association) {
        options.returning = false;
      } else if (this.isNewRecord) {
        options.returning = true;
      }
    }
    const primaryKeyName = this.constructor.primaryKeyAttribute;
    const primaryKeyAttribute = primaryKeyName && this.constructor.rawAttributes[primaryKeyName];
    const createdAtAttr = this.constructor._timestampAttributes.createdAt;
    const versionAttr = this.constructor._versionAttribute;
    const hook = this.isNewRecord ? "Create" : "Update";
    const wasNewRecord = this.isNewRecord;
    const now = Utils.now(this.sequelize.options.dialect);
    let updatedAtAttr = this.constructor._timestampAttributes.updatedAt;
    if (updatedAtAttr && options.fields.length > 0 && !options.fields.includes(updatedAtAttr)) {
      options.fields.push(updatedAtAttr);
    }
    if (versionAttr && options.fields.length > 0 && !options.fields.includes(versionAttr)) {
      options.fields.push(versionAttr);
    }
    if (options.silent === true && !(this.isNewRecord && this.get(updatedAtAttr, { raw: true }))) {
      _.remove(options.fields, (val) => val === updatedAtAttr);
      updatedAtAttr = false;
    }
    if (this.isNewRecord === true) {
      if (createdAtAttr && !options.fields.includes(createdAtAttr)) {
        options.fields.push(createdAtAttr);
      }
      if (primaryKeyAttribute && primaryKeyAttribute.defaultValue && !options.fields.includes(primaryKeyName)) {
        options.fields.unshift(primaryKeyName);
      }
    }
    if (this.isNewRecord === false) {
      if (primaryKeyName && this.get(primaryKeyName, { raw: true }) === void 0) {
        throw new Error("You attempted to save an instance with no primary key, this is not allowed since it would result in a global update");
      }
    }
    if (updatedAtAttr && !options.silent && options.fields.includes(updatedAtAttr)) {
      this.dataValues[updatedAtAttr] = this.constructor._getDefaultTimestamp(updatedAtAttr) || now;
    }
    if (this.isNewRecord && createdAtAttr && !this.dataValues[createdAtAttr]) {
      this.dataValues[createdAtAttr] = this.constructor._getDefaultTimestamp(createdAtAttr) || now;
    }
    if (this.sequelize.options.dialect === "db2" && this.isNewRecord) {
      this.uniqno = this.sequelize.dialect.queryGenerator.addUniqueFields(this.dataValues, this.constructor.rawAttributes, this.uniqno);
    }
    if (options.validate) {
      await this.validate(options);
    }
    if (options.hooks) {
      const beforeHookValues = _.pick(this.dataValues, options.fields);
      let ignoreChanged = _.difference(this.changed(), options.fields);
      let hookChanged;
      let afterHookValues;
      if (updatedAtAttr && options.fields.includes(updatedAtAttr)) {
        ignoreChanged = _.without(ignoreChanged, updatedAtAttr);
      }
      await this.constructor.runHooks(`before${hook}`, this, options);
      if (options.defaultFields && !this.isNewRecord) {
        afterHookValues = _.pick(this.dataValues, _.difference(this.changed(), ignoreChanged));
        hookChanged = [];
        for (const key of Object.keys(afterHookValues)) {
          if (afterHookValues[key] !== beforeHookValues[key]) {
            hookChanged.push(key);
          }
        }
        options.fields = _.uniq(options.fields.concat(hookChanged));
      }
      if (hookChanged) {
        if (options.validate) {
          options.skip = _.difference(Object.keys(this.constructor.rawAttributes), hookChanged);
          await this.validate(options);
          delete options.skip;
        }
      }
    }
    if (options.fields.length && this.isNewRecord && this._options.include && this._options.include.length) {
      await Promise.all(this._options.include.filter((include) => include.association instanceof BelongsTo).map(async (include) => {
        const instance = this.get(include.as);
        if (!instance)
          return;
        const includeOptions = _(Utils.cloneDeep(include)).omit(["association"]).defaults({
          transaction: options.transaction,
          logging: options.logging,
          parentRecord: this
        }).value();
        await instance.save(includeOptions);
        await this[include.association.accessors.set](instance, { save: false, logging: options.logging });
      }));
    }
    const realFields = options.fields.filter((field) => !this.constructor._virtualAttributes.has(field));
    if (!realFields.length)
      return this;
    if (!this.changed() && !this.isNewRecord)
      return this;
    const versionFieldName = _.get(this.constructor.rawAttributes[versionAttr], "field") || versionAttr;
    const values = Utils.mapValueFieldNames(this.dataValues, options.fields, this.constructor);
    let query = null;
    let args = [];
    let where;
    if (this.isNewRecord) {
      query = "insert";
      args = [this, this.constructor.getTableName(options), values, options];
    } else {
      where = this.where(true);
      if (versionAttr) {
        values[versionFieldName] = parseInt(values[versionFieldName], 10) + 1;
      }
      query = "update";
      args = [this, this.constructor.getTableName(options), values, where, options];
    }
    const [result, rowsUpdated] = await this.constructor.queryInterface[query](...args);
    if (versionAttr) {
      if (rowsUpdated < 1) {
        throw new sequelizeErrors.OptimisticLockError({
          modelName: this.constructor.name,
          values,
          where
        });
      } else {
        result.dataValues[versionAttr] = values[versionFieldName];
      }
    }
    for (const attr of Object.keys(this.constructor.rawAttributes)) {
      if (this.constructor.rawAttributes[attr].field && values[this.constructor.rawAttributes[attr].field] !== void 0 && this.constructor.rawAttributes[attr].field !== attr) {
        values[attr] = values[this.constructor.rawAttributes[attr].field];
        delete values[this.constructor.rawAttributes[attr].field];
      }
    }
    Object.assign(values, result.dataValues);
    Object.assign(result.dataValues, values);
    if (wasNewRecord && this._options.include && this._options.include.length) {
      await Promise.all(this._options.include.filter((include) => !(include.association instanceof BelongsTo || include.parent && include.parent.association instanceof BelongsToMany)).map(async (include) => {
        let instances = this.get(include.as);
        if (!instances)
          return;
        if (!Array.isArray(instances))
          instances = [instances];
        const includeOptions = _(Utils.cloneDeep(include)).omit(["association"]).defaults({
          transaction: options.transaction,
          logging: options.logging,
          parentRecord: this
        }).value();
        await Promise.all(instances.map(async (instance) => {
          if (include.association instanceof BelongsToMany) {
            await instance.save(includeOptions);
            const values0 = __spreadValues({
              [include.association.foreignKey]: this.get(this.constructor.primaryKeyAttribute, { raw: true }),
              [include.association.otherKey]: instance.get(instance.constructor.primaryKeyAttribute, { raw: true })
            }, include.association.through.scope);
            if (instance[include.association.through.model.name]) {
              for (const attr of Object.keys(include.association.through.model.rawAttributes)) {
                if (include.association.through.model.rawAttributes[attr]._autoGenerated || attr === include.association.foreignKey || attr === include.association.otherKey || typeof instance[include.association.through.model.name][attr] === "undefined") {
                  continue;
                }
                values0[attr] = instance[include.association.through.model.name][attr];
              }
            }
            await include.association.throughModel.create(values0, includeOptions);
          } else {
            instance.set(include.association.foreignKey, this.get(include.association.sourceKey || this.constructor.primaryKeyAttribute, { raw: true }), { raw: true });
            Object.assign(instance, include.association.scope);
            await instance.save(includeOptions);
          }
        }));
      }));
    }
    if (options.hooks) {
      await this.constructor.runHooks(`after${hook}`, result, options);
    }
    for (const field of options.fields) {
      result._previousDataValues[field] = result.dataValues[field];
      this.changed(field, false);
    }
    this.isNewRecord = false;
    return result;
  }
  async reload(options) {
    options = Utils.defaults({
      where: this.where()
    }, options, {
      include: this._options.include || void 0
    });
    const reloaded = await this.constructor.findOne(options);
    if (!reloaded) {
      throw new sequelizeErrors.InstanceError("Instance could not be reloaded because it does not exist anymore (find call returned null)");
    }
    this._options = reloaded._options;
    this.set(reloaded.dataValues, {
      raw: true,
      reset: !options.attributes
    });
    return this;
  }
  async validate(options) {
    return new InstanceValidator(this, options).validate();
  }
  async update(values, options) {
    values = _.omitBy(values, (value) => value === void 0);
    const changedBefore = this.changed() || [];
    options = options || {};
    if (Array.isArray(options))
      options = { fields: options };
    options = Utils.cloneDeep(options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    const setOptions = Utils.cloneDeep(options);
    setOptions.attributes = options.fields;
    this.set(values, setOptions);
    const sideEffects = _.without(this.changed(), ...changedBefore);
    const fields = _.union(Object.keys(values), sideEffects);
    if (!options.fields) {
      options.fields = _.intersection(fields, this.changed());
      options.defaultFields = options.fields;
    }
    return await this.save(options);
  }
  async destroy(options) {
    options = __spreadValues({
      hooks: true,
      force: false
    }, options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    if (options.hooks) {
      await this.constructor.runHooks("beforeDestroy", this, options);
    }
    const where = this.where(true);
    let result;
    if (this.constructor._timestampAttributes.deletedAt && options.force === false) {
      const attributeName = this.constructor._timestampAttributes.deletedAt;
      const attribute = this.constructor.rawAttributes[attributeName];
      const defaultValue = Object.prototype.hasOwnProperty.call(attribute, "defaultValue") ? attribute.defaultValue : null;
      const currentValue = this.getDataValue(attributeName);
      const undefinedOrNull = currentValue == null && defaultValue == null;
      if (undefinedOrNull || _.isEqual(currentValue, defaultValue)) {
        this.setDataValue(attributeName, new Date());
      }
      result = await this.save(__spreadProps(__spreadValues({}, options), { hooks: false }));
    } else {
      result = await this.constructor.queryInterface.delete(this, this.constructor.getTableName(options), where, __spreadValues({ type: QueryTypes.DELETE, limit: null }, options));
    }
    if (options.hooks) {
      await this.constructor.runHooks("afterDestroy", this, options);
    }
    return result;
  }
  isSoftDeleted() {
    if (!this.constructor._timestampAttributes.deletedAt) {
      throw new Error("Model is not paranoid");
    }
    const deletedAtAttribute = this.constructor.rawAttributes[this.constructor._timestampAttributes.deletedAt];
    const defaultValue = Object.prototype.hasOwnProperty.call(deletedAtAttribute, "defaultValue") ? deletedAtAttribute.defaultValue : null;
    const deletedAt = this.get(this.constructor._timestampAttributes.deletedAt) || null;
    const isSet = deletedAt !== defaultValue;
    return isSet;
  }
  async restore(options) {
    if (!this.constructor._timestampAttributes.deletedAt)
      throw new Error("Model is not paranoid");
    options = __spreadValues({
      hooks: true,
      force: false
    }, options);
    if (options.transaction === void 0 && this.sequelize.constructor._cls) {
      const t = this.sequelize.constructor._cls.get("transaction");
      if (t) {
        options.transaction = t;
      }
    }
    if (options.hooks) {
      await this.constructor.runHooks("beforeRestore", this, options);
    }
    const deletedAtCol = this.constructor._timestampAttributes.deletedAt;
    const deletedAtAttribute = this.constructor.rawAttributes[deletedAtCol];
    const deletedAtDefaultValue = Object.prototype.hasOwnProperty.call(deletedAtAttribute, "defaultValue") ? deletedAtAttribute.defaultValue : null;
    this.setDataValue(deletedAtCol, deletedAtDefaultValue);
    const result = await this.save(__spreadProps(__spreadValues({}, options), { hooks: false, omitNull: false }));
    if (options.hooks) {
      await this.constructor.runHooks("afterRestore", this, options);
      return result;
    }
    return result;
  }
  async increment(fields, options) {
    const identifier = this.where();
    options = Utils.cloneDeep(options);
    options.where = __spreadValues(__spreadValues({}, options.where), identifier);
    options.instance = this;
    await this.constructor.increment(fields, options);
    return this;
  }
  async decrement(fields, options) {
    return this.increment(fields, __spreadProps(__spreadValues({
      by: 1
    }, options), {
      increment: false
    }));
  }
  equals(other) {
    if (!other || !other.constructor) {
      return false;
    }
    if (!(other instanceof this.constructor)) {
      return false;
    }
    return this.constructor.primaryKeyAttributes.every((attribute) => this.get(attribute, { raw: true }) === other.get(attribute, { raw: true }));
  }
  equalsOneOf(others) {
    return others.some((other) => this.equals(other));
  }
  setValidators(attribute, validators) {
    this.validators[attribute] = validators;
  }
  toJSON() {
    return _.cloneDeep(this.get({
      plain: true
    }));
  }
  static hasMany(target, options) {
  }
  static belongsToMany(target, options) {
  }
  static hasOne(target, options) {
  }
  static belongsTo(target, options) {
  }
}
function unpackAnd(where) {
  if (!_.isObject(where)) {
    return where;
  }
  const keys = Utils.getComplexKeys(where);
  if (keys.length === 0) {
    return;
  }
  if (keys.length !== 1 || keys[0] !== Op.and) {
    return where;
  }
  const andParts = where[Op.and];
  return andParts;
}
function combineWheresWithAnd(whereA, whereB) {
  const unpackedA = unpackAnd(whereA);
  if (unpackedA === void 0) {
    return whereB;
  }
  const unpackedB = unpackAnd(whereB);
  if (unpackedB === void 0) {
    return whereA;
  }
  return {
    [Op.and]: _.flatten([unpackedA, unpackedB])
  };
}
Object.assign(Model, associationsMixin);
Hooks.applyTo(Model, true);
module.exports = Model;
//# sourceMappingURL=model.js.map
