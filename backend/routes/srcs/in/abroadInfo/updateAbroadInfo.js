const Abroad_info = require('../../../Schemas/abroad_info')
const { updateQuery, parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')

/**
 * @api {post} /updateAbroadInfo update abroadInfo
 * @apiName updateAbroadInfo
 * @apiGroup In/abroadInfo
 * @apiDescription 給_id更新留學資訊
 *
 * @apiParam {String} _id _id
 * @apiParam {String} title 學校名稱
 * @apiParam {String} info 學校資料超連結
 * @apiParam {File} file 學校校徽
 *
 *
 * @apiSuccess (200) -
 *
 * @apiError (404) {String} description 資料不存在
 * @apiError (403) {String} description _id not given
 * @apiError (500) {String} description 資料庫錯誤
 */

const updateAbroadInfo = async (req, res) => {
  const { _id, title, info } = req.body
  if (!_id) throw new ErrorHandler(403, '_id not given')
  const obj = await Abroad_info.findOne({ _id }, 'title').catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '資料不存在')

  const icon = parseImg(req.file)
  const toSet = updateQuery({ title, info, icon })
  await Abroad_info.findByIdAndUpdate(_id, toSet).catch(dbCatch)
  return res.status(200).end()
}

const valid = require('../../../middleware/validation')
const rules = [
  { filename: 'required', field: '_id' },
  { filename: 'optional', field: ['title', 'info'] },
]
module.exports = [valid(rules), asyncHandler(updateAbroadInfo)]
