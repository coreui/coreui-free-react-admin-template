const getColumn = require('./imgProcess/getImg');
const asyncHandler = require('express-async-handler')


/**
 * @api {post} /getImg 拿column照片
 * @apiName GetImg
 * @apiGroup In/column
 * 
 * @apiparam {String} filename 檔名
 * 
 * @apiSuccess (201) data 照片url(Ex. <code>\<img src={url}/></code>)
 * @apiError (404) {String} description 照片不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next)=>{
	const getDone = await getColumn(req.body.filename)
	return res.status(201).send({data:getDone})
})