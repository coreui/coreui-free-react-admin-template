const validList = require('./validation')
const check = require('./controller')

/**
 * generate check fileds and send 404 if error
 * @param  {Object[]} rules
 * @return {List}      callback functions to put in router
 */
module.exports = (rules) => {
  return [validList(rules), check]
}
