"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _floatn = _interopRequireDefault(require("./floatn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Real = {
  id: 0x3B,
  type: 'FLT4',
  name: 'Real',
  declaration: function declaration() {
    return 'real';
  },

  generateTypeInfo() {
    return Buffer.from([_floatn.default.id, 0x04]);
  },

  *generateParameterData(parameter, options) {
    if (parameter.value != null) {
      const buffer = Buffer.alloc(5);
      let offset = 0;
      offset = buffer.writeUInt8(4, offset);
      buffer.writeFloatLE(parseFloat(parameter.value), offset);
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
var _default = Real;
exports.default = _default;
module.exports = Real;