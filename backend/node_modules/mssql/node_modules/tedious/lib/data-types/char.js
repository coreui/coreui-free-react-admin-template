"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NULL_LENGTH = Buffer.from([0xFF, 0xFF]);
const Char = {
  id: 0xAF,
  type: 'BIGCHAR',
  name: 'Char',
  maximumLength: 8000,
  declaration: function (parameter) {
    // const value = parameter.value as null | string | { toString(): string };
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

    if (length < this.maximumLength) {
      return 'char(' + length + ')';
    } else {
      return 'char(' + this.maximumLength + ')';
    }
  },
  // ParameterData<any> is temporary solution. TODO: need to understand what type ParameterData<...> can be.
  resolveLength: function (parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (parameter.length != null) {
      return parameter.length;
    } else if (value != null) {
      if (Buffer.isBuffer(value)) {
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
    buffer.writeUInt16LE(parameter.length, 1);
    return buffer;
  },

  generateParameterLength(parameter, options) {
    if (parameter.value == null) {
      return NULL_LENGTH;
    }

    const length = Buffer.byteLength(parameter.value.toString(), 'ascii');
    const buffer = Buffer.alloc(2);
    buffer.writeUInt16LE(length, 0);
    return buffer;
  },

  *generateParameterData(parameter, options) {
    if (parameter.value == null) {
      return;
    }

    yield Buffer.from(parameter.value, 'ascii');
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
var _default = Char;
exports.default = _default;
module.exports = Char;