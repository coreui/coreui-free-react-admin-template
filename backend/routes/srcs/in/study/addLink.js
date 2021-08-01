const { dbCatch } = require('../../../error');
const Study_Link = require('../../../Schemas/googlesheet_link');
const asyncHandle = require('express-async-handler')

/**
 * @api {post} /study/addLink 新增本年表單連結
 * @apiName addLink
 * @apiGroup In/study
 * @apiDescription 設定本年表單
 *
 * @apiparam {String} senior 學長姊表單連結
 * @apiparam {String} junior 學弟妹表單連結
 * @apiparam {String} note 備註(截止時間之類的)
 * 
 * @apiSuccess (201) {String} x data stored
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandle(async function (req, res) {
	const {senior,junior,note} = req.body
	const data = {senior,junior,note,publishTime}
	await Study_Link.findOneAndUpdate(
		{_id:1},
		data,
		{upsert:true}
	)
	res.send('data stored')
})