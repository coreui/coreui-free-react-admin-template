const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Abroad_Info = new Schema({
  title: { type: String },
  info: { type: String },
  icon: {
    data: { type: Buffer },
    contentType: { type: String },
  },
})

Abroad_Info.virtual('iconSrc').get(function () {
  try {
    const prefix = 'data:' + this.icon.contentType + ';base64,'
    const img = new Buffer(this.icon.data, 'binary').toString('base64')
    return prefix + img
  } catch {
    return ''
  }
})

Abroad_Info.methods.getPublic = function () {
  return {
    title: this.title,
    _id: this._id,
    info: this.info,
    image: this.iconSrc,
  }
}

module.exports = mongoose.model('Abroad_info', Abroad_Info)
