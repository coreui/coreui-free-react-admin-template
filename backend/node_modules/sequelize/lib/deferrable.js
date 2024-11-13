"use strict";
const { classToInvokable } = require("./utils");
class ABSTRACT {
  static toString(...args) {
    return new this().toString(...args);
  }
  toString(...args) {
    return this.toSql(...args);
  }
  toSql() {
    throw new Error("toSql implementation missing");
  }
}
class INITIALLY_DEFERRED extends ABSTRACT {
  toSql() {
    return "DEFERRABLE INITIALLY DEFERRED";
  }
}
class INITIALLY_IMMEDIATE extends ABSTRACT {
  toSql() {
    return "DEFERRABLE INITIALLY IMMEDIATE";
  }
}
class NOT extends ABSTRACT {
  toSql() {
    return "NOT DEFERRABLE";
  }
}
class SET_DEFERRED extends ABSTRACT {
  constructor(constraints) {
    super();
    this.constraints = constraints;
  }
  toSql(queryGenerator) {
    return queryGenerator.setDeferredQuery(this.constraints);
  }
}
class SET_IMMEDIATE extends ABSTRACT {
  constructor(constraints) {
    super();
    this.constraints = constraints;
  }
  toSql(queryGenerator) {
    return queryGenerator.setImmediateQuery(this.constraints);
  }
}
const Deferrable = {
  INITIALLY_DEFERRED: classToInvokable(INITIALLY_DEFERRED),
  INITIALLY_IMMEDIATE: classToInvokable(INITIALLY_IMMEDIATE),
  NOT: classToInvokable(NOT),
  SET_DEFERRED: classToInvokable(SET_DEFERRED),
  SET_IMMEDIATE: classToInvokable(SET_IMMEDIATE)
};
module.exports = Deferrable;
//# sourceMappingURL=deferrable.js.map
