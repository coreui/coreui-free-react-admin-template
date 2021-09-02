const Abroad_info = require('../../../Schemas/abroad_info')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')

/**
 * @api {post} /getAbroadInfo get abroadInfo
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
 * @apiError (500) {String} description 資料庫錯誤
 */

module.exports = asyncHandler(async (req, res, next) => {
  const infos = await Abroad_info.find().catch(dbCatch)
  return res.status(201).send(infos.map((info) => info.getPublic()))
})
