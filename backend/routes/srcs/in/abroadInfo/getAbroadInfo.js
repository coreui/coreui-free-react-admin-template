const Abroad_info = require('../../../Schemas/abroad_info')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')

/**
 * @api {post} /getAbroadInfo get
 * @apiName GetAbroadInfo
 * @apiGroup In/abroadInfo
 * @apiDescription 拿留學資訊
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [{
 *     iconSrc:string
 *     title:string
 *     info:string
 * }]
 *
 * @apiError (404) {String} description 資料不存在
 * @apiError (500) {String} description 資料庫錯誤
 */

module.exports = asyncHandler(async (req, res, next) => {
  const getDone = await Abroad_info.find({}).catch(dbCatch)
  if (!getDone) throw new ErrorHandler(404, '找不到資料')
  const information = getDone.map((element) => {
    const { iconSrc, title, info, _id } = element
    return {
      iconSrc,
      title,
      info,
      _id,
    }
  })
  return res.status(201).send(information)
})
