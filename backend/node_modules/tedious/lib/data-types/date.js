"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@js-joda/core");

var _writableTrackingBuffer = _interopRequireDefault(require("../tracking-buffer/writable-tracking-buffer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// globalDate is to be used for JavaScript's global 'Date' object to avoid name clashing with the 'Date' constant below
const globalDate = global.Date;

const EPOCH_DATE = _core.LocalDate.ofYearDay(1, 1);

const Date = {
  id: 0x28,
  type: 'DATEN',
  name: 'Date',
  declaration: function declaration() {
    return 'date';
  },
  generateTypeInfo: function generateTypeInfo(buffer) {
    return Buffer.from([this.id]);
  },

  *generateParameterData(parameter, options) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (value != null) {
      const buffer = new _writableTrackingBuffer.default(16);
      buffer.writeUInt8(3);
      let date;

      if (options.useUTC) {
        date = _core.LocalDate.of(value.getUTCFullYear(), value.getUTCMonth() + 1, value.getUTCDate());
      } else {
        date = _core.LocalDate.of(value.getFullYear(), value.getMonth() + 1, value.getDate());
      }

      const days = EPOCH_DATE.until(date, _core.ChronoUnit.DAYS);
      buffer.writeUInt24LE(days);
      yield buffer.data;
    } else {
      yield Buffer.from([0x00]);
    }
  },

  // TODO: value is techincally of type 'unknown'.
  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    if (!(value instanceof globalDate)) {
      value = new globalDate(globalDate.parse(value));
    }

    if (isNaN(value)) {
      return new TypeError('Invalid date.');
    }

    return value;
  }
};
var _default = Date;
exports.default = _default;
module.exports = Date;