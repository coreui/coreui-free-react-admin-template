const Visual = require('../../../Schemas/user_visual_new')
const { dbCatch } = require('../../../error')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /searchProfile search by fields
 * @apiName SearchProfile
 * @apiGroup In/profile_new
 * @apiDescription 給定欄位搜尋porfile(OR)
 *
 * @apiparam {String} account 學號(用'x'進行模糊搜尋, ex.'b079010xx')
 * @apiparam {String} username 名字
 * @apiparam {String} nickname 綽號
 * @apiparam {String} profile 自介
 * @apiparam {String} publicEmail 公開信相
 * @apiparam {String} cellphone 手機
 * @apiparam {String} CC city and country
 * @apiparam {String} web 個人部落格
 * @apiparam {String} facebook facebook
 * @apiparam {String} Linkedin Linkedin
 * @apiparam {String} github github
 * @apiparam {Object} major 主修
 * @apiparam {String} double_major 雙主修
 * @apiparam {String} minor 輔修
 * @apiparam {String} master 碩士
 * @apiparam {String} doctor 博士
 * @apiparam {Object} Occupation 工作(這裡是obj不是array喔，會用and搜尋)(COP3個中也可以只填1個或2個)
 * @apiparam {String} Occupation.C 公司
 * @apiparam {String} Occupation.O 部門
 * @apiparam {String} Occupation.P 職位
 *
 * @apiSuccess (201) {String} userimage 大頭貼(使用<code>\<img src={userimage}/></code>)
 * @apiSuccess (201) {String} account 學號
 * @apiSuccess (201) {String} username 名字
 * @apiSuccess (201) {String} nickname 綽號
 * @apiSuccess (201) {String} profile 自介
 * @apiSuccess (201) {String} publicEmail 公開信相
 * @apiSuccess (201) {String} cellphone 手機
 * @apiSuccess (201) {String} CC city and country
 * @apiSuccess (201) {String} web 個人部落格
 * @apiSuccess (201) {String} facebook facebook
 * @apiSuccess (201) {String} Linkedin Linkedin
 * @apiSuccess (201) {String} github github
 * @apiSuccess (201) {String} major 學士
 * @apiSuccess (201) {String} double_major 雙主修
 * @apiSuccess (201) {String} minor 輔系
 * @apiSuccess (201) {String} master 碩士
 * @apiSuccess (201) {String} doctor 博士
 * @apiSuccess (201) {Object[]} Occupation 職業
 * @apiSuccess (201) {String} Occupation.C 公司
 * @apiSuccess (201) {String} Occupation.O 部門
 * @apiSuccess (201) {String} Occupation.P 職稱
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const srhProfile = async function (req, res, next) {
  const query = search(req)
  console.log('query', query)
  const objs = await Visual.find(query, { _id: 0 }).catch(dbCatch)
  const users = objs.map((person) => {
    const imgSrc = person['imgSrc']
    const {
      _doc: { userimage, ...restData },
    } = person
    return { userimage: imgSrc, ...restData }
  })
  return res.status(201).send(users)
}

const search = (req) => {
  const query = []

  const { account } = req.body
  if (account) {
    if (account.includes('x'))
      query.push({ account: { $regex: new RegExp(account.replace(/x/g, '.')) } })
    else query.push({ account })
  }

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
    // 'Occupation'
  ]
  iter.forEach((key) => {
    const value = req.body[key]
    if (value === undefined) return
    const reg = new RegExp(value.replace(' ', '|'), 'i')
    const obj = {}
    obj[key] = reg
    query.push(obj) //{username:'陳君輔'}
  })

  const { Occupation } = req.body
  if (Occupation !== undefined) {
    const { O, C, P } = Occupation
    const elem = {}
    if (O !== undefined) elem.O = new RegExp(O.replace(' ', '|'), 'i')
    if (C !== undefined) elem.C = new RegExp(C.replace(' ', '|'), 'i')
    if (P !== undefined) elem.P = new RegExp(P.replace(' ', '|'), 'i')
    const obj = { Occupation: { $elemMatch: elem } }
    query.push(obj)
  }

  return query.length === 0 ? {} : { $or: query }
}

module.exports = asyncHandler(srhProfile)
