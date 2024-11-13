"use strict";
const moment = require("moment");
const momentTz = require("moment-timezone");
module.exports = (BaseTypes) => {
  const warn = BaseTypes.ABSTRACT.warn.bind(void 0, "https://www.oracle.com/pls/topic/lookup?ctx=dblatest&id=GUID-D424D23B-0933-425F-BC69-9C0E6724693C");
  BaseTypes.DATE.types.oracle = ["TIMESTAMP", "TIMESTAMP WITH LOCAL TIME ZONE"];
  BaseTypes.STRING.types.oracle = ["VARCHAR2", "NVARCHAR2"];
  BaseTypes.CHAR.types.oracle = ["CHAR", "RAW"];
  BaseTypes.TEXT.types.oracle = ["CLOB"];
  BaseTypes.TINYINT.types.oracle = ["NUMBER"];
  BaseTypes.SMALLINT.types.oracle = ["NUMBER"];
  BaseTypes.MEDIUMINT.types.oracle = ["NUMBER"];
  BaseTypes.INTEGER.types.oracle = ["INTEGER"];
  BaseTypes.BIGINT.types.oracle = ["NUMBER"];
  BaseTypes.FLOAT.types.oracle = ["BINARY_FLOAT"];
  BaseTypes.DATEONLY.types.oracle = ["DATE"];
  BaseTypes.BOOLEAN.types.oracle = ["CHAR(1)"];
  BaseTypes.BLOB.types.oracle = ["BLOB"];
  BaseTypes.DECIMAL.types.oracle = ["NUMBER"];
  BaseTypes.UUID.types.oracle = ["VARCHAR2"];
  BaseTypes.ENUM.types.oracle = ["VARCHAR2"];
  BaseTypes.REAL.types.oracle = ["BINARY_DOUBLE"];
  BaseTypes.DOUBLE.types.oracle = ["BINARY_DOUBLE"];
  BaseTypes.JSON.types.oracle = ["BLOB"];
  BaseTypes.GEOMETRY.types.oracle = false;
  class STRING extends BaseTypes.STRING {
    toSql() {
      if (this.length > 4e3 || this._binary && this._length > 2e3) {
        warn("Oracle supports length up to 32764 bytes or characters; Be sure that your administrator has extended the MAX_STRING_SIZE parameter. Check https://docs.oracle.com/pls/topic/lookup?ctx=dblatest&id=GUID-7B72E154-677A-4342-A1EA-C74C1EA928E6");
      }
      if (!this._binary) {
        return `NVARCHAR2(${this._length})`;
      }
      return `RAW(${this._length})`;
    }
    _stringify(value, options) {
      if (this._binary) {
        return options.escape(value.toString("hex"));
      }
      return options.escape(value);
    }
    _getBindDef(oracledb) {
      if (this._binary) {
        return { type: oracledb.DB_TYPE_RAW, maxSize: this._length };
      }
      return { type: oracledb.DB_TYPE_VARCHAR, maxSize: this._length };
    }
    _bindParam(value, options) {
      return options.bindParam(value);
    }
  }
  STRING.prototype.escape = false;
  class BOOLEAN extends BaseTypes.BOOLEAN {
    toSql() {
      return "CHAR(1)";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_CHAR, maxSize: 1 };
    }
    _stringify(value) {
      return value === true ? "1" : value === false ? "0" : value;
    }
    _sanitize(value) {
      if (typeof value === "string") {
        return value === "1" || value === "true" ? true : value === "0" || value === "false" ? false : value;
      }
      return super._sanitize(value);
    }
  }
  class UUID extends BaseTypes.UUID {
    toSql() {
      return "VARCHAR2(36)";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_VARCHAR, maxSize: 36 };
    }
  }
  class NOW extends BaseTypes.NOW {
    toSql() {
      return "SYSDATE";
    }
    _stringify() {
      return "SYSDATE";
    }
  }
  class ENUM extends BaseTypes.ENUM {
    toSql() {
      return "VARCHAR2(512)";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_VARCHAR, maxSize: 512 };
    }
  }
  class TEXT extends BaseTypes.TEXT {
    toSql() {
      return "CLOB";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_CLOB };
    }
  }
  class CHAR extends BaseTypes.CHAR {
    toSql() {
      if (this._binary) {
        warn("Oracle CHAR.BINARY datatype is not of Fixed Length.");
        return `RAW(${this._length})`;
      }
      return super.toSql();
    }
    _getBindDef(oracledb) {
      if (this._binary) {
        return { type: oracledb.DB_TYPE_RAW, maxSize: this._length };
      }
      return { type: oracledb.DB_TYPE_CHAR, maxSize: this._length };
    }
    _bindParam(value, options) {
      return options.bindParam(value);
    }
  }
  class DATE extends BaseTypes.DATE {
    toSql() {
      return "TIMESTAMP WITH LOCAL TIME ZONE";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_TIMESTAMP_LTZ };
    }
    _stringify(date, options) {
      const format = "YYYY-MM-DD HH24:MI:SS.FFTZH:TZM";
      date = this._applyTimezone(date, options);
      const formatedDate = date.format("YYYY-MM-DD HH:mm:ss.SSS Z");
      return `TO_TIMESTAMP_TZ('${formatedDate}','${format}')`;
    }
    _applyTimezone(date, options) {
      if (options.timezone) {
        if (momentTz.tz.zone(options.timezone)) {
          date = momentTz(date).tz(options.timezone);
        } else {
          date = moment(date).utcOffset(options.timezone);
        }
      } else {
        date = momentTz(date);
      }
      return date;
    }
    static parse(value, options) {
      if (value === null) {
        return value;
      }
      if (options && moment.tz.zone(options.timezone)) {
        value = moment.tz(value.toString(), options.timezone).toDate();
      }
      return value;
    }
    _bindParam(value, options) {
      return options.bindParam(value);
    }
  }
  DATE.prototype.escape = false;
  class DECIMAL extends BaseTypes.DECIMAL {
    toSql() {
      let result = "";
      if (this._length) {
        result += `(${this._length}`;
        if (typeof this._decimals === "number") {
          result += `,${this._decimals}`;
        }
        result += ")";
      }
      if (!this._length && this._precision) {
        result += `(${this._precision}`;
        if (typeof this._scale === "number") {
          result += `,${this._scale}`;
        }
        result += ")";
      }
      return `NUMBER${result}`;
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_NUMBER };
    }
  }
  class TINYINT extends BaseTypes.TINYINT {
    toSql() {
      return "NUMBER(3)";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_NUMBER };
    }
  }
  class SMALLINT extends BaseTypes.SMALLINT {
    toSql() {
      if (this._length) {
        return `NUMBER(${this._length},0)`;
      }
      return "SMALLINT";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_NUMBER };
    }
  }
  class MEDIUMINT extends BaseTypes.MEDIUMINT {
    toSql() {
      return "NUMBER(8)";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_NUMBER };
    }
  }
  class BIGINT extends BaseTypes.BIGINT {
    constructor(length) {
      super(length);
      if (!(this instanceof BIGINT))
        return new BIGINT(length);
      BaseTypes.BIGINT.apply(this, arguments);
      if (this._length || this.options.length || this._unsigned || this._zerofill) {
        warn("Oracle does not support BIGINT with options");
        this._length = void 0;
        this.options.length = void 0;
        this._unsigned = void 0;
        this._zerofill = void 0;
      }
    }
    toSql() {
      return "NUMBER(19)";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_NUMBER };
    }
    _sanitize(value) {
      if (typeof value === "bigint" || typeof value === "number") {
        return value.toString();
      }
      return value;
    }
  }
  class NUMBER extends BaseTypes.NUMBER {
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_NUMBER };
    }
  }
  class INTEGER extends BaseTypes.INTEGER {
    toSql() {
      if (this._length) {
        return `NUMBER(${this._length},0)`;
      }
      return "INTEGER";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_NUMBER };
    }
  }
  class FLOAT extends BaseTypes.FLOAT {
    toSql() {
      return "BINARY_FLOAT";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_BINARY_FLOAT };
    }
  }
  class REAL extends BaseTypes.REAL {
    toSql() {
      return "BINARY_DOUBLE";
    }
    _stringify(value) {
      if (value === Number.POSITIVE_INFINITY) {
        return "inf";
      }
      if (value === Number.NEGATIVE_INFINITY) {
        return "-inf";
      }
      return value;
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_BINARY_DOUBLE };
    }
  }
  class BLOB extends BaseTypes.BLOB {
    _hexify(hex) {
      return `'${hex}'`;
    }
    toSql() {
      return "BLOB";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_BLOB };
    }
  }
  class JSONTYPE extends BaseTypes.JSON {
    toSql() {
      return "BLOB";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_BLOB };
    }
    _stringify(value, options) {
      return options.operation === "where" && typeof value === "string" ? value : JSON.stringify(value);
    }
    _bindParam(value, options) {
      return options.bindParam(Buffer.from(JSON.stringify(value)));
    }
  }
  class DOUBLE extends BaseTypes.DOUBLE {
    constructor(length, decimals) {
      super(length, decimals);
      if (!(this instanceof DOUBLE))
        return new BaseTypes.DOUBLE(length, decimals);
      BaseTypes.DOUBLE.apply(this, arguments);
      if (this._length || this._unsigned || this._zerofill) {
        warn("Oracle does not support DOUBLE with options.");
        this._length = void 0;
        this.options.length = void 0;
        this._unsigned = void 0;
        this._zerofill = void 0;
      }
      this.key = "DOUBLE PRECISION";
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_BINARY_DOUBLE };
    }
    toSql() {
      return "BINARY_DOUBLE";
    }
  }
  class DATEONLY extends BaseTypes.DATEONLY {
    parse(value) {
      return moment(value).format("YYYY-MM-DD");
    }
    _sanitize(value) {
      if (value) {
        return moment(value).format("YYYY-MM-DD");
      }
      return value;
    }
    _stringify(date, options) {
      if (date) {
        const format = "YYYY/MM/DD";
        return options.escape(`TO_DATE('${date}','${format}')`);
      }
      return options.escape(date);
    }
    _getBindDef(oracledb) {
      return { type: oracledb.DB_TYPE_DATE };
    }
    _bindParam(value, options) {
      if (typeof value === "string") {
        return options.bindParam(new Date(value));
      }
      return options.bindParam(value);
    }
  }
  DATEONLY.prototype.escape = false;
  return {
    BOOLEAN,
    "DOUBLE PRECISION": DOUBLE,
    DOUBLE,
    STRING,
    TINYINT,
    SMALLINT,
    MEDIUMINT,
    BIGINT,
    NUMBER,
    INTEGER,
    FLOAT,
    UUID,
    DATEONLY,
    DATE,
    NOW,
    BLOB,
    ENUM,
    TEXT,
    CHAR,
    JSON: JSONTYPE,
    REAL,
    DECIMAL
  };
};
//# sourceMappingURL=data-types.js.map
