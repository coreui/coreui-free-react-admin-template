const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')
const Column_Outline = require('../../../Schemas/column_outline')

/**
 * @api {get} /column/outline 拿Outline資料
 * @apiName GetOutline
 * @apiGroup In/column
 *
 * @apiparam {String} id id(optional,若未給則送全部)
 *
 * @apiSuccessExample {json} Success-Response:
 * 	HTTP/1.1 200 OK
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
    },]
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next) => {
  const { id } = req.query
  const query = id ? { id } : {}
  const columnOulines = await Column_Outline.find(query).catch(dbCatch)
  return res.status(201).send(columnOulines.map((col) => col.getPublic()))
})
