const Pending = require('../../../Schemas/user_pending')
const { parseImg } = require('../../../Schemas/query')
const { ErrorHandler, dbCatch } = require('../../../error')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /register_step2 registerStep2
 * @apiName RegisterStep2
 * @apiGroup Out/account
 * @apiDescription 註冊，新增照片(供管理員檢視)
 * 
 * @apiHeaderExample {json} config
                 { "content-type": "multipart/form-data" }
 *
 * @apiparam {String} account 學號
 * @apiparam {File} file 身分證明
 * 
 * @apiSuccess (201) {String} - - 
 * 
 * @apiError (400) {String} description img not given
 * @apiError (404) {String} description account not found
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */

const main = async (req, res) => {
  if (!req.file) throw new ErrorHandler(400, 'img not given')
  const { account } = req.body
  const isPending = await Pending.exist({ account }).catch(dbCatch)
  if (!isPending) throw new ErrorHandler(404, 'account not found')
  await Pending.findOneAndUpdate(
    { account },
    { img: parseImg(req.file) },
    {
      useFindAndModify: false,
    },
  ).catch(dbCatch)
  return res.end()
}

const valid = require('../../../middleware/validation')
const rules = ['account']
module.exports = [valid(rules), asyncHandler(main)]
