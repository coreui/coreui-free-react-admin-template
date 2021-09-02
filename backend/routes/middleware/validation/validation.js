module.exports = (rules) => {
  return rules.map((rule) => {
    if (typeof rule === 'string') return require('./Name/' + rule)({})
    return require('./Name/' + rule.filename)(rule)
  })
}
