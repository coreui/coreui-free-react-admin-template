"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _floatn = _interopRequireDefault(require("./floatn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NULL_LENGTH = Buffer.from([0x00]);
const DATA_LENGTH = Buffer.from([0x04]);
const Real = {
  id: 0x3B,
  type: 'FLT4',
  name: 'Real',
  declaration: function () {
    return 'real';
  },

  generateTypeInfo() {
    return Buffer.from([_floatn.default.id, 0x04]);
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
    buffer.writeFloatLE(parseFloat(parameter.value), 0);
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

    return value;
  }
};
var _default = Real;
exports.default = _default;
module.exports = Real;