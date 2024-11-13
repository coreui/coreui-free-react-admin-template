"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

var _metadataParser = _interopRequireDefault(require("../metadata-parser"));

var _valueParser = _interopRequireDefault(require("../value-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// s2.2.7.16
function returnParser(parser, options, callback) {
  parser.readUInt16LE(paramOrdinal => {
    parser.readBVarChar(paramName => {
      if (paramName.charAt(0) === '@') {
        paramName = paramName.slice(1);
      } // status


      parser.readUInt8(() => {
        (0, _metadataParser.default)(parser, options, metadata => {
          (0, _valueParser.default)(parser, metadata, options, value => {
            callback(new _token.ReturnValueToken({
              paramOrdinal: paramOrdinal,
              paramName: paramName,
              metadata: metadata,
              value: value
            }));
          });
        });
      });
    });
  });
}

var _default = returnParser;
exports.default = _default;
module.exports = returnParser;