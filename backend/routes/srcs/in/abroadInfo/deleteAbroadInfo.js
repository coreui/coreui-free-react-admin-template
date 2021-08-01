const Abroad_info = require('../../../Schemas/abroad_info')
const asyncHandler = require('express-async-handler')
const {dbCatch} = require('../../../error')

/**
 * @api {delete} /deleteAbroadInfo 刪除資料
 * @apiName DeleteAbroadInfo
 * @apiGroup In/abroadInfo
 * 
 * @apiparam {String} _id 要刪除的
 * 
 * @apiSuccess (200) data 刪除
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */

module.exports = asyncHandler(async (req, res, next)=>{
    console.log(req.body)
    const deletedAbroadInfo = await Abroad_info.findByIdAndDelete(req.body._id).catch(dbCatch)
    let deleteAbroadInfo = deletedAbroadInfo ? deletedAbroadInfo.title.title : '_id does not exist'
    console.log('delete:', deleteAbroadInfo)
    res.status(200).send({data: deleteAbroadInfo})
})