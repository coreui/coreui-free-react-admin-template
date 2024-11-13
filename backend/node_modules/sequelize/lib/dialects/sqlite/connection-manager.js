"use strict";
const fs = require("fs");
const path = require("path");
const AbstractConnectionManager = require("../abstract/connection-manager");
const { logger } = require("../../utils/logger");
const debug = logger.debugContext("connection:sqlite");
const dataTypes = require("../../data-types").sqlite;
const sequelizeErrors = require("../../errors");
const parserStore = require("../parserStore")("sqlite");
const { promisify } = require("util");
class ConnectionManager extends AbstractConnectionManager {
  constructor(dialect, sequelize) {
    super(dialect, sequelize);
    if (this.sequelize.options.host === "localhost") {
      delete this.sequelize.options.host;
    }
    this.connections = {};
    this.lib = this._loadDialectModule("sqlite3");
    this.refreshTypeParser(dataTypes);
  }
  async _onProcessExit() {
    await Promise.all(Object.getOwnPropertyNames(this.connections).map((connection) => promisify((callback) => this.connections[connection].close(callback))()));
    return super._onProcessExit.call(this);
  }
  _refreshTypeParser(dataType) {
    parserStore.refresh(dataType);
  }
  _clearTypeParser() {
    parserStore.clear();
  }
  async getConnection(options) {
    options = options || {};
    options.uuid = options.uuid || "default";
    if (!!this.sequelize.options.storage !== null && this.sequelize.options.storage !== void 0) {
      options.storage = this.sequelize.options.storage;
    } else {
      options.storage = this.sequelize.options.host || ":memory:";
    }
    options.inMemory = options.storage === ":memory:" ? 1 : 0;
    const dialectOptions = this.sequelize.options.dialectOptions;
    const defaultReadWriteMode = this.lib.OPEN_READWRITE | this.lib.OPEN_CREATE;
    options.readWriteMode = dialectOptions && dialectOptions.mode || defaultReadWriteMode;
    if (this.connections[options.inMemory || options.uuid]) {
      return this.connections[options.inMemory || options.uuid];
    }
    if (!options.inMemory && (options.readWriteMode & this.lib.OPEN_CREATE) !== 0) {
      fs.mkdirSync(path.dirname(options.storage), { recursive: true });
    }
    const connection = await new Promise((resolve, reject) => {
      this.connections[options.inMemory || options.uuid] = new this.lib.Database(options.storage, options.readWriteMode, (err) => {
        if (err)
          return reject(new sequelizeErrors.ConnectionError(err));
        debug(`connection acquired ${options.uuid}`);
        resolve(this.connections[options.inMemory || options.uuid]);
      });
    });
    if (this.sequelize.config.password) {
      connection.run(`PRAGMA KEY=${this.sequelize.escape(this.sequelize.config.password)}`);
    }
    if (this.sequelize.options.foreignKeys !== false) {
      connection.run("PRAGMA FOREIGN_KEYS=ON");
    }
    return connection;
  }
  releaseConnection(connection, force) {
    if (connection.filename === ":memory:" && force !== true)
      return;
    if (connection.uuid) {
      connection.close();
      debug(`connection released ${connection.uuid}`);
      delete this.connections[connection.uuid];
    }
  }
}
module.exports = ConnectionManager;
module.exports.ConnectionManager = ConnectionManager;
module.exports.default = ConnectionManager;
//# sourceMappingURL=connection-manager.js.map
