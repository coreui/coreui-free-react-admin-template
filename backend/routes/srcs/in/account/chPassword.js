//srcs/chLogin.js
const { dbCatch, ErrorHandler } = require('../../../error');
const Login = require('../../../Schemas/user_login');
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /chPassword 重設密碼
 * @apiName chPassword
 * @apiGroup In/account
 * @apiDescription 重設密碼
 * 
 * @apiparam {String} oldPsw 原本密碼
 * @apiparam {String} newPsw 新密碼
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (401) {String} description 原始密碼錯誤
 * @apiError (404) {String} description 帳號不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const chPsw = async (req, res, next) => {
    const session_account = req.session.loginAccount

    let {oldPsw,newPsw} = req.body;
    oldPsw = crypto.createHash("md5").update(oldPsw).digest("hex")
    newPsw = crypto.createHash("md5").update(newPsw).digest("hex")

    const obj = await Login.findOne({account:session_account}).catch(dbCatch)
    if(!obj) throw new ErrorHandler(404,'帳號不存在')
    if(obj.userpsw!==oldPsw) throw new ErrorHandler(401,'原始密碼錯誤')
    
    await Login.updateOne(
        {account:session_account},
        {$set:{userpsw:newPsw}}
    ).catch(dbCatch)
    return res.status(204).end()
}
module.exports = asyncHandler(chPsw)