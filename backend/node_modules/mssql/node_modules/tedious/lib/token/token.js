"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SSPIToken = exports.RowToken = exports.ReturnValueToken = exports.ReturnStatusToken = exports.OrderToken = exports.NBCRowToken = exports.LoginAckToken = exports.ErrorMessageToken = exports.InfoMessageToken = exports.FedAuthInfoToken = exports.FeatureExtAckToken = exports.RoutingEnvChangeToken = exports.CollationChangeToken = exports.ResetConnectionEnvChangeToken = exports.DatabaseMirroringPartnerEnvChangeToken = exports.RollbackTransactionEnvChangeToken = exports.CommitTransactionEnvChangeToken = exports.BeginTransactionEnvChangeToken = exports.PacketSizeEnvChangeToken = exports.CharsetEnvChangeToken = exports.LanguageEnvChangeToken = exports.DatabaseEnvChangeToken = exports.DoneProcToken = exports.DoneInProcToken = exports.DoneToken = exports.ColMetadataToken = exports.Token = exports.TYPE = void 0;
const TYPE = {
  ALTMETADATA: 0x88,
  ALTROW: 0xD3,
  COLMETADATA: 0x81,
  COLINFO: 0xA5,
  DONE: 0xFD,
  DONEPROC: 0xFE,
  DONEINPROC: 0xFF,
  ENVCHANGE: 0xE3,
  ERROR: 0xAA,
  FEATUREEXTACK: 0xAE,
  FEDAUTHINFO: 0xEE,
  INFO: 0xAB,
  LOGINACK: 0xAD,
  NBCROW: 0xD2,
  OFFSET: 0x78,
  ORDER: 0xA9,
  RETURNSTATUS: 0x79,
  RETURNVALUE: 0xAC,
  ROW: 0xD1,
  SSPI: 0xED,
  TABNAME: 0xA4
};
exports.TYPE = TYPE;

class Token {
  constructor(name, event) {
    this.name = void 0;
    this.event = void 0;
    this.name = name;
    this.event = event;
  }

}

exports.Token = Token;

class ColMetadataToken extends Token {
  constructor(columns) {
    super('COLMETADATA', 'columnMetadata');
    this.columns = void 0;
    this.columns = columns;
  }

}

exports.ColMetadataToken = ColMetadataToken;

class DoneToken extends Token {
  constructor({
    more,
    sqlError,
    attention,
    serverError,
    rowCount,
    curCmd
  }) {
    super('DONE', 'done');
    this.more = void 0;
    this.sqlError = void 0;
    this.attention = void 0;
    this.serverError = void 0;
    this.rowCount = void 0;
    this.curCmd = void 0;
    this.more = more;
    this.sqlError = sqlError;
    this.attention = attention;
    this.serverError = serverError;
    this.rowCount = rowCount;
    this.curCmd = curCmd;
  }

}

exports.DoneToken = DoneToken;

class DoneInProcToken extends Token {
  constructor({
    more,
    sqlError,
    attention,
    serverError,
    rowCount,
    curCmd
  }) {
    super('DONEINPROC', 'doneInProc');
    this.more = void 0;
    this.sqlError = void 0;
    this.attention = void 0;
    this.serverError = void 0;
    this.rowCount = void 0;
    this.curCmd = void 0;
    this.more = more;
    this.sqlError = sqlError;
    this.attention = attention;
    this.serverError = serverError;
    this.rowCount = rowCount;
    this.curCmd = curCmd;
  }

}

exports.DoneInProcToken = DoneInProcToken;

class DoneProcToken extends Token {
  constructor({
    more,
    sqlError,
    attention,
    serverError,
    rowCount,
    curCmd
  }) {
    super('DONEPROC', 'doneProc');
    this.more = void 0;
    this.sqlError = void 0;
    this.attention = void 0;
    this.serverError = void 0;
    this.rowCount = void 0;
    this.curCmd = void 0;
    this.more = more;
    this.sqlError = sqlError;
    this.attention = attention;
    this.serverError = serverError;
    this.rowCount = rowCount;
    this.curCmd = curCmd;
  }

}

exports.DoneProcToken = DoneProcToken;

class DatabaseEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'databaseChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'DATABASE';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.DatabaseEnvChangeToken = DatabaseEnvChangeToken;

class LanguageEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'languageChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'LANGUAGE';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.LanguageEnvChangeToken = LanguageEnvChangeToken;

class CharsetEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'charsetChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'CHARSET';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.CharsetEnvChangeToken = CharsetEnvChangeToken;

class PacketSizeEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'packetSizeChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'PACKET_SIZE';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.PacketSizeEnvChangeToken = PacketSizeEnvChangeToken;

class BeginTransactionEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'beginTransaction');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.name = 'ENVCHANGE';
    this.event = 'beginTransaction';
    this.type = 'BEGIN_TXN';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.BeginTransactionEnvChangeToken = BeginTransactionEnvChangeToken;

class CommitTransactionEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'commitTransaction');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'COMMIT_TXN';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.CommitTransactionEnvChangeToken = CommitTransactionEnvChangeToken;

class RollbackTransactionEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'rollbackTransaction');
    this.type = void 0;
    this.oldValue = void 0;
    this.newValue = void 0;
    this.type = 'ROLLBACK_TXN';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.RollbackTransactionEnvChangeToken = RollbackTransactionEnvChangeToken;

class DatabaseMirroringPartnerEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'partnerNode');
    this.type = void 0;
    this.oldValue = void 0;
    this.newValue = void 0;
    this.name = 'ENVCHANGE';
    this.event = 'partnerNode';
    this.type = 'DATABASE_MIRRORING_PARTNER';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.DatabaseMirroringPartnerEnvChangeToken = DatabaseMirroringPartnerEnvChangeToken;

class ResetConnectionEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'resetConnection');
    this.type = void 0;
    this.oldValue = void 0;
    this.newValue = void 0;
    this.type = 'RESET_CONNECTION';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.ResetConnectionEnvChangeToken = ResetConnectionEnvChangeToken;

class CollationChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'sqlCollationChange');
    this.type = void 0;
    this.oldValue = void 0;
    this.newValue = void 0;
    this.type = 'SQL_COLLATION';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.CollationChangeToken = CollationChangeToken;

class RoutingEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'routingChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'ROUTING_CHANGE';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }

}

exports.RoutingEnvChangeToken = RoutingEnvChangeToken;

class FeatureExtAckToken extends Token {
  constructor(fedAuth) {
    super('FEATUREEXTACK', 'featureExtAck');
    this.fedAuth = void 0;
    this.fedAuth = fedAuth;
  }

}

exports.FeatureExtAckToken = FeatureExtAckToken;

class FedAuthInfoToken extends Token {
  constructor(spn, stsurl) {
    super('FEDAUTHINFO', 'fedAuthInfo');
    this.spn = void 0;
    this.stsurl = void 0;
    this.spn = spn;
    this.stsurl = stsurl;
  }

}

exports.FedAuthInfoToken = FedAuthInfoToken;

class InfoMessageToken extends Token {
  constructor({
    number,
    state,
    class: clazz,
    message,
    serverName,
    procName,
    lineNumber
  }) {
    super('INFO', 'infoMessage');
    this.number = void 0;
    this.state = void 0;
    this.class = void 0;
    this.message = void 0;
    this.serverName = void 0;
    this.procName = void 0;
    this.lineNumber = void 0;
    this.number = number;
    this.state = state;
    this.class = clazz;
    this.message = message;
    this.serverName = serverName;
    this.procName = procName;
    this.lineNumber = lineNumber;
  }

}

exports.InfoMessageToken = InfoMessageToken;

class ErrorMessageToken extends Token {
  constructor({
    number,
    state,
    class: clazz,
    message,
    serverName,
    procName,
    lineNumber
  }) {
    super('ERROR', 'errorMessage');
    this.number = void 0;
    this.state = void 0;
    this.class = void 0;
    this.message = void 0;
    this.serverName = void 0;
    this.procName = void 0;
    this.lineNumber = void 0;
    this.number = number;
    this.state = state;
    this.class = clazz;
    this.message = message;
    this.serverName = serverName;
    this.procName = procName;
    this.lineNumber = lineNumber;
  }

}

exports.ErrorMessageToken = ErrorMessageToken;

class LoginAckToken extends Token {
  constructor({
    interface: interfaze,
    tdsVersion,
    progName,
    progVersion
  }) {
    super('LOGINACK', 'loginack');
    this.interface = void 0;
    this.tdsVersion = void 0;
    this.progName = void 0;
    this.progVersion = void 0;
    this.interface = interfaze;
    this.tdsVersion = tdsVersion;
    this.progName = progName;
    this.progVersion = progVersion;
  }

}

exports.LoginAckToken = LoginAckToken;

class NBCRowToken extends Token {
  constructor(columns) {
    super('NBCROW', 'row');
    this.columns = void 0;
    this.columns = columns;
  }

}

exports.NBCRowToken = NBCRowToken;

class OrderToken extends Token {
  constructor(orderColumns) {
    super('ORDER', 'order');
    this.orderColumns = void 0;
    this.orderColumns = orderColumns;
  }

}

exports.OrderToken = OrderToken;

class ReturnStatusToken extends Token {
  constructor(value) {
    super('RETURNSTATUS', 'returnStatus');
    this.value = void 0;
    this.value = value;
  }

}

exports.ReturnStatusToken = ReturnStatusToken;

class ReturnValueToken extends Token {
  constructor({
    paramOrdinal,
    paramName,
    metadata,
    value
  }) {
    super('RETURNVALUE', 'returnValue');
    this.paramOrdinal = void 0;
    this.paramName = void 0;
    this.metadata = void 0;
    this.value = void 0;
    this.paramOrdinal = paramOrdinal;
    this.paramName = paramName;
    this.metadata = metadata;
    this.value = value;
  }

}

exports.ReturnValueToken = ReturnValueToken;

class RowToken extends Token {
  constructor(columns) {
    super('ROW', 'row');
    this.columns = void 0;
    this.columns = columns;
  }

}

exports.RowToken = RowToken;

class SSPIToken extends Token {
  constructor(ntlmpacket, ntlmpacketBuffer) {
    super('SSPICHALLENGE', 'sspichallenge');
    this.ntlmpacket = void 0;
    this.ntlmpacketBuffer = void 0;
    this.ntlmpacket = ntlmpacket;
    this.ntlmpacketBuffer = ntlmpacketBuffer;
  }

}

exports.SSPIToken = SSPIToken;