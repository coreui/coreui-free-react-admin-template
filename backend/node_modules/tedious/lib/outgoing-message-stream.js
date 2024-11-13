"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bl = _interopRequireDefault(require("bl"));

var _readableStream = require("readable-stream");

var _packet = require("./packet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OutgoingMessageStream extends _readableStream.Duplex {
  constructor(debug, {
    packetSize
  }) {
    super({
      writableObjectMode: true
    });
    this.packetSize = void 0;
    this.debug = void 0;
    this.bl = void 0;
    this.currentMessage = void 0;
    this.packetSize = packetSize;
    this.debug = debug;
    this.bl = new _bl.default(); // When the writable side is ended, push `null`
    // to also end the readable side.

    this.on('finish', () => {
      this.push(null);
    });
  }

  _write(message, _encoding, callback) {
    const length = this.packetSize - _packet.HEADER_LENGTH;
    let packetNumber = 0;
    this.currentMessage = message;
    this.currentMessage.on('data', data => {
      if (message.ignore) {
        return;
      }

      this.bl.append(data);

      while (this.bl.length > length) {
        const data = this.bl.slice(0, length);
        this.bl.consume(length); // TODO: Get rid of creating `Packet` instances here.

        const packet = new _packet.Packet(message.type);
        packet.packetId(packetNumber += 1);
        packet.resetConnection(message.resetConnection);
        packet.addData(data);
        this.debug.packet('Sent', packet);
        this.debug.data(packet);

        if (this.push(packet.buffer) === false) {
          message.pause();
        }
      }
    });
    this.currentMessage.on('end', () => {
      const data = this.bl.slice();
      this.bl.consume(data.length); // TODO: Get rid of creating `Packet` instances here.

      const packet = new _packet.Packet(message.type);
      packet.packetId(packetNumber += 1);
      packet.resetConnection(message.resetConnection);
      packet.last(true);
      packet.ignore(message.ignore);
      packet.addData(data);
      this.debug.packet('Sent', packet);
      this.debug.data(packet);
      this.push(packet.buffer);
      this.currentMessage = undefined;
      callback();
    });
  }

  _read(_size) {
    // If we do have a message, resume it and get data flowing.
    // Otherwise, there is nothing to do.
    if (this.currentMessage) {
      this.currentMessage.resume();
    }
  }

}

var _default = OutgoingMessageStream;
exports.default = _default;
module.exports = OutgoingMessageStream;