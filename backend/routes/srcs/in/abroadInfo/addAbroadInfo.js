const { dbCatch } = require('../../../error')
const Abroad_info = require('../../../Schemas/abroad_info')
const { parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /addAbroadInfo add abroadInfo
 * @apiName addAbroadInfo
 * @apiGroup In/abroadInfo
 * @apiDescription 新增留學資訊
 *
 * @apiParam {String} title 學校名稱
 * @apiParam {String} info 學校資料超連結
 * @apiParam {File} file 學校校徽
 *
 * @apiSuccess (201) {String} title title
 * @apiSuccess (201) {String} _id _id
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const addAbroadInfo = async (req, res) => {
  const { title, info } = req.body
  const icon = parseImg(req.file)
  const { _id } = await new Abroad_info({ title, info, icon }).save().catch(dbCatch)
  res.status(201).send({ title, _id })
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'optional', field: ['title', 'info'] }]
module.exports = [valid(rules), asyncHandler(addAbroadInfo)]
