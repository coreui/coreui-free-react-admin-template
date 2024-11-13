"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _intn = _interopRequireDefault(require("./intn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TinyInt = {
  id: 0x30,
  type: 'INT1',
  name: 'TinyInt',
  declaration: function declaration() {
    return 'tinyint';
  },

  generateTypeInfo() {
    return Buffer.from([_intn.default.id, 0x01]);
  },

  generateParameterData: function* generateParameterData(parameter, options) {
    if (parameter.value != null) {
      const buffer = Buffer.alloc(2);
      let offset = 0;
      offset = buffer.writeUInt8(1, offset);
      buffer.writeUInt8(Number(parameter.value), offset);
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

    if (value < 0 || value > 255) {
      return new TypeError('Value must be between 0 and 255, inclusive.');
    }

    return value | 0;
  }
};
var _default = TinyInt;
exports.default = _default;
module.exports = TinyInt;