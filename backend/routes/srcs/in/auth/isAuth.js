const { ErrorHandler } = require("../../../error");
const env = require('dotenv')
env.config()

module.exports = (req, res, next) => {
    const session_isAuth = req.session.isAuth;
    if(session_isAuth){
        next()
    }else{
        console.log("not auth.",process.env.NODE_ENV==='development'&&'dev mode,accept')
        if(process.env.NODE_ENV==='development') next()
        else throw new ErrorHandler(403,'not auth')
    }
}