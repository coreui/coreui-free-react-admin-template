const { dbCatch, ErrorHandler } = require('../../../error')
const Recommendation = require('../../../Schemas/recommendation')
const asyncHandler = require('express-async-handler')
const { findWithLimit } = require('../../../Schemas/query')

/**
 * @api {get} /recommendation/mine show my recommendation
 * @apiName ShowMyRecommendation
 * @apiGroup In/recommendation
 * @apiDescription 顯示我建立的簡歷
 *
 * @apiparam {Number} page default 1
 * @apiparam {Number} perpage default 20
 *
 * @apiSuccess (201) {Object[]} - 簡歷們
 * @apiSuccess (201) {String} -._id mongodb _id(for update,delete)
 * @apiSuccess (201) {Object} -.title 標題相關
 * @apiSuccess (201) {String} -.title.title 標題
 * @apiSuccess (201) {String} -.title.name 名字
 * @apiSuccess (201) {String} -.title.desire_work_type 想要職位
 * @apiSuccess (201) {Object} -.info 工作資訊
 * @apiSuccess (201) {String} -.info.contact 電話
 * @apiSuccess (201) {String} -.info.email 信箱
 * @apiSuccess (201) {String} -.info.diploma 學院
 * @apiSuccess (201) {Object} -.spec 詳細描述
 * @apiSuccess (201) {String[]} -.spec.experience 經驗
 * @apiSuccess (201) {String[]} -.spec.speciality 專長
 * @apiSuccess (201) {String} -.image 頭像(Ex. <code>\<img src={image}/></code>)
 *
 * @apiError (403) {String} - not login
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next) => {
  const account = req.session.loginAccount
  const { page, perpage } = req.query
  const [recs, maxPage] = await findWithLimit(Recommendation, { account }, page, perpage || 20)
  res.status(200).send(recs.map((obj) => obj.getPublic()).reverse())
})
