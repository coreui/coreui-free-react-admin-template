const { body, query } = require('express-validator')

module.exports = ({ field = 'username', type = 'string', method = 'post' }) => {
  const q = method === 'post' ? body(field) : query(field)
  return type === 'string'
    ? q
        .exists()
        .withMessage(`${field} is required`)
        .isString()
        .withMessage(`${field} needs to be str`)
    : type === 'bool'
    ? q
        .exists()
        .withMessage(`${field} is required`)
        .isBoolean()
        .withMessage(`${field} needs to be boolean`)
    : q.exists().withMessage(`${field} is required`)
}
