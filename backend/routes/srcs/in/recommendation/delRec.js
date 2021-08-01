const { dbCatch, ErrorHandler } = require('../../../error');
const Recommendation = require('../../../Schemas/recommendation');
const asyncHandler = require('express-async-handler')

/**
 * @api {delete} /recommendation 刪除簡歷
 * @apiName DeleteRecommendation
 * @apiGroup In/recommendation
 * 
 * @apiparam {String} _id get或add時回傳的_id
 * 
 * @apiSuccess (200) title title
 * 
 * @apiError (403) {String} description not valid _id or account not match
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res)=>{
    const account = req.session.loginAccount
    if(!account) throw new ErrorHandler(403,'not login')

    const {_id} = req.body
    const data = await Recommendation.findById(_id).catch(dbCatch)
    if(!data || data.account!==account) throw new ErrorHandler(403,'not valid _id or account not match')

    await Recommendation.findByIdAndDelete(_id).catch(dbCatch)
    return res.status(200).send({title:data.title.title})
})
