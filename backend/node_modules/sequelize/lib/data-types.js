"use strict";
const util = require("util");
const _ = require("lodash");
const wkx = require("wkx");
const sequelizeErrors = require("./errors");
const Validator = require("./utils/validator-extras").validator;
const momentTz = require("moment-timezone");
const moment = require("moment");
const { logger } = require("./utils/logger");
const warnings = {};
const { classToInvokable } = require("./utils/class-to-invokable");
const { joinSQLFragments } = require("./utils/join-sql-fragments");
class ABSTRACT {
  toString(options) {
    return this.toSql(options);
  }
  toSql() {
    return this.key;
  }
  stringify(value, options) {
    if (this._stringify) {
      return this._stringify(value, options);
    }
    return value;
  }
  bindParam(value, options) {
    if (this._bindParam) {
      return this._bindParam(value, options);
    }
    return options.bindParam(this.stringify(value, options));
  }
  static toString() {
    return this.name;
  }
  static warn(link, text) {
    if (!warnings[text]) {
      warnings[text] = true;
      logger.warn(`${text} 
>> Check: ${link}`);
    }
  }
  static extend(oldType) {
    return new this(oldType.options);
  }
}
ABSTRACT.prototype.dialectTypes = "";
class STRING extends ABSTRACT {
  constructor(length, binary) {
    super();
    const options = typeof length === "object" && length || { length, binary };
    this.options = options;
    this._binary = options.binary;
    this._length = options.length || 255;
  }
  toSql() {
    return joinSQLFragments([
      `VARCHAR(${this._length})`,
      this._binary && "BINARY"
    ]);
  }
  validate(value) {
    if (Object.prototype.toString.call(value) !== "[object String]") {
      if (this.options.binary && Buffer.isBuffer(value) || typeof value === "number") {
        return true;
      }
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid string", value));
    }
    return true;
  }
  get BINARY() {
    this._binary = true;
    this.options.binary = true;
    return this;
  }
  static get BINARY() {
    return new this().BINARY;
  }
}
class CHAR extends STRING {
  constructor(length, binary) {
    super(typeof length === "object" && length || { length, binary });
  }
  toSql() {
    return joinSQLFragments([
      `CHAR(${this._length})`,
      this._binary && "BINARY"
    ]);
  }
}
class TEXT extends ABSTRACT {
  constructor(length) {
    super();
    const options = typeof length === "object" && length || { length };
    this.options = options;
    this._length = options.length || "";
  }
  toSql() {
    switch (this._length.toLowerCase()) {
      case "tiny":
        return "TINYTEXT";
      case "medium":
        return "MEDIUMTEXT";
      case "long":
        return "LONGTEXT";
      default:
        return this.key;
    }
  }
  validate(value) {
    if (typeof value !== "string") {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid string", value));
    }
    return true;
  }
}
class CITEXT extends ABSTRACT {
  toSql() {
    return "CITEXT";
  }
  validate(value) {
    if (typeof value !== "string") {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid string", value));
    }
    return true;
  }
}
class NUMBER extends ABSTRACT {
  constructor(options = {}) {
    super();
    if (typeof options === "number") {
      options = {
        length: options
      };
    }
    this.options = options;
    this._length = options.length;
    this._zerofill = options.zerofill;
    this._decimals = options.decimals;
    this._precision = options.precision;
    this._scale = options.scale;
    this._unsigned = options.unsigned;
  }
  toSql() {
    let result = this.key;
    if (this._length) {
      result += `(${this._length}`;
      if (typeof this._decimals === "number") {
        result += `,${this._decimals}`;
      }
      result += ")";
    }
    if (this._unsigned) {
      result += " UNSIGNED";
    }
    if (this._zerofill) {
      result += " ZEROFILL";
    }
    return result;
  }
  validate(value) {
    if (!Validator.isFloat(String(value))) {
      throw new sequelizeErrors.ValidationError(util.format(`%j is not a valid ${this.key.toLowerCase()}`, value));
    }
    return true;
  }
  _stringify(number) {
    if (typeof number === "number" || typeof number === "bigint" || typeof number === "boolean" || number === null || number === void 0) {
      return number;
    }
    if (typeof number.toString === "function") {
      return number.toString();
    }
    return number;
  }
  get UNSIGNED() {
    this._unsigned = true;
    this.options.unsigned = true;
    return this;
  }
  get ZEROFILL() {
    this._zerofill = true;
    this.options.zerofill = true;
    return this;
  }
  static get UNSIGNED() {
    return new this().UNSIGNED;
  }
  static get ZEROFILL() {
    return new this().ZEROFILL;
  }
}
class INTEGER extends NUMBER {
  validate(value) {
    if (!Validator.isInt(String(value))) {
      throw new sequelizeErrors.ValidationError(util.format(`%j is not a valid ${this.key.toLowerCase()}`, value));
    }
    return true;
  }
}
class TINYINT extends INTEGER {
}
class SMALLINT extends INTEGER {
}
class MEDIUMINT extends INTEGER {
}
class BIGINT extends INTEGER {
}
class FLOAT extends NUMBER {
  constructor(length, decimals) {
    super(typeof length === "object" && length || { length, decimals });
  }
  validate(value) {
    if (!Validator.isFloat(String(value))) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid float", value));
    }
    return true;
  }
}
class REAL extends NUMBER {
  constructor(length, decimals) {
    super(typeof length === "object" && length || { length, decimals });
  }
}
class DOUBLE extends NUMBER {
  constructor(length, decimals) {
    super(typeof length === "object" && length || { length, decimals });
  }
}
class DECIMAL extends NUMBER {
  constructor(precision, scale) {
    super(typeof precision === "object" && precision || { precision, scale });
  }
  toSql() {
    if (this._precision || this._scale) {
      return `DECIMAL(${[this._precision, this._scale].filter(_.identity).join(",")})`;
    }
    return "DECIMAL";
  }
  validate(value) {
    if (!Validator.isDecimal(String(value))) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid decimal", value));
    }
    return true;
  }
}
const protoExtensions = {
  escape: false,
  _value(value) {
    if (isNaN(value)) {
      return "NaN";
    }
    if (!isFinite(value)) {
      const sign = value < 0 ? "-" : "";
      return `${sign}Infinity`;
    }
    return value;
  },
  _stringify(value) {
    return `'${this._value(value)}'`;
  },
  _bindParam(value, options) {
    return options.bindParam(this._value(value));
  }
};
for (const floating of [FLOAT, DOUBLE, REAL]) {
  Object.assign(floating.prototype, protoExtensions);
}
class BOOLEAN extends ABSTRACT {
  toSql() {
    return "TINYINT(1)";
  }
  validate(value) {
    if (!Validator.isBoolean(String(value))) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid boolean", value));
    }
    return true;
  }
  _sanitize(value) {
    if (value !== null && value !== void 0) {
      if (Buffer.isBuffer(value) && value.length === 1) {
        value = value[0];
      }
      const type = typeof value;
      if (type === "string") {
        return value === "true" ? true : value === "false" ? false : value;
      }
      if (type === "number") {
        return value === 1 ? true : value === 0 ? false : value;
      }
    }
    return value;
  }
}
BOOLEAN.parse = BOOLEAN.prototype._sanitize;
class TIME extends ABSTRACT {
  toSql() {
    return "TIME";
  }
}
class DATE extends ABSTRACT {
  constructor(length) {
    super();
    const options = typeof length === "object" && length || { length };
    this.options = options;
    this._length = options.length || "";
  }
  toSql() {
    return "DATETIME";
  }
  validate(value) {
    if (!Validator.isDate(String(value))) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid date", value));
    }
    return true;
  }
  _sanitize(value, options) {
    if ((!options || options && !options.raw) && !(value instanceof Date) && !!value) {
      return new Date(value);
    }
    return value;
  }
  _isChanged(value, originalValue) {
    if (originalValue && !!value && (value === originalValue || value instanceof Date && originalValue instanceof Date && value.getTime() === originalValue.getTime())) {
      return false;
    }
    if (!originalValue && !value && originalValue === value) {
      return false;
    }
    return true;
  }
  _applyTimezone(date, options) {
    if (options.timezone) {
      if (momentTz.tz.zone(options.timezone)) {
        return momentTz(date).tz(options.timezone);
      }
      return date = moment(date).utcOffset(options.timezone);
    }
    return momentTz(date);
  }
  _stringify(date, options) {
    if (!moment.isMoment(date)) {
      date = this._applyTimezone(date, options);
    }
    return date.format("YYYY-MM-DD HH:mm:ss.SSS Z");
  }
}
class DATEONLY extends ABSTRACT {
  toSql() {
    return "DATE";
  }
  _stringify(date) {
    return moment(date).format("YYYY-MM-DD");
  }
  _sanitize(value, options) {
    if ((!options || options && !options.raw) && !!value) {
      return moment(value).format("YYYY-MM-DD");
    }
    return value;
  }
  _isChanged(value, originalValue) {
    if (originalValue && !!value && originalValue === value) {
      return false;
    }
    if (!originalValue && !value && originalValue === value) {
      return false;
    }
    return true;
  }
}
class HSTORE extends ABSTRACT {
  validate(value) {
    if (!_.isPlainObject(value)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid hstore", value));
    }
    return true;
  }
}
class JSONTYPE extends ABSTRACT {
  validate() {
    return true;
  }
  _stringify(value) {
    return JSON.stringify(value);
  }
}
class JSONB extends JSONTYPE {
}
class NOW extends ABSTRACT {
}
class BLOB extends ABSTRACT {
  constructor(length) {
    super();
    const options = typeof length === "object" && length || { length };
    this.options = options;
    this._length = options.length || "";
  }
  toSql() {
    switch (this._length.toLowerCase()) {
      case "tiny":
        return "TINYBLOB";
      case "medium":
        return "MEDIUMBLOB";
      case "long":
        return "LONGBLOB";
      default:
        return this.key;
    }
  }
  validate(value) {
    if (typeof value !== "string" && !Buffer.isBuffer(value)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid blob", value));
    }
    return true;
  }
  _stringify(value) {
    if (!Buffer.isBuffer(value)) {
      if (Array.isArray(value)) {
        value = Buffer.from(value);
      } else {
        value = Buffer.from(value.toString());
      }
    }
    const hex = value.toString("hex");
    return this._hexify(hex);
  }
  _hexify(hex) {
    return `X'${hex}'`;
  }
  _bindParam(value, options) {
    if (!Buffer.isBuffer(value)) {
      if (Array.isArray(value)) {
        value = Buffer.from(value);
      } else {
        value = Buffer.from(value.toString());
      }
    }
    return options.bindParam(value);
  }
}
BLOB.prototype.escape = false;
class RANGE extends ABSTRACT {
  constructor(subtype) {
    super();
    const options = _.isPlainObject(subtype) ? subtype : { subtype };
    if (!options.subtype)
      options.subtype = new INTEGER();
    if (typeof options.subtype === "function") {
      options.subtype = new options.subtype();
    }
    this._subtype = options.subtype.key;
    this.options = options;
  }
  validate(value) {
    if (!Array.isArray(value)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid range", value));
    }
    if (value.length !== 2) {
      throw new sequelizeErrors.ValidationError("A range must be an array with two elements");
    }
    return true;
  }
}
class UUID extends ABSTRACT {
  validate(value, options) {
    if (typeof value !== "string" || !Validator.isUUID(value) && (!options || !options.acceptStrings)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid uuid", value));
    }
    return true;
  }
}
class UUIDV1 extends ABSTRACT {
  validate(value, options) {
    if (typeof value !== "string" || !Validator.isUUID(value) && (!options || !options.acceptStrings)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid uuid", value));
    }
    return true;
  }
}
class UUIDV4 extends ABSTRACT {
  validate(value, options) {
    if (typeof value !== "string" || !Validator.isUUID(value, 4) && (!options || !options.acceptStrings)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid uuidv4", value));
    }
    return true;
  }
}
class VIRTUAL extends ABSTRACT {
  constructor(ReturnType, fields) {
    super();
    if (typeof ReturnType === "function")
      ReturnType = new ReturnType();
    this.returnType = ReturnType;
    this.fields = fields;
  }
}
class ENUM extends ABSTRACT {
  constructor(...args) {
    super();
    const value = args[0];
    const options = typeof value === "object" && !Array.isArray(value) && value || {
      values: args.reduce((result, element) => {
        return result.concat(Array.isArray(element) ? element : [element]);
      }, [])
    };
    this.values = options.values;
    this.options = options;
  }
  validate(value) {
    if (!this.values.includes(value)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid choice in %j", value, this.values));
    }
    return true;
  }
}
class ARRAY extends ABSTRACT {
  constructor(type) {
    super();
    const options = _.isPlainObject(type) ? type : { type };
    this.options = options;
    this.type = typeof options.type === "function" ? new options.type() : options.type;
  }
  toSql() {
    return `${this.type.toSql()}[]`;
  }
  validate(value) {
    if (!Array.isArray(value)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid array", value));
    }
    return true;
  }
  static is(obj, type) {
    return obj instanceof ARRAY && obj.type instanceof type;
  }
}
class GEOMETRY extends ABSTRACT {
  constructor(type, srid) {
    super();
    const options = _.isPlainObject(type) ? type : { type, srid };
    this.options = options;
    this.type = options.type;
    this.srid = options.srid;
  }
  _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
  }
  _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
  }
}
GEOMETRY.prototype.escape = false;
class GEOGRAPHY extends ABSTRACT {
  constructor(type, srid) {
    super();
    const options = _.isPlainObject(type) ? type : { type, srid };
    this.options = options;
    this.type = options.type;
    this.srid = options.srid;
  }
  _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
  }
  _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
  }
}
GEOGRAPHY.prototype.escape = false;
class CIDR extends ABSTRACT {
  validate(value) {
    if (typeof value !== "string" || !Validator.isIPRange(value)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid CIDR", value));
    }
    return true;
  }
}
class INET extends ABSTRACT {
  validate(value) {
    if (typeof value !== "string" || !Validator.isIP(value)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid INET", value));
    }
    return true;
  }
}
class MACADDR extends ABSTRACT {
  validate(value) {
    if (typeof value !== "string" || !Validator.isMACAddress(value)) {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid MACADDR", value));
    }
    return true;
  }
}
class TSVECTOR extends ABSTRACT {
  validate(value) {
    if (typeof value !== "string") {
      throw new sequelizeErrors.ValidationError(util.format("%j is not a valid string", value));
    }
    return true;
  }
}
const DataTypes = module.exports = {
  ABSTRACT,
  STRING,
  CHAR,
  TEXT,
  NUMBER,
  TINYINT,
  SMALLINT,
  MEDIUMINT,
  INTEGER,
  BIGINT,
  FLOAT,
  TIME,
  DATE,
  DATEONLY,
  BOOLEAN,
  NOW,
  BLOB,
  DECIMAL,
  NUMERIC: DECIMAL,
  UUID,
  UUIDV1,
  UUIDV4,
  HSTORE,
  JSON: JSONTYPE,
  JSONB,
  VIRTUAL,
  ARRAY,
  ENUM,
  RANGE,
  REAL,
  "DOUBLE PRECISION": DOUBLE,
  DOUBLE,
  GEOMETRY,
  GEOGRAPHY,
  CIDR,
  INET,
  MACADDR,
  CITEXT,
  TSVECTOR
};
_.each(DataTypes, (dataType, name) => {
  if (!Object.prototype.hasOwnProperty.call(dataType, "key")) {
    dataType.types = {};
    dataType.key = dataType.prototype.key = name;
  }
});
const dialectMap = {};
dialectMap.postgres = require("./dialects/postgres/data-types")(DataTypes);
dialectMap.mysql = require("./dialects/mysql/data-types")(DataTypes);
dialectMap.mariadb = require("./dialects/mariadb/data-types")(DataTypes);
dialectMap.sqlite = require("./dialects/sqlite/data-types")(DataTypes);
dialectMap.mssql = require("./dialects/mssql/data-types")(DataTypes);
dialectMap.db2 = require("./dialects/db2/data-types")(DataTypes);
dialectMap.snowflake = require("./dialects/snowflake/data-types")(DataTypes);
dialectMap.oracle = require("./dialects/oracle/data-types")(DataTypes);
const dialectList = Object.values(dialectMap);
for (const dataTypes of dialectList) {
  _.each(dataTypes, (DataType, key) => {
    if (!DataType.key) {
      DataType.key = DataType.prototype.key = key;
    }
  });
}
for (const dataTypes of [DataTypes, ...dialectList]) {
  _.each(dataTypes, (DataType, key) => {
    dataTypes[key] = classToInvokable(DataType);
  });
}
Object.assign(DataTypes, dialectMap);
//# sourceMappingURL=data-types.js.map
