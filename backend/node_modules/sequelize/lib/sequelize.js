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
const url = require("url");
const path = require("path");
const pgConnectionString = require("pg-connection-string");
const retry = require("retry-as-promised").default;
const _ = require("lodash");
const Utils = require("./utils");
const Model = require("./model");
const DataTypes = require("./data-types");
const Deferrable = require("./deferrable");
const ModelManager = require("./model-manager");
const Transaction = require("./transaction");
const QueryTypes = require("./query-types");
const TableHints = require("./table-hints");
const IndexHints = require("./index-hints");
const sequelizeErrors = require("./errors");
const Hooks = require("./hooks");
const Association = require("./associations/index");
const Validator = require("./utils/validator-extras").validator;
const Op = require("./operators");
const deprecations = require("./utils/deprecations");
const { QueryInterface } = require("./dialects/abstract/query-interface");
const { BelongsTo } = require("./associations/belongs-to");
const HasOne = require("./associations/has-one");
const { BelongsToMany } = require("./associations/belongs-to-many");
const { HasMany } = require("./associations/has-many");
const { withSqliteForeignKeysOff } = require("./dialects/sqlite/sqlite-utils");
const { injectReplacements } = require("./utils/sql");
class Sequelize {
  constructor(database, username, password, options) {
    let config;
    if (arguments.length === 1 && typeof database === "object") {
      options = database;
      config = _.pick(options, "host", "port", "database", "username", "password");
    } else if (arguments.length === 1 && typeof database === "string" || arguments.length === 2 && typeof username === "object") {
      config = {};
      options = username || {};
      const urlParts = url.parse(arguments[0], true);
      options.dialect = urlParts.protocol.replace(/:$/, "");
      options.host = urlParts.hostname;
      if (options.dialect === "sqlite" && urlParts.pathname && !urlParts.pathname.startsWith("/:memory")) {
        const storagePath = path.join(options.host, urlParts.pathname);
        options.storage = path.resolve(options.storage || storagePath);
      }
      if (urlParts.pathname) {
        config.database = urlParts.pathname.replace(/^\//, "");
      }
      if (urlParts.port) {
        options.port = urlParts.port;
      }
      if (urlParts.auth) {
        const authParts = urlParts.auth.split(":");
        config.username = authParts[0];
        if (authParts.length > 1)
          config.password = authParts.slice(1).join(":");
      }
      if (urlParts.query) {
        if (urlParts.query.host) {
          options.host = urlParts.query.host;
        }
        if (options.dialectOptions) {
          Object.assign(options.dialectOptions, urlParts.query);
        } else {
          options.dialectOptions = urlParts.query;
          if (urlParts.query.options) {
            try {
              const o = JSON.parse(urlParts.query.options);
              options.dialectOptions.options = o;
            } catch (e) {
            }
          }
        }
      }
      if (["postgres", "postgresql"].includes(options.dialect)) {
        Object.assign(options.dialectOptions, pgConnectionString.parse(arguments[0]));
      }
    } else {
      options = options || {};
      config = { database, username, password };
    }
    Sequelize.runHooks("beforeInit", config, options);
    this.options = __spreadValues({
      dialect: null,
      dialectModule: null,
      dialectModulePath: null,
      host: "localhost",
      protocol: "tcp",
      define: {},
      query: {},
      sync: {},
      timezone: "+00:00",
      standardConformingStrings: true,
      logging: console.log,
      omitNull: false,
      native: false,
      replication: false,
      ssl: void 0,
      pool: {},
      quoteIdentifiers: true,
      hooks: {},
      retry: {
        max: 5,
        match: [
          "SQLITE_BUSY: database is locked"
        ]
      },
      transactionType: Transaction.TYPES.DEFERRED,
      isolationLevel: null,
      databaseVersion: 0,
      typeValidation: false,
      benchmark: false,
      minifyAliases: false,
      logQueryParameters: false,
      attributeBehavior: "throw"
    }, options);
    if (!this.options.dialect) {
      throw new Error("Dialect needs to be explicitly supplied as of v4.0.0");
    }
    if (this.options.dialect === "postgresql") {
      this.options.dialect = "postgres";
    }
    if (this.options.dialect === "sqlite" && this.options.timezone !== "+00:00") {
      throw new Error("Setting a custom timezone is not supported by SQLite, dates are always returned as UTC. Please remove the custom timezone parameter.");
    }
    if (this.options.logging === true) {
      deprecations.noTrueLogging();
      this.options.logging = console.log;
    }
    this._setupHooks(options.hooks);
    this.config = {
      database: config.database || this.options.database,
      username: config.username || this.options.username,
      password: config.password || this.options.password || null,
      host: config.host || this.options.host,
      port: config.port || this.options.port,
      pool: this.options.pool,
      protocol: this.options.protocol,
      native: this.options.native,
      ssl: this.options.ssl,
      replication: this.options.replication,
      dialectModule: this.options.dialectModule,
      dialectModulePath: this.options.dialectModulePath,
      keepDefaultTimezone: this.options.keepDefaultTimezone,
      dialectOptions: this.options.dialectOptions
    };
    let Dialect;
    switch (this.getDialect()) {
      case "mariadb":
        Dialect = require("./dialects/mariadb");
        break;
      case "mssql":
        Dialect = require("./dialects/mssql");
        break;
      case "mysql":
        Dialect = require("./dialects/mysql");
        break;
      case "oracle":
        Dialect = require("./dialects/oracle");
        break;
      case "postgres":
        Dialect = require("./dialects/postgres");
        break;
      case "sqlite":
        Dialect = require("./dialects/sqlite");
        break;
      case "db2":
        Dialect = require("./dialects/db2");
        break;
      case "snowflake":
        Dialect = require("./dialects/snowflake");
        break;
      default:
        throw new Error(`The dialect ${this.getDialect()} is not supported. Supported dialects: mssql, mariadb, mysql, oracle, postgres, db2 and sqlite.`);
    }
    this.dialect = new Dialect(this);
    this.dialect.queryGenerator.typeValidation = options.typeValidation;
    if (_.isPlainObject(this.options.operatorsAliases)) {
      deprecations.noStringOperators();
      this.dialect.queryGenerator.setOperatorsAliases(this.options.operatorsAliases);
    } else if (typeof this.options.operatorsAliases === "boolean") {
      deprecations.noBoolOperatorAliases();
    }
    this.queryInterface = this.dialect.queryInterface;
    this.models = {};
    this.modelManager = new ModelManager(this);
    this.connectionManager = this.dialect.connectionManager;
    Sequelize.runHooks("afterInit", this);
  }
  refreshTypes() {
    this.connectionManager.refreshTypeParser(DataTypes);
  }
  getDialect() {
    return this.options.dialect;
  }
  getDatabaseName() {
    return this.config.database;
  }
  getQueryInterface() {
    return this.queryInterface;
  }
  define(modelName, attributes, options = {}) {
    options.modelName = modelName;
    options.sequelize = this;
    const model = class extends Model {
    };
    model.init(attributes, options);
    return model;
  }
  model(modelName) {
    if (!this.isDefined(modelName)) {
      throw new Error(`${modelName} has not been defined`);
    }
    return this.modelManager.getModel(modelName);
  }
  isDefined(modelName) {
    return !!this.modelManager.models.find((model) => model.name === modelName);
  }
  async query(sql, options) {
    options = __spreadValues(__spreadValues({}, this.options.query), options);
    if (options.instance && !options.model) {
      options.model = options.instance.constructor;
    }
    if (!options.instance && !options.model) {
      options.raw = true;
    }
    if (options.mapToModel) {
      options.fieldMap = _.get(options, "model.fieldAttributeMap", {});
    }
    options = _.defaults(options, {
      logging: Object.prototype.hasOwnProperty.call(this.options, "logging") ? this.options.logging : console.log,
      searchPath: Object.prototype.hasOwnProperty.call(this.options, "searchPath") ? this.options.searchPath : "DEFAULT"
    });
    if (!options.type) {
      if (options.model || options.nest || options.plain) {
        options.type = QueryTypes.SELECT;
      } else {
        options.type = QueryTypes.RAW;
      }
    }
    if (!this.dialect.supports.searchPath || !this.options.dialectOptions || !this.options.dialectOptions.prependSearchPath || options.supportsSearchPath === false) {
      delete options.searchPath;
    } else if (!options.searchPath) {
      options.searchPath = "DEFAULT";
    }
    if (typeof sql === "object") {
      if (sql.values !== void 0) {
        if (options.replacements !== void 0) {
          throw new Error("Both `sql.values` and `options.replacements` cannot be set at the same time");
        }
        options.replacements = sql.values;
      }
      if (sql.bind !== void 0) {
        if (options.bind !== void 0) {
          throw new Error("Both `sql.bind` and `options.bind` cannot be set at the same time");
        }
        options.bind = sql.bind;
      }
      if (sql.query !== void 0) {
        sql = sql.query;
      }
    }
    sql = sql.trim();
    if (options.replacements && options.bind) {
      throw new Error("Both `replacements` and `bind` cannot be set at the same time");
    }
    if (options.replacements) {
      sql = injectReplacements(sql, this.dialect, options.replacements);
    }
    let bindParameters;
    if (options.bind) {
      [sql, bindParameters] = this.dialect.Query.formatBindParameters(sql, options.bind, this.options.dialect);
    }
    const checkTransaction = () => {
      if (options.transaction && options.transaction.finished && !options.completesTransaction) {
        const error = new Error(`${options.transaction.finished} has been called on this transaction(${options.transaction.id}), you can no longer use it. (The rejected query is attached as the 'sql' property of this error)`);
        error.sql = sql;
        throw error;
      }
    };
    const retryOptions = __spreadValues(__spreadValues({}, this.options.retry), options.retry);
    return retry(async () => {
      if (options.transaction === void 0 && Sequelize._cls) {
        options.transaction = Sequelize._cls.get("transaction");
      }
      checkTransaction();
      const connection = await (options.transaction ? options.transaction.connection : this.connectionManager.getConnection(options));
      if (this.options.dialect === "db2" && options.alter) {
        if (options.alter.drop === false) {
          connection.dropTable = false;
        }
      }
      const query = new this.dialect.Query(connection, this, options);
      try {
        await this.runHooks("beforeQuery", options, query);
        checkTransaction();
        return await query.run(sql, bindParameters);
      } finally {
        await this.runHooks("afterQuery", options, query);
        if (!options.transaction) {
          this.connectionManager.releaseConnection(connection);
        }
      }
    }, retryOptions);
  }
  async set(variables, options) {
    options = __spreadValues(__spreadValues({}, this.options.set), typeof options === "object" && options);
    if (!["mysql", "mariadb"].includes(this.options.dialect)) {
      throw new Error("sequelize.set is only supported for mysql or mariadb");
    }
    if (!options.transaction || !(options.transaction instanceof Transaction)) {
      throw new TypeError("options.transaction is required");
    }
    options.raw = true;
    options.plain = true;
    options.type = "SET";
    const query = `SET ${_.map(variables, (v, k) => `@${k} := ${typeof v === "string" ? `"${v}"` : v}`).join(", ")}`;
    return await this.query(query, options);
  }
  escape(value) {
    return this.dialect.queryGenerator.escape(value);
  }
  async createSchema(schema, options) {
    return await this.getQueryInterface().createSchema(schema, options);
  }
  async showAllSchemas(options) {
    return await this.getQueryInterface().showAllSchemas(options);
  }
  async dropSchema(schema, options) {
    return await this.getQueryInterface().dropSchema(schema, options);
  }
  async dropAllSchemas(options) {
    return await this.getQueryInterface().dropAllSchemas(options);
  }
  async sync(options) {
    options = __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, this.options), this.options.sync), options), {
      hooks: options ? options.hooks !== false : true
    });
    if (options.match) {
      if (!options.match.test(this.config.database)) {
        throw new Error(`Database "${this.config.database}" does not match sync match parameter "${options.match}"`);
      }
    }
    if (options.hooks) {
      await this.runHooks("beforeBulkSync", options);
    }
    if (options.force) {
      await this.drop(options);
    }
    if (this.modelManager.models.length === 0) {
      await this.authenticate(options);
    } else {
      const models = this.modelManager.getModelsTopoSortedByForeignKey();
      if (models == null) {
        return this._syncModelsWithCyclicReferences(options);
      }
      models.reverse();
      for (const model of models) {
        await model.sync(options);
      }
    }
    if (options.hooks) {
      await this.runHooks("afterBulkSync", options);
    }
    return this;
  }
  async _syncModelsWithCyclicReferences(options) {
    if (this.dialect.name === "sqlite") {
      await withSqliteForeignKeysOff(this, options, async () => {
        for (const model of this.modelManager.models) {
          await model.sync(options);
        }
      });
      return;
    }
    for (const model of this.modelManager.models) {
      await model.sync(__spreadProps(__spreadValues({}, options), { withoutForeignKeyConstraints: true }));
    }
    for (const model of this.modelManager.models) {
      await model.sync(__spreadProps(__spreadValues({}, options), { force: false, alter: true }));
    }
  }
  async truncate(options) {
    const sortedModels = this.modelManager.getModelsTopoSortedByForeignKey();
    const models = sortedModels || this.modelManager.models;
    const hasCyclicDependencies = sortedModels == null;
    if (hasCyclicDependencies && (!options || !options.cascade)) {
      throw new Error('Sequelize#truncate: Some of your models have cyclic references (foreign keys). You need to use the "cascade" option to be able to delete rows from models that have cyclic references.');
    }
    if (hasCyclicDependencies && this.dialect.name === "sqlite") {
      return withSqliteForeignKeysOff(this, options, async () => {
        await Promise.all(models.map((model) => model.truncate(options)));
      });
    }
    if (options && options.cascade) {
      for (const model of models)
        await model.truncate(options);
    } else {
      await Promise.all(models.map((model) => model.truncate(options)));
    }
  }
  async drop(options) {
    if (options && options.cascade) {
      for (const model of this.modelManager.models) {
        await model.drop(options);
      }
    }
    const sortedModels = this.modelManager.getModelsTopoSortedByForeignKey();
    if (sortedModels) {
      for (const model of sortedModels) {
        await model.drop(options);
      }
    }
    if (this.dialect.name === "sqlite") {
      await withSqliteForeignKeysOff(this, options, async () => {
        for (const model of this.modelManager.models) {
          await model.drop(options);
        }
      });
      return;
    }
    for (const model of this.modelManager.models) {
      const tableName = model.getTableName();
      const foreignKeys = await this.queryInterface.getForeignKeyReferencesForTable(tableName, options);
      await Promise.all(foreignKeys.map((foreignKey) => {
        return this.queryInterface.removeConstraint(tableName, foreignKey.constraintName, options);
      }));
    }
    for (const model of this.modelManager.models) {
      await model.drop(options);
    }
  }
  async authenticate(options) {
    options = __spreadValues({
      raw: true,
      plain: true,
      type: QueryTypes.SELECT
    }, options);
    await this.query(this.dialect.queryGenerator.authTestQuery(), options);
    return;
  }
  async databaseVersion(options) {
    return await this.getQueryInterface().databaseVersion(options);
  }
  random() {
    if (["postgres", "sqlite", "snowflake"].includes(this.getDialect())) {
      return this.fn("RANDOM");
    }
    return this.fn("RAND");
  }
  static fn(fn, ...args) {
    return new Utils.Fn(fn, args);
  }
  static col(col) {
    return new Utils.Col(col);
  }
  static cast(val, type) {
    return new Utils.Cast(val, type);
  }
  static literal(val) {
    return new Utils.Literal(val);
  }
  static and(...args) {
    return { [Op.and]: args };
  }
  static or(...args) {
    return { [Op.or]: args };
  }
  static json(conditionsOrPath, value) {
    return new Utils.Json(conditionsOrPath, value);
  }
  static where(attr, comparator, logic) {
    return new Utils.Where(attr, comparator, logic);
  }
  async transaction(options, autoCallback) {
    if (typeof options === "function") {
      autoCallback = options;
      options = void 0;
    }
    const transaction = new Transaction(this, options);
    if (!autoCallback) {
      await transaction.prepareEnvironment(false);
      return transaction;
    }
    return Sequelize._clsRun(async () => {
      await transaction.prepareEnvironment(true);
      let result;
      try {
        result = await autoCallback(transaction);
      } catch (err) {
        try {
          await transaction.rollback();
        } catch (ignore) {
        }
        throw err;
      }
      await transaction.commit();
      return result;
    });
  }
  static useCLS(ns) {
    if (!ns || typeof ns !== "object" || typeof ns.bind !== "function" || typeof ns.run !== "function")
      throw new Error("Must provide CLS namespace");
    Sequelize._cls = ns;
    return this;
  }
  static _clsRun(fn) {
    const ns = Sequelize._cls;
    if (!ns)
      return fn();
    let res;
    ns.run((context) => res = fn(context));
    return res;
  }
  log(...args) {
    let options;
    const last = _.last(args);
    if (last && _.isPlainObject(last) && Object.prototype.hasOwnProperty.call(last, "logging")) {
      options = last;
      if (options.logging === console.log) {
        args.splice(args.length - 1, 1);
      }
    } else {
      options = this.options;
    }
    if (options.logging) {
      if (options.logging === true) {
        deprecations.noTrueLogging();
        options.logging = console.log;
      }
      if ((this.options.benchmark || options.benchmark) && options.logging === console.log) {
        args = [`${args[0]} Elapsed time: ${args[1]}ms`];
      }
      options.logging(...args);
    }
  }
  close() {
    return this.connectionManager.close();
  }
  normalizeDataType(Type) {
    let type = typeof Type === "function" ? new Type() : Type;
    const dialectTypes = this.dialect.DataTypes || {};
    if (dialectTypes[type.key]) {
      type = dialectTypes[type.key].extend(type);
    }
    if (type instanceof DataTypes.ARRAY) {
      if (!type.type) {
        throw new Error("ARRAY is missing type definition for its values.");
      }
      if (dialectTypes[type.type.key]) {
        type.type = dialectTypes[type.type.key].extend(type.type);
      }
    }
    return type;
  }
  normalizeAttribute(attribute) {
    if (!_.isPlainObject(attribute)) {
      attribute = { type: attribute };
    }
    if (!attribute.type)
      return attribute;
    attribute.type = this.normalizeDataType(attribute.type);
    if (Object.prototype.hasOwnProperty.call(attribute, "defaultValue")) {
      if (typeof attribute.defaultValue === "function" && [DataTypes.NOW, DataTypes.UUIDV1, DataTypes.UUIDV4].includes(attribute.defaultValue)) {
        attribute.defaultValue = new attribute.defaultValue();
      }
    }
    if (attribute.type instanceof DataTypes.ENUM) {
      if (attribute.values) {
        attribute.type.values = attribute.type.options.values = attribute.values;
      } else {
        attribute.values = attribute.type.values;
      }
      if (!attribute.values.length) {
        throw new Error("Values for ENUM have not been defined.");
      }
    }
    return attribute;
  }
}
Sequelize.prototype.fn = Sequelize.fn;
Sequelize.prototype.col = Sequelize.col;
Sequelize.prototype.cast = Sequelize.cast;
Sequelize.prototype.literal = Sequelize.literal;
Sequelize.prototype.and = Sequelize.and;
Sequelize.prototype.or = Sequelize.or;
Sequelize.prototype.json = Sequelize.json;
Sequelize.prototype.where = Sequelize.where;
Sequelize.prototype.validate = Sequelize.prototype.authenticate;
Object.defineProperty(Sequelize, "version", {
  enumerable: true,
  get() {
    return require("../package.json").version;
  }
});
Sequelize.options = { hooks: {} };
Sequelize.Utils = Utils;
Sequelize.Op = Op;
Sequelize.TableHints = TableHints;
Sequelize.IndexHints = IndexHints;
Sequelize.Transaction = Transaction;
Sequelize.prototype.Sequelize = Sequelize;
Sequelize.prototype.QueryTypes = Sequelize.QueryTypes = QueryTypes;
Sequelize.prototype.Validator = Sequelize.Validator = Validator;
Sequelize.Model = Model;
Sequelize.QueryInterface = QueryInterface;
Sequelize.BelongsTo = BelongsTo;
Sequelize.HasOne = HasOne;
Sequelize.HasMany = HasMany;
Sequelize.BelongsToMany = BelongsToMany;
Sequelize.DataTypes = DataTypes;
for (const dataType in DataTypes) {
  Sequelize[dataType] = DataTypes[dataType];
}
Sequelize.Deferrable = Deferrable;
Sequelize.prototype.Association = Sequelize.Association = Association;
Sequelize.useInflection = Utils.useInflection;
Hooks.applyTo(Sequelize);
Hooks.applyTo(Sequelize.prototype);
Sequelize.Error = sequelizeErrors.BaseError;
for (const error of Object.keys(sequelizeErrors)) {
  Sequelize[error] = sequelizeErrors[error];
}
module.exports = Sequelize;
module.exports.Sequelize = Sequelize;
module.exports.default = Sequelize;
//# sourceMappingURL=sequelize.js.map
