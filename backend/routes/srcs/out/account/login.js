const Login = require('../../../Schemas/user_login')
const crypto = require('crypto')
const { dbCatch, ErrorHandler } = require('../../../error')
const asyncHandler = require('express-async-handler')
/**
 * @api {post} /login login
 * @apiName Login
 * @apiGroup Out/account
 * @apiDescription 登入
 *
 * @apiparam {String} account 學號
 * @apiparam {String} password 密碼(以後建議在前端加密)
 *
 * @apiSuccess (201) {String} username 登入者名字
 * @apiSuccess (201) {String} account 登入者學號
 * @apiSuccess (201) {Boolean} isAuth 是否是管理員
 *
 * @apiError (404) {String} description 帳號不存在
 *
 * @apiError (401) {String} description 密碼錯誤
 *
 * @apiError (500) {String} description 資料庫錯誤
 */

const login = async (req, res, next) => {
  const account = req.body.account.toLowerCase()
  const password = req.body.password
  //密碼加密
  const newPsw = crypto.createHash('md5').update(password).digest('hex')

  const query = { account }
  const obj = await Login.findOne(query, 'userpsw username account isAuth').catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '帳號不存在')
  if (obj.userpsw !== newPsw) throw new ErrorHandler(401, '密碼錯誤')
  req.session.loginName = obj.username
  req.session.loginAccount = obj.account
  req.session.isAuth = obj.isAuth
  return res.status(201).send({
    username: obj.username,
    account: obj.account,
    isAuth: obj.isAuth,
  })
}

const valid = require('../../../middleware/validation')
const rules = ['account', 'password']
module.exports = [valid(rules), asyncHandler(login)]
