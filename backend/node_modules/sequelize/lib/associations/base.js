"use strict";
const { AssociationError } = require("./../errors");
class Association {
  constructor(source, target, options = {}) {
    this.source = source;
    this.target = target;
    this.options = options;
    this.scope = options.scope;
    this.isSelfAssociation = this.source === this.target;
    this.as = options.as;
    this.associationType = "";
    if (source.hasAlias(options.as)) {
      throw new AssociationError(`You have used the alias ${options.as} in two separate associations. Aliased associations must have unique aliases.`);
    }
  }
  toInstanceArray(input) {
    if (!Array.isArray(input)) {
      input = [input];
    }
    return input.map((element) => {
      if (element instanceof this.target)
        return element;
      const tmpInstance = {};
      tmpInstance[this.target.primaryKeyAttribute] = element;
      return this.target.build(tmpInstance, { isNewRecord: false });
    });
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.as;
  }
}
module.exports = Association;
//# sourceMappingURL=base.js.map
