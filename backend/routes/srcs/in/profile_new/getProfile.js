//srcs/chLogin.js
const { dbCatch, ErrorHandler } = require('../../../error')
const Visual = require('../../../Schemas/user_visual_new')
const Login = require('../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

async function insertVisual(name,account){
    const user = await new Visual({
        username: name,
        account: account
    }).save().catch(dbCatch)

    // Login.updateOne({account},{$set:{visual:user._id}}).exec().catch(dbCatch)
    await Login.updateOne({account},{$set:{visual:user._id}}).catch(dbCatch)
    return user
}
/**
 * @api {get} /profile 顯示個人profile
 * @apiName getProfile
 * @apiGroup In/profile_new
 * 
 * @apiSuccess (201) {String} userimage 大頭貼(使用<code>\<img src={userimage}/></code>)
 * @apiSuccess (201) {String} account 學號
 * @apiSuccess (201) {String} username 名字
 * @apiSuccess (201) {String} nickname 綽號
 * @apiSuccess (201) {String} profile 自介
 * @apiSuccess (201) {String} publicEmail 公開信相
 * @apiSuccess (201) {String} cellphone 手機
 * @apiSuccess (201) {String} CC city and country
 * @apiSuccess (201) {String} web 個人部落格
 * @apiSuccess (201) {String} facebook facebook
 * @apiSuccess (201) {String} Linkedin Linkedin
 * @apiSuccess (201) {String} major 學士
 * @apiSuccess (201) {String} double_major 雙主修
 * @apiSuccess (201) {String} minor 輔系 
 * @apiSuccess (201) {String} master 碩士
 * @apiSuccess (201) {String} doctor 博士
 * @apiSuccess (201) {Object[]} Occupation 職業
 * @apiSuccess (201) {String} Occupation.C 公司
 * @apiSuccess (201) {String} Occupation.O 部門
 * @apiSuccess (201) {String} Occupation.P 職稱
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */
const getProfile = async (req, res, next)=>{
    let session_account = req.session.loginAccount
    if(!session_account) session_account='b07901029' //return res.status(403).send('not login')
    
    let obj = await Visual.findOne({account:session_account}).catch(dbCatch)
    if(!obj){
        if(!session_account) req.session.loginName='均府'//return res.status(403).send('not login')
        req.session.loginName='均府'
        obj = await insertVisual(req.session.loginName,session_account)
    }
    const imgSrc = obj["imgSrc"]
    const {_doc:{userimage,...restData}} = obj
    console.log(restData)
    return res.status(201).send({userimage:imgSrc,...restData})
}
module.exports = asyncHandler(getProfile)