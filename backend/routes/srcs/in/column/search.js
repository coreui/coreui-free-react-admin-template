const Column_detail = require('../../../Schemas/column_detail')
const Column_Outline = require('../../../Schemas/column_outline')
const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')

/**
 * @api {get} /column/search search column by keywords or hashtags
 * @apiName Search
 * @apiGroup In/column
 * @apiDescription 用keyword(空格區分)或hashtag搜尋
 *
 * @apiparam {String} keyword 用空格區分
 * @apiparam {String} hashtags 用hashtags搜尋
 * @apiparam {String} perpage 一頁數量(optional,default 5)
 * @apiparam {String} page 頁數(optional,default 1)
 *
 * @apiSuccessExample {json} Success-Response:
 * 	HTTP/1.1 200 OK
 * {data:
 * [{
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
 * 	},...],
 * maxPage:Number
 * }
 * 	
 *
 * @apiError (500) {String} description 資料庫錯誤
 */

const srhCol = async (req, res, next) => {
  const { hashtags, keyword, page, perpage } = req.query
  let queryId = []
  const task1 = async () => {
    if (hashtags) {
      const query1 = { 'top.hashtags': hashtags }
      const id1 = await Column_detail.find(query1, 'id').lean().catch(dbCatch)
      queryId = queryId.concat(id1.map(({ id }) => id))
    }
  }
  const task2 = async () => {
    if (keyword) {
      const query2 = Column_detail.smartQuery(keyword)
      const id2 = await Column_detail.find(query2, 'id').lean().catch(dbCatch)
      queryId = queryId.concat(id2.map(({ id }) => id))
    }
  }
  const task3 = async () => {
    if (keyword) {
      const query3 = Column_Outline.smartQuery(keyword)
      const id3 = await Column_Outline.find(query3, 'id').lean().catch(dbCatch)
      queryId = queryId.concat(id3.map(({ id }) => id))
    }
  }
  await Promise.all([task1(), task2(), task3()])
  queryId = [...new Set(queryId)].sort().reverse()
  console.log('id found:', queryId)
  const p = parseInt(page ? page : 1)
  const pp = parseInt(perpage & (perpage > 0) ? perpage : 5)
  const totalData = queryId.length
  const maxPage = Math.ceil(totalData / pp)
  const toSkip = p >= maxPage ? 0 : totalData - pp * p
  const toLim = p >= maxPage ? totalData - pp * (maxPage - 1) : pp
  const query = queryId.slice(toSkip, toSkip + toLim)
  const columnOulines = await Column_Outline.find({ id: { $in: query } }).catch(dbCatch)
  console.log('find done')
  return res
    .status(201)
    .send({ data: columnOulines.reverse().map((col) => col.getPublic()), maxPage })
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['keyword', 'hashtags'],
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
module.exports = [valid(rules), asyncHandler(srhCol)]
