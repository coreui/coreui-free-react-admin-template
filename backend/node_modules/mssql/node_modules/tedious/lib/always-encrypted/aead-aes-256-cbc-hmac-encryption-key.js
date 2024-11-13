"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AeadAes256CbcHmac256EncryptionKey = exports.generateKeySalt = exports.deriveKey = exports.keySize = void 0;

var _crypto = require("crypto");

var _symmetricKey = _interopRequireDefault(require("./symmetric-key"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
const keySize = 256;
exports.keySize = keySize;
const keySizeInBytes = keySize / 8;

const deriveKey = (rootKey, salt) => {
  const hmac = (0, _crypto.createHmac)('sha256', rootKey);
  hmac.update(Buffer.from(salt, 'utf16le'));
  return hmac.digest();
};

exports.deriveKey = deriveKey;

const generateKeySalt = (keyType, algorithmName, keySize) => `Microsoft SQL Server cell ${keyType} key ` + `with encryption algorithm:${algorithmName} and key length:${keySize}`;

exports.generateKeySalt = generateKeySalt;

class AeadAes256CbcHmac256EncryptionKey extends _symmetricKey.default {
  constructor(rootKey, algorithmName) {
    super(rootKey);
    this.algorithmName = void 0;
    this.encryptionKeySaltFormat = void 0;
    this.macKeySaltFormat = void 0;
    this.ivKeySaltFormat = void 0;
    this.encryptionKey = void 0;
    this.macKey = void 0;
    this.ivKey = void 0;
    this.algorithmName = algorithmName;
    this.encryptionKeySaltFormat = generateKeySalt('encryption', this.algorithmName, keySize);
    this.macKeySaltFormat = generateKeySalt('MAC', this.algorithmName, keySize);
    this.ivKeySaltFormat = generateKeySalt('IV', this.algorithmName, keySize);

    if (rootKey.length !== keySizeInBytes) {
      throw new Error(`The column encryption key has been successfully decrypted but it's length: ${rootKey.length} does not match the length: ${keySizeInBytes} for algorithm "${this.algorithmName}". Verify the encrypted value of the column encryption key in the database.`);
    }

    try {
      const encKeyBuff = deriveKey(rootKey, this.encryptionKeySaltFormat);
      this.encryptionKey = new _symmetricKey.default(encKeyBuff);
      const macKeyBuff = deriveKey(rootKey, this.macKeySaltFormat);
      this.macKey = new _symmetricKey.default(macKeyBuff);
      const ivKeyBuff = deriveKey(rootKey, this.ivKeySaltFormat);
      this.ivKey = new _symmetricKey.default(ivKeyBuff);
    } catch (error) {
      throw new Error(`Key extraction failed : ${error.message}.`);
    }
  }

  getEncryptionKey() {
    return this.encryptionKey.rootKey;
  }

  getMacKey() {
    return this.macKey.rootKey;
  }

  getIvKey() {
    return this.ivKey.rootKey;
  }

}

exports.AeadAes256CbcHmac256EncryptionKey = AeadAes256CbcHmac256EncryptionKey;