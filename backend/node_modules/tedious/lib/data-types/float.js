"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _floatn = _interopRequireDefault(require("./floatn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Float = {
  id: 0x3E,
  type: 'FLT8',
  name: 'Float',
  declaration: function declaration() {
    return 'float';
  },

  generateTypeInfo() {
    return Buffer.from([_floatn.default.id, 0x08]);
  },

  *generateParameterData(parameter, options) {
    if (parameter.value != null) {
      const buffer = Buffer.alloc(9);
      buffer.writeUInt8(8, 0);
      buffer.writeDoubleLE(parseFloat(parameter.value), 1);
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

    return value;
  }
};
var _default = Float;
exports.default = _default;
module.exports = Float;