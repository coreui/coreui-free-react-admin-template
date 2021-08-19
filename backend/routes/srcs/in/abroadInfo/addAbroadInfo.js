const { dbCatch } = require('../../../error')
const Abroad_info = require('../../../Schemas/abroad_info')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /addAbroadInfo add
 * @apiName addAbroadInfo
 * @apiGroup In/abroadInfo
 * @apiDescription 新增留學資訊
 *
 * @apiParam {String} title 學校名稱
 * @apiParam {String} info 學校資料超連結
 * @apiParam {File} file 學校校徽
 *
 * @apiSuccess (201) {String} title post 的 title
 *
 * @apiError (500) {String} description 資料庫錯誤
 */

module.exports = asyncHandler(async (req, res) => {
  const { title, info } = req.body
  const schoolIcon = req.file
  //console.log(schoolIcon)
  const icon = { data: schoolIcon.buffer, contentType: schoolIcon.mimetype }
  //console.log("新增abroadInfo", title)
  const objAbroadInfo = { title, info, icon }
  await new Abroad_info(objAbroadInfo).save().catch(dbCatch)
  res.status(201).send({ title })
  return title
})
