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
const AbstractConnectionManager = require("../abstract/connection-manager");
const SequelizeErrors = require("../../errors");
const { logger } = require("../../utils/logger");
const DataTypes = require("../../data-types").mysql;
const momentTz = require("moment-timezone");
const debug = logger.debugContext("connection:mysql");
const parserStore = require("../parserStore")("mysql");
const { promisify } = require("util");
class ConnectionManager extends AbstractConnectionManager {
  constructor(dialect, sequelize) {
    sequelize.config.port = sequelize.config.port || 3306;
    super(dialect, sequelize);
    this.lib = this._loadDialectModule("mysql2");
    this.refreshTypeParser(DataTypes);
  }
  _refreshTypeParser(dataType) {
    parserStore.refresh(dataType);
  }
  _clearTypeParser() {
    parserStore.clear();
  }
  static _typecast(field, next) {
    if (parserStore.get(field.type)) {
      return parserStore.get(field.type)(field, this.sequelize.options, next);
    }
    return next();
  }
  async connect(config) {
    const connectionConfig = __spreadValues({
      host: config.host,
      port: config.port,
      user: config.username,
      flags: "-FOUND_ROWS",
      password: config.password,
      database: config.database,
      timezone: this.sequelize.options.timezone,
      typeCast: ConnectionManager._typecast.bind(this),
      bigNumberStrings: false,
      supportBigNumbers: true
    }, config.dialectOptions);
    try {
      const connection = await new Promise((resolve, reject) => {
        const connection2 = this.lib.createConnection(connectionConfig);
        const errorHandler = (e) => {
          connection2.removeListener("connect", connectHandler);
          connection2.removeListener("error", connectHandler);
          reject(e);
        };
        const connectHandler = () => {
          connection2.removeListener("error", errorHandler);
          resolve(connection2);
        };
        connection2.on("error", errorHandler);
        connection2.once("connect", connectHandler);
      });
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
      if (!this.sequelize.config.keepDefaultTimezone) {
        let tzOffset = this.sequelize.options.timezone;
        tzOffset = /\//.test(tzOffset) ? momentTz.tz(tzOffset).format("Z") : tzOffset;
        await promisify((cb) => connection.query(`SET time_zone = '${tzOffset}'`, cb))();
      }
      return connection;
    } catch (err) {
      switch (err.code) {
        case "ECONNREFUSED":
          throw new SequelizeErrors.ConnectionRefusedError(err);
        case "ER_ACCESS_DENIED_ERROR":
          throw new SequelizeErrors.AccessDeniedError(err);
        case "ENOTFOUND":
          throw new SequelizeErrors.HostNotFoundError(err);
        case "EHOSTUNREACH":
          throw new SequelizeErrors.HostNotReachableError(err);
        case "EINVAL":
          throw new SequelizeErrors.InvalidConnectionError(err);
        default:
          throw new SequelizeErrors.ConnectionError(err);
      }
    }
  }
  async disconnect(connection) {
    if (connection._closing) {
      debug("connection tried to disconnect but was already at CLOSED state");
      return;
    }
    return await promisify((callback) => connection.end(callback))();
  }
  validate(connection) {
    return connection && !connection._fatalError && !connection._protocolError && !connection._closing && !connection.stream.destroyed;
  }
}
module.exports = ConnectionManager;
module.exports.ConnectionManager = ConnectionManager;
module.exports.default = ConnectionManager;
//# sourceMappingURL=connection-manager.js.map
