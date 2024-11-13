"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sender = exports.ParallelSendStrategy = void 0;

var _dgram = _interopRequireDefault(require("dgram"));

var _net = _interopRequireDefault(require("net"));

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

class ParallelSendStrategy {
  constructor(addresses, port, signal, request) {
    this.addresses = void 0;
    this.port = void 0;
    this.request = void 0;
    this.signal = void 0;
    this.addresses = addresses;
    this.port = port;
    this.request = request;
    this.signal = signal;
  }

  send(cb) {
    const signal = this.signal;

    if (signal.aborted) {
      return cb(new AbortError());
    }

    const sockets = [];
    let errorCount = 0;

    const onError = err => {
      errorCount++;

      if (errorCount === this.addresses.length) {
        signal.removeEventListener('abort', onAbort);
        clearSockets();
        cb(err);
      }
    };

    const onMessage = message => {
      signal.removeEventListener('abort', onAbort);
      clearSockets();
      cb(null, message);
    };

    const onAbort = () => {
      clearSockets();
      cb(new AbortError());
    };

    const clearSockets = () => {
      for (const socket of sockets) {
        socket.removeListener('error', onError);
        socket.removeListener('message', onMessage);
        socket.close();
      }
    };

    signal.addEventListener('abort', onAbort, {
      once: true
    });

    for (let j = 0; j < this.addresses.length; j++) {
      const udpType = this.addresses[j].family === 6 ? 'udp6' : 'udp4';

      const socket = _dgram.default.createSocket(udpType);

      sockets.push(socket);
      socket.on('error', onError);
      socket.on('message', onMessage);
      socket.send(this.request, 0, this.request.length, this.port, this.addresses[j].address);
    }
  }

}

exports.ParallelSendStrategy = ParallelSendStrategy;

class Sender {
  constructor(host, port, lookup, signal, request) {
    this.host = void 0;
    this.port = void 0;
    this.request = void 0;
    this.lookup = void 0;
    this.signal = void 0;
    this.host = host;
    this.port = port;
    this.request = request;
    this.lookup = lookup;
    this.signal = signal;
  }

  execute(cb) {
    if (_net.default.isIP(this.host)) {
      this.executeForIP(cb);
    } else {
      this.executeForHostname(cb);
    }
  }

  executeForIP(cb) {
    this.executeForAddresses([{
      address: this.host,
      family: _net.default.isIPv6(this.host) ? 6 : 4
    }], cb);
  } // Wrapper for stubbing. Sinon does not have support for stubbing module functions.


  invokeLookupAll(host, cb) {
    this.lookup.call(null, punycode.toASCII(host), {
      all: true
    }, cb);
  }

  executeForHostname(cb) {
    this.invokeLookupAll(this.host, (err, addresses) => {
      if (err) {
        return cb(err);
      }

      this.executeForAddresses(addresses, cb);
    });
  }

  executeForAddresses(addresses, cb) {
    const parallelSendStrategy = new ParallelSendStrategy(addresses, this.port, this.signal, this.request);
    parallelSendStrategy.send(cb);
  }

}

exports.Sender = Sender;