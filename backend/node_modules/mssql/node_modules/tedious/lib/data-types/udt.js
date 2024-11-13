"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const UDT = {
  id: 0xF0,
  type: 'UDTTYPE',
  name: 'UDT',

  declaration() {
    throw new Error('not implemented');
  },

  generateTypeInfo() {
    throw new Error('not implemented');
  },

  generateParameterLength() {
    throw new Error('not implemented');
  },

  generateParameterData() {
    throw new Error('not implemented');
  },

  validate() {
    throw new Error('not implemented');
  }

};
var _default = UDT;
exports.default = _default;
module.exports = UDT;