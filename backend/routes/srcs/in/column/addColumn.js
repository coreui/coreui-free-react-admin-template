const { dbCatch } = require('../../../error')
const Column_detail = require('../../../Schemas/column_detail')
const Column_outline = require('../../../Schemas/column_outline')
const asyncHandler = require('express-async-handler')
  
  /**
   * @api {post} /addColumn 管理員新增文章
   * @apiName addColumn
   * @apiGroup In/column
   * 
   * @apiParam {String[]} title 文章標題
   *    (xxxx 級 xxx (公司名稱與職位))
   * @apiParam {String} detail_id 文章在column_details的編號
   *    (column_yymm) 
   * @apiParam {String[]} hashtags 文章的hashtag
   *    (文章類別，訪問者姓名、級別、工作、相關組織與企業) 
   * @apiParam {Object[]} sections 
   * @apiParam {String} sections.bigtitle (一、標題，二、求學階段...)
   * @apiParam {Object[]} sections.sections
   * @apiParam {String} sections.sections.title (各bigtitle的小主題)
   * @apiParam {String} sections.sections.section (文章內容)
   * @apiParam {String[]} annotation 參與人員
   *    (工作:人員)
   * @apiParam {String} filename (yymm)
   * @apiParam {String[2]} anno 
   *    ([所有採訪人員姓名,| yyyy/mm/dd 星期x])
   * @apiparam {String[]} exp 採訪者的姓名與現任職位
   * @apiParam {String[]} edu 採訪者的學歷
   *    (學士:校系(畢業年分) 碩士:校系(畢業年分) 博士:校系(畢業年分))
   * @apiParam {String[]} intro 簡介
   *    (1個element是一段)
   * @apiParam {String} outline_id 文章在column_outlines的id
   *    (Column_Block_yymm)
   * 
   * @apiParamExample {js} Input-Example:
   *    let input=new FormData()
   * 
   *    input.append("file", 採訪合照)
   *    input.append("title", "2008級 方劭云（當屆最年輕升遷副教授）")
   *    input.append("detail_id", "column_yymm")
   *    input.append("hashtags[0]", 關鍵字1)
   *    input.append("hashtags[1]", 關鍵字2) ...
   *    input.append("annotation[0]", "特別感謝:...")
   *    input.append("annotation[1]", "撰寫:...") ...
   *    input.append("anno[0]", "作者1 作者2 ...")
   *    input.append("anno[1]", "| yyyy/mm/dd 星期x")
   *    input.append("exp[0]", "現任：國立臺灣科技大學電機系 副教授") ...
   *    input.append("edu[0]", "博士：台灣大學電子所  (2013)") ...
   *    input.append("intro[0]", "2008畢業於台大電機，目前任職於臺灣科技大學的方劭云教授...") ...
   *    input.append("outline_id", "Column_Block_yymm")
   *    
   *    input.append("sections[0][bigtitle]", "一、我的大學生涯")
   *    input.append("sections[0][sections][0][title]", "球隊與課業交織的辛苦大學生活")
   *    input.append("sections[0][sections][0][section]", "因為我是排球校隊，沒能花很多時間在系上...")
   *    input.append("sections[0][sections][1][title]", "求學生涯印象最深刻的事")
   *    input.append("sections[0][sections][1][section]", "雖然有嘗試做過專題，但一直到大四要推甄的時候我還是很徬徨...")
   *    input.append("sections[0][sections][2...][title/section]", ...)
   * 
   *    input.append("sections[1][bigtitle]", "二、攻讀碩士博士")
   *    input.append("sections[1][sections][0][title]", "漫長的研究所生涯")
   *    input.append("sections[1][sections][0][section]", "我讀完一年碩士之後就直升攻讀博士，再花四年拿到博士學位...")
   *    input.append("sections[1][sections][1...][title/section]", ...)
   *    ...
   *    
   *    axios.post("/api/addColumn", input, {headers:{'content-type': 'multipart/form-data'}})
   * 
   * @apiSuccess (201) {String} title post的title
   * @apiSuccess (201) {String} filename post的filename
   * 
   * @apiError (500) {String} description 資料庫錯誤
   */

module.exports = asyncHandler(async (req, res)=>{
    const {title,detail_id,hashtags,sections,annotation,filename, 
        anno,exp,edu,intro,outline_id} = req.body
    const Imgcolumn = req.file
    const columnImg = {data:Imgcolumn.buffer,contentType:Imgcolumn.mimetype}
    console.log(req.body)
    console.log(columnImg)
    const objDetail = {title,hashtags,sections,annotation,id:detail_id}
    const objOutline = {filename,anno,title,exp,edu,intro,id:outline_id,columnImg}
    
    //var query = {ID: ID};
    console.log("新增column_detail")
    await new Column_detail(objDetail).save().catch(dbCatch)
    console.log("新增column_outline")
    await new Column_outline(objOutline).save().catch(dbCatch)
    res.status(201).send({title, filename})
    console.log(title)
    return title
})