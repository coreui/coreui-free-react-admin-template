//srcs/register.js
const { ErrorHandler, dbCatch } = require('../../../error')
const Pending = require('../../../Schemas/user_pending')
const Login = require('../../../Schemas/user_login')
const Visual = require('../../../Schemas/user_visual_new')
const asyncHandler = require('express-async-handler')
const { parseImg } = require('../../../Schemas/query')
const crypto = require('crypto')

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
 * @apiDescription 註冊(by facebook ID)，在.env用newReg=version3
 * 
 * @apiHeaderExample {json} config
                 { "content-type": "multipart/form-data" }
 *
 * @apiparam {String} facebookID facebookID
 * @apiparam {String} account 學號
 * @apiparam {String} username 使用者名字
 * @apiparam {File} file 身分證明的照片(optional)
 * @apiparam {File} avatar 大頭貼(optional)
 * @apiparam {String} Email Email(newRule=true,version3才需要)
 * @apiparam {String} isGraduated false則寄送email給account@ntu.edu.tw(newRule=version3才需要)
 * 
 * @apiSuccess (201) {String} username 使用者名字(newRule=false)
 * @apiSuccess (201) {String} isGraduated isGraduated(newRule=version3)
 * @apiSuccess (201) {String} email account@ntu.edu.tw(newRule=version3 && isGraduated=false)
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

const sendmail = require('../../../middleware/mail')
const template = require('./mailTemplate/template_generator')
const regFB_v3 = async (req, res) => {
  const account = req.body.account.toLowerCase()
  const isRegistered = await Login.exists({ account }).catch(dbCatch)
  if (isRegistered) throw new ErrorHandler(403, '帳號已存在')

  const { username, facebookID, Email } = req.body
  const fbIdEnc = crypto.createHash('md5').update(facebookID).digest('hex')

  const active = Math.random().toString(36).substr(2)
  const avatar = parseImg(req.files['avatar'] ? req.files['avatar'][0] : undefined)
  const idFile = parseImg(req.files['file'] ? req.files['file'][0] : undefined)

  const data = {
    username,
    account,
    facebookID: fbIdEnc,
    email: Email,
    active,
    img: idFile,
    avatar,
  }
  await Pending.findOneAndUpdate({ account }, data, {
    upsert: true,
    useFindAndModify: false,
  }).catch(dbCatch)

  const { isGraduated } = req.body
  if (isGraduated) {
    //畢業，不寄email
    res.send({ isGraduated })
  } else {
    const email = `${account}@ntu.edu.tw`
    const link = `${req.protocol}://${req.get('host')}/api/regact/${account}/${active}`
    const htmlText = await template(link, link)
    await sendmail(email, 'eeplus website account activation', htmlText).catch((e) => {
      console.log(e)
      throw new ErrorHandler(400, 'sendemail fail')
    })
    res.send({ email, isGraduated })
  }
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: 'username' }, 'account', 'facebookID']

const exportVersion = (v) => {
  switch (v) {
    case 'true':
      return [valid([...rules, 'Email']), asyncHandler(secure_regFB)]
    case 'version3':
      return [
        valid([...rules, 'Email', { filename: 'required', field: 'isGraduated' }]),
        asyncHandler(regFB_v3),
      ]
    default:
      return [valid(rules), asyncHandler(registerFB)]
  }
}
module.exports = exportVersion(process.env.newReg)
