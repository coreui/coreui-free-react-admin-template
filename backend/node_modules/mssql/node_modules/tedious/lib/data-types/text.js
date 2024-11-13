"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NULL_LENGTH = Buffer.from([0xFF, 0xFF, 0xFF, 0xFF]);
const Text = {
  id: 0x23,
  type: 'TEXT',
  name: 'Text',
  hasTableName: true,
  declaration: function () {
    return 'text';
  },
  resolveLength: function (parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (value != null) {
      return value.length;
    } else {
      return -1;
    }
  },

  generateTypeInfo(parameter, _options) {
    const buffer = Buffer.alloc(10);
    buffer.writeUInt8(this.id, 0);
    buffer.writeInt32LE(parameter.length, 1); // TODO: Collation handling

    return buffer;
  },

  generateParameterLength(parameter, options) {
    if (parameter.value == null) {
      return NULL_LENGTH;
    }

    const buffer = Buffer.alloc(4);
    buffer.writeInt32LE(parameter.value.length, 0);
    return buffer;
  },

  generateParameterData: function* (parameter, options) {
    if (parameter.value == null) {
      return;
    }

    yield Buffer.from(parameter.value.toString(), 'ascii');
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
var _default = Text;
exports.default = _default;
module.exports = Text;