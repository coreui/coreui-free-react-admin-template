const {body} = require('express-validator');

module.exports=body('username')
			.not().isEmpty().withMessage('請填入姓名')