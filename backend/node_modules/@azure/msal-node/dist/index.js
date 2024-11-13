
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./msal-node.cjs.production.min.js')
} else {
  module.exports = require('./msal-node.cjs.development.js')
}
