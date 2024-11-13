"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doneParser = doneParser;
exports.doneInProcParser = doneInProcParser;
exports.doneProcParser = doneProcParser;

var _jsbi = _interopRequireDefault(require("jsbi"));

var _token = require("./token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// s2.2.7.5/6/7
const STATUS = {
  MORE: 0x0001,
  ERROR: 0x0002,
  // This bit is not yet in use by SQL Server, so is not exposed in the returned token
  INXACT: 0x0004,
  COUNT: 0x0010,
  ATTN: 0x0020,
  SRVERROR: 0x0100
};

function parseToken(parser, options, callback) {
  parser.readUInt16LE(status => {
    const more = !!(status & STATUS.MORE);
    const sqlError = !!(status & STATUS.ERROR);
    const rowCountValid = !!(status & STATUS.COUNT);
    const attention = !!(status & STATUS.ATTN);
    const serverError = !!(status & STATUS.SRVERROR);
    parser.readUInt16LE(curCmd => {
      const next = rowCount => {
        callback({
          more: more,
          sqlError: sqlError,
          attention: attention,
          serverError: serverError,
          rowCount: rowCountValid ? rowCount : undefined,
          curCmd: curCmd
        });
      };

      if (options.tdsVersion < '7_2') {
        parser.readUInt32LE(next);
      } else {
        parser.readBigUInt64LE(rowCount => {
          next(_jsbi.default.toNumber(rowCount));
        });
      }
    });
  });
}

function doneParser(parser, options, callback) {
  parseToken(parser, options, data => {
    callback(new _token.DoneToken(data));
  });
}

function doneInProcParser(parser, options, callback) {
  parseToken(parser, options, data => {
    callback(new _token.DoneInProcToken(data));
  });
}

function doneProcParser(parser, options, callback) {
  parseToken(parser, options, data => {
    callback(new _token.DoneProcToken(data));
  });
}