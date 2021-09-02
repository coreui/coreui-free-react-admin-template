const Activation = require('../../../Schemas/activation')
const Login = require('../../../Schemas/user_login')
const crypto = require('crypto')
const { ErrorHandler, dbCatch } = require('../../../error')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /activation activation
 * @apiName Activation
 * @apiGroup Out/forget
 * @apiDescription 檢查激活碼，忘記密碼重設
 *
 * @apiparam {String} account 學號
 * @apiparam {String} active 激活碼(附在信箱的連結裡)
 * @apiparam {String} password 要重設的密碼
 *
 * @apiSuccess (200) -
 *
 * @apiError (401) {String} description 驗證碼已不存在，請至forget頁面
 * @apiError (500) {String} description 資料庫錯誤
 */
const activate = async (req, res) => {
  const { account, active, password } = req.body
  const newPsw = crypto.createHash('md5').update(password).digest('hex')

  const obj = await Activation.exists({ account, active }).catch(dbCatch)
  if (!obj) throw new ErrorHandler(401, '驗證碼已不存在，請至forget頁面')
  //更新密碼
  await Login.updateOne({ account }, { $set: { userpsw: newPsw } }).catch(dbCatch)
  Activation.deleteMany({ account })
    .exec()
    .catch((e) => {
      console.log(e.message)
    })
  return res.status(200).end()
}

const valid = require('../../../middleware/validation')
const rules = ['account', { filename: 'required', field: 'active' }, 'password']
module.exports = [valid(rules), asyncHandler(activate)]
