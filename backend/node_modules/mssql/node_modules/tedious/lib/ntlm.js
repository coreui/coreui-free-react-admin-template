"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNTLMRequest = createNTLMRequest;
const NTLMFlags = {
  NTLM_NegotiateUnicode: 0x00000001,
  NTLM_NegotiateOEM: 0x00000002,
  NTLM_RequestTarget: 0x00000004,
  NTLM_Unknown9: 0x00000008,
  NTLM_NegotiateSign: 0x00000010,
  NTLM_NegotiateSeal: 0x00000020,
  NTLM_NegotiateDatagram: 0x00000040,
  NTLM_NegotiateLanManagerKey: 0x00000080,
  NTLM_Unknown8: 0x00000100,
  NTLM_NegotiateNTLM: 0x00000200,
  NTLM_NegotiateNTOnly: 0x00000400,
  NTLM_Anonymous: 0x00000800,
  NTLM_NegotiateOemDomainSupplied: 0x00001000,
  NTLM_NegotiateOemWorkstationSupplied: 0x00002000,
  NTLM_Unknown6: 0x00004000,
  NTLM_NegotiateAlwaysSign: 0x00008000,
  NTLM_TargetTypeDomain: 0x00010000,
  NTLM_TargetTypeServer: 0x00020000,
  NTLM_TargetTypeShare: 0x00040000,
  NTLM_NegotiateExtendedSecurity: 0x00080000,
  NTLM_NegotiateIdentify: 0x00100000,
  NTLM_Unknown5: 0x00200000,
  NTLM_RequestNonNTSessionKey: 0x00400000,
  NTLM_NegotiateTargetInfo: 0x00800000,
  NTLM_Unknown4: 0x01000000,
  NTLM_NegotiateVersion: 0x02000000,
  NTLM_Unknown3: 0x04000000,
  NTLM_Unknown2: 0x08000000,
  NTLM_Unknown1: 0x10000000,
  NTLM_Negotiate128: 0x20000000,
  NTLM_NegotiateKeyExchange: 0x40000000,
  NTLM_Negotiate56: 0x80000000
};

function createNTLMRequest(options) {
  const domain = escape(options.domain.toUpperCase());
  const workstation = options.workstation ? escape(options.workstation.toUpperCase()) : '';
  let type1flags = NTLMFlags.NTLM_NegotiateUnicode + NTLMFlags.NTLM_NegotiateOEM + NTLMFlags.NTLM_RequestTarget + NTLMFlags.NTLM_NegotiateNTLM + NTLMFlags.NTLM_NegotiateOemDomainSupplied + NTLMFlags.NTLM_NegotiateOemWorkstationSupplied + NTLMFlags.NTLM_NegotiateAlwaysSign + NTLMFlags.NTLM_NegotiateVersion + NTLMFlags.NTLM_NegotiateExtendedSecurity + NTLMFlags.NTLM_Negotiate128 + NTLMFlags.NTLM_Negotiate56;

  if (workstation === '') {
    type1flags -= NTLMFlags.NTLM_NegotiateOemWorkstationSupplied;
  }

  const fixedData = Buffer.alloc(40);
  const buffers = [fixedData];
  let offset = 0;
  offset += fixedData.write('NTLMSSP', offset, 7, 'ascii');
  offset = fixedData.writeUInt8(0, offset);
  offset = fixedData.writeUInt32LE(1, offset);
  offset = fixedData.writeUInt32LE(type1flags, offset);
  offset = fixedData.writeUInt16LE(domain.length, offset);
  offset = fixedData.writeUInt16LE(domain.length, offset);
  offset = fixedData.writeUInt32LE(fixedData.length + workstation.length, offset);
  offset = fixedData.writeUInt16LE(workstation.length, offset);
  offset = fixedData.writeUInt16LE(workstation.length, offset);
  offset = fixedData.writeUInt32LE(fixedData.length, offset);
  offset = fixedData.writeUInt8(5, offset);
  offset = fixedData.writeUInt8(0, offset);
  offset = fixedData.writeUInt16LE(2195, offset);
  offset = fixedData.writeUInt8(0, offset);
  offset = fixedData.writeUInt8(0, offset);
  offset = fixedData.writeUInt8(0, offset);
  fixedData.writeUInt8(15, offset);
  buffers.push(Buffer.from(workstation, 'ascii'));
  buffers.push(Buffer.from(domain, 'ascii'));
  return Buffer.concat(buffers);
}