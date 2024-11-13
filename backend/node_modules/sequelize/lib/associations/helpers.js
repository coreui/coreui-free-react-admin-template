"use strict";
function checkNamingCollision(association) {
  if (Object.prototype.hasOwnProperty.call(association.source.rawAttributes, association.as)) {
    throw new Error(`Naming collision between attribute '${association.as}' and association '${association.as}' on model ${association.source.name}. To remedy this, change either foreignKey or as in your association definition`);
  }
}
exports.checkNamingCollision = checkNamingCollision;
function addForeignKeyConstraints(newAttribute, source, target, options, key) {
  if (options.foreignKeyConstraint || options.onDelete || options.onUpdate) {
    const primaryKeys = Object.keys(source.primaryKeys).map((primaryKeyAttribute) => source.rawAttributes[primaryKeyAttribute].field || primaryKeyAttribute);
    if (primaryKeys.length === 1 || !primaryKeys.includes(key)) {
      newAttribute.references = {
        model: source.getTableName(),
        key: key || primaryKeys[0]
      };
      newAttribute.onDelete = options.onDelete;
      newAttribute.onUpdate = options.onUpdate;
    }
  }
}
exports.addForeignKeyConstraints = addForeignKeyConstraints;
function mixinMethods(association, obj, methods, aliases) {
  aliases = aliases || {};
  for (const method of methods) {
    if (!Object.prototype.hasOwnProperty.call(obj, association.accessors[method])) {
      const realMethod = aliases[method] || method;
      obj[association.accessors[method]] = function() {
        return association[realMethod](this, ...Array.from(arguments));
      };
    }
  }
}
exports.mixinMethods = mixinMethods;
//# sourceMappingURL=helpers.js.map
