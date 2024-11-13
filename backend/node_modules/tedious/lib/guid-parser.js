"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferToUpperCaseGuid = bufferToUpperCaseGuid;
exports.bufferToLowerCaseGuid = bufferToLowerCaseGuid;
exports.guidToArray = guidToArray;
const UPPER_CASE_MAP = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0A', '0B', '0C', '0D', '0E', '0F', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1A', '1B', '1C', '1D', '1E', '1F', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2A', '2B', '2C', '2D', '2E', '2F', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '3A', '3B', '3C', '3D', '3E', '3F', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4A', '4B', '4C', '4D', '4E', '4F', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5A', '5B', '5C', '5D', '5E', '5F', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '6A', '6B', '6C', '6D', '6E', '6F', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7A', '7B', '7C', '7D', '7E', '7F', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8A', '8B', '8C', '8D', '8E', '8F', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '9A', '9B', '9C', '9D', '9E', '9F', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'DA', 'DB', 'DC', 'DD', 'DE', 'DF', 'E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'EA', 'EB', 'EC', 'ED', 'EE', 'EF', 'F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'FA', 'FB', 'FC', 'FD', 'FE', 'FF'];
const LOWER_CASE_MAP = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '0c', '0d', '0e', '0f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2a', '2b', '2c', '2d', '2e', '2f', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '3a', '3b', '3c', '3d', '3e', '3f', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4a', '4b', '4c', '4d', '4e', '4f', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5a', '5b', '5c', '5d', '5e', '5f', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '6a', '6b', '6c', '6d', '6e', '6f', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7a', '7b', '7c', '7d', '7e', '7f', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8a', '8b', '8c', '8d', '8e', '8f', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '9a', '9b', '9c', '9d', '9e', '9f', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'da', 'db', 'dc', 'dd', 'de', 'df', 'e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff'];

function bufferToUpperCaseGuid(buffer) {
  return UPPER_CASE_MAP[buffer[3]] + UPPER_CASE_MAP[buffer[2]] + UPPER_CASE_MAP[buffer[1]] + UPPER_CASE_MAP[buffer[0]] + '-' + UPPER_CASE_MAP[buffer[5]] + UPPER_CASE_MAP[buffer[4]] + '-' + UPPER_CASE_MAP[buffer[7]] + UPPER_CASE_MAP[buffer[6]] + '-' + UPPER_CASE_MAP[buffer[8]] + UPPER_CASE_MAP[buffer[9]] + '-' + UPPER_CASE_MAP[buffer[10]] + UPPER_CASE_MAP[buffer[11]] + UPPER_CASE_MAP[buffer[12]] + UPPER_CASE_MAP[buffer[13]] + UPPER_CASE_MAP[buffer[14]] + UPPER_CASE_MAP[buffer[15]];
}

function bufferToLowerCaseGuid(buffer) {
  return LOWER_CASE_MAP[buffer[3]] + LOWER_CASE_MAP[buffer[2]] + LOWER_CASE_MAP[buffer[1]] + LOWER_CASE_MAP[buffer[0]] + '-' + LOWER_CASE_MAP[buffer[5]] + LOWER_CASE_MAP[buffer[4]] + '-' + LOWER_CASE_MAP[buffer[7]] + LOWER_CASE_MAP[buffer[6]] + '-' + LOWER_CASE_MAP[buffer[8]] + LOWER_CASE_MAP[buffer[9]] + '-' + LOWER_CASE_MAP[buffer[10]] + LOWER_CASE_MAP[buffer[11]] + LOWER_CASE_MAP[buffer[12]] + LOWER_CASE_MAP[buffer[13]] + LOWER_CASE_MAP[buffer[14]] + LOWER_CASE_MAP[buffer[15]];
}

const CHARCODEMAP = {};
const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F'].map(d => d.charCodeAt(0));

for (let i = 0; i < hexDigits.length; i++) {
  const map = CHARCODEMAP[hexDigits[i]] = {};

  for (let j = 0; j < hexDigits.length; j++) {
    const hex = String.fromCharCode(hexDigits[i], hexDigits[j]);
    const value = parseInt(hex, 16);
    map[hexDigits[j]] = value;
  }
}

function guidToArray(guid) {
  return [CHARCODEMAP[guid.charCodeAt(6)][guid.charCodeAt(7)], CHARCODEMAP[guid.charCodeAt(4)][guid.charCodeAt(5)], CHARCODEMAP[guid.charCodeAt(2)][guid.charCodeAt(3)], CHARCODEMAP[guid.charCodeAt(0)][guid.charCodeAt(1)], CHARCODEMAP[guid.charCodeAt(11)][guid.charCodeAt(12)], CHARCODEMAP[guid.charCodeAt(9)][guid.charCodeAt(10)], CHARCODEMAP[guid.charCodeAt(16)][guid.charCodeAt(17)], CHARCODEMAP[guid.charCodeAt(14)][guid.charCodeAt(15)], CHARCODEMAP[guid.charCodeAt(19)][guid.charCodeAt(20)], CHARCODEMAP[guid.charCodeAt(21)][guid.charCodeAt(22)], CHARCODEMAP[guid.charCodeAt(24)][guid.charCodeAt(25)], CHARCODEMAP[guid.charCodeAt(26)][guid.charCodeAt(27)], CHARCODEMAP[guid.charCodeAt(28)][guid.charCodeAt(29)], CHARCODEMAP[guid.charCodeAt(30)][guid.charCodeAt(31)], CHARCODEMAP[guid.charCodeAt(32)][guid.charCodeAt(33)], CHARCODEMAP[guid.charCodeAt(34)][guid.charCodeAt(35)]];
}