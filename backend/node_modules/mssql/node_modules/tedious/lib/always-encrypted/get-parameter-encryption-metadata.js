"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParameterEncryptionMetadata = void 0;

var _types = require("./types");

var _cekEntry = require("./cek-entry");

var _keyCrypto = require("./key-crypto");

var _dataType = require("../data-type");

var _request = _interopRequireDefault(require("../request"));

var _rpcrequestPayload = _interopRequireDefault(require("../rpcrequest-payload"));

var _packet = require("../packet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
const getParameterEncryptionMetadata = (connection, request, callback) => {
  if (request.cryptoMetadataLoaded === true) {
    return callback();
  }

  const metadataRequest = new _request.default('sp_describe_parameter_encryption', error => {
    if (error) {
      return callback(error);
    }

    const decryptSymmetricKeyPromises = [];
    const cekList = [];
    let paramCount = 0;

    for (const columns of resultRows) {
      try {
        const isFirstRecordSet = columns.some(col => (col && col.metadata && col.metadata.colName) === 'database_id');

        if (isFirstRecordSet === true) {
          const currentOrdinal = columns[_types.DescribeParameterEncryptionResultSet1.KeyOrdinal].value;
          let cekEntry;

          if (!cekList[currentOrdinal]) {
            cekEntry = new _cekEntry.CEKEntry(currentOrdinal);
            cekList[cekEntry.ordinal] = cekEntry;
          } else {
            cekEntry = cekList[currentOrdinal];
          }

          cekEntry.add(columns[_types.DescribeParameterEncryptionResultSet1.EncryptedKey].value, columns[_types.DescribeParameterEncryptionResultSet1.DbId].value, columns[_types.DescribeParameterEncryptionResultSet1.KeyId].value, columns[_types.DescribeParameterEncryptionResultSet1.KeyVersion].value, columns[_types.DescribeParameterEncryptionResultSet1.KeyMdVersion].value, columns[_types.DescribeParameterEncryptionResultSet1.KeyPath].value, columns[_types.DescribeParameterEncryptionResultSet1.ProviderName].value, columns[_types.DescribeParameterEncryptionResultSet1.KeyEncryptionAlgorithm].value);
        } else {
          paramCount++;
          const paramName = columns[_types.DescribeParameterEncryptionResultSet2.ParameterName].value;
          const paramIndex = request.parameters.findIndex(param => paramName === `@${param.name}`);
          const cekOrdinal = columns[_types.DescribeParameterEncryptionResultSet2.ColumnEncryptionKeyOrdinal].value;
          const cekEntry = cekList[cekOrdinal];

          if (cekEntry && cekList.length < cekOrdinal) {
            return callback(new Error(`Internal error. The referenced column encryption key ordinal "${cekOrdinal}" is missing in the encryption metadata returned by sp_describe_parameter_encryption. Max ordinal is "${cekList.length}".`));
          }

          const encType = columns[_types.DescribeParameterEncryptionResultSet2.ColumnEncrytionType].value;

          if (_types.SQLServerEncryptionType.PlainText !== encType) {
            request.parameters[paramIndex].cryptoMetadata = {
              cekEntry: cekEntry,
              ordinal: cekOrdinal,
              cipherAlgorithmId: columns[_types.DescribeParameterEncryptionResultSet2.ColumnEncryptionAlgorithm].value,
              encryptionType: encType,
              normalizationRuleVersion: Buffer.from([columns[_types.DescribeParameterEncryptionResultSet2.NormalizationRuleVersion].value])
            };
            decryptSymmetricKeyPromises.push((0, _keyCrypto.decryptSymmetricKey)(request.parameters[paramIndex].cryptoMetadata, connection.config.options));
          } else if (request.parameters[paramIndex].forceEncrypt === true) {
            return callback(new Error(`Cannot execute statement or procedure ${request.sqlTextOrProcedure} because Force Encryption was set as true for parameter ${paramIndex + 1} and the database expects this parameter to be sent as plaintext. This may be due to a configuration error.`));
          }
        }
      } catch {
        return callback(new Error(`Internal error. Unable to parse parameter encryption metadata in statement or procedure "${request.sqlTextOrProcedure}"`));
      }
    }

    if (paramCount !== request.parameters.length) {
      return callback(new Error(`Internal error. Metadata for some parameters in statement or procedure "${request.sqlTextOrProcedure}" is missing in the resultset returned by sp_describe_parameter_encryption.`));
    }

    return Promise.all(decryptSymmetricKeyPromises).then(() => {
      request.cryptoMetadataLoaded = true;
      process.nextTick(callback);
    }, error => {
      process.nextTick(callback, error);
    });
  });
  metadataRequest.addParameter('tsql', _dataType.typeByName.NVarChar, request.sqlTextOrProcedure);

  if (request.parameters.length) {
    metadataRequest.addParameter('params', _dataType.typeByName.NVarChar, metadataRequest.makeParamsParameter(request.parameters));
  }

  const resultRows = [];
  metadataRequest.on('row', columns => {
    resultRows.push(columns);
  });
  connection.makeRequest(metadataRequest, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default(metadataRequest.sqlTextOrProcedure, metadataRequest.parameters, connection.currentTransactionDescriptor(), connection.config.options));
};

exports.getParameterEncryptionMetadata = getParameterEncryptionMetadata;