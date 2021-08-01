const asyncHandle = require('express-async-handler')
const parseExcel = require('./parseExcel')
const matching = require('./matching')

/**
 * @api {post} /study_matching 配對
 * @apiName Study_matching
 * @apiGroup In/study
 * @apiDescription 給學長姊跟學弟妹留學配對的.xlsx檔，幫他們配對
 * 
 * @apiHeaderExample {json} config
                 { "content-type": "multipart/form-data" }
 * @apiParam {File} senior 學長姐的senior.xlsx
 * @apiParam {File} junior 學弟妹的junior.xlsx
 * 
 * @apiSuccess (200) {File} - output.xlsx
 */
const post = asyncHandle(async (req,res,next)=>{
    const senior = req.files['senior'][0]
    const junior = req.files['junior'][0]
    console.log(senior)
    console.log(junior)
    await matching(senior.path,junior.path,__dirname+'/uploads/output.xlsx')
    // await matching(__dirname+'/uploads/senior.xlsx',__dirname+'/uploads/junior.xlsx',__dirname+'/uploads/output.xlsx')
    res.download(__dirname+'/uploads/output.xlsx')
})

module.exports = [parseExcel,post]