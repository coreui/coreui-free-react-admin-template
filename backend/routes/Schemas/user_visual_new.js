const mongoose = require('./db'),
  Schema = mongoose.Schema
require('mongoose-type-email')

const Profile_Schema = new Schema({
  account: { type: String, required: true, lowercase: true },
  username: { type: String, required: true },
  nickname: String,
  profile: String,
  major: String,
  double_major: String,
  minor: String,
  master: String,
  doctor: String,
  publicEmail: mongoose.SchemaTypes.Email,
  cellphone: String,
  CC: String, //city+country
  web: String,
  facebook: String,
  Linkedin: String,
  Occupation: [
    {
      O: String, //部門
      P: String, //職稱
      C: String, //公司
    },
  ],
  // JobID: {type:String}, //改在career用account link
  userimage: {
    //大頭貼
    data: Buffer,
    contentType: String,
  },
})

Profile_Schema.virtual('imgSrc').get(function () {
  try {
    // const prefix="data:"+this.userimage.contentType+";base64,"
    // const img = new Buffer(this.userimage.data, 'binary').toString('base64');
    // return prefix+img;
    return `data:${
      this.userimage.contentType
    };base64,${new Buffer(this.userimage.data, 'binary').toString('base64')}`
  } catch {
    return ''
  }
})

Profile_Schema.statics.smartFind = async function (keywords) {
  if (!keywords) return []
  const reg = new RegExp(keywords.replace(' ', '|'), 'i')
  //   console.log(reg)
  const query = {
    $or: [
      { account: reg },
      { username: reg },
      { nickname: reg },
      { profile: reg },
      { major: reg },
      { double_major: reg },
      { minor: reg },
      { master: reg },
      { doctor: reg },
      { publicEmail: reg },
      { cellphone: reg },
      { CC: reg },
      { web: reg },
      { facebook: reg },
      { Linkedin: reg },
      { 'Occupation.O': reg },
      { 'Occupation.P': reg },
      { 'Occupation.C': reg },
    ],
  }
  return await this.find(query)
}

module.exports = mongoose.model('Profile', Profile_Schema)
