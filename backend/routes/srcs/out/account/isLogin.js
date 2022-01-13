const { dbCatch, ErrorHandler } = require('../../../error')
const Visual = require('../../../Schemas/user_visual_new')
const Login = require('../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /isLogin isLogin
 * @apiName IsLogin
 * @apiGroup Out/account
 * @apiDescription 檢查是否有登入
 *
 * @apiSuccess (201) {String} account 登入者學號
 *
 * @apiError (403) {String} description "未登入"
 */
module.exports = asyncHandler(async (req, res, next) => {
  const session_account = req.session.loginAccount
  if (session_account) {
    const vuser = await Visual.findOne({ account: session_account })
    if (!vuser) throw new ErrorHandler(404, 'profile不存在')
    const user = await Login.findOne({ account: session_account }, 'isAuth').catch(dbCatch)
    if (!user) throw new ErrorHandler(404, 'profile不存在')
    console.log(user)
    return res.status(200).send({
      account: session_account,
      userimage: vuser.imgSrc,
      userCellphone: vuser.cellphone,
      userName: vuser.username,
      userEmail: vuser.publicEmail,
      isAuth: user.isAuth,
    })
  } else throw new ErrorHandler(403, '未登入')
})
