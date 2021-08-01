const Abroad_info = require('../../../Schemas/abroad_info')
const asyncHandler = require('express-async-handler')
const {dbCatch, ErrorHandler} = require('../../../error')
//const updateAbroadInfo = require('./DBquery/update')

/**
 * @api {post} /updateAbroadInfo 更新一筆AbroadInfo資料
 * @apiName updateAbroadInfo
 * @apiGroup In/abroadInfo
 * 
 * @apiParam {String} title 學校名稱
 * @apiParam {String} info 學校資料超連結
 * @apiParam {File} file 學校校徽
 * 
 *
 * @apiSuccess (200) -
 * 
 * @apiError (404) {String} description 資料不存在
 * @apiError (500) {String} description 資料庫錯誤
 */

const updateAbroadInfo = async(req, res)=>{
    //const session_auth = (req.session.isAuth)
    const {title,info,file} = req.body
    const obj = await Abroad_info.findOne({title},"title info file").catch(dbCatch)
    if(!obj) throw new ErrorHandler(404,'資料不存在')
    //const update = updateAbroadInfo(req)
    await Abroad_info.updateOne(
        {_id},
        {$set:{title:obj.title,info:obj.info,file:obj.file}}
    ).catch(dbCatch)
    return res.status(200).end()
} 
module.exports = asyncHandler(updateAbroadInfo)