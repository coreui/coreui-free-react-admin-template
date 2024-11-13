"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsbi = _interopRequireDefault(require("jsbi"));

var _token = require("./token");

var _colmetadataTokenParser = _interopRequireDefault(require("./colmetadata-token-parser"));

var _doneTokenParser = require("./done-token-parser");

var _envChangeTokenParser = _interopRequireDefault(require("./env-change-token-parser"));

var _infoerrorTokenParser = require("./infoerror-token-parser");

var _fedauthInfoParser = _interopRequireDefault(require("./fedauth-info-parser"));

var _featureExtAckParser = _interopRequireDefault(require("./feature-ext-ack-parser"));

var _loginackTokenParser = _interopRequireDefault(require("./loginack-token-parser"));

var _orderTokenParser = _interopRequireDefault(require("./order-token-parser"));

var _returnstatusTokenParser = _interopRequireDefault(require("./returnstatus-token-parser"));

var _returnvalueTokenParser = _interopRequireDefault(require("./returnvalue-token-parser"));

var _rowTokenParser = _interopRequireDefault(require("./row-token-parser"));

var _nbcrowTokenParser = _interopRequireDefault(require("./nbcrow-token-parser"));

var _sspiTokenParser = _interopRequireDefault(require("./sspi-token-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tokenParsers = {
  [_token.TYPE.DONE]: _doneTokenParser.doneParser,
  [_token.TYPE.DONEINPROC]: _doneTokenParser.doneInProcParser,
  [_token.TYPE.DONEPROC]: _doneTokenParser.doneProcParser,
  [_token.TYPE.ENVCHANGE]: _envChangeTokenParser.default,
  [_token.TYPE.ERROR]: _infoerrorTokenParser.errorParser,
  [_token.TYPE.FEDAUTHINFO]: _fedauthInfoParser.default,
  [_token.TYPE.FEATUREEXTACK]: _featureExtAckParser.default,
  [_token.TYPE.INFO]: _infoerrorTokenParser.infoParser,
  [_token.TYPE.LOGINACK]: _loginackTokenParser.default,
  [_token.TYPE.ORDER]: _orderTokenParser.default,
  [_token.TYPE.RETURNSTATUS]: _returnstatusTokenParser.default,
  [_token.TYPE.RETURNVALUE]: _returnvalueTokenParser.default,
  [_token.TYPE.SSPI]: _sspiTokenParser.default
};

class StreamBuffer {
  constructor(iterable) {
    this.iterator = void 0;
    this.buffer = void 0;
    this.position = void 0;
    this.iterator = (iterable[Symbol.asyncIterator] || iterable[Symbol.iterator]).call(iterable);
    this.buffer = Buffer.alloc(0);
    this.position = 0;
  }

  async waitForChunk() {
    const result = await this.iterator.next();

    if (result.done) {
      throw new Error('unexpected end of data');
    }

    if (this.position === this.buffer.length) {
      this.buffer = result.value;
    } else {
      this.buffer = Buffer.concat([this.buffer.slice(this.position), result.value]);
    }

    this.position = 0;
  }

}

class Parser {
  static async *parseTokens(iterable, debug, options, colMetadata = []) {
    let token;

    const onDoneParsing = t => {
      token = t;
    };

    const streamBuffer = new StreamBuffer(iterable);
    const parser = new Parser(streamBuffer, debug, options);
    parser.colMetadata = colMetadata;

    while (true) {
      try {
        await streamBuffer.waitForChunk();
      } catch (err) {
        if (streamBuffer.position === streamBuffer.buffer.length) {
          return;
        }

        throw err;
      }

      if (parser.suspended) {
        // Unsuspend and continue from where ever we left off.
        parser.suspended = false;
        const next = parser.next;
        next(); // Check if a new token was parsed after unsuspension.

        if (!parser.suspended && token) {
          if (token instanceof _token.ColMetadataToken) {
            parser.colMetadata = token.columns;
          }

          yield token;
        }
      }

      while (!parser.suspended && parser.position + 1 <= parser.buffer.length) {
        const type = parser.buffer.readUInt8(parser.position);
        parser.position += 1;

        if (type === _token.TYPE.COLMETADATA) {
          const token = await (0, _colmetadataTokenParser.default)(parser);
          parser.colMetadata = token.columns;
          yield token;
        } else if (type === _token.TYPE.ROW) {
          yield (0, _rowTokenParser.default)(parser);
        } else if (type === _token.TYPE.NBCROW) {
          yield (0, _nbcrowTokenParser.default)(parser);
        } else if (tokenParsers[type]) {
          tokenParsers[type](parser, parser.options, onDoneParsing); // Check if a new token was parsed after unsuspension.

          if (!parser.suspended && token) {
            if (token instanceof _token.ColMetadataToken) {
              parser.colMetadata = token.columns;
            }

            yield token;
          }
        } else {
          throw new Error('Unknown type: ' + type);
        }
      }
    }
  }

  constructor(streamBuffer, debug, options) {
    this.debug = void 0;
    this.colMetadata = void 0;
    this.options = void 0;
    this.suspended = void 0;
    this.next = void 0;
    this.streamBuffer = void 0;
    this.debug = debug;
    this.colMetadata = [];
    this.options = options;
    this.streamBuffer = streamBuffer;
    this.suspended = false;
    this.next = undefined;
  }

  get buffer() {
    return this.streamBuffer.buffer;
  }

  get position() {
    return this.streamBuffer.position;
  }

  set position(value) {
    this.streamBuffer.position = value;
  }

  suspend(next) {
    this.suspended = true;
    this.next = next;
  }

  awaitData(length, callback) {
    if (this.position + length <= this.buffer.length) {
      callback();
    } else {
      this.suspend(() => {
        this.awaitData(length, callback);
      });
    }
  }

  readInt8(callback) {
    this.awaitData(1, () => {
      const data = this.buffer.readInt8(this.position);
      this.position += 1;
      callback(data);
    });
  }

  readUInt8(callback) {
    this.awaitData(1, () => {
      const data = this.buffer.readUInt8(this.position);
      this.position += 1;
      callback(data);
    });
  }

  readInt16LE(callback) {
    this.awaitData(2, () => {
      const data = this.buffer.readInt16LE(this.position);
      this.position += 2;
      callback(data);
    });
  }

  readInt16BE(callback) {
    this.awaitData(2, () => {
      const data = this.buffer.readInt16BE(this.position);
      this.position += 2;
      callback(data);
    });
  }

  readUInt16LE(callback) {
    this.awaitData(2, () => {
      const data = this.buffer.readUInt16LE(this.position);
      this.position += 2;
      callback(data);
    });
  }

  readUInt16BE(callback) {
    this.awaitData(2, () => {
      const data = this.buffer.readUInt16BE(this.position);
      this.position += 2;
      callback(data);
    });
  }

  readInt32LE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readInt32LE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readInt32BE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readInt32BE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readUInt32LE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readUInt32LE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readUInt32BE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readUInt32BE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readBigInt64LE(callback) {
    this.awaitData(8, () => {
      const result = _jsbi.default.add(_jsbi.default.leftShift(_jsbi.default.BigInt(this.buffer[this.position + 4] + this.buffer[this.position + 5] * 2 ** 8 + this.buffer[this.position + 6] * 2 ** 16 + (this.buffer[this.position + 7] << 24) // Overflow
      ), _jsbi.default.BigInt(32)), _jsbi.default.BigInt(this.buffer[this.position] + this.buffer[this.position + 1] * 2 ** 8 + this.buffer[this.position + 2] * 2 ** 16 + this.buffer[this.position + 3] * 2 ** 24));

      this.position += 8;
      callback(result);
    });
  }

  readInt64LE(callback) {
    this.awaitData(8, () => {
      const data = Math.pow(2, 32) * this.buffer.readInt32LE(this.position + 4) + ((this.buffer[this.position + 4] & 0x80) === 0x80 ? 1 : -1) * this.buffer.readUInt32LE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readInt64BE(callback) {
    this.awaitData(8, () => {
      const data = Math.pow(2, 32) * this.buffer.readInt32BE(this.position) + ((this.buffer[this.position] & 0x80) === 0x80 ? 1 : -1) * this.buffer.readUInt32BE(this.position + 4);
      this.position += 8;
      callback(data);
    });
  }

  readBigUInt64LE(callback) {
    this.awaitData(8, () => {
      const low = _jsbi.default.BigInt(this.buffer.readUInt32LE(this.position));

      const high = _jsbi.default.BigInt(this.buffer.readUInt32LE(this.position + 4));

      this.position += 8;
      callback(_jsbi.default.add(low, _jsbi.default.leftShift(high, _jsbi.default.BigInt(32))));
    });
  }

  readUInt64LE(callback) {
    this.awaitData(8, () => {
      const data = Math.pow(2, 32) * this.buffer.readUInt32LE(this.position + 4) + this.buffer.readUInt32LE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readUInt64BE(callback) {
    this.awaitData(8, () => {
      const data = Math.pow(2, 32) * this.buffer.readUInt32BE(this.position) + this.buffer.readUInt32BE(this.position + 4);
      this.position += 8;
      callback(data);
    });
  }

  readFloatLE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readFloatLE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readFloatBE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readFloatBE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readDoubleLE(callback) {
    this.awaitData(8, () => {
      const data = this.buffer.readDoubleLE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readDoubleBE(callback) {
    this.awaitData(8, () => {
      const data = this.buffer.readDoubleBE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readUInt24LE(callback) {
    this.awaitData(3, () => {
      const low = this.buffer.readUInt16LE(this.position);
      const high = this.buffer.readUInt8(this.position + 2);
      this.position += 3;
      callback(low | high << 16);
    });
  }

  readUInt40LE(callback) {
    this.awaitData(5, () => {
      const low = this.buffer.readUInt32LE(this.position);
      const high = this.buffer.readUInt8(this.position + 4);
      this.position += 5;
      callback(0x100000000 * high + low);
    });
  }

  readUNumeric64LE(callback) {
    this.awaitData(8, () => {
      const low = this.buffer.readUInt32LE(this.position);
      const high = this.buffer.readUInt32LE(this.position + 4);
      this.position += 8;
      callback(0x100000000 * high + low);
    });
  }

  readUNumeric96LE(callback) {
    this.awaitData(12, () => {
      const dword1 = this.buffer.readUInt32LE(this.position);
      const dword2 = this.buffer.readUInt32LE(this.position + 4);
      const dword3 = this.buffer.readUInt32LE(this.position + 8);
      this.position += 12;
      callback(dword1 + 0x100000000 * dword2 + 0x100000000 * 0x100000000 * dword3);
    });
  }

  readUNumeric128LE(callback) {
    this.awaitData(16, () => {
      const dword1 = this.buffer.readUInt32LE(this.position);
      const dword2 = this.buffer.readUInt32LE(this.position + 4);
      const dword3 = this.buffer.readUInt32LE(this.position + 8);
      const dword4 = this.buffer.readUInt32LE(this.position + 12);
      this.position += 16;
      callback(dword1 + 0x100000000 * dword2 + 0x100000000 * 0x100000000 * dword3 + 0x100000000 * 0x100000000 * 0x100000000 * dword4);
    });
  } // Variable length data


  readBuffer(length, callback) {
    this.awaitData(length, () => {
      const data = this.buffer.slice(this.position, this.position + length);
      this.position += length;
      callback(data);
    });
  } // Read a Unicode String (BVARCHAR)


  readBVarChar(callback) {
    this.readUInt8(length => {
      this.readBuffer(length * 2, data => {
        callback(data.toString('ucs2'));
      });
    });
  } // Read a Unicode String (USVARCHAR)


  readUsVarChar(callback) {
    this.readUInt16LE(length => {
      this.readBuffer(length * 2, data => {
        callback(data.toString('ucs2'));
      });
    });
  } // Read binary data (BVARBYTE)


  readBVarByte(callback) {
    this.readUInt8(length => {
      this.readBuffer(length, callback);
    });
  } // Read binary data (USVARBYTE)


  readUsVarByte(callback) {
    this.readUInt16LE(length => {
      this.readBuffer(length, callback);
    });
  }

}

var _default = Parser;
exports.default = _default;
module.exports = Parser;