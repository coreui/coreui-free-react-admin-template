"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _writableTrackingBuffer = _interopRequireDefault(require("./tracking-buffer/writable-tracking-buffer"));

var _allHeaders = require("./all-headers");

let _Symbol$iterator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const OPTION = {
//   WITH_RECOMPILE: 0x01,
//   NO_METADATA: 0x02,
//   REUSE_METADATA: 0x04
// };
const STATUS = {
  BY_REF_VALUE: 0x01,
  DEFAULT_VALUE: 0x02
};
/*
  s2.2.6.5
 */

_Symbol$iterator = Symbol.iterator;

class RpcRequestPayload {
  constructor(request, txnDescriptor, options) {
    this.request = void 0;
    this.procedure = void 0;
    this.options = void 0;
    this.txnDescriptor = void 0;
    this.request = request;
    this.procedure = this.request.sqlTextOrProcedure;
    this.options = options;
    this.txnDescriptor = txnDescriptor;
  }

  [_Symbol$iterator]() {
    return this.generateData();
  }

  *generateData() {
    const buffer = new _writableTrackingBuffer.default(500);

    if (this.options.tdsVersion >= '7_2') {
      const outstandingRequestCount = 1;
      (0, _allHeaders.writeToTrackingBuffer)(buffer, this.txnDescriptor, outstandingRequestCount);
    }

    if (typeof this.procedure === 'string') {
      buffer.writeUsVarchar(this.procedure);
    } else {
      buffer.writeUShort(0xFFFF);
      buffer.writeUShort(this.procedure);
    }

    const optionFlags = 0;
    buffer.writeUInt16LE(optionFlags);
    yield buffer.data;
    const parameters = this.request.parameters;

    for (let i = 0; i < parameters.length; i++) {
      yield* this.generateParameterData(parameters[i], this.options);
    }
  }

  toString(indent = '') {
    return indent + ('RPC Request - ' + this.procedure);
  }

  *generateParameterData(parameter, options) {
    const buffer = new _writableTrackingBuffer.default(1 + 2 + Buffer.byteLength(parameter.name, 'ucs-2') + 1);
    buffer.writeBVarchar('@' + parameter.name);
    let statusFlags = 0;

    if (parameter.output) {
      statusFlags |= STATUS.BY_REF_VALUE;
    }

    buffer.writeUInt8(statusFlags);
    yield buffer.data;
    const param = {
      value: parameter.value
    };
    const type = parameter.type;

    if ((type.id & 0x30) === 0x20) {
      if (parameter.length) {
        param.length = parameter.length;
      } else if (type.resolveLength) {
        param.length = type.resolveLength(parameter);
      }
    }

    if (parameter.precision) {
      param.precision = parameter.precision;
    } else if (type.resolvePrecision) {
      param.precision = type.resolvePrecision(parameter);
    }

    if (parameter.scale) {
      param.scale = parameter.scale;
    } else if (type.resolveScale) {
      param.scale = type.resolveScale(parameter);
    }

    yield type.generateTypeInfo(param, this.options);
    yield* type.generateParameterData(param, options);
  }

}

var _default = RpcRequestPayload;
exports.default = _default;
module.exports = RpcRequestPayload;