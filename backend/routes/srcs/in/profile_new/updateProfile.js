//srcs/chLogin.js
const { dbCatch, ErrorHandler } = require('../../../error')
const Visual = require('../../../Schemas/user_visual_new')
const Login = require('../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

/**
 * @api {patch} /profile 更新porfile
 * @apiName ChangeProfile
 * @apiGroup In/profile_new
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
  if (!session_account) session_account = 'b07901029' //return res.status(403).send('not login')
  const obj = await Visual.findOne({ account: session_account }).catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '帳號不存在')
  console.log(req.body)
  const update = updateFormat(req)
  console.log('update', update)
  await Visual.updateOne({ account: session_account }, update).catch(dbCatch)
  if (req.body.username !== undefined && req.body.username !== '') {
    await Login.updateOne(
      { account: session_account },
      { $set: { username: req.body.username } },
    ).catch(dbCatch)
  }
  return res.status(204).end()
}
const updateFormat = (req) => {
  const set = {}
  const unset = {}
  const iter = [
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
    'Occupation',
  ]
  iter.forEach((key) => {
    const value = req.body[key]
    if (value === undefined) return
    if (key !== 'username' && value === '') return (unset[key] = '')
    if (key === 'Occupation' && !Array.isArray(value)) return
    set[key] = value
  })
  if (req.file) {
    set['userimage.data'] = req.file.buffer
    set['userimage.contentType'] = req.file.mimetype
    console.log('get img', set['userimage.contentType'])
  }
  return { $set: set, $unset: unset }
}

module.exports = asyncHandler(updateProfile)
