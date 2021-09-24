const { dbCatch, ErrorHandler } = require('../../../error')
const Recommendation = require('../../../Schemas/recommendation')
const { searchQuery, findWithLimit } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')
/**
 * @api {get} /recommendation search recommendation by field
 * @apiName ShowRecommendation
 * @apiGroup In/recommendation
 * @apiDescription 搜尋簡歷
 *
 * @apiparam {String} _id _id
 * @apiparam {String} account 學號
 * @apiparam {String} title 簡歷標題
 * @apiparam {String} name 姓名
 * @apiparam {String} desire_work_type 想要職位
 * @apiparam {String} contact 電話
 * @apiparam {String} email 信箱
 * @apiparam {String} diploma 學位
 * @apiparam {String} experience 經驗
 * @apiparam {String} speciality 專長
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
const showRec = async (req, res, next) => {
  const {
    account,
    _id,
    title,
    name,
    desire_work_type,
    contact,
    email,
    diploma,
    experience,
    speciality,
  } = req.query
  const query = {
    _id,
    account,
    'title.title': title,
    'title.name': name,
    'title.desire_work_type': desire_work_type,
    'info.contact': contact,
    'info.email': email,
    'info.diploma': diploma,
    'spec.experience': experience,
    'spec.speciality': speciality,
  }
  const sq = searchQuery(query)
  const { page, perpage } = req.query
  const [recs, maxPage] = await findWithLimit(Recommendation, sq, page, perpage || 20) //Recommendation.find(sq).catch(dbCatch)
  res.status(200).send({ data: recs.map((obj) => obj.getPublic()).reverse(), maxPage })
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: [
      'account',
      '_id',
      'title',
      'name',
      'desire_work_type',
      'contact',
      'email',
      'diploma',
      'experience',
      'speciality',
    ],
    method: 'get',
    type: 'string',
  },
]
module.exports = [valid(rules), asyncHandler(showRec)]
