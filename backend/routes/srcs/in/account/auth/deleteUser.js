const { dbCatch, ErrorHandler} = require('../../../../error')
const Visual = require('../../../../Schemas/user_visual')
const Login  = require('../../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /delUser 刪除用戶
 * @apiName delUser
 * @apiGroup In/auth
 * @apiDescription 刪除用戶
 * 
 * @apiparam {String} account 帳號
 * 
 * @apiSuccess (200) {String} account account
 * 
 * @apiError (500) {String} description 資料庫錯誤 
 */
const deleteUser = async (req,res,next)=>{
    const {account} = req.body
    if(!account.match(/^[a-zA-Z]\d{8}$/)) throw new ErrorHandler(400,'invalid account input')
    await Visual.deleteMany({'account.data':account}).catch(dbCatch)
    await Login.deleteMany({account}).catch(dbCatch)
    return res.send({account})
}

module.exports = asyncHandler(deleteUser)