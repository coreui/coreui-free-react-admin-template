const getColumn = require('./imgProcess/getDetail')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')


/**
 * @api {post} /getDetail 拿Detail資料
 * @apiName GetDetail
 * @apiGroup In/column
 * 
 * @apiparam {String} id column_yymm
 * 
 * @apiSuccessExample {json} Success-Response:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		title:String
 * 		hashtag:String
 * 		sections:[{
 * 			bigtitle:String,
 * 			sections:[{
 * 				title:String,
 * 				section:String
 * 			}]
 * 		}]
 * 		annotation:["特別感謝:...","撰寫:...","校稿:...",...]
 * 		id:["column_yymm"]
 * 	}
 * 
 * @apiError (404) {String} description 找不到資料
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next)=>{
	const getDone = await getColumn(req.body.id)
	if (!getDone) throw new ErrorHandler(404, "找不到資料")
	return res.status(201).send(getDone)
})