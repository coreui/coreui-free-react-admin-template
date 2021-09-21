const Recruitment = require('../../../Schemas/recruitment')
const asyncHandler = require('express-async-handler')
const { findWithLimit } = require('../../../Schemas/query')

/**
 * @api {get} /recruitment show my recruitment
 * @apiName ShowMyRecruitment
 * @apiGroup In/career
 * @apiDescription 顯示我的所有職缺
 *
 * @apiparam {Number} page default 1
 * @apiparam {Number} perpage default 20
 *
 * @apiSuccess (201) {Object[]} - 職缺們
 * @apiSuccess (201) {String} -._id mongodb _id(for delete)
 * @apiSuccess (201) {Object} -.title 標題相關
 * @apiSuccess (201) {String} -.title.title 標題
 * @apiSuccess (201) {String} -.title.company_name 公司名稱
 * @apiSuccess (201) {String} -.title.work_type 職位(ex.前端工程師)
 * @apiSuccess (201) {Object} -.info 工作資訊
 * @apiSuccess (201) {String} -.info.salary 薪資
 * @apiSuccess (201) {String[]} -.info.experience 經驗要求
 * @apiSuccess (201) {String} -.info.diploma 學院要求
 * @apiSuccess (201) {Object} -.spec 詳細描述
 * @apiSuccess (201) {String[]} -.spec.requirement 技能要求
 * @apiSuccess (201) {String[]} -.spec.description 工作的其他描述
 * @apiSuccess (201) {String} -.image 公司頭像(Ex. <code>\<img src={image}/></code>)
 *
 * @apiError (403) {String} description not login
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next) => {
  const account = req.session.loginAccount
  const { page, perpage } = req.body
  const [recs, maxPage] = await findWithLimit(Recruitment, { account }, page, perpage || 20)
  res.status(200).send(recs.map((obj) => obj.getPublic()).reverse())
})
