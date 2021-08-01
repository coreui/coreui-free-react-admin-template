const {body} = require('express-validator');

module.exports=body('account')
			.isLength({min:9,max:9}).withMessage("學號長度錯誤，若要進行模糊搜尋請用x表示，例如'b079010xx'")