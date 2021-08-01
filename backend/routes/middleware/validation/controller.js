const { validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error');

const validationHandling = (req,res,next)=>{
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("validation Errors:",errors.array())
		throw new ErrorHandler(400,errors.array()[0].msg)
	}else{
		console.log("validation pass")
		return next()
	}
}
module.exports = validationHandling