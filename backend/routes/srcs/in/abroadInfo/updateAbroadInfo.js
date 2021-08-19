const Abroad_info = require('../../../Schemas/abroad_info')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')

/**
 * @api {post} /updateAbroadInfo update
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
  //const session_auth = (req.session.isAuth)
  const { _id, title, info, file } = req.body
  if (!_id) throw new ErrorHandler(403, '_id not given')
  const obj = await Abroad_info.findOne({ _id }, 'title info file').catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '資料不存在')
  await Abroad_info.updateOne({ _id }, { $set: { title, info, file } }).catch(dbCatch)
  return res.status(200).end()
}
module.exports = asyncHandler(updateAbroadInfo)
