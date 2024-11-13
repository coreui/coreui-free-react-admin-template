"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

var _valueParser = _interopRequireDefault(require("../value-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// s2.2.7.13 (introduced in TDS 7.3.B)
function nullHandler(_parser, _columnMetadata, _options, callback) {
  callback(null);
}

function nbcRowParser(parser, options, callback) {
  const columnsMetaData = parser.colMetadata;
  const length = Math.ceil(columnsMetaData.length / 8);
  parser.readBuffer(length, bytes => {
    const bitmap = [];

    for (let i = 0, len = bytes.length; i < len; i++) {
      const byte = bytes[i];

      for (let j = 0; j <= 7; j++) {
        bitmap.push(byte & 1 << j ? true : false);
      }
    }

    const columns = [];
    const len = columnsMetaData.length;
    let i = 0;

    function next(done) {
      if (i === len) {
        return done();
      }

      const columnMetaData = columnsMetaData[i];
      (bitmap[i] ? nullHandler : _valueParser.default)(parser, columnMetaData, options, value => {
        columns.push({
          value: value,
          metadata: columnMetaData
        });
        i++;
        next(done);
      });
    }

    next(() => {
      if (options.useColumnNames) {
        const columnsMap = {};
        columns.forEach(column => {
          const colName = column.metadata.colName;

          if (columnsMap[colName] == null) {
            columnsMap[colName] = column;
          }
        });
        callback(new _token.NBCRowToken(columnsMap));
      } else {
        callback(new _token.NBCRowToken(columns));
      }
    });
  });
}

var _default = nbcRowParser;
exports.default = _default;
module.exports = nbcRowParser;