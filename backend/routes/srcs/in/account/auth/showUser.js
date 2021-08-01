const { dbCatch} = require('../../../../error')
const Visual = require('../../../../Schemas/user_visual')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /showUser 檢視用戶
 * @apiName showUser
 * @apiGroup In/auth
 * @apiDescription 檢視用戶
 * 
 * @apiparam {String} account 帳號(optional)，用b0790xxxx模糊搜尋
 * 
 * @apiSuccess (200) {Object[]} users 各個帳號
 * @apiSuccess (200) {String} users.username 名字
 * @apiSuccess (200) {String} users.account 學號
 * @apiSuccess (200) {String} users.email 信箱
 * @apiSuccess (200) {String} users.imgSrc 證件照
 * @apiSuccess (200) {String} users._id 帳號ID，暫不要顯示出來
 * 
 * @apiError (500) {String} description 資料庫錯誤 
 */
const showUsers = async (req,res,next)=>{
    const {account} = req.body
    const query = account?
        {'account.data':
            account.includes('x')?
                {$regex:new RegExp(account.replace(/x/g,'.'))}:
                account
        }
        :{}

    let users = await Visual.find(query,'username account publicEmail userimage').catch(dbCatch)
    if(!users) throw new ErrorHandler(404,'user not found')
    users = users.map(({username, account, publicEmail, imgSrc})=>({
        username:username.data,
        account:account.data, 
        email:publicEmail.data, 
        imgSrc
    }))
    return res.send({users})
}

module.exports = asyncHandler(showUsers)