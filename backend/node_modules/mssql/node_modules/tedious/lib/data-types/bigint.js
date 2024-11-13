"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _intn = _interopRequireDefault(require("./intn"));

var _writableTrackingBuffer = _interopRequireDefault(require("../tracking-buffer/writable-tracking-buffer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DATA_LENGTH = Buffer.from([0x08]);
const NULL_LENGTH = Buffer.from([0x00]);
const BigInt = {
  id: 0x7F,
  type: 'INT8',
  name: 'BigInt',
  declaration: function () {
    return 'bigint';
  },

  generateTypeInfo() {
    return Buffer.from([_intn.default.id, 0x08]);
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

    const buffer = new _writableTrackingBuffer.default(8);
    buffer.writeInt64LE(Number(parameter.value));
    yield buffer.data;
  },

  validate: function (value) {
    if (value == null) {
      return null;
    }

    if (typeof value !== 'number') {
      value = Number(value);
    }

    if (isNaN(value)) {
      throw new TypeError('Invalid number.');
    }

    if (value < Number.MIN_SAFE_INTEGER || value > Number.MAX_SAFE_INTEGER) {
      throw new TypeError(`Value must be between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}, inclusive.  For smaller or bigger numbers, use VarChar type.`);
    }

    return value;
  }
};
var _default = BigInt;
exports.default = _default;
module.exports = BigInt;