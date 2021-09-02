const { dbCatch, ErrorHandler } = require('../../../error')
const Recruitment = require('../../../Schemas/recruitment')
const asyncHandler = require('express-async-handler')

async function deleteRecruitment(req, res, next) {
  const { _id } = req.body
  const delRec = await Recruitment.findById(_id, 'account title').catch(dbCatch)
  if (!delRec) throw new ErrorHandler(404, '_id not found')
  if (delRec.account !== req.session.loginAccount && !req.session.isAuth)
    throw new ErrorHandler(403, 'not authorized')

  await Recruitment.findByIdAndDelete(_id).catch(dbCatch)
  res.status(200).send({ data: delRec.title.title })
}

/**
 * @api {delete} /deleteRecruitment delete recruitment
 * @apiName DeleteRecruitment
 * @apiGroup In/career
 * @apiDescription 用_id刪除職缺
 *
 * @apiparam {String} _id 要刪除職缺的mongodb _id
 *
 * @apiSuccess (200) data 刪除職缺標題
 *
 * @apiError (500) {String} description 資料庫錯誤
 * @apiError (403) {String} description not authorized(僅建立者與管理員可以刪除)
 * @apiError (404) {String} description _id not found
 *
 */

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'required',
    field: '_id',
  },
]
module.exports = [valid(rules), asyncHandler(deleteRecruitment)]
