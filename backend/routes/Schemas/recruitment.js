const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Recruitment_Schema = new Schema({
  account: String,

  title: {
    title: String,
    company_name: String,
    work_type: String,
  },
  info: {
    salary: String,
    experience: [String],
    diploma: String,
  },

  spec: {
    requirement: [String],
    description: String,
  },
  img: {
    data: { type: Buffer },
    contentType: { type: String },
  },
})

const { buf2url } = require('./query')
Recruitment_Schema.virtual('imgSrc').get(buf2url())

Recruitment_Schema.methods.getPublic = function () {
  return {
    account: this.account,
    _id: this._id,
    title: this.title,
    info: this.info,
    spec: this.spec,
    image: this.imgSrc,
  }
}

Recruitment_Schema.statics.smartQuery = function (keywords) {
  if (!keywords) return []
  const reg = new RegExp(keywords.replace(' ', '|'), 'i')
  // console.log(reg)
  const query = {
    $or: [
      { account: reg },
      { 'title.title': reg },
      { 'title.company_name': reg },
      { 'title.work_type': reg },
      { 'info.salary': reg },
      { 'info.experience': reg },
      { 'info.diploma': reg },
      { 'spec.requirement': reg },
      { 'spec.description': reg },
    ],
  }
  return query
}

module.exports = mongoose.model('Recruitment_v3', Recruitment_Schema)
