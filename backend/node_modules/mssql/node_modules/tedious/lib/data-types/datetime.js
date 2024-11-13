"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _datetimen = _interopRequireDefault(require("./datetimen"));

var _core = require("@js-joda/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EPOCH_DATE = _core.LocalDate.ofYearDay(1900, 1);

const NULL_LENGTH = Buffer.from([0x00]);
const DATA_LENGTH = Buffer.from([0x08]);
const DateTime = {
  id: 0x3D,
  type: 'DATETIME',
  name: 'DateTime',
  declaration: function () {
    return 'datetime';
  },

  generateTypeInfo() {
    return Buffer.from([_datetimen.default.id, 0x08]);
  },

  generateParameterLength(parameter, options) {
    if (parameter.value == null) {
      return NULL_LENGTH;
    }

    return DATA_LENGTH;
  },

  generateParameterData: function* (parameter, options) {
    if (parameter.value == null) {
      return;
    }

    const value = parameter.value; // Temporary solution. Remove 'any' later.

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

    const buffer = Buffer.alloc(8);
    buffer.writeInt32LE(days, 0);
    buffer.writeUInt32LE(threeHundredthsOfSecond, 4);
    yield buffer;
  },
  // TODO: type 'any' needs to be revisited.
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
var _default = DateTime;
exports.default = _default;
module.exports = DateTime;