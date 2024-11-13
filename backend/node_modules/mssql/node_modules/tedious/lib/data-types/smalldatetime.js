"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _datetimen = _interopRequireDefault(require("./datetimen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EPOCH_DATE = new Date(1900, 0, 1);
const UTC_EPOCH_DATE = new Date(Date.UTC(1900, 0, 1));
const DATA_LENGTH = Buffer.from([0x04]);
const NULL_LENGTH = Buffer.from([0x00]);
const SmallDateTime = {
  id: 0x3A,
  type: 'DATETIM4',
  name: 'SmallDateTime',
  declaration: function () {
    return 'smalldatetime';
  },

  generateTypeInfo() {
    return Buffer.from([_datetimen.default.id, 0x04]);
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

    const buffer = Buffer.alloc(4);
    let days, dstDiff, minutes;

    if (options.useUTC) {
      days = Math.floor((parameter.value.getTime() - UTC_EPOCH_DATE.getTime()) / (1000 * 60 * 60 * 24));
      minutes = parameter.value.getUTCHours() * 60 + parameter.value.getUTCMinutes();
    } else {
      dstDiff = -(parameter.value.getTimezoneOffset() - EPOCH_DATE.getTimezoneOffset()) * 60 * 1000;
      days = Math.floor((parameter.value.getTime() - EPOCH_DATE.getTime() + dstDiff) / (1000 * 60 * 60 * 24));
      minutes = parameter.value.getHours() * 60 + parameter.value.getMinutes();
    }

    buffer.writeUInt16LE(days, 0);
    buffer.writeUInt16LE(minutes, 2);
    yield buffer;
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
var _default = SmallDateTime;
exports.default = _default;
module.exports = SmallDateTime;