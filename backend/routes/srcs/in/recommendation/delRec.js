const { dbCatch, ErrorHandler } = require('../../../error')
const Recommendation = require('../../../Schemas/recommendation')
const asyncHandler = require('express-async-handler')

/**
 * @api {delete} /recommendation delete recommendation
 * @apiName DeleteRecommendation
 * @apiGroup In/recommendation
 * @apiDescription 刪除簡歷
 *
 * @apiparam {String} _id get或add時回傳的_id
 *
 * @apiSuccess (200) title title
 *
 * @apiError (403) {String} description not authorized
 * @apiError (404) {String} description _id not found or not authorized
 * @apiError (500) {String} description 資料庫錯誤
 */
const delRec = async (req, res) => {
  const account = req.session.loginAccount
  const { _id } = req.body
  const delRec = await Recommendation.findById(_id, 'account title').catch(dbCatch)
  if (!delRec) throw new ErrorHandler(404, '_id not found')
  if (delRec.account !== account && !req.session.isAuth)
    throw new ErrorHandler(403, 'not authorized')

  await Recommendation.findByIdAndDelete(_id).catch(dbCatch)
  return res.status(200).send({ title: delRec.title.title })
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: '_id' }]
module.exports = [valid(rules), asyncHandler(delRec)]
