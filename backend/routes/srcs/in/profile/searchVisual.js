const Visual = require('../../../Schemas/user_visual')
const search = require('./DBquery/searchOr')
const getPublic = require('./DBquery/getPublic')
const { dbCatch } = require('../../../error')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /searchVisual search
 * @apiName SearchVisual
 * @apiGroup In/profile
 * @apiDescription 搜尋porfile
 *
 * @apiparam {String} account 學號(用'x'進行模糊搜尋, ex.'b079010xx')
 * @apiparam {String} username 名字
 * @apiparam {String} nickname 綽號
 * @apiparam {String} profile 自介
 * @apiparam {String} publicEmail 公開信相
 * @apiparam {String} office 公司電話
 * @apiparam {String} homephone 家裡電話
 * @apiparam {String} cellphone 手機
 * @apiparam {String} CC city and country
 * @apiparam {String} web 個人部落格
 * @apiparam {String} facebook facebook
 * @apiparam {String} Linkedin Linkedin
 * @apiparam {Object} education 學位
 * @apiparam {String} education.major 主修(或者'education.major')
 * @apiparam {String} education.double_major 雙主修(或者'education.double_major')
 * @apiparam {String} education.minor 輔修(或者'education.minor')
 * @apiparam {String} education.master 碩士(或者'education.master')
 * @apiparam {String} education.doctor 博士(或者'education.doctor')
 * @apiparam {Object} Occupation 工作(COP3個中也可以只填1個或2個)
 * @apiparam {String} Occupation.C 公司
 * @apiparam {String} Occupation.O 部門
 * @apiparam {String} Occupation.P 職位
 *
 * @apiSuccess (201) {Object[]} data Visual資料(請用res.data.data拿到)
 * @apiSuccess (201) {String} data.userimage 大頭貼(使用<code>\<img src={userimage}/></code>)
 * @apiSuccess (201) {String} data.account 學號
 * @apiSuccess (201) {String} data.username 名字
 * @apiSuccess (201) {String} data.nickname 綽號
 * @apiSuccess (201) {String} data.profile 自介
 * @apiSuccess (201) {String} data.publicEmail 公開信相
 * @apiSuccess (201) {String} data.office 公司電話
 * @apiSuccess (201) {String} data.homephone 家裡電話
 * @apiSuccess (201) {String} data.cellphone 手機
 * @apiSuccess (201) {String} data.CC city and country
 * @apiSuccess (201) {String} data.web 個人部落格
 * @apiSuccess (201) {String} data.facebook facebook
 * @apiSuccess (201) {String} data.Linkedin Linkedin
 * @apiSuccess (201) {Object} data.education 學位
 * @apiSuccess (201) {Object} data.education.major 學士
 * @apiSuccess (201) {String} data.education.major.SD school and department 學校&系
 * @apiSuccess (201) {String} data.education.major.Note 備註, ex.在學、畢業
 * @apiSuccess (201) {Object} data.education.double_major 雙主修 {SD,Note}
 * @apiSuccess (201) {Object} data.education.minor 輔系 {SD,Note}
 * @apiSuccess (201) {Object} data.education.master 碩士 {SD,Note}
 * @apiSuccess (201) {Object} data.education.doctor 博士 {SD,Note}
 * @apiSuccess (201) {Object[]} data.Occupation 職業
 * @apiSuccess (201) {String} data.Occupation.C 公司()
 * @apiSuccess (201) {String} data.Occupation.O 部門
 * @apiSuccess (201) {String} data.Occupation.P 職稱
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const searchVisual = async function (req, res, next) {
  const query = search(req)
  const objs = await Visual.find(query, { _id: 0 }).catch(dbCatch)
  const users = []
  objs.forEach((person) => {
    users.push(getPublic(person))
  })
  return res.status(201).send({ data: users })
}
module.exports = asyncHandler(searchVisual)
