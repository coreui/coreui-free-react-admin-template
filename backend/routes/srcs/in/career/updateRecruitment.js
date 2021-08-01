const { dbCatch, ErrorHandler } = require('../../../error');
const Recruitment = require('../../../Schemas/recruitment');
const asyncHandler = require('express-async-handler')

async function updateRecruitment (req, res, next) {
    const toUpdate = await Recruitment.findById(req.body._id).catch(dbCatch)
    if(!toUpdate) throw new ErrorHandler(404,'_id not exists')
    if(!req.session.loginAccount || req.session.loginAccount!==toUpdate.account) throw new ErrorHandler(403,'unauthorized')
    const keys = {
        title:"title.title",
        company_name:"title.company_name",
        work_type:"title.work_type",
        salary:"info.salary",
        experience:"info.experience",
        diploma:"info.diploma",
        requirement:"spec.requirement",
        description:"spec.description"
    }
    const toSet = Object.entries(keys).reduce((acc,[key,value])=>{
        const input = req.body[key]
        if(input===undefined) return acc
        if(key in ['experience','requirement','description'] && !Array.isArray(input)) return acc
        if(input===''){
            acc.$unset[value] = ''
            return acc
        } 
        acc.$set[value] = input
        return acc
    },{$unset:{},$set:{}})
    if(req.file){
        toSet.$set["img.data"] = req.file.buffer
		toSet.$set["img.contentType"] = req.file.mimetype
    }
    await Recruitment.findByIdAndUpdate(req.body._id,toSet).catch(dbCatch)
    res.status(203).end()
}


/**
 * @api {patch} /recruitment 更新職缺
 * @apiName UpdateRecruitment
 * @apiGroup In/career
 * 
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 * 
 * @apiparam {String} _id 要更新職缺的mongodb _id
 * @apiparam {String} title 職缺標題(optional)
 * @apiparam {String} company_name 公司名稱(optional)
 * @apiparam {String} work_type 職位(ex.前端工程師)(optional)
 * @apiparam {String} salary 薪資(optional)
 * @apiparam {String[]} experience 經驗要求(optional)
 * @apiparam {String} diploma 學系要求(optional)
 * @apiparam {String[]} requirement 技能要求(optional)
 * @apiparam {String[]} description 其他描述(optional)
 * @apiparam {File} file 照片(optional)
 * 
 * @apiSuccess (203) - -
 * 
 * @apiError (404) {String} description _id not exists
 * @apiError (500) {String} description 資料庫錯誤
 * @apiError (403) {String} description unauthorized(僅建立者可以更新)
 */

module.exports = asyncHandler(updateRecruitment);