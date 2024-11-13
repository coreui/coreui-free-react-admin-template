"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bl = _interopRequireDefault(require("bl"));

var _stream = require("stream");

var _message = _interopRequireDefault(require("./message"));

var _packet = require("./packet");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  IncomingMessageStream
  Transform received TDS data into individual IncomingMessage streams.
*/
class IncomingMessageStream extends _stream.Transform {
  constructor(debug) {
    super({
      readableObjectMode: true
    });
    this.debug = void 0;
    this.bl = void 0;
    this.currentMessage = void 0;
    this.debug = debug;
    this.currentMessage = undefined;
    this.bl = new _bl.default();
  }

  pause() {
    super.pause();

    if (this.currentMessage) {
      this.currentMessage.pause();
    }

    return this;
  }

  resume() {
    super.resume();

    if (this.currentMessage) {
      this.currentMessage.resume();
    }

    return this;
  }

  processBufferedData(callback) {
    // The packet header is always 8 bytes of length.
    while (this.bl.length >= _packet.HEADER_LENGTH) {
      // Get the full packet length
      const length = this.bl.readUInt16BE(2);

      if (length < _packet.HEADER_LENGTH) {
        return callback(new _errors.ConnectionError('Unable to process incoming packet'));
      }

      if (this.bl.length >= length) {
        const data = this.bl.slice(0, length);
        this.bl.consume(length); // TODO: Get rid of creating `Packet` instances here.

        const packet = new _packet.Packet(data);
        this.debug.packet('Received', packet);
        this.debug.data(packet);
        let message = this.currentMessage;

        if (message === undefined) {
          this.currentMessage = message = new _message.default({
            type: packet.type(),
            resetConnection: false
          });
          this.push(message);
        }

        if (packet.isLast()) {
          // Wait until the current message was fully processed before we
          // continue processing any remaining messages.
          message.once('end', () => {
            this.currentMessage = undefined;
            this.processBufferedData(callback);
          });
          message.end(packet.data());
          return;
        } else if (!message.write(packet.data())) {
          // If too much data is buffering up in the
          // current message, wait for it to drain.
          message.once('drain', () => {
            this.processBufferedData(callback);
          });
          return;
        }
      } else {
        break;
      }
    } // Not enough data to read the next packet. Stop here and wait for
    // the next call to `_transform`.


    callback();
  }

  _transform(chunk, _encoding, callback) {
    this.bl.append(chunk);
    this.processBufferedData(callback);
  }

}

var _default = IncomingMessageStream;
exports.default = _default;
module.exports = IncomingMessageStream;