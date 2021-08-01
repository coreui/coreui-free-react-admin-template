const {body} = require('express-validator');

// module.exports=(req)=>{
// 	return body('ConfirmPassword')
// 			.custom((val,{req})=>{
// 				if(val!==req.body.password){
// 					console.log(val,'!=\n',req.body.password);
// 					throw new Error('兩段密碼不一致');
// 				}
// 				return true
// 			})
// }

module.exports=body('ConfirmPassword')
			.custom((val,{req})=>{
				if(val!==req.body.password){
					console.log(val,'!=\n',req.body.password);
					throw new Error('兩段密碼不一致');
				}
				return true
			})