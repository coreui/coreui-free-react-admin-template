"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CEKEntry = void 0;

// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
class CEKEntry {
  constructor(ordinalVal) {
    this.columnEncryptionKeyValues = void 0;
    this.ordinal = void 0;
    this.databaseId = void 0;
    this.cekId = void 0;
    this.cekVersion = void 0;
    this.cekMdVersion = void 0;
    this.ordinal = ordinalVal;
    this.databaseId = 0;
    this.cekId = 0;
    this.cekVersion = 0;
    this.cekMdVersion = Buffer.alloc(0);
    this.columnEncryptionKeyValues = [];
  }

  add(encryptedKey, dbId, keyId, keyVersion, mdVersion, keyPath, keyStoreName, algorithmName) {
    const encryptionKey = {
      encryptedKey,
      dbId,
      keyId,
      keyVersion,
      mdVersion,
      keyPath,
      keyStoreName,
      algorithmName
    };
    this.columnEncryptionKeyValues.push(encryptionKey);

    if (this.databaseId === 0) {
      this.databaseId = dbId;
      this.cekId = keyId;
      this.cekVersion = keyVersion;
      this.cekMdVersion = mdVersion;
    } else if (this.databaseId !== dbId || this.cekId !== keyId || this.cekVersion !== keyVersion || !this.cekMdVersion || !mdVersion || this.cekMdVersion.length !== mdVersion.length) {
      throw new Error('Invalid databaseId, cekId, cekVersion or cekMdVersion.');
    }
  }

}

exports.CEKEntry = CEKEntry;