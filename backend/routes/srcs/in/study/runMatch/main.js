const asyncHandle = require('express-async-handler')
const parseExcel = require('./parseExcel')
const matching = require('./matching')

/**
 * @api {post} /study_matching 配對
 * @apiName Study_matching
 * @apiGroup In/study
 * @apiDescription 給學長姊跟學弟妹留學配對的.xlsx檔，幫他們配對
 * 
 * @apiHeaderExample {json} config
                 { "content-type": "multipart/form-data" }
 * @apiParam {File} senior 學長姐的senior.xlsx
 * @apiParam {File} junior 學弟妹的junior.xlsx
 * 
 * @apiSuccess (200) {File} - output.xlsx
 */
const post = asyncHandle(async (req, res, next) => {
  await matching()
  res.setHeader('Content-Type', 'multipart/form-data')
  res.download(__dirname + '/uploads/result.xlsx')
})

module.exports = [parseExcel, post]
