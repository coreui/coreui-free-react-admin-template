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
const sequelizeErrors = require("../../errors");
const QueryTypes = require("../../query-types");
const { QueryInterface } = require("../abstract/query-interface");
const { cloneDeep } = require("../../utils");
const _ = require("lodash");
class SQLiteQueryInterface extends QueryInterface {
  async removeColumn(tableName, attributeName, options) {
    options = options || {};
    const fields = await this.describeTable(tableName, options);
    delete fields[attributeName];
    const sql = this.queryGenerator.removeColumnQuery(tableName, fields);
    const subQueries = sql.split(";").filter((q) => q !== "");
    for (const subQuery of subQueries)
      await this.sequelize.query(`${subQuery};`, __spreadValues({ raw: true }, options));
  }
  async changeColumn(tableName, attributeName, dataTypeOrOptions, options) {
    options = options || {};
    const fields = await this.describeTable(tableName, options);
    Object.assign(fields[attributeName], this.normalizeAttribute(dataTypeOrOptions));
    const sql = this.queryGenerator.removeColumnQuery(tableName, fields);
    const subQueries = sql.split(";").filter((q) => q !== "");
    for (const subQuery of subQueries)
      await this.sequelize.query(`${subQuery};`, __spreadValues({ raw: true }, options));
  }
  async renameColumn(tableName, attrNameBefore, attrNameAfter, options) {
    options = options || {};
    const fields = await this.assertTableHasColumn(tableName, attrNameBefore, options);
    fields[attrNameAfter] = __spreadValues({}, fields[attrNameBefore]);
    delete fields[attrNameBefore];
    const sql = this.queryGenerator.renameColumnQuery(tableName, attrNameBefore, attrNameAfter, fields);
    const subQueries = sql.split(";").filter((q) => q !== "");
    for (const subQuery of subQueries)
      await this.sequelize.query(`${subQuery};`, __spreadValues({ raw: true }, options));
  }
  async removeConstraint(tableName, constraintName, options) {
    let createTableSql;
    const constraints = await this.showConstraint(tableName, constraintName);
    const constraint = constraints.find((constaint) => constaint.constraintName === constraintName);
    if (!constraint) {
      throw new sequelizeErrors.UnknownConstraintError({
        message: `Constraint ${constraintName} on table ${tableName} does not exist`,
        constraint: constraintName,
        table: tableName
      });
    }
    createTableSql = constraint.sql;
    constraint.constraintName = this.queryGenerator.quoteIdentifier(constraint.constraintName);
    let constraintSnippet = `, CONSTRAINT ${constraint.constraintName} ${constraint.constraintType} ${constraint.constraintCondition}`;
    if (constraint.constraintType === "FOREIGN KEY") {
      const referenceTableName = this.queryGenerator.quoteTable(constraint.referenceTableName);
      constraint.referenceTableKeys = constraint.referenceTableKeys.map((columnName) => this.queryGenerator.quoteIdentifier(columnName));
      const referenceTableKeys = constraint.referenceTableKeys.join(", ");
      constraintSnippet += ` REFERENCES ${referenceTableName} (${referenceTableKeys})`;
      constraintSnippet += ` ON UPDATE ${constraint.updateAction}`;
      constraintSnippet += ` ON DELETE ${constraint.deleteAction}`;
    }
    createTableSql = createTableSql.replace(constraintSnippet, "");
    createTableSql += ";";
    const fields = await this.describeTable(tableName, options);
    const sql = this.queryGenerator._alterConstraintQuery(tableName, fields, createTableSql);
    const subQueries = sql.split(";").filter((q) => q !== "");
    for (const subQuery of subQueries)
      await this.sequelize.query(`${subQuery};`, __spreadValues({ raw: true }, options));
  }
  async addConstraint(tableName, options) {
    if (!options.fields) {
      throw new Error("Fields must be specified through options.fields");
    }
    if (!options.type) {
      throw new Error("Constraint type must be specified through options.type");
    }
    options = cloneDeep(options);
    const constraintSnippet = this.queryGenerator.getConstraintSnippet(tableName, options);
    const describeCreateTableSql = this.queryGenerator.describeCreateTableQuery(tableName);
    const constraints = await this.sequelize.query(describeCreateTableSql, __spreadProps(__spreadValues({}, options), { type: QueryTypes.SELECT, raw: true }));
    let sql = constraints[0].sql;
    const index = sql.length - 1;
    const createTableSql = `${sql.substr(0, index)}, ${constraintSnippet})${sql.substr(index + 1)};`;
    const fields = await this.describeTable(tableName, options);
    sql = this.queryGenerator._alterConstraintQuery(tableName, fields, createTableSql);
    const subQueries = sql.split(";").filter((q) => q !== "");
    for (const subQuery of subQueries)
      await this.sequelize.query(`${subQuery};`, __spreadValues({ raw: true }, options));
  }
  async getForeignKeyReferencesForTable(tableName, options) {
    const database = this.sequelize.config.database;
    const query = this.queryGenerator.getForeignKeysQuery(tableName, database);
    const result = await this.sequelize.query(query, options);
    return result.map((row) => ({
      tableName,
      columnName: row.from,
      referencedTableName: row.table,
      referencedColumnName: row.to,
      tableCatalog: database,
      referencedTableCatalog: database
    }));
  }
  async dropAllTables(options) {
    options = options || {};
    const skip = options.skip || [];
    const tableNames = await this.showAllTables(options);
    await this.sequelize.query("PRAGMA foreign_keys = OFF", options);
    await this._dropAllTables(tableNames, skip, options);
    await this.sequelize.query("PRAGMA foreign_keys = ON", options);
  }
  async describeTable(tableName, options) {
    let schema = null;
    let schemaDelimiter = null;
    if (typeof options === "string") {
      schema = options;
    } else if (typeof options === "object" && options !== null) {
      schema = options.schema || null;
      schemaDelimiter = options.schemaDelimiter || null;
    }
    if (typeof tableName === "object" && tableName !== null) {
      schema = tableName.schema;
      tableName = tableName.tableName;
    }
    const sql = this.queryGenerator.describeTableQuery(tableName, schema, schemaDelimiter);
    options = __spreadProps(__spreadValues({}, options), { type: QueryTypes.DESCRIBE });
    const sqlIndexes = this.queryGenerator.showIndexesQuery(tableName);
    try {
      const data = await this.sequelize.query(sql, options);
      if (_.isEmpty(data)) {
        throw new Error(`No description found for "${tableName}" table. Check the table name and schema; remember, they _are_ case sensitive.`);
      }
      const indexes = await this.sequelize.query(sqlIndexes, options);
      for (const prop in data) {
        data[prop].unique = false;
      }
      for (const index of indexes) {
        for (const field of index.fields) {
          if (index.unique !== void 0) {
            data[field.attribute].unique = index.unique;
          }
        }
      }
      const foreignKeys = await this.getForeignKeyReferencesForTable(tableName, options);
      for (const foreignKey of foreignKeys) {
        data[foreignKey.columnName].references = {
          model: foreignKey.referencedTableName,
          key: foreignKey.referencedColumnName
        };
      }
      return data;
    } catch (e) {
      if (e.original && e.original.code === "ER_NO_SUCH_TABLE") {
        throw new Error(`No description found for "${tableName}" table. Check the table name and schema; remember, they _are_ case sensitive.`);
      }
      throw e;
    }
  }
}
exports.SQLiteQueryInterface = SQLiteQueryInterface;
//# sourceMappingURL=query-interface.js.map
