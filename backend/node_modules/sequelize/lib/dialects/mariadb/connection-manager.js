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
const semver = require("semver");
const AbstractConnectionManager = require("../abstract/connection-manager");
const SequelizeErrors = require("../../errors");
const { logger } = require("../../utils/logger");
const DataTypes = require("../../data-types").mariadb;
const momentTz = require("moment-timezone");
const debug = logger.debugContext("connection:mariadb");
const parserStore = require("../parserStore")("mariadb");
class ConnectionManager extends AbstractConnectionManager {
  constructor(dialect, sequelize) {
    sequelize.config.port = sequelize.config.port || 3306;
    super(dialect, sequelize);
    this.lib = this._loadDialectModule("mariadb");
    this.refreshTypeParser(DataTypes);
  }
  static _typecast(field, next) {
    if (parserStore.get(field.type)) {
      return parserStore.get(field.type)(field, this.sequelize.options, next);
    }
    return next();
  }
  _refreshTypeParser(dataType) {
    parserStore.refresh(dataType);
  }
  _clearTypeParser() {
    parserStore.clear();
  }
  async connect(config) {
    let tzOffset = this.sequelize.options.timezone;
    tzOffset = /\//.test(tzOffset) ? momentTz.tz(tzOffset).format("Z") : tzOffset;
    const connectionConfig = __spreadValues({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
      timezone: tzOffset,
      typeCast: ConnectionManager._typecast.bind(this),
      bigNumberStrings: false,
      supportBigNumbers: true,
      foundRows: false
    }, config.dialectOptions);
    if (!this.sequelize.config.keepDefaultTimezone) {
      if (connectionConfig.initSql) {
        if (!Array.isArray(connectionConfig.initSql)) {
          connectionConfig.initSql = [connectionConfig.initSql];
        }
        connectionConfig.initSql.push(`SET time_zone = '${tzOffset}'`);
      } else {
        connectionConfig.initSql = `SET time_zone = '${tzOffset}'`;
      }
    }
    try {
      const connection = await this.lib.createConnection(connectionConfig);
      this.sequelize.options.databaseVersion = semver.coerce(connection.serverVersion()).version;
      debug("connection acquired");
      connection.on("error", (error) => {
        switch (error.code) {
          case "ESOCKET":
          case "ECONNRESET":
          case "EPIPE":
          case "PROTOCOL_CONNECTION_LOST":
            this.pool.destroy(connection);
        }
      });
      return connection;
    } catch (err) {
      switch (err.code) {
        case "ECONNREFUSED":
          throw new SequelizeErrors.ConnectionRefusedError(err);
        case "ER_ACCESS_DENIED_ERROR":
        case "ER_ACCESS_DENIED_NO_PASSWORD_ERROR":
          throw new SequelizeErrors.AccessDeniedError(err);
        case "ENOTFOUND":
          throw new SequelizeErrors.HostNotFoundError(err);
        case "EHOSTUNREACH":
        case "ENETUNREACH":
        case "EADDRNOTAVAIL":
          throw new SequelizeErrors.HostNotReachableError(err);
        case "EINVAL":
          throw new SequelizeErrors.InvalidConnectionError(err);
        default:
          throw new SequelizeErrors.ConnectionError(err);
      }
    }
  }
  async disconnect(connection) {
    if (!connection.isValid()) {
      debug("connection tried to disconnect but was already at CLOSED state");
      return;
    }
    return await connection.end();
  }
  validate(connection) {
    return connection && connection.isValid();
  }
}
module.exports = ConnectionManager;
module.exports.ConnectionManager = ConnectionManager;
module.exports.default = ConnectionManager;
//# sourceMappingURL=connection-manager.js.map
