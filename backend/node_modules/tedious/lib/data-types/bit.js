"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bitn = _interopRequireDefault(require("./bitn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Bit = {
  id: 0x32,
  type: 'BIT',
  name: 'Bit',
  declaration: function declaration() {
    return 'bit';
  },

  generateTypeInfo() {
    return Buffer.from([_bitn.default.id, 0x01]);
  },

  *generateParameterData(parameter, options) {
    if (typeof parameter.value === 'undefined' || parameter.value === null) {
      const buffer = Buffer.alloc(1);
      buffer.writeUInt8(0, 0);
      yield buffer;
    } else {
      const buffer = Buffer.alloc(2);
      buffer.writeUInt8(1, 0);
      buffer.writeUInt8(parameter.value ? 1 : 0, 1);
      yield buffer;
    }
  },

  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    if (value) {
      return true;
    } else {
      return false;
    }
  }
};
var _default = Bit;
exports.default = _default;
module.exports = Bit;