const Visual = require('../../../Schemas/user_visual_new')
const Activation = require('../../../Schemas/activation')
const sendmail = require('../../../middleware/mail')
const template = require('./mail/template_generator')
const { dbCatch, ErrorHandler } = require('../../../error')
const asyncHandler = require('express-async-handler')

async function insertActive(name, act) {
  const obj = await Activation.findOne({ account: name })
  if (!obj) {
    //新建activation
    await new Activation({
      account: name,
      active: act,
    }).save()
  } else {
    await Activation.updateOne(
      { account: name },
      {
        $set: {
          active: act,
          createdAt: Date.now(),
        },
      },
    )
  }
}

/**
 * @api {post} /forget forget
 * @apiName Forget
 * @apiGroup Out/forget
 * @apiDescription 忘記密碼，寄信
 *
 * @apiparam {String} account 學號
 *
 * @apiSuccess (200) {String} email
 * 	- 使用者填寫的email
 * 	- "您的私人信箱"
 *
 * @apiError (404) {String} description
 *   - 帳號不存在
 *   - 未設定信箱，請聯絡管理員
 * @apiError (500) {String} description
 *   - 資料庫錯誤
 *   - 信件範本讀取失敗
 *   - 寄信失敗
 */
const forget = async (req, res, next) => {
  const account = req.body.account.toLowerCase()

  const query = { account }
  const obj = await Visual.findOne(query, 'publicEmail').catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '帳號不存在')
  if (!obj.publicEmail) throw new ErrorHandler(404, '未設定信箱，請聯絡管理員')
  const email = obj.publicEmail
  const randomNum = Math.random().toString(36).substr(2) //產生亂碼
  await insertActive(account, randomNum).catch(dbCatch)

  //寄信
  const hylink = `${req.protocol}://${req.get('host')}/ResetPassword/${account}/${randomNum}`
  const hy_br = `${req.protocol}://${req.get(
    'host',
  )}/<wbr>ResetPassword/<wbr>${account}/<wbr>${randomNum}`
  const htmlText = await template(hylink, hy_br)
  await sendmail(email, '重設密碼(一小時後到期)', htmlText)
  //   if (obj.publicEmail.show)
  return res.status(200).send({ email })
  //   else return res.status(200).send({ email: '您的私人信箱' })
}

const valid = require('../../../middleware/validation')
const rules = ['account']
module.exports = [valid(rules), asyncHandler(forget)]
