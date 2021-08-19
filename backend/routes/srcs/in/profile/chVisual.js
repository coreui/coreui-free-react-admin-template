//srcs/chLogin.js
const { dbCatch, ErrorHandler } = require('../../../error')
const Visual = require('../../../Schemas/user_visual')
const updatePro = require('./DBquery/update')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /chVisual update
 * @apiName ChangeVisual
 * @apiGroup In/profile
 * @apiDescription 更新profile
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 * 
 * @apiparam {File} userimage 大頭貼
 * @apiparam {Obejct} account 學號(可以只有show或data)
 * @apiparam {String} account.data 學號(或用'account.data')
 * @apiparam {Boolean} account.show 是否顯示學號(或用'account.show')
 * @apiparam {Object} username 名字 {show,data}
 * @apiparam {Object} nickname 綽號 {show,data}
 * @apiparam {Object} profile 自介 {show,data}
 * @apiparam {Object} publicEmail 公開信相 {show,data}
 * @apiparam {Object} office 公司電話 {show,data}
 * @apiparam {Object} homephone 家裡電話 {show,data}
 * @apiparam {Object} cellphone 手機 {show,data}
 * @apiparam {Object} CC city and country {show,data}
 * @apiparam {Object} web 個人部落格 {show,data}
 * @apiparam {Object} facebook facebook {show,data}
 * @apiparam {Object} Linkedin Linkedin {show,data}
 * @apiparam {Object} education 學位
 * @apiparam {Object} education.major 主修
 * @apiparam {Boolean} education.major.show 是否顯示(或用'education.major.show')
 * @apiparam {String} education.major.SD school and department(或用'education.major.SD')
 * @apiparam {String} education.major.Note 備註(或用'education.major.Note')
 * @apiparam {Object} education.double_major 雙主修 {show,SD,Note}
 * @apiparam {Object} education.minor 輔修 {show,SD,Note}
 * @apiparam {Object} education.master 碩士 {show,SD,Note}
 * @apiparam {Object} education.doctor 博士 {show,SD,Note}
 * @apiparam {Object[]} Occupation 工作(因為array運算複雜，請直接給我完整的覆蓋)
 * @apiparam {Boolean} Occupation.show 是否顯示
 * @apiparam {String} Occupation.C 公司
 * @apiparam {String} Occupation.O 部門
 * @apiparam {String} Occupation.P 職位
 * 
 * @apiSuccess (204) -
 * 
 * @apiError (404) {String} description 帳號不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const chVisual = async (req, res, next) => {
  const session_account = req.session.loginAccount

  const obj = await Visual.findOne({ 'account.data': session_account }).catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '帳號不存在')
  const update = updatePro(req)
  await Visual.updateOne({ 'account.data': session_account }, update).catch(dbCatch)
  return res.status(204).end()
}
module.exports = asyncHandler(chVisual)
