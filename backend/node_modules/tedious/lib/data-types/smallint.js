"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _intn = _interopRequireDefault(require("./intn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SmallInt = {
  id: 0x34,
  type: 'INT2',
  name: 'SmallInt',
  declaration: function declaration() {
    return 'smallint';
  },

  generateTypeInfo() {
    return Buffer.from([_intn.default.id, 0x02]);
  },

  generateParameterData: function* generateParameterData(parameter, options) {
    if (parameter.value != null) {
      const buffer = Buffer.alloc(3);
      buffer.writeUInt8(2, 0);
      buffer.writeInt16LE(Number(parameter.value), 1);
      yield buffer;
    } else {
      yield Buffer.from([0x00]);
    }
  },
  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    if (typeof value !== 'number') {
      value = Number(value);
    }

    if (isNaN(value)) {
      return new TypeError('Invalid number.');
    }

    if (value < -32768 || value > 32767) {
      return new TypeError('Value must be between -32768 and 32767, inclusive.');
    }

    return value | 0;
  }
};
var _default = SmallInt;
exports.default = _default;
module.exports = SmallInt;