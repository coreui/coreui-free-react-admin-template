const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Column_Outline = new Schema({
  anno: [{ type: String }],
  date: String,
  title: [{ type: String }],
  exp: [{ type: String }],
  edu: [{ type: String }],
  intro: [{ type: String }],
  id: { type: String, unique: true, index: true },
  columnImg: {
    //column 的照片
    data: { type: Buffer },
    contentType: { type: String },
  },
})

Column_Outline.virtual('imgSrc').get(function () {
  try {
    const prefix = 'data:' + this.columnImg.contentType + ';base64,'
    const img = new Buffer(this.columnImg.data, 'binary').toString('base64')
    return prefix + img
  } catch {
    return ''
  }
})

Column_Outline.methods.getPublic = function () {
  const { anno, date, title, exp, edu, intro, id, imgSrc } = this
  return { anno, date, title, exp, edu, intro, id, imgSrc }
}

// Column_Outline.statics.leanTrans = function ({
//   anno,
//   date,
//   title,
//   exp,
//   edu,
//   intro,
//   id,
//   columnImg,
// }) {
//   let imgSrc
//   try {
//     const prefix = 'data:' + columnImg.contentType + ';base64,'
//     const img = new Buffer(columnImg.data, 'binary').toString('base64')
//     imgSrc = prefix + img
//   } catch {
//     imgSrc = ''
//   }
//   return { anno, date, title, exp, edu, intro, id, imgSrc }
// }

Column_Outline.statics.smartQuery = function (keywords) {
  const reg = new RegExp(keywords.replace(' ', '|'), 'i')
  const query = {
    $or: [{ anno: reg }, { title: reg }, { exp: reg }, { edu: reg }, { intro: reg }],
  }
  return query
}

Column_Outline.index({ id: -1 })

const collectionName = 'Column_outline_v3'
module.exports.Schema = Column_Outline
module.exports.collectionName = collectionName
module.exports.model = mongoose.model(collectionName, Column_Outline)
