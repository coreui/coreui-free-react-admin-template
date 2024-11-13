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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  OracleQueryInterface: () => OracleQueryInterface
});
const { QueryInterface } = require("../abstract/query-interface");
const QueryTypes = require("../../query-types");
const _ = require("lodash");
class OracleQueryInterface extends QueryInterface {
  async upsert(tableName, insertValues, updateValues, where, options) {
    options = __spreadValues({}, options);
    const model = options.model;
    const primaryKeys = Object.values(model.primaryKeys).map((item) => item.field);
    const uniqueKeys = Object.values(model.uniqueKeys).filter((c) => c.fields.length > 0).map((c) => c.fields);
    const indexKeys = Object.values(model._indexes).filter((c) => c.unique && c.fields.length > 0).map((c) => c.fields);
    options.type = QueryTypes.UPSERT;
    options.updateOnDuplicate = Object.keys(updateValues);
    options.upsertKeys = [];
    for (const field of options.updateOnDuplicate) {
      const uniqueKey = uniqueKeys.find((fields) => fields.includes(field));
      if (uniqueKey) {
        options.upsertKeys = uniqueKey;
        break;
      }
      const indexKey = indexKeys.find((fields) => fields.includes(field));
      if (indexKey) {
        options.upsertKeys = indexKey;
        break;
      }
    }
    if (options.upsertKeys.length === 0 || _.intersection(options.updateOnDuplicate, primaryKeys).length) {
      options.upsertKeys = primaryKeys;
    }
    options.upsertKeys = _.uniq(options.upsertKeys);
    let whereHasNull = false;
    primaryKeys.forEach((element) => {
      if (where[element] === null) {
        whereHasNull = true;
      }
    });
    if (whereHasNull === true) {
      where = options.upsertKeys.reduce((result, attribute) => {
        result[attribute] = insertValues[attribute];
        return result;
      }, {});
    }
    const sql = this.queryGenerator.upsertQuery(tableName, insertValues, updateValues, where, model, options);
    if (sql.bind) {
      options.bind = void 0;
    }
    return await this.sequelize.query(sql, options);
  }
}
//# sourceMappingURL=query-interface.js.map
