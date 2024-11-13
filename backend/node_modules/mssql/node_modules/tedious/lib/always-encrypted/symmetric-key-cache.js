"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKey = void 0;

var _symmetricKey = _interopRequireDefault(require("./symmetric-key"));

var _lruCache = _interopRequireDefault(require("lru-cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
const cache = new _lruCache.default(0);

const getKey = async (keyInfo, options) => {
  if (!options.trustedServerNameAE) {
    throw new Error('Server name should not be null in getKey');
  }

  const serverName = options.trustedServerNameAE;
  const keyLookupValue = `${serverName}:${Buffer.from(keyInfo.encryptedKey).toString('base64')}:${keyInfo.keyStoreName}`;

  if (cache.has(keyLookupValue)) {
    return cache.get(keyLookupValue);
  } else {
    const provider = options.encryptionKeyStoreProviders && options.encryptionKeyStoreProviders[keyInfo.keyStoreName];

    if (!provider) {
      throw new Error(`Failed to decrypt a column encryption key. Invalid key store provider name: ${keyInfo.keyStoreName}. A key store provider name must denote either a system key store provider or a registered custom key store provider. Valid (currently registered) custom key store provider names are: ${options.encryptionKeyStoreProviders}. Please verify key store provider information in column master key definitions in the database, and verify all custom key store providers used in your application are registered properly.`);
    }

    const plaintextKey = await provider.decryptColumnEncryptionKey(keyInfo.keyPath, keyInfo.algorithmName, keyInfo.encryptedKey);
    const encryptionKey = new _symmetricKey.default(plaintextKey);

    if (options.columnEncryptionKeyCacheTTL > 0) {
      cache.set(keyLookupValue, encryptionKey, options.columnEncryptionKeyCacheTTL);
    }

    return encryptionKey;
  }
};

exports.getKey = getKey;