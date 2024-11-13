"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

var _valueParser = _interopRequireDefault(require("../value-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// s2.2.7.17
async function rowParser(parser) {
  const colMetadata = parser.colMetadata;
  const length = colMetadata.length;
  const columns = [];

  for (let i = 0; i < length; i++) {
    const currColMetadata = colMetadata[i];
    let value;
    (0, _valueParser.default)(parser, currColMetadata, parser.options, v => {
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
    return new _token.RowToken(columnsMap);
  } else {
    return new _token.RowToken(columns);
  }
}

var _default = rowParser;
exports.default = _default;
module.exports = rowParser;