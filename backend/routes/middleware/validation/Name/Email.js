const { body } = require('express-validator')

module.exports = ({ field = 'Email' }) => body(field, 'invalid Email').exists().isEmail()
