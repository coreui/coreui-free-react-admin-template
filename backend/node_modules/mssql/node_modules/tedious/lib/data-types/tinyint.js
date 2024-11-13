"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _intn = _interopRequireDefault(require("./intn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DATA_LENGTH = Buffer.from([0x01]);
const NULL_LENGTH = Buffer.from([0x00]);
const TinyInt = {
  id: 0x30,
  type: 'INT1',
  name: 'TinyInt',
  declaration: function () {
    return 'tinyint';
  },

  generateTypeInfo() {
    return Buffer.from([_intn.default.id, 0x01]);
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

    const buffer = Buffer.alloc(1);
    buffer.writeUInt8(Number(parameter.value), 0);
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

    if (value < 0 || value > 255) {
      throw new TypeError('Value must be between 0 and 255, inclusive.');
    }

    return value | 0;
  }
};
var _default = TinyInt;
exports.default = _default;
module.exports = TinyInt;