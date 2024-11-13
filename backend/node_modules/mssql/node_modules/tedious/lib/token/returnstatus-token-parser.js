"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

// s2.2.7.16
function returnStatusParser(parser, _options, callback) {
  parser.readInt32LE(value => {
    callback(new _token.ReturnStatusToken(value));
  });
}

var _default = returnStatusParser;
exports.default = _default;
module.exports = returnStatusParser;