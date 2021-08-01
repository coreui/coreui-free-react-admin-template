//srcs/login.js
const Login = require('../../../Schemas/user_login');
const crypto = require("crypto");

module.exports = async function (req, res, next) {
	const account = req.body.account.toLowerCase();
	
	try{
		const query = {account: account};
		const obj = await Login.findOne(query).populate('visual');
		console.log(obj.visual.publicEmail)
		// if(!obj) return res.status(404).send({description:"帳號不存在"});
		// return res.status(201).send({username:obj.username,account:obj.account});
	}catch(e){
		console.log(e)
		// return res.status(500).send({description:"資料庫錯誤"})
	}
}