"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

const FEATURE_ID = {
  SESSIONRECOVERY: 0x01,
  FEDAUTH: 0x02,
  COLUMNENCRYPTION: 0x04,
  GLOBALTRANSACTIONS: 0x05,
  AZURESQLSUPPORT: 0x08,
  TERMINATOR: 0xFF
};

function featureExtAckParser(parser, _options, callback) {
  let fedAuth;

  function next() {
    parser.readUInt8(featureId => {
      if (featureId === FEATURE_ID.TERMINATOR) {
        return callback(new _token.FeatureExtAckToken(fedAuth));
      }

      parser.readUInt32LE(featureAckDataLen => {
        parser.readBuffer(featureAckDataLen, featureData => {
          if (featureId === FEATURE_ID.FEDAUTH) {
            fedAuth = featureData;
          }

          next();
        });
      });
    });
  }

  next();
}

var _default = featureExtAckParser;
exports.default = _default;
module.exports = featureExtAckParser;