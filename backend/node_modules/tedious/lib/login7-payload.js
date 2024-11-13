"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sprintfJs = require("sprintf-js");

const FLAGS_1 = {
  ENDIAN_LITTLE: 0x00,
  ENDIAN_BIG: 0x01,
  CHARSET_ASCII: 0x00,
  CHARSET_EBCDIC: 0x02,
  FLOAT_IEEE_754: 0x00,
  FLOAT_VAX: 0x04,
  FLOAT_ND5000: 0x08,
  BCP_DUMPLOAD_ON: 0x00,
  BCP_DUMPLOAD_OFF: 0x10,
  USE_DB_ON: 0x00,
  USE_DB_OFF: 0x20,
  INIT_DB_WARN: 0x00,
  INIT_DB_FATAL: 0x40,
  SET_LANG_WARN_OFF: 0x00,
  SET_LANG_WARN_ON: 0x80
};
const FLAGS_2 = {
  INIT_LANG_WARN: 0x00,
  INIT_LANG_FATAL: 0x01,
  ODBC_OFF: 0x00,
  ODBC_ON: 0x02,
  F_TRAN_BOUNDARY: 0x04,
  F_CACHE_CONNECT: 0x08,
  USER_NORMAL: 0x00,
  USER_SERVER: 0x10,
  USER_REMUSER: 0x20,
  USER_SQLREPL: 0x40,
  INTEGRATED_SECURITY_OFF: 0x00,
  INTEGRATED_SECURITY_ON: 0x80
};
const TYPE_FLAGS = {
  SQL_DFLT: 0x00,
  SQL_TSQL: 0x08,
  OLEDB_OFF: 0x00,
  OLEDB_ON: 0x10,
  READ_WRITE_INTENT: 0x00,
  READ_ONLY_INTENT: 0x20
};
const FLAGS_3 = {
  CHANGE_PASSWORD_NO: 0x00,
  CHANGE_PASSWORD_YES: 0x01,
  BINARY_XML: 0x02,
  SPAWN_USER_INSTANCE: 0x04,
  UNKNOWN_COLLATION_HANDLING: 0x08,
  EXTENSION_USED: 0x10
};
const FEDAUTH_OPTIONS = {
  FEATURE_ID: 0x02,
  LIBRARY_SECURITYTOKEN: 0x01,
  LIBRARY_ADAL: 0x02,
  FEDAUTH_YES_ECHO: 0x01,
  FEDAUTH_NO_ECHO: 0x00,
  ADAL_WORKFLOW_USER_PASS: 0x01,
  ADAL_WORKFLOW_INTEGRATED: 0x02
};
const FEATURE_EXT_TERMINATOR = 0xFF;

/*
  s2.2.6.3
 */
class Login7Payload {
  constructor({
    tdsVersion,
    packetSize,
    clientProgVer,
    clientPid,
    connectionId,
    clientTimeZone,
    clientLcid
  }) {
    this.tdsVersion = void 0;
    this.packetSize = void 0;
    this.clientProgVer = void 0;
    this.clientPid = void 0;
    this.connectionId = void 0;
    this.clientTimeZone = void 0;
    this.clientLcid = void 0;
    this.readOnlyIntent = void 0;
    this.initDbFatal = void 0;
    this.userName = void 0;
    this.password = void 0;
    this.serverName = void 0;
    this.appName = void 0;
    this.hostname = void 0;
    this.libraryName = void 0;
    this.language = void 0;
    this.database = void 0;
    this.clientId = void 0;
    this.sspi = void 0;
    this.attachDbFile = void 0;
    this.changePassword = void 0;
    this.fedAuth = void 0;
    this.tdsVersion = tdsVersion;
    this.packetSize = packetSize;
    this.clientProgVer = clientProgVer;
    this.clientPid = clientPid;
    this.connectionId = connectionId;
    this.clientTimeZone = clientTimeZone;
    this.clientLcid = clientLcid;
    this.readOnlyIntent = false;
    this.initDbFatal = false;
    this.fedAuth = undefined;
    this.userName = undefined;
    this.password = undefined;
    this.serverName = undefined;
    this.appName = undefined;
    this.hostname = undefined;
    this.libraryName = undefined;
    this.language = undefined;
    this.database = undefined;
    this.clientId = undefined;
    this.sspi = undefined;
    this.attachDbFile = undefined;
    this.changePassword = undefined;
  }

