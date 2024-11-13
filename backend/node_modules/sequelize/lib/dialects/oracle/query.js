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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  OracleQuery: () => OracleQuery
});
const AbstractQuery = require("../abstract/query");
const SequelizeErrors = require("../../errors");
const parserStore = require("../parserStore")("oracle");
const _ = require("lodash");
const Utils = require("../../utils");
const { logger } = require("../../utils/logger");
const debug = logger.debugContext("sql:oracle");
class OracleQuery extends AbstractQuery {
  constructor(connection, sequelize, options) {
    super(connection, sequelize, options);
    this.options = _.extend({
      logging: console.log,
      plain: false,
      raw: false
    }, options || {});
    this.checkLoggingOption();
    this.outFormat = options.outFormat || this.sequelize.connectionManager.lib.OBJECT;
  }
  getInsertIdField() {
    return "id";
  }
  getExecOptions() {
    const execOpts = { outFormat: this.outFormat, autoCommit: this.autoCommit };
    const oracledb = this.sequelize.connectionManager.lib;
    if (this.model && this.isSelectQuery()) {
      const fInfo = {};
      const keys = Object.keys(this.model.tableAttributes);
      for (const key of keys) {
        const keyValue = this.model.tableAttributes[key];
        if (keyValue.type.key === "DECIMAL") {
          fInfo[key] = { type: oracledb.STRING };
        }
        if (keyValue.type.key === "BIGINT") {
          fInfo[key] = { type: oracledb.STRING };
        }
      }
      if (fInfo) {
        execOpts.fetchInfo = fInfo;
      }
    }
    return execOpts;
  }
  _convertBindAttributes(bindingDictionary, oracledb) {
    if (this.model && this.options[bindingDictionary]) {
      const keys = Object.keys(this.model.tableAttributes);
      for (const key of keys) {
        const keyValue = this.model.tableAttributes[key];
        if (keyValue.type.key === "BIGINT") {
          const oldBinding = this.options[bindingDictionary][key];
          if (oldBinding) {
            this.options[bindingDictionary][key] = __spreadProps(__spreadValues({}, oldBinding), {
              type: oracledb.STRING,
              maxSize: 1e7
            });
          }
        }
      }
    }
  }
  async run(sql, parameters) {
    const oracledb = this.sequelize.connectionManager.lib;
    const complete = this._logQuery(sql, debug, parameters);
    const outParameters = [];
    const bindParameters = [];
    const bindDef = [];
    if (!sql.match(/END;$/)) {
      this.sql = sql.replace(/; *$/, "");
    } else {
      this.sql = sql;
    }
    if (this.options.outBindAttributes && (Array.isArray(parameters) || _.isPlainObject(parameters))) {
      this._convertBindAttributes("outBindAttributes", oracledb);
      outParameters.push(...Object.values(this.options.outBindAttributes));
      if (this.isUpsertQuery()) {
        outParameters.push({ dir: oracledb.BIND_OUT });
      }
    }
    this.bindParameters = outParameters;
    if (Array.isArray(parameters) || _.isPlainObject(parameters)) {
      if (this.options.executeMany) {
        this._convertBindAttributes("inbindAttributes", oracledb);
        bindDef.push(...Object.values(this.options.inbindAttributes));
        bindDef.push(...outParameters);
        this.bindParameters = parameters;
      } else if (this.isRawQuery()) {
        this.bindParameters = parameters;
      } else {
        Object.values(parameters).forEach((value) => {
          bindParameters.push(value);
        });
        bindParameters.push(...outParameters);
        Object.assign(this.bindParameters, bindParameters);
      }
    }
    if (this.sql.startsWith("BEGIN TRANSACTION")) {
      this.autocommit = false;
      return Promise.resolve();
    }
    if (this.sql.startsWith("SET AUTOCOMMIT ON")) {
      this.autocommit = true;
      return Promise.resolve();
    }
    if (this.sql.startsWith("SET AUTOCOMMIT OFF")) {
      this.autocommit = false;
      return Promise.resolve();
    }
    if (this.sql.startsWith("DECLARE x NUMBER")) {
      if (this.autoCommit === void 0) {
        if (this.connection.uuid) {
          this.autoCommit = false;
        } else {
          this.autoCommit = true;
        }
      }
      try {
        await this.connection.execute(this.sql, this.bindParameters, { autoCommit: this.autoCommit });
        return Object.create(null);
      } catch (error) {
        throw this.formatError(error);
      } finally {
        complete();
      }
    }
    if (this.sql.startsWith("BEGIN")) {
      if (this.autoCommit === void 0) {
        if (this.connection.uuid) {
          this.autoCommit = false;
        } else {
          this.autoCommit = true;
        }
      }
      try {
        const result = await this.connection.execute(this.sql, this.bindParameters, {
          outFormat: this.outFormat,
          autoCommit: this.autoCommit
        });
        if (!Array.isArray(result.outBinds)) {
          return [result.outBinds];
        }
        return result.outBinds;
      } catch (error) {
        throw this.formatError(error);
      } finally {
        complete();
      }
    }
    if (this.sql.startsWith("COMMIT TRANSACTION")) {
      try {
        await this.connection.commit();
        return Object.create(null);
      } catch (error) {
        throw this.formatError(error);
      } finally {
        complete();
      }
    }
    if (this.sql.startsWith("ROLLBACK TRANSACTION")) {
      try {
        await this.connection.rollback();
        return Object.create(null);
      } catch (error) {
        throw this.formatError(error);
      } finally {
        complete();
      }
    }
    if (this.sql.startsWith("SET TRANSACTION")) {
      try {
        await this.connection.execute(this.sql, [], { autoCommit: false });
        return Object.create(null);
      } catch (error) {
        throw this.formatError(error);
      } finally {
        complete();
      }
    }
    if (this.autoCommit === void 0) {
      if (this.connection.uuid) {
        this.autoCommit = false;
      } else {
        this.autoCommit = true;
      }
    }
    if ("inputParameters" in this.options && this.options.inputParameters !== null) {
      Object.assign(this.bindParameters, this.options.inputParameters);
    }
    const execOpts = this.getExecOptions();
    if (this.options.executeMany && bindDef.length > 0) {
      execOpts.bindDefs = bindDef;
    }
    const executePromise = this.options.executeMany ? this.connection.executeMany(this.sql, this.bindParameters, execOpts) : this.connection.execute(this.sql, this.bindParameters, execOpts);
    try {
      const result = await executePromise;
      return this.formatResults(result);
    } catch (error) {
      throw this.formatError(error);
    } finally {
      complete();
    }
  }
  static formatBindParameters(sql, values, dialect) {
    const replacementFunc = (match, key, values2) => {
      if (values2[key] !== void 0) {
        return `:${key}`;
      }
      return void 0;
    };
    sql = AbstractQuery.formatBindParameters(sql, values, dialect, replacementFunc)[0];
    return [sql, values];
  }
  _getAttributeMap(attrsMap, rawAttributes) {
    attrsMap = Object.assign(attrsMap, _.reduce(rawAttributes, (mp, _2, key) => {
      const catalogKey = this.sequelize.queryInterface.queryGenerator.getCatalogName(key);
      mp[catalogKey] = key;
      return mp;
    }, {}));
  }
  _processRows(rows) {
    let result = rows;
    let attrsMap = {};
    if (this.sequelize.options.quoteIdentifiers === false) {
      attrsMap = _.reduce(this.options.attributes, (mp, v) => {
        if (typeof v === "object") {
          v = v[1];
        }
        const catalogv = this.sequelize.queryInterface.queryGenerator.getCatalogName(v);
        mp[catalogv] = v;
        return mp;
      }, {});
      if (this.model) {
        this._getAttributeMap(attrsMap, this.model.rawAttributes);
      }
      if (this.options.aliasesMapping) {
        const obj = Object.fromEntries(this.options.aliasesMapping);
        rows = rows.map((row) => _.toPairs(row).reduce((acc, [key, value]) => {
          const mapping = Object.values(obj).find((element) => {
            const catalogElement = this.sequelize.queryInterface.queryGenerator.getCatalogName(element);
            return catalogElement === key;
          });
          if (mapping)
            acc[mapping || key] = value;
          return acc;
        }, {}));
      }
      result = rows.map((row) => {
        return _.mapKeys(row, (value, key) => {
          const targetAttr = attrsMap[key];
          if (typeof targetAttr === "string" && targetAttr !== key) {
            return targetAttr;
          }
          return key;
        });
      });
    }
    if (this.model) {
      result = result.map((row) => {
        return _.mapValues(row, (value, key) => {
          if (this.model.rawAttributes[key] && this.model.rawAttributes[key].type) {
            let typeid = this.model.rawAttributes[key].type.toLocaleString();
            if (this.model.rawAttributes[key].type.key === "JSON") {
              value = JSON.parse(value);
            }
            if (typeid.indexOf("(") > -1 && this.model.rawAttributes[key].type.key !== "BOOLEAN") {
              typeid = typeid.substr(0, typeid.indexOf("("));
            }
            const parse = parserStore.get(typeid);
            if (value !== null & !!parse) {
              value = parse(value);
            }
          }
          return value;
        });
      });
    }
    return result;
  }
  formatResults(data) {
    let result = this.instance;
    if (this.isInsertQuery(data)) {
      let insertData;
      if (data.outBinds) {
        const keys = Object.keys(this.options.outBindAttributes);
        insertData = data.outBinds;
        if (this.instance) {
          insertData = [insertData];
        }
        const res = insertData.map((row) => {
          const obj = {};
          row.forEach((element, index) => {
            obj[keys[index]] = element[0];
          });
          return obj;
        });
        insertData = res;
        if (!this.instance) {
          result = res;
        }
      }
      this.handleInsertQuery(insertData);
      return [result, data.rowsAffected];
    }
    if (this.isShowTablesQuery()) {
      result = this.handleShowTablesQuery(data.rows);
    } else if (this.isDescribeQuery()) {
      result = {};
      const table = Object.keys(this.sequelize.models);
      const modelAttributes = {};
      if (this.sequelize.models && table.length > 0) {
        this._getAttributeMap(modelAttributes, this.sequelize.models[table[0]].rawAttributes);
      }
      data.rows.forEach((_result) => {
        if (_result.Default) {
          _result.Default = _result.Default.replace("('", "").replace("')", "").replace(/'/g, "");
        }
        if (!(modelAttributes[_result.COLUMN_NAME] in result)) {
          let key = modelAttributes[_result.COLUMN_NAME];
          if (!key) {
            key = _result.COLUMN_NAME;
          }
          result[key] = {
            type: _result.DATA_TYPE.toUpperCase(),
            allowNull: _result.NULLABLE === "N" ? false : true,
            defaultValue: void 0,
            primaryKey: _result.CONSTRAINT_TYPE === "P"
          };
        }
      });
    } else if (this.isShowIndexesQuery()) {
      result = this.handleShowIndexesQuery(data.rows);
    } else if (this.isSelectQuery()) {
      const rows = data.rows;
      const result2 = this._processRows(rows);
      return this.handleSelectQuery(result2);
    } else if (this.isCallQuery()) {
      result = data.rows[0];
    } else if (this.isUpdateQuery()) {
      result = [result, data.rowsAffected];
    } else if (this.isBulkUpdateQuery()) {
      result = data.rowsAffected;
    } else if (this.isBulkDeleteQuery()) {
      result = data.rowsAffected;
    } else if (this.isVersionQuery()) {
      const version = data.rows[0].VERSION_FULL;
      if (version) {
        const versions = version.split(".");
        result = `${versions[0]}.${versions[1]}.${versions[2]}`;
      } else {
        result = "0.0.0";
      }
    } else if (this.isForeignKeysQuery()) {
      result = data.rows;
    } else if (this.isUpsertQuery()) {
      data = data.outBinds;
      const keys = Object.keys(this.options.outBindAttributes);
      const obj = {};
      for (const k in keys) {
        obj[keys[k]] = data[k];
      }
      obj.isUpdate = data[data.length - 1];
      data = obj;
      result = [{ isNewRecord: data.isUpdate, value: data }, data.isUpdate == 0];
    } else if (this.isShowConstraintsQuery()) {
      result = this.handleShowConstraintsQuery(data);
    } else if (this.isRawQuery()) {
      if (data && data.rows) {
        return [data.rows, data.metaData];
      }
      return [data, data];
    }
    return result;
  }
  handleShowConstraintsQuery(data) {
    return data.rows.map((result) => {
      const constraint = {};
      for (const key in result) {
        constraint[_.camelCase(key)] = result[key].toLowerCase();
      }
      return constraint;
    });
  }
  handleShowTablesQuery(results) {
    return results.map((resultSet) => {
      return {
        tableName: resultSet.TABLE_NAME,
        schema: resultSet.TABLE_SCHEMA
      };
    });
  }
  formatError(err) {
    let match;
    match = err.message.match(/unique constraint ([\s\S]*) violated/);
    if (match && match.length > 1) {
      match[1] = match[1].replace("(", "").replace(")", "").split(".")[1];
      const errors = [];
      let fields = [], message = "Validation error", uniqueKey = null;
      if (this.model) {
        const uniqueKeys = Object.keys(this.model.uniqueKeys);
        const currKey = uniqueKeys.find((key) => {
          return key.toUpperCase() === match[1].toUpperCase() || key.toUpperCase() === `"${match[1].toUpperCase()}"`;
        });
        if (currKey) {
          uniqueKey = this.model.uniqueKeys[currKey];
          fields = uniqueKey.fields;
        }
        if (uniqueKey && !!uniqueKey.msg) {
          message = uniqueKey.msg;
        }
        fields.forEach((field) => {
          errors.push(new SequelizeErrors.ValidationErrorItem(this.getUniqueConstraintErrorMessage(field), "unique violation", field, null));
        });
      }
      return new SequelizeErrors.UniqueConstraintError({
        message,
        errors,
        err,
        fields
      });
    }
    match = err.message.match(/ORA-02291/) || err.message.match(/ORA-02292/);
    if (match && match.length > 0) {
      return new SequelizeErrors.ForeignKeyConstraintError({
        fields: null,
        index: match[1],
        parent: err
      });
    }
    match = err.message.match(/ORA-02443/);
    if (match && match.length > 0) {
      return new SequelizeErrors.UnknownConstraintError(match[1]);
    }
    return new SequelizeErrors.DatabaseError(err);
  }
  isShowIndexesQuery() {
    return this.sql.indexOf("SELECT i.index_name,i.table_name, i.column_name, u.uniqueness") > -1;
  }
  isSelectCountQuery() {
    return this.sql.toUpperCase().indexOf("SELECT COUNT(") > -1;
  }
  handleShowIndexesQuery(data) {
    const acc = [];
    data.forEach((indexRecord) => {
      if (!acc[indexRecord.INDEX_NAME]) {
        acc[indexRecord.INDEX_NAME] = {
          unique: indexRecord.UNIQUENESS === "UNIQUE" ? true : false,
          primary: indexRecord.CONSTRAINT_TYPE === "P",
          name: indexRecord.INDEX_NAME.toLowerCase(),
          tableName: indexRecord.TABLE_NAME.toLowerCase(),
          type: void 0
        };
        acc[indexRecord.INDEX_NAME].fields = [];
      }
      acc[indexRecord.INDEX_NAME].fields.push({
        attribute: indexRecord.COLUMN_NAME,
        length: void 0,
        order: indexRecord.DESCEND,
        collate: void 0
      });
    });
    const returnIndexes = [];
    const accKeys = Object.keys(acc);
    for (const accKey of accKeys) {
      const columns = {};
      columns.fields = acc[accKey].fields;
      if (acc[accKey].name.match(/sys_c[0-9]*/)) {
        acc[accKey].name = Utils.nameIndex(columns, acc[accKey].tableName).name;
      }
      returnIndexes.push(acc[accKey]);
    }
    return returnIndexes;
  }
  handleInsertQuery(results, metaData) {
    if (this.instance && results.length > 0) {
      if ("pkReturnVal" in results[0]) {
        results[0][this.model.primaryKeyAttribute] = results[0].pkReturnVal;
        delete results[0].pkReturnVal;
      }
      const autoIncrementField = this.model.autoIncrementAttribute;
      let autoIncrementFieldAlias = null, id = null;
      if (Object.prototype.hasOwnProperty.call(this.model.rawAttributes, autoIncrementField) && this.model.rawAttributes[autoIncrementField].field !== void 0)
        autoIncrementFieldAlias = this.model.rawAttributes[autoIncrementField].field;
      id = id || results && results[0][this.getInsertIdField()];
      id = id || metaData && metaData[this.getInsertIdField()];
      id = id || results && results[0][autoIncrementField];
      id = id || autoIncrementFieldAlias && results && results[0][autoIncrementFieldAlias];
      this.instance[autoIncrementField] = id;
    }
  }
}
//# sourceMappingURL=query.js.map
