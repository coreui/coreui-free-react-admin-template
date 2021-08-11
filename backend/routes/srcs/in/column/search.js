const Column_detail = require('../../../Schemas/column_detail')
const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')

/**
 * @api {get} /column/search hashtag關鍵字查詢
 * @apiName Search
 * @apiGroup In/column
 *
 * @apiparam {String} keyword
 *
 * @apiSuccessExample {json} Success-Response:
 * 	HTTP/1.1 200 OK
 * 	[{
 * 		top:{
 *          name:String,
 *          experience:String,
 *          hashtags:[String]
 *      },
 *      body: {
            body: [
            {
                bigtitle: String,
                bigsections: [
                {
                    subtitle: String,
                    subsection: String,
                },
                ],
            },
            ],
        },
        annotation: {
            annotation: [
            {
                job: String,
                contributer: String,
            },
            ],
        },
        id: String,
 * 	},...]
 *
 * @apiError (500) {String} description 資料庫錯誤
 */

module.exports = asyncHandler(async (req, res, next) => {
  const { keyword } = req.query
  const foundArticle = await Column_detail.find({ 'top.hashtags': keyword }).catch(dbCatch)
  return res.status(201).send(foundArticle)
})
