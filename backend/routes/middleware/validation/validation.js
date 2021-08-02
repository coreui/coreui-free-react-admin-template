const validationFields = require('./validFields')

const validationList = (method) => {
  const output = []
  validationFields[method].forEach((element) => {
    output.push(require('./Name/' + element))
  })
  return output
}

module.exports = validationList
