const mongoose = require('./db'),
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
  id: { type: String, unique: true },
})

module.exports = mongoose.model('Column_detail_v2', Column_detail)
