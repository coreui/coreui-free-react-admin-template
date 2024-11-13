"use strict";
const wkx = require("wkx");
const _ = require("lodash");
const momentTz = require("moment-timezone");
const moment = require("moment");
module.exports = (BaseTypes) => {
  BaseTypes.ABSTRACT.prototype.dialectTypes = "https://dev.mysql.com/doc/refman/5.7/en/data-types.html";
  BaseTypes.DATE.types.mysql = ["DATETIME"];
  BaseTypes.STRING.types.mysql = ["VAR_STRING"];
  BaseTypes.CHAR.types.mysql = ["STRING"];
  BaseTypes.TEXT.types.mysql = ["BLOB"];
  BaseTypes.TINYINT.types.mysql = ["TINY"];
  BaseTypes.SMALLINT.types.mysql = ["SHORT"];
  BaseTypes.MEDIUMINT.types.mysql = ["INT24"];
  BaseTypes.INTEGER.types.mysql = ["LONG"];
  BaseTypes.BIGINT.types.mysql = ["LONGLONG"];
  BaseTypes.FLOAT.types.mysql = ["FLOAT"];
  BaseTypes.TIME.types.mysql = ["TIME"];
  BaseTypes.DATEONLY.types.mysql = ["DATE"];
  BaseTypes.BOOLEAN.types.mysql = ["TINY"];
  BaseTypes.BLOB.types.mysql = ["TINYBLOB", "BLOB", "LONGBLOB"];
  BaseTypes.DECIMAL.types.mysql = ["NEWDECIMAL"];
  BaseTypes.UUID.types.mysql = false;
  BaseTypes.ENUM.types.mysql = false;
  BaseTypes.REAL.types.mysql = ["DOUBLE"];
  BaseTypes.DOUBLE.types.mysql = ["DOUBLE"];
  BaseTypes.GEOMETRY.types.mysql = ["GEOMETRY"];
  BaseTypes.JSON.types.mysql = ["JSON"];
  class DECIMAL extends BaseTypes.DECIMAL {
    toSql() {
      let definition = super.toSql();
      if (this._unsigned) {
        definition += " UNSIGNED";
      }
      if (this._zerofill) {
        definition += " ZEROFILL";
      }
      return definition;
    }
  }
  class DATE extends BaseTypes.DATE {
    toSql() {
      return this._length ? `DATETIME(${this._length})` : "DATETIME";
    }
    _stringify(date, options) {
      if (!moment.isMoment(date)) {
        date = this._applyTimezone(date, options);
      }
      if (this._length) {
        return date.format("YYYY-MM-DD HH:mm:ss.SSS");
      }
      return date.format("YYYY-MM-DD HH:mm:ss");
    }
    static parse(value, options) {
      value = value.string();
      if (value === null) {
        return value;
      }
      if (momentTz.tz.zone(options.timezone)) {
        value = momentTz.tz(value, options.timezone).toDate();
      } else {
        value = new Date(`${value} ${options.timezone}`);
      }
      return value;
    }
  }
  class DATEONLY extends BaseTypes.DATEONLY {
    static parse(value) {
      return value.string();
    }
  }
  class UUID extends BaseTypes.UUID {
    toSql() {
      return "CHAR(36) BINARY";
    }
  }
  const SUPPORTED_GEOMETRY_TYPES = ["POINT", "LINESTRING", "POLYGON"];
  class GEOMETRY extends BaseTypes.GEOMETRY {
    constructor(type, srid) {
      super(type, srid);
      if (_.isEmpty(this.type)) {
        this.sqlType = this.key;
        return;
      }
      if (SUPPORTED_GEOMETRY_TYPES.includes(this.type)) {
        this.sqlType = this.type;
        return;
      }
      throw new Error(`Supported geometry types are: ${SUPPORTED_GEOMETRY_TYPES.join(", ")}`);
    }
    static parse(value) {
      value = value.buffer();
      if (!value || value.length === 0) {
        return null;
      }
      value = value.slice(4);
      return wkx.Geometry.parse(value).toGeoJSON({ shortCrs: true });
    }
    toSql() {
      return this.sqlType;
    }
  }
  class ENUM extends BaseTypes.ENUM {
    toSql(options) {
      return `ENUM(${this.values.map((value) => options.escape(value)).join(", ")})`;
    }
  }
  class JSONTYPE extends BaseTypes.JSON {
    _stringify(value, options) {
      return options.operation === "where" && typeof value === "string" ? value : JSON.stringify(value);
    }
  }
  return {
    ENUM,
    DATE,
    DATEONLY,
    UUID,
    GEOMETRY,
    DECIMAL,
    JSON: JSONTYPE
  };
};
//# sourceMappingURL=data-types.js.map
