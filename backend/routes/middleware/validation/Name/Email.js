const {body} = require('express-validator');

module.exports=body('Email','Invalid Email').exists()
			.isEmail()