"use strict";
const { Pool, TimeoutError } = require("sequelize-pool");
const _ = require("lodash");
const semver = require("semver");
const errors = require("../../errors");
const { logger } = require("../../utils/logger");
const deprecations = require("../../utils/deprecations");
const debug = logger.debugContext("pool");
class ConnectionManager {
  constructor(dialect, sequelize) {
    const config = _.cloneDeep(sequelize.config);
    this.sequelize = sequelize;
    this.config = config;
    this.dialect = dialect;
    this.versionPromise = null;
    this.dialectName = this.sequelize.options.dialect;
    if (config.pool === false) {
      throw new Error("Support for pool:false was removed in v4.0");
    }
    config.pool = _.defaults(config.pool || {}, {
      max: 5,
      min: 0,
      idle: 1e4,
      acquire: 6e4,
      evict: 1e3,
      validate: this._validate.bind(this)
    });
    this.initPools();
  }
  refreshTypeParser(dataTypes) {
    _.each(dataTypes, (dataType) => {
      if (Object.prototype.hasOwnProperty.call(dataType, "parse")) {
        if (dataType.types[this.dialectName]) {
          this._refreshTypeParser(dataType);
        } else {
          throw new Error(`Parse function not supported for type ${dataType.key} in dialect ${this.dialectName}`);
        }
      }
    });
  }
  _loadDialectModule(moduleName) {
    try {
      if (this.sequelize.config.dialectModulePath) {
        return require(this.sequelize.config.dialectModulePath);
      }
      if (this.sequelize.config.dialectModule) {
        return this.sequelize.config.dialectModule;
      }
      return require(moduleName);
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") {
        if (this.sequelize.config.dialectModulePath) {
          throw new Error(`Unable to find dialect at ${this.sequelize.config.dialectModulePath}`);
        }
        throw new Error(`Please install ${moduleName} package manually`);
      }
      throw err;
    }
  }
  async _onProcessExit() {
    if (!this.pool) {
      return;
    }
    await this.pool.drain();
    debug("connection drain due to process exit");
    return await this.pool.destroyAllNow();
  }
  async close() {
    this.getConnection = async function getConnection() {
      throw new Error("ConnectionManager.getConnection was called after the connection manager was closed!");
    };
    return await this._onProcessExit();
  }
  initPools() {
    const config = this.config;
    if (!config.replication) {
      this.pool = new Pool({
        name: "sequelize",
        create: () => this._connect(config),
        destroy: async (connection) => {
          const result = await this._disconnect(connection);
          debug("connection destroy");
          return result;
        },
        validate: config.pool.validate,
        max: config.pool.max,
        min: config.pool.min,
        acquireTimeoutMillis: config.pool.acquire,
        idleTimeoutMillis: config.pool.idle,
        reapIntervalMillis: config.pool.evict,
        maxUses: config.pool.maxUses
      });
      debug(`pool created with max/min: ${config.pool.max}/${config.pool.min}, no replication`);
      return;
    }
    if (!Array.isArray(config.replication.read)) {
      config.replication.read = [config.replication.read];
    }
    config.replication.write = _.defaults(config.replication.write, _.omit(config, "replication"));
    config.replication.read = config.replication.read.map((readConfig) => _.defaults(readConfig, _.omit(this.config, "replication")));
    let reads = 0;
    this.pool = {
      release: (client) => {
        if (client.queryType === "read") {
          this.pool.read.release(client);
        } else {
          this.pool.write.release(client);
        }
      },
      acquire: (queryType, useMaster) => {
        useMaster = useMaster === void 0 ? false : useMaster;
        if (queryType === "SELECT" && !useMaster) {
          return this.pool.read.acquire();
        }
        return this.pool.write.acquire();
      },
      destroy: (connection) => {
        this.pool[connection.queryType].destroy(connection);
        debug("connection destroy");
      },
      destroyAllNow: async () => {
        await Promise.all([
          this.pool.read.destroyAllNow(),
          this.pool.write.destroyAllNow()
        ]);
        debug("all connections destroyed");
      },
      drain: async () => Promise.all([
        this.pool.write.drain(),
        this.pool.read.drain()
      ]),
      read: new Pool({
        name: "sequelize:read",
        create: async () => {
          const nextRead = reads++ % config.replication.read.length;
          const connection = await this._connect(config.replication.read[nextRead]);
          connection.queryType = "read";
          return connection;
        },
        destroy: (connection) => this._disconnect(connection),
        validate: config.pool.validate,
        max: config.pool.max,
        min: config.pool.min,
        acquireTimeoutMillis: config.pool.acquire,
        idleTimeoutMillis: config.pool.idle,
        reapIntervalMillis: config.pool.evict,
        maxUses: config.pool.maxUses
      }),
      write: new Pool({
        name: "sequelize:write",
        create: async () => {
          const connection = await this._connect(config.replication.write);
          connection.queryType = "write";
          return connection;
        },
        destroy: (connection) => this._disconnect(connection),
        validate: config.pool.validate,
        max: config.pool.max,
        min: config.pool.min,
        acquireTimeoutMillis: config.pool.acquire,
        idleTimeoutMillis: config.pool.idle,
        reapIntervalMillis: config.pool.evict,
        maxUses: config.pool.maxUses
      })
    };
    debug(`pool created with max/min: ${config.pool.max}/${config.pool.min}, with replication`);
  }
  async getConnection(options) {
    options = options || {};
    if (this.sequelize.options.databaseVersion === 0) {
      if (!this.versionPromise) {
        this.versionPromise = (async () => {
          try {
            const connection = await this._connect(this.config.replication.write || this.config);
            const _options = {};
            _options.transaction = { connection };
            _options.logging = () => {
            };
            _options.logging.__testLoggingFn = true;
            if (this.sequelize.options.databaseVersion === 0) {
              const version = await this.sequelize.databaseVersion(_options);
              const parsedVersion = _.get(semver.coerce(version), "version") || version;
              this.sequelize.options.databaseVersion = semver.valid(parsedVersion) ? parsedVersion : this.dialect.defaultVersion;
            }
            if (semver.lt(this.sequelize.options.databaseVersion, this.dialect.defaultVersion)) {
              deprecations.unsupportedEngine();
              debug(`Unsupported database engine version ${this.sequelize.options.databaseVersion}`);
            }
            this.versionPromise = null;
            return await this._disconnect(connection);
          } catch (err) {
            this.versionPromise = null;
            throw err;
          }
        })();
      }
      await this.versionPromise;
    }
    let result;
    try {
      await this.sequelize.runHooks("beforePoolAcquire", options);
      result = await this.pool.acquire(options.type, options.useMaster);
      await this.sequelize.runHooks("afterPoolAcquire", result, options);
    } catch (error) {
      if (error instanceof TimeoutError)
        throw new errors.ConnectionAcquireTimeoutError(error);
      throw error;
    }
    debug("connection acquired");
    return result;
  }
  releaseConnection(connection) {
    this.pool.release(connection);
    debug("connection released");
  }
  async destroyConnection(connection) {
    await this.pool.destroy(connection);
    debug(`connection ${connection.uuid} destroyed`);
  }
  async _connect(config) {
    await this.sequelize.runHooks("beforeConnect", config);
    const connection = await this.dialect.connectionManager.connect(config);
    await this.sequelize.runHooks("afterConnect", connection, config);
    return connection;
  }
  async _disconnect(connection) {
    await this.sequelize.runHooks("beforeDisconnect", connection);
    await this.dialect.connectionManager.disconnect(connection);
    return this.sequelize.runHooks("afterDisconnect", connection);
  }
  _validate(connection) {
    if (!this.dialect.connectionManager.validate) {
      return true;
    }
    return this.dialect.connectionManager.validate(connection);
  }
}
module.exports = ConnectionManager;
module.exports.ConnectionManager = ConnectionManager;
module.exports.default = ConnectionManager;
//# sourceMappingURL=connection-manager.js.map
