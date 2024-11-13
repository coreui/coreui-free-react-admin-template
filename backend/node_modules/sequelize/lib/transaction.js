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
class Transaction {
  constructor(sequelize, options) {
    this.sequelize = sequelize;
    this.savepoints = [];
    this._afterCommitHooks = [];
    const generateTransactionId = this.sequelize.dialect.queryGenerator.generateTransactionId;
    this.options = __spreadValues({
      type: sequelize.options.transactionType,
      isolationLevel: sequelize.options.isolationLevel,
      readOnly: false
    }, options);
    this.parent = this.options.transaction;
    if (this.parent) {
      this.id = this.parent.id;
      this.parent.savepoints.push(this);
      this.name = `${this.id}-sp-${this.parent.savepoints.length}`;
    } else {
      this.id = this.name = generateTransactionId();
    }
    delete this.options.transaction;
  }
  async commit() {
    if (this.finished) {
      throw new Error(`Transaction cannot be committed because it has been finished with state: ${this.finished}`);
    }
    try {
      await this.sequelize.getQueryInterface().commitTransaction(this, this.options);
      this.cleanup();
    } catch (e) {
      console.warn(`Committing transaction ${this.id} failed with error ${JSON.stringify(e.message)}. We are killing its connection as it is now in an undetermined state.`);
      await this.forceCleanup();
      throw e;
    } finally {
      this.finished = "commit";
      for (const hook of this._afterCommitHooks) {
        await hook.apply(this, [this]);
      }
    }
  }
  async rollback() {
    if (this.finished) {
      throw new Error(`Transaction cannot be rolled back because it has been finished with state: ${this.finished}`);
    }
    if (!this.connection) {
      throw new Error("Transaction cannot be rolled back because it never started");
    }
    try {
      await this.sequelize.getQueryInterface().rollbackTransaction(this, this.options);
      this.cleanup();
    } catch (e) {
      console.warn(`Rolling back transaction ${this.id} failed with error ${JSON.stringify(e.message)}. We are killing its connection as it is now in an undetermined state.`);
      await this.forceCleanup();
      throw e;
    }
  }
  async prepareEnvironment(useCLS = true) {
    let connectionPromise;
    if (this.parent) {
      connectionPromise = Promise.resolve(this.parent.connection);
    } else {
      const acquireOptions = { uuid: this.id };
      if (this.options.readOnly) {
        acquireOptions.type = "SELECT";
      }
      connectionPromise = this.sequelize.connectionManager.getConnection(acquireOptions);
    }
    let result;
    const connection = await connectionPromise;
    this.connection = connection;
    this.connection.uuid = this.id;
    try {
      await this.begin();
      result = await this.setDeferrable();
    } catch (setupErr) {
      try {
        result = await this.rollback();
      } finally {
        throw setupErr;
      }
    }
    if (useCLS && this.sequelize.constructor._cls) {
      this.sequelize.constructor._cls.set("transaction", this);
    }
    return result;
  }
  async setDeferrable() {
    if (this.options.deferrable) {
      return await this.sequelize.getQueryInterface().deferConstraints(this, this.options);
    }
  }
  async begin() {
    const queryInterface = this.sequelize.getQueryInterface();
    if (this.sequelize.dialect.supports.settingIsolationLevelDuringTransaction) {
      await queryInterface.startTransaction(this, this.options);
      return queryInterface.setIsolationLevel(this, this.options.isolationLevel, this.options);
    }
    await queryInterface.setIsolationLevel(this, this.options.isolationLevel, this.options);
    return queryInterface.startTransaction(this, this.options);
  }
  cleanup() {
    if (this.parent || this.connection.uuid === void 0) {
      return;
    }
    this._clearCls();
    this.sequelize.connectionManager.releaseConnection(this.connection);
    this.connection.uuid = void 0;
  }
  async forceCleanup() {
    if (this.parent || this.connection.uuid === void 0) {
      return;
    }
    this._clearCls();
    await this.sequelize.connectionManager.destroyConnection(this.connection);
    this.connection.uuid = void 0;
  }
  _clearCls() {
    const cls = this.sequelize.constructor._cls;
    if (cls) {
      if (cls.get("transaction") === this) {
        cls.set("transaction", null);
      }
    }
  }
  afterCommit(fn) {
    if (!fn || typeof fn !== "function") {
      throw new Error('"fn" must be a function');
    }
    this._afterCommitHooks.push(fn);
  }
  static get TYPES() {
    return {
      DEFERRED: "DEFERRED",
      IMMEDIATE: "IMMEDIATE",
      EXCLUSIVE: "EXCLUSIVE"
    };
  }
  static get ISOLATION_LEVELS() {
    return {
      READ_UNCOMMITTED: "READ UNCOMMITTED",
      READ_COMMITTED: "READ COMMITTED",
      REPEATABLE_READ: "REPEATABLE READ",
      SERIALIZABLE: "SERIALIZABLE"
    };
  }
  static get LOCK() {
    return {
      UPDATE: "UPDATE",
      SHARE: "SHARE",
      KEY_SHARE: "KEY SHARE",
      NO_KEY_UPDATE: "NO KEY UPDATE"
    };
  }
  get LOCK() {
    return Transaction.LOCK;
  }
}
module.exports = Transaction;
module.exports.Transaction = Transaction;
module.exports.default = Transaction;
//# sourceMappingURL=transaction.js.map
