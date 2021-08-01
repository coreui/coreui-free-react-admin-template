//srcs/login.js
const { dbCatch } = require('../../../error');
const Visual = require('../../../Schemas/user_visual');
const Login = require('../../../Schemas/user_login');
const getPrivate = require('./DBquery/getPrivate');
const asyncHandler = require('express-async-handler')

async function insertVisual(name,account){
    const user = await new Visual({
        username:{data : name},
        account:{data: account}
    }).save().catch(dbCatch)

    Login.updateOne({account},{$set:{visual:user._id}}).exec().catch(dbCatch)

    return user
}

/**
 * @api {post} /showVisual 顯示個人profile
 * @apiName ShowVisual
 * @apiGroup In/profile
 * 
 * @apiSuccess (201) {Object} data Visual資料(請用res.data.data拿到)
 * @apiSuccess (201) {String} data.userimage 大頭貼(使用<code>\<img src={userimage}/></code>)
 * @apiSuccess (201) {Object} data.account 學號 {data,show}
 * @apiSuccess (201) {Object} data.username 名字 {data,show}
 * @apiSuccess (201) {Object} data.nickname 綽號 {data,show}
 * @apiSuccess (201) {Object} data.profile 自介 {data,show}
 * @apiSuccess (201) {Object} data.publicEmail 公開信相 {data,show}
 * @apiSuccess (201) {Object} data.office 公司電話 {data,show}
 * @apiSuccess (201) {Object} data.homephone 家裡電話 {data,show}
 * @apiSuccess (201) {Object} data.cellphone 手機 {data,show}
 * @apiSuccess (201) {Object} data.CC city and country {data,show}
 * @apiSuccess (201) {Object} data.web 個人部落格 {data,show}
 * @apiSuccess (201) {Object} data.facebook facebook {data,show}
 * @apiSuccess (201) {Object} data.Linkedin Linkedin {data,show}
 * @apiSuccess (201) {Object} data.education 學位
 * @apiSuccess (201) {Object} data.education.major 學士
 * @apiSuccess (201) {Boolean} data.education.major.show 是否公開
 * @apiSuccess (201) {String} data.education.major.SD school and department 學校&系
 * @apiSuccess (201) {String} data.education.major.Note 備註, ex.在學、畢業
 * @apiSuccess (201) {Object} data.education.double_major 雙主修 {show,SD,Note}
 * @apiSuccess (201) {Object} data.education.minor 輔系 {show,SD,Note}
 * @apiSuccess (201) {Object} data.education.master 碩士 {show,SD,Note}
 * @apiSuccess (201) {Object} data.education.doctor 博士 {show,SD,Note}
 * @apiSuccess (201) {Object[]} data.Occupation 職業
 * @apiSuccess (201) {Boolean} data.Occupation.show 是否顯示
 * @apiSuccess (201) {String} data.Occupation.C 公司
 * @apiSuccess (201) {String} data.Occupation.O 部門
 * @apiSuccess (201) {String} data.Occupation.P 職稱
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */
const shVisual = async (req, res, next)=>{
    let session_account = req.session.loginAccount

    let obj = await Visual.findOne({"account.data":session_account}).catch(dbCatch)
    if(!obj){
        if(!session_account) return//for dev
        obj = await insertVisual(req.session.loginName,session_account)
    }
    const user = getPrivate(obj)
    return res.status(201).send({data:user})
}
module.exports = asyncHandler(shVisual)