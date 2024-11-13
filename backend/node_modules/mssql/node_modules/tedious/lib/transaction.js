"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertValidIsolationLevel = assertValidIsolationLevel;
exports.Transaction = exports.isolationLevelByValue = exports.ISOLATION_LEVEL = exports.OPERATION_TYPE = void 0;

var _writableTrackingBuffer = _interopRequireDefault(require("./tracking-buffer/writable-tracking-buffer"));

var _allHeaders = require("./all-headers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  s2.2.6.8
 */
const OPERATION_TYPE = {
  TM_GET_DTC_ADDRESS: 0x00,
  TM_PROPAGATE_XACT: 0x01,
  TM_BEGIN_XACT: 0x05,
  TM_PROMOTE_XACT: 0x06,
  TM_COMMIT_XACT: 0x07,
  TM_ROLLBACK_XACT: 0x08,
  TM_SAVE_XACT: 0x09
};
exports.OPERATION_TYPE = OPERATION_TYPE;
const ISOLATION_LEVEL = {
  NO_CHANGE: 0x00,
  READ_UNCOMMITTED: 0x01,
  READ_COMMITTED: 0x02,
  REPEATABLE_READ: 0x03,
  SERIALIZABLE: 0x04,
  SNAPSHOT: 0x05
};
exports.ISOLATION_LEVEL = ISOLATION_LEVEL;
const isolationLevelByValue = {};
exports.isolationLevelByValue = isolationLevelByValue;

for (const name in ISOLATION_LEVEL) {
  const value = ISOLATION_LEVEL[name];
  isolationLevelByValue[value] = name;
}

function assertValidIsolationLevel(isolationLevel, name) {
  if (typeof isolationLevel !== 'number') {
    throw new TypeError(`The "${name}" ${name.includes('.') ? 'property' : 'argument'} must be of type number. Received type ${typeof isolationLevel} (${isolationLevel})`);
  }

  if (!Number.isInteger(isolationLevel)) {
    throw new RangeError(`The value of "${name}" is out of range. It must be an integer. Received: ${isolationLevel}`);
  }

  if (!(isolationLevel >= 0 && isolationLevel <= 5)) {
    throw new RangeError(`The value of "${name}" is out of range. It must be >= 0 && <= 5. Received: ${isolationLevel}`);
  }
}

class Transaction {
  constructor(name, isolationLevel = ISOLATION_LEVEL.NO_CHANGE) {
    this.name = void 0;
    this.isolationLevel = void 0;
    this.outstandingRequestCount = void 0;
    this.name = name;
    this.isolationLevel = isolationLevel;
    this.outstandingRequestCount = 1;
  }

  beginPayload(txnDescriptor) {
    const buffer = new _writableTrackingBuffer.default(100, 'ucs2');
    (0, _allHeaders.writeToTrackingBuffer)(buffer, txnDescriptor, this.outstandingRequestCount);
    buffer.writeUShort(OPERATION_TYPE.TM_BEGIN_XACT);
    buffer.writeUInt8(this.isolationLevel);
    buffer.writeUInt8(this.name.length * 2);
    buffer.writeString(this.name, 'ucs2');
    return {
      *[Symbol.iterator]() {
        yield buffer.data;
      },

      toString: () => {
        return 'Begin Transaction: name=' + this.name + ', isolationLevel=' + isolationLevelByValue[this.isolationLevel];
      }
    };
  }

  commitPayload(txnDescriptor) {
    const buffer = new _writableTrackingBuffer.default(100, 'ascii');
    (0, _allHeaders.writeToTrackingBuffer)(buffer, txnDescriptor, this.outstandingRequestCount);
    buffer.writeUShort(OPERATION_TYPE.TM_COMMIT_XACT);
    buffer.writeUInt8(this.name.length * 2);
    buffer.writeString(this.name, 'ucs2'); // No fBeginXact flag, so no new transaction is started.

    buffer.writeUInt8(0);
    return {
      *[Symbol.iterator]() {
        yield buffer.data;
      },

      toString: () => {
        return 'Commit Transaction: name=' + this.name;
      }
    };
  }

  rollbackPayload(txnDescriptor) {
    const buffer = new _writableTrackingBuffer.default(100, 'ascii');
    (0, _allHeaders.writeToTrackingBuffer)(buffer, txnDescriptor, this.outstandingRequestCount);
    buffer.writeUShort(OPERATION_TYPE.TM_ROLLBACK_XACT);
    buffer.writeUInt8(this.name.length * 2);
    buffer.writeString(this.name, 'ucs2'); // No fBeginXact flag, so no new transaction is started.

    buffer.writeUInt8(0);
    return {
      *[Symbol.iterator]() {
        yield buffer.data;
      },

      toString: () => {
        return 'Rollback Transaction: name=' + this.name;
      }
    };
  }

  savePayload(txnDescriptor) {
    const buffer = new _writableTrackingBuffer.default(100, 'ascii');
    (0, _allHeaders.writeToTrackingBuffer)(buffer, txnDescriptor, this.outstandingRequestCount);
    buffer.writeUShort(OPERATION_TYPE.TM_SAVE_XACT);
    buffer.writeUInt8(this.name.length * 2);
    buffer.writeString(this.name, 'ucs2');
    return {
      *[Symbol.iterator]() {
        yield buffer.data;
      },

      toString: () => {
        return 'Save Transaction: name=' + this.name;
      }
    };
  }

  isolationLevelToTSQL() {
    switch (this.isolationLevel) {
      case ISOLATION_LEVEL.READ_UNCOMMITTED:
        return 'READ UNCOMMITTED';

      case ISOLATION_LEVEL.READ_COMMITTED:
        return 'READ COMMITTED';

      case ISOLATION_LEVEL.REPEATABLE_READ:
        return 'REPEATABLE READ';

      case ISOLATION_LEVEL.SERIALIZABLE:
        return 'SERIALIZABLE';

      case ISOLATION_LEVEL.SNAPSHOT:
        return 'SNAPSHOT';
    }

    return '';
  }

}

exports.Transaction = Transaction;