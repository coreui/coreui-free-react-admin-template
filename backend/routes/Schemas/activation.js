const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const activation_Schema = new Schema({
  account: { type: String, required: true },
  //newpsw: { type: String, required: true },
  active: String, //激活碼
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 }, //修改這行時要刪掉collection，否則不會更新到
})

module.exports = mongoose.model('Activation', activation_Schema)
