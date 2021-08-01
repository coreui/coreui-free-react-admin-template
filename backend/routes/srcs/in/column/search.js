const Column_detail = require('../../../Schemas/column_detail')
const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')

/**
 * @api {post} /column/search hashtag關鍵字查詢
 * @apiName Search
 * @apiGroup In/column
 * 
 * @apiparam {String} keyword 
 * 
 * @apiSuccessExample {json} Success-Response:
 * 	HTTP/1.1 200 OK
 * 	[{
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
 * 	},...]
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */

module.exports = asyncHandler(async (req, res, next)=>{
    const keyword = (req.body.keyword)
    const foundArticle = await Column_detail.find({hashtags:keyword}).catch(dbCatch)
	return res.status(201).send(foundArticle)
})