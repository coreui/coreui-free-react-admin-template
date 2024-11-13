"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulkLoadPayload = void 0;

var _errors = require("./errors");

let _Symbol$asyncIterator;

_Symbol$asyncIterator = Symbol.asyncIterator;

class BulkLoadPayload {
  constructor(bulkLoad) {
    this.bulkLoad = void 0;
    this.iterator = void 0;
    this.bulkLoad = bulkLoad; // We need to grab the iterator here so that `error` event handlers are set up
    // as early as possible (and are not potentially lost).

    this.iterator = this.bulkLoad.rowToPacketTransform[Symbol.asyncIterator]();
    this.bulkLoad.rowToPacketTransform.once('finish', () => {
      this.bulkLoad.removeListener('cancel', onCancel);
    });
    let onCancel;

    if (this.bulkLoad.streamingMode) {
      onCancel = () => {
        this.bulkLoad.rowToPacketTransform.destroy(new _errors.RequestError('Canceled.', 'ECANCEL'));
      };
    } else {
      onCancel = () => {
        this.bulkLoad.rowToPacketTransform.destroy();
      };
    }

    this.bulkLoad.once('cancel', onCancel);
  }

  [_Symbol$asyncIterator]() {
    return this.iterator;
  }

  toString(indent = '') {
    return indent + 'BulkLoad';
  }

}

exports.BulkLoadPayload = BulkLoadPayload;