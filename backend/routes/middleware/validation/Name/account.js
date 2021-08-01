const {body} = require('express-validator');

module.exports=body('account')
			.isLength({min:9,max:9}).withMessage("學號長度錯誤")
			.matches(/^[a-zA-Z]\d{8}$/).withMessage("學號形式錯誤")