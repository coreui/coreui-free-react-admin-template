"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Text = {
  id: 0x23,
  type: 'TEXT',
  name: 'Text',
  hasTableName: true,
  declaration: function declaration() {
    return 'text';
  },
  resolveLength: function resolveLength(parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (value != null) {
      return value.length;
    } else {
      return -1;
    }
  },

  generateTypeInfo(parameter, _options) {
    const buffer = Buffer.alloc(5);
    buffer.writeUInt8(this.id, 0);
    buffer.writeInt32LE(parameter.length, 1);
    return buffer;
  },

  generateParameterData: function* generateParameterData(parameter, options) {
    yield Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00]);

    if (parameter.value != null) {
      const buffer = Buffer.alloc(4);
      buffer.writeInt32LE(parameter.length, 0);
      yield buffer;
      yield Buffer.from(parameter.value.toString(), 'ascii');
    } else {
      const buffer = Buffer.alloc(4);
      buffer.writeInt32LE(parameter.length, 0);
      yield buffer;
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
var _default = Text;
exports.default = _default;
module.exports = Text;