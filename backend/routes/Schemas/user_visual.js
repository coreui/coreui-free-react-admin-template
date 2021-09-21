// const mongoose = require('mongoose'),
//   Schema = mongoose.Schema
// require('mongoose-type-email')

// const User_visual_Schema = new Schema({
//   account: {
//     show: { type: Boolean, default: true },
//     data: { type: String, required: true, lowercase: true },
//   },
//   username: {
//     show: { type: Boolean, default: true },
//     data: { type: String, required: true },
//   },
//   nickname: {
//     show: { type: Boolean, default: true },
//     data: { type: String },
//   },
//   profile: {
//     show: { type: Boolean, default: true },
//     data: { type: String },
//   },
//   education: {
//     major: {
//       show: { type: Boolean, default: true },
//       SD: { type: String }, //school and department
//       Note: { type: String }, //一些備註，如：畢業、在學....
//     },
//     double_major: {
//       show: { type: Boolean, default: true },
//       SD: { type: String }, //school and department
//       Note: { type: String }, //一些備註，如：畢業、在學....
//     },
//     minor: {
//       show: { type: Boolean, default: true },
//       SD: { type: String }, //school and department
//       Note: { type: String }, //一些備註，如：畢業、在學....
//     },
//     master: {
//       show: { type: Boolean, default: true },
//       SD: { type: String }, //school and department
//       Note: { type: String }, //一些備註，如：畢業、在學....
//     },
//     doctor: {
//       show: { type: Boolean, default: true },
//       SD: { type: String }, //school and department
//       Note: { type: String }, //一些備註，如：畢業、在學....
//     },
//   },
//   publicEmail: {
//     show: { type: Boolean, default: false },
//     data: { type: mongoose.SchemaTypes.Email },
//   },
//   office: {
//     show: { type: Boolean, default: true },
//     data: { type: String },
//   }, //phone
//   homephone: {
//     show: { type: Boolean, default: false },
//     data: { type: String },
//   },
//   cellphone: {
//     show: { type: Boolean, default: false },
//     data: { type: String },
//   },
//   CC: {
//     show: { type: Boolean, default: false },
//     data: { type: String },
//   }, //city+country
//   web: {
//     show: { type: Boolean, default: true },
//     data: { type: String },
//   },
//   facebook: {
//     show: { type: Boolean, default: true },
//     data: { type: String },
//   },
//   Linkedin: {
//     show: { type: Boolean, default: true },
//     data: { type: String },
//   },
//   Occupation: [
//     {
//       show: { type: Boolean, default: true },
//       O: { type: String }, //部門?
//       P: { type: String }, //職稱?
//       C: { type: String }, //公司?
//     },
//   ],
//   JobID: { type: String }, //有空去查一下mongoose的ref和populate
//   userimage: {
//     //大頭貼
//     data: { type: Buffer },
//     contentType: { type: String },
//     show: { type: Boolean, default: true },
//   },
// })

// User_visual_Schema.virtual('imgSrc').get(function () {
//   try {
//     const prefix = 'data:' + this.userimage.contentType + ';base64,'
//     const img = new Buffer(this.userimage.data, 'binary').toString('base64')
//     return prefix + img
//   } catch {
//     return ''
//   }
// })

// module.exports = mongoose.model('User_visual', User_visual_Schema)
