const { dbCatch, ErrorHandler } = require('../../../error')
const Recommendation = require('../../../Schemas/recommendation')
const { updateQuery, parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

/**
 * @api {patch} /recommendation update recommendation
 * @apiName UpdateRecommendation
 * @apiGroup In/recommendation
 * @apiDescription  更新簡歷
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }

 * @apiparam {String} _id get或add時回傳的_id
 * @apiparam {String} title 簡歷標題
 * @apiparam {String} name 姓名
 * @apiparam {String} desire_work_type 想要職位
 * @apiparam {String} contact 電話
 * @apiparam {String} email 信箱
 * @apiparam {String} diploma 學位
 * @apiparam {String[]} experience 經驗
 * @apiparam {String[]} speciality 專長
 * @apiparam {File} file 照片
 * 
 * @apiSuccess (203) - -
 * 
 * @apiError (403) {String} description not valid _id or account not match
 * @apiError (500) {String} description 資料庫錯誤
 */
const updateRec = async (req, res) => {
  const account = req.session.loginAccount

  const { _id, title, name, desire_work_type, contact, email, diploma, experience, speciality } =
    req.body

  const data = await Recommendation.findById(_id).catch(dbCatch)
  if (!data || data.account !== account)
    throw new ErrorHandler(403, 'not valid _id or account not match')

  const keys = {
    'title.title': title,
    'title.name': name,
    'title.desire_work_type': desire_work_type,
    'info.contact': contact,
    'info.email': email,
    'info.diploma': diploma,
    'spec.experience': experience,
    'spec.speciality': speciality,
    img: parseImg(req.file),
  }
  const toSet = updateQuery(keys)
  await Recommendation.findByIdAndUpdate(_id, toSet).catch((e) => {
    throw new ErrorHandler(500, '資料格式錯誤')
  })

  return res.status(203).end()
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['title', 'name', 'desire_work_type', 'contact', 'diploma'],
    type: 'string',
  },
  {
    filename: 'optional',
    field: ['email'],
    type: 'email',
  },
  {
    filename: 'optional',
    field: ['experience', 'speciality'],
    type: 'array',
  },
  { filename: 'required', field: '_id' },
]
module.exports = [valid(rules), asyncHandler(updateRec)]
