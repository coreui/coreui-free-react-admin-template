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
const _ = require("lodash");
const Utils = require("../../utils");
const Op = require("../../operators");
const { QueryInterface } = require("../abstract/query-interface");
const QueryTypes = require("../../query-types");
class Db2QueryInterface extends QueryInterface {
  async getForeignKeyReferencesForTable(tableName, options) {
    const queryOptions = __spreadProps(__spreadValues({}, options), {
      type: QueryTypes.FOREIGNKEYS
    });
    const query = this.queryGenerator.getForeignKeysQuery(tableName, this.sequelize.config.username.toUpperCase());
    return this.sequelize.query(query, queryOptions);
  }
  async upsert(tableName, insertValues, updateValues, where, options) {
    options = __spreadValues({}, options);
    const model = options.model;
    const wheres = [];
    const attributes = Object.keys(insertValues);
    let indexes = [];
    let indexFields;
    options = _.clone(options);
    if (!Utils.isWhereEmpty(where)) {
      wheres.push(where);
    }
    indexes = _.map(model.uniqueKeys, (value) => {
      return value.fields;
    });
    model._indexes.forEach((value) => {
      if (value.unique) {
        indexFields = value.fields.map((field) => {
          if (_.isPlainObject(field)) {
            return field.attribute;
          }
          return field;
        });
        indexes.push(indexFields);
      }
    });
    for (const index of indexes) {
      if (_.intersection(attributes, index).length === index.length) {
        where = {};
        for (const field of index) {
          where[field] = insertValues[field];
        }
        wheres.push(where);
      }
    }
    where = { [Op.or]: wheres };
    options.type = QueryTypes.UPSERT;
    options.raw = true;
    const sql = this.queryGenerator.upsertQuery(tableName, insertValues, updateValues, where, model, options);
    const result = await this.sequelize.query(sql, options);
    return [result, void 0];
  }
  async createTable(tableName, attributes, options, model) {
    let sql = "";
    options = __spreadValues({}, options);
    if (options && options.uniqueKeys) {
      _.forOwn(options.uniqueKeys, (uniqueKey) => {
        if (uniqueKey.customIndex === void 0) {
          uniqueKey.customIndex = true;
        }
      });
    }
    if (model) {
      options.uniqueKeys = options.uniqueKeys || model.uniqueKeys;
    }
    attributes = _.mapValues(attributes, (attribute) => this.sequelize.normalizeAttribute(attribute));
    if (options.indexes) {
      options.indexes.forEach((fields) => {
        const fieldArr = fields.fields;
        if (fieldArr.length === 1) {
          fieldArr.forEach((field) => {
            for (const property in attributes) {
              if (field === attributes[property].field) {
                attributes[property].unique = true;
              }
            }
          });
        }
      });
    }
    if (options.alter) {
      if (options.indexes) {
        options.indexes.forEach((fields) => {
          const fieldArr = fields.fields;
          if (fieldArr.length === 1) {
            fieldArr.forEach((field) => {
              for (const property in attributes) {
                if (field === attributes[property].field && attributes[property].unique) {
                  attributes[property].unique = false;
                }
              }
            });
          }
        });
      }
    }
    if (!tableName.schema && (options.schema || !!model && model._schema)) {
      tableName = this.queryGenerator.addSchema({
        tableName,
        _schema: !!model && model._schema || options.schema
      });
    }
    attributes = this.queryGenerator.attributesToSQL(attributes, { table: tableName, context: "createTable", withoutForeignKeyConstraints: options.withoutForeignKeyConstraints });
    sql = this.queryGenerator.createTableQuery(tableName, attributes, options);
    return await this.sequelize.query(sql, options);
  }
}
exports.Db2QueryInterface = Db2QueryInterface;
//# sourceMappingURL=query-interface.js.map
