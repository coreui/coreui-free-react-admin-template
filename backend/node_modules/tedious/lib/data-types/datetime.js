"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _datetimen = _interopRequireDefault(require("./datetimen"));

var _core = require("@js-joda/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EPOCH_DATE = _core.LocalDate.ofYearDay(1900, 1);

const DateTime = {
  id: 0x3D,
  type: 'DATETIME',
  name: 'DateTime',
  declaration: function declaration() {
    return 'datetime';
  },

  generateTypeInfo() {
    return Buffer.from([_datetimen.default.id, 0x08]);
  },

  generateParameterData: function* generateParameterData(parameter, options) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (value != null) {
      let date;

      if (options.useUTC) {
        date = _core.LocalDate.of(value.getUTCFullYear(), value.getUTCMonth() + 1, value.getUTCDate());
      } else {
        date = _core.LocalDate.of(value.getFullYear(), value.getMonth() + 1, value.getDate());
      }

      let days = EPOCH_DATE.until(date, _core.ChronoUnit.DAYS);
      let milliseconds, threeHundredthsOfSecond;

      if (options.useUTC) {
        let seconds = value.getUTCHours() * 60 * 60;
        seconds += value.getUTCMinutes() * 60;
        seconds += value.getUTCSeconds();
        milliseconds = seconds * 1000 + value.getUTCMilliseconds();
      } else {
        let seconds = value.getHours() * 60 * 60;
        seconds += value.getMinutes() * 60;
        seconds += value.getSeconds();
        milliseconds = seconds * 1000 + value.getMilliseconds();
      }

      threeHundredthsOfSecond = milliseconds / (3 + 1 / 3);
      threeHundredthsOfSecond = Math.round(threeHundredthsOfSecond); // 25920000 equals one day

      if (threeHundredthsOfSecond === 25920000) {
        days += 1;
        threeHundredthsOfSecond = 0;
      }

      const buffer = Buffer.alloc(9);
      buffer.writeUInt8(8, 0);
      buffer.writeInt32LE(days, 1);
      buffer.writeUInt32LE(threeHundredthsOfSecond, 5);
      yield buffer;
    } else {
      yield Buffer.from([0x00]);
    }
  },
  // TODO: type 'any' needs to be revisited.
  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    if (!(value instanceof Date)) {
      value = new Date(Date.parse(value));
    }

    if (isNaN(value)) {
      return new TypeError('Invalid date.');
    }

    return value;
  }
};
var _default = DateTime;
exports.default = _default;
module.exports = DateTime;