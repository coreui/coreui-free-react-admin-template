"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _floatn = _interopRequireDefault(require("./floatn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NULL_LENGTH = Buffer.from([0x00]);
const Float = {
  id: 0x3E,
  type: 'FLT8',
  name: 'Float',
  declaration: function () {
    return 'float';
  },

  generateTypeInfo() {
    return Buffer.from([_floatn.default.id, 0x08]);
  },

  generateParameterLength(parameter, options) {
    if (parameter.value == null) {
      return NULL_LENGTH;
    }

    return Buffer.from([0x08]);
  },

  *generateParameterData(parameter, options) {
    if (parameter.value == null) {
      return;
    }

    const buffer = Buffer.alloc(8);
    buffer.writeDoubleLE(parseFloat(parameter.value), 0);
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
var _default = Float;
exports.default = _default;
module.exports = Float;