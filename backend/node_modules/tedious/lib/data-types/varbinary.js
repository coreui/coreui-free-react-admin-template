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
const VarBinary = {
  id: 0xA5,
  type: 'BIGVARBIN',
  name: 'VarBinary',
  maximumLength: 8000,
  declaration: function declaration(parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    let length;

    if (parameter.length) {
      length = parameter.length;
    } else if (value != null) {
      length = value.length || 1;
    } else if (value === null && !parameter.output) {
      length = 1;
    } else {
      length = this.maximumLength;
    }

    if (length <= this.maximumLength) {
      return 'varbinary(' + length + ')';
    } else {
      return 'varbinary(max)';
    }
  },
  resolveLength: function resolveLength(parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (parameter.length != null) {
      return parameter.length;
    } else if (value != null) {
      return value.length;
    } else {
      return this.maximumLength;
    }
  },
  generateTypeInfo: function generateTypeInfo(parameter) {
    const buffer = Buffer.alloc(3);
    buffer.writeUInt8(this.id, 0);

    if (parameter.length <= this.maximumLength) {
      buffer.writeUInt16LE(this.maximumLength, 1);
    } else {
      buffer.writeUInt16LE(MAX, 1);
    }

    return buffer;
  },

  *generateParameterData(parameter, options) {
    let value = parameter.value;

    if (value != null) {
      if (!Buffer.isBuffer(value)) {
        value = value.toString();
      }

      const length = Buffer.byteLength(value, 'ucs2');

      if (parameter.length <= this.maximumLength) {
        const buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(length, 0);
        yield buffer;

        if (Buffer.isBuffer(value)) {
          yield value;
        } else {
          yield Buffer.from(value, 'ucs2');
        }
      } else {
        // writePLPBody
        yield UNKNOWN_PLP_LEN;

        if (length > 0) {
          const buffer = Buffer.alloc(4);
          buffer.writeUInt32LE(length, 0);
          yield buffer;

          if (Buffer.isBuffer(value)) {
            yield value;
          } else {
            yield Buffer.from(value, 'ucs2');
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

    if (!Buffer.isBuffer(value)) {
      return new TypeError('Invalid buffer.');
    }

    return value;
  }
};
var _default = VarBinary;
exports.default = _default;
module.exports = VarBinary;