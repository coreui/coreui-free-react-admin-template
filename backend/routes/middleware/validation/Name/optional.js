const { body, query } = require('express-validator')

module.exports = ({ field = [], type = 'string', method = 'post' }) =>
  field.map((f) => {
    const q = (method === 'post' ? body(f) : query(f)).optional({
      nullable: true,
      checkFalsy: false,
    })
    return type === 'string'
      ? q.isString().withMessage(`${f} must be str(if exist)`)
      : type === 'object'
      ? q.isObject().withMessage(`${f} must be object(if exist)`)
      : type === 'array'
      ? q.isArray().withMessage(`${f} must be array(if exist)`)
      : type === 'email'
      ? q.isEmail().withMessage(`${f} must be valid email(if exist)`)
      : q
  })
