"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Null = {
  id: 0x1F,
  type: 'NULL',
  name: 'Null',

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
var _default = Null;
exports.default = _default;
module.exports = Null;