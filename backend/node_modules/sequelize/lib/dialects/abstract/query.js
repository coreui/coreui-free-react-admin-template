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
const _ = require("lodash");
const SqlString = require("../../sql-string");
const QueryTypes = require("../../query-types");
const Dot = require("dottie");
const deprecations = require("../../utils/deprecations");
const uuid = require("uuid").v4;
const { safeStringifyJson } = require("../../utils.js");
class AbstractQuery {
  constructor(connection, sequelize, options) {
    this.uuid = uuid();
    this.connection = connection;
    this.instance = options.instance;
    this.model = options.model;
    this.sequelize = sequelize;
    this.options = __spreadValues({
      plain: false,
      raw: false,
      logging: console.log
    }, options);
    this.checkLoggingOption();
    if (options.rawErrors) {
      this.formatError = AbstractQuery.prototype.formatError;
    }
  }
  static formatBindParameters(sql, values, dialect, replacementFunc, options) {
    if (!values) {
      return [sql, []];
    }
    options = options || {};
    if (typeof replacementFunc !== "function") {
      options = replacementFunc || {};
      replacementFunc = void 0;
    }
    if (!replacementFunc) {
      if (options.skipValueReplace) {
        replacementFunc = (match, key, values2) => {
          if (values2[key] !== void 0) {
            return match;
          }
          return void 0;
        };
      } else {
        replacementFunc = (match, key, values2, timeZone2, dialect2) => {
          if (values2[key] !== void 0) {
            return SqlString.escape(values2[key], timeZone2, dialect2);
          }
          return void 0;
        };
      }
    } else if (options.skipValueReplace) {
      const origReplacementFunc = replacementFunc;
      replacementFunc = (match, key, values2, timeZone2, dialect2, options2) => {
        if (origReplacementFunc(match, key, values2, timeZone2, dialect2, options2) !== void 0) {
          return match;
        }
        return void 0;
      };
    }
    const timeZone = null;
    const list = Array.isArray(values);
    sql = sql.replace(/\B\$(\$|\w+)/g, (match, key) => {
      if (key === "$") {
        return options.skipUnescape ? match : key;
      }
      let replVal;
      if (list) {
        if (key.match(/^[1-9]\d*$/)) {
          key = key - 1;
          replVal = replacementFunc(match, key, values, timeZone, dialect, options);
        }
      } else if (!key.match(/^\d*$/)) {
        replVal = replacementFunc(match, key, values, timeZone, dialect, options);
      }
      if (replVal === void 0) {
        throw new Error(`Named bind parameter "${match}" has no value in the given object.`);
      }
      return replVal;
    });
    return [sql, []];
  }
  formatError(error, errStack) {
    error.stack = errStack;
    return error;
  }
  run() {
    throw new Error("The run method wasn't overwritten!");
  }
  checkLoggingOption() {
    if (this.options.logging === true) {
      deprecations.noTrueLogging();
      this.options.logging = console.log;
    }
  }
  getInsertIdField() {
    return "insertId";
  }
  getUniqueConstraintErrorMessage(field) {
    let message = field ? `${field} must be unique` : "Must be unique";
    if (field && this.model) {
      for (const key of Object.keys(this.model.uniqueKeys)) {
        if (this.model.uniqueKeys[key].fields.includes(field.replace(/"/g, ""))) {
          if (this.model.uniqueKeys[key].msg) {
            message = this.model.uniqueKeys[key].msg;
          }
        }
      }
    }
    return message;
  }
  isRawQuery() {
    return this.options.type === QueryTypes.RAW;
  }
  isVersionQuery() {
    return this.options.type === QueryTypes.VERSION;
  }
  isUpsertQuery() {
    return this.options.type === QueryTypes.UPSERT;
  }
  isInsertQuery(results, metaData) {
    let result = true;
    if (this.options.type === QueryTypes.INSERT) {
      return true;
    }
    result = result && this.sql.toLowerCase().startsWith("insert into");
    result = result && (!results || Object.prototype.hasOwnProperty.call(results, this.getInsertIdField()));
    result = result && (!metaData || Object.prototype.hasOwnProperty.call(metaData, this.getInsertIdField()));
    return result;
  }
  handleInsertQuery(results, metaData) {
    if (this.instance) {
      const autoIncrementAttribute = this.model.autoIncrementAttribute;
      let id = null;
      id = id || results && results[this.getInsertIdField()];
      id = id || metaData && metaData[this.getInsertIdField()];
      this.instance[autoIncrementAttribute] = id;
    }
  }
  isShowTablesQuery() {
    return this.options.type === QueryTypes.SHOWTABLES;
  }
  handleShowTablesQuery(results) {
    return _.flatten(results.map((resultSet) => Object.values(resultSet)));
  }
  isShowIndexesQuery() {
    return this.options.type === QueryTypes.SHOWINDEXES;
  }
  isShowConstraintsQuery() {
    return this.options.type === QueryTypes.SHOWCONSTRAINTS;
  }
  isDescribeQuery() {
    return this.options.type === QueryTypes.DESCRIBE;
  }
  isSelectQuery() {
    return this.options.type === QueryTypes.SELECT;
  }
  isBulkUpdateQuery() {
    return this.options.type === QueryTypes.BULKUPDATE;
  }
  isBulkDeleteQuery() {
    return this.options.type === QueryTypes.BULKDELETE;
  }
  isForeignKeysQuery() {
    return this.options.type === QueryTypes.FOREIGNKEYS;
  }
  isUpdateQuery() {
    return this.options.type === QueryTypes.UPDATE;
  }
  handleSelectQuery(results) {
    let result = null;
    if (this.options.fieldMap) {
      const fieldMap = this.options.fieldMap;
      results = results.map((result2) => _.reduce(fieldMap, (result3, name, field) => {
        if (result3[field] !== void 0 && name !== field) {
          result3[name] = result3[field];
          delete result3[field];
        }
        return result3;
      }, result2));
    }
    if (this.options.raw) {
      result = results.map((result2) => {
        let o = {};
        for (const key in result2) {
          if (Object.prototype.hasOwnProperty.call(result2, key)) {
            o[key] = result2[key];
          }
        }
        if (this.options.nest) {
          o = Dot.transform(o);
        }
        return o;
      });
    } else if (this.options.hasJoin === true) {
      results = AbstractQuery._groupJoinData(results, {
        model: this.model,
        includeMap: this.options.includeMap,
        includeNames: this.options.includeNames
      }, {
        checkExisting: this.options.hasMultiAssociation
      });
      result = this.model.bulkBuild(results, {
        isNewRecord: false,
        include: this.options.include,
        includeNames: this.options.includeNames,
        includeMap: this.options.includeMap,
        includeValidated: true,
        attributes: this.options.originalAttributes || this.options.attributes,
        raw: true
      });
    } else {
      result = this.model.bulkBuild(results, {
        isNewRecord: false,
        raw: true,
        attributes: this.options.originalAttributes || this.options.attributes
      });
    }
    if (this.options.plain) {
      result = result.length === 0 ? null : result[0];
    }
    return result;
  }
  isShowOrDescribeQuery() {
    let result = false;
    result = result || this.sql.toLowerCase().startsWith("show");
    result = result || this.sql.toLowerCase().startsWith("describe");
    return result;
  }
  isCallQuery() {
    return this.sql.toLowerCase().startsWith("call");
  }
  _logQuery(sql, debugContext, parameters) {
    const { connection, options } = this;
    const benchmark = this.sequelize.options.benchmark || options.benchmark;
    const logQueryParameters = this.sequelize.options.logQueryParameters || options.logQueryParameters;
    const startTime = Date.now();
    let logParameter = "";
    if (logQueryParameters && parameters) {
      const delimiter = sql.endsWith(";") ? "" : ";";
      let paramStr;
      if (Array.isArray(parameters)) {
        paramStr = parameters.map((p) => safeStringifyJson(p)).join(", ");
      } else {
        paramStr = safeStringifyJson(parameters);
      }
      logParameter = `${delimiter} ${paramStr}`;
    }
    const fmt = `(${connection.uuid || "default"}): ${sql}${logParameter}`;
    const msg = `Executing ${fmt}`;
    debugContext(msg);
    if (!benchmark) {
      this.sequelize.log(`Executing ${fmt}`, options);
    }
    return () => {
      const afterMsg = `Executed ${fmt}`;
      debugContext(afterMsg);
      if (benchmark) {
        this.sequelize.log(afterMsg, Date.now() - startTime, options);
      }
    };
  }
  static _groupJoinData(rows, includeOptions, options) {
    if (!rows.length) {
      return [];
    }
    let i;
    let length;
    let $i;
    let $length;
    let rowsI;
    let row;
    const rowsLength = rows.length;
    let keys;
    let key;
    let keyI;
    let keyLength;
    let prevKey;
    let values;
    let topValues;
    let topExists;
    const checkExisting = options.checkExisting;
    let itemHash;
    let parentHash;
    let topHash;
    const results = checkExisting ? [] : new Array(rowsLength);
    const resultMap = {};
    const includeMap = {};
    let $keyPrefix;
    let $keyPrefixString;
    let $prevKeyPrefixString;
    let $prevKeyPrefix;
    let $lastKeyPrefix;
    let $current;
    let $parent;
    let previousPiece;
    const buildIncludeMap = (piece) => {
      if (Object.prototype.hasOwnProperty.call($current.includeMap, piece)) {
        includeMap[key] = $current = $current.includeMap[piece];
        if (previousPiece) {
          previousPiece = `${previousPiece}.${piece}`;
        } else {
          previousPiece = piece;
        }
        includeMap[previousPiece] = $current;
      }
    };
    const keyPrefixStringMemo = {};
    const keyPrefixString = (key2, memo) => {
      if (!Object.prototype.hasOwnProperty.call(memo, key2)) {
        memo[key2] = key2.substr(0, key2.lastIndexOf("."));
      }
      return memo[key2];
    };
    const removeKeyPrefixMemo = {};
    const removeKeyPrefix = (key2) => {
      if (!Object.prototype.hasOwnProperty.call(removeKeyPrefixMemo, key2)) {
        const index = key2.lastIndexOf(".");
        removeKeyPrefixMemo[key2] = key2.substr(index === -1 ? 0 : index + 1);
      }
      return removeKeyPrefixMemo[key2];
    };
    const keyPrefixMemo = {};
    const keyPrefix = (key2) => {
      if (!Object.prototype.hasOwnProperty.call(keyPrefixMemo, key2)) {
        const prefixString = keyPrefixString(key2, keyPrefixStringMemo);
        if (!Object.prototype.hasOwnProperty.call(keyPrefixMemo, prefixString)) {
          keyPrefixMemo[prefixString] = prefixString ? prefixString.split(".") : [];
        }
        keyPrefixMemo[key2] = keyPrefixMemo[prefixString];
      }
      return keyPrefixMemo[key2];
    };
    const lastKeyPrefixMemo = {};
    const lastKeyPrefix = (key2) => {
      if (!Object.prototype.hasOwnProperty.call(lastKeyPrefixMemo, key2)) {
        const prefix2 = keyPrefix(key2);
        const length2 = prefix2.length;
        lastKeyPrefixMemo[key2] = !length2 ? "" : prefix2[length2 - 1];
      }
      return lastKeyPrefixMemo[key2];
    };
    const getUniqueKeyAttributes = (model) => {
      let uniqueKeyAttributes2 = _.chain(model.uniqueKeys);
      uniqueKeyAttributes2 = uniqueKeyAttributes2.result(`${uniqueKeyAttributes2.findKey()}.fields`).map((field) => _.findKey(model.attributes, (chr) => chr.field === field)).value();
      return uniqueKeyAttributes2;
    };
    const stringify = (obj) => obj instanceof Buffer ? obj.toString("hex") : obj;
    let primaryKeyAttributes;
    let uniqueKeyAttributes;
    let prefix;
    for (rowsI = 0; rowsI < rowsLength; rowsI++) {
      row = rows[rowsI];
      if (rowsI === 0) {
        keys = _.sortBy(Object.keys(row), (item) => [item.split(".").length]);
        keyLength = keys.length;
      }
      if (checkExisting) {
        topExists = false;
        $length = includeOptions.model.primaryKeyAttributes.length;
        topHash = "";
        if ($length === 1) {
          topHash = stringify(row[includeOptions.model.primaryKeyAttributes[0]]);
        } else if ($length > 1) {
          for ($i = 0; $i < $length; $i++) {
            topHash += stringify(row[includeOptions.model.primaryKeyAttributes[$i]]);
          }
        } else if (!_.isEmpty(includeOptions.model.uniqueKeys)) {
          uniqueKeyAttributes = getUniqueKeyAttributes(includeOptions.model);
          for ($i = 0; $i < uniqueKeyAttributes.length; $i++) {
            topHash += row[uniqueKeyAttributes[$i]];
          }
        }
      }
      topValues = values = {};
      $prevKeyPrefix = void 0;
      for (keyI = 0; keyI < keyLength; keyI++) {
        key = keys[keyI];
        $keyPrefixString = keyPrefixString(key, keyPrefixStringMemo);
        $keyPrefix = keyPrefix(key);
        if (rowsI === 0 && !Object.prototype.hasOwnProperty.call(includeMap, key)) {
          if (!$keyPrefix.length) {
            includeMap[key] = includeMap[""] = includeOptions;
          } else {
            $current = includeOptions;
            previousPiece = void 0;
            $keyPrefix.forEach(buildIncludeMap);
          }
        }
        if ($prevKeyPrefix !== void 0 && $prevKeyPrefix !== $keyPrefix) {
          if (checkExisting) {
            length = $prevKeyPrefix.length;
            $parent = null;
            parentHash = null;
            if (length) {
              for (i = 0; i < length; i++) {
                prefix = $parent ? `${$parent}.${$prevKeyPrefix[i]}` : $prevKeyPrefix[i];
                primaryKeyAttributes = includeMap[prefix].model.primaryKeyAttributes;
                $length = primaryKeyAttributes.length;
                itemHash = prefix;
                if ($length === 1) {
                  itemHash += stringify(row[`${prefix}.${primaryKeyAttributes[0]}`]);
                } else if ($length > 1) {
                  for ($i = 0; $i < $length; $i++) {
                    itemHash += stringify(row[`${prefix}.${primaryKeyAttributes[$i]}`]);
                  }
                } else if (!_.isEmpty(includeMap[prefix].model.uniqueKeys)) {
                  uniqueKeyAttributes = getUniqueKeyAttributes(includeMap[prefix].model);
                  for ($i = 0; $i < uniqueKeyAttributes.length; $i++) {
                    itemHash += row[`${prefix}.${uniqueKeyAttributes[$i]}`];
                  }
                }
                if (!parentHash) {
                  parentHash = topHash;
                }
                itemHash = parentHash + itemHash;
                $parent = prefix;
                if (i < length - 1) {
                  parentHash = itemHash;
                }
              }
            } else {
              itemHash = topHash;
            }
            if (itemHash === topHash) {
              if (!resultMap[itemHash]) {
                resultMap[itemHash] = values;
              } else {
                topExists = true;
              }
            } else if (!resultMap[itemHash]) {
              $parent = resultMap[parentHash];
              $lastKeyPrefix = lastKeyPrefix(prevKey);
              if (includeMap[prevKey].association.isSingleAssociation) {
                if ($parent) {
                  $parent[$lastKeyPrefix] = resultMap[itemHash] = values;
                }
              } else {
                if (!$parent[$lastKeyPrefix]) {
                  $parent[$lastKeyPrefix] = [];
                }
                $parent[$lastKeyPrefix].push(resultMap[itemHash] = values);
              }
            }
            values = {};
          } else {
            $current = topValues;
            length = $keyPrefix.length;
            if (length) {
              for (i = 0; i < length; i++) {
                if (i === length - 1) {
                  values = $current[$keyPrefix[i]] = {};
                }
                $current = $current[$keyPrefix[i]] || {};
              }
            }
          }
        }
        values[removeKeyPrefix(key)] = row[key];
        prevKey = key;
        $prevKeyPrefix = $keyPrefix;
        $prevKeyPrefixString = $keyPrefixString;
      }
      if (checkExisting) {
        length = $prevKeyPrefix.length;
        $parent = null;
        parentHash = null;
        if (length) {
          for (i = 0; i < length; i++) {
            prefix = $parent ? `${$parent}.${$prevKeyPrefix[i]}` : $prevKeyPrefix[i];
            primaryKeyAttributes = includeMap[prefix].model.primaryKeyAttributes;
            $length = primaryKeyAttributes.length;
            itemHash = prefix;
            if ($length === 1) {
              itemHash += stringify(row[`${prefix}.${primaryKeyAttributes[0]}`]);
            } else if ($length > 0) {
              for ($i = 0; $i < $length; $i++) {
                itemHash += stringify(row[`${prefix}.${primaryKeyAttributes[$i]}`]);
              }
            } else if (!_.isEmpty(includeMap[prefix].model.uniqueKeys)) {
              uniqueKeyAttributes = getUniqueKeyAttributes(includeMap[prefix].model);
              for ($i = 0; $i < uniqueKeyAttributes.length; $i++) {
                itemHash += row[`${prefix}.${uniqueKeyAttributes[$i]}`];
              }
            }
            if (!parentHash) {
              parentHash = topHash;
            }
            itemHash = parentHash + itemHash;
            $parent = prefix;
            if (i < length - 1) {
              parentHash = itemHash;
            }
          }
        } else {
          itemHash = topHash;
        }
        if (itemHash === topHash) {
          if (!resultMap[itemHash]) {
            resultMap[itemHash] = values;
          } else {
            topExists = true;
          }
        } else if (!resultMap[itemHash]) {
          $parent = resultMap[parentHash];
          $lastKeyPrefix = lastKeyPrefix(prevKey);
          if (includeMap[prevKey].association.isSingleAssociation) {
            if ($parent) {
              $parent[$lastKeyPrefix] = resultMap[itemHash] = values;
            }
          } else {
            if (!$parent[$lastKeyPrefix]) {
              $parent[$lastKeyPrefix] = [];
            }
            $parent[$lastKeyPrefix].push(resultMap[itemHash] = values);
          }
        }
        if (!topExists) {
          results.push(topValues);
        }
      } else {
        results[rowsI] = topValues;
      }
    }
    return results;
  }
}
module.exports = AbstractQuery;
module.exports.AbstractQuery = AbstractQuery;
module.exports.default = AbstractQuery;
//# sourceMappingURL=query.js.map
