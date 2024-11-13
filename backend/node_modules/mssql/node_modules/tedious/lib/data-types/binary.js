"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NULL_LENGTH = Buffer.from([0xFF, 0xFF]);
const Binary = {
  id: 0xAD,
  type: 'BIGBinary',
  name: 'Binary',
  maximumLength: 8000,
  declaration: function (parameter) {
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
  resolveLength: function (parameter) {
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

  generateParameterLength(parameter, options) {
    if (parameter.value == null) {
      return NULL_LENGTH;
    }

    const buffer = Buffer.alloc(2);
    buffer.writeUInt16LE(parameter.length, 0);
    return buffer;
  },

  *generateParameterData(parameter, options) {
    if (parameter.value == null) {
      return;
    }

    yield parameter.value.slice(0, parameter.length !== undefined ? Math.min(parameter.length, this.maximumLength) : this.maximumLength);
  },

  validate: function (value) {
    if (value == null) {
      return null;
    }

    if (!Buffer.isBuffer(value)) {
      throw new TypeError('Invalid buffer.');
    }

    return value;
  }
};
var _default = Binary;
exports.default = _default;
module.exports = Binary;