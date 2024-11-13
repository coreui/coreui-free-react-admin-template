"use strict";
const AbstractConnectionManager = require("../abstract/connection-manager");
const sequelizeErrors = require("../../errors");
const { logger } = require("../../utils/logger");
const DataTypes = require("../../data-types").db2;
const debug = logger.debugContext("connection:db2");
const parserStore = require("../parserStore")("db2");
class ConnectionManager extends AbstractConnectionManager {
  constructor(dialect, sequelize) {
    sequelize.config.port = sequelize.config.port || 3306;
    super(dialect, sequelize);
    this.lib = this._loadDialectModule("ibm_db");
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
    const connectionConfig = {
      database: config.database,
      hostname: config.host,
      port: config.port,
      uid: config.username,
      pwd: config.password
    };
    if (config.ssl) {
      connectionConfig["security"] = config.ssl;
    }
    if (config.sslcertificate) {
      connectionConfig["SSLServerCertificate"] = config.sslcertificate;
    }
    if (config.dialectOptions) {
      for (const key of Object.keys(config.dialectOptions)) {
        connectionConfig[key] = config.dialectOptions[key];
      }
    }
    try {
      const connection = await new Promise((resolve, reject) => {
        const connection2 = new this.lib.Database();
        connection2.lib = this.lib;
        connection2.open(connectionConfig, (error) => {
          if (error) {
            if (error.message && error.message.includes("SQL30081N")) {
              return reject(new sequelizeErrors.ConnectionRefusedError(error));
            }
            return reject(new sequelizeErrors.ConnectionError(error));
          }
          return resolve(connection2);
        });
      });
      return connection;
    } catch (err) {
      throw new sequelizeErrors.ConnectionError(err);
    }
  }
  disconnect(connection) {
    if (connection.connected) {
      connection.close((error) => {
        if (error) {
          debug(error);
        } else {
          debug("connection closed");
        }
      });
    }
    return Promise.resolve();
  }
  validate(connection) {
    return connection && connection.connected;
  }
  _disconnect(connection) {
    return this.dialect.connectionManager.disconnect(connection);
  }
}
module.exports = ConnectionManager;
module.exports.ConnectionManager = ConnectionManager;
module.exports.default = ConnectionManager;
//# sourceMappingURL=connection-manager.js.map
