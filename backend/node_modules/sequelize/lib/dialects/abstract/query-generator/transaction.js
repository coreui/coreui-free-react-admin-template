"use strict";
const uuidv4 = require("uuid").v4;
const TransactionQueries = {
  setIsolationLevelQuery(value, options) {
    if (options.parent) {
      return;
    }
    return `SET TRANSACTION ISOLATION LEVEL ${value};`;
  },
  generateTransactionId() {
    return uuidv4();
  },
  startTransactionQuery(transaction) {
    if (transaction.parent) {
      return `SAVEPOINT ${this.quoteIdentifier(transaction.name, true)};`;
    }
    return "START TRANSACTION;";
  },
  deferConstraintsQuery() {
  },
  setConstraintQuery() {
  },
  setDeferredQuery() {
  },
  setImmediateQuery() {
  },
  commitTransactionQuery(transaction) {
    if (transaction.parent) {
      return;
    }
    return "COMMIT;";
  },
  rollbackTransactionQuery(transaction) {
    if (transaction.parent) {
      return `ROLLBACK TO SAVEPOINT ${this.quoteIdentifier(transaction.name, true)};`;
    }
    return "ROLLBACK;";
  }
};
module.exports = TransactionQueries;
//# sourceMappingURL=transaction.js.map
