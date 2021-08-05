//srcs/register.js
const { ErrorHandler, dbCatch } = require('../../../error')
const Pending = require('../../../Schemas/user_pending')
const Login = require('../../../Schemas/user_login')
const Visual = require('../../../Schemas/user_visual_new')
const asyncHandler = require('express-async-handler')

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
      await Visual.findByIdAndRemove(user._id)
      throw new ErrorHandler(500, '註冊失敗')
    })
}
async function insertVisual(name, account) {
  return await new Visual({
    username: name,
    account: account,
  })
    .save()
    .catch(dbCatch)
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
 * @apiparam {File} file 身分證明的照片(如果newRule=true管理員認證好像可以不用照片?)
 * @apiparam {String} Email Email(newRule=true才需要)
 * 
 * @apiSuccess (201) {String} username 使用者名字
 * 
 * @apiError (400) {String} description 請添加照片
 * @apiError (403) {String} description 帳號已存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const registerFB = async (req, res) => {
  const username = req.body.username
  const account = req.body.account.toLowerCase()
  const userFBid = req.body.facebookID

  if (req.file === undefined) throw new ErrorHandler(400, '請添加照片')

  const query = { account }
  const isRegistered = await Login.exists(query).catch(dbCatch)
  if (isRegistered) throw new ErrorHandler(403, '帳號已存在')
  const user = await insertVisual(username, account)
  await insertFB(username, account, userFBid, req.file, user)
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
    img: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  }
  await Pending.findOneAndUpdate({ account }, data, { upsert: true }).catch(dbCatch)

  return res.status(201).send({ username })
}

module.exports =
  process.env.newReg === 'true' ? asyncHandler(secure_regFB) : asyncHandler(registerFB)
