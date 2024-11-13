"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@js-joda/core");

// globalDate is to be used for JavaScript's global 'Date' object to avoid name clashing with the 'Date' constant below
const globalDate = global.Date;

const EPOCH_DATE = _core.LocalDate.ofYearDay(1, 1);

const NULL_LENGTH = Buffer.from([0x00]);
const DATA_LENGTH = Buffer.from([0x03]);
const Date = {
  id: 0x28,
  type: 'DATEN',
  name: 'Date',
  declaration: function () {
    return 'date';
  },
  generateTypeInfo: function () {
    return Buffer.from([this.id]);
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

    const value = parameter.value; // Temporary solution. Remove 'any' later.

    let date;

    if (options.useUTC) {
      date = _core.LocalDate.of(value.getUTCFullYear(), value.getUTCMonth() + 1, value.getUTCDate());
    } else {
      date = _core.LocalDate.of(value.getFullYear(), value.getMonth() + 1, value.getDate());
    }

    const days = EPOCH_DATE.until(date, _core.ChronoUnit.DAYS);
    const buffer = Buffer.alloc(3);
    buffer.writeUIntLE(days, 0, 3);
    yield buffer;
  },

  // TODO: value is techincally of type 'unknown'.
  validate: function (value) {
    if (value == null) {
      return null;
    }

    if (!(value instanceof globalDate)) {
      value = new globalDate(globalDate.parse(value));
    }

    if (isNaN(value)) {
      throw new TypeError('Invalid date.');
    }

    return value;
  }
};
var _default = Date;
exports.default = _default;
module.exports = Date;