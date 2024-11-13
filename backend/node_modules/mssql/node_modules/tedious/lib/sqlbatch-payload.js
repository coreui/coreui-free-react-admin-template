"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _writableTrackingBuffer = _interopRequireDefault(require("./tracking-buffer/writable-tracking-buffer"));

var _allHeaders = require("./all-headers");

let _Symbol$iterator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Symbol$iterator = Symbol.iterator;

/*
  s2.2.6.6
 */
class SqlBatchPayload {
  constructor(sqlText, txnDescriptor, options) {
    this.sqlText = void 0;
    this.txnDescriptor = void 0;
    this.options = void 0;
    this.sqlText = sqlText;
    this.txnDescriptor = txnDescriptor;
    this.options = options;
  }

  *[_Symbol$iterator]() {
    if (this.options.tdsVersion >= '7_2') {
      const buffer = new _writableTrackingBuffer.default(18, 'ucs2');
      const outstandingRequestCount = 1;
      (0, _allHeaders.writeToTrackingBuffer)(buffer, this.txnDescriptor, outstandingRequestCount);
      yield buffer.data;
    }

    yield Buffer.from(this.sqlText, 'ucs2');
  }

  toString(indent = '') {
    return indent + ('SQL Batch - ' + this.sqlText);
  }

}

var _default = SqlBatchPayload;
exports.default = _default;
module.exports = SqlBatchPayload;