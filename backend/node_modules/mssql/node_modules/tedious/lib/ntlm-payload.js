"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _writableTrackingBuffer = _interopRequireDefault(require("./tracking-buffer/writable-tracking-buffer"));

var crypto = _interopRequireWildcard(require("crypto"));

var _jsbi = _interopRequireDefault(require("jsbi"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NTLMResponsePayload {
  constructor(loginData) {
    this.data = void 0;
    this.data = this.createResponse(loginData);
  }

  toString(indent = '') {
    return indent + 'NTLM Auth';
  }

  createResponse(challenge) {
    const client_nonce = this.createClientNonce();
    const lmv2len = 24;
    const ntlmv2len = 16;
    const domain = challenge.domain;
    const username = challenge.userName;
    const password = challenge.password;
    const ntlmData = challenge.ntlmpacket;
    const server_data = ntlmData.target;
    const server_nonce = ntlmData.nonce;
    const bufferLength = 64 + domain.length * 2 + username.length * 2 + lmv2len + ntlmv2len + 8 + 8 + 8 + 4 + server_data.length + 4;
    const data = new _writableTrackingBuffer.default(bufferLength);
    data.position = 0;
    data.writeString('NTLMSSP\u0000', 'utf8');
    data.writeUInt32LE(0x03);
    const baseIdx = 64;
    const dnIdx = baseIdx;
    const unIdx = dnIdx + domain.length * 2;
    const l2Idx = unIdx + username.length * 2;
    const ntIdx = l2Idx + lmv2len;
    data.writeUInt16LE(lmv2len);
    data.writeUInt16LE(lmv2len);
    data.writeUInt32LE(l2Idx);
    data.writeUInt16LE(ntlmv2len);
    data.writeUInt16LE(ntlmv2len);
    data.writeUInt32LE(ntIdx);
    data.writeUInt16LE(domain.length * 2);
    data.writeUInt16LE(domain.length * 2);
    data.writeUInt32LE(dnIdx);
    data.writeUInt16LE(username.length * 2);
    data.writeUInt16LE(username.length * 2);
    data.writeUInt32LE(unIdx);
    data.writeUInt16LE(0);
    data.writeUInt16LE(0);
    data.writeUInt32LE(baseIdx);
    data.writeUInt16LE(0);
    data.writeUInt16LE(0);
    data.writeUInt32LE(baseIdx);
    data.writeUInt16LE(0x8201);
    data.writeUInt16LE(0x08);
    data.writeString(domain, 'ucs2');
    data.writeString(username, 'ucs2');
    const lmv2Data = this.lmv2Response(domain, username, password, server_nonce, client_nonce);
    data.copyFrom(lmv2Data);
    const genTime = new Date().getTime();
    const ntlmDataBuffer = this.ntlmv2Response(domain, username, password, server_nonce, server_data, client_nonce, genTime);
    data.copyFrom(ntlmDataBuffer);
    data.writeUInt32LE(0x0101);
    data.writeUInt32LE(0x0000);
    const timestamp = this.createTimestamp(genTime);
    data.copyFrom(timestamp);
    data.copyFrom(client_nonce);
    data.writeUInt32LE(0x0000);
    data.copyFrom(server_data);
    data.writeUInt32LE(0x0000);
    return data.data;
  }

  createClientNonce() {
    const client_nonce = Buffer.alloc(8, 0);
    let nidx = 0;

    while (nidx < 8) {
      client_nonce.writeUInt8(Math.ceil(Math.random() * 255), nidx);
      nidx++;
    }

    return client_nonce;
  }

  ntlmv2Response(domain, user, password, serverNonce, targetInfo, clientNonce, mytime) {
    const timestamp = this.createTimestamp(mytime);
    const hash = this.ntv2Hash(domain, user, password);
    const dataLength = 40 + targetInfo.length;
    const data = Buffer.alloc(dataLength, 0);
    serverNonce.copy(data, 0, 0, 8);
    data.writeUInt32LE(0x101, 8);
    data.writeUInt32LE(0x0, 12);
    timestamp.copy(data, 16, 0, 8);
    clientNonce.copy(data, 24, 0, 8);
    data.writeUInt32LE(0x0, 32);
    targetInfo.copy(data, 36, 0, targetInfo.length);
    data.writeUInt32LE(0x0, 36 + targetInfo.length);
    return this.hmacMD5(data, hash);
  }

  createTimestamp(time) {
    const tenthsOfAMicrosecond = _jsbi.default.multiply(_jsbi.default.add(_jsbi.default.BigInt(time), _jsbi.default.BigInt(11644473600)), _jsbi.default.BigInt(10000000));

    const lo = _jsbi.default.toNumber(_jsbi.default.bitwiseAnd(tenthsOfAMicrosecond, _jsbi.default.BigInt(0xffffffff)));

    const hi = _jsbi.default.toNumber(_jsbi.default.bitwiseAnd(_jsbi.default.signedRightShift(tenthsOfAMicrosecond, _jsbi.default.BigInt(32)), _jsbi.default.BigInt(0xffffffff)));

    const result = Buffer.alloc(8);
    result.writeUInt32LE(lo, 0);
    result.writeUInt32LE(hi, 4);
    return result;
  }

  lmv2Response(domain, user, password, serverNonce, clientNonce) {
    const hash = this.ntv2Hash(domain, user, password);
    const data = Buffer.alloc(serverNonce.length + clientNonce.length, 0);
    serverNonce.copy(data);
    clientNonce.copy(data, serverNonce.length, 0, clientNonce.length);
    const newhash = this.hmacMD5(data, hash);
    const response = Buffer.alloc(newhash.length + clientNonce.length, 0);
    newhash.copy(response);
    clientNonce.copy(response, newhash.length, 0, clientNonce.length);
    return response;
  }

  ntv2Hash(domain, user, password) {
    const hash = this.ntHash(password);
    const identity = Buffer.from(user.toUpperCase() + domain.toUpperCase(), 'ucs2');
    return this.hmacMD5(identity, hash);
  }

  ntHash(text) {
    const unicodeString = Buffer.from(text, 'ucs2');
    return crypto.createHash('md4').update(unicodeString).digest();
  }

  hmacMD5(data, key) {
    return crypto.createHmac('MD5', key).update(data).digest();
  }

}

var _default = NTLMResponsePayload;
exports.default = _default;
module.exports = NTLMResponsePayload;