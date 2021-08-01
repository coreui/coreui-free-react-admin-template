const {body} = require('express-validator');

module.exports=body('outline_id')
			.isLength({min:17,max:17}).withMessage("outline_id長度錯誤，格式應為\'Column_Block_yymm\'")
			.matches(/^(Column_Block_[0-9]{2}(0[1-9]|1[0-2]))/).withMessage("outline_id輸入格式錯誤，格式應為\'Column_Block_yymm\'")