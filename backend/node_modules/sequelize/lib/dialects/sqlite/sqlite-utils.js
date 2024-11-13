var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  withSqliteForeignKeysOff: () => withSqliteForeignKeysOff
});
async function withSqliteForeignKeysOff(sequelize, options, cb) {
  try {
    await sequelize.query("PRAGMA foreign_keys = OFF", options);
    return await cb();
  } finally {
    await sequelize.query("PRAGMA foreign_keys = ON", options);
  }
}
//# sourceMappingURL=sqlite-utils.js.map
