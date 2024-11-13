"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connector = exports.SequentialConnectionStrategy = exports.ParallelConnectionStrategy = void 0;

var _net = _interopRequireDefault(require("net"));

var _dns = _interopRequireDefault(require("dns"));

var punycode = _interopRequireWildcard(require("punycode"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AbortError extends Error {
  constructor() {
    super('The operation was aborted');
    this.code = void 0;
    this.code = 'ABORT_ERR';
    this.name = 'AbortError';
  }

}

class ParallelConnectionStrategy {
  constructor(addresses, signal, options) {
    this.addresses = void 0;
    this.options = void 0;
    this.signal = void 0;
    this.addresses = addresses;
    this.options = options;
    this.signal = signal;
  }

  connect(callback) {
    const signal = this.signal;

    if (signal.aborted) {
      return process.nextTick(callback, new AbortError());
    }

    const addresses = this.addresses;
    const sockets = new Array(addresses.length);
    let errorCount = 0;

    function onError(_err) {
      errorCount += 1;
      this.removeListener('error', onError);
      this.removeListener('connect', onConnect);
      this.destroy();

      if (errorCount === addresses.length) {
        signal.removeEventListener('abort', onAbort);
        callback(new Error('Could not connect (parallel)'));
      }
    }

    function onConnect() {
      signal.removeEventListener('abort', onAbort);

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

    const onAbort = () => {
      for (let j = 0; j < sockets.length; j++) {
        const socket = sockets[j];
        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);
        socket.destroy();
      }

      callback(new AbortError());
    };

    for (let i = 0, len = addresses.length; i < len; i++) {
      const socket = sockets[i] = _net.default.connect({ ...this.options,
        host: addresses[i].address,
        family: addresses[i].family
      });

      socket.on('error', onError);
      socket.on('connect', onConnect);
    }

    signal.addEventListener('abort', onAbort, {
      once: true
    });
  }

}

exports.ParallelConnectionStrategy = ParallelConnectionStrategy;

class SequentialConnectionStrategy {
  constructor(addresses, signal, options) {
    this.addresses = void 0;
    this.options = void 0;
    this.signal = void 0;
    this.addresses = addresses;
    this.options = options;
    this.signal = signal;
  }

  connect(callback) {
    if (this.signal.aborted) {
      return process.nextTick(callback, new AbortError());
    }

    const next = this.addresses.shift();

    if (!next) {
      return callback(new Error('Could not connect (sequence)'));
    }

    const socket = _net.default.connect({ ...this.options,
      host: next.address,
      family: next.family
    });

    const onAbort = () => {
      socket.removeListener('error', onError);
      socket.removeListener('connect', onConnect);
      socket.destroy();
      callback(new AbortError());
    };

    const onError = _err => {
      this.signal.removeEventListener('abort', onAbort);
      socket.removeListener('error', onError);
      socket.removeListener('connect', onConnect);
      socket.destroy();
      this.connect(callback);
    };

    const onConnect = () => {
      this.signal.removeEventListener('abort', onAbort);
      socket.removeListener('error', onError);
      socket.removeListener('connect', onConnect);
      callback(null, socket);
    };

    this.signal.addEventListener('abort', onAbort, {
      once: true
    });
    socket.on('error', onError);
    socket.on('connect', onConnect);
  }

}

exports.SequentialConnectionStrategy = SequentialConnectionStrategy;

class Connector {
  constructor(options, signal, multiSubnetFailover) {
    var _options$lookup;

    this.options = void 0;
    this.multiSubnetFailover = void 0;
    this.lookup = void 0;
    this.signal = void 0;
    this.options = options;
    this.lookup = (_options$lookup = options.lookup) !== null && _options$lookup !== void 0 ? _options$lookup : _dns.default.lookup;
    this.signal = signal;
    this.multiSubnetFailover = multiSubnetFailover;
  }

  execute(cb) {
    if (this.signal.aborted) {
      return process.nextTick(cb, new AbortError());
    }

    this.lookupAllAddresses(this.options.host, (err, addresses) => {
      if (this.signal.aborted) {
        return cb(new AbortError());
      }

      if (err) {
        return cb(err);
      }

      if (this.multiSubnetFailover) {
        new ParallelConnectionStrategy(addresses, this.signal, this.options).connect(cb);
      } else {
        new SequentialConnectionStrategy(addresses, this.signal, this.options).connect(cb);
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