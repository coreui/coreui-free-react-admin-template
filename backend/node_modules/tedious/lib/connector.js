"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connector = exports.SequentialConnectionStrategy = exports.ParallelConnectionStrategy = void 0;

var _net = _interopRequireDefault(require("net"));

var _dns = _interopRequireDefault(require("dns"));

var punycode = _interopRequireWildcard(require("punycode"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ParallelConnectionStrategy {
  constructor(addresses, options) {
    this.addresses = void 0;
    this.options = void 0;
    this.addresses = addresses;
    this.options = options;
  }

  connect(callback) {
    const addresses = this.addresses;
    const sockets = new Array(addresses.length);
    let errorCount = 0;

    function onError(_err) {
      errorCount += 1;
      this.removeListener('error', onError);
      this.removeListener('connect', onConnect);

      if (errorCount === addresses.length) {
        callback(new Error('Could not connect (parallel)'));
      }
    }

    function onConnect() {
      for (let j = 0; j < sockets.length; j++) {
        const socket = sockets[j];

        if (this === socket) {
          continue;
        }

        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);
        socket.destroy();
      }

      callback(null, this);
    }

    for (let i = 0, len = addresses.length; i < len; i++) {
      const socket = sockets[i] = _net.default.connect(_objectSpread(_objectSpread({}, this.options), {}, {
        host: addresses[i].address,
        family: addresses[i].family
      }));

      socket.on('error', onError);
      socket.on('connect', onConnect);
    }
  }

}

exports.ParallelConnectionStrategy = ParallelConnectionStrategy;

class SequentialConnectionStrategy {
  constructor(addresses, options) {
    this.addresses = void 0;
    this.options = void 0;
    this.addresses = addresses;
    this.options = options;
  }

  connect(callback) {
    const next = this.addresses.shift();

    if (!next) {
      return callback(new Error('Could not connect (sequence)'));
    }

    const socket = _net.default.connect(_objectSpread(_objectSpread({}, this.options), {}, {
      host: next.address,
      family: next.family
    }));

    const onError = _err => {
      socket.removeListener('error', onError);
      socket.removeListener('connect', onConnect);
      socket.destroy();
      this.connect(callback);
    };

    const onConnect = () => {
      socket.removeListener('error', onError);
      socket.removeListener('connect', onConnect);
      callback(null, socket);
    };

    socket.on('error', onError);
    socket.on('connect', onConnect);
  }

}

exports.SequentialConnectionStrategy = SequentialConnectionStrategy;

class Connector {
  constructor(options, multiSubnetFailover) {
    var _options$lookup;

    this.options = void 0;
    this.multiSubnetFailover = void 0;
    this.lookup = void 0;
    this.options = options;
    this.lookup = (_options$lookup = options.lookup) !== null && _options$lookup !== void 0 ? _options$lookup : _dns.default.lookup;
    this.multiSubnetFailover = multiSubnetFailover;
  }

  execute(cb) {
    this.lookupAllAddresses(this.options.host, (err, addresses) => {
      if (err) {
        return cb(err);
      }

      if (this.multiSubnetFailover) {
        new ParallelConnectionStrategy(addresses, this.options).connect(cb);
      } else {
        new SequentialConnectionStrategy(addresses, this.options).connect(cb);
      }
    });
  }

  lookupAllAddresses(host, callback) {
    if (_net.default.isIPv6(host)) {
      process.nextTick(callback, null, [{
        address: host,
        family: 6
      }]);
    } else if (_net.default.isIPv4(host)) {
      process.nextTick(callback, null, [{
        address: host,
        family: 4
      }]);
    } else {
      this.lookup.call(null, punycode.toASCII(host), {
        all: true
      }, callback);
    }
  }

}

exports.Connector = Connector;