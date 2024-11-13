"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NULL = (1 << 16) - 1;
const Binary = {
  id: 0xAD,
  type: 'BIGBinary',
  name: 'Binary',
  maximumLength: 8000,
  declaration: function declaration(parameter) {
    const value = parameter.value;
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

    return 'binary(' + length + ')';
  },
  resolveLength: function resolveLength(parameter) {
    const value = parameter.value;

    if (value != null) {
      return value.length;
    } else {
      return this.maximumLength;
    }
  },

  generateTypeInfo(parameter) {
    const buffer = Buffer.alloc(3);
    buffer.writeUInt8(this.id, 0);
    buffer.writeUInt16LE(parameter.length, 1);
    return buffer;
  },

  *generateParameterData(parameter, options) {
    if (parameter.value != null) {
      const buffer = Buffer.alloc(2);
      buffer.writeUInt16LE(parameter.length, 0);
      yield buffer;
      const value = parameter.value.slice(0, parameter.length !== undefined ? Math.min(parameter.length, this.maximumLength) : this.maximumLength);
      yield value;
    } else {
      const buffer = Buffer.alloc(2);
      buffer.writeUInt16LE(NULL, 0);
      yield buffer;
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
var _default = Binary;
exports.default = _default;
module.exports = Binary;