"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoParser = infoParser;
exports.errorParser = errorParser;

var _token = require("./token");

function parseToken(parser, options, callback) {
  // length
  parser.readUInt16LE(() => {
    parser.readUInt32LE(number => {
      parser.readUInt8(state => {
        parser.readUInt8(clazz => {
          parser.readUsVarChar(message => {
            parser.readBVarChar(serverName => {
              parser.readBVarChar(procName => {
                (options.tdsVersion < '7_2' ? parser.readUInt16LE : parser.readUInt32LE).call(parser, lineNumber => {
                  callback({
                    'number': number,
                    'state': state,
                    'class': clazz,
                    'message': message,
                    'serverName': serverName,
                    'procName': procName,
                    'lineNumber': lineNumber
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function infoParser(parser, options, callback) {
  parseToken(parser, options, data => {
    callback(new _token.InfoMessageToken(data));
  });
}

function errorParser(parser, options, callback) {
  parseToken(parser, options, data => {
    callback(new _token.ErrorMessageToken(data));
  });
}