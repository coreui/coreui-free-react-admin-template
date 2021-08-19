const { ErrorHandler } = require('../../../error')
const Visual = require('../../../Schemas/user_visual_new')
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
module.exports = async (req, res, next) => {
  const session_account = req.session.loginAccount
  if (session_account) {
    const user = await Visual.findOne({ account: session_account })
    if (!user) throw new ErrorHandler(404, 'profile不存在')
    return res.status(200).send({ account: session_account, userimage: user.imgSrc })
  } else throw new ErrorHandler(403, '未登入')
}
