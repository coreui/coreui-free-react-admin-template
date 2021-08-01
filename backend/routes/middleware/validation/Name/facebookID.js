const {body} = require('express-validator');

module.exports=body('facebookID')
			.isLength({min:1}).withMessage("請輸入FBID")
            .matches(/^[0-9]+$/).withMessage("FB的ID必須都是數字組成")