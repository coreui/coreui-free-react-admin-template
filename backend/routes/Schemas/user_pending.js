const mongoose = require('mongoose'),
  Schema = mongoose.Schema
require('mongoose-type-email')

const User_pending_Schema = new Schema({
  username: { type: String, required: true }, //名字
  facebookID: String,
  account: { type: String, required: true, lowercase: true, unique: true }, //學號
  userpsw: String, //密碼
  email: { type: mongoose.SchemaTypes.Email },
  img: {
    data: { type: Buffer },
    contentType: { type: String },
  },
})

User_pending_Schema.virtual('imgSrc').get(function () {
  try {
    const prefix = 'data:' + this.img.contentType + ';base64,'
    const img = new Buffer(this.img.data, 'binary').toString('base64')
    return prefix + img
  } catch {
    return ''
  }
})

module.exports = mongoose.model('User_pending', User_pending_Schema)
