"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptSymmetricKey = exports.decryptWithKey = exports.encryptWithKey = exports.validateAndGetEncryptionAlgorithmName = void 0;

var _symmetricKeyCache = require("./symmetric-key-cache");

var _aeadAes256CbcHmacAlgorithm = require("./aead-aes-256-cbc-hmac-algorithm");

var _aeadAes256CbcHmacEncryptionKey = require("./aead-aes-256-cbc-hmac-encryption-key");

// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
const validateAndGetEncryptionAlgorithmName = (cipherAlgorithmId, cipherAlgorithmName) => {
  if (cipherAlgorithmId !== 2) {
    throw new Error('Custom cipher algorithm not supported.');
  }

  return _aeadAes256CbcHmacAlgorithm.algorithmName;
};

exports.validateAndGetEncryptionAlgorithmName = validateAndGetEncryptionAlgorithmName;

const encryptWithKey = async (plaintext, md, options) => {
  if (!options.trustedServerNameAE) {
    throw new Error('Server name should not be null in EncryptWithKey');
  }

  if (!md.cipherAlgorithm) {
    await decryptSymmetricKey(md, options);
  }

  if (!md.cipherAlgorithm) {
    throw new Error('Cipher Algorithm should not be null in EncryptWithKey');
  }

  const cipherText = md.cipherAlgorithm.encryptData(plaintext);

  if (!cipherText) {
    throw new Error('Internal error. Ciphertext value cannot be null.');
  }

  return cipherText;
};

exports.encryptWithKey = encryptWithKey;

const decryptWithKey = (cipherText, md, options) => {
  if (!options.trustedServerNameAE) {
    throw new Error('Server name should not be null in DecryptWithKey');
  } // if (!md.cipherAlgorithm) {
  //   await decryptSymmetricKey(md, options);
  // }


  if (!md.cipherAlgorithm) {
    throw new Error('Cipher Algorithm should not be null in DecryptWithKey');
  }

  const plainText = md.cipherAlgorithm.decryptData(cipherText);

  if (!plainText) {
    throw new Error('Internal error. Plaintext value cannot be null.');
  }

  return plainText;
};

exports.decryptWithKey = decryptWithKey;

const decryptSymmetricKey = async (md, options) => {
  if (!md) {
    throw new Error('md should not be null in DecryptSymmetricKey.');
  }

  if (!md.cekEntry) {
    throw new Error('md.EncryptionInfo should not be null in DecryptSymmetricKey.');
  }

  if (!md.cekEntry.columnEncryptionKeyValues) {
    throw new Error('md.EncryptionInfo.ColumnEncryptionKeyValues should not be null in DecryptSymmetricKey.');
  }

  let symKey;
  let encryptionKeyInfoChosen;
  const CEKValues = md.cekEntry.columnEncryptionKeyValues;
  let lastError;

  for (const CEKValue of CEKValues) {
    try {
      symKey = await (0, _symmetricKeyCache.getKey)(CEKValue, options);

      if (symKey) {
        encryptionKeyInfoChosen = CEKValue;
        break;
      }
    } catch (error) {
      lastError = error;
    }
  }

  if (!symKey) {
    if (lastError) {
      throw lastError;
    } else {
      throw new Error('Exception while decryption of encrypted column encryption key.');
    }
  }

  const algorithmName = validateAndGetEncryptionAlgorithmName(md.cipherAlgorithmId, md.cipherAlgorithmName);
  const cipherAlgorithm = new _aeadAes256CbcHmacAlgorithm.AeadAes256CbcHmac256Algorithm(new _aeadAes256CbcHmacEncryptionKey.AeadAes256CbcHmac256EncryptionKey(symKey.rootKey, algorithmName), md.encryptionType);
  md.cipherAlgorithm = cipherAlgorithm;
  md.encryptionKeyInfo = encryptionKeyInfoChosen;
};

exports.decryptSymmetricKey = decryptSymmetricKey;