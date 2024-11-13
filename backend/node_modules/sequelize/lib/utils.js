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
const DataTypes = require("./data-types");
const SqlString = require("./sql-string");
const _ = require("lodash");
const baseIsNative = require("lodash/_baseIsNative");
const uuidv1 = require("uuid").v1;
const uuidv4 = require("uuid").v4;
const operators = require("./operators");
const operatorsSet = new Set(Object.values(operators));
let inflection = require("inflection");
exports.classToInvokable = require("./utils/class-to-invokable").classToInvokable;
exports.joinSQLFragments = require("./utils/join-sql-fragments").joinSQLFragments;
function useInflection(_inflection) {
  inflection = _inflection;
}
exports.useInflection = useInflection;
function camelizeIf(str, condition) {
  let result = str;
  if (condition) {
    result = camelize(str);
  }
  return result;
}
exports.camelizeIf = camelizeIf;
function underscoredIf(str, condition) {
  let result = str;
  if (condition) {
    result = underscore(str);
  }
  return result;
}
exports.underscoredIf = underscoredIf;
function isPrimitive(val) {
  const type = typeof val;
  return ["string", "number", "boolean"].includes(type);
}
exports.isPrimitive = isPrimitive;
function mergeDefaults(a, b) {
  return _.mergeWith(a, b, (objectValue, sourceValue) => {
    if (!_.isPlainObject(objectValue) && objectValue !== void 0) {
      if (_.isFunction(objectValue) && baseIsNative(objectValue)) {
        return sourceValue || objectValue;
      }
      return objectValue;
    }
  });
}
exports.mergeDefaults = mergeDefaults;
function merge() {
  const result = {};
  for (const obj of arguments) {
    _.forOwn(obj, (value, key) => {
      if (value !== void 0) {
        if (!result[key]) {
          result[key] = value;
        } else if (_.isPlainObject(value) && _.isPlainObject(result[key])) {
          result[key] = merge(result[key], value);
        } else if (Array.isArray(value) && Array.isArray(result[key])) {
          result[key] = value.concat(result[key]);
        } else {
          result[key] = value;
        }
      }
    });
  }
  return result;
}
exports.merge = merge;
function spliceStr(str, index, count, add) {
  return str.slice(0, index) + add + str.slice(index + count);
}
exports.spliceStr = spliceStr;
function camelize(str) {
  return str.trim().replace(/[-_\s]+(.)?/g, (match, c) => c.toUpperCase());
}
exports.camelize = camelize;
function underscore(str) {
  return inflection.underscore(str);
}
exports.underscore = underscore;
function singularize(str) {
  return inflection.singularize(str);
}
exports.singularize = singularize;
function pluralize(str) {
  return inflection.pluralize(str);
}
exports.pluralize = pluralize;
function format(arr, dialect) {
  const timeZone = null;
  return SqlString.format(arr[0], arr.slice(1), timeZone, dialect);
}
exports.format = format;
function formatNamedParameters(sql, parameters, dialect) {
  const timeZone = null;
  return SqlString.formatNamedParameters(sql, parameters, timeZone, dialect);
}
exports.formatNamedParameters = formatNamedParameters;
function cloneDeep(obj, onlyPlain) {
  obj = obj || {};
  return _.cloneDeepWith(obj, (elem) => {
    if (Array.isArray(elem) || _.isPlainObject(elem)) {
      return void 0;
    }
    if (onlyPlain || typeof elem === "object") {
      return elem;
    }
    if (elem && typeof elem.clone === "function") {
      return elem.clone();
    }
  });
}
exports.cloneDeep = cloneDeep;
function mapFinderOptions(options, Model) {
  if (options.attributes && Array.isArray(options.attributes)) {
    options.attributes = Model._injectDependentVirtualAttributes(options.attributes);
    options.attributes = options.attributes.filter((v) => !Model._virtualAttributes.has(v));
  }
  mapOptionFieldNames(options, Model);
  return options;
}
exports.mapFinderOptions = mapFinderOptions;
function mapOptionFieldNames(options, Model) {
  if (Array.isArray(options.attributes)) {
    options.attributes = options.attributes.map((attr) => {
      if (typeof attr !== "string")
        return attr;
      if (Model.rawAttributes[attr] && attr !== Model.rawAttributes[attr].field) {
        return [Model.rawAttributes[attr].field, attr];
      }
      return attr;
    });
  }
  if (options.where && _.isPlainObject(options.where)) {
    options.where = mapWhereFieldNames(options.where, Model);
  }
  return options;
}
exports.mapOptionFieldNames = mapOptionFieldNames;
function mapWhereFieldNames(attributes, Model) {
  if (attributes) {
    attributes = cloneDeep(attributes);
    getComplexKeys(attributes).forEach((attribute) => {
      const rawAttribute = Model.rawAttributes[attribute];
      if (rawAttribute && rawAttribute.field !== rawAttribute.fieldName) {
        attributes[rawAttribute.field] = attributes[attribute];
        delete attributes[attribute];
      }
      if (_.isPlainObject(attributes[attribute]) && !(rawAttribute && (rawAttribute.type instanceof DataTypes.HSTORE || rawAttribute.type instanceof DataTypes.JSON))) {
        attributes[attribute] = mapOptionFieldNames({
          where: attributes[attribute]
        }, Model).where;
      }
      if (Array.isArray(attributes[attribute])) {
        attributes[attribute].forEach((where, index) => {
          if (_.isPlainObject(where)) {
            attributes[attribute][index] = mapWhereFieldNames(where, Model);
          }
        });
      }
    });
  }
  return attributes;
}
exports.mapWhereFieldNames = mapWhereFieldNames;
function mapValueFieldNames(dataValues, fields, Model) {
  const values = {};
  for (const attr of fields) {
    if (dataValues[attr] !== void 0 && !Model._virtualAttributes.has(attr)) {
      if (Model.rawAttributes[attr] && Model.rawAttributes[attr].field && Model.rawAttributes[attr].field !== attr) {
        values[Model.rawAttributes[attr].field] = dataValues[attr];
      } else {
        values[attr] = dataValues[attr];
      }
    }
  }
  return values;
}
exports.mapValueFieldNames = mapValueFieldNames;
function isColString(value) {
  return typeof value === "string" && value[0] === "$" && value[value.length - 1] === "$";
}
exports.isColString = isColString;
function canTreatArrayAsAnd(arr) {
  return arr.some((arg) => _.isPlainObject(arg) || arg instanceof Where);
}
exports.canTreatArrayAsAnd = canTreatArrayAsAnd;
function combineTableNames(tableName1, tableName2) {
  return tableName1.toLowerCase() < tableName2.toLowerCase() ? tableName1 + tableName2 : tableName2 + tableName1;
}
exports.combineTableNames = combineTableNames;
function toDefaultValue(value, dialect) {
  if (typeof value === "function") {
    const tmp = value();
    if (tmp instanceof DataTypes.ABSTRACT) {
      return tmp.toSql();
    }
    return tmp;
  }
  if (value instanceof DataTypes.UUIDV1) {
    return uuidv1();
  }
  if (value instanceof DataTypes.UUIDV4) {
    return uuidv4();
  }
  if (value instanceof DataTypes.NOW) {
    return now(dialect);
  }
  if (Array.isArray(value)) {
    return value.slice();
  }
  if (_.isPlainObject(value)) {
    return __spreadValues({}, value);
  }
  return value;
}
exports.toDefaultValue = toDefaultValue;
function defaultValueSchemable(value) {
  if (value === void 0) {
    return false;
  }
  if (value instanceof DataTypes.NOW) {
    return false;
  }
  if (value instanceof DataTypes.UUIDV1 || value instanceof DataTypes.UUIDV4) {
    return false;
  }
  return typeof value !== "function";
}
exports.defaultValueSchemable = defaultValueSchemable;
function removeNullValuesFromHash(hash, omitNull, options) {
  let result = hash;
  options = options || {};
  options.allowNull = options.allowNull || [];
  if (omitNull) {
    const _hash = {};
    _.forIn(hash, (val, key) => {
      if (options.allowNull.includes(key) || key.endsWith("Id") || val !== null && val !== void 0) {
        _hash[key] = val;
      }
    });
    result = _hash;
  }
  return result;
}
exports.removeNullValuesFromHash = removeNullValuesFromHash;
const dialects = /* @__PURE__ */ new Set(["mariadb", "mysql", "postgres", "sqlite", "mssql", "db2", "oracle"]);
function now(dialect) {
  const d = new Date();
  if (!dialects.has(dialect)) {
    d.setMilliseconds(0);
  }
  return d;
}
exports.now = now;
const TICK_CHAR = "`";
exports.TICK_CHAR = TICK_CHAR;
function addTicks(s, tickChar) {
  tickChar = tickChar || TICK_CHAR;
  return tickChar + removeTicks(s, tickChar) + tickChar;
}
exports.addTicks = addTicks;
function removeTicks(s, tickChar) {
  tickChar = tickChar || TICK_CHAR;
  return s.replace(new RegExp(tickChar, "g"), "");
}
exports.removeTicks = removeTicks;
function flattenObjectDeep(value) {
  if (!_.isPlainObject(value))
    return value;
  const flattenedObj = {};
  function flattenObject(obj, subPath) {
    Object.keys(obj).forEach((key) => {
      const pathToProperty = subPath ? `${subPath}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], pathToProperty);
      } else {
        flattenedObj[pathToProperty] = _.get(obj, key);
      }
    });
    return flattenedObj;
  }
  return flattenObject(value, void 0);
}
exports.flattenObjectDeep = flattenObjectDeep;
class SequelizeMethod {
}
exports.SequelizeMethod = SequelizeMethod;
class Fn extends SequelizeMethod {
  constructor(fn, args) {
    super();
    this.fn = fn;
    this.args = args;
  }
  clone() {
    return new Fn(this.fn, this.args);
  }
}
exports.Fn = Fn;
class Col extends SequelizeMethod {
  constructor(col, ...args) {
    super();
    if (args.length > 0) {
      col = args;
    }
    this.col = col;
  }
}
exports.Col = Col;
class Cast extends SequelizeMethod {
  constructor(val, type, json) {
    super();
    this.val = val;
    this.type = (type || "").trim();
    this.json = json || false;
  }
}
exports.Cast = Cast;
class Literal extends SequelizeMethod {
  constructor(val) {
    super();
    this.val = val;
  }
}
exports.Literal = Literal;
class Json extends SequelizeMethod {
  constructor(conditionsOrPath, value) {
    super();
    if (_.isObject(conditionsOrPath)) {
      this.conditions = conditionsOrPath;
    } else {
      this.path = conditionsOrPath;
      if (value) {
        this.value = value;
      }
    }
  }
}
exports.Json = Json;
class Where extends SequelizeMethod {
  constructor(attribute, comparator, logic) {
    super();
    if (logic === void 0) {
      logic = comparator;
      comparator = "=";
    }
    this.attribute = attribute;
    this.comparator = comparator;
    this.logic = logic;
  }
}
exports.Where = Where;
function getOperators(obj) {
  return Object.getOwnPropertySymbols(obj).filter((s) => operatorsSet.has(s));
}
exports.getOperators = getOperators;
function getComplexKeys(obj) {
  return getOperators(obj).concat(Object.keys(obj));
}
exports.getComplexKeys = getComplexKeys;
function getComplexSize(obj) {
  return Array.isArray(obj) ? obj.length : getComplexKeys(obj).length;
}
exports.getComplexSize = getComplexSize;
function isWhereEmpty(obj) {
  return !!obj && _.isEmpty(obj) && getOperators(obj).length === 0;
}
exports.isWhereEmpty = isWhereEmpty;
function generateEnumName(tableName, columnName) {
  return `enum_${tableName}_${columnName}`;
}
exports.generateEnumName = generateEnumName;
function camelizeObjectKeys(obj) {
  const newObj = new Object();
  Object.keys(obj).forEach((key) => {
    newObj[camelize(key)] = obj[key];
  });
  return newObj;
}
exports.camelizeObjectKeys = camelizeObjectKeys;
function defaults(object, ...sources) {
  object = Object(object);
  sources.forEach((source) => {
    if (source) {
      source = Object(source);
      getComplexKeys(source).forEach((key) => {
        const value = object[key];
        if (value === void 0 || _.eq(value, Object.prototype[key]) && !Object.prototype.hasOwnProperty.call(object, key)) {
          object[key] = source[key];
        }
      });
    }
  });
  return object;
}
exports.defaults = defaults;
function nameIndex(index, tableName) {
  if (tableName.tableName)
    tableName = tableName.tableName;
  if (!Object.prototype.hasOwnProperty.call(index, "name")) {
    const fields = index.fields.map((field) => typeof field === "string" ? field : field.name || field.attribute);
    index.name = underscore(`${tableName}_${fields.join("_")}`);
  }
  return index;
}
exports.nameIndex = nameIndex;
function intersects(arr1, arr2) {
  return arr1.some((v) => arr2.includes(v));
}
exports.intersects = intersects;
function safeStringifyJson(value) {
  return JSON.stringify(value, (key, value2) => {
    if (typeof value2 === "bigint") {
      return String(value2);
    }
    return value2;
  });
}
exports.safeStringifyJson = safeStringifyJson;
//# sourceMappingURL=utils.js.map
