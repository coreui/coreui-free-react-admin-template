/**
 * Copyright (c) 2013-present, creativeLabs Lukasz Holeczek.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/*index.js',
    '!src/serviceWorker.js',
    '!src/polyfill.js',
  ],
}
