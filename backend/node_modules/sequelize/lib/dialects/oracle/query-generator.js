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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  OracleQueryGenerator: () => OracleQueryGenerator
});
const Utils = require("../../utils");
const DataTypes = require("../../data-types");
const AbstractQueryGenerator = require("../abstract/query-generator");
const _ = require("lodash");
const util = require("util");
const Transaction = require("../../transaction");
const ORACLE_RESERVED_WORDS = ["ACCESS", "ADD", "ALL", "ALTER", "AND", "ANY", "ARRAYLEN", "AS", "ASC", "AUDIT", "BETWEEN", "BY", "CHAR", "CHECK", "CLUSTER", "COLUMN", "COMMENT", "COMPRESS", "CONNECT", "CREATE", "CURRENT", "DATE", "DECIMAL", "DEFAULT", "DELETE", "DESC", "DISTINCT", "DROP", "ELSE", "EXCLUSIVE", "EXISTS", "FILE", "FLOAT", "FOR", "FROM", "GRANT", "GROUP", "HAVING", "IDENTIFIED", "IMMEDIATE", "IN", "INCREMENT", "INDEX", "INITIAL", "INSERT", "INTEGER", "INTERSECT", "INTO", "IS", "LEVEL", "LIKE", "LOCK", "LONG", "MAXEXTENTS", "MINUS", "MODE", "MODIFY", "NOAUDIT", "NOCOMPRESS", "NOT", "NOTFOUND", "NOWAIT", "NULL", "NUMBER", "OF", "OFFLINE", "ON", "ONLINE", "OPTION", "OR", "ORDER", "PCTFREE", "PRIOR", "PRIVILEGES", "PUBLIC", "RAW", "RENAME", "RESOURCE", "REVOKE", "ROW", "ROWID", "ROWLABEL", "ROWNUM", "ROWS", "SELECT", "SESSION", "SET", "SHARE", "SIZE", "SMALLINT", "SQLBUF", "START", "SUCCESSFUL", "SYNONYM", "SYSDATE", "TABLE", "THEN", "TO", "TRIGGER", "UID", "UNION", "UNIQUE", "UPDATE", "USER", "VALIDATE", "VALUES", "VARCHAR", "VARCHAR2", "VIEW", "WHENEVER", "WHERE", "WITH"];
const JSON_FUNCTION_REGEX = /^\s*((?:[a-z]+_){0,2}jsonb?(?:_[a-z]+){0,2})\([^)]*\)/i;
const JSON_OPERATOR_REGEX = /^\s*(->>?|@>|<@|\?[|&]?|\|{2}|#-)/i;
const TOKEN_CAPTURE_REGEX = /^\s*((?:([`"'])(?:(?!\2).|\2{2})*\2)|[\w\d\s]+|[().,;+-])/i;
class OracleQueryGenerator extends AbstractQueryGenerator {
  constructor(options) {
    super(options);
  }
  getCatalogName(value) {
    if (value) {
      if (this.options.quoteIdentifiers === false) {
        const quotedValue = this.quoteIdentifier(value);
        if (quotedValue === value) {
          value = value.toUpperCase();
        }
      }
    }
    return value;
  }
  getSchemaNameAndTableName(table) {
    const tableName = this.getCatalogName(table.tableName || table);
    const schemaName = this.getCatalogName(table.schema);
    return [tableName, schemaName];
  }
  createSchema(schema) {
    const quotedSchema = this.quoteIdentifier(schema);
    return [
      "DECLARE",
      "USER_FOUND BOOLEAN := FALSE;",
      "BEGIN",
      " BEGIN",
      "   EXECUTE IMMEDIATE ",
      this.escape(`CREATE USER ${quotedSchema} IDENTIFIED BY 12345 DEFAULT TABLESPACE USERS`),
      ";",
      "   EXCEPTION WHEN OTHERS THEN",
      "     IF SQLCODE != -1920 THEN",
      "       RAISE;",
      "     ELSE",
      "       USER_FOUND := TRUE;",
      "     END IF;",
      " END;",
      " IF NOT USER_FOUND THEN",
      "    EXECUTE IMMEDIATE ",
      this.escape(`GRANT "CONNECT" TO ${quotedSchema}`),
      ";",
      "    EXECUTE IMMEDIATE ",
      this.escape(`GRANT CREATE TABLE TO ${quotedSchema}`),
      ";",
      "    EXECUTE IMMEDIATE ",
      this.escape(`GRANT CREATE VIEW TO ${quotedSchema}`),
      ";",
      "    EXECUTE IMMEDIATE ",
      this.escape(`GRANT CREATE ANY TRIGGER TO ${quotedSchema}`),
      ";",
      "    EXECUTE IMMEDIATE ",
      this.escape(`GRANT CREATE ANY PROCEDURE TO ${quotedSchema}`),
      ";",
      "    EXECUTE IMMEDIATE ",
      this.escape(`GRANT CREATE SEQUENCE TO ${quotedSchema}`),
      ";",
      "    EXECUTE IMMEDIATE ",
      this.escape(`GRANT CREATE SYNONYM TO ${quotedSchema}`),
      ";",
      "    EXECUTE IMMEDIATE ",
      this.escape(`ALTER USER ${quotedSchema} QUOTA UNLIMITED ON USERS`),
      ";",
      " END IF;",
      "END;"
    ].join(" ");
  }
  showSchemasQuery() {
    return `SELECT USERNAME AS "schema_name" FROM ALL_USERS WHERE COMMON = ('NO') AND USERNAME != user`;
  }
  dropSchema(schema) {
    return [
      "BEGIN",
      "EXECUTE IMMEDIATE ",
      this.escape(`DROP USER ${this.quoteTable(schema)} CASCADE`),
      ";",
      "EXCEPTION WHEN OTHERS THEN",
      "  IF SQLCODE != -1918 THEN",
      "    RAISE;",
      "  END IF;",
      "END;"
    ].join(" ");
  }
  versionQuery() {
    return "SELECT VERSION_FULL FROM PRODUCT_COMPONENT_VERSION WHERE PRODUCT LIKE 'Oracle%'";
  }
  createTableQuery(tableName, attributes, options) {
    const primaryKeys = [], foreignKeys = Object.create(null), attrStr = [], checkStr = [];
    const values = {
      table: this.quoteTable(tableName)
    };
    for (let attr in attributes) {
      if (!Object.prototype.hasOwnProperty.call(attributes, attr))
        continue;
      const dataType = attributes[attr];
      attr = this.quoteIdentifier(attr);
      if (dataType.includes("PRIMARY KEY")) {
        primaryKeys.push(attr);
        if (dataType.includes("REFERENCES")) {
          const match = dataType.match(/^(.+) (REFERENCES.*)$/);
          attrStr.push(`${attr} ${match[1].replace(/PRIMARY KEY/, "")}`);
          foreignKeys[attr] = match[2];
        } else {
          attrStr.push(`${attr} ${dataType.replace(/PRIMARY KEY/, "").trim()}`);
        }
      } else if (dataType.includes("REFERENCES")) {
        const match = dataType.match(/^(.+) (REFERENCES.*)$/);
        attrStr.push(`${attr} ${match[1]}`);
        foreignKeys[attr] = match[2];
      } else {
        attrStr.push(`${attr} ${dataType}`);
      }
    }
    values["attributes"] = attrStr.join(", ");
    const pkString = primaryKeys.map((pk) => this.quoteIdentifier(pk)).join(", ");
    if (pkString.length > 0) {
      values.attributes += `,PRIMARY KEY (${pkString})`;
    }
    for (const fkey in foreignKeys) {
      if (!Object.prototype.hasOwnProperty.call(foreignKeys, fkey))
        continue;
      if (foreignKeys[fkey].indexOf("ON DELETE NO ACTION") > -1) {
        foreignKeys[fkey] = foreignKeys[fkey].replace("ON DELETE NO ACTION", "");
      }
      values.attributes += `,FOREIGN KEY (${this.quoteIdentifier(fkey)}) ${foreignKeys[fkey]}`;
    }
    if (checkStr.length > 0) {
      values.attributes += `, ${checkStr.join(", ")}`;
    }
    if (options && options.indexes && options.indexes.length > 0) {
      const idxToDelete = [];
      options.indexes.forEach((index, idx) => {
        if ("unique" in index && (index.unique === true || index.unique.length > 0 && index.unique !== false)) {
          const fields = index.fields.map((field) => {
            if (typeof field === "string") {
              return field;
            }
            return field.attribute;
          });
          let canContinue = true;
          if (options.uniqueKeys) {
            const keys = Object.keys(options.uniqueKeys);
            for (let fieldIdx = 0; fieldIdx < keys.length; fieldIdx++) {
              const currUnique = options.uniqueKeys[keys[fieldIdx]];
              if (currUnique.fields.length === fields.length) {
                for (let i = 0; i < currUnique.fields.length; i++) {
                  const field = currUnique.fields[i];
                  if (_.includes(fields, field)) {
                    canContinue = false;
                  } else {
                    canContinue = true;
                    break;
                  }
                }
              }
            }
            if (canContinue) {
              const indexName = "name" in index ? index.name : "";
              const constraintToAdd = {
                name: indexName,
                fields
              };
              if (!("uniqueKeys" in options)) {
                options.uniqueKeys = {};
              }
              options.uniqueKeys[indexName] = constraintToAdd;
              idxToDelete.push(idx);
            } else {
              idxToDelete.push(idx);
            }
          }
        }
      });
      idxToDelete.forEach((idx) => {
        options.indexes.splice(idx, 1);
      });
    }
    if (options && !!options.uniqueKeys) {
      _.each(options.uniqueKeys, (columns, indexName) => {
        let canBeUniq = false;
        primaryKeys.forEach((primaryKey) => {
          primaryKey = primaryKey.replace(/"/g, "");
          if (!_.includes(columns.fields, primaryKey)) {
            canBeUniq = true;
          }
        });
        columns.fields.forEach((field) => {
          let currField = "";
          if (!_.isString(field)) {
            currField = field.attribute.replace(/[.,"\s]/g, "");
          } else {
            currField = field.replace(/[.,"\s]/g, "");
          }
          if (currField in attributes) {
            if (attributes[currField].toUpperCase().indexOf("UNIQUE") > -1 && canBeUniq) {
              const attrToReplace = attributes[currField].replace("UNIQUE", "");
              values.attributes = values.attributes.replace(attributes[currField], attrToReplace);
            }
          }
        });
        if (canBeUniq) {
          const index = options.uniqueKeys[columns.name];
          delete options.uniqueKeys[columns.name];
          indexName = indexName.replace(/[.,\s]/g, "");
          columns.name = indexName;
          options.uniqueKeys[indexName] = index;
          if (indexName.length === 0) {
            values.attributes += `,UNIQUE (${columns.fields.map((field) => this.quoteIdentifier(field)).join(", ")})`;
          } else {
            values.attributes += `, CONSTRAINT ${this.quoteIdentifier(indexName)} UNIQUE (${columns.fields.map((field) => this.quoteIdentifier(field)).join(", ")})`;
          }
        }
      });
    }
    const query = Utils.joinSQLFragments([
      "CREATE TABLE",
      values.table,
      `(${values.attributes})`
    ]);
    return Utils.joinSQLFragments([
      "BEGIN",
      "EXECUTE IMMEDIATE",
      `${this.escape(query)};`,
      "EXCEPTION WHEN OTHERS THEN",
      "IF SQLCODE != -955 THEN",
      "RAISE;",
      "END IF;",
      "END;"
    ]);
  }
  tableExistsQuery(table) {
    const [tableName, schemaName] = this.getSchemaNameAndTableName(table);
    return `SELECT TABLE_NAME FROM ALL_TABLES WHERE TABLE_NAME = ${this.escape(tableName)} AND OWNER = ${table.schema ? this.escape(schemaName) : "USER"}`;
  }
  describeTableQuery(tableName, schema) {
    const currTableName = this.getCatalogName(tableName.tableName || tableName);
    schema = this.getCatalogName(schema);
    return [
      "SELECT atc.COLUMN_NAME, atc.DATA_TYPE, atc.DATA_LENGTH, atc.CHAR_LENGTH, atc.DEFAULT_LENGTH, atc.NULLABLE, ucc.constraint_type ",
      "FROM all_tab_columns atc ",
      "LEFT OUTER JOIN ",
      "(SELECT acc.column_name, acc.table_name, ac.constraint_type FROM all_cons_columns acc INNER JOIN all_constraints ac ON acc.constraint_name = ac.constraint_name) ucc ",
      "ON (atc.table_name = ucc.table_name AND atc.COLUMN_NAME = ucc.COLUMN_NAME) ",
      schema ? `WHERE (atc.OWNER = ${this.escape(schema)}) ` : "WHERE atc.OWNER = USER ",
      `AND (atc.TABLE_NAME = ${this.escape(currTableName)})`,
      "ORDER BY atc.COLUMN_NAME, CONSTRAINT_TYPE DESC"
    ].join("");
  }
  renameTableQuery(before, after) {
    return Utils.joinSQLFragments([
      "ALTER TABLE",
      this.quoteTable(before),
      "RENAME TO",
      this.quoteTable(after)
    ]);
  }
  showConstraintsQuery(table) {
    const tableName = this.getCatalogName(table.tableName || table);
    return `SELECT CONSTRAINT_NAME constraint_name FROM user_cons_columns WHERE table_name = ${this.escape(tableName)}`;
  }
  showTablesQuery() {
    return `SELECT owner as table_schema, table_name, 0 as lvl FROM all_tables where OWNER IN(SELECT USERNAME AS "schema_name" FROM ALL_USERS WHERE ORACLE_MAINTAINED = 'N')`;
  }
  dropTableQuery(tableName) {
    return Utils.joinSQLFragments([
      "BEGIN ",
      "EXECUTE IMMEDIATE 'DROP TABLE",
      this.quoteTable(tableName),
      "CASCADE CONSTRAINTS PURGE';",
      "EXCEPTION WHEN OTHERS THEN",
      " IF SQLCODE != -942 THEN",
      "   RAISE;",
      " END IF;",
      "END;"
    ]);
  }
  addIndexQuery(tableName, attributes, options, rawTablename) {
    if (typeof tableName !== "string" && attributes.name) {
      attributes.name = `${tableName.schema}.${attributes.name}`;
    }
    return super.addIndexQuery(tableName, attributes, options, rawTablename);
  }
  addConstraintQuery(tableName, options) {
    options = options || {};
    if (options.onUpdate) {
      delete options.onUpdate;
    }
    if (options.onDelete && options.onDelete.toUpperCase() === "NO ACTION") {
      delete options.onDelete;
    }
    const constraintSnippet = this.getConstraintSnippet(tableName, options);
    tableName = this.quoteTable(tableName);
    return `ALTER TABLE ${tableName} ADD ${constraintSnippet};`;
  }
  addColumnQuery(table, key, dataType) {
    dataType.field = key;
    const attribute = Utils.joinSQLFragments([
      this.quoteIdentifier(key),
      this.attributeToSQL(dataType, {
        attributeName: key,
        context: "addColumn"
      })
    ]);
    return Utils.joinSQLFragments([
      "ALTER TABLE",
      this.quoteTable(table),
      "ADD",
      attribute
    ]);
  }
  removeColumnQuery(tableName, attributeName) {
    return Utils.joinSQLFragments([
      "ALTER TABLE",
      this.quoteTable(tableName),
      "DROP COLUMN",
      this.quoteIdentifier(attributeName),
      ";"
    ]);
  }
  _alterForeignKeyConstraint(definition, table, attributeName) {
    const [tableName, schemaName] = this.getSchemaNameAndTableName(table);
    const attributeNameConstant = this.escape(this.getCatalogName(attributeName));
    const schemaNameConstant = table.schema ? this.escape(this.getCatalogName(schemaName)) : "USER";
    const tableNameConstant = this.escape(this.getCatalogName(tableName));
    const getConsNameQuery = [
      "SELECT constraint_name INTO cons_name",
      "FROM (",
      "  SELECT DISTINCT cc.owner, cc.table_name, cc.constraint_name, cc.column_name AS cons_columns",
      "  FROM all_cons_columns cc, all_constraints c",
      "  WHERE cc.owner = c.owner",
      "  AND cc.table_name = c.table_name",
      "  AND cc.constraint_name = c.constraint_name",
      "  AND c.constraint_type = 'R'",
      "  GROUP BY cc.owner, cc.table_name, cc.constraint_name, cc.column_name",
      ")",
      "WHERE owner =",
      schemaNameConstant,
      "AND table_name =",
      tableNameConstant,
      "AND cons_columns =",
      attributeNameConstant,
      ";"
    ].join(" ");
    const secondQuery = Utils.joinSQLFragments([
      `ALTER TABLE ${this.quoteIdentifier(tableName)}`,
      "ADD FOREIGN KEY",
      `(${this.quoteIdentifier(attributeName)})`,
      definition.replace(/.+?(?=REFERENCES)/, "")
    ]);
    return [
      "BEGIN",
      getConsNameQuery,
      "EXCEPTION",
      "WHEN NO_DATA_FOUND THEN",
      " CONS_NAME := NULL;",
      "END;",
      "IF CONS_NAME IS NOT NULL THEN",
      ` EXECUTE IMMEDIATE 'ALTER TABLE ${this.quoteTable(table)} DROP CONSTRAINT "'||CONS_NAME||'"';`,
      "END IF;",
      `EXECUTE IMMEDIATE ${this.escape(secondQuery)};`
    ].join(" ");
  }
  _modifyQuery(definition, table, attributeName) {
    const query = Utils.joinSQLFragments([
      "ALTER TABLE",
      this.quoteTable(table),
      "MODIFY",
      this.quoteIdentifier(attributeName),
      definition
    ]);
    const secondQuery = query.replace("NOT NULL", "").replace("NULL", "");
    return [
      "BEGIN",
      `EXECUTE IMMEDIATE ${this.escape(query)};`,
      "EXCEPTION",
      "WHEN OTHERS THEN",
      " IF SQLCODE = -1442 OR SQLCODE = -1451 THEN",
      `   EXECUTE IMMEDIATE ${this.escape(secondQuery)};`,
      " ELSE",
      "   RAISE;",
      " END IF;",
      "END;"
    ].join(" ");
  }
  changeColumnQuery(table, attributes) {
    const sql = [
      "DECLARE",
      "CONS_NAME VARCHAR2(200);",
      "BEGIN"
    ];
    for (const attributeName in attributes) {
      if (!Object.prototype.hasOwnProperty.call(attributes, attributeName))
        continue;
      const definition = attributes[attributeName];
      if (definition.match(/REFERENCES/)) {
        sql.push(this._alterForeignKeyConstraint(definition, table, attributeName));
      } else {
        sql.push(this._modifyQuery(definition, table, attributeName));
      }
    }
    sql.push("END;");
    return sql.join(" ");
  }
  renameColumnQuery(tableName, attrBefore, attributes) {
    const newName = Object.keys(attributes)[0];
    return `ALTER TABLE ${this.quoteTable(tableName)} RENAME COLUMN ${this.quoteIdentifier(attrBefore)} TO ${this.quoteIdentifier(newName)}`;
  }
  populateInsertQueryReturnIntoBinds(returningModelAttributes, returnTypes, inbindLength, returnAttributes, options) {
    const oracledb = this.sequelize.connectionManager.lib;
    const outBindAttributes = Object.create(null);
    const outbind = [];
    const outbindParam = this.bindParam(outbind, inbindLength);
    returningModelAttributes.forEach((element, index) => {
      if (element.startsWith('"')) {
        element = element.substring(1, element.length - 1);
      }
      outBindAttributes[element] = Object.assign(returnTypes[index]._getBindDef(oracledb), { dir: oracledb.BIND_OUT });
      const returnAttribute = `${this.format(void 0, void 0, { context: "INSERT" }, outbindParam)}`;
      returnAttributes.push(returnAttribute);
    });
    options.outBindAttributes = outBindAttributes;
  }
  upsertQuery(tableName, insertValues, updateValues, where, model, options) {
    const rawAttributes = model.rawAttributes;
    const updateQuery = this.updateQuery(tableName, updateValues, where, options, rawAttributes);
    options.bind = updateQuery.bind;
    const insertQuery = this.insertQuery(tableName, insertValues, rawAttributes, options);
    const sql = [
      "DECLARE ",
      "BEGIN ",
      updateQuery.query ? [
        updateQuery.query,
        "; ",
        " IF ( SQL%ROWCOUNT = 0 ) THEN ",
        insertQuery.query,
        " :isUpdate := 0; ",
        "ELSE ",
        " :isUpdate := 1; ",
        " END IF; "
      ].join("") : [
        insertQuery.query,
        " :isUpdate := 0; ",
        "EXCEPTION WHEN OTHERS THEN",
        " IF SQLCODE != -1 THEN",
        "   RAISE;",
        " END IF;"
      ].join(""),
      "END;"
    ];
    const query = sql.join("");
    const result = { query };
    if (options.bindParam !== false) {
      result.bind = updateQuery.bind || insertQuery.bind;
    }
    return result;
  }
  bulkInsertQuery(tableName, fieldValueHashes, options, fieldMappedAttributes) {
    options = options || {};
    options.executeMany = true;
    fieldMappedAttributes = fieldMappedAttributes || {};
    const tuples = [];
    const allColumns = {};
    const inBindBindDefMap = {};
    const outBindBindDefMap = {};
    const oracledb = this.sequelize.connectionManager.lib;
    for (const fieldValueHash of fieldValueHashes) {
      _.forOwn(fieldValueHash, (value, key) => {
        allColumns[key] = fieldMappedAttributes[key] && fieldMappedAttributes[key].autoIncrement === true && value === null;
      });
    }
    let inBindPosition;
    for (const fieldValueHash of fieldValueHashes) {
      const tuple = [];
      const inbindParam = options.bindParam === void 0 ? this.bindParam(tuple) : options.bindParam;
      const tempBindPositions = Object.keys(allColumns).map((key) => {
        if (allColumns[key] === true) {
          if (fieldValueHash[key] !== null) {
            throw Error("For an auto-increment column either all row must be null or non-null, a mix of null and non-null is not allowed!");
          }
          return "DEFAULT";
        }
        return this.format(fieldValueHash[key], fieldMappedAttributes[key], { context: "INSERT" }, inbindParam);
      });
      if (!inBindPosition) {
        inBindPosition = tempBindPositions;
      }
      tuples.push(tuple);
    }
    const returnColumn = [];
    const returnColumnBindPositions = [];
    const insertColumns = [];
    for (const key of Object.keys(allColumns)) {
      if (fieldMappedAttributes[key]) {
        const bindDef = fieldMappedAttributes[key].type._getBindDef(oracledb);
        if (allColumns[key]) {
          bindDef.dir = oracledb.BIND_OUT;
          outBindBindDefMap[key] = bindDef;
          returnColumn.push(this.quoteIdentifier(key));
          returnColumnBindPositions.push(`:${tuples[0].length + returnColumn.length}`);
        } else {
          bindDef.dir = oracledb.BIND_IN;
          inBindBindDefMap[key] = bindDef;
        }
      }
      insertColumns.push(this.quoteIdentifier(key));
    }
    let query = Utils.joinSQLFragments([
      "INSERT",
      "INTO",
      this.quoteTable(tableName),
      `(${insertColumns.join(",")})`,
      "VALUES",
      `(${inBindPosition})`
    ]);
    if (returnColumn.length > 0) {
      options.outBindAttributes = outBindBindDefMap;
      query = Utils.joinSQLFragments([
        query,
        "RETURNING",
        `${returnColumn.join(",")}`,
        "INTO",
        `${returnColumnBindPositions}`
      ]);
    }
    const result = { query };
    result.bind = tuples;
    options.inbindAttributes = inBindBindDefMap;
    return result;
  }
  truncateTableQuery(tableName) {
    return `TRUNCATE TABLE ${this.quoteTable(tableName)}`;
  }
  deleteQuery(tableName, where, options, model) {
    options = options || {};
    const table = tableName;
    where = this.getWhereConditions(where, null, model, options);
    let queryTmpl;
    if (options.limit) {
      const whereTmpl = where ? ` AND ${where}` : "";
      queryTmpl = `DELETE FROM ${this.quoteTable(table)} WHERE rowid IN (SELECT rowid FROM ${this.quoteTable(table)} WHERE rownum <= ${this.escape(options.limit)}${whereTmpl})`;
    } else {
      const whereTmpl = where ? ` WHERE ${where}` : "";
      queryTmpl = `DELETE FROM ${this.quoteTable(table)}${whereTmpl}`;
    }
    return queryTmpl;
  }
  showIndexesQuery(table) {
    const [tableName, owner] = this.getSchemaNameAndTableName(table);
    const sql = [
      "SELECT i.index_name,i.table_name, i.column_name, u.uniqueness, i.descend, c.constraint_type ",
      "FROM all_ind_columns i ",
      "INNER JOIN all_indexes u ",
      "ON (u.table_name = i.table_name AND u.index_name = i.index_name) ",
      "LEFT OUTER JOIN all_constraints c ",
      "ON (c.table_name = i.table_name AND c.index_name = i.index_name) ",
      `WHERE i.table_name = ${this.escape(tableName)}`,
      " AND u.table_owner = ",
      owner ? this.escape(owner) : "USER",
      " ORDER BY index_name, column_position"
    ];
    return sql.join("");
  }
  removeIndexQuery(tableName, indexNameOrAttributes) {
    let indexName = indexNameOrAttributes;
    if (typeof indexName !== "string") {
      indexName = Utils.underscore(`${tableName}_${indexNameOrAttributes.join("_")}`);
    }
    return `DROP INDEX ${this.quoteIdentifier(indexName)}`;
  }
  attributeToSQL(attribute, options) {
    if (!_.isPlainObject(attribute)) {
      attribute = {
        type: attribute
      };
    }
    attribute.onUpdate = "";
    if (attribute.references) {
      if (attribute.Model && attribute.Model.tableName === attribute.references.model) {
        this.sequelize.log("Oracle does not support self referencial constraints, we will remove it but we recommend restructuring your query");
        attribute.onDelete = "";
      }
    }
    let template;
    template = attribute.type.toSql ? attribute.type.toSql() : "";
    if (attribute.type instanceof DataTypes.JSON) {
      template += ` CHECK (${this.quoteIdentifier(options.attributeName)} IS JSON)`;
      return template;
    }
    if (Utils.defaultValueSchemable(attribute.defaultValue)) {
      template += ` DEFAULT ${this.escape(attribute.defaultValue)}`;
    }
    if (attribute.allowNull === false) {
      template += " NOT NULL";
    }
    if (attribute.type instanceof DataTypes.ENUM) {
      if (attribute.type.values && !attribute.values)
        attribute.values = attribute.type.values;
      template += ` CHECK (${this.quoteIdentifier(options.attributeName)} IN(${_.map(attribute.values, (value) => {
        return this.escape(value);
      }).join(", ")}))`;
      return template;
    }
    if (attribute.type instanceof DataTypes.BOOLEAN) {
      template += ` CHECK (${this.quoteIdentifier(options.attributeName)} IN('1', '0'))`;
      return template;
    }
    if (attribute.autoIncrement) {
      template = " NUMBER(*,0) GENERATED BY DEFAULT ON NULL AS IDENTITY";
    } else if (attribute.type && attribute.type.key === DataTypes.DOUBLE.key) {
      template = attribute.type.toSql();
    } else if (attribute.type) {
      let unsignedTemplate = "";
      if (attribute.type._unsigned) {
        attribute.type._unsigned = false;
        unsignedTemplate += ` check(${this.quoteIdentifier(options.attributeName)} >= 0)`;
      }
      template = attribute.type.toString();
      if (attribute.type && attribute.type !== "TEXT" && attribute.type._binary !== true && Utils.defaultValueSchemable(attribute.defaultValue)) {
        template += ` DEFAULT ${this.escape(attribute.defaultValue)}`;
      }
      if (!attribute.autoIncrement) {
        if (attribute.allowNull === false) {
          template += " NOT NULL";
        } else if (!attribute.primaryKey && !Utils.defaultValueSchemable(attribute.defaultValue)) {
          template += " NULL";
        }
      }
      template += unsignedTemplate;
    } else {
      template = "";
    }
    if (attribute.unique === true && !attribute.primaryKey) {
      template += " UNIQUE";
    }
    if (attribute.primaryKey) {
      template += " PRIMARY KEY";
    }
    if ((!options || !options.withoutForeignKeyConstraints) && attribute.references) {
      template += ` REFERENCES ${this.quoteTable(attribute.references.model)}`;
      if (attribute.references.key) {
        template += ` (${this.quoteIdentifier(attribute.references.key)})`;
      } else {
        template += ` (${this.quoteIdentifier("id")})`;
      }
      if (attribute.onDelete && attribute.onDelete.toUpperCase() !== "NO ACTION") {
        template += ` ON DELETE ${attribute.onDelete.toUpperCase()}`;
      }
    }
    return template;
  }
  attributesToSQL(attributes, options) {
    const result = {};
    for (const key in attributes) {
      const attribute = attributes[key];
      const attributeName = attribute.field || key;
      result[attributeName] = this.attributeToSQL(attribute, __spreadValues({ attributeName }, options));
    }
    return result;
  }
  createTrigger() {
    throwMethodUndefined("createTrigger");
  }
  dropTrigger() {
    throwMethodUndefined("dropTrigger");
  }
  renameTrigger() {
    throwMethodUndefined("renameTrigger");
  }
  createFunction() {
    throwMethodUndefined("createFunction");
  }
  dropFunction() {
    throwMethodUndefined("dropFunction");
  }
  renameFunction() {
    throwMethodUndefined("renameFunction");
  }
  getConstraintsOnColumn(table, column) {
    const [tableName, schemaName] = this.getSchemaNameAndTableName(table);
    column = this.getCatalogName(column);
    const sql = [
      "SELECT CONSTRAINT_NAME FROM user_cons_columns WHERE TABLE_NAME = ",
      this.escape(tableName),
      " and OWNER = ",
      table.schema ? this.escape(schemaName) : "USER",
      " and COLUMN_NAME = ",
      this.escape(column),
      " AND POSITION IS NOT NULL ORDER BY POSITION"
    ].join("");
    return sql;
  }
  getForeignKeysQuery(table) {
    const [tableName, schemaName] = this.getSchemaNameAndTableName(table);
    const sql = [
      'SELECT DISTINCT  a.table_name "tableName", a.constraint_name "constraintName", a.owner "owner",  a.column_name "columnName",',
      ' b.table_name "referencedTableName", b.column_name "referencedColumnName"',
      " FROM all_cons_columns a",
      " JOIN all_constraints c ON a.owner = c.owner AND a.constraint_name = c.constraint_name",
      " JOIN all_cons_columns b ON c.owner = b.owner AND c.r_constraint_name = b.constraint_name",
      " WHERE c.constraint_type  = 'R'",
      " AND a.table_name = ",
      this.escape(tableName),
      " AND a.owner = ",
      table.schema ? this.escape(schemaName) : "USER",
      " ORDER BY a.table_name, a.constraint_name"
    ].join("");
    return sql;
  }
  dropForeignKeyQuery(tableName, foreignKey) {
    return this.dropConstraintQuery(tableName, foreignKey);
  }
  getPrimaryKeyConstraintQuery(table) {
    const [tableName, schemaName] = this.getSchemaNameAndTableName(table);
    const sql = [
      "SELECT cols.column_name, atc.identity_column ",
      "FROM all_constraints cons, all_cons_columns cols ",
      "INNER JOIN all_tab_columns atc ON(atc.table_name = cols.table_name AND atc.COLUMN_NAME = cols.COLUMN_NAME )",
      "WHERE cols.table_name = ",
      this.escape(tableName),
      "AND cols.owner = ",
      table.schema ? this.escape(schemaName) : "USER ",
      "AND cons.constraint_type = 'P' ",
      "AND cons.constraint_name = cols.constraint_name ",
      "AND cons.owner = cols.owner ",
      "ORDER BY cols.table_name, cols.position"
    ].join("");
    return sql;
  }
  dropConstraintQuery(tableName, constraintName) {
    return `ALTER TABLE ${this.quoteTable(tableName)} DROP CONSTRAINT ${constraintName}`;
  }
  setIsolationLevelQuery(value, options) {
    if (options.parent) {
      return;
    }
    switch (value) {
      case Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED:
      case Transaction.ISOLATION_LEVELS.READ_COMMITTED:
        return "SET TRANSACTION ISOLATION LEVEL READ COMMITTED;";
      case Transaction.ISOLATION_LEVELS.REPEATABLE_READ:
        return "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;";
      default:
        throw new Error(`isolation level "${value}" is not supported`);
    }
  }
  getAliasToken() {
    return "";
  }
  startTransactionQuery(transaction) {
    if (transaction.parent) {
      return `SAVEPOINT ${this.quoteIdentifier(transaction.name)}`;
    }
    return "BEGIN TRANSACTION";
  }
  commitTransactionQuery(transaction) {
    if (transaction.parent) {
      return;
    }
    return "COMMIT TRANSACTION";
  }
  rollbackTransactionQuery(transaction) {
    if (transaction.parent) {
      return `ROLLBACK TO SAVEPOINT ${this.quoteIdentifier(transaction.name)}`;
    }
    return "ROLLBACK TRANSACTION";
  }
  handleSequelizeMethod(smth, tableName, factory, options, prepend) {
    let str;
    if (smth instanceof Utils.Json) {
      if (smth.conditions) {
        const conditions = this.parseConditionObject(smth.conditions).map((condition) => `${this.jsonPathExtractionQuery(condition.path[0], _.tail(condition.path))} = '${condition.value}'`);
        return conditions.join(" AND ");
      }
      if (smth.path) {
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
    }
    if (smth instanceof Utils.Cast) {
      if (smth.val instanceof Utils.SequelizeMethod) {
        str = this.handleSequelizeMethod(smth.val, tableName, factory, options, prepend);
        if (smth.type === "boolean") {
          str = `(CASE WHEN ${str}='true' THEN 1 ELSE 0 END)`;
          return `CAST(${str} AS NUMBER)`;
        }
        if (smth.type === "timestamptz" && /json_value\(/.test(str)) {
          str = str.slice(0, -1);
          return `${str} RETURNING TIMESTAMP WITH TIME ZONE)`;
        }
      }
    }
    return super.handleSequelizeMethod(smth, tableName, factory, options, prepend);
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
  jsonPathExtractionQuery(column, path) {
    let paths = _.toPath(path);
    const quotedColumn = this.isIdentifierQuoted(column) ? column : this.quoteIdentifier(column);
    paths = paths.map((subPath) => {
      return /\D/.test(subPath) ? Utils.addTicks(subPath, '"') : subPath;
    });
    const pathStr = this.escape(["$"].concat(paths).join(".").replace(/\.(\d+)(?:(?=\.)|$)/g, (__, digit) => `[${digit}]`));
    return `json_value(${quotedColumn},${pathStr})`;
  }
  addLimitAndOffset(options, model) {
    let fragment = "";
    const offset = options.offset || 0, isSubQuery = options.hasIncludeWhere || options.hasIncludeRequired || options.hasMultiAssociation;
    let orders = {};
    if (options.order) {
      orders = this.getQueryOrders(options, model, isSubQuery);
    }
    if (options.limit || options.offset) {
      if (!orders.mainQueryOrder || !orders.mainQueryOrder.length || isSubQuery && (!orders.subQueryOrder || !orders.subQueryOrder.length)) {
        const tablePkFragment = `${this.quoteTable(options.tableAs || model.name)}.${this.quoteIdentifier(model.primaryKeyField)}`;
        fragment += ` ORDER BY ${tablePkFragment}`;
      }
      if (options.offset || options.limit) {
        fragment += ` OFFSET ${this.escape(offset)} ROWS`;
      }
      if (options.limit) {
        fragment += ` FETCH NEXT ${this.escape(options.limit)} ROWS ONLY`;
      }
    }
    return fragment;
  }
  booleanValue(value) {
    return value ? 1 : 0;
  }
  quoteIdentifier(identifier, force = false) {
    const optForceQuote = force;
    const optQuoteIdentifiers = this.options.quoteIdentifiers !== false;
    const rawIdentifier = Utils.removeTicks(identifier, '"');
    const regExp = /^(([\w][\w\d_]*))$/g;
    if (optForceQuote !== true && optQuoteIdentifiers === false && regExp.test(rawIdentifier) && !ORACLE_RESERVED_WORDS.includes(rawIdentifier.toUpperCase())) {
      return rawIdentifier;
    }
    return Utils.addTicks(rawIdentifier, '"');
  }
  bindParam(bind, posOffset = 0) {
    return (value) => {
      bind.push(value);
      return `:${bind.length + posOffset}`;
    };
  }
  authTestQuery() {
    return "SELECT 1+1 AS result FROM DUAL";
  }
}
function throwMethodUndefined(methodName) {
  throw new Error(`The method "${methodName}" is not defined! Please add it to your sql dialect.`);
}
//# sourceMappingURL=query-generator.js.map
