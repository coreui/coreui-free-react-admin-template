"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _decimaln = _interopRequireDefault(require("./decimaln"));

var _writableTrackingBuffer = _interopRequireDefault(require("../tracking-buffer/writable-tracking-buffer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Decimal = {
  id: 0x37,
  type: 'DECIMAL',
  name: 'Decimal',
  declaration: function declaration(parameter) {
    return 'decimal(' + this.resolvePrecision(parameter) + ', ' + this.resolveScale(parameter) + ')';
  },
  resolvePrecision: function resolvePrecision(parameter) {
    if (parameter.precision != null) {
      return parameter.precision;
    } else if (parameter.value === null) {
      return 1;
    } else {
      return 18;
    }
  },
  resolveScale: function resolveScale(parameter) {
    if (parameter.scale != null) {
      return parameter.scale;
    } else {
      return 0;
    }
  },

  generateTypeInfo(parameter, _options) {
    let precision;

    if (parameter.precision <= 9) {
      precision = 0x05;
    } else if (parameter.precision <= 19) {
      precision = 0x09;
    } else if (parameter.precision <= 28) {
      precision = 0x0D;
    } else {
      precision = 0x11;
    }

    return Buffer.from([_decimaln.default.id, precision, parameter.precision, parameter.scale]);
  },

  *generateParameterData(parameter, options) {
    if (parameter.value != null) {
      const sign = parameter.value < 0 ? 0 : 1;
      const value = Math.round(Math.abs(parameter.value * Math.pow(10, parameter.scale)));

      if (parameter.precision <= 9) {
        const buffer = Buffer.alloc(6);
        let offset = 0;
        offset = buffer.writeUInt8(5, offset);
        offset = buffer.writeUInt8(sign, offset);
        buffer.writeUInt32LE(value, offset);
        yield buffer;
      } else if (parameter.precision <= 19) {
        const buffer = new _writableTrackingBuffer.default(10);
        buffer.writeUInt8(9);
        buffer.writeUInt8(sign);
        buffer.writeUInt64LE(value);
        yield buffer.data;
      } else if (parameter.precision <= 28) {
        const buffer = new _writableTrackingBuffer.default(14);
        buffer.writeUInt8(13);
        buffer.writeUInt8(sign);
        buffer.writeUInt64LE(value);
        buffer.writeUInt32LE(0x00000000);
        yield buffer.data;
      } else {
        const buffer = new _writableTrackingBuffer.default(18);
        buffer.writeUInt8(17);
        buffer.writeUInt8(sign);
        buffer.writeUInt64LE(value);
        buffer.writeUInt32LE(0x00000000);
        buffer.writeUInt32LE(0x00000000);
        yield buffer.data;
      }
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
var _default = Decimal;
exports.default = _default;
module.exports = Decimal;