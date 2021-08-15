const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')
const Column_Outline = require('../../../Schemas/column_outline')

/**
 * @api {get} /column/outline 拿Outline資料
 * @apiName GetOutline
 * @apiGroup In/column
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
  const { id, page, perpage } = req.query
  const query = id ? { id } : {}
  const p = parseInt(page ? page : 1)
  const pp = parseInt(perpage & (perpage > 0) ? perpage : 5)
  const totalData = await Column_Outline.count(query).catch(dbCatch)
  const maxPage = Math.ceil(totalData / pp)
  const toSkip = p >= maxPage ? 0 : totalData - pp * p
  const toLim = p >= maxPage ? totalData - pp * (maxPage - 1) : pp
  const columnOulines = await Column_Outline.find(query).skip(toSkip).limit(toLim).catch(dbCatch)
  return res
    .status(201)
    .send({ data: columnOulines.reverse().map((col) => col.getPublic()), maxPage })
})
