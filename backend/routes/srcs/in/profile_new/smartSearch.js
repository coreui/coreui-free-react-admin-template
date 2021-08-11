const Profile = require('../../../Schemas/user_visual_new')
const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')

/**
 * @api {post} /smartsearchProfile reg搜尋
 * @apiName SearchProfile
 * @apiGroup In/profile_new
 *
 * @apiparam {String} keyword 用空格區分
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

module.exports = asyncHandler(async (req, res, next) => {
  const { keyword } = req.body
  const pros = await Profile.smartFind(keyword).catch(dbCatch)
  return res.status(201).send(
    pros.map((pro) => {
      const imgSrc = pro['imgSrc']
      const {
        _doc: { userimage, ...restData },
      } = pro
      return { userimage: imgSrc, ...restData }
    }),
  )
})
