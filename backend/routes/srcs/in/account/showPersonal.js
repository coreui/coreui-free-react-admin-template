//srcs/login.js
const { dbCatch } = require('../../../error')
const Login = require('../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /showPersonal show personal info
 * @apiName ShowPersonal
 * @apiGroup In/account
 * @apiDescription 顯示機密資料(不想被別人看到的部份，暫無)
 *
 * @apiSuccess (201) username 使用者名字
 * @apiSuccess (201) account 使用者學號
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const shPsw = async (req, res, next) => {
  const session_account = req.session.loginAccount

  const obj = await Login.findOne({ account: session_account }, 'username account').catch(dbCatch)

  if (!obj) return //throw new ErrorHandler(403,'帳號不存在')
  return res.status(201).json({
    username: obj.username,
    account: obj.account,
  })
}
module.exports = asyncHandler(shPsw)
