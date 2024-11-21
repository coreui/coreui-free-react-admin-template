/*
  @license
	Rollup.js v4.25.0
	Sat, 09 Nov 2024 08:36:52 GMT - commit 42e587e0e37bc0661aa39fe7ad6f1d7fd33f825c

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
export { version as VERSION, defineConfig, rollup, watch } from './shared/node-entry.js';
import './shared/parseAst.js';
import '../native.js';
import 'node:path';
import 'path';
import 'node:process';
import 'node:perf_hooks';
import 'node:fs/promises';
import 'tty';
