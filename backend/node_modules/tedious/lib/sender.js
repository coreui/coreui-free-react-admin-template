"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sender = exports.ParallelSendStrategy = void 0;

var _dgram = _interopRequireDefault(require("dgram"));

var _net = _interopRequireDefault(require("net"));

var punycode = _interopRequireWildcard(require("punycode"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ParallelSendStrategy {
  constructor(addresses, port, request) {
    this.addresses = void 0;
    this.port = void 0;
    this.request = void 0;
    this.socketV4 = void 0;
    this.socketV6 = void 0;
    this.onMessage = void 0;
    this.onError = void 0;
    this.addresses = addresses;
    this.port = port;
    this.request = request;
    this.socketV4 = null;
    this.socketV6 = null;
    this.onError = null;
    this.onMessage = null;
  }

  clearSockets() {
    const clearSocket = (socket, onError, onMessage) => {
      socket.removeListener('error', onError);
      socket.removeListener('message', onMessage);
      socket.close();
    };

    if (this.socketV4) {
      clearSocket(this.socketV4, this.onError, this.onMessage);
      this.socketV4 = null;
    }

    if (this.socketV6) {
      clearSocket(this.socketV6, this.onError, this.onMessage);
      this.socketV6 = null;
    }
  }

  send(cb) {
    let errorCount = 0;

    const onError = err => {
      errorCount++;

      if (errorCount === this.addresses.length) {
        this.clearSockets();
        cb(err);
      }
    };

    const onMessage = message => {
      this.clearSockets();
      cb(null, message);
    };

    const createDgramSocket = (udpType, onError, onMessage) => {
      const socket = _dgram.default.createSocket(udpType);

      socket.on('error', onError);
      socket.on('message', onMessage);
      return socket;
    };

    for (let j = 0; j < this.addresses.length; j++) {
      const udpTypeV4 = 'udp4';
      const udpTypeV6 = 'udp6';
      const udpType = this.addresses[j].family === 6 ? udpTypeV6 : udpTypeV4;
      let socket;

      if (udpType === udpTypeV4) {
        if (!this.socketV4) {
          this.socketV4 = createDgramSocket(udpTypeV4, onError, onMessage);
        }

        socket = this.socketV4;
      } else {
        if (!this.socketV6) {
          this.socketV6 = createDgramSocket(udpTypeV6, onError, onMessage);
        }

        socket = this.socketV6;
      }

      socket.send(this.request, 0, this.request.length, this.port, this.addresses[j].address);
    }

    this.onError = onError;
    this.onMessage = onMessage;
  }

  cancel() {
    this.clearSockets();
  }

}

exports.ParallelSendStrategy = ParallelSendStrategy;

class Sender {
  constructor(host, port, lookup, request) {
    this.host = void 0;
    this.port = void 0;
    this.request = void 0;
    this.parallelSendStrategy = void 0;
    this.lookup = void 0;
    this.host = host;
    this.port = port;
    this.request = request;
    this.lookup = lookup;
    this.parallelSendStrategy = null;
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
  } // Wrapper for stubbing creation of Strategy object. Sinon support for constructors
  // seems limited.


  createParallelSendStrategy(addresses, port, request) {
    return new ParallelSendStrategy(addresses, port, request);
  }

  executeForAddresses(addresses, cb) {
    this.parallelSendStrategy = this.createParallelSendStrategy(addresses, this.port, this.request);
    this.parallelSendStrategy.send(cb);
  }

  cancel() {
    if (this.parallelSendStrategy) {
      this.parallelSendStrategy.cancel();
    }
  }

}

exports.Sender = Sender;