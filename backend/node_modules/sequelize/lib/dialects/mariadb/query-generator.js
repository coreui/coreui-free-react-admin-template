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
const MySQLQueryGenerator = require("../mysql/query-generator");
const Utils = require("./../../utils");
class MariaDBQueryGenerator extends MySQLQueryGenerator {
  createSchema(schema, options) {
    options = __spreadValues({
      charset: null,
      collate: null
    }, options);
    return Utils.joinSQLFragments([
      "CREATE SCHEMA IF NOT EXISTS",
      this.quoteIdentifier(schema),
      options.charset && `DEFAULT CHARACTER SET ${this.escape(options.charset)}`,
      options.collate && `DEFAULT COLLATE ${this.escape(options.collate)}`,
      ";"
    ]);
  }
  dropSchema(schema) {
    return `DROP SCHEMA IF EXISTS ${this.quoteIdentifier(schema)};`;
  }
  showSchemasQuery(options) {
    const schemasToSkip = [
      "'MYSQL'",
      "'INFORMATION_SCHEMA'",
      "'PERFORMANCE_SCHEMA'"
    ];
    if (options.skip && Array.isArray(options.skip) && options.skip.length > 0) {
      for (const schemaName of options.skip) {
        schemasToSkip.push(this.escape(schemaName));
      }
    }
    return Utils.joinSQLFragments([
      "SELECT SCHEMA_NAME as schema_name",
      "FROM INFORMATION_SCHEMA.SCHEMATA",
      `WHERE SCHEMA_NAME NOT IN (${schemasToSkip.join(", ")})`,
      ";"
    ]);
  }
  showTablesQuery(database) {
    let query = "SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";
    if (database) {
      query += ` AND TABLE_SCHEMA = ${this.escape(database)}`;
    } else {
      query += " AND TABLE_SCHEMA NOT IN ('MYSQL', 'INFORMATION_SCHEMA', 'PERFORMANCE_SCHEMA')";
    }
    return `${query};`;
  }
  quoteIdentifier(identifier, force) {
    return Utils.addTicks(Utils.removeTicks(identifier, "`"), "`");
  }
}
module.exports = MariaDBQueryGenerator;
//# sourceMappingURL=query-generator.js.map
