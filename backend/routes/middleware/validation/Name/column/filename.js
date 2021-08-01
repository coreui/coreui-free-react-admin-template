const {body} = require('express-validator');

module.exports=body('filename')
			.isLength({min:4,max:4}).withMessage("filename長度錯誤，格式應為\'yymm\'")
			.matches(/^([0-9]{2}(0[1-9]|1[0-2]))/).withMessage("filename輸入格式錯誤，格式應為\'yymm\'")