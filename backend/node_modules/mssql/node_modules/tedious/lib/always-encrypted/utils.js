"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldHonorAE = void 0;

var _types = require("./types");

// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
const shouldHonorAE = (stmtColumnEncryptionSetting, columnEncryptionSetting) => {
  switch (stmtColumnEncryptionSetting) {
    case _types.SQLServerStatementColumnEncryptionSetting.Disabled:
    case _types.SQLServerStatementColumnEncryptionSetting.ResultSetOnly:
      return false;

    case _types.SQLServerStatementColumnEncryptionSetting.Enabled:
      return true;

    default:
      return columnEncryptionSetting;
  }
};

exports.shouldHonorAE = shouldHonorAE;