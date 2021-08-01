const getColumn = require('./imgProcess/getOutline')
const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')


/**
 * @api {post} /getOutline 拿Outline資料
 * @apiName GetOutline
 * @apiGroup In/column
 * 
 * @apiparam {-} - -
 * 
 * @apiSuccessExample {json} Success-Response:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		filename:["yymm"]
 * 		anno:["作者1 作者2 作者3...","| yyyy/mm/dd 星期x"]
 * 		title:["yyyy級 採訪者姓名 (目前職位)"...]
 * 		exp:["採訪者姓名 現任:目前職位"...]
 * 		edu:["採訪者姓名 學士/碩士/博士:....(畢業年分)",...]
 * 		intro:["內文段落1","內文段落2"...]
 * 		id:["Column_Block_yymm"]
 * 	}
 * 
 * @apiError (404) {String} description 找不到資料
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next)=>{
	const getDone = await getColumn()
	if (!getDone) throw new ErrorHandler(404, "找不到資料")
	return res.status(201).send(getDone)
})