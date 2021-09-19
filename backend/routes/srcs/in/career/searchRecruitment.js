const { dbCatch } = require('../../../error')
const Recruitment = require('../../../Schemas/recruitment')
const { searchQuery } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

const searchRecuitment = async function (req, res, next) {
  const {
    _id,
    account,
    title,
    company_name,
    work_type,
    salary,
    experience,
    diploma,
    requirement,
    description,
  } = req.body
  const keys = {
    _id,
    account,
    'title.title': title,
    'title.company_name': company_name,
    'title.work_type': work_type,
    'info.salary': salary,
    'info.experience': experience,
    'info.diploma': diploma,
    'spec.requirement': requirement,
    'spec.description': description,
  }
  const query = searchQuery(keys)

  const recrus = await Recruitment.find(query).catch(dbCatch)
  return res.status(201).send(recrus.map((recru) => recru.getPublic()).reverse())
}

/**
 * @api {post} /searchRecruitment search recruitment by field
 * @apiName SearchRecruitment
 * @apiGroup In/career
 * @apiDescription 指定欄位搜尋職缺
 * 
 * @apiparam {String} _id _id (optional)
 * @apiparam {String} account 學號 (optional)
 * @apiparam {String} title 職缺標題 (optional)
 * @apiparam {String} company_name 公司名稱 (optional)
 * @apiparam {String} work_type 職位 (optional)
 * @apiparam {String} salary 薪資 (optional)
 * @apiparam {String} experience 經驗要求 (optional)
 * @apiparam {String} diploma 學系要求 (optional)
 * @apiparam {String} requirement 技能要求 (optional)
 * @apiparam {String} description 其他描述 (optional)
 * 
 * @apiSuccessExample {json} Success-Response:
 * 	[{
 *      '_id': 'String',
 * 		'title': {
 *          'title': 'String',
 *          'company_name': 'String',
 *          'work_type': 'String'
 *      },
 *      'info': {
            'salary': 'String',
            'experience': ['String'],
            'diploma': 'String'
 *      },
 * 		  'spec': {
            'requirement': ['String'],
            'description': 'String'
 *      },
        'image': 'String'
 * 	},]
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: [
      '_id',
      'account',
      'title',
      'company_name',
      'work_type',
      'salary',
      'experience',
      'diploma',
      'requirement',
      'description',
    ],
    type: 'string',
  },
]
module.exports = [valid(rules), asyncHandler(searchRecuitment)]
