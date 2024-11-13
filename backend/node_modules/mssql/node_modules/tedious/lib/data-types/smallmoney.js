"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moneyn = _interopRequireDefault(require("./moneyn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DATA_LENGTH = Buffer.from([0x04]);
const NULL_LENGTH = Buffer.from([0x00]);
const SmallMoney = {
  id: 0x7A,
  type: 'MONEY4',
  name: 'SmallMoney',
  declaration: function () {
    return 'smallmoney';
  },
  generateTypeInfo: function () {
    return Buffer.from([_moneyn.default.id, 0x04]);
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
    buffer.writeInt32LE(parameter.value * 10000, 0);
    yield buffer;
  },

  validate: function (value) {
    if (value == null) {
      return null;
    }

    value = parseFloat(value);

    if (isNaN(value)) {
      throw new TypeError('Invalid number.');
    }

    if (value < -214748.3648 || value > 214748.3647) {
      throw new TypeError('Value must be between -214748.3648 and 214748.3647.');
    }

    return value;
  }
};
var _default = SmallMoney;
exports.default = _default;
module.exports = SmallMoney;