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
  OracleConnectionManager: () => OracleConnectionManager
});
const AbstractConnectionManager = require("../abstract/connection-manager");
const SequelizeErrors = require("../../errors");
const parserStore = require("../parserStore")("oracle");
const { logger } = require("../../utils/logger");
const semver = require("semver");
const debug = logger.debugContext("connection:oracle");
const DataTypes = require("../../data-types").oracle;
const { promisify } = require("util");
class OracleConnectionManager extends AbstractConnectionManager {
  constructor(dialect, sequelize) {
    super(dialect, sequelize);
    this.sequelize = sequelize;
    this.sequelize.config.port = this.sequelize.config.port || 1521;
    this.lib = this._loadDialectModule("oracledb");
    this.extendLib();
    this.refreshTypeParser(DataTypes);
  }
  extendLib() {
    if (this.sequelize.config && "dialectOptions" in this.sequelize.config) {
      const dialectOptions = this.sequelize.config.dialectOptions;
      if (dialectOptions && "maxRows" in dialectOptions) {
        this.lib.maxRows = this.sequelize.config.dialectOptions.maxRows;
      }
      if (dialectOptions && "fetchAsString" in dialectOptions) {
        this.lib.fetchAsString = this.sequelize.config.dialectOptions.fetchAsString;
      } else {
        this.lib.fetchAsString = [this.lib.CLOB];
      }
    }
    this.lib.fetchAsBuffer = [this.lib.BLOB];
  }
  buildConnectString(config) {
    if (!config.host || config.host.length === 0)
      return config.database;
    let connectString = config.host;
    if (config.port && config.port > 0) {
      connectString += `:${config.port}`;
    } else {
      connectString += ":1521";
    }
    if (config.database && config.database.length > 0) {
      connectString += `/${config.database}`;
    }
    return connectString;
  }
  _refreshTypeParser(dataType) {
    parserStore.refresh(dataType);
  }
  _clearTypeParser() {
    parserStore.clear();
  }
  async connect(config) {
    const connectionConfig = __spreadValues({
      user: config.username,
      password: config.password,
      externalAuth: config.externalAuth,
      stmtCacheSize: 0,
      connectString: this.buildConnectString(config)
    }, config.dialectOptions);
    try {
      const connection = await this.lib.getConnection(connectionConfig);
      this.sequelize.options.databaseVersion = semver.coerce(connection.oracleServerVersionString).version;
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
      let errorCode = err.message.split(":");
      errorCode = errorCode[0];
      switch (errorCode) {
        case "ORA-12560":
        case "ORA-12154":
        case "ORA-12505":
        case "ORA-12514":
        case "NJS-511":
        case "NJS-516":
        case "NJS-517":
        case "NJS-520":
          throw new SequelizeErrors.ConnectionRefusedError(err);
        case "ORA-28000":
        case "ORA-28040":
        case "ORA-01017":
        case "NJS-506":
          throw new SequelizeErrors.AccessDeniedError(err);
        case "ORA-12541":
        case "NJS-503":
        case "NJS-508":
        case "NJS-507":
          throw new SequelizeErrors.HostNotReachableError(err);
        case "NJS-512":
        case "NJS-515":
        case "NJS-518":
        case "NJS-519":
          throw new SequelizeErrors.InvalidConnectionError(err);
        case "ORA-12170":
        case "NJS-510":
          throw new SequelizeErrors.ConnectionTimedOutError(err);
        default:
          throw new SequelizeErrors.ConnectionError(err);
      }
    }
  }
  async disconnect(connection) {
    if (!connection.isHealthy()) {
      debug("connection tried to disconnect but was already at CLOSED state");
      return;
    }
    return await promisify((callback) => connection.close(callback))();
  }
  validate(connection) {
    return connection && connection.isHealthy();
  }
}
//# sourceMappingURL=connection-manager.js.map
