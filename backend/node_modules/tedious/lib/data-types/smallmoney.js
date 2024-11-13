"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moneyn = _interopRequireDefault(require("./moneyn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SmallMoney = {
  id: 0x7A,
  type: 'MONEY4',
  name: 'SmallMoney',
  declaration: function declaration() {
    return 'smallmoney';
  },
  generateTypeInfo: function generateTypeInfo() {
    return Buffer.from([_moneyn.default.id, 0x04]);
  },
  generateParameterData: function* generateParameterData(parameter) {
    if (parameter.value != null) {
      const buffer = Buffer.alloc(5);
      buffer.writeUInt8(4, 0);
      buffer.writeInt32LE(parameter.value * 10000, 1);
      yield buffer;
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

    if (value < -214748.3648 || value > 214748.3647) {
      return new TypeError('Value must be between -214748.3648 and 214748.3647.');
    }

    return value;
  }
};
var _default = SmallMoney;
exports.default = _default;
module.exports = SmallMoney;