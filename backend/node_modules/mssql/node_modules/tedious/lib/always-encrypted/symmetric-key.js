"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SymmetricKey = void 0;

// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
class SymmetricKey {
  constructor(rootKey) {
    this.rootKey = void 0;

    if (!rootKey) {
      throw new Error('Column encryption key cannot be null.');
    } else if (0 === rootKey.length) {
      throw new Error('Empty column encryption key specified.');
    }

    this.rootKey = rootKey;
  }

  zeroOutKey() {
    this.rootKey = Buffer.alloc(this.rootKey.length);
  }

}

exports.SymmetricKey = SymmetricKey;
var _default = SymmetricKey;
exports.default = _default;