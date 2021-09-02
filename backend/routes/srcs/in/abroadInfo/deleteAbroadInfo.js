const Abroad_info = require('../../../Schemas/abroad_info')
const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')

/**
 * @api {delete} /deleteAbroadInfo delete abroadInfo
 * @apiName DeleteAbroadInfo
 * @apiGroup In/abroadInfo
 * @apiDescription 用_id刪除留學資訊
 *
 * @apiparam {String} _id 要刪除的
 *
 * @apiSuccess (200) - -
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const delAI = async (req, res, next) => {
  const { _id } = req.body
  await Abroad_info.findByIdAndDelete(_id).catch(dbCatch)
  res.status(200).end()
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: '_id' }]
module.exports = [valid(rules), asyncHandler(delAI)]
