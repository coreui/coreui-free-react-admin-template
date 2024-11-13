"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _os = _interopRequireDefault(require("os"));

var _constants = _interopRequireDefault(require("constants"));

var _tls = require("tls");

var _stream = require("stream");

var _msRestNodeauth = require("@azure/ms-rest-nodeauth");

var _bulkLoad = _interopRequireDefault(require("./bulk-load"));

var _debug = _interopRequireDefault(require("./debug"));

var _events = require("events");

var _instanceLookup = require("./instance-lookup");

var _transientErrorLookup = require("./transient-error-lookup");

var _packet = require("./packet");

var _preloginPayload = _interopRequireDefault(require("./prelogin-payload"));

var _login7Payload = _interopRequireDefault(require("./login7-payload"));

var _ntlmPayload = _interopRequireDefault(require("./ntlm-payload"));

var _request = _interopRequireDefault(require("./request"));

var _rpcrequestPayload = _interopRequireDefault(require("./rpcrequest-payload"));

var _sqlbatchPayload = _interopRequireDefault(require("./sqlbatch-payload"));

var _messageIo = _interopRequireDefault(require("./message-io"));

var _tokenStreamParser = require("./token/token-stream-parser");

var _transaction = require("./transaction");

var _errors = require("./errors");

var _connector = require("./connector");

var _library = require("./library");

var _tdsVersions = require("./tds-versions");

var _message = _interopRequireDefault(require("./message"));

var _ntlm = require("./ntlm");

var _depd = _interopRequireDefault(require("depd"));

var _adalNode = require("adal-node");

var _nodeAbortController = _interopRequireDefault(require("node-abort-controller"));

var _dataType = require("./data-type");

var _bulkLoadPayload = require("./bulk-load-payload");

