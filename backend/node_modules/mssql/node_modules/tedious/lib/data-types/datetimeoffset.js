"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@js-joda/core");

var _writableTrackingBuffer = _interopRequireDefault(require("../tracking-buffer/writable-tracking-buffer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EPOCH_DATE = _core.LocalDate.ofYearDay(1, 1);

const NULL_LENGTH = Buffer.from([0x00]);
const DateTimeOffset = {
  id: 0x2B,
  type: 'DATETIMEOFFSETN',
  name: 'DateTimeOffset',
  declaration: function (parameter) {
    return 'datetimeoffset(' + this.resolveScale(parameter) + ')';
  },
  resolveScale: function (parameter) {
    if (parameter.scale != null) {
      return parameter.scale;
    } else if (parameter.value === null) {
      return 0;
    } else {
      return 7;
    }
  },

  generateTypeInfo(parameter) {
    return Buffer.from([this.id, parameter.scale]);
  },

  generateParameterLength(parameter, options) {
    if (parameter.value == null) {
      return NULL_LENGTH;
    }

    switch (parameter.scale) {
      case 0:
      case 1:
      case 2:
        return Buffer.from([0x08]);

      case 3:
      case 4:
        return Buffer.from([0x09]);

      case 5:
      case 6:
      case 7:
        return Buffer.from([0x0A]);

      default:
        throw new Error('invalid scale');
    }
  },

  *generateParameterData(parameter, options) {
    if (parameter.value == null) {
      return;
    }

    const value = parameter.value;
    let scale = parameter.scale;
    const buffer = new _writableTrackingBuffer.default(16);
    scale = scale;
    let timestamp;
    timestamp = ((value.getUTCHours() * 60 + value.getUTCMinutes()) * 60 + value.getUTCSeconds()) * 1000 + value.getMilliseconds();
    timestamp = timestamp * Math.pow(10, scale - 3);
    timestamp += (value.nanosecondDelta != null ? value.nanosecondDelta : 0) * Math.pow(10, scale);
    timestamp = Math.round(timestamp);

    switch (scale) {
      case 0:
      case 1:
      case 2:
        buffer.writeUInt24LE(timestamp);
        break;

      case 3:
      case 4:
        buffer.writeUInt32LE(timestamp);
        break;

      case 5:
      case 6:
      case 7:
        buffer.writeUInt40LE(timestamp);
    }

    const date = _core.LocalDate.of(value.getUTCFullYear(), value.getUTCMonth() + 1, value.getUTCDate());

    const days = EPOCH_DATE.until(date, _core.ChronoUnit.DAYS);
    buffer.writeUInt24LE(days);
    const offset = -value.getTimezoneOffset();
    buffer.writeInt16LE(offset);
    yield buffer.data;
  },

  validate: function (value) {
    if (value == null) {
      return null;
    }

    if (!(value instanceof Date)) {
      value = new Date(Date.parse(value));
    }

    if (isNaN(value)) {
      throw new TypeError('Invalid date.');
    }

    return value;
  }
};
var _default = DateTimeOffset;
exports.default = _default;
module.exports = DateTimeOffset;