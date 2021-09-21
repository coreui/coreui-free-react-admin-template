const { dbCatch, ErrorHandler } = require('../../../error')
const ColOut = require('../../../Schemas/column_outline')
const ColDet = require('../../../Schemas/column_detail')
const { updateQuery, parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

const updateColumn = async (req, res, next) => {
  const { id, top, body, annotation, anno, date, title, exp, edu, intro } = req.body
  const columnImg = parseImg(req.file)

  const detailUpdate = updateQuery({ top, body, annotation })
  const outlineUpdate = updateQuery({ anno, date, title, exp, edu, intro, columnImg })

  await ColDet.findOneAndUpdate({ id }, detailUpdate).catch(dbCatch)
  await ColOut.findOneAndUpdate({ id }, outlineUpdate).catch(dbCatch)
  res.status(203).send({ id })
}

/**
 * @api {patch} /column/update update column
 * @apiName updateColumn
 * @apiGroup In/column
 * @apiDescription 管理員更新文章
 *
 * @apiParam {String[]} title 文章標題
 *    (xxxx 級 xxx (公司名稱與職位))(這邊看要不要和name,experience合併?)
 * @apiParam {String} id 文章的編號
 *    (建議yymm)
 * @apiParam {Object} top
 * @apiParam {String} top.name 標題(xxxx 級 xxx)
 * @apiParam {String} top.experience 副標題(公司名稱與職位)
 * @apiParam {String[]} top.hashtags 文章的hashtag
 *    (文章類別，訪問者姓名、級別、工作、相關組織與企業)
 * @apiParam {Object[]} body.body
 * @apiParam {String} body.body.bigtitle (一、標題，二、求學階段...)
 * @apiParam {Object[]} body.body.bigsections
 * @apiParam {String} body.body.bigsections.subtitle 子標題
 * @apiParam {String} body.body.bigsections.subsection (文章內容)
 * @apiParam {String[]} annotation.annotation 參與全人員
 * @apiParam {String[]} annotation.annotation.job 工作
 * @apiParam {String[]} annotation.annotation.contributer 人員
 *
 * @apiParam {String[]} anno [所有採訪人員姓名]
 * @apiParam {String[]} date yyyy/mm/dd 星期x
 * @apiparam {String[]} exp 職位
 * @apiParam {String[]} edu 學歷
 *    [學士:校系(畢業年分),碩士:校系(畢業年分),博士:校系(畢業年分)]
 * @apiParam {String[]} intro 簡介
 *    (1個element是一段)
 * @apiParam {File} file 頭貼
 *
 * @apiParamExample {js} Input-Example:
 *    let input = new FormData()
 *
 *    input.append("file", 採訪合照)
 *    input.append("id", "yymm")
 *    input.append("title", "2008級 方劭云（當屆最年輕升遷副教授）")
 *    input.append("top[name]", "2008級 方劭云")
 *    input.append("top[experience]", "當屆最年輕升遷副教授")
 *    input.append("top[hashtags][0]", 關鍵字1)
 *    input.append("annotation[annotation][0][job]", "撰寫")
 *    input.append("annotation[annotation][0][contributer]][]", "王曉明")
 *    input.append("anno[]", "作者1")
 *    input.append("date", "yyyy/mm/dd 星期x")
 *    input.append("exp[0]", "現任：國立臺灣科技大學電機系 副教授")
 *    input.append("edu[0]", "博士：台灣大學電子所  (2013)")
 *    input.append("intro[0]", "2008畢業於台大電機，目前任職於臺灣科技大學的方劭云教授...")
 *
 *    input.append("body[body][][bigtitle]", "一、我的大學生涯")
 *    input.append("body[body][][bigsections][0][subtitle]", "球隊與課業交織的辛苦大學生活")
 *    input.append("body[body][][bigsections][0][subsection]", "因為我是排球校隊，沒能花很多時間在系上...")
 *
 *    axios.post("/api/updateColumn", input, {headers:{'content-type': 'multipart/form-data'}})
 *
 * @apiSuccess (201) {String} id post的id
 *
 * @apiError (400) {String} description id is required
 * @apiError (500) {String} description 資料庫錯誤
 */

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['top', 'body', 'annotation'],
    type: 'object',
  },
  {
    filename: 'optional',
    field: ['date'],
    type: 'string',
  },
  { filename: 'optional', field: ['anno', 'title', 'exp', 'edu', 'intro'], type: 'array' },
  { filename: 'required', field: 'id' },
]
module.exports = [valid(rules), asyncHandler(updateColumn)]
