const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')
const Column_Outline = require('../../../Schemas/column_outline')

/**
 * @api {get} /column/outline get outline with id optional
 * @apiName GetOutline
 * @apiGroup In/column
 * @apiDescription 拿Outline資料(含圖片)
 *
 * @apiparam {String} id id(optional,若未給則送全部)
 * @apiparam {String} perpage 一頁數量(optional,default 5)
 * @apiparam {String} page 頁數(optional,default 1)
 * 
 *
 * @apiSuccessExample {json} Success-Response:
 * 	HTTP/1.1 200 OK
 * {data:
 * 	[{
*     anno: [{ type: String }],
      date: String,
      title: [{ type: String }],
      exp: [{ type: String }],
      edu: [{ type: String }],
      intro: [{ type: String }],
      id: { type: String, unique: true },
      columnImg: {
        data: { type: Buffer },
        contentType: { type: String },
      }
    },],
 * maxPage:Number}
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next) => {
  const { number } = req.query
  const limit = number ? parseInt(number) : 5
  const totalNumber = parseInt(await Column_Outline.count().catch(dbCatch))
  const columnOulines = await Column_Outline.find()
    .skip(totalNumber - limit)
    .catch(dbCatch)
  return res.status(201).send({ data: columnOulines.reverse().map((col) => col.getPublic()) })
})
