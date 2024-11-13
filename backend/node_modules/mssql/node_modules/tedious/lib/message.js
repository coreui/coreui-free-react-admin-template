"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stream = require("stream");

class Message extends _stream.PassThrough {
  constructor({
    type,
    resetConnection = false
  }) {
    super();
    this.type = void 0;
    this.resetConnection = void 0;
    this.ignore = void 0;
    this.type = type;
    this.resetConnection = resetConnection;
    this.ignore = false;
  }

}

var _default = Message;
exports.default = _default;
module.exports = Message;