const { body } = require('express-validator')

module.exports = ({ field = 'password' }) =>
  body(field)
    .isLength({ min: 2 })
    .withMessage(`${field} must be minimum 2 length`)
    .not()
    .matches(/^$|\s+/)
    .withMessage(`${field} shouldn't contain white space`)
