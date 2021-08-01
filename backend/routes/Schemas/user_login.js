const mongoose = require("./db"),
  Schema = mongoose.Schema;
const env = require('dotenv')
env.config()

const User_login_Schema = process.env.newReg==='true' ? 
  new Schema({
    username: { type: String, required: true },//名字
    facebookID: String,
    account: { type: String, required: true, lowercase: true },//學號
    userpsw: String,//密碼
    isAuth: {type:Boolean, default:false},
    visual:  { type: Schema.Types.ObjectId, ref: 'User_visual' },
  })
  :
  new Schema({
    username: { type: String, required: true },//名字
    facebookID: String,
    account: { type: String, required: true, lowercase: true },//學號
    userpsw: String,//密碼
    isAuth: {type:Boolean, default:false},
    visual:  { type: Schema.Types.ObjectId, ref: 'User_visual' },
    img: {
      data: { type: Buffer },
      contentType: { type: String }
    }
  })

module.exports = mongoose.model("User_login", User_login_Schema);
