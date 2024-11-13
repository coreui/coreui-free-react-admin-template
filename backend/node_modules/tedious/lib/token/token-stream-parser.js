"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;

var _events = require("events");

var _streamParser = _interopRequireDefault(require("./stream-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Buffers are thrown at the parser (by calling addBuffer).
  Tokens are parsed from the buffer until there are no more tokens in
  the buffer, or there is just a partial token left.
  If there is a partial token left over, then it is kept until another
  buffer is added, which should contain the remainder of the partial
  token, along with (perhaps) more tokens.
  The partial token and the new buffer are concatenated, and the token
  parsing resumes.
 */
class Parser extends _events.EventEmitter {
  constructor(debug, options) {
    super();
    this.debug = void 0;
    this.options = void 0;
    this.parser = void 0;
    this.debug = debug;
    this.options = options;
    this.parser = new _streamParser.default(this.debug, this.options);
    this.parser.on('data', token => {
      if (token.event) {
        this.emit(token.event, token);
      }
    });
    this.parser.on('drain', () => {
      this.emit('drain');
    });
  }

  // Returns false to apply backpressure.
  addBuffer(buffer) {
    return this.parser.write(buffer);
  } // Writes an end-of-message (EOM) marker into the parser transform input
  // queue. StreamParser will emit a 'data' event with an 'endOfMessage'
  // pseudo token when the EOM marker has passed through the transform stream.
  // Returns false to apply backpressure.


  addEndOfMessageMarker() {
    return this.parser.write(this.parser.endOfMessageMarker);
  }

  isEnd() {
    return this.parser.buffer.length === this.parser.position;
  } // Temporarily suspends the token stream parser transform from emitting events.


  pause() {
    this.parser.pause();
  } // Resumes the token stream parser transform.


  resume() {
    this.parser.resume();
  }

}

exports.Parser = Parser;