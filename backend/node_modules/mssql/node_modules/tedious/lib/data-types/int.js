"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _intn = _interopRequireDefault(require("./intn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NULL_LENGTH = Buffer.from([0x00]);
const DATA_LENGTH = Buffer.from([0x04]);
const Int = {
  id: 0x38,
  type: 'INT4',
  name: 'Int',
  declaration: function () {
    return 'int';
  },

  generateTypeInfo() {
    return Buffer.from([_intn.default.id, 0x04]);
  },

  generateParameterLength(parameter, options) {
    if (parameter.value == null) {
      return NULL_LENGTH;
    }

    return DATA_LENGTH;
  },

  *generateParameterData(parameter, options) {
    if (parameter.value == null) {
      return;
    }

    const buffer = Buffer.alloc(4);
    buffer.writeInt32LE(Number(parameter.value), 0);
    yield buffer;
  },

  validate: function (value) {
    if (value == null) {
      return null;
    }

    if (typeof value !== 'number') {
      value = Number(value);
    }

    if (isNaN(value)) {
      throw new TypeError('Invalid number.');
    }

    if (value < -2147483648 || value > 2147483647) {
      throw new TypeError('Value must be between -2147483648 and 2147483647, inclusive.');
    }

    return value | 0;
  }
};
var _default = Int;
exports.default = _default;
module.exports = Int;