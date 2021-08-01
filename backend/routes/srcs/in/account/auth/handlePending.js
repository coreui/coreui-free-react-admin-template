const { dbCatch, ErrorHandler } = require('../../../../error')
const Login = require('../../../../Schemas/user_login')
const Pending = require('../../../../Schemas/user_pending')
const Visual = require('../../../../Schemas/user_visual_new')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /handlePending 身分驗證
 * @apiName handlePending
 * @apiGroup In/auth
 * @apiDescription 身分驗證
 * 
 * @apiparam {String} account 學號
 * @apiparam {Boolean} acceptUser 是否接受此用戶
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (404) {String} description user not found
 * @apiError (500) {String} description 資料庫錯誤 
 */
const manage = async (req,res,next)=>{
    const {account,acceptUser} = req.body
    const pending = await Pending.findOne({account}).catch(dbCatch)
    if(!pending) throw new ErrorHandler(404,'user not found')
    if(!acceptUser){
        await Pending.deleteMany({account}).catch(dbCatch)
        return res.end()
    }
    const {username,userpsw,facebookID,email} = pending

    const {_id:visualID} = await Visual({
        username,
        account,
        publicEmail:email
    }).save().catch(dbCatch)
    await Login({username,account,facebookID,userpsw,visual:visualID})
        .save()
        .catch(async e=>{
            await Visual.deleteOne({_id:visualID}).catch(dbCatch)
            throw new ErrorHandler(500,'資料庫錯誤')
        })
    await Pending.deleteMany({account}).catch(dbCatch)
    return res.send({account})
}

module.exports = asyncHandler(manage)