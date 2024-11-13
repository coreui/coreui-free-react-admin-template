"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

var _tdsVersions = require("../tds-versions");

const interfaceTypes = {
  0: 'SQL_DFLT',
  1: 'SQL_TSQL'
};

function loginAckParser(parser, _options, callback) {
  // length
  parser.readUInt16LE(() => {
    parser.readUInt8(interfaceNumber => {
      const interfaceType = interfaceTypes[interfaceNumber];
      parser.readUInt32BE(tdsVersionNumber => {
        const tdsVersion = _tdsVersions.versionsByValue[tdsVersionNumber];
        parser.readBVarChar(progName => {
          parser.readUInt8(major => {
            parser.readUInt8(minor => {
              parser.readUInt8(buildNumHi => {
                parser.readUInt8(buildNumLow => {
                  callback(new _token.LoginAckToken({
                    interface: interfaceType,
                    tdsVersion: tdsVersion,
                    progName: progName,
                    progVersion: {
                      major: major,
                      minor: minor,
                      buildNumHi: buildNumHi,
                      buildNumLow: buildNumLow
                    }
                  }));
                });
              });
            });
          });
        });
      });
    });
  });
}

var _default = loginAckParser;
exports.default = _default;
module.exports = loginAckParser;