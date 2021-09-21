const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Recommendation_Schema = new Schema({
  account: { type: String, required: true },
  title: {
    title: String,
    name: String,
    desire_work_type: String,
  },
  info: {
    contact: String,
    email: String,
    diploma: String,
  },
  spec: {
    experience: [String],
    speciality: [String],
  },

  img: {
    data: { type: Buffer },
    contentType: { type: String },
  },
  //image:eesa_icon,
})

Recommendation_Schema.virtual('imgSrc').get(function () {
  try {
    return `data:${
      this.img.contentType
    };base64,${new Buffer(this.img.data, 'binary').toString('base64')}`
  } catch {
    return ''
  }
})

Recommendation_Schema.methods.getPublic = function () {
  return {
    account: this.account,
    _id: this._id,
    title: this.title,
    info: this.info,
    spec: this.spec,
    image: this.imgSrc,
  }
}

Recommendation_Schema.statics.smartQuery = function (keywords) {
  if (!keywords) return []
  const reg = new RegExp(keywords.replace(' ', '|'), 'i')
  //   console.log(reg)
  const query = {
    $or: [
      { account: reg },
      { 'title.title': reg },
      { 'title.name': reg },
      { 'title.desire_work_type': reg },
      { 'info.contact': reg },
      { 'info.email': reg },
      { 'info.diploma': reg },
      { 'spec.experience': reg },
      { 'spec.speciality': reg },
    ],
  }
  return query
}

module.exports = mongoose.model('Recommendation', Recommendation_Schema)
