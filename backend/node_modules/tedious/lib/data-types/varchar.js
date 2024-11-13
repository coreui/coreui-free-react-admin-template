"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _writableTrackingBuffer = _interopRequireDefault(require("../tracking-buffer/writable-tracking-buffer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NULL = (1 << 16) - 1;
const MAX = (1 << 16) - 1;
const UNKNOWN_PLP_LEN = Buffer.from([0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
const PLP_TERMINATOR = Buffer.from([0x00, 0x00, 0x00, 0x00]);
const VarChar = {
  id: 0xA7,
  type: 'BIGVARCHR',
  name: 'VarChar',
  maximumLength: 8000,
  declaration: function declaration(parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    let length;

    if (parameter.length) {
      length = parameter.length;
    } else if (value != null) {
      length = value.toString().length || 1;
    } else if (value === null && !parameter.output) {
      length = 1;
    } else {
      length = this.maximumLength;
    }

    if (length <= this.maximumLength) {
      return 'varchar(' + length + ')';
    } else {
      return 'varchar(max)';
    }
  },
  resolveLength: function resolveLength(parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (parameter.length != null) {
      return parameter.length;
    } else if (value != null) {
      if (Buffer.isBuffer(parameter.value)) {
        return value.length || 1;
      } else {
        return value.toString().length || 1;
      }
    } else {
      return this.maximumLength;
    }
  },

  generateTypeInfo(parameter) {
    const buffer = Buffer.alloc(8);
    buffer.writeUInt8(this.id, 0);

    if (parameter.length <= this.maximumLength) {
      buffer.writeUInt16LE(this.maximumLength, 1);
    } else {
      buffer.writeUInt16LE(MAX, 1);
    }

    return buffer;
  },

  *generateParameterData(parameter, options) {
    if (parameter.value != null) {
      let value = parameter.value;
      const length = Buffer.byteLength(value, 'ascii');

      if (!Buffer.isBuffer(value)) {
        value = value.toString();
      }

      if (parameter.length <= this.maximumLength) {
        const buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(length, 0);
        yield buffer;

        if (Buffer.isBuffer(value)) {
          yield value;
        } else {
          yield Buffer.from(value, 'ascii');
        }
      } else {
        yield UNKNOWN_PLP_LEN;

        if (length > 0) {
          const buffer = Buffer.alloc(4);
          buffer.writeUInt32LE(length, 0);
          yield buffer;

          if (Buffer.isBuffer(value)) {
            yield value;
          } else {
            yield Buffer.from(value, 'ascii');
          }
        }

        yield PLP_TERMINATOR;
      }
    } else if (parameter.length <= this.maximumLength) {
      const buffer = new _writableTrackingBuffer.default(2);
      buffer.writeUInt16LE(NULL);
      yield buffer.data;
    } else {
      const buffer = new _writableTrackingBuffer.default(8);
      buffer.writeUInt32LE(0xFFFFFFFF);
      buffer.writeUInt32LE(0xFFFFFFFF);
      yield buffer.data;
    }
  },

  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    if (typeof value !== 'string') {
      if (typeof value.toString !== 'function') {
        return TypeError('Invalid string.');
      }

      value = value.toString();
    }

    return value;
  }
};
var _default = VarChar;
exports.default = _default;
module.exports = VarChar;