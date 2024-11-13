"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const _ = require("lodash");
const Utils = require("../../utils");
const AbstractQueryGenerator = require("../abstract/query-generator");
const util = require("util");
const Op = require("../../operators");
const JSON_FUNCTION_REGEX = /^\s*((?:[a-z]+_){0,2}jsonb?(?:_[a-z]+){0,2})\([^)]*\)/i;
const JSON_OPERATOR_REGEX = /^\s*(->>?|@>|<@|\?[|&]?|\|{2}|#-)/i;
const TOKEN_CAPTURE_REGEX = /^\s*((?:([`"'])(?:(?!\2).|\2{2})*\2)|[\w\d\s]+|[().,;+-])/i;
const FOREIGN_KEY_FIELDS = [
  "CONSTRAINT_NAME as constraint_name",
  "CONSTRAINT_NAME as constraintName",
  "CONSTRAINT_SCHEMA as constraintSchema",
  "CONSTRAINT_SCHEMA as constraintCatalog",
  "TABLE_NAME as tableName",
  "TABLE_SCHEMA as tableSchema",
  "TABLE_SCHEMA as tableCatalog",
  "COLUMN_NAME as columnName",
  "REFERENCED_TABLE_SCHEMA as referencedTableSchema",
  "REFERENCED_TABLE_SCHEMA as referencedTableCatalog",
  "REFERENCED_TABLE_NAME as referencedTableName",
  "REFERENCED_COLUMN_NAME as referencedColumnName"
].join(",");
const typeWithoutDefault = /* @__PURE__ */ new Set(["BLOB", "TEXT", "GEOMETRY", "JSON"]);
class MySQLQueryGenerator extends AbstractQueryGenerator {
  constructor(options) {
    super(options);
    this.OperatorMap = __spreadProps(__spreadValues({}, this.OperatorMap), {
      [Op.regexp]: "REGEXP",
      [Op.notRegexp]: "NOT REGEXP"
    });
  }
  createDatabaseQuery(databaseName, options) {
    options = __spreadValues({
      charset: null,
      collate: null
    }, options);
    return Utils.joinSQLFragments([
      "CREATE DATABASE IF NOT EXISTS",
      this.quoteIdentifier(databaseName),
      options.charset && `DEFAULT CHARACTER SET ${this.escape(options.charset)}`,
      options.collate && `DEFAULT COLLATE ${this.escape(options.collate)}`,
      ";"
    ]);
  }
  dropDatabaseQuery(databaseName) {
    return `DROP DATABASE IF EXISTS ${this.quoteIdentifier(databaseName)};`;
  }
  createSchema() {
    return "SHOW TABLES";
  }
  showSchemasQuery() {
    return "SHOW TABLES";
  }
  versionQuery() {
    return "SELECT VERSION() as `version`";
  }
  createTableQuery(tableName, attributes, options) {
    options = __spreadValues({
      engine: "InnoDB",
      charset: null,
      rowFormat: null
    }, options);
    const primaryKeys = [];
    const foreignKeys = {};
    const attrStr = [];
    for (const attr in attributes) {
      if (!Object.prototype.hasOwnProperty.call(attributes, attr))
        continue;
      const dataType = attributes[attr];
      let match;
      if (dataType.includes("PRIMARY KEY")) {
        primaryKeys.push(attr);
        if (dataType.includes("REFERENCES")) {
          match = dataType.match(/^(.+) (REFERENCES.*)$/);
          attrStr.push(`${this.quoteIdentifier(attr)} ${match[1].replace("PRIMARY KEY", "")}`);
          foreignKeys[attr] = match[2];
        } else {
          attrStr.push(`${this.quoteIdentifier(attr)} ${dataType.replace("PRIMARY KEY", "")}`);
        }
      } else if (dataType.includes("REFERENCES")) {
        match = dataType.match(/^(.+) (REFERENCES.*)$/);
        attrStr.push(`${this.quoteIdentifier(attr)} ${match[1]}`);
        foreignKeys[attr] = match[2];
      } else {
        attrStr.push(`${this.quoteIdentifier(attr)} ${dataType}`);
      }
    }
    const table = this.quoteTable(tableName);
    let attributesClause = attrStr.join(", ");
    const pkString = primaryKeys.map((pk) => this.quoteIdentifier(pk)).join(", ");
    if (options.uniqueKeys) {
      _.each(options.uniqueKeys, (columns, indexName) => {
        if (columns.customIndex) {
          if (typeof indexName !== "string") {
            indexName = `uniq_${tableName}_${columns.fields.join("_")}`;
          }
          attributesClause += `, UNIQUE ${this.quoteIdentifier(indexName)} (${columns.fields.map((field) => this.quoteIdentifier(field)).join(", ")})`;
        }
      });
    }
    if (pkString.length > 0) {
      attributesClause += `, PRIMARY KEY (${pkString})`;
    }
    for (const fkey in foreignKeys) {
      if (Object.prototype.hasOwnProperty.call(foreignKeys, fkey)) {
        attributesClause += `, FOREIGN KEY (${this.quoteIdentifier(fkey)}) ${foreignKeys[fkey]}`;
      }
    }
    return Utils.joinSQLFragments([
      "CREATE TABLE IF NOT EXISTS",
      table,
      `(${attributesClause})`,
      `ENGINE=${options.engine}`,
      options.comment && typeof options.comment === "string" && `COMMENT ${this.escape(options.comment)}`,
      options.charset && `DEFAULT CHARSET=${options.charset}`,
      options.collate && `COLLATE ${options.collate}`,
      options.initialAutoIncrement && `AUTO_INCREMENT=${options.initialAutoIncrement}`,
      options.rowFormat && `ROW_FORMAT=${options.rowFormat}`,
      ";"
    ]);
  }
  describeTableQuery(tableName, schema, schemaDelimiter) {
    const table = this.quoteTable(this.addSchema({
      tableName,
      _schema: schema,
      _schemaDelimiter: schemaDelimiter
    }));
    return `SHOW FULL COLUMNS FROM ${table};`;
  }
  showTablesQuery(database) {
    let query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";
    if (database) {
      query += ` AND TABLE_SCHEMA = ${this.escape(database)}`;
    } else {
      query += " AND TABLE_SCHEMA NOT IN ('MYSQL', 'INFORMATION_SCHEMA', 'PERFORMANCE_SCHEMA', 'SYS', 'mysql', 'information_schema', 'performance_schema', 'sys')";
    }
    return `${query};`;
  }
  tableExistsQuery(table) {
    const tableName = this.escape(this.quoteTable(table).slice(1, -1));
    return `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = ${tableName} AND TABLE_SCHEMA = ${this.escape(this.sequelize.config.database)}`;
  }
  addColumnQuery(table, key, dataType) {
    return Utils.joinSQLFragments([
      "ALTER TABLE",
      this.quoteTable(table),
      "ADD",
      this.quoteIdentifier(key),
      this.attributeToSQL(dataType, {
        context: "addColumn",
        tableName: table,
        foreignKey: key
      }),
      ";"
    ]);
  }
  removeColumnQuery(tableName, attributeName) {
    return Utils.joinSQLFragments([
      "ALTER TABLE",
      this.quoteTable(tableName),
      "DROP",
      this.quoteIdentifier(attributeName),
      ";"
    ]);
  }
  changeColumnQuery(tableName, attributes) {
    const attrString = [];
    const constraintString = [];
    for (const attributeName in attributes) {
      let definition = attributes[attributeName];
      if (definition.includes("REFERENCES")) {
        const attrName = this.quoteIdentifier(attributeName);
        definition = definition.replace(/.+?(?=REFERENCES)/, "");
        constraintString.push(`FOREIGN KEY (${attrName}) ${definition}`);
      } else {
        attrString.push(`\`${attributeName}\` \`${attributeName}\` ${definition}`);
      }
    }
    return Utils.joinSQLFragments([
      "ALTER TABLE",
      this.quoteTable(tableName),
      attrString.length && `CHANGE ${attrString.join(", ")}`,
      constraintString.length && `ADD ${constraintString.join(", ")}`,
      ";"
    ]);
  }
  renameColumnQuery(tableName, attrBefore, attributes) {
    const attrString = [];
    for (const attrName in attributes) {
      const definition = attributes[attrName];
      attrString.push(`\`${attrBefore}\` \`${attrName}\` ${definition}`);
    }
    return Utils.joinSQLFragments([
      "ALTER TABLE",
      this.quoteTable(tableName),
      "CHANGE",
      attrString.join(", "),
      ";"
    ]);
  }
  handleSequelizeMethod(smth, tableName, factory, options, prepend) {
    if (smth instanceof Utils.Json) {
      if (smth.conditions) {
        const conditions = this.parseConditionObject(smth.conditions).map((condition) => `${this.jsonPathExtractionQuery(condition.path[0], _.tail(condition.path))} = '${condition.value}'`);
        return conditions.join(" AND ");
      }
      if (smth.path) {
        let str;
        if (this._checkValidJsonStatement(smth.path)) {
          str = smth.path;
        } else {
          const paths = _.toPath(smth.path);
          const column = paths.shift();
          str = this.jsonPathExtractionQuery(column, paths);
        }
        if (smth.value) {
          str += util.format(" = %s", this.escape(smth.value));
        }
        return str;
      }
    } else if (smth instanceof Utils.Cast) {
      if (/timestamp/i.test(smth.type)) {
        smth.type = "datetime";
      } else if (smth.json && /boolean/i.test(smth.type)) {
        smth.type = "char";
      } else if (/double precision/i.test(smth.type) || /boolean/i.test(smth.type) || /integer/i.test(smth.type)) {
        smth.type = "decimal";
      } else if (/text/i.test(smth.type)) {
        smth.type = "char";
      }
    }
    return super.handleSequelizeMethod(smth, tableName, factory, options, prepend);
  }
  _toJSONValue(value) {
    if (typeof value === "boolean") {
      return value.toString();
    }
    if (value === null) {
      return "null";
    }
    return value;
  }
  truncateTableQuery(tableName) {
    return `TRUNCATE ${this.quoteTable(tableName)}`;
  }
  deleteQuery(tableName, where, options = {}, model) {
    let limit = "";
    let query = `DELETE FROM ${this.quoteTable(tableName)}`;
    if (options.limit) {
      limit = ` LIMIT ${this.escape(options.limit)}`;
    }
    where = this.getWhereConditions(where, null, model, options);
    if (where) {
      query += ` WHERE ${where}`;
    }
    return query + limit;
  }
  showIndexesQuery(tableName, options) {
    return Utils.joinSQLFragments([
      `SHOW INDEX FROM ${this.quoteTable(tableName)}`,
      options && options.database && `FROM \`${options.database}\``
    ]);
  }
  showConstraintsQuery(table, constraintName) {
    const tableName = table.tableName || table;
    const schemaName = table.schema;
    return Utils.joinSQLFragments([
      "SELECT CONSTRAINT_CATALOG AS constraintCatalog,",
      "CONSTRAINT_NAME AS constraintName,",
      "CONSTRAINT_SCHEMA AS constraintSchema,",
      "CONSTRAINT_TYPE AS constraintType,",
      "TABLE_NAME AS tableName,",
      "TABLE_SCHEMA AS tableSchema",
      "from INFORMATION_SCHEMA.TABLE_CONSTRAINTS",
      `WHERE table_name='${tableName}'`,
      constraintName && `AND constraint_name = '${constraintName}'`,
      schemaName && `AND TABLE_SCHEMA = '${schemaName}'`,
      ";"
    ]);
  }
  removeIndexQuery(tableName, indexNameOrAttributes) {
    let indexName = indexNameOrAttributes;
    if (typeof indexName !== "string") {
      indexName = Utils.underscore(`${tableName}_${indexNameOrAttributes.join("_")}`);
    }
    return Utils.joinSQLFragments([
      "DROP INDEX",
      this.quoteIdentifier(indexName),
      "ON",
      this.quoteTable(tableName)
    ]);
  }
  attributeToSQL(attribute, options) {
    if (!_.isPlainObject(attribute)) {
      attribute = {
        type: attribute
      };
    }
    const attributeString = attribute.type.toString({ escape: this.escape.bind(this) });
    let template = attributeString;
    if (attribute.allowNull === false) {
      template += " NOT NULL";
    }
    if (attribute.autoIncrement) {
      template += " auto_increment";
    }
    if (!typeWithoutDefault.has(attributeString) && attribute.type._binary !== true && Utils.defaultValueSchemable(attribute.defaultValue)) {
      template += ` DEFAULT ${this.escape(attribute.defaultValue)}`;
    }
    if (attribute.unique === true) {
      template += " UNIQUE";
    }
    if (attribute.primaryKey) {
      template += " PRIMARY KEY";
    }
    if (attribute.comment) {
      template += ` COMMENT ${this.escape(attribute.comment)}`;
    }
    if (attribute.first) {
      template += " FIRST";
    }
    if (attribute.after) {
      template += ` AFTER ${this.quoteIdentifier(attribute.after)}`;
    }
    if ((!options || !options.withoutForeignKeyConstraints) && attribute.references) {
      if (options && options.context === "addColumn" && options.foreignKey) {
        const attrName = this.quoteIdentifier(options.foreignKey);
        const fkName = this.quoteIdentifier(`${options.tableName}_${attrName}_foreign_idx`);
        template += `, ADD CONSTRAINT ${fkName} FOREIGN KEY (${attrName})`;
      }
      template += ` REFERENCES ${this.quoteTable(attribute.references.model)}`;
      if (attribute.references.key) {
        template += ` (${this.quoteIdentifier(attribute.references.key)})`;
      } else {
        template += ` (${this.quoteIdentifier("id")})`;
      }
      if (attribute.onDelete) {
        template += ` ON DELETE ${attribute.onDelete.toUpperCase()}`;
      }
      if (attribute.onUpdate) {
        template += ` ON UPDATE ${attribute.onUpdate.toUpperCase()}`;
      }
    }
    return template;
  }
  attributesToSQL(attributes, options) {
    const result = {};
    for (const key in attributes) {
      const attribute = attributes[key];
      result[attribute.field || key] = this.attributeToSQL(attribute, options);
    }
    return result;
  }
  _checkValidJsonStatement(stmt) {
    if (typeof stmt !== "string") {
      return false;
    }
    let currentIndex = 0;
    let openingBrackets = 0;
    let closingBrackets = 0;
    let hasJsonFunction = false;
    let hasInvalidToken = false;
    while (currentIndex < stmt.length) {
      const string = stmt.substr(currentIndex);
      const functionMatches = JSON_FUNCTION_REGEX.exec(string);
      if (functionMatches) {
        currentIndex += functionMatches[0].indexOf("(");
        hasJsonFunction = true;
        continue;
      }
      const operatorMatches = JSON_OPERATOR_REGEX.exec(string);
      if (operatorMatches) {
        currentIndex += operatorMatches[0].length;
        hasJsonFunction = true;
        continue;
      }
      const tokenMatches = TOKEN_CAPTURE_REGEX.exec(string);
      if (tokenMatches) {
        const capturedToken = tokenMatches[1];
        if (capturedToken === "(") {
          openingBrackets++;
        } else if (capturedToken === ")") {
          closingBrackets++;
        } else if (capturedToken === ";") {
          hasInvalidToken = true;
          break;
        }
        currentIndex += tokenMatches[0].length;
        continue;
      }
      break;
    }
    if (hasJsonFunction && (hasInvalidToken || openingBrackets !== closingBrackets)) {
      throw new Error(`Invalid json statement: ${stmt}`);
    }
    return hasJsonFunction;
  }
  getForeignKeysQuery(table, schemaName) {
    const tableName = table.tableName || table;
    return Utils.joinSQLFragments([
      "SELECT",
      FOREIGN_KEY_FIELDS,
      `FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = '${tableName}'`,
      `AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='${schemaName}'`,
      "AND REFERENCED_TABLE_NAME IS NOT NULL",
      ";"
    ]);
  }
  getForeignKeyQuery(table, columnName) {
    const quotedSchemaName = table.schema ? wrapSingleQuote(table.schema) : "";
    const quotedTableName = wrapSingleQuote(table.tableName || table);
    const quotedColumnName = wrapSingleQuote(columnName);
    return Utils.joinSQLFragments([
      "SELECT",
      FOREIGN_KEY_FIELDS,
      "FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE",
      "WHERE (",
      [
        `REFERENCED_TABLE_NAME = ${quotedTableName}`,
        table.schema && `AND REFERENCED_TABLE_SCHEMA = ${quotedSchemaName}`,
        `AND REFERENCED_COLUMN_NAME = ${quotedColumnName}`
      ],
      ") OR (",
      [
        `TABLE_NAME = ${quotedTableName}`,
        table.schema && `AND TABLE_SCHEMA = ${quotedSchemaName}`,
        `AND COLUMN_NAME = ${quotedColumnName}`,
        "AND REFERENCED_TABLE_NAME IS NOT NULL"
      ],
      ")"
    ]);
  }
  dropForeignKeyQuery(tableName, foreignKey) {
    return Utils.joinSQLFragments([
      "ALTER TABLE",
      this.quoteTable(tableName),
      "DROP FOREIGN KEY",
      this.quoteIdentifier(foreignKey),
      ";"
    ]);
  }
  quoteIdentifier(identifier, force) {
    return Utils.addTicks(Utils.removeTicks(identifier, "`"), "`");
  }
}
function wrapSingleQuote(identifier) {
  return Utils.addTicks(identifier, "'");
}
module.exports = MySQLQueryGenerator;
//# sourceMappingURL=query-generator.js.map
