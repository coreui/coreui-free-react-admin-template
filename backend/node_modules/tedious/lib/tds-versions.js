"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.versionsByValue = exports.versions = void 0;
const versions = {
  '7_1': 0x71000001,
  '7_2': 0x72090002,
  '7_3_A': 0x730A0003,
  '7_3_B': 0x730B0003,
  '7_4': 0x74000004
};
exports.versions = versions;
const versionsByValue = {};
exports.versionsByValue = versionsByValue;

for (const name in versions) {
  versionsByValue[versions[name]] = name;
}