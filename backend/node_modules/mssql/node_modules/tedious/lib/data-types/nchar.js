"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NULL_LENGTH = Buffer.from([0xFF, 0xFF]);
const NChar = {
  id: 0xEF,
  type: 'NCHAR',
  name: 'NChar',
  maximumLength: 4000,
  declaration: function (parameter) {
    // const value = parameter.value as null | string | { toString(): string };
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    let length;

    if (parameter.length) {
      length = parameter.length;
    } else if (parameter.value != null) {
      length = value.toString().length || 1;
    } else if (parameter.value === null && !parameter.output) {
      length = 1;
    } else {
      length = this.maximumLength;
    }

    if (length < this.maximumLength) {
      return 'nchar(' + length + ')';
    } else {
      return 'nchar(' + this.maximumLength + ')';
    }
  },
  resolveLength: function (parameter) {
    // const value = parameter.value as null | string | { toString(): string };
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (parameter.length != null) {
      return parameter.length;
    } else if (parameter.value != null) {
      if (Buffer.isBuffer(parameter.value)) {
        return parameter.value.length / 2 || 1;
      } else {
        return value.toString().length || 1;
      }
    } else {
      return this.maximumLength;
    }
  },
  generateTypeInfo: function (parameter) {
    const buffer = Buffer.alloc(8);
    buffer.writeUInt8(this.id, 0);
    buffer.writeUInt16LE(parameter.length * 2, 1);
    return buffer;
  },

  generateParameterLength(parameter, options) {
    if (parameter.value == null) {
      return NULL_LENGTH;
    }

    const {
      value
    } = parameter;

    if (value instanceof Buffer) {
      const length = value.length;
      const buffer = Buffer.alloc(2);
      buffer.writeUInt16LE(length, 0);
      return buffer;
    } else {
      const length = Buffer.byteLength(value.toString(), 'ucs2');
      const buffer = Buffer.alloc(2);
      buffer.writeUInt16LE(length, 0);
      return buffer;
    }
  },

  *generateParameterData(parameter, options) {
    if (parameter.value == null) {
      return;
    }

    const value = parameter.value;

    if (value instanceof Buffer) {
      yield value;
    } else {
      yield Buffer.from(value, 'ucs2');
    }
  },

  validate: function (value) {
    if (value == null) {
      return null;
    }

    if (typeof value !== 'string') {
      if (typeof value.toString !== 'function') {
        throw new TypeError('Invalid string.');
      }

      value = value.toString();
    }

    return value;
  }
};
var _default = NChar;
exports.default = _default;
module.exports = NChar;