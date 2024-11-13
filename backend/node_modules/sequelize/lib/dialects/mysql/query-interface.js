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
const { QueryInterface } = require("../abstract/query-interface");
const QueryTypes = require("../../query-types");
class MySQLQueryInterface extends QueryInterface {
  async removeColumn(tableName, columnName, options) {
    options = options || {};
    const [results] = await this.sequelize.query(this.queryGenerator.getForeignKeyQuery(tableName.tableName ? tableName : {
      tableName,
      schema: this.sequelize.config.database
    }, columnName), __spreadValues({ raw: true }, options));
    if (results.length && results[0].constraint_name !== "PRIMARY") {
      await Promise.all(results.map((constraint) => this.sequelize.query(this.queryGenerator.dropForeignKeyQuery(tableName, constraint.constraint_name), __spreadValues({ raw: true }, options))));
    }
    return await this.sequelize.query(this.queryGenerator.removeColumnQuery(tableName, columnName), __spreadValues({ raw: true }, options));
  }
  async upsert(tableName, insertValues, updateValues, where, options) {
    options = __spreadValues({}, options);
    options.type = QueryTypes.UPSERT;
    options.updateOnDuplicate = Object.keys(updateValues);
    options.upsertKeys = Object.values(options.model.primaryKeys).map((item) => item.field);
    const model = options.model;
    const sql = this.queryGenerator.insertQuery(tableName, insertValues, model.rawAttributes, options);
    return await this.sequelize.query(sql, options);
  }
  async removeConstraint(tableName, constraintName, options) {
    const sql = this.queryGenerator.showConstraintsQuery(tableName.tableName ? tableName : {
      tableName,
      schema: this.sequelize.config.database
    }, constraintName);
    const constraints = await this.sequelize.query(sql, __spreadProps(__spreadValues({}, options), {
      type: this.sequelize.QueryTypes.SHOWCONSTRAINTS
    }));
    const constraint = constraints[0];
    let query;
    if (!constraint || !constraint.constraintType) {
      throw new sequelizeErrors.UnknownConstraintError({
        message: `Constraint ${constraintName} on table ${tableName} does not exist`,
        constraint: constraintName,
        table: tableName
      });
    }
    if (constraint.constraintType === "FOREIGN KEY") {
      query = this.queryGenerator.dropForeignKeyQuery(tableName, constraintName);
    } else {
      query = this.queryGenerator.removeIndexQuery(constraint.tableName, constraint.constraintName);
    }
    return await this.sequelize.query(query, options);
  }
}
exports.MySQLQueryInterface = MySQLQueryInterface;
//# sourceMappingURL=query-interface.js.map
