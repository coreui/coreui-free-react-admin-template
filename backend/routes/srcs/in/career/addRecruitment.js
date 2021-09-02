const { dbCatch } = require('../../../error')
const Recruitment = require('../../../Schemas/recruitment')
const { parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /addRecruitment add recruitment
 * @apiName AddRecruitment
 * @apiGroup In/career
 * @apiDescription 新增一筆職缺
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 * 
 * @apiparam {String} title 職缺標題
 * @apiparam {String} company_name 公司名稱
 * @apiparam {String} work_type 職位(ex.前端工程師)
 * @apiparam {String} salary 薪資
 * @apiparam {String[]} experience 經驗要求
 * @apiparam {String} diploma 學系要求
 * @apiparam {String[]} requirement 技能要求
 * @apiparam {String[]} description 其他描述
 * @apiparam {File} file 照片
 * 
 * @apiSuccess (201) data 職缺標題
 * @apiSuccess (201) _id 職缺_id(用來search,update,delete)
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */
const addRecru = async (req, res) => {
  const account = req.session.loginAccount

  const { title, company_name, work_type, salary, experience, diploma, requirement, description } =
    req.body
  const img = parseImg(req.file)

  const { _id } = await new Recruitment({
    account,
    title: {
      title,
      company_name,
      work_type,
    },
    info: {
      salary,
      experience,
      diploma,
    },
    spec: {
      requirement,
      description,
    },
    img,
  })
    .save()
    .catch(dbCatch)

  res.status(201).send({ data: title, _id })
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['title', 'company_name', 'work_type', 'salary', 'diploma', 'description'],
    type: 'string',
  },
  { filename: 'optional', field: ['experience', 'requirement'], type: 'array' },
]
module.exports = [valid(rules), asyncHandler(addRecru)]
