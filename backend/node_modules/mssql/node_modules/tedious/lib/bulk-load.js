"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var _writableTrackingBuffer = _interopRequireDefault(require("./tracking-buffer/writable-tracking-buffer"));

var _stream = require("stream");

var _token = require("./token/token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 */
const FLAGS = {
  nullable: 1 << 0,
  caseSen: 1 << 1,
  updateableReadWrite: 1 << 2,
  updateableUnknown: 1 << 3,
  identity: 1 << 4,
  computed: 1 << 5,
  // introduced in TDS 7.2
  fixedLenCLRType: 1 << 8,
  // introduced in TDS 7.2
  sparseColumnSet: 1 << 10,
  // introduced in TDS 7.3.B
  hidden: 1 << 13,
  // introduced in TDS 7.2
  key: 1 << 14,
  // introduced in TDS 7.2
  nullableUnknown: 1 << 15 // introduced in TDS 7.2

};
/**
 * @private
 */

const DONE_STATUS = {
  FINAL: 0x00,
  MORE: 0x1,
  ERROR: 0x2,
  INXACT: 0x4,
  COUNT: 0x10,
  ATTN: 0x20,
  SRVERROR: 0x100
};
/**
 * @private
 */

const rowTokenBuffer = Buffer.from([_token.TYPE.ROW]);
const textPointerAndTimestampBuffer = Buffer.from([// TextPointer length
0x10, // TextPointer
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Timestamp
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
const textPointerNullBuffer = Buffer.from([0x00]); // A transform that converts rows to packets.

class RowTransform extends _stream.Transform {
  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */
  constructor(bulkLoad) {
    super({
      writableObjectMode: true
    });
    this.columnMetadataWritten = void 0;
    this.bulkLoad = void 0;
    this.mainOptions = void 0;
    this.columns = void 0;
    this.bulkLoad = bulkLoad;
    this.mainOptions = bulkLoad.options;
    this.columns = bulkLoad.columns;
    this.columnMetadataWritten = false;
  }
  /**
   * @private
   */


  _transform(row, _encoding, callback) {
    if (!this.columnMetadataWritten) {
      this.push(this.bulkLoad.getColMetaData());
      this.columnMetadataWritten = true;
    }

    this.push(rowTokenBuffer);

    for (let i = 0; i < this.columns.length; i++) {
      const c = this.columns[i];
      let value = Array.isArray(row) ? row[i] : row[c.objName];

      if (this.bulkLoad.options.validateBulkLoadParameters) {
        try {
          value = c.type.validate(value);
        } catch (error) {
          return callback(error);
        }
      }

      const parameter = {
        length: c.length,
        scale: c.scale,
        precision: c.precision,
        value: value
      };

      if (c.type.name === 'Text' || c.type.name === 'Image' || c.type.name === 'NText') {
        if (value == null) {
          this.push(textPointerNullBuffer);
          continue;
        }

        this.push(textPointerAndTimestampBuffer);
      }

      this.push(c.type.generateParameterLength(parameter, this.mainOptions));

      for (const chunk of c.type.generateParameterData(parameter, this.mainOptions)) {
        this.push(chunk);
      }
    }

    process.nextTick(callback);
  }
  /**
   * @private
   */


  _flush(callback) {
    this.push(this.bulkLoad.createDoneToken());
    process.nextTick(callback);
  }

}
/**
 * A BulkLoad instance is used to perform a bulk insert.
 *
 * Use [[Connection.newBulkLoad]] to create a new instance, and [[Connection.execBulkLoad]] to execute it.
 *
 * Example of BulkLoad Usages:
 *
 * ```js
 * // optional BulkLoad options
 * const options = { keepNulls: true };
 *
 * // instantiate - provide the table where you'll be inserting to, options and a callback
 * const bulkLoad = connection.newBulkLoad('MyTable', options, (error, rowCount) => {
 *   console.log('inserted %d rows', rowCount);
 * });
 *
 * // setup your columns - always indicate whether the column is nullable
 * bulkLoad.addColumn('myInt', TYPES.Int, { nullable: false });
 * bulkLoad.addColumn('myString', TYPES.NVarChar, { length: 50, nullable: true });
 *
 * // execute
 * connection.execBulkLoad(bulkLoad, [
 *   { myInt: 7, myString: 'hello' },
 *   { myInt: 23, myString: 'world' }
 * ]);
 * ```
 */


class BulkLoad extends _events.EventEmitter {
  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */
  constructor(table, connectionOptions, {
    checkConstraints = false,
    fireTriggers = false,
    keepNulls = false,
    lockTable = false,
    order = {}
  }, callback) {
    if (typeof checkConstraints !== 'boolean') {
      throw new TypeError('The "options.checkConstraints" property must be of type boolean.');
    }

    if (typeof fireTriggers !== 'boolean') {
      throw new TypeError('The "options.fireTriggers" property must be of type boolean.');
    }

    if (typeof keepNulls !== 'boolean') {
      throw new TypeError('The "options.keepNulls" property must be of type boolean.');
    }

    if (typeof lockTable !== 'boolean') {
      throw new TypeError('The "options.lockTable" property must be of type boolean.');
    }

    if (typeof order !== 'object' || order === null) {
      throw new TypeError('The "options.order" property must be of type object.');
    }

    for (const [column, direction] of Object.entries(order)) {
      if (direction !== 'ASC' && direction !== 'DESC') {
        throw new TypeError('The value of the "' + column + '" key in the "options.order" object must be either "ASC" or "DESC".');
      }
    }

    super();
    this.error = void 0;
    this.canceled = void 0;
    this.executionStarted = void 0;
    this.streamingMode = void 0;
    this.table = void 0;
    this.timeout = void 0;
    this.options = void 0;
    this.callback = void 0;
    this.columns = void 0;
    this.columnsByName = void 0;
    this.firstRowWritten = void 0;
    this.rowToPacketTransform = void 0;
    this.bulkOptions = void 0;
    this.connection = void 0;
    this.rows = void 0;
    this.rst = void 0;
    this.rowCount = void 0;
    this.error = undefined;
    this.canceled = false;
    this.executionStarted = false;
    this.table = table;
    this.options = connectionOptions;
    this.callback = callback;
    this.columns = [];
    this.columnsByName = {};
    this.firstRowWritten = false;
    this.streamingMode = false;
    this.rowToPacketTransform = new RowTransform(this); // eslint-disable-line no-use-before-define

    this.bulkOptions = {
      checkConstraints,
      fireTriggers,
      keepNulls,
      lockTable,
      order
    };
  }
  /**
   * Adds a column to the bulk load.
   *
   * The column definitions should match the table you are trying to insert into.
   * Attempting to call addColumn after the first row has been added will throw an exception.
   *
   * ```js
   * bulkLoad.addColumn('MyIntColumn', TYPES.Int, { nullable: false });
   * ```
   *
   * @param name The name of the column.
   * @param type One of the supported `data types`.
   * @param __namedParameters Additional column type information. At a minimum, `nullable` must be set to true or false.
   * @param length For VarChar, NVarChar, VarBinary. Use length as `Infinity` for VarChar(max), NVarChar(max) and VarBinary(max).
   * @param nullable Indicates whether the column accepts NULL values.
   * @param objName If the name of the column is different from the name of the property found on `rowObj` arguments passed to [[addRow]] or [[Connection.execBulkLoad]], then you can use this option to specify the property name.
   * @param precision For Numeric, Decimal.
   * @param scale For Numeric, Decimal, Time, DateTime2, DateTimeOffset.
  */


  addColumn(name, type, {
    output = false,
    length,
    precision,
    scale,
    objName = name,
    nullable = true
  }) {
    if (this.firstRowWritten) {
      throw new Error('Columns cannot be added to bulk insert after the first row has been written.');
    }

    if (this.executionStarted) {
      throw new Error('Columns cannot be added to bulk insert after execution has started.');
    }

    const column = {
      type: type,
      name: name,
      value: null,
      output: output,
      length: length,
      precision: precision,
      scale: scale,
      objName: objName,
      nullable: nullable
    };

    if ((type.id & 0x30) === 0x20) {
      if (column.length == null && type.resolveLength) {
        column.length = type.resolveLength(column);
      }
    }

    if (type.resolvePrecision && column.precision == null) {
      column.precision = type.resolvePrecision(column);
    }

    if (type.resolveScale && column.scale == null) {
      column.scale = type.resolveScale(column);
    }

    this.columns.push(column);
    this.columnsByName[name] = column;
  }
  /**
   * Adds a row to the bulk insert.
   *
   * ```js
   * bulkLoad.addRow({ first_name: 'Bill', last_name: 'Gates' });
   * ```
   *
   * @param row An object of key/value pairs representing column name (or objName) and value.
   *
   * @deprecated This method is deprecated. Instead of adding rows individually, you should pass
   *   all row objects when calling [[Connection.execBulkLoad]]. This method will be removed in the future.
   */


  addRow(...input) {
    this.firstRowWritten = true;
    let row;

    if (input.length > 1 || !input[0] || typeof input[0] !== 'object') {
      row = input;
    } else {
      row = input[0];
    } // write each column


    if (Array.isArray(row)) {
      this.rowToPacketTransform.write(this.columns.map((column, i) => {
        let value = row[i];

        if (this.options.validateBulkLoadParameters) {
          value = column.type.validate(value);
        }

        return value;
      }));
    } else {
      this.rowToPacketTransform.write(this.columns.map(column => {
        let value = row[column.objName];

        if (this.options.validateBulkLoadParameters) {
          value = column.type.validate(value);
        }

        return value;
      }));
    }
  }
  /**
   * @private
   */


  getOptionsSql() {
    const addOptions = [];

    if (this.bulkOptions.checkConstraints) {
      addOptions.push('CHECK_CONSTRAINTS');
    }

    if (this.bulkOptions.fireTriggers) {
      addOptions.push('FIRE_TRIGGERS');
    }

    if (this.bulkOptions.keepNulls) {
      addOptions.push('KEEP_NULLS');
    }

    if (this.bulkOptions.lockTable) {
      addOptions.push('TABLOCK');
    }

    if (this.bulkOptions.order) {
      const orderColumns = [];

      for (const [column, direction] of Object.entries(this.bulkOptions.order)) {
        orderColumns.push(`${column} ${direction}`);
      }

      if (orderColumns.length) {
        addOptions.push(`ORDER (${orderColumns.join(', ')})`);
      }
    }

    if (addOptions.length > 0) {
      return ` WITH (${addOptions.join(',')})`;
    } else {
      return '';
    }
  }
  /**
   * @private
   */


  getBulkInsertSql() {
    let sql = 'insert bulk ' + this.table + '(';

    for (let i = 0, len = this.columns.length; i < len; i++) {
      const c = this.columns[i];

      if (i !== 0) {
        sql += ', ';
      }

      sql += '[' + c.name + '] ' + c.type.declaration(c);
    }

    sql += ')';
    sql += this.getOptionsSql();
    return sql;
  }
  /**
   * This is simply a helper utility function which returns a `CREATE TABLE SQL` statement based on the columns added to the bulkLoad object.
   * This may be particularly handy when you want to insert into a temporary table (a table which starts with `#`).
   *
   * ```js
   * var sql = bulkLoad.getTableCreationSql();
   * ```
   *
   * A side note on bulk inserting into temporary tables: if you want to access a local temporary table after executing the bulk load,
   * you'll need to use the same connection and execute your requests using [[Connection.execSqlBatch]] instead of [[Connection.execSql]]
   */


  getTableCreationSql() {
    let sql = 'CREATE TABLE ' + this.table + '(\n';

    for (let i = 0, len = this.columns.length; i < len; i++) {
      const c = this.columns[i];

      if (i !== 0) {
        sql += ',\n';
      }

      sql += '[' + c.name + '] ' + c.type.declaration(c);

      if (c.nullable !== undefined) {
        sql += ' ' + (c.nullable ? 'NULL' : 'NOT NULL');
      }
    }

    sql += '\n)';
    return sql;
  }
  /**
   * @private
   */


  getColMetaData() {
    const tBuf = new _writableTrackingBuffer.default(100, null, true); // TokenType

    tBuf.writeUInt8(_token.TYPE.COLMETADATA); // Count

    tBuf.writeUInt16LE(this.columns.length);

    for (let j = 0, len = this.columns.length; j < len; j++) {
      const c = this.columns[j]; // UserType

      if (this.options.tdsVersion < '7_2') {
        tBuf.writeUInt16LE(0);
      } else {
        tBuf.writeUInt32LE(0);
      } // Flags


      let flags = FLAGS.updateableReadWrite;

      if (c.nullable) {
        flags |= FLAGS.nullable;
      } else if (c.nullable === undefined && this.options.tdsVersion >= '7_2') {
        flags |= FLAGS.nullableUnknown;
      }

      tBuf.writeUInt16LE(flags); // TYPE_INFO

      tBuf.writeBuffer(c.type.generateTypeInfo(c, this.options)); // TableName

      if (c.type.hasTableName) {
        tBuf.writeUsVarchar(this.table, 'ucs2');
      } // ColName


      tBuf.writeBVarchar(c.name, 'ucs2');
    }

    return tBuf.data;
  }
  /**
   * Sets a timeout for this bulk load.
   *
   * ```js
   * bulkLoad.setTimeout(timeout);
   * ```
   *
   * @param timeout The number of milliseconds before the bulk load is considered failed, or 0 for no timeout.
   *   When no timeout is set for the bulk load, the [[ConnectionOptions.requestTimeout]] of the Connection is used.
   */


  setTimeout(timeout) {
    this.timeout = timeout;
  }
  /**
   * @private
   */


  createDoneToken() {
    // It might be nice to make DoneToken a class if anything needs to create them, but for now, just do it here
    const tBuf = new _writableTrackingBuffer.default(this.options.tdsVersion < '7_2' ? 9 : 13);
    tBuf.writeUInt8(_token.TYPE.DONE);
    const status = DONE_STATUS.FINAL;
    tBuf.writeUInt16LE(status);
    tBuf.writeUInt16LE(0); // CurCmd (TDS ignores this)

    tBuf.writeUInt32LE(0); // row count - doesn't really matter

    if (this.options.tdsVersion >= '7_2') {
      tBuf.writeUInt32LE(0); // row count is 64 bits in >= TDS 7.2
    }

    return tBuf.data;
  }
  /**
   * Switches the `BulkLoad` object into streaming mode and returns a
   * [writable stream](https://nodejs.org/dist/latest-v10.x/docs/api/stream.html#stream_writable_streams)
   * that can be used to send a large amount of rows to the server.
   *
   * ```js
   * const bulkLoad = connection.newBulkLoad(...);
   * bulkLoad.addColumn(...);
   *
   * const rowStream = bulkLoad.getRowStream();
   *
   * connection.execBulkLoad(bulkLoad);
   * ```
   *
   * In streaming mode, [[addRow]] cannot be used. Instead all data rows must be written to the returned stream object.
   * The stream implementation uses data flow control to prevent memory overload. [`stream.write()`](https://nodejs.org/dist/latest-v10.x/docs/api/stream.html#stream_writable_write_chunk_encoding_callback)
   * returns `false` to indicate that data transfer should be paused.
   *
   * After that, the stream emits a ['drain' event](https://nodejs.org/dist/latest-v10.x/docs/api/stream.html#stream_event_drain)
   * when it is ready to resume data transfer.
   *
   * @deprecated
   *   This method is deprecated. Instead of writing rows to the stream returned by this method,
   *   you can pass any object that implements the `Iterable` or `AsyncIterable` interface (e.g. a `Readable`
   *   stream or an `AsyncGenerator`) when calling [[Connection.execBulkLoad]]. This method will be removed in the future.
   */


  getRowStream() {
    if (this.firstRowWritten) {
      throw new Error('BulkLoad cannot be switched to streaming mode after first row has been written using addRow().');
    }

    if (this.executionStarted) {
      throw new Error('BulkLoad cannot be switched to streaming mode after execution has started.');
    }

    this.streamingMode = true;
    return this.rowToPacketTransform;
  }
  /**
   * @private
   */


  cancel() {
    if (this.canceled) {
      return;
    }

    this.canceled = true;
    this.emit('cancel');
  }

}

var _default = BulkLoad;
exports.default = _default;
module.exports = BulkLoad;