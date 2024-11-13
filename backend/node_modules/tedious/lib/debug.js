"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Debug extends _events.EventEmitter {
  /*
    @options    Which debug details should be sent.
                data    - dump of packet data
                payload - details of decoded payload
  */
  constructor({
    data = false,
    payload = false,
    packet = false,
    token = false
  } = {}) {
    super();
    this.options = void 0;
    this.indent = void 0;
    this.options = {
      data,
      payload,
      packet,
      token
    };
    this.indent = '  ';
  }

  packet(direction, packet) {
    if (this.haveListeners() && this.options.packet) {
      this.log('');
      this.log(direction);
      this.log(packet.headerToString(this.indent));
    }
  }

  data(packet) {
    if (this.haveListeners() && this.options.data) {
      this.log(packet.dataToString(this.indent));
    }
  }

  payload(generatePayloadText) {
    if (this.haveListeners() && this.options.payload) {
      this.log(generatePayloadText());
    }
  }

  token(token) {
    if (this.haveListeners() && this.options.token) {
      this.log(util.inspect(token, {
        showHidden: false,
        depth: 5,
        colors: true
      }));
    }
  }

  haveListeners() {
    return this.listeners('debug').length > 0;
  }

  log(text) {
    this.emit('debug', text);
  }

}

var _default = Debug;
exports.default = _default;
module.exports = Debug;