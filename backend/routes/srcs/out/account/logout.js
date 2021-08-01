//srcs/logout.js

const { ErrorHandler } = require("../../../error");

/**
 * @api {post} /logout logout
 * @apiName Logout
 * @apiGroup Out/account
 * @apiDescription 登出
 *
 * @apiSuccess (204) -
 * 
 * @apiError (500) {String} description "session destroy失敗"
 */
module.exports = function (req, res, next) {
    req.session.destroy(function(err) {
		if(err){
			console.log("session destroy err\n",err);
			// return res.status(500).send({description:"session destroy失敗"});
			throw new ErrorHandler(500,'session destroy fail')
		}
		return res.status(204).end()
	})
}