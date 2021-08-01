const {body} = require('express-validator');

module.exports=body('password')
			.isLength({min:2}).withMessage("密碼過短")
			.matches(/^\w{2,30}$/).withMessage("包含特殊字符")