var _package = require("../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deprecate = (0, _depd.default)('tedious');

/**
 * @private
 */
const KEEP_ALIVE_INITIAL_DELAY = 30 * 1000;
/**
 * @private
 */

const DEFAULT_CONNECT_TIMEOUT = 15 * 1000;
/**
 * @private
 */

const DEFAULT_CLIENT_REQUEST_TIMEOUT = 15 * 1000;
/**
 * @private
 */

const DEFAULT_CANCEL_TIMEOUT = 5 * 1000;
/**
 * @private
 */

const DEFAULT_CONNECT_RETRY_INTERVAL = 500;
/**
 * @private
 */

const DEFAULT_PACKET_SIZE = 4 * 1024;
/**
 * @private
 */

const DEFAULT_TEXTSIZE = 2147483647;
/**
 * @private
 */

const DEFAULT_DATEFIRST = 7;
/**
 * @private
 */

const DEFAULT_PORT = 1433;
/**
 * @private
 */

const DEFAULT_TDS_VERSION = '7_4';
/**
 * @private
 */

const DEFAULT_LANGUAGE = 'us_english';
/**
 * @private
 */

const DEFAULT_DATEFORMAT = 'mdy';

/**
 * @private
 */
const CLEANUP_TYPE = {
  NORMAL: 0,
  REDIRECT: 1,
  RETRY: 2
};

/**
 * A [[Connection]] instance represents a single connection to a database server.
 *
 * ```js
 * var Connection = require('tedious').Connection;
 * var config = {
 *  "authentication": {
 *    ...,
 *    "options": {...}
 *  },
 *  "options": {...}
 * };
 * var connection = new Connection(config);
 * ```
 *
 * Only one request at a time may be executed on a connection. Once a [[Request]]
 * has been initiated (with [[Connection.callProcedure]], [[Connection.execSql]],
 * or [[Connection.execSqlBatch]]), another should not be initiated until the
 * [[Request]]'s completion callback is called.
 */
class Connection extends _events.EventEmitter {
  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * Note: be aware of the different options field:
   * 1. config.authentication.options
   * 2. config.options
   *
   * ```js
   * const { Connection } = require('tedious');
   *
   * const config = {
   *  "authentication": {
   *    ...,
   *    "options": {...}
   *  },
   *  "options": {...}
   * };
   *
   * const connection = new Connection(config);
   * ```
   *
   * @param config
   */
  constructor(config) {
    super();
    this.fedAuthRequired = void 0;
    this.fedAuthInfoToken = void 0;
    this.config = void 0;
    this.secureContext = void 0;
    this.inTransaction = void 0;
    this.transactionDescriptors = void 0;
    this.transactionDepth = void 0;
    this.isSqlBatch = void 0;
    this.curTransientRetryCount = void 0;
    this.transientErrorLookup = void 0;
    this.closed = void 0;
    this.loggedIn = void 0;
    this.loginError = void 0;
    this.debug = void 0;
    this.ntlmpacket = void 0;
    this.ntlmpacketBuffer = void 0;
    this.routingData = void 0;
    this.messageIo = void 0;
    this.state = void 0;
    this.resetConnectionOnNextRequest = void 0;
    this.attentionReceived = void 0;
    this.request = void 0;
    this.procReturnStatusValue = void 0;
    this.socket = void 0;
    this.messageBuffer = void 0;
    this.connectTimer = void 0;
    this.cancelTimer = void 0;
    this.requestTimer = void 0;
    this.retryTimer = void 0;
    this._cancelAfterRequestSent = void 0;

    if (typeof config !== 'object' || config === null) {
      throw new TypeError('The "config" argument is required and must be of type Object.');
    }

    if (typeof config.server !== 'string') {
      throw new TypeError('The "config.server" property is required and must be of type string.');
    }

    this.fedAuthRequired = false;
    this.fedAuthInfoToken = undefined;
    let authentication;

    if (config.authentication !== undefined) {
      if (typeof config.authentication !== 'object' || config.authentication === null) {
        throw new TypeError('The "config.authentication" property must be of type Object.');
      }

      const type = config.authentication.type;
      const options = config.authentication.options === undefined ? {} : config.authentication.options;

      if (typeof type !== 'string') {
        throw new TypeError('The "config.authentication.type" property must be of type string.');
      }

      if (type !== 'default' && type !== 'ntlm' && type !== 'azure-active-directory-password' && type !== 'azure-active-directory-access-token' && type !== 'azure-active-directory-msi-vm' && type !== 'azure-active-directory-msi-app-service' && type !== 'azure-active-directory-service-principal-secret') {
        throw new TypeError('The "type" property must one of "default", "ntlm", "azure-active-directory-password", "azure-active-directory-access-token", "azure-active-directory-msi-vm" or "azure-active-directory-msi-app-service" or "azure-active-directory-service-principal-secret".');
      }

      if (typeof options !== 'object' || options === null) {
        throw new TypeError('The "config.authentication.options" property must be of type object.');
      }

      if (type === 'ntlm') {
        if (typeof options.domain !== 'string') {
          throw new TypeError('The "config.authentication.options.domain" property must be of type string.');
        }

        if (options.userName !== undefined && typeof options.userName !== 'string') {
          throw new TypeError('The "config.authentication.options.userName" property must be of type string.');
        }

        if (options.password !== undefined && typeof options.password !== 'string') {
          throw new TypeError('The "config.authentication.options.password" property must be of type string.');
        }

        authentication = {
          type: 'ntlm',
          options: {
            userName: options.userName,
            password: options.password,
            domain: options.domain && options.domain.toUpperCase()
          }
        };
      } else if (type === 'azure-active-directory-password') {
        if (options.userName !== undefined && typeof options.userName !== 'string') {
          throw new TypeError('The "config.authentication.options.userName" property must be of type string.');
        }

        if (options.password !== undefined && typeof options.password !== 'string') {
          throw new TypeError('The "config.authentication.options.password" property must be of type string.');
        }

        authentication = {
          type: 'azure-active-directory-password',
          options: {
            userName: options.userName,
            password: options.password,
            domain: options.domain
          }
        };
      } else if (type === 'azure-active-directory-access-token') {
        if (typeof options.token !== 'string') {
          throw new TypeError('The "config.authentication.options.token" property must be of type string.');
        }

        authentication = {
          type: 'azure-active-directory-access-token',
          options: {
            token: options.token
          }
        };
      } else if (type === 'azure-active-directory-msi-vm') {
        if (options.clientId !== undefined && typeof options.clientId !== 'string') {
          throw new TypeError('The "config.authentication.options.clientId" property must be of type string.');
        }

        if (options.msiEndpoint !== undefined && typeof options.msiEndpoint !== 'string') {
          throw new TypeError('The "config.authentication.options.msiEndpoint" property must be of type string.');
        }

        authentication = {
          type: 'azure-active-directory-msi-vm',
          options: {
            clientId: options.clientId,
            msiEndpoint: options.msiEndpoint
          }
        };
      } else if (type === 'azure-active-directory-msi-app-service') {
        if (options.clientId !== undefined && typeof options.clientId !== 'string') {
          throw new TypeError('The "config.authentication.options.clientId" property must be of type string.');
        }

        if (options.msiEndpoint !== undefined && typeof options.msiEndpoint !== 'string') {
          throw new TypeError('The "config.authentication.options.msiEndpoint" property must be of type string.');
        }

        if (options.msiSecret !== undefined && typeof options.msiSecret !== 'string') {
          throw new TypeError('The "config.authentication.options.msiSecret" property must be of type string.');
        }

        authentication = {
          type: 'azure-active-directory-msi-app-service',
          options: {
            clientId: options.clientId,
            msiEndpoint: options.msiEndpoint,
            msiSecret: options.msiSecret
          }
        };
      } else if (type === 'azure-active-directory-service-principal-secret') {
        if (typeof options.clientId !== 'string') {
          throw new TypeError('The "config.authentication.options.clientId" property must be of type string.');
        }

        if (typeof options.clientSecret !== 'string') {
          throw new TypeError('The "config.authentication.options.clientSecret" property must be of type string.');
        }

        if (typeof options.tenantId !== 'string') {
          throw new TypeError('The "config.authentication.options.tenantId" property must be of type string.');
        }

        authentication = {
          type: 'azure-active-directory-service-principal-secret',
          options: {
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            tenantId: options.tenantId
          }
        };
      } else {
        if (options.userName !== undefined && typeof options.userName !== 'string') {
          throw new TypeError('The "config.authentication.options.userName" property must be of type string.');
        }

        if (options.password !== undefined && typeof options.password !== 'string') {
          throw new TypeError('The "config.authentication.options.password" property must be of type string.');
        }

        authentication = {
          type: 'default',
          options: {
            userName: options.userName,
            password: options.password
          }
        };
      }
    } else {
      authentication = {
        type: 'default',
        options: {
          userName: undefined,
          password: undefined
        }
      };
    }

    this.config = {
      server: config.server,
      authentication: authentication,
      options: {
        abortTransactionOnError: false,
        appName: undefined,
        camelCaseColumns: false,
        cancelTimeout: DEFAULT_CANCEL_TIMEOUT,
        columnEncryptionKeyCacheTTL: 2 * 60 * 60 * 1000,
        // Units: miliseconds
        columnEncryptionSetting: false,
        columnNameReplacer: undefined,
        connectionRetryInterval: DEFAULT_CONNECT_RETRY_INTERVAL,
        connectTimeout: DEFAULT_CONNECT_TIMEOUT,
        connectionIsolationLevel: _transaction.ISOLATION_LEVEL.READ_COMMITTED,
        cryptoCredentialsDetails: {},
        database: undefined,
        datefirst: DEFAULT_DATEFIRST,
        dateFormat: DEFAULT_DATEFORMAT,
        debug: {
          data: false,
          packet: false,
          payload: false,
          token: false
        },
        enableAnsiNull: true,
        enableAnsiNullDefault: true,
        enableAnsiPadding: true,
        enableAnsiWarnings: true,
        enableArithAbort: true,
        enableConcatNullYieldsNull: true,
        enableCursorCloseOnCommit: null,
        enableImplicitTransactions: false,
        enableNumericRoundabort: false,
        enableQuotedIdentifier: true,
        encrypt: true,
        fallbackToDefaultDb: false,
        encryptionKeyStoreProviders: undefined,
        instanceName: undefined,
        isolationLevel: _transaction.ISOLATION_LEVEL.READ_COMMITTED,
        language: DEFAULT_LANGUAGE,
        localAddress: undefined,
        maxRetriesOnTransientErrors: 3,
        multiSubnetFailover: false,
        packetSize: DEFAULT_PACKET_SIZE,
        port: DEFAULT_PORT,
        readOnlyIntent: false,
        requestTimeout: DEFAULT_CLIENT_REQUEST_TIMEOUT,
        rowCollectionOnDone: false,
        rowCollectionOnRequestCompletion: false,
        serverName: undefined,
        serverSupportsColumnEncryption: false,
        tdsVersion: DEFAULT_TDS_VERSION,
        textsize: DEFAULT_TEXTSIZE,
        trustedServerNameAE: undefined,
        trustServerCertificate: true,
        useColumnNames: false,
        useUTC: true,
        validateBulkLoadParameters: true,
        workstationId: undefined,
        lowerCaseGuids: false
      }
    };

    if (config.options) {
      if (config.options.port && config.options.instanceName) {
        throw new Error('Port and instanceName are mutually exclusive, but ' + config.options.port + ' and ' + config.options.instanceName + ' provided');
      }

      if (config.options.abortTransactionOnError !== undefined) {
        if (typeof config.options.abortTransactionOnError !== 'boolean' && config.options.abortTransactionOnError !== null) {
          throw new TypeError('The "config.options.abortTransactionOnError" property must be of type string or null.');
        }

        this.config.options.abortTransactionOnError = config.options.abortTransactionOnError;
      }

      if (config.options.appName !== undefined) {
        if (typeof config.options.appName !== 'string') {
          throw new TypeError('The "config.options.appName" property must be of type string.');
        }

        this.config.options.appName = config.options.appName;
      }

      if (config.options.camelCaseColumns !== undefined) {
        if (typeof config.options.camelCaseColumns !== 'boolean') {
          throw new TypeError('The "config.options.camelCaseColumns" property must be of type boolean.');
        }

        this.config.options.camelCaseColumns = config.options.camelCaseColumns;
      }

      if (config.options.cancelTimeout !== undefined) {
        if (typeof config.options.cancelTimeout !== 'number') {
          throw new TypeError('The "config.options.cancelTimeout" property must be of type number.');
        }

        this.config.options.cancelTimeout = config.options.cancelTimeout;
      }

      if (config.options.columnNameReplacer) {
        if (typeof config.options.columnNameReplacer !== 'function') {
          throw new TypeError('The "config.options.cancelTimeout" property must be of type function.');
        }

        this.config.options.columnNameReplacer = config.options.columnNameReplacer;
      }

      if (config.options.connectTimeout !== undefined) {
        if (typeof config.options.connectTimeout !== 'number') {
          throw new TypeError('The "config.options.connectTimeout" property must be of type number.');
        }

        this.config.options.connectTimeout = config.options.connectTimeout;
      }

      if (config.options.connectionIsolationLevel !== undefined) {
        (0, _transaction.assertValidIsolationLevel)(config.options.connectionIsolationLevel, 'config.options.connectionIsolationLevel');
        this.config.options.connectionIsolationLevel = config.options.connectionIsolationLevel;
      }

      if (config.options.connectTimeout !== undefined) {
        if (typeof config.options.connectTimeout !== 'number') {
          throw new TypeError('The "config.options.connectTimeout" property must be of type number.');
        }

        this.config.options.connectTimeout = config.options.connectTimeout;
      }

      if (config.options.cryptoCredentialsDetails !== undefined) {
        if (typeof config.options.cryptoCredentialsDetails !== 'object' || config.options.cryptoCredentialsDetails === null) {
          throw new TypeError('The "config.options.cryptoCredentialsDetails" property must be of type Object.');
        }

        this.config.options.cryptoCredentialsDetails = config.options.cryptoCredentialsDetails;
      }

      if (config.options.database !== undefined) {
        if (typeof config.options.database !== 'string') {
          throw new TypeError('The "config.options.database" property must be of type string.');
        }

        this.config.options.database = config.options.database;
      }

      if (config.options.datefirst !== undefined) {
        if (typeof config.options.datefirst !== 'number' && config.options.datefirst !== null) {
          throw new TypeError('The "config.options.datefirst" property must be of type number.');
        }

        if (config.options.datefirst !== null && (config.options.datefirst < 1 || config.options.datefirst > 7)) {
          throw new RangeError('The "config.options.datefirst" property must be >= 1 and <= 7');
        }

        this.config.options.datefirst = config.options.datefirst;
      }

      if (config.options.dateFormat !== undefined) {
        if (typeof config.options.dateFormat !== 'string' && config.options.dateFormat !== null) {
          throw new TypeError('The "config.options.dateFormat" property must be of type string or null.');
        }

        this.config.options.dateFormat = config.options.dateFormat;
      }

      if (config.options.debug) {
        if (config.options.debug.data !== undefined) {
          if (typeof config.options.debug.data !== 'boolean') {
            throw new TypeError('The "config.options.debug.data" property must be of type boolean.');
          }

          this.config.options.debug.data = config.options.debug.data;
        }

        if (config.options.debug.packet !== undefined) {
          if (typeof config.options.debug.packet !== 'boolean') {
            throw new TypeError('The "config.options.debug.packet" property must be of type boolean.');
          }

          this.config.options.debug.packet = config.options.debug.packet;
        }

        if (config.options.debug.payload !== undefined) {
          if (typeof config.options.debug.payload !== 'boolean') {
            throw new TypeError('The "config.options.debug.payload" property must be of type boolean.');
          }

          this.config.options.debug.payload = config.options.debug.payload;
        }

        if (config.options.debug.token !== undefined) {
          if (typeof config.options.debug.token !== 'boolean') {
            throw new TypeError('The "config.options.debug.token" property must be of type boolean.');
          }

          this.config.options.debug.token = config.options.debug.token;
        }
      }

      if (config.options.enableAnsiNull !== undefined) {
        if (typeof config.options.enableAnsiNull !== 'boolean' && config.options.enableAnsiNull !== null) {
          throw new TypeError('The "config.options.enableAnsiNull" property must be of type boolean or null.');
        }

        this.config.options.enableAnsiNull = config.options.enableAnsiNull;
      }

      if (config.options.enableAnsiNullDefault !== undefined) {
        if (typeof config.options.enableAnsiNullDefault !== 'boolean' && config.options.enableAnsiNullDefault !== null) {
          throw new TypeError('The "config.options.enableAnsiNullDefault" property must be of type boolean or null.');
        }

        this.config.options.enableAnsiNullDefault = config.options.enableAnsiNullDefault;
      }

      if (config.options.enableAnsiPadding !== undefined) {
        if (typeof config.options.enableAnsiPadding !== 'boolean' && config.options.enableAnsiPadding !== null) {
          throw new TypeError('The "config.options.enableAnsiPadding" property must be of type boolean or null.');
        }

        this.config.options.enableAnsiPadding = config.options.enableAnsiPadding;
      }

      if (config.options.enableAnsiWarnings !== undefined) {
        if (typeof config.options.enableAnsiWarnings !== 'boolean' && config.options.enableAnsiWarnings !== null) {
          throw new TypeError('The "config.options.enableAnsiWarnings" property must be of type boolean or null.');
        }

        this.config.options.enableAnsiWarnings = config.options.enableAnsiWarnings;
      }

      if (config.options.enableArithAbort !== undefined) {
        if (typeof config.options.enableArithAbort !== 'boolean' && config.options.enableArithAbort !== null) {
          throw new TypeError('The "config.options.enableArithAbort" property must be of type boolean or null.');
        }

        this.config.options.enableArithAbort = config.options.enableArithAbort;
      }

      if (config.options.enableConcatNullYieldsNull !== undefined) {
        if (typeof config.options.enableConcatNullYieldsNull !== 'boolean' && config.options.enableConcatNullYieldsNull !== null) {
          throw new TypeError('The "config.options.enableConcatNullYieldsNull" property must be of type boolean or null.');
        }

        this.config.options.enableConcatNullYieldsNull = config.options.enableConcatNullYieldsNull;
      }

      if (config.options.enableCursorCloseOnCommit !== undefined) {
        if (typeof config.options.enableCursorCloseOnCommit !== 'boolean' && config.options.enableCursorCloseOnCommit !== null) {
          throw new TypeError('The "config.options.enableCursorCloseOnCommit" property must be of type boolean or null.');
        }

        this.config.options.enableCursorCloseOnCommit = config.options.enableCursorCloseOnCommit;
      }

      if (config.options.enableImplicitTransactions !== undefined) {
        if (typeof config.options.enableImplicitTransactions !== 'boolean' && config.options.enableImplicitTransactions !== null) {
          throw new TypeError('The "config.options.enableImplicitTransactions" property must be of type boolean or null.');
        }

        this.config.options.enableImplicitTransactions = config.options.enableImplicitTransactions;
      }

      if (config.options.enableNumericRoundabort !== undefined) {
        if (typeof config.options.enableNumericRoundabort !== 'boolean' && config.options.enableNumericRoundabort !== null) {
          throw new TypeError('The "config.options.enableNumericRoundabort" property must be of type boolean or null.');
        }

        this.config.options.enableNumericRoundabort = config.options.enableNumericRoundabort;
      }

      if (config.options.enableQuotedIdentifier !== undefined) {
        if (typeof config.options.enableQuotedIdentifier !== 'boolean' && config.options.enableQuotedIdentifier !== null) {
          throw new TypeError('The "config.options.enableQuotedIdentifier" property must be of type boolean or null.');
        }

        this.config.options.enableQuotedIdentifier = config.options.enableQuotedIdentifier;
      }

      if (config.options.encrypt !== undefined) {
        if (typeof config.options.encrypt !== 'boolean') {
          throw new TypeError('The "config.options.encrypt" property must be of type boolean.');
        }

        this.config.options.encrypt = config.options.encrypt;
      }

      if (config.options.fallbackToDefaultDb !== undefined) {
        if (typeof config.options.fallbackToDefaultDb !== 'boolean') {
          throw new TypeError('The "config.options.fallbackToDefaultDb" property must be of type boolean.');
        }

        this.config.options.fallbackToDefaultDb = config.options.fallbackToDefaultDb;
      }

      if (config.options.instanceName !== undefined) {
        if (typeof config.options.instanceName !== 'string') {
          throw new TypeError('The "config.options.instanceName" property must be of type string.');
        }

        this.config.options.instanceName = config.options.instanceName;
        this.config.options.port = undefined;
      }

      if (config.options.isolationLevel !== undefined) {
        (0, _transaction.assertValidIsolationLevel)(config.options.isolationLevel, 'config.options.isolationLevel');
        this.config.options.isolationLevel = config.options.isolationLevel;
      }

      if (config.options.language !== undefined) {
        if (typeof config.options.language !== 'string' && config.options.language !== null) {
          throw new TypeError('The "config.options.language" property must be of type string or null.');
        }

        this.config.options.language = config.options.language;
      }

      if (config.options.localAddress !== undefined) {
        if (typeof config.options.localAddress !== 'string') {
          throw new TypeError('The "config.options.localAddress" property must be of type string.');
        }

        this.config.options.localAddress = config.options.localAddress;
      }

      if (config.options.multiSubnetFailover !== undefined) {
        if (typeof config.options.multiSubnetFailover !== 'boolean') {
          throw new TypeError('The "config.options.multiSubnetFailover" property must be of type boolean.');
        }

        this.config.options.multiSubnetFailover = config.options.multiSubnetFailover;
      }

      if (config.options.packetSize !== undefined) {
        if (typeof config.options.packetSize !== 'number') {
          throw new TypeError('The "config.options.packetSize" property must be of type number.');
        }

        this.config.options.packetSize = config.options.packetSize;
      }

      if (config.options.port !== undefined) {
        if (typeof config.options.port !== 'number') {
          throw new TypeError('The "config.options.port" property must be of type number.');
        }

        if (config.options.port <= 0 || config.options.port >= 65536) {
          throw new RangeError('The "config.options.port" property must be > 0 and < 65536');
        }

        this.config.options.port = config.options.port;
        this.config.options.instanceName = undefined;
      }

      if (config.options.readOnlyIntent !== undefined) {
        if (typeof config.options.readOnlyIntent !== 'boolean') {
          throw new TypeError('The "config.options.readOnlyIntent" property must be of type boolean.');
        }

        this.config.options.readOnlyIntent = config.options.readOnlyIntent;
      }

      if (config.options.requestTimeout !== undefined) {
        if (typeof config.options.requestTimeout !== 'number') {
          throw new TypeError('The "config.options.requestTimeout" property must be of type number.');
        }

        this.config.options.requestTimeout = config.options.requestTimeout;
      }

      if (config.options.maxRetriesOnTransientErrors !== undefined) {
        if (typeof config.options.maxRetriesOnTransientErrors !== 'number') {
          throw new TypeError('The "config.options.maxRetriesOnTransientErrors" property must be of type number.');
        }

        if (config.options.maxRetriesOnTransientErrors < 0) {
          throw new TypeError('The "config.options.maxRetriesOnTransientErrors" property must be equal or greater than 0.');
        }

        this.config.options.maxRetriesOnTransientErrors = config.options.maxRetriesOnTransientErrors;
      }

      if (config.options.connectionRetryInterval !== undefined) {
        if (typeof config.options.connectionRetryInterval !== 'number') {
          throw new TypeError('The "config.options.connectionRetryInterval" property must be of type number.');
        }

        if (config.options.connectionRetryInterval <= 0) {
          throw new TypeError('The "config.options.connectionRetryInterval" property must be greater than 0.');
        }

        this.config.options.connectionRetryInterval = config.options.connectionRetryInterval;
      }

      if (config.options.rowCollectionOnDone !== undefined) {
        if (typeof config.options.rowCollectionOnDone !== 'boolean') {
          throw new TypeError('The "config.options.rowCollectionOnDone" property must be of type boolean.');
        }

        this.config.options.rowCollectionOnDone = config.options.rowCollectionOnDone;
      }

      if (config.options.rowCollectionOnRequestCompletion !== undefined) {
        if (typeof config.options.rowCollectionOnRequestCompletion !== 'boolean') {
          throw new TypeError('The "config.options.rowCollectionOnRequestCompletion" property must be of type boolean.');
        }

        this.config.options.rowCollectionOnRequestCompletion = config.options.rowCollectionOnRequestCompletion;
      }

      if (config.options.tdsVersion !== undefined) {
        if (typeof config.options.tdsVersion !== 'string') {
          throw new TypeError('The "config.options.tdsVersion" property must be of type string.');
        }

        this.config.options.tdsVersion = config.options.tdsVersion;
      }

      if (config.options.textsize !== undefined) {
        if (typeof config.options.textsize !== 'number' && config.options.textsize !== null) {
          throw new TypeError('The "config.options.textsize" property must be of type number or null.');
        }

        if (config.options.textsize > 2147483647) {
          throw new TypeError('The "config.options.textsize" can\'t be greater than 2147483647.');
        } else if (config.options.textsize < -1) {
          throw new TypeError('The "config.options.textsize" can\'t be smaller than -1.');
        }

        this.config.options.textsize = config.options.textsize | 0;
      }

      if (config.options.trustServerCertificate !== undefined) {
        if (typeof config.options.trustServerCertificate !== 'boolean') {
          throw new TypeError('The "config.options.trustServerCertificate" property must be of type boolean.');
        }

        this.config.options.trustServerCertificate = config.options.trustServerCertificate;
      }

      if (config.options.useColumnNames !== undefined) {
        if (typeof config.options.useColumnNames !== 'boolean') {
          throw new TypeError('The "config.options.useColumnNames" property must be of type boolean.');
        }

        this.config.options.useColumnNames = config.options.useColumnNames;
      }

      if (config.options.useUTC !== undefined) {
        if (typeof config.options.useUTC !== 'boolean') {
          throw new TypeError('The "config.options.useUTC" property must be of type boolean.');
        }

        this.config.options.useUTC = config.options.useUTC;
      }

      if (config.options.validateBulkLoadParameters !== undefined) {
        if (typeof config.options.validateBulkLoadParameters !== 'boolean') {
          throw new TypeError('The "config.options.validateBulkLoadParameters" property must be of type boolean.');
        }

        if (config.options.validateBulkLoadParameters === false) {
          deprecate('Setting the "config.options.validateBulkLoadParameters" to `false` is deprecated and will no longer work in the next major version of `tedious`. Set the value to `true` and update your use of BulkLoad functionality to silence this message.');
        }

        this.config.options.validateBulkLoadParameters = config.options.validateBulkLoadParameters;
      }

      if (config.options.workstationId !== undefined) {
        if (typeof config.options.workstationId !== 'string') {
          throw new TypeError('The "config.options.workstationId" property must be of type string.');
        }

        this.config.options.workstationId = config.options.workstationId;
      }

      if (config.options.lowerCaseGuids !== undefined) {
        if (typeof config.options.lowerCaseGuids !== 'boolean') {
          throw new TypeError('The "config.options.lowerCaseGuids" property must be of type boolean.');
        }

        this.config.options.lowerCaseGuids = config.options.lowerCaseGuids;
      }
    }

    let credentialsDetails = this.config.options.cryptoCredentialsDetails;

    if (credentialsDetails.secureOptions === undefined) {
      // If the caller has not specified their own `secureOptions`,
      // we set `SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS` here.
      // Older SQL Server instances running on older Windows versions have
      // trouble with the BEAST workaround in OpenSSL.
      // As BEAST is a browser specific exploit, we can just disable this option here.
      credentialsDetails = Object.create(credentialsDetails, {
        secureOptions: {
          value: _constants.default.SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS
        }
      });
    }

    this.secureContext = (0, _tls.createSecureContext)(credentialsDetails);
    this.debug = this.createDebug();
    this.inTransaction = false;
    this.transactionDescriptors = [Buffer.from([0, 0, 0, 0, 0, 0, 0, 0])]; // 'beginTransaction', 'commitTransaction' and 'rollbackTransaction'
    // events are utilized to maintain inTransaction property state which in
    // turn is used in managing transactions. These events are only fired for
    // TDS version 7.2 and beyond. The properties below are used to emulate
    // equivalent behavior for TDS versions before 7.2.

    this.transactionDepth = 0;
    this.isSqlBatch = false;
    this.closed = false;
    this.loggedIn = false;
    this.messageBuffer = Buffer.alloc(0);
    this.curTransientRetryCount = 0;
    this.transientErrorLookup = new _transientErrorLookup.TransientErrorLookup();
    this.state = this.STATE.INITIALIZED;

    this._cancelAfterRequestSent = () => {
      this.messageIo.sendMessage(_packet.TYPE.ATTENTION);
      this.transitionTo(this.STATE.SENT_ATTENTION);
      this.createCancelTimer();
    };
  }

  connect(connectListener) {
    if (this.state !== this.STATE.INITIALIZED) {
      throw new _errors.ConnectionError('`.connect` can not be called on a Connection in `' + this.state.name + '` state.');
    }

    if (connectListener) {
      const onConnect = err => {
        this.removeListener('error', onError);
        connectListener(err);
      };

      const onError = err => {
        this.removeListener('connect', onConnect);
        connectListener(err);
      };

      this.once('connect', onConnect);
      this.once('error', onError);
    }

    this.transitionTo(this.STATE.CONNECTING);
  }
  /**
   * The server has reported that the charset has changed.
   */


  on(event, listener) {
    return super.on(event, listener);
  }
  /**
   * @private
   */


  emit(event, ...args) {
    return super.emit(event, ...args);
  }
  /**
   * Closes the connection to the database.
   *
   * The [[Event_end]] will be emitted once the connection has been closed.
   */


  close() {
    this.transitionTo(this.STATE.FINAL);
  }
  /**
   * @private
   */


  initialiseConnection() {
    const signal = this.createConnectTimer();

    if (this.config.options.port) {
      return this.connectOnPort(this.config.options.port, this.config.options.multiSubnetFailover, signal);
    } else {
      return new _instanceLookup.InstanceLookup().instanceLookup({
        server: this.config.server,
        instanceName: this.config.options.instanceName,
        timeout: this.config.options.connectTimeout,
        signal: signal
      }, (err, port) => {
        if (err) {
          if (err.name === 'AbortError') {
            return;
          }

          this.emit('connect', (0, _errors.ConnectionError)(err.message, 'EINSTLOOKUP'));
        } else {
          this.connectOnPort(port, this.config.options.multiSubnetFailover, signal);
        }
      });
    }
  }
  /**
   * @private
   */


  cleanupConnection(cleanupType) {
    if (!this.closed) {
      this.clearConnectTimer();
      this.clearRequestTimer();
      this.clearRetryTimer();
      this.closeConnection();

      if (cleanupType === CLEANUP_TYPE.REDIRECT) {
        this.emit('rerouting');
      } else if (cleanupType !== CLEANUP_TYPE.RETRY) {
        process.nextTick(() => {
          this.emit('end');
        });
      }

      const request = this.request;

      if (request) {
        const err = (0, _errors.RequestError)('Connection closed before request completed.', 'ECLOSE');
        request.callback(err);
        this.request = undefined;
      }

      this.closed = true;
      this.loggedIn = false;
      this.loginError = undefined;
    }
  }
  /**
   * @private
   */


  createDebug() {
    const debug = new _debug.default(this.config.options.debug);
    debug.on('debug', message => {
      this.emit('debug', message);
    });
    return debug;
  }
  /**
   * @private
   */


  createTokenStreamParser(message) {
    const tokenStreamParser = new _tokenStreamParser.Parser(message, this.debug, this.config.options);
    tokenStreamParser.on('infoMessage', token => {
      this.emit('infoMessage', token);
    });
    tokenStreamParser.on('sspichallenge', token => {
      if (token.ntlmpacket) {
        this.ntlmpacket = token.ntlmpacket;
        this.ntlmpacketBuffer = token.ntlmpacketBuffer;
      }

      this.emit('sspichallenge', token);
    });
    tokenStreamParser.on('errorMessage', token => {
      this.emit('errorMessage', token);

      if (this.loggedIn) {
        const request = this.request;

        if (request) {
          if (!request.canceled) {
            const error = new _errors.RequestError(token.message, 'EREQUEST');
            error.number = token.number;
            error.state = token.state;
            error.class = token.class;
            error.serverName = token.serverName;
            error.procName = token.procName;
            error.lineNumber = token.lineNumber;
            request.error = error;
          }
        }
      } else {
        const error = (0, _errors.ConnectionError)(token.message, 'ELOGIN');
        const isLoginErrorTransient = this.transientErrorLookup.isTransientError(token.number);

        if (isLoginErrorTransient && this.curTransientRetryCount !== this.config.options.maxRetriesOnTransientErrors) {
          error.isTransient = true;
        }

        this.loginError = error;
      }
    });
    tokenStreamParser.on('databaseChange', token => {
      this.emit('databaseChange', token.newValue);
    });
    tokenStreamParser.on('languageChange', token => {
      this.emit('languageChange', token.newValue);
    });
    tokenStreamParser.on('charsetChange', token => {
      this.emit('charsetChange', token.newValue);
    });
    tokenStreamParser.on('fedAuthInfo', token => {
      this.dispatchEvent('fedAuthInfo', token);
    });
    tokenStreamParser.on('featureExtAck', token => {
      this.dispatchEvent('featureExtAck', token);
    });
    tokenStreamParser.on('loginack', token => {
      if (!token.tdsVersion) {
        // unsupported TDS version
        this.loginError = (0, _errors.ConnectionError)('Server responded with unknown TDS version.', 'ETDS');
        this.loggedIn = false;
        return;
      }

      if (!token.interface) {
        // unsupported interface
        this.loginError = (0, _errors.ConnectionError)('Server responded with unsupported interface.', 'EINTERFACENOTSUPP');
        this.loggedIn = false;
        return;
      } // use negotiated version


      this.config.options.tdsVersion = token.tdsVersion;
      this.loggedIn = true;
    });
    tokenStreamParser.on('routingChange', token => {
      // Removes instance name attached to the redirect url. E.g., redirect.db.net\instance1 --> redirect.db.net
      const [server] = token.newValue.server.split('\\');
      this.routingData = {
        server,
        port: token.newValue.port
      };
    });
    tokenStreamParser.on('packetSizeChange', token => {
      this.messageIo.packetSize(token.newValue);
    }); // A new top-level transaction was started. This is not fired
    // for nested transactions.

    tokenStreamParser.on('beginTransaction', token => {
      this.transactionDescriptors.push(token.newValue);
      this.inTransaction = true;
    }); // A top-level transaction was committed. This is not fired
    // for nested transactions.

    tokenStreamParser.on('commitTransaction', () => {
      this.transactionDescriptors.length = 1;
      this.inTransaction = false;
    }); // A top-level transaction was rolled back. This is not fired
    // for nested transactions. This is also fired if a batch
    // aborting error happened that caused a rollback.

    tokenStreamParser.on('rollbackTransaction', () => {
      this.transactionDescriptors.length = 1; // An outermost transaction was rolled back. Reset the transaction counter

      this.inTransaction = false;
      this.emit('rollbackTransaction');
    });
    tokenStreamParser.on('columnMetadata', token => {
      const request = this.request;

      if (request) {
        if (!request.canceled) {
          if (this.config.options.useColumnNames) {
            const columns = {};

            for (let j = 0, len = token.columns.length; j < len; j++) {
              const col = token.columns[j];

              if (columns[col.colName] == null) {
                columns[col.colName] = col;
              }
            }

            request.emit('columnMetadata', columns);
          } else {
            request.emit('columnMetadata', token.columns);
          }
        }
      } else {
        this.emit('error', new Error("Received 'columnMetadata' when no sqlRequest is in progress"));
        this.close();
      }
    });
    tokenStreamParser.on('order', token => {
      const request = this.request;

      if (request) {
        if (!request.canceled) {
          request.emit('order', token.orderColumns);
        }
      } else {
        this.emit('error', new Error("Received 'order' when no sqlRequest is in progress"));
        this.close();
      }
    });
    tokenStreamParser.on('row', token => {
      const request = this.request;

      if (request) {
        if (!request.canceled) {
          if (this.config.options.rowCollectionOnRequestCompletion) {
            request.rows.push(token.columns);
          }

          if (this.config.options.rowCollectionOnDone) {
            request.rst.push(token.columns);
          }

          if (!request.canceled) {
            request.emit('row', token.columns);
          }
        }
      } else {
        this.emit('error', new Error("Received 'row' when no sqlRequest is in progress"));
        this.close();
      }
    });
    tokenStreamParser.on('returnStatus', token => {
      const request = this.request;

      if (request) {
        if (!request.canceled) {
          // Keep value for passing in 'doneProc' event.
          this.procReturnStatusValue = token.value;
        }
      }
    });
    tokenStreamParser.on('returnValue', token => {
      const request = this.request;

      if (request) {
        if (!request.canceled) {
          request.emit('returnValue', token.paramName, token.value, token.metadata);
        }
      }
    });
    tokenStreamParser.on('doneProc', token => {
      const request = this.request;

      if (request) {
        if (!request.canceled) {
          request.emit('doneProc', token.rowCount, token.more, this.procReturnStatusValue, request.rst);
          this.procReturnStatusValue = undefined;

          if (token.rowCount !== undefined) {
            request.rowCount += token.rowCount;
          }

          if (this.config.options.rowCollectionOnDone) {
            request.rst = [];
          }
        }
      }
    });
    tokenStreamParser.on('doneInProc', token => {
      const request = this.request;

      if (request) {
        if (!request.canceled) {
          request.emit('doneInProc', token.rowCount, token.more, request.rst);

          if (token.rowCount !== undefined) {
            request.rowCount += token.rowCount;
          }

          if (this.config.options.rowCollectionOnDone) {
            request.rst = [];
          }
        }
      }
    });
    tokenStreamParser.on('done', token => {
      const request = this.request;

      if (request) {
        if (token.attention) {
          this.dispatchEvent('attention');
        }

        if (!request.canceled) {
          if (token.sqlError && !request.error) {
            // check if the DONE_ERROR flags was set, but an ERROR token was not sent.
            request.error = (0, _errors.RequestError)('An unknown error has occurred.', 'UNKNOWN');
          }

          request.emit('done', token.rowCount, token.more, request.rst);

          if (token.rowCount !== undefined) {
            request.rowCount += token.rowCount;
          }

          if (this.config.options.rowCollectionOnDone) {
            request.rst = [];
          }
        }
      }
    });
    tokenStreamParser.on('resetConnection', () => {
      this.emit('resetConnection');
    });
    return tokenStreamParser;
  }

  connectOnPort(port, multiSubnetFailover, signal) {
    const connectOpts = {
      host: this.routingData ? this.routingData.server : this.config.server,
      port: this.routingData ? this.routingData.port : port,
      localAddress: this.config.options.localAddress
    };
    new _connector.Connector(connectOpts, signal, multiSubnetFailover).execute((err, socket) => {
      if (err) {
        if (err.name === 'AbortError') {
          return;
        }

        return this.socketError(err);
      }

      socket = socket;
      socket.on('error', error => {
        this.socketError(error);
      });
      socket.on('close', () => {
        this.socketClose();
      });
      socket.on('end', () => {
        this.socketEnd();
      });
      socket.setKeepAlive(true, KEEP_ALIVE_INITIAL_DELAY);
      this.messageIo = new _messageIo.default(socket, this.config.options.packetSize, this.debug);
      this.messageIo.on('data', message => {
        this.dispatchEvent('message', message);
      });
      this.messageIo.on('secure', cleartext => {
        this.emit('secure', cleartext);
      });
      this.messageIo.on('error', error => {
        this.socketError(error);
      });
      this.socket = socket;
      this.socketConnect();
    });
  }
  /**
   * @private
   */


  closeConnection() {
    if (this.socket) {
      this.socket.destroy();
    }
  }
  /**
   * @private
   */


  createConnectTimer() {
    const controller = new _nodeAbortController.default();
    this.connectTimer = setTimeout(() => {
      controller.abort();
      this.connectTimeout();
    }, this.config.options.connectTimeout);
    return controller.signal;
  }
  /**
   * @private
   */


  createCancelTimer() {
    this.clearCancelTimer();
    const timeout = this.config.options.cancelTimeout;

    if (timeout > 0) {
      this.cancelTimer = setTimeout(() => {
        this.cancelTimeout();
      }, timeout);
    }
  }
  /**
   * @private
   */


  createRequestTimer() {
    this.clearRequestTimer(); // release old timer, just to be safe

    const request = this.request;
    const timeout = request.timeout !== undefined ? request.timeout : this.config.options.requestTimeout;

    if (timeout) {
      this.requestTimer = setTimeout(() => {
        this.requestTimeout();
      }, timeout);
    }
  }
  /**
   * @private
   */


  createRetryTimer() {
    this.clearRetryTimer();
    this.retryTimer = setTimeout(() => {
      this.retryTimeout();
    }, this.config.options.connectionRetryInterval);
  }
  /**
   * @private
   */


  connectTimeout() {
    const message = `Failed to connect to ${this.config.server}${this.config.options.port ? `:${this.config.options.port}` : `\\${this.config.options.instanceName}`} in ${this.config.options.connectTimeout}ms`;
    this.debug.log(message);
    this.emit('connect', (0, _errors.ConnectionError)(message, 'ETIMEOUT'));
    this.connectTimer = undefined;
    this.dispatchEvent('connectTimeout');
  }
  /**
   * @private
   */


  cancelTimeout() {
    const message = `Failed to cancel request in ${this.config.options.cancelTimeout}ms`;
    this.debug.log(message);
    this.dispatchEvent('socketError', (0, _errors.ConnectionError)(message, 'ETIMEOUT'));
  }
  /**
   * @private
   */


  requestTimeout() {
    this.requestTimer = undefined;
    const request = this.request;
    request.cancel();
    const timeout = request.timeout !== undefined ? request.timeout : this.config.options.requestTimeout;
    const message = 'Timeout: Request failed to complete in ' + timeout + 'ms';
    request.error = (0, _errors.RequestError)(message, 'ETIMEOUT');
  }
  /**
   * @private
   */


  retryTimeout() {
    this.retryTimer = undefined;
    this.emit('retry');
    this.transitionTo(this.STATE.CONNECTING);
  }
  /**
   * @private
   */


  clearConnectTimer() {
    if (this.connectTimer) {
      clearTimeout(this.connectTimer);
    }
  }
  /**
   * @private
   */


  clearCancelTimer() {
    if (this.cancelTimer) {
      clearTimeout(this.cancelTimer);
    }
  }
  /**
   * @private
   */


  clearRequestTimer() {
    if (this.requestTimer) {
      clearTimeout(this.requestTimer);
      this.requestTimer = undefined;
    }
  }
  /**
   * @private
   */


  clearRetryTimer() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = undefined;
    }
  }
  /**
   * @private
   */


  transitionTo(newState) {
    if (this.state === newState) {
      this.debug.log('State is already ' + newState.name);
      return;
    }

    if (this.state && this.state.exit) {
      this.state.exit.call(this, newState);
    }

    this.debug.log('State change: ' + (this.state ? this.state.name : 'undefined') + ' -> ' + newState.name);
    this.state = newState;

    if (this.state.enter) {
      this.state.enter.apply(this);
    }
  }
  /**
   * @private
   */


  getEventHandler(eventName) {
    const handler = this.state.events[eventName];

    if (!handler) {
      throw new Error(`No event '${eventName}' in state '${this.state.name}'`);
    }

    return handler;
  }
  /**
   * @private
   */


  dispatchEvent(eventName, ...args) {
    const handler = this.state.events[eventName];

    if (handler) {
      handler.apply(this, args);
    } else {
      this.emit('error', new Error(`No event '${eventName}' in state '${this.state.name}'`));
      this.close();
    }
  }
  /**
   * @private
   */


  socketError(error) {
    if (this.state === this.STATE.CONNECTING || this.state === this.STATE.SENT_TLSSSLNEGOTIATION) {
      const message = `Failed to connect to ${this.config.server}:${this.config.options.port} - ${error.message}`;
      this.debug.log(message);
      this.emit('connect', (0, _errors.ConnectionError)(message, 'ESOCKET'));
    } else {
      const message = `Connection lost - ${error.message}`;
      this.debug.log(message);
      this.emit('error', (0, _errors.ConnectionError)(message, 'ESOCKET'));
    }

    this.dispatchEvent('socketError', error);
  }
  /**
   * @private
   */


  socketConnect() {
    this.closed = false;
    this.debug.log('connected to ' + this.config.server + ':' + this.config.options.port);
    this.dispatchEvent('socketConnect');
  }
  /**
   * @private
   */


  socketEnd() {
    this.debug.log('socket ended');

    if (this.state !== this.STATE.FINAL) {
      const error = new Error('socket hang up');
      error.code = 'ECONNRESET';
      this.socketError(error);
    }
  }
  /**
   * @private
   */


  socketClose() {
    this.debug.log('connection to ' + this.config.server + ':' + this.config.options.port + ' closed');

    if (this.state === this.STATE.REROUTING) {
      this.debug.log('Rerouting to ' + this.routingData.server + ':' + this.routingData.port);
      this.dispatchEvent('reconnect');
    } else if (this.state === this.STATE.TRANSIENT_FAILURE_RETRY) {
      const server = this.routingData ? this.routingData.server : this.config.server;
      const port = this.routingData ? this.routingData.port : this.config.options.port;
      this.debug.log('Retry after transient failure connecting to ' + server + ':' + port);
      this.dispatchEvent('retry');
    } else {
      this.transitionTo(this.STATE.FINAL);
    }
  }
  /**
   * @private
   */


  sendPreLogin() {
    var _$exec;

    const [, major, minor, build] = (_$exec = /^(\d+)\.(\d+)\.(\d+)/.exec(_package.version)) !== null && _$exec !== void 0 ? _$exec : ['0.0.0', '0', '0', '0'];
    const payload = new _preloginPayload.default({
      encrypt: this.config.options.encrypt,
      version: {
        major: Number(major),
        minor: Number(minor),
        build: Number(build),
        subbuild: 0
      }
    });
    this.messageIo.sendMessage(_packet.TYPE.PRELOGIN, payload.data);
    this.debug.payload(function () {
      return payload.toString('  ');
    });
  }
  /**
   * @private
   */


  emptyMessageBuffer() {
    this.messageBuffer = Buffer.alloc(0);
  }
  /**
   * @private
   */


  addToMessageBuffer(data) {
    this.messageBuffer = Buffer.concat([this.messageBuffer, data]);
  }
  /**
   * @private
   */


  sendLogin7Packet() {
    const payload = new _login7Payload.default({
      tdsVersion: _tdsVersions.versions[this.config.options.tdsVersion],
      packetSize: this.config.options.packetSize,
      clientProgVer: 0,
      clientPid: process.pid,
      connectionId: 0,
      clientTimeZone: new Date().getTimezoneOffset(),
      clientLcid: 0x00000409
    });
    const {
      authentication
    } = this.config;

    switch (authentication.type) {
      case 'azure-active-directory-password':
        payload.fedAuth = {
          type: 'ADAL',
          echo: this.fedAuthRequired,
          workflow: 'default'
        };
        break;

      case 'azure-active-directory-access-token':
        payload.fedAuth = {
          type: 'SECURITYTOKEN',
          echo: this.fedAuthRequired,
          fedAuthToken: authentication.options.token
        };
        break;

      case 'azure-active-directory-msi-vm':
      case 'azure-active-directory-msi-app-service':
      case 'azure-active-directory-service-principal-secret':
        payload.fedAuth = {
          type: 'ADAL',
          echo: this.fedAuthRequired,
          workflow: 'integrated'
        };
        break;

      case 'ntlm':
        payload.sspi = (0, _ntlm.createNTLMRequest)({
          domain: authentication.options.domain
        });
        break;

      default:
        payload.userName = authentication.options.userName;
        payload.password = authentication.options.password;
    }

    payload.hostname = this.config.options.workstationId || _os.default.hostname();
    payload.serverName = this.routingData ? this.routingData.server : this.config.server;
    payload.appName = this.config.options.appName || 'Tedious';
    payload.libraryName = _library.name;
    payload.language = this.config.options.language;
    payload.database = this.config.options.database;
    payload.clientId = Buffer.from([1, 2, 3, 4, 5, 6]);
    payload.readOnlyIntent = this.config.options.readOnlyIntent;
    payload.initDbFatal = !this.config.options.fallbackToDefaultDb;
    this.routingData = undefined;
    this.messageIo.sendMessage(_packet.TYPE.LOGIN7, payload.toBuffer());
    this.debug.payload(function () {
      return payload.toString('  ');
    });
  }
  /**
   * @private
   */


  sendFedAuthTokenMessage(token) {
    const accessTokenLen = Buffer.byteLength(token, 'ucs2');
    const data = Buffer.alloc(8 + accessTokenLen);
    let offset = 0;
    offset = data.writeUInt32LE(accessTokenLen + 4, offset);
    offset = data.writeUInt32LE(accessTokenLen, offset);
    data.write(token, offset, 'ucs2');
    this.messageIo.sendMessage(_packet.TYPE.FEDAUTH_TOKEN, data); // sent the fedAuth token message, the rest is similar to standard login 7

    this.transitionTo(this.STATE.SENT_LOGIN7_WITH_STANDARD_LOGIN);
  }
  /**
   * @private
   */


  sendInitialSql() {
    const payload = new _sqlbatchPayload.default(this.getInitialSql(), this.currentTransactionDescriptor(), this.config.options);
    const message = new _message.default({
      type: _packet.TYPE.SQL_BATCH
    });
    this.messageIo.outgoingMessageStream.write(message);

    _stream.Readable.from(payload).pipe(message);
  }
  /**
   * @private
   */


  getInitialSql() {
    const options = [];

    if (this.config.options.enableAnsiNull === true) {
      options.push('set ansi_nulls on');
    } else if (this.config.options.enableAnsiNull === false) {
      options.push('set ansi_nulls off');
    }

    if (this.config.options.enableAnsiNullDefault === true) {
      options.push('set ansi_null_dflt_on on');
    } else if (this.config.options.enableAnsiNullDefault === false) {
      options.push('set ansi_null_dflt_on off');
    }

    if (this.config.options.enableAnsiPadding === true) {
      options.push('set ansi_padding on');
    } else if (this.config.options.enableAnsiPadding === false) {
      options.push('set ansi_padding off');
    }

    if (this.config.options.enableAnsiWarnings === true) {
      options.push('set ansi_warnings on');
    } else if (this.config.options.enableAnsiWarnings === false) {
      options.push('set ansi_warnings off');
    }

    if (this.config.options.enableArithAbort === true) {
      options.push('set arithabort on');
    } else if (this.config.options.enableArithAbort === false) {
      options.push('set arithabort off');
    }

    if (this.config.options.enableConcatNullYieldsNull === true) {
      options.push('set concat_null_yields_null on');
    } else if (this.config.options.enableConcatNullYieldsNull === false) {
      options.push('set concat_null_yields_null off');
    }

    if (this.config.options.enableCursorCloseOnCommit === true) {
      options.push('set cursor_close_on_commit on');
    } else if (this.config.options.enableCursorCloseOnCommit === false) {
      options.push('set cursor_close_on_commit off');
    }

    if (this.config.options.datefirst !== null) {
      options.push(`set datefirst ${this.config.options.datefirst}`);
    }

    if (this.config.options.dateFormat !== null) {
      options.push(`set dateformat ${this.config.options.dateFormat}`);
    }

    if (this.config.options.enableImplicitTransactions === true) {
      options.push('set implicit_transactions on');
    } else if (this.config.options.enableImplicitTransactions === false) {
      options.push('set implicit_transactions off');
    }

    if (this.config.options.language !== null) {
      options.push(`set language ${this.config.options.language}`);
    }

    if (this.config.options.enableNumericRoundabort === true) {
      options.push('set numeric_roundabort on');
    } else if (this.config.options.enableNumericRoundabort === false) {
      options.push('set numeric_roundabort off');
    }

    if (this.config.options.enableQuotedIdentifier === true) {
      options.push('set quoted_identifier on');
    } else if (this.config.options.enableQuotedIdentifier === false) {
      options.push('set quoted_identifier off');
    }

    if (this.config.options.textsize !== null) {
      options.push(`set textsize ${this.config.options.textsize}`);
    }

    if (this.config.options.connectionIsolationLevel !== null) {
      options.push(`set transaction isolation level ${this.getIsolationLevelText(this.config.options.connectionIsolationLevel)}`);
    }

    if (this.config.options.abortTransactionOnError === true) {
      options.push('set xact_abort on');
    } else if (this.config.options.abortTransactionOnError === false) {
      options.push('set xact_abort off');
    }

    return options.join('\n');
  }
  /**
   * @private
   */


  processedInitialSql() {
    this.clearConnectTimer();
    this.emit('connect');
  }
  /**
   * Execute the SQL batch represented by [[Request]].
   * There is no param support, and unlike [[Request.execSql]],
   * it is not likely that SQL Server will reuse the execution plan it generates for the SQL.
   *
   * In almost all cases, [[Request.execSql]] will be a better choice.
   *
   * @param request A [[Request]] object representing the request.
   */


  execSqlBatch(request) {
    this.makeRequest(request, _packet.TYPE.SQL_BATCH, new _sqlbatchPayload.default(request.sqlTextOrProcedure, this.currentTransactionDescriptor(), this.config.options));
  }
  /**
   *  Execute the SQL represented by [[Request]].
   *
   * As `sp_executesql` is used to execute the SQL, if the same SQL is executed multiples times
   * using this function, the SQL Server query optimizer is likely to reuse the execution plan it generates
   * for the first execution. This may also result in SQL server treating the request like a stored procedure
   * which can result in the [[Event_doneInProc]] or [[Event_doneProc]] events being emitted instead of the
   * [[Event_done]] event you might expect. Using [[execSqlBatch]] will prevent this from occurring but may have a negative performance impact.
   *
   * Beware of the way that scoping rules apply, and how they may [affect local temp tables](http://weblogs.sqlteam.com/mladenp/archive/2006/11/03/17197.aspx)
   * If you're running in to scoping issues, then [[execSqlBatch]] may be a better choice.
   * See also [issue #24](https://github.com/pekim/tedious/issues/24)
   *
   * @param request A [[Request]] object representing the request.
   */


  execSql(request) {
    try {
      request.validateParameters();
    } catch (error) {
      request.error = error;
      process.nextTick(() => {
        this.debug.log(error.message);
        request.callback(error);
      });
      return;
    }

    const parameters = [];
    parameters.push({
      type: _dataType.TYPES.NVarChar,
      name: 'statement',
      value: request.sqlTextOrProcedure,
      output: false,
      length: undefined,
      precision: undefined,
      scale: undefined
    });

    if (request.parameters.length) {
      parameters.push({
        type: _dataType.TYPES.NVarChar,
        name: 'params',
        value: request.makeParamsParameter(request.parameters),
        output: false,
        length: undefined,
        precision: undefined,
        scale: undefined
      });
      parameters.push(...request.parameters);
    }

    this.makeRequest(request, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default('sp_executesql', parameters, this.currentTransactionDescriptor(), this.config.options));
  }
  /**
   * Creates a new BulkLoad instance.
   *
   * @param table The name of the table to bulk-insert into.
   * @param options A set of bulk load options.
   */


  newBulkLoad(table, callbackOrOptions, callback) {
    let options;

    if (callback === undefined) {
      callback = callbackOrOptions;
      options = {};
    } else {
      options = callbackOrOptions;
    }

    if (typeof options !== 'object') {
      throw new TypeError('"options" argument must be an object');
    }

    return new _bulkLoad.default(table, this.config.options, options, callback);
  }
  /**
   * Execute a [[BulkLoad]].
   *
   * ```js
   * // We want to perform a bulk load into a table with the following format:
   * // CREATE TABLE employees (first_name nvarchar(255), last_name nvarchar(255), day_of_birth date);
   *
   * const bulkLoad = connection.newBulkLoad('employees', (err, rowCount) => {
   *   // ...
   * });
   *
   * // First, we need to specify the columns that we want to write to,
   * // and their definitions. These definitions must match the actual table,
   * // otherwise the bulk load will fail.
   * bulkLoad.addColumn('first_name', TYPES.NVarchar, { nullable: false });
   * bulkLoad.addColumn('last_name', TYPES.NVarchar, { nullable: false });
   * bulkLoad.addColumn('date_of_birth', TYPES.Date, { nullable: false });
   *
   * // Now, we can specify each row to be written.
   * //
   * // Note that these rows are held in memory until the
   * // bulk load was performed, so if you need to write a large
   * // number of rows (e.g. by reading from a CSV file),
   * // using a streaming bulk load is advisable to keep memory usage low.
   * bulkLoad.addRow({ 'first_name': 'Steve', 'last_name': 'Jobs', 'day_of_birth': new Date('02-24-1955') });
   * bulkLoad.addRow({ 'first_name': 'Bill', 'last_name': 'Gates', 'day_of_birth': new Date('10-28-1955') });
   *
   * connection.execBulkLoad(bulkLoad);
   * ```
   *
   * @param bulkLoad A previously created [[BulkLoad]].
   *
   * @deprecated Adding rows to a [[BulkLoad]] via [[BulkLoad.addRow]] or [[BulkLoad.getRowStream]]
   *   is deprecated and will be removed in the future. You should migrate to calling [[Connection.execBulkLoad]]
   *   with a `Iterable` or `AsyncIterable` as the second argument instead.
   */


  execBulkLoad(bulkLoad, rows) {
    bulkLoad.executionStarted = true;

    if (rows) {
      if (bulkLoad.streamingMode) {
        throw new Error("Connection.execBulkLoad can't be called with a BulkLoad that was put in streaming mode.");
      }

      if (bulkLoad.firstRowWritten) {
        throw new Error("Connection.execBulkLoad can't be called with a BulkLoad that already has rows written to it.");
      }

      const rowStream = _stream.Readable.from(rows); // Destroy the packet transform if an error happens in the row stream,
      // e.g. if an error is thrown from within a generator or stream.


      rowStream.on('error', err => {
        bulkLoad.rowToPacketTransform.destroy(err);
      }); // Destroy the row stream if an error happens in the packet transform,
      // e.g. if the bulk load is cancelled.

      bulkLoad.rowToPacketTransform.on('error', err => {
        rowStream.destroy(err);
      });
      rowStream.pipe(bulkLoad.rowToPacketTransform);
    } else if (!bulkLoad.streamingMode) {
      // If the bulkload was not put into streaming mode by the user,
      // we end the rowToPacketTransform here for them.
      //
      // If it was put into streaming mode, it's the user's responsibility
      // to end the stream.
      bulkLoad.rowToPacketTransform.end();
    }

    const onCancel = () => {
      request.cancel();
    };

    const payload = new _bulkLoadPayload.BulkLoadPayload(bulkLoad);
    const request = new _request.default(bulkLoad.getBulkInsertSql(), error => {
      bulkLoad.removeListener('cancel', onCancel);

      if (error) {
        if (error.code === 'UNKNOWN') {
          error.message += ' This is likely because the schema of the BulkLoad does not match the schema of the table you are attempting to insert into.';
        }

        bulkLoad.error = error;
        bulkLoad.callback(error);
        return;
      }

      this.makeRequest(bulkLoad, _packet.TYPE.BULK_LOAD, payload);
    });
    bulkLoad.once('cancel', onCancel);
    this.execSqlBatch(request);
  }
  /**
   * Prepare the SQL represented by the request.
   *
   * The request can then be used in subsequent calls to
   * [[execute]] and [[unprepare]]
   *
   * @param request A [[Request]] object representing the request.
   *   Parameters only require a name and type. Parameter values are ignored.
   */


  prepare(request) {
    const parameters = [];
    parameters.push({
      type: _dataType.TYPES.Int,
      name: 'handle',
      value: undefined,
      output: true,
      length: undefined,
      precision: undefined,
      scale: undefined
    });
    parameters.push({
      type: _dataType.TYPES.NVarChar,
      name: 'params',
      value: request.parameters.length ? request.makeParamsParameter(request.parameters) : null,
      output: false,
      length: undefined,
      precision: undefined,
      scale: undefined
    });
    parameters.push({
      type: _dataType.TYPES.NVarChar,
      name: 'stmt',
      value: request.sqlTextOrProcedure,
      output: false,
      length: undefined,
      precision: undefined,
      scale: undefined
    });
    request.preparing = true; // TODO: We need to clean up this event handler, otherwise this leaks memory

    request.on('returnValue', (name, value) => {
      if (name === 'handle') {
        request.handle = value;
      } else {
        request.error = (0, _errors.RequestError)(`Tedious > Unexpected output parameter ${name} from sp_prepare`);
      }
    });
    this.makeRequest(request, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default('sp_prepare', parameters, this.currentTransactionDescriptor(), this.config.options));
  }
  /**
   * Release the SQL Server resources associated with a previously prepared request.
   *
   * @param request A [[Request]] object representing the request.
   *   Parameters only require a name and type.
   *   Parameter values are ignored.
   */


  unprepare(request) {
    const parameters = [];
    parameters.push({
      type: _dataType.TYPES.Int,
      name: 'handle',
      // TODO: Abort if `request.handle` is not set
      value: request.handle,
      output: true,
      length: undefined,
      precision: undefined,
      scale: undefined
    });
    this.makeRequest(request, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default('sp_unprepare', parameters, this.currentTransactionDescriptor(), this.config.options));
  }
  /**
   * Execute previously prepared SQL, using the supplied parameters.
   *
   * @param request A previously prepared [[Request]].
   * @param parameters  An object whose names correspond to the names of
   *   parameters that were added to the [[Request]] before it was prepared.
   *   The object's values are passed as the parameters' values when the
   *   request is executed.
   */


  execute(request, parameters) {
    const executeParameters = [];
    executeParameters.push({
      type: _dataType.TYPES.Int,
      name: 'handle',
      // TODO: Abort if `request.handle` is not set
      value: request.handle,
      output: true,
      length: undefined,
      precision: undefined,
      scale: undefined
    });

    try {
      for (let i = 0, len = request.parameters.length; i < len; i++) {
        const parameter = request.parameters[i];
        executeParameters.push({ ...parameter,
          value: parameter.type.validate(parameters ? parameters[parameter.name] : null)
        });
      }
    } catch (error) {
      request.error = error;
      process.nextTick(() => {
        this.debug.log(error.message);
        request.callback(error);
      });
      return;
    }

    this.makeRequest(request, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default('sp_execute', executeParameters, this.currentTransactionDescriptor(), this.config.options));
  }
  /**
   * Call a stored procedure represented by [[Request]].
   *
   * @param request A [[Request]] object representing the request.
   */


  callProcedure(request) {
    try {
      request.validateParameters();
    } catch (error) {
      request.error = error;
      process.nextTick(() => {
        this.debug.log(error.message);
        request.callback(error);
      });
      return;
    }

    this.makeRequest(request, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default(request.sqlTextOrProcedure, request.parameters, this.currentTransactionDescriptor(), this.config.options));
  }
  /**
   * Start a transaction.
   *
   * @param callback
   * @param name A string representing a name to associate with the transaction.
   *   Optional, and defaults to an empty string. Required when `isolationLevel`
   *   is present.
   * @param isolationLevel The isolation level that the transaction is to be run with.
   *
   *   The isolation levels are available from `require('tedious').ISOLATION_LEVEL`.
   *   * `READ_UNCOMMITTED`
   *   * `READ_COMMITTED`
   *   * `REPEATABLE_READ`
   *   * `SERIALIZABLE`
   *   * `SNAPSHOT`
   *
   *   Optional, and defaults to the Connection's isolation level.
   */


  beginTransaction(callback, name = '', isolationLevel = this.config.options.isolationLevel) {
    (0, _transaction.assertValidIsolationLevel)(isolationLevel, 'isolationLevel');
    const transaction = new _transaction.Transaction(name, isolationLevel);

    if (this.config.options.tdsVersion < '7_2') {
      return this.execSqlBatch(new _request.default('SET TRANSACTION ISOLATION LEVEL ' + transaction.isolationLevelToTSQL() + ';BEGIN TRAN ' + transaction.name, err => {
        this.transactionDepth++;

        if (this.transactionDepth === 1) {
          this.inTransaction = true;
        }

        callback(err);
      }));
    }

    const request = new _request.default(undefined, err => {
      return callback(err, this.currentTransactionDescriptor());
    });
    return this.makeRequest(request, _packet.TYPE.TRANSACTION_MANAGER, transaction.beginPayload(this.currentTransactionDescriptor()));
  }
  /**
   * Commit a transaction.
   *
   * There should be an active transaction - that is, [[beginTransaction]]
   * should have been previously called.
   *
   * @param callback
   * @param name A string representing a name to associate with the transaction.
   *   Optional, and defaults to an empty string. Required when `isolationLevel`is present.
   */


  commitTransaction(callback, name = '') {
    const transaction = new _transaction.Transaction(name);

    if (this.config.options.tdsVersion < '7_2') {
      return this.execSqlBatch(new _request.default('COMMIT TRAN ' + transaction.name, err => {
        this.transactionDepth--;

        if (this.transactionDepth === 0) {
          this.inTransaction = false;
        }

        callback(err);
      }));
    }

    const request = new _request.default(undefined, callback);
    return this.makeRequest(request, _packet.TYPE.TRANSACTION_MANAGER, transaction.commitPayload(this.currentTransactionDescriptor()));
  }
  /**
   * Rollback a transaction.
   *
   * There should be an active transaction - that is, [[beginTransaction]]
   * should have been previously called.
   *
   * @param callback
   * @param name A string representing a name to associate with the transaction.
   *   Optional, and defaults to an empty string.
   *   Required when `isolationLevel` is present.
   */


  rollbackTransaction(callback, name = '') {
    const transaction = new _transaction.Transaction(name);

    if (this.config.options.tdsVersion < '7_2') {
      return this.execSqlBatch(new _request.default('ROLLBACK TRAN ' + transaction.name, err => {
        this.transactionDepth--;

        if (this.transactionDepth === 0) {
          this.inTransaction = false;
        }

        callback(err);
      }));
    }

    const request = new _request.default(undefined, callback);
    return this.makeRequest(request, _packet.TYPE.TRANSACTION_MANAGER, transaction.rollbackPayload(this.currentTransactionDescriptor()));
  }
  /**
   * Set a savepoint within a transaction.
   *
   * There should be an active transaction - that is, [[beginTransaction]]
   * should have been previously called.
   *
   * @param callback
   * @param name A string representing a name to associate with the transaction.\
   *   Optional, and defaults to an empty string.
   *   Required when `isolationLevel` is present.
   */


  saveTransaction(callback, name) {
    const transaction = new _transaction.Transaction(name);

    if (this.config.options.tdsVersion < '7_2') {
      return this.execSqlBatch(new _request.default('SAVE TRAN ' + transaction.name, err => {
        this.transactionDepth++;
        callback(err);
      }));
    }

    const request = new _request.default(undefined, callback);
    return this.makeRequest(request, _packet.TYPE.TRANSACTION_MANAGER, transaction.savePayload(this.currentTransactionDescriptor()));
  }
  /**
   * Run the given callback after starting a transaction, and commit or
   * rollback the transaction afterwards.
   *
   * This is a helper that employs [[beginTransaction]], [[commitTransaction]],
   * [[rollbackTransaction]], and [[saveTransaction]] to greatly simplify the
   * use of database transactions and automatically handle transaction nesting.
   *
   * @param cb
   * @param isolationLevel
   *   The isolation level that the transaction is to be run with.
   *
   *   The isolation levels are available from `require('tedious').ISOLATION_LEVEL`.
   *   * `READ_UNCOMMITTED`
   *   * `READ_COMMITTED`
   *   * `REPEATABLE_READ`
   *   * `SERIALIZABLE`
   *   * `SNAPSHOT`
   *
   *   Optional, and defaults to the Connection's isolation level.
   */


  transaction(cb, isolationLevel) {
    if (typeof cb !== 'function') {
      throw new TypeError('`cb` must be a function');
    }

    const useSavepoint = this.inTransaction;

    const name = '_tedious_' + _crypto.default.randomBytes(10).toString('hex');

    const txDone = (err, done, ...args) => {
      if (err) {
        if (this.inTransaction && this.state === this.STATE.LOGGED_IN) {
          this.rollbackTransaction(txErr => {
            done(txErr || err, ...args);
          }, name);
        } else {
          done(err, ...args);
        }
      } else if (useSavepoint) {
        if (this.config.options.tdsVersion < '7_2') {
          this.transactionDepth--;
        }

        done(null, ...args);
      } else {
        this.commitTransaction(txErr => {
          done(txErr, ...args);
        }, name);
      }
    };

    if (useSavepoint) {
      return this.saveTransaction(err => {
        if (err) {
          return cb(err);
        }

        if (isolationLevel) {
          return this.execSqlBatch(new _request.default('SET transaction isolation level ' + this.getIsolationLevelText(isolationLevel), err => {
            return cb(err, txDone);
          }));
        } else {
          return cb(null, txDone);
        }
      }, name);
    } else {
      return this.beginTransaction(err => {
        if (err) {
          return cb(err);
        }

        return cb(null, txDone);
      }, name, isolationLevel);
    }
  }
  /**
   * @private
   */


  makeRequest(request, packetType, payload) {
    if (this.state !== this.STATE.LOGGED_IN) {
      const message = 'Requests can only be made in the ' + this.STATE.LOGGED_IN.name + ' state, not the ' + this.state.name + ' state';
      this.debug.log(message);
      request.callback((0, _errors.RequestError)(message, 'EINVALIDSTATE'));
    } else if (request.canceled) {
      process.nextTick(() => {
        request.callback((0, _errors.RequestError)('Canceled.', 'ECANCEL'));
      });
    } else {
      if (packetType === _packet.TYPE.SQL_BATCH) {
        this.isSqlBatch = true;
      } else {
        this.isSqlBatch = false;
      }

      this.request = request;
      request.connection = this;
      request.rowCount = 0;
      request.rows = [];
      request.rst = [];

      const onCancel = () => {
        payloadStream.unpipe(message); // set the ignore bit and end the message.

        message.ignore = true;
        message.end();

        if (request instanceof _request.default && request.paused) {
          // resume the request if it was paused so we can read the remaining tokens
          request.resume();
        }
      };

      request.once('cancel', onCancel);
      this.createRequestTimer();
      const message = new _message.default({
        type: packetType,
        resetConnection: this.resetConnectionOnNextRequest
      });
      this.messageIo.outgoingMessageStream.write(message);
      this.transitionTo(this.STATE.SENT_CLIENT_REQUEST);
      message.once('finish', () => {
        request.removeListener('cancel', onCancel);
        request.once('cancel', this._cancelAfterRequestSent);
        this.resetConnectionOnNextRequest = false;
        this.debug.payload(function () {
          return payload.toString('  ');
        });
      });

      const payloadStream = _stream.Readable.from(payload);

      payloadStream.once('error', error => {
        var _request$error;

        payloadStream.unpipe(message); // Only set a request error if no error was set yet.

        (_request$error = request.error) !== null && _request$error !== void 0 ? _request$error : request.error = error;
        payloadStream.unpipe(message);
        message.ignore = true;
        message.end();
      });
      payloadStream.pipe(message);
    }
  }
  /**
   * Cancel currently executed request.
   */


  cancel() {
    if (!this.request) {
      return false;
    }

    if (this.request.canceled) {
      return false;
    }

    this.request.cancel();
    return true;
  }
  /**
   * Reset the connection to its initial state.
   * Can be useful for connection pool implementations.
   *
   * @param callback
   */


  reset(callback) {
    const request = new _request.default(this.getInitialSql(), err => {
      if (this.config.options.tdsVersion < '7_2') {
        this.inTransaction = false;
      }

      callback(err);
    });
    this.resetConnectionOnNextRequest = true;
    this.execSqlBatch(request);
  }
  /**
   * @private
   */


  currentTransactionDescriptor() {
    return this.transactionDescriptors[this.transactionDescriptors.length - 1];
  }
  /**
   * @private
   */


  getIsolationLevelText(isolationLevel) {
    switch (isolationLevel) {
      case _transaction.ISOLATION_LEVEL.READ_UNCOMMITTED:
        return 'read uncommitted';

      case _transaction.ISOLATION_LEVEL.REPEATABLE_READ:
        return 'repeatable read';

      case _transaction.ISOLATION_LEVEL.SERIALIZABLE:
        return 'serializable';

      case _transaction.ISOLATION_LEVEL.SNAPSHOT:
        return 'snapshot';

      default:
        return 'read committed';
    }
  }

}

