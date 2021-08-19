const { dbCatch } = require('../../../error')
const Recruitment = require('../../../Schemas/recruitment')
const asyncHandler = require('express-async-handler')

const recruitment = {
  title: ['title', 'company_name', 'work_type'],
  info: ['salary', 'experience', 'diploma'],
  spec: ['requirement', 'description'],
}

const search = (req) => {
  const query = {}
  if (req.body._id) query['_id'] = req.body._id
  if (req.body.account) query['account'] = req.body.account.toLowerCase()

  recruitment.title.forEach((element) => {
    if (req.body[element] !== undefined) {
      const regex = new RegExp(req.body[element], 'i')
      query['title.' + element] = { $regex: regex }
    }
  })
  recruitment.info.forEach((element) => {
    if (req.body[element] !== undefined) {
      const regex = new RegExp(req.body[element], 'i')
      query['info.' + element] = { $regex: regex }
    }
  })
  recruitment.spec.forEach((element) => {
    if (req.body[element] !== undefined) {
      const regex = new RegExp(req.body[element], 'i')
      query['spec.' + element] = { $regex: regex }
    }
  })
  console.log('query=', query)
  return query
}

const searchRecuitment = async function (req, res, next) {
  const query = search(req)
  const objs = await Recruitment.find(query).sort({ _id: 1 }).catch(dbCatch)
  const recruitments = []
  objs.forEach((each) => {
    recruitments.push(each.getPublic())
  })
  return res.status(201).send({ data: recruitments })
}

/**
 * @api {post} /searchRecruitment search by field
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
 * 	HTTP/1.1 201 Created
 * 	[{
 *      _id: String,
 * 		title: {
 *          title: String,
 *          company_name: String,
 *          work_type: String
 *      },
 *      info: {
            salary: String,
            experience: String,
            diploma: String
 *      },
 * 		spec: {
            requirement: String,
            description: String
 *      },
        image: String
 * 	},...]
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */

module.exports = asyncHandler(searchRecuitment)
