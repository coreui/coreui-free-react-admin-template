"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;

var _events = require("events");

var _streamParser = _interopRequireDefault(require("./stream-parser"));

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Parser extends _events.EventEmitter {
  constructor(message, debug, options) {
    super();
    this.debug = void 0;
    this.options = void 0;
    this.parser = void 0;
    this.debug = debug;
    this.options = options;
    this.parser = _stream.Readable.from(_streamParser.default.parseTokens(message, this.debug, this.options));
    this.parser.on('data', token => {
      if (token.event) {
        this.emit(token.event, token);
      }
    });
    this.parser.on('drain', () => {
      this.emit('drain');
    });
    this.parser.on('end', () => {
      this.emit('end');
    });
  }

  pause() {
    return this.parser.pause();
  }

  resume() {
    return this.parser.resume();
  }

}

exports.Parser = Parser;