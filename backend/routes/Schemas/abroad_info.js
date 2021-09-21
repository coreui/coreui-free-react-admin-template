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

const { buf2url } = require('./query')
Abroad_Info.virtual('iconSrc').get(buf2url('icon'))

Abroad_Info.methods.getPublic = function () {
  return {
    title: this.title,
    _id: this._id,
    info: this.info,
    image: this.iconSrc,
  }
}

module.exports = mongoose.model('Abroad_info', Abroad_Info)