var _default = Connection;
exports.default = _default;
module.exports = Connection;
const authenticationCache = new _adalNode.MemoryCache();
Connection.prototype.STATE = {
  INITIALIZED: {
    name: 'Initialized',
    events: {}
  },
  CONNECTING: {
    name: 'Connecting',
    enter: function () {
      this.initialiseConnection();
    },
    events: {
      socketError: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      socketConnect: function () {
        this.sendPreLogin();
        this.transitionTo(this.STATE.SENT_PRELOGIN);
      }
    }
  },
  SENT_PRELOGIN: {
    name: 'SentPrelogin',
    enter: function () {
      this.emptyMessageBuffer();
    },
    events: {
      socketError: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      message: function (message) {
        message.on('data', data => {
          this.addToMessageBuffer(data);
        });
        message.once('end', () => {
          const preloginPayload = new _preloginPayload.default(this.messageBuffer);
          this.debug.payload(function () {
            return preloginPayload.toString('  ');
          });

          if (preloginPayload.fedAuthRequired === 1) {
            this.fedAuthRequired = true;
          }

          if (preloginPayload.encryptionString === 'ON' || preloginPayload.encryptionString === 'REQ') {
            var _this$routingData$ser, _this$routingData;

            if (!this.config.options.encrypt) {
              this.emit('connect', (0, _errors.ConnectionError)("Server requires encryption, set 'encrypt' config option to true.", 'EENCRYPT'));
              return this.close();
            }

            this.messageIo.startTls(this.secureContext, (_this$routingData$ser = (_this$routingData = this.routingData) === null || _this$routingData === void 0 ? void 0 : _this$routingData.server) !== null && _this$routingData$ser !== void 0 ? _this$routingData$ser : this.config.server, this.config.options.trustServerCertificate);
            this.transitionTo(this.STATE.SENT_TLSSSLNEGOTIATION);
          } else {
            this.sendLogin7Packet();
            const {
              authentication
            } = this.config;

            if (authentication.type === 'ntlm') {
              this.transitionTo(this.STATE.SENT_LOGIN7_WITH_NTLM);
            } else {
              this.transitionTo(this.STATE.SENT_LOGIN7_WITH_STANDARD_LOGIN);
            }
          }
        });
      }
    }
  },
  REROUTING: {
    name: 'ReRouting',
    enter: function () {
      this.cleanupConnection(CLEANUP_TYPE.REDIRECT);
    },
    events: {
      message: function () {},
      socketError: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      reconnect: function () {
        this.transitionTo(this.STATE.CONNECTING);
      }
    }
  },
  TRANSIENT_FAILURE_RETRY: {
    name: 'TRANSIENT_FAILURE_RETRY',
    enter: function () {
      this.curTransientRetryCount++;
      this.cleanupConnection(CLEANUP_TYPE.RETRY);
    },
    events: {
      message: function () {},
      socketError: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      retry: function () {
        this.createRetryTimer();
      }
    }
  },
  SENT_TLSSSLNEGOTIATION: {
    name: 'SentTLSSSLNegotiation',
    events: {
      socketError: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      message: function (message) {
        message.on('data', data => {
          this.messageIo.tlsHandshakeData(data);
        });
        message.once('end', () => {
          if (this.messageIo.tlsNegotiationComplete) {
            this.sendLogin7Packet();
            const {
              authentication
            } = this.config;

            if (authentication.type === 'azure-active-directory-password' || authentication.type === 'azure-active-directory-msi-vm' || authentication.type === 'azure-active-directory-msi-app-service' || authentication.type === 'azure-active-directory-service-principal-secret') {
              this.transitionTo(this.STATE.SENT_LOGIN7_WITH_FEDAUTH);
            } else if (authentication.type === 'ntlm') {
              this.transitionTo(this.STATE.SENT_LOGIN7_WITH_NTLM);
            } else {
              this.transitionTo(this.STATE.SENT_LOGIN7_WITH_STANDARD_LOGIN);
            }
          }
        });
      }
    }
  },
  SENT_LOGIN7_WITH_STANDARD_LOGIN: {
    name: 'SentLogin7WithStandardLogin',
    events: {
      socketError: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      featureExtAck: function (token) {
        const {
          authentication
        } = this.config;

        if (authentication.type === 'azure-active-directory-password' || authentication.type === 'azure-active-directory-access-token' || authentication.type === 'azure-active-directory-msi-vm' || authentication.type === 'azure-active-directory-msi-app-service' || authentication.type === 'azure-active-directory-service-principal-secret') {
          if (token.fedAuth === undefined) {
            this.loginError = (0, _errors.ConnectionError)('Did not receive Active Directory authentication acknowledgement');
            this.loggedIn = false;
          } else if (token.fedAuth.length !== 0) {
            this.loginError = (0, _errors.ConnectionError)(`Active Directory authentication acknowledgment for ${authentication.type} authentication method includes extra data`);
            this.loggedIn = false;
          }
        } else if (token.fedAuth === undefined) {
          this.loginError = (0, _errors.ConnectionError)('Received acknowledgement for unknown feature');
          this.loggedIn = false;
        } else {
          this.loginError = (0, _errors.ConnectionError)('Did not request Active Directory authentication, but received the acknowledgment');
          this.loggedIn = false;
        }
      },
      message: function (message) {
        const tokenStreamParser = this.createTokenStreamParser(message);
        tokenStreamParser.once('end', () => {
          if (this.loggedIn) {
            if (this.routingData) {
              this.transitionTo(this.STATE.REROUTING);
            } else {
              this.transitionTo(this.STATE.LOGGED_IN_SENDING_INITIAL_SQL);
            }
          } else if (this.loginError) {
            if (this.loginError.isTransient) {
              this.debug.log('Initiating retry on transient error');
              this.transitionTo(this.STATE.TRANSIENT_FAILURE_RETRY);
            } else {
              this.emit('connect', this.loginError);
              this.transitionTo(this.STATE.FINAL);
            }
          } else {
            this.emit('connect', (0, _errors.ConnectionError)('Login failed.', 'ELOGIN'));
            this.transitionTo(this.STATE.FINAL);
          }
        });
      }
    }
  },
  SENT_LOGIN7_WITH_NTLM: {
    name: 'SentLogin7WithNTLMLogin',
    events: {
      socketError: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      message: function (message) {
        const tokenStreamParser = this.createTokenStreamParser(message);
        tokenStreamParser.once('end', () => {
          if (this.ntlmpacket) {
            const authentication = this.config.authentication;
            const payload = new _ntlmPayload.default({
              domain: authentication.options.domain,
              userName: authentication.options.userName,
              password: authentication.options.password,
              ntlmpacket: this.ntlmpacket
            });
            this.messageIo.sendMessage(_packet.TYPE.NTLMAUTH_PKT, payload.data);
            this.debug.payload(function () {
              return payload.toString('  ');
            });
            this.ntlmpacket = undefined;
          } else if (this.loggedIn) {
            if (this.routingData) {
              this.transitionTo(this.STATE.REROUTING);
            } else {
              this.transitionTo(this.STATE.LOGGED_IN_SENDING_INITIAL_SQL);
            }
          } else if (this.loginError) {
            if (this.loginError.isTransient) {
              this.debug.log('Initiating retry on transient error');
              this.transitionTo(this.STATE.TRANSIENT_FAILURE_RETRY);
            } else {
              this.emit('connect', this.loginError);
              this.transitionTo(this.STATE.FINAL);
            }
          } else {
            this.emit('connect', (0, _errors.ConnectionError)('Login failed.', 'ELOGIN'));
            this.transitionTo(this.STATE.FINAL);
          }
        });
      }
    }
  },
  SENT_LOGIN7_WITH_FEDAUTH: {
    name: 'SentLogin7Withfedauth',
    events: {
      socketError: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      fedAuthInfo: function (token) {
        this.fedAuthInfoToken = token;
      },
      message: function (message) {
        const tokenStreamParser = this.createTokenStreamParser(message);
        tokenStreamParser.once('end', () => {
          if (this.loggedIn) {
            if (this.routingData) {
              this.transitionTo(this.STATE.REROUTING);
            } else {
              this.transitionTo(this.STATE.LOGGED_IN_SENDING_INITIAL_SQL);
            }

            return;
          }

          const fedAuthInfoToken = this.fedAuthInfoToken;

          if (fedAuthInfoToken && fedAuthInfoToken.stsurl && fedAuthInfoToken.spn) {
            const authentication = this.config.authentication;

            const getToken = callback => {
              const getTokenFromCredentials = (err, credentials) => {
                if (err) {
                  return callback(err);
                }

                credentials.getToken().then(tokenResponse => {
                  callback(null, tokenResponse.accessToken);
                }, callback);
              };

              if (authentication.type === 'azure-active-directory-password') {
                var _authentication$optio;

                const credentials = new _msRestNodeauth.UserTokenCredentials('7f98cb04-cd1e-40df-9140-3bf7e2cea4db', (_authentication$optio = authentication.options.domain) !== null && _authentication$optio !== void 0 ? _authentication$optio : 'common', authentication.options.userName, authentication.options.password, fedAuthInfoToken.spn, undefined, // environment
                authenticationCache);
                getTokenFromCredentials(undefined, credentials);
              } else if (authentication.type === 'azure-active-directory-msi-vm') {
                (0, _msRestNodeauth.loginWithVmMSI)({
                  clientId: authentication.options.clientId,
                  msiEndpoint: authentication.options.msiEndpoint,
                  resource: fedAuthInfoToken.spn
                }, getTokenFromCredentials);
              } else if (authentication.type === 'azure-active-directory-msi-app-service') {
                (0, _msRestNodeauth.loginWithAppServiceMSI)({
                  msiEndpoint: authentication.options.msiEndpoint,
                  msiSecret: authentication.options.msiSecret,
                  resource: fedAuthInfoToken.spn,
                  clientId: authentication.options.clientId
                }, getTokenFromCredentials);
              } else if (authentication.type === 'azure-active-directory-service-principal-secret') {
                const credentials = new _msRestNodeauth.ApplicationTokenCredentials(authentication.options.clientId, authentication.options.tenantId, // domain
                authentication.options.clientSecret, fedAuthInfoToken.spn, undefined, // environment
                authenticationCache);
                getTokenFromCredentials(undefined, credentials);
              }
            };

            getToken((err, token) => {
              if (err) {
                this.loginError = (0, _errors.ConnectionError)('Security token could not be authenticated or authorized.', 'EFEDAUTH');
                this.emit('connect', this.loginError);
                this.transitionTo(this.STATE.FINAL);
                return;
              }

              this.sendFedAuthTokenMessage(token);
            });
          } else if (this.loginError) {
            if (this.loginError.isTransient) {
              this.debug.log('Initiating retry on transient error');
              this.transitionTo(this.STATE.TRANSIENT_FAILURE_RETRY);
            } else {
              this.emit('connect', this.loginError);
              this.transitionTo(this.STATE.FINAL);
            }
          } else {
            this.emit('connect', (0, _errors.ConnectionError)('Login failed.', 'ELOGIN'));
            this.transitionTo(this.STATE.FINAL);
          }
        });
      }
    }
  },
  LOGGED_IN_SENDING_INITIAL_SQL: {
    name: 'LoggedInSendingInitialSql',
    enter: function () {
      this.sendInitialSql();
    },
    events: {
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function () {
        this.transitionTo(this.STATE.FINAL);
      },
      message: function (message) {
        const tokenStreamParser = this.createTokenStreamParser(message);
        tokenStreamParser.once('end', () => {
          this.transitionTo(this.STATE.LOGGED_IN);
          this.processedInitialSql();
        });
      }
    }
  },
  LOGGED_IN: {
    name: 'LoggedIn',
    events: {
      socketError: function () {
        this.transitionTo(this.STATE.FINAL);
      }
    }
  },
  SENT_CLIENT_REQUEST: {
    name: 'SentClientRequest',
    exit: function (nextState) {
      this.clearRequestTimer();
    },
    events: {
      socketError: function (err) {
        const sqlRequest = this.request;
        this.request = undefined;
        this.transitionTo(this.STATE.FINAL);
        sqlRequest.callback(err);
      },
      message: function (message) {
        var _this$request2, _this$request9;

        // request timer is stopped on first data package
        this.clearRequestTimer();
        const tokenStreamParser = this.createTokenStreamParser(message);

        const onResume = () => {
          tokenStreamParser.resume();
        };

        const onPause = () => {
          var _this$request;

          tokenStreamParser.pause();
          (_this$request = this.request) === null || _this$request === void 0 ? void 0 : _this$request.once('resume', onResume);
        };

        (_this$request2 = this.request) === null || _this$request2 === void 0 ? void 0 : _this$request2.on('pause', onPause);

        if (this.request instanceof _request.default && this.request.paused) {
          onPause();
        }

        const onCancel = () => {
          var _this$request3, _this$request4;

          tokenStreamParser.removeListener('end', onEndOfMessage);

          if (this.request instanceof _request.default && this.request.paused) {
            // resume the request if it was paused so we can read the remaining tokens
            this.request.resume();
          }

          (_this$request3 = this.request) === null || _this$request3 === void 0 ? void 0 : _this$request3.removeListener('pause', onPause);
          (_this$request4 = this.request) === null || _this$request4 === void 0 ? void 0 : _this$request4.removeListener('resume', onResume);
        };

        const onEndOfMessage = () => {
          var _this$request5, _this$request6, _this$request7, _this$request8;

          (_this$request5 = this.request) === null || _this$request5 === void 0 ? void 0 : _this$request5.removeListener('cancel', this._cancelAfterRequestSent);
          (_this$request6 = this.request) === null || _this$request6 === void 0 ? void 0 : _this$request6.removeListener('cancel', onCancel);
          (_this$request7 = this.request) === null || _this$request7 === void 0 ? void 0 : _this$request7.removeListener('pause', onPause);
          (_this$request8 = this.request) === null || _this$request8 === void 0 ? void 0 : _this$request8.removeListener('resume', onResume);
          this.transitionTo(this.STATE.LOGGED_IN);
          const sqlRequest = this.request;
          this.request = undefined;

          if (this.config.options.tdsVersion < '7_2' && sqlRequest.error && this.isSqlBatch) {
            this.inTransaction = false;
          }

          sqlRequest.callback(sqlRequest.error, sqlRequest.rowCount, sqlRequest.rows);
        };

        tokenStreamParser.once('end', onEndOfMessage);
        (_this$request9 = this.request) === null || _this$request9 === void 0 ? void 0 : _this$request9.once('cancel', onCancel);
      }
    }
  },
  SENT_ATTENTION: {
    name: 'SentAttention',
    enter: function () {
      this.attentionReceived = false;
    },
    events: {
      socketError: function (err) {
        const sqlRequest = this.request;
        this.request = undefined;
        this.transitionTo(this.STATE.FINAL);
        sqlRequest.callback(err);
      },
      attention: function () {
        this.attentionReceived = true;
      },
      message: function (message) {
        const tokenStreamParser = this.createTokenStreamParser(message);
        tokenStreamParser.once('end', () => {
          // 3.2.5.7 Sent Attention State
          // Discard any data contained in the response, until we receive the attention response
          if (this.attentionReceived) {
            this.attentionReceived = false;
            this.clearCancelTimer();
            const sqlRequest = this.request;
            this.request = undefined;
            this.transitionTo(this.STATE.LOGGED_IN);

            if (sqlRequest.error && sqlRequest.error instanceof _errors.RequestError && sqlRequest.error.code === 'ETIMEOUT') {
              sqlRequest.callback(sqlRequest.error);
            } else {
              sqlRequest.callback((0, _errors.RequestError)('Canceled.', 'ECANCEL'));
            }
          }
        });
      }
    }
  },
  FINAL: {
    name: 'Final',
    enter: function () {
      this.cleanupConnection(CLEANUP_TYPE.NORMAL);
    },
    events: {
      loginFailed: function () {// Do nothing. The connection was probably closed by the client code.
      },
      connectTimeout: function () {// Do nothing, as the timer should be cleaned up.
      },
      message: function () {// Do nothing
      },
      socketError: function () {// Do nothing
      }
    }
  }
};