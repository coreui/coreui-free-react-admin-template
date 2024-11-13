"use strict";
class AbstractDialect {
  canBackslashEscape() {
    return false;
  }
}
AbstractDialect.prototype.supports = {
  "DEFAULT": true,
  "DEFAULT VALUES": false,
  "VALUES ()": false,
  "LIMIT ON UPDATE": false,
  "ON DUPLICATE KEY": true,
  "ORDER NULLS": false,
  "UNION": true,
  "UNION ALL": true,
  "RIGHT JOIN": true,
  returnValues: false,
  autoIncrement: {
    identityInsert: false,
    defaultValue: true,
    update: true
  },
  bulkDefault: false,
  schemas: false,
  transactions: true,
  settingIsolationLevelDuringTransaction: true,
  transactionOptions: {
    type: false
  },
  migrations: true,
  upserts: true,
  inserts: {
    ignoreDuplicates: "",
    updateOnDuplicate: false,
    onConflictDoNothing: "",
    onConflictWhere: false,
    conflictFields: false
  },
  constraints: {
    restrict: true,
    addConstraint: true,
    dropConstraint: true,
    unique: true,
    default: false,
    check: true,
    foreignKey: true,
    primaryKey: true
  },
  index: {
    collate: true,
    length: false,
    parser: false,
    concurrently: false,
    type: false,
    using: true,
    functionBased: false,
    operator: false
  },
  groupedLimit: true,
  indexViaAlter: false,
  JSON: false,
  deferrableConstraints: false,
  escapeStringConstants: false
};
module.exports = AbstractDialect;
module.exports.AbstractDialect = AbstractDialect;
module.exports.default = AbstractDialect;
//# sourceMappingURL=index.js.map
