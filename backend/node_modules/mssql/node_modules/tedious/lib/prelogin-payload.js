"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sprintfJs = require("sprintf-js");

var _writableTrackingBuffer = _interopRequireDefault(require("./tracking-buffer/writable-tracking-buffer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const optionBufferSize = 20;
const TOKEN = {
  VERSION: 0x00,
  ENCRYPTION: 0x01,
  INSTOPT: 0x02,
  THREADID: 0x03,
  MARS: 0x04,
  FEDAUTHREQUIRED: 0x06,
  TERMINATOR: 0xFF
};
const ENCRYPT = {
  OFF: 0x00,
  ON: 0x01,
  NOT_SUP: 0x02,
  REQ: 0x03
};
const encryptByValue = {};

for (const name in ENCRYPT) {
  const value = ENCRYPT[name];
  encryptByValue[value] = name;
}

const MARS = {
  OFF: 0x00,
  ON: 0x01
};
const marsByValue = {};

for (const name in MARS) {
  const value = MARS[name];
  marsByValue[value] = name;
}

/*
  s2.2.6.4
 */
class PreloginPayload {
  constructor(bufferOrOptions = {
    encrypt: false,
    version: {
      major: 0,
      minor: 0,
      build: 0,
      subbuild: 0
    }
  }) {
    this.data = void 0;
    this.options = void 0;
    this.version = void 0;
    this.encryption = void 0;
    this.encryptionString = void 0;
    this.instance = void 0;
    this.threadId = void 0;
    this.mars = void 0;
    this.marsString = void 0;
    this.fedAuthRequired = void 0;

    if (bufferOrOptions instanceof Buffer) {
      this.data = bufferOrOptions;
      this.options = {
        encrypt: false,
        version: {
          major: 0,
          minor: 0,
          build: 0,
          subbuild: 0
        }
      };
    } else {
      this.options = bufferOrOptions;
      this.createOptions();
    }

    this.extractOptions();
  }

  createOptions() {
    const options = [this.createVersionOption(), this.createEncryptionOption(), this.createInstanceOption(), this.createThreadIdOption(), this.createMarsOption(), this.createFedAuthOption()];
    let length = 0;

    for (let i = 0, len = options.length; i < len; i++) {
      const option = options[i];
      length += 5 + option.data.length;
    }

    length++; // terminator

    this.data = Buffer.alloc(length, 0);
    let optionOffset = 0;
    let optionDataOffset = 5 * options.length + 1;

    for (let j = 0, len = options.length; j < len; j++) {
      const option = options[j];
      this.data.writeUInt8(option.token, optionOffset + 0);
      this.data.writeUInt16BE(optionDataOffset, optionOffset + 1);
      this.data.writeUInt16BE(option.data.length, optionOffset + 3);
      optionOffset += 5;
      option.data.copy(this.data, optionDataOffset);
      optionDataOffset += option.data.length;
    }

    this.data.writeUInt8(TOKEN.TERMINATOR, optionOffset);
  }

  createVersionOption() {
    const buffer = new _writableTrackingBuffer.default(optionBufferSize);
    buffer.writeUInt8(this.options.version.major);
    buffer.writeUInt8(this.options.version.minor);
    buffer.writeUInt16BE(this.options.version.build);
    buffer.writeUInt16BE(this.options.version.subbuild);
    return {
      token: TOKEN.VERSION,
      data: buffer.data
    };
  }

  createEncryptionOption() {
    const buffer = new _writableTrackingBuffer.default(optionBufferSize);

    if (this.options.encrypt) {
      buffer.writeUInt8(ENCRYPT.ON);
    } else {
      buffer.writeUInt8(ENCRYPT.NOT_SUP);
    }

    return {
      token: TOKEN.ENCRYPTION,
      data: buffer.data
    };
  }

  createInstanceOption() {
    const buffer = new _writableTrackingBuffer.default(optionBufferSize);
    buffer.writeUInt8(0x00);
    return {
      token: TOKEN.INSTOPT,
      data: buffer.data
    };
  }

  createThreadIdOption() {
    const buffer = new _writableTrackingBuffer.default(optionBufferSize);
    buffer.writeUInt32BE(0x00);
    return {
      token: TOKEN.THREADID,
      data: buffer.data
    };
  }

  createMarsOption() {
    const buffer = new _writableTrackingBuffer.default(optionBufferSize);
    buffer.writeUInt8(MARS.OFF);
    return {
      token: TOKEN.MARS,
      data: buffer.data
    };
  }

  createFedAuthOption() {
    const buffer = new _writableTrackingBuffer.default(optionBufferSize);
    buffer.writeUInt8(0x01);
    return {
      token: TOKEN.FEDAUTHREQUIRED,
      data: buffer.data
    };
  }

  extractOptions() {
    let offset = 0;

    while (this.data[offset] !== TOKEN.TERMINATOR) {
      let dataOffset = this.data.readUInt16BE(offset + 1);
      const dataLength = this.data.readUInt16BE(offset + 3);

      switch (this.data[offset]) {
        case TOKEN.VERSION:
          this.extractVersion(dataOffset);
          break;

        case TOKEN.ENCRYPTION:
          this.extractEncryption(dataOffset);
          break;

        case TOKEN.INSTOPT:
          this.extractInstance(dataOffset);
          break;

        case TOKEN.THREADID:
          if (dataLength > 0) {
            this.extractThreadId(dataOffset);
          }

          break;

        case TOKEN.MARS:
          this.extractMars(dataOffset);
          break;

        case TOKEN.FEDAUTHREQUIRED:
          this.extractFedAuth(dataOffset);
          break;
      }

      offset += 5;
      dataOffset += dataLength;
    }
  }

  extractVersion(offset) {
    this.version = {
      major: this.data.readUInt8(offset + 0),
      minor: this.data.readUInt8(offset + 1),
      build: this.data.readUInt16BE(offset + 2),
      subbuild: this.data.readUInt16BE(offset + 4)
    };
  }

  extractEncryption(offset) {
    this.encryption = this.data.readUInt8(offset);
    this.encryptionString = encryptByValue[this.encryption];
  }

  extractInstance(offset) {
    this.instance = this.data.readUInt8(offset);
  }

  extractThreadId(offset) {
    this.threadId = this.data.readUInt32BE(offset);
  }

  extractMars(offset) {
    this.mars = this.data.readUInt8(offset);
    this.marsString = marsByValue[this.mars];
  }

  extractFedAuth(offset) {
    this.fedAuthRequired = this.data.readUInt8(offset);
  }

  toString(indent = '') {
    return indent + 'PreLogin - ' + (0, _sprintfJs.sprintf)('version:%d.%d.%d.%d, encryption:0x%02X(%s), instopt:0x%02X, threadId:0x%08X, mars:0x%02X(%s)', this.version.major, this.version.minor, this.version.build, this.version.subbuild, this.encryption ? this.encryption : 0, this.encryptionString ? this.encryptionString : '', this.instance ? this.instance : 0, this.threadId ? this.threadId : 0, this.mars ? this.mars : 0, this.marsString ? this.marsString : '');
  }

}

var _default = PreloginPayload;
exports.default = _default;
module.exports = PreloginPayload;