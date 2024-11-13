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

async function nbcRowParser(parser) {
  const colMetadata = parser.colMetadata;
  const bitmapByteLength = Math.ceil(colMetadata.length / 8);
  const columns = [];
  const bitmap = [];

  while (parser.buffer.length - parser.position < bitmapByteLength) {
    await parser.streamBuffer.waitForChunk();
  }

  const bytes = parser.buffer.slice(parser.position, parser.position + bitmapByteLength);
  parser.position += bitmapByteLength;

  for (let i = 0, len = bytes.length; i < len; i++) {
    const byte = bytes[i];
    bitmap.push(byte & 0b1 ? true : false);
    bitmap.push(byte & 0b10 ? true : false);
    bitmap.push(byte & 0b100 ? true : false);
    bitmap.push(byte & 0b1000 ? true : false);
    bitmap.push(byte & 0b10000 ? true : false);
    bitmap.push(byte & 0b100000 ? true : false);
    bitmap.push(byte & 0b1000000 ? true : false);
    bitmap.push(byte & 0b10000000 ? true : false);
  }

  for (let i = 0; i < colMetadata.length; i++) {
    const currColMetadata = colMetadata[i];
    let value;
    (bitmap[i] ? nullHandler : _valueParser.default)(parser, currColMetadata, parser.options, v => {
      value = v;
    });

    while (parser.suspended) {
      await parser.streamBuffer.waitForChunk();
      parser.suspended = false;
      const next = parser.next;
      next();
    }

    columns.push({
      value,
      metadata: currColMetadata
    });
  }

  if (parser.options.useColumnNames) {
    const columnsMap = {};
    columns.forEach(column => {
      const colName = column.metadata.colName;

      if (columnsMap[colName] == null) {
        columnsMap[colName] = column;
      }
    });
    return new _token.NBCRowToken(columnsMap);
  } else {
    return new _token.NBCRowToken(columns);
  }
}

var _default = nbcRowParser;
exports.default = _default;
module.exports = nbcRowParser;