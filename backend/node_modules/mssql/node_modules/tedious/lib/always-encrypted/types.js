"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SQLServerStatementColumnEncryptionSetting = exports.DescribeParameterEncryptionResultSet2 = exports.DescribeParameterEncryptionResultSet1 = exports.SQLServerEncryptionType = void 0;
// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
let SQLServerEncryptionType;
exports.SQLServerEncryptionType = SQLServerEncryptionType;

(function (SQLServerEncryptionType) {
  SQLServerEncryptionType[SQLServerEncryptionType["Deterministic"] = 1] = "Deterministic";
  SQLServerEncryptionType[SQLServerEncryptionType["Randomized"] = 2] = "Randomized";
  SQLServerEncryptionType[SQLServerEncryptionType["PlainText"] = 0] = "PlainText";
})(SQLServerEncryptionType || (exports.SQLServerEncryptionType = SQLServerEncryptionType = {}));

// Fields in the first resultset of "sp_describe_parameter_encryption"
// We expect the server to return the fields in the resultset in the same order as mentioned below.
// If the server changes the below order, then transparent parameter encryption will break.
let DescribeParameterEncryptionResultSet1; // Fields in the second resultset of "sp_describe_parameter_encryption"
// We expect the server to return the fields in the resultset in the same order as mentioned below.
// If the server changes the below order, then transparent parameter encryption will break.

exports.DescribeParameterEncryptionResultSet1 = DescribeParameterEncryptionResultSet1;

(function (DescribeParameterEncryptionResultSet1) {
  DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyOrdinal"] = 0] = "KeyOrdinal";
  DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["DbId"] = 1] = "DbId";
  DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyId"] = 2] = "KeyId";
  DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyVersion"] = 3] = "KeyVersion";
  DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyMdVersion"] = 4] = "KeyMdVersion";
  DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["EncryptedKey"] = 5] = "EncryptedKey";
  DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["ProviderName"] = 6] = "ProviderName";
  DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyPath"] = 7] = "KeyPath";
  DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyEncryptionAlgorithm"] = 8] = "KeyEncryptionAlgorithm";
})(DescribeParameterEncryptionResultSet1 || (exports.DescribeParameterEncryptionResultSet1 = DescribeParameterEncryptionResultSet1 = {}));

let DescribeParameterEncryptionResultSet2;
exports.DescribeParameterEncryptionResultSet2 = DescribeParameterEncryptionResultSet2;

(function (DescribeParameterEncryptionResultSet2) {
  DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ParameterOrdinal"] = 0] = "ParameterOrdinal";
  DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ParameterName"] = 1] = "ParameterName";
  DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ColumnEncryptionAlgorithm"] = 2] = "ColumnEncryptionAlgorithm";
  DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ColumnEncrytionType"] = 3] = "ColumnEncrytionType";
  DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ColumnEncryptionKeyOrdinal"] = 4] = "ColumnEncryptionKeyOrdinal";
  DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["NormalizationRuleVersion"] = 5] = "NormalizationRuleVersion";
})(DescribeParameterEncryptionResultSet2 || (exports.DescribeParameterEncryptionResultSet2 = DescribeParameterEncryptionResultSet2 = {}));

let SQLServerStatementColumnEncryptionSetting;
exports.SQLServerStatementColumnEncryptionSetting = SQLServerStatementColumnEncryptionSetting;

(function (SQLServerStatementColumnEncryptionSetting) {
  SQLServerStatementColumnEncryptionSetting[SQLServerStatementColumnEncryptionSetting["UseConnectionSetting"] = 0] = "UseConnectionSetting";
  SQLServerStatementColumnEncryptionSetting[SQLServerStatementColumnEncryptionSetting["Enabled"] = 1] = "Enabled";
  SQLServerStatementColumnEncryptionSetting[SQLServerStatementColumnEncryptionSetting["ResultSetOnly"] = 2] = "ResultSetOnly";
  SQLServerStatementColumnEncryptionSetting[SQLServerStatementColumnEncryptionSetting["Disabled"] = 3] = "Disabled";
})(SQLServerStatementColumnEncryptionSetting || (exports.SQLServerStatementColumnEncryptionSetting = SQLServerStatementColumnEncryptionSetting = {}));