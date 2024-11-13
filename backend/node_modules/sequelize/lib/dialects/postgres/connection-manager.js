"use strict";
const _ = require("lodash");
const AbstractConnectionManager = require("../abstract/connection-manager");
const { logger } = require("../../utils/logger");
const debug = logger.debugContext("connection:pg");
const sequelizeErrors = require("../../errors");
const semver = require("semver");
const dataTypes = require("../../data-types");
const momentTz = require("moment-timezone");
const { promisify } = require("util");
class ConnectionManager extends AbstractConnectionManager {
  constructor(dialect, sequelize) {
    sequelize.config.port = sequelize.config.port || 5432;
    super(dialect, sequelize);
    const pgLib = this._loadDialectModule("pg");
    this.lib = this.sequelize.config.native ? pgLib.native : pgLib;
    this._clearDynamicOIDs();
    this._clearTypeParser();
    this.refreshTypeParser(dataTypes.postgres);
  }
  _refreshTypeParser(dataType) {
    const arrayParserBuilder = (parser2) => {
      return (value) => this.lib.types.arrayParser.create(value, parser2).parse();
    };
    const rangeParserBuilder = (parser2) => {
      return (value) => dataType.parse(value, { parser: parser2 });
    };
    if (dataType.key.toLowerCase() === "range") {
      for (const name in this.nameOidMap) {
        const entry = this.nameOidMap[name];
        if (!entry.rangeOid)
          continue;
        const rangeParser = rangeParserBuilder(this.getTypeParser(entry.oid));
        const arrayRangeParser = arrayParserBuilder(rangeParser);
        this.oidParserMap.set(entry.rangeOid, rangeParser);
        if (!entry.arrayRangeOid)
          continue;
        this.oidParserMap.set(entry.arrayRangeOid, arrayRangeParser);
      }
      return;
    }
    const parser = (value) => dataType.parse(value);
    const arrayParser = arrayParserBuilder(parser);
    if (dataType.key.toLowerCase() === "enum") {
      this.enumOids.oids.forEach((oid) => {
        this.oidParserMap.set(oid, parser);
      });
      this.enumOids.arrayOids.forEach((arrayOid) => {
        this.oidParserMap.set(arrayOid, arrayParser);
      });
      return;
    }
    dataType.types.postgres.forEach((name) => {
      if (!this.nameOidMap[name])
        return;
      this.oidParserMap.set(this.nameOidMap[name].oid, parser);
      if (!this.nameOidMap[name].arrayOid)
        return;
      this.oidParserMap.set(this.nameOidMap[name].arrayOid, arrayParser);
    });
  }
  _clearTypeParser() {
    this.oidParserMap = /* @__PURE__ */ new Map();
  }
  getTypeParser(oid, ...args) {
    if (this.oidParserMap.get(oid))
      return this.oidParserMap.get(oid);
    return this.lib.types.getTypeParser(oid, ...args);
  }
  async connect(config) {
    config.user = config.username;
    const connectionConfig = _.pick(config, [
      "user",
      "password",
      "host",
      "database",
      "port"
    ]);
    connectionConfig.types = {
      getTypeParser: ConnectionManager.prototype.getTypeParser.bind(this)
    };
    if (config.dialectOptions) {
      _.merge(connectionConfig, _.pick(config.dialectOptions, [
        "application_name",
        "ssl",
        "client_encoding",
        "binary",
        "keepAlive",
        "statement_timeout",
        "query_timeout",
        "connectionTimeoutMillis",
        "idle_in_transaction_session_timeout",
        "lock_timeout",
        "options",
        "stream"
      ]));
    }
    const connection = await new Promise((resolve, reject) => {
      let responded = false;
      const connection2 = new this.lib.Client(connectionConfig);
      const parameterHandler = (message) => {
        switch (message.parameterName) {
          case "server_version":
            if (this.sequelize.options.databaseVersion === 0) {
              const version = semver.coerce(message.parameterValue).version;
              this.sequelize.options.databaseVersion = semver.valid(version) ? version : this.dialect.defaultVersion;
            }
            break;
          case "standard_conforming_strings":
            connection2["standard_conforming_strings"] = message.parameterValue;
            break;
        }
      };
      const endHandler = () => {
        debug("connection timeout");
        if (!responded) {
          reject(new sequelizeErrors.ConnectionTimedOutError(new Error("Connection timed out")));
        }
      };
      connection2.once("end", endHandler);
      if (!this.sequelize.config.native) {
        connection2.connection.on("parameterStatus", parameterHandler);
      }
      connection2.connect((err) => {
        responded = true;
        if (!this.sequelize.config.native) {
          connection2.connection.removeListener("parameterStatus", parameterHandler);
        }
        if (err) {
          if (err.code) {
            switch (err.code) {
              case "ECONNREFUSED":
                reject(new sequelizeErrors.ConnectionRefusedError(err));
                break;
              case "ENOTFOUND":
                reject(new sequelizeErrors.HostNotFoundError(err));
                break;
              case "EHOSTUNREACH":
                reject(new sequelizeErrors.HostNotReachableError(err));
                break;
              case "EINVAL":
                reject(new sequelizeErrors.InvalidConnectionError(err));
                break;
              default:
                reject(new sequelizeErrors.ConnectionError(err));
                break;
            }
          } else {
            reject(new sequelizeErrors.ConnectionError(err));
          }
        } else {
          debug("connection acquired");
          connection2.removeListener("end", endHandler);
          resolve(connection2);
        }
      });
    });
    connection.on("error", (error) => {
      connection._invalid = true;
      debug(`connection error ${error.code || error.message}`);
      this.pool.destroy(connection);
    });
    let query = "";
    if (this.sequelize.options.standardConformingStrings !== false && connection["standard_conforming_strings"] !== "on") {
      query += "SET standard_conforming_strings=on;";
    }
    if (this.sequelize.options.clientMinMessages !== void 0) {
      console.warn('Usage of "options.clientMinMessages" is deprecated and will be removed in v7.');
      console.warn('Please use the sequelize option "dialectOptions.clientMinMessages" instead.');
    }
    if (!(config.dialectOptions && config.dialectOptions.clientMinMessages && config.dialectOptions.clientMinMessages.toLowerCase() === "ignore" || this.sequelize.options.clientMinMessages === false)) {
      const clientMinMessages = config.dialectOptions && config.dialectOptions.clientMinMessages || this.sequelize.options.clientMinMessages || "warning";
      query += `SET client_min_messages TO ${clientMinMessages};`;
    }
    if (!this.sequelize.config.keepDefaultTimezone) {
      const isZone = !!momentTz.tz.zone(this.sequelize.options.timezone);
      if (isZone) {
        query += `SET TIME ZONE '${this.sequelize.options.timezone}';`;
      } else {
        query += `SET TIME ZONE INTERVAL '${this.sequelize.options.timezone}' HOUR TO MINUTE;`;
      }
    }
    if (query) {
      await connection.query(query);
    }
    if (Object.keys(this.nameOidMap).length === 0 && this.enumOids.oids.length === 0 && this.enumOids.arrayOids.length === 0) {
      await this._refreshDynamicOIDs(connection);
    }
    return connection;
  }
  async disconnect(connection) {
    if (connection._ending) {
      debug("connection tried to disconnect but was already at ENDING state");
      return;
    }
    return await promisify((callback) => connection.end(callback))();
  }
  validate(connection) {
    return !connection._invalid && !connection._ending;
  }
  async _refreshDynamicOIDs(connection) {
    const databaseVersion = this.sequelize.options.databaseVersion;
    const supportedVersion = "8.3.0";
    if ((databaseVersion && semver.gte(databaseVersion, supportedVersion)) === false) {
      return;
    }
    const results = await (connection || this.sequelize).query("WITH ranges AS (  SELECT pg_range.rngtypid, pg_type.typname AS rngtypname,         pg_type.typarray AS rngtyparray, pg_range.rngsubtype    FROM pg_range LEFT OUTER JOIN pg_type ON pg_type.oid = pg_range.rngtypid)SELECT pg_type.typname, pg_type.typtype, pg_type.oid, pg_type.typarray,       ranges.rngtypname, ranges.rngtypid, ranges.rngtyparray  FROM pg_type LEFT OUTER JOIN ranges ON pg_type.oid = ranges.rngsubtype WHERE (pg_type.typtype IN('b', 'e'));");
    let result = Array.isArray(results) ? results.pop() : results;
    if (Array.isArray(result)) {
      if (result[0].command === "SET") {
        result = result.pop();
      }
    }
    const newNameOidMap = {};
    const newEnumOids = { oids: [], arrayOids: [] };
    for (const row of result.rows) {
      if (row.typtype === "e") {
        newEnumOids.oids.push(row.oid);
        if (row.typarray)
          newEnumOids.arrayOids.push(row.typarray);
        continue;
      }
      newNameOidMap[row.typname] = { oid: row.oid };
      if (row.typarray)
        newNameOidMap[row.typname].arrayOid = row.typarray;
      if (row.rngtypid) {
        newNameOidMap[row.typname].rangeOid = row.rngtypid;
        if (row.rngtyparray)
          newNameOidMap[row.typname].arrayRangeOid = row.rngtyparray;
      }
    }
    this.nameOidMap = newNameOidMap;
    this.enumOids = newEnumOids;
    this.refreshTypeParser(dataTypes.postgres);
  }
  _clearDynamicOIDs() {
    this.nameOidMap = {};
    this.enumOids = { oids: [], arrayOids: [] };
  }
}
module.exports = ConnectionManager;
module.exports.ConnectionManager = ConnectionManager;
module.exports.default = ConnectionManager;
//# sourceMappingURL=connection-manager.js.map
