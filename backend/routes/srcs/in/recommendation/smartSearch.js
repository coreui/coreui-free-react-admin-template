const Recmd = require('../../../Schemas/recommendation')
const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')
const { findWithLimit } = require('../../../Schemas/query')

/**
 * @api {post} /smartsearchrecommendation search recommendation by keywords
 * @apiName ShowRecommendation
 * @apiGroup In/recommendation
 * @apiDescription 關鍵字搜尋(空格區分)
 *
 * @apiparam {String} keyword 用空格區分
 * @apiparam {Number} page default 1
 * @apiparam {Number} perpage default 50
 *
 * @apiSuccess (201) {Object[]} - 簡歷們
 * @apiSuccess (201) {String} -._id mongodb _id(for update,delete)
 * @apiSuccess (201) {Object} -.title 標題相關
 * @apiSuccess (201) {String} -.title.title 標題
 * @apiSuccess (201) {String} -.title.name 名字
 * @apiSuccess (201) {String} -.title.desire_work_type 想要職位
 * @apiSuccess (201) {Object} -.info 工作資訊
 * @apiSuccess (201) {String} -.info.contact 電話
 * @apiSuccess (201) {String[]} -.info.email 信箱
 * @apiSuccess (201) {String} -.info.diploma 學院
 * @apiSuccess (201) {Object} -.spec 詳細描述
 * @apiSuccess (201) {String[]} -.spec.experience 經驗
 * @apiSuccess (201) {String[]} -.spec.speciality 專長
 * @apiSuccess (201) {String} -.image 頭像(Ex. <code>\<img src={image}/></code>)
 *
 * @apiError (403) {String} - not login
 * @apiError (500) {String} description 資料庫錯誤
 */
const smartSearch = async (req, res, next) => {
  const { keyword, page, perpage } = req.body
  const query = Recmd.smartQuery(keyword)
  const [recmds, maxPage] = await findWithLimit(Recmd, query, page, perpage)
  return res.status(201).send(recmds.map((recmd) => recmd.getPublic()).reverse())
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'optional', field: ['keyword'] }]
module.exports = [valid(rules), asyncHandler(smartSearch)]
