const mongoose = require('./db'),
  Schema = mongoose.Schema

const Column_Outline = new Schema({
  anno: [{ type: String }],
  date: String,
  title: [{ type: String }],
  exp: [{ type: String }],
  edu: [{ type: String }],
  intro: [{ type: String }],
  id: { type: String, unique: true },
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

module.exports = mongoose.model('Column_outline_v2', Column_Outline)
