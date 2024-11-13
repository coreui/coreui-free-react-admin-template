"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AeadAes256CbcHmac256Algorithm = exports.algorithmName = void 0;

var _types = require("./types");

var _crypto = require("crypto");

var _aeadAes256CbcHmacEncryptionKey = require("./aead-aes-256-cbc-hmac-encryption-key");

// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
const algorithmName = 'AEAD_AES_256_CBC_HMAC_SHA256';
exports.algorithmName = algorithmName;
const algorithmVersion = 0x1;
const blockSizeInBytes = 16;

class AeadAes256CbcHmac256Algorithm {
  constructor(columnEncryptionKey, encryptionType) {
    this.columnEncryptionkey = void 0;
    this.isDeterministic = void 0;
    this.keySizeInBytes = void 0;
    this.version = void 0;
    this.versionSize = void 0;
    this.minimumCipherTextLengthInBytesNoAuthenticationTag = void 0;
    this.minimumCipherTextLengthInBytesWithAuthenticationTag = void 0;
    this.keySizeInBytes = _aeadAes256CbcHmacEncryptionKey.keySize / 8;
    this.version = Buffer.from([algorithmVersion]);
    this.versionSize = Buffer.from([1]);
    this.minimumCipherTextLengthInBytesNoAuthenticationTag = 1 + blockSizeInBytes + blockSizeInBytes;
    this.minimumCipherTextLengthInBytesWithAuthenticationTag = this.minimumCipherTextLengthInBytesNoAuthenticationTag + this.keySizeInBytes;
    this.columnEncryptionkey = columnEncryptionKey;
    this.isDeterministic = encryptionType === _types.SQLServerEncryptionType.Deterministic;
  }

  encryptData(plaintText) {
    let iv;

    if (this.isDeterministic === true) {
      const hmacIv = (0, _crypto.createHmac)('sha256', this.columnEncryptionkey.getIvKey());
      hmacIv.update(plaintText);
      iv = hmacIv.digest().slice(0, blockSizeInBytes);
    } else {
      iv = (0, _crypto.randomBytes)(blockSizeInBytes);
    }

    const encryptCipher = (0, _crypto.createCipheriv)('aes-256-cbc', this.columnEncryptionkey.getEncryptionKey(), iv);
    const encryptedBuffer = Buffer.concat([encryptCipher.update(plaintText), encryptCipher.final()]);

    const authenticationTag = this._prepareAuthenticationTag(iv, encryptedBuffer, 0, encryptedBuffer.length);

    return Buffer.concat([Buffer.from([algorithmVersion]), authenticationTag, iv, encryptedBuffer]);
  }

  decryptData(cipherText) {
    const iv = Buffer.alloc(blockSizeInBytes);
    const minimumCiperTextLength = this.minimumCipherTextLengthInBytesWithAuthenticationTag;

    if (cipherText.length < minimumCiperTextLength) {
      throw new Error(`Specified ciphertext has an invalid size of ${cipherText.length} bytes, which is below the minimum ${minimumCiperTextLength} bytes required for decryption.`);
    }

    let startIndex = 0;

    if (cipherText[0] !== algorithmVersion) {
      throw new Error(`The specified ciphertext's encryption algorithm version ${Buffer.from([cipherText[0]]).toString('hex')} does not match the expected encryption algorithm version ${algorithmVersion}.`);
    }

    startIndex += 1;
    let authenticationTagOffset = 0;
    authenticationTagOffset = startIndex;
    startIndex += this.keySizeInBytes;
    cipherText.copy(iv, 0, startIndex, startIndex + iv.length);
    startIndex += iv.length;
    const cipherTextOffset = startIndex;
    const cipherTextCount = cipherText.length - startIndex;

    const authenticationTag = this._prepareAuthenticationTag(iv, cipherText, cipherTextOffset, cipherTextCount);

    if (0 !== authenticationTag.compare(cipherText, authenticationTagOffset, Math.min(authenticationTagOffset + cipherTextCount, authenticationTagOffset + authenticationTag.length), 0, Math.min(cipherTextCount, authenticationTag.length))) {
      throw new Error('Specified ciphertext has an invalid authentication tag.');
    }

    let plainText;
    const decipher = (0, _crypto.createDecipheriv)('aes-256-cbc', this.columnEncryptionkey.getEncryptionKey(), iv);

    try {
      plainText = decipher.update(cipherText.slice(cipherTextOffset, cipherTextOffset + cipherTextCount));
      plainText = Buffer.concat([plainText, decipher.final()]);
    } catch (error) {
      throw new Error(`Internal error while decryption: ${error.message}`);
    }

    return plainText;
  }

  _prepareAuthenticationTag(iv, cipherText, offset, length) {
    const hmac = (0, _crypto.createHmac)('sha256', this.columnEncryptionkey.getMacKey());
    hmac.update(this.version);
    hmac.update(iv);
    hmac.update(cipherText.slice(offset, offset + length));
    hmac.update(this.versionSize);
    return hmac.digest();
  }

}

exports.AeadAes256CbcHmac256Algorithm = AeadAes256CbcHmac256Algorithm;