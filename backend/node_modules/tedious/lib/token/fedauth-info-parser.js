"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

const FEDAUTHINFOID = {
  STSURL: 0x01,
  SPN: 0x02
};

function fedAuthInfoParser(parser, _options, callback) {
  parser.readUInt32LE(tokenLength => {
    parser.readBuffer(tokenLength, data => {
      let spn, stsurl;
      let offset = 0;
      const countOfInfoIDs = data.readUInt32LE(offset);
      offset += 4;

      for (let i = 0; i < countOfInfoIDs; i++) {
        const fedauthInfoID = data.readUInt8(offset);
        offset += 1;
        const fedAuthInfoDataLen = data.readUInt32LE(offset);
        offset += 4;
        const fedAuthInfoDataOffset = data.readUInt32LE(offset);
        offset += 4;

        switch (fedauthInfoID) {
          case FEDAUTHINFOID.SPN:
            spn = data.toString('ucs2', fedAuthInfoDataOffset, fedAuthInfoDataOffset + fedAuthInfoDataLen);
            break;

          case FEDAUTHINFOID.STSURL:
            stsurl = data.toString('ucs2', fedAuthInfoDataOffset, fedAuthInfoDataOffset + fedAuthInfoDataLen);
            break;
          // ignoring unknown fedauthinfo options

          default:
            break;
        }
      }

      callback(new _token.FedAuthInfoToken(spn, stsurl));
    });
  });
}

var _default = fedAuthInfoParser;
exports.default = _default;
module.exports = fedAuthInfoParser;