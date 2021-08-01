const { dbCatch } = require('../../../error');
const addColumn = require('./imgProcess/addImg');
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /addImg 存column照片
 * @apiName AddImg
 * @apiGroup In/column
 * 
 * @apiHeaderExample {json} config
				 { "content-type": "multipart/form-data" }
				 
 * @apiparam {String} filename 檔名
 * @apiparam {String} file 照片檔
 * 
 * @apiSuccess (204) -
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next)=>{
	await addColumn(req.body.filename,req.file)
	return res.status(204).end()
})