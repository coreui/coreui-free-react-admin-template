//srcs/register.js
const { ErrorHandler, dbCatch } = require('../../../error')
const Pending = require('../../../Schemas/user_pending')
const Login = require('../../../Schemas/user_login')
const Visual = require('../../../Schemas/user_visual_new')
const asyncHandler = require('express-async-handler')
const crypto = require('crypto')
const { parseImg } = require('../../../Schemas/query')

async function insertFB(name, account, facebookID, file, user) {
  await new Login({
    username: name,
    account: account,
    facebookID: facebookID,
    img: {
      data: file.buffer,
      contentType: file.mimetype,
    },
    visual: user._id,
  })
    .save()
    .catch(async (e) => {
      console.log(e)
      await Visual.findByIdAndDelete(user._id)
      throw new ErrorHandler(500, '註冊失敗')
    })
}

/**
 * @api {post} /registerFB registerFB
 * @apiName RegisterFB
 * @apiGroup Out/account
 * @apiDescription 註冊(by facebook ID)
 * 
 * @apiHeaderExample {json} config
                 { "content-type": "multipart/form-data" }
 *
 * @apiparam {String} facebookID facebookID
 * @apiparam {String} account 學號
 * @apiparam {String} username 使用者名字
 * @apiparam {File} file 身分證明的照片(optional)
 * @apiparam {File} avatar 大頭貼(optional)
 * @apiparam {String} Email Email
 * 
 * @apiSuccess (201) {String} username 使用者名字
 * 
 * @apiError (400) {String} description 請添加照片
 * @apiError (403) {String} description 帳號已存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const registerFB = async (req, res) => {
  const account = req.body.account.toLowerCase()
  const isRegistered = await Login.exists({ account }).catch(dbCatch)
  if (isRegistered) throw new ErrorHandler(403, '帳號已存在')

  const { username, facebookID, Email } = req.body
  const fbIdEnc = crypto.createHash('md5').update(facebookID).digest('hex')

  const avatar = parseImg(req.files['avatar'] ? req.files['avatar'][0] : undefined)
  console.log(req.files, req.files['avatar'], avatar)

  const idFile = parseImg(req.files['file'] ? req.files['file'][0] : undefined)

  const user = await new Visual({
    username,
    account,
    userimage: avatar,
    publicEmail: Email,
  })
    .save()
    .catch(dbCatch)
  await insertFB(username, account, fbIdEnc, idFile, user)

  req.session.loginName = username
  req.session.loginAccount = account
  return res.status(201).send({ username })
}

const secure_regFB = async (req, res) => {
  const { username, facebookID, Email: email } = req.body
  const account = req.body.account.toLowerCase()

  if (req.file === undefined) throw new ErrorHandler(400, '請添加照片')

  const query = { account }
  const isRegistered = await Login.exists(query).catch(dbCatch)
  if (isRegistered) throw new ErrorHandler(403, '帳號已存在')

  const data = {
    username,
    account,
    facebookID,
    email,
    img: parseImg(req.file),
  }
  await Pending.findOneAndUpdate({ account }, data, { upsert: true }).catch(dbCatch)

  return res.status(201).send({ username })
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: 'username' }, 'account', 'facebookID']
module.exports =
  process.env.newReg === 'true'
    ? [valid(rules), asyncHandler(secure_regFB)]
    : [valid(rules), asyncHandler(registerFB)]
