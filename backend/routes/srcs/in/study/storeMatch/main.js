const asyncHandle = require('express-async-handler')
const parseExcel = require('./parseExcel')
const post = require('./mail')


/**
 * @api {post} /study/sendmail 寄配對通知
 * @apiName Study_matching
 * @apiGroup In/study
 * @apiDescription 給/study/matching拿到的output.xlsx檔，並寄信
 * 
 * @apiHeaderExample {json} config
                 { "content-type": "multipart/form-data" }
 * @apiParam {File} result /study/match產生的.xlsx
 * 
 * @apiSuccess (203) {String[]} errors 發生錯誤的寄件者姓名 
 */
module.exports = [parseExcel('result'),
    asyncHandle(async (req,res,next)=>{
        const errors = await post(__dirname+'/uploads/output.xlsx')
        res.send({errors})
    }
)]