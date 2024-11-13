"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moneyn = _interopRequireDefault(require("./moneyn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
const SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
const Money = {
  id: 0x3C,
  type: 'MONEY',
  name: 'Money',
  declaration: function declaration() {
    return 'money';
  },
  generateTypeInfo: function generateTypeInfo() {
    return Buffer.from([_moneyn.default.id, 0x08]);
  },

  *generateParameterData(parameter, options) {
    if (parameter.value != null) {
      const buffer = Buffer.alloc(1);
      buffer.writeUInt8(8, 0);
      yield buffer;
      const value = parameter.value * 10000;
      const buffer2 = Buffer.alloc(4);
      buffer2.writeInt32LE(Math.floor(value * SHIFT_RIGHT_32), 0);
      yield buffer2;
      const buffer3 = Buffer.alloc(4);
      buffer3.writeInt32LE(value & -1, 0);
      yield buffer3;
    } else {
      yield Buffer.from([0x00]);
    }
  },

  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    value = parseFloat(value);

    if (isNaN(value)) {
      return new TypeError('Invalid number.');
    }

    return value;
  }
};
var _default = Money;
exports.default = _default;
module.exports = Money;