const { dbCatch, ErrorHandler } = require('../../../error')
const ColOut = require('../../../Schemas/column_outline')
const ColDet = require('../../../Schemas/column_detail')
const asyncHandler = require('express-async-handler')

const deletCol = async (req, res, next) => {
  const { id } = req.body
  await ColDet.deleteOne({ id }).catch(dbCatch)
  await ColOut.deleteOne({ id }).catch(dbCatch)
  res.status(203).send({ id })
}

/**
 * @api {delete} /column/delete delete column
 * @apiName deleteColumn
 * @apiGroup In/column
 * @apiDescription 管理員刪除文章
 *
 * @apiParam {String} id 文章的編號
 *    (建議yymm)
 *
 * @apiSuccess (201) {String} id post的id
 *
 * @apiError (400) {String} description id is required
 */

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: 'id' }]
module.exports = [valid(rules), asyncHandler(deletCol)]