  toBuffer() {
    const fixedData = Buffer.alloc(94);
    const buffers = [fixedData];
    let offset = 0;
    let dataOffset = fixedData.length; // Length: 4-byte

    offset = fixedData.writeUInt32LE(0, offset); // TDSVersion: 4-byte

    offset = fixedData.writeUInt32LE(this.tdsVersion, offset); // PacketSize: 4-byte

    offset = fixedData.writeUInt32LE(this.packetSize, offset); // ClientProgVer: 4-byte

    offset = fixedData.writeUInt32LE(this.clientProgVer, offset); // ClientPID: 4-byte

    offset = fixedData.writeUInt32LE(this.clientPid, offset); // ConnectionID: 4-byte

    offset = fixedData.writeUInt32LE(this.connectionId, offset); // OptionFlags1: 1-byte

    offset = fixedData.writeUInt8(this.buildOptionFlags1(), offset); // OptionFlags2: 1-byte

    offset = fixedData.writeUInt8(this.buildOptionFlags2(), offset); // TypeFlags: 1-byte

    offset = fixedData.writeUInt8(this.buildTypeFlags(), offset); // OptionFlags3: 1-byte

    offset = fixedData.writeUInt8(this.buildOptionFlags3(), offset); // ClientTimZone: 4-byte

    offset = fixedData.writeInt32LE(this.clientTimeZone, offset); // ClientLCID: 4-byte

    offset = fixedData.writeUInt32LE(this.clientLcid, offset); // ibHostName: 2-byte

    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchHostName: 2-byte

    if (this.hostname) {
      const buffer = Buffer.from(this.hostname, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(dataOffset, offset);
    } // ibUserName: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchUserName: 2-byte

    if (this.userName) {
      const buffer = Buffer.from(this.userName, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibPassword: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchPassword: 2-byte

    if (this.password) {
      const buffer = Buffer.from(this.password, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(this.scramblePassword(buffer));
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibAppName: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchAppName: 2-byte

    if (this.appName) {
      const buffer = Buffer.from(this.appName, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibServerName: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchServerName: 2-byte

    if (this.serverName) {
      const buffer = Buffer.from(this.serverName, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // (ibUnused / ibExtension): 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // (cchUnused / cbExtension): 2-byte

    const extensions = this.buildFeatureExt();
    offset = fixedData.writeUInt16LE(4, offset);
    const extensionOffset = Buffer.alloc(4);
    extensionOffset.writeUInt32LE(dataOffset += 4, 0);
    dataOffset += extensions.length;
    buffers.push(extensionOffset, extensions); // ibCltIntName: 2-byte

    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchCltIntName: 2-byte

    if (this.libraryName) {
      const buffer = Buffer.from(this.libraryName, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibLanguage: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchLanguage: 2-byte

    if (this.language) {
      const buffer = Buffer.from(this.language, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibDatabase: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchDatabase: 2-byte

    if (this.database) {
      const buffer = Buffer.from(this.database, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ClientID: 6-byte


    if (this.clientId) {
      this.clientId.copy(fixedData, offset, 0, 6);
    }

    offset += 6; // ibSSPI: 2-byte

    offset = fixedData.writeUInt16LE(dataOffset, offset); // cbSSPI: 2-byte

    if (this.sspi) {
      if (this.sspi.length > 65535) {
        offset = fixedData.writeUInt16LE(65535, offset);
      } else {
        offset = fixedData.writeUInt16LE(this.sspi.length, offset);
      }

      buffers.push(this.sspi);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibAtchDBFile: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchAtchDBFile: 2-byte

    if (this.attachDbFile) {
      const buffer = Buffer.from(this.attachDbFile, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibChangePassword: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchChangePassword: 2-byte

    if (this.changePassword) {
      const buffer = Buffer.from(this.changePassword, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // cbSSPILong: 4-byte


    if (this.sspi && this.sspi.length > 65535) {
      fixedData.writeUInt32LE(this.sspi.length, offset);
    } else {
      fixedData.writeUInt32LE(0, offset);
    }

    const data = Buffer.concat(buffers);
    data.writeUInt32LE(data.length, 0);
    return data;
  }

  buildOptionFlags1() {
    let flags1 = FLAGS_1.ENDIAN_LITTLE | FLAGS_1.CHARSET_ASCII | FLAGS_1.FLOAT_IEEE_754 | FLAGS_1.BCP_DUMPLOAD_OFF | FLAGS_1.USE_DB_OFF | FLAGS_1.SET_LANG_WARN_ON;

    if (this.initDbFatal) {
      flags1 |= FLAGS_1.INIT_DB_FATAL;
    } else {
      flags1 |= FLAGS_1.INIT_DB_WARN;
    }

    return flags1;
  }

  buildFeatureExt() {
    const buffers = [];
    const fedAuth = this.fedAuth;

    if (fedAuth) {
      switch (fedAuth.type) {
        case 'ADAL':
          const buffer = Buffer.alloc(7);
          buffer.writeUInt8(FEDAUTH_OPTIONS.FEATURE_ID, 0);
          buffer.writeUInt32LE(2, 1);
          buffer.writeUInt8(FEDAUTH_OPTIONS.LIBRARY_ADAL << 1 | (fedAuth.echo ? FEDAUTH_OPTIONS.FEDAUTH_YES_ECHO : FEDAUTH_OPTIONS.FEDAUTH_NO_ECHO), 5);
          buffer.writeUInt8(fedAuth.workflow === 'integrated' ? 0x02 : FEDAUTH_OPTIONS.ADAL_WORKFLOW_USER_PASS, 6);
          buffers.push(buffer);
          break;

        case 'SECURITYTOKEN':
          const token = Buffer.from(fedAuth.fedAuthToken, 'ucs2');
          const buf = Buffer.alloc(10);
          let offset = 0;
          offset = buf.writeUInt8(FEDAUTH_OPTIONS.FEATURE_ID, offset);
          offset = buf.writeUInt32LE(token.length + 4 + 1, offset);
          offset = buf.writeUInt8(FEDAUTH_OPTIONS.LIBRARY_SECURITYTOKEN << 1 | (fedAuth.echo ? FEDAUTH_OPTIONS.FEDAUTH_YES_ECHO : FEDAUTH_OPTIONS.FEDAUTH_NO_ECHO), offset);
          buf.writeInt32LE(token.length, offset);
          buffers.push(buf);
          buffers.push(token);
          break;
      }
    }

    buffers.push(Buffer.from([FEATURE_EXT_TERMINATOR]));
    return Buffer.concat(buffers);
  }

  buildOptionFlags2() {
    let flags2 = FLAGS_2.INIT_LANG_WARN | FLAGS_2.ODBC_OFF | FLAGS_2.USER_NORMAL;

    if (this.sspi) {
      flags2 |= FLAGS_2.INTEGRATED_SECURITY_ON;
    } else {
      flags2 |= FLAGS_2.INTEGRATED_SECURITY_OFF;
    }

    return flags2;
  }

  buildTypeFlags() {
    let typeFlags = TYPE_FLAGS.SQL_DFLT | TYPE_FLAGS.OLEDB_OFF;

    if (this.readOnlyIntent) {
      typeFlags |= TYPE_FLAGS.READ_ONLY_INTENT;
    } else {
      typeFlags |= TYPE_FLAGS.READ_WRITE_INTENT;
    }

    return typeFlags;
  }

  buildOptionFlags3() {
    return FLAGS_3.CHANGE_PASSWORD_NO | FLAGS_3.UNKNOWN_COLLATION_HANDLING | FLAGS_3.EXTENSION_USED;
  }

  scramblePassword(password) {
    for (let b = 0, len = password.length; b < len; b++) {
      let byte = password[b];
      const lowNibble = byte & 0x0f;
      const highNibble = byte >> 4;
      byte = lowNibble << 4 | highNibble;
      byte = byte ^ 0xa5;
      password[b] = byte;
    }

    return password;
  }

  toString(indent = '') {
    return indent + 'Login7 - ' + (0, _sprintfJs.sprintf)('TDS:0x%08X, PacketSize:0x%08X, ClientProgVer:0x%08X, ClientPID:0x%08X, ConnectionID:0x%08X', this.tdsVersion, this.packetSize, this.clientProgVer, this.clientPid, this.connectionId) + '\n' + indent + '         ' + (0, _sprintfJs.sprintf)('Flags1:0x%02X, Flags2:0x%02X, TypeFlags:0x%02X, Flags3:0x%02X, ClientTimezone:%d, ClientLCID:0x%08X', this.buildOptionFlags1(), this.buildOptionFlags2(), this.buildTypeFlags(), this.buildOptionFlags3(), this.clientTimeZone, this.clientLcid) + '\n' + indent + '         ' + (0, _sprintfJs.sprintf)("Hostname:'%s', Username:'%s', Password:'%s', AppName:'%s', ServerName:'%s', LibraryName:'%s'", this.hostname, this.userName, this.password, this.appName, this.serverName, this.libraryName) + '\n' + indent + '         ' + (0, _sprintfJs.sprintf)("Language:'%s', Database:'%s', SSPI:'%s', AttachDbFile:'%s', ChangePassword:'%s'", this.language, this.database, this.sspi, this.attachDbFile, this.changePassword);
  }

}

var _default = Login7Payload;
exports.default = _default;
module.exports = Login7Payload;