const { body } = require('express-validator')

module.exports = (
  { field = 'account', required = true, search = false }, //account, for register/registerFB
) =>
  search
    ? body(field)
        .isLength({ min: 9, max: 9 })
        .withMessage("學號長度錯誤，若要進行模糊搜尋請用x表示，例如'b079010xx'")
    : required
    ? body(field)
        .isLength({ min: 9, max: 9 })
        .withMessage('學號長度錯誤')
        .matches(/^[a-zA-Z]\d{8}$/)
        .withMessage('學號形式錯誤')
    : body(field)
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 9, max: 9 })
        .withMessage('學號長度錯誤')
        .matches(/^[a-zA-Z]\d{8}$/)
        .withMessage('學號形式錯誤')
