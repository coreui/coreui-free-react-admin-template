const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')
const Column_Outline = require('../../../Schemas/column_outline')

/**
 * @api {get} /column/outline get column outline with id optional
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
 * {'data':
 * 	[{
*     'anno': ['String'],
      'date': 'String',
      'title': ['String'],
      'exp': ['String'],
      'edu': ['String'],
      'intro': ['String'],
      'id': 'String',
      'imgSrc':'String'
    },],
 * 'maxPage':'Number'}
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const getOut = async (req, res, next) => {
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
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['id'],
    type: 'string',
    method: 'get',
  },
  {
    filename: 'optional',
    field: ['perpage', 'page'],
    type: 'any',
    method: 'get',
  },
]
module.exports = [valid(rules), asyncHandler(getOut)]
