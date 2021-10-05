const mongoose = require('mongoose'),
  Schema = mongoose.Schema
require('mongoose-type-email')

const User_pending_Schema = new Schema({
  username: { type: String, required: true }, //名字
  facebookID: String,
  account: { type: String, required: true, lowercase: true, unique: true }, //學號
  userpsw: String, //密碼
  email: { type: mongoose.SchemaTypes.Email, required: true },
  active: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  avatar: {
    data: Buffer,
    contentType: String,
  },
})

const { buf2url } = require('./query')
User_pending_Schema.virtual('imgSrc').get(buf2url())

module.exports = mongoose.model('User_pending', User_pending_Schema)
