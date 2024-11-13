"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bitn = _interopRequireDefault(require("./bitn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DATA_LENGTH = Buffer.from([0x01]);
const NULL_LENGTH = Buffer.from([0x00]);
const Bit = {
  id: 0x32,
  type: 'BIT',
  name: 'Bit',
  declaration: function () {
    return 'bit';
  },

  generateTypeInfo() {
    return Buffer.from([_bitn.default.id, 0x01]);
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

    yield parameter.value ? Buffer.from([0x01]) : Buffer.from([0x00]);
  },

  validate: function (value) {
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