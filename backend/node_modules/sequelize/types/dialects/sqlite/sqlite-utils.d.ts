import type { Sequelize } from '../../sequelize.js';
import type { QueryOptions } from '../abstract/query-interface.js';
export declare function withSqliteForeignKeysOff<T>(sequelize: Sequelize, options: QueryOptions, cb: () => Promise<T>): Promise<T>;
