//srcs/chLogin.js
const { dbCatch, ErrorHandler } = require('../../../error')
const Visual = require('../../../Schemas/user_visual_new')
const Login = require('../../../Schemas/user_login')
const { updateQuery, parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

/**
 * @api {patch} /profile update profile
 * @apiName ChangeProfile
 * @apiGroup In/profile_new
 * @apiDescription 更新porfile
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 * 
 * @apiparam {File} userimage 大頭貼
 * @apiparam {String} username 名字//account禁止修改
 * @apiparam {String} nickname 綽號
 * @apiparam {String} profile 自介
 * @apiparam {String} publicEmail 公開信相
 * @apiparam {String} cellphone 手機
 * @apiparam {String} CC city and country
 * @apiparam {String} web 個人部落格 
 * @apiparam {String} facebook facebook
 * @apiparam {String} Linkedin Linkedin
 * @apiparam {String} major 主修
 * @apiparam {String} double_major 雙主修
 * @apiparam {String} minor 輔修
 * @apiparam {String} master 碩士
 * @apiparam {String} doctor 博士
 * @apiparam {Object[]} Occupation 工作(因為array運算複雜，請直接給我完整的覆蓋)
 * @apiparam {String} Occupation.C 公司，append('Occupation[${index}][C]',vlaue)
 * @apiparam {String} Occupation.O 部門，append('Occupation[${index}][O]',vlaue)
 * @apiparam {String} Occupation.P 職位，append('Occupation[${index}][P]',vlaue)
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (404) {String} description 帳號不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const updateProfile = async (req, res, next) => {
  let session_account = req.session.loginAccount
  const obj = await Visual.findOne({ account: session_account }).catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '帳號不存在')

  const query = ({
    username,
    nickname,
    profile,
    publicEmail,
    cellphone,
    CC,
    web,
    facebook,
    Linkedin,
    github,
    major,
    double_major,
    minor,
    master,
    doctor,
    Occupation,
  } = req.body)
  query['userimage'] = parseImg(req.file)
  const toSet = updateQuery(query)
  console.log('toSet', toSet)
  await Visual.updateOne({ account: session_account }, toSet).catch(dbCatch)

  if (req.body.username !== undefined && req.body.username !== '') {
    await Login.updateOne(
      { account: session_account },
      { $set: { username: req.body.username } },
    ).catch(dbCatch)
  }
  return res.status(204).end()
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: [
      'account',
      'username',
      'nickname',
      'profile',
      'publicEmail',
      'cellphone',
      'CC',
      'web',
      'facebook',
      'Linkedin',
      'github',
      'major',
      'double_major',
      'minor',
      'master',
      'doctor',
    ],
    type: 'string',
  },
  {
    filename: 'optional',
    field: ['publicEmail'],
    type: 'email',
  },
  {
    filename: 'optional',
    field: ['Occupation'],
    type: 'array',
  },
]
module.exports = [valid(rules), asyncHandler(updateProfile)]
