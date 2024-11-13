"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

// s2.2.7.14
function orderParser(parser, _options, callback) {
  parser.readUInt16LE(length => {
    const columnCount = length / 2;
    const orderColumns = [];
    let i = 0;

    function next(done) {
      if (i === columnCount) {
        return done();
      }

      parser.readUInt16LE(column => {
        orderColumns.push(column);
        i++;
        next(done);
      });
    }

    next(() => {
      callback(new _token.OrderToken(orderColumns));
    });
  });
}

var _default = orderParser;
exports.default = _default;
module.exports = orderParser;