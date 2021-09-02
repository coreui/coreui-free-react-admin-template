const { dbCatch, ErrorHandler } = require('../../../error')
const Recruitment = require('../../../Schemas/recruitment')
const { updateQuery, parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

const updateRecruitment = async (req, res, next) => {
  const toUpdate = await Recruitment.findById(req.body._id).catch(dbCatch)
  if (!toUpdate) throw new ErrorHandler(404, '_id not exists')
  if (!req.session.loginAccount || req.session.loginAccount !== toUpdate.account)
    throw new ErrorHandler(403, 'unauthorized')

  const { title, company_name, work_type, salary, experience, diploma, requirement, description } =
    req.body
  const keys = {
    'title.title': title,
    'title.company_name': company_name,
    'title.work_type': work_type,
    'info.salary': salary,
    'info.experience': experience,
    'info.diploma': diploma,
    'spec.requirement': requirement,
    'spec.description': description,
    img: parseImg(req.file),
  }
  const toSet = updateQuery(keys)

  await Recruitment.findByIdAndUpdate(req.body._id, toSet).catch(dbCatch)
  res.status(203).end()
}

/**
 * @api {patch} /recruitment update recruitment
 * @apiName UpdateRecruitment
 * @apiGroup In/career
 * @apiDescription 更新一筆職缺
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 * 
 * @apiparam {String} _id 要更新職缺的mongodb _id
 * @apiparam {String} title 職缺標題(optional)
 * @apiparam {String} company_name 公司名稱(optional)
 * @apiparam {String} work_type 職位(ex.前端工程師)(optional)
 * @apiparam {String} salary 薪資(optional)
 * @apiparam {String[]} experience 經驗要求(optional)
 * @apiparam {String} diploma 學系要求(optional)
 * @apiparam {String[]} requirement 技能要求(optional)
 * @apiparam {String[]} description 其他描述(optional)
 * @apiparam {File} file 照片(optional)
 * 
 * @apiSuccess (203) - -
 * 
 * @apiError (404) {String} description _id not exists
 * @apiError (500) {String} description 資料庫錯誤
 * @apiError (403) {String} description unauthorized(僅建立者可以更新)
 */

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['title', 'company_name', 'work_type', 'salary', 'diploma', 'description'],
    type: 'string',
  },
  { filename: 'optional', field: ['experience', 'requirement'], type: 'array' },
  { filename: 'required', field: '_id' },
]
module.exports = [valid(rules), asyncHandler(updateRecruitment)]
