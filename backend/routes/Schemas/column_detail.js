const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Column_detail = new Schema({
  top: {
    name: String,
    experience: [String],
    hashtags: [String],
  },
  body: {
    body: [
      {
        bigtitle: String,
        bigsections: [
          {
            subtitle: String,
            subsection: String,
          },
        ],
      },
    ],
  },
  annotation: {
    annotation: [
      {
        job: String,
        contributer: String,
      },
    ],
  },
  id: { type: String, unique: true, index: true },
})

Column_detail.statics.smartQuery = function (keywords) {
  const reg = new RegExp(keywords.replace(' ', '|'), 'i')
  const query = {
    $or: [
      { 'top.name': reg },
      { 'top.experience': reg },
      { 'top.hashtags': reg },
      { 'body.body.bigtitle': reg },
      { 'body.body.bigsections.subtitle': reg },
      { 'body.body.bigsections.subsection': reg },
      { 'annotation.annotation.contributer': reg },
    ],
  }
  return query
}

Column_detail.index({ id: -1 })

const collectionName = 'Column_detail_v3'
module.exports.Schema = Column_detail
module.exports.collectionName = collectionName
module.exports.model = mongoose.model(collectionName, Column_detail)
