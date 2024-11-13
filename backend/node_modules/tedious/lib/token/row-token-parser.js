"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

var _valueParser = _interopRequireDefault(require("../value-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// s2.2.7.17
function rowParser(parser, options, callback) {
  const colMetadata = parser.colMetadata;
  const columns = [];
  const len = colMetadata.length;
  let i = 0;

  function next(done) {
    if (i === len) {
      return done();
    }

    const columnMetaData = colMetadata[i];
    (0, _valueParser.default)(parser, columnMetaData, options, value => {
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
      callback(new _token.RowToken(columnsMap));
    } else {
      callback(new _token.RowToken(columns));
    }
  });
}

var _default = rowParser;
exports.default = _default;
module.exports = rowParser;