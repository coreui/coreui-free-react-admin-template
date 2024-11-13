"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readCollation = readCollation;
exports.default = void 0;

var _collation = require("./collation");

var _dataType = require("./data-type");

var _sprintfJs = require("sprintf-js");

function readCollation(parser, callback) {
  // s2.2.5.1.2
  parser.readBuffer(5, collationData => {
    let lcid = (collationData[2] & 0x0F) << 16;
    lcid |= collationData[1] << 8;
    lcid |= collationData[0]; // This may not be extracting the correct nibbles in the correct order.

    let flags = collationData[3] >> 4;
    flags |= collationData[2] & 0xF0; // This may not be extracting the correct nibble.

    const version = collationData[3] & 0x0F;
    const sortId = collationData[4];
    const codepage = _collation.codepageBySortId[sortId] || _collation.codepageByLcid[lcid] || 'CP1252';
    callback({
      lcid,
      flags,
      version,
      sortId,
      codepage
    });
  });
}

function readSchema(parser, callback) {
  // s2.2.5.5.3
  parser.readUInt8(schemaPresent => {
    if (schemaPresent === 0x01) {
      parser.readBVarChar(dbname => {
        parser.readBVarChar(owningSchema => {
          parser.readUsVarChar(xmlSchemaCollection => {
            callback({
              dbname: dbname,
              owningSchema: owningSchema,
              xmlSchemaCollection: xmlSchemaCollection
            });
          });
        });
      });
    } else {
      callback(undefined);
    }
  });
}

function readUDTInfo(parser, callback) {
  parser.readUInt16LE(maxByteSize => {
    parser.readBVarChar(dbname => {
      parser.readBVarChar(owningSchema => {
        parser.readBVarChar(typeName => {
          parser.readUsVarChar(assemblyName => {
            callback({
              maxByteSize: maxByteSize,
              dbname: dbname,
              owningSchema: owningSchema,
              typeName: typeName,
              assemblyName: assemblyName
            });
          });
        });
      });
    });
  });
}

function metadataParse(parser, options, callback) {
  (options.tdsVersion < '7_2' ? parser.readUInt16LE : parser.readUInt32LE).call(parser, userType => {
    parser.readUInt16LE(flags => {
      parser.readUInt8(typeNumber => {
        const type = _dataType.TYPE[typeNumber];

        if (!type) {
          throw new Error((0, _sprintfJs.sprintf)('Unrecognised data type 0x%02X', typeNumber));
        }

        switch (type.name) {
          case 'Null':
          case 'TinyInt':
          case 'SmallInt':
          case 'Int':
          case 'BigInt':
          case 'Real':
          case 'Float':
          case 'SmallMoney':
          case 'Money':
          case 'Bit':
          case 'SmallDateTime':
          case 'DateTime':
          case 'Date':
            return callback({
              userType: userType,
              flags: flags,
              type: type,
              collation: undefined,
              precision: undefined,
              scale: undefined,
              dataLength: undefined,
              schema: undefined,
              udtInfo: undefined
            });

          case 'IntN':
          case 'FloatN':
          case 'MoneyN':
          case 'BitN':
          case 'UniqueIdentifier':
          case 'DateTimeN':
            return parser.readUInt8(dataLength => {
              callback({
                userType: userType,
                flags: flags,
                type: type,
                collation: undefined,
                precision: undefined,
                scale: undefined,
                dataLength: dataLength,
                schema: undefined,
                udtInfo: undefined
              });
            });

          case 'Variant':
            return parser.readUInt32LE(dataLength => {
              callback({
                userType: userType,
                flags: flags,
                type: type,
                collation: undefined,
                precision: undefined,
                scale: undefined,
                dataLength: dataLength,
                schema: undefined,
                udtInfo: undefined
              });
            });

          case 'VarChar':
          case 'Char':
          case 'NVarChar':
          case 'NChar':
            return parser.readUInt16LE(dataLength => {
              readCollation(parser, collation => {
                callback({
                  userType: userType,
                  flags: flags,
                  type: type,
                  collation: collation,
                  precision: undefined,
                  scale: undefined,
                  dataLength: dataLength,
                  schema: undefined,
                  udtInfo: undefined
                });
              });
            });

          case 'Text':
          case 'NText':
            return parser.readUInt32LE(dataLength => {
              readCollation(parser, collation => {
                callback({
                  userType: userType,
                  flags: flags,
                  type: type,
                  collation: collation,
                  precision: undefined,
                  scale: undefined,
                  dataLength: dataLength,
                  schema: undefined,
                  udtInfo: undefined
                });
              });
            });

          case 'VarBinary':
          case 'Binary':
            return parser.readUInt16LE(dataLength => {
              callback({
                userType: userType,
                flags: flags,
                type: type,
                collation: undefined,
                precision: undefined,
                scale: undefined,
                dataLength: dataLength,
                schema: undefined,
                udtInfo: undefined
              });
            });

          case 'Image':
            return parser.readUInt32LE(dataLength => {
              callback({
                userType: userType,
                flags: flags,
                type: type,
                collation: undefined,
                precision: undefined,
                scale: undefined,
                dataLength: dataLength,
                schema: undefined,
                udtInfo: undefined
              });
            });

          case 'Xml':
            return readSchema(parser, schema => {
              callback({
                userType: userType,
                flags: flags,
                type: type,
                collation: undefined,
                precision: undefined,
                scale: undefined,
                dataLength: undefined,
                schema: schema,
                udtInfo: undefined
              });
            });

          case 'Time':
          case 'DateTime2':
          case 'DateTimeOffset':
            return parser.readUInt8(scale => {
              callback({
                userType: userType,
                flags: flags,
                type: type,
                collation: undefined,
                precision: undefined,
                scale: scale,
                dataLength: undefined,
                schema: undefined,
                udtInfo: undefined
              });
            });

          case 'NumericN':
          case 'DecimalN':
            return parser.readUInt8(dataLength => {
              parser.readUInt8(precision => {
                parser.readUInt8(scale => {
                  callback({
                    userType: userType,
                    flags: flags,
                    type: type,
                    collation: undefined,
                    precision: precision,
                    scale: scale,
                    dataLength: dataLength,
                    schema: undefined,
                    udtInfo: undefined
                  });
                });
              });
            });

          case 'UDT':
            return readUDTInfo(parser, udtInfo => {
              callback({
                userType: userType,
                flags: flags,
                type: type,
                collation: undefined,
                precision: undefined,
                scale: undefined,
                dataLength: undefined,
                schema: undefined,
                udtInfo: udtInfo
              });
            });

          default:
            throw new Error((0, _sprintfJs.sprintf)('Unrecognised type %s', type.name));
        }
      });
    });
  });
}

var _default = metadataParse;
exports.default = _default;
module.exports = metadataParse;
module.exports.readCollation = readCollation;