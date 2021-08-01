const { dbCatch, ErrorHandler } = require('../../../error');
const Recommendation = require('../../../Schemas/recommendation');
const asyncHandler = require('express-async-handler')

/**
 * @api {patch} /recommendation 更新簡歷
 * @apiName UpdateRecommendation
 * @apiGroup In/recommendation
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }

 * @apiparam {String} _id get或add時回傳的_id
 * @apiparam {String} title 簡歷標題
 * @apiparam {String} name 姓名
 * @apiparam {String} desire_work_type 想要職位
 * @apiparam {String} contact 電話
 * @apiparam {String} email 信箱
 * @apiparam {String} diploma 學位
 * @apiparam {String[]} experience 經驗
 * @apiparam {String[]} speciality 專長
 * @apiparam {File} file 照片
 * 
 * @apiSuccess (203) - -
 * 
 * @apiError (403) {String} description not valid _id or account not match
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res)=>{
    const account = req.session.loginAccount
    if(!account) throw new ErrorHandler(403,'not login')

    const {
        _id,
        title,name,desire_work_type,
        contact,email,diploma,
        experience,speciality
    } = req.body
    const data = await Recommendation.findById(_id).catch(dbCatch)
    if(!data || data.account!==account) throw new ErrorHandler(403,'not valid _id or account not match')

    let buffer,mimetype=undefined
    if(req.file){
        buffer = req.file.buffer
        mimetype = req.file.mimetype
    } 
    
    const keys = {
        'title.title':title,
        'title.name':name,
        'title.desire_work_type':desire_work_type,
        'info.contact':contact,
        'info.email':email,
        'info.diploma':diploma,
        'spec.experience':experience,
        'spec.speciality':speciality,
        'img.data':buffer,
        'img.contentType':mimetype
    }
    const toSet = Object.entries(keys).reduce((acc,[key,val])=>{
        if(val===undefined) return acc
        if(key in ['spec.experience','spec.speciality'] && !Array.isArray(val)) return acc
        if(val===''){
            acc.$unset[key] = ''
            return acc
        }
        acc.$set[key] = val
        return acc
    },{$set:{},$unset:{}})
    await Recommendation.findByIdAndUpdate(_id,toSet)
        .catch(e=>{throw new ErrorHandler(500,'資料格式錯誤')})

    return res.status(203).end()
})